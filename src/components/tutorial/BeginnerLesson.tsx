import { ArrowRight, CircleAlert, Gauge, GraduationCap, Network, Wrench } from 'lucide-react';
import UrlNavigationMdx from '@/content/lessons/browser/url-navigation.mdx';
import type { Lesson } from '@/types/content';
import { CodeWalkthrough } from './CodeWalkthrough';
import { LearningTabs } from './LearningTabs';
import { TerminologyPopover } from './TerminologyPopover';

export function BeginnerLesson({ lesson }: { lesson: Lesson }) {
  return (
    <div className="mt-9 space-y-8">
      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-violet-500/20 bg-violet-500/6 p-5">
          <h2 className="flex items-center gap-2 font-bold">
            <GraduationCap className="size-5 text-violet-500" /> Why this exists
          </h2>
          <p className="mt-3 text-sm leading-7 text-[var(--text-soft)]">{lesson.whyItExists}</p>
        </div>
        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/6 p-5">
          <h2 className="flex items-center gap-2 font-bold">
            <Wrench className="size-5 text-cyan-500" /> Problem it solves
          </h2>
          <p className="mt-3 text-sm leading-7 text-[var(--text-soft)]">{lesson.problemItSolves}</p>
        </div>
      </section>
      <section className="rounded-2xl bg-[var(--surface-muted)] p-5">
        <span className="eyebrow">Everyday analogy</span>
        <p className="mt-3 leading-8 text-[var(--text-soft)]">{lesson.analogy}</p>
      </section>
      <section>
        <h2 className="text-2xl font-extrabold">Choose your explanation depth</h2>
        <p className="mt-2 text-sm text-[var(--text-soft)]">
          Start simple. Move deeper only when the previous model feels comfortable.
        </p>
        <div className="mt-5">
          <LearningTabs lesson={lesson} />
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-extrabold">Key words before the journey</h2>
        <p className="mt-2 text-sm text-[var(--text-soft)]">
          Open any term without losing your place.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {lesson.terminology.map((item) => (
            <span className="surface-card rounded-xl px-3 py-2 text-sm" key={item.termId}>
              <TerminologyPopover {...item} />
            </span>
          ))}
        </div>
      </section>
      <section>
        <div className="flex items-center gap-2">
          <Network className="size-5 text-brand-500" />
          <h2 className="text-2xl font-extrabold">The six-stage flow</h2>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {lesson.sections.map((section, index) => (
            <article
              className="surface-card relative rounded-2xl p-5"
              id={section.id}
              key={section.id}
            >
              <span className="grid size-8 place-items-center rounded-full bg-brand-500/12 font-mono text-xs font-bold text-brand-500">
                {index + 1}
              </span>
              <h3 className="mt-4 font-bold">{section.title.replace(/^\d+\.\s*/, '')}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--text-soft)]">
                {section.simpleExplanation}
              </p>
              <details className="mt-3">
                <summary className="cursor-pointer text-xs font-bold text-brand-500">
                  Show developer detail
                </summary>
                <p className="mt-2 text-xs leading-6 text-[var(--text-faint)]">
                  {section.detailedExplanation}
                </p>
              </details>
              {index < lesson.sections.length - 1 && (
                <ArrowRight className="absolute -bottom-5 left-1/2 z-10 size-4 text-[var(--text-faint)] md:hidden" />
              )}
            </article>
          ))}
        </div>
      </section>
      <section className="prose-lesson surface-card rounded-2xl px-5 pb-5 sm:px-7">
        <UrlNavigationMdx />
      </section>
      <CodeWalkthrough walkthrough={lesson.walkthrough} />
      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-orange-500/20 bg-orange-500/6 p-5">
          <h2 className="flex items-center gap-2 font-bold">
            <CircleAlert className="size-4 text-orange-500" /> Edge cases
          </h2>
          <ul className="mt-3 space-y-2">
            {lesson.edgeCases.map((item) => (
              <li className="text-sm leading-6 text-[var(--text-soft)]" key={item}>
                • {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/6 p-5">
          <h2 className="flex items-center gap-2 font-bold">
            <Gauge className="size-4 text-emerald-500" /> Performance lens
          </h2>
          {lesson.performanceNotes.map((item) => (
            <p className="mt-3 text-sm leading-7 text-[var(--text-soft)]" key={item}>
              {item}
            </p>
          ))}
        </div>
      </section>
      <section className="surface-card rounded-2xl p-5 sm:p-6">
        <span className="eyebrow">Apply it</span>
        <h2 className="mt-2 text-xl font-bold">Exercises and mini project</h2>
        <ol className="mt-4 space-y-3">
          {lesson.exercises.map((item, index) => (
            <li className="flex gap-3 text-sm leading-6 text-[var(--text-soft)]" key={item}>
              <strong className="text-brand-500">{index + 1}.</strong>
              {item}
            </li>
          ))}
        </ol>
        <div className="mt-5 rounded-xl bg-brand-500/8 p-4 text-sm leading-6">
          <strong>Mini project:</strong> {lesson.miniProject}
        </div>
      </section>
      <section className="rounded-2xl border-2 border-brand-500/25 p-5">
        <h2 className="font-bold">Seven-line revision card</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {lesson.revisionNotes.map((item) => (
            <li className="text-sm leading-6 text-[var(--text-soft)]" key={item}>
              • {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
