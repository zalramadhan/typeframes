import { EASING_CSS, FONT_STACKS } from '../../lib/constants';
import { isRTL } from '../../lib/splitText';
import type { PreviewProps } from '../types';

export default function CaretSweep({ params, reducedMotion }: PreviewProps) {
  const rtl = isRTL(params.text);
  const clip = rtl ? 'tf-caret-sweep-clip-rtl' : 'tf-caret-sweep-clip';
  const line = rtl ? 'tf-caret-sweep-line-rtl' : 'tf-caret-sweep-line';

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
      <span style={{ position: 'relative', display: 'inline-block' }}>
        <span
          style={{
            display: 'inline-block',
            whiteSpace: 'pre-wrap',
            animation: reducedMotion
              ? undefined
              : `${clip} ${params.duration}ms ${EASING_CSS[params.easing]} 0ms ${params.loop ? 'infinite' : '1'} both`,
          }}
        >
          {params.text}
        </span>
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-0.08em',
            bottom: '-0.08em',
            width: `${params.caretWidth}px`,
            background: params.color,
            animation: reducedMotion
              ? undefined
              : `${line} ${params.duration}ms ${EASING_CSS[params.easing]} 0ms ${params.loop ? 'infinite' : '1'} both`,
          }}
        />
      </span>
    </div>
  );
}
