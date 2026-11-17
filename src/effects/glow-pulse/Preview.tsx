import { EASING_CSS, FONT_STACKS } from '../../lib/constants';
import { cssVars } from '../../lib/css';
import type { PreviewProps } from '../types';

export default function GlowPulse({ params, reducedMotion }: PreviewProps) {
  const glowColor = `color-mix(in srgb, ${params.glowColor} ${Number(params.intensity)}%, transparent)`;

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
          padding: '0.2em',
          animation: reducedMotion
            ? undefined
            : `tf-glow-pulse ${params.duration}ms ${EASING_CSS[params.easing]} 0ms ${params.loop ? 'infinite' : '1'} both`,
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
