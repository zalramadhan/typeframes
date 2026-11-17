import { useEffect, useState } from 'react';
import { FONT_STACKS } from '../../lib/constants';
import { splitGraphemes } from '../../lib/splitText';
import type { PreviewProps } from '../types';

const CHARSETS: Record<string, string> = {
  ascii: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!<>-_\\/[]{}=+*^?#',
  binary: '01',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>/?~',
};

export default function ScrambleDecode({ params, reducedMotion }: PreviewProps) {
  const [display, setDisplay] = useState(params.text);

  useEffect(() => {
    if (reducedMotion) {
      setDisplay(params.text);
      return;
    }

    const chars = splitGraphemes(params.text);
    const charset = CHARSETS[String(params.charset)] ?? CHARSETS.ascii;
    const total = Math.max(1, Number(params.iterations));
    const frameSpeed = Number(params.scrambleSpeed);

    let frame = 0;
    let timeout = 0;
    let cancelled = false;

    const randomChar = () =>
      charset[Math.floor(Math.random() * charset.length)] ?? '?';

    const run = () => {
      frame = 0;
      const tick = () => {
        if (cancelled) return;
        frame += 1;
        const revealed = Math.floor((frame / total) * chars.length);
        setDisplay(
          chars
            .map((char, index) =>
              /^\s$/.test(char) || index < revealed ? char : randomChar(),
            )
            .join(''),
        );

        if (frame < total) {
          timeout = window.setTimeout(tick, frameSpeed);
        } else {
          setDisplay(params.text);
          if (params.loop) timeout = window.setTimeout(run, 1200);
        }
      };
      timeout = window.setTimeout(tick, params.delay);
    };

    run();
    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [
    params.text,
    params.charset,
    params.iterations,
    params.scrambleSpeed,
    params.loop,
    params.delay,
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
      }}
    >
      <div style={{ whiteSpace: 'pre-wrap' }} aria-label={params.text}>
        {display}
      </div>
    </div>
  );
}
