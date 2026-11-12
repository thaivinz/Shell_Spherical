export const SHELL_TYPES = {
  hypar: {
    label: 'Hyperbolic Paraboloid',
    baitoan: 7,
    material: { E: 35e9, nuy: 0.2, kapa: 5 / 6, rho: 2500, t: 0.1 },
    geometry: { lx: 1.0, ly: 1.0, R: null },
  },
  spherical: {
    label: 'Spherical Shell',
    baitoan: 2,
    material: { E: 68.9e9, nuy: 0.3, kapa: 5 / 6, rho: 2700, t: 0.099451 },
    geometry: { lx: 1.5698, ly: 1.5698, R: 2.54 },
  },
};

export const MASTER_NODES = [
  15, 25, 27, 30, 32, 36, 38, 39, 43, 47, 50, 52,
  57, 59, 60, 62, 65, 68, 72, 76, 84, 91, 93, 97, 102, 104,
];

export const DAMAGE_PRESETS = {
  hypar: [
    { label: 'Case 1', dam_e: [8, 46, 52, 94], dam_pe: [25, 20, 30, 35] },
  ],
  spherical: [
    { label: 'Case A', dam_e: [5], dam_pe: [20] },
    { label: 'Case B', dam_e: [34, 45], dam_pe: [25, 20] },
    { label: 'Case C', dam_e: [5, 45], dam_pe: [30, 30] },
    { label: 'Case D', dam_e: [27, 43, 67], dam_pe: [20, 30, 20] },
    { label: 'Case E', dam_e: [5, 42, 43, 77], dam_pe: [20, 25, 15, 20] },
    { label: 'Case F', dam_e: [14, 29, 35, 56, 69, 88], dam_pe: [25, 20, 30, 25, 35, 40] },
  ],
};

export const DEFAULT_CFG = {
  nx: 10,
  ny: 10,
  use_noise: false,
  noise_seed: 1,
  alpha_freq: 0.01,
  alpha_phi: 0.10,
  noise_dist: 'uniform',
  noise_apply_ud: false,
  N_trial: 10,
  dnn_n_inference_trials: 10,
  nModesFull: 20,
  nModesROM: 20,
  nModes_MFBDI: 5,
  MFBDI_threshold: 0.05,
  dnn_N_samples_base: 3000,
  dnn_epochs_base_no_noise: 1000,
  dnn_epochs_base_noise: 2000,
  dnn_sample_incr: 500,
  dnn_epoch_incr: 500,
  dnn_max_samples: 5000,
  dnn_max_epochs: 5000,
  dnn_d_hidden_init: 1024,
  dnn_d_hidden_min: 128,
  dnn_delta: 0.05,
  dnn_max_stages: 8,
};

export const NOISE_PRESETS = [
  { label: 'Noise-free', alpha_freq: 0, alpha_phi: 0 },
  { label: '5% Noise', alpha_freq: 0.01, alpha_phi: 0.05 },
  { label: '10% Noise', alpha_freq: 0.01, alpha_phi: 0.10 },
  { label: 'Custom', alpha_freq: null, alpha_phi: null },
];

// Sidebar navigation items
export const NAV_ITEMS = [
  { id: 'model-setup', label: 'Model Setup', icon: 'precision_manufacturing' },
  { id: 'sensor-config', label: 'Sensor Configuration', icon: 'sensors' },
  { id: 'damage-config', label: 'Damage Configuration', icon: 'heart_broken' },
  { id: 'pipeline-control', label: 'Pipeline Control', icon: 'settings_input_component' },
  { id: 'stage-1-mfbdi', label: 'Stage 1: MFBDI', icon: 'analytics' },
  { id: 'stage-2-dnn', label: 'Stage 2+: DNN', icon: 'memory' },
  { id: 'convergence', label: 'Convergence', icon: 'show_chart' },
  { id: 'final-report', label: 'Final Report', icon: 'description' },
];

// Mock MFBDI data for 100 elements
// Note: These are illustrative values. Real MFBDI indices are computed via
// compute_MFBDI_shell.m using modal flexibility sensitivity (paper Eq.12-20).
export function generateMockMFBDI(damageElements, damageSeverities) {
  const seed = 42;
  let s = seed;
  const rand = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };

  // Track which damaged elements will be false negatives (1-2 low-severity ones)
  const falseNegIndices = new Set();
  damageSeverities.forEach((sev, i) => {
    if (sev <= 20 && falseNegIndices.size < 2) falseNegIndices.add(i);
  });

  return Array.from({ length: 100 }, (_, i) => {
    const idx = damageElements.indexOf(i + 1);
    let base;
    if (idx >= 0) {
      const severity = damageSeverities[idx];
      // Nonlinear severity scaling
      const scaledSev = Math.sqrt(severity / 100) * 0.25;
      if (falseNegIndices.has(idx)) {
        // False negative: barely above threshold, may dip below
        base = 0.045 + rand() * 0.012;
      } else {
        base = 0.08 + scaledSev + rand() * 0.06;
      }
    } else {
      // ~8% false positive rate: undamaged elements randomly exceeding threshold
      const isFalsePositive = rand() < 0.08;
      base = isFalsePositive
        ? 0.05 + rand() * 0.04
        : rand() * 0.035;
    }
    return { element: i + 1, value: Math.round(base * 10000) / 10000, isDamaged: idx >= 0 };
  });
}

// Mock convergence data
export const MOCK_CONVERGENCE = [
  { stage: 2, elemIn: 24, elemOut: 12, trainMSE: 0.0012, testMSE: 0.0018, trainR2: 0.987, testR2: 0.976, dHidden: 1024 },
  { stage: 3, elemIn: 12, elemOut: 6, trainMSE: 0.0008, testMSE: 0.0011, trainR2: 0.993, testR2: 0.988, dHidden: 512 },
  { stage: 4, elemIn: 6, elemOut: 4, trainMSE: 0.0005, testMSE: 0.0007, trainR2: 0.997, testR2: 0.994, dHidden: 256 },
];
