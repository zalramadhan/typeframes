import { escapeHtml, escapeJs } from '../../lib/escape';
import { framerEase, sec, typeCss } from '../../lib/snippet';
import type { Params, SnippetMap } from '../types';

export function build(p: Params): SnippetMap {
  const gap = 40;
  const speed = Math.max(10, Number(p.speed));
  const estimate = Math.max((p.text || '').length, 8) * p.fontSize * 0.55;
  const duration = Math.max(1500, ((estimate * 3 + gap * 3) / speed) * 1000);
  const reversed = p.direction === 'right';

  const spans = [0, 1, 2]
    .map(
      () => `        <span style="padding-right: ${gap}px">${escapeHtml(p.text)}</span>`,
    )
    .join('\n');

  const group = `    <div class="tf-diag-group" style="padding-right: ${gap}px">
${spans}
    </div>`;

  const html = `<!-- typeframes — Diagonal Ticker -->
<div class="tf-diag" style="transform: rotate(${p.angle}deg)">
  <div class="tf-diag-viewport">
    <div class="tf-diag-track${reversed ? ' tf-diag-right' : ''}">
${group}
${group}
    </div>
  </div>
</div>

<style>
.tf-diag {
  ${typeCss(p)}
  width: 120%;
  margin: 0 -10%;
  overflow: hidden;
}
.tf-diag-viewport {
  width: 100%;
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
}
.tf-diag-track {
  display: flex;
  flex: none;
  align-items: center;
  white-space: nowrap;
  animation: tf-diag-left ${sec(duration)}s linear infinite;
  will-change: transform;
}
.tf-diag-track.tf-diag-right {
  animation-name: tf-diag-right;
}
.tf-diag-group {
  display: flex;
  flex: none;
  align-items: center;
}
@keyframes tf-diag-left {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
@keyframes tf-diag-right {
  from { transform: translateX(-50%); }
  to { transform: translateX(0); }
}
</style>`;

  const react = `// typeframes — Diagonal Ticker

export default function DiagonalTicker({ text = "${escapeJs(p.text)}" }: { text?: string }) {
  const group = (
    <div className="tf-diag-group" style={{ paddingRight: ${gap} }}>
      {[0, 1, 2].map((i) => (
        <span key={i} style={{ paddingRight: ${gap} }}>
          {text}
        </span>
      ))}
    </div>
  );

  return (
    <>
      <div className="tf-diag" style={{ transform: "rotate(${p.angle}deg)" }}>
        <div className="tf-diag-viewport">
          <div className="tf-diag-track${reversed ? ' tf-diag-right' : ''}">
            {group}
            {group}
          </div>
        </div>
      </div>
      <style>{\`
        .tf-diag {
          ${typeCss(p)}
          width: 120%;
          margin: 0 -10%;
          overflow: hidden;
        }
        .tf-diag-viewport {
          width: 100%;
          overflow: hidden;
          mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
        }
        .tf-diag-track {
          display: flex;
          flex: none;
          align-items: center;
          white-space: nowrap;
          animation: tf-diag-left ${sec(duration)}s linear infinite;
          will-change: transform;
        }
        .tf-diag-track.tf-diag-right { animation-name: tf-diag-right; }
        .tf-diag-group { display: flex; flex: none; align-items: center; }
        @keyframes tf-diag-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes tf-diag-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      \`}</style>
    </>
  );
}`;

  const framer = `// typeframes — Diagonal Ticker
// Requires framer-motion.

import { motion } from "framer-motion";

export default function DiagonalTicker({ text = "${escapeJs(p.text)}" }: { text?: string }) {
  const group = (
    <div style={{ display: "flex", flex: "none", paddingRight: ${gap} }}>
      {[0, 1, 2].map((i) => (
        <span key={i} style={{ paddingRight: ${gap} }}>
          {text}
        </span>
      ))}
    </div>
  );

  return (
    <div
      style={{
        ${typeCss(p)}
        width: "120%",
        margin: "0 -10%",
        transform: "rotate(${p.angle}deg)",
        overflow: "hidden",
      }}
    >
      <motion.div
        style={{ display: "flex", flex: "none", whiteSpace: "nowrap" }}
        animate={{ x: ${reversed ? '["-50%", "0%"]' : '["0%", "-50%"]'} }}
        transition={{
          duration: ${sec(duration)},
          ease: ${framerEase(p)},
          repeat: Infinity,
        }}
      >
        {group}
        {group}
      </motion.div>
    </div>
  );
}`;

  return { html, react, framer };
}
