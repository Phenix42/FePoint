import { ArrowRight, ChevronDown } from 'lucide-react';
import { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  frontendCurriculum,
  getCurriculumLessonHref,
  type FrontendJourneyStage,
} from '@/data/frontendCurriculum';
import { cn } from '@/utils/cn';

const stageStyles: Record<FrontendJourneyStage, string> = {
  Beginner: 'bg-[#685cf6]/10 text-[#5549e5] dark:text-[#aaa4ff]',
  Intermediate: 'bg-[var(--surface-muted)] text-[var(--text-soft)]',
  Advanced: 'bg-[var(--text)] text-[var(--bg)]',
  'Interview Ready':
    'border border-[#685cf6]/25 bg-[#685cf6]/10 text-[#5549e5] dark:text-[#aaa4ff]',
};

export function TutorialCurriculumNav({
  currentPath,
  mobileOpen = true,
  onNavigate,
}: {
  currentPath: string;
  mobileOpen?: boolean;
  onNavigate?: () => void;
}) {
  const curriculumId = useId();
  const activeCategory = frontendCurriculum.find(
    (category) =>
      currentPath === '/tutorials/' + category.id ||
      currentPath.startsWith('/tutorials/' + category.id + '/'),
  );
  const [categoryPreference, setCategoryPreference] = useState<{
    path: string;
    categoryId: string | null;
  }>({ path: currentPath, categoryId: activeCategory?.id ?? null });
  const openCategory =
    categoryPreference.path === currentPath
      ? categoryPreference.categoryId
      : (activeCategory?.id ?? null);

  return (
    <div className="ml-4 border-l border-[#685cf6]/20 pb-2 pl-3 pt-3">
      <div className="px-2 pb-3">
        <p className="text-[0.63rem] font-extrabold uppercase tracking-[0.16em] text-[#685cf6]">
          Getting Started
        </p>
        <p className="mt-1 text-[0.68rem] leading-4 text-[var(--text-faint)]">
          Beginner → Intermediate → Advanced → Interview Ready
        </p>
      </div>

      <ul className="space-y-1">
        {frontendCurriculum.map((category, index) => {
          const open = openCategory === category.id;
          const active = category.id === activeCategory?.id;
          const showStage = index === 0 || frontendCurriculum[index - 1]?.stage !== category.stage;
          const panelId = curriculumId + '-curriculum-' + category.id;

          return (
            <li key={category.id}>
              {showStage && (
                <p
                  className={cn(
                    'mb-1 mt-3 inline-flex rounded-md px-2 py-1 text-[0.58rem] font-extrabold uppercase tracking-[0.11em]',
                    stageStyles[category.stage],
                  )}
                >
                  {category.stage}
                </p>
              )}
              <button
                aria-controls={panelId}
                aria-expanded={open}
                className={cn(
                  'flex min-h-9 w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs font-semibold transition hover:bg-[var(--surface-muted)] hover:text-[var(--text)]',
                  active
                    ? 'bg-[#685cf6]/10 text-[#5549e5] dark:text-[#aaa4ff]'
                    : 'text-[var(--text-soft)]',
                )}
                onClick={() =>
                  setCategoryPreference({
                    path: currentPath,
                    categoryId: open ? null : category.id,
                  })
                }
                tabIndex={mobileOpen ? undefined : -1}
                type="button"
              >
                <span className="min-w-0 flex-1">{category.navigationLabel}</span>
                <span className="text-[0.6rem] tabular-nums text-[var(--text-faint)]">
                  {category.lessons.length}
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    'size-3.5 shrink-0 text-[var(--text-faint)] transition-transform',
                    open && 'rotate-180',
                  )}
                />
              </button>

              {open && (
                <div className="pb-2" id={panelId}>
                  <p className="px-2 pb-2 pt-1 text-[0.68rem] leading-4 text-[var(--text-faint)]">
                    {category.description}
                  </p>
                  <ul className="space-y-0.5 border-l pl-2">
                    {category.lessons.map((lesson) => (
                      <li key={lesson.slug}>
                        <Link
                          className="block rounded-md px-2 py-1.5 text-[0.69rem] leading-4 text-[var(--text-faint)] transition hover:bg-[var(--surface-muted)] hover:text-[var(--text)]"
                          onClick={onNavigate}
                          tabIndex={mobileOpen ? undefined : -1}
                          to={getCurriculumLessonHref(category.id, lesson.slug)}
                        >
                          {lesson.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    className="mt-2 flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[0.68rem] font-bold text-[#5549e5] transition hover:bg-[#685cf6]/10 dark:text-[#aaa4ff]"
                    onClick={onNavigate}
                    tabIndex={mobileOpen ? undefined : -1}
                    to={'/tutorials/' + category.id}
                  >
                    Explore {category.label}
                    <ArrowRight aria-hidden="true" className="size-3" />
                  </Link>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
