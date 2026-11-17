import { escapeHtml, escapeJs } from '../../lib/escape';
import { cssEase, framerEase, iterations, sec, typeCss } from '../../lib/snippet';
import type { Params, SnippetMap } from '../types';

export function build(p: Params): SnippetMap {
  const html = `<!-- typeframes — Track & Tighten -->
<div class="tf-tighten">${escapeHtml(p.text)}</div>

<style>
.tf-tighten {
  ${typeCss(p)}
  display: inline-block;
  animation: tf-tighten ${p.duration}ms ${cssEase(p)} 0ms ${iterations(p)} both;
}
@keyframes tf-tighten {
  from {
    letter-spacing: ${p.spread}px;
    opacity: 0;
    filter: blur(${p.blur}px);
  }
  to {
    letter-spacing: 0;
    opacity: 1;
    filter: blur(0);
  }
}
</style>`;

  const react = `// typeframes — Track & Tighten

export default function TrackTighten({ text = "${escapeJs(p.text)}" }: { text?: string }) {
  return (
    <>
      <span className="tf-tighten">{text}</span>
      <style>{\`
        .tf-tighten {
          ${typeCss(p)}
          display: inline-block;
          animation: tf-tighten ${p.duration}ms ${cssEase(p)} 0ms ${iterations(p)} both;
        }
        @keyframes tf-tighten {
          from {
            letter-spacing: ${p.spread}px;
            opacity: 0;
            filter: blur(${p.blur}px);
          }
          to {
            letter-spacing: 0;
            opacity: 1;
            filter: blur(0);
          }
        }
      \`}</style>
    </>
  );
}`;

  const framer = `// typeframes — Track & Tighten
// Requires framer-motion.

import { motion } from "framer-motion";

export default function TrackTighten({ text = "${escapeJs(p.text)}" }: { text?: string }) {
  return (
    <motion.span
      style={{ ${typeCss(p)} display: "inline-block" }}
      initial={{ letterSpacing: "${p.spread}px", opacity: 0, filter: "blur(${p.blur}px)" }}
      animate={{ letterSpacing: "0px", opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: ${sec(p.duration)}, ease: ${framerEase(p)} }}
    >
      {text}
    </motion.span>
  );
}`;

  return { html, react, framer };
}
