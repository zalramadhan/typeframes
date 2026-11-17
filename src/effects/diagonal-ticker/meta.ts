import type { EffectMeta } from '../types';

export const meta: EffectMeta = {
  id: 'diagonal-ticker',
  name: 'Diagonal Ticker',
  category: 'marquee',
  blurb: 'A tilted strip of text runs across the frame at an angle.',
  tags: ['diagonal', 'ticker', 'tilt'],
  engine: 'css',
  sharedOverrides: { loop: true, fontSize: 40 },
  extraParams: [
    {
      kind: 'range',
      key: 'angle',
      label: 'Angle',
      min: -20,
      max: 20,
      step: 1,
      unit: 'deg',
      default: -6,
    },
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
  ],
  supportedFormats: ['html', 'react', 'framer'],
};
