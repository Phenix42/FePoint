import { useEffect, useRef, useState } from 'react';
import { Bookmark, Trash2, X } from 'lucide-react';
import { Seo } from '@/components/common/Seo';
import { cn } from '@/utils/cn';
import { safeStorage } from '@/utils/storage';
import '@/styles/interview-trail.css';

type Outcome = 'Offer' | 'Rejected' | 'In Progress';
type RoundType = 'Phone Screen' | 'Technical' | 'System Design' | 'Behavioral' | 'Onsite' | 'HR';

interface QA {
  question: string;
  answer: string;
}

interface InterviewEntry {
  id: string;
  company: string;
  role: string;
  outcome: Outcome;
  roundType: RoundType;
  timestamp: number;
  sampleQuestion: string;
  upvotes: number;
  opinions: number;
  details: string;
  opinion: string;
  qa: QA[];
}

const roundTypes: RoundType[] = [
  'Phone Screen',
  'Technical',
  'System Design',
  'Behavioral',
  'Onsite',
  'HR',
];

const outcomes: Outcome[] = ['Offer', 'Rejected', 'In Progress'];

const initialInterviews: InterviewEntry[] = [
  {
    id: '1',
    company: 'Google',
    role: 'Senior Frontend Engineer',
    outcome: 'Offer',
    roundType: 'Onsite',
    timestamp: Date.now() - 2 * 86_400_000,
    sampleQuestion: 'How would you implement a virtual scrolling component in React?',
    upvotes: 42,
    opinions: 3,
    details:
      'Phone Screen:\n- Tell me about a time you had to optimize a slow React app.\n\nTechnical Round:\n- How would you implement a virtual scrolling component in React?\n- Explain the difference between useMemo and useCallback.\n\nSystem Design:\n- Design a real-time collaborative text editor like Google Docs.',
    opinion:
      'The process was thorough but fair. The interviewers were genuinely interested in my problem-solving approach rather than just getting the right answer. The system design round was the most challenging.',
    qa: [
      {
        question: 'How would you implement a virtual scrolling component in React?',
        answer:
          'I would use the windowing technique — only render items visible in the viewport plus a small buffer. I can use libraries like react-window or build a custom solution using ResizeObserver and Intersection Observer to track scroll position and dynamically render the visible slice.',
      },
      {
        question: 'Explain the difference between useMemo and useCallback.',
        answer:
          'useMemo returns a memoized value, while useCallback returns a memoized function. useCallback(fn, deps) is equivalent to useMemo(() => fn, deps). Use useMemo for expensive calculations and useCallback for passing stable function references to optimized child components.',
      },
      {
        question: 'Design a real-time collaborative text editor like Google Docs.',
        answer:
          'I would use Operational Transformation (OT) or Conflict-free Replicated Data Types (CRDTs) to handle concurrent edits. The architecture would include a WebSocket server for real-time communication, a shared document model, and client-side conflict resolution.',
      },
    ],
  },
  {
    id: '2',
    company: 'Amazon',
    role: 'Frontend Engineer',
    outcome: 'Rejected',
    roundType: 'Technical',
    timestamp: Date.now() - 5 * 86_400_000,
    sampleQuestion: 'Explain the concept of event delegation in JavaScript.',
    upvotes: 28,
    opinions: 5,
    details:
      'Online Coding:\n- Implement a debounce function from scratch.\n- Explain the concept of event delegation in JavaScript.\n\nSystem Design:\n- Design a URL shortening service.',
    opinion:
      'The coding round felt rushed. I was given 45 minutes for two problems and the interviewer kept interrupting with follow-ups. The bar raiser round was particularly tough.',
    qa: [
      {
        question: 'Implement a debounce function from scratch.',
        answer:
          'A debounce function delays invoking a function until after a specified wait time has elapsed. I would use setTimeout and clearTimeout, returning a new function that resets the timer on each call.',
      },
      {
        question: 'Explain the concept of event delegation in JavaScript.',
        answer:
          'Event delegation leverages event bubbling — instead of attaching listeners to individual child elements, you attach a single listener to a parent element and check the event.target to handle events from children. This improves performance and handles dynamically added elements.',
      },
      {
        question: 'Design a URL shortening service.',
        answer:
          'I would use a hash-based approach with a base62 encoded ID. The system would have an API to create short URLs (stored in a database with the original URL), and a redirect service that looks up the short code and redirects. For scale, I would use a distributed ID generator and caching.',
      },
    ],
  },
  {
    id: '3',
    company: 'Microsoft',
    role: 'Software Engineer II',
    outcome: 'Offer',
    roundType: 'Onsite',
    timestamp: Date.now() - 1 * 86_400_000,
    sampleQuestion: 'Design a component that handles infinite scroll with error boundaries.',
    upvotes: 56,
    opinions: 7,
    details:
      'Phone Screen:\n- Reverse a linked list in place.\n\nOnsite:\n- Design a component that handles infinite scroll with error boundaries.\n- What is the virtual DOM and how does React use it?\n- Explain closure in JavaScript with an example.',
    opinion:
      'Great experience overall. The interviewers were friendly and gave me hints when I got stuck. The loop was well-organized and I heard back within a week.',
    qa: [
      {
        question: 'Reverse a linked list in place.',
        answer:
          'I would use three pointers: prev, current, and next. Iterate through the list, reversing the next pointer of each node to point to the previous node, then move the pointers forward.',
      },
      {
        question: 'Design a component that handles infinite scroll with error boundaries.',
        answer:
          'I would use the Intersection Observer API to detect when the user scrolls near the bottom, then fetch the next page of data. I would wrap the component in an Error Boundary to catch rendering errors and display a fallback UI.',
      },
      {
        question: 'What is the virtual DOM and how does React use it?',
        answer:
          'The virtual DOM is a lightweight copy of the real DOM. React uses it to track changes — when state updates, React creates a new virtual DOM tree, diffs it against the previous one (reconciliation), and then updates only the changed parts of the real DOM.',
      },
      {
        question: 'Explain closure in JavaScript with an example.',
        answer:
          'A closure is a function that retains access to its outer lexical scope even after the outer function has returned. For example, a counter function that returns an increment function — the inner function closes over the count variable.',
      },
    ],
  },
  {
    id: '4',
    company: 'Netflix',
    role: 'Staff Frontend Engineer',
    outcome: 'In Progress',
    roundType: 'System Design',
    timestamp: Date.now() - 3 * 86_400_000,
    sampleQuestion: 'How would you design a recommendation system for a streaming platform?',
    upvotes: 19,
    opinions: 2,
    details:
      'System Design:\n- How would you design a recommendation system for a streaming platform?\n- Design a video player component with adaptive bitrate streaming.\n\nBehavioral:\n- Tell me about a time you had to make a trade-off between performance and maintainability.',
    opinion:
      'Still in the process. The system design interview was intense — they really dig into scalability. Waiting to hear back after the hiring committee review.',
    qa: [
      {
        question: 'How would you design a recommendation system for a streaming platform?',
        answer:
          'I would use a hybrid approach combining collaborative filtering (user-user or item-item similarity), content-based filtering (based on movie metadata), and deep learning models (neural collaborative filtering). The system would also include A/B testing for algorithm evaluation.',
      },
      {
        question: 'Design a video player component with adaptive bitrate streaming.',
        answer:
          'I would use the Media Source Extensions API to dynamically switch between different quality streams based on network conditions. The component would monitor bandwidth and buffer health, and switch bitrates seamlessly to avoid rebuffering.',
      },
      {
        question:
          'Tell me about a time you had to make a trade-off between performance and maintainability.',
        answer:
          'I once had to choose between a highly optimized but complex caching strategy and a simpler but slower approach. I went with the simpler approach initially, then added caching only for the hottest paths after profiling showed it was necessary.',
      },
    ],
  },
  {
    id: '5',
    company: 'Meta',
    role: 'Frontend Engineer',
    outcome: 'Rejected',
    roundType: 'Technical',
    timestamp: Date.now() - 7 * 86_400_000,
    sampleQuestion: 'What is the difference between React.memo, useMemo, and useCallback?',
    upvotes: 35,
    opinions: 4,
    details:
      'Coding:\n- Implement a binary search tree with insert, delete, and search.\n- What is the difference between React.memo, useMemo, and useCallback?\n\nSystem Design:\n- Design a news feed for a social media platform.',
    opinion:
      'The coding interview was okay but I stumbled on the tree deletion. The system design felt too abstract. I wish they had given more context about the scale they were targeting.',
    qa: [
      {
        question: 'Implement a binary search tree with insert, delete, and search.',
        answer:
          'I would create a TreeNode class with left and right pointers. Insert traverses the tree to find the correct position. Search traverses comparing values. Delete handles three cases: leaf node, one child, and two children (using in-order successor).',
      },
      {
        question: 'What is the difference between React.memo, useMemo, and useCallback?',
        answer:
          'React.memo is a HOC for preventing unnecessary re-renders of functional components. useMemo returns a memoized value. useCallback returns a memoized callback. React.memo compares props, while useMemo and useCallback compare dependencies.',
      },
      {
        question: 'Design a news feed for a social media platform.',
        answer:
          "I would use a fan-out-on-write approach where posts are pushed to followers' feeds when created, or a fan-out-on-read approach where feeds are assembled on demand. For scale, I would use a distributed cache and background job processing.",
      },
    ],
  },
  {
    id: '6',
    company: 'Airbnb',
    role: 'Senior UI Engineer',
    outcome: 'Offer',
    roundType: 'Onsite',
    timestamp: Date.now() - 10 * 86_400_000,
    sampleQuestion: 'How would you build an accessible autocomplete component?',
    upvotes: 47,
    opinions: 6,
    details:
      'Phone Screen:\n- Explain the box model and how flexbox works.\n\nTechnical:\n- How would you build an accessible autocomplete component?\n- What are React hooks rules?\n\nBehavioral:\n- Describe a time you had to work with a difficult stakeholder.',
    opinion:
      'Loved the culture interview. They really care about design and accessibility. The technical bar is high but the interviewers were supportive. Accepted the offer!',
    qa: [
      {
        question: 'How would you build an accessible autocomplete component?',
        answer:
          'I would use ARIA roles (combobox, listbox, option) and attributes (aria-expanded, aria-activedescendant). The component would support keyboard navigation (arrow keys, Enter, Escape), screen reader announcements, and proper focus management.',
      },
      {
        question: 'What are React hooks rules?',
        answer:
          'Hooks must be called at the top level (not inside loops, conditions, or nested functions), and only from React function components or custom hooks. This ensures hooks are called in the same order on every render.',
      },
      {
        question: 'Describe a time you had to work with a difficult stakeholder.',
        answer:
          'I worked with a product manager who kept changing requirements mid-sprint. I scheduled regular check-ins to align on priorities, documented decisions, and set clear expectations about scope changes and their impact on delivery.',
      },
    ],
  },
  {
    id: '7',
    company: 'Shopify',
    role: 'Frontend Developer',
    outcome: 'In Progress',
    roundType: 'Phone Screen',
    timestamp: Date.now() - 4 * 86_400_000,
    sampleQuestion: 'Walk me through how you would debug a memory leak in a React application.',
    upvotes: 12,
    opinions: 1,
    details:
      'Phone Screen:\n- Walk me through how you would debug a memory leak in a React application.\n- What is the difference between == and === in JavaScript?\n\nTake-home:\n- Build a small todo app with filtering and persistence.',
    opinion:
      'First round went well. The take-home assignment was reasonable. Waiting for the technical screen next week.',
    qa: [
      {
        question: 'Walk me through how you would debug a memory leak in a React application.',
        answer:
          'I would use Chrome DevTools Memory tab to take heap snapshots and compare them. I would look for detached DOM elements, check for event listeners that are not cleaned up, and verify that subscriptions and timers are properly cleared in useEffect cleanup functions.',
      },
      {
        question: 'What is the difference between == and === in JavaScript?',
        answer:
          '== performs type coercion before comparison, while === performs strict comparison without type coercion. It is recommended to always use === to avoid unexpected behavior from type coercion.',
      },
      {
        question: 'Build a small todo app with filtering and persistence.',
        answer:
          'I would create a React component with useState for the todo list, use useEffect to persist to localStorage, and implement filter buttons (All, Active, Completed) that filter the displayed todos based on their completed status.',
      },
    ],
  },
  {
    id: '8',
    company: 'Salesforce',
    role: 'Principal Frontend Engineer',
    outcome: 'Offer',
    roundType: 'System Design',
    timestamp: Date.now() - 14 * 86_400_000,
    sampleQuestion: 'Design a real-time dashboard for monitoring application metrics.',
    upvotes: 33,
    opinions: 4,
    details:
      'System Design:\n- Design a real-time dashboard for monitoring application metrics.\n- How would you handle state management at scale?\n\nLeadership:\n- Tell me about a time you mentored a junior engineer.\n- How do you balance technical debt with feature delivery?',
    opinion:
      'The senior-level interviews focused heavily on architecture and leadership. The system design was deep but fair. The compensation package was excellent.',
    qa: [
      {
        question: 'Design a real-time dashboard for monitoring application metrics.',
        answer:
          'I would use WebSockets or Server-Sent Events to stream real-time data from the backend. The frontend would use a charting library like Chart.js or D3.js to visualize metrics. I would implement data aggregation on the backend and use a pub/sub pattern for scalability.',
      },
      {
        question: 'How would you handle state management at scale?',
        answer:
          'I would use a combination of local state (useState/useReducer) for component-level state, context for cross-cutting concerns, and a state management library like Redux or Zustand for global state. I would also consider state normalization and selective subscriptions.',
      },
      {
        question: 'Tell me about a time you mentored a junior engineer.',
        answer:
          'I paired with a junior developer on a complex feature, breaking down the problem into smaller tasks. I explained the architecture, reviewed their code, and encouraged them to ask questions. They became more confident and eventually contributed independently.',
      },
      {
        question: 'How do you balance technical debt with feature delivery?',
        answer:
          'I advocate for dedicating a percentage of each sprint to tech debt reduction. I prioritize debt that impacts velocity or reliability, and I communicate the long-term cost of shortcuts to stakeholders to build consensus.',
      },
    ],
  },
];

