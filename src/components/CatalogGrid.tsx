import { useState } from 'react';
import EffectCard from './EffectCard';
import type { Effect } from '../effects/registry';

type Props = {
  effects: Effect[];
  reducedMotion: boolean;
  onOpen: (id: string) => void;
};

export default function CatalogGrid({ effects, reducedMotion, onOpen }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [token, setToken] = useState(0);

  const activate = (id: string) => {
    setActiveId(id);
    setToken((value) => value + 1);
  };

  const deactivate = (id: string) => {
    setActiveId((current) => (current === id ? null : current));
  };

  return (
    <section
      id="catalog"
      className="mx-auto w-full max-w-[1200px] scroll-mt-16 px-6 pb-24 sm:px-10"
    >
      <div className="mb-8 flex items-end justify-between border-t border-line pt-6">
        <h2 className="text-[11px] uppercase tracking-[0.2em] text-muted">
          Catalog
        </h2>
        <span className="text-[11px] text-muted">{effects.length} effects</span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {effects.map((effect) => (
          <EffectCard
            key={effect.meta.id}
            effect={effect}
            reducedMotion={reducedMotion}
            active={activeId === effect.meta.id}
            token={token}
            onActivate={() => activate(effect.meta.id)}
            onDeactivate={() => deactivate(effect.meta.id)}
            onOpen={() => onOpen(effect.meta.id)}
          />
        ))}
      </div>
    </section>
  );
}
