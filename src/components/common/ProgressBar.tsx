import { cn } from '@/utils/cn';

export function ProgressBar({
  value,
  label,
  className,
}: {
  value: number;
  label?: string;
  className?: string;
}) {
  const normalised = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <div className="flex items-center justify-between text-xs font-semibold text-[var(--text-soft)]">
          <span>{label}</span>
          <span>{normalised}%</span>
        </div>
      )}
      <div
        aria-label={label ?? 'Progress'}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={normalised}
        className="h-1.5 overflow-hidden rounded-full bg-[var(--surface-muted)]"
        role="progressbar"
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-500 via-violet-500 to-cyan-400 transition-[width] duration-500"
          style={{ width: normalised + '%' }}
        />
      </div>
    </div>
  );
}
