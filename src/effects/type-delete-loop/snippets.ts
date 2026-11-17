import { escapeHtml, escapeJs, jsString } from '../../lib/escape';
import { typeCss } from '../../lib/snippet';
import type { Params, SnippetMap } from '../types';

export function build(p: Params): SnippetMap {
  const text = p.text || '';
  const typeSpeed = Number(p.typeSpeed);
  const deleteSpeed = Number(p.deleteSpeed);
  const hold = Number(p.hold);
  const block = p.cursor === 'block';
  const loop = p.loop;

  const html = `<!-- typeframes — Type & Delete -->
<div class="tf-type">
  <span class="tf-type-text"></span><span class="tf-caret${block ? ' tf-caret-block' : ''}" aria-hidden="true"></span>
  <noscript>${escapeHtml(text)}</noscript>
</div>

<style>
.tf-type {
  ${typeCss(p)}
}
.tf-type-text {
  white-space: pre-wrap;
}
.tf-caret {
  display: inline-block;
  width: 0.08em;
  height: 0.95em;
  margin-left: 0.06em;
  vertical-align: -0.08em;
  background: currentColor;
  animation: tf-caret-blink 1s steps(1, end) infinite;
}
.tf-caret-block {
  width: 0.55em;
}
@keyframes tf-caret-blink {
  0%, 45% { opacity: 1; }
  50%, 100% { opacity: 0; }
}
</style>

<script>
  const el = document.querySelector(".tf-type-text");
  const chars = Array.from(${jsString(text)});
  const typeSpeed = ${typeSpeed};
  const deleteSpeed = ${deleteSpeed};
  const hold = ${hold};
  const loop = ${loop};
  let index = 0;
  let deleting = false;

  function tick() {
    el.textContent = chars.slice(0, index).join("");
    if (!deleting) {
      if (index < chars.length) {
        index += 1;
        setTimeout(tick, typeSpeed);
      } else if (loop) {
        deleting = true;
        setTimeout(tick, hold);
      }
    } else {
      index -= 1;
      if (index > 0) {
        setTimeout(tick, deleteSpeed);
      } else {
        deleting = false;
        setTimeout(tick, hold);
      }
    }
  }
  tick();
</script>`;

  const react = `// typeframes — Type & Delete
import { useEffect, useState } from "react";

const TEXT = "${escapeJs(text)}";

export default function TypeDelete({
  text = TEXT,
  typeSpeed = ${typeSpeed},
  deleteSpeed = ${deleteSpeed},
  hold = ${hold},
  loop = ${loop},
}: {
  text?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  hold?: number;
  loop?: boolean;
}) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    const chars = Array.from(text);
    let index = 0;
    let deleting = false;
    let timer = 0;

    const tick = () => {
      setDisplay(chars.slice(0, index).join(""));
      if (!deleting) {
        if (index < chars.length) {
          index += 1;
          timer = window.setTimeout(tick, typeSpeed);
        } else if (loop) {
          deleting = true;
          timer = window.setTimeout(tick, hold);
        }
      } else {
        index -= 1;
        if (index > 0) {
          timer = window.setTimeout(tick, deleteSpeed);
        } else {
          deleting = false;
          timer = window.setTimeout(tick, hold);
        }
      }
    };

    timer = window.setTimeout(tick, ${p.delay});
    return () => window.clearTimeout(timer);
  }, [text, typeSpeed, deleteSpeed, hold, loop]);

  return (
    <div style={{ ${typeCss(p)} }}>
      <span>{display}</span>
      <span className="tf-caret${block ? ' tf-caret-block' : ''}" aria-hidden="true" />
      <style>{\`
        .tf-caret {
          display: inline-block;
          width: 0.08em;
          height: 0.95em;
          margin-left: 0.06em;
          vertical-align: -0.08em;
          background: currentColor;
          animation: tf-caret-blink 1s steps(1, end) infinite;
        }
        .tf-caret-block { width: 0.55em; }
        @keyframes tf-caret-blink {
          0%, 45% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      \`}</style>
    </div>
  );
}`;

  return { html, react };
}
