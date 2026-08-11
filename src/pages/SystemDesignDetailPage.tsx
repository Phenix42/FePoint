import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Database,
  Gauge,
  Network,
  ShieldCheck,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Badge, DifficultyBadge } from '@/components/common/Badge';
import { BookmarkButton } from '@/components/common/BookmarkButton';
import { buttonStyles } from '@/components/common/Button';
import { CompletionButton } from '@/components/common/CompletionButton';
import { Seo } from '@/components/common/Seo';
import { systemDesignCases } from '@/data/systemDesign';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';

export default function SystemDesignDetailPage() {
  const { caseStudySlug } = useParams();
  const caseStudy = systemDesignCases.find((item) => item.slug === caseStudySlug);

  useRecentlyViewed(
    caseStudy
      ? {
          type: 'system-design',
          title: caseStudy.title,
          description: caseStudy.description,
          url: '/system-design/' + caseStudy.slug,
        }
      : undefined,
  );

  if (!caseStudy) {
    return (
      <div className="page-shell py-24 text-center">
        <h1 className="text-4xl font-extrabold">Case study not found</h1>
        <Link className={buttonStyles({ className: 'mt-7' })} to="/system-design">
          Browse case studies
        </Link>
      </div>
    );
  }

  return (
    <>
      <Seo
        description={caseStudy.description}
        path={'/system-design/' + caseStudy.slug}
        title={caseStudy.title}
      />
      <div className="border-b bg-[var(--surface)]">
        <div className="page-shell py-4">
          <Link
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-soft)] hover:text-brand-500"
            to="/system-design"
          >
            <ArrowLeft className="size-4" /> All case studies
          </Link>
        </div>
      </div>
      <article className="page-shell py-10 sm:py-16">
        <header className="mx-auto max-w-4xl text-center">
          <div className="flex justify-center gap-2">
            <Badge tone="cyan">Frontend architecture</Badge>
            <DifficultyBadge difficulty={caseStudy.difficulty} />
          </div>
          <h1 className="mt-5 text-4xl font-extrabold tracking-[-0.045em] sm:text-6xl">
            {caseStudy.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[var(--text-soft)]">
            {caseStudy.description}
          </p>
        </header>

        <section
          aria-label="High-level architecture"
          className="soft-grid mx-auto mt-12 max-w-5xl rounded-3xl border bg-[var(--surface)] p-6 sm:p-10"
        >
          <p className="text-center text-xs font-bold uppercase tracking-wider text-[var(--text-faint)]">
            High-level frontend architecture
          </p>
          <div className="mt-8 grid items-center gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
            <ArchitectureNode icon={Network} label="Route + UI" detail="Rendering boundaries" />
            <ArrowRight className="mx-auto size-5 rotate-90 text-brand-500 md:rotate-0" />
            <ArchitectureNode
              icon={Database}
              label="State + cache"
              detail="Entities and view state"
            />
            <ArrowRight className="mx-auto size-5 rotate-90 text-violet-500 md:rotate-0" />
            <ArchitectureNode
              icon={ShieldCheck}
              label="API boundary"
              detail="Validation and policy"
            />
          </div>
        </section>

        <div className="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-[minmax(0,1fr)_17rem]">
          <div className="space-y-10">
            <DesignSection number="01" title="Requirements">
              <div className="grid gap-5 md:grid-cols-2">
                <BulletPanel title="Functional" items={caseStudy.functionalRequirements} />
                <BulletPanel title="Non-functional" items={caseStudy.nonFunctionalRequirements} />
              </div>
            </DesignSection>
            <DesignSection number="02" title="User flow">
              <div className="flex flex-wrap items-center gap-2">
                {caseStudy.userFlow.map((step, index) => (
                  <div className="contents" key={step}>
                    <span className="rounded-xl border bg-[var(--surface)] px-4 py-3 text-sm font-semibold">
                      {step}
                    </span>
                    {index < caseStudy.userFlow.length - 1 && (
                      <ArrowRight className="size-4 text-[var(--text-faint)]" />
                    )}
                  </div>
                ))}
              </div>
            </DesignSection>
            <DesignSection number="03" title="Component hierarchy">
              <div className="rounded-2xl border bg-[var(--surface)] p-5 font-mono text-sm leading-8">
                {caseStudy.components.map((component, index) => (
                  <p key={component} style={{ paddingLeft: index * 18 }}>
                    {index ? '└─ ' : ''}
                    {component}
                  </p>
                ))}
              </div>
            </DesignSection>
            <DesignSection number="04" title="Data and API contracts">
              <BulletPanel title="Data models" items={caseStudy.dataModels} />
              <div className="mt-4 rounded-2xl bg-[#060606] p-5 font-mono text-sm leading-8 text-slate-300">
                {caseStudy.apiContracts.map((contract) => (
                  <p key={contract}>{contract}</p>
                ))}
              </div>
            </DesignSection>
            <DesignSection number="05" title="State and caching">
              <p className="text-sm leading-7 text-[var(--text-soft)]">{caseStudy.stateDecision}</p>
              <div className="mt-4 rounded-2xl border border-brand-500/20 bg-brand-500/5 p-5">
                <strong className="text-sm">Caching decision</strong>
                <p className="mt-2 text-sm leading-7 text-[var(--text-soft)]">
                  {caseStudy.cachingStrategy}
                </p>
              </div>
            </DesignSection>
            <DesignSection number="06" title="Quality attributes">
              <div className="grid gap-4 md:grid-cols-3">
                <BulletPanel icon={Gauge} title="Performance" items={caseStudy.performance} />
                <BulletPanel
                  icon={CheckCircle2}
                  title="Accessibility"
                  items={caseStudy.accessibility}
                />
                <BulletPanel icon={ShieldCheck} title="Security" items={caseStudy.security} />
              </div>
            </DesignSection>
            <DesignSection number="07" title="Trade-offs and follow-ups">
              <BulletPanel title="Trade-offs" items={caseStudy.tradeOffs} />
              <div className="mt-4 rounded-2xl border border-violet-500/20 bg-violet-500/5 p-5">
                <strong>Interviewer follow-ups</strong>
                <ul className="mt-3 space-y-2">
                  {caseStudy.followUps.map((item) => (
                    <li className="text-sm text-[var(--text-soft)]" key={item}>
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            </DesignSection>
          </div>
          <aside className="space-y-3 lg:sticky lg:top-24 lg:self-start">
            <CompletionButton contentId={caseStudy.id} type="system-design" />
            <BookmarkButton
              className="h-11 rounded-xl"
              contentId={caseStudy.id}
              description={caseStudy.description}
              showLabel
              title={caseStudy.title}
              type="system-design"
              url={'/system-design/' + caseStudy.slug}
            />
            <div className="surface-card rounded-2xl p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-faint)]">
                Reading time
              </p>
              <p className="mt-2 text-sm font-semibold">{caseStudy.estimatedReadTime} minutes</p>
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}

function ArchitectureNode({
  icon: Icon,
  label,
  detail,
}: {
  icon: typeof Network;
  label: string;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border bg-[var(--surface)] p-4 text-center shadow-sm">
      <Icon className="mx-auto size-5 text-brand-500" />
      <strong className="mt-2 block text-sm">{label}</strong>
      <span className="mt-1 block text-xs text-[var(--text-faint)]">{detail}</span>
    </div>
  );
}

function DesignSection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <span className="font-mono text-xs font-bold text-brand-500">{number}</span>
      <h2 className="mt-1 text-2xl font-extrabold tracking-tight">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function BulletPanel({
  title,
  items,
  icon: Icon,
}: {
  title: string;
  items: string[];
  icon?: typeof Gauge;
}) {
  return (
    <div className="surface-card rounded-2xl p-5">
      <h3 className="flex items-center gap-2 font-bold">
        {Icon && <Icon className="size-4 text-brand-500" />}
        {title}
      </h3>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li className="text-sm leading-6 text-[var(--text-soft)]" key={item}>
            • {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
