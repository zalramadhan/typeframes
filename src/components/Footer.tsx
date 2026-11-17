export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium tracking-[-0.01em]">
            typeframes
          </span>
          <span className="text-[11px] uppercase tracking-[0.16em] text-muted">
            Text in motion
          </span>
        </div>

        <div className="flex items-center gap-6 text-xs text-muted">
          {/* Replace with your own profile links. */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-ink"
          >
            GitHub
          </a>
          <a
            href="mailto:hello@example.com"
            className="transition-colors hover:text-ink"
          >
            Email
          </a>
          <span>© 2026</span>
        </div>
      </div>
    </footer>
  );
}
