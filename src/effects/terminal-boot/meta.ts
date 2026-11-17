import type { EffectMeta } from '../types';

export const meta: EffectMeta = {
  id: 'terminal-boot',
  name: 'Terminal Boot',
  category: 'typewriter',
  blurb: 'Lines type themselves in sequence, prompt and all, then restart.',
  tags: ['terminal', 'multiline', 'prompt'],
  engine: 'js',
  sharedOverrides: {
    loop: true,
    delay: 300,
    fontSize: 40,
    text: 'booting typeframes\neffects loaded\nready',
  },
  extraParams: [
    {
      kind: 'range',
      key: 'typeSpeed',
      label: 'Type speed',
      min: 25,
      max: 120,
      step: 5,
      unit: 'ms/char',
      default: 45,
    },
    {
      kind: 'range',
      key: 'linePause',
      label: 'Line pause',
      min: 200,
      max: 1500,
      step: 100,
      unit: 'ms',
      default: 600,
    },
    { kind: 'toggle', key: 'prompt', label: 'Prompt prefix', default: true },
    {
      kind: 'select',
      key: 'cursor',
      label: 'Caret',
      options: [
        { label: 'Block', value: 'block' },
        { label: 'Bar', value: 'bar' },
      ],
      default: 'block',
    },
  ],
  supportedFormats: ['html', 'react'],
};
