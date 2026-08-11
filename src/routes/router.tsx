import { Suspense, lazy, type ComponentType, type LazyExoticComponent } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { RouteFallback } from '@/components/common/RouteFallback';
import { AppLayout } from '@/components/layout/AppLayout';
import NotFoundPage from '@/pages/NotFoundPage';

const page = (
  loader: () => Promise<{ default: ComponentType }>,
): LazyExoticComponent<ComponentType> => lazy(loader);

const HomePage = page(() => import('@/pages/HomePage'));
const RoadmapPage = page(() => import('@/pages/RoadmapPage'));
const TutorialsPage = page(() => import('@/pages/TutorialsPage'));
const TutorialDetailPage = page(() => import('@/pages/TutorialDetailPage'));
const PracticePage = page(() => import('@/pages/PracticePage'));
const MachineCodingPage = page(() => import('@/pages/MachineCodingPage'));
const MachineCodingDetailPage = page(() => import('@/pages/MachineCodingDetailPage'));
const SystemDesignPage = page(() => import('@/pages/SystemDesignPage'));
const SystemDesignDetailPage = page(() => import('@/pages/SystemDesignDetailPage'));
const SystemDesignFundamentalsPage = page(() => import('@/pages/SystemDesignFundamentalsPage'));
const SystemDesignFrameworkPage = page(() => import('@/pages/SystemDesignFrameworkPage'));
const SystemDesignTopicPage = page(() => import('@/pages/SystemDesignTopicPage'));
const InterviewQuestionsPage = page(() => import('@/pages/InterviewQuestionsPage'));
const CompaniesPage = page(() => import('@/pages/CompaniesPage'));
const CompanyDetailPage = page(() => import('@/pages/CompanyDetailPage'));
const ResourcesPage = page(() => import('@/pages/ResourcesPage'));
const GlossaryPage = page(() => import('@/pages/GlossaryPage'));
const DsaHomePage = page(() => import('@/pages/DsaHomePage'));
const DsaRoadmapPage = page(() => import('@/pages/DsaRoadmapPage'));
const DsaPatternsPage = page(() => import('@/pages/DsaPatternsPage'));
const DsaPatternDetailPage = page(() => import('@/pages/DsaPatternDetailPage'));
const DsaProblemsPage = page(() => import('@/pages/DsaProblemsPage'));
const DsaProblemDetailPage = page(() => import('@/pages/DsaProblemDetailPage'));
const DsaTopicPage = page(() => import('@/pages/DsaTopicPage'));
const SearchPage = page(() => import('@/pages/SearchPage'));
const BookmarksPage = page(() => import('@/pages/BookmarksPage'));
const CompletedPage = page(() => import('@/pages/CompletedPage'));
const RecentPage = page(() => import('@/pages/RecentPage'));
const AboutPage = page(() => import('@/pages/AboutPage'));
const ContactPage = page(() => import('@/pages/ContactPage'));
const ContributePage = page(() => import('@/pages/ContributePage'));
const PrivacyPage = lazy(() =>
  import('@/pages/LegalPages').then((module) => ({ default: module.PrivacyPage })),
);
const TermsPage = lazy(() =>
  import('@/pages/LegalPages').then((module) => ({ default: module.TermsPage })),
);

const withSuspense = (Component: LazyExoticComponent<ComponentType>) => (
  <Suspense fallback={<RouteFallback />}>
    <Component />
  </Suspense>
);

const environment = import.meta.env as unknown as Record<string, string | undefined>;

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <AppLayout />,
      errorElement: <NotFoundPage />,
      children: [
        { index: true, element: withSuspense(HomePage) },
        { path: 'roadmap', element: withSuspense(RoadmapPage) },
        { path: 'tutorials', element: withSuspense(TutorialsPage) },
        { path: 'tutorials/:category', element: withSuspense(TutorialsPage) },
        { path: 'tutorials/:category/:topic', element: withSuspense(TutorialDetailPage) },
        { path: 'practice', element: withSuspense(PracticePage) },
        { path: 'practice/:technology', element: withSuspense(PracticePage) },
        { path: 'machine-coding', element: withSuspense(MachineCodingPage) },
        { path: 'machine-coding/:challengeSlug', element: withSuspense(MachineCodingDetailPage) },
        { path: 'system-design', element: withSuspense(SystemDesignPage) },
        { path: 'system-design/fundamentals', element: withSuspense(SystemDesignFundamentalsPage) },
        { path: 'system-design/framework', element: withSuspense(SystemDesignFrameworkPage) },
        {
          path: 'system-design/fundamentals/:topicSlug',
          element: withSuspense(SystemDesignTopicPage),
        },
        { path: 'system-design/:caseStudySlug', element: withSuspense(SystemDesignDetailPage) },
        { path: 'interview-questions', element: withSuspense(InterviewQuestionsPage) },
        { path: 'interview-questions/:technology', element: withSuspense(InterviewQuestionsPage) },
        { path: 'companies', element: withSuspense(CompaniesPage) },
        { path: 'companies/:companySlug', element: withSuspense(CompanyDetailPage) },
        { path: 'resources', element: withSuspense(ResourcesPage) },
        { path: 'glossary', element: withSuspense(GlossaryPage) },
        { path: 'dsa', element: withSuspense(DsaHomePage) },
        { path: 'dsa/roadmap', element: withSuspense(DsaRoadmapPage) },
        { path: 'dsa/patterns', element: withSuspense(DsaPatternsPage) },
        { path: 'dsa/patterns/:patternSlug', element: withSuspense(DsaPatternDetailPage) },
        { path: 'dsa/problems', element: withSuspense(DsaProblemsPage) },
        { path: 'dsa/problems/:problemSlug', element: withSuspense(DsaProblemDetailPage) },
        { path: 'dsa/data-structures/:slug', element: withSuspense(DsaTopicPage) },
        { path: 'dsa/algorithms/:slug', element: withSuspense(DsaTopicPage) },
        { path: 'search', element: withSuspense(SearchPage) },
        { path: 'bookmarks', element: withSuspense(BookmarksPage) },
        { path: 'completed', element: withSuspense(CompletedPage) },
        { path: 'recent', element: withSuspense(RecentPage) },
        { path: 'about', element: withSuspense(AboutPage) },
        { path: 'contact', element: withSuspense(ContactPage) },
        { path: 'contribute', element: withSuspense(ContributePage) },
        { path: 'privacy', element: withSuspense(PrivacyPage) },
        { path: 'terms', element: withSuspense(TermsPage) },
        { path: '404', element: <NotFoundPage /> },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ],
  {
    basename: (environment.BASE_URL ?? '/').replace(/\/$/, '') || '/',
  },
);
