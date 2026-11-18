import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import ControlPanel from './ControlPanel';
import CodePanel from './CodePanel';
import { CATEGORY_LABELS, type Effect } from '../effects/registry';
import type { Params } from '../effects/types';
import {
  MAX_TEXT_LENGTH,
  SAMPLE_TEXT,
  defaultParamsFor,
} from '../lib/constants';
import { graphemeLength, truncateGraphemes } from '../lib/splitText';
import { clearPreset, loadPreset, savePreset } from '../lib/presets';

type Props = {
  effect: Effect;
  systemReducedMotion: boolean;
  reducedMotion: boolean;
  motionOn: boolean;
  onToggleMotion: () => void;
  onClose: () => void;
};

function initialParams(effect: Effect): Params {
  const defaults = defaultParamsFor(
    effect.meta.extraParams,
    effect.meta.sharedOverrides,
  );
  const preset = loadPreset(effect.meta.id);
  if (!preset) return defaults;

  const merged: Params = { ...defaults };
  for (const key of Object.keys(defaults)) {
    if (key in preset) {
      (merged as Record<string, unknown>)[key] = (
        preset as Record<string, unknown>
      )[key];
    }
  }
  return merged;
}

export default function EffectModal({
  effect,
  systemReducedMotion,
  reducedMotion,
  motionOn,
  onToggleMotion,
  onClose,
}: Props) {
  const [params, setParams] = useState<Params>(() => initialParams(effect));
  const [playToken, setPlayToken] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const firstRender = useRef(true);
  const { meta, Preview } = effect;

  const effectiveParams: Params = {
    ...params,
    text: params.text.trim() ? params.text : SAMPLE_TEXT,
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const timer = window.setTimeout(() => {
      savePreset(meta.id, params);
    }, 300);
    return () => window.clearTimeout(timer);
  }, [params, meta.id]);

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter(
        (element) =>
          !element.hasAttribute('disabled') && element.offsetParent !== null,
      );

      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [onClose]);

  const update = useCallback((patch: Partial<Params>) => {
    setParams((current) => ({ ...current, ...patch }) as Params);
  }, []);

  const reset = () => {
    clearPreset(meta.id);
    setParams(defaultParamsFor(meta.extraParams, meta.sharedOverrides));
    setPlayToken((value) => value + 1);
  };

  const previewKey = `${playToken}:${JSON.stringify(effectiveParams)}`;
  const count = graphemeLength(params.text);

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 p-3 sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="tf-modal-title"
        ref={panelRef}
        className="mx-auto w-full max-w-[1040px] overflow-hidden border border-line bg-surface"
      >
        <header className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
          <div>
            <h2 id="tf-modal-title" className="text-lg font-medium">
              {meta.name}
            </h2>
            <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-muted">
              {CATEGORY_LABELS[meta.category]} · {meta.engine}
            </p>
          </div>
          <button
            type="button"
            ref={closeRef}
            onClick={onClose}
            aria-label="Close"
            className="-mr-1 -mt-1 flex h-8 w-8 items-center justify-center border border-transparent text-muted transition-colors hover:border-line hover:text-ink"
          >
            ✕
          </button>
        </header>

        <div className="grid lg:grid-cols-[1.05fr_1fr]">
          <div className="min-w-0 border-b border-line lg:border-b-0 lg:border-r">
            <div className="flex h-[260px] items-center justify-center overflow-hidden bg-bg px-5 sm:h-[300px]">
              <Suspense fallback={null}>
                <Preview
                  key={previewKey}
                  params={effectiveParams}
                  reducedMotion={reducedMotion}
                />
              </Suspense>
            </div>

            <div className="space-y-4 border-t border-line p-5">
              <div>
                <div className="mb-2 flex items-baseline justify-between gap-3">
                  <label
                    htmlFor="tf-text"
                    className="text-xs text-ink"
                  >
                    Text
                  </label>
                  <span className="font-mono text-[11px] tabular-nums text-muted">
                    {count} / {MAX_TEXT_LENGTH}
                  </span>
                </div>
                <textarea
                  id="tf-text"
                  value={params.text}
                  rows={2}
                  onChange={(event) =>
                    update({
                      text: truncateGraphemes(
                        event.target.value,
                        MAX_TEXT_LENGTH,
                      ),
                    })
                  }
                  className="tf-modal-scroll w-full resize-y border border-line bg-surface2 px-3 py-2 text-sm leading-relaxed outline-none transition-colors focus:border-muted"
                  placeholder={SAMPLE_TEXT}
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPlayToken((value) => value + 1)}
                  className="border border-line bg-surface2 px-3 py-1.5 text-xs transition-colors hover:border-ink"
                >
                  Replay
                </button>
                <button
                  type="button"
                  aria-pressed={params.loop}
                  onClick={() => update({ loop: !params.loop })}
                  className={`border px-3 py-1.5 text-xs transition-colors ${
                    params.loop
                      ? 'border-ink bg-ink text-bg'
                      : 'border-line bg-surface2 hover:border-ink'
                  }`}
                >
                  Loop
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="ml-auto text-xs text-muted underline decoration-line underline-offset-4 transition-colors hover:text-ink"
                >
                  Reset
                </button>
              </div>

              {systemReducedMotion ? (
                <div className="flex flex-wrap items-center justify-between gap-2 border border-line bg-surface2 px-3 py-2 text-[11px] text-muted">
                  <span>
                    {motionOn
                      ? 'Motion is on for this session.'
                      : 'Motion reduced — animations show the end state.'}
                  </span>
                  <button
                    type="button"
                    onClick={onToggleMotion}
                    className="border-b border-line pb-0.5 text-ink transition-colors hover:border-ink"
                  >
                    {motionOn ? 'Motion off' : 'Play anyway'}
                  </button>
                </div>
              ) : null}
            </div>
          </div>

          <div className="tf-modal-scroll min-w-0 lg:max-h-[calc(100vh-140px)] lg:overflow-y-auto">
            <ControlPanel
              params={params}
              extraParams={meta.extraParams}
              onChange={update}
            />
            <CodePanel effect={effect} params={effectiveParams} />
          </div>
        </div>
      </div>
    </div>
  );
}
