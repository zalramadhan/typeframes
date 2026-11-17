import { escapeHtml } from '../../lib/escape';
import { cssEase, framerEase, iterations, sec, typeCss } from '../../lib/snippet';
import { splitWordTokens } from '../../lib/splitText';
import type { Params, SnippetMap } from '../types';

export function build(p: Params): SnippetMap {
  const tokens = splitWordTokens(p.text || '');
  let wordIndex = -1;

  const markup = tokens
    .map((token) => {
      if (/^\s+$/.test(token)) return ' ';
      wordIndex += 1;
      return `<span class="tf-pop" style="animation-delay: ${wordIndex * p.delay}ms">${escapeHtml(token)}</span>`;
    })
    .join('');

  const words = tokens.filter((token) => !/^\s+$/.test(token));

  const html = `<!-- typeframes — Word Pop -->
<div class="tf-pop-line">${markup}</div>

<style>
.tf-pop-line {
  ${typeCss(p)}
  display: inline-block;
  white-space: pre-wrap;
  --tf-hl: ${p.highlightColor};
  --tf-pop: ${p.pop};
}
.tf-pop {
  display: inline-block;
  padding: 0 0.06em;
  border-radius: 2px;
  animation: tf-word-pop ${p.duration}ms ${cssEase(p)} 0ms ${iterations(p)} both;
}
@keyframes tf-word-pop {
  0%, 100% { background-color: transparent; color: inherit; transform: scale(1); }
  10% { background-color: var(--tf-hl); color: #0a0a0a; transform: scale(var(--tf-pop)); }
  24% { background-color: var(--tf-hl); color: #0a0a0a; transform: scale(1); }
  42% { background-color: transparent; color: inherit; transform: scale(1); }
}
</style>`;

  const react = `// typeframes — Word Pop

const WORDS = [${words.map((word) => `"${word}"`).join(', ')}];

export default function WordPop({ text }: { text?: string }) {
  const words = text ? text.split(/\\s+/).filter(Boolean) : WORDS;

  return (
    <>
      <span className="tf-pop-line">
        {words.map((word, i) => (
          <span
            className="tf-pop"
            key={i}
            style={{ animationDelay: \`\${i * ${p.delay}}ms\` }}
          >
            {word}{" "}
          </span>
        ))}
      </span>
      <style>{\`
        .tf-pop-line {
          ${typeCss(p)}
          display: inline-block;
          --tf-hl: ${p.highlightColor};
          --tf-pop: ${p.pop};
        }
        .tf-pop {
          display: inline-block;
          padding: 0 0.06em;
          border-radius: 2px;
          animation: tf-word-pop ${p.duration}ms ${cssEase(p)} 0ms ${iterations(p)} both;
        }
        @keyframes tf-word-pop {
          0%, 100% { background-color: transparent; color: inherit; transform: scale(1); }
          10% { background-color: var(--tf-hl); color: #0a0a0a; transform: scale(var(--tf-pop)); }
          24% { background-color: var(--tf-hl); color: #0a0a0a; transform: scale(1); }
          42% { background-color: transparent; color: inherit; transform: scale(1); }
        }
      \`}</style>
    </>
  );
}`;

  const framer = `// typeframes — Word Pop
// Requires framer-motion.

import { motion } from "framer-motion";

const WORDS = [${words.map((word) => `"${word}"`).join(', ')}];

export default function WordPop({ text }: { text?: string }) {
  const words = text ? text.split(/\\s+/).filter(Boolean) : WORDS;

  return (
    <motion.span
      style={{ ${typeCss(p)} display: "inline-block" }}
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: ${sec(p.delay)}, repeat: Infinity, repeatDelay: 0.4 } } }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block", padding: "0 0.06em", marginRight: "0.2em", borderRadius: 2 }}
          variants={{
            hidden: { backgroundColor: "transparent", color: "${p.color}", scale: 1 },
            show: {
              backgroundColor: "${p.highlightColor}",
              color: "#0a0a0a",
              scale: [1, ${p.pop}, 1],
              transition: { duration: ${sec(p.duration * 0.4)}, ease: ${framerEase(p)} },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}`;

  return { html, react, framer };
}
