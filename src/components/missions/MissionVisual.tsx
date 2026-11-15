import { useEffect, useMemo, useState } from 'react';
import type { Mission } from '../../types';
import { MissionArt } from './MissionArt';
import { cx } from '../../utils/format';

interface Props {
  mission: Mission;
  className?: string;
  showCredit?: boolean;
  /** Use eager loading for above-the-fold images */
  priority?: boolean;
}

/**
 * Shows the mission's credited NASA photo. It tries, in order:
 *   1. the local copy in /public/images (created by `npm run images`)
 *   2. the NASA image URL
 *   3. a second NASA URL
 * and falls back to the museum's original illustration if none can be loaded.
 */
export function MissionVisual({ mission, className, showCredit = false, priority = false }: Props) {
  const img = mission.image;
  const sources = useMemo(() => (img ? [img.localSrc, img.src, img.fallbackSrc].filter((s): s is string => Boolean(s)) : []), [img]);
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // Restart the chain when the mission changes (e.g. next/previous exhibit).
  useEffect(() => {
    setIndex(0);
    setLoaded(false);
  }, [mission.id]);

  const current = sources[index];
  const usePhoto = Boolean(img && current);

  return (
    <figure className={cx('relative overflow-hidden bg-space-850', className)}>
      {usePhoto ? (
        <>
          {!loaded && <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-space-800 to-space-700" aria-hidden />}
          <img
            key={current}
            src={current}
            alt={img!.alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            referrerPolicy="no-referrer"
            onLoad={() => setLoaded(true)}
            onError={() => {
              setLoaded(false);
              setIndex((i) => i + 1);
            }}
            className={cx('h-full w-full object-cover transition-opacity duration-500', loaded ? 'opacity-100' : 'opacity-0')}
          />
        </>
      ) : (
        <MissionArt id={mission.id} hardware={mission.hardware} destination={mission.destination} title={`Illustration of ${mission.name}`} className="h-full w-full" />
      )}
      {showCredit && (
        <figcaption className="absolute bottom-2 right-2 max-w-[90%] truncate rounded-md bg-black/65 px-2 py-1 text-[0.65rem] text-slate-200 backdrop-blur">
          {usePhoto ? (
            <a href={img!.sourceUrl} target="_blank" rel="noreferrer" className="hover:text-white hover:underline">
              Image: {img!.credit}
            </a>
          ) : (
            'Illustration — original artwork, not a NASA photo'
          )}
        </figcaption>
      )}
    </figure>
  );
}
