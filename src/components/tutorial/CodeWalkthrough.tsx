import { useState } from 'react';
import type { CodeWalkthrough as CodeWalkthroughType } from '@/types/content';

export function CodeWalkthrough({ walkthrough }: { walkthrough: CodeWalkthroughType }) {
  const [activeLine, setActiveLine] = useState(walkthrough.lines[0]?.line ?? 1);
  const active = walkthrough.lines.find((item) => item.line === activeLine) ?? walkthrough.lines[0];
  return (
    <section className="surface-card overflow-hidden rounded-2xl">
      <div className="border-b px-5 py-4">
        <span className="eyebrow">Line-by-line code walkthrough</span>
        <h3 className="mt-2 font-bold">{walkthrough.title}</h3>
      </div>
      <div className="grid lg:grid-cols-[minmax(0,1.25fr)_minmax(16rem,.75fr)]">
        <div className="overflow-x-auto bg-[var(--code)] py-4 font-mono text-sm text-slate-200">
          {walkthrough.lines.map((item) => (
            <button
              className={`flex w-full gap-4 px-5 py-2 text-left transition ${item.line === activeLine ? 'bg-brand-500/15 text-white' : 'hover:bg-white/5'}`}
              key={item.line}
              onClick={() => setActiveLine(item.line)}
              type="button"
            >
              <span className="w-5 shrink-0 text-right text-slate-500">{item.line}</span>
              <code className="whitespace-pre">{item.code}</code>
            </button>
          ))}
        </div>
        <div className="p-5" aria-live="polite">
          <p className="text-xs font-bold uppercase tracking-wider text-brand-500">
            Line {active?.line}
          </p>
          <p className="mt-3 text-sm leading-6 text-[var(--text-soft)]">{active?.explanation}</p>
          <div className="mt-5 rounded-xl bg-[var(--surface-muted)] p-4">
            <strong className="text-xs uppercase tracking-wider">Expected result</strong>
            <p className="mt-2 text-xs leading-5 text-[var(--text-soft)]">{walkthrough.output}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
