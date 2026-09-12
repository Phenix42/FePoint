import { describe, expect, it } from 'vitest';
import { dsaPatterns } from '@/content/dsa/dsaPatterns';
import { dsaProblems } from '@/content/dsa/dsaProblems';
import { glossaryTerms } from '@/content/glossary/glossaryTerms';
import { practiceQuestions } from '@/content/practice/practiceQuestionBank';
import { systemDesignLearningTopics } from '@/content/system-design/systemDesignTopics';
import { frontendCurriculum } from '@/data/frontendCurriculum';
import { systemDesignCases } from '@/data/systemDesign';
import { tutorials } from '@/data/tutorials';
import { tutorialSchema } from '@/schemas/contentSchemas';

const hasUniqueIds = (items: Array<{ id: string }>) =>
  new Set(items.map((item) => item.id)).size === items.length;

describe('content collections', () => {
  it('ships the authored frontend course and keeps collection identifiers unique', () => {
    const manifestLessonCount = frontendCurriculum.reduce(
      (total, category) => total + category.lessons.length,
      0,
    );

    expect(tutorials).toHaveLength(manifestLessonCount);
    expect(tutorials).toHaveLength(29);
    expect(glossaryTerms).toHaveLength(51);
    expect(practiceQuestions.length).toBeGreaterThanOrEqual(300);
    expect(dsaPatterns).toHaveLength(10);
    expect(dsaProblems).toHaveLength(25);
    expect(systemDesignCases.length).toBeGreaterThanOrEqual(30);
    expect(systemDesignLearningTopics.length).toBeGreaterThanOrEqual(20);

    for (const collection of [
      glossaryTerms,
      tutorials,
      practiceQuestions,
      dsaPatterns,
      dsaProblems,
      systemDesignCases,
      systemDesignLearningTopics,
    ]) {
      expect(hasUniqueIds(collection)).toBe(true);
    }
  });

  it('validates every lesson against the standard content structure', () => {
    for (const tutorial of tutorials) {
      expect(tutorialSchema.safeParse(tutorial).success, tutorial.slug).toBe(true);
      expect(tutorial.definition.length).toBeGreaterThanOrEqual(25);
      expect(tutorial.example.walkthrough.length).toBeGreaterThan(0);
      expect(tutorial.realWorldExample.steps.length).toBeGreaterThanOrEqual(2);
      expect(tutorial.keyPoints.length).toBeGreaterThanOrEqual(3);
      expect(tutorial.interviewQuestions.some((question) => question.level === 'Basic')).toBe(true);
      expect(
        tutorial.interviewQuestions.some((question) => question.level === 'Intermediate'),
      ).toBe(true);
      expect(tutorial.sources.every((source) => source.url.startsWith('https://'))).toBe(true);
    }
  });

  it('keeps the manifest, route order, and lesson relationships connected', () => {
    const manifestRoutes = frontendCurriculum.flatMap((category) =>
      category.lessons.map((lesson) => `${category.id}/${lesson.slug}`),
    );
    const tutorialRoutes = tutorials.map((tutorial) => `${tutorial.category}/${tutorial.slug}`);
    const slugs = new Set(tutorials.map((tutorial) => tutorial.slug));

    expect(tutorialRoutes).toEqual(manifestRoutes);
    expect(tutorials.map((tutorial) => tutorial.order)).toEqual(tutorials.map((_, index) => index));
    for (const tutorial of tutorials) {
      expect(tutorial.relatedSlugs.every((slug) => slugs.has(slug))).toBe(true);
    }
  });

  it('keeps every pattern practice link inside the local problem library', () => {
    const slugs = new Set(dsaProblems.map((problem) => problem.slug));
    for (const pattern of dsaPatterns) {
      expect(slugs.has(pattern.beginnerProblemSlug)).toBe(true);
      expect(slugs.has(pattern.intermediateProblemSlug)).toBe(true);
      expect(slugs.has(pattern.advancedProblemSlug)).toBe(true);
    }
  });

  it('keeps rich explanations on the independent practice bank', () => {
    expect(
      practiceQuestions.every(
        (question) =>
          question.correctAnswers.length > 0 &&
          question.detailedExplanation.length >= 30 &&
          question.whyWrong.length >= 15,
      ),
    ).toBe(true);
  });
});
