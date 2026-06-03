/**
 * Fetch real covers for books that only have SVG/placeholder covers.
 * Open Library → Google Books → canvas (title + author + category color).
 * Skips books that already have covers-img/*.jpg|webp|png on disk.
 */
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const sharp = require('sharp');

const root = path.join(__dirname, '..');
const { BOOKS } = require(path.join(root, 'js', 'books.js'));

const TARGET_IDS = [
  'ielts-academic-practice-tests-guide',
  'css-english-essay-writing-guide',
  'python-programming-beginner-guide'
];

const COVER_COLORS = {
  english: ['#1E565C', '#2a747c'],
  novel: ['#4a2c6b', '#7b52ab'],
  business: ['#2c3e50', '#34495e'],
  kids: ['#c0392b', '#e74c3c'],
  vocabulary: ['#c0392b', '#e74c3c'],
  grammar: ['#1a5276', '#2471a3'],
  french: ['#1a5276', '#2980b9']
};

function getAuthor(book) {
  if (book.author) return book.author;
  const ex = book.excerpt || '';
  const m = ex.match(/\bby\s+([A-Z][A-Za-z\s.'-]+)/);
  if (m) return m[1].trim();
  if (book.license === 'public-domain') return 'Public Domain';
  return 'LifeWithBooks';
}

function hasRealCoverFile(book) {
  const img = book.coverImage;
  if (!img) return false;
  if (/\.svg$/i.test(img)) return false;
  if (!/^covers-img[/\\]/i.test(img)) {
    if (/^https?:\/\//i.test(img)) return true;
    return false;
  }
  const rel = img.replace(/^covers-img[/\\]/, '');
  const jpg = path.join(root, 'covers-img', rel);
  const webp = jpg.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  return fs.existsSync(jpg) || (fs.existsSync(webp) && !/\.svg$/i.test(webp));
}

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

async function validateImageBuffer(buf) {
  if (!buf || buf.length < 1200) return false;
  try {
    const meta = await sharp(buf).metadata();
    return meta.width >= 40 && meta.height >= 40;
  } catch {
    return false;
  }
}

async function tryOpenLibrary(title) {
  const url = 'https://covers.openlibrary.org/b/title/' + encodeURIComponent(title) + '-M.jpg';
  const buf = await fetchUrl(url);
  if (await validateImageBuffer(buf)) return buf;
  return null;
}

async function tryGoogleBooks(title, author) {
  const q = encodeURIComponent('intitle:' + title + (author && author !== 'LifeWithBooks' ? ' inauthor:' + author : ''));
  const apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=' + q + '&maxResults=3';
  const raw = await fetchUrl(apiUrl);
  if (!raw) return null;
  try {
    const data = JSON.parse(raw.toString('utf8'));
    const items = data.items || [];
    for (const item of items) {
      const links = item.volumeInfo && item.volumeInfo.imageLinks;
      if (!links) continue;
      const thumb = links.medium || links.thumbnail || links.smallThumbnail;
      if (!thumb) continue;
      const imgUrl = thumb.replace(/^http:/, 'https:').replace(/&edge=curl/g, '').replace('zoom=1', 'zoom=0');
      const buf = await fetchUrl(imgUrl);
      if (await validateImageBuffer(buf)) return buf;
    }
  } catch (e) {
    console.warn('Google Books parse error:', e.message);
  }
  return null;
}

function wrapTitleLines(title, maxLen) {
  const words = title.split(/\s+/);
  const lines = [];
  let line = '';
  for (const w of words) {
    const next = line ? line + ' ' + w : w;
    if (next.length > maxLen && line) {
      lines.push(line);
      line = w;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 4);
}

async function generateCanvasCover(book) {
  const colors = COVER_COLORS[book.cover] || COVER_COLORS.english;
  const author = getAuthor(book);
  const lines = wrapTitleLines(book.title, 22);
  const lineYs = [200, 228, 256, 284].slice(0, lines.length);
  const tspans = lines.map((l, i) =>
    `<tspan x="150" y="${lineYs[i]}">${l.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</tspan>`
  ).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="450">
    <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${colors[0]}"/>
      <stop offset="100%" style="stop-color:${colors[1]}"/>
    </linearGradient></defs>
    <rect width="300" height="450" fill="url(#g)"/>
    <rect x="20" y="20" width="8" height="410" fill="rgba(255,255,255,0.15)" rx="2"/>
    <text font-family="Georgia,serif" font-size="17" font-weight="700" fill="#fff" text-anchor="middle">${tspans}</text>
    <text x="150" y="380" font-family="Arial,sans-serif" font-size="13" fill="rgba(255,255,255,0.85)" text-anchor="middle">${author.replace(/&/g, '&amp;').slice(0, 40)}</text>
    <text x="150" y="410" font-family="Arial,sans-serif" font-size="11" fill="rgba(255,255,255,0.6)" text-anchor="middle">LifeWithBooks</text>
  </svg>`;
  return sharp(Buffer.from(svg)).jpeg({ quality: 88 }).toBuffer();
}

async function saveCover(book, buf) {
  const outDir = path.join(root, 'covers-img');
  fs.mkdirSync(outDir, { recursive: true });
  const jpgPath = path.join(outDir, book.id + '.jpg');
  const webpPath = path.join(outDir, book.id + '.webp');
  const normalized = await sharp(buf).resize(400, 600, { fit: 'cover' }).jpeg({ quality: 85 }).toBuffer();
  fs.writeFileSync(jpgPath, normalized);
  await sharp(normalized).webp({ quality: 82 }).toFile(webpPath);
  return 'covers-img/' + book.id + '.jpg';
}

function updateBooksJs(bookId, coverPath) {
  const booksPath = path.join(root, 'js', 'books.js');
  let text = fs.readFileSync(booksPath, 'utf8');
  const idPattern = new RegExp('("id":\\s*"' + bookId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '"[\\s\\S]*?)(\\n  \\})', 'm');
  const block = text.match(idPattern);
  if (!block) {
    console.warn('Could not find book block:', bookId);
    return;
  }
  const full = block[0];
  if (/\"coverImage\":/.test(full)) {
    text = text.replace(full, full.replace(/"coverImage":\s*"[^"]*"/, '"coverImage": "' + coverPath + '"'));
  } else {
    text = text.replace(full, full.replace(/\n  \}$/, ',\n    "coverImage": "' + coverPath + '"\n  }'));
  }
  fs.writeFileSync(booksPath, text, 'utf8');
}

async function resolveCover(book) {
  if (hasRealCoverFile(book)) {
    console.log('SKIP (real cover exists):', book.id);
    return book.coverImage;
  }
  console.log('Fetching:', book.title);
  let buf = await tryOpenLibrary(book.title);
  if (buf) console.log('  -> Open Library');
  if (!buf) {
    buf = await tryGoogleBooks(book.title, getAuthor(book));
    if (buf) console.log('  -> Google Books');
  }
  if (!buf) {
    console.log('  -> Canvas generated');
    buf = await generateCanvasCover(book);
  }
  const coverPath = await saveCover(book, buf);
  updateBooksJs(book.id, coverPath);
  return coverPath;
}

(async function main() {
  for (const id of TARGET_IDS) {
    const book = BOOKS.find((b) => b.id === id);
    if (!book) {
      console.warn('Book not found:', id);
      continue;
    }
    await resolveCover(book);
  }
  console.log('Done.');
})();
