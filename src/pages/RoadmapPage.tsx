import { Check, ChevronDown, Clock3, RotateCcw, Route, Trophy } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { buttonStyles, Button } from '@/components/common/Button';
import { PageHero } from '@/components/common/PageHero';
import { ProgressBar } from '@/components/common/ProgressBar';
import { Seo } from '@/components/common/Seo';
import { roadmapStages, totalRoadmapItems } from '@/data/roadmap';
import { isRoadmapItemCompleted, useAppStore } from '@/store/useAppStore';
import { cn } from '@/utils/cn';

export default function RoadmapPage() {
  const roadmapCompleted = useAppStore((state) => state.roadmapCompleted);
  const toggleRoadmapItem = useAppStore((state) => state.toggleRoadmapItem);
  const resetRoadmap = useAppStore((state) => state.resetRoadmap);
  const [openStages, setOpenStages] = useState<string[]>(roadmapStages.map((stage) => stage.id));
  const completedCount = Object.values(roadmapCompleted).filter(Boolean).length;
  const percentage = (completedCount / totalRoadmapItems) * 100;

  const toggleStage = (stageId: string) =>
    setOpenStages((current) =>
      current.includes(stageId)
        ? current.filter((item) => item !== stageId)
        : [...current, stageId],
    );

  return (
    <>
      <Seo
        description="A complete, interactive frontend development roadmap from web fundamentals to frontend system design."
        path="/roadmap"
        title="Frontend learning roadmap"
      />
      <PageHero
        actions={
          <>
            <Link className={buttonStyles()} to="/tutorials/browser">
              Start stage one
            </Link>
            <Button
              disabled={completedCount === 0}
              onClick={() => {
                if (window.confirm('Reset all roadmap progress on this device?')) resetRoadmap();
              }}
              variant="secondary"
            >
              <RotateCcw className="size-4" /> Reset progress
            </Button>
          </>
        }
        aside={
          <div className="glass-card min-w-64 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold">Overall progress</span>
              <Trophy className="size-5 text-amber-500" />
            </div>
            <strong className="mt-3 block text-3xl font-extrabold">
              {Math.round(percentage)}%
            </strong>
            <p className="mt-1 text-xs text-[var(--text-faint)]">
              {completedCount} of {totalRoadmapItems} topics complete
            </p>
            <ProgressBar className="mt-4" value={percentage} />
          </div>
        }
        description="Follow eight deliberate stages. Check off every concept locally, move at your own pace, and revisit any topic whenever you need it."
        eyebrow="Your frontend path"
        title="One roadmap. From first request to system architecture."
      />

      <div className="page-shell py-14 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="relative space-y-6 before:absolute before:bottom-8 before:left-[1.45rem] before:top-8 before:w-px before:bg-gradient-to-b before:from-brand-500 before:via-violet-500 before:to-cyan-500 sm:before:left-[2.45rem]">
            {roadmapStages.map((stage) => {
              const stageCompleted = stage.items.filter((item) =>
                isRoadmapItemCompleted(roadmapCompleted, stage.id, item),
              ).length;
              const stagePercent = (stageCompleted / stage.items.length) * 100;
              const open = openStages.includes(stage.id);
              const route =
                stage.id === 'system-design' ? '/system-design' : '/tutorials/' + stage.id;

              return (
                <section className="relative pl-14 sm:pl-20" key={stage.id}>
                  <span
                    className={cn(
                      'absolute left-0 top-5 z-10 grid size-12 place-items-center rounded-2xl border-4 border-[var(--bg)] text-sm font-black shadow-lg sm:size-13',
                      stagePercent === 100
                        ? 'bg-emerald-500 text-white'
                        : 'bg-[var(--surface)] text-brand-500',
                    )}
                  >
                    {stagePercent === 100 ? <Check className="size-5" /> : stage.number}
                  </span>
                  <div className="surface-card overflow-hidden rounded-2xl">
                    <button
                      aria-expanded={open}
                      className="flex w-full items-center gap-4 p-5 text-left sm:p-6"
                      onClick={() => toggleStage(stage.id)}
                      type="button"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <strong className="text-lg tracking-[-0.02em] sm:text-xl">
                            {stage.title}
                          </strong>
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--text-faint)]">
                            <Clock3 className="size-3.5" /> {stage.estimatedWeeks} weeks
                          </span>
                        </span>
                        <span className="mt-2 block text-sm leading-6 text-[var(--text-soft)]">
                          {stage.description}
                        </span>
                        <ProgressBar className="mt-4" value={stagePercent} />
                      </span>
                      <ChevronDown
                        className={cn(
                          'size-5 shrink-0 text-[var(--text-faint)] transition',
                          open && 'rotate-180',
                        )}
                      />
                    </button>
                    {open && (
                      <div className="border-t bg-[var(--surface-muted)]/35 p-3 sm:p-5">
                        <div className="grid gap-2 sm:grid-cols-2">
                          {stage.items.map((item) => {
                            const complete = isRoadmapItemCompleted(
                              roadmapCompleted,
                              stage.id,
                              item,
                            );
                            return (
                              <button
                                aria-pressed={complete}
                                className={cn(
                                  'flex min-h-11 items-center gap-3 rounded-xl border px-3 py-2.5 text-left text-sm transition',
                                  complete
                                    ? 'border-emerald-500/25 bg-emerald-500/8 text-[var(--text)]'
                                    : 'bg-[var(--surface)] text-[var(--text-soft)] hover:border-brand-500/35',
                                )}
                                key={item}
                                onClick={() => toggleRoadmapItem(stage.id, item)}
                                type="button"
                              >
                                <span
                                  className={cn(
                                    'grid size-5 shrink-0 place-items-center rounded-md border',
                                    complete
                                      ? 'border-emerald-500 bg-emerald-500 text-white'
                                      : 'border-[var(--border-strong)]',
                                  )}
                                >
                                  {complete && <Check className="size-3" />}
                                </span>
                                {item}
                              </button>
                            );
                          })}
                        </div>
                        <div className="mt-4 flex justify-end">
                          <Link
                            className={buttonStyles({ size: 'sm', variant: 'secondary' })}
                            to={route}
                          >
                            <Route className="size-4" /> Open learning material
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
