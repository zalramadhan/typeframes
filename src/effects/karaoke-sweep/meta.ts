import type { EffectMeta } from '../types';

export const meta: EffectMeta = {
  id: 'karaoke-sweep',
  name: 'Karaoke Sweep',
  category: 'karaoke',
  blurb: 'Words light up one at a time, following a steady reading pace.',
  tags: ['karaoke', 'lyrics', 'gsap'],
  engine: 'gsap',
  extraParams: [
    {
      kind: 'select',
      key: 'highlightStyle',
      label: 'Highlight',
      options: [
        { label: 'Fill', value: 'fill' },
        { label: 'Underline', value: 'underline' },
        { label: 'Fill + underline', value: 'both' },
      ],
      default: 'fill',
    },
    {
      kind: 'color',
      key: 'highlightColor',
      label: 'Highlight color',
      default: '#E8E8E8',
    },
    {
      kind: 'range',
      key: 'wordsPerSecond',
      label: 'Words / second',
      min: 0.5,
      max: 6,
      step: 0.5,
      unit: 'wps',
      default: 2,
    },
  ],
  supportedFormats: ['html', 'react'],
};
