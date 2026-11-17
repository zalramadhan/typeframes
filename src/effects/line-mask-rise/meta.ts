import type { EffectMeta } from '../types';

export const meta: EffectMeta = {
  id: 'line-mask-rise',
  name: 'Line Mask Rise',
  category: 'kinetic',
  blurb: 'Whole lines slide up from behind a mask, one after another.',
  tags: ['mask', 'stagger', 'editorial'],
  engine: 'css',
  extraParams: [
    {
      kind: 'range',
      key: 'distance',
      label: 'Rise distance',
      min: 100,
      max: 160,
      step: 5,
      unit: '%',
      default: 115,
    },
  ],
  supportedFormats: ['html', 'react', 'framer'],
};
