export type Category =
  | 'kinetic'
  | 'typewriter'
  | 'glitch'
  | 'neon3d'
  | 'karaoke'
  | 'marquee';

export type Engine = 'css' | 'js' | 'gsap';

export type Format = 'html' | 'react' | 'framer';

export type EasingName =
  | 'linear'
  | 'ease-out'
  | 'ease-in-out'
  | 'spring'
  | 'steps';

export type FontName = 'Inter' | 'Space Grotesk' | 'Sora';

export type SharedParams = {
  text: string;
  duration: number;
  delay: number;
  easing: EasingName;
  fontSize: number;
  fontWeight: number;
  fontFamily: FontName;
  color: string;
  loop: boolean;
};

export type ExtraValue = string | number | boolean;

export type Params = SharedParams & Record<string, ExtraValue>;

export type ParamControl =
  | {
      kind: 'range';
      key: string;
      label: string;
      min: number;
      max: number;
      step: number;
      unit?: string;
      default: number;
    }
  | {
      kind: 'select';
      key: string;
      label: string;
      options: { label: string; value: string }[];
      default: string;
    }
  | { kind: 'toggle'; key: string; label: string; default: boolean }
  | { kind: 'color'; key: string; label: string; default: string };

export type EffectMeta = {
  id: string;
  name: string;
  category: Category;
  blurb: string;
  tags: string[];
  engine: Engine;
  sharedOverrides?: Partial<SharedParams>;
  extraParams: ParamControl[];
  supportedFormats: Format[];
};

export type PreviewProps = {
  params: Params;
  reducedMotion: boolean;
};

export type SnippetMap = Partial<Record<Format, string>>;
