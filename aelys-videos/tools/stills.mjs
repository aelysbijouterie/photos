// Rend plusieurs images fixes d'une composition (contrôle visuel rapide).
// Usage : node tools/stills.mjs Video1 90,150,300 [dossier]
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'node:path';
import fs from 'node:fs';

const [id, framesArg, outDir = 'out/stills'] = process.argv.slice(2);
const frames = framesArg.split(',').map(Number);
fs.mkdirSync(outDir, {recursive: true});
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts'), onProgress: () => {}});
const browserExecutable = process.env.AELYS_BROWSER || undefined;
const composition = await selectComposition({serveUrl, id, browserExecutable});
for (const f of frames) {
  await renderStill({composition, serveUrl, frame: f, output: path.join(outDir, `${id}_${String(f).padStart(5, '0')}.png`), browserExecutable, scale: 0.5});
  console.log('ok', f);
}
