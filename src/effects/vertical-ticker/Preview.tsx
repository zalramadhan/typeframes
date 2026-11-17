import { FONT_STACKS } from '../../lib/constants';
import type { PreviewProps } from '../types';

export default function VerticalTicker({ params, reducedMotion }: PreviewProps) {
  const reps = 4;
  const gap = Number(params.gap);
  const speed = Math.max(10, Number(params.speed));
  const lineHeight = params.fontSize * 1.35;
  const groupHeight = reps * (lineHeight + gap);
  const duration = Math.max(2000, (groupHeight / speed) * 1000);
  const down = params.direction === 'down';

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
        className="tf-vticker"
        style={{ height: `${params.fontSize * 3}px` }}
      >
        <div
          className="tf-vticker-track"
          style={{
            animationName: down ? 'tf-vticker-down' : 'tf-vticker-up',
            animationDuration: `${duration}ms`,
            animationPlayState: reducedMotion ? 'paused' : undefined,
          }}
        >
          {[0, 1].map((group) => (
            <div className="tf-vticker-group" key={group} aria-hidden={group === 1}>
              {Array.from({ length: reps }, (_, index) => (
                <span
                  key={index}
                  style={{
                    paddingBottom: `${gap}px`,
                    lineHeight: 1.35,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {params.text}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
