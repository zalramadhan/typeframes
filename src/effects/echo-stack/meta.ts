import type { EffectMeta } from '../types';

export const meta: EffectMeta = {
  id: 'echo-stack',
  name: 'Echo Stack',
  category: 'neon3d',
  blurb: 'Layered copies expand outward and fade, like a sonar ping.',
  tags: ['echo', 'layers', 'pulse'],
  engine: 'css',
  sharedOverrides: { loop: true, duration: 2400 },
  extraParams: [
    {
      kind: 'range',
      key: 'layers',
      label: 'Layers',
      min: 2,
      max: 5,
      step: 1,
      default: 3,
    },
    {
      kind: 'range',
      key: 'spread',
      label: 'Spread',
      min: 4,
      max: 40,
      step: 2,
      unit: '%',
      default: 16,
    },
  ],
  supportedFormats: ['html', 'react', 'framer'],
};