const STORAGE_KEY = 'fepoint-interview-trail';

function formatTimeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days = Math.floor(diff / 86_400_000);

  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours} hr${hours > 1 ? 's' : ''} ago`;
  if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
  const weeks = Math.floor(days / 7);
  return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
}

function formatDetails(details: string): string {
  return details.replace(/\n/g, '\n\n');
}

function extractSampleQuestion(details: string): string {
  const lines = details.split('\n').filter((l) => l.trim());
  const questionLine = lines.find((l) => l.includes('?'));
  if (questionLine) return questionLine.replace(/^-?\s*/, '').trim();
  return lines[0]?.replace(/^-?\s*/, '').trim() ?? 'No question recorded';
}

function OutcomeTag({
  outcome,
  clickable = false,
  onClick,
}: {
  outcome: Outcome;
  clickable?: boolean;
  onClick?: () => void;
}) {
  const tagClass = {
    Offer: 'it-tag-offer',
    Rejected: 'it-tag-rejected',
    'In Progress': 'it-tag-inprogress',
  }[outcome];

  return (
    <button
      type="button"
      onClick={clickable ? onClick : undefined}
      aria-label={clickable ? `Filter by ${outcome}` : undefined}
      className={cn('it-tag', tagClass, clickable && 'cursor-pointer hover:opacity-80')}
    >
      <span
        className={cn(
          'size-1.5 rounded-full',
          outcome === 'Offer'
            ? 'bg-[var(--it-green)]'
            : outcome === 'Rejected'
              ? 'bg-[var(--it-red)]'
              : 'bg-[var(--it-primary)]',
        )}
      />
      {outcome}
    </button>
  );
}

function InterviewCard({
  interview,
  isHighlighted,
  isBookmarked,
  upvoted,
  onUpvote,
  onBookmark,
  onDelete,
  onCompanyClick,
  onRoundClick,
  onOutcomeClick,
  onOpenDetails,
}: {
  interview: InterviewEntry;
  isHighlighted: boolean;
  isBookmarked: boolean;
  upvoted: boolean;
  onUpvote: () => void;
  onBookmark: () => void;
  onDelete: () => void;
  onCompanyClick: () => void;
  onRoundClick: () => void;
  onOutcomeClick: () => void;
  onOpenDetails: () => void;
}) {
  return (
    <article
      onClick={onOpenDetails}
      className={cn(
        'it-card cursor-pointer border border-[var(--it-border)] p-4',
        isHighlighted && 'it-highlight',
      )}
    >
      <header className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="it-heading text-lg font-bold text-[var(--it-text)]">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onCompanyClick();
              }}
              className="cursor-pointer text-[var(--it-primary)] hover:underline"
              aria-label={`View Q&A for ${interview.company} interview`}
            >
              {interview.company}
            </button>
            {' · '}
            <span className="text-[var(--it-text-soft)]">{interview.role}</span>
          </h3>
          <p className="text-xs text-[var(--it-text-faint)]">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRoundClick();
              }}
              className="cursor-pointer hover:underline"
              aria-label={`Filter by round type: ${interview.roundType}`}
            >
              {interview.roundType}
            </button>
            {' · '}
            {formatTimeAgo(interview.timestamp)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span onClick={(e) => e.stopPropagation()}>
            <OutcomeTag outcome={interview.outcome} clickable onClick={onOutcomeClick} />
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            aria-label={`Delete ${interview.company} interview`}
            className="rounded-lg p-1 text-[var(--it-text-faint)] opacity-60 transition hover:opacity-100 hover:text-[var(--it-red)]"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      </header>

      <div className="it-divider my-3" />

      <footer className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs text-[var(--it-text-faint)]">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onUpvote();
            }}
            aria-label={upvoted ? 'Remove upvote' : 'Upvote this interview'}
            className={cn(
              'inline-flex items-center gap-1 transition-colors',
              upvoted ? 'text-[var(--it-primary)]' : 'hover:text-[var(--it-primary)]',
            )}
          >
            <span aria-hidden="true">▲</span>
            {interview.upvotes}
          </button>
          <span className="inline-flex items-center gap-1">
            <span aria-hidden="true">💬</span>
            {interview.opinions}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onBookmark();
            }}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark this interview'}
            className={cn(
              'rounded-lg p-1 text-[var(--it-text-faint)] transition-colors',
              isBookmarked && 'text-[var(--it-primary)]',
            )}
          >
            <Bookmark className="size-4" fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>
        </div>
      </footer>
    </article>
  );
}

function Toast({
  message,
  type,
  onClose,
}: {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}) {
  const [phase, setPhase] = useState<'enter' | 'visible' | 'exit'>('enter');

  useEffect(() => {
    const visibleTimer = setTimeout(() => setPhase('visible'), 50);
    const exitTimer = setTimeout(() => setPhase('exit'), 2500);
    const removeTimer = setTimeout(onClose, 2900);
    return () => {
      clearTimeout(visibleTimer);
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, [onClose]);

  const phaseClass = {
    enter: 'it-toast-enter',
    visible: '',
    exit: 'it-toast-exit',
  }[phase];

  return (
    <div
      className={cn(
        'fixed bottom-6 right-6 z-50 max-w-sm rounded-2xl px-5 py-3 text-sm font-medium shadow-lg',
        type === 'success'
          ? 'bg-[var(--it-green-light)] text-[var(--it-green-text)]'
          : 'bg-[var(--it-red-light)] text-[var(--it-red-text)]',
        phaseClass,
      )}
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
}

function InterviewQA({ interview, onClose }: { interview: InterviewEntry; onClose: () => void }) {
  const qaList = interview.qa ?? [];
  return (
    <aside className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="it-heading text-2xl">{interview.company} Interview Q&A</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Q&A and return to share your interview"
          className="it-qa-close rounded-xl p-2 text-[var(--it-text-faint)] opacity-60 transition hover:opacity-100 hover:text-[var(--it-text)]"
        >
          <X className="size-5" />
        </button>
      </div>

      <div className="it-qa-card">
        <div className="it-divider mb-4" />

        {qaList.length > 0 ? (
          <div className="space-y-6">
            {qaList.map((item, index) => (
              <div key={index} className="it-qa-item">
                <h3 className="it-qa-question text-sm font-semibold text-[var(--it-text)]">
                  Q{index + 1}: {item.question}
                </h3>
                <p className="it-qa-answer mt-2 text-sm text-[var(--it-text-soft)]">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-[var(--it-text-soft)]">
                Interview Details
              </h3>
              <p className="mt-2 whitespace-pre-line text-sm text-[var(--it-text)]">
                {formatDetails(interview.details)}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[var(--it-text-soft)]">Opinion</h3>
              <p className="mt-2 whitespace-pre-line text-sm text-[var(--it-text)]">
                {interview.opinion || 'No opinion shared.'}
              </p>
            </div>
          </div>
        )}

        <div className="it-divider mt-6 mb-4" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-[var(--it-text-faint)]">
            <span className="inline-flex items-center gap-1">
              <span aria-hidden="true">▲</span>
              {interview.upvotes} upvotes
            </span>
            <span className="inline-flex items-center gap-1">
              <span aria-hidden="true">💬</span>
              {interview.opinions} opinions
            </span>
          </div>
          <span className="text-xs text-[var(--it-text-faint)]">
            {interview.role} · {interview.outcome}
          </span>
        </div>
      </div>
    </aside>
  );
}

export default function InterviewTrailPage() {
  const [interviews, setInterviews] = useState<InterviewEntry[]>(() => {
    const stored = safeStorage.get<InterviewEntry[]>(STORAGE_KEY, []);
    if (stored.length === 0) return initialInterviews;
    // Normalize older stored entries that may be missing newer fields
    return stored.map((i) => ({ ...i, qa: i.qa ?? [] }));
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [roundFilter, setRoundFilter] = useState<RoundType | 'All'>('All');
  const [outcomeFilter, setOutcomeFilter] = useState<Outcome | 'All'>('All');
  const [companyFilter, setCompanyFilter] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(5);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [upvotedIds, setUpvotedIds] = useState<Set<string>>(() => {
    const stored = safeStorage.get<string[]>('fepoint-interview-upvotes', []);
    return new Set(stored);
  });
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(() => {
    const stored = safeStorage.get<string[]>('fepoint-interview-bookmarks', []);
    return new Set(stored);
  });
  const [selectedInterview, setSelectedInterview] = useState<InterviewEntry | null>(null);

  const [form, setForm] = useState({
    company: '',
    role: '',
    roundType: 'Technical' as RoundType,
    outcome: 'In Progress' as Outcome,
    details: '',
    opinion: '',
  });

  const formRef = useRef<HTMLDivElement>(null);

  // Persist interviews to localStorage
  useEffect(() => {
    safeStorage.set(STORAGE_KEY, interviews);
  }, [interviews]);

  // Persist upvotes
  useEffect(() => {
    safeStorage.set('fepoint-interview-upvotes', Array.from(upvotedIds));
  }, [upvotedIds]);

  // Persist bookmarks
  useEffect(() => {
    safeStorage.set('fepoint-interview-bookmarks', Array.from(bookmarkedIds));
  }, [bookmarkedIds]);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
  };

  const filtered = interviews.filter((i) => {
    const matchesSearch =
      searchQuery === '' ||
      i.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.sampleQuestion.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRound = roundFilter === 'All' || i.roundType === roundFilter;
    const matchesOutcome = outcomeFilter === 'All' || i.outcome === outcomeFilter;
    const matchesCompany = companyFilter === null || i.company === companyFilter;
    return matchesSearch && matchesRound && matchesOutcome && matchesCompany;
  });

  const visibleInterviews = filtered.slice(0, visibleCount);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleUpvote = (id: string) => {
    setUpvotedIds((prev) => {
      const next = new Set(prev);
      const isUpvoted = next.has(id);
      if (isUpvoted) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
    setInterviews((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, upvotes: i.upvotes + (upvotedIds.has(id) ? -1 : 1) } : i,
      ),
    );
  };

  const handleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleDelete = (id: string) => {
    setInterviews((prev) => prev.filter((i) => i.id !== id));
    setUpvotedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    setSelectedInterview((prev) => (prev?.id === id ? null : prev));
    showToast('Interview entry deleted', 'success');
  };

  const handleCompanyClick = (interview: InterviewEntry) => {
    setSelectedInterview(interview);
    setCompanyFilter(interview.company);
    setSearchQuery('');
    setRoundFilter('All');
    setOutcomeFilter('All');
    setVisibleCount(5);
  };

  const handleOpenDetails = (interview: InterviewEntry) => {
    setSelectedInterview(interview);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleRoundClick = (round: RoundType) => {
    setRoundFilter(round);
    setCompanyFilter(null);
    setOutcomeFilter('All');
    setVisibleCount(5);
  };

  const handleOutcomeClick = (outcome: Outcome) => {
    setOutcomeFilter(outcome);
    setCompanyFilter(null);
    setRoundFilter('All');
    setVisibleCount(5);
  };

  const handleCloseQA = () => {
    setSelectedInterview(null);
    setCompanyFilter(null);
    setSearchQuery('');
    setRoundFilter('All');
    setOutcomeFilter('All');
    setVisibleCount(5);
  };

  const handlePublish = () => {
    const errors: string[] = [];
    if (!form.company.trim()) errors.push('company name');
    if (!form.role.trim()) errors.push('role');
    if (!form.details.trim()) errors.push('at least one question');

    if (errors.length > 0) {
      showToast(`Please fill in: ${errors.join(', ')}`, 'error');
      return;
    }

    const newEntry: InterviewEntry = {
      id: Date.now().toString(),
      company: form.company.trim(),
      role: form.role.trim(),
      outcome: form.outcome,
      roundType: form.roundType,
      timestamp: Date.now(),
      sampleQuestion: extractSampleQuestion(form.details),
      upvotes: 0,
      opinions: 0,
      details: form.details.trim(),
      opinion: form.opinion.trim(),
      qa: [],
    };

    setInterviews((prev) => [newEntry, ...prev]);
    setHighlightedId(newEntry.id);
    setVisibleCount((prev) => Math.max(prev, 5));

    setTimeout(() => setHighlightedId(null), 2500);

    setForm({
      company: '',
      role: '',
      roundType: 'Technical',
      outcome: 'In Progress',
      details: '',
      opinion: '',
    });

    showToast('Interview experience published!', 'success');
  };

  const handleSaveDraft = () => {
    if (!form.company.trim() && !form.role.trim() && !form.details.trim()) {
      showToast('Add some content before saving a draft', 'error');
      return;
    }
    showToast('Draft saved locally', 'success');
  };

  const handleInputChange = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setRoundFilter('All');
    setOutcomeFilter('All');
    setCompanyFilter(null);
    setVisibleCount(5);
  };

  const activeFilters =
    searchQuery !== '' ||
    roundFilter !== 'All' ||
    outcomeFilter !== 'All' ||
    companyFilter !== null;

  return (
    <div className="interview-trail it-body min-h-screen bg-[var(--it-bg)] text-[var(--it-text)]">
      <Seo
        description="Share your job interview experience and see what others were asked at companies like Google, Amazon, and Microsoft."
        path="/interview-trail"
        title="InterviewTrail — Share your interview experience"
      />

      {/* Main content */}
      <main className="page-shell section-space">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="it-heading text-2xl font-black text-[var(--it-primary)]">
            InterviewTrail
          </h1>
          <button
            type="button"
            onClick={scrollToForm}
            className="it-pill bg-[var(--it-primary)] px-5 py-2 text-sm font-bold text-white hover:bg-[var(--it-primary-hover)]"
          >
            + New Interview
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left column — Old Interviews */}
          <aside>
            <h2 className="it-heading mb-4 text-2xl">Old Interviews</h2>

            <div className="mb-4 space-y-3">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search by company, role, or question…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="it-input w-full pl-10"
                />
                <svg
                  aria-hidden="true"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--it-text-faint)]"
                  fill="none"
                  height="16"
                  viewBox="0 0 24 24"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 0110.5 10.5z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className="flex gap-2">
                <select
                  value={roundFilter}
                  onChange={(e) => setRoundFilter(e.target.value as RoundType | 'All')}
                  className="it-select w-full"
                >
                  <option value="All">All rounds</option>
                  {roundTypes.map((rt) => (
                    <option key={rt} value={rt}>
                      {rt}
                    </option>
                  ))}
                </select>
                <select
                  value={outcomeFilter}
                  onChange={(e) => setOutcomeFilter(e.target.value as Outcome | 'All')}
                  className="it-select w-full"
                >
                  <option value="All">All outcomes</option>
                  {outcomes.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>

              {activeFilters && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="it-pill border border-[var(--it-border)] bg-[var(--it-surface)] px-3 py-1.5 text-xs font-medium text-[var(--it-text)] hover:bg-[var(--it-border)]"
                >
                  Clear filters
                </button>
              )}
            </div>

            <div className="it-interview-list space-y-3">
              {visibleInterviews.length === 0 ? (
                <p className="py-8 text-center text-sm text-[var(--it-text-faint)]">
                  No interviews found. Try adjusting your search or filter.
                </p>
              ) : (
                visibleInterviews.map((interview) => (
                  <InterviewCard
                    key={interview.id}
                    interview={interview}
                    isHighlighted={highlightedId === interview.id}
                    isBookmarked={bookmarkedIds.has(interview.id)}
                    upvoted={upvotedIds.has(interview.id)}
                    onUpvote={() => handleUpvote(interview.id)}
                    onBookmark={() => handleBookmark(interview.id)}
                    onDelete={() => handleDelete(interview.id)}
                    onCompanyClick={() => handleCompanyClick(interview)}
                    onRoundClick={() => handleRoundClick(interview.roundType)}
                    onOutcomeClick={() => handleOutcomeClick(interview.outcome)}
                    onOpenDetails={() => handleOpenDetails(interview)}
                  />
                ))
              )}
            </div>

            {visibleCount < filtered.length && (
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 5)}
                className="it-pill mt-4 border border-[var(--it-border)] bg-[var(--it-surface)] px-5 py-2 text-sm font-medium text-[var(--it-text)] hover:bg-[var(--it-border)]"
              >
                Load more
              </button>
            )}
          </aside>

          {/* Right column — Share your interview OR Q&A */}
          <aside ref={formRef}>
            {selectedInterview ? (
              <InterviewQA interview={selectedInterview} onClose={handleCloseQA} />
            ) : (
              <div className="space-y-4">
                <h2 className="it-heading text-2xl">Share your interview</h2>

                <div className="it-form-card">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handlePublish();
                    }}
                    className="space-y-4"
                  >
                    {/* Company + Role */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="company"
                          className="mb-1 block text-xs font-medium text-[var(--it-text-soft)]"
                        >
                          Company
                        </label>
                        <input
                          id="company"
                          type="text"
                          placeholder="e.g. Google"
                          value={form.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          className="it-input w-full"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="role"
                          className="mb-1 block text-xs font-medium text-[var(--it-text-soft)]"
                        >
                          Role
                        </label>
                        <input
                          id="role"
                          type="text"
                          placeholder="e.g. Frontend Engineer"
                          value={form.role}
                          onChange={(e) => handleInputChange('role', e.target.value)}
                          className="it-input w-full"
                        />
                      </div>
                    </div>

                    {/* Round type + Outcome */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="roundType"
                          className="mb-1 block text-xs font-medium text-[var(--it-text-soft)]"
                        >
                          Round type
                        </label>
                        <select
                          id="roundType"
                          value={form.roundType}
                          onChange={(e) => handleInputChange('roundType', e.target.value)}
                          className="it-select w-full"
                        >
                          {roundTypes.map((rt) => (
                            <option key={rt} value={rt}>
                              {rt}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="outcome"
                          className="mb-1 block text-xs font-medium text-[var(--it-text-soft)]"
                        >
                          Outcome
                        </label>
                        <select
                          id="outcome"
                          value={form.outcome}
                          onChange={(e) => handleInputChange('outcome', e.target.value)}
                          className="it-select w-full"
                        >
                          {outcomes.map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Details textarea */}
                    <div>
                      <label
                        htmlFor="details"
                        className="mb-1 block text-xs font-medium text-[var(--it-text-soft)]"
                      >
                        Edit box to enter details
                      </label>
                      <textarea
                        id="details"
                        placeholder="List the questions you were asked and how you answered. Use a new line for each question."
                        value={form.details}
                        onChange={(e) => handleInputChange('details', e.target.value)}
                        className="it-textarea w-full"
                        rows={6}
                      />
                    </div>

                    {/* Opinion */}
                    <div>
                      <label
                        htmlFor="opinion"
                        className="mb-1 block text-xs font-medium text-[var(--it-text-soft)]"
                      >
                        Share your opinion
                      </label>
                      <textarea
                        id="opinion"
                        placeholder="Your overall take on the interview process…"
                        value={form.opinion}
                        onChange={(e) => handleInputChange('opinion', e.target.value)}
                        className="it-textarea w-full"
                        rows={4}
                      />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={handleSaveDraft}
                        className="it-pill flex-1 border border-[var(--it-border)] bg-[var(--it-surface)] px-5 py-2.5 text-sm font-bold text-[var(--it-text)] hover:bg-[var(--it-border)]"
                      >
                        Save draft
                      </button>
                      <button
                        type="submit"
                        className="it-pill flex-1 bg-[var(--it-primary)] px-5 py-2.5 text-sm font-bold text-white hover:bg-[var(--it-primary-hover)]"
                      >
                        Publish
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </aside>
        </div>
      </main>

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
