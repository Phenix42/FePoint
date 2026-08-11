import { z } from 'zod';

export const difficultySchema = z.enum(['Beginner', 'Intermediate', 'Advanced']);
export const complexitySchema = z.object({
  time: z.string().min(2),
  space: z.string().min(2),
  explanation: z.string().min(20),
});

export const glossaryTermSchema = z.object({
  id: z.string().min(2),
  term: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  category: z.string().min(2),
  simpleDefinition: z.string().min(15),
  definition: z.string().min(20),
  analogy: z.string().min(15),
  relatedTerms: z.array(z.string()),
});

export const lessonSchema = z.object({
  id: z.string().min(2),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  category: z.string().min(2),
  title: z.string().min(3),
  description: z.string().min(30),
  difficulty: difficultySchema,
  estimatedMinutes: z.number().int().positive(),
  objectives: z.array(z.object({ id: z.string(), text: z.string().min(10) })).min(3),
  prerequisites: z.array(z.string()).min(1),
  terminology: z.array(z.object({ termId: z.string(), label: z.string() })),
  analogy: z.string().min(30),
  whyItExists: z.string().min(30),
  problemItSolves: z.string().min(30),
  simpleExplanation: z.string().min(50),
  developerExplanation: z.string().min(50),
  interviewExplanation: z.string().min(50),
  advancedExplanation: z.string().min(50),
  sections: z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
        simpleExplanation: z.string().min(30),
        detailedExplanation: z.string().min(50),
      }),
    )
    .min(3),
  walkthrough: z.object({
    language: z.enum(['html', 'css', 'javascript', 'typescript', 'tsx', 'json']),
    title: z.string(),
    lines: z
      .array(
        z.object({
          line: z.number().int().positive(),
          code: z.string(),
          explanation: z.string().min(10),
        }),
      )
      .min(2),
    output: z.string(),
  }),
  commonMistakes: z.array(z.string()).min(2),
  edgeCases: z.array(z.string()).min(2),
  bestPractices: z.array(z.string()).min(2),
  performanceNotes: z.array(z.string()).min(1),
  exercises: z.array(z.string()).min(2),
  miniProject: z.string().min(20),
  revisionNotes: z.array(z.string()).min(5),
  relatedLessonSlugs: z.array(z.string()),
  updatedAt: z.iso.date(),
});

export const practiceQuestionSchema = z.object({
  id: z.string().min(2),
  title: z.string().min(3),
  question: z.string().min(10),
  category: z.string().min(2),
  subcategory: z.string().min(2),
  difficulty: difficultySchema,
  experienceLevel: z.enum(['Foundation', 'Junior', 'Mid-level', 'Senior']),
  questionType: z.enum([
    'Multiple choice',
    'Multiple answer',
    'True or false',
    'Fill in the blank',
    'Predict the output',
    'Find the bug',
    'Correct the code',
    'Conceptual',
    'Scenario',
    'Coding challenge',
    'Architecture decision',
  ]),
  options: z.array(z.object({ id: z.string(), label: z.string() })).optional(),
  correctAnswers: z.array(z.string()).min(1),
  detailedExplanation: z.string().min(30),
  simpleExplanation: z.string().min(15),
  code: z.string().optional(),
  commonWrongAnswer: z.string().min(2),
  whyWrong: z.string().min(15),
  hint: z.string().min(5),
  relatedTutorialSlug: z.string().optional(),
  relatedQuestionIds: z.array(z.string()),
  tags: z.array(z.string()).min(1),
  estimatedMinutes: z.number().int().positive(),
  companies: z.array(z.string()),
});

export const dsaPatternSchema = z.object({
  id: z.string(),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string(),
  description: z.string().min(30),
  simpleExplanation: z.string().min(30),
  identifyWhen: z.array(z.string()).min(2),
  keywords: z.array(z.string()).min(2),
  analogy: z.string().min(20),
  visualSteps: z.array(z.string()).min(3),
  javascriptTemplate: z.string().min(20),
  typescriptTemplate: z.string().min(20),
  beginnerProblemSlug: z.string(),
  intermediateProblemSlug: z.string(),
  advancedProblemSlug: z.string(),
  commonMistakes: z.array(z.string()).min(2),
  complexity: complexitySchema,
  relatedPatterns: z.array(z.string()),
  interviewQuestions: z.array(z.string()).min(2),
});

const dsaSolutionSchema = z.object({
  language: z.enum(['javascript', 'typescript']),
  approach: z.string().min(20),
  code: z.string().min(20),
  complexity: complexitySchema,
});

export const dsaProblemSchema = z.object({
  id: z.string(),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string(),
  summary: z.string().min(30),
  difficulty: difficultySchema,
  patternSlug: z.string(),
  dataStructure: z.string(),
  collection: z.enum([
    'Foundation',
    'Pattern learning',
    'Blind 75',
    'Frontend utility',
    'Advanced',
  ]),
  examples: z
    .array(z.object({ input: z.string(), output: z.string(), explanation: z.string().min(10) }))
    .min(1),
  constraints: z.array(z.string()).min(2),
  visualSteps: z.array(z.string()).min(3),
  bruteForceThinking: z.string().min(30),
  bruteForceSolution: dsaSolutionSchema,
  optimisationSteps: z.array(z.string()).min(2),
  optimisedSolutions: z.array(dsaSolutionSchema).min(2),
  dryRun: z.array(z.string()).min(3),
  edgeCases: z.array(z.string()).min(2),
  commonMistakes: z.array(z.string()).min(2),
  hints: z.array(z.string()).min(2),
  relatedProblemSlugs: z.array(z.string()),
  interviewFollowUps: z.array(z.string()).min(2),
  externalPracticeUrl: z.url().optional(),
  frontendConnection: z.string().min(30),
});

export const systemDesignTopicSchema = z.object({
  id: z.string(),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string(),
  group: z.enum(['fundamentals', 'backend-for-frontend', 'frontend']),
  simpleExplanation: z.string().min(30),
  developerExplanation: z.string().min(40),
  frontendImpact: z.string().min(30),
  analogy: z.string().min(20),
  tradeOffs: z.array(z.string()).min(2),
  relatedSlugs: z.array(z.string()),
});

export const validateUniqueIds = <T extends { id: string }>(items: T[], label: string) => {
  const ids = new Set<string>();
  for (const item of items) {
    if (ids.has(item.id)) throw new Error('Duplicate ' + label + ' id: ' + item.id);
    ids.add(item.id);
  }
  return items;
};
