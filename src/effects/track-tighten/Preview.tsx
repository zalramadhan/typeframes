import { EASING_CSS, FONT_STACKS } from '../../lib/constants';
import { cssVars } from '../../lib/css';
import type { PreviewProps } from '../types';

export default function TrackTighten({ params, reducedMotion }: PreviewProps) {
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
          textAlign: 'center',
          animation: reducedMotion
            ? undefined
            : `tf-track-tighten ${params.duration}ms ${EASING_CSS[params.easing]} 0ms ${params.loop ? 'infinite' : '1'} both`,
          ...cssVars({
            '--tf-spread': `${params.spread}px`,
            '--tf-blur': `${params.blur}px`,
          }),
        }}
      >
        {params.text}
      </span>
    </div>
  );
}
