import type { EffectMeta } from '../types';

export const meta: EffectMeta = {
  id: 'flip-3d',
  name: 'Flip In 3D',
  category: 'neon3d',
  blurb: 'Characters swing in on a 3D axis, landing in a staggered row.',
  tags: ['3d', 'gsap', 'perspective'],
  engine: 'gsap',
  extraParams: [
    {
      kind: 'select',
      key: 'axis',
      label: 'Flip axis',
      options: [
        { label: 'X (vertical)', value: 'x' },
        { label: 'Y (horizontal)', value: 'y' },
      ],
      default: 'x',
    },
    {
      kind: 'range',
      key: 'perspective',
      label: 'Perspective',
      min: 300,
      max: 1600,
      step: 50,
      unit: 'px',
      default: 800,
    },
  ],
  supportedFormats: ['html', 'react', 'framer'],
};
