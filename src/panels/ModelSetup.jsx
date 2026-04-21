import { useState } from 'react';
import { SPHERICAL_SHELL, MASTER_NODES, MESH, DOF } from '../data/sphericalData';

export default function ModelSetup() {
  const [overlay, setOverlay] = useState({ elements: true, nodes: false, bc: false });

  const mat = SPHERICAL_SHELL.material;
  const geo = SPHERICAL_SHELL.geometry;

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <h1 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight">
        Model Setup
      </h1>

      <div className="grid grid-cols-12 gap-6">
        {/* ── Left: 3D Mesh Viewer ──────────────────────────── */}
        <div className="col-span-8">
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 overflow-hidden min-h-[500px] flex flex-col">
            {/* Header bar */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-outline-variant/15">
              <span className="material-symbols-outlined text-primary text-xl">view_in_ar</span>
              <span className="font-headline font-bold text-sm text-on-surface">
                Mesh Preview: Spherical Shell
              </span>
              <div className="ml-auto flex gap-1">
                {['Elements', 'Nodes', 'BC'].map((key) => {
                  const k = key.toLowerCase();
                  const active = overlay[k];
                  return (
                    <button
                      key={k}
                      onClick={() => setOverlay((o) => ({ ...o, [k]: !o[k] }))}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                        active
                          ? 'bg-primary text-on-primary'
                          : 'bg-surface-container-low text-on-surface-variant'
                      }`}
                    >
                      {key}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mesh area */}
            <div className="flex-1 relative bg-surface-container-lowest">
              {/* Spherical shell FEM mesh image */}
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <img
                  src="/home.png"
                  alt="Spherical shell FEM mesh with clamped boundary conditions, showing element grid with dimensions a, b, h and radius R"
                  className="max-w-full max-h-full object-contain drop-shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Config Cards ───────────────────────────── */}
        <div className="col-span-4 space-y-4">
          {/* Material Properties */}
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/15">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary text-lg">science</span>
              <h3 className="font-headline font-bold text-sm text-on-surface">Material Properties</h3>
            </div>
            <div className="space-y-3">
              <InputField label="E (GPa)" value={(mat.E / 1e9).toFixed(1)} />
              <InputField label="Poisson (ν)" value={mat.nuy} />
              <InputField label="Density (kg/m³)" value={mat.rho} />
              <InputField label="Thickness (m)" value={mat.t} />
            </div>
          </div>

          {/* Geometric Parameters */}
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/15">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary text-lg">straighten</span>
              <h3 className="font-headline font-bold text-sm text-on-surface">Geometric Parameters</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <InputField label="lx (m)" value={geo.lx} />
              <InputField label="ly (m)" value={geo.ly} />
              <InputField label="R (m)" value={geo.R} />
              <div /> {/* spacer */}
              <InputField label="nx" value={MESH.nx} />
              <InputField label="ny" value={MESH.ny} />
            </div>
          </div>

          {/* Sensor Placement */}
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/15">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary text-lg">sensors</span>
              <h3 className="font-headline font-bold text-sm text-on-surface">Sensor Placement</h3>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-semibold text-on-surface">
                Master Nodes ({MASTER_NODES.length})
              </span>
              <span className="px-2 py-0.5 rounded-full bg-tertiary/15 text-tertiary text-[10px] font-bold uppercase">
                Auto-Distributed
              </span>
            </div>

            {/* Node chips */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {MASTER_NODES.map((id) => (
                <span
                  key={id}
                  className="inline-flex items-center justify-center w-9 h-7 rounded bg-primary/10 text-primary font-mono text-xs font-bold"
                >
                  {id}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-outline-variant/15">
              <div>
                <p className="text-[10px] font-bold text-on-surface-variant uppercase mb-1">Total DOF</p>
                <p className="text-xl font-headline font-extrabold text-on-surface font-mono">{DOF.total}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-on-surface-variant uppercase mb-1">Master DOF</p>
                <p className="text-xl font-headline font-extrabold text-primary font-mono">{DOF.master}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Helpers ─────────────────────────────────────────────── */

function InputField({ label, value }) {
  const [val, setVal] = useState(String(value));
  return (
    <div>
      <label className="text-[10px] font-bold text-on-surface-variant uppercase mb-1 block">
        {label}
      </label>
      <input
        type="text"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        className="w-full bg-surface-container-low border-none rounded p-2 font-mono text-sm text-on-surface focus:ring-1 focus:ring-primary outline-none"
      />
    </div>
  );
}
