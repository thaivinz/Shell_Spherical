import { RESULTS } from '../data/sphericalData';

export default function StatusBar({
  activeCaseId,
  noiseKey,
  engineStatus = 'Idle',
  currentStage = 1,
}) {
  const isIdle = engineStatus.toLowerCase() === 'idle';
  const currentResult = RESULTS[activeCaseId]?.[noiseKey];
  const suspectedCount = currentResult?.mfbdi?.suspected?.length ?? 0;
  const convergenceStages = currentResult?.convergence?.length ?? 0;

  return (
    <footer
      className="fixed bottom-0 left-0 right-0 z-50 flex h-8 items-center justify-between bg-surface-container-low px-6"
      style={{ borderTop: '1px solid color-mix(in srgb, var(--color-outline-variant) 40%, transparent)' }}
      role="status"
      aria-live="polite"
    >
      {/* Left: Engine status */}
      <span className="font-mono text-[11px] uppercase tracking-widest text-on-surface-variant">
        Engine:{' '}
        <span className={isIdle ? 'text-tertiary' : 'text-stage-decision-stroke'}>
          MATLAB {engineStatus}
        </span>
      </span>

      {/* Right: Suspected elements + Convergence stages */}
      <div className="flex items-center gap-6">
        <span className="font-mono text-[11px] uppercase tracking-widest text-on-surface-variant">
          Suspected: {suspectedCount} elements
        </span>
        <span className="font-mono text-[11px] uppercase tracking-widest text-on-surface-variant">
          Convergence: {convergenceStages} stages
        </span>
      </div>
    </footer>
  );
}
