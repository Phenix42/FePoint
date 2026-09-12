import { foundationTutorials } from '@/content/tutorials/foundations';
import { javascriptTutorials } from '@/content/tutorials/javascript';
import { modernFrontendTutorials } from '@/content/tutorials/modernFrontend';
import type { TutorialDraft } from '@/content/tutorials/tutorialDraft';
import { frontendCurriculum } from '@/data/frontendCurriculum';
import { tutorialSchema, validateUniqueIds } from '@/schemas/contentSchemas';
import type { Tutorial } from '@/types/content';

const tutorialDrafts: TutorialDraft[] = [
  ...foundationTutorials,
  ...javascriptTutorials,
  ...modernFrontendTutorials,
];

const manifestLessons = frontendCurriculum.flatMap((category) =>
  category.lessons.map((lesson) => ({ ...lesson, category: category.id })),
);

if (tutorialDrafts.length !== manifestLessons.length) {
  throw new Error(
    `Tutorial manifest has ${manifestLessons.length} lessons but ${tutorialDrafts.length} were authored.`,
  );
}

export const tutorials: Tutorial[] = validateUniqueIds(
  tutorialDrafts.map((draft, index) => {
    const manifestLesson = manifestLessons[index];
    if (
      !manifestLesson ||
      draft.category !== manifestLesson.category ||
      draft.slug !== manifestLesson.slug ||
      draft.title !== manifestLesson.title
    ) {
      throw new Error(
        `Tutorial order mismatch at ${index + 1}: expected ${manifestLesson?.category}/${manifestLesson?.slug}, received ${draft.category}/${draft.slug}.`,
      );
    }

    return tutorialSchema.parse({
      ...draft,
      id: 'tutorial-' + draft.category + '-' + draft.slug,
      order: index,
      updatedAt: '2026-08-15',
      popularity: Math.max(70, 100 - index),
    });
  }),
  'tutorial',
);

const tutorialSlugs = new Set(tutorials.map((tutorial) => tutorial.slug));
for (const tutorial of tutorials) {
  for (const relatedSlug of tutorial.relatedSlugs) {
    if (!tutorialSlugs.has(relatedSlug)) {
      throw new Error(`Unknown related tutorial slug "${relatedSlug}" in ${tutorial.slug}.`);
    }
  }
}

export const tutorialCategories = frontendCurriculum.map((category) => ({
  slug: category.id,
  label: category.label,
  description: category.description,
  count: category.lessons.length,
}));

export const getTutorial = (category: string | undefined, slug: string | undefined) =>
  tutorials.find((tutorial) => tutorial.category === category && tutorial.slug === slug);

export const getTutorialBySlug = (slug: string | undefined) =>
  tutorials.find((tutorial) => tutorial.slug === slug);

export const getTutorialsByCategory = (category: string | undefined) =>
  category ? tutorials.filter((tutorial) => tutorial.category === category) : tutorials;

export const getAdjacentTutorials = (tutorial: Tutorial) => ({
  previous: tutorial.order > 0 ? tutorials[tutorial.order - 1] : undefined,
  next: tutorial.order < tutorials.length - 1 ? tutorials[tutorial.order + 1] : undefined,
});

export const getTutorialPosition = (tutorial: Tutorial) => {
  const categoryTutorials = getTutorialsByCategory(tutorial.category);
  return {
    categoryIndex: categoryTutorials.findIndex((item) => item.id === tutorial.id) + 1,
    categoryTotal: categoryTutorials.length,
    courseIndex: tutorial.order + 1,
    courseTotal: tutorials.length,
  };
};
