import { FONT_STACKS } from '../../lib/constants';
import { cssVars } from '../../lib/css';
import type { PreviewProps } from '../types';

export default function VhsSkew({ params, reducedMotion }: PreviewProps) {
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
          animation: reducedMotion
            ? undefined
            : `tf-vhs-skew ${params.duration}ms steps(2, end) ${params.delay}ms ${params.loop ? 'infinite' : '1'} both`,
          ...cssVars({
            '--tf-skew': `${params.skew}deg`,
            '--tf-jitter': `${params.jitter}px`,
          }),
        }}
      >
        {params.text}
        {params.scanlines ? (
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: '-0.2em -0.4em',
              pointerEvents: 'none',
              backgroundImage:
                'repeating-linear-gradient(to bottom, rgba(0,0,0,0.35) 0px, rgba(0,0,0,0.35) 1px, transparent 1px, transparent 3px)',
              opacity: 0.45,
            }}
          />
        ) : null}
      </span>
    </div>
  );
}
