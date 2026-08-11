import type { ReactNode } from 'react';
import type { Difficulty } from '@/types/content';
import { cn } from '@/utils/cn';

export function Badge({
  children,
  tone = 'neutral',
  className,
}: {
  children: ReactNode;
  tone?: 'neutral' | 'blue' | 'purple' | 'cyan' | 'green' | 'orange';
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[0.68rem] font-bold tracking-wide',
        {
          'bg-[var(--surface-muted)] text-[var(--text-soft)]': tone === 'neutral',
          'border-blue-500/20 bg-blue-500/10 text-blue-500': tone === 'blue',
          'border-violet-500/20 bg-violet-500/10 text-violet-500': tone === 'purple',
          'border-cyan-500/20 bg-cyan-500/10 text-cyan-500': tone === 'cyan',
          'border-emerald-500/20 bg-emerald-500/10 text-emerald-500': tone === 'green',
          'border-orange-500/20 bg-orange-500/10 text-orange-500': tone === 'orange',
        },
        className,
      )}
    >
      {children}
    </span>
  );
}

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const tone =
    difficulty === 'Beginner' ? 'green' : difficulty === 'Intermediate' ? 'orange' : 'purple';
  return <Badge tone={tone}>{difficulty}</Badge>;
}
