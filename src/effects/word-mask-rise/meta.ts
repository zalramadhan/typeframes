import type { EffectMeta } from '../types';

export const meta: EffectMeta = {
  id: 'word-mask-rise',
  name: 'Word Mask Rise',
  category: 'kinetic',
  blurb: 'Every word climbs out of its own mask, wrapping as it goes.',
  tags: ['mask', 'words', 'stagger'],
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
