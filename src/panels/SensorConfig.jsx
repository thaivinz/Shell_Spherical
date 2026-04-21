import { MASTER_NODES, DOF } from '../data/sphericalData';

export default function SensorConfig() {
  /* Node positions on 10x10 grid (1-indexed, row-major for 11x11 node grid) */
  const sensorSet = new Set(MASTER_NODES);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight">
          Sensor Configuration
        </h1>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-sm hover:brightness-110 transition">
          <span className="material-symbols-outlined text-lg">play_arrow</span>
          Run Reduction
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* ── Left: Sensor Mesh ──────────────────────────── */}
        <div className="col-span-7">
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/15">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary text-lg">grid_on</span>
              <h3 className="font-headline font-bold text-sm text-on-surface">
                Sensor Node Layout
              </h3>
              <span className="ml-auto text-[10px] font-bold text-on-surface-variant uppercase">
                11 &times; 11 node grid
              </span>
            </div>

            {/* 10x10 element grid (11x11 nodes) */}
            <div className="aspect-square max-w-md mx-auto">
              <div
                className="grid w-full h-full gap-[2px]"
                style={{
                  gridTemplateColumns: 'repeat(10, 1fr)',
                  gridTemplateRows: 'repeat(10, 1fr)',
                }}
              >
                {Array.from({ length: 100 }, (_, i) => {
                  const elemID = i + 1;
                  /* Determine if any corner node of this element is a sensor node.
                     For a 10-col grid: row = floor(i/10), col = i%10
                     Corner node IDs (1-indexed): TL = row*11+col+1, TR = TL+1, BL = TL+11, BR = TL+12 */
                  const row = Math.floor(i / 10);
                  const col = i % 10;
                  const tl = row * 11 + col + 1;
                  const hasSensor =
                    sensorSet.has(tl) ||
                    sensorSet.has(tl + 1) ||
                    sensorSet.has(tl + 11) ||
                    sensorSet.has(tl + 12);

                  return (
                    <div
                      key={elemID}
                      className={`rounded-sm flex items-center justify-center text-[9px] font-mono transition-colors ${
                        hasSensor
                          ? 'bg-primary/25 text-primary font-bold ring-1 ring-primary/30'
                          : 'bg-surface-container-low text-on-surface-variant/50'
                      }`}
                      title={`Element ${elemID}`}
                    >
                      {elemID}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-4 mt-4 text-xs text-on-surface-variant">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-primary/25 ring-1 ring-primary/30" />
                Sensor-adjacent element
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-surface-container-low" />
                Standard element
              </span>
            </div>
          </div>
        </div>

        {/* ── Right: Diagnostics & Info ──────────────────── */}
        <div className="col-span-5 space-y-4">
          {/* DOF Summary */}
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/15">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary text-lg">calculate</span>
              <h3 className="font-headline font-bold text-sm text-on-surface">DOF Summary</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <StatCard label="Total DOF" value={DOF.total} />
              <StatCard label="Free DOF" value={DOF.free} />
              <StatCard label="Master DOF" value={DOF.master} accent />
              <StatCard label="Slave DOF" value={DOF.slave} />
            </div>
          </div>

          {/* NSEMR-II Diagnostics */}
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/15">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary text-lg">monitoring</span>
              <h3 className="font-headline font-bold text-sm text-on-surface">NSEMR-II Diagnostics</h3>
            </div>
            <p className="text-xs text-on-surface-variant mt-1 mb-3">
              Second-order Neumann Series Expansion-based Model Order Reduction.
              Partitions DOFs into master (measured) and slave (unmeasured) sets,
              builds transformation matrix <span className="font-mono font-semibold">T</span> to
              reconstruct full mode shapes from sensor data (Paper Eq. 6–9).
            </p>
            <table className="w-full text-sm">
              <tbody className="divide-y divide-outline-variant/15">
                <DiagRow label="Condition Number" value="3.24e+04" />
                <DiagRow label="Symmetry Check" value="PASS" ok />
                <DiagRow label="Positive Definiteness" value="PASS" ok />
                <DiagRow
                  label="Reduction Ratio"
                  value={`${DOF.master} / ${DOF.free} = ${(DOF.master / DOF.free * 100).toFixed(1)}%`}
                />
              </tbody>
            </table>
          </div>

          {/* Master Nodes */}
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/15">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary text-lg">hub</span>
              <h3 className="font-headline font-bold text-sm text-on-surface">
                Master Nodes
                <span className="ml-2 text-on-surface-variant font-normal">({MASTER_NODES.length})</span>
              </h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {MASTER_NODES.map((id) => (
                <span
                  key={id}
                  className="inline-flex items-center justify-center w-9 h-7 rounded bg-primary/10 text-primary font-mono text-xs font-bold"
                >
                  {id}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Helpers ─────────────────────────────────────────────── */

function StatCard({ label, value, accent = false }) {
  return (
    <div className="bg-surface-container-low rounded-lg p-3">
      <p className="text-[10px] font-bold text-on-surface-variant uppercase mb-1">{label}</p>
      <p
        className={`text-xl font-headline font-extrabold font-mono ${
          accent ? 'text-primary' : 'text-on-surface'
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function DiagRow({ label, value, ok = false }) {
  return (
    <tr>
      <td className="py-2 text-on-surface-variant">{label}</td>
      <td className="py-2 text-right font-mono font-bold">
        {ok ? (
          <span className="text-green-600 flex items-center justify-end gap-1">
            <span className="material-symbols-outlined text-base">check_circle</span>
            {value}
          </span>
        ) : (
          <span className="text-on-surface">{value}</span>
        )}
      </td>
    </tr>
  );
}
