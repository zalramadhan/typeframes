import { escapeHtml, escapeJs } from '../../lib/escape';
import { cssEase, framerEase, iterations, sec, typeCss } from '../../lib/snippet';
import { splitWordTokens } from '../../lib/splitText';
import type { Params, SnippetMap } from '../types';

export function build(p: Params): SnippetMap {
  const tokens = splitWordTokens(p.text || '');
  let wordIndex = -1;

  const markup = tokens
    .map((token) => {
      if (/^\s+$/.test(token)) return '&nbsp;';
      wordIndex += 1;
      return `<span class="tf-word-mask"><span style="animation-delay: ${wordIndex * p.delay}ms">${escapeHtml(token)}</span></span>`;
    })
    .join('');

  const words = tokens.filter((token) => !/^\s+$/.test(token));
  const wordArray = words.map((word) => `"${escapeJs(word)}"`).join(', ');

  const html = `<!-- typeframes — Word Mask Rise -->
<div class="tf-word-rise">
${markup}
</div>

<style>
.tf-word-rise {
  ${typeCss(p)}
  display: inline-block;
  max-width: 100%;
  --tf-rise: ${p.distance}%;
}
.tf-word-mask {
  display: inline-block;
  overflow: hidden;
  vertical-align: top;
  padding-bottom: 0.06em;
}
.tf-word-mask > span {
  display: inline-block;
  animation: tf-word-rise ${p.duration}ms ${cssEase(p)} 0ms ${iterations(p)} both;
}
@keyframes tf-word-rise {
  from { transform: translateY(var(--tf-rise)); }
  to { transform: translateY(0); }
}
</style>`;

  const react = `// typeframes — Word Mask Rise

const WORDS = [${wordArray}];

export default function WordMaskRise({ text }: { text?: string }) {
  const words = text ? text.split(/\\s+/).filter(Boolean) : WORDS;

  return (
    <>
      <div className="tf-word-rise">
        {words.map((word, i) => (
          <span key={i} className="tf-word-mask">
            <span style={{ animationDelay: \`\${i * ${p.delay}}ms\` }}>
              {word}
            </span>
          </span>
        ))}
      </div>
      <style>{\`
        .tf-word-rise {
          ${typeCss(p)}
          display: inline-block;
          max-width: 100%;
          --tf-rise: ${p.distance}%;
        }
        .tf-word-mask {
          display: inline-block;
          overflow: hidden;
          vertical-align: top;
          padding-bottom: 0.06em;
          margin-right: 0.24em;
        }
        .tf-word-mask > span {
          display: inline-block;
          animation: tf-word-rise ${p.duration}ms ${cssEase(p)} 0ms ${iterations(p)} both;
        }
        @keyframes tf-word-rise {
          from { transform: translateY(var(--tf-rise)); }
          to { transform: translateY(0); }
        }
      \`}</style>
    </>
  );
}`;

  const framer = `// typeframes — Word Mask Rise
// Requires framer-motion.

import { motion } from "framer-motion";

const WORDS = [${wordArray}];

export default function WordMaskRise({ text }: { text?: string }) {
  const words = text ? text.split(/\\s+/).filter(Boolean) : WORDS;

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: ${sec(p.delay)} } } }}
      style={{ ${typeCss(p)} display: "inline-block", maxWidth: "100%" }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", marginRight: "0.24em" }}
        >
          <motion.span
            style={{ display: "inline-block" }}
            variants={{
              hidden: { y: "${p.distance}%" },
              show: { y: 0, transition: { duration: ${sec(p.duration)}, ease: ${framerEase(p)} } }
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}`;

  return { html, react, framer };
}
