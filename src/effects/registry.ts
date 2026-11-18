import { lazy, type ComponentType, type LazyExoticComponent } from 'react';
import type {
  Category,
  EffectMeta,
  Format,
  Params,
  PreviewProps,
  SnippetMap,
} from './types';

import { meta as lineMaskRiseMeta } from './line-mask-rise/meta';
import { meta as wordMaskRiseMeta } from './word-mask-rise/meta';
import { meta as charStaggerMeta } from './char-stagger/meta';
import { meta as letterWaveMeta } from './letter-wave/meta';
import { meta as trackTightenMeta } from './track-tighten/meta';
import { meta as typeDeleteMeta } from './type-delete-loop/meta';
import { meta as terminalBootMeta } from './terminal-boot/meta';
import { meta as caretSweepMeta } from './caret-sweep/meta';
import { meta as scrambleMeta } from './scramble-decode/meta';
import { meta as rgbSplitMeta } from './rgb-split/meta';
import { meta as sliceShiftMeta } from './slice-shift/meta';
import { meta as vhsSkewMeta } from './vhs-skew/meta';
import { meta as charShatterMeta } from './char-shatter/meta';
import { meta as neonMeta } from './neon-flicker/meta';
import { meta as glowPulseMeta } from './glow-pulse/meta';
import { meta as flipMeta } from './flip-3d/meta';
import { meta as echoStackMeta } from './echo-stack/meta';
import { meta as gradientSheenMeta } from './gradient-sheen/meta';
import { meta as karaokeMeta } from './karaoke-sweep/meta';
import { meta as wordPopMeta } from './word-pop/meta';
import { meta as marqueeMeta } from './infinite-marquee/meta';
import { meta as verticalTickerMeta } from './vertical-ticker/meta';
import { meta as diagonalTickerMeta } from './diagonal-ticker/meta';

export type SnippetBuilder = (params: Params) => SnippetMap;

export type Effect = {
  meta: EffectMeta;
  Preview: LazyExoticComponent<ComponentType<PreviewProps>>;
  loadSnippets: () => Promise<{ build: SnippetBuilder }>;
};

// Previews and code snippets are loaded on demand so the first paint only
// ships markup + metadata. Keeps the catalog light on phones.
function defineEffect(
  meta: EffectMeta,
  preview: () => Promise<{ default: ComponentType<PreviewProps> }>,
  snippets: () => Promise<{ build: SnippetBuilder }>,
): Effect {
  return { meta, Preview: lazy(preview), loadSnippets: snippets };
}

export const EFFECTS: Effect[] = [
  defineEffect(
    lineMaskRiseMeta,
    () => import('./line-mask-rise/Preview'),
    () => import('./line-mask-rise/snippets'),
  ),
  defineEffect(
    wordMaskRiseMeta,
    () => import('./word-mask-rise/Preview'),
    () => import('./word-mask-rise/snippets'),
  ),
  defineEffect(
    charStaggerMeta,
    () => import('./char-stagger/Preview'),
    () => import('./char-stagger/snippets'),
  ),
  defineEffect(
    letterWaveMeta,
    () => import('./letter-wave/Preview'),
    () => import('./letter-wave/snippets'),
  ),
  defineEffect(
    trackTightenMeta,
    () => import('./track-tighten/Preview'),
    () => import('./track-tighten/snippets'),
  ),
  defineEffect(
    typeDeleteMeta,
    () => import('./type-delete-loop/Preview'),
    () => import('./type-delete-loop/snippets'),
  ),
  defineEffect(
    terminalBootMeta,
    () => import('./terminal-boot/Preview'),
    () => import('./terminal-boot/snippets'),
  ),
  defineEffect(
    caretSweepMeta,
    () => import('./caret-sweep/Preview'),
    () => import('./caret-sweep/snippets'),
  ),
  defineEffect(
    scrambleMeta,
    () => import('./scramble-decode/Preview'),
    () => import('./scramble-decode/snippets'),
  ),
  defineEffect(
    rgbSplitMeta,
    () => import('./rgb-split/Preview'),
    () => import('./rgb-split/snippets'),
  ),
  defineEffect(
    sliceShiftMeta,
    () => import('./slice-shift/Preview'),
    () => import('./slice-shift/snippets'),
  ),
  defineEffect(
    vhsSkewMeta,
    () => import('./vhs-skew/Preview'),
    () => import('./vhs-skew/snippets'),
  ),
  defineEffect(
    charShatterMeta,
    () => import('./char-shatter/Preview'),
    () => import('./char-shatter/snippets'),
  ),
  defineEffect(
    neonMeta,
    () => import('./neon-flicker/Preview'),
    () => import('./neon-flicker/snippets'),
  ),
  defineEffect(
    glowPulseMeta,
    () => import('./glow-pulse/Preview'),
    () => import('./glow-pulse/snippets'),
  ),
  defineEffect(
    flipMeta,
    () => import('./flip-3d/Preview'),
    () => import('./flip-3d/snippets'),
  ),
  defineEffect(
    echoStackMeta,
    () => import('./echo-stack/Preview'),
    () => import('./echo-stack/snippets'),
  ),
  defineEffect(
    gradientSheenMeta,
    () => import('./gradient-sheen/Preview'),
    () => import('./gradient-sheen/snippets'),
  ),
  defineEffect(
    karaokeMeta,
    () => import('./karaoke-sweep/Preview'),
    () => import('./karaoke-sweep/snippets'),
  ),
  defineEffect(
    wordPopMeta,
    () => import('./word-pop/Preview'),
    () => import('./word-pop/snippets'),
  ),
  defineEffect(
    marqueeMeta,
    () => import('./infinite-marquee/Preview'),
    () => import('./infinite-marquee/snippets'),
  ),
  defineEffect(
    verticalTickerMeta,
    () => import('./vertical-ticker/Preview'),
    () => import('./vertical-ticker/snippets'),
  ),
  defineEffect(
    diagonalTickerMeta,
    () => import('./diagonal-ticker/Preview'),
    () => import('./diagonal-ticker/snippets'),
  ),
];

export const CATEGORY_ORDER: Category[] = [
  'kinetic',
  'typewriter',
  'glitch',
  'neon3d',
  'karaoke',
  'marquee',
];

export const CATEGORY_LABELS: Record<Category, string> = {
  kinetic: 'Kinetic',
  typewriter: 'Typewriter',
  glitch: 'Glitch',
  neon3d: 'Neon / 3D',
  karaoke: 'Karaoke',
  marquee: 'Marquee',
};

export function getEffect(id: string): Effect | undefined {
  return EFFECTS.find((effect) => effect.meta.id === id);
}

export function formatLabel(format: Format, engine: EffectMeta['engine']): string {
  if (format === 'html') {
    return engine === 'css' ? 'HTML + CSS' : 'HTML + CSS + JS';
  }
  if (format === 'react') return 'React';
  return 'Framer Motion';
}

export function formatNote(format: Format): string {
  if (format === 'framer') {
    return "This effect relies on random or sequential timing that Framer Motion variants can't express.";
  }
  return '';
}
