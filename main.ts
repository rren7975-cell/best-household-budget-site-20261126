// Hearth & Ledger — entrypoint for make.fun's best household budget site.
// The site is plain static files under app/ (index.html, style.css and ES
// modules, no build step, nothing fetched from the network). This program
// hands it in: it copies app/ and screenshots/ from beside this file into
// /output and writes /output/dossier.json — the summary the judge reads
// (the screenshots, the first load's files and bytes, and the source) —
// with the vendored make.fun library, left exactly as the kit ships it.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });

// The scorer's own caps: at most 4 screenshots, none over 256 KiB; app/
// at most 993 files and directories and 16 MiB; dossier text at most
// 160 KiB. The library refuses anything past those, so a bad hand-in
// fails here, loudly, instead of silently at the gate.
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, { text_max_bytes: 163840, screenshots: { max: 4, max_bytes: 262144 }, app_max_files: 993, app_max_bytes: 16777216 }),
);
