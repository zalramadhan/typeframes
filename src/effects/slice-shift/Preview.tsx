import { EASING_CSS, FONT_STACKS } from '../../lib/constants';
import { cssVars } from '../../lib/css';
import type { PreviewProps } from '../types';

export default function SliceShift({ params, reducedMotion }: PreviewProps) {
  const slices = Math.max(2, Math.round(Number(params.slices)));
  const bands = Array.from({ length: slices }, (_, index) => ({
    top: (index / slices) * 100,
    bottom: 100 - ((index + 1) / slices) * 100,
  }));

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
          position: 'relative',
          display: 'inline-block',
          whiteSpace: 'pre-wrap',
        }}
      >
        {bands.map((band, index) => (
          <span
            key={index}
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              whiteSpace: 'pre-wrap',
              clipPath: `inset(${band.top}% 0 ${band.bottom}% 0)`,
              animation: reducedMotion
                ? undefined
                : `tf-slice-shift-${index % 2 === 0 ? 'a' : 'b'} ${params.duration}ms ${EASING_CSS[params.easing]} ${index * params.delay}ms ${params.loop ? 'infinite' : '1'} both`,
              ...cssVars({ '--tf-offset': `${params.offset}px` }),
            }}
          >
            {params.text}
          </span>
        ))}
        <span style={{ position: 'relative' }}>{params.text}</span>
      </span>
    </div>
  );
}
