import { useState } from 'react';
import { CFG, DAMAGE_CASES, RESULTS } from '../data/sphericalData';

const PIPELINE_STAGES = [
  { key: 'input', label: 'INPUT',              icon: 'input',                bg: 'bg-stage-fe' },
  { key: 'mor',   label: 'NSEMR-II MOR',       icon: 'compress',             bg: 'bg-stage-mor' },
  { key: 'mfbdi', label: 'MFBDI Screening',    icon: 'analytics',            bg: 'bg-stage-mfbdi' },
  { key: 'dnn',   label: 'DNN Training Loop',  icon: 'memory',               bg: 'bg-stage-dnn' },
  { key: 'check', label: 'Convergence Check',  icon: 'fact_check',           bg: 'bg-stage-decision' },
  { key: 'out',   label: 'Final Output',       icon: 'assignment_turned_in', bg: 'bg-stage-output' },
];

function buildInitialLogs(activeCase) {
  return [
    '[00:00.0] Pipeline initialized.',
    '[00:00.1] Shell type: Spherical Shell (Case ID: 2)',
    '[00:00.1] Mesh: 10x10 elements, 121 nodes, 726 DOF',
    '[00:00.2] Master nodes loaded: 26 nodes -> 156 master DOF',
    `[00:00.3] Damage scenario: ${activeCase.dam_e.length} elements [${activeCase.dam_e.join(', ')}]`,
    '[00:00.3] Noise: OFF',
    '[00:00.4] Awaiting pipeline start...',
  ];
}

