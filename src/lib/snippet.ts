import { FONT_STACKS, FRAMER_EASE, EASING_CSS, GSAP_EASE } from './constants';
import type { Params } from '../effects/types';

export function typeCss(p: Params): string {
  return `font-family: ${FONT_STACKS[p.fontFamily]}; font-size: ${p.fontSize}px; font-weight: ${p.fontWeight}; color: ${p.color}; line-height: 1.1;`;
}

export function cssEase(p: Params): string {
  return EASING_CSS[p.easing];
}

export function gsapEase(p: Params): string {
  return GSAP_EASE[p.easing];
}

export function framerEase(p: Params): string {
  const ease = FRAMER_EASE[p.easing];
  return typeof ease === 'string' ? 'linear' : JSON.stringify(ease);
}

export function iterations(p: Params): string {
  return p.loop ? 'infinite' : '1';
}

export function sec(ms: number): number {
  return Math.round((ms / 1000) * 100) / 100;
}
