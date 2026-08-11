import { Highlight, themes } from 'prism-react-renderer';
import { CopyButton } from '@/components/common/CopyButton';
import type { CodeExample } from '@/types/content';

export function CodeBlock({ code, language, title, explanation }: CodeExample) {
  return (
    <figure className="my-7 overflow-hidden rounded-2xl border border-slate-800 bg-[#060a13] shadow-2xl shadow-black/10">
      <div className="flex items-center justify-between border-b border-slate-800 bg-[#0a1020] px-3 py-2">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex gap-1.5" aria-hidden="true">
            <i className="size-2.5 rounded-full bg-red-400/70" />
            <i className="size-2.5 rounded-full bg-amber-400/70" />
            <i className="size-2.5 rounded-full bg-emerald-400/70" />
          </span>
          <span className="truncate font-mono text-[0.68rem] text-slate-400">{title}</span>
        </div>
        <div className="flex items-center">
          <span className="rounded bg-slate-800/80 px-2 py-1 font-mono text-[0.62rem] uppercase text-slate-400">
            {language}
          </span>
          <CopyButton value={code} />
        </div>
      </div>
      <Highlight code={code.trimEnd()} language={language} theme={themes.nightOwl}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={className + ' scrollbar-thin overflow-x-auto p-5 text-[0.82rem] leading-6'}
            style={{ ...style, background: 'transparent' }}
            tabIndex={0}
          >
            <code>
              {tokens.map((line, lineIndex) => (
                <span key={lineIndex} {...getLineProps({ line })} className="table-row">
                  <span className="table-cell w-8 select-none pr-5 text-right text-slate-700">
                    {lineIndex + 1}
                  </span>
                  <span className="table-cell">
                    {line.map((token, tokenIndex) => (
                      <span key={tokenIndex} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </span>
              ))}
            </code>
          </pre>
        )}
      </Highlight>
      <figcaption className="border-t border-slate-800 px-5 py-3 text-xs leading-5 text-slate-400">
        {explanation}
      </figcaption>
    </figure>
  );
}
