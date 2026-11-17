import type { Params } from '../effects/types';

const PREFIX = 'typeframes:preset:v1';

export function loadPreset(id: string): Params | null {
  try {
    const raw = localStorage.getItem(`${PREFIX}:${id}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Params;
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch {
    return null;
  }
}

export function savePreset(id: string, params: Params): void {
  try {
    localStorage.setItem(`${PREFIX}:${id}`, JSON.stringify(params));
  } catch {
    // private mode / quota — keep working in memory
  }
}

export function clearPreset(id: string): void {
  try {
    localStorage.removeItem(`${PREFIX}:${id}`);
  } catch {
    // ignore
  }
}
