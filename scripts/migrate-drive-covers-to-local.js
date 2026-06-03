/**
 * Migrate Google Drive coverImage URLs to local covers-img/{id}.jpg + .webp
 * Prefers PDF page 1 when downloads/{id}.pdf exists; else downloads Drive thumbnail.
 */
const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');
const sharp = require('sharp');

const root = path.join(__dirname, '..');
const booksPath = path.join(root, 'js', 'books.js');
const COVERS = path.join(root, 'covers-img');
const DOWNLOADS = path.join(root, 'downloads');

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

function extractPdfCover(pdfPath, outJpg) {
  const cmd = `python -c "import fitz,sys;d=fitz.open(sys.argv[1]);d[0].get_pixmap(matrix=fitz.Matrix(2,2)).save(sys.argv[2]);d.close()" "${pdfPath.replace(/\\/g, '/')}" "${outJpg.replace(/\\/g, '/')}"`;
  execSync(cmd, { stdio: 'pipe' });
}

async function saveCover(book) {
  const jpg = path.join(COVERS, book.id + '.jpg');
  const webp = path.join(COVERS, book.id + '.webp');
  const pdfRel = book.pdf && book.pdf.replace(/^\//, '');
  const pdfPath = pdfRel ? path.join(root, pdfRel) : null;

  if (pdfPath && fs.existsSync(pdfPath)) {
    extractPdfCover(pdfPath, jpg);
    console.log('PDF cover:', book.id);
  } else if (book.coverImage && book.coverImage.includes('drive.google')) {
    const buf = await fetchBuffer(book.coverImage);
    if (!buf.length || buf.length < 500) {
      throw new Error('Empty or tiny image from Drive for ' + book.id);
    }
    await sharp(buf).jpeg({ quality: 88 }).toFile(jpg);
    console.log('Drive download:', book.id);
  } else {
    console.warn('Skip (no source):', book.id);
    return false;
  }

  const imgBuf = fs.readFileSync(jpg);
  await sharp(imgBuf).resize(400, 600, { fit: 'cover' }).webp({ quality: 85 }).toFile(webp);
  return true;
}

function patchCoverInBooksJs(src, bookId) {
  const coverImg = 'covers-img/' + bookId + '.jpg';
  const re = new RegExp(
    '("id":\\s*"' + bookId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '"[\\s\\S]*?"coverImage":\\s*")[^"]*(")',
    'm'
  );
  return src.replace(re, '$1' + coverImg + '$2');
}

(async function main() {
  delete require.cache[require.resolve(booksPath)];
  const { BOOKS } = require(booksPath);
  const targets = BOOKS.filter((b) => b.coverImage && /drive\.google/i.test(b.coverImage));

  if (!targets.length) {
    console.log('No Drive covers to migrate.');
    return;
  }

  fs.mkdirSync(COVERS, { recursive: true });
  let booksJs = fs.readFileSync(booksPath, 'utf8');
  const ok = [];
  const fail = [];

  for (const book of targets) {
    try {
      if (await saveCover(book)) {
        booksJs = patchCoverInBooksJs(booksJs, book.id);
        ok.push(book.id);
      }
    } catch (e) {
      fail.push({ id: book.id, err: e.message });
      console.error('FAIL', book.id, e.message);
    }
  }

  fs.writeFileSync(booksPath, booksJs, 'utf8');
  console.log('\nMigrated', ok.length, 'covers.');
  if (fail.length) console.log('Failed:', fail);
  console.log('Run: npm run perf-build && npm run seo-pages && npm run sitemap');
})();
