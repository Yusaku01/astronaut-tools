#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const SRC_DIR = path.join(repoRoot, 'src', 'components', 'ui');
const OUT_DIR = path.join(repoRoot, 'public', 'r');

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function read(file) {
  return fs.readFileSync(file, 'utf-8');
}

function write(file, content) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, content);
}

function buildItemFromAstro(componentPath) {
  const name = path.basename(componentPath, '.astro');
  const astro = read(componentPath);
  const json = {
    name,
    type: 'registry:ui',
    title: name[0].toUpperCase() + name.slice(1),
    description: `${name} component for Astro`,
    files: [
      {
        path: `src/components/ui/${name}.astro`,
        type: 'registry:component',
        content: astro,
      },
    ],
  };
  return json;
}

function main() {
  if (!fs.existsSync(SRC_DIR)) {
    console.error(`Source directory not found: ${SRC_DIR}`);
    process.exit(1);
  }
  ensureDir(OUT_DIR);

  const entries = fs
    .readdirSync(SRC_DIR)
    .filter((f) => f.endsWith('.astro'))
    .map((f) => path.join(SRC_DIR, f));

  const index = [];
  for (const file of entries) {
    const item = buildItemFromAstro(file);
    const outFile = path.join(OUT_DIR, `${item.name}.json`);
    write(outFile, JSON.stringify(item, null, 2));
    index.push({ name: item.name, url: `./${item.name}.json` });
    console.log(`✓ Wrote ${path.relative(repoRoot, outFile)}`);
  }
  write(path.join(OUT_DIR, 'index.json'), JSON.stringify(index, null, 2));
}

main();

