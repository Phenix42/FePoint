import { Link } from 'react-router-dom';
import { siteConfig } from '@/config/site';
import { cn } from '@/utils/cn';

export function Logo({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <Link
      aria-label={siteConfig.name + ' home'}
      className={cn('inline-flex items-center gap-2.5', className)}
      to="/"
    >
      <span className="flex h-9 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-black shadow-lg shadow-brand-500/15 ring-1 ring-white/10">
        <img
          alt={compact ? siteConfig.name : ''}
          className="h-full w-full object-contain"
          height={36}
          src={siteConfig.iconUrl}
          width={44}
        />
      </span>
      {!compact && (
        <span className="text-[1.05rem] font-extrabold tracking-[-0.035em]">
          <span className="text-brand-700 dark:text-brand-500">FE</span>
          <span>Point</span>
        </span>
      )}
    </Link>
  );
}
