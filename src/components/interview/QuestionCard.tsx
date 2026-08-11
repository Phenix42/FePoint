import { ChevronDown, Code2, Lightbulb } from 'lucide-react';
import { useState } from 'react';
import { Badge, DifficultyBadge } from '@/components/common/Badge';
import { BookmarkButton } from '@/components/common/BookmarkButton';
import { CodeBlock } from '@/components/common/CodeBlock';
import { CompletionButton } from '@/components/common/CompletionButton';
import type { InterviewQuestion } from '@/types/content';
import { cn } from '@/utils/cn';

export function QuestionCard({ question }: { question: InterviewQuestion }) {
  const [open, setOpen] = useState(false);
  const href =
    '/interview-questions/' + question.technology.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return (
    <article className="surface-card overflow-hidden rounded-2xl">
      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="blue">{question.technology}</Badge>
          <DifficultyBadge difficulty={question.difficulty} />
          <Badge>{question.experience}</Badge>
          <div className="ml-auto flex gap-2">
            <CompletionButton compact contentId={question.id} type="question" />
            <BookmarkButton
              contentId={question.id}
              description={question.shortAnswer}
              title={question.question}
              type="question"
              url={href}
            />
          </div>
        </div>
        <button
          aria-expanded={open}
          className="mt-4 flex w-full items-start gap-4 text-left"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          <span className="flex-1 text-base font-bold leading-7 sm:text-lg">
            {question.question}
          </span>
          <ChevronDown
            className={cn(
              'mt-1 size-5 shrink-0 text-[var(--text-faint)] transition',
              open && 'rotate-180',
            )}
          />
        </button>
        <p className="mt-3 text-sm leading-6 text-[var(--text-soft)]">{question.shortAnswer}</p>
      </div>
      {open && (
        <div className="border-t bg-[var(--surface-muted)]/45 p-5 sm:p-6">
          <h3 className="flex items-center gap-2 text-sm font-bold">
            <Lightbulb className="size-4 text-amber-500" /> Detailed explanation
          </h3>
          <p className="mt-3 text-sm leading-7 text-[var(--text-soft)]">{question.explanation}</p>
          {question.code && question.language && (
            <CodeBlock
              code={question.code}
              explanation="Use the snippet to narrate runtime behaviour, not just the final output."
              language={question.language}
              title="Interview example"
            />
          )}
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border bg-red-500/5 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-red-500">Common trap</p>
              <p className="mt-2 text-sm leading-6 text-[var(--text-soft)]">
                {question.commonIncorrectAnswer}
              </p>
            </div>
            <div className="rounded-xl border bg-brand-500/5 p-4">
              <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-500">
                <Code2 className="size-3.5" /> Follow-up
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--text-soft)]">{question.followUp}</p>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
