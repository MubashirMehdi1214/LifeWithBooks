/* Rebuild sitemap.xml + image sitemap + news sitemap. */
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
  try { require(path.join(root, 'js', 'articles-more-6.js')); } catch (e) {}
  try { require(path.join(root, 'js', 'articles-more-7.js')); } catch (e) {}
  try { require(path.join(root, 'js', 'articles-more-8.js')); } catch (e) {}
  try { require(path.join(root, 'js', 'articles-adsense-rewrites.js')); } catch (e) {}
  ARTICLES = require(path.join(root, 'js', 'articles.js')).ARTICLES || [];
} catch (e) {}
const { AUTHORS } = require(path.join(root, 'js', 'authors-data.js'));

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

const parts = [];
const seen = new Set();

function pagePath(loc) {
  if (loc === '/') return path.join(root, 'index.html');
  const rel = loc.replace(/^\//, '');
  return path.join(root, rel);
}

function isIndexablePage(loc) {
  const fp = pagePath(loc);
  if (!fs.existsSync(fp)) return false;
  const html = fs.readFileSync(fp, 'utf8');
  return !/noindex/i.test(html);
}

function add(loc, cf, pr) {
  if (seen.has(loc)) return;
  if (!isIndexablePage(loc)) return;
  seen.add(loc);
  parts.push(urlEntry(loc, cf, pr));
}

staticPages.forEach(([loc, cf, pr]) => add(loc, cf, pr));

CATEGORIES.forEach((c) => {
  add('/category/' + c.slug + '.html', 'weekly', '0.85');
});

BOOKS.forEach((b) => {
  if ((b.access === 'summary' || b.license === 'reference') && !b.pdfDirect) return;
  const pr = b.access === 'download' ? '0.75' : '0.65';
  add('/book/' + encodeURIComponent(b.id) + '.html', 'weekly', pr);
});

ARTICLES.forEach((a) => {
  if (/^free-.+-pdf-guide$/.test(a.id)) return;
  add('/articles/' + encodeURIComponent(a.id) + '.html', 'monthly', '0.70');
});

AUTHORS.forEach((author) => {
  add('/author/' + encodeURIComponent(author.id) + '.html', 'monthly', '0.65');
});

const xml =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  parts.join('\n') + '\n' +
  '</urlset>\n';

fs.writeFileSync(path.join(root, 'sitemap.xml'), xml, 'utf8');

function bookCoverUrl(book) {
  if (book.coverImage && !/^https?:\/\//i.test(book.coverImage)) {
    const webp = book.coverImage.replace(/\.(jpg|jpeg|png)$/i, '.webp').replace(/^\//, '');
    return ORIGIN + '/' + webp;
  }
  return ORIGIN + '/og/books/' + book.id + '.webp';
}

const imageParts = BOOKS.filter((b) => {
  if ((b.access === 'summary' || b.license === 'reference') && !b.pdfDirect) return false;
  if (!(b.access === 'download' || b.coverImage)) return false;
  return isIndexablePage('/book/' + encodeURIComponent(b.id) + '.html');
}).slice(0, 500).map((b) => {
  const page = ORIGIN + '/book/' + encodeURIComponent(b.id) + '.html';
  const img = bookCoverUrl(b);
  return (
    '  <url>\n' +
    '    <loc>' + page + '</loc>\n' +
    '    <image:image xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n' +
    '      <image:loc>' + img + '</image:loc>\n' +
    '      <image:title>' + String(b.title).replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</image:title>\n' +
    '    </image:image>\n' +
    '  </url>'
  );
});

const imageXml =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n' +
  imageParts.join('\n') + '\n' +
  '</urlset>\n';

fs.writeFileSync(path.join(root, 'sitemap-images.xml'), imageXml, 'utf8');

const recentArticles = ARTICLES.filter(a => !/^free-.+-pdf-guide$/.test(a.id))
  .slice().sort((a, b) => (b.date || '').localeCompare(a.date || '')).slice(0, 100);
const newsParts = recentArticles.map(a => {
  const loc = ORIGIN + '/articles/' + encodeURIComponent(a.id) + '.html';
  return (
    '  <url>\n' +
    '    <loc>' + loc + '</loc>\n' +
    '    <news:news xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n' +
    '      <news:publication>\n' +
    '        <news:name>LifeWithBooks</news:name>\n' +
    '        <news:language>en</news:language>\n' +
    '      </news:publication>\n' +
    '      <news:publication_date>' + (a.date || today) + '</news:publication_date>\n' +
    '      <news:title>' + String(a.title).replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</news:title>\n' +
    '    </news:news>\n' +
    '  </url>'
  );
});

const newsXml =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n' +
  newsParts.join('\n') + '\n' +
  '</urlset>\n';

fs.writeFileSync(path.join(root, 'sitemap-news.xml'), newsXml, 'utf8');

console.log('Sitemap written:', parts.length, 'URLs');
console.log('Image sitemap:', imageParts.length, 'book covers');
console.log('News sitemap:', newsParts.length, 'articles');
