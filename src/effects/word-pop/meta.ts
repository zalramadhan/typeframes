import type { EffectMeta } from '../types';

export const meta: EffectMeta = {
  id: 'word-pop',
  name: 'Word Pop',
  category: 'karaoke',
  blurb: 'Words pop and flash one after another, like a lyric video.',
  tags: ['karaoke', 'pop', 'highlight'],
  engine: 'css',
  sharedOverrides: { loop: true, duration: 1800, delay: 260, easing: 'ease-out' },
  extraParams: [
    { kind: 'color', key: 'highlightColor', label: 'Highlight', default: '#E8E8E8' },
    {
      kind: 'range',
      key: 'pop',
      label: 'Pop scale',
      min: 1,
      max: 1.6,
      step: 0.05,
      default: 1.25,
    },
  ],
  supportedFormats: ['html', 'react', 'framer'],
};
