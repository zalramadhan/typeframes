import { escapeHtml, escapeJs } from '../../lib/escape';
import { framerEase, sec, typeCss } from '../../lib/snippet';
import type { Params, SnippetMap } from '../types';

export function build(p: Params): SnippetMap {
  const gap = Number(p.gap);
  const speed = Math.max(10, Number(p.speed));
  const estimate = Math.max((p.text || '').length, 8) * p.fontSize * 0.55;
  const duration = Math.max(1500, ((estimate * 3 + gap * 3) / speed) * 1000);
  const reversed = p.direction === 'right';

  const spans = [0, 1, 2]
    .map(
      () => `        <span style="padding-right: ${gap}px">${escapeHtml(p.text)}</span>`,
    )
    .join('\n');

  const group = `    <div class="tf-marquee-group" style="padding-right: ${gap}px">
${spans}
    </div>`;

  const html = `<!-- typeframes — Infinite Marquee -->
<div class="tf-marquee${p.pauseOnHover ? ' tf-pause' : ''}">
  <div class="tf-marquee-track${reversed ? ' tf-right' : ''}">
${group}
${group}
  </div>
</div>

<style>
.tf-marquee {
  ${typeCss(p)}
  display: flex;
  overflow: hidden;
  width: 100%;
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}
.tf-marquee-track {
  display: flex;
  flex: none;
  align-items: center;
  white-space: nowrap;
  animation: tf-marquee${reversed ? '-right' : ''} ${sec(duration)}s linear infinite;
  will-change: transform;
}
.tf-marquee-group {
  display: flex;
  flex: none;
  align-items: center;
}
.tf-pause:hover .tf-marquee-track {
  animation-play-state: paused;
}
@keyframes tf-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
@keyframes tf-marquee-right {
  from { transform: translateX(-50%); }
  to { transform: translateX(0); }
}
</style>`;

  const react = `// typeframes — Infinite Marquee

export default function InfiniteMarquee({ text = "${escapeJs(p.text)}" }: { text?: string }) {
  const group = (
    <div className="tf-marquee-group" style={{ paddingRight: ${gap} }}>
      {[0, 1, 2].map((i) => (
        <span key={i} style={{ paddingRight: ${gap} }}>
          {text}
        </span>
      ))}
    </div>
  );

  return (
    <>
      <div className="tf-marquee${p.pauseOnHover ? ' tf-pause' : ''}">
        <div className="tf-marquee-track${reversed ? ' tf-right' : ''}">
          {group}
          {group}
        </div>
      </div>
      <style>{\`
        .tf-marquee {
          ${typeCss(p)}
          display: flex;
          overflow: hidden;
          width: 100%;
          mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
        }
        .tf-marquee-track {
          display: flex;
          flex: none;
          align-items: center;
          white-space: nowrap;
          animation: tf-marquee${reversed ? '-right' : ''} ${sec(duration)}s linear infinite;
          will-change: transform;
        }
        .tf-marquee-group {
          display: flex;
          flex: none;
          align-items: center;
        }
        .tf-pause:hover .tf-marquee-track {
          animation-play-state: paused;
        }
        @keyframes tf-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes tf-marquee-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      \`}</style>
    </>
  );
}`;

  const framer = `// typeframes — Infinite Marquee
// Requires framer-motion.

import { motion } from "framer-motion";

export default function InfiniteMarquee({ text = "${escapeJs(p.text)}" }: { text?: string }) {
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
        display: "flex",
        overflow: "hidden",
        width: "100%",
        maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
      }}
    >
      <motion.div
        style={{ display: "flex", flex: "none", whiteSpace: "nowrap" }}
        animate={{ x: ["0%", "-50%"] }}
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
