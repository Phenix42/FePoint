import type { Company } from '@/types/content';
import { interviewQuestions } from '@/data/interviewQuestions';

const companySeeds = [
  ['Google', '#4285f4', 'Advanced'],
  ['Amazon', '#ff9900', 'Advanced'],
  ['Microsoft', '#00a4ef', 'Advanced'],
  ['Meta', '#0866ff', 'Advanced'],
  ['Adobe', '#ff0000', 'Advanced'],
  ['Atlassian', '#1868db', 'Advanced'],
  ['Flipkart', '#2874f0', 'Intermediate'],
  ['Walmart', '#0071ce', 'Intermediate'],
  ['Uber', '#111111', 'Advanced'],
  ['Salesforce', '#00a1e0', 'Intermediate'],
  ['PhonePe', '#5f259f', 'Intermediate'],
  ['Razorpay', '#2b69ff', 'Advanced'],
  ['Paytm', '#00baf2', 'Intermediate'],
  ['Swiggy', '#fc8019', 'Intermediate'],
  ['Zomato', '#e23744', 'Intermediate'],
  ['Deloitte', '#86bc25', 'Intermediate'],
  ['Accenture', '#a100ff', 'Intermediate'],
  ['TCS', '#e11937', 'Intermediate'],
  ['Infosys', '#007cc3', 'Intermediate'],
  ['Cognizant', '#0033a0', 'Intermediate'],
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
