import { escapeHtml, escapeJs } from '../../lib/escape';
import { cssEase, framerEase, sec, typeCss } from '../../lib/snippet';
import { splitGraphemes } from '../../lib/splitText';
import type { Params, SnippetMap } from '../types';

export function build(p: Params): SnippetMap {
  const chars = splitGraphemes(p.text || '');
  const step = Math.max(p.duration, 1);

  const markup = chars
    .map((char, index) => {
      const delay = p.loop
        ? -((index * p.delay) % step)
        : index * p.delay;
      const content = char === ' ' ? '&nbsp;' : escapeHtml(char);
      return `<span style="animation-delay: ${delay}ms">${content}</span>`;
    })
    .join('');

  const html = `<!-- typeframes — Letter Wave -->
<div class="tf-wave">${markup}</div>

<style>
.tf-wave {
  ${typeCss(p)}
  display: inline-block;
  --tf-amp: ${p.amplitude}px;
}
.tf-wave > span {
  display: inline-block;
  white-space: pre;
  animation: tf-letter-wave ${p.duration}ms ${cssEase(p)} 0ms infinite both;
}
@keyframes tf-letter-wave {
  0%, 100% { transform: translateY(0); }
  25% { transform: translateY(calc(var(--tf-amp) * -1)); }
  50% { transform: translateY(0); }
  75% { transform: translateY(var(--tf-amp)); }
}
</style>`;

  const react = `// typeframes — Letter Wave

const CHARS = [${chars
    .map((char) => (char === ' ' ? '"\\u00A0"' : `"${escapeJs(char)}"`))
    .join(', ')}];

export default function LetterWave({ text }: { text?: string }) {
  const chars = text ? Array.from(text) : CHARS;

  return (
    <>
      <span className="tf-wave">
        {chars.map((char, i) => (
          <span
            key={i}
            style={{ animationDelay: \`\${-(i * ${p.delay} % ${step})}ms\` }}
          >
            {char}
          </span>
        ))}
      </span>
      <style>{\`
        .tf-wave {
          ${typeCss(p)}
          display: inline-block;
          --tf-amp: ${p.amplitude}px;
        }
        .tf-wave > span {
          display: inline-block;
          white-space: pre;
          animation: tf-letter-wave ${p.duration}ms ${cssEase(p)} 0ms infinite both;
        }
        @keyframes tf-letter-wave {
          0%, 100% { transform: translateY(0); }
          25% { transform: translateY(calc(var(--tf-amp) * -1)); }
          50% { transform: translateY(0); }
          75% { transform: translateY(var(--tf-amp)); }
        }
      \`}</style>
    </>
  );
}`;

  const framer = `// typeframes — Letter Wave
// Requires framer-motion.

import { motion } from "framer-motion";

const CHARS = [${chars
    .map((char) => (char === ' ' ? '"\\u00A0"' : `"${escapeJs(char)}"`))
    .join(', ')}];

export default function LetterWave({ text }: { text?: string }) {
  const chars = text ? Array.from(text) : CHARS;

  return (
    <motion.span
      style={{ ${typeCss(p)} display: "inline-block" }}
      initial="hidden"
      animate="show"
    >
      {chars.map((char, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block", whiteSpace: "pre" }}
          animate={{ y: [0, -${p.amplitude}, 0, ${p.amplitude}, 0] }}
          transition={{
            duration: ${sec(p.duration)},
            ease: ${framerEase(p)},
            repeat: Infinity,
            delay: ${sec(p.delay)} * i,
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
