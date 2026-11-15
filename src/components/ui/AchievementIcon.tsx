import { Brain, Clock, Map, Moon, Orbit, Palette, Radio, Rocket, Star, Trophy, Flame, UserCheck } from 'lucide-react';
import type { Achievement } from '../../types';

const ICONS = {
  moon: Moon,
  mars: Flame,
  orbit: Orbit,
  clock: Clock,
  map: Map,
  brain: Brain,
  trophy: Trophy,
  star: Star,
  palette: Palette,
  radio: Radio,
  rocket: Rocket,
  user: UserCheck,
} as const;

export function AchievementIcon({ icon, className }: { icon: Achievement['icon']; className?: string }) {
  const Icon = ICONS[icon];
  return <Icon className={className} aria-hidden />;
}
