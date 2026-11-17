import { escapeHtml, escapeJs } from '../../lib/escape';
import { cssEase, framerEase, iterations, sec, typeCss } from '../../lib/snippet';
import type { Params, SnippetMap } from '../types';

export function build(p: Params): SnippetMap {
  const gradient = `linear-gradient(100deg, ${p.color} 20%, ${p.sheenColor} 50%, ${p.color} 80%)`;

  const html = `<!-- typeframes — Gradient Sheen -->
<div class="tf-sheen">${escapeHtml(p.text)}</div>

<style>
.tf-sheen {
  ${typeCss(p)}
  display: inline-block;
  background-image: ${gradient};
  background-size: ${p.size}% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  animation: tf-sheen ${p.duration}ms ${cssEase(p)} 0ms ${iterations(p)} both;
}
@keyframes tf-sheen {
  from { background-position: 200% 0; }
  to { background-position: -200% 0; }
}
</style>`;

  const react = `// typeframes — Gradient Sheen

export default function GradientSheen({ text = "${escapeJs(p.text)}" }: { text?: string }) {
  return (
    <>
      <span className="tf-sheen">{text}</span>
      <style>{\`
        .tf-sheen {
          ${typeCss(p)}
          display: inline-block;
          background-image: ${gradient};
          background-size: ${p.size}% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
          animation: tf-sheen ${p.duration}ms ${cssEase(p)} 0ms ${iterations(p)} both;
        }
        @keyframes tf-sheen {
          from { background-position: 200% 0; }
          to { background-position: -200% 0; }
        }
      \`}</style>
    </>
  );
}`;

  const framer = `// typeframes — Gradient Sheen
// Requires framer-motion.

import { motion } from "framer-motion";

export default function GradientSheen({ text = "${escapeJs(p.text)}" }: { text?: string }) {
  return (
    <motion.span
      style={{
        ${typeCss(p)}
        display: "inline-block",
        backgroundImage: "${gradient}",
        backgroundSize: "${p.size}% 100%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        WebkitTextFillColor: "transparent",
      }}
      animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
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
