import { EASING_CSS, FONT_STACKS } from '../../lib/constants';
import { cssVars } from '../../lib/css';
import { splitWordTokens } from '../../lib/splitText';
import type { PreviewProps } from '../types';

export default function WordMaskRise({ params, reducedMotion }: PreviewProps) {
  const tokens = splitWordTokens(params.text || '');
  let wordIndex = 0;

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
      <div style={{ display: 'inline-block', maxWidth: '100%' }}>
        {tokens.map((token, index) => {
          if (/^\s+$/.test(token)) {
            return <span key={index}> </span>;
          }
          const delay = wordIndex * params.delay;
          wordIndex += 1;
          return (
            <span
              className="tf-line-mask"
              key={index}
              style={{ display: 'inline-block', verticalAlign: 'top' }}
            >
              <span
                style={{
                  display: 'inline-block',
                  animation: reducedMotion
                    ? undefined
                    : `tf-word-mask-rise ${params.duration}ms ${EASING_CSS[params.easing]} ${delay}ms ${params.loop ? 'infinite' : '1'} both`,
                  ...cssVars({ '--tf-rise': `${params.distance}%` }),
                }}
              >
                {token}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
