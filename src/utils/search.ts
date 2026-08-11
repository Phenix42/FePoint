import Fuse from 'fuse.js';
import { dsaPatterns } from '@/content/dsa/dsaPatterns';
import { dsaProblems } from '@/content/dsa/dsaProblems';
import { dsaTopics } from '@/content/dsa/dsaTopics';
import { glossaryTerms } from '@/content/glossary/glossaryTerms';
import { practiceQuestions } from '@/content/practice/practiceQuestionBank';
import { systemDesignLearningTopics } from '@/content/system-design/systemDesignTopics';
import { companies } from '@/data/companies';
import { interviewQuestions } from '@/data/interviewQuestions';
import { machineCodingChallenges } from '@/data/machineCoding';
import { codingProblems } from '@/data/practiceQuestions';
import { resources } from '@/data/resources';
import { systemDesignCases } from '@/data/systemDesign';
import { tutorials } from '@/data/tutorials';
import type { ContentType, SearchDocument } from '@/types/content';

export const searchDocuments: SearchDocument[] = [
  ...tutorials.map((tutorial) => ({
    id: tutorial.id,
    type: 'tutorial' as const,
    title: tutorial.title,
    description: tutorial.description,
    url: '/tutorials/' + tutorial.category + '/' + tutorial.slug,
    tags: tutorial.tags,
    category: tutorial.categoryLabel,
  })),
  ...interviewQuestions.map((question) => ({
    id: question.id,
    type: 'question' as const,
    title: question.question,
    description: question.shortAnswer,
    url: '/interview-questions/' + question.technology.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    tags: question.tags,
    category: question.technology,
  })),
  ...codingProblems.map((problem) => ({
    id: problem.id,
    type: 'practice' as const,
    title: problem.title,
    description: problem.statement,
    url: '/practice/javascript',
    tags: ['javascript', 'coding', problem.difficulty.toLowerCase()],
    category: 'Coding problem',
  })),
  ...practiceQuestions.map((question) => ({
    id: question.id,
    type: 'practice' as const,
    title: question.title,
    description: question.question,
    url: '/practice',
    tags: question.tags,
    category: question.category,
  })),
  ...machineCodingChallenges.map((challenge) => ({
    id: challenge.id,
    type: 'challenge' as const,
    title: challenge.title,
    description: challenge.description,
    url: '/machine-coding/' + challenge.slug,
    tags: [challenge.technology, challenge.kind, challenge.difficulty],
    category: 'Machine coding',
  })),
  ...systemDesignCases.map((caseStudy) => ({
    id: caseStudy.id,
    type: 'system-design' as const,
    title: caseStudy.title,
    description: caseStudy.description,
    url: '/system-design/' + caseStudy.slug,
    tags: ['architecture', 'frontend', caseStudy.difficulty],
    category: 'System design',
  })),
  ...systemDesignLearningTopics.map((topic) => ({
    id: topic.id,
    type: 'system-design' as const,
    title: topic.title,
    description: topic.simpleExplanation,
    url: '/system-design/fundamentals/' + topic.slug,
    tags: [topic.group, 'architecture', 'fundamentals'],
    category: 'System design concept',
  })),
  ...glossaryTerms.map((term) => ({
    id: term.id,
    type: 'glossary' as const,
    title: term.term,
    description: term.simpleDefinition,
    url: '/glossary?term=' + term.slug,
    tags: [term.category, ...term.relatedTerms],
    category: 'Glossary · ' + term.category,
  })),
  ...dsaTopics.map((topic) => ({
    id: topic.id,
    type: 'dsa-topic' as const,
    title: topic.title,
    description: topic.simpleExplanation,
    url: `/dsa/${topic.kind === 'algorithm' ? 'algorithms' : 'data-structures'}/${topic.slug}`,
    tags: [topic.kind, ...topic.relatedSlugs],
    category: 'DSA concept',
  })),
  ...dsaPatterns.map((pattern) => ({
    id: pattern.id,
    type: 'dsa-pattern' as const,
    title: pattern.title,
    description: pattern.simpleExplanation,
    url: '/dsa/patterns/' + pattern.slug,
    tags: pattern.keywords,
    category: 'DSA pattern',
  })),
  ...dsaProblems.map((problem) => ({
    id: problem.id,
    type: 'dsa-problem' as const,
    title: problem.title,
    description: problem.summary,
    url: '/dsa/problems/' + problem.slug,
    tags: [problem.patternSlug, problem.dataStructure, problem.difficulty],
    category: 'DSA problem',
  })),
  ...companies.map((company) => ({
    id: company.id,
    type: 'company' as const,
    title: company.name,
    description: company.overview,
    url: '/companies/' + company.slug,
    tags: company.technologies,
    category: 'Company guide',
  })),
  ...resources.map((resource) => ({
    id: resource.id,
    type: 'resource' as const,
    title: resource.name,
    description: resource.description,
    url: resource.url,
    tags: resource.tags,
    category: resource.category,
  })),
];

const fuse = new Fuse(searchDocuments, {
  keys: [
    { name: 'title', weight: 0.5 },
    { name: 'tags', weight: 0.25 },
    { name: 'description', weight: 0.15 },
    { name: 'category', weight: 0.1 },
  ],
  threshold: 0.36,
  ignoreLocation: true,
  includeMatches: true,
});

export const searchContent = (
  query: string,
  type: ContentType | 'all' = 'all',
  limit = 40,
): SearchDocument[] => {
  const normalised = query.trim();
  const candidates = normalised
    ? fuse.search(normalised, { limit: Math.max(limit, 60) }).map((result) => result.item)
    : searchDocuments;
  return candidates.filter((document) => type === 'all' || document.type === type).slice(0, limit);
};
