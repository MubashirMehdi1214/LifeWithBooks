/**
 * Refresh covers for homepage trending + hero books (force re-fetch from Google Books / OL).
 * Usage: node scripts/refresh-trending-covers.js
 */
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const sharp = require('sharp');

const root = path.join(__dirname, '..');
const { BOOKS } = require(path.join(root, 'js', 'books.js'));

const FORCE_IDS = [
  'ielts-complete-preparation-guide',
  'css-pms-english-essay-guide',
  'the-adventures-of-sherlock-holmes',
  'aesops-fables',
  'python-programming-beginner-guide'
];

const SEARCH_HINTS = {
  'ielts-complete-preparation-guide': 'IELTS preparation academic',
  'css-pms-english-essay-guide': 'CSS exam essay Pakistan',
  'the-adventures-of-sherlock-holmes': 'Adventures of Sherlock Holmes',
  'aesops-fables': 'Aesop Fables',
  'python-programming-beginner-guide': 'Python programming beginners'
};

function fetchUrl(url) {
  return new Promise((resolve) => {
    const lib = url.startsWith('https') ? https : http;
    lib.get(url, { headers: { 'User-Agent': 'LifeWithBooks-CoverBot/1.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        fetchUrl(res.headers.location).then(resolve);
        return;
      }
      if (res.statusCode !== 200) {
        res.resume();
        resolve(null);
        return;
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', () => resolve(null));
  });
}

async function validate(buf) {
  if (!buf || buf.length < 2000) return false;
  try {
    const m = await sharp(buf).metadata();
    return m.width >= 80 && m.height >= 80;
  } catch {
    return false;
  }
}

async function tryGoogle(query) {
  const api = 'https://www.googleapis.com/books/v1/volumes?q=' + encodeURIComponent(query) + '&maxResults=4';
  const raw = await fetchUrl(api);
  if (!raw) return null;
  try {
    const data = JSON.parse(raw.toString('utf8'));
    for (const item of data.items || []) {
      const links = item.volumeInfo && item.volumeInfo.imageLinks;
      if (!links) continue;
      const url = (links.extraLarge || links.large || links.medium || links.thumbnail || '')
        .replace(/^http:/, 'https:')
        .replace(/&edge=curl/g, '')
        .replace('zoom=1', 'zoom=0');
      if (!url) continue;
      const buf = await fetchUrl(url);
      if (await validate(buf)) return buf;
    }
  } catch (e) {
    console.warn('Google Books:', e.message);
  }
  return null;
}

async function tryOpenLibrary(title) {
  const url = 'https://covers.openlibrary.org/b/title/' + encodeURIComponent(title) + '-L.jpg';
  const buf = await fetchUrl(url);
  if (await validate(buf)) return buf;
  return null;
}

async function saveCover(bookId, buf) {
  const out = path.join(root, 'covers-img');
  fs.mkdirSync(out, { recursive: true });
  const jpg = path.join(out, bookId + '.jpg');
  const normalized = await sharp(buf).resize(400, 600, { fit: 'cover', position: 'centre' }).jpeg({ quality: 88 }).toBuffer();
  fs.writeFileSync(jpg, normalized);
  await sharp(normalized).webp({ quality: 85 }).toFile(path.join(out, bookId + '.webp'));
  return 'covers-img/' + bookId + '.jpg';
}

function patchBooksJs(bookId, coverPath) {
  let text = fs.readFileSync(path.join(root, 'js', 'books.js'), 'utf8');
  const esc = bookId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp('("id":\\s*"' + esc + '"[\\s\\S]*?"coverImage":\\s*")[^"]*(")');
  if (!re.test(text)) {
    console.warn('No coverImage field for', bookId);
    return;
  }
  text = text.replace(re, '$1' + coverPath + '$2');
  fs.writeFileSync(path.join(root, 'js', 'books.js'), text, 'utf8');
}

(async () => {
  for (const id of FORCE_IDS) {
    const book = BOOKS.find((b) => b.id === id);
    if (!book) continue;
    const q = SEARCH_HINTS[id] || book.title;
    console.log('Refreshing:', book.title);
    let buf = await tryGoogle('intitle:' + q);
    if (buf) console.log('  Google Books OK');
    if (!buf) {
      buf = await tryOpenLibrary(q);
      if (buf) console.log('  Open Library OK');
    }
    if (!buf) {
      console.log('  SKIP — no remote cover found (keeping existing file if any)');
      continue;
    }
    const coverPath = await saveCover(id, buf);
    patchBooksJs(id, coverPath);
    console.log('  Saved', coverPath);
  }
  console.log('Done. Run: npm run perf-build && npm run seo-pages');
})();
