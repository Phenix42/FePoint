import { useState } from 'react';
import type { Lesson } from '@/types/content';

const tabs = [
  { id: 'simple', label: 'Simple', audience: 'First mental model' },
  { id: 'developer', label: 'Developer', audience: 'Implementation detail' },
  { id: 'interview', label: 'Interview', audience: 'Structured answer' },
  { id: 'advanced', label: 'Advanced', audience: 'Trade-offs and nuance' },
] as const;

export function LearningTabs({ lesson }: { lesson: Lesson }) {
  const [active, setActive] = useState<(typeof tabs)[number]['id']>('simple');
  const content = {
    simple: lesson.simpleExplanation,
    developer: lesson.developerExplanation,
    interview: lesson.interviewExplanation,
    advanced: lesson.advancedExplanation,
  }[active];
  return (
    <section className="surface-card overflow-hidden rounded-2xl">
      <div
        className="flex overflow-x-auto border-b p-2"
        role="tablist"
        aria-label="Explanation depth"
      >
        {tabs.map((tab) => (
          <button
            aria-selected={active === tab.id}
            className={`min-w-32 flex-1 rounded-xl px-3 py-3 text-left transition ${active === tab.id ? 'bg-brand-500/12 text-[var(--text)]' : 'text-[var(--text-faint)] hover:bg-[var(--surface-muted)]'}`}
            key={tab.id}
            onClick={() => setActive(tab.id)}
            role="tab"
            type="button"
          >
            <strong className="block text-sm">{tab.label}</strong>
            <span className="text-[0.65rem]">{tab.audience}</span>
          </button>
        ))}
      </div>
      <div className="p-5 sm:p-6" role="tabpanel">
        <p className="leading-8 text-[var(--text-soft)]">{content}</p>
      </div>
    </section>
  );
}
