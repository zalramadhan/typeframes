import { FONT_STACKS } from '../../lib/constants';
import type { PreviewProps } from '../types';

export default function InfiniteMarquee({
  params,
  reducedMotion,
}: PreviewProps) {
  const gap = Number(params.gap);
  const speed = Math.max(10, Number(params.speed));
  const text = params.text || ' ';
  const estimate = Math.max(text.length, 8) * params.fontSize * 0.55;
  const groupWidth = estimate * 3 + gap * 3;
  const duration = Math.max(1500, (groupWidth / speed) * 1000);
  const reversed = params.direction === 'right';

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
        className={`tf-marquee ${params.pauseOnHover ? 'pause-on-hover' : ''}`}
      >
        <div
          className={`tf-marquee-track ${reversed ? 'tf-right' : ''}`}
          style={{
            animationDuration: `${duration}ms`,
            animationPlayState: reducedMotion ? 'paused' : undefined,
          }}
        >
          {[0, 1].map((group) => (
            <div
              className="tf-marquee-group"
              key={group}
              aria-hidden={group === 1}
              style={{ paddingRight: gap }}
            >
              {[0, 1, 2].map((repeat) => (
                <span key={repeat} style={{ paddingRight: gap }}>
                  {text}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
