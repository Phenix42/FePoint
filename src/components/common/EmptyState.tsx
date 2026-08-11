import { SearchX } from 'lucide-react';
import type { ReactNode } from 'react';

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="surface-card col-span-full rounded-2xl px-6 py-16 text-center">
      <span className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-[var(--surface-muted)] text-[var(--text-faint)]">
        <SearchX className="size-5" />
      </span>
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--text-soft)]">
        {description}
      </p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
