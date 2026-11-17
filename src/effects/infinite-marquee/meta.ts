import type { EffectMeta } from '../types';

export const meta: EffectMeta = {
  id: 'infinite-marquee',
  name: 'Infinite Marquee',
  category: 'marquee',
  blurb: 'A tagline that scrolls forever, with edges that fade out.',
  tags: ['marquee', 'ticker', 'loop'],
  engine: 'css',
  sharedOverrides: { loop: true },
  extraParams: [
    {
      kind: 'range',
      key: 'speed',
      label: 'Speed',
      min: 20,
      max: 160,
      step: 10,
      unit: 'px/s',
      default: 70,
    },
    {
      kind: 'select',
      key: 'direction',
      label: 'Direction',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
      default: 'left',
    },
    {
      kind: 'range',
      key: 'gap',
      label: 'Gap',
      min: 8,
      max: 80,
      step: 4,
      unit: 'px',
      default: 32,
    },
    { kind: 'toggle', key: 'pauseOnHover', label: 'Pause on hover', default: true },
  ],
  supportedFormats: ['html', 'react', 'framer'],
};
