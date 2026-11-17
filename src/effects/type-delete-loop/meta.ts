import type { EffectMeta } from '../types';

export const meta: EffectMeta = {
  id: 'type-delete-loop',
  name: 'Type & Delete',
  category: 'typewriter',
  blurb: 'A caret types the line, holds, then deletes it and starts over.',
  tags: ['typewriter', 'caret', 'loop'],
  engine: 'js',
  sharedOverrides: { loop: true, duration: 1200, delay: 200 },
  extraParams: [
    {
      kind: 'range',
      key: 'typeSpeed',
      label: 'Type speed',
      min: 30,
      max: 200,
      step: 5,
      unit: 'ms/char',
      default: 70,
    },
    {
      kind: 'range',
      key: 'deleteSpeed',
      label: 'Delete speed',
      min: 15,
      max: 150,
      step: 5,
      unit: 'ms/char',
      default: 35,
    },
    {
      kind: 'range',
      key: 'hold',
      label: 'Hold',
      min: 300,
      max: 3000,
      step: 100,
      unit: 'ms',
      default: 1400,
    },
    {
      kind: 'select',
      key: 'cursor',
      label: 'Caret',
      options: [
        { label: 'Bar', value: 'bar' },
        { label: 'Block', value: 'block' },
      ],
      default: 'bar',
    },
  ],
  supportedFormats: ['html', 'react'],
};
