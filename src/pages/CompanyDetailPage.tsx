import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Code2,
  Lightbulb,
  Network,
  Users,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Badge, DifficultyBadge } from '@/components/common/Badge';
import { BookmarkButton } from '@/components/common/BookmarkButton';
import { buttonStyles } from '@/components/common/Button';
import { Seo } from '@/components/common/Seo';
import { QuestionCard } from '@/components/interview/QuestionCard';
import { companies } from '@/data/companies';
import { interviewQuestions } from '@/data/interviewQuestions';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';

export default function CompanyDetailPage() {
  const { companySlug } = useParams();
  const company = companies.find((item) => item.slug === companySlug);
  useRecentlyViewed(
    company
      ? {
          type: 'company',
          title: company.name + ' interview guide',
          description: company.overview,
          url: '/companies/' + company.slug,
        }
      : undefined,
  );

  if (!company) {
    return (
      <div className="page-shell py-24 text-center">
        <h1 className="text-4xl font-extrabold">Company guide not found</h1>
        <Link className={buttonStyles({ className: 'mt-7' })} to="/companies">
          Browse companies
        </Link>
      </div>
    );
  }
  const questions = interviewQuestions.filter((question) =>
    company.questionIds.includes(question.id),
  );

  return (
    <>
      <Seo
        description={company.overview}
        path={'/companies/' + company.slug}
        title={company.name + ' frontend interview guide'}
      />
      <div className="border-b bg-[var(--surface)]">
        <div className="page-shell py-4">
          <Link
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-soft)] hover:text-brand-500"
            to="/companies"
          >
            <ArrowLeft className="size-4" /> All companies
          </Link>
        </div>
      </div>
      <div className="page-shell py-10 sm:py-16">
        <header className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="flex items-center gap-4">
              <span
                className="grid size-16 place-items-center rounded-2xl text-xl font-black text-white shadow-xl"
                style={{ backgroundColor: company.color }}
              >
                {company.monogram}
              </span>
              <div>
                <Badge tone="blue">Company guide</Badge>
                <h1 className="mt-2 text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl">
                  {company.name}
                </h1>
              </div>
            </div>
            <p className="mt-6 max-w-3xl text-base leading-7 text-[var(--text-soft)]">
              {company.overview}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {company.technologies.map((technology) => (
                <Badge key={technology}>{technology}</Badge>
              ))}
              <DifficultyBadge difficulty={company.difficulty} />
            </div>
          </div>
          <BookmarkButton
            className="h-11 rounded-xl"
            contentId={company.id}
            description={company.overview}
            showLabel
            title={company.name}
            type="company"
            url={'/companies/' + company.slug}
          />
        </header>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1fr_1fr]">
          <section className="surface-card rounded-2xl p-6">
            <h2 className="flex items-center gap-2 text-xl font-bold">
              <Users className="size-5 text-brand-500" /> Typical interview rounds
            </h2>
            <ol className="mt-5 space-y-4">
              {company.rounds.map((round, index) => (
                <li className="flex items-start gap-3 text-sm" key={round}>
                  <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-brand-500/10 font-mono text-xs font-bold text-brand-500">
                    {index + 1}
                  </span>
                  <span className="pt-1.5 text-[var(--text-soft)]">{round}</span>
                </li>
              ))}
            </ol>
          </section>
          <section className="surface-card rounded-2xl p-6">
            <h2 className="flex items-center gap-2 text-xl font-bold">
              <Lightbulb className="size-5 text-amber-500" /> Preparation priorities
            </h2>
            <ul className="mt-5 space-y-4">
              {company.preparationTips.map((tip) => (
                <li className="flex gap-3 text-sm leading-6 text-[var(--text-soft)]" key={tip}>
                  <CheckCircle2 className="mt-1 size-4 shrink-0 text-emerald-500" /> {tip}
                </li>
              ))}
            </ul>
          </section>
          <section className="surface-card rounded-2xl p-6">
            <h2 className="flex items-center gap-2 text-xl font-bold">
              <Code2 className="size-5 text-violet-500" /> Machine-coding prompts
            </h2>
            <ul className="mt-4 space-y-3">
              {company.machineCodingQuestions.map((item) => (
                <li className="text-sm text-[var(--text-soft)]" key={item}>
                  • {item}
                </li>
              ))}
            </ul>
          </section>
          <section className="surface-card rounded-2xl p-6">
            <h2 className="flex items-center gap-2 text-xl font-bold">
              <Network className="size-5 text-cyan-500" /> System-design prompts
            </h2>
            <ul className="mt-4 space-y-3">
              {company.systemDesignQuestions.map((item) => (
                <li className="text-sm text-[var(--text-soft)]" key={item}>
                  • {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-14 border-t pt-12">
          <span className="eyebrow">Practice bank</span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight">
            Frequently relevant questions
          </h2>
          <div className="mt-7 space-y-4">
            {questions.length ? (
              questions.map((question) => <QuestionCard key={question.id} question={question} />)
            ) : (
              <p className="text-sm text-[var(--text-faint)]">
                More reported questions are being reviewed.
              </p>
            )}
          </div>
        </section>

        <div className="mt-10 flex gap-3 rounded-2xl border border-amber-500/25 bg-amber-500/7 p-5 text-sm leading-6 text-[var(--text-soft)]">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-500" />
          <p>
            <strong className="text-[var(--text)]">Interview disclaimer.</strong> Interview
            processes and questions may change over time. This content is intended for preparation
            and should not be considered an official company interview guide.
          </p>
        </div>
      </div>
    </>
  );
}
