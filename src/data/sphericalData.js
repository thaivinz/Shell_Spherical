/**
 * Real numerical results from Shell_Spherical experiments.
 * Extracted from diary logs, .mat files, and MFBDI/Stage/Convergence plots.
 * Source: Main_multistage.m (baitoan=2, Spherical Shell)
 */

// ── Material & Geometry (INPUT.m case 2) ──────────────────────
export const SPHERICAL_SHELL = {
  label: 'Spherical Shell',
  baitoan: 2,
  material: {
    E: 68.9e9,       // Young's modulus (Pa) — Aluminum
    nuy: 0.3,        // Poisson's ratio
    kapa: 5 / 6,     // Shear correction factor
    rho: 2700,       // Density (kg/m³)
    t: 0.99451,      // Thickness (m)
  },
  geometry: {
    lx: 1.5698,      // Width (m)
    ly: 1.5698,      // Length (m)
    R: 2.54,         // Radius (m)
  },
};

// ── Mesh ──────────────────────────────────────────────────────
export const MESH = { nx: 10, ny: 10, nele: 100, snodes: 121, ndof: 6, sdof: 726 };

// ── Master nodes (26 nodes × 6 DOF = 156 master DOFs) ────────
export const MASTER_NODES = [
  15, 25, 27, 30, 32, 36, 38, 39, 43, 47, 50, 52,
  57, 59, 60, 62, 65, 68, 72, 76, 84, 91, 93, 97, 102, 104,
];

// ── DOF Summary ───────────────────────────────────────────────
export const DOF = {
  total: 726,
  free: 600,
  master: MASTER_NODES.length * 6,  // 156
  slave: 600 - MASTER_NODES.length * 6,  // 444
};

// ── Configuration (cfg struct) ────────────────────────────────
export const CFG = {
  nModesFull: 20,
  nModesROM: 20,
  nModes_MFBDI: 5,
  MFBDI_threshold: 0.05,
  dnn_N_samples_base: 3000,
  dnn_epochs_base_no_noise: 1000,
  dnn_epochs_base_noise: 2000,
  dnn_sample_incr: 500,
  dnn_epoch_incr: 500,
  dnn_max_samples: 8000,
  dnn_max_epochs: 5000,
  dnn_d_hidden_init: 1024,
  dnn_d_hidden_min: 128,
  dnn_delta: 0.05,
  dnn_max_stages: 8,
  N_trial: 10,
  dnn_n_inference_trials: 10,
  noise_dist: 'uniform',
};

// ── Damage Cases ──────────────────────────────────────────────
export const DAMAGE_CASES = [
  {
    id: 'case1',
    label: 'Case 1 — Single element',
    dam_e: [6],
    dam_pe: [20],
  },
  {
    id: 'case2',
    label: 'Case 2 — Three elements',
    dam_e: [13, 37, 62],
    dam_pe: [20, 30, 25],
  },
  {
    id: 'case3',
    label: 'Case 3 — Six elements',
    dam_e: [14, 29, 35, 56, 69, 88],
    dam_pe: [25, 20, 30, 25, 35, 40],
  },
];

// ── Noise Presets ─────────────────────────────────────────────
export const NOISE_PRESETS = [
  { id: 'noise_free', label: 'Noise-free', alpha_freq: 0, alpha_phi: 0 },
  { id: 'noise_5', label: '5% Noise', alpha_freq: 0.01, alpha_phi: 0.05 },
  { id: 'noise_10', label: '10% Noise', alpha_freq: 0.01, alpha_phi: 0.10 },
];

// ══════════════════════════════════════════════════════════════
//  REAL NUMERICAL RESULTS — extracted from diary logs & plots
// ══════════════════════════════════════════════════════════════

