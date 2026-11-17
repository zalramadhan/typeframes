import { escapeHtml, escapeJs } from '../../lib/escape';
import { cssEase, framerEase, iterations, sec, typeCss } from '../../lib/snippet';
import type { Params, SnippetMap } from '../types';

export function build(p: Params): SnippetMap {
  const glowColor = `color-mix(in srgb, ${p.glowColor} ${Number(p.intensity)}%, transparent)`;

  const html = `<!-- typeframes — Glow Pulse -->
<div class="tf-glow">${escapeHtml(p.text)}</div>

<style>
.tf-glow {
  ${typeCss(p)}
  display: inline-block;
  padding: 0.2em;
  --tf-glow: ${p.glow}px;
  --tf-glow-color: ${glowColor};
  animation: tf-glow-pulse ${p.duration}ms ${cssEase(p)} 0ms ${iterations(p)} both;
}
@keyframes tf-glow-pulse {
  0%, 100% {
    text-shadow: 0 0 calc(var(--tf-glow) * 0.4) var(--tf-glow-color),
                 0 0 calc(var(--tf-glow) * 0.8) var(--tf-glow-color);
  }
  50% {
    text-shadow: 0 0 var(--tf-glow) var(--tf-glow-color),
                 0 0 calc(var(--tf-glow) * 2.4) var(--tf-glow-color);
  }
}
</style>`;

  const react = `// typeframes — Glow Pulse

export default function GlowPulse({ text = "${escapeJs(p.text)}" }: { text?: string }) {
  return (
    <>
      <span className="tf-glow">{text}</span>
      <style>{\`
        .tf-glow {
          ${typeCss(p)}
          display: inline-block;
          padding: 0.2em;
          --tf-glow: ${p.glow}px;
          --tf-glow-color: ${glowColor};
          animation: tf-glow-pulse ${p.duration}ms ${cssEase(p)} 0ms ${iterations(p)} both;
        }
        @keyframes tf-glow-pulse {
          0%, 100% {
            text-shadow: 0 0 calc(var(--tf-glow) * 0.4) var(--tf-glow-color),
                         0 0 calc(var(--tf-glow) * 0.8) var(--tf-glow-color);
          }
          50% {
            text-shadow: 0 0 var(--tf-glow) var(--tf-glow-color),
                         0 0 calc(var(--tf-glow) * 2.4) var(--tf-glow-color);
          }
        }
      \`}</style>
    </>
  );
}`;

  const framer = `// typeframes — Glow Pulse
// Requires framer-motion.

import { motion } from "framer-motion";

export default function GlowPulse({ text = "${escapeJs(p.text)}" }: { text?: string }) {
  return (
    <motion.span
      style={{ ${typeCss(p)} display: "inline-block", padding: "0.2em" }}
      animate={{
        textShadow: [
          "0 0 ${Math.round(Number(p.glow) * 0.4)}px ${glowColor}",
          "0 0 ${Number(p.glow)}px ${glowColor}",
          "0 0 ${Math.round(Number(p.glow) * 0.4)}px ${glowColor}",
        ],
      }}
      transition={{
        duration: ${sec(p.duration)},
        ease: ${framerEase(p)},
        repeat: ${p.loop ? 'Infinity' : '0'},
      }}
    >
      {text}
    </motion.span>
  );
}`;

  return { html, react, framer };
}
