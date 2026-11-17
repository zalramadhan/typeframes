import type { EffectMeta } from '../types';

export const meta: EffectMeta = {
  id: 'scramble-decode',
  name: 'Scramble Decode',
  category: 'glitch',
  blurb: 'Random characters resolve into the real line, left to right.',
  tags: ['scramble', 'decode', 'terminal'],
  engine: 'js',
  extraParams: [
    {
      kind: 'range',
      key: 'scrambleSpeed',
      label: 'Frame speed',
      min: 20,
      max: 150,
      step: 5,
      unit: 'ms',
      default: 45,
    },
    {
      kind: 'range',
      key: 'iterations',
      label: 'Iterations',
      min: 4,
      max: 30,
      step: 1,
      default: 14,
    },
    {
      kind: 'select',
      key: 'charset',
      label: 'Character set',
      options: [
        { label: 'ASCII', value: 'ascii' },
        { label: 'Binary', value: 'binary' },
        { label: 'Symbols', value: 'symbols' },
      ],
      default: 'ascii',
    },
  ],
  supportedFormats: ['html', 'react'],
};
