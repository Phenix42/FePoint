export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type ThemePreference = 'light' | 'dark' | 'system';
export type ContentType =
  | 'tutorial'
  | 'question'
  | 'practice'
  | 'challenge'
  | 'system-design'
  | 'company'
  | 'resource'
  | 'glossary'
  | 'dsa-topic'
  | 'dsa-pattern'
  | 'dsa-problem';

export interface CodeExample {
  title: string;
  language: 'html' | 'css' | 'javascript' | 'typescript' | 'tsx' | 'json';
  code: string;
  explanation: string;
  preview?: string;
}

export interface TutorialSection {
  id: string;
  title: string;
  content: string;
}

export interface Tutorial {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  categoryLabel: string;
  subcategory: string;
  difficulty: Difficulty;
  estimatedReadTime: number;
  order: number;
  prerequisites: string[];
  learningObjectives: string[];
  sections: TutorialSection[];
  codeExamples: CodeExample[];
  commonMistakes: string[];
  bestPractices: string[];
  interviewQuestions: string[];
  practiceExercises: string[];
  relatedTopics: string[];
  tags: string[];
  updatedAt: string;
  popularity: number;
}

export interface RoadmapStage {
  id: string;
  number: number;
  title: string;
  description: string;
  color: string;
  estimatedWeeks: number;
  items: string[];
}

export interface InterviewQuestion {
  id: string;
  slug: string;
  question: string;
  shortAnswer: string;
  explanation: string;
  technology: string;
  difficulty: Difficulty;
  experience: 'Fresher' | '1-3 years' | '3-5 years' | '5+ years';
  type: 'Conceptual' | 'Output' | 'Coding' | 'Scenario' | 'Behavioural' | 'Debugging';
  companies: string[];
  round: string;
  code?: string;
  language?: CodeExample['language'];
  commonIncorrectAnswer: string;
  followUp: string;
  relatedTutorialSlugs: string[];
  tags: string[];
}

export interface PracticeQuestion {
  id: string;
  title: string;
  question: string;
  category: string;
  subcategory: string;
  difficulty: Difficulty;
  experienceLevel: 'Foundation' | 'Junior' | 'Mid-level' | 'Senior';
  questionType:
    | 'Multiple choice'
    | 'Multiple answer'
    | 'True or false'
    | 'Fill in the blank'
    | 'Predict the output'
    | 'Find the bug'
    | 'Correct the code'
    | 'Conceptual'
    | 'Scenario'
    | 'Coding challenge'
    | 'Architecture decision';
  options?: Array<{ id: string; label: string }>;
  correctAnswers: string[];
  detailedExplanation: string;
  simpleExplanation: string;
  code?: string;
  commonWrongAnswer: string;
  whyWrong: string;
  hint: string;
  relatedTutorialSlug?: string;
  relatedQuestionIds: string[];
  tags: string[];
  estimatedMinutes: number;
  companies: string[];
}

export interface LearningObjective {
  id: string;
  text: string;
}

export interface LessonSection {
  id: string;
  title: string;
  simpleExplanation: string;
  detailedExplanation: string;
}

export interface TerminologyReference {
  termId: string;
  label: string;
}

export interface CodeWalkthroughLine {
  line: number;
  code: string;
  explanation: string;
}

export interface CodeWalkthrough {
  language: CodeExample['language'];
  title: string;
  lines: CodeWalkthroughLine[];
  output: string;
}

export interface Lesson {
  id: string;
  slug: string;
  category: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  estimatedMinutes: number;
  objectives: LearningObjective[];
  prerequisites: string[];
  terminology: TerminologyReference[];
  analogy: string;
  whyItExists: string;
  problemItSolves: string;
  simpleExplanation: string;
  developerExplanation: string;
  interviewExplanation: string;
  advancedExplanation: string;
  sections: LessonSection[];
  walkthrough: CodeWalkthrough;
  commonMistakes: string[];
  edgeCases: string[];
  bestPractices: string[];
  performanceNotes: string[];
  exercises: string[];
  miniProject: string;
  revisionNotes: string[];
  relatedLessonSlugs: string[];
  updatedAt: string;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  slug: string;
  category: string;
  simpleDefinition: string;
  definition: string;
  analogy: string;
  relatedTerms: string[];
}

export interface Quiz {
  id: string;
  title: string;
  questionIds: string[];
  durationMinutes?: number;
  passingPercentage: number;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  questionId: string;
  selectedAnswers: string[];
  correct: boolean;
  attemptedAt: string;
}

export interface ComplexityAnalysis {
  time: string;
  space: string;
  explanation: string;
}

export interface DsaSolution {
  language: 'javascript' | 'typescript';
  approach: string;
  code: string;
  complexity: ComplexityAnalysis;
}

export interface DsaTopic {
  id: string;
  slug: string;
  title: string;
  kind: 'fundamental' | 'data-structure' | 'algorithm';
  description: string;
  simpleExplanation: string;
  analogy: string;
  keyOperations: string[];
  complexity: ComplexityAnalysis;
  javascriptExample: string;
  typescriptExample: string;
  relatedSlugs: string[];
}

