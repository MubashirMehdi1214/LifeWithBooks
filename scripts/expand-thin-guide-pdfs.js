/**
 * Append extended study sections to thin original guide PDFs.
 * Keeps existing Gemini pages; merges new appendix via pdf-lib.
 *
 * Usage: node scripts/expand-thin-guide-pdfs.js [maxPages] [book-id ...]
 * Default: pdfDirect originals with pageCount < 12
 */
const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');
const { LifeWithBooksGuidePdf } = require('./lib/lifewithbooks-guide-pdf');
const { appendixForBook } = require('./lib/guide-appendix-content');

const root = path.join(__dirname, '..');
const booksPath = path.join(root, 'js', 'books.js');
const tmpDir = path.join(root, 'pdfs', '.tmp-appendix');

const args = process.argv.slice(2);
const maxPages = args[0] && /^\d+$/.test(args[0]) ? parseInt(args[0], 10) : 12;
const idsFilter = args.filter((a) => !/^\d+$/.test(a));

delete require.cache[require.resolve(booksPath)];
const { BOOKS } = require(booksPath);

const DISCLAIMER =
  'This extended appendix is original material by Mubashir Mehdi, published by LifeWithBooks (lifewithbooks.co). It supplements the main guide for educational self-study and is not affiliated with any third-party publisher.';

function patchPageCount(src, bookId, pageCount) {
  const re = new RegExp(
    '("id":\\s*"' + bookId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '"[\\s\\S]*?"pageCount":\\s*)\\d+',
    'm'
  );
  return src.replace(re, '$1' + pageCount);
}

async function mergePdfs(basePath, appendixPath, outPath) {
  const baseBytes = fs.readFileSync(basePath);
  const appBytes = fs.readFileSync(appendixPath);
  const merged = await PDFDocument.create();
  const baseDoc = await PDFDocument.load(baseBytes);
  const appDoc = await PDFDocument.load(appBytes);
  const basePages = await merged.copyPages(baseDoc, baseDoc.getPageIndices());
  basePages.forEach((p) => merged.addPage(p));
  const appPages = await merged.copyPages(appDoc, appDoc.getPageIndices());
  appPages.forEach((p) => merged.addPage(p));
  const out = await merged.save();
  fs.writeFileSync(outPath, out);
  return merged.getPageCount();
}

const targets = BOOKS.filter((b) => {
  if (b.license !== 'original' || !b.pdfDirect || !b.pdf) return false;
  if (idsFilter.length) return idsFilter.includes(b.id);
  return (b.pageCount || 0) < maxPages;
});

if (!targets.length) {
  console.log('No books to expand.');
  process.exit(0);
}

fs.mkdirSync(tmpDir, { recursive: true });

let booksJs = fs.readFileSync(booksPath, 'utf8');

(async () => {
  for (const book of targets) {
    const outRel = book.pdf.replace(/^\//, '');
    const outFile = path.join(root, outRel);
    const appendixFile = path.join(tmpDir, book.id + '-appendix.pdf');
    const part2Copy = path.join(root, 'pdfs', 'pdfspart2', book.id + '.pdf');

    if (!fs.existsSync(outFile)) {
      console.warn('Skip (missing PDF):', book.id);
      continue;
    }

    const builder = new LifeWithBooksGuidePdf({
      meta: {
        title: book.title + ' — Study Appendix',
        subtitle: 'Extended practice material — LifeWithBooks'
      },
      blocks: appendixForBook(book),
      outFile: appendixFile,
      introParagraphs: [
        {
          heading: 'How to Use This Appendix',
          text: 'This appendix adds practice exercises, phrase banks, study plans and reference notes aligned with the main guide. Work through one section per study session and review your notes weekly.'
        }
      ],
      coverLines: ['Appendix — Mubashir Mehdi', 'lifewithbooks.co'],
      disclaimer: DISCLAIMER
    });

    builder.run();
    const totalPages = await mergePdfs(outFile, appendixFile, outFile);

    if (fs.existsSync(path.dirname(part2Copy))) {
      fs.copyFileSync(outFile, part2Copy);
    }

    booksJs = patchPageCount(booksJs, book.id, totalPages);
    console.log('Expanded', book.id, book.pageCount, '->', totalPages, 'pages');
  }

  fs.writeFileSync(booksPath, booksJs, 'utf8');
  console.log('\nDone.', targets.length, 'PDFs. Run: npm run perf-build && npm run seo-pages');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
