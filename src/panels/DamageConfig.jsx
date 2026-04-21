import { useState, useCallback } from 'react';
import { DAMAGE_CASES, CFG, NOISE_PRESETS } from '../data/sphericalData';

export default function DamageConfig({ activeCaseId = 'case1' }) {
  const activeCase = DAMAGE_CASES.find((c) => c.id === activeCaseId) ?? DAMAGE_CASES[0];

  const [damageElements, setDamageElements] = useState(
    activeCase.dam_e.map((eid, i) => ({ id: eid, severity: activeCase.dam_pe[i] }))
  );

  const [noise, setNoise] = useState({
    use_noise: false,
    alpha_freq: NOISE_PRESETS[0].alpha_freq,
    alpha_phi: NOISE_PRESETS[0].alpha_phi,
    noise_dist: CFG.noise_dist,
    N_trial: CFG.N_trial,
    dnn_n_inference_trials: CFG.dnn_n_inference_trials,
  });

  const updateNoise = useCallback((key, val) => {
    setNoise((n) => ({ ...n, [key]: val }));
  }, []);

  const addRow = () => {
    setDamageElements((prev) => [...prev, { id: 1, severity: 20 }]);
  };

  const removeRow = (idx) => {
    setDamageElements((prev) => prev.filter((_, i) => i !== idx));
  };

  const updateRow = (idx, field, val) => {
    setDamageElements((prev) =>
      prev.map((r, i) => (i === idx ? { ...r, [field]: Number(val) } : r))
    );
  };

  const applyPreset = (preset) => {
    setDamageElements(
      preset.dam_e.map((eid, i) => ({ id: eid, severity: preset.dam_pe[i] }))
    );
  };

  /* Build a severity map for the mesh preview */
  const sevMap = {};
  damageElements.forEach((d) => {
    sevMap[d.id] = Math.max(sevMap[d.id] ?? 0, d.severity);
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <h1 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight">
        Damage Configuration
      </h1>

      <div className="grid grid-cols-12 gap-6">
        {/* ── Left: Damage Table ─────────────────────────── */}
        <div className="col-span-7 space-y-4">
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/15">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary text-lg">heart_broken</span>
              <h3 className="font-headline font-bold text-sm text-on-surface">Damage Elements</h3>
            </div>

            {/* Table */}
            <table className="w-full text-sm mb-3">
              <thead>
                <tr className="text-[10px] font-bold text-on-surface-variant uppercase">
                  <th className="text-left pb-2">Element ID</th>
                  <th className="text-left pb-2">Severity (%)</th>
                  <th className="text-right pb-2">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/15">
                {damageElements.map((row, idx) => (
                  <tr key={idx}>
                    <td className="py-2">
                      <input
                        type="number"
                        min={1}
                        max={100}
                        value={row.id}
                        onChange={(e) => updateRow(idx, 'id', e.target.value)}
                        className="w-20 bg-surface-container-low border-none rounded p-2 font-mono text-sm text-on-surface focus:ring-1 focus:ring-primary outline-none"
                      />
                    </td>
                    <td className="py-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min={5}
                          max={50}
                          value={row.severity}
                          onChange={(e) => updateRow(idx, 'severity', e.target.value)}
                          className="flex-1 accent-error"
                        />
                        <span className="font-mono text-sm text-on-surface w-10 text-right">
                          {row.severity}%
                        </span>
                      </div>
                    </td>
                    <td className="py-2 text-right">
                      <button
                        onClick={() => removeRow(idx)}
                        className="p-1 rounded hover:bg-error/10 text-error transition-colors"
                        title="Remove"
                      >
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              onClick={addRow}
              className="flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary/80 transition-colors"
            >
              <span className="material-symbols-outlined text-lg">add_circle</span>
              Add Element
            </button>
          </div>

          {/* Preset Cases */}
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/15">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-primary text-lg">bookmark</span>
              <h3 className="font-headline font-bold text-sm text-on-surface">Preset Cases</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {DAMAGE_CASES.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => applyPreset(preset)}
                  className="px-4 py-2 rounded-lg bg-surface-container-low text-on-surface text-sm font-semibold hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  {preset.label}
                  <span className="ml-1.5 text-on-surface-variant text-xs">
                    ({preset.dam_e.length} elem)
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: Noise Configuration ─────────────────── */}
        <div className="col-span-5">
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/15">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary text-lg">noise_aware</span>
              <h3 className="font-headline font-bold text-sm text-on-surface">Noise Configuration</h3>
            </div>

            <div className="space-y-4">
              {/* use_noise toggle */}
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase">
                  use_noise
                </label>
                <button
                  role="switch"
                  aria-checked={noise.use_noise}
                  aria-label="Enable noise"
                  onClick={() => updateNoise('use_noise', !noise.use_noise)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    noise.use_noise ? 'bg-primary' : 'bg-outline-variant/30'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                      noise.use_noise ? 'translate-x-5' : ''
                    }`}
                  />
                </button>
              </div>

              {/* alpha_freq */}
              <div>
                <label className="text-[10px] font-bold text-on-surface-variant uppercase mb-1 block">
                  alpha_freq
                </label>
                <input
                  type="number"
                  step={0.001}
                  value={noise.alpha_freq}
                  onChange={(e) => updateNoise('alpha_freq', parseFloat(e.target.value))}
                  className="w-full bg-surface-container-low border-none rounded p-2 font-mono text-sm text-on-surface focus:ring-1 focus:ring-primary outline-none"
                />
              </div>

              {/* alpha_phi */}
              <div>
                <label className="text-[10px] font-bold text-on-surface-variant uppercase mb-1 block">
                  alpha_phi
                </label>
                <input
                  type="number"
                  step={0.01}
                  value={noise.alpha_phi}
                  onChange={(e) => updateNoise('alpha_phi', parseFloat(e.target.value))}
                  className="w-full bg-surface-container-low border-none rounded p-2 font-mono text-sm text-on-surface focus:ring-1 focus:ring-primary outline-none"
                />
              </div>

              {/* noise_dist */}
              <div>
                <label className="text-[10px] font-bold text-on-surface-variant uppercase mb-1 block">
                  noise_dist
                </label>
                <select
                  value={noise.noise_dist}
                  onChange={(e) => updateNoise('noise_dist', e.target.value)}
                  className="w-full bg-surface-container-low border-none rounded p-2 font-mono text-sm text-on-surface focus:ring-1 focus:ring-primary outline-none"
                >
                  <option value="uniform">uniform</option>
                  <option value="gaussian">gaussian</option>
                </select>
              </div>

              {/* N_trial */}
              <div>
                <label className="text-[10px] font-bold text-on-surface-variant uppercase mb-1 block">
                  N_trial
                </label>
                <input
                  type="number"
                  min={1}
                  value={noise.N_trial}
                  onChange={(e) => updateNoise('N_trial', parseInt(e.target.value, 10))}
                  className="w-full bg-surface-container-low border-none rounded p-2 font-mono text-sm text-on-surface focus:ring-1 focus:ring-primary outline-none"
                />
              </div>

              {/* Inference Trials */}
              <div>
                <label className="text-[10px] font-bold text-on-surface-variant uppercase mb-1 block">
                  dnn_n_inference_trials
                </label>
                <input
                  type="number"
                  min={1}
                  value={noise.dnn_n_inference_trials}
                  onChange={(e) =>
                    updateNoise('dnn_n_inference_trials', parseInt(e.target.value, 10))
                  }
                  className="w-full bg-surface-container-low border-none rounded p-2 font-mono text-sm text-on-surface focus:ring-1 focus:ring-primary outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom: Mesh Preview ──────────────────────────── */}
      <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/15">
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-primary text-lg">grid_on</span>
          <h3 className="font-headline font-bold text-sm text-on-surface">
            Damage Location Preview
          </h3>
          <span className="ml-auto text-[10px] font-bold text-on-surface-variant uppercase">
            10 &times; 10 element grid
          </span>
        </div>

        <div className="max-w-lg mx-auto">
          <div
            className="grid gap-[2px]"
            style={{
              gridTemplateColumns: 'repeat(10, 1fr)',
            }}
          >
            {Array.from({ length: 100 }, (_, i) => {
              const elemID = i + 1;
              const sev = sevMap[elemID];
              const isDamaged = sev != null;

              return (
                <div
                  key={elemID}
                  className={`aspect-square rounded-sm flex items-center justify-center text-[9px] font-mono transition-colors ${
                    isDamaged
                      ? 'text-white font-bold'
                      : 'bg-surface-container-low text-on-surface-variant/50'
                  }`}
                  style={
                    isDamaged
                      ? {
                          backgroundColor: `color-mix(in oklch, var(--color-error) ${Math.max(
                            30,
                            sev
                          )}%, var(--color-error-container))`,
                        }
                      : undefined
                  }
                  title={isDamaged ? `Element ${elemID}: ${sev}% damage` : `Element ${elemID}`}
                >
                  {elemID}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-4 mt-4 text-xs text-on-surface-variant justify-center">
          <span className="flex items-center gap-1.5">
            <span
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: 'var(--color-error-container)' }}
            />
            Low severity
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: 'var(--color-error)' }}
            />
            High severity
          </span>
        </div>
      </div>
    </div>
  );
}
