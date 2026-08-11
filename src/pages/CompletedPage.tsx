import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Bookmark,
  BrainCircuit,
  Check,
  CheckCircle2,
  Clock3,
  Code2,
  Download,
  FileUp,
  ListChecks,
  RotateCcw,
  StickyNote,
} from 'lucide-react';
import { useRef, useState, type ComponentType } from 'react';
import { Link } from 'react-router-dom';
import { Button, buttonStyles } from '@/components/common/Button';
import { EmptyState } from '@/components/common/EmptyState';
import { PageHero } from '@/components/common/PageHero';
import { ProgressBar } from '@/components/common/ProgressBar';
import { Seo } from '@/components/common/Seo';
import { dsaProblems } from '@/content/dsa/dsaProblems';
import { interviewQuestions } from '@/data/interviewQuestions';
import { machineCodingChallenges } from '@/data/machineCoding';
import { practiceQuestions } from '@/data/practiceQuestions';
import { roadmapStages, totalRoadmapItems } from '@/data/roadmap';
import { systemDesignCases } from '@/data/systemDesign';
import { tutorials } from '@/data/tutorials';
import { isRoadmapItemCompleted, useAppStore } from '@/store/useAppStore';
import type { ContentType } from '@/types/content';
import { downloadJson } from '@/utils/storage';

interface ResolvedItem {
  id: string;
  title: string;
  type: ContentType;
  url: string;
}

