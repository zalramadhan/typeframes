import { EASING_CSS, FONT_STACKS } from '../../lib/constants';
import { cssVars } from '../../lib/css';
import { splitGraphemes } from '../../lib/splitText';
import type { PreviewProps } from '../types';

function pseudo(index: number, salt: number): number {
  const value = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453;
  return value - Math.floor(value);
}

export default function CharacterShatter({
  params,
  reducedMotion,
}: PreviewProps) {
  const chars = splitGraphemes(params.text || '');
  const scatter = Number(params.scatter);
  const spin = Number(params.spin);

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
          const dx = (pseudo(index, 1) * 2 - 1) * scatter;
          const dy = (pseudo(index, 2) * 2 - 1) * scatter;
          const dr = (pseudo(index, 3) * 2 - 1) * spin;
          return (
            <span
              className="tf-char"
              key={index}
              style={{
                animation: reducedMotion
                  ? undefined
                  : `tf-char-shatter ${params.duration}ms ${EASING_CSS[params.easing]} ${index * params.delay}ms ${params.loop ? 'infinite' : '1'} both`,
                ...cssVars({
                  '--tf-dx': `${dx.toFixed(1)}px`,
                  '--tf-dy': `${dy.toFixed(1)}px`,
                  '--tf-dr': `${dr.toFixed(1)}deg`,
                }),
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
