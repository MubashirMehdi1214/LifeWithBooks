/**
 * Re-download original Google Drive thumbnails into covers-img/ (local hosting).
 * Does NOT use PDF page 1 — restores the cover art you had on Drive before migration.
 *
 * Usage: node scripts/restore-drive-thumbnails-local.js [book-id ...]
 * Skip longman by default (Drive ID was wrong duplicate of English Unlimited).
 */
const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');
const sharp = require('sharp');

const root = path.join(__dirname, '..');
const booksPath = path.join(root, 'js', 'books.js');
const COVERS = path.join(root, 'covers-img');

const SKIP_DEFAULT = new Set(['longman-photo-dictionary-american-english']);

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    https.get(
      url,
      { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; LifeWithBooks/1.0)' } },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          fetchBuffer(res.headers.location).then(resolve).catch(reject);
          return;
        }
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => resolve(Buffer.concat(chunks)));
        res.on('error', reject);
      }
    ).on('error', reject);
  });
}

function driveMapFromGit() {
  const old = execSync('git show fe00c88:js/books.js', { cwd: root, encoding: 'utf8' });
  const map = {};
  const blocks = old.split(/\n  \{/);
  blocks.forEach((block) => {
    const idM = block.match(/"id":\s*"([^"]+)"/);
    const coverM = block.match(/"coverImage":\s*"([^"]+)"/);
    if (idM && coverM && coverM[1].includes('drive.google')) {
      map[idM[1]] = coverM[1];
    }
  });
  return map;
}

(async function main() {
  const driveMap = driveMapFromGit();
  const onlyIds = process.argv.slice(2).filter(Boolean);
  const skip = new Set(SKIP_DEFAULT);
  if (onlyIds.length) skip.clear();

  let booksJs = fs.readFileSync(booksPath, 'utf8');
  const ids = onlyIds.length ? onlyIds : Object.keys(driveMap);

  for (const id of ids) {
    if (skip.has(id)) {
      console.log('Skip (keep PDF cover):', id);
      continue;
    }
    const url = driveMap[id];
    if (!url) {
      console.warn('No legacy Drive URL:', id);
      continue;
    }
    const jpg = path.join(COVERS, id + '.jpg');
    const webp = path.join(COVERS, id + '.webp');
    const buf = await fetchBuffer(url);
    if (!buf.length || buf.length < 500) {
      console.error('Bad download:', id);
      continue;
    }
    await sharp(buf).jpeg({ quality: 90 }).toFile(jpg);
    await sharp(buf).resize(400, 600, { fit: 'cover' }).webp({ quality: 85 }).toFile(webp);
    const coverImg = 'covers-img/' + id + '.jpg';
    const re = new RegExp(
      '("id":\\s*"' + id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '"[\\s\\S]*?"coverImage":\\s*")[^"]*(")',
      'm'
    );
    booksJs = booksJs.replace(re, '$1' + coverImg + '$2');
    console.log('Restored Drive thumbnail locally:', id);
  }

  fs.writeFileSync(booksPath, booksJs, 'utf8');
  console.log('\nDone. Run: npm run perf-build && npm run seo-pages && npm run sitemap');
})();
