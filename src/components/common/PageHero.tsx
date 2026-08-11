import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

export function PageHero({
  eyebrow,
  title,
  description,
  actions,
  aside,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  actions?: ReactNode;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn('relative overflow-hidden border-b', className)}>
      <div className="hero-grid absolute inset-0" aria-hidden="true" />
      <div className="page-shell relative grid gap-10 py-16 sm:py-20 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-3xl">
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-[-0.045em] sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--text-soft)] sm:text-lg">
            {description}
          </p>
          {actions && <div className="mt-7 flex flex-wrap gap-3">{actions}</div>}
        </div>
        {aside}
      </div>
    </section>
  );
}
