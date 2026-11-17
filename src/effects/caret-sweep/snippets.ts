import { escapeHtml, escapeJs } from '../../lib/escape';
import { cssEase, iterations, typeCss } from '../../lib/snippet';
import type { Params, SnippetMap } from '../types';

export function build(p: Params): SnippetMap {
  const html = `<!-- typeframes — Caret Sweep -->
<div class="tf-caret-sweep">
  <span class="tf-caret-text">${escapeHtml(p.text)}</span>
  <span class="tf-caret-line" aria-hidden="true"></span>
</div>

<style>
.tf-caret-sweep {
  ${typeCss(p)}
  position: relative;
  display: inline-block;
}
.tf-caret-text {
  display: inline-block;
  white-space: pre-wrap;
  animation: tf-caret-clip ${p.duration}ms ${cssEase(p)} 0ms ${iterations(p)} both;
}
.tf-caret-line {
  position: absolute;
  top: -0.08em;
  bottom: -0.08em;
  width: ${p.caretWidth}px;
  background: ${p.color};
  animation: tf-caret-move ${p.duration}ms ${cssEase(p)} 0ms ${iterations(p)} both;
}
@keyframes tf-caret-clip {
  from { clip-path: inset(0 100% 0 0); }
  to { clip-path: inset(0 0 0 0); }
}
@keyframes tf-caret-move {
  from { left: 0; }
  to { left: 100%; }
}
</style>`;

  const react = `// typeframes — Caret Sweep

export default function CaretSweep({ text = "${escapeJs(p.text)}" }: { text?: string }) {
  return (
    <>
      <span className="tf-caret-sweep">
        <span className="tf-caret-text">{text}</span>
        <span className="tf-caret-line" aria-hidden="true" />
      </span>
      <style>{\`
        .tf-caret-sweep {
          ${typeCss(p)}
          position: relative;
          display: inline-block;
        }
        .tf-caret-text {
          display: inline-block;
          white-space: pre-wrap;
          animation: tf-caret-clip ${p.duration}ms ${cssEase(p)} 0ms ${iterations(p)} both;
        }
        .tf-caret-line {
          position: absolute;
          top: -0.08em;
          bottom: -0.08em;
          width: ${p.caretWidth}px;
          background: ${p.color};
          animation: tf-caret-move ${p.duration}ms ${cssEase(p)} 0ms ${iterations(p)} both;
        }
        @keyframes tf-caret-clip {
          from { clip-path: inset(0 100% 0 0); }
          to { clip-path: inset(0 0 0 0); }
        }
        @keyframes tf-caret-move {
          from { left: 0; }
          to { left: 100%; }
        }
      \`}</style>
    </>
  );
}`;

  return { html, react };
}
