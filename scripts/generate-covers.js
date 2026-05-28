/* Generate SVG book covers and Open Graph images for LifeWithBooks */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const { BOOKS, CATEGORIES } = require(path.join(root, 'js', 'books.js'));

const COVER_THEMES = {
  english: ['#1E565C', '#2a747c'],
  french: ['#213a8a', '#3b5fbf'],
  german: ['#6b2424', '#a14444'],
  spanish: ['#b25a17', '#d6802a'],
  vocabulary: ['#4a3266', '#6f4ea0'],
  grammar: ['#1f6b3a', '#2f9a55'],
  kids: ['#c44b7d', '#e07caa'],
  self: ['#aa7619', '#dba23a'],
  business: ['#1c2e4a', '#2f4a78'],
  literature: ['#7a2424', '#b04545'],
  health: ['#0d6b4f', '#2ecc71'],
  novel: ['#4a2c6b', '#7b52ab'],
  trading: ['#0f4c5c', '#1a8a9e'],
  adventure: ['#8b4513', '#d2691e']
};

function xmlEscape(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function wrapTitle(title, maxLen) {
  const words = title.split(/\s+/);
  const lines = [];
  let line = '';
  words.forEach((w) => {
    const next = line ? line + ' ' + w : w;
    if (next.length > maxLen && line) {
      lines.push(line);
      line = w;
    } else {
      line = next;
    }
  });
  if (line) lines.push(line);
  return lines.slice(0, 5);
}

function bookCoverSvg(book, categoryLabel) {
  const theme = COVER_THEMES[book.cover] || COVER_THEMES.english;
  const lines = wrapTitle(book.title, 22);
  const titleY = 118 - (lines.length - 1) * 8;
  const titleSvg = lines
    .map((ln, i) => `<tspan x="150" dy="${i === 0 ? 0 : 26}" text-anchor="middle">${xmlEscape(ln)}</tspan>`)
    .join('');
  const label = xmlEscape(categoryLabel || 'Free PDF');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400" width="300" height="400">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${theme[0]}"/>
      <stop offset="100%" stop-color="${theme[1]}"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000" flood-opacity="0.25"/>
    </filter>
  </defs>
  <rect width="300" height="400" fill="#f5f0e8"/>
  <g filter="url(#shadow)">
    <path d="M55 40 H215 A12 12 0 0 1 227 52 V360 H67 A12 12 0 0 1 55 348 Z" fill="url(#bg)"/>
    <path d="M55 40 H215 A12 12 0 0 1 227 52 V72 H55 Z" fill="rgba(0,0,0,0.12)"/>
    <rect x="72" y="52" width="6" height="296" rx="2" fill="rgba(255,255,255,0.2)"/>
  </g>
  <text x="150" y="36" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="11" font-weight="700" fill="#1E565C" letter-spacing="2">LIFEWITHBOOKS</text>
  <text x="150" y="${titleY}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="17" font-weight="700" fill="#ffffff">${titleSvg}</text>
  <rect x="78" y="318" width="144" height="28" rx="14" fill="rgba(255,255,255,0.18)"/>
  <text x="150" y="337" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="1">${label}</text>
  <text x="150" y="378" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="10" fill="#888">FREE PDF</text>
</svg>`;
}

function ogSiteSvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1E565C"/>
      <stop offset="100%" stop-color="#2a747c"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="80" y="80" width="200" height="260" rx="10" fill="#faf0e2" opacity="0.95"/>
  <rect x="110" y="110" width="140" height="18" rx="4" fill="#1E565C" opacity="0.3"/>
  <rect x="110" y="140" width="120" height="12" rx="3" fill="#1E565C" opacity="0.2"/>
  <rect x="110" y="162" width="130" height="12" rx="3" fill="#1E565C" opacity="0.2"/>
  <rect x="300" y="120" width="200" height="260" rx="10" fill="#213a8a" opacity="0.9"/>
  <rect x="520" y="100" width="200" height="280" rx="10" fill="#6b2424" opacity="0.9"/>
  <rect x="740" y="130" width="200" height="250" rx="10" fill="#1f6b3a" opacity="0.9"/>
  <rect x="960" y="110" width="180" height="270" rx="10" fill="#c44b7d" opacity="0.9"/>
  <text x="600" y="420" text-anchor="middle" font-family="Georgia, serif" font-size="72" font-weight="700" fill="#ffffff">LifeWithBooks</text>
  <text x="600" y="490" text-anchor="middle" font-family="Arial, sans-serif" font-size="32" fill="#faf0e2">Free PDF Library — Language, Health &amp; Classic Books</text>
  <text x="600" y="560" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="rgba(255,255,255,0.85)">www.lifewithbooks.co</text>
</svg>`;
}

function ogCategorySvg(label, colors) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${colors[0]}"/>
      <stop offset="100%" stop-color="${colors[1]}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <text x="600" y="280" text-anchor="middle" font-family="Georgia, serif" font-size="64" font-weight="700" fill="#ffffff">${xmlEscape(label)}</text>
  <text x="600" y="360" text-anchor="middle" font-family="Arial, sans-serif" font-size="30" fill="rgba(255,255,255,0.92)">Free PDF downloads on LifeWithBooks</text>
  <text x="600" y="520" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" fill="rgba(255,255,255,0.8)">www.lifewithbooks.co</text>
</svg>`;
}

const coversDir = path.join(root, 'covers');
const ogDir = path.join(root, 'og', 'categories');
const ogBooksDir = path.join(root, 'og', 'books');
fs.mkdirSync(coversDir, { recursive: true });
fs.mkdirSync(ogDir, { recursive: true });
fs.mkdirSync(ogBooksDir, { recursive: true });

function shareBookOgSvg(book, categoryLabel) {
  const theme = COVER_THEMES[book.cover] || COVER_THEMES.english;
  const lines = wrapTitle(book.title, 28);
  const titleSvg = lines
    .map((ln, i) => `<tspan x="620" dy="${i === 0 ? 0 : 38}" text-anchor="middle">${xmlEscape(ln)}</tspan>`)
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${theme[0]}"/>
      <stop offset="100%" stop-color="${theme[1]}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#f5f0e8"/>
  <rect width="1200" height="630" fill="url(#bg)" opacity="0.15"/>
  <g transform="translate(200 95)">
    <path d="M55 40 H215 A12 12 0 0 1 227 52 V360 H67 A12 12 0 0 1 55 348 Z" fill="url(#bg)"/>
    <path d="M55 40 H215 A12 12 0 0 1 227 52 V72 H55 Z" fill="rgba(0,0,0,0.12)"/>
    <text x="140" y="130" text-anchor="middle" font-family="Georgia, serif" font-size="20" font-weight="700" fill="#ffffff">${titleSvg}</text>
    <text x="140" y="330" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="700" fill="#ffffff">${xmlEscape(categoryLabel)}</text>
  </g>
  <text x="620" y="200" font-family="Georgia, serif" font-size="52" font-weight="700" fill="#1E565C">${titleSvg}</text>
  <text x="620" y="420" font-family="Arial, sans-serif" font-size="26" fill="#555">${xmlEscape((book.excerpt || '').slice(0, 90))}…</text>
  <text x="620" y="520" font-family="Arial, sans-serif" font-size="24" fill="#1E565C" font-weight="700">LifeWithBooks — Free PDF</text>
  <text x="620" y="560" font-family="Arial, sans-serif" font-size="20" fill="#888">www.lifewithbooks.co</text>
</svg>`;
}

