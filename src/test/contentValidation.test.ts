import { describe, expect, it } from 'vitest';
import { dsaPatterns } from '@/content/dsa/dsaPatterns';
import { dsaProblems } from '@/content/dsa/dsaProblems';
import { glossaryTerms } from '@/content/glossary/glossaryTerms';
import { urlNavigationLesson } from '@/content/lessons/browser/urlNavigationLesson';
import { practiceQuestions } from '@/content/practice/practiceQuestionBank';
import { systemDesignLearningTopics } from '@/content/system-design/systemDesignTopics';
import { systemDesignCases } from '@/data/systemDesign';
import { tutorials } from '@/data/tutorials';

const hasUniqueIds = (items: Array<{ id: string }>) =>
  new Set(items.map((item) => item.id)).size === items.length;

describe('content collections', () => {
  it('ships the first-release curriculum counts with unique identifiers', () => {
    expect(glossaryTerms).toHaveLength(51);
    expect(tutorials.length).toBeGreaterThanOrEqual(640);
    expect(practiceQuestions.length).toBeGreaterThanOrEqual(1000);
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

  it('ships original plain-English coverage for the new preparation tracks', () => {
    const sourceCategories = new Set([
      'interview-preparation',
      'machine-coding-guide',
      'javascript-coding',
      'dsa-interview-guide',
      'framework-fundamentals',
    ]);
    const sourceTutorials = tutorials.filter((tutorial) => sourceCategories.has(tutorial.category));

    expect(sourceTutorials.length).toBeGreaterThanOrEqual(90);
    expect(
      sourceTutorials.every(
        (tutorial) =>
          tutorial.sections[0]?.title === 'In plain English' &&
          (tutorial.sections[0]?.content.length ?? 0) >= 60 &&
          tutorial.practiceExercises.every((exercise) => exercise.length >= 20),
      ),
    ).toBe(true);
  });

  it('keeps every pattern practice link inside the local problem library', () => {
    const slugs = new Set(dsaProblems.map((problem) => problem.slug));
    for (const pattern of dsaPatterns) {
      expect(slugs.has(pattern.beginnerProblemSlug)).toBe(true);
      expect(slugs.has(pattern.intermediateProblemSlug)).toBe(true);
      expect(slugs.has(pattern.advancedProblemSlug)).toBe(true);
    }
  });

  it('validates the progressive URL-navigation lesson and rich question fields', () => {
    expect(urlNavigationLesson.sections).toHaveLength(6);
    expect(urlNavigationLesson.revisionNotes.length).toBeGreaterThanOrEqual(5);
    expect(
      practiceQuestions.every(
        (question) =>
          question.correctAnswers.length > 0 &&
          question.detailedExplanation.length >= 30 &&
          question.whyWrong.length >= 15,
      ),
    ).toBe(true);
  });

  it('meets the planned practice coverage by subject', () => {
    const counts = practiceQuestions.reduce<Record<string, number>>((totals, question) => {
      totals[question.category] = (totals[question.category] ?? 0) + 1;
      return totals;
    }, {});
    const minimums: Record<string, number> = {
      'Browser and internet': 40,
      HTML: 50,
      CSS: 75,
      JavaScript: 150,
      TypeScript: 60,
      React: 100,
      'Next.js': 60,
      Testing: 40,
      Performance: 40,
      Accessibility: 30,
      Security: 30,
      'Frontend system design': 75,
      DSA: 150,
      'Machine coding': 50,
    };
    for (const [category, minimum] of Object.entries(minimums)) {
      expect(counts[category], category).toBeGreaterThanOrEqual(minimum);
    }
  });
});
