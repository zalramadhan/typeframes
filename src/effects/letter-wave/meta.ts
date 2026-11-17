import type { EffectMeta } from '../types';

export const meta: EffectMeta = {
  id: 'letter-wave',
  name: 'Letter Wave',
  category: 'kinetic',
  blurb: 'A continuous sine wave rolls through every character.',
  tags: ['wave', 'loop', 'split'],
  engine: 'css',
  sharedOverrides: { loop: true, duration: 1600, delay: 60 },
  extraParams: [
    {
      kind: 'range',
      key: 'amplitude',
      label: 'Amplitude',
      min: 4,
      max: 24,
      step: 1,
      unit: 'px',
      default: 12,
    },
  ],
  supportedFormats: ['html', 'react', 'framer'],
};
