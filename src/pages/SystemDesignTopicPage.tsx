import { ArrowLeft, ArrowRight, Scale } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Badge } from '@/components/common/Badge';
import { BookmarkButton } from '@/components/common/BookmarkButton';
import { Seo } from '@/components/common/Seo';
import {
  getSystemDesignTopic,
  systemDesignLearningTopics,
} from '@/content/system-design/systemDesignTopics';

export default function SystemDesignTopicPage() {
  const { topicSlug } = useParams();
  const topic = getSystemDesignTopic(topicSlug);
  if (!topic)
    return (
      <div className="page-shell py-24 text-center">
        <h1 className="text-3xl font-extrabold">Topic not found</h1>
        <Link className="mt-5 inline-flex text-brand-500" to="/system-design/fundamentals">
          Back to fundamentals
        </Link>
      </div>
    );
  const href = `/system-design/fundamentals/${topic.slug}`;
  return (
    <>
      <Seo
        description={topic.simpleExplanation}
        path={href}
        title={`${topic.title} system design`}
      />
      <main className="page-shell py-10 sm:py-14">
        <div className="mx-auto max-w-4xl">
          <Link
            className="inline-flex items-center gap-2 text-xs font-bold text-[var(--text-soft)] hover:text-brand-500"
            to="/system-design/fundamentals"
          >
            <ArrowLeft className="size-4" /> All fundamentals
          </Link>
          <div className="mt-7 flex flex-wrap items-center gap-2">
            <Badge tone="blue">{topic.group.replaceAll('-', ' ')}</Badge>
            <BookmarkButton
              contentId={topic.id}
              description={topic.simpleExplanation}
              title={topic.title}
              type="system-design"
              url={href}
            />
          </div>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight">{topic.title}</h1>
          <section className="mt-8 rounded-2xl bg-brand-500/8 p-6">
            <span className="eyebrow">Simple explanation</span>
            <p className="mt-3 text-lg leading-8">{topic.simpleExplanation}</p>
            <p className="mt-4 border-t pt-4 text-sm leading-7 text-[var(--text-soft)]">
              <strong>Analogy:</strong> {topic.analogy}
            </p>
          </section>
          <section className="mt-6 surface-card rounded-2xl p-6">
            <span className="eyebrow">Developer explanation</span>
            <p className="mt-3 leading-8 text-[var(--text-soft)]">{topic.developerExplanation}</p>
          </section>
          <section className="mt-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6">
            <span className="eyebrow">Frontend impact</span>
            <p className="mt-3 leading-8 text-[var(--text-soft)]">{topic.frontendImpact}</p>
          </section>
          <section className="mt-6">
            <h2 className="flex items-center gap-2 text-2xl font-extrabold">
              <Scale className="size-5 text-violet-500" /> Trade-offs to discuss
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {topic.tradeOffs.map((tradeOff) => (
                <div
                  className="surface-card rounded-2xl p-5 text-sm leading-7 text-[var(--text-soft)]"
                  key={tradeOff}
                >
                  {tradeOff}
                </div>
              ))}
            </div>
          </section>
          <section className="mt-8 border-t pt-6">
            <h2 className="text-sm font-bold">Continue through related concepts</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {topic.relatedSlugs.map((slug) => {
                const related = systemDesignLearningTopics.find((item) => item.slug === slug);
                return related ? (
                  <Link
                    className="inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold hover:border-brand-500 hover:text-brand-500"
                    key={related.id}
                    to={`/system-design/fundamentals/${related.slug}`}
                  >
                    {related.title}
                    <ArrowRight className="size-3" />
                  </Link>
                ) : null;
              })}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
