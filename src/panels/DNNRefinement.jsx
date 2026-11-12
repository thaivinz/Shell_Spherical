import { useState, useMemo, useEffect } from 'react';
import {
  XAxis, YAxis, CartesianGrid, Tooltip,
  ReferenceLine, ResponsiveContainer, Cell,
  ComposedChart, Bar, Line, ErrorBar,
} from 'recharts';
import { RESULTS, DAMAGE_CASES, CFG } from '../data/sphericalData';

const THRESHOLD = CFG.dnn_delta;

export default function DNNRefinement({ activeCaseId = 'case1', noiseKey = 'noise_free' }) {
  const currentCase = DAMAGE_CASES.find((c) => c.id === activeCaseId);
  const result = RESULTS[activeCaseId]?.[noiseKey];
  const convergence = result?.convergence ?? [];
  const stages = convergence.map((c) => c.stage);

  // BUG FIX #2: Reset activeStage when case or noise changes
  const [activeStage, setActiveStage] = useState(null);
  useEffect(() => {
    setActiveStage(null);
  }, [activeCaseId, noiseKey]);

  const effectiveStage = stages.includes(activeStage) ? activeStage : stages[0];
  const stageIdx = convergence.findIndex((c) => c.stage === effectiveStage);
  const conv = convergence[stageIdx];
  const isLastStage = stageIdx === convergence.length - 1;
  const isNoisy = noiseKey !== 'noise_free';

  // BUG FIX #5: correct dependency array; #1,#4: handle missing stageDetails gracefully
  const chartData = useMemo(() => {
    if (!result || !currentCase) return [];
    const damagedSet = new Set(currentCase.dam_e);

    // Mean (and, under noise, standard deviation) of the DNN predictions for every
    // candidate element of this stage, as stored by the pipeline (no synthetic values)
    const preds = result.stagePredictions?.[effectiveStage] ?? [];
    return preds.map((p) => ({
      element: p.element,
      predicted: p.predicted,
      groundTruth: p.groundTruth,
      sigma: p.sigma ?? 0,
      isDamaged: damagedSet.has(p.element),
      keep: p.keep,
    }));
  }, [result, effectiveStage, currentCase]);

  if (!result || convergence.length === 0) {
    return (
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-8 rounded-full bg-stage-dnn" />
          <h2 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight">
            Stage 2+: DNN Refinement
          </h2>
        </div>
        <p className="text-on-surface-variant">No DNN data available for this configuration.</p>
      </section>
    );
  }

  // BUG FIX #3: check sigma from actual data, not just noiseKey
  const hasSigma = chartData.some((d) => d.sigma > 0);

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-8 rounded-full bg-stage-dnn" />
        <h2 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight">
          Stage 2+: DNN Refinement
        </h2>
      </div>

      {/* Tab selector */}
      <div className="flex gap-2">
        {stages.map((s, i) => {
          const isLast = i === stages.length - 1;
          return (
            <button
              key={s}
              onClick={() => setActiveStage(s)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                effectiveStage === s
                  ? 'bg-stage-dnn text-stage-dnn-stroke'
                  : 'bg-surface-container-lowest text-on-surface-variant border border-outline-variant/15 hover:bg-surface-container'
              }`}
            >
              Stage {s}{isLast ? ' (Final)' : ''}
            </button>
          );
        })}
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-2 px-4 py-3 rounded-lg bg-stage-dnn text-sm text-on-surface-variant">
        <span className="material-symbols-outlined text-stage-dnn-stroke text-lg mt-0.5">info</span>
        <p>
          <span className="font-semibold text-on-surface">
            {isLastStage ? 'Pipeline output — final predictions.' : 'Pipeline output — stage elimination.'}
          </span>{' '}
          {isLastStage
            ? 'Predicted damage ratios (mean ± standard deviation over the noisy realizations) and convergence metrics are read from the pipeline results. '
            : 'Predicted damage ratios (mean ± standard deviation) and kept/removed element sets are read from the pipeline results (δ = 0.05). '}
          DNN trained via <span className="font-mono">train_dnn_stage.py</span> (TensorFlow/Keras, Adam lr=0.001, batch=64).
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Bar chart */}
        <div className="xl:col-span-2 bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/15">
          <p className="text-[10px] font-bold text-on-surface-variant uppercase mb-1 tracking-wider">
            {isLastStage ? 'Final Predictions' : `Element Screening — Stage ${effectiveStage}`}
            <span className="ml-2 font-normal normal-case">
              ({chartData.length} elements)
            </span>
          </p>

          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={320}>
              <ComposedChart data={chartData} margin={{ top: 10, right: 16, bottom: 20, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-outline-variant, #ccc)" opacity={0.3} />
                <XAxis
                  dataKey="element"
                  tick={{ fontSize: 10 }}
                  label={{ value: 'Element ID', position: 'insideBottom', offset: -8, fontSize: 10 }}
                />
                <YAxis
                  tick={{ fontSize: 10 }}
                  label={{ value: 'Damage Ratio', angle: -90, position: 'insideLeft', fontSize: 10 }}
                  domain={[0, 'auto']}
                />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8 }}
                  formatter={(v, name) => [
                    typeof v === 'number' ? v.toFixed(4) : v,
                    name === 'predicted' ? 'Predicted' : name === 'groundTruth' ? 'Ground Truth' : name,
                  ]}
                  labelFormatter={(l) => `Element ${l}`}
                />
                <ReferenceLine
                  y={THRESHOLD}
                  stroke="#d32f2f"
                  strokeDasharray="6 3"
                  label={{ value: `δ=${THRESHOLD}`, position: 'right', fontSize: 10, fill: '#d32f2f' }}
                />
                <Bar isAnimationActive={false} dataKey="predicted" radius={[2, 2, 0, 0]}>
                  {chartData.map((entry, i) => (
                    <Cell key={i} fill={entry.keep ? '#2e7d32' : '#d32f2f'} />
                  ))}
                  {hasSigma && (
                    <ErrorBar dataKey="sigma" width={4} strokeWidth={2} stroke="#333" />
                  )}
                </Bar>
                <Line
                  dataKey="groundTruth"
                  stroke="none"
                  dot={{ r: 5, fill: '#1565c0', strokeWidth: 0 }}
                  name="Ground Truth"
                  isAnimationActive={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[320px] flex items-center justify-center text-on-surface-variant text-sm">
              No detailed element data available for this stage.
            </div>
          )}

          <div className="flex gap-5 mt-2 text-xs text-on-surface-variant">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm" style={{ background: '#2e7d32' }} />
              Keep (above δ)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm" style={{ background: '#d32f2f' }} />
              Remove (below δ)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full" style={{ background: '#1565c0', width: 10, height: 10 }} />
              Ground Truth
            </span>
            {hasSigma && (
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-on-surface" />
                ±σ (inference trials)
              </span>
            )}
          </div>
        </div>

        {/* Right column: metrics + elimination tracker */}
        <div className="space-y-6">
          {/* Training metrics */}
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/15">
            <p className="text-[10px] font-bold text-on-surface-variant uppercase mb-3 tracking-wider">
              Training Metrics — Stage {effectiveStage}
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Train MSE', value: conv?.trainMSE, fmt: 6 },
                { label: 'Test MSE', value: conv?.testMSE, fmt: 6 },
                { label: 'Train R²', value: conv?.trainR2, fmt: 6 },
                { label: 'Test R²', value: conv?.testR2, fmt: 6 },
              ].map((m) => (
                <div key={m.label}>
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase mb-1">
                    {m.label}
                  </p>
                  <p className="text-lg font-mono font-bold text-on-surface">
                    {m.value != null ? m.value.toFixed(m.fmt) : '—'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Element elimination tracker */}
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/15">
            <p className="text-[10px] font-bold text-on-surface-variant uppercase mb-3 tracking-wider">
              Element Elimination Tracker
            </p>
            <div className="space-y-3">
              {convergence.map((c) => {
                // BUG FIX #7: guard against division by zero
                const pct = c.elemIn > 0 ? (c.elemOut / c.elemIn) * 100 : 0;
                const isActive = effectiveStage === c.stage;
                return (
                  <div key={c.stage}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className={`font-semibold ${isActive ? 'text-stage-dnn-stroke' : 'text-on-surface-variant'}`}>
                        Stage {c.stage}
                        {c.stage === stages[stages.length - 1] ? ' (Final)' : ''}
                      </span>
                      <span className="font-mono text-on-surface">
                        {c.elemIn} &rarr; {c.elemOut}
                      </span>
                    </div>
                    <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${pct}%`,
                          background: isActive ? '#2e7d32' : '#81c784',
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div className="mt-4 pt-3 border-t border-outline-variant/15 text-xs text-on-surface-variant">
              <span className="font-semibold">Total reduction:</span>{' '}
              <span className="font-mono text-on-surface">
                {convergence[0]?.elemIn ?? 0} &rarr; {convergence[convergence.length - 1]?.elemOut ?? 0} elements
              </span>
              <span className="ml-2">
                ({convergence.length} stage{convergence.length !== 1 ? 's' : ''})
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
