import type { Tutorial } from '@/types/content';

export type TutorialDraft = Omit<Tutorial, 'id' | 'order' | 'updatedAt' | 'popularity'>;

export const defineTutorials = <T extends TutorialDraft[]>(tutorials: T): T => tutorials;