const catLabelBySlug = Object.fromEntries(CATEGORIES.map((c) => [c.slug, c.label]));
const catCoverBySlug = Object.fromEntries(
  CATEGORIES.map((c) => {
    const sample = BOOKS.find((b) => b.categories.includes(c.slug));
    return [c.slug, sample ? sample.cover : 'english'];
  })
);

let count = 0;
BOOKS.forEach((book) => {
  const primary = book.categories[0] || 'english-learning-books';
  const label = catLabelBySlug[primary] || 'Book';
  const file = path.join(coversDir, book.id + '.svg');
  fs.writeFileSync(file, bookCoverSvg(book, label), 'utf8');
  fs.writeFileSync(path.join(ogBooksDir, book.id + '.svg'), shareBookOgSvg(book, label), 'utf8');
  count += 1;
});

fs.writeFileSync(path.join(root, 'og-image.svg'), ogSiteSvg(), 'utf8');

CATEGORIES.forEach((cat) => {
  const coverKey = catCoverBySlug[cat.slug] || 'english';
  const colors = COVER_THEMES[coverKey] || COVER_THEMES.english;
  fs.writeFileSync(path.join(ogDir, cat.slug + '.svg'), ogCategorySvg(cat.label, colors), 'utf8');
});

console.log('Generated', count, 'book covers, og-image.svg, and', CATEGORIES.length, 'category OG images.');
