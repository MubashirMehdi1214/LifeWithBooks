/* Merge scripts/legacy-books-redirects.json into vercel.json (run after editing the map). */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const vercelPath = path.join(root, 'vercel.json');
const mapPath = path.join(__dirname, 'legacy-books-redirects.json');

const vercel = JSON.parse(fs.readFileSync(vercelPath, 'utf8'));
const map = JSON.parse(fs.readFileSync(mapPath, 'utf8'));

const legacySources = new Set();
const legacyRedirects = [];

for (const row of map.redirects) {
  for (const source of [row.from, row.from + '.html']) {
    legacySources.add(source);
    legacyRedirects.push({
      source,
      destination: row.to,
      permanent: true
    });
  }
}

const kept = (vercel.redirects || []).filter(function (r) {
  return !legacySources.has(r.source);
});

const catchAllIdx = kept.findIndex(function (r) {
  return r.source === '/books/:slug.html' || r.source === '/books/:slug';
});

const insertAt = catchAllIdx >= 0 ? catchAllIdx : kept.length;
kept.splice(insertAt, 0, ...legacyRedirects);

vercel.redirects = kept;
fs.writeFileSync(vercelPath, JSON.stringify(vercel, null, 2) + '\n', 'utf8');
console.log('Added', legacyRedirects.length, 'legacy /books/ redirects to vercel.json');
