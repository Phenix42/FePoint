import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Clock3,
  Copy,
  Lightbulb,
  Menu,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import { Link, useParams } from 'react-router-dom';
import remarkGfm from 'remark-gfm';
import { Badge, DifficultyBadge } from '@/components/common/Badge';
import { BookmarkButton } from '@/components/common/BookmarkButton';
import { buttonStyles } from '@/components/common/Button';
import { CodeBlock } from '@/components/common/CodeBlock';
import { CompletionButton } from '@/components/common/CompletionButton';
import { ProgressBar } from '@/components/common/ProgressBar';
import { Seo } from '@/components/common/Seo';
import { TutorialCard } from '@/components/tutorial/TutorialCard';
import { BeginnerLesson } from '@/components/tutorial/BeginnerLesson';
import { siteConfig } from '@/config/site';
import { urlNavigationLesson } from '@/content/lessons/browser/urlNavigationLesson';
import { getTutorial, tutorials } from '@/data/tutorials';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { useAppStore } from '@/store/useAppStore';

export default function TutorialDetailPage() {
  const { category, topic } = useParams();
  const tutorial = getTutorial(category, topic);
  const setReadingProgress = useAppStore((state) => state.setReadingProgress);
  const readingProgress = useAppStore((state) =>
    tutorial ? (state.readingProgress[tutorial.id] ?? 0) : 0,
  );

  const categoryTutorials = useMemo(
    () => tutorials.filter((item) => item.category === category),
    [category],
  );
  const index = categoryTutorials.findIndex((item) => item.id === tutorial?.id);
  const previous = index > 0 ? categoryTutorials[index - 1] : undefined;
  const next = index >= 0 ? categoryTutorials[index + 1] : undefined;
  const related = tutorials
    .filter(
      (item) =>
        item.id !== tutorial?.id &&
        (item.category === category || tutorial?.relatedTopics.includes(item.title)),
    )
    .slice(0, 3);

  useRecentlyViewed(
    tutorial
      ? {
          type: 'tutorial',
          title: tutorial.title,
          description: tutorial.description,
          url: '/tutorials/' + tutorial.category + '/' + tutorial.slug,
        }
      : undefined,
  );

  useEffect(() => {
    if (!tutorial) return undefined;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = documentHeight > 0 ? (window.scrollY / documentHeight) * 100 : 100;
        setReadingProgress(tutorial.id, progress);
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
    };
  }, [setReadingProgress, tutorial]);

  if (!tutorial) {
    return (
      <div className="page-shell py-24 text-center">
        <span className="eyebrow">Content not found</span>
        <h1 className="mt-4 text-4xl font-extrabold">
          This tutorial is outside the current universe.
        </h1>
        <p className="mt-3 text-[var(--text-soft)]">
          The link may be outdated or the lesson may have moved.
        </p>
        <Link className={buttonStyles({ className: 'mt-7' })} to="/tutorials">
          Browse tutorials
        </Link>
      </div>
    );
  }

  const href = '/tutorials/' + tutorial.category + '/' + tutorial.slug;

  return (
    <>
      <Seo description={tutorial.description} path={href} title={tutorial.title + ' tutorial'} />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TechArticle',
            headline: tutorial.title,
            description: tutorial.description,
            dateModified: tutorial.updatedAt,
            proficiencyLevel: tutorial.difficulty,
            mainEntityOfPage: new URL(href, siteConfig.url).toString(),
            publisher: { '@type': 'Organization', name: siteConfig.name },
          })}
        </script>
      </Helmet>
      <div className="sticky top-16 z-40 h-0.5 bg-[var(--surface-muted)]">
        <div
          className="h-full bg-gradient-to-r from-brand-500 via-violet-500 to-cyan-400 transition-[width]"
          style={{ width: readingProgress + '%' }}
        />
      </div>
      <div className="border-b bg-[var(--surface)]">
        <div className="page-shell py-4">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs text-[var(--text-faint)]"
          >
            <Link className="hover:text-brand-500" to="/tutorials">
              Tutorials
            </Link>
            <ChevronRight className="size-3" />
            <Link className="hover:text-brand-500" to={'/tutorials/' + tutorial.category}>
              {tutorial.categoryLabel}
            </Link>
            <ChevronRight className="size-3" />
            <span className="truncate text-[var(--text-soft)]">{tutorial.title}</span>
          </nav>
        </div>
      </div>

      <div className="page-shell grid items-start gap-8 py-8 xl:grid-cols-[15rem_minmax(0,1fr)_13rem]">
        <aside className="xl:sticky xl:top-24">
          <details className="surface-card rounded-2xl xl:hidden">
            <summary className="flex cursor-pointer list-none items-center gap-2 p-4 text-sm font-bold">
              <Menu className="size-4" /> Lessons in {tutorial.categoryLabel}
            </summary>
            <LessonNavigation currentId={tutorial.id} tutorials={categoryTutorials} />
          </details>
          <div className="hidden xl:block">
            <p className="eyebrow">{tutorial.categoryLabel} path</p>
            <h2 className="mt-2 font-bold">Course lessons</h2>
            <div className="mt-4 max-h-[calc(100vh-10rem)] overflow-y-auto pr-2 scrollbar-thin">
              <LessonNavigation currentId={tutorial.id} tutorials={categoryTutorials} />
            </div>
          </div>
        </aside>

        <article className="min-w-0">
          <header>
            <div className="flex flex-wrap gap-2">
              <Badge tone="blue">{tutorial.categoryLabel}</Badge>
              <DifficultyBadge difficulty={tutorial.difficulty} />
            </div>
            <h1 className="mt-5 text-4xl font-extrabold tracking-[-0.045em] sm:text-5xl">
              {tutorial.title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-[var(--text-soft)]">{tutorial.description}</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-[var(--text-faint)]">
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="size-3.5" /> {tutorial.estimatedReadTime} min read
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="size-3.5" /> Updated{' '}
                {new Date(tutorial.updatedAt).toLocaleDateString('en', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <BookOpen className="size-3.5" /> Lesson {index + 1} of {categoryTutorials.length}
              </span>
            </div>
          </header>

          <section className="mt-9 rounded-2xl border border-brand-500/20 bg-brand-500/6 p-5">
            <h2 className="flex items-center gap-2 text-sm font-bold">
              <Sparkles className="size-4 text-brand-500" /> By the end of this lesson
            </h2>
            <ul className="mt-4 grid gap-2">
              {tutorial.learningObjectives.map((objective) => (
                <li
                  className="flex gap-2 text-sm leading-6 text-[var(--text-soft)]"
                  key={objective}
                >
                  <CheckCircle2 className="mt-1 size-4 shrink-0 text-brand-500" /> {objective}
                </li>
              ))}
            </ul>
          </section>

          {tutorial.slug === urlNavigationLesson.slug ? (
            <BeginnerLesson lesson={urlNavigationLesson} />
          ) : (
            <div className="prose-lesson">
              {tutorial.sections.map((section, sectionIndex) => (
                <section id={section.id} key={section.id}>
                  <h2>{section.title}</h2>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{section.content}</ReactMarkdown>
                  {sectionIndex === 1 &&
                    tutorial.codeExamples.map((example) => (
                      <CodeBlock key={example.title} {...example} />
                    ))}
                </section>
              ))}
            </div>
          )}

          <section className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5">
              <h2 className="flex items-center gap-2 font-bold">
                <ShieldAlert className="size-4 text-red-500" /> Common mistakes
              </h2>
              <ul className="mt-4 space-y-3">
                {tutorial.commonMistakes.map((mistake) => (
                  <li className="text-sm leading-6 text-[var(--text-soft)]" key={mistake}>
                    • {mistake}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
              <h2 className="flex items-center gap-2 font-bold">
                <Lightbulb className="size-4 text-emerald-500" /> Best practices
              </h2>
              <ul className="mt-4 space-y-3">
                {tutorial.bestPractices.map((practice) => (
                  <li className="text-sm leading-6 text-[var(--text-soft)]" key={practice}>
                    • {practice}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="surface-card mt-5 rounded-2xl p-5 sm:p-6">
            <h2 className="flex items-center gap-2 font-bold">
              <ClipboardList className="size-4 text-violet-500" /> Interview review
            </h2>
            <ol className="mt-4 space-y-3">
              {tutorial.interviewQuestions.map((question, questionIndex) => (
                <li className="flex gap-3 text-sm leading-6 text-[var(--text-soft)]" key={question}>
                  <span className="font-mono text-xs font-bold text-violet-500">
                    {String(questionIndex + 1).padStart(2, '0')}
                  </span>
                  {question}
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-5 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5 sm:p-6">
            <h2 className="font-bold">Practice before moving on</h2>
            <ul className="mt-3 space-y-2">
              {tutorial.practiceExercises.map((exercise) => (
                <li className="text-sm leading-6 text-[var(--text-soft)]" key={exercise}>
                  • {exercise}
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-8 flex flex-col gap-3 border-y py-6 sm:flex-row sm:items-center sm:justify-between">
            <BookmarkButton
              contentId={tutorial.id}
              description={tutorial.description}
              showLabel
              title={tutorial.title}
              type="tutorial"
              url={href}
            />
            <CompletionButton contentId={tutorial.id} type="tutorial" />
          </div>

          <nav aria-label="Lesson pagination" className="grid gap-3 py-7 sm:grid-cols-2">
            {previous ? (
              <Link
                className="surface-card group rounded-2xl p-4 transition hover:border-brand-500/35"
                to={'/tutorials/' + previous.category + '/' + previous.slug}
              >
                <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[var(--text-faint)]">
                  <ArrowLeft className="size-3.5" /> Previous
                </span>
                <strong className="mt-2 block group-hover:text-brand-500">{previous.title}</strong>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                className="surface-card group rounded-2xl p-4 text-right transition hover:border-brand-500/35"
                to={'/tutorials/' + next.category + '/' + next.slug}
              >
                <span className="flex items-center justify-end gap-1 text-xs font-bold uppercase tracking-wider text-[var(--text-faint)]">
                  Next <ArrowRight className="size-3.5" />
                </span>
                <strong className="mt-2 block group-hover:text-brand-500">{next.title}</strong>
              </Link>
            )}
          </nav>
        </article>

        <aside className="hidden xl:sticky xl:top-24 xl:block">
          <p className="eyebrow">On this page</p>
          <nav aria-label="Table of contents" className="mt-4 border-l pl-4">
            {tutorial.sections.map((section) => (
              <a
                className="block py-1.5 text-xs leading-5 text-[var(--text-soft)] hover:text-brand-500"
                href={'#' + section.id}
                key={section.id}
              >
                {section.title}
              </a>
            ))}
          </nav>
          <div className="mt-6">
            <ProgressBar label="Reading progress" value={readingProgress} />
          </div>
          <button
            className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-[var(--text-soft)] hover:text-brand-500"
            onClick={() => void navigator.clipboard.writeText(window.location.href)}
            type="button"
          >
            <Copy className="size-3.5" /> Copy lesson link
          </button>
          <div className="mt-7 border-t pt-5">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-faint)]">
              Prerequisites
            </p>
            {tutorial.prerequisites.map((item) => (
              <p className="mt-2 text-xs leading-5 text-[var(--text-soft)]" key={item}>
                {item}
              </p>
            ))}
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="border-t bg-[var(--surface-muted)]/40 py-14">
          <div className="page-shell">
            <h2 className="text-2xl font-extrabold tracking-tight">Keep learning</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {related.map((item) => (
                <TutorialCard compact key={item.id} tutorial={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function LessonNavigation({
  tutorials: items,
  currentId,
}: {
  tutorials: typeof tutorials;
  currentId: string;
}) {
  const completed = useAppStore((state) => state.completed);
  return (
    <nav aria-label="Course lessons" className="space-y-1 p-2 xl:p-0">
      {items.map((item, itemIndex) => {
        const active = item.id === currentId;
        const done = Boolean(completed['tutorial:' + item.id]);
        return (
          <Link
            aria-current={active ? 'page' : undefined}
            className={
              'flex items-start gap-2.5 rounded-xl px-3 py-2.5 text-xs leading-5 transition ' +
              (active
                ? 'bg-brand-500/10 font-bold text-brand-500'
                : 'text-[var(--text-soft)] hover:bg-[var(--surface-muted)] hover:text-[var(--text)]')
            }
            key={item.id}
            to={'/tutorials/' + item.category + '/' + item.slug}
          >
            <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full border text-[0.55rem]">
              {done ? <CheckCircle2 className="size-3 text-emerald-500" /> : itemIndex + 1}
            </span>
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
