import { ArrowRight, Boxes, MonitorSmartphone, ServerCog } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHero } from '@/components/common/PageHero';
import { Seo } from '@/components/common/Seo';
import { systemDesignLearningTopics } from '@/content/system-design/systemDesignTopics';

const groups = [
  {
    id: 'fundamentals',
    title: 'System foundations',
    description: 'Network, scale, data, reliability, security, and operations.',
    icon: ServerCog,
  },
  {
    id: 'backend-for-frontend',
    title: 'Backend concepts for frontend',
    description: 'APIs, caches, and real-time transport through a client lens.',
    icon: Boxes,
  },
  {
    id: 'frontend',
    title: 'Frontend architecture',
    description: 'State, component boundaries, failure, systems, testing, and analytics.',
    icon: MonitorSmartphone,
  },
] as const;

export default function SystemDesignFundamentalsPage() {
  return (
    <>
      <Seo
        description="System design fundamentals explained for frontend developers, from client/server and networks to caching, databases, queues, security, and frontend architecture."
        path="/system-design/fundamentals"
        title="System design fundamentals"
      />
      <PageHero
        description="Build the vocabulary needed to understand distributed systems, then connect every concept back to interface architecture and user experience."
        eyebrow="Beginner-to-interview foundation"
        title="System design fundamentals for frontend developers."
      />
      <main className="page-shell py-10 sm:py-14">
        <Link className="text-sm font-bold text-brand-500 hover:underline" to="/system-design">
          ← System design overview
        </Link>
        <div className="mt-8 space-y-12">
          {groups.map((group) => {
            const Icon = group.icon;
            const topics = systemDesignLearningTopics.filter((topic) => topic.group === group.id);
            return (
              <section key={group.id}>
                <div className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-500/10 text-brand-500">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h2 className="text-2xl font-extrabold">{group.title}</h2>
                    <p className="mt-1 text-sm text-[var(--text-soft)]">{group.description}</p>
                  </div>
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {topics.map((topic) => (
                    <Link
                      className="surface-card group rounded-2xl p-5 transition hover:-translate-y-0.5 hover:border-brand-500/40"
                      key={topic.id}
                      to={`/system-design/fundamentals/${topic.slug}`}
                    >
                      <h3 className="font-bold group-hover:text-brand-500">{topic.title}</h3>
                      <p className="mt-2 line-clamp-3 text-sm leading-6 text-[var(--text-soft)]">
                        {topic.simpleExplanation}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-brand-500">
                        Learn the trade-offs <ArrowRight className="size-3" />
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </>
  );
}
