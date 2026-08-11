import { ArrowLeft, Gauge, Link2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Badge } from '@/components/common/Badge';
import { BookmarkButton } from '@/components/common/BookmarkButton';
import { CodeBlock } from '@/components/common/CodeBlock';
import { Seo } from '@/components/common/Seo';
import { DsaNav } from '@/components/dsa/DsaNav';
import { dsaTopics, getDsaTopic } from '@/content/dsa/dsaTopics';

export default function DsaTopicPage() {
  const { slug } = useParams();
  const topic = getDsaTopic(slug);
  if (!topic)
    return (
      <div className="page-shell py-24 text-center">
        <h1 className="text-3xl font-extrabold">DSA topic not found</h1>
        <Link className="mt-5 inline-flex text-brand-500" to="/dsa">
          Back to DSA overview
        </Link>
      </div>
    );
  const routeGroup = topic.kind === 'algorithm' ? 'algorithms' : 'data-structures';
  const href = `/dsa/${routeGroup}/${topic.slug}`;
  return (
    <>
      <Seo description={topic.description} path={href} title={`${topic.title} for frontend`} />
      <div className="border-b bg-[var(--surface)]">
        <div className="page-shell py-5">
          <DsaNav />
        </div>
      </div>
      <main className="page-shell py-10">
        <div className="mx-auto max-w-4xl">
          <Link
            className="inline-flex items-center gap-2 text-xs font-bold text-[var(--text-soft)] hover:text-brand-500"
            to="/dsa"
          >
            <ArrowLeft className="size-4" /> DSA overview
          </Link>
          <div className="mt-7 flex flex-wrap items-center gap-2">
            <Badge tone="blue">{topic.kind.replace('-', ' ')}</Badge>
            <BookmarkButton
              contentId={topic.id}
              description={topic.description}
              title={topic.title}
              type="dsa-topic"
              url={href}
            />
          </div>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight">{topic.title}</h1>
          <p className="mt-4 text-lg leading-8 text-[var(--text-soft)]">{topic.description}</p>
          <section className="mt-8 rounded-2xl bg-brand-500/8 p-5">
            <span className="eyebrow">Simple explanation</span>
            <p className="mt-3 leading-8">{topic.simpleExplanation}</p>
            <p className="mt-4 text-sm leading-7 text-[var(--text-soft)]">
              <strong>Analogy:</strong> {topic.analogy}
            </p>
          </section>
          <section className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="surface-card rounded-2xl p-5">
              <h2 className="font-bold">Key operations and decisions</h2>
              {topic.keyOperations.map((item) => (
                <p className="mt-3 text-sm leading-6 text-[var(--text-soft)]" key={item}>
                  • {item}
                </p>
              ))}
            </div>
            <div className="surface-card rounded-2xl p-5">
              <h2 className="flex items-center gap-2 font-bold">
                <Gauge className="size-4 text-emerald-500" /> Complexity lens
              </h2>
              <p className="mt-4 font-mono text-sm">Time: {topic.complexity.time}</p>
              <p className="mt-2 font-mono text-sm">Space: {topic.complexity.space}</p>
              <p className="mt-4 text-xs leading-5 text-[var(--text-faint)]">
                {topic.complexity.explanation}
              </p>
            </div>
          </section>
          <section className="mt-8">
            <h2 className="text-2xl font-extrabold">Code examples</h2>
            <CodeBlock
              code={topic.javascriptExample}
              explanation={`A focused JavaScript example of ${topic.title.toLowerCase()}.`}
              language="javascript"
              title="JavaScript"
            />
            <CodeBlock
              code={topic.typescriptExample}
              explanation="The TypeScript version makes the input and output contract explicit."
              language="typescript"
              title="TypeScript"
            />
          </section>
          <section className="mt-8 surface-card rounded-2xl p-5">
            <h2 className="flex items-center gap-2 font-bold">
              <Link2 className="size-4 text-brand-500" /> Related concepts
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {topic.relatedSlugs.map((relatedSlug) => {
                const related = dsaTopics.find((item) => item.slug === relatedSlug);
                return related ? (
                  <Link
                    className="rounded-full border px-3 py-1.5 text-xs font-semibold hover:border-brand-500 hover:text-brand-500"
                    key={related.id}
                    to={`/dsa/${related.kind === 'algorithm' ? 'algorithms' : 'data-structures'}/${related.slug}`}
                  >
                    {related.title}
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
