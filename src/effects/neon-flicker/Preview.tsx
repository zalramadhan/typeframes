import { FONT_STACKS } from '../../lib/constants';
import { cssVars } from '../../lib/css';
import type { PreviewProps } from '../types';

export default function NeonFlicker({ params, reducedMotion }: PreviewProps) {
  const cycle =
    params.duration * (params.flicker === 'wild' ? 0.55 : 1.6);
  const glowStrength = Number(params.intensity);
  const glowColor = `color-mix(in srgb, ${params.glowColor} ${glowStrength}%, transparent)`;

  return (
    <div
      className="tf-stage"
      style={{
        color: params.color,
        fontSize: params.fontSize,
        fontWeight: params.fontWeight,
        fontFamily: FONT_STACKS[params.fontFamily],
      }}
    >
      <span
        style={{
          display: 'inline-block',
          whiteSpace: 'pre-wrap',
          padding: '0.25em',
          animation: reducedMotion
            ? undefined
            : `tf-neon-flicker ${cycle}ms steps(1, end) 0ms ${params.loop ? 'infinite' : '1'} both`,
          ...cssVars({
            '--tf-glow': `${params.glow}px`,
            '--tf-glow-color': glowColor,
          }),
        }}
      >
        {params.text}
      </span>
    </div>
  );
}
