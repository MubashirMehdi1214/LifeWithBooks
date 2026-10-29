/**
 * Inject AdSense verification script into HTML <head> when missing.
 * Usage: node scripts/add-adsense-snippet.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SNIPPET =
  '  <!-- Google AdSense (site verification + ads) -->\n' +
  '  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5913415234423873" crossorigin="anonymous"></script>\n';

const ROOT_FILES = [
  'index.html',
  'all-books.html',
  'about.html',
  'articles.html',
  'article.html',
  'book.html',
  'category.html',
  'contact.html',
  'cookie-policy.html',
  'disclaimer.html',
  'dmca.html',
  'download.html',
  'privacy-policy.html',
  'terms.html',
  '404.html'
];

const DIRS = ['book', 'articles', 'category', 'author'];

function listHtmlFiles() {
  const files = ROOT_FILES.map((f) => path.join(ROOT, f));
  for (const dir of DIRS) {
    const abs = path.join(ROOT, dir);
    if (!fs.existsSync(abs)) continue;
    for (const name of fs.readdirSync(abs)) {
      if (name.endsWith('.html')) files.push(path.join(abs, name));
    }
  }
  return files.filter((f) => fs.existsSync(f));
}

function inject(html) {
  if (html.includes('adsbygoogle.js')) return null;
  if (!html.includes('</head>')) return null;
  return html.replace('</head>', SNIPPET + '</head>');
}

let updated = 0;
let skipped = 0;
for (const file of listHtmlFiles()) {
  const html = fs.readFileSync(file, 'utf8');
  const next = inject(html);
  if (!next) {
    skipped += 1;
    continue;
  }
  fs.writeFileSync(file, next);
  updated += 1;
}

console.log('AdSense snippet added to', updated, 'files;', skipped, 'already had it or skipped.');
