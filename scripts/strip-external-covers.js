/* Remove dead external coverImage URLs so books fall back to local branded covers. */
const fs = require('fs');
const path = require('path');
const booksPath = path.join(__dirname, '..', 'js', 'books.js');
const { BOOKS, CATEGORIES } = require(booksPath);

let n = 0;
BOOKS.forEach((b) => {
  if (b.coverImage && /healthfruitstips/i.test(b.coverImage)) {
    delete b.coverImage;
    n += 1;
  }
});

const out =
  '/* Book database for LifeWithBooks (generated/normalized) */\n' +
  '\nconst BOOKS = ' + JSON.stringify(BOOKS, null, 2) + ';\n' +
  '\nconst CATEGORIES = ' + JSON.stringify(CATEGORIES, null, 2) + ';\n' +
  '\nif (typeof module !== "undefined") {\n  module.exports = { BOOKS, CATEGORIES };\n}\n';
fs.writeFileSync(booksPath, out, 'utf8');

const left = BOOKS.filter((x) => /healthfruitstips/i.test(JSON.stringify(x))).length;
console.log('Removed', n, 'external covers. Remaining healthfruitstips refs:', left);
