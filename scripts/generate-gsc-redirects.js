/* Merge GSC 404 cleanup redirects into vercel.json (run after editing rules). */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const vercelPath = path.join(root, 'vercel.json');
const vercel = JSON.parse(fs.readFileSync(vercelPath, 'utf8'));

const ROOT_PAGES = [
  'about.html', 'contact.html', 'all-books.html', 'articles.html',
  'privacy-policy.html', 'terms.html', 'dmca.html', 'disclaimer.html', 'cookie-policy.html'
];
const PREFIXES = ['/book', '/category', '/articles', '/author'];
const CATEGORY_ALIASES = [
  ['classic-novels', 'novels'],
  ['english-learning', 'english-learning-books'],
  ['self-development', 'self-development-books']
];

function redirectKey(r) {
  return r.source + '|' + JSON.stringify(r.has || null);
}

const existing = new Set((vercel.redirects || []).map(redirectKey));
const added = [];

function add(r) {
  const key = redirectKey(r);
  if (existing.has(key)) return;
  existing.add(key);
  added.push(r);
}

for (const prefix of PREFIXES) {
  for (const page of ROOT_PAGES) {
    const dest = '/' + page;
    add({ source: prefix + '/' + page, destination: dest, permanent: true });
    const bare = page.replace(/\.html$/, '');
    add({ source: prefix + '/' + bare, destination: dest, permanent: true });
  }
  add({
    source: prefix + '/category.html',
    has: [{ type: 'query', key: 'cat', value: '(?<cat>[^&]+)' }],
    destination: '/category/:cat.html',
    permanent: true
  });
}

for (const [from, to] of CATEGORY_ALIASES) {
  const dest = '/category/' + to + '.html';
  add({ source: '/category/' + from, destination: dest, permanent: true });
  add({ source: '/category/' + from + '.html', destination: dest, permanent: true });
}

add({
  source: '/category.html',
  has: [{ type: 'query', key: 'cat', value: '(?<cat>[^&]+)' }],
  destination: '/category/:cat.html',
  permanent: true
});

add({ source: '/articles/', destination: '/articles.html', permanent: true });

const gsc404Path = path.join(__dirname, 'gsc-404-redirects.json');
if (fs.existsSync(gsc404Path)) {
  const gsc404 = JSON.parse(fs.readFileSync(gsc404Path, 'utf8'));
  (gsc404.redirects || []).forEach((row) => {
    add({ source: row.from, destination: row.to, permanent: true });
  });
}

let ARTICLES = [];
try {
  require(path.join(root, 'js', 'articles-more-1.js'));
  require(path.join(root, 'js', 'articles-more-2.js'));
  require(path.join(root, 'js', 'articles-more-3.js'));
  require(path.join(root, 'js', 'articles-more-4.js'));
  require(path.join(root, 'js', 'articles-more-5.js'));
  try { require(path.join(root, 'js', 'articles-more-6.js')); } catch (e) {}
  try { require(path.join(root, 'js', 'articles-more-7.js')); } catch (e) {}
  try { require(path.join(root, 'js', 'articles-more-8.js')); } catch (e) {}
  try { require(path.join(root, 'js', 'articles-adsense-rewrites.js')); } catch (e) {}
  ARTICLES = require(path.join(root, 'js', 'articles.js')).ARTICLES || [];
} catch (e) {
  console.warn('Could not load articles for PDF guide redirects:', e.message);
}

ARTICLES.filter((a) => /^free-.+-pdf-guide$/.test(a.id)).forEach((a) => {
  const bookSlug = a.id.replace(/^free-/, '').replace(/-pdf-guide$/, '');
  add({
    source: '/articles/' + a.id + '.html',
    destination: '/book/' + encodeURIComponent(bookSlug) + '.html',
    permanent: true
  });
});

const kept = vercel.redirects || [];
const insertAt = Math.max(0, kept.findIndex((r) => r.source === '/index.html') + 1);
kept.splice(insertAt, 0, ...added);
vercel.redirects = kept;

fs.writeFileSync(vercelPath, JSON.stringify(vercel, null, 2) + '\n', 'utf8');
console.log('Added', added.length, 'GSC cleanup redirects to vercel.json');