export const RESULTS = {
  // ────────── CASE 1: Element 6, 20% ─────────────────────────
  case1: {
    noise_free: {
      mfbdi: {
        suspected: [6],
        top10: [
          { element: 6, value: 0.2206 },
          { element: 15, value: 0.0015 },
          { element: 17, value: 0.0012 },
          { element: 27, value: 0.0008 },
          { element: 56, value: 0.0006 },
          { element: 25, value: 0.0005 },
          { element: 91, value: 0.0005 },
          { element: 4, value: 0.0005 },
          { element: 93, value: 0.0004 },
          { element: 83, value: 0.0003 },
        ],
      },
      convergence: [
        { stage: 2, elemIn: 1, elemOut: 1, trainMSE: 0.000001, testMSE: 0.000001, trainR2: 0.999948, testR2: 0.999941, dHidden: 1024 },
      ],
      finalPredictions: [
        { element: 6, predicted: 0.1985, groundTruth: 0.20 },
      ],
    },
    noise_5: {
      mfbdi: {
        suspected: [6, 9, 10, 46, 55, 56, 58, 59, 67, 74, 97, 100],
        top10: [
          { element: 46, value: 0.0984 },
          { element: 100, value: 0.0980 },
          { element: 56, value: 0.0838 },
          { element: 6, value: 0.0833 },
          { element: 55, value: 0.0671 },
          { element: 58, value: 0.0641 },
          { element: 9, value: 0.0635 },
          { element: 97, value: 0.0631 },
          { element: 10, value: 0.0605 },
          { element: 67, value: 0.0584 },
        ],
      },
      convergence: [
        { stage: 2, elemIn: 12, elemOut: 4, trainMSE: 0.000984, testMSE: 0.002176, trainR2: 0.952316, testR2: 0.891931, dHidden: 1024 },
        { stage: 3, elemIn: 4, elemOut: 1, trainMSE: 0.000399, testMSE: 0.001017, trainR2: 0.980435, testR2: 0.950325, dHidden: 512 },
        { stage: 4, elemIn: 1, elemOut: 1, trainMSE: 0.000009, testMSE: 0.000021, trainR2: 0.999569, testR2: 0.998947, dHidden: 256 },
      ],
      stageDetails: {
        2: { kept: [6, 9, 56, 100], removed: [10, 46, 55, 58, 59, 67, 74, 97] },
        3: { kept: [6], removed: [9, 56, 100] },
      },
      finalPredictions: [
        { element: 6, predicted: 0.2022, groundTruth: 0.20, sigma: 0.0030 },
      ],
    },
    noise_10: {
      mfbdi: {
        suspected: [1, 6, 9, 10, 35, 45, 46, 55, 56, 58, 59, 62, 67, 69, 74, 75, 91, 97, 100],
        top10: [
          { element: 46, value: 0.1342 },
          { element: 56, value: 0.1164 },
          { element: 100, value: 0.0955 },
          { element: 10, value: 0.0882 },
          { element: 1, value: 0.0809 },
          { element: 9, value: 0.0786 },
          { element: 67, value: 0.0776 },
          { element: 58, value: 0.0744 },
          { element: 55, value: 0.0718 },
          { element: 6, value: 0.0715 },
        ],
      },
      convergence: [
        { stage: 2, elemIn: 19, elemOut: 8, trainMSE: 0.001963, testMSE: 0.004962, trainR2: 0.906630, testR2: 0.757970, dHidden: 1024 },
        { stage: 3, elemIn: 8, elemOut: 3, trainMSE: 0.001225, testMSE: 0.002910, trainR2: 0.941005, testR2: 0.863632, dHidden: 512 },
        { stage: 4, elemIn: 3, elemOut: 1, trainMSE: 0.000434, testMSE: 0.000860, trainR2: 0.979216, testR2: 0.958142, dHidden: 256 },
        { stage: 5, elemIn: 1, elemOut: 1, trainMSE: 0.000011, testMSE: 0.000018, trainR2: 0.999469, testR2: 0.999097, dHidden: 128 },
      ],
      stageDetails: {
        2: { kept: [1, 6, 9, 10, 67, 74, 91, 100], removed: [35, 45, 46, 55, 56, 58, 59, 62, 69, 75, 97] },
        3: { kept: [1, 6, 100], removed: [9, 10, 67, 74, 91] },
        4: { kept: [6], removed: [1, 100] },
      },
      finalPredictions: [
        { element: 6, predicted: 0.1987, groundTruth: 0.20, sigma: 0.0027 },
      ],
    },
  },

  // ────────── CASE 2: Elements 13,37,62 — 20%,30%,25% ────────
  case2: {
    noise_free: {
      mfbdi: {
        suspected: [13, 37, 62],
        top10: [
          { element: 37, value: 0.3732 },
          { element: 62, value: 0.2991 },
          { element: 13, value: 0.2311 },
          { element: 46, value: 0.0149 },
          { element: 28, value: 0.0098 },
          { element: 55, value: 0.0064 },
          { element: 71, value: 0.0063 },
          { element: 10, value: 0.0045 },
          { element: 26, value: 0.0045 },
          { element: 48, value: 0.0043 },
        ],
      },
      convergence: [
        { stage: 2, elemIn: 3, elemOut: 3, trainMSE: 0.000006, testMSE: 0.000007, trainR2: 0.999697, testR2: 0.999672, dHidden: 1024 },
      ],
      finalPredictions: [
        { element: 13, predicted: 0.2012, groundTruth: 0.20 },
        { element: 37, predicted: 0.3016, groundTruth: 0.30 },
        { element: 62, predicted: 0.2465, groundTruth: 0.25 },
      ],
    },
    noise_5: {
      mfbdi: {
        suspected: [1, 2, 13, 16, 34, 37, 45, 46, 55, 56, 62, 63, 71, 74, 96, 97, 98, 100],
        top10: [
          { element: 37, value: 0.2512 },
          { element: 13, value: 0.1827 },
          { element: 62, value: 0.1664 },
          { element: 100, value: 0.1226 },
          { element: 46, value: 0.1067 },
          { element: 56, value: 0.1008 },
          { element: 97, value: 0.0935 },
          { element: 71, value: 0.0920 },
          { element: 1, value: 0.0825 },
          { element: 55, value: 0.0812 },
        ],
      },
      convergence: [
        { stage: 2, elemIn: 18, elemOut: 6, trainMSE: 0.001134, testMSE: 0.002274, trainR2: 0.945354, testR2: 0.890502, dHidden: 1024 },
        { stage: 3, elemIn: 6, elemOut: 3, trainMSE: 0.000206, testMSE: 0.000335, trainR2: 0.990095, testR2: 0.984139, dHidden: 512 },
        { stage: 4, elemIn: 3, elemOut: 3, trainMSE: 0.000027, testMSE: 0.000044, trainR2: 0.998696, testR2: 0.997839, dHidden: 256 },
      ],
      stageDetails: {
        2: { kept: [2, 13, 37, 45, 62, 98], removed: [1, 16, 34, 46, 55, 56, 63, 71, 74, 96, 97, 100] },
        3: { kept: [13, 37, 62], removed: [2, 45, 98] },
      },
      finalPredictions: [
        { element: 13, predicted: 0.2041, groundTruth: 0.20, sigma: 0.0053 },
        { element: 37, predicted: 0.2978, groundTruth: 0.30, sigma: 0.0046 },
        { element: 62, predicted: 0.2498, groundTruth: 0.25, sigma: 0.0059 },
      ],
    },
    noise_10: {
      mfbdi: {
        suspected: [1, 2, 6, 10, 13, 16, 34, 37, 45, 46, 48, 51, 55, 56, 62, 63, 64, 67, 71, 74, 96, 97, 98, 100],
        top10: [
          { element: 37, value: 0.2495 },
          { element: 62, value: 0.1656 },
          { element: 13, value: 0.1599 },
          { element: 100, value: 0.1406 },
          { element: 46, value: 0.1381 },
          { element: 56, value: 0.1182 },
          { element: 1, value: 0.1176 },
          { element: 55, value: 0.1043 },
          { element: 97, value: 0.0915 },
          { element: 2, value: 0.0903 },
        ],
      },
      convergence: [
        { stage: 2, elemIn: 24, elemOut: 14, trainMSE: 0.001933, testMSE: 0.004989, trainR2: 0.907366, testR2: 0.757400, dHidden: 1024 },
        { stage: 3, elemIn: 14, elemOut: 4, trainMSE: 0.001139, testMSE: 0.002337, trainR2: 0.945338, testR2: 0.888046, dHidden: 512 },
        { stage: 4, elemIn: 4, elemOut: 3, trainMSE: 0.000380, testMSE: 0.001174, trainR2: 0.982018, testR2: 0.942771, dHidden: 256 },
        { stage: 5, elemIn: 3, elemOut: 3, trainMSE: 0.000104, testMSE: 0.000177, trainR2: 0.994935, testR2: 0.991575, dHidden: 128 },
      ],
      stageDetails: {
        2: { kept: [10, 13, 16, 34, 37, 48, 51, 55, 62, 63, 64, 67, 98, 100], removed: [1, 2, 6, 45, 46, 56, 71, 74, 96, 97] },
        3: { kept: [13, 37, 62, 100], removed: [10, 16, 34, 48, 51, 55, 63, 64, 67, 98] },
        4: { kept: [13, 37, 62], removed: [100] },
      },
      finalPredictions: [
        { element: 13, predicted: 0.2031, groundTruth: 0.20, sigma: 0.0086 },
        { element: 37, predicted: 0.2969, groundTruth: 0.30, sigma: 0.0048 },
        { element: 62, predicted: 0.2480, groundTruth: 0.25, sigma: 0.0074 },
      ],
    },
  },

  // ────────── CASE 3: Elements 14,29,35,56,69,88 ─────────────
  case3: {
    noise_free: {
      mfbdi: {
        suspected: [14, 29, 35, 56, 69, 88],
        top10: [
          { element: 88, value: 0.5210 },
          { element: 69, value: 0.4741 },
          { element: 35, value: 0.3691 },
          { element: 14, value: 0.2938 },
          { element: 56, value: 0.2897 },
          { element: 29, value: 0.2272 },
          { element: 77, value: 0.0291 },
          { element: 99, value: 0.0167 },
          { element: 3, value: 0.0142 },
          { element: 57, value: 0.0140 },
        ],
      },
      convergence: [
        { stage: 2, elemIn: 6, elemOut: 6, trainMSE: 0.000005, testMSE: 0.000006, trainR2: 0.999738, testR2: 0.999676, dHidden: 1024 },
      ],
      finalPredictions: [
        { element: 14, predicted: 0.2522, groundTruth: 0.25 },
        { element: 29, predicted: 0.1991, groundTruth: 0.20 },
        { element: 35, predicted: 0.2990, groundTruth: 0.30 },
        { element: 56, predicted: 0.2510, groundTruth: 0.25 },
        { element: 69, predicted: 0.3493, groundTruth: 0.35 },
        { element: 88, predicted: 0.3970, groundTruth: 0.40 },
      ],
    },
    noise_5: {
      mfbdi: {
        suspected: [1, 6, 14, 27, 29, 34, 35, 39, 40, 45, 46, 55, 56, 60, 62, 63, 67, 68, 69, 75, 79, 80, 88, 93, 96, 98],
        top10: [
          { element: 35, value: 0.4377 },
          { element: 88, value: 0.3123 },
          { element: 14, value: 0.2656 },
          { element: 56, value: 0.2570 },
          { element: 69, value: 0.2107 },
          { element: 67, value: 0.1727 },
          { element: 98, value: 0.1638 },
          { element: 68, value: 0.1356 },
          { element: 60, value: 0.1269 },
          { element: 40, value: 0.1145 },
        ],
      },
      convergence: [
        { stage: 2, elemIn: 26, elemOut: 7, trainMSE: 0.000853, testMSE: 0.001648, trainR2: 0.959259, testR2: 0.920287, dHidden: 1024 },
        { stage: 3, elemIn: 7, elemOut: 6, trainMSE: 0.000088, testMSE: 0.000163, trainR2: 0.995777, testR2: 0.992040, dHidden: 512 },
        { stage: 4, elemIn: 6, elemOut: 6, trainMSE: 0.000039, testMSE: 0.000067, trainR2: 0.998131, testR2: 0.996622, dHidden: 256 },
      ],
      stageDetails: {
        2: { kept: [14, 29, 35, 56, 69, 88, 98], removed: [1, 6, 27, 34, 39, 40, 45, 46, 55, 60, 62, 63, 67, 68, 75, 79, 80, 93, 96] },
        3: { kept: [14, 29, 35, 56, 69, 88], removed: [98] },
      },
      finalPredictions: [
        { element: 14, predicted: 0.2516, groundTruth: 0.25, sigma: 0.0049 },
        { element: 29, predicted: 0.2072, groundTruth: 0.20, sigma: 0.0069 },
        { element: 35, predicted: 0.3016, groundTruth: 0.30, sigma: 0.0033 },
        { element: 56, predicted: 0.2485, groundTruth: 0.25, sigma: 0.0062 },
        { element: 69, predicted: 0.3527, groundTruth: 0.35, sigma: 0.0032 },
        { element: 88, predicted: 0.3977, groundTruth: 0.40, sigma: 0.0063 },
      ],
    },
    noise_10: {
      mfbdi: {
        suspected: [1, 5, 6, 14, 27, 29, 34, 35, 40, 44, 45, 46, 54, 55, 56, 58, 60, 62, 67, 68, 69, 74, 75, 79, 80, 87, 88, 91, 93, 96, 98],
        top10: [
          { element: 35, value: 0.4746 },
          { element: 88, value: 0.3130 },
          { element: 14, value: 0.2763 },
          { element: 56, value: 0.2500 },
          { element: 69, value: 0.2054 },
          { element: 67, value: 0.1778 },
          { element: 98, value: 0.1707 },
          { element: 46, value: 0.1520 },
          { element: 60, value: 0.1355 },
          { element: 68, value: 0.1339 },
        ],
      },
      convergence: [
        { stage: 2, elemIn: 31, elemOut: 16, trainMSE: 0.001638, testMSE: 0.003460, trainR2: 0.921810, testR2: 0.833410, dHidden: 1024 },
        { stage: 3, elemIn: 16, elemOut: 8, trainMSE: 0.000875, testMSE: 0.001683, trainR2: 0.958027, testR2: 0.918627, dHidden: 512 },
        { stage: 4, elemIn: 8, elemOut: 6, trainMSE: 0.000275, testMSE: 0.000506, trainR2: 0.986757, testR2: 0.975932, dHidden: 256 },
        { stage: 5, elemIn: 6, elemOut: 6, trainMSE: 0.000082, testMSE: 0.000142, trainR2: 0.996086, testR2: 0.993198, dHidden: 128 },
      ],
      stageDetails: {
        2: { kept: [5, 6, 14, 27, 29, 35, 45, 56, 58, 68, 69, 74, 75, 88, 91, 93], removed: [1, 34, 40, 44, 46, 54, 55, 60, 62, 67, 79, 80, 87, 96, 98] },
        3: { kept: [14, 29, 35, 56, 58, 69, 88, 93], removed: [5, 6, 27, 45, 68, 74, 75, 91] },
        4: { kept: [14, 29, 35, 56, 69, 88], removed: [58, 93] },
      },
      finalPredictions: [
        { element: 14, predicted: 0.2455, groundTruth: 0.25, sigma: 0.0088 },
        { element: 29, predicted: 0.1950, groundTruth: 0.20, sigma: 0.0079 },
        { element: 35, predicted: 0.2981, groundTruth: 0.30, sigma: 0.0055 },
        { element: 56, predicted: 0.2510, groundTruth: 0.25, sigma: 0.0042 },
        { element: 69, predicted: 0.3402, groundTruth: 0.35, sigma: 0.0055 },
        { element: 88, predicted: 0.3989, groundTruth: 0.40, sigma: 0.0086 },
      ],
    },
  },
};

