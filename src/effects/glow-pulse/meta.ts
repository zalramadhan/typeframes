import type { EffectMeta } from '../types';

export const meta: EffectMeta = {
  id: 'glow-pulse',
  name: 'Glow Pulse',
  category: 'neon3d',
  blurb: 'A soft halo breathes in and out behind the line.',
  tags: ['glow', 'pulse', 'loop'],
  engine: 'css',
  sharedOverrides: { loop: true, duration: 2600, easing: 'ease-in-out' },
  extraParams: [
    {
      kind: 'range',
      key: 'glow',
      label: 'Glow radius',
      min: 8,
      max: 48,
      step: 2,
      unit: 'px',
      default: 24,
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
      default: 80,
    },
  ],
  supportedFormats: ['html', 'react', 'framer'],
};