export default function CompletedPage() {
  const bookmarks = useAppStore((state) => state.bookmarks);
  const completed = useAppStore((state) => state.completed);
  const dsaProgress = useAppStore((state) => state.dsaProgress);
  const exportSnapshot = useAppStore((state) => state.exportSnapshot);
  const importSnapshot = useAppStore((state) => state.importSnapshot);
  const notes = useAppStore((state) => state.notes);
  const practiceAttempts = useAppStore((state) => state.practiceAttempts);
  const recentItems = useAppStore((state) => state.recentItems);
  const resetAll = useAppStore((state) => state.resetAll);
  const roadmapCompleted = useAppStore((state) => state.roadmapCompleted);
  const fileRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState('');

  const resolved = resolveCompleted(completed);
  const roadmapCount = Object.values(roadmapCompleted).filter(Boolean).length;
  const roadmapPercent = (roadmapCount / totalRoadmapItems) * 100;
  const completedTutorials = resolved.filter((item) => item.type === 'tutorial').length;
  const completedChallenges = resolved.filter((item) => item.type === 'challenge').length;
  const attemptedQuestions = Object.keys(practiceAttempts).length;
  const attempts = Object.values(practiceAttempts).reduce((sum, item) => sum + item.attempts, 0);
  const correctAttempts = Object.values(practiceAttempts).reduce(
    (sum, item) => sum + item.correctAttempts,
    0,
  );
  const practiceAccuracy = attempts ? (correctAttempts / attempts) * 100 : 0;
  const solvedDsa = Object.values(dsaProgress).filter((status) =>
    ['solved-independently', 'solved-with-hints', 'reviewed'].includes(status),
  ).length;
  const continueItem = recentItems[0];

  const importFile = async (file: File | undefined) => {
    if (!file) return;
    try {
      const value = JSON.parse(await file.text()) as unknown;
      const result = importSnapshot(value);
      setMessage(result.message);
    } catch {
      setMessage('The selected file is not valid JSON.');
    } finally {
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  return (
    <>
      <Seo
        description="See your frontend roadmap, practice, DSA, machine-coding, bookmarks, and notes progress in one place."
        path="/completed"
        title="My progress"
      />
      <PageHero
        aside={
          <div className="glass-card min-w-64 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold">Roadmap progress</span>
              <BarChart3 className="size-5 text-brand-500" />
            </div>
            <strong className="mt-3 block text-3xl font-extrabold">
              {Math.round(roadmapPercent)}%
            </strong>
            <p className="mt-1 text-xs text-[var(--text-faint)]">
              {roadmapCount} of {totalRoadmapItems} concepts complete
            </p>
            <ProgressBar className="mt-4" value={roadmapPercent} />
          </div>
        }
        description="See what you have covered, find the next step, and revisit saved work. Everything is stored privately in this browser."
        eyebrow="Your learning dashboard"
        title="All your progress, in one clear view."
      />

      <div className="page-shell py-10 sm:py-14">
        {continueItem && (
          <section className="surface-card flex flex-col gap-4 rounded-2xl p-5 sm:flex-row sm:items-center">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-500">
              <Clock3 className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[0.65rem] font-bold uppercase tracking-wider text-[var(--text-faint)]">
                Continue learning
              </p>
              <h2 className="mt-1 truncate font-bold">{continueItem.title}</h2>
              <p className="mt-1 truncate text-sm text-[var(--text-soft)]">
                {continueItem.description}
              </p>
            </div>
            <Link
              className={buttonStyles({ variant: 'secondary', size: 'sm' })}
              to={continueItem.url}
            >
              Resume <ArrowRight className="size-4" />
            </Link>
          </section>
        )}

        <section className={continueItem ? 'mt-10' : ''}>
          <div>
            <span className="eyebrow">Preparation overview</span>
            <h2 className="mt-3 text-2xl font-extrabold tracking-[-0.035em] sm:text-3xl">
              Your work across every track
            </h2>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              current={completedTutorials}
              href="/tutorials"
              icon={BookOpen}
              label="Lessons completed"
              target={tutorials.length}
            />
            <MetricCard
              current={attemptedQuestions}
              detail={
                attempts
                  ? `${Math.round(practiceAccuracy)}% answer accuracy`
                  : 'Start a practice set'
              }
              href="/practice"
              icon={BrainCircuit}
              label="Questions practised"
              target={practiceQuestions.length}
            />
            <MetricCard
              current={solvedDsa}
              href="/dsa/problems"
              icon={ListChecks}
              label="DSA problems solved"
              target={dsaProblems.length}
            />
            <MetricCard
              current={completedChallenges}
              href="/machine-coding"
              icon={Code2}
              label="Interfaces built"
              target={machineCodingChallenges.length}
            />
          </div>
        </section>

        <section className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_.85fr]">
          <div>
            <div className="flex items-end justify-between gap-4">
              <div>
                <span className="eyebrow">Frontend roadmap</span>
                <h2 className="mt-3 text-2xl font-extrabold tracking-[-0.035em]">
                  Stage-by-stage progress
                </h2>
              </div>
              <Link
                className="hidden items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-500 sm:inline-flex dark:text-brand-500"
                to="/roadmap"
              >
                Open roadmap <ArrowRight className="size-3.5" />
              </Link>
            </div>
            <div className="surface-card mt-6 overflow-hidden rounded-2xl">
              {roadmapStages.map((stage) => {
                const count = stage.items.filter((item) =>
                  isRoadmapItemCompleted(roadmapCompleted, stage.id, item),
                ).length;
                const percentage = (count / stage.items.length) * 100;
                const complete = count === stage.items.length;

                return (
                  <div
                    className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b p-4 last:border-b-0 sm:gap-4 sm:px-5"
                    key={stage.id}
                  >
                    <span
                      className={
                        complete
                          ? 'grid size-8 place-items-center rounded-full bg-emerald-500 text-white'
                          : 'grid size-8 place-items-center rounded-full border text-xs font-bold text-[var(--text-faint)]'
                      }
                    >
                      {complete ? <Check className="size-4" /> : stage.number}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center justify-between gap-3">
                        <strong className="truncate text-sm">{stage.title}</strong>
                        <span className="text-[0.65rem] font-semibold text-[var(--text-faint)]">
                          {count}/{stage.items.length}
                        </span>
                      </div>
                      <ProgressBar className="mt-2" value={percentage} />
                    </div>
                    <span className="w-9 text-right text-xs font-bold">
                      {Math.round(percentage)}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <span className="eyebrow">Your library</span>
            <h2 className="mt-3 text-2xl font-extrabold tracking-[-0.035em]">Saved for later</h2>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Link
                className="surface-card group rounded-2xl p-5 transition hover:border-brand-500/35"
                to="/bookmarks"
              >
                <Bookmark className="size-5 text-brand-500" />
                <strong className="mt-4 block text-2xl">{bookmarks.length}</strong>
                <span className="mt-1 block text-xs text-[var(--text-faint)]">bookmarks</span>
              </Link>
              <div className="surface-card rounded-2xl p-5">
                <StickyNote className="size-5 text-violet-500" />
                <strong className="mt-4 block text-2xl">{notes.length}</strong>
                <span className="mt-1 block text-xs text-[var(--text-faint)]">personal notes</span>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {notes.length ? (
                notes.slice(0, 4).map((note) => (
                  <div className="surface-card rounded-2xl p-4" key={note.id}>
                    <p className="flex items-center gap-2 text-sm font-bold">
                      <StickyNote className="size-4 text-violet-500" /> {note.title}
                    </p>
                    <p className="mt-2 line-clamp-3 whitespace-pre-line text-sm leading-6 text-[var(--text-soft)]">
                      {note.body}
                    </p>
                  </div>
                ))
              ) : (
                <p className="rounded-2xl border p-5 text-sm leading-6 text-[var(--text-faint)]">
                  Notes you add while practising will appear here for quick revision.
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="mt-12">
          <div>
            <span className="eyebrow">Completed content</span>
            <h2 className="mt-3 text-2xl font-extrabold tracking-[-0.035em]">Review your wins</h2>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {resolved.length ? (
              resolved.map((item) => (
                <Link
                  className="surface-card flex items-center gap-3 rounded-2xl p-4 transition hover:border-brand-500/35"
                  key={item.type + item.id}
                  to={item.url}
                >
                  <CheckCircle2 className="size-5 shrink-0 text-emerald-500" />
                  <span className="min-w-0 flex-1 truncate font-semibold">{item.title}</span>
                  <span className="text-[0.65rem] text-[var(--text-faint)]">
                    {item.type.replace('-', ' ')}
                  </span>
                </Link>
              ))
            ) : (
              <div className="md:col-span-2">
                <EmptyState
                  description="Mark lessons, questions, and challenges complete as you learn."
                  title="Nothing completed yet"
                />
              </div>
            )}
          </div>
        </section>

        <section className="mt-12 rounded-2xl border bg-[var(--surface-muted)]/50 p-5 sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="font-bold">Manage local progress data</h2>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-[var(--text-soft)]">
                Export a backup, import progress on another device, or reset the data stored in this
                browser.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => downloadJson(exportSnapshot(), 'fepoint-progress.json')}>
                <Download className="size-4" /> Export
              </Button>
              <Button onClick={() => fileRef.current?.click()} variant="secondary">
                <FileUp className="size-4" /> Import
              </Button>
              <input
                accept="application/json"
                className="hidden"
                onChange={(event) => void importFile(event.target.files?.[0])}
                ref={fileRef}
                type="file"
              />
              <Button
                onClick={() => {
                  if (window.confirm('Reset all bookmarks, progress, notes, and history?'))
                    resetAll();
                }}
                variant="danger"
              >
                <RotateCcw className="size-4" /> Reset all
              </Button>
            </div>
          </div>
          {message && (
            <p
              aria-live="polite"
              className="mt-4 rounded-xl border bg-[var(--surface)] p-3 text-sm"
            >
              {message}
            </p>
          )}
        </section>
      </div>
    </>
  );
}

function MetricCard({
  current,
  target,
  label,
  detail,
  href,
  icon: Icon,
}: {
  current: number;
  target: number;
  label: string;
  detail?: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
}) {
  return (
    <Link
      className="surface-card group rounded-2xl p-5 transition hover:-translate-y-0.5 hover:border-brand-500/35"
      to={href}
    >
      <div className="flex items-start justify-between">
        <span className="grid size-10 place-items-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-500">
          <Icon className="size-[1.1rem]" />
        </span>
        <ArrowRight className="size-4 text-[var(--text-faint)] transition group-hover:translate-x-0.5 group-hover:text-brand-500" />
      </div>
      <p className="mt-5 text-2xl font-extrabold tracking-[-0.04em]">
        {current}
        <span className="text-sm font-semibold text-[var(--text-faint)]"> / {target}</span>
      </p>
      <p className="mt-1 text-sm font-bold">{label}</p>
      <p className="mt-1 text-xs text-[var(--text-faint)]">
        {detail ?? `${Math.round((current / target) * 100)}% complete`}
      </p>
      <ProgressBar className="mt-4" value={(current / target) * 100} />
    </Link>
  );
}

function resolveCompleted(completed: Record<string, boolean>): ResolvedItem[] {
  const items: ResolvedItem[] = [
    ...tutorials.map((item) => ({
      id: item.id,
      title: item.title,
      type: 'tutorial' as const,
      url: '/tutorials/' + item.category + '/' + item.slug,
    })),
    ...interviewQuestions.map((item) => ({
      id: item.id,
      title: item.question,
      type: 'question' as const,
      url: '/interview-questions/' + item.technology.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    })),
    ...practiceQuestions.map((item) => ({
      id: item.id,
      title: item.question,
      type: 'practice' as const,
      url: '/practice',
    })),
    ...machineCodingChallenges.map((item) => ({
      id: item.id,
      title: item.title,
      type: 'challenge' as const,
      url: '/machine-coding/' + item.slug,
    })),
    ...systemDesignCases.map((item) => ({
      id: item.id,
      title: item.title,
      type: 'system-design' as const,
      url: '/system-design/' + item.slug,
    })),
  ];
  return items.filter((item) => completed[item.type + ':' + item.id]);
}
