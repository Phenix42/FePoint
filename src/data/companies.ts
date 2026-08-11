import type { Company } from '@/types/content';
import { interviewQuestions } from '@/data/interviewQuestions';

const companySeeds = [
  ['Google', '#171717', 'Advanced'],
  ['Amazon', '#262626', 'Advanced'],
  ['Microsoft', '#404040', 'Advanced'],
  ['Meta', '#525252', 'Advanced'],
  ['Adobe', '#171717', 'Advanced'],
  ['Atlassian', '#262626', 'Advanced'],
  ['Flipkart', '#404040', 'Intermediate'],
  ['Walmart', '#525252', 'Intermediate'],
  ['Uber', '#111111', 'Advanced'],
  ['Salesforce', '#262626', 'Intermediate'],
  ['PhonePe', '#404040', 'Intermediate'],
  ['Razorpay', '#525252', 'Advanced'],
  ['Paytm', '#171717', 'Intermediate'],
  ['Swiggy', '#262626', 'Intermediate'],
  ['Zomato', '#404040', 'Intermediate'],
  ['Deloitte', '#525252', 'Intermediate'],
  ['Accenture', '#171717', 'Intermediate'],
  ['TCS', '#262626', 'Intermediate'],
  ['Infosys', '#404040', 'Intermediate'],
  ['Cognizant', '#525252', 'Intermediate'],
] as const;

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-');

export const companies: Company[] = companySeeds.map(([name, color, difficulty], index) => ({
  id: 'company-' + (index + 1),
  slug: slugify(name),
  name,
  monogram: name.slice(0, 2).toUpperCase(),
  color,
  overview:
    name +
    ' frontend interviews commonly evaluate JavaScript fundamentals, UI problem solving, product thinking, and the ability to explain engineering trade-offs.',
  difficulty,
  rounds: [
    'Recruiter conversation',
    'JavaScript and browser fundamentals',
    'Coding or machine-coding exercise',
    'Frontend system design',
    'Behavioural or hiring-manager conversation',
  ],
  technologies:
    index % 3 === 0
      ? ['JavaScript', 'React', 'Performance', 'System design']
      : ['JavaScript', 'TypeScript', 'React', 'Accessibility'],
  preparationTips: [
    'Clarify scope and narrate assumptions before coding.',
    'Practise one timed UI build and review it for keyboard access.',
    'Prepare stories that show ownership, collaboration, and measurable impact.',
  ],
  questionIds: interviewQuestions
    .filter((_, questionIndex) => (questionIndex + index) % 3 === 0)
    .slice(0, 5)
    .map((question) => question.id),
  machineCodingQuestions: ['Build a searchable data table', 'Create an accessible autocomplete'],
  systemDesignQuestions: ['Design a high-traffic product feed', 'Design a resilient dashboard'],
}));