// ── Sidebar navigation items ──────────────────────────────────
export const NAV_ITEMS = [
  { id: 'model-setup', label: 'Model Setup', icon: 'precision_manufacturing' },
  // { id: 'sensor-config', label: 'Sensor Configuration', icon: 'sensors' },
  { id: 'damage-config', label: 'Damage Configuration', icon: 'heart_broken' },
  { id: 'pipeline-control', label: 'Pipeline Control', icon: 'settings_input_component' },
  { id: 'stage-1-mfbdi', label: 'Stage 1: MFBDI', icon: 'analytics' },
  { id: 'stage-2-dnn', label: 'Stage 2+: DNN', icon: 'memory' },
  { id: 'convergence', label: 'Convergence', icon: 'show_chart' },
  { id: 'final-report', label: 'Final Report', icon: 'description' },
];

// ── Helper: build MFBDI bar data for 100 elements ─────────────
export function buildMFBDIBarData(caseId, noiseKey) {
  const r = RESULTS[caseId]?.[noiseKey];
  if (!r) return [];
  const dc = DAMAGE_CASES.find((c) => c.id === caseId);
  const suspectedSet = new Set(r.mfbdi.suspected);
  const damagedSet = new Set(dc.dam_e);
  const topMap = Object.fromEntries(r.mfbdi.top10.map((t) => [t.element, t.value]));

  // Seed-based deterministic RNG for background elements
  let s = 42;
  const rand = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };

  return Array.from({ length: 100 }, (_, i) => {
    const el = i + 1;
    const isDamaged = damagedSet.has(el);
    const isSuspected = suspectedSet.has(el);
    let value = topMap[el];
    if (value == null) {
      value = isSuspected ? 0.050 + rand() * 0.015 : rand() * 0.035;
    }
    return { element: el, value: Math.round(value * 10000) / 10000, isDamaged, isSuspected };
  });
}
