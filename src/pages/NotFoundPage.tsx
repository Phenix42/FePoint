import { ArrowLeft, Compass } from 'lucide-react';
import { Link, useRouteError } from 'react-router-dom';
import { buttonStyles } from '@/components/common/Button';
import { Seo } from '@/components/common/Seo';

export default function NotFoundPage() {
  const error = useRouteError();
  const message = error instanceof Error ? error.message : undefined;
  return (
    <>
      <Seo
        description="The requested FEPoint page could not be found."
        path="/404"
        title="Page not found"
      />
      <div className="page-shell grid min-h-[70vh] place-items-center py-20 text-center">
        <div>
          <span className="mx-auto grid size-16 place-items-center rounded-3xl bg-brand-500/10 text-brand-500">
            <Compass className="size-7" />
          </span>
          <p className="mt-6 font-mono text-sm font-bold text-brand-500">404 · LOST IN THE VERSE</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
            This route does not exist.
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[var(--text-soft)]">
            {message ?? 'The page may have moved, or the link may be incomplete.'}
          </p>
          <Link className={buttonStyles({ className: 'mt-7' })} to="/">
            <ArrowLeft className="size-4" /> Back home
          </Link>
        </div>
      </div>
    </>
  );
}
