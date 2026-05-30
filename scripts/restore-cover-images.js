/* Restore book cover thumbnails from legacy Google Drive file IDs.
   Sets coverImage only — does NOT restore pdf download links (AdSense-safe). */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const booksPath = path.join(root, 'js', 'books.js');
const oldPath = path.join(require('os').tmpdir(), 'books-old-restore.js');

function extractDriveId(url) {
  if (!url || url.indexOf('drive.google') === -1) return '';
  const m = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  return m ? m[1] : '';
}

function parseOldDriveMap(source) {
  const map = {};
  const blocks = source.split(/\n  \{/);
  blocks.forEach((block) => {
    const idM = block.match(/"id":\s*"([^"]+)"/) || block.match(/id:\s*"([^"]+)"/);
    const pdfM = block.match(/"pdf":\s*"([^"]+)"/) || block.match(/pdf:\s*"([^"]+)"/);
    if (!idM) return;
    const driveId = pdfM ? extractDriveId(pdfM[1]) : '';
    if (driveId) map[idM[1]] = driveId;
  });
  return map;
}

// Pull legacy books.js from git (pre AdSense classify)
const { execSync } = require('child_process');
let oldSource;
try {
  oldSource = execSync('git show 38a8f94:js/books.js', { cwd: root, encoding: 'utf8' });
} catch (e) {
  console.error('Could not read legacy books.js from git:', e.message);
  process.exit(1);
}

const driveMap = parseOldDriveMap(oldSource);
console.log('Legacy Drive cover IDs found:', Object.keys(driveMap).length);

const { BOOKS, CATEGORIES } = require(booksPath);
let updated = 0;

BOOKS.forEach((book) => {
  const driveId = driveMap[book.id];
  if (!driveId) return;
  const thumb = `https://drive.google.com/thumbnail?id=${driveId}&sz=w1000`;
  if (book.coverImage === thumb) return;
  book.coverImage = thumb;
  updated += 1;
});

const header = '/* Book database for LifeWithBooks (generated/normalized) */\n';
const out =
  header +
  '\nconst BOOKS = ' + JSON.stringify(BOOKS, null, 2) + ';\n' +
  '\nconst CATEGORIES = ' + JSON.stringify(CATEGORIES, null, 2) + ';\n' +
  '\nif (typeof module !== "undefined") {\n  module.exports = { BOOKS, CATEGORIES };\n}\n';

fs.writeFileSync(booksPath, out, 'utf8');
console.log('Updated coverImage on', updated, 'books.');
