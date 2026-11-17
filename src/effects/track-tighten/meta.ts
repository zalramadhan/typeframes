import type { EffectMeta } from '../types';

export const meta: EffectMeta = {
  id: 'track-tighten',
  name: 'Track & Tighten',
  category: 'kinetic',
  blurb: 'Letters pull together from loose tracking while the blur clears.',
  tags: ['letter-spacing', 'blur', 'reveal'],
  engine: 'css',
  extraParams: [
    {
      kind: 'range',
      key: 'spread',
      label: 'Start tracking',
      min: 4,
      max: 40,
      step: 2,
      unit: 'px',
      default: 22,
    },
    {
      kind: 'range',
      key: 'blur',
      label: 'Start blur',
      min: 0,
      max: 20,
      step: 1,
      unit: 'px',
      default: 8,
    },
  ],
  supportedFormats: ['html', 'react', 'framer'],
};
