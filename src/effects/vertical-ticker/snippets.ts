import { escapeHtml, escapeJs } from '../../lib/escape';
import { framerEase, sec, typeCss } from '../../lib/snippet';
import type { Params, SnippetMap } from '../types';

export function build(p: Params): SnippetMap {
  const reps = 4;
  const gap = Number(p.gap);
  const speed = Math.max(10, Number(p.speed));
  const lineHeight = p.fontSize * 1.35;
  const duration = Math.max(2000, ((reps * (lineHeight + gap)) / speed) * 1000);
  const down = p.direction === 'down';

  const lines = Array.from(
    { length: reps },
    () => `        <span>${escapeHtml(p.text)}</span>`,
  ).join('\n');

  const group = `    <div class="tf-vt-group">
${lines}
    </div>`;

  const html = `<!-- typeframes — Vertical Ticker -->
<div class="tf-vticker" style="height: ${p.fontSize * 3}px">
  <div class="tf-vt-track">
${group}
${group}
  </div>
</div>

<style>
.tf-vticker {
  ${typeCss(p)}
  width: 100%;
  overflow: hidden;
  --tf-vt-gap: ${gap}px;
}
.tf-vticker span {
  display: block;
  line-height: 1.35;
  padding-bottom: var(--tf-vt-gap);
  white-space: nowrap;
}
.tf-vt-track {
  display: flex;
  flex-direction: column;
  animation: tf-vticker-${down ? 'down' : 'up'} ${sec(duration)}s linear infinite;
  will-change: transform;
}
.tf-vt-group {
  display: flex;
  flex-direction: column;
  flex: none;
}
@keyframes tf-vticker-up {
  from { transform: translateY(0); }
  to { transform: translateY(-50%); }
}
@keyframes tf-vticker-down {
  from { transform: translateY(-50%); }
  to { transform: translateY(0); }
}
</style>`;

  const react = `// typeframes — Vertical Ticker

export default function VerticalTicker({ text = "${escapeJs(p.text)}" }: { text?: string }) {
  const group = (
    <div className="tf-vt-group">
      {Array.from({ length: ${reps} }).map((_, i) => (
        <span key={i}>{text}</span>
      ))}
    </div>
  );

  return (
    <>
      <div className="tf-vticker" style={{ height: ${p.fontSize * 3} }}>
        <div className="tf-vt-track">
          {group}
          {group}
        </div>
      </div>
      <style>{\`
        .tf-vticker {
          ${typeCss(p)}
          width: 100%;
          overflow: hidden;
          --tf-vt-gap: ${gap}px;
        }
        .tf-vticker span {
          display: block;
          line-height: 1.35;
          padding-bottom: var(--tf-vt-gap);
          white-space: nowrap;
        }
        .tf-vt-track {
          display: flex;
          flex-direction: column;
          animation: tf-vticker-${down ? 'down' : 'up'} ${sec(duration)}s linear infinite;
          will-change: transform;
        }
        .tf-vt-group { display: flex; flex-direction: column; flex: none; }
        @keyframes tf-vticker-up {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }
        @keyframes tf-vticker-down {
          from { transform: translateY(-50%); }
          to { transform: translateY(0); }
        }
      \`}</style>
    </>
  );
}`;

  const framer = `// typeframes — Vertical Ticker
// Requires framer-motion.

import { motion } from "framer-motion";

export default function VerticalTicker({ text = "${escapeJs(p.text)}" }: { text?: string }) {
  const group = (
    <div style={{ display: "flex", flexDirection: "column", flex: "none" }}>
      {Array.from({ length: ${reps} }).map((_, i) => (
        <span key={i} style={{ paddingBottom: ${gap}, whiteSpace: "nowrap" }}>
          {text}
        </span>
      ))}
    </div>
  );

  return (
    <div
      style={{
        ${typeCss(p)}
        width: "100%",
        height: ${p.fontSize * 3},
        overflow: "hidden",
      }}
    >
      <motion.div
        style={{ display: "flex", flexDirection: "column" }}
        animate={{ y: ${down ? '["-50%", "0%"]' : '["0%", "-50%"]'} }}
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
