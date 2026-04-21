import Icon from './Icon';
import { NAV_ITEMS } from '../data/sphericalData';

export default function Sidebar({ activePanel, onPanelChange }) {
  return (
    <aside className="fixed left-0 top-16 bottom-8 z-40 w-64 bg-surface-container-low flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <p className="font-headline font-extrabold text-[10px] uppercase tracking-widest opacity-50">
          Structural Health
        </p>
        <p className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">
          Monitoring Suite
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 flex-1 py-2" aria-label="Pipeline panels">
        {NAV_ITEMS.map((item) => {
          const isActive = activePanel === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onPanelChange(item.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex items-center gap-3 text-left transition-all duration-150 ease-in-out ${
                isActive
                  ? 'bg-primary-fixed text-on-primary-fixed-variant border-l-4 border-primary rounded-lg px-4 py-3 mx-2'
                  : 'text-on-surface-variant px-4 py-3 mx-2 hover:bg-surface-container-high rounded-lg border-l-4 border-transparent'
              }`}
            >
              <Icon name={item.icon} className="text-xl" />
              <span className="text-xs uppercase tracking-wider font-bold">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
