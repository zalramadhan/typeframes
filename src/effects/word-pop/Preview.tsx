import { EASING_CSS, FONT_STACKS } from '../../lib/constants';
import { cssVars } from '../../lib/css';
import { splitWordTokens } from '../../lib/splitText';
import type { PreviewProps } from '../types';

export default function WordPop({ params, reducedMotion }: PreviewProps) {
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
      <div
        style={{
          display: 'inline-block',
          whiteSpace: 'pre-wrap',
          maxWidth: '100%',
        }}
      >
        {tokens.map((token, index) => {
          if (/^\s+$/.test(token)) {
            return <span key={index}>{token}</span>;
          }
          const delay = wordIndex * params.delay;
          wordIndex += 1;
          return (
            <span
              className="tf-word"
              key={index}
              style={{
                animation: reducedMotion
                  ? undefined
                  : `tf-word-pop ${params.duration}ms ${EASING_CSS[params.easing]} ${delay}ms ${params.loop ? 'infinite' : '1'} both`,
                ...cssVars({
                  '--tf-hl': String(params.highlightColor),
                  '--tf-pop': Number(params.pop),
                }),
              }}
            >
              {token}
            </span>
          );
        })}
      </div>
    </div>
  );
}
