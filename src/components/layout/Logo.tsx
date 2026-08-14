import { Link } from 'react-router-dom';
import { siteConfig } from '@/config/site';
import { cn } from '@/utils/cn';

export function Logo({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <Link
      aria-label={siteConfig.name + ' home'}
      className={cn('inline-flex shrink-0 items-center text-[var(--text)]', className)}
      to="/"
    >
      {compact ? <CompactMark /> : <Wordmark />}
    </Link>
  );
}

function Wordmark() {
  return (
    <span
      aria-hidden="true"
      className="inline-flex h-9 items-center font-mono text-[1.22rem] font-black tracking-[-0.055em]"
    >
      <span className="text-[#685cf6] dark:text-[#aaa4ff]">&lt;</span>
      <span>FePoint</span>
      <span className="text-[#685cf6] dark:text-[#aaa4ff]">/&gt;</span>
    </span>
  );
}

function CompactMark() {
  return (
    <svg aria-hidden="true" className="size-9" viewBox="0 0 76 76">
      <path
        d="M22 8H16C10 8 7 12 7 18V58C7 64 10 68 16 68H22M54 8H60C66 8 69 12 69 18V58C69 64 66 68 60 68H54"
        fill="none"
        stroke="currentColor"
        strokeLinecap="square"
        strokeWidth="7"
      />
      <text
        fill="none"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="43"
        fontWeight="800"
        stroke="currentColor"
        strokeWidth="1.6"
        x="23"
        y="54"
      >
        F
      </text>
    </svg>
  );
}
