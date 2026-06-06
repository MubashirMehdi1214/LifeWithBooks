/**
 * Import PDFs from pdfs/pdfspart2/ and wire to books.js + downloads/.
 * Usage: node scripts/import-pdfspart2-guides.js [book-id ...]
 *        node scripts/import-pdfspart2-guides.js --first 15
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const sharp = require('sharp');

const root = path.join(__dirname, '..');
const PART2 = path.join(root, 'pdfs', 'pdfspart2');
const DOWNLOADS = path.join(root, 'downloads');
const COVERS = path.join(root, 'covers-img');
const booksPath = path.join(root, 'js', 'books.js');

const FIRST_N = process.argv.includes('--first')
  ? parseInt(process.argv[process.argv.indexOf('--first') + 1], 10)
  : 0;

function parseFirstNIds(n) {
  const txt = fs.readFileSync(path.join(PART2, 'BOOKS-WITHOUT-PDF.txt'), 'utf8');
  const ids = [];
  const re = /^\d+\.\s+.+\n\s+book-id:\s+(\S+)/gm;
  let m;
  while ((m = re.exec(txt)) && ids.length < n) ids.push(m[1]);
  return ids;
}

function listPart2Pdfs() {
  return fs.readdirSync(PART2).filter((f) => /\.pdf$/i.test(f));
}

function pdfBaseName(filename) {
  return filename.replace(/\.pdf$/i, '').replace(/^pdfs_pdfspart2_/i, '');
}

function findSourcePdf(bookId, files) {
  const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
  const target = norm(bookId);
  return files.find((f) => norm(pdfBaseName(f)) === target);
}

function renamePrefixedPdfs() {
  const renamed = [];
  for (const f of listPart2Pdfs()) {
    if (!/^pdfs_pdfspart2_/i.test(f)) continue;
    const to = pdfBaseName(f) + '.pdf';
    const from = path.join(PART2, f);
    const dest = path.join(PART2, to);
    if (fs.existsSync(dest) && path.resolve(from) !== path.resolve(dest)) {
      console.warn('Skip rename — target exists:', to);
      continue;
    }
    fs.renameSync(from, dest);
    renamed.push({ from: f, to });
    console.log('Renamed', f, '→', to);
  }
  return renamed;
}

function allImportableIds(files, books) {
  const ids = [];
  for (const f of files) {
    const base = pdfBaseName(f);
    const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
    const book = books.find((b) => norm(b.id) === norm(base));
    if (book) ids.push(book.id);
  }
  return [...new Set(ids)];
}

function pdfPageCount(filePath) {
  try {
    const out = execSync(
      `python -c "import pypdf; print(len(pypdf.PdfReader(r'${filePath.replace(/\\/g, '\\\\')}').pages))"`,
      { encoding: 'utf8' }
    );
    return parseInt(out.trim(), 10) || 0;
  } catch {
    return 0;
  }
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function wrapTitle(title, maxLen) {
  const words = title.split(/\s+/);
  const lines = [];
  let line = '';
  for (const w of words) {
    const next = line ? line + ' ' + w : w;
    if (next.length > maxLen && line) {
      lines.push(line);
      line = w;
    } else line = next;
  }
  if (line) lines.push(line);
  return lines.slice(0, 3);
}

async function generateCover(book, pageCount) {
  const colors = book.cover === 'grammar' || (book.categories || []).includes('grammar-books')
    ? ['#1a5276', '#2471a3']
    : (book.categories || []).includes('vocabulary-books')
      ? ['#b71c1c', '#c62828']
      : ['#0d47a1', '#1976d2'];
  const lines = wrapTitle(book.title, 22);
  const lineYs = [200, 228, 256].slice(0, lines.length);
  const tspans = lines.map((l, i) =>
    `<tspan x="150" y="${lineYs[i]}">${esc(l)}</tspan>`
  ).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="600" viewBox="0 0 400 600">
  <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="${colors[0]}"/><stop offset="100%" stop-color="${colors[1]}"/>
  </linearGradient></defs>
  <rect width="400" height="600" fill="url(#g)"/>
  <text x="200" y="48" font-family="Arial,sans-serif" font-size="12" font-weight="700" fill="rgba(255,255,255,0.9)" text-anchor="middle">LIFEWITHBOOKS ORIGINAL GUIDE</text>
  <text x="200" y="72" font-family="Arial,sans-serif" font-size="11" fill="rgba(255,255,255,0.75)" text-anchor="middle">Mubashir Mehdi</text>
  <text x="200" y="${lines.length === 1 ? 240 : lines.length === 2 ? 220 : 200}" font-family="Georgia,serif" font-size="22" font-weight="700" fill="#fff" text-anchor="middle">${tspans}</text>
  <rect x="118" y="340" width="164" height="44" rx="22" fill="#ffeb3b"/>
  <text x="200" y="369" font-family="Arial,sans-serif" font-size="16" font-weight="800" fill="#1a1a1a" text-anchor="middle">FREE PDF</text>
  <text x="200" y="420" font-family="Arial,sans-serif" font-size="14" fill="rgba(255,255,255,0.85)" text-anchor="middle">${pageCount ? pageCount + ' pages' : 'Free download'}</text>
</svg>`;
  const jpg = path.join(COVERS, book.id + '.jpg');
  const webp = path.join(COVERS, book.id + '.webp');
  const buf = await sharp(Buffer.from(svg)).resize(400, 600, { fit: 'cover' }).jpeg({ quality: 88 }).toBuffer();
  fs.writeFileSync(jpg, buf);
  await sharp(buf).webp({ quality: 85 }).toFile(webp);
}

function patchBookBlock(src, bookId, pageCount, setCover) {
  const re = new RegExp(
    '("id":\\s*"' + bookId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '"[\\s\\S]*?)(\\n  \\})',
    'm'
  );
  const m = src.match(re);
  if (!m) {
    console.warn('  Block not found:', bookId);
    return src;
  }
  let block = m[1];
  block = block.replace(/"access":\s*"[^"]*"/, '"access": "download"');
  block = block.replace(/"license":\s*"[^"]*"/, '"license": "original"');
  if (!/"author":/.test(block)) {
    block = block.replace(/"title":/, '"author": "Mubashir Mehdi",\n    "title":');
  } else {
    block = block.replace(/"author":\s*"[^"]*"/, '"author": "Mubashir Mehdi"');
  }
  const pdfLine = '"pdf": "downloads/' + bookId + '.pdf"';
  if (/"pdf":/.test(block)) {
    block = block.replace(/"pdf":\s*"[^"]*"/, pdfLine);
  } else {
    block = block.replace(/"cover":\s*"[^"]*",/, (match) => match + '\n    ' + pdfLine + ',\n    "pdfDirect": true,\n    "pageCount": ' + pageCount + ',');
  }
  if (!/"pdfDirect":/.test(block)) {
    block = block.replace(pdfLine, pdfLine + ',\n    "pdfDirect": true');
  }
  if (/"pageCount":/.test(block)) {
    block = block.replace(/"pageCount":\s*\d+/, '"pageCount": ' + pageCount);
  } else if (!/"pageCount":/.test(block)) {
    block = block.replace(/"pdfDirect":\s*true/, '"pdfDirect": true,\n    "pageCount": ' + pageCount);
  }
  const coverImg = '"coverImage": "covers-img/' + bookId + '.jpg"';
  if (setCover) {
    if (/"coverImage":/.test(block)) {
      block = block.replace(/"coverImage":\s*"[^"]*"/, coverImg);
    } else {
      block = block.replace(/"license":\s*"original"/, '"license": "original",\n    ' + coverImg);
    }
  }
  if (!/"blurb":/.test(block) && /"excerpt":\s*"([^"]*)"/.test(block)) {
    block = block.replace(/"excerpt":\s*"([^"]*)"/, (full, ex) => {
      const text = ex.startsWith('Original LifeWithBooks guide')
        ? ex
        : 'Original LifeWithBooks guide — ' + ex;
      return '"excerpt": "' + text.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
    });
  }
  return src.replace(re, block + m[2]);
}

(async function main() {
  if (process.argv.includes('--rename-prefix')) {
    renamePrefixedPdfs();
  }

  let ids = process.argv.slice(2).filter((a) => !a.startsWith('--'));
  if (FIRST_N) ids = parseFirstNIds(FIRST_N);

  delete require.cache[require.resolve(booksPath)];
  let { BOOKS } = require(booksPath);

  if (process.argv.includes('--all')) {
    const files = listPart2Pdfs();
    ids = allImportableIds(files, BOOKS);
    console.log('Auto-detected', ids.length, 'importable PDFs in pdfspart2/');
  }

  if (!ids.length) {
    console.error('Usage: node scripts/import-pdfspart2-guides.js --rename-prefix --all');
    console.error('       node scripts/import-pdfspart2-guides.js --first 15');
    console.error('       node scripts/import-pdfspart2-guides.js book-id ...');
    process.exit(1);
  }

  fs.mkdirSync(DOWNLOADS, { recursive: true });
  const files = listPart2Pdfs();
  let src = fs.readFileSync(booksPath, 'utf8');
  const results = [];

  for (const id of ids) {
    const book = BOOKS.find((b) => b.id === id);
    if (!book) {
      console.warn('Skip unknown id:', id);
      continue;
    }
    const srcFile = findSourcePdf(id, files);
    if (!srcFile) {
      console.warn('Skip — no PDF in pdfspart2:', id);
      continue;
    }
    const from = path.join(PART2, srcFile);
    const dest = path.join(DOWNLOADS, id + '.pdf');
    fs.copyFileSync(from, dest);
    const pages = pdfPageCount(dest);
    if (!/"coverImage":/.test(
      src.match(new RegExp('"id":\\s*"' + id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '"[\\s\\S]*?\\n  \\}'))?.[0] || ''
    )) {
      await generateCover(book, pages);
      src = patchBookBlock(src, id, pages, true);
    } else {
      src = patchBookBlock(src, id, pages, false);
    }
    results.push({ id, title: book.title, pages, file: srcFile });
    console.log('OK', id, '←', srcFile, '(' + pages + ' pages)');
  }

  fs.writeFileSync(booksPath, src, 'utf8');
  console.log('\nImported', results.length, 'of', ids.length, 'books. Run: npm run perf-build && npm run seo-pages');
})();
