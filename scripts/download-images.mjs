/**
 * Downloads every NASA mission photo listed in src/data/missionImages.json
 * into public/images/<mission-id>.jpg so the site works offline and on Vercel
 * without depending on NASA's servers.
 *
 *   npm run images            download any missing photos
 *   npm run images -- --force re-download everything
 *
 * For each photo it tries:
 *   1. the URLs in missionImages.json
 *   2. NASA's image API (images-api.nasa.gov/asset/<nasaId>), which lists every size of the file
 *   3. a search of the NASA Image Library for the NASA ID
 * The site still works without running this (it loads photos from NASA directly).
 */
import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const list = JSON.parse(await readFile(path.join(root, 'src/data/missionImages.json'), 'utf8'));
const outDir = path.join(root, 'public/images');
await mkdir(outDir, { recursive: true });

const force = process.argv.includes('--force');
const HEADERS = { 'User-Agent': 'cosmic-lost-and-found image downloader (educational project)' };
const SIZE_ORDER = ['~medium.jpg', '~large.jpg', '~small.jpg', '~orig.jpg'];

async function getJson(url) {
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

/** Ask NASA's image API for the real file URLs of a NASA ID, best size first. */
async function urlsFromApi(nasaId) {
  const urls = [];
  try {
    const data = await getJson(`https://images-api.nasa.gov/asset/${encodeURIComponent(nasaId)}`);
    urls.push(...data.collection.items.map((i) => i.href));
  } catch {
    try {
      const data = await getJson(`https://images-api.nasa.gov/search?q=${encodeURIComponent(nasaId)}&media_type=image`);
      const item = data.collection.items.find((i) => i.data?.[0]?.nasa_id?.toLowerCase() === nasaId.toLowerCase()) ?? data.collection.items[0];
      if (item?.href) {
        const manifest = await getJson(item.href);
        urls.push(...manifest);
      }
    } catch {
      /* no API result */
    }
  }
  const jpgs = urls.filter((u) => typeof u === 'string' && /\.jpe?g$/i.test(u)).map((u) => u.replace(/^http:\/\//, 'https://').replace(/ /g, '%20'));
  return jpgs.sort((a, b) => rank(a) - rank(b));
}
const rank = (u) => {
  const i = SIZE_ORDER.findIndex((s) => u.toLowerCase().endsWith(s));
  return i === -1 ? SIZE_ORDER.length : i;
};

async function tryDownload(url, target) {
  const res = await fetch(url, { headers: HEADERS });
  const type = res.headers.get('content-type') ?? '';
  if (!res.ok || !type.startsWith('image/')) throw new Error(`HTTP ${res.status} ${type.split(';')[0]}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 5000) throw new Error('file too small');
  await writeFile(target, buf);
  return buf.length;
}

let ok = 0;
const failed = [];

for (const img of list) {
  const target = path.join(outDir, `${img.id}.jpg`);
  if (!force) {
    try {
      if ((await stat(target)).size > 5000) {
        console.log(`✓ ${img.id} (already downloaded)`);
        ok++;
        continue;
      }
    } catch {
      /* not downloaded yet */
    }
  }

  let saved = false;
  const tried = new Set();
  const attempt = async (urls) => {
    for (const url of urls) {
      if (saved || tried.has(url)) continue;
      tried.add(url);
      try {
        const bytes = await tryDownload(url, target);
        console.log(`✓ ${img.id}  ${(bytes / 1024).toFixed(0)} KB  ← ${url}`);
        saved = true;
      } catch (err) {
        console.warn(`  … ${img.id}: ${url} failed (${err.message})`);
      }
    }
  };

  await attempt([img.src, img.fallbackSrc].filter(Boolean));
  if (!saved && img.nasaId) {
    console.log(`  … ${img.id}: asking NASA's image API for ${img.nasaId}`);
    await attempt(await urlsFromApi(img.nasaId));
  }
  if (saved) ok++;
  else failed.push(img.id);
}

console.log(`\nDownloaded ${ok}/${list.length} images into public/images/`);
if (failed.length) {
  console.log(`Could not download: ${failed.join(', ')}`);
  console.log('Those missions will try NASA directly in the browser, or show the illustration if that fails too.');
}
