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
    t: 0.099451,     // Thickness (m), round-2 value (h/a = 0.063)
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
  free: 486,                              // after clamped boundary conditions
  master: MASTER_NODES.length * 6,        // 156
  slave: 486 - MASTER_NODES.length * 6,   // 330
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
  dnn_max_samples: 5000,
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

// Round-2 representative runs (h = 0.099451 m); all values from multistage_results.mat
// Round-2 representative runs (h = 0.099451 m); all values from multistage_results.mat
export const RESULTS = {
  case1: {
    noise_free: {
      mfbdi: {
        suspected: [6],
        values: [0.0, 0.0, 0.0, 0.0, 0.0, 0.1974, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0011, 0.0, 0.0017, 0.0001, 0.0, 0.0, 0.0019, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0005, 0.0, 0.0, 0.0, 0.0, 0.0004, 0.0001, 0.0, 0.0004, 0.0, 0.0002, 0.0011, 0.0, 0.0, 0.0, 0.0, 0.0011, 0.0009, 0.0003, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0002, 0.0, 0.0, 0.0003, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        top10: [
          {
            element: 6,
            value: 0.1974
          },
          {
            element: 21,
            value: 0.0019
          },
          {
            element: 17,
            value: 0.0017
          },
          {
            element: 45,
            value: 0.0011
          },
          {
            element: 15,
            value: 0.0011
          },
          {
            element: 40,
            value: 0.0011
          },
          {
            element: 46,
            value: 0.0009
          },
          {
            element: 29,
            value: 0.0005
          },
          {
            element: 34,
            value: 0.0004
          },
          {
            element: 37,
            value: 0.0004
          }
        ]
      },
      convergence: [
        {
          stage: 2,
          elemIn: 1,
          elemOut: 1,
          trainMSE: 0.0,
          testMSE: 0.0,
          trainR2: 0.999995,
          testR2: 0.999994,
          dHidden: 1024
        }
      ],
      stagePredictions: {
        2: [
          {
            element: 6,
            predicted: 0.2003,
            sigma: 0.0,
            keep: true,
            groundTruth: 0.2
          }
        ]
      },
      finalPredictions: [
        {
          element: 6,
          predicted: 0.2003,
          groundTruth: 0.2
        }
      ]
    },
    noise_5: {
      mfbdi: {
        suspected: [1, 6, 100],
        values: [0.0571, 0.0146, 0.0069, 0.0033, 0.0203, 0.0874, 0.0215, 0.0333, 0.0486, 0.0159, 0.009, 0.0244, 0.0093, 0.0191, 0.0378, 0.025, 0.0413, 0.0213, 0.0041, 0.003, 0.0259, 0.0088, 0.002, 0.0055, 0.0131, 0.0214, 0.0107, 0.0041, 0.0202, 0.0068, 0.0023, 0.0019, 0.0003, 0.0111, 0.0052, 0.0048, 0.011, 0.0149, 0.0096, 0.0013, 0.0077, 0.0065, 0.0032, 0.0063, 0.015, 0.0129, 0.0131, 0.0168, 0.0024, 0.0042, 0.0144, 0.0058, 0.0113, 0.0099, 0.0186, 0.0139, 0.0256, 0.0152, 0.0058, 0.0068, 0.0057, 0.0055, 0.0237, 0.0047, 0.0067, 0.0124, 0.0255, 0.0221, 0.0021, 0.0067, 0.0048, 0.0136, 0.019, 0.0175, 0.0053, 0.0176, 0.0128, 0.0014, 0.0131, 0.0048, 0.025, 0.0261, 0.0162, 0.0046, 0.0099, 0.0253, 0.0211, 0.0215, 0.0164, 0.0133, 0.0212, 0.0047, 0.0, 0.0, 0.0078, 0.0031, 0.0236, 0.0223, 0.0212, 0.1671],
        top10: [
          {
            element: 100,
            value: 0.1671
          },
          {
            element: 6,
            value: 0.0874
          },
          {
            element: 1,
            value: 0.0571
          },
          {
            element: 9,
            value: 0.0486
          },
          {
            element: 17,
            value: 0.0413
          },
          {
            element: 15,
            value: 0.0378
          },
          {
            element: 8,
            value: 0.0333
          },
          {
            element: 82,
            value: 0.0261
          },
          {
            element: 21,
            value: 0.0259
          },
          {
            element: 57,
            value: 0.0256
          }
        ]
      },
      convergence: [
        {
          stage: 2,
          elemIn: 3,
          elemOut: 1,
          trainMSE: 0.000403,
          testMSE: 0.00161,
          trainR2: 0.980833,
          testR2: 0.920522,
          dHidden: 1024
        },
        {
          stage: 3,
          elemIn: 1,
          elemOut: 1,
          trainMSE: 1.2e-05,
          testMSE: 2.2e-05,
          trainR2: 0.99941,
          testR2: 0.998888,
          dHidden: 512
        }
      ],
      stagePredictions: {
        2: [
          {
            element: 1,
            predicted: 0.0424,
            sigma: 0.0361,
            keep: false,
            groundTruth: 0
          },
          {
            element: 6,
            predicted: 0.2283,
            sigma: 0.0258,
            keep: true,
            groundTruth: 0.2
          },
          {
            element: 100,
            predicted: 0.0301,
            sigma: 0.0379,
            keep: false,
            groundTruth: 0
          }
        ],
        3: [
          {
            element: 6,
            predicted: 0.1977,
            sigma: 0.0045,
            keep: true,
            groundTruth: 0.2
          }
        ]
      },
      finalPredictions: [
        {
          element: 6,
          predicted: 0.1977,
          groundTruth: 0.2,
          sigma: 0.0045
        }
      ]
    },
    noise_10: {
      mfbdi: {
        suspected: [1, 6, 8, 9, 21, 57, 81, 86, 100],
        values: [0.1143, 0.0388, 0.0177, 0.0054, 0.0291, 0.1101, 0.0047, 0.0574, 0.0827, 0.0389, 0.0159, 0.0463, 0.0195, 0.0353, 0.0411, 0.0422, 0.0495, 0.0356, 0.0119, 0.0099, 0.0514, 0.0203, 0.0046, 0.012, 0.0204, 0.0317, 0.0179, 0.0079, 0.0345, 0.0137, 0.0024, 0.0043, 0.0, 0.0198, 0.0087, 0.0097, 0.0219, 0.0277, 0.0149, 0.0051, 0.0145, 0.0158, 0.0059, 0.0127, 0.0302, 0.0236, 0.0192, 0.03, 0.0062, 0.0134, 0.0263, 0.0122, 0.0242, 0.0196, 0.0406, 0.03, 0.0509, 0.0324, 0.0137, 0.0129, 0.0136, 0.0094, 0.0475, 0.0072, 0.0171, 0.0256, 0.0436, 0.0383, 0.0055, 0.0108, 0.0142, 0.0274, 0.0321, 0.0295, 0.0106, 0.0339, 0.0225, 0.0036, 0.0256, 0.0106, 0.0517, 0.0488, 0.0331, 0.0095, 0.0198, 0.0533, 0.0413, 0.0382, 0.0336, 0.0246, 0.0371, 0.008, 0.0, 0.0, 0.0129, 0.0035, 0.0216, 0.029, 0.041, 0.2653],
        top10: [
          {
            element: 100,
            value: 0.2653
          },
          {
            element: 1,
            value: 0.1143
          },
          {
            element: 6,
            value: 0.1101
          },
          {
            element: 9,
            value: 0.0827
          },
          {
            element: 8,
            value: 0.0574
          },
          {
            element: 86,
            value: 0.0533
          },
          {
            element: 81,
            value: 0.0517
          },
          {
            element: 21,
            value: 0.0514
          },
          {
            element: 57,
            value: 0.0509
          },
          {
            element: 17,
            value: 0.0495
          }
        ]
      },
      convergence: [
        {
          stage: 2,
          elemIn: 9,
          elemOut: 6,
          trainMSE: 0.000977,
          testMSE: 0.004178,
          trainR2: 0.953409,
          testR2: 0.801561,
          dHidden: 1024
        },
        {
          stage: 3,
          elemIn: 6,
          elemOut: 1,
          trainMSE: 0.000291,
          testMSE: 0.00098,
          trainR2: 0.986144,
          testR2: 0.952754,
          dHidden: 512
        },
        {
          stage: 4,
          elemIn: 1,
          elemOut: 1,
          trainMSE: 0.000127,
          testMSE: 0.000268,
          trainR2: 0.993969,
          testR2: 0.986438,
          dHidden: 256
        }
      ],
      stagePredictions: {
        2: [
          {
            element: 1,
            predicted: 0.132,
            sigma: 0.0456,
            keep: true,
            groundTruth: 0
          },
          {
            element: 6,
            predicted: 0.2069,
            sigma: 0.0295,
            keep: true,
            groundTruth: 0.2
          },
          {
            element: 8,
            predicted: 0.033,
            sigma: 0.0182,
            keep: false,
            groundTruth: 0
          },
          {
            element: 9,
            predicted: 0.1139,
            sigma: 0.038,
            keep: true,
            groundTruth: 0
          },
          {
            element: 21,
            predicted: 0.0842,
            sigma: 0.0308,
            keep: true,
            groundTruth: 0
          },
          {
            element: 57,
            predicted: 0.0712,
            sigma: 0.0332,
            keep: false,
            groundTruth: 0
          },
          {
            element: 81,
            predicted: 0.0714,
            sigma: 0.0212,
            keep: true,
            groundTruth: 0
          },
          {
            element: 86,
            predicted: 0.0569,
            sigma: 0.0222,
            keep: false,
            groundTruth: 0
          },
          {
            element: 100,
            predicted: 0.1647,
            sigma: 0.0612,
            keep: true,
            groundTruth: 0
          }
        ],
        3: [
          {
            element: 1,
            predicted: 0.0623,
            sigma: 0.0478,
            keep: false,
            groundTruth: 0
          },
          {
            element: 6,
            predicted: 0.215,
            sigma: 0.0081,
            keep: true,
            groundTruth: 0.2
          },
          {
            element: 9,
            predicted: 0.0205,
            sigma: 0.0267,
            keep: false,
            groundTruth: 0
          },
          {
            element: 21,
            predicted: 0.0353,
            sigma: 0.0376,
            keep: false,
            groundTruth: 0
          },
          {
            element: 81,
            predicted: 0.0127,
            sigma: 0.0364,
            keep: false,
            groundTruth: 0
          },
          {
            element: 100,
            predicted: 0.1054,
            sigma: 0.0555,
            keep: false,
            groundTruth: 0
          }
        ],
        4: [
          {
            element: 6,
            predicted: 0.1916,
            sigma: 0.0168,
            keep: true,
            groundTruth: 0.2
          }
        ]
      },
      finalPredictions: [
        {
          element: 6,
          predicted: 0.1916,
          groundTruth: 0.2,
          sigma: 0.0168
        }
      ]
    }
  },
  case2: {
    noise_free: {
      mfbdi: {
        suspected: [13, 37, 62],
        values: [0.002, 0.0, 0.0042, 0.0, 0.0, 0.0, 0.0, 0.0006, 0.0, 0.0, 0.0023, 0.0, 0.2131, 0.0, 0.0, 0.0, 0.0009, 0.0, 0.0, 0.0, 0.0, 0.0033, 0.0, 0.0, 0.0, 0.0, 0.0018, 0.0, 0.0005, 0.0, 0.0, 0.0, 0.0001, 0.0, 0.0, 0.0027, 0.3509, 0.0023, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0038, 0.0, 0.0008, 0.0, 0.0, 0.0004, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.001, 0.0, 0.01, 0.2748, 0.0, 0.0, 0.0, 0.0002, 0.0, 0.0003, 0.0, 0.0002, 0.0, 0.0048, 0.0, 0.0, 0.0001, 0.0, 0.0002, 0.0, 0.0022, 0.0, 0.0, 0.0, 0.0, 0.0004, 0.0, 0.0012, 0.0, 0.0003, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        top10: [
          {
            element: 37,
            value: 0.3509
          },
          {
            element: 62,
            value: 0.2748
          },
          {
            element: 13,
            value: 0.2131
          },
          {
            element: 61,
            value: 0.01
          },
          {
            element: 72,
            value: 0.0048
          },
          {
            element: 3,
            value: 0.0042
          },
          {
            element: 47,
            value: 0.0038
          },
          {
            element: 22,
            value: 0.0033
          },
          {
            element: 36,
            value: 0.0027
          },
          {
            element: 38,
            value: 0.0023
          }
        ]
      },
      convergence: [
        {
          stage: 2,
          elemIn: 3,
          elemOut: 3,
          trainMSE: 5e-06,
          testMSE: 5e-06,
          trainR2: 0.999772,
          testR2: 0.999746,
          dHidden: 1024
        }
      ],
      stagePredictions: {
        2: [
          {
            element: 13,
            predicted: 0.1993,
            sigma: 0.0,
            keep: true,
            groundTruth: 0.2
          },
          {
            element: 37,
            predicted: 0.2988,
            sigma: 0.0,
            keep: true,
            groundTruth: 0.3
          },
          {
            element: 62,
            predicted: 0.2502,
            sigma: 0.0,
            keep: true,
            groundTruth: 0.25
          }
        ]
      },
      finalPredictions: [
        {
          element: 13,
          predicted: 0.1993,
          groundTruth: 0.2
        },
        {
          element: 37,
          predicted: 0.2988,
          groundTruth: 0.3
        },
        {
          element: 62,
          predicted: 0.2502,
          groundTruth: 0.25
        }
      ]
    },
    noise_5: {
      mfbdi: {
        suspected: [1, 2, 9, 13, 37, 62, 100],
        values: [0.0941, 0.0556, 0.0096, 0.0, 0.0152, 0.041, 0.003, 0.0131, 0.1146, 0.0124, 0.0004, 0.0236, 0.1508, 0.009, 0.005, 0.0114, 0.0088, 0.028, 0.0, 0.0, 0.0385, 0.0018, 0.0053, 0.009, 0.0052, 0.0253, 0.0111, 0.0389, 0.0274, 0.0011, 0.0, 0.0195, 0.0, 0.0115, 0.0085, 0.0032, 0.2185, 0.0224, 0.006, 0.0, 0.0215, 0.0084, 0.0041, 0.0048, 0.0182, 0.0329, 0.0108, 0.0112, 0.0, 0.0082, 0.0464, 0.0078, 0.0327, 0.0103, 0.0235, 0.015, 0.0297, 0.0186, 0.0118, 0.0031, 0.0081, 0.1585, 0.03, 0.0051, 0.0161, 0.0149, 0.025, 0.0258, 0.0022, 0.0121, 0.0335, 0.0123, 0.0279, 0.0165, 0.0065, 0.0194, 0.0108, 0.0041, 0.0155, 0.0146, 0.0272, 0.025, 0.0176, 0.0054, 0.009, 0.0149, 0.0153, 0.0166, 0.0305, 0.0229, 0.0088, 0.0, 0.0, 0.0, 0.0001, 0.0025, 0.0091, 0.0124, 0.0193, 0.1704],
        top10: [
          {
            element: 37,
            value: 0.2185
          },
          {
            element: 100,
            value: 0.1704
          },
          {
            element: 62,
            value: 0.1585
          },
          {
            element: 13,
            value: 0.1508
          },
          {
            element: 9,
            value: 0.1146
          },
          {
            element: 1,
            value: 0.0941
          },
          {
            element: 2,
            value: 0.0556
          },
          {
            element: 51,
            value: 0.0464
          },
          {
            element: 6,
            value: 0.041
          },
          {
            element: 28,
            value: 0.0389
          }
        ]
      },
      convergence: [
        {
          stage: 2,
          elemIn: 7,
          elemOut: 3,
          trainMSE: 0.001351,
          testMSE: 0.003085,
          trainR2: 0.935947,
          testR2: 0.851555,
          dHidden: 1024
        },
        {
          stage: 3,
          elemIn: 3,
          elemOut: 3,
          trainMSE: 3.4e-05,
          testMSE: 5.2e-05,
          trainR2: 0.998391,
          testR2: 0.997506,
          dHidden: 512
        }
      ],
      stagePredictions: {
        2: [
          {
            element: 1,
            predicted: 0.0775,
            sigma: 0.0773,
            keep: false,
            groundTruth: 0
          },
          {
            element: 2,
            predicted: 0.0691,
            sigma: 0.0519,
            keep: false,
            groundTruth: 0
          },
          {
            element: 9,
            predicted: 0.059,
            sigma: 0.0269,
            keep: false,
            groundTruth: 0
          },
          {
            element: 13,
            predicted: 0.1907,
            sigma: 0.0302,
            keep: true,
            groundTruth: 0.2
          },
          {
            element: 37,
            predicted: 0.2912,
            sigma: 0.0173,
            keep: true,
            groundTruth: 0.3
          },
          {
            element: 62,
            predicted: 0.2643,
            sigma: 0.0265,
            keep: true,
            groundTruth: 0.25
          },
          {
            element: 100,
            predicted: 0.0126,
            sigma: 0.0521,
            keep: false,
            groundTruth: 0
          }
        ],
        3: [
          {
            element: 13,
            predicted: 0.2028,
            sigma: 0.0026,
            keep: true,
            groundTruth: 0.2
          },
          {
            element: 37,
            predicted: 0.2995,
            sigma: 0.003,
            keep: true,
            groundTruth: 0.3
          },
          {
            element: 62,
            predicted: 0.2512,
            sigma: 0.0038,
            keep: true,
            groundTruth: 0.25
          }
        ]
      },
      finalPredictions: [
        {
          element: 13,
          predicted: 0.2028,
          groundTruth: 0.2,
          sigma: 0.0026
        },
        {
          element: 37,
          predicted: 0.2995,
          groundTruth: 0.3,
          sigma: 0.003
        },
        {
          element: 62,
          predicted: 0.2512,
          groundTruth: 0.25,
          sigma: 0.0038
        }
      ]
    },
    noise_10: {
      mfbdi: {
        suspected: [1, 2, 6, 9, 13, 21, 37, 46, 51, 57, 62, 63, 81, 100],
        values: [0.1494, 0.0756, 0.0214, 0.0029, 0.0286, 0.0747, 0.0012, 0.0258, 0.1438, 0.0347, 0.0123, 0.0453, 0.1249, 0.0237, 0.0138, 0.0249, 0.0168, 0.0437, 0.0084, 0.0021, 0.0668, 0.0106, 0.0071, 0.0146, 0.0113, 0.0295, 0.0201, 0.0405, 0.0426, 0.0074, 0.0, 0.0268, 0.0, 0.0202, 0.0129, 0.0087, 0.1926, 0.0366, 0.0122, 0.0016, 0.0309, 0.0181, 0.0076, 0.01, 0.0325, 0.0534, 0.0165, 0.0257, 0.0015, 0.0218, 0.0644, 0.0146, 0.0419, 0.0199, 0.0472, 0.0332, 0.0541, 0.0364, 0.0197, 0.0085, 0.0175, 0.146, 0.0545, 0.0075, 0.0283, 0.0275, 0.0457, 0.0424, 0.0077, 0.0164, 0.0421, 0.0263, 0.0399, 0.0282, 0.0121, 0.0365, 0.0187, 0.0066, 0.0262, 0.0182, 0.0567, 0.0456, 0.0349, 0.0093, 0.0184, 0.0383, 0.033, 0.029, 0.048, 0.0363, 0.0245, 0.0, 0.0, 0.0, 0.004, 0.0027, 0.0104, 0.0198, 0.0404, 0.2689],
        top10: [
          {
            element: 100,
            value: 0.2689
          },
          {
            element: 37,
            value: 0.1926
          },
          {
            element: 1,
            value: 0.1494
          },
          {
            element: 62,
            value: 0.146
          },
          {
            element: 9,
            value: 0.1438
          },
          {
            element: 13,
            value: 0.1249
          },
          {
            element: 2,
            value: 0.0756
          },
          {
            element: 6,
            value: 0.0747
          },
          {
            element: 21,
            value: 0.0668
          },
          {
            element: 51,
            value: 0.0644
          }
        ]
      },
      convergence: [
        {
          stage: 2,
          elemIn: 14,
          elemOut: 9,
          trainMSE: 0.001974,
          testMSE: 0.005606,
          trainR2: 0.905534,
          testR2: 0.724396,
          dHidden: 1024
        },
        {
          stage: 3,
          elemIn: 9,
          elemOut: 5,
          trainMSE: 0.001236,
          testMSE: 0.002972,
          trainR2: 0.940693,
          testR2: 0.855044,
          dHidden: 512
        },
        {
          stage: 4,
          elemIn: 5,
          elemOut: 4,
          trainMSE: 0.00084,
          testMSE: 0.002695,
          trainR2: 0.95932,
          testR2: 0.867317,
          dHidden: 256
        },
        {
          stage: 5,
          elemIn: 4,
          elemOut: 3,
          trainMSE: 0.000123,
          testMSE: 0.000472,
          trainR2: 0.994167,
          testR2: 0.977291,
          dHidden: 128
        },
        {
          stage: 6,
          elemIn: 3,
          elemOut: 3,
          trainMSE: 4.5e-05,
          testMSE: 7.5e-05,
          trainR2: 0.997841,
          testR2: 0.996286,
          dHidden: 128
        }
      ],
      stagePredictions: {
        2: [
          {
            element: 1,
            predicted: 0.3036,
            sigma: 0.0629,
            keep: true,
            groundTruth: 0
          },
          {
            element: 2,
            predicted: 0.1443,
            sigma: 0.0422,
            keep: true,
            groundTruth: 0
          },
          {
            element: 6,
            predicted: 0.0839,
            sigma: 0.0321,
            keep: true,
            groundTruth: 0
          },
          {
            element: 9,
            predicted: 0.1988,
            sigma: 0.0418,
            keep: true,
            groundTruth: 0
          },
          {
            element: 13,
            predicted: 0.1454,
            sigma: 0.02,
            keep: true,
            groundTruth: 0.2
          },
          {
            element: 21,
            predicted: 0.0732,
            sigma: 0.0372,
            keep: false,
            groundTruth: 0
          },
          {
            element: 37,
            predicted: 0.2413,
            sigma: 0.0205,
            keep: true,
            groundTruth: 0.3
          },
          {
            element: 46,
            predicted: 0.0652,
            sigma: 0.0266,
            keep: false,
            groundTruth: 0
          },
          {
            element: 51,
            predicted: 0.1081,
            sigma: 0.0231,
            keep: true,
            groundTruth: 0
          },
          {
            element: 57,
            predicted: 0.047,
            sigma: 0.018,
            keep: false,
            groundTruth: 0
          },
          {
            element: 62,
            predicted: 0.2382,
            sigma: 0.0429,
            keep: true,
            groundTruth: 0.25
          },
          {
            element: 63,
            predicted: 0.0714,
            sigma: 0.0303,
            keep: false,
            groundTruth: 0
          },
          {
            element: 81,
            predicted: 0.0942,
            sigma: 0.0511,
            keep: false,
            groundTruth: 0
          },
          {
            element: 100,
            predicted: 0.2087,
            sigma: 0.0528,
            keep: true,
            groundTruth: 0
          }
        ],
        3: [
          {
            element: 1,
            predicted: 0.1728,
            sigma: 0.0337,
            keep: true,
            groundTruth: 0
          },
          {
            element: 2,
            predicted: 0.0918,
            sigma: 0.0497,
            keep: false,
            groundTruth: 0
          },
          {
            element: 6,
            predicted: -0.0016,
            sigma: 0.0186,
            keep: false,
            groundTruth: 0
          },
          {
            element: 9,
            predicted: 0.0555,
            sigma: 0.0486,
            keep: false,
            groundTruth: 0
          },
          {
            element: 13,
            predicted: 0.1621,
            sigma: 0.0414,
            keep: true,
            groundTruth: 0.2
          },
          {
            element: 37,
            predicted: 0.2583,
            sigma: 0.0206,
            keep: true,
            groundTruth: 0.3
          },
          {
            element: 51,
            predicted: 0.0466,
            sigma: 0.0139,
            keep: false,
            groundTruth: 0
          },
          {
            element: 62,
            predicted: 0.2259,
            sigma: 0.0155,
            keep: true,
            groundTruth: 0.25
          },
          {
            element: 100,
            predicted: 0.1108,
            sigma: 0.0531,
            keep: true,
            groundTruth: 0
          }
        ],
        4: [
          {
            element: 1,
            predicted: 0.0763,
            sigma: 0.0432,
            keep: false,
            groundTruth: 0
          },
          {
            element: 13,
            predicted: 0.2065,
            sigma: 0.0195,
            keep: true,
            groundTruth: 0.2
          },
          {
            element: 37,
            predicted: 0.3032,
            sigma: 0.0091,
            keep: true,
            groundTruth: 0.3
          },
          {
            element: 62,
            predicted: 0.2443,
            sigma: 0.0133,
            keep: true,
            groundTruth: 0.25
          },
          {
            element: 100,
            predicted: 0.0911,
            sigma: 0.0196,
            keep: true,
            groundTruth: 0
          }
        ],
        5: [
          {
            element: 13,
            predicted: 0.2027,
            sigma: 0.0046,
            keep: true,
            groundTruth: 0.2
          },
          {
            element: 37,
            predicted: 0.3104,
            sigma: 0.0035,
            keep: true,
            groundTruth: 0.3
          },
          {
            element: 62,
            predicted: 0.2462,
            sigma: 0.0029,
            keep: true,
            groundTruth: 0.25
          },
          {
            element: 100,
            predicted: 0.0519,
            sigma: 0.0197,
            keep: false,
            groundTruth: 0
          }
        ],
        6: [
          {
            element: 13,
            predicted: 0.1993,
            sigma: 0.0058,
            keep: true,
            groundTruth: 0.2
          },
          {
            element: 37,
            predicted: 0.3035,
            sigma: 0.0055,
            keep: true,
            groundTruth: 0.3
          },
          {
            element: 62,
            predicted: 0.2504,
            sigma: 0.004,
            keep: true,
            groundTruth: 0.25
          }
        ]
      },
      finalPredictions: [
        {
          element: 13,
          predicted: 0.1993,
          groundTruth: 0.2,
          sigma: 0.0058
        },
        {
          element: 37,
          predicted: 0.3035,
          groundTruth: 0.3,
          sigma: 0.0055
        },
        {
          element: 62,
          predicted: 0.2504,
          groundTruth: 0.25,
          sigma: 0.004
        }
      ]
    }
  },
  case3: {
    noise_free: {
      mfbdi: {
        suspected: [14, 29, 35, 56, 69, 88],
        values: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.2728, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0059, 0.0, 0.0002, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.2133, 0.0018, 0.0034, 0.0, 0.0, 0.0024, 0.3525, 0.0009, 0.0, 0.0, 0.0, 0.0, 0.0028, 0.002, 0.0, 0.0, 0.0071, 0.0029, 0.0, 0.0, 0.0, 0.0, 0.0061, 0.0055, 0.0, 0.0006, 0.0, 0.2865, 0.0, 0.0, 0.0004, 0.0, 0.0032, 0.0, 0.0, 0.0, 0.0, 0.005, 0.0, 0.0, 0.4056, 0.0274, 0.0, 0.0007, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0058, 0.0033, 0.0, 0.0, 0.0, 0.0016, 0.0, 0.0, 0.0, 0.46, 0.0, 0.0112, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0199],
        top10: [
          {
            element: 88,
            value: 0.46
          },
          {
            element: 69,
            value: 0.4056
          },
          {
            element: 35,
            value: 0.3525
          },
          {
            element: 56,
            value: 0.2865
          },
          {
            element: 14,
            value: 0.2728
          },
          {
            element: 29,
            value: 0.2133
          },
          {
            element: 70,
            value: 0.0274
          },
          {
            element: 100,
            value: 0.0199
          },
          {
            element: 90,
            value: 0.0112
          },
          {
            element: 45,
            value: 0.0071
          }
        ]
      },
      convergence: [
        {
          stage: 2,
          elemIn: 6,
          elemOut: 6,
          trainMSE: 5e-06,
          testMSE: 6e-06,
          trainR2: 0.999773,
          testR2: 0.999721,
          dHidden: 1024
        }
      ],
      stagePredictions: {
        2: [
          {
            element: 14,
            predicted: 0.2473,
            sigma: 0.0,
            keep: true,
            groundTruth: 0.25
          },
          {
            element: 29,
            predicted: 0.1978,
            sigma: 0.0,
            keep: true,
            groundTruth: 0.2
          },
          {
            element: 35,
            predicted: 0.3,
            sigma: 0.0,
            keep: true,
            groundTruth: 0.3
          },
          {
            element: 56,
            predicted: 0.2515,
            sigma: 0.0,
            keep: true,
            groundTruth: 0.25
          },
          {
            element: 69,
            predicted: 0.3499,
            sigma: 0.0,
            keep: true,
            groundTruth: 0.35
          },
          {
            element: 88,
            predicted: 0.4023,
            sigma: 0.0,
            keep: true,
            groundTruth: 0.4
          }
        ]
      },
      finalPredictions: [
        {
          element: 14,
          predicted: 0.2473,
          groundTruth: 0.25
        },
        {
          element: 29,
          predicted: 0.1978,
          groundTruth: 0.2
        },
        {
          element: 35,
          predicted: 0.3,
          groundTruth: 0.3
        },
        {
          element: 56,
          predicted: 0.2515,
          groundTruth: 0.25
        },
        {
          element: 69,
          predicted: 0.3499,
          groundTruth: 0.35
        },
        {
          element: 88,
          predicted: 0.4023,
          groundTruth: 0.4
        }
      ]
    },
    noise_5: {
      mfbdi: {
        suspected: [14, 29, 35, 51, 56, 58, 69, 80, 88, 97, 98, 99],
        values: [0.0443, 0.0255, 0.0, 0.0, 0.0116, 0.0242, 0.0, 0.0, 0.0326, 0.0389, 0.0045, 0.0322, 0.002, 0.2142, 0.0075, 0.0059, 0.0288, 0.0182, 0.0048, 0.0391, 0.0064, 0.0166, 0.0053, 0.0043, 0.0007, 0.0004, 0.0, 0.0108, 0.1003, 0.0353, 0.006, 0.0087, 0.0024, 0.0078, 0.3097, 0.0074, 0.0001, 0.0274, 0.0262, 0.0228, 0.027, 0.0116, 0.0111, 0.0306, 0.038, 0.0132, 0.0103, 0.0026, 0.0034, 0.0044, 0.0841, 0.0165, 0.0138, 0.0076, 0.0318, 0.2435, 0.0265, 0.0657, 0.0019, 0.0492, 0.0278, 0.0186, 0.007, 0.0066, 0.0234, 0.0146, 0.0135, 0.0274, 0.1805, 0.0271, 0.0066, 0.0158, 0.0052, 0.0143, 0.0, 0.0, 0.0107, 0.0113, 0.0178, 0.0649, 0.0062, 0.0211, 0.0113, 0.0, 0.0015, 0.0028, 0.049, 0.3467, 0.0079, 0.0057, 0.0287, 0.0025, 0.0, 0.0, 0.0, 0.0, 0.123, 0.088, 0.1512, 0.0224],
        top10: [
          {
            element: 88,
            value: 0.3467
          },
          {
            element: 35,
            value: 0.3097
          },
          {
            element: 56,
            value: 0.2435
          },
          {
            element: 14,
            value: 0.2142
          },
          {
            element: 69,
            value: 0.1805
          },
          {
            element: 99,
            value: 0.1512
          },
          {
            element: 97,
            value: 0.123
          },
          {
            element: 29,
            value: 0.1003
          },
          {
            element: 98,
            value: 0.088
          },
          {
            element: 51,
            value: 0.0841
          }
        ]
      },
      convergence: [
        {
          stage: 2,
          elemIn: 12,
          elemOut: 7,
          trainMSE: 0.001129,
          testMSE: 0.00256,
          trainR2: 0.945385,
          testR2: 0.876134,
          dHidden: 1024
        },
        {
          stage: 3,
          elemIn: 7,
          elemOut: 6,
          trainMSE: 0.000327,
          testMSE: 0.000785,
          trainR2: 0.98438,
          testR2: 0.961547,
          dHidden: 512
        },
        {
          stage: 4,
          elemIn: 6,
          elemOut: 6,
          trainMSE: 4.9e-05,
          testMSE: 9.4e-05,
          trainR2: 0.997632,
          testR2: 0.995237,
          dHidden: 256
        }
      ],
      stagePredictions: {
        2: [
          {
            element: 14,
            predicted: 0.2331,
            sigma: 0.0269,
            keep: true,
            groundTruth: 0.25
          },
          {
            element: 29,
            predicted: 0.168,
            sigma: 0.0324,
            keep: true,
            groundTruth: 0.2
          },
          {
            element: 35,
            predicted: 0.3099,
            sigma: 0.0141,
            keep: true,
            groundTruth: 0.3
          },
          {
            element: 51,
            predicted: 0.0063,
            sigma: 0.0197,
            keep: false,
            groundTruth: 0
          },
          {
            element: 56,
            predicted: 0.2718,
            sigma: 0.019,
            keep: true,
            groundTruth: 0.25
          },
          {
            element: 58,
            predicted: -0.0225,
            sigma: 0.0293,
            keep: false,
            groundTruth: 0
          },
          {
            element: 69,
            predicted: 0.3296,
            sigma: 0.022,
            keep: true,
            groundTruth: 0.35
          },
          {
            element: 80,
            predicted: 0.0285,
            sigma: 0.0198,
            keep: false,
            groundTruth: 0
          },
          {
            element: 88,
            predicted: 0.2997,
            sigma: 0.0263,
            keep: true,
            groundTruth: 0.4
          },
          {
            element: 97,
            predicted: 0.066,
            sigma: 0.0269,
            keep: false,
            groundTruth: 0
          },
          {
            element: 98,
            predicted: -0.0215,
            sigma: 0.0396,
            keep: false,
            groundTruth: 0
          },
          {
            element: 99,
            predicted: 0.1299,
            sigma: 0.0546,
            keep: true,
            groundTruth: 0
          }
        ],
        3: [
          {
            element: 14,
            predicted: 0.2635,
            sigma: 0.0109,
            keep: true,
            groundTruth: 0.25
          },
          {
            element: 29,
            predicted: 0.1853,
            sigma: 0.018,
            keep: true,
            groundTruth: 0.2
          },
          {
            element: 35,
            predicted: 0.2809,
            sigma: 0.009,
            keep: true,
            groundTruth: 0.3
          },
          {
            element: 56,
            predicted: 0.239,
            sigma: 0.0085,
            keep: true,
            groundTruth: 0.25
          },
          {
            element: 69,
            predicted: 0.3376,
            sigma: 0.0127,
            keep: true,
            groundTruth: 0.35
          },
          {
            element: 88,
            predicted: 0.3937,
            sigma: 0.0281,
            keep: true,
            groundTruth: 0.4
          },
          {
            element: 99,
            predicted: 0.0341,
            sigma: 0.0447,
            keep: false,
            groundTruth: 0
          }
        ],
        4: [
          {
            element: 14,
            predicted: 0.248,
            sigma: 0.0057,
            keep: true,
            groundTruth: 0.25
          },
          {
            element: 29,
            predicted: 0.2093,
            sigma: 0.0049,
            keep: true,
            groundTruth: 0.2
          },
          {
            element: 35,
            predicted: 0.2985,
            sigma: 0.002,
            keep: true,
            groundTruth: 0.3
          },
          {
            element: 56,
            predicted: 0.2452,
            sigma: 0.0036,
            keep: true,
            groundTruth: 0.25
          },
          {
            element: 69,
            predicted: 0.3551,
            sigma: 0.0058,
            keep: true,
            groundTruth: 0.35
          },
          {
            element: 88,
            predicted: 0.3932,
            sigma: 0.0081,
            keep: true,
            groundTruth: 0.4
          }
        ]
      },
      finalPredictions: [
        {
          element: 14,
          predicted: 0.248,
          groundTruth: 0.25,
          sigma: 0.0057
        },
        {
          element: 29,
          predicted: 0.2093,
          groundTruth: 0.2,
          sigma: 0.0049
        },
        {
          element: 35,
          predicted: 0.2985,
          groundTruth: 0.3,
          sigma: 0.002
        },
        {
          element: 56,
          predicted: 0.2452,
          groundTruth: 0.25,
          sigma: 0.0036
        },
        {
          element: 69,
          predicted: 0.3551,
          groundTruth: 0.35,
          sigma: 0.0058
        },
        {
          element: 88,
          predicted: 0.3932,
          groundTruth: 0.4,
          sigma: 0.0081
        }
      ]
    },
    noise_10: {
      mfbdi: {
        suspected: [1, 2, 9, 10, 11, 12, 14, 17, 20, 29, 30, 35, 38, 44, 45, 47, 56, 60, 69, 79, 83, 88, 97, 98, 99],
        values: [0.2676, 0.0531, 0.0114, 0.0124, 0.0047, 0.0, 0.0, 0.0056, 0.0566, 0.106, 0.0512, 0.0675, 0.0199, 0.1563, 0.0163, 0.0288, 0.0596, 0.0351, 0.0363, 0.0841, 0.0133, 0.0169, 0.0177, 0.0075, 0.015, 0.0018, 0.009, 0.024, 0.0735, 0.0613, 0.0, 0.0199, 0.0184, 0.0368, 0.2902, 0.0086, 0.03, 0.0616, 0.0342, 0.007, 0.0411, 0.0397, 0.0024, 0.0511, 0.0886, 0.0436, 0.0532, 0.022, 0.0175, 0.0199, 0.0287, 0.0194, 0.0128, 0.0144, 0.0232, 0.1917, 0.0379, 0.0393, 0.0226, 0.0995, 0.0192, 0.0192, 0.0305, 0.045, 0.0247, 0.0115, 0.0356, 0.0237, 0.1901, 0.0252, 0.0169, 0.0326, 0.0302, 0.0061, 0.0112, 0.0146, 0.0137, 0.0263, 0.0523, 0.0088, 0.0319, 0.0202, 0.0525, 0.0044, 0.0334, 0.0142, 0.0379, 0.3375, 0.0381, 0.0016, 0.006, 0.0102, 0.0, 0.0, 0.0, 0.0, 0.1061, 0.0736, 0.1788, 0.0075],
        top10: [
          {
            element: 88,
            value: 0.3375
          },
          {
            element: 35,
            value: 0.2902
          },
          {
            element: 1,
            value: 0.2676
          },
          {
            element: 56,
            value: 0.1917
          },
          {
            element: 69,
            value: 0.1901
          },
          {
            element: 99,
            value: 0.1788
          },
          {
            element: 14,
            value: 0.1563
          },
          {
            element: 97,
            value: 0.1061
          },
          {
            element: 10,
            value: 0.106
          },
          {
            element: 60,
            value: 0.0995
          }
        ]
      },
      convergence: [
        {
          stage: 2,
          elemIn: 25,
          elemOut: 14,
          trainMSE: 0.002039,
          testMSE: 0.006748,
          trainR2: 0.902567,
          testR2: 0.678066,
          dHidden: 1024
        },
        {
          stage: 3,
          elemIn: 14,
          elemOut: 8,
          trainMSE: 0.001751,
          testMSE: 0.006021,
          trainR2: 0.91498,
          testR2: 0.712849,
          dHidden: 512
        },
        {
          stage: 4,
          elemIn: 8,
          elemOut: 6,
          trainMSE: 0.000333,
          testMSE: 0.001068,
          trainR2: 0.984172,
          testR2: 0.950598,
          dHidden: 256
        },
        {
          stage: 5,
          elemIn: 6,
          elemOut: 6,
          trainMSE: 8.6e-05,
          testMSE: 0.000164,
          trainR2: 0.995897,
          testR2: 0.991977,
          dHidden: 128
        }
      ],
      stagePredictions: {
        2: [
          {
            element: 1,
            predicted: 0.2962,
            sigma: 0.1115,
            keep: true,
            groundTruth: 0
          },
          {
            element: 2,
            predicted: 0.0246,
            sigma: 0.0577,
            keep: false,
            groundTruth: 0
          },
          {
            element: 9,
            predicted: 0.0116,
            sigma: 0.0759,
            keep: false,
            groundTruth: 0
          },
          {
            element: 10,
            predicted: 0.3196,
            sigma: 0.0956,
            keep: true,
            groundTruth: 0
          },
          {
            element: 11,
            predicted: 0.1906,
            sigma: 0.0757,
            keep: true,
            groundTruth: 0
          },
          {
            element: 12,
            predicted: 0.013,
            sigma: 0.0518,
            keep: false,
            groundTruth: 0
          },
          {
            element: 14,
            predicted: 0.2795,
            sigma: 0.0447,
            keep: true,
            groundTruth: 0.25
          },
          {
            element: 17,
            predicted: 0.0599,
            sigma: 0.0646,
            keep: false,
            groundTruth: 0
          },
          {
            element: 20,
            predicted: 0.1106,
            sigma: 0.0327,
            keep: true,
            groundTruth: 0
          },
          {
            element: 29,
            predicted: 0.2285,
            sigma: 0.0717,
            keep: true,
            groundTruth: 0.2
          },
          {
            element: 30,
            predicted: 0.0661,
            sigma: 0.0356,
            keep: false,
            groundTruth: 0
          },
          {
            element: 35,
            predicted: 0.4151,
            sigma: 0.0364,
            keep: true,
            groundTruth: 0.3
          },
          {
            element: 38,
            predicted: 0.0605,
            sigma: 0.0347,
            keep: false,
            groundTruth: 0
          },
          {
            element: 44,
            predicted: 0.1034,
            sigma: 0.0453,
            keep: true,
            groundTruth: 0
          },
          {
            element: 45,
            predicted: 0.0783,
            sigma: 0.0567,
            keep: false,
            groundTruth: 0
          },
          {
            element: 47,
            predicted: 0.0718,
            sigma: 0.0383,
            keep: false,
            groundTruth: 0
          },
          {
            element: 56,
            predicted: 0.2902,
            sigma: 0.0207,
            keep: true,
            groundTruth: 0.25
          },
          {
            element: 60,
            predicted: 0.0435,
            sigma: 0.0467,
            keep: false,
            groundTruth: 0
          },
          {
            element: 69,
            predicted: 0.4395,
            sigma: 0.0767,
            keep: true,
            groundTruth: 0.35
          },
          {
            element: 79,
            predicted: 0.0206,
            sigma: 0.0551,
            keep: false,
            groundTruth: 0
          },
          {
            element: 83,
            predicted: 0.1541,
            sigma: 0.0518,
            keep: true,
            groundTruth: 0
          },
          {
            element: 88,
            predicted: 0.3408,
            sigma: 0.093,
            keep: true,
            groundTruth: 0.4
          },
          {
            element: 97,
            predicted: 0.1084,
            sigma: 0.0818,
            keep: false,
            groundTruth: 0
          },
          {
            element: 98,
            predicted: 0.1196,
            sigma: 0.0637,
            keep: true,
            groundTruth: 0
          },
          {
            element: 99,
            predicted: 0.2738,
            sigma: 0.0787,
            keep: true,
            groundTruth: 0
          }
        ],
        3: [
          {
            element: 1,
            predicted: 0.1636,
            sigma: 0.0467,
            keep: true,
            groundTruth: 0
          },
          {
            element: 10,
            predicted: 0.103,
            sigma: 0.0584,
            keep: false,
            groundTruth: 0
          },
          {
            element: 11,
            predicted: 0.1157,
            sigma: 0.0871,
            keep: false,
            groundTruth: 0
          },
          {
            element: 14,
            predicted: 0.264,
            sigma: 0.0167,
            keep: true,
            groundTruth: 0.25
          },
          {
            element: 20,
            predicted: 0.0834,
            sigma: 0.0427,
            keep: false,
            groundTruth: 0
          },
          {
            element: 29,
            predicted: 0.1924,
            sigma: 0.0325,
            keep: true,
            groundTruth: 0.2
          },
          {
            element: 35,
            predicted: 0.3458,
            sigma: 0.0327,
            keep: true,
            groundTruth: 0.3
          },
          {
            element: 44,
            predicted: -0.0044,
            sigma: 0.0398,
            keep: false,
            groundTruth: 0
          },
          {
            element: 56,
            predicted: 0.2078,
            sigma: 0.0346,
            keep: true,
            groundTruth: 0.25
          },
          {
            element: 69,
            predicted: 0.3178,
            sigma: 0.0319,
            keep: true,
            groundTruth: 0.35
          },
          {
            element: 83,
            predicted: 0.039,
            sigma: 0.05,
            keep: false,
            groundTruth: 0
          },
          {
            element: 88,
            predicted: 0.3565,
            sigma: 0.0574,
            keep: true,
            groundTruth: 0.4
          },
          {
            element: 98,
            predicted: 0.1233,
            sigma: 0.0594,
            keep: true,
            groundTruth: 0
          },
          {
            element: 99,
            predicted: 0.1042,
            sigma: 0.0624,
            keep: false,
            groundTruth: 0
          }
        ],
        4: [
          {
            element: 1,
            predicted: 0.0667,
            sigma: 0.0284,
            keep: false,
            groundTruth: 0
          },
          {
            element: 14,
            predicted: 0.2521,
            sigma: 0.0112,
            keep: true,
            groundTruth: 0.25
          },
          {
            element: 29,
            predicted: 0.1952,
            sigma: 0.0179,
            keep: true,
            groundTruth: 0.2
          },
          {
            element: 35,
            predicted: 0.3012,
            sigma: 0.0067,
            keep: true,
            groundTruth: 0.3
          },
          {
            element: 56,
            predicted: 0.2518,
            sigma: 0.0092,
            keep: true,
            groundTruth: 0.25
          },
          {
            element: 69,
            predicted: 0.3579,
            sigma: 0.0086,
            keep: true,
            groundTruth: 0.35
          },
          {
            element: 88,
            predicted: 0.4151,
            sigma: 0.0266,
            keep: true,
            groundTruth: 0.4
          },
          {
            element: 98,
            predicted: -0.0004,
            sigma: 0.0146,
            keep: false,
            groundTruth: 0
          }
        ],
        5: [
          {
            element: 14,
            predicted: 0.2525,
            sigma: 0.0063,
            keep: true,
            groundTruth: 0.25
          },
          {
            element: 29,
            predicted: 0.1987,
            sigma: 0.0105,
            keep: true,
            groundTruth: 0.2
          },
          {
            element: 35,
            predicted: 0.3007,
            sigma: 0.0028,
            keep: true,
            groundTruth: 0.3
          },
          {
            element: 56,
            predicted: 0.2433,
            sigma: 0.0018,
            keep: true,
            groundTruth: 0.25
          },
          {
            element: 69,
            predicted: 0.35,
            sigma: 0.0082,
            keep: true,
            groundTruth: 0.35
          },
          {
            element: 88,
            predicted: 0.3989,
            sigma: 0.01,
            keep: true,
            groundTruth: 0.4
          }
        ]
      },
      finalPredictions: [
        {
          element: 14,
          predicted: 0.2525,
          groundTruth: 0.25,
          sigma: 0.0063
        },
        {
          element: 29,
          predicted: 0.1987,
          groundTruth: 0.2,
          sigma: 0.0105
        },
        {
          element: 35,
          predicted: 0.3007,
          groundTruth: 0.3,
          sigma: 0.0028
        },
        {
          element: 56,
          predicted: 0.2433,
          groundTruth: 0.25,
          sigma: 0.0018
        },
        {
          element: 69,
          predicted: 0.35,
          groundTruth: 0.35,
          sigma: 0.0082
        },
        {
          element: 88,
          predicted: 0.3989,
          groundTruth: 0.4,
          sigma: 0.01
        }
      ]
    }
  }
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
  // MFBDI of all 100 elements, as computed by the pipeline (no interpolated values)
  const values = r.mfbdi.values ?? [];

  return Array.from({ length: 100 }, (_, i) => {
    const el = i + 1;
    return {
      element: el,
      value: values[i] ?? 0,
      isDamaged: damagedSet.has(el),
      isSuspected: suspectedSet.has(el),
    };
  });
}
