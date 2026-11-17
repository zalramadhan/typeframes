import type { ComponentType } from 'react';
import type {
  Category,
  EffectMeta,
  Format,
  Params,
  PreviewProps,
  SnippetMap,
} from './types';

import { meta as lineMaskRiseMeta } from './line-mask-rise/meta';
import LineMaskRise from './line-mask-rise/Preview';
import { build as buildLineMaskRise } from './line-mask-rise/snippets';

import { meta as wordMaskRiseMeta } from './word-mask-rise/meta';
import WordMaskRise from './word-mask-rise/Preview';
import { build as buildWordMaskRise } from './word-mask-rise/snippets';

import { meta as charStaggerMeta } from './char-stagger/meta';
import CharacterCascade from './char-stagger/Preview';
import { build as buildCharStagger } from './char-stagger/snippets';

import { meta as letterWaveMeta } from './letter-wave/meta';
import LetterWave from './letter-wave/Preview';
import { build as buildLetterWave } from './letter-wave/snippets';

import { meta as trackTightenMeta } from './track-tighten/meta';
import TrackTighten from './track-tighten/Preview';
import { build as buildTrackTighten } from './track-tighten/snippets';

import { meta as typeDeleteMeta } from './type-delete-loop/meta';
import TypeDeleteLoop from './type-delete-loop/Preview';
import { build as buildTypeDelete } from './type-delete-loop/snippets';

import { meta as terminalBootMeta } from './terminal-boot/meta';
import TerminalBoot from './terminal-boot/Preview';
import { build as buildTerminalBoot } from './terminal-boot/snippets';

import { meta as caretSweepMeta } from './caret-sweep/meta';
import CaretSweep from './caret-sweep/Preview';
import { build as buildCaretSweep } from './caret-sweep/snippets';

import { meta as scrambleMeta } from './scramble-decode/meta';
import ScrambleDecode from './scramble-decode/Preview';
import { build as buildScramble } from './scramble-decode/snippets';

import { meta as rgbSplitMeta } from './rgb-split/meta';
import ChromaticSplit from './rgb-split/Preview';
import { build as buildRgbSplit } from './rgb-split/snippets';

import { meta as sliceShiftMeta } from './slice-shift/meta';
import SliceShift from './slice-shift/Preview';
import { build as buildSliceShift } from './slice-shift/snippets';

import { meta as vhsSkewMeta } from './vhs-skew/meta';
import VhsSkew from './vhs-skew/Preview';
import { build as buildVhsSkew } from './vhs-skew/snippets';

import { meta as charShatterMeta } from './char-shatter/meta';
import CharacterShatter from './char-shatter/Preview';
import { build as buildCharShatter } from './char-shatter/snippets';

import { meta as neonMeta } from './neon-flicker/meta';
import NeonFlicker from './neon-flicker/Preview';
import { build as buildNeon } from './neon-flicker/snippets';

import { meta as glowPulseMeta } from './glow-pulse/meta';
import GlowPulse from './glow-pulse/Preview';
import { build as buildGlowPulse } from './glow-pulse/snippets';

import { meta as flipMeta } from './flip-3d/meta';
import Flip3D from './flip-3d/Preview';
import { build as buildFlip } from './flip-3d/snippets';

import { meta as echoStackMeta } from './echo-stack/meta';
import EchoStack from './echo-stack/Preview';
import { build as buildEchoStack } from './echo-stack/snippets';

import { meta as gradientSheenMeta } from './gradient-sheen/meta';
import GradientSheen from './gradient-sheen/Preview';
import { build as buildGradientSheen } from './gradient-sheen/snippets';

import { meta as karaokeMeta } from './karaoke-sweep/meta';
import KaraokeSweep from './karaoke-sweep/Preview';
import { build as buildKaraoke } from './karaoke-sweep/snippets';

import { meta as wordPopMeta } from './word-pop/meta';
import WordPop from './word-pop/Preview';
import { build as buildWordPop } from './word-pop/snippets';

import { meta as marqueeMeta } from './infinite-marquee/meta';
import InfiniteMarquee from './infinite-marquee/Preview';
import { build as buildMarquee } from './infinite-marquee/snippets';

import { meta as verticalTickerMeta } from './vertical-ticker/meta';
import VerticalTicker from './vertical-ticker/Preview';
import { build as buildVerticalTicker } from './vertical-ticker/snippets';

import { meta as diagonalTickerMeta } from './diagonal-ticker/meta';
import DiagonalTicker from './diagonal-ticker/Preview';
import { build as buildDiagonalTicker } from './diagonal-ticker/snippets';

export type Effect = {
  meta: EffectMeta;
  Preview: ComponentType<PreviewProps>;
  build: (params: Params) => SnippetMap;
};

export const EFFECTS: Effect[] = [
  { meta: lineMaskRiseMeta, Preview: LineMaskRise, build: buildLineMaskRise },
  { meta: wordMaskRiseMeta, Preview: WordMaskRise, build: buildWordMaskRise },
  { meta: charStaggerMeta, Preview: CharacterCascade, build: buildCharStagger },
  { meta: letterWaveMeta, Preview: LetterWave, build: buildLetterWave },
  { meta: trackTightenMeta, Preview: TrackTighten, build: buildTrackTighten },
  { meta: typeDeleteMeta, Preview: TypeDeleteLoop, build: buildTypeDelete },
  { meta: terminalBootMeta, Preview: TerminalBoot, build: buildTerminalBoot },
  { meta: caretSweepMeta, Preview: CaretSweep, build: buildCaretSweep },
  { meta: scrambleMeta, Preview: ScrambleDecode, build: buildScramble },
  { meta: rgbSplitMeta, Preview: ChromaticSplit, build: buildRgbSplit },
  { meta: sliceShiftMeta, Preview: SliceShift, build: buildSliceShift },
  { meta: vhsSkewMeta, Preview: VhsSkew, build: buildVhsSkew },
  { meta: charShatterMeta, Preview: CharacterShatter, build: buildCharShatter },
  { meta: neonMeta, Preview: NeonFlicker, build: buildNeon },
  { meta: glowPulseMeta, Preview: GlowPulse, build: buildGlowPulse },
  { meta: flipMeta, Preview: Flip3D, build: buildFlip },
  { meta: echoStackMeta, Preview: EchoStack, build: buildEchoStack },
  { meta: gradientSheenMeta, Preview: GradientSheen, build: buildGradientSheen },
  { meta: karaokeMeta, Preview: KaraokeSweep, build: buildKaraoke },
  { meta: wordPopMeta, Preview: WordPop, build: buildWordPop },
  { meta: marqueeMeta, Preview: InfiniteMarquee, build: buildMarquee },
  { meta: verticalTickerMeta, Preview: VerticalTicker, build: buildVerticalTicker },
  { meta: diagonalTickerMeta, Preview: DiagonalTicker, build: buildDiagonalTicker },
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
