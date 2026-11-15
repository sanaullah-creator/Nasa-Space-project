import type { ReactNode } from 'react';
import { cx } from '../../utils/format';

interface Props {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2';
  className?: string;
}

export function SectionHeading({ eyebrow, title, description, align = 'left', as = 'h2', className }: Props) {
  const Tag = as;
  return (
    <header className={cx(align === 'center' && 'mx-auto text-center', 'max-w-3xl', className)}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <Tag className={cx('font-bold tracking-tight', as === 'h1' ? 'text-4xl sm:text-5xl' : 'text-3xl sm:text-4xl')}>{title}</Tag>
      {description && <p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">{description}</p>}
    </header>
  );
}

export function PageHeader(props: Omit<Props, 'as'>) {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-8 pt-12 sm:px-6 sm:pt-16 lg:px-8">
      <SectionHeading {...props} as="h1" />
    </div>
  );
}
