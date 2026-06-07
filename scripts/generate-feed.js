/* Build feed.xml (RSS 2.0) — latest 20 articles. */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const ORIGIN = 'https://www.lifewithbooks.co';

let ARTICLES = [];
try {
  require(path.join(root, 'js', 'articles-more-1.js'));
  require(path.join(root, 'js', 'articles-more-2.js'));
  require(path.join(root, 'js', 'articles-more-3.js'));
  require(path.join(root, 'js', 'articles-more-4.js'));
  require(path.join(root, 'js', 'articles-more-5.js'));
  try { require(path.join(root, 'js', 'articles-more-6.js')); } catch (e) {}
  try { require(path.join(root, 'js', 'articles-more-7.js')); } catch (e) {}
  try { require(path.join(root, 'js', 'articles-adsense-rewrites.js')); } catch (e) {}
  ARTICLES = require(path.join(root, 'js', 'articles.js')).ARTICLES || [];
} catch (e) {
  console.error('Could not load articles:', e.message);
  process.exit(1);
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function toRfc822(dateStr) {
  try {
    return new Date(dateStr + 'T12:00:00Z').toUTCString();
  } catch (e) {
    return new Date().toUTCString();
  }
}

const byDate = (a, b) => (b.date || '').localeCompare(a.date || '');
const isBookPdfGuide = (a) => /^free-.+-pdf-guide$/.test(a.id);
const editorial = ARTICLES.filter(a => !isBookPdfGuide(a)).sort(byDate);
const guides = ARTICLES.filter(isBookPdfGuide).sort(byDate);
const sorted = editorial.slice(0, 12).concat(guides.slice(0, 8));
const lastBuild = sorted.length ? sorted[0].date : new Date().toISOString().slice(0, 10);

const items = sorted.map((a) => {
  const link = ORIGIN + '/articles/' + encodeURIComponent(a.id) + '.html';
  return (
    '    <item>\n' +
    '      <title>' + escapeXml(a.title) + '</title>\n' +
    '      <link>' + link + '</link>\n' +
    '      <guid isPermaLink="true">' + link + '</guid>\n' +
    '      <pubDate>' + toRfc822(a.date) + '</pubDate>\n' +
    '      <description>' + escapeXml(a.excerpt || '') + '</description>\n' +
    '      <author>' + escapeXml(a.author || 'Mubashir Mehdi') + '</author>\n' +
    '    </item>'
  );
});

const xml =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n' +
  '  <channel>\n' +
  '    <title>LifeWithBooks Blog</title>\n' +
  '    <link>' + ORIGIN + '</link>\n' +
  '    <description>Free PDF books and reading guides from LifeWithBooks</description>\n' +
  '    <language>en-us</language>\n' +
  '    <lastBuildDate>' + toRfc822(lastBuild) + '</lastBuildDate>\n' +
  '    <atom:link href="' + ORIGIN + '/feed.xml" rel="self" type="application/rss+xml"/>\n' +
  items.join('\n') + '\n' +
  '  </channel>\n' +
  '</rss>\n';

fs.writeFileSync(path.join(root, 'feed.xml'), xml, 'utf8');
console.log('Feed written:', sorted.length, 'articles (12 editorial + 8 book guides)');
