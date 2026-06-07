/* Post-upgrade audit — run: node scripts/audit-adsense-upgrade.js */
const path = require('path');
const fs = require('fs');
const root = path.join(__dirname, '..');

const { BOOK_RICH_CONTENT } = require(path.join(root, 'js', 'book-rich-content.js'));
const { CATEGORY_RICH_CONTENT } = require(path.join(root, 'js', 'category-rich-content.js'));
const { CATEGORIES } = require(path.join(root, 'js', 'books.js'));
const { ARTICLES } = require(path.join(root, 'js', 'articles.js'));
const { AUTHORS } = require(path.join(root, 'js', 'authors-data.js'));

const ALIASES = {
  'css-pms-books': 'css-pms-pakistan',
  'health-books': 'health-wellness-books',
  'matric-fsc-notes': 'matric-fsc-books',
  'stories-books': 'kids-stories'
};

function wc(s) {
  if (!s) return 0;
  if (Array.isArray(s)) return s.join(' ').split(/\s+/).filter(Boolean).length;
  return String(s).split(/\s+/).filter(Boolean).length;
}

function bookWords(b) {
  return wc(b.about) + wc(b.learn) + wc(b.authorBio) + wc(b.whyRead) + wc(b.historical)
    + (b.reviews || []).reduce((n, r) => n + wc(r.text), 0);
}

function articleWords(a) {
  const body = a.body || a.content || [];
  return wc(Array.isArray(body) ? body.join(' ') : body);
}

const issues = [];

// 1. Thin books
const thin = Object.entries(BOOK_RICH_CONTENT).filter(([, b]) => bookWords(b) < 600);
if (thin.length) issues.push({ level: 'warn', msg: `${thin.length} books under 600 words`, sample: thin.slice(0, 3).map(([id, b]) => `${id} (${bookWords(b)}w)`) });

// 2. Category coverage
const catSlugs = CATEGORIES.map(c => c.slug);
const missingRich = catSlugs.filter(s => !CATEGORY_RICH_CONTENT[s] && !ALIASES[s]);
if (missingRich.length) issues.push({ level: 'error', msg: 'Categories missing rich content', items: missingRich });

// 3. Broken featured article refs
const articleIds = new Set(ARTICLES.map(a => a.id));
const brokenFeatured = [];
for (const [slug, rich] of Object.entries(CATEGORY_RICH_CONTENT)) {
  for (const id of rich.featuredArticleIds || []) {
    if (!articleIds.has(id)) brokenFeatured.push(`${slug} -> ${id}`);
  }
}
if (brokenFeatured.length) issues.push({ level: 'error', msg: 'Broken featured article refs', items: brokenFeatured });

// 4. Author page files + sitemap
for (const a of AUTHORS) {
  const html = path.join(root, 'author', a.id + '.html');
  if (!fs.existsSync(html)) issues.push({ level: 'error', msg: `Missing author page: ${a.id}.html` });
}

// 5. New + rewrite articles
const mustHave = [
  'complete-history-of-english-literature', 'jules-verne-predicted-the-future',
  'how-to-download-public-domain-books-legally-2026', 'ielts-band-score-complete-guide',
  'charles-dickens-social-justice', 'how-to-prepare-for-ielts-using-free-pdf-books',
  'best-free-classic-novels-to-start-with'
];
for (const id of mustHave) {
  const a = ARTICLES.find(x => x.id === id);
  if (!a) issues.push({ level: 'error', msg: `Missing article: ${id}` });
  else {
    const w = articleWords(a);
    const min = id.includes('complete-history') || id.includes('jules') || id.includes('ielts-band') ? 1500 : 1200;
    if (w < min) issues.push({ level: 'warn', msg: `Article ${id} only ${w} words (expected ${min}+)` });
    const html = path.join(root, 'articles', id + '.html');
    if (!fs.existsSync(html)) issues.push({ level: 'error', msg: `Missing static HTML: articles/${id}.html` });
  }
}

// 6. Duplicate review text (template smell)
const reviewTexts = {};
for (const [id, b] of Object.entries(BOOK_RICH_CONTENT)) {
  for (const r of b.reviews || []) {
    const t = (r.text || '').slice(0, 80);
    if (!reviewTexts[t]) reviewTexts[t] = [];
    reviewTexts[t].push(id);
  }
}
const dupReviews = Object.entries(reviewTexts).filter(([, ids]) => ids.length > 5);
if (dupReviews.length) issues.push({ level: 'warn', msg: `${dupReviews.length} duplicate review snippets across 5+ books`, sample: dupReviews.slice(0, 2).map(([t, ids]) => `"${t}..." on ${ids.length} books`) });

// 7. Generic authorBio on classics
const classics = ['pride-and-prejudice', 'dracula', 'jane-eyre', 'treasure-island', 'oliver-twist'];
for (const id of classics) {
  const b = BOOK_RICH_CONTENT[id];
  if (b && b.authorBio && b.authorBio.includes('public-domain tradition')) {
    issues.push({ level: 'warn', msg: `Classic ${id} still has generic authorBio` });
  }
}

// 8. Homepage author links
const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
for (const a of AUTHORS) {
  if (!index.includes(`author/${a.id}.html`)) issues.push({ level: 'warn', msg: `Homepage missing link to author/${a.id}.html` });
}

// 9. Sitemap author URLs
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
for (const a of AUTHORS) {
  if (!sitemap.includes(`/author/${a.id}.html`)) issues.push({ level: 'error', msg: `Sitemap missing author/${a.id}.html` });
}

// 10. Sample book static pages exist
for (const id of ['pride-and-prejudice', 'twenty-thousand-leagues-under-the-sea', 'ielts-complete-preparation-guide']) {
  const p = path.join(root, 'book', id + '.html');
  if (!fs.existsSync(p)) issues.push({ level: 'error', msg: `Missing book page: ${id}.html` });
  else {
    const html = fs.readFileSync(p, 'utf8');
    if (!html.includes('About This Book')) issues.push({ level: 'error', msg: `Book ${id} missing rich content section` });
  }
}

console.log('=== AdSense Upgrade Audit ===\n');
console.log(`Books: ${Object.keys(BOOK_RICH_CONTENT).length}`);
console.log(`Categories: ${catSlugs.length} (rich keys: ${Object.keys(CATEGORY_RICH_CONTENT).length})`);
console.log(`Articles: ${ARTICLES.length}`);
console.log(`Authors: ${AUTHORS.length}\n`);

if (!issues.length) {
  console.log('No issues found.');
} else {
  for (const i of issues) {
    console.log(`[${i.level.toUpperCase()}] ${i.msg}`);
    if (i.items) i.items.forEach(x => console.log('  -', x));
    if (i.sample) i.sample.forEach(x => console.log('  -', x));
  }
  console.log(`\nTotal: ${issues.filter(i => i.level === 'error').length} errors, ${issues.filter(i => i.level === 'warn').length} warnings`);
  process.exit(issues.some(i => i.level === 'error') ? 1 : 0);
}
