/**
 * List books missing PDF with title + content brief for Gemini.
 * Output: pdfs/pdfspart2/BOOKS-WITHOUT-PDF.txt
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const { BOOKS } = require(path.join(root, 'js', 'books.js'));

function hasSitePdf(book) {
  if (book.pdfDirect && book.pdf) return true;
  const p = (book.pdf || '').replace(/^\//, '');
  if (/^downloads\//i.test(p)) return fs.existsSync(path.join(root, p));
  if (/^pdfs\//i.test(p)) return fs.existsSync(path.join(root, p));
  return false;
}

function stripMd(text) {
  return String(text)
    .replace(/^##+\s*/gm, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

function contentBrief(book) {
  const parts = [];
  if (book.excerpt) parts.push(stripMd(book.excerpt));
  if (Array.isArray(book.description)) {
    book.description.forEach((block) => {
      const t = stripMd(block);
      if (t && !parts.includes(t)) parts.push(t);
    });
  }
  if (book.blurb) parts.push(stripMd(book.blurb));
  const joined = parts.join(' ');
  if (joined.length > 900) return joined.slice(0, 897) + '...';
  return joined || 'Original study guide by Mubashir Mehdi for LifeWithBooks readers.';
}

const missing = BOOKS.filter((b) => !hasSitePdf(b));
const lines = [];

lines.push('BOOKS WITHOUT PDF — TITLES + WHAT TO WRITE IN EACH BOOK');
lines.push('For Gemini: author Mubashir Mehdi, LifeWithBooks, original guide (not a copy of any publisher book).');
lines.push('Save each PDF as: pdfs/pdfspart2/{book-id}.pdf');
lines.push('Total: ' + missing.length + ' books');
lines.push('');

missing.forEach((book, i) => {
  lines.push('--------------------------------------------------------------------------------');
  lines.push((i + 1) + '. ' + book.title);
  lines.push('   book-id: ' + book.id);
  lines.push('   save-as: pdfs/pdfspart2/' + book.id + '.pdf');
  if (book.categories && book.categories.length) {
    lines.push('   category: ' + book.categories.join(', '));
  }
  lines.push('   WHAT TO INCLUDE IN THIS PDF:');
  const brief = contentBrief(book);
  const chunks = brief.match(/.{1,110}(\s|$)/g) || [brief];
  chunks.forEach((chunk) => {
    lines.push('   ' + chunk.trim());
  });
  lines.push('');
});

const outPath = path.join(root, 'pdfs', 'pdfspart2', 'BOOKS-WITHOUT-PDF.txt');
fs.writeFileSync(outPath, lines.join('\n'), 'utf8');
console.log('Wrote', outPath, '(' + missing.length + ' books)');
