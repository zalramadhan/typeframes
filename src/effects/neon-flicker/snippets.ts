import { escapeHtml, escapeJs } from '../../lib/escape';
import { framerEase, iterations, sec, typeCss } from '../../lib/snippet';
import type { Params, SnippetMap } from '../types';

export function build(p: Params): SnippetMap {
  const glow = Number(p.glow);
  const cycle = p.duration * (p.flicker === 'wild' ? 0.55 : 1.6);
  const glowColor = `color-mix(in srgb, ${p.glowColor} ${Number(p.intensity)}%, transparent)`;

  const html = `<!-- typeframes — Neon Flicker -->
<div class="tf-neon">${escapeHtml(p.text)}</div>

<style>
.tf-neon {
  ${typeCss(p)}
  display: inline-block;
  padding: 0.25em;
  --tf-glow: ${glow}px;
  --tf-glow-color: ${glowColor};
  animation: tf-neon-flicker ${cycle}ms steps(1, end) 0ms ${iterations(p)} both;
}
@keyframes tf-neon-flicker {
  0%, 18%, 20%, 22%, 24%, 56%, 58%, 100% {
    opacity: 1;
    text-shadow: 0 0 var(--tf-glow) var(--tf-glow-color),
                 0 0 calc(var(--tf-glow) * 2.2) var(--tf-glow-color);
  }
  19%, 21%, 23%, 57% {
    opacity: 0.45;
    text-shadow: none;
  }
}
</style>`;

  const react = `// typeframes — Neon Flicker

export default function NeonFlicker({ text = "${escapeJs(p.text)}" }: { text?: string }) {
  return (
    <>
      <span className="tf-neon">{text}</span>
      <style>{\`
        .tf-neon {
          ${typeCss(p)}
          display: inline-block;
          padding: 0.25em;
          --tf-glow: ${glow}px;
          --tf-glow-color: ${glowColor};
          animation: tf-neon-flicker ${cycle}ms steps(1, end) 0ms ${iterations(p)} both;
        }
        @keyframes tf-neon-flicker {
          0%, 18%, 20%, 22%, 24%, 56%, 58%, 100% {
            opacity: 1;
            text-shadow: 0 0 var(--tf-glow) var(--tf-glow-color),
                         0 0 calc(var(--tf-glow) * 2.2) var(--tf-glow-color);
          }
          19%, 21%, 23%, 57% {
            opacity: 0.45;
            text-shadow: none;
          }
        }
      \`}</style>
    </>
  );
}`;

  const framer = `// typeframes — Neon Flicker
// Requires framer-motion.

import { motion } from "framer-motion";

export default function NeonFlicker({ text = "${escapeJs(p.text)}" }: { text?: string }) {
  return (
    <motion.span
      style={{ ${typeCss(p)} display: "inline-block", padding: "0.25em" }}
      animate={{
        opacity: [1, 0.45, 1, 0.5, 1, 1],
        textShadow: [
          "0 0 ${glow}px ${glowColor}",
          "none",
          "0 0 ${glow}px ${glowColor}",
          "none",
          "0 0 ${glow}px ${glowColor}",
          "0 0 ${glow}px ${glowColor}",
        ],
      }}
      transition={{
        duration: ${sec(cycle)},
        ease: ${framerEase(p)},
        times: [0, 0.19, 0.25, 0.4, 0.5, 1],
        repeat: ${p.loop ? 'Infinity' : '0'},
      }}
    >
      {text}
    </motion.span>
  );
}`;

  return { html, react, framer };
}
