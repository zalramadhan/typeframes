import { useEffect, useState } from 'react';
import { FONT_STACKS } from '../../lib/constants';
import type { PreviewProps } from '../types';

export default function TerminalBoot({ params, reducedMotion }: PreviewProps) {
  const [typed, setTyped] = useState(reducedMotion ? params.text : '');

  useEffect(() => {
    if (reducedMotion) {
      setTyped(params.text);
      return;
    }

    const full = params.text;
    const typeSpeed = Number(params.typeSpeed);
    const linePause = Number(params.linePause);

    let index = 0;
    let timeout = 0;
    let cancelled = false;
    setTyped('');

    const step = () => {
      if (cancelled) return;
      index += 1;
      setTyped(full.slice(0, index));
      const char = full[index - 1];

      if (index < full.length) {
        timeout = window.setTimeout(
          step,
          char === '\n' ? linePause : typeSpeed,
        );
      } else if (params.loop) {
        timeout = window.setTimeout(() => {
          if (cancelled) return;
          index = 0;
          setTyped('');
          step();
        }, Math.max(linePause, 900));
      }
    };

    timeout = window.setTimeout(step, params.delay);
    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [
    params.text,
    params.typeSpeed,
    params.linePause,
    params.loop,
    params.delay,
    reducedMotion,
  ]);

  const prompt = params.prompt ? '› ' : '';
  const lines = typed.split('\n');

  return (
    <div
      className="tf-stage"
      style={{
        color: params.color,
        fontSize: params.fontSize,
        fontWeight: params.fontWeight,
        fontFamily: FONT_STACKS[params.fontFamily],
        textAlign: 'left',
      }}
    >
      <div
        style={{
          display: 'inline-block',
          maxWidth: '100%',
          whiteSpace: 'pre-wrap',
          lineHeight: 1.5,
        }}
      >
        {lines.map((line, index) => (
          <div key={index}>
            <span style={{ opacity: 0.55 }}>{prompt}</span>
            {line}
            {index === lines.length - 1 ? (
              <span
                className={
                  params.cursor === 'bar'
                    ? 'tf-caret'
                    : 'tf-caret tf-caret-block'
                }
                aria-hidden="true"
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
