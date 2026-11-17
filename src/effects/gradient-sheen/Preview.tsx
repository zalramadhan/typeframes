import { EASING_CSS, FONT_STACKS } from '../../lib/constants';
import type { PreviewProps } from '../types';

export default function GradientSheen({ params, reducedMotion }: PreviewProps) {
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
          backgroundImage: `linear-gradient(100deg, ${params.color} 20%, ${params.sheenColor} 50%, ${params.color} 80%)`,
          backgroundSize: `${params.size}% 100%`,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          WebkitTextFillColor: 'transparent',
          animation: reducedMotion
            ? undefined
            : `tf-sheen ${params.duration}ms ${EASING_CSS[params.easing]} 0ms ${params.loop ? 'infinite' : '1'} both`,
        }}
      >
        {params.text}
      </span>
    </div>
  );
}
