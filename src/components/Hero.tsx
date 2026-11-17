import { EFFECTS } from '../effects/registry';

export default function Hero() {
  const count = EFFECTS.length;

  return (
    <section className="mx-auto w-full max-w-[1200px] px-6 pt-20 pb-16 sm:px-10 sm:pt-28 sm:pb-24">
      <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
        {count} text animations
      </p>
      <h1 className="max-w-[14ch] text-[clamp(3rem,9vw,7rem)] font-semibold leading-[0.95] tracking-[-0.03em]">
        Text that moves.
      </h1>
      <p className="mt-8 max-w-[46ch] text-[15px] leading-relaxed text-muted sm:text-base">
        {count} hand-tuned text animations. Play with them, break them, then
        take the code. CSS first, GSAP only where it earns it.
      </p>
      <a
        href="#catalog"
        className="mt-10 inline-flex items-center gap-2 border-b border-line pb-1 text-sm text-ink transition-colors hover:border-ink"
      >
        Browse the catalog
        <span aria-hidden="true">↓</span>
      </a>
    </section>
  );
}
