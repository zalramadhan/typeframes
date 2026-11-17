import { useEffect, useRef } from 'react';
import { FONT_STACKS, GSAP_EASE } from '../../lib/constants';
import { splitGraphemes } from '../../lib/splitText';
import type { PreviewProps } from '../types';

export default function Flip3D({ params, reducedMotion }: PreviewProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) return;
    let cancelled = false;
    let context: { revert: () => void } | undefined;

    const run = async () => {
      const { gsap } = await import('gsap');
      if (cancelled || !ref.current) return;

      context = gsap.context(() => {
        const chars = ref.current?.querySelectorAll('.tf-flip-char');
        if (!chars?.length) return;
        gsap.fromTo(
          chars,
          {
            opacity: 0,
            rotateX: params.axis === 'x' ? -90 : 0,
            rotateY: params.axis === 'y' ? -90 : 0,
            transformOrigin: '50% 50%',
          },
          {
            opacity: 1,
            rotateX: 0,
            rotateY: 0,
            duration: params.duration / 1000,
            ease: GSAP_EASE[params.easing],
            stagger: params.delay / 1000,
            repeat: params.loop ? -1 : 0,
            repeatDelay: 0.6,
          },
        );
      }, ref);
    };

    void run();

    return () => {
      cancelled = true;
      context?.revert();
    };
  }, [
    params.text,
    params.axis,
    params.perspective,
    params.duration,
    params.delay,
    params.easing,
    params.loop,
    reducedMotion,
  ]);

  return (
    <div
      className="tf-stage"
      style={{
        color: params.color,
        fontSize: params.fontSize,
        fontWeight: params.fontWeight,
        fontFamily: FONT_STACKS[params.fontFamily],
        perspective: `${params.perspective}px`,
      }}
    >
      <div ref={ref} style={{ display: 'inline-block', transformStyle: 'preserve-3d' }}>
        {splitGraphemes(params.text || '').map((char, index) => (
          <span
            className="tf-flip-char"
            key={index}
            style={{ display: 'inline-block', whiteSpace: 'pre' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
    </div>
  );
}
