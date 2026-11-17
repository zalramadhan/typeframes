import { escapeHtml, escapeJs } from '../../lib/escape';
import { cssEase, framerEase, iterations, sec, typeCss } from '../../lib/snippet';
import type { Params, SnippetMap } from '../types';

export function build(p: Params): SnippetMap {
  const offset = Number(p.offset);
  const jitter = Number(p.jitter);
  const cycle = Math.max(250, p.duration / Number(p.frequency));

  const html = `<!-- typeframes — Chromatic Split -->
<div class="tf-rgb-split">${escapeHtml(p.text)}</div>

<style>
.tf-rgb-split {
  ${typeCss(p)}
  display: inline-block;
  --tf-offset: ${offset}px;
  --tf-jitter: ${jitter}px;
  animation: tf-rgb-split ${cycle}ms ${cssEase(p)} 0ms ${iterations(p)} both;
}
@keyframes tf-rgb-split {
  0%, 100% { text-shadow: none; transform: translate(0, 0); }
  8% {
    text-shadow: calc(var(--tf-offset) * -1) 0 rgba(255, 45, 85, 0.9),
                 var(--tf-offset) 0 rgba(0, 229, 255, 0.9);
    transform: translate(calc(var(--tf-jitter) * -0.7), 0);
  }
  16% {
    text-shadow: var(--tf-offset) 0 rgba(255, 45, 85, 0.9),
                 calc(var(--tf-offset) * -1) 0 rgba(0, 229, 255, 0.9);
    transform: translate(calc(var(--tf-jitter) * 0.7), 0);
  }
  24% { text-shadow: none; transform: translate(0, 0); }
  40% {
    text-shadow: calc(var(--tf-offset) * -0.6) 0 rgba(255, 45, 85, 0.8),
                 calc(var(--tf-offset) * 0.6) 0 rgba(0, 229, 255, 0.8);
    transform: translate(0, calc(var(--tf-jitter) * -0.5));
  }
  48% { text-shadow: none; transform: translate(0, 0); }
  70% {
    text-shadow: calc(var(--tf-offset) * -1.2) 0 rgba(255, 45, 85, 0.85),
                 calc(var(--tf-offset) * 1.2) 0 rgba(0, 229, 255, 0.85);
    transform: translate(calc(var(--tf-jitter) * 0.5), 0);
  }
  78% { text-shadow: none; transform: translate(0, 0); }
}
</style>`;

  const react = `// typeframes — Chromatic Split

export default function ChromaticSplit({ text = "${escapeJs(p.text)}" }: { text?: string }) {
  return (
    <>
      <span className="tf-rgb-split">{text}</span>
      <style>{\`
        .tf-rgb-split {
          ${typeCss(p)}
          display: inline-block;
          --tf-offset: ${offset}px;
          --tf-jitter: ${jitter}px;
          animation: tf-rgb-split ${cycle}ms ${cssEase(p)} 0ms ${iterations(p)} both;
        }
        @keyframes tf-rgb-split {
          0%, 100% { text-shadow: none; transform: translate(0, 0); }
          8% {
            text-shadow: calc(var(--tf-offset) * -1) 0 rgba(255, 45, 85, 0.9),
                         var(--tf-offset) 0 rgba(0, 229, 255, 0.9);
            transform: translate(calc(var(--tf-jitter) * -0.7), 0);
          }
          16% {
            text-shadow: var(--tf-offset) 0 rgba(255, 45, 85, 0.9),
                         calc(var(--tf-offset) * -1) 0 rgba(0, 229, 255, 0.9);
            transform: translate(calc(var(--tf-jitter) * 0.7), 0);
          }
          24% { text-shadow: none; transform: translate(0, 0); }
          40% {
            text-shadow: calc(var(--tf-offset) * 0.6) 0 rgba(255, 45, 85, 0.8),
                         calc(var(--tf-offset) * -0.6) 0 rgba(0, 229, 255, 0.8);
            transform: translate(0, calc(var(--tf-jitter) * -0.5));
          }
          48% { text-shadow: none; transform: translate(0, 0); }
          70% {
            text-shadow: calc(var(--tf-offset) * -1.2) 0 rgba(255, 45, 85, 0.85),
                         calc(var(--tf-offset) * 1.2) 0 rgba(0, 229, 255, 0.85);
            transform: translate(calc(var(--tf-jitter) * 0.5), 0);
          }
          78% { text-shadow: none; transform: translate(0, 0); }
        }
      \`}</style>
    </>
  );
}`;

  const framer = `// typeframes — Chromatic Split
// Requires framer-motion. Approximate — CSS version is the reference.

import { motion } from "framer-motion";

export default function ChromaticSplit({ text = "${escapeJs(p.text)}" }: { text?: string }) {
  return (
    <motion.span
      style={{ ${typeCss(p)} display: "inline-block" }}
      animate={{
        textShadow: [
          "0 0 transparent",
          "${-offset}px 0 rgba(255,45,85,0.9), ${offset}px 0 rgba(0,229,255,0.9)",
          "0 0 transparent",
        ],
        x: [0, ${jitter}, -${jitter}, 0],
      }}
      transition={{
        duration: ${sec(cycle)},
        ease: ${framerEase(p)},
        repeat: ${p.loop ? 'Infinity' : '0'},
        repeatDelay: 0.4,
      }}
    >
      {text}
    </motion.span>
  );
}`;

  return { html, react, framer };
}
