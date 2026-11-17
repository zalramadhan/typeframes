import { EASING_CSS, FONT_STACKS } from '../../lib/constants';
import { cssVars } from '../../lib/css';
import {
  displayToken,
  isRTL,
  splitGraphemes,
  splitWordTokens,
} from '../../lib/splitText';
import type { PreviewProps } from '../types';

export default function CharacterCascade({
  params,
  reducedMotion,
}: PreviewProps) {
  const rtl = isRTL(params.text);
  const units = rtl
    ? splitWordTokens(params.text)
    : splitGraphemes(params.text || '');

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
      <div dir={rtl ? 'rtl' : 'ltr'} style={{ display: 'inline-block' }}>
        {units.map((unit, index) => (
          <span
            className="tf-char"
            key={index}
            style={{
              animation: reducedMotion
                ? undefined
                : `tf-char-stagger ${params.duration}ms ${EASING_CSS[params.easing]} ${index * params.delay}ms ${params.loop ? 'infinite' : '1'} both`,
              ...cssVars({
                '--tf-y': `${params.distance}px`,
                '--tf-blur': `${params.blur}px`,
                '--tf-rot': `${params.rotate}deg`,
              }),
            }}
          >
            {displayToken(unit)}
          </span>
        ))}
      </div>
    </div>
  );
}
