import { BookOpenCheck, Code2, LockKeyholeOpen, Route, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { buttonStyles } from '@/components/common/Button';
import { PageHero } from '@/components/common/PageHero';
import { Seo } from '@/components/common/Seo';
import { siteConfig } from '@/config/site';

const values = [
  [
    LockKeyholeOpen,
    'Open by default',
    'No account, subscription, tracking profile, or premium knowledge tier.',
  ],
  [
    Route,
    'Structured depth',
    'Start with the platform, build strong language fundamentals, then learn architecture.',
  ],
  [
    Code2,
    'Practical understanding',
    'Examples, exercises, machine-coding drills, and design trade-offs reinforce every concept.',
  ],
  [
    Users,
    'Community-shaped',
    'The content model and contribution flow make expert review and expansion straightforward.',
  ],
] as const;

export default function AboutPage() {
  return (
    <>
      <Seo
        description={
          'Why ' + siteConfig.name + ' exists and how its free, local-first learning model works.'
        }
        path="/about"
        title="About"
      />
      <PageHero
        actions={
          <>
            <Link className={buttonStyles()} to="/roadmap">
              Explore the roadmap
            </Link>
            <Link className={buttonStyles({ variant: 'secondary' })} to="/contribute">
              Contribute
            </Link>
          </>
        }
        aside={
          <span className="flex size-44 items-center justify-center justify-self-start overflow-hidden rounded-3xl border border-brand-500/20 bg-black shadow-2xl shadow-brand-500/10">
            <img
              alt="FEPoint logo"
              className="size-44 object-cover"
              height={176}
              src={siteConfig.logoUrl}
              width={176}
            />
          </span>
        }
        description="FEPoint is built around a simple idea: rigorous frontend learning should be easy to discover, pleasant to use, and available without surrendering personal data."
        eyebrow="Our reason to exist"
        title="A clearer path through the frontend universe."
      />
      <div className="page-shell section-space">
        <div className="mx-auto max-w-3xl">
          <span className="eyebrow">The goal</span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight">
            From isolated tutorials to connected understanding.
          </h2>
          <p className="mt-5 text-base leading-8 text-[var(--text-soft)]">
            Frontend learning is often split across documentation, short videos, coding sites,
            interview sheets, and architecture articles. This project brings those modes into one
            coherent sequence so a concept can move naturally from explanation to practice to
            interview discussion.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {values.map(([Icon, title, description]) => (
              <div className="surface-card rounded-2xl p-6" key={title}>
                <Icon className="size-5 text-brand-500" />
                <h3 className="mt-4 font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--text-soft)]">{description}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-2xl border border-brand-500/20 bg-brand-500/5 p-6">
            <BookOpenCheck className="size-5 text-brand-500" />
            <h2 className="mt-3 text-xl font-bold">Local-first by design</h2>
            <p className="mt-2 text-sm leading-7 text-[var(--text-soft)]">
              Bookmarks, completion, reading progress, notes, and history live in browser
              localStorage. You can export them as JSON, import them elsewhere, or erase them
              instantly from the progress page.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
