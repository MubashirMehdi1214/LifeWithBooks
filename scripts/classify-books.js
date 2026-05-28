/* Classify every book as a legal download or a safe summary page.
   - pdfs/...            -> access "download", license "public-domain"
   - healthfruitstips    -> access "download", license "original"  (repointed locally by build-health-pdfs.js)
   - drive / techsipweb  -> access "summary",  license "reference" (pdf removed)
   - no pdf              -> access "summary",  license "reference"
   Re-serializes js/books.js from the authoritative data so it stays valid. */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const booksPath = path.join(root, 'js', 'books.js');
const { BOOKS, CATEGORIES } = require(booksPath);

let downloads = 0;
let summaries = 0;

BOOKS.forEach((book) => {
  const pdf = book.pdf || '';
  const isLocal = pdf.indexOf('pdfs/') === 0;
  const isHealth = pdf.indexOf('healthfruitstips') !== -1;
  const isRisky = pdf.indexOf('drive.google') !== -1 || pdf.indexOf('techsipweb') !== -1;

  if (isLocal) {
    book.access = 'download';
    book.license = 'public-domain';
    downloads += 1;
  } else if (isHealth) {
    book.access = 'download';
    book.license = 'original';
    downloads += 1;
  } else if (isRisky || !pdf) {
    book.access = 'summary';
    book.license = 'reference';
    if (book.pdf) delete book.pdf;
    summaries += 1;
  } else {
    book.access = 'summary';
    book.license = 'reference';
    if (book.pdf) delete book.pdf;
    summaries += 1;
  }
});

const header = '/* Book database for LifeWithBooks (generated/normalized) */\n';
const out =
  header +
  '\nconst BOOKS = ' + JSON.stringify(BOOKS, null, 2) + ';\n' +
  '\nconst CATEGORIES = ' + JSON.stringify(CATEGORIES, null, 2) + ';\n' +
  '\nif (typeof module !== "undefined") {\n  module.exports = { BOOKS, CATEGORIES };\n}\n';

fs.writeFileSync(booksPath, out, 'utf8');
console.log('Classified', BOOKS.length, 'books =>', downloads, 'downloads,', summaries, 'summaries.');
