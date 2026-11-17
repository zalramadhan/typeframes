import { escapeHtml, escapeJs } from '../../lib/escape';
import { cssEase, framerEase, iterations, sec, typeCss } from '../../lib/snippet';
import type { Params, SnippetMap } from '../types';

export function build(p: Params): SnippetMap {
  const layers = Math.max(2, Math.round(Number(p.layers)));
  const spread = Number(p.spread) / 100;

  const layerMarkup = Array.from(
    { length: layers },
    (_, index) =>
      `    <span class="tf-echo-layer" style="animation-delay: ${-((index * p.duration) / layers)}ms" aria-hidden="true">${escapeHtml(p.text)}</span>`,
  ).join('\n');

  const html = `<!-- typeframes — Echo Stack -->
<div class="tf-echo">
    <span class="tf-echo-base">${escapeHtml(p.text)}</span>
${layerMarkup}
</div>

<style>
.tf-echo {
  ${typeCss(p)}
  position: relative;
  display: inline-block;
  white-space: pre-wrap;
  padding: 0.1em;
  --tf-spread: ${spread};
}
.tf-echo-base {
  position: relative;
}
.tf-echo-layer {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: tf-echo ${p.duration}ms ${cssEase(p)} 0ms ${iterations(p)} both;
}
@keyframes tf-echo {
  from { opacity: 0.55; transform: scale(1); }
  to { opacity: 0; transform: scale(calc(1 + var(--tf-spread))); }
}
</style>`;

  const react = `// typeframes — Echo Stack

export default function EchoStack({ text = "${escapeJs(p.text)}" }: { text?: string }) {
  return (
    <>
      <span className="tf-echo">
        {Array.from({ length: ${layers} }).map((_, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="tf-echo-layer"
            style={{ animationDelay: \`\${-(i * ${p.duration}) / ${layers}}ms\` }}
          >
            {text}
          </span>
        ))}
        <span className="tf-echo-base">{text}</span>
      </span>
      <style>{\`
        .tf-echo {
          ${typeCss(p)}
          position: relative;
          display: inline-block;
          white-space: pre-wrap;
          padding: 0.1em;
          --tf-spread: ${spread};
        }
        .tf-echo-base { position: relative; }
        .tf-echo-layer {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: tf-echo ${p.duration}ms ${cssEase(p)} 0ms ${iterations(p)} both;
        }
        @keyframes tf-echo {
          from { opacity: 0.55; transform: scale(1); }
          to { opacity: 0; transform: scale(calc(1 + var(--tf-spread))); }
        }
      \`}</style>
    </>
  );
}`;

  const framer = `// typeframes — Echo Stack
// Requires framer-motion.

import { motion } from "framer-motion";

export default function EchoStack({ text = "${escapeJs(p.text)}" }: { text?: string }) {
  return (
    <span
      style={{ ${typeCss(p)} position: "relative", display: "inline-block", padding: "0.1em" }}
    >
      {Array.from({ length: ${layers} }).map((_, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
          animate={{ opacity: [0.55, 0], scale: [1, ${1 + spread}] }}
          transition={{
            duration: ${sec(p.duration)},
            ease: ${framerEase(p)},
            repeat: Infinity,
            delay: ${sec(p.duration / layers)} * -i,
          }}
        >
          {text}
        </motion.span>
      ))}
      <span style={{ position: "relative" }}>{text}</span>
    </span>
  );
}`;

  return { html, react, framer };
}
