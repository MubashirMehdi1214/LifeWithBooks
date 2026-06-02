/* Rebuild sitemap.xml with all static pages, categories, books and articles. */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const ORIGIN = 'https://www.lifewithbooks.co';

const { BOOKS, CATEGORIES } = require(path.join(root, 'js', 'books.js'));
let ARTICLES = [];
try {
  require(path.join(root, 'js', 'articles-more-1.js'));
  require(path.join(root, 'js', 'articles-more-2.js'));
  require(path.join(root, 'js', 'articles-more-3.js'));
  require(path.join(root, 'js', 'articles-more-4.js'));
  require(path.join(root, 'js', 'articles-more-5.js'));
  ARTICLES = require(path.join(root, 'js', 'articles.js')).ARTICLES || [];
} catch (e) {}

const today = new Date().toISOString().slice(0, 10);

const staticPages = [
  ['/', 'daily', '1.00'],
  ['/all-books.html', 'daily', '0.90'],
  ['/articles.html', 'weekly', '0.80'],
  ['/feed.xml', 'weekly', '0.50'],
  ['/about.html', 'monthly', '0.70'],
  ['/contact.html', 'monthly', '0.70'],
  ['/privacy-policy.html', 'yearly', '0.50'],
  ['/terms.html', 'yearly', '0.50'],
  ['/dmca.html', 'yearly', '0.50'],
  ['/disclaimer.html', 'yearly', '0.50'],
  ['/cookie-policy.html', 'yearly', '0.50']
];

function urlEntry(loc, changefreq, priority) {
  return (
    '  <url>\n' +
    '    <loc>' + ORIGIN + loc + '</loc>\n' +
    '    <lastmod>' + today + '</lastmod>\n' +
    '    <changefreq>' + changefreq + '</changefreq>\n' +
    '    <priority>' + priority + '</priority>\n' +
    '  </url>'
  );
}

function xmlEscapeAttr(s) {
  return String(s).replace(/&/g, '&amp;');
}

const parts = [];
staticPages.forEach(([loc, cf, pr]) => parts.push(urlEntry(loc, cf, pr)));

CATEGORIES.forEach((c) => {
  parts.push(urlEntry('/category.html?cat=' + xmlEscapeAttr(c.slug), 'weekly', '0.80'));
});

BOOKS.forEach((b) => {
  const pr = b.access === 'download' ? '0.70' : '0.60';
  parts.push(urlEntry('/book.html?id=' + xmlEscapeAttr(encodeURIComponent(b.id)), 'weekly', pr));
});

ARTICLES.forEach((a) => {
  parts.push(urlEntry('/article.html?id=' + xmlEscapeAttr(encodeURIComponent(a.id)), 'monthly', '0.65'));
});

const xml =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  parts.join('\n') + '\n' +
  '</urlset>\n';

fs.writeFileSync(path.join(root, 'sitemap.xml'), xml, 'utf8');
console.log('Sitemap written:', parts.length, 'URLs (', BOOKS.length, 'books,', ARTICLES.length, 'articles,', CATEGORIES.length, 'categories ).');
