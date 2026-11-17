import { EASING_CSS, FONT_STACKS } from '../../lib/constants';
import { cssVars } from '../../lib/css';
import { splitGraphemes } from '../../lib/splitText';
import type { PreviewProps } from '../types';

export default function LetterWave({ params, reducedMotion }: PreviewProps) {
  const chars = splitGraphemes(params.text || '');

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
        {chars.map((char, index) => {
          const delay = params.loop
            ? -((index * params.delay) % Math.max(params.duration, 1))
            : index * params.delay;
          return (
            <span
              className="tf-char"
              key={index}
              style={{
                animation: reducedMotion
                  ? undefined
                  : `tf-letter-wave ${params.duration}ms ${EASING_CSS[params.easing]} ${delay}ms ${params.loop ? 'infinite' : '1'} both`,
                ...cssVars({ '--tf-amp': `${params.amplitude}px` }),
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          );
        })}
      </div>
    </div>
  );
}
