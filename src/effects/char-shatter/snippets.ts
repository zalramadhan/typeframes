import { escapeHtml, escapeJs } from '../../lib/escape';
import { cssEase, framerEase, iterations, sec, typeCss } from '../../lib/snippet';
import { splitGraphemes } from '../../lib/splitText';
import type { Params, SnippetMap } from '../types';

export function build(p: Params): SnippetMap {
  const chars = splitGraphemes(p.text || '');
  const scatter = Number(p.scatter);
  const spin = Number(p.spin);

  const markup = chars
    .map((char) => {
      const content = char === ' ' ? '&nbsp;' : escapeHtml(char);
      return `    <span class="tf-shatter-char">${content}</span>`;
    })
    .join('\n');

  const charArray = chars
    .map((char) => (char === ' ' ? '"\\u00A0"' : `"${escapeJs(char)}"`))
    .join(', ');

  const html = `<!-- typeframes — Character Shatter -->
<div class="tf-shatter" id="tf-shatter">
${markup}
</div>

<style>
.tf-shatter {
  ${typeCss(p)}
  display: inline-block;
}
.tf-shatter-char {
  display: inline-block;
  white-space: pre;
  will-change: transform, opacity;
  animation: tf-char-shatter ${p.duration}ms ${cssEase(p)} 0ms ${iterations(p)} both;
}
@keyframes tf-char-shatter {
  from {
    opacity: 0;
    transform: translate(var(--tf-dx, 40px), var(--tf-dy, -40px))
      rotate(var(--tf-dr, 30deg)) scale(1.3);
  }
  to {
    opacity: 1;
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
}
</style>

<script>
  const scatter = ${scatter};
  const spin = ${spin};
  const stagger = ${p.delay};

  document.querySelectorAll("#tf-shatter .tf-shatter-char").forEach((el, i) => {
    el.style.setProperty("--tf-dx", ((Math.random() * 2 - 1) * scatter).toFixed(1) + "px");
    el.style.setProperty("--tf-dy", ((Math.random() * 2 - 1) * scatter).toFixed(1) + "px");
    el.style.setProperty("--tf-dr", ((Math.random() * 2 - 1) * spin).toFixed(1) + "deg");
    el.style.animationDelay = i * stagger + "ms";
  });
</script>`;

  const react = `// typeframes — Character Shatter
import type { CSSProperties } from "react";

const CHARS = [${charArray}];

function pseudo(i: number, salt: number) {
  const value = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return value - Math.floor(value);
}

export default function CharacterShatter({ text }: { text?: string }) {
  const chars = text ? Array.from(text) : CHARS;

  return (
    <>
      <span className="tf-shatter">
        {chars.map((char, i) => (
          <span
            className="tf-shatter-char"
            key={i}
            style={
              {
                animationDelay: \`\${i * ${p.delay}}ms\`,
                "--tf-dx": (pseudo(i, 1) * 2 - 1) * ${scatter} + "px",
                "--tf-dy": (pseudo(i, 2) * 2 - 1) * ${scatter} + "px",
                "--tf-dr": (pseudo(i, 3) * 2 - 1) * ${spin} + "deg",
              } as CSSProperties
            }
          >
            {char}
          </span>
        ))}
      </span>
      <style>{\`
        .tf-shatter {
          ${typeCss(p)}
          display: inline-block;
        }
        .tf-shatter-char {
          display: inline-block;
          white-space: pre;
          animation: tf-char-shatter ${p.duration}ms ${cssEase(p)} 0ms ${iterations(p)} both;
        }
        @keyframes tf-char-shatter {
          from {
            opacity: 0;
            transform: translate(var(--tf-dx, 40px), var(--tf-dy, -40px))
              rotate(var(--tf-dr, 30deg)) scale(1.3);
          }
          to {
            opacity: 1;
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
        }
      \`}</style>
    </>
  );
}`;

  const framer = `// typeframes — Character Shatter
// Requires framer-motion.

import { motion } from "framer-motion";

const CHARS = [${charArray}];

function pseudo(i: number, salt: number) {
  const value = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return value - Math.floor(value);
}

export default function CharacterShatter({ text }: { text?: string }) {
  const chars = text ? Array.from(text) : CHARS;

  return (
    <motion.span
      style={{ ${typeCss(p)} display: "inline-block" }}
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: ${sec(p.delay)} } } }}
    >
      {chars.map((char, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block", whiteSpace: "pre" }}
          variants={{
            hidden: {
              opacity: 0,
              x: (pseudo(i, 1) * 2 - 1) * ${scatter},
              y: (pseudo(i, 2) * 2 - 1) * ${scatter},
              rotate: (pseudo(i, 3) * 2 - 1) * ${spin},
              scale: 1.3,
            },
            show: {
              opacity: 1,
              x: 0,
              y: 0,
              rotate: 0,
              scale: 1,
              transition: { duration: ${sec(p.duration)}, ease: ${framerEase(p)} },
            },
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}`;

  return { html, react, framer };
}
