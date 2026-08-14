import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { buttonStyles } from '@/components/common/Button';
import { Seo } from '@/components/common/Seo';

const description =
  'Learn frontend development from fundamentals to advanced concepts with simple explanations, practical examples, interview questions, DSA, system design, and real interview experiences — all in one place.';

export default function HomePage() {
  return (
    <>
      <Seo description={description} path="/" title="Frontend learning and interview preparation" />

      <section className="relative isolate flex min-h-[calc(100svh-4rem)] w-full items-center justify-center overflow-hidden px-5 py-16 sm:px-8 sm:py-24 lg:px-12 xl:min-h-screen">
        <div aria-hidden="true" className="hero-grid absolute inset-0 -z-10 opacity-45" />
        <div className="mx-auto max-w-[54rem] text-center">
          <p className="mx-auto inline-flex items-center gap-2 rounded-full border bg-[var(--surface)] px-3.5 py-1.5 text-xs font-bold tracking-[0.04em] text-[var(--text-soft)] shadow-sm">
            <Sparkles aria-hidden="true" className="size-3.5 text-[#685cf6]" />
            Your Frontend Learning Hub
          </p>

          <h1 className="mt-7 text-4xl font-black tracking-[-0.055em] text-balance sm:text-6xl lg:text-[4.6rem] lg:leading-[1.04]">
            Welcome to <span className="text-[#685cf6] dark:text-[#aaa4ff]">FePoint</span>
          </h1>

          <p className="mx-auto mt-6 max-w-[47rem] text-base leading-7 text-[var(--text-soft)] text-pretty sm:text-lg sm:leading-8">
            {description}
          </p>

          <div className="mx-auto mt-9 flex w-full max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
            <Link
              className={buttonStyles({
                size: 'lg',
                className: 'w-full rounded-xl px-6 sm:w-auto',
              })}
              to="/roadmap"
            >
              Explore Learning <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <Link
              className={buttonStyles({
                variant: 'secondary',
                size: 'lg',
                className: 'w-full rounded-xl px-6 sm:w-auto',
              })}
              to="/interview-questions"
            >
              Get Interviewed
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
