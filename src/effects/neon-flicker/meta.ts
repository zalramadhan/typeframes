import type { EffectMeta } from '../types';

export const meta: EffectMeta = {
  id: 'neon-flicker',
  name: 'Neon Flicker',
  category: 'neon3d',
  blurb: 'A glow that stutters like a tube light before holding steady.',
  tags: ['glow', 'neon', 'flicker'],
  engine: 'css',
  extraParams: [
    {
      kind: 'range',
      key: 'glow',
      label: 'Glow radius',
      min: 4,
      max: 48,
      step: 2,
      unit: 'px',
      default: 20,
    },
    { kind: 'color', key: 'glowColor', label: 'Glow color', default: '#E8E8E8' },
    {
      kind: 'range',
      key: 'intensity',
      label: 'Intensity',
      min: 20,
      max: 100,
      step: 5,
      unit: '%',
      default: 90,
    },
    {
      kind: 'select',
      key: 'flicker',
      label: 'Flicker',
      options: [
        { label: 'Subtle', value: 'subtle' },
        { label: 'Wild', value: 'wild' },
      ],
      default: 'subtle',
    },
  ],
  supportedFormats: ['html', 'react', 'framer'],
};
