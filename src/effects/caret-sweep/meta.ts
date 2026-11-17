import type { EffectMeta } from '../types';

export const meta: EffectMeta = {
  id: 'caret-sweep',
  name: 'Caret Sweep',
  category: 'typewriter',
  blurb: 'A single caret travels across the line, wiping the text into view.',
  tags: ['clip-path', 'caret', 'reveal'],
  engine: 'css',
  sharedOverrides: { duration: 1400, easing: 'ease-out' },
  extraParams: [
    {
      kind: 'range',
      key: 'caretWidth',
      label: 'Caret width',
      min: 1,
      max: 6,
      step: 1,
      unit: 'px',
      default: 2,
    },
  ],
  supportedFormats: ['html', 'react'],
};