export interface DsaPattern {
  id: string;
  slug: string;
  title: string;
  description: string;
  simpleExplanation: string;
  identifyWhen: string[];
  keywords: string[];
  analogy: string;
  visualSteps: string[];
  javascriptTemplate: string;
  typescriptTemplate: string;
  beginnerProblemSlug: string;
  intermediateProblemSlug: string;
  advancedProblemSlug: string;
  commonMistakes: string[];
  complexity: ComplexityAnalysis;
  relatedPatterns: string[];
  interviewQuestions: string[];
}

export type DsaProgressStatus =
  | 'not-started'
  | 'attempted'
  | 'solved-independently'
  | 'solved-with-hints'
  | 'reviewed'
  | 'needs-revision';

export interface DsaProblem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  difficulty: Difficulty;
  patternSlug: string;
  dataStructure: string;
  collection: 'Foundation' | 'Pattern learning' | 'Blind 75' | 'Frontend utility' | 'Advanced';
  examples: Array<{ input: string; output: string; explanation: string }>;
  constraints: string[];
  visualSteps: string[];
  bruteForceThinking: string;
  bruteForceSolution: DsaSolution;
  optimisationSteps: string[];
  optimisedSolutions: DsaSolution[];
  dryRun: string[];
  edgeCases: string[];
  commonMistakes: string[];
  hints: string[];
  relatedProblemSlugs: string[];
  interviewFollowUps: string[];
  externalPracticeUrl?: string;
  frontendConnection: string;
}

export interface SystemDesignTopic {
  id: string;
  slug: string;
  title: string;
  group: 'fundamentals' | 'backend-for-frontend' | 'frontend';
  simpleExplanation: string;
  developerExplanation: string;
  frontendImpact: string;
  analogy: string;
  tradeOffs: string[];
  relatedSlugs: string[];
}

export interface LearningProgress {
  completed: Record<string, boolean>;
  readingProgress: Record<string, number>;
  practiceAttempts: Record<string, PracticeAttemptSummary>;
  dsaProgress: Record<string, DsaProgressStatus>;
  patternMastery: Record<string, number>;
}

export interface PracticeAttemptSummary {
  attempts: number;
  correctAttempts: number;
  lastResult: 'correct' | 'incorrect';
  lastAttemptedAt: string;
}

export interface RevisionItem {
  id: string;
  contentId: string;
  contentType: ContentType;
  reason: 'wrong-answer' | 'needs-revision' | 'manual';
  addedAt: string;
}

export interface CodingProblem {
  id: string;
  slug: string;
  title: string;
  difficulty: Difficulty;
  statement: string;
  examples: string[];
  constraints: string[];
  hints: string[];
  basicSolution: string;
  optimisedSolution: string;
  timeComplexity: string;
  spaceComplexity: string;
  followUps: string[];
}

export interface MachineCodingChallenge {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  estimatedMinutes: 30 | 60 | 90;
  technology: 'React' | 'JavaScript' | 'TypeScript';
  kind: 'UI component' | 'Full application';
  functionalRequirements: string[];
  uiRequirements: string[];
  edgeCases: string[];
  evaluationCriteria: string[];
  componentStructure: string[];
  dataModel: string;
  starterCode: string;
  hints: string[];
  solution: string;
  followUps: string[];
}

export interface SystemDesignCaseStudy {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  estimatedReadTime: number;
  functionalRequirements: string[];
  nonFunctionalRequirements: string[];
  userFlow: string[];
  components: string[];
  dataModels: string[];
  apiContracts: string[];
  stateDecision: string;
  cachingStrategy: string;
  performance: string[];
  accessibility: string[];
  security: string[];
  tradeOffs: string[];
  followUps: string[];
}

export interface Company {
  id: string;
  slug: string;
  name: string;
  monogram: string;
  color: string;
  overview: string;
  difficulty: Difficulty;
  rounds: string[];
  technologies: string[];
  preparationTips: string[];
  questionIds: string[];
  machineCodingQuestions: string[];
  systemDesignQuestions: string[];
}

export interface Resource {
  id: string;
  name: string;
  description: string;
  category: string;
  url: string;
  pricing: 'Free' | 'Freemium' | 'Paid';
  tags: string[];
}

export interface Bookmark {
  id: string;
  contentId: string;
  type: ContentType;
  title: string;
  description: string;
  url: string;
  createdAt: string;
}

export interface RecentItem {
  id: string;
  type: ContentType;
  title: string;
  description: string;
  url: string;
  viewedAt: string;
}

export interface LocalNote {
  id: string;
  contentId: string;
  contentType: ContentType;
  title: string;
  body: string;
  updatedAt: string;
}

export interface SearchDocument {
  id: string;
  type: ContentType;
  title: string;
  description: string;
  url: string;
  tags: string[];
  category: string;
}
