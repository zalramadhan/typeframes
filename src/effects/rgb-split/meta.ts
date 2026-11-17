import type { EffectMeta } from '../types';

export const meta: EffectMeta = {
  id: 'rgb-split',
  name: 'Chromatic Split',
  category: 'glitch',
  blurb: 'Red and cyan copies tear away from the text in short bursts.',
  tags: ['glitch', 'chromatic', 'css'],
  engine: 'css',
  extraParams: [
    {
      kind: 'range',
      key: 'offset',
      label: 'Split offset',
      min: 1,
      max: 8,
      step: 1,
      unit: 'px',
      default: 3,
    },
    {
      kind: 'range',
      key: 'jitter',
      label: 'Jitter',
      min: 0,
      max: 6,
      step: 1,
      unit: 'px',
      default: 2,
    },
    {
      kind: 'range',
      key: 'frequency',
      label: 'Frequency',
      min: 1,
      max: 5,
      step: 1,
      unit: 'x',
      default: 2,
    },
  ],
  supportedFormats: ['html', 'react', 'framer'],
};
