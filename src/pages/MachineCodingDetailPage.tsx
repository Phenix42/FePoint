import {
  ArrowLeft,
  CheckCircle2,
  CirclePause,
  Lightbulb,
  Play,
  RotateCcw,
  Timer,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Badge, DifficultyBadge } from '@/components/common/Badge';
import { BookmarkButton } from '@/components/common/BookmarkButton';
import { Button, buttonStyles } from '@/components/common/Button';
import { CodeBlock } from '@/components/common/CodeBlock';
import { CompletionButton } from '@/components/common/CompletionButton';
import { NoteEditor } from '@/components/common/NoteEditor';
import { Seo } from '@/components/common/Seo';
import { machineCodingChallenges } from '@/data/machineCoding';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { safeStorage } from '@/utils/storage';
import { cn } from '@/utils/cn';

const tabs = [
  'Problem',
  'Requirements',
  'Starter Code',
  'Hints',
  'Solution',
  'Evaluation',
] as const;
type Tab = (typeof tabs)[number];

export default function MachineCodingDetailPage() {
  const { challengeSlug } = useParams();
  const challenge = machineCodingChallenges.find((item) => item.slug === challengeSlug);
  const [activeTab, setActiveTab] = useState<Tab>('Problem');
  const timerKey = challenge ? 'fepoint-timer-' + challenge.id : '';
  const [seconds, setSeconds] = useState(() =>
    challenge ? safeStorage.get<number>(timerKey, challenge.estimatedMinutes * 60) : 0,
  );
  const [running, setRunning] = useState(false);

  useRecentlyViewed(
    challenge
      ? {
          type: 'challenge',
          title: challenge.title,
          description: challenge.description,
          url: '/machine-coding/' + challenge.slug,
        }
      : undefined,
  );

  useEffect(() => {
    if (!running || seconds <= 0) return undefined;
    const interval = window.setInterval(() => {
      setSeconds((value) => Math.max(0, value - 1));
    }, 1000);
    return () => window.clearInterval(interval);
  }, [running, seconds]);

  useEffect(() => {
    if (timerKey) safeStorage.set(timerKey, seconds);
  }, [seconds, timerKey]);

  const displayTime = useMemo(() => {
    const minutes = Math.floor(seconds / 60);
    const remainder = seconds % 60;
    return String(minutes).padStart(2, '0') + ':' + String(remainder).padStart(2, '0');
  }, [seconds]);

  if (!challenge) {
    return <MissingChallenge />;
  }

  const reset = () => {
    setRunning(false);
    setSeconds(challenge.estimatedMinutes * 60);
  };
  const timerActive = running && seconds > 0;
  const toggleTimer = () => {
    if (seconds === 0) {
      setSeconds(challenge.estimatedMinutes * 60);
      setRunning(true);
      return;
    }
    setRunning((value) => !value);
  };

  return (
    <>
      <Seo
        description={challenge.description}
        path={'/machine-coding/' + challenge.slug}
        title={challenge.title + ' machine-coding challenge'}
      />
      <div className="border-b bg-[var(--surface)]">
        <div className="page-shell flex min-h-16 items-center justify-between gap-3 py-3">
          <Link
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-soft)] hover:text-brand-500"
            to="/machine-coding"
          >
            <ArrowLeft className="size-4" /> All challenges
          </Link>
          <div
            aria-live="polite"
            className={cn(
              'flex items-center gap-3 rounded-xl border px-3 py-2 font-mono text-sm font-bold',
              seconds < 300
                ? 'border-red-500/30 bg-red-500/8 text-red-500'
                : 'bg-[var(--surface-muted)]',
            )}
          >
            <Timer className="size-4" /> {displayTime}
            <button
              aria-label={timerActive ? 'Pause timer' : 'Start timer'}
              className="grid size-7 place-items-center rounded-lg bg-brand-500 text-white"
              onClick={toggleTimer}
              type="button"
            >
              {timerActive ? <CirclePause className="size-3.5" /> : <Play className="size-3.5" />}
            </button>
            <button
              aria-label="Reset timer"
              className="grid size-7 place-items-center rounded-lg hover:bg-[var(--surface)]"
              onClick={reset}
              type="button"
            >
              <RotateCcw className="size-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="page-shell py-10 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_19rem]">
          <main className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <DifficultyBadge difficulty={challenge.difficulty} />
              <Badge tone="purple">{challenge.technology}</Badge>
              <Badge>{challenge.kind}</Badge>
            </div>
            <h1 className="mt-5 text-4xl font-extrabold tracking-[-0.045em] sm:text-5xl">
              {challenge.title}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--text-soft)]">
              {challenge.description}
            </p>

            <div
              aria-label="Challenge sections"
              className="mt-8 flex gap-1 overflow-x-auto border-b"
              role="tablist"
            >
              {tabs.map((tab) => (
                <button
                  aria-selected={activeTab === tab}
                  className={cn(
                    'shrink-0 border-b-2 px-4 py-3 text-xs font-bold transition',
                    activeTab === tab
                      ? 'border-brand-500 text-brand-500'
                      : 'border-transparent text-[var(--text-faint)] hover:text-[var(--text)]',
                  )}
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  role="tab"
                  type="button"
                >
                  {tab}
                </button>
              ))}
            </div>

            <section className="min-h-[28rem] py-8" role="tabpanel">
              {activeTab === 'Problem' && (
                <div className="prose-lesson">
                  <h2 className="mt-0!">Problem statement</h2>
                  <p>{challenge.description}</p>
                  <h2>What your interviewer is looking for</h2>
                  <p>
                    A working primary flow matters, but so does how you model state, recover from
                    edge cases, communicate status, and choose where complexity belongs.
                  </p>
                  <h2>Suggested data model</h2>
                  <p>{challenge.dataModel}</p>
                  <h2>Suggested component structure</h2>
                  <ul>
                    {challenge.componentStructure.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {activeTab === 'Requirements' && (
                <div className="grid gap-5 md:grid-cols-2">
                  <RequirementList
                    title="Functional requirements"
                    items={challenge.functionalRequirements}
                  />
                  <RequirementList title="UI requirements" items={challenge.uiRequirements} />
                  <RequirementList
                    className="md:col-span-2"
                    title="Edge cases"
                    items={challenge.edgeCases}
                  />
                </div>
              )}
              {activeTab === 'Starter Code' && (
                <CodeBlock
                  code={challenge.starterCode}
                  explanation="Use this shell or start from your own minimal Vite project."
                  language="tsx"
                  title="Challenge.tsx"
                />
              )}
              {activeTab === 'Hints' && (
                <div className="space-y-3">
                  {challenge.hints.map((hint, hintIndex) => (
                    <details className="surface-card rounded-2xl p-5" key={hint}>
                      <summary className="flex cursor-pointer list-none items-center gap-3 font-bold">
                        <Lightbulb className="size-4 text-amber-500" /> Hint {hintIndex + 1}
                      </summary>
                      <p className="mt-3 pl-7 text-sm leading-6 text-[var(--text-soft)]">{hint}</p>
                    </details>
                  ))}
                </div>
              )}
              {activeTab === 'Solution' && (
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
                  <h2 className="text-xl font-bold">Solution approach</h2>
                  <p className="mt-4 text-sm leading-7 text-[var(--text-soft)]">
                    {challenge.solution}
                  </p>
                  <h3 className="mt-6 font-bold">Interviewer follow-ups</h3>
                  <ul className="mt-3 space-y-2">
                    {challenge.followUps.map((item) => (
                      <li className="text-sm leading-6 text-[var(--text-soft)]" key={item}>
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {activeTab === 'Evaluation' && (
                <div className="surface-card rounded-2xl p-6">
                  <h2 className="text-xl font-bold">Self-review rubric</h2>
                  <div className="mt-5 space-y-3">
                    {challenge.evaluationCriteria.map((criterion, criterionIndex) => (
                      <label
                        className="flex items-center gap-3 rounded-xl border p-4 text-sm"
                        key={criterion}
                      >
                        <input className="size-4 accent-brand-500" type="checkbox" />
                        <span className="flex-1">{criterion}</span>
                        <span className="font-mono text-xs text-[var(--text-faint)]">
                          / {criterionIndex === 0 ? 30 : 20}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </section>
          </main>

          <aside className="space-y-4 lg:sticky lg:top-24">
            <div className="surface-card rounded-2xl p-5">
              <h2 className="text-sm font-bold">Local challenge controls</h2>
              <p className="mt-2 text-xs leading-5 text-[var(--text-faint)]">
                Your timer, completion, bookmark, and notes stay in this browser.
              </p>
              <div className="mt-4 grid gap-2">
                <Button onClick={toggleTimer}>
                  {timerActive ? <CirclePause className="size-4" /> : <Play className="size-4" />}
                  {timerActive ? 'Pause timer' : 'Start timer'}
                </Button>
                <CompletionButton contentId={challenge.id} type="challenge" />
                <BookmarkButton
                  className="h-11 rounded-xl"
                  contentId={challenge.id}
                  description={challenge.description}
                  showLabel
                  title={challenge.title}
                  type="challenge"
                  url={'/machine-coding/' + challenge.slug}
                />
              </div>
            </div>
            <NoteEditor
              contentId={challenge.id}
              contentType="challenge"
              key={challenge.id}
              title={challenge.title}
            />
          </aside>
        </div>
      </div>
    </>
  );
}

function RequirementList({
  title,
  items,
  className,
}: {
  title: string;
  items: string[];
  className?: string;
}) {
  return (
    <div className={'surface-card rounded-2xl p-5 ' + (className ?? '')}>
      <h2 className="font-bold">{title}</h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li className="flex gap-2 text-sm leading-6 text-[var(--text-soft)]" key={item}>
            <CheckCircle2 className="mt-1 size-4 shrink-0 text-emerald-500" /> {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function MissingChallenge() {
  return (
    <div className="page-shell py-24 text-center">
      <h1 className="text-4xl font-extrabold">Challenge not found</h1>
      <p className="mt-3 text-[var(--text-soft)]">This challenge may have moved.</p>
      <Link className={buttonStyles({ className: 'mt-7' })} to="/machine-coding">
        Browse challenges
      </Link>
    </div>
  );
}
