import { frontendCurriculum } from '@/data/frontendCurriculum';
import type { RoadmapStage } from '@/types/content';

const stageColors = [
  'cyan',
  'orange',
  'blue',
  'yellow',
  'slate',
  'sky',
  'cyan',
  'violet',
  'emerald',
  'amber',
  'red',
  'purple',
  'violet',
];

export const roadmapStages: RoadmapStage[] = frontendCurriculum.map((category, index) => ({
  id: category.id,
  number: index + 1,
  title: category.label,
  description: category.description,
  color: stageColors[index] ?? 'violet',
  estimatedWeeks: category.estimatedWeeks,
  items: category.lessons.map((lesson) => lesson.title),
}));

export const totalRoadmapItems = roadmapStages.reduce((sum, stage) => sum + stage.items.length, 0);
