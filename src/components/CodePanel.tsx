import { useEffect, useMemo, useState } from 'react';
import {
  formatLabel,
  formatNote,
  type Effect,
  type SnippetBuilder,
} from '../effects/registry';
import type { Format, Params } from '../effects/types';

const ALL_FORMATS: Format[] = ['html', 'react', 'framer'];

type Props = {
  effect: Effect;
  params: Params;
};

function fallbackCopy(text: string): boolean {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  const ok = document.execCommand('copy');
  document.body.removeChild(textarea);
  return ok;
}

export default function CodePanel({ effect, params }: Props) {
  const [build, setBuild] = useState<SnippetBuilder | null>(null);
  const supported = effect.meta.supportedFormats;
  const [format, setFormat] = useState<Format>(supported[0]);
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle');

  useEffect(() => {
    let cancelled = false;
    setBuild(null);
    effect.loadSnippets().then((module) => {
      if (!cancelled) setBuild(() => module.build);
    });
    return () => {
      cancelled = true;
    };
  }, [effect]);

  useEffect(() => {
    setFormat(supported[0]);
    setStatus('idle');
  }, [effect.meta.id, supported]);

  const snippets = useMemo(() => (build ? build(params) : null), [build, params]);
  const code = snippets?.[format] ?? '';

  const copy = async () => {
    if (!code) return;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(code);
        setStatus('copied');
      } else {
        setStatus(fallbackCopy(code) ? 'copied' : 'failed');
      }
    } catch {
      setStatus(fallbackCopy(code) ? 'copied' : 'failed');
    }
    window.setTimeout(() => setStatus('idle'), 1800);
  };

  return (
    <div className="border-t border-line px-5 py-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h4 className="text-[10px] uppercase tracking-[0.18em] text-muted">
          Code
        </h4>
        <select
          value={format}
          onChange={(event) => setFormat(event.target.value as Format)}
          aria-label="Code format"
          className="border border-line bg-surface2 px-2 py-1.5 text-[11px] text-ink outline-none transition-colors hover:border-muted"
        >
          {ALL_FORMATS.map((option) => {
            const isSupported = supported.includes(option);
            return (
              <option
                key={option}
                value={option}
                disabled={!isSupported}
                title={isSupported ? undefined : formatNote(option)}
              >
                {formatLabel(option, effect.meta.engine)}
                {isSupported ? '' : ' — not supported'}
              </option>
            );
          })}
        </select>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={copy}
          disabled={!code}
          className="absolute right-2 top-2 border border-line bg-surface2 px-2.5 py-1 text-[11px] text-ink transition-colors hover:border-ink disabled:opacity-40"
        >
          {status === 'copied' ? 'Copied' : 'Copy'}
        </button>
        <pre className="tf-modal-scroll max-h-[300px] overflow-auto border border-line bg-bg p-4 pr-20 text-[11px] leading-[1.65]">
          <code className="whitespace-pre font-mono">
            {code || 'Loading snippet…'}
          </code>
        </pre>
      </div>

      <p aria-live="polite" className="mt-2 min-h-[16px] text-[11px] text-muted">
        {status === 'copied'
          ? 'Copied to clipboard.'
          : status === 'failed'
            ? 'Copy failed — select the code manually.'
            : 'Self-contained snippet. No classes from this site are required.'}
      </p>
    </div>
  );
}
