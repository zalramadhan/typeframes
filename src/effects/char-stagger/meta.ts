import type { EffectMeta } from '../types';

export const meta: EffectMeta = {
  id: 'char-stagger',
  name: 'Character Cascade',
  category: 'kinetic',
  blurb:
    'Every character lifts into place with a soft blur, cascading across the line.',
  tags: ['split', 'stagger', 'blur'],
  engine: 'css',
  extraParams: [
    {
      kind: 'range',
      key: 'distance',
      label: 'Rise distance',
      min: 0,
      max: 80,
      step: 2,
      unit: 'px',
      default: 26,
    },
    {
      kind: 'range',
      key: 'blur',
      label: 'Blur',
      min: 0,
      max: 16,
      step: 1,
      unit: 'px',
      default: 6,
    },
    {
      kind: 'range',
      key: 'rotate',
      label: 'Rotation',
      min: -30,
      max: 30,
      step: 1,
      unit: 'deg',
      default: 0,
    },
  ],
  supportedFormats: ['html', 'react', 'framer'],
};
