import type {
  EasingName,
  FontName,
  ParamControl,
  Params,
  SharedParams,
} from '../effects/types';

export const SAMPLE_TEXT = 'Make it move';
export const MAX_TEXT_LENGTH = 120;

export const EASING_OPTIONS: { label: string; value: EasingName }[] = [
  { label: 'Linear', value: 'linear' },
  { label: 'Ease out', value: 'ease-out' },
  { label: 'Ease in-out', value: 'ease-in-out' },
  { label: 'Spring', value: 'spring' },
  { label: 'Steps', value: 'steps' },
];

export const EASING_CSS: Record<EasingName, string> = {
  linear: 'linear',
  'ease-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
  'ease-in-out': 'cubic-bezier(0.65, 0, 0.35, 1)',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  steps: 'steps(10, end)',
};

export const FRAMER_EASE: Record<EasingName, number[] | 'linear'> = {
  linear: 'linear',
  'ease-out': [0.16, 1, 0.3, 1],
  'ease-in-out': [0.65, 0, 0.35, 1],
  spring: [0.34, 1.56, 0.64, 1],
  steps: [0, 0, 1, 1],
};

export const GSAP_EASE: Record<EasingName, string> = {
  linear: 'none',
  'ease-out': 'power3.out',
  'ease-in-out': 'power2.inOut',
  spring: 'back.out(1.8)',
  steps: 'steps(10)',
};

export const FONT_OPTIONS: { label: string; value: FontName }[] = [
  { label: 'Inter', value: 'Inter' },
  { label: 'Space Grotesk', value: 'Space Grotesk' },
  { label: 'Sora', value: 'Sora' },
];

export const FONT_STACKS: Record<FontName, string> = {
  Inter: "'Inter', ui-sans-serif, system-ui, sans-serif",
  'Space Grotesk': "'Space Grotesk', ui-sans-serif, system-ui, sans-serif",
  Sora: "'Sora', ui-sans-serif, system-ui, sans-serif",
};

export const DEFAULT_SHARED: SharedParams = {
  text: SAMPLE_TEXT,
  duration: 1200,
  delay: 70,
  easing: 'ease-out',
  fontSize: 72,
  fontWeight: 600,
  fontFamily: 'Inter',
  color: '#F5F5F5',
  loop: false,
};

export const NO_SHARED: SharedParams = { ...DEFAULT_SHARED, text: '' };

export const TIMING_CONTROLS: ParamControl[] = [
  {
    kind: 'range',
    key: 'duration',
    label: 'Duration',
    min: 200,
    max: 4000,
    step: 50,
    unit: 'ms',
    default: DEFAULT_SHARED.duration,
  },
  {
    kind: 'range',
    key: 'delay',
    label: 'Delay / stagger',
    min: 0,
    max: 300,
    step: 5,
    unit: 'ms',
    default: DEFAULT_SHARED.delay,
  },
];

export const TYPE_CONTROLS: ParamControl[] = [
  {
    kind: 'range',
    key: 'fontSize',
    label: 'Font size',
    min: 32,
    max: 160,
    step: 4,
    unit: 'px',
    default: DEFAULT_SHARED.fontSize,
  },
  {
    kind: 'select',
    key: 'fontWeight',
    label: 'Weight',
    options: [400, 500, 600, 700, 800].map((w) => ({
      label: String(w),
      value: String(w),
    })),
    default: String(DEFAULT_SHARED.fontWeight),
  },
];

export function extraDefaults(
  controls: ParamControl[],
): Record<string, string | number | boolean> {
  return Object.fromEntries(controls.map((c) => [c.key, c.default]));
}

export function defaultParamsFor(
  controls: ParamControl[],
  overrides: Partial<SharedParams> = {},
): Params {
  return {
    ...DEFAULT_SHARED,
    ...overrides,
    ...extraDefaults(controls),
  };
}
