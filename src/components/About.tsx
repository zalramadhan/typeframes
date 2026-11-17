export default function About() {
  return (
    <section
      id="about"
      className="mx-auto w-full max-w-[1200px] scroll-mt-16 border-t border-line px-6 py-16 sm:px-10 sm:py-20"
    >
      <div className="grid gap-8 sm:grid-cols-[1fr_2fr]">
        <h2 className="text-[11px] uppercase tracking-[0.2em] text-muted">
          About
        </h2>
        <div className="max-w-[62ch] space-y-4 text-[15px] leading-relaxed text-muted">
          <p>
            typeframes is a small collection of text animations built as a
            personal reference and a working tool. Every effect is tuned by
            hand: timing, easing, and the small offsets that make motion feel
            intentional rather than decorative.
          </p>
          <p>
            Everything here is CSS first. GSAP only appears where a timeline
            genuinely does the job better, and the copy button says so before
            you paste anything into your project.
          </p>
          <p className="text-xs text-muted/80">
            Codes are dependency-free unless noted. Fonts are loaded from Google
            Fonts in the demos — swap in your own stack when you ship.
          </p>
        </div>
      </div>
    </section>
  );
}
