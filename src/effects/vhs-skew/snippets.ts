import { escapeHtml, escapeJs } from '../../lib/escape';
import { framerEase, iterations, sec, typeCss } from '../../lib/snippet';
import type { Params, SnippetMap } from '../types';

export function build(p: Params): SnippetMap {
  const scanlines = p.scanlines
    ? `<span class="tf-vhs-lines" aria-hidden="true"></span>`
    : '';

  const html = `<!-- typeframes — VHS Skew -->
<div class="tf-vhs">${escapeHtml(p.text)}${scanlines}</div>

<style>
.tf-vhs {
  ${typeCss(p)}
  position: relative;
  display: inline-block;
  white-space: pre-wrap;
  --tf-skew: ${p.skew}deg;
  --tf-jitter: ${p.jitter}px;
  animation: tf-vhs ${p.duration}ms steps(2, end) ${p.delay}ms ${iterations(p)} both;
}
.tf-vhs-lines {
  position: absolute;
  inset: -0.2em -0.4em;
  pointer-events: none;
  opacity: 0.45;
  background-image: repeating-linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.35) 0px,
    rgba(0, 0, 0, 0.35) 1px,
    transparent 1px,
    transparent 3px
  );
}
@keyframes tf-vhs {
  0%, 30%, 70%, 100% { transform: skewX(0) translateX(0); text-shadow: none; }
  8% {
    transform: skewX(var(--tf-skew)) translateX(var(--tf-jitter));
    text-shadow: 2px 0 rgba(255, 45, 85, 0.65), -2px 0 rgba(0, 229, 255, 0.65);
  }
  16% {
    transform: skewX(calc(var(--tf-skew) * -1)) translateX(calc(var(--tf-jitter) * -1));
    text-shadow: -2px 0 rgba(255, 45, 85, 0.65), 2px 0 rgba(0, 229, 255, 0.65);
  }
  22% { transform: skewX(0) translateX(0); text-shadow: none; }
  76% {
    transform: skewX(calc(var(--tf-skew) * 0.5)) translateX(var(--tf-jitter));
    text-shadow: 1px 0 rgba(255, 45, 85, 0.55), -1px 0 rgba(0, 229, 255, 0.55);
  }
  84% { transform: skewX(0) translateX(0); text-shadow: none; }
}
</style>`;

  const react = `// typeframes — VHS Skew

export default function VhsSkew({ text = "${escapeJs(p.text)}" }: { text?: string }) {
  return (
    <>
      <span className="tf-vhs">
        {text}
        ${p.scanlines ? '<span className="tf-vhs-lines" aria-hidden="true" />' : ''}
      </span>
      <style>{\`
        .tf-vhs {
          ${typeCss(p)}
          position: relative;
          display: inline-block;
          white-space: pre-wrap;
          --tf-skew: ${p.skew}deg;
          --tf-jitter: ${p.jitter}px;
          animation: tf-vhs ${p.duration}ms steps(2, end) ${p.delay}ms ${iterations(p)} both;
        }
        .tf-vhs-lines {
          position: absolute;
          inset: -0.2em -0.4em;
          pointer-events: none;
          opacity: 0.45;
          background-image: repeating-linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.35) 0px,
            rgba(0, 0, 0, 0.35) 1px,
            transparent 1px,
            transparent 3px
          );
        }
        @keyframes tf-vhs {
          0%, 30%, 70%, 100% { transform: skewX(0) translateX(0); text-shadow: none; }
          8% {
            transform: skewX(var(--tf-skew)) translateX(var(--tf-jitter));
            text-shadow: 2px 0 rgba(255, 45, 85, 0.65), -2px 0 rgba(0, 229, 255, 0.65);
          }
          16% {
            transform: skewX(calc(var(--tf-skew) * -1)) translateX(calc(var(--tf-jitter) * -1));
            text-shadow: -2px 0 rgba(255, 45, 85, 0.65), 2px 0 rgba(0, 229, 255, 0.65);
          }
          22% { transform: skewX(0) translateX(0); text-shadow: none; }
          76% {
            transform: skewX(calc(var(--tf-skew) * 0.5)) translateX(var(--tf-jitter));
            text-shadow: 1px 0 rgba(255, 45, 85, 0.55), -1px 0 rgba(0, 229, 255, 0.55);
          }
          84% { transform: skewX(0) translateX(0); text-shadow: none; }
        }
      \`}</style>
    </>
  );
}`;

  const framer = `// typeframes — VHS Skew
// Requires framer-motion. Approximate — the CSS version is the reference.

import { motion } from "framer-motion";

export default function VhsSkew({ text = "${escapeJs(p.text)}" }: { text?: string }) {
  return (
    <motion.span
      style={{ ${typeCss(p)} position: "relative", display: "inline-block" }}
      animate={{
        skewX: [0, ${Number(p.skew)}, -${Number(p.skew)}, 0, 0, ${Number(p.skew) / 2}, 0],
        x: [0, ${p.jitter}, -${p.jitter}, 0, 0, ${p.jitter}, 0],
        textShadow: [
          "none",
          "2px 0 rgba(255,45,85,0.65), -2px 0 rgba(0,229,255,0.65)",
          "-2px 0 rgba(255,45,85,0.65), 2px 0 rgba(0,229,255,0.65)",
          "none", "none",
          "1px 0 rgba(255,45,85,0.55), -1px 0 rgba(0,229,255,0.55)",
          "none",
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
