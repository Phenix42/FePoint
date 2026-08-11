import { z } from 'zod';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type {
  Bookmark,
  ContentType,
  DsaProgressStatus,
  LocalNote,
  PracticeAttemptSummary,
  RecentItem,
  RevisionItem,
  ThemePreference,
} from '@/types/content';
import { migrateProgressSnapshot } from '@/utils/progressMigrations';

const contentTypeSchema = z.enum([
  'tutorial',
  'question',
  'practice',
  'challenge',
  'system-design',
  'company',
  'resource',
  'glossary',
  'dsa-topic',
  'dsa-pattern',
  'dsa-problem',
]);
const completedSchema = z.record(z.string(), z.boolean());
const bookmarkSchema = z.object({
  id: z.string(),
  contentId: z.string(),
  type: contentTypeSchema,
  title: z.string(),
  description: z.string(),
  url: z.string(),
  createdAt: z.string(),
});
const recentSchema = z.object({
  id: z.string(),
  type: contentTypeSchema,
  title: z.string(),
  description: z.string(),
  url: z.string(),
  viewedAt: z.string(),
});
const noteSchema = z.object({
  id: z.string(),
  contentId: z.string(),
  contentType: contentTypeSchema,
  title: z.string(),
  body: z.string(),
  updatedAt: z.string(),
});
const practiceAttemptSchema = z.object({
  attempts: z.number().int().nonnegative(),
  correctAttempts: z.number().int().nonnegative(),
  lastResult: z.enum(['correct', 'incorrect']),
  lastAttemptedAt: z.string(),
});
const dsaStatusSchema = z.enum([
  'not-started',
  'attempted',
  'solved-independently',
  'solved-with-hints',
  'reviewed',
  'needs-revision',
]);
const revisionSchema = z.object({
  id: z.string(),
  contentId: z.string(),
  contentType: contentTypeSchema,
  reason: z.enum(['wrong-answer', 'needs-revision', 'manual']),
  addedAt: z.string(),
});
const snapshotSchema = z.object({
  bookmarks: z.array(bookmarkSchema),
  completed: completedSchema,
  roadmapCompleted: completedSchema,
  recentItems: z.array(recentSchema),
  searchHistory: z.array(z.string()),
  notes: z.array(noteSchema),
  readingProgress: z.record(z.string(), z.number().min(0).max(100)),
  practiceAttempts: z.record(z.string(), practiceAttemptSchema),
  dsaProgress: z.record(z.string(), dsaStatusSchema),
  patternMastery: z.record(z.string(), z.number().min(0).max(100)),
  revisionQueue: z.array(revisionSchema),
});

export type AppSnapshot = z.infer<typeof snapshotSchema>;

interface AppState extends AppSnapshot {
  toggleBookmark: (bookmark: Omit<Bookmark, 'id' | 'createdAt'>) => void;
  clearBookmarks: () => void;
  toggleCompleted: (type: ContentType, contentId: string) => void;
  toggleRoadmapItem: (stageId: string, item: string) => void;
  resetRoadmap: () => void;
  addRecent: (item: Omit<RecentItem, 'id' | 'viewedAt'>) => void;
  clearRecent: () => void;
  addSearch: (query: string) => void;
  clearSearchHistory: () => void;
  saveNote: (note: Omit<LocalNote, 'id' | 'updatedAt'>) => void;
  removeNote: (contentId: string, contentType: ContentType) => void;
  setReadingProgress: (contentId: string, value: number) => void;
  recordPracticeAnswer: (questionId: string, correct: boolean) => void;
  resetPracticeProgress: () => void;
  setDsaStatus: (problemId: string, status: DsaProgressStatus) => void;
  setPatternMastery: (patternId: string, value: number) => void;
  toggleRevision: (
    contentId: string,
    contentType: ContentType,
    reason?: RevisionItem['reason'],
  ) => void;
  exportSnapshot: () => AppSnapshot;
  importSnapshot: (value: unknown) => { success: boolean; message: string };
  resetAll: () => void;
}

const initialState: AppSnapshot = {
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
};

