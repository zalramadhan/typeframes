import { escapeHtml, jsString } from '../../lib/escape';
import { typeCss } from '../../lib/snippet';
import type { Params, SnippetMap } from '../types';

export function build(p: Params): SnippetMap {
  const prompt = p.prompt ? '› ' : '';
  const typeSpeed = Number(p.typeSpeed);
  const linePause = Number(p.linePause);
  const block = p.cursor === 'block';

  const html = `<!-- typeframes — Terminal Boot -->
<div class="tf-term">
  <span class="tf-term-text"></span><span class="tf-term-caret${block ? ' tf-term-caret-block' : ''}" aria-hidden="true"></span>
  <noscript>${escapeHtml(p.text)}</noscript>
</div>

<style>
.tf-term {
  ${typeCss(p)}
  font-size: ${p.fontSize}px;
  line-height: 1.5;
  white-space: pre-wrap;
}
.tf-term-caret {
  display: inline-block;
  width: 0.08em;
  height: 1em;
  vertical-align: -0.1em;
  background: currentColor;
  animation: tf-term-blink 1s steps(1, end) infinite;
}
.tf-term-caret-block { width: 0.55em; }
@keyframes tf-term-blink {
  0%, 45% { opacity: 1; }
  50%, 100% { opacity: 0; }
}
</style>

<script>
  const el = document.querySelector(".tf-term-text");
  const lines = ${jsString(p.text)}.split("\\n");
  const prompt = ${jsString(prompt)};
  const typeSpeed = ${typeSpeed};
  const linePause = ${linePause};
  const loop = ${p.loop};
  const full = lines.map((line) => prompt + line).join("\\n");
  let index = 0;

  function step() {
    index += 1;
    el.textContent = full.slice(0, index);
    const char = full[index - 1];
    if (index < full.length) {
      setTimeout(step, char === "\\n" ? linePause : typeSpeed);
    } else if (loop) {
      setTimeout(() => {
        index = 0;
        el.textContent = "";
        step();
      }, Math.max(linePause, 900));
    }
  }

  setTimeout(step, ${p.delay});
</script>`;

  const react = `// typeframes — Terminal Boot
import { useEffect, useState } from "react";

const LINES = ${jsString(p.text)}.split("\\n");
const PROMPT = ${jsString(prompt)};

export default function TerminalBoot({
  text,
  typeSpeed = ${typeSpeed},
  linePause = ${linePause},
  loop = ${p.loop},
}: {
  text?: string;
  typeSpeed?: number;
  linePause?: number;
  loop?: boolean;
}) {
  const full = (text ?? LINES.join("\\n"))
    .split("\\n")
    .map((line) => PROMPT + line)
    .join("\\n");
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let index = 0;
    let timer = 0;
    const step = () => {
      index += 1;
      setTyped(full.slice(0, index));
      const char = full[index - 1];
      if (index < full.length) {
        timer = window.setTimeout(
          step,
          char === "\\n" ? linePause : typeSpeed
        );
      } else if (loop) {
        timer = window.setTimeout(() => {
          index = 0;
          setTyped("");
          step();
        }, Math.max(linePause, 900));
      }
    };
    timer = window.setTimeout(step, ${p.delay});
    return () => window.clearTimeout(timer);
  }, [full, typeSpeed, linePause, loop]);

  return (
    <div style={{ ${typeCss(p)} lineHeight: 1.5, whiteSpace: "pre-wrap" }}>
      {typed}
      <span className="tf-term-caret" aria-hidden="true" />
      <style>{\`
        .tf-term-caret {
          display: inline-block;
          width: 0.55em;
          height: 1em;
          vertical-align: -0.1em;
          background: currentColor;
          animation: tf-term-blink 1s steps(1, end) infinite;
        }
        @keyframes tf-term-blink {
          0%, 45% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      \`}</style>
    </div>
  );
}`;

  return { html, react };
}
