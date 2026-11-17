import type { EffectMeta } from '../types';

export const meta: EffectMeta = {
  id: 'gradient-sheen',
  name: 'Gradient Sheen',
  category: 'neon3d',
  blurb: 'A highlight sweeps across the letters through a clipped gradient.',
  tags: ['gradient', 'sheen', 'shimmer'],
  engine: 'css',
  sharedOverrides: { loop: true, duration: 2200, easing: 'linear' },
  extraParams: [
    { kind: 'color', key: 'sheenColor', label: 'Sheen color', default: '#FFFFFF' },
    {
      kind: 'range',
      key: 'size',
      label: 'Gradient size',
      min: 100,
      max: 400,
      step: 20,
      unit: '%',
      default: 200,
    },
  ],
  supportedFormats: ['html', 'react', 'framer'],
};
