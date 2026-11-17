import type { EffectMeta } from '../types';

export const meta: EffectMeta = {
  id: 'char-shatter',
  name: 'Character Shatter',
  category: 'glitch',
  blurb: 'Characters fly in from scattered positions and snap into the line.',
  tags: ['scatter', 'random', 'entrance'],
  engine: 'js',
  extraParams: [
    {
      kind: 'range',
      key: 'scatter',
      label: 'Scatter',
      min: 20,
      max: 180,
      step: 10,
      unit: 'px',
      default: 90,
    },
    {
      kind: 'range',
      key: 'spin',
      label: 'Spin',
      min: 0,
      max: 180,
      step: 10,
      unit: 'deg',
      default: 40,
    },
  ],
  supportedFormats: ['html', 'react', 'framer'],
};
