import { EASING_CSS, FONT_STACKS } from '../../lib/constants';
import { cssVars } from '../../lib/css';
import { splitLines } from '../../lib/splitText';
import type { PreviewProps } from '../types';

export default function LineMaskRise({ params, reducedMotion }: PreviewProps) {
  const lines = splitLines(params.text || '');

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
      <div style={{ display: 'inline-block' }}>
        {lines.map((line, index) => (
          <span className="tf-line-mask" key={index}>
            <span
              style={{
                display: 'inline-block',
                animation: reducedMotion
                  ? undefined
                  : `tf-line-mask-rise ${params.duration}ms ${EASING_CSS[params.easing]} ${index * params.delay}ms ${params.loop ? 'infinite' : '1'} both`,
                ...cssVars({ '--tf-rise': `${params.distance}%` }),
              }}
            >
              {line || '\u00A0'}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
