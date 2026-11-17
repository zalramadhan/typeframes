import { escapeHtml, escapeJs } from '../../lib/escape';
import { sec, typeCss } from '../../lib/snippet';
import { splitLines } from '../../lib/splitText';
import type { Params, SnippetMap } from '../types';

export function build(p: Params): SnippetMap {
  const lines = splitLines(p.text || '');
  const style = String(p.highlightStyle);
  const color = String(p.highlightColor);
  const step = 1 / Math.max(0.5, Number(p.wordsPerSecond));

  const markup = lines
    .map((line) => {
      const words = line
        .split(/\s+/)
        .filter(Boolean)
        .map((word) => `<span class="tf-word">${escapeHtml(word)}</span>`)
        .join(' ');
      return `    <p class="tf-kline">${words}</p>`;
    })
    .join('\n');

  const html = `<!-- typeframes — Karaoke Sweep -->
<div class="tf-karaoke" id="tf-karaoke">
${markup}
</div>

<style>
.tf-karaoke {
  ${typeCss(p)}
}
.tf-kline {
  margin: 0 0 0.2em;
}
.tf-word {
  display: inline-block;
  padding: 0 0.06em;
  border-radius: 2px;
}
</style>

<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"><\/script>
<script>
  const words = document.querySelectorAll("#tf-karaoke .tf-word");
  const timeline = gsap.timeline({
    delay: ${sec(p.delay)},
    repeat: ${p.loop ? -1 : 0},
    repeatDelay: 1,
  });

  words.forEach((word, i) => {
    timeline.to(
      word,
      {
        backgroundColor: ${style === 'underline' ? '"transparent"' : JSON.stringify(color)},
        color: ${style === 'underline' ? JSON.stringify(color) : '"#0a0a0a"'},
        boxShadow: ${style !== 'fill' ? JSON.stringify(`inset 0 -0.12em 0 ${color}`) : '"none"'},
        duration: ${sec(Math.min(0.3, step * 0.9))},
        ease: "power2.out",
      },
      i * ${sec(step)}
    );
  });
<\/script>`;

  const words = lines
    .flatMap((line) => line.split(/\s+/).filter(Boolean))
    .map((word) => `"${escapeJs(word)}"`)
    .join(', ');

  const react = `// typeframes — Karaoke Sweep
// Requires gsap.

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const WORDS = [${words}];

export default function KaraokeSweep({ text }: { text?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const words = text ? text.split(/\\s+/).filter(Boolean) : WORDS;

  useEffect(() => {
    const els = ref.current?.querySelectorAll(".tf-word");
    if (!els?.length) return;

    const timeline = gsap.timeline({
      delay: ${sec(p.delay)},
      repeat: ${p.loop ? -1 : 0},
      repeatDelay: 1,
    });

    els.forEach((word, i) => {
      timeline.to(
        word,
        {
          backgroundColor: ${style === 'underline' ? '"transparent"' : JSON.stringify(color)},
          color: ${style === 'underline' ? JSON.stringify(color) : '"#0a0a0a"'},
          boxShadow: ${style !== 'fill' ? JSON.stringify(`inset 0 -0.12em 0 ${color}`) : '"none"'},
          duration: ${sec(Math.min(0.3, step * 0.9))},
          ease: "power2.out",
        },
        i * ${sec(step)}
      );
    });

    return () => {
      timeline.kill();
    };
  }, [text]);

  return (
    <div
      ref={ref}
      style={{ ${typeCss(p)} display: "inline-block" }}
    >
      {words.map((word, i) => (
        <span className="tf-word" key={i}>
          {word}{" "}
        </span>
      ))}
    </div>
  );
}`;

  return { html, react };
}
