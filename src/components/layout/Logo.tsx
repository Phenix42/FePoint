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
    <svg
      aria-hidden="true"
      className="h-9 w-[9.4rem] overflow-visible sm:w-[10.25rem]"
      viewBox="0 0 330 76"
    >
      <path
        d="M27 8H17C10 8 7 12 7 19V57C7 64 10 68 17 68H27"
        fill="none"
        stroke="currentColor"
        strokeLinecap="square"
        strokeLinejoin="round"
        strokeWidth="8"
      />
      <text
        fill="none"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="58"
        fontWeight="800"
        letterSpacing="-4"
        stroke="currentColor"
        strokeWidth="1.8"
        x="36"
        y="59"
      >
        Fe
      </text>
      <text
        fill="currentColor"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="58"
        fontWeight="800"
        letterSpacing="-4"
        x="104"
        y="59"
      >
        Point
      </text>
      <path
        d="M303 8H313C320 8 323 12 323 19V57C323 64 320 68 313 68H303"
        fill="none"
        stroke="currentColor"
        strokeLinecap="square"
        strokeLinejoin="round"
        strokeWidth="8"
      />
    </svg>
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
