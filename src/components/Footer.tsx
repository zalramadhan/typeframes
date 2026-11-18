const SOCIALS = [
  {
    label: 'Instagram',
    handle: '@zalsomeone',
    href: 'https://instagram.com/zalsomeone',
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-3.5 w-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    handle: '@zalramadhan',
    href: 'https://github.com/zalramadhan',
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-3.5 w-3.5"
        fill="currentColor"
      >
        <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto w-full max-w-[1200px] px-6 py-12 sm:px-10">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium tracking-[-0.01em]">typeframes</p>
            <p className="mt-3 max-w-[34ch] text-xs leading-relaxed text-muted">
              Text animations, tuned by hand. Built and maintained by Zal.
            </p>
          </div>

          <div className="flex flex-col gap-5 sm:items-end">
            <nav aria-label="Social links" className="flex flex-wrap gap-x-6 gap-y-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 text-xs text-muted transition-colors hover:text-ink"
                >
                  {social.icon}
                  <span>{social.label}</span>
                  <span className="font-mono text-[11px] text-muted/70 transition-colors group-hover:text-muted">
                    {social.handle}
                  </span>
                  <span aria-hidden="true" className="text-[10px] text-muted/60">
                    ↗
                  </span>
                </a>
              ))}
            </nav>

            <p className="text-[11px] text-muted/70">
              © 2026 typeframes · Made in Indonesia
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
