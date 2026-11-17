export function splitGraphemes(text: string): string[] {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    const segmenter = new Intl.Segmenter(undefined, {
      granularity: 'grapheme',
    });
    return Array.from(segmenter.segment(text), (s) => s.segment);
  }
  return Array.from(text);
}

export function graphemeLength(text: string): number {
  return splitGraphemes(text).length;
}

export function truncateGraphemes(text: string, max: number): string {
  const parts = splitGraphemes(text);
  return parts.length <= max ? text : parts.slice(0, max).join('');
}

export function splitLines(text: string): string[] {
  return text.split('\n');
}

/** Splits into words while keeping whitespace runs as their own tokens. */
export function splitWordTokens(text: string): string[] {
  return text.split(/(\s+)/).filter((token) => token.length > 0);
}

const RTL_PATTERN =
  /[\u0590-\u05FF\u0600-\u06FF\u0700-\u074F\u0750-\u077F\u08A0-\u08FF\uFB1D-\uFDFF\uFE70-\uFEFF]/;

export function isRTL(text: string): boolean {
  return RTL_PATTERN.test(text);
}

/** Space-safe rendering: keeps a visible gap for whitespace tokens. */
export function displayToken(token: string): string {
  return /^\s+$/.test(token) ? '\u00A0' : token;
}
