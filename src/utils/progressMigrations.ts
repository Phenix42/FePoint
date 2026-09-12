import type { AppSnapshot } from '@/store/useAppStore';
import { frontendCurriculum } from '@/data/frontendCurriculum';

export const progressDefaults = {
  bookmarks: [],
  completed: {},
  roadmapCompleted: {},
  recentItems: [],
  searchHistory: [],
  notes: [],
  readingProgress: {},
  practiceAttempts: {},
  dsaProgress: {},
  patternMastery: {},
  revisionQueue: [],
} satisfies AppSnapshot;

const currentTutorials = frontendCurriculum.flatMap((category) =>
  category.lessons.map((lesson) => ({
    id: 'tutorial-' + category.id + '-' + lesson.slug,
    url: '/tutorials/' + category.id + '/' + lesson.slug,
  })),
);
const currentTutorialIds = new Set(currentTutorials.map((tutorial) => tutorial.id));
const currentTutorialUrls = new Set(currentTutorials.map((tutorial) => tutorial.url));
const currentTutorialCompletionKeys = new Set(
  currentTutorials.map((tutorial) => 'tutorial:' + tutorial.id),
);
const currentRoadmapKeys = new Set(
  frontendCurriculum.flatMap((category) =>
    category.lessons.map((lesson) => category.id + ':' + lesson.title),
  ),
);

const filterRecord = <T>(record: Record<string, T>, keep: (key: string) => boolean) =>
  Object.fromEntries(Object.entries(record).filter(([key]) => keep(key)));

export const migrateProgressSnapshot = (persistedState: unknown): AppSnapshot => {
  if (!persistedState || typeof persistedState !== 'object') return { ...progressDefaults };
  const previous = persistedState as Partial<AppSnapshot>;
  return {
    bookmarks: Array.isArray(previous.bookmarks)
      ? previous.bookmarks.filter(
          (bookmark) => bookmark.type !== 'tutorial' || currentTutorialUrls.has(bookmark.url),
        )
      : [],
    completed: filterRecord(previous.completed ?? {}, (key) =>
      key.startsWith('tutorial:') ? currentTutorialCompletionKeys.has(key) : true,
    ),
    roadmapCompleted: filterRecord(previous.roadmapCompleted ?? {}, (key) =>
      currentRoadmapKeys.has(key),
    ),
    recentItems: Array.isArray(previous.recentItems)
      ? previous.recentItems.filter(
          (item) => item.type !== 'tutorial' || currentTutorialUrls.has(item.url),
        )
      : [],
    searchHistory: Array.isArray(previous.searchHistory) ? previous.searchHistory : [],
    notes: Array.isArray(previous.notes)
      ? previous.notes.filter(
          (note) => note.contentType !== 'tutorial' || currentTutorialIds.has(note.contentId),
        )
      : [],
    readingProgress: filterRecord(previous.readingProgress ?? {}, (key) =>
      currentTutorialIds.has(key),
    ),
    practiceAttempts: filterRecord(
      previous.practiceAttempts ?? {},
      (key) => !key.startsWith('practice-tutorial-'),
    ),
    dsaProgress: previous.dsaProgress ?? {},
    patternMastery: previous.patternMastery ?? {},
    revisionQueue: Array.isArray(previous.revisionQueue)
      ? previous.revisionQueue.filter(
          (item) =>
            (item.contentType !== 'tutorial' || currentTutorialIds.has(item.contentId)) &&
            !(item.contentType === 'practice' && item.contentId.startsWith('practice-tutorial-')),
        )
      : [],
  };
};
