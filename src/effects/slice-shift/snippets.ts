import { escapeHtml } from '../../lib/escape';
import { cssEase, iterations, typeCss } from '../../lib/snippet';
import type { Params, SnippetMap } from '../types';

export function build(p: Params): SnippetMap {
  const slices = Math.max(2, Math.round(Number(p.slices)));
  const text = escapeHtml(p.text);

  const sliceMarkup = Array.from(
    { length: slices },
    () => `    <span class="tf-slice" aria-hidden="true">${text}</span>`,
  ).join('\n');

  const rules = Array.from({ length: slices }, (_, index) => {
    const top = (index / slices) * 100;
    const bottom = 100 - ((index + 1) / slices) * 100;
    const anim = index % 2 === 0 ? 'a' : 'b';
    return `.tf-slice:nth-child(${index + 2}) {
  clip-path: inset(${top}% 0 ${bottom}% 0);
  animation: tf-slice-${anim} ${p.duration}ms ${cssEase(p)} ${index * p.delay}ms ${iterations(p)} both;
}`;
  }).join('\n');

  const html = `<!-- typeframes — Slice Shift -->
<div class="tf-slice-shift">
    <span class="tf-slice-base">${text}</span>
${sliceMarkup}
</div>

<style>
.tf-slice-shift {
  ${typeCss(p)}
  position: relative;
  display: inline-block;
  white-space: pre-wrap;
  --tf-offset: ${p.offset}px;
}
.tf-slice-base {
  position: relative;
}
.tf-slice {
  position: absolute;
  inset: 0;
  white-space: pre-wrap;
}
${rules}
@keyframes tf-slice-a {
  0%, 100% { transform: translateX(0); }
  12% { transform: translateX(calc(var(--tf-offset) * -1)); }
  24% { transform: translateX(var(--tf-offset)); }
  36% { transform: translateX(0); }
  52% { transform: translateX(calc(var(--tf-offset) * 0.6)); }
  64% { transform: translateX(0); }
}
@keyframes tf-slice-b {
  0%, 100% { transform: translateX(0); }
  12% { transform: translateX(var(--tf-offset)); }
  24% { transform: translateX(calc(var(--tf-offset) * -0.7)); }
  36% { transform: translateX(0); }
  52% { transform: translateX(calc(var(--tf-offset) * -1)); }
  64% { transform: translateX(0); }
}
</style>`;

  const react = `// typeframes — Slice Shift

const SLICES = ${slices};

export default function SliceShift({ text = ${JSON.stringify(p.text)} }: { text?: string }) {
  const bands = Array.from({ length: SLICES }, (_, i) => ({
    top: (i / SLICES) * 100,
    bottom: 100 - ((i + 1) / SLICES) * 100,
  }));

  return (
    <>
      <span className="tf-slice-shift">
        {bands.map((band, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="tf-slice"
            style={{
              clipPath: \`inset(\${band.top}% 0 \${band.bottom}% 0)\`,
              animationDelay: \`\${i * ${p.delay}}ms\`,
            }}
          >
            {text}
          </span>
        ))}
        <span className="tf-slice-base">{text}</span>
      </span>
      <style>{\`
        .tf-slice-shift {
          ${typeCss(p)}
          position: relative;
          display: inline-block;
          white-space: pre-wrap;
          --tf-offset: ${p.offset}px;
        }
        .tf-slice-base { position: relative; }
        .tf-slice { position: absolute; inset: 0; white-space: pre-wrap; }
        .tf-slice:nth-child(odd) {
          animation: tf-slice-a ${p.duration}ms ${cssEase(p)} 0ms ${iterations(p)} both;
        }
        .tf-slice:nth-child(even) {
          animation: tf-slice-b ${p.duration}ms ${cssEase(p)} 0ms ${iterations(p)} both;
        }
        @keyframes tf-slice-a {
          0%, 100% { transform: translateX(0); }
          12% { transform: translateX(calc(var(--tf-offset) * -1)); }
          24% { transform: translateX(var(--tf-offset)); }
          36%, 100% { transform: translateX(0); }
          52% { transform: translateX(calc(var(--tf-offset) * 0.6)); }
          64% { transform: translateX(0); }
        }
        @keyframes tf-slice-b {
          0%, 100% { transform: translateX(0); }
          12% { transform: translateX(var(--tf-offset)); }
          24% { transform: translateX(calc(var(--tf-offset) * -0.7)); }
          36% { transform: translateX(0); }
          52% { transform: translateX(calc(var(--tf-offset) * -1)); }
          64% { transform: translateX(0); }
        }
      \`}</style>
    </>
  );
}`;

  return { html, react };
}
