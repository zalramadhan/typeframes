import { useCallback, useEffect, useState } from 'react';
import Hero from './components/Hero';
import CatalogGrid from './components/CatalogGrid';
import About from './components/About';
import Footer from './components/Footer';
import EffectModal from './components/EffectModal';
import { EFFECTS, getEffect } from './effects/registry';
import { usePrefersReducedMotion } from './lib/usePrefersReducedMotion';

function readHash(): string | null {
  const raw = window.location.hash.replace(/^#\/?/, '');
  return getEffect(raw) ? raw : null;
}

export default function App() {
  const [openId, setOpenId] = useState<string | null>(readHash);
  const systemReducedMotion = usePrefersReducedMotion();
  const [motionOn, setMotionOn] = useState(false);

  useEffect(() => {
    const onHashChange = () => setOpenId(readHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const openEffect = useCallback((id: string) => {
    window.location.hash = `/${id}`;
  }, []);

  const closeEffect = useCallback(() => {
    history.replaceState(
      null,
      '',
      `${window.location.pathname}${window.location.search}`,
    );
    setOpenId(null);
  }, []);

  const toggleMotion = useCallback(() => setMotionOn((value) => !value), []);

  const effect = openId ? getEffect(openId) : undefined;
  const reducedMotion = systemReducedMotion && !motionOn;

  return (
    <div className="min-h-screen bg-bg text-ink">
      <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-[1200px] items-center justify-between px-6 sm:px-10">
          <a href="#top" className="text-sm font-medium tracking-[-0.01em]">
            typeframes
          </a>
          <nav className="flex items-center gap-6 text-xs text-muted">
            <a href="#catalog" className="transition-colors hover:text-ink">
              Catalog
            </a>
            <a href="#about" className="transition-colors hover:text-ink">
              About
            </a>
            {/* Replace with your own profile link. */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-ink"
            >
              GitHub
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        <Hero />
        <CatalogGrid
          effects={EFFECTS}
          reducedMotion={reducedMotion}
          onOpen={openEffect}
        />
        <About />
      </main>

      <Footer />

      {effect ? (
        <EffectModal
          key={effect.meta.id}
          effect={effect}
          systemReducedMotion={systemReducedMotion}
          reducedMotion={reducedMotion}
          motionOn={motionOn}
          onToggleMotion={toggleMotion}
          onClose={closeEffect}
        />
      ) : null}
    </div>
  );
}
