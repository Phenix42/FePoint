import {
  ArrowRight,
  BookOpen,
  Bookmark,
  BrainCircuit,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Code2,
  Compass,
  LayoutTemplate,
  ListChecks,
  Network,
  Search,
  Sparkles,
  Target,
  Trophy,
} from 'lucide-react';
import { useState, type ComponentType, type CSSProperties } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { buttonStyles } from '@/components/common/Button';
import { ProgressBar } from '@/components/common/ProgressBar';
import { Seo } from '@/components/common/Seo';
import { dsaProblems } from '@/content/dsa/dsaProblems';
import { companies } from '@/data/companies';
import { interviewQuestions } from '@/data/interviewQuestions';
import { machineCodingChallenges } from '@/data/machineCoding';
import { roadmapStages, totalRoadmapItems } from '@/data/roadmap';
import { systemDesignCases } from '@/data/systemDesign';
import { tutorials } from '@/data/tutorials';
import { isCompleted, isRoadmapItemCompleted, useAppStore } from '@/store/useAppStore';
import { cn } from '@/utils/cn';

const stageRoutes: Record<string, string> = {
  'web-fundamentals': '/tutorials/browser',
  html: '/tutorials/html',
  css: '/tutorials/css',
  javascript: '/tutorials/javascript',
  typescript: '/tutorials/typescript',
  react: '/tutorials/react',
  nextjs: '/tutorials/nextjs',
  'system-design': '/system-design',
};

const pathCards = [
  {
    icon: Compass,
    title: 'Learn frontend',
    description: 'Follow one ordered path from browser basics to production architecture.',
    href: '/roadmap',
    meta: '8 stages · 102 concepts',
    action: 'Open roadmap',
    tone: 'amber',
    steps: ['Start with the web', 'Learn core technologies', 'Move into architecture'],
  },
  {
    icon: BrainCircuit,
    title: 'Prepare for interviews',
    description: 'Revise high-signal concepts, practise DSA, and target company rounds.',
    href: '/interview-questions',
    meta: `${interviewQuestions.length} interview questions`,
    action: 'Start preparing',
    tone: 'violet',
    steps: ['Review concepts', 'Practise questions', 'Revisit weak areas'],
  },
  {
    icon: LayoutTemplate,
    title: 'Build real interfaces',
    description: 'Turn knowledge into speed with realistic frontend machine-coding tasks.',
    href: '/machine-coding',
    meta: `${machineCodingChallenges.length} timed challenges`,
    action: 'Choose a challenge',
    tone: 'cyan',
    steps: ['Read the brief', 'Build with a timer', 'Review the rubric'],
  },
] as const;

const toolkit = [
  {
    icon: ListChecks,
    title: 'DSA for frontend',
    description: `${dsaProblems.length} JavaScript-first problems and repeatable patterns.`,
    href: '/dsa',
    color: 'text-blue-500 bg-blue-500/10',
  },
  {
    icon: Code2,
    title: 'Machine coding',
    description: `${machineCodingChallenges.length} components and full application briefs.`,
    href: '/machine-coding',
    color: 'text-cyan-500 bg-cyan-500/10',
  },
  {
    icon: Network,
    title: 'System design',
    description: `${systemDesignCases.length} case studies with practical trade-offs.`,
    href: '/system-design',
    color: 'text-violet-500 bg-violet-500/10',
  },
  {
    icon: Target,
    title: 'Company guides',
    description: `${companies.length} focused guides for common frontend interview loops.`,
    href: '/companies',
    color: 'text-emerald-500 bg-emerald-500/10',
  },
] as const;

