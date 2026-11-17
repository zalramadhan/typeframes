import { useEffect, useState } from 'react';
import { FONT_STACKS } from '../../lib/constants';
import { splitGraphemes } from '../../lib/splitText';
import type { PreviewProps } from '../types';

export default function TypeDeleteLoop({ params, reducedMotion }: PreviewProps) {
  const [display, setDisplay] = useState(reducedMotion ? params.text : '');

  useEffect(() => {
    if (reducedMotion) {
      setDisplay(params.text);
      return;
    }

    const chars = splitGraphemes(params.text);
    const typeSpeed = Number(params.typeSpeed);
    const deleteSpeed = Number(params.deleteSpeed);
    const hold = Number(params.hold);

    let index = 0;
    let timeout = 0;
    let cancelled = false;
    let deleting = false;

    setDisplay('');

    const tick = () => {
      if (cancelled) return;

      if (!deleting) {
        index += 1;
        setDisplay(chars.slice(0, index).join(''));
        if (index >= chars.length) {
          if (!params.loop) return;
          deleting = true;
          timeout = window.setTimeout(tick, hold);
        } else {
          timeout = window.setTimeout(tick, typeSpeed);
        }
      } else {
        index -= 1;
        setDisplay(chars.slice(0, Math.max(index, 0)).join(''));
        if (index <= 0) {
          deleting = false;
          timeout = window.setTimeout(tick, hold);
        } else {
          timeout = window.setTimeout(tick, deleteSpeed);
        }
      }
    };

    timeout = window.setTimeout(tick, params.delay);
    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [
    params.text,
    params.typeSpeed,
    params.deleteSpeed,
    params.hold,
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
      <div>
        <span>{display}</span>
        <span
          className={
            params.cursor === 'block' ? 'tf-caret tf-caret-block' : 'tf-caret'
          }
          style={reducedMotion ? { animation: 'none' } : undefined}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
