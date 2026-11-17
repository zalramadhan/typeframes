import { escapeHtml, escapeJs } from '../../lib/escape';
import { framerEase, gsapEase, sec, typeCss } from '../../lib/snippet';
import { splitGraphemes } from '../../lib/splitText';
import type { Params, SnippetMap } from '../types';

export function build(p: Params): SnippetMap {
  const chars = splitGraphemes(p.text || '');
  const axis = p.axis === 'y' ? 'y' : 'x';
  const rotateKey = axis === 'x' ? 'rotateX' : 'rotateY';

  const markup = chars
    .map((char) => {
      const content = char === ' ' ? '&nbsp;' : escapeHtml(char);
      return `    <span class="tf-flip-char">${content}</span>`;
    })
    .join('\n');

  const charArray = chars
    .map((char) => (char === ' ' ? '"\\u00A0"' : `"${escapeJs(char)}"`))
    .join(', ');

  const html = `<!-- typeframes — Flip In 3D -->
<div class="tf-flip" id="tf-flip">
${markup}
</div>

<style>
.tf-flip {
  ${typeCss(p)}
  display: inline-block;
  perspective: ${p.perspective}px;
  transform-style: preserve-3d;
}
.tf-flip-char {
  display: inline-block;
  white-space: pre;
  will-change: transform, opacity;
}
</style>

<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"><\/script>
<script>
  const chars = document.querySelectorAll("#tf-flip .tf-flip-char");
  gsap.fromTo(
    chars,
    { opacity: 0, ${rotateKey}: -90, transformOrigin: "50% 50%" },
    {
      opacity: 1,
      ${rotateKey}: 0,
      duration: ${sec(p.duration)},
      ease: "${gsapEase(p)}",
      stagger: ${sec(p.delay)},
      repeat: ${p.loop ? -1 : 0},
      repeatDelay: 0.6,
    }
  );
<\/script>`;

  const react = `// typeframes — Flip In 3D
// Requires gsap.

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CHARS = [${charArray}];

export default function FlipIn3D({ text }: { text?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chars = ref.current?.querySelectorAll(".tf-flip-char");
    if (!chars?.length) return;

    const tween = gsap.fromTo(
      chars,
      { opacity: 0, ${rotateKey}: -90, transformOrigin: "50% 50%" },
      {
        opacity: 1,
        ${rotateKey}: 0,
        duration: ${sec(p.duration)},
        ease: "${gsapEase(p)}",
        stagger: ${sec(p.delay)},
        repeat: ${p.loop ? -1 : 0},
        repeatDelay: 0.6,
      }
    );

    return () => {
      tween.kill();
    };
  }, [text]);

  return (
    <div
      ref={ref}
      style={{
        ${typeCss(p)}
        display: "inline-block",
        perspective: ${p.perspective}px,
        transformStyle: "preserve-3d",
      }}
    >
      {(text ? Array.from(text) : CHARS).map((char, i) => (
        <span
          key={i}
          className="tf-flip-char"
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {char}
        </span>
      ))}
    </div>
  );
}`;

  const framer = `// typeframes — Flip In 3D
// Requires framer-motion.

import { motion } from "framer-motion";

const CHARS = [${charArray}];

export default function FlipIn3D({ text }: { text?: string }) {
  const chars = text ? Array.from(text) : CHARS;

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: ${sec(p.delay)} } } }}
      style={{
        ${typeCss(p)}
        display: "inline-block",
        perspective: ${p.perspective},
        transformStyle: "preserve-3d",
      }}
    >
      {chars.map((char, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block", whiteSpace: "pre" }}
          variants={{
            hidden: { opacity: 0, ${rotateKey}: -90 },
            show: {
              opacity: 1,
              ${rotateKey}: 0,
              transition: { duration: ${sec(p.duration)}, ease: ${framerEase(p)} }
            }
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
}`;

  return { html, react, framer };
}
