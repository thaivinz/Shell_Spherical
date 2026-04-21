import { useMemo } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer,
} from 'recharts';
import { RESULTS, CFG } from '../data/sphericalData';

export default function Convergence({ activeCaseId = 'case1', noiseKey = 'noise_free' }) {
  const result = RESULTS[activeCaseId]?.[noiseKey];
  const convergence = result?.convergence ?? [];

  const elemData = useMemo(
    () => convergence.map((c) => ({
      stage: `Stage ${c.stage}`,
      elemIn: c.elemIn,
      elemOut: c.elemOut,
    })),
    [convergence],
  );

  const mseData = useMemo(
    () => convergence.map((c) => ({
      stage: `Stage ${c.stage}`,
      trainMSE: c.trainMSE,
      testMSE: c.testMSE,
    })),
    [convergence],
  );

  const r2Data = useMemo(
    () => convergence.map((c) => ({
      stage: `Stage ${c.stage}`,
      trainR2: c.trainR2,
      testR2: c.testR2,
    })),
    [convergence],
  );

  const r2Min = useMemo(() => {
    if (r2Data.length === 0) return 0.95;
    const minVal = Math.min(...r2Data.map((d) => Math.min(d.trainR2, d.testR2)));
    return Math.floor(minVal * 100) / 100;
  }, [r2Data]);

  // Adaptive parameters: d_hidden halves each stage, samples/epochs increment
  const adaptiveParams = useMemo(() => {
    const params = convergence.map((c, i) => ({
      stage: c.stage,
      dHidden: c.dHidden,
      nSamples: CFG.dnn_N_samples_base + i * CFG.dnn_sample_incr,
      maxEpochs: (noiseKey === 'noise_free' ? CFG.dnn_epochs_base_no_noise : CFG.dnn_epochs_base_noise)
        + i * CFG.dnn_epoch_incr,
    }));
    // Show one extra projected stage if d_hidden hasn't reached minimum
    const last = convergence[convergence.length - 1];
    if (last && last.dHidden > CFG.dnn_d_hidden_min) {
      const nextIdx = convergence.length;
      params.push({
        stage: last.stage + 1,
        dHidden: Math.max(last.dHidden / 2, CFG.dnn_d_hidden_min),
        nSamples: CFG.dnn_N_samples_base + nextIdx * CFG.dnn_sample_incr,
        maxEpochs: (noiseKey === 'noise_free' ? CFG.dnn_epochs_base_no_noise : CFG.dnn_epochs_base_noise)
          + nextIdx * CFG.dnn_epoch_incr,
      });
    }
    return params;
  }, [convergence, noiseKey]);

  if (!result || convergence.length === 0) {
    return (
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-8 rounded-full bg-stage-adaptive" />
          <h2 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight">
            Convergence Monitor
          </h2>
        </div>
        <p className="text-on-surface-variant">No convergence data available for {activeCaseId} / {noiseKey}.</p>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-8 rounded-full bg-stage-adaptive" />
        <h2 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight">
          Convergence Monitor
        </h2>
      </div>

      {/* Convergence history table */}
      <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/15 overflow-x-auto">
        <p className="text-[10px] font-bold text-on-surface-variant uppercase mb-3">
          Convergence History
        </p>
        <table className="w-full text-sm">
          <thead>
            <tr>
              {['Stage', 'Elements In→Out', 'Train MSE', 'Test MSE', 'Train R²', 'Test R²', 'd_hidden'].map(
                (h) => (
                  <th
                    key={h}
                    className="text-[10px] font-bold text-on-surface-variant uppercase text-left pb-2 pr-4"
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="font-mono">
            {convergence.map((c) => (
              <tr key={c.stage} className="border-t border-outline-variant/15">
                <td className="py-2 text-on-surface">{c.stage}</td>
                <td className="py-2 text-on-surface">
                  {c.elemIn} &rarr; {c.elemOut}
                </td>
                <td className="py-2 text-on-surface">{c.trainMSE.toFixed(6)}</td>
                <td className="py-2 text-on-surface">{c.testMSE.toFixed(6)}</td>
                <td className="py-2 text-on-surface">{c.trainR2.toFixed(6)}</td>
                <td className="py-2 text-on-surface">{c.testR2.toFixed(6)}</td>
                <td className="py-2 text-on-surface">{c.dHidden}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Suspected elements vs stage */}
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/15">
          <p className="text-[10px] font-bold text-on-surface-variant uppercase mb-1">
            Suspected Elements vs Stage
          </p>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={elemData} margin={{ top: 10, right: 16, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-outline-variant, #ccc)" opacity={0.3} />
              <XAxis dataKey="stage" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Legend wrapperStyle={{ fontSize: 10 }} />
              <Line
                type="monotone"
                dataKey="elemIn"
                stroke="#00695c"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Elements In"
              />
              <Line
                type="monotone"
                dataKey="elemOut"
                stroke="#26a69a"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Elements Out"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 2: MSE trends */}
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/15">
          <p className="text-[10px] font-bold text-on-surface-variant uppercase mb-1">
            MSE Trends
          </p>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={mseData} margin={{ top: 10, right: 16, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-outline-variant, #ccc)" opacity={0.3} />
              <XAxis dataKey="stage" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => v.toFixed(4)} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v) => v.toFixed(6)} />
              <Legend wrapperStyle={{ fontSize: 10 }} />
              <Line
                type="monotone"
                dataKey="trainMSE"
                stroke="#e65100"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Train MSE"
              />
              <Line
                type="monotone"
                dataKey="testMSE"
                stroke="#ff9800"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Test MSE"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 3: R2 trends */}
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/15">
          <p className="text-[10px] font-bold text-on-surface-variant uppercase mb-1">
            R&sup2; Trends
          </p>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={r2Data} margin={{ top: 10, right: 16, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-outline-variant, #ccc)" opacity={0.3} />
              <XAxis dataKey="stage" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} domain={[r2Min, 1.0]} tickFormatter={(v) => v.toFixed(3)} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v) => v.toFixed(6)} />
              <Legend wrapperStyle={{ fontSize: 10 }} />
              <Line
                type="monotone"
                dataKey="trainR2"
                stroke="#1565c0"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Train R²"
              />
              <Line
                type="monotone"
                dataKey="testR2"
                stroke="#42a5f5"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Test R²"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Adaptive parameter table */}
      <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/15 overflow-x-auto">
        <p className="text-[10px] font-bold text-on-surface-variant uppercase mb-3">
          Adaptive Parameters (Multi-Stage Adaptive Schedule)
        </p>
        <table className="w-full text-sm">
          <thead>
            <tr>
              {['Stage', 'd_hidden', 'N_samples', 'Max Epochs'].map((h) => (
                <th
                  key={h}
                  className="text-[10px] font-bold text-on-surface-variant uppercase text-left pb-2 pr-4"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="font-mono">
            {adaptiveParams.map((p) => (
              <tr key={p.stage} className="border-t border-outline-variant/15">
                <td className="py-2 text-on-surface">{p.stage}</td>
                <td className="py-2 text-on-surface">{p.dHidden}</td>
                <td className="py-2 text-on-surface">{p.nSamples.toLocaleString()}</td>
                <td className="py-2 text-on-surface">{p.maxEpochs.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-xs text-on-surface-variant mt-3">
          <span className="font-semibold">Note:</span> d_hidden halves each stage
          (max → min {CFG.dnn_d_hidden_min}). N_samples and epochs increment by {CFG.dnn_sample_incr}/stage (noise case).
          Stage with d_hidden={CFG.dnn_d_hidden_min} shows the minimum hidden size; further stages would terminate.
        </p>
      </div>
    </section>
  );
}
