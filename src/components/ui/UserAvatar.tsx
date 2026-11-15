import { initials } from '../../utils/auth';
import { cx } from '../../utils/format';

interface Props {
  name: string;
  color: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const SIZES = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-16 w-16 text-xl',
  xl: 'h-24 w-24 text-3xl',
};

/** Initials avatar with a glowing coloured ring. */
export function UserAvatar({ name, color, size = 'md', className }: Props) {
  return (
    <span
      className={cx('relative inline-grid shrink-0 place-items-center rounded-full font-display font-black text-white', SIZES[size], className)}
      style={{ background: `radial-gradient(circle at 30% 30%, ${color}, ${color}99 55%, #0b1130)`, boxShadow: `0 0 0 2px ${color}55, 0 0 18px ${color}55` }}
      aria-hidden
    >
      {initials(name)}
    </span>
  );
}
