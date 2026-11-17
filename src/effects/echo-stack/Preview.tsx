import { EASING_CSS, FONT_STACKS } from '../../lib/constants';
import { cssVars } from '../../lib/css';
import type { PreviewProps } from '../types';

export default function EchoStack({ params, reducedMotion }: PreviewProps) {
  const layers = Math.max(2, Math.round(Number(params.layers)));
  const spread = Number(params.spread) / 100;

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
          padding: '0.1em',
        }}
      >
        {Array.from({ length: layers }, (_, index) => (
          <span
            key={index}
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: reducedMotion
                ? undefined
                : `tf-echo ${params.duration}ms ${EASING_CSS[params.easing]} ${-((index * params.duration) / layers)}ms ${params.loop ? 'infinite' : '1'} both`,
              ...cssVars({ '--tf-spread': spread }),
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
