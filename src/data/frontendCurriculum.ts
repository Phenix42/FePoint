import curriculum from '@/data/frontendCurriculum.json';
import type { FrontendJourneyStage } from '@/types/content';

export type { FrontendJourneyStage } from '@/types/content';

export interface FrontendCurriculumLesson {
  slug: string;
  title: string;
}

export interface FrontendCurriculumCategory {
  id: string;
  label: string;
  navigationLabel: string;
  stage: FrontendJourneyStage;
  description: string;
  estimatedWeeks: number;
  lessons: FrontendCurriculumLesson[];
}

export const frontendCurriculum = curriculum as FrontendCurriculumCategory[];

export const getCurriculumLessonHref = (category: string, lessonSlug: string) =>
  '/tutorials/' + category + '/' + lessonSlug;
