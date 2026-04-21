import { useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ReferenceLine, ResponsiveContainer, Cell,
} from 'recharts';
import { RESULTS, DAMAGE_CASES, buildMFBDIBarData, CFG } from '../data/sphericalData';

function barColor(entry) {
  if (entry.isDamaged) return '#d32f2f';
  if (entry.isSuspected) return '#f57f17';
  return '#c1c7d2';
}

export default function MFBDIResults({ activeCaseId = 'case1', noiseKey = 'noise_free' }) {
  const currentCase = DAMAGE_CASES.find((c) => c.id === activeCaseId);
  const result = RESULTS[activeCaseId]?.[noiseKey];

  const data = useMemo(
    () => buildMFBDIBarData(activeCaseId, noiseKey),
    [activeCaseId, noiseKey],
  );

  const threshold = CFG.MFBDI_threshold;

  const suspected = useMemo(() => {
    if (!result) return [];
    // Combine suspected list with top10 values for the table
    const topMap = Object.fromEntries(result.mfbdi.top10.map((t) => [t.element, t.value]));
    return result.mfbdi.suspected
      .map((el) => {
        const barEntry = data.find((d) => d.element === el);
        return {
          element: el,
          value: topMap[el] ?? barEntry?.value ?? 0,
          isDamaged: currentCase?.dam_e.includes(el) ?? false,
        };
      })
      .sort((a, b) => b.value - a.value);
  }, [result, data, currentCase, activeCaseId, noiseKey]);

  if (!result) {
    return (
      <section className="space-y-6">
        <p className="text-on-surface-variant">No MFBDI data available for {activeCaseId} / {noiseKey}.</p>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-8 rounded-full bg-stage-mfbdi" />
        <h2 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight">
          Stage 1: MFBDI Screening
        </h2>
      </div>

      <div className="flex items-start gap-2 px-4 py-3 rounded-lg bg-stage-mfbdi text-sm text-on-surface-variant">
        <span className="material-symbols-outlined text-stage-mfbdi-stroke text-lg mt-0.5">info</span>
        <p>
          <span className="font-semibold text-on-surface">Pipeline output.</span>{' '}
          Top-10 MFBDI values and suspected element sets are extracted from
          <span className="font-mono"> Main_multistage.m</span> diary logs. MFBDI is computed via modal
          flexibility sensitivity analysis (Paper Eq. 12–20). Background element values below
          threshold are interpolated; ranked elements are exact pipeline output.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Bar chart - spans 2 cols */}
        <div className="xl:col-span-2 bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/15">
          <p className="text-[10px] font-bold text-on-surface-variant uppercase mb-1">
            MFBDI Index per Element — {currentCase?.label}
          </p>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data} margin={{ top: 10, right: 16, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-outline-variant, #ccc)" opacity={0.3} />
              <XAxis
                dataKey="element"
                tick={{ fontSize: 9 }}
                interval={9}
                label={{ value: 'Element Index', position: 'insideBottom', offset: -2, fontSize: 10 }}
              />
              <YAxis
                tick={{ fontSize: 10 }}
                label={{ value: 'MFBDI', angle: -90, position: 'insideLeft', fontSize: 10 }}
              />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 8 }}
                formatter={(v) => [v.toFixed(4), 'MFBDI']}
                labelFormatter={(l) => `Element ${l}`}
              />
              <ReferenceLine
                y={threshold}
                stroke="#d32f2f"
                strokeDasharray="6 3"
                label={{ value: `Threshold ${threshold}`, position: 'right', fontSize: 10, fill: '#d32f2f' }}
              />
              <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                {data.map((entry, i) => (
                  <Cell key={i} fill={barColor(entry)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div className="flex gap-5 mt-3 text-xs text-on-surface-variant">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm" style={{ background: '#d32f2f' }} />
              Actually damaged
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm" style={{ background: '#f57f17' }} />
              Above threshold
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm" style={{ background: '#c1c7d2' }} />
              Below threshold
            </span>
          </div>
        </div>

        {/* Suspected elements table */}
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/15">
          <p className="text-[10px] font-bold text-on-surface-variant uppercase mb-1">
            Suspected Elements
          </p>
          <p className="text-sm text-on-surface-variant mb-3">
            {suspected.length} elements above threshold
          </p>

          <div className="overflow-y-auto max-h-[340px]">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-surface-container-lowest">
                <tr>
                  <th className="text-[10px] font-bold text-on-surface-variant uppercase text-left pb-2">
                    Element ID
                  </th>
                  <th className="text-[10px] font-bold text-on-surface-variant uppercase text-right pb-2">
                    MFBDI Value
                  </th>
                  <th className="text-[10px] font-bold text-on-surface-variant uppercase text-center pb-2">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="font-mono">
                {suspected.map((el) => (
                  <tr key={el.element} className="border-t border-outline-variant/15">
                    <td className="py-1.5 text-on-surface">{el.element}</td>
                    <td className="py-1.5 text-right text-on-surface">{el.value.toFixed(4)}</td>
                    <td className="py-1.5 text-center">
                      {el.isDamaged ? (
                        <span className="inline-flex items-center gap-1 text-xs text-[#d32f2f] font-semibold">
                          <span className="material-symbols-outlined text-sm">warning</span>
                          Damaged
                        </span>
                      ) : (
                        <span className="text-xs text-on-surface-variant">Suspected</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