export default function HomePage() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const addSearch = useAppStore((state) => state.addSearch);
  const bookmarks = useAppStore((state) => state.bookmarks);
  const completed = useAppStore((state) => state.completed);
  const dsaProgress = useAppStore((state) => state.dsaProgress);
  const practiceAttempts = useAppStore((state) => state.practiceAttempts);
  const recentItems = useAppStore((state) => state.recentItems);
  const roadmapCompleted = useAppStore((state) => state.roadmapCompleted);

  const roadmapCount = Object.values(roadmapCompleted).filter(Boolean).length;
  const roadmapPercent = (roadmapCount / totalRoadmapItems) * 100;
  const completedContentCount = Object.values(completed).filter(Boolean).length;
  const completedTutorials = tutorials.filter((tutorial) =>
    isCompleted(completed, 'tutorial', tutorial.id),
  ).length;
  const completedChallenges = machineCodingChallenges.filter((challenge) =>
    isCompleted(completed, 'challenge', challenge.id),
  ).length;
  const attemptedQuestions = Object.keys(practiceAttempts).length;
  const solvedDsa = Object.values(dsaProgress).filter((status) =>
    ['solved-independently', 'solved-with-hints', 'reviewed'].includes(status),
  ).length;
  const currentStage =
    roadmapStages.find((stage) =>
      stage.items.some((item) => !isRoadmapItemCompleted(roadmapCompleted, stage.id, item)),
    ) ?? roadmapStages[roadmapStages.length - 1];
  const currentStageCount =
    currentStage?.items.filter((item) =>
      isRoadmapItemCompleted(roadmapCompleted, currentStage.id, item),
    ).length ?? 0;
  const continueItem = recentItems[0];

  const submitSearch = () => {
    const cleanQuery = query.trim();
    if (!cleanQuery) return;
    addSearch(cleanQuery);
    void navigate('/search?q=' + encodeURIComponent(cleanQuery));
  };

  return (
    <>
      <Seo
        description="A simple frontend learning dashboard with a structured roadmap, interview practice, DSA, machine coding, and local progress tracking."
        title="Learn frontend with a clear plan"
      />

      <section className="home-hero overflow-hidden border-b">
        <div className="page-shell grid gap-10 py-14 sm:py-18 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:py-22">
          <div>
            <span className="eyebrow">
              <Sparkles className="size-3.5" /> Free · No signup · Progress stays local
            </span>
            <h1 className="mt-5 max-w-3xl text-4xl font-black tracking-[-0.055em] sm:text-5xl lg:text-[4rem] lg:leading-[1.02]">
              Learn frontend.
              <span className="block text-brand-600 dark:text-brand-500">Prepare with a plan.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-[var(--text-soft)] sm:text-lg sm:leading-8">
              One clear path for learning, practising, and preparing for frontend interviews—without
              losing track of what comes next.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link className={buttonStyles({ size: 'lg' })} to="/roadmap">
                {roadmapCount > 0 ? 'Continue roadmap' : 'Start the roadmap'}
                <ArrowRight className="size-4" />
              </Link>
              <Link
                className={buttonStyles({ variant: 'secondary', size: 'lg' })}
                to="/interview-questions"
              >
                Interview prep
              </Link>
            </div>

            <form
              className="mt-8 flex max-w-xl items-center gap-2 rounded-2xl border bg-[var(--surface)] p-2 shadow-sm"
              onSubmit={(event) => {
                event.preventDefault();
                submitSearch();
              }}
            >
              <Search className="ml-2 size-4 shrink-0 text-[var(--text-faint)]" />
              <label className="sr-only" htmlFor="home-search">
                Search all learning content
              </label>
              <input
                className="h-10 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--text-faint)]"
                id="home-search"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search JavaScript, React, system design…"
                value={query}
              />
              <button
                className={buttonStyles({ size: 'sm', className: 'rounded-lg px-4' })}
                type="submit"
              >
                Search
              </button>
            </form>
          </div>

          <ProgressSnapshot
            bookmarks={bookmarks.length}
            completedContent={completedContentCount}
            currentStage={currentStage?.title ?? 'Frontend system design'}
            currentStageCount={currentStageCount}
            currentStageTotal={currentStage?.items.length ?? 0}
            roadmapCount={roadmapCount}
            roadmapPercent={roadmapPercent}
          />
        </div>
      </section>

      <section className="border-b bg-[var(--surface)]">
        <div className="page-shell py-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-500">
              {continueItem ? <Clock3 className="size-5" /> : <BookOpen className="size-5" />}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[var(--text-faint)]">
                {continueItem ? 'Continue where you stopped' : 'Recommended first step'}
              </p>
              <h2 className="mt-1 truncate font-bold">
                {continueItem?.title ?? 'Understand how the web and browser work'}
              </h2>
              <p className="mt-0.5 truncate text-sm text-[var(--text-soft)]">
                {continueItem?.description ??
                  'Build the foundation that makes HTML, CSS, and JavaScript easier to understand.'}
              </p>
            </div>
            <Link
              className={buttonStyles({ variant: 'secondary', size: 'sm' })}
              to={continueItem?.url ?? '/tutorials/browser'}
            >
              {continueItem ? 'Resume' : 'Begin'} <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="page-shell">
          <SectionHeading
            description="Choose the outcome you want today. Each path keeps the next action obvious."
            eyebrow="Start here"
            title="Three clear ways to move forward"
          />
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {pathCards.map((path) => (
              <PathCard key={path.title} {...path} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y bg-[var(--surface)] py-14 sm:py-18">
        <div className="page-shell">
          <div className="grid gap-10 lg:grid-cols-[.78fr_1.22fr] lg:items-start">
            <div>
              <span className="eyebrow">Progress at a glance</span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">
                Build momentum with one small loop.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-6 text-[var(--text-soft)] sm:text-base">
                Learn a concept, test your recall, solve a pattern, then build something. These
                first milestones make progress visible without adding a complicated planner.
              </p>
              <Link
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-600 hover:text-brand-500 dark:text-brand-500"
                to="/completed"
              >
                View all progress <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <MilestoneCard
                current={completedTutorials}
                href="/tutorials"
                icon={BookOpen}
                label="Learn"
                target={5}
                unit="lessons"
              />
              <MilestoneCard
                current={attemptedQuestions}
                href="/practice"
                icon={BrainCircuit}
                label="Practise"
                target={10}
                unit="questions"
              />
              <MilestoneCard
                current={solvedDsa}
                href="/dsa/problems"
                icon={ListChecks}
                label="Solve"
                target={3}
                unit="DSA problems"
              />
              <MilestoneCard
                current={completedChallenges}
                href="/machine-coding"
                icon={Code2}
                label="Build"
                target={1}
                unit="UI challenge"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="page-shell">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <SectionHeading
                description="The roadmap keeps the sequence clear and lets you check off every concept locally."
                eyebrow="Your learning path"
                title="Eight stages, in the right order"
              />
              <div className="surface-card mt-8 overflow-hidden rounded-2xl">
                {roadmapStages.map((stage) => {
                  const count = stage.items.filter((item) =>
                    isRoadmapItemCompleted(roadmapCompleted, stage.id, item),
                  ).length;
                  const done = count === stage.items.length;
                  const active = currentStage?.id === stage.id;

                  return (
                    <Link
                      className={cn(
                        'group flex items-center gap-4 border-b p-4 transition last:border-b-0 hover:bg-[var(--surface-muted)]/70 sm:px-5',
                        active && 'bg-brand-500/[0.045]',
                      )}
                      key={stage.id}
                      to={stageRoutes[stage.id] ?? '/roadmap'}
                    >
                      <span
                        className={cn(
                          'grid size-9 shrink-0 place-items-center rounded-full border text-xs font-bold',
                          done
                            ? 'border-emerald-500 bg-emerald-500 text-white'
                            : active
                              ? 'border-brand-500 bg-brand-500 text-slate-950'
                              : 'bg-[var(--surface)] text-[var(--text-faint)]',
                        )}
                      >
                        {done ? <Check className="size-4" /> : stage.number}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-2">
                          <strong className="text-sm">{stage.title}</strong>
                          {active && (
                            <span className="rounded-full bg-brand-500/10 px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-wide text-brand-600 dark:text-brand-500">
                              Current
                            </span>
                          )}
                        </span>
                        <span className="mt-1 block text-xs text-[var(--text-faint)]">
                          {count}/{stage.items.length} concepts · {stage.estimatedWeeks} weeks
                        </span>
                      </span>
                      <ChevronRight className="size-4 text-[var(--text-faint)] transition group-hover:translate-x-0.5 group-hover:text-brand-500" />
                    </Link>
                  );
                })}
              </div>
            </div>

            <aside className="rounded-3xl border bg-[var(--surface-muted)]/45 p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <span className="eyebrow">Interview toolkit</span>
                  <h2 className="mt-3 text-2xl font-extrabold tracking-[-0.035em]">
                    Practise by interview round
                  </h2>
                </div>
                <Trophy className="hidden size-7 text-brand-500 sm:block" />
              </div>
              <div className="mt-6 space-y-3">
                {toolkit.map((item) => (
                  <ToolLink key={item.href} {...item} />
                ))}
              </div>
              <Link
                className={buttonStyles({ variant: 'secondary', className: 'mt-5 w-full' })}
                to="/interview-questions"
              >
                Browse all interview questions <ArrowRight className="size-4" />
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="page-shell">
          <div className="simple-cta overflow-hidden rounded-3xl border px-6 py-10 sm:px-10 sm:py-12">
            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-brand-300">
                  <CheckCircle2 className="size-4" /> Ready when you are
                </span>
                <h2 className="mt-3 max-w-2xl text-2xl font-extrabold tracking-[-0.035em] text-white sm:text-3xl">
                  You do not need another resource list. You need a clear next step.
                </h2>
                <p className="mt-3 text-sm text-slate-400">
                  Start with stage one and let your local progress guide the rest.
                </p>
              </div>
              <Link className={buttonStyles({ size: 'lg' })} to="/roadmap">
                Open my roadmap <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ProgressSnapshot({
  bookmarks,
  completedContent,
  currentStage,
  currentStageCount,
  currentStageTotal,
  roadmapCount,
  roadmapPercent,
}: {
  bookmarks: number;
  completedContent: number;
  currentStage: string;
  currentStageCount: number;
  currentStageTotal: number;
  roadmapCount: number;
  roadmapPercent: number;
}) {
  const roundedPercent = Math.round(roadmapPercent);

  return (
    <div className="relative mx-auto w-full max-w-[34rem]">
      <div className="absolute -inset-10 -z-10 rounded-full bg-brand-500/10 blur-3xl" />
      <div className="glass-card overflow-hidden rounded-3xl">
        <div className="flex items-center justify-between border-b px-5 py-4 sm:px-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--text-faint)]">
              Your progress
            </p>
            <p className="mt-1 text-sm font-semibold">Frontend roadmap</p>
          </div>
          <Link
            className="rounded-lg px-2 py-1 text-xs font-bold text-brand-600 hover:bg-brand-500/10 dark:text-brand-500"
            to="/completed"
          >
            View details
          </Link>
        </div>
        <div className="grid gap-6 p-5 sm:grid-cols-[auto_1fr] sm:items-center sm:p-6">
          <div
            aria-label={`${roundedPercent}% of roadmap complete`}
            className="progress-ring mx-auto grid size-32 place-items-center rounded-full sm:mx-0"
            role="img"
            style={{ '--progress': `${roundedPercent * 3.6}deg` } as CSSProperties}
          >
            <div className="grid size-[6.35rem] place-items-center rounded-full bg-[var(--surface)] text-center">
              <span>
                <strong className="block text-3xl font-black tracking-[-0.05em]">
                  {roundedPercent}%
                </strong>
                <small className="text-[0.65rem] font-semibold text-[var(--text-faint)]">
                  complete
                </small>
              </span>
            </div>
          </div>
          <div>
            <span className="text-xs font-semibold text-[var(--text-faint)]">Current stage</span>
            <h2 className="mt-1 text-xl font-extrabold tracking-[-0.03em]">{currentStage}</h2>
            <p className="mt-1 text-sm text-[var(--text-soft)]">
              {currentStageCount} of {currentStageTotal} concepts completed
            </p>
            <ProgressBar className="mt-4" value={(currentStageCount / currentStageTotal) * 100} />
            <Link
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-500 dark:text-brand-500"
              to="/roadmap"
            >
              See stage details <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-3 divide-x border-t bg-[var(--surface-muted)]/45">
          <SnapshotStat icon={CheckCircle2} label="Roadmap" value={roadmapCount} />
          <SnapshotStat icon={Trophy} label="Completed" value={completedContent} />
          <SnapshotStat icon={Bookmark} label="Saved" value={bookmarks} />
        </div>
      </div>
    </div>
  );
}

function SnapshotStat({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: number;
}) {
  return (
    <div className="px-3 py-4 text-center">
      <Icon className="mx-auto size-4 text-[var(--text-faint)]" />
      <strong className="mt-1.5 block text-lg">{value}</strong>
      <span className="block text-[0.62rem] font-semibold text-[var(--text-faint)]">{label}</span>
    </div>
  );
}

function PathCard({
  icon: Icon,
  title,
  description,
  href,
  meta,
  action,
  tone,
  steps,
}: (typeof pathCards)[number]) {
  const toneStyles = {
    amber: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    violet: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
    cyan: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
  };

  return (
    <article className="surface-card group flex h-full flex-col rounded-3xl p-6 transition hover:-translate-y-0.5 hover:border-brand-500/35 hover:shadow-xl hover:shadow-brand-500/5">
      <div className="flex items-start justify-between gap-4">
        <span className={cn('grid size-11 place-items-center rounded-xl', toneStyles[tone])}>
          <Icon className="size-5" />
        </span>
        <span className="rounded-full border px-2.5 py-1 text-[0.65rem] font-bold text-[var(--text-faint)]">
          {meta}
        </span>
      </div>
      <h3 className="mt-5 text-xl font-extrabold tracking-[-0.03em]">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[var(--text-soft)]">{description}</p>
      <ol className="mt-5 space-y-2.5 border-t pt-5">
        {steps.map((step, index) => (
          <li className="flex items-center gap-3 text-xs font-semibold" key={step}>
            <span className="grid size-5 place-items-center rounded-full bg-[var(--surface-muted)] text-[0.62rem] text-[var(--text-faint)]">
              {index + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>
      <Link
        className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-600 hover:text-brand-500 dark:text-brand-500"
        to={href}
      >
        {action} <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
      </Link>
    </article>
  );
}

function MilestoneCard({
  current,
  target,
  unit,
  label,
  href,
  icon: Icon,
}: {
  current: number;
  target: number;
  unit: string;
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
}) {
  const visibleCount = Math.min(current, target);
  const complete = current >= target;

  return (
    <Link
      className="group rounded-2xl border bg-[var(--bg)] p-5 transition hover:border-brand-500/35 hover:bg-brand-500/[0.035]"
      to={href}
    >
      <div className="flex items-center gap-3">
        <span
          className={cn(
            'grid size-9 place-items-center rounded-xl',
            complete
              ? 'bg-emerald-500/10 text-emerald-500'
              : 'bg-brand-500/10 text-brand-600 dark:text-brand-500',
          )}
        >
          {complete ? <Check className="size-4" /> : <Icon className="size-4" />}
        </span>
        <span className="flex-1">
          <span className="block text-xs font-bold uppercase tracking-wider text-[var(--text-faint)]">
            {label}
          </span>
          <strong className="mt-0.5 block text-sm">
            {visibleCount}/{target} {unit}
          </strong>
        </span>
        <ChevronRight className="size-4 text-[var(--text-faint)] transition group-hover:translate-x-0.5" />
      </div>
      <div className="mt-4 flex gap-1" aria-label={`${visibleCount} of ${target} ${unit}`}>
        {Array.from({ length: target }, (_, index) => (
          <span
            className={cn(
              'h-1.5 flex-1 rounded-full',
              index < visibleCount
                ? complete
                  ? 'bg-emerald-500'
                  : 'bg-brand-500'
                : 'bg-[var(--surface-muted)]',
            )}
            key={index}
          />
        ))}
      </div>
    </Link>
  );
}

function ToolLink({ icon: Icon, title, description, href, color }: (typeof toolkit)[number]) {
  return (
    <Link
      className="group flex items-center gap-4 rounded-2xl border bg-[var(--surface)] p-4 transition hover:border-brand-500/35"
      to={href}
    >
      <span className={cn('grid size-10 shrink-0 place-items-center rounded-xl', color)}>
        <Icon className="size-[1.1rem]" />
      </span>
      <span className="min-w-0 flex-1">
        <strong className="block text-sm">{title}</strong>
        <span className="mt-1 block text-xs leading-5 text-[var(--text-faint)]">{description}</span>
      </span>
      <ChevronRight className="size-4 shrink-0 text-[var(--text-faint)] transition group-hover:translate-x-0.5 group-hover:text-brand-500" />
    </Link>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-3 max-w-2xl text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">
        {title}
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--text-soft)] sm:text-base">
        {description}
      </p>
    </div>
  );
}
