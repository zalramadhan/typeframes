import { escapeHtml, escapeJs } from '../../lib/escape';
import { cssEase, framerEase, iterations, sec, typeCss } from '../../lib/snippet';
import { splitLines } from '../../lib/splitText';
import type { Params, SnippetMap } from '../types';

export function build(p: Params): SnippetMap {
  const lines = splitLines(p.text || '');
  const delayRules = lines
    .map(
      (_, index) =>
        `.tf-line-mask:nth-child(${index + 1}) > span { animation-delay: ${index * p.delay}ms; }`,
    )
    .join('\n');

  const markup = lines
    .map(
      (line) =>
        `    <span class="tf-line-mask"><span>${line ? escapeHtml(line) : '&nbsp;'}</span></span>`,
    )
    .join('\n');

  const html = `<!-- typeframes — Line Mask Rise -->
<div class="tf-line-mask-rise">
${markup}
</div>

<style>
.tf-line-mask-rise {
  ${typeCss(p)}
  display: inline-block;
}
.tf-line-mask {
  display: block;
  overflow: hidden;
  padding-bottom: 0.06em;
}
.tf-line-mask > span {
  display: inline-block;
  animation: tf-line-mask-rise ${p.duration}ms ${cssEase(p)} 0ms ${iterations(p)} both;
}
${delayRules}
@keyframes tf-line-mask-rise {
  from { transform: translateY(${p.distance}%); }
  to { transform: translateY(0); }
}
</style>`;

  const reactLines = lines
    .map((line) => `"${escapeJs(line)}"`)
    .join(',\n  ');

  const react = `// typeframes — Line Mask Rise
// Requires React. Font: ${p.fontFamily} (load from Google Fonts or swap the stack).

const LINES = [
  ${reactLines}
];

export default function LineMaskRise({ text }: { text?: string }) {
  const lines = text ? text.split("\\n") : LINES;

  return (
    <>
      <div className="tf-lmr">
        {lines.map((line, i) => (
          <span className="tf-lmr-mask" key={i}>
            <span style={{ animationDelay: \`\${i * ${p.delay}}ms\` }}>
              {line || " "}
            </span>
          </span>
        ))}
      </div>
      <style>{\`
        .tf-lmr {
          ${typeCss(p)}
          display: inline-block;
        }
        .tf-lmr-mask {
          display: block;
          overflow: hidden;
          padding-bottom: 0.06em;
        }
        .tf-lmr-mask > span {
          display: inline-block;
          animation: tf-lmr-rise ${p.duration}ms ${cssEase(p)} 0ms ${iterations(p)} both;
        }
        @keyframes tf-lmr-rise {
          from { transform: translateY(${p.distance}%); }
          to { transform: translateY(0); }
        }
      \`}</style>
    </>
  );
}`;

  const framer = `// typeframes — Line Mask Rise
// Requires framer-motion.

import { motion } from "framer-motion";

const LINES = [
  ${reactLines}
];

export default function LineMaskRise({ text }: { text?: string }) {
  const lines = text ? text.split("\\n") : LINES;

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: ${sec(p.delay)} } } }}
      style={{ ${typeCss(p)}
        display: "inline-block" }}
    >
      {lines.map((line, i) => (
        <span key={i} style={{ display: "block", overflow: "hidden" }}>
          <motion.span
            style={{ display: "inline-block" }}
            variants={{
              hidden: { y: "${p.distance}%" },
              show: { y: 0, transition: { duration: ${sec(p.duration)}, ease: ${framerEase(p)} } }
            }}
          >
            {line || " "}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}`;

  return { html, react, framer };
}
