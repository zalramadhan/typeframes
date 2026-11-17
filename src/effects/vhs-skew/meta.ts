import type { EffectMeta } from '../types';

export const meta: EffectMeta = {
  id: 'vhs-skew',
  name: 'VHS Skew',
  category: 'glitch',
  blurb: 'The line skews and tears like a worn tape, scanlines and all.',
  tags: ['vhs', 'scanlines', 'tape'],
  engine: 'css',
  sharedOverrides: { loop: true, duration: 2200 },
  extraParams: [
    {
      kind: 'range',
      key: 'skew',
      label: 'Skew',
      min: 2,
      max: 16,
      step: 1,
      unit: 'deg',
      default: 6,
    },
    {
      kind: 'range',
      key: 'jitter',
      label: 'Jitter',
      min: 1,
      max: 10,
      step: 1,
      unit: 'px',
      default: 3,
    },
    { kind: 'toggle', key: 'scanlines', label: 'Scanlines', default: true },
  ],
  supportedFormats: ['html', 'react', 'framer'],
};
