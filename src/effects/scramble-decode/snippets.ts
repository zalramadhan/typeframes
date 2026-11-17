import { escapeHtml, escapeJs, jsString } from '../../lib/escape';
import { typeCss } from '../../lib/snippet';
import type { Params, SnippetMap } from '../types';

const CHARSETS: Record<string, string> = {
  ascii: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!<>-_\\\\/[]{}=+*^?#',
  binary: '01',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>/?~',
};

export function build(p: Params): SnippetMap {
  const text = p.text || '';
  const charset = CHARSETS[String(p.charset)] ?? CHARSETS.ascii;
  const total = Number(p.iterations);
  const frameSpeed = Number(p.scrambleSpeed);
  const loop = p.loop;

  const html = `<!-- typeframes — Scramble Decode -->
<div class="tf-scramble">${escapeHtml(text)}</div>

<style>
.tf-scramble {
  ${typeCss(p)}
  white-space: pre-wrap;
}
</style>

<script>
  const el = document.querySelector(".tf-scramble");
  const text = ${jsString(text)};
  const chars = Array.from(text);
  const charset = ${jsString(charset)};
  const total = ${total};
  const frameSpeed = ${frameSpeed};
  const loop = ${loop};
  let frame = 0;
  let timer;

  function randomChar() {
    return charset[Math.floor(Math.random() * charset.length)];
  }

  function tick() {
    frame += 1;
    const revealed = Math.floor((frame / total) * chars.length);
    el.textContent = chars
      .map((char, i) => (/\\s/.test(char) || i < revealed ? char : randomChar()))
      .join("");

    if (frame < total) {
      timer = setTimeout(tick, frameSpeed);
    } else {
      el.textContent = text;
      if (loop) timer = setTimeout(run, 1200);
    }
  }

  function run() {
    frame = 0;
    timer = setTimeout(tick, ${p.delay});
  }

  run();
</script>`;

  const react = `// typeframes — Scramble Decode
import { useEffect, useState } from "react";

const TEXT = "${escapeJs(text)}";
const CHARSET = ${JSON.stringify(charset)};

export default function ScrambleDecode({
  text = TEXT,
  iterations = ${total},
  frameSpeed = ${frameSpeed},
  loop = ${loop},
}: {
  text?: string;
  iterations?: number;
  frameSpeed?: number;
  loop?: boolean;
}) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    const chars = Array.from(text);
    let frame = 0;
    let timer = 0;
    let cancelled = false;

    const randomChar = () =>
      CHARSET[Math.floor(Math.random() * CHARSET.length)];

    const tick = () => {
      if (cancelled) return;
      frame += 1;
      const revealed = Math.floor((frame / iterations) * chars.length);
      setDisplay(
        chars
          .map((char, i) =>
            /\\s/.test(char) || i < revealed ? char : randomChar()
          )
          .join("")
      );

      if (frame < iterations) {
        timer = window.setTimeout(tick, frameSpeed);
      } else if (loop) {
        frame = 0;
        timer = window.setTimeout(tick, 1200);
      }
    };

    timer = window.setTimeout(tick, ${p.delay});
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [text, iterations, frameSpeed, loop]);

  return (
    <div style={{ ${typeCss(p)} whiteSpace: "pre-wrap" }}>
      {display}
    </div>
  );
}`;

  return { html, react };
}
