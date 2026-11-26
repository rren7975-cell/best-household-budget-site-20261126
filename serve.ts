// Serve app/ on http://localhost:8080 for a look in a real browser:
//   node serve.ts            (or: node serve.ts --port 8081)
// Static files only; nothing is built and nothing leaves the machine.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const APP = join(fileURLToPath(new URL('.', import.meta.url)), 'app');
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
};
const port = Number(process.argv.find((a) => a === '--port') ? process.argv[process.argv.indexOf('--port') + 1] : 8080);

createServer(async (req, res) => {
  const path = req.url.split('?')[0].split('#')[0];
  const file = join(APP, path === '/' ? 'index.html' : path);
  if (!file.startsWith(APP)) { res.writeHead(403); res.end(); return; }
  try {
    const data = await readFile(file);
    res.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end('not found');
  }
}).listen(port, () => console.log(`Hearth & Ledger at http://localhost:${port}`));
