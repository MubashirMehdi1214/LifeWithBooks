/* Find likely 404 sources: missing book HTML, bad category slugs, broken redirect targets */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const vercel = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8'));

function exists(rel) {
  return fs.existsSync(path.join(root, rel));
}

const books = require(path.join(root, 'js/books.js')).BOOKS || [];
const bookIds = new Set(books.map((b) => b.id));
const htmlBooks = new Set(
  fs.readdirSync(path.join(root, 'book')).filter((f) => f.endsWith('.html')).map((f) => f.replace(/\.html$/, ''))
);

const missingHtml = [...bookIds].filter((id) => !htmlBooks.has(id));

const redirects = vercel.redirects || [];
const brokenDest = redirects.filter((r) => {
  const dest = (r.destination || '').replace(/^\//, '').split('?')[0];
  if (!dest || dest.includes(':')) return false;
  return !exists(dest);
});

const categories = fs
  .readdirSync(path.join(root, 'category'))
  .filter((f) => f.endsWith('.html'))
  .map((f) => f.replace(/\.html$/, ''));

const knownBadCategories = [
  'classic-novels',
  'english-learning',
  'self-development',
  'all-books',
  'articles',
];

console.log('=== MISSING BOOK HTML (in books.js) ===');
console.log(missingHtml.length);
missingHtml.forEach((id) => console.log(' ', id));

console.log('\n=== BROKEN REDIRECT DESTINATIONS ===');
console.log(brokenDest.length);
brokenDest.forEach((r) => console.log(' ', r.source, '->', r.destination));

console.log('\n=== CATEGORY SLUGS (exist) ===');
console.log(categories.length);

console.log('\n=== KNOWN BAD CATEGORY SLUGS (need redirect?) ===');
knownBadCategories.forEach((slug) => {
  const file = `category/${slug}.html`;
  console.log(slug, exists(file) ? 'EXISTS' : 'MISSING');
});
