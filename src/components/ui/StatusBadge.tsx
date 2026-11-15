import { Navigation } from 'lucide-react';
import type { Mission } from '../../types';
import { STATUS_META, TRAVELLING_META } from '../../utils/status';
import { cx } from '../../utils/format';

interface Props {
  mission: Pick<Mission, 'status' | 'travelling'>;
  size?: 'sm' | 'md';
  showTravelling?: boolean;
}

export function StatusBadge({ mission, size = 'sm', showTravelling = true }: Props) {
  const meta = STATUS_META[mission.status];
  const base = cx(
    'inline-flex items-center gap-1.5 rounded-full font-semibold ring-1 ring-inset',
    size === 'sm' ? 'px-2.5 py-1 text-[0.7rem]' : 'px-3 py-1.5 text-xs',
  );
  return (
    <span className="inline-flex flex-wrap items-center gap-1.5">
      <span className={cx(base, meta.badge)} title={meta.description}>
        <span className="relative flex h-2 w-2">
          {mission.status === 'active' && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: meta.color }} />
          )}
          <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: meta.color }} />
        </span>
        {meta.label}
      </span>
      {showTravelling && mission.travelling && (
        <span className={cx(base, TRAVELLING_META.badge)} title={TRAVELLING_META.description}>
          <Navigation className="h-3 w-3" aria-hidden />
          {TRAVELLING_META.label}
        </span>
      )}
    </span>
  );
}
