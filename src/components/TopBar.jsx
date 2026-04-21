import Icon from './Icon';
import { DAMAGE_CASES, NOISE_PRESETS } from '../data/sphericalData';

export default function TopBar({
  activeCaseId,
  noiseKey,
  onCaseChange,
  onNoiseChange,
}) {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between bg-surface-container-lowest px-6"
      style={{ borderBottom: '1px solid color-mix(in srgb, var(--color-outline-variant) 40%, transparent)' }}
    >
      {/* Left: Title */}
      <h1 className="font-headline font-bold text-xl text-on-surface">
        Shell Damage Detection
      </h1>

      {/* Middle: Nav tabs */}
      <nav className="flex items-center gap-6" aria-label="Configuration selectors">
        {/* Case selector */}
        <div className="flex items-center gap-1" role="tablist" aria-label="Damage case">
          {DAMAGE_CASES.map((dc) => (
            <button
              key={dc.id}
              role="tab"
              aria-selected={activeCaseId === dc.id}
              onClick={() => onCaseChange(dc.id)}
              className={`px-3 py-1 text-sm font-headline font-medium tracking-tight transition-colors ${
                activeCaseId === dc.id
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {dc.label.split(' — ')[0]}
            </button>
          ))}
        </div>

        {/* Divider */}
        <span className="h-5 w-px bg-outline-variant/30" aria-hidden="true" />

        {/* Noise preset selector */}
        <div className="flex items-center gap-1" role="tablist" aria-label="Noise preset">
          {NOISE_PRESETS.map((np) => (
            <button
              key={np.id}
              role="tab"
              aria-selected={noiseKey === np.id}
              onClick={() => onNoiseChange(np.id)}
              className={`px-3 py-1 text-sm font-headline font-medium tracking-tight transition-colors ${
                noiseKey === np.id
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {np.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Right: Badge, settings, avatar */}
      <div className="flex items-center gap-4">
        <span className="font-mono text-[10px] bg-primary-container text-on-primary-container px-2.5 py-1 rounded uppercase font-bold tracking-wider">
          Spherical Shell
        </span>

        <button
          className="flex items-center justify-center rounded-lg p-2 text-on-surface-variant hover:bg-surface-container-high transition-colors"
          aria-label="Settings"
        >
          <Icon name="settings" className="text-xl" />
        </button>

        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-on-primary text-xs font-bold">
          V
        </div>
      </div>
    </header>
  );
}
