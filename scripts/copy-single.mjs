import fs from 'node:fs';
import path from 'node:path';

const source = path.resolve('dist-single/index.html');
const target = path.resolve('typeframes.html');

const html = fs.readFileSync(source, 'utf8');

if (/<(script|link)[^>]+(src|href)="(?!https?:|data:)/.test(html)) {
  console.error('Standalone build still references local asset files.');
  process.exit(1);
}

fs.writeFileSync(target, html);
const kb = (Buffer.byteLength(html) / 1024).toFixed(0);
console.log(`typeframes.html written (${kb} kB) — double-click to open.`);
