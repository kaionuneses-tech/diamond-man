// Verificação do site: node check.mjs  (sai com código 1 se encontrar problema)
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const WA = '5527988332267';
const pages = readdirSync(root).filter(f => f.endsWith('.html'));
const errors = [];

for (const page of pages) {
  const html = readFileSync(join(root, page), 'utf8');
  for (const [, href] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(https?:|#|tel:|data:)/.test(href)) continue;
    const file = href.split(/[?#]/)[0];
    if (file && !existsSync(join(root, file))) errors.push(`${page}: link quebrado -> ${href}`);
  }
  for (const [, num] of html.matchAll(/wa\.me\/(\d+)/g))
    if (num !== WA) errors.push(`${page}: WhatsApp errado -> ${num}`);
  if (!html.includes(`wa.me/${WA}`)) errors.push(`${page}: sem link de WhatsApp`);
  for (const [tag] of html.matchAll(/<img\b[^>]*>/g))
    if (!/\balt="/.test(tag)) errors.push(`${page}: <img> sem alt -> ${tag.slice(0, 60)}`);
  if (/mailto:|[\w.-]+@[\w-]+\.[a-z]{2,}/i.test(html)) errors.push(`${page}: contém e-mail`);
  if (!html.includes('lang="pt-BR"')) errors.push(`${page}: falta lang="pt-BR"`);
}

errors.forEach(e => console.error('✗ ' + e));
console.log(`${pages.length} páginas, ${errors.length} problemas`);
process.exit(errors.length ? 1 : 0);