export default function PipelineControl({ activeCaseId = 'case1', noiseKey = 'noise_free' }) {
  const activeCase = DAMAGE_CASES.find((c) => c.id === activeCaseId) ?? DAMAGE_CASES[0];

  const epochsBase = noiseKey !== 'noise_free'
    ? CFG.dnn_epochs_base_noise
    : CFG.dnn_epochs_base_no_noise;

  const [cfg, setCfg] = useState({
    dnn_d_hidden_init: CFG.dnn_d_hidden_init,
    dnn_d_hidden_min: CFG.dnn_d_hidden_min,
    dnn_N_samples_base: CFG.dnn_N_samples_base,
    dnn_sample_incr: CFG.dnn_sample_incr,
    dnn_max_samples: CFG.dnn_max_samples,
    dnn_epochs_base: epochsBase,
    dnn_epoch_incr: CFG.dnn_epoch_incr,
    dnn_max_epochs: CFG.dnn_max_epochs,
    MFBDI_threshold: CFG.MFBDI_threshold,
    dnn_delta: CFG.dnn_delta,
    dnn_max_stages: CFG.dnn_max_stages,
  });

  const [currentStage, setCurrentStage] = useState(0);
  const [logs, setLogs] = useState(buildInitialLogs(activeCase));

  const updateCfg = (key, val) => setCfg((c) => ({ ...c, [key]: val }));

  const handleRunFull = () => {
    setCurrentStage(0);
    setLogs((l) => [...l, '[00:01.0] >>> FULL PIPELINE START <<<']);
    let stage = 0;
    const interval = setInterval(() => {
      stage++;
      setCurrentStage(stage);
      setLogs((l) => [
        ...l,
        `[00:0${stage + 1}.0] Stage ${stage + 1}: ${PIPELINE_STAGES[Math.min(stage, PIPELINE_STAGES.length - 1)].label} started...`,
      ]);
      if (stage >= PIPELINE_STAGES.length - 1) clearInterval(interval);
    }, 600);
  };

  const handleRunNext = () => {
    const next = Math.min(currentStage + 1, PIPELINE_STAGES.length - 1);
    setCurrentStage(next);
    setLogs((l) => [
      ...l,
      `[00:0${next + 1}.0] Stage ${next + 1}: ${PIPELINE_STAGES[next].label} started...`,
    ]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight">
          Pipeline Control
        </h1>
        <div className="flex gap-2">
          <button
            onClick={handleRunNext}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-low text-on-surface font-bold text-sm hover:bg-surface-container transition-colors border border-outline-variant/15"
          >
            <span className="material-symbols-outlined text-lg">skip_next</span>
            Run Next Stage
          </button>
          <button
            onClick={handleRunFull}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-sm hover:brightness-110 transition"
          >
            <span className="material-symbols-outlined text-lg">play_arrow</span>
            Run Full Pipeline
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* ── Left: Pipeline Flowchart ───────────────────── */}
        <div className="col-span-8">
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/15">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary text-lg">
                settings_input_component
              </span>
              <h3 className="font-headline font-bold text-sm text-on-surface">Pipeline Stages</h3>
            </div>

            <div className="flex flex-col items-center gap-0">
              {PIPELINE_STAGES.map((stage, idx) => (
                <div key={stage.key} className="flex flex-col items-center w-full max-w-sm">
                  {/* Stage box */}
                  <div
                    className={`
                      relative w-full flex items-center gap-3 px-5 py-4 rounded-xl font-bold text-sm transition-all
                      ${stage.bg}
                      ${idx === currentStage
                        ? 'ring-2 ring-primary ring-offset-2 ring-offset-surface-container-lowest shadow-lg scale-105'
                        : idx < currentStage
                          ? 'opacity-60'
                          : 'opacity-40'
                      }
                    `}
                  >
                    {/* Pulse ring for current stage */}
                    {idx === currentStage && (
                      <span className="absolute -inset-1 rounded-xl border-2 border-primary animate-ping opacity-20" />
                    )}

                    <span className="material-symbols-outlined text-xl">{stage.icon}</span>
                    <span className="flex-1">{stage.label}</span>

                    {idx < currentStage && (
                      <span className="material-symbols-outlined text-green-600 text-xl">
                        check_circle
                      </span>
                    )}
                    {idx === currentStage && (
                      <span className="material-symbols-outlined text-primary animate-spin text-xl">
                        progress_activity
                      </span>
                    )}

                    <span className="absolute -left-8 text-[10px] font-bold text-on-surface-variant uppercase w-6 text-right">
                      {idx + 1}
                    </span>
                  </div>

                  {/* Connecting arrow */}
                  {idx < PIPELINE_STAGES.length - 1 && (
                    <div className="flex flex-col items-center py-1">
                      <div
                        className={`w-0.5 h-4 ${
                          idx < currentStage ? 'bg-primary' : 'bg-outline-variant/30'
                        }`}
                      />
                      <span
                        className={`material-symbols-outlined text-sm ${
                          idx < currentStage ? 'text-primary' : 'text-outline-variant/30'
                        }`}
                      >
                        arrow_downward
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: DNN Hyperparameters ─────────────────── */}
        <div className="col-span-4">
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/15">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary text-lg">tune</span>
              <h3 className="font-headline font-bold text-sm text-on-surface">DNN Hyperparameters</h3>
            </div>

            <div className="space-y-3">
              <CfgInput label="d_hidden_init" value={cfg.dnn_d_hidden_init} onChange={(v) => updateCfg('dnn_d_hidden_init', v)} />
              <CfgInput label="d_hidden_min" value={cfg.dnn_d_hidden_min} onChange={(v) => updateCfg('dnn_d_hidden_min', v)} />

              <div className="border-t border-outline-variant/15 pt-3 mt-3">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase mb-2">Sampling</p>
              </div>
              <CfgInput label="N_samples" value={cfg.dnn_N_samples_base} onChange={(v) => updateCfg('dnn_N_samples_base', v)} />
              <CfgInput label="sample_incr" value={cfg.dnn_sample_incr} onChange={(v) => updateCfg('dnn_sample_incr', v)} />
              <CfgInput label="max_samples" value={cfg.dnn_max_samples} onChange={(v) => updateCfg('dnn_max_samples', v)} />

              <div className="border-t border-outline-variant/15 pt-3 mt-3">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase mb-2">Training</p>
              </div>
              <CfgInput label="epochs_base" value={cfg.dnn_epochs_base} onChange={(v) => updateCfg('dnn_epochs_base', v)} />
              <CfgInput label="epoch_incr" value={cfg.dnn_epoch_incr} onChange={(v) => updateCfg('dnn_epoch_incr', v)} />
              <CfgInput label="max_epochs" value={cfg.dnn_max_epochs} onChange={(v) => updateCfg('dnn_max_epochs', v)} />

              <div className="border-t border-outline-variant/15 pt-3 mt-3">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase mb-2">Convergence</p>
              </div>
              <CfgInput label="MFBDI_threshold" value={cfg.MFBDI_threshold} onChange={(v) => updateCfg('MFBDI_threshold', v)} step={0.01} />
              <CfgInput label="dnn_delta" value={cfg.dnn_delta} onChange={(v) => updateCfg('dnn_delta', v)} step={0.01} />
              <CfgInput label="max_stages" value={cfg.dnn_max_stages} onChange={(v) => updateCfg('dnn_max_stages', v)} />
            </div>
          </div>

          {/* ── DNN Architecture (Per-Stage) ──────────────── */}
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/15 mt-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary text-lg">schema</span>
              <h3 className="font-headline font-bold text-sm text-on-surface">DNN Architecture (Per-Stage)</h3>
            </div>

            {/* Architecture visualization: Input → Hidden → Output */}
            <div className="flex items-center justify-center gap-2 mb-5">
              {/* Input layer */}
              <div className="flex flex-col items-center gap-1">
                <div className="bg-stage-fe px-4 py-3 rounded-lg text-center min-w-[90px]">
                  <p className="font-bold text-xs">Input</p>
                  <p className="font-mono text-[10px] mt-0.5">d_input</p>
                </div>
              </div>

              {/* Arrow */}
              <span className="material-symbols-outlined text-on-surface-variant text-lg">arrow_forward</span>

              {/* Hidden layer */}
              <div className="flex flex-col items-center gap-1">
                <div className="bg-stage-dnn px-4 py-3 rounded-lg text-center min-w-[90px]">
                  <p className="font-bold text-xs">Hidden</p>
                  <p className="font-mono text-[10px] mt-0.5">d_hidden</p>
                </div>
                <span className="text-[9px] text-on-surface-variant font-mono">
                  = {cfg.dnn_d_hidden_init}
                </span>
              </div>

              {/* Arrow */}
              <span className="material-symbols-outlined text-on-surface-variant text-lg">arrow_forward</span>

              {/* Output layer */}
              <div className="flex flex-col items-center gap-1">
                <div className="bg-stage-output px-4 py-3 rounded-lg text-center min-w-[90px]">
                  <p className="font-bold text-xs">Output</p>
                  <p className="font-mono text-[10px] mt-0.5">d_output</p>
                </div>
                <span className="text-[9px] text-on-surface-variant font-mono">= N_candidates</span>
              </div>
            </div>

            {/* Training specs table */}
            <div className="border-t border-outline-variant/15 pt-3">
              <table className="w-full text-xs">
                <tbody className="divide-y divide-outline-variant/10">
                  {[
                    ['Hidden activation', 'LeakyReLU (\u03B1\u00A0=\u00A00.001)'],
                    ['Output activation', 'Linear'],
                    ['Optimizer', 'Adam (lr\u00A0=\u00A00.001)'],
                    ['Loss', 'MSE'],
                    ['Batch size', '64'],
                    ['Early stopping', 'patience\u00A0=\u00A050'],
                    ['Data normalization', 'Min-Max to [\u22121,\u00A01]'],
                    ['Train / Test split', '90%\u00A0/\u00A010%'],
                  ].map(([label, value]) => (
                    <tr key={label}>
                      <td className="text-[10px] font-bold text-on-surface-variant uppercase py-1.5 pr-3 whitespace-nowrap">
                        {label}
                      </td>
                      <td className="font-mono text-on-surface py-1.5 text-right">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom: Log Console ───────────────────────────── */}
      <div className="bg-inverse-surface text-inverse-on-surface font-mono text-xs p-4 rounded-xl h-48 overflow-y-auto">
        <div className="flex items-center gap-2 mb-2 text-inverse-on-surface/60">
          <span className="material-symbols-outlined text-sm">terminal</span>
          <span className="text-[10px] font-bold uppercase">Pipeline Log</span>
        </div>
        {logs.map((line, i) => (
          <div key={i} className="py-0.5 leading-relaxed">
            <span className="text-inverse-on-surface/40 mr-2 select-none">{String(i + 1).padStart(3, ' ')}</span>
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Helpers ─────────────────────────────────────────────── */

function CfgInput({ label, value, onChange, step = 1 }) {
  return (
    <div>
      <label className="text-[10px] font-bold text-on-surface-variant uppercase mb-1 block">
        {label}
      </label>
      <input
        type="number"
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full bg-surface-container-low border-none rounded p-2 font-mono text-sm text-on-surface focus:ring-1 focus:ring-primary outline-none"
      />
    </div>
  );
}
