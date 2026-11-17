import { escapeHtml, escapeJs } from '../../lib/escape';
import { cssEase, framerEase, iterations, sec, typeCss } from '../../lib/snippet';
import { displayToken, splitGraphemes } from '../../lib/splitText';
import type { Params, SnippetMap } from '../types';

export function build(p: Params): SnippetMap {
  const chars = splitGraphemes(p.text || '');

  const markup = chars
    .map((char, index) => {
      const token = displayToken(char);
      const content =
        token === '\u00A0' ? '&nbsp;' : escapeHtml(token);
      return `    <span class="tf-char" style="animation-delay: ${index * p.delay}ms">${content}</span>`;
    })
    .join('\n');

  const html = `<!-- typeframes — Character Cascade -->
<!-- Tip: for Arabic or Hebrew, split into words instead of characters. -->
<div class="tf-chars">
${markup}
</div>

<style>
.tf-chars {
  ${typeCss(p)}
  display: inline-block;
  --tf-y: ${p.distance}px;
  --tf-blur: ${p.blur}px;
  --tf-rot: ${p.rotate}deg;
}
.tf-char {
  display: inline-block;
  white-space: pre;
  animation: tf-char-stagger ${p.duration}ms ${cssEase(p)} 0ms ${iterations(p)} both;
}
@keyframes tf-char-stagger {
  from {
    opacity: 0;
    transform: translateY(var(--tf-y)) rotate(var(--tf-rot));
    filter: blur(var(--tf-blur));
  }
  to {
    opacity: 1;
    transform: translateY(0) rotate(0deg);
    filter: blur(0);
  }
}
</style>`;

  const charArray = chars
    .map((char) => `"${escapeJs(displayToken(char))}"`)
    .join(', ');

  const react = `// typeframes — Character Cascade

const CHARS = [${charArray}];

export default function CharacterCascade({ text }: { text?: string }) {
  const chars = text ? Array.from(text) : CHARS;

  return (
    <>
      <div className="tf-chars">
        {chars.map((char, i) => (
          <span
            className="tf-char"
            key={i}
            style={{ animationDelay: \`\${i * ${p.delay}}ms\` }}
          >
            {char === " " ? "\\u00A0" : char}
          </span>
        ))}
      </div>
      <style>{\`
        .tf-chars {
          ${typeCss(p)}
          display: inline-block;
          --tf-y: ${p.distance}px;
          --tf-blur: ${p.blur}px;
          --tf-rot: ${p.rotate}deg;
        }
        .tf-char {
          display: inline-block;
          white-space: pre;
          animation: tf-char-stagger ${p.duration}ms ${cssEase(p)} 0ms ${iterations(p)} both;
        }
        @keyframes tf-char-stagger {
          from {
            opacity: 0;
            transform: translateY(var(--tf-y)) rotate(var(--tf-rot));
            filter: blur(var(--tf-blur));
          }
          to {
            opacity: 1;
            transform: translateY(0) rotate(0deg);
            filter: blur(0);
          }
        }
      \`}</style>
    </>
  );
}`;

  const framer = `// typeframes — Character Cascade
// Requires framer-motion.

import { motion } from "framer-motion";

const CHARS = [${charArray}];

export default function CharacterCascade({ text }: { text?: string }) {
  const chars = text ? Array.from(text) : CHARS;

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: ${sec(p.delay)} } } }}
      style={{ ${typeCss(p)} display: "inline-block" }}
    >
      {chars.map((char, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block", whiteSpace: "pre" }}
          variants={{
            hidden: {
              opacity: 0,
              y: ${p.distance},
              rotate: ${p.rotate},
              filter: "blur(${p.blur}px)"
            },
            show: {
              opacity: 1,
              y: 0,
              rotate: 0,
              filter: "blur(0px)",
              transition: { duration: ${sec(p.duration)}, ease: ${framerEase(p)} }
            }
          }}
        >
          {char === " " ? "\\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
}`;

  return { html, react, framer };
}
