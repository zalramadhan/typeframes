import { Suspense } from 'react';
import { FONT_STACKS, SAMPLE_TEXT } from '../lib/constants';
import { CATEGORY_LABELS, type Effect } from '../effects/registry';
import type { Params } from '../effects/types';

type Props = {
  effect: Effect;
  reducedMotion: boolean;
  active: boolean;
  token: number;
  onActivate: () => void;
  onDeactivate: () => void;
  onOpen: () => void;
};

export default function EffectCard({
  effect,
  reducedMotion,
  active,
  token,
  onActivate,
  onDeactivate,
  onOpen,
}: Props) {
  const { meta, Preview } = effect;

  return (
    <article className="group flex flex-col border border-line bg-surface">
      <div
        role="button"
        tabIndex={0}
        onClick={onActivate}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onActivate();
          }
        }}
        onMouseEnter={onActivate}
        onMouseLeave={onDeactivate}
        onFocus={onActivate}
        onBlur={onDeactivate}
        aria-label={`Play ${meta.name} preview`}
        className="relative flex aspect-[4/3] w-full cursor-pointer items-center justify-center overflow-hidden bg-bg px-5 focus-visible:outline-offset-[-3px]"
      >
        {active ? (
          <Suspense fallback={<CardPlaceholder />}>
            <Preview
              key={`preview-${token}`}
              params={cardParams(effect)}
              reducedMotion={reducedMotion}
            />
          </Suspense>
        ) : (
          <CardPlaceholder />
        )}
        <span className="pointer-events-none absolute left-3 top-3 text-[10px] uppercase tracking-[0.18em] text-muted opacity-0 transition-opacity group-hover:opacity-100">
          Play
        </span>
      </div>

      <div className="flex items-start justify-between gap-4 border-t border-line px-4 py-4">
        <div>
          <h3 className="text-sm font-medium">{meta.name}</h3>
          <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-muted">
            {CATEGORY_LABELS[meta.category]}
          </p>
        </div>
        <button
          type="button"
          onClick={onOpen}
          className="shrink-0 border-b border-transparent pb-0.5 text-xs text-muted transition-colors hover:border-line hover:text-ink"
        >
          Open →
        </button>
      </div>
    </article>
  );
}

function CardPlaceholder() {
  return (
    <span
      className="select-none"
      style={{
        color: '#F5F5F5',
        fontSize: 36,
        fontWeight: 500,
        fontFamily: FONT_STACKS.Inter,
        letterSpacing: '-0.02em',
      }}
    >
      {SAMPLE_TEXT}
    </span>
  );
}

function cardParams(effect: Effect): Params {
  const extra = Object.fromEntries(
    effect.meta.extraParams.map((control) => [control.key, control.default]),
  );
  return {
    text: effect.meta.sharedOverrides?.text ?? SAMPLE_TEXT,
    duration: 1200,
    delay: 70,
    easing: 'ease-out',
    fontSize: 36,
    fontWeight: 600,
    fontFamily: 'Inter',
    color: '#F5F5F5',
    loop: effect.meta.sharedOverrides?.loop ?? false,
    ...extra,
  };
}