const contentKey = (type: ContentType, contentId: string) => type + ':' + contentId;
const roadmapKey = (stageId: string, item: string) => stageId + ':' + item;
const revisionKey = (type: ContentType, contentId: string) => `revision:${type}:${contentId}`;

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      ...initialState,
      toggleBookmark: (bookmark) =>
        set((state) => {
          const existing = state.bookmarks.some(
            (item) => item.contentId === bookmark.contentId && item.type === bookmark.type,
          );
          return {
            bookmarks: existing
              ? state.bookmarks.filter(
                  (item) => item.contentId !== bookmark.contentId || item.type !== bookmark.type,
                )
              : [
                  {
                    ...bookmark,
                    id: contentKey(bookmark.type, bookmark.contentId),
                    createdAt: new Date().toISOString(),
                  },
                  ...state.bookmarks,
                ],
          };
        }),
      clearBookmarks: () => set({ bookmarks: [] }),
      toggleCompleted: (type, contentId) =>
        set((state) => {
          const key = contentKey(type, contentId);
          return { completed: { ...state.completed, [key]: !state.completed[key] } };
        }),
      toggleRoadmapItem: (stageId, item) =>
        set((state) => {
          const key = roadmapKey(stageId, item);
          return {
            roadmapCompleted: {
              ...state.roadmapCompleted,
              [key]: !state.roadmapCompleted[key],
            },
          };
        }),
      resetRoadmap: () => set({ roadmapCompleted: {} }),
      addRecent: (item) =>
        set((state) => ({
          recentItems: [
            { ...item, id: contentKey(item.type, item.url), viewedAt: new Date().toISOString() },
            ...state.recentItems.filter((recent) => recent.url !== item.url),
          ].slice(0, 30),
        })),
      clearRecent: () => set({ recentItems: [] }),
      addSearch: (query) =>
        set((state) => {
          const cleanQuery = query.trim();
          if (!cleanQuery) return state;
          return {
            searchHistory: [
              cleanQuery,
              ...state.searchHistory.filter(
                (historyItem) => historyItem.toLowerCase() !== cleanQuery.toLowerCase(),
              ),
            ].slice(0, 8),
          };
        }),
      clearSearchHistory: () => set({ searchHistory: [] }),
      saveNote: (note) =>
        set((state) => ({
          notes: [
            {
              ...note,
              id: contentKey(note.contentType, note.contentId),
              updatedAt: new Date().toISOString(),
            },
            ...state.notes.filter(
              (item) => item.contentId !== note.contentId || item.contentType !== note.contentType,
            ),
          ],
        })),
      removeNote: (contentId, contentType) =>
        set((state) => ({
          notes: state.notes.filter(
            (note) => note.contentId !== contentId || note.contentType !== contentType,
          ),
        })),
      setReadingProgress: (contentId, value) =>
        set((state) => ({
          readingProgress: {
            ...state.readingProgress,
            [contentId]: Math.max(0, Math.min(100, Math.round(value))),
          },
        })),
      recordPracticeAnswer: (questionId, correct) =>
        set((state) => {
          const previous: PracticeAttemptSummary | undefined = state.practiceAttempts[questionId];
          const automaticRevisionId = revisionKey('practice', questionId);
          const revisionQueue = correct
            ? state.revisionQueue.filter(
                (item) => item.id !== automaticRevisionId || item.reason !== 'wrong-answer',
              )
            : [
                {
                  id: automaticRevisionId,
                  contentId: questionId,
                  contentType: 'practice' as const,
                  reason: 'wrong-answer' as const,
                  addedAt: new Date().toISOString(),
                },
                ...state.revisionQueue.filter((item) => item.id !== automaticRevisionId),
              ];
          return {
            practiceAttempts: {
              ...state.practiceAttempts,
              [questionId]: {
                attempts: (previous?.attempts ?? 0) + 1,
                correctAttempts: (previous?.correctAttempts ?? 0) + (correct ? 1 : 0),
                lastResult: correct ? 'correct' : 'incorrect',
                lastAttemptedAt: new Date().toISOString(),
              },
            },
            revisionQueue,
          };
        }),
      resetPracticeProgress: () =>
        set((state) => ({
          practiceAttempts: {},
          revisionQueue: state.revisionQueue.filter((item) => item.contentType !== 'practice'),
        })),
      setDsaStatus: (problemId, status) =>
        set((state) => {
          const id = revisionKey('dsa-problem', problemId);
          const revisionQueue =
            status === 'needs-revision'
              ? [
                  {
                    id,
                    contentId: problemId,
                    contentType: 'dsa-problem' as const,
                    reason: 'needs-revision' as const,
                    addedAt: new Date().toISOString(),
                  },
                  ...state.revisionQueue.filter((item) => item.id !== id),
                ]
              : state.revisionQueue.filter((item) => item.id !== id);
          return {
            dsaProgress: { ...state.dsaProgress, [problemId]: status },
            revisionQueue,
          };
        }),
      setPatternMastery: (patternId, value) =>
        set((state) => ({
          patternMastery: {
            ...state.patternMastery,
            [patternId]: Math.max(0, Math.min(100, Math.round(value))),
          },
        })),
      toggleRevision: (contentId, contentType, reason = 'manual') =>
        set((state) => {
          const id = revisionKey(contentType, contentId);
          const exists = state.revisionQueue.some((item) => item.id === id);
          return {
            revisionQueue: exists
              ? state.revisionQueue.filter((item) => item.id !== id)
              : [
                  { id, contentId, contentType, reason, addedAt: new Date().toISOString() },
                  ...state.revisionQueue,
                ],
          };
        }),
      exportSnapshot: () => {
        const state = get();
        return {
          bookmarks: state.bookmarks,
          completed: state.completed,
          roadmapCompleted: state.roadmapCompleted,
          recentItems: state.recentItems,
          searchHistory: state.searchHistory,
          notes: state.notes,
          readingProgress: state.readingProgress,
          practiceAttempts: state.practiceAttempts,
          dsaProgress: state.dsaProgress,
          patternMastery: state.patternMastery,
          revisionQueue: state.revisionQueue,
        };
      },
      importSnapshot: (value) => {
        if (
          !value ||
          typeof value !== 'object' ||
          !('bookmarks' in value) ||
          !('completed' in value) ||
          !('roadmapCompleted' in value)
        ) {
          return { success: false, message: 'This file is not a valid FEPoint progress export.' };
        }
        const result = snapshotSchema.safeParse(migrateProgressSnapshot(value));
        if (!result.success) {
          return { success: false, message: 'This file is not a valid FEPoint progress export.' };
        }
        set(result.data);
        return { success: true, message: 'Your local progress was imported successfully.' };
      },
      resetAll: () => set(initialState),
    }),
    {
      name: 'fepoint-local-data',
      version: 2,
      storage: createJSONStorage(() => localStorage),
      migrate: (persistedState) => migrateProgressSnapshot(persistedState),
      partialize: (state) => ({
        bookmarks: state.bookmarks,
        completed: state.completed,
        roadmapCompleted: state.roadmapCompleted,
        recentItems: state.recentItems,
        searchHistory: state.searchHistory,
        notes: state.notes,
        readingProgress: state.readingProgress,
        practiceAttempts: state.practiceAttempts,
        dsaProgress: state.dsaProgress,
        patternMastery: state.patternMastery,
        revisionQueue: state.revisionQueue,
      }),
    },
  ),
);

interface ThemeState {
  theme: ThemePreference;
  setTheme: (theme: ThemePreference) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'system',
      setTheme: (theme) => set({ theme }),
    }),
    { name: 'fepoint-theme' },
  ),
);

export const isCompleted = (
  completed: Record<string, boolean>,
  type: ContentType,
  contentId: string,
) => Boolean(completed[contentKey(type, contentId)]);

export const isRoadmapItemCompleted = (
  completed: Record<string, boolean>,
  stageId: string,
  item: string,
) => Boolean(completed[roadmapKey(stageId, item)]);
