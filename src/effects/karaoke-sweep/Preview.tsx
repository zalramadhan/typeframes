import { useEffect, useRef, type CSSProperties } from 'react';
import { FONT_STACKS } from '../../lib/constants';
import { splitLines } from '../../lib/splitText';
import type { PreviewProps } from '../types';

function highlightStyles(params: PreviewProps['params'], on: boolean) {
  if (!on) return undefined;
  const style = String(params.highlightStyle);
  return {
    backgroundColor:
      style === 'underline' ? 'transparent' : String(params.highlightColor),
    color: style === 'underline' ? String(params.highlightColor) : '#0a0a0a',
    boxShadow:
      style !== 'fill' ? `inset 0 -0.12em 0 ${String(params.highlightColor)}` : 'none',
  };
}

export default function KaraokeSweep({ params, reducedMotion }: PreviewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const lines = splitLines(params.text || '');

  useEffect(() => {
    if (reducedMotion || !ref.current) return;

    let cancelled = false;
    let context: { revert: () => void } | undefined;

    const run = async () => {
      const { gsap } = await import('gsap');
      if (cancelled || !ref.current) return;

      context = gsap.context(() => {
        const words = ref.current?.querySelectorAll('.tf-word');
        if (!words?.length) return;

        const step = 1 / Math.max(0.5, Number(params.wordsPerSecond));
        const timeline = gsap.timeline({
          delay: params.delay / 1000,
          repeat: params.loop ? -1 : 0,
          repeatDelay: 1,
        });

        words.forEach((word, index) => {
          timeline.to(
            word,
            {
              backgroundColor:
                params.highlightStyle === 'underline'
                  ? 'transparent'
                  : String(params.highlightColor),
              color:
                params.highlightStyle === 'underline'
                  ? String(params.highlightColor)
                  : '#0a0a0a',
              boxShadow:
                params.highlightStyle !== 'fill'
                  ? `inset 0 -0.12em 0 ${String(params.highlightColor)}`
                  : 'none',
              duration: Math.min(0.3, step * 0.9),
              ease: 'power2.out',
            },
            index * step,
          );
        });
      }, ref);
    };

    void run();

    return () => {
      cancelled = true;
      context?.revert();
    };
  }, [
    params.text,
    params.highlightStyle,
    params.highlightColor,
    params.wordsPerSecond,
    params.delay,
    params.loop,
    reducedMotion,
  ]);

  return (
    <div
      className="tf-stage"
      ref={ref}
      style={{
        color: params.color,
        fontSize: params.fontSize,
        fontWeight: params.fontWeight,
        fontFamily: FONT_STACKS[params.fontFamily],
      }}
    >
      <div style={{ display: 'inline-block' }}>
        {lines.map((line, lineIndex) => (
          <div key={lineIndex} style={{ marginBottom: '0.2em' }}>
            {line
              .split(/\s+/)
              .filter(Boolean)
              .map((word, index) => (
                <span
                  className="tf-word"
                  key={index}
                  style={highlightStyles(params, reducedMotion) as CSSProperties}
                >
                  {word}
                </span>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
