import type { EffectMeta } from '../types';

export const meta: EffectMeta = {
  id: 'slice-shift',
  name: 'Slice Shift',
  category: 'glitch',
  blurb: 'Horizontal bands of the line tear sideways at different speeds.',
  tags: ['glitch', 'clip-path', 'bands'],
  engine: 'css',
  sharedOverrides: { loop: true, duration: 1800 },
  extraParams: [
    {
      kind: 'range',
      key: 'slices',
      label: 'Slices',
      min: 2,
      max: 4,
      step: 1,
      default: 3,
    },
    {
      kind: 'range',
      key: 'offset',
      label: 'Shift',
      min: 2,
      max: 20,
      step: 1,
      unit: 'px',
      default: 8,
    },
  ],
  supportedFormats: ['html', 'react'],
};
