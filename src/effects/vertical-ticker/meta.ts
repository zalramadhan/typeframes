import type { EffectMeta } from '../types';

export const meta: EffectMeta = {
  id: 'vertical-ticker',
  name: 'Vertical Ticker',
  category: 'marquee',
  blurb: 'A stack of lines climbs past the frame, endlessly.',
  tags: ['vertical', 'ticker', 'loop'],
  engine: 'css',
  sharedOverrides: { loop: true, fontSize: 40 },
  extraParams: [
    {
      kind: 'range',
      key: 'speed',
      label: 'Speed',
      min: 20,
      max: 140,
      step: 10,
      unit: 'px/s',
      default: 60,
    },
    {
      kind: 'select',
      key: 'direction',
      label: 'Direction',
      options: [
        { label: 'Up', value: 'up' },
        { label: 'Down', value: 'down' },
      ],
      default: 'up',
    },
    {
      kind: 'range',
      key: 'gap',
      label: 'Line gap',
      min: 4,
      max: 40,
      step: 2,
      unit: 'px',
      default: 12,
    },
  ],
  supportedFormats: ['html', 'react', 'framer'],
};
