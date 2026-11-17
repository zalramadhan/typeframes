import { EASING_CSS, FONT_STACKS } from '../../lib/constants';
import { cssVars } from '../../lib/css';
import type { PreviewProps } from '../types';

export default function ChromaticSplit({ params, reducedMotion }: PreviewProps) {
  const cycle = Math.max(250, params.duration / Number(params.frequency));

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
          animation: reducedMotion
            ? undefined
            : `tf-rgb-split ${cycle}ms ${EASING_CSS[params.easing]} 0ms ${params.loop ? 'infinite' : '1'} both`,
          ...cssVars({
            '--tf-offset': `${params.offset}px`,
            '--tf-jitter': `${params.jitter}px`,
          }),
        }}
      >
        {params.text}
      </span>
    </div>
  );
}
