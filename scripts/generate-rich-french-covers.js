/* Rich content-themed SVG covers for French Learning books. */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const booksPath = path.join(root, 'js', 'books.js');
delete require.cache[require.resolve(booksPath)];
const { BOOKS, CATEGORIES } = require(booksPath);

function xmlEscape(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
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
  return lines.slice(0, 4);
}

function titleBlock(title, y, size, color) {
  const lines = wrapTitle(title, 16);
  const lineHeight = size * 1.12;
  const startY = y - ((lines.length - 1) * lineHeight) / 2;
  const tspans = lines
    .map((ln, i) => `<tspan x="150" dy="${i === 0 ? 0 : lineHeight}" text-anchor="middle">${xmlEscape(ln)}</tspan>`)
    .join('');
  return `<text x="150" y="${startY}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="${size}" font-weight="700" fill="${color}">${tspans}</text>`;
}

function baseCover(opts) {
  const {
    c1, c2, c3, title, subtitle, badge, decor, label
  } = opts;
  const uid = Math.random().toString(36).slice(2, 8);

  let decorSvg = '';
  if (decor === 'speech') {
    decorSvg = `
      <ellipse cx="72" cy="118" rx="38" ry="26" fill="rgba(255,255,255,0.18)"/>
      <ellipse cx="228" cy="108" rx="32" ry="22" fill="rgba(255,255,255,0.12)"/>
      <path d="M58 132 L48 152 L72 138 Z" fill="rgba(255,255,255,0.18)"/>
      <text x="72" y="123" text-anchor="middle" font-family="Arial" font-size="14" fill="#fff">Salut!</text>
      <text x="228" y="113" text-anchor="middle" font-family="Arial" font-size="12" fill="#fff">Voilà</text>`;
  } else if (decor === 'calendar') {
    decorSvg = `
      <rect x="95" y="88" width="110" height="90" rx="6" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.35)" stroke-width="1.5"/>
      <rect x="95" y="88" width="110" height="22" rx="6" fill="rgba(255,255,255,0.25)"/>
      ${[0, 1, 2, 3, 4, 5].map((i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        return `<rect x="${103 + col * 34}" y="${118 + row * 24}" width="26" height="18" rx="3" fill="rgba(255,255,255,${0.12 + (i % 3) * 0.04})"/>`;
      }).join('')}`;
  } else if (decor === 'proverbs') {
    decorSvg = `
      <path d="M40 340 Q150 300 260 340" fill="none" stroke="rgba(255,215,120,0.45)" stroke-width="2"/>
      <circle cx="150" cy="105" r="42" fill="none" stroke="rgba(255,215,120,0.5)" stroke-width="2"/>
      <text x="150" y="112" text-anchor="middle" font-family="Georgia" font-size="28" fill="rgba(255,215,120,0.85)">"</text>`;
  } else if (decor === 'errors') {
    decorSvg = `
      <circle cx="78" cy="108" r="22" fill="rgba(255,255,255,0.15)"/>
      <text x="78" y="115" text-anchor="middle" font-family="Arial" font-size="22" font-weight="700" fill="#ff6b6b">✗</text>
      <circle cx="222" cy="108" r="22" fill="rgba(255,255,255,0.15)"/>
      <text x="222" y="115" text-anchor="middle" font-family="Arial" font-size="22" font-weight="700" fill="#7bed9f">✓</text>`;
  } else if (decor === 'travel') {
    decorSvg = `
      <rect x="40" y="382" width="220" height="6" fill="rgba(255,255,255,0.2)"/>
      <rect x="55" y="382" width="40" height="6" fill="#0055A4"/>
      <rect x="95" y="382" width="40" height="6" fill="#fff"/>
      <rect x="135" y="382" width="40" height="6" fill="#EF4135"/>
      <rect x="175" y="382" width="40" height="6" fill="#009246"/>
      <rect x="215" y="382" width="40" height="6" fill="#fff"/>
      <path d="M150 95 L162 125 H138 Z" fill="rgba(255,255,255,0.85)"/>
      <rect x="142" y="125" width="16" height="28" fill="rgba(255,255,255,0.85)"/>`;
  } else if (decor === 'conversation') {
    decorSvg = `
      <rect x="55" y="95" width="90" height="52" rx="10" fill="rgba(255,255,255,0.2)"/>
      <rect x="155" y="108" width="90" height="44" rx="10" fill="rgba(255,255,255,0.14)"/>
      <text x="100" y="127" text-anchor="middle" font-family="Arial" font-size="11" fill="#fff">Bonjour</text>
      <text x="200" y="136" text-anchor="middle" font-family="Arial" font-size="11" fill="#fff">Comment allez-vous?</text>`;
  } else if (decor === 'speed') {
    decorSvg = `
      <path d="M50 130 L110 100 L170 130 L230 95" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="3" stroke-linecap="round"/>
      <polygon points="230,95 245,88 245,102" fill="rgba(255,255,255,0.5)"/>
      <circle cx="150" cy="108" r="28" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="3"/>
      <line x1="150" y1="108" x2="168" y2="98" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>`;
  } else if (decor === 'workbook') {
    decorSvg = `
      <rect x="58" y="92" width="184" height="58" rx="4" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.25)" stroke-width="1"/>
      ${[0, 1, 2, 3].map((i) => `<line x1="70" y1="${108 + i * 12}" x2="230" y2="${108 + i * 12}" stroke="rgba(255,255,255,0.18)" stroke-width="1"/>`).join('')}
      <rect x="58" y="92" width="8" height="58" fill="${c3 || '#e74c3c'}"/>`;
  } else if (decor === 'translate') {
    decorSvg = `
      <text x="95" y="118" text-anchor="middle" font-family="Arial" font-size="22" font-weight="700" fill="rgba(255,255,255,0.9)">FR</text>
      <text x="205" y="118" text-anchor="middle" font-family="Arial" font-size="22" font-weight="700" fill="rgba(255,255,255,0.9)">EN</text>
      <path d="M120 112 H180" stroke="rgba(255,255,255,0.6)" stroke-width="2" marker-end="url(#arrow${uid})"/>
      <path d="M180 122 H120" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>`;
  } else if (decor === 'school') {
    decorSvg = `
      <rect x="70" y="92" width="160" height="8" fill="rgba(255,255,255,0.25)"/>
      <rect x="70" y="108" width="130" height="6" fill="rgba(255,255,255,0.15)"/>
      <rect x="70" y="122" width="145" height="6" fill="rgba(255,255,255,0.15)"/>
      <rect x="70" y="136" width="120" height="6" fill="rgba(255,255,255,0.15)"/>`;
  }

  const badgeSvg = badge
    ? `<circle cx="150" cy="108" r="36" fill="rgba(0,0,0,0.2)" stroke="rgba(255,255,255,0.45)" stroke-width="2"/>
       <text x="150" y="${badge.length > 3 ? 116 : 118}" text-anchor="middle" font-family="Arial" font-size="${badge.length > 3 ? 20 : 26}" font-weight="800" fill="#ffffff">${xmlEscape(badge)}</text>`
    : '';

  const subtitleSvg = subtitle
    ? `<text x="150" y="268" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="11" font-weight="600" fill="rgba(255,255,255,0.85)" letter-spacing="1">${xmlEscape(subtitle)}</text>`
    : '';

  const badgeCorner = badge && ['speech', 'conversation', 'travel', 'translate', 'speed', 'workbook', 'school'].includes(decor)
    ? `<rect x="208" y="36" width="56" height="32" rx="6" fill="rgba(0,0,0,0.25)" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>
       <text x="236" y="58" text-anchor="middle" font-family="Arial" font-size="${badge.length > 3 ? 14 : 18}" font-weight="800" fill="#ffffff">${xmlEscape(badge)}</text>`
    : '';

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400" width="300" height="400">
  <defs>
    <linearGradient id="bg${uid}" x1="0" y1="0" x2="0.85" y2="1">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
    <linearGradient id="spine${uid}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="rgba(0,0,0,0.32)"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
    </linearGradient>
    <linearGradient id="shine${uid}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="rgba(255,255,255,0.08)"/>
      <stop offset="50%" stop-color="rgba(255,255,255,0)"/>
      <stop offset="100%" stop-color="rgba(255,255,255,0.05)"/>
    </linearGradient>
    <marker id="arrow${uid}" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 Z" fill="rgba(255,255,255,0.6)"/>
    </marker>
  </defs>
  <rect width="300" height="400" fill="url(#bg${uid})"/>
  <rect width="300" height="400" fill="url(#shine${uid})"/>
  <rect x="0" y="0" width="28" height="400" fill="url(#spine${uid})"/>
  ${c3 ? `<rect x="274" y="0" width="6" height="400" fill="${c3}" opacity="0.85"/>` : ''}
  <rect x="18" y="18" width="264" height="364" rx="5" fill="none" stroke="rgba(255,255,255,0.28)" stroke-width="1.5"/>
  ${decorSvg}
  ${badgeCorner}
  ${badge && !['speech', 'conversation', 'travel', 'translate', 'speed', 'workbook', 'school'].includes(decor) ? badgeSvg : ''}
  ${badge && ['calendar', 'errors', 'proverbs'].includes(decor) ? `<text x="150" y="210" text-anchor="middle" font-family="Arial" font-size="42" font-weight="800" fill="rgba(255,255,255,0.92)">${xmlEscape(badge)}</text>` : ''}
  ${titleBlock(title, badge && ['calendar', 'errors', 'proverbs'].includes(decor) ? 248 : 195, 17, '#ffffff')}
  ${subtitleSvg}
  <line x1="60" y1="290" x2="240" y2="290" stroke="rgba(255,255,255,0.35)" stroke-width="1"/>
  <text x="150" y="318" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="9" font-weight="700" fill="rgba(255,255,255,0.75)" letter-spacing="2">LIFEWITHBOOKS</text>
  <text x="150" y="338" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="10" font-weight="700" fill="rgba(255,255,255,0.95)" letter-spacing="1.2">${xmlEscape(label || 'FRENCH LEARNING')}</text>
  <rect x="115" y="352" width="22" height="14" fill="#0055A4"/>
  <rect x="137" y="352" width="22" height="14" fill="#ffffff"/>
  <rect x="159" y="352" width="22" height="14" fill="#EF4135"/>
</svg>`;
}

const FRENCH_DESIGNS = {
  '301-expressions-pour-parler-comme-les-francais': {
    c1: '#c0392b', c2: '#7b241c', c3: '#f39c12',
    subtitle: 'Idiomatic French Expressions',
    badge: '301', decor: 'speech'
  },
  '366-jours-pour-mieux-vous-exprimer-en-francais': {
    c1: '#e67e22', c2: '#a04000', c3: '#f1c40f',
    subtitle: 'One Tip Every Day',
    badge: '366', decor: 'calendar'
  },
  '1600-proverbes-pour-briller': {
    c1: '#9a7b2f', c2: '#5c4a1a', c3: '#f4d03f',
    subtitle: 'French Proverbs & Wisdom',
    badge: '1600', decor: 'proverbs'
  },
  'les-100-fautes-de-francais-les-plus-courantes': {
    c1: '#922b21', c2: '#641e16', c3: '#27ae60',
    subtitle: 'Common Mistakes & Fixes',
    badge: '100', decor: 'errors'
  },
  'rick-steves-french-italian-german-phrase-book': {
    c1: '#2471a3', c2: '#1a5276', c3: '#58d68d',
    subtitle: 'European Travel Phrases',
    badge: '3-in-1',
    decor: 'travel'
  },
  'easy-learning-french-conversation': {
    c1: '#148f77', c2: '#0e6655', c3: '#76d7c4',
    subtitle: 'Everyday French Dialogues',
    decor: 'conversation'
  },
  'learn-french-in-a-hurry': {
    c1: '#f39c12', c2: '#b9770e', c3: '#fff',
    subtitle: 'Fast-Track Essentials',
    decor: 'speed'
  },
  'practice-makes-perfect-french-pronouns-prepositions': {
    c1: '#2c3e50', c2: '#1a252f', c3: '#e74c3c',
    subtitle: 'Pronouns & Prepositions',
    decor: 'workbook'
  },
  'apprendre-a-traduire': {
    c1: '#7d3c98', c2: '#4a235a', c3: '#bb8fce',
    subtitle: 'The Craft of Translation',
    decor: 'translate'
  },
  'letude-pratique-de-la-langue-francaise': {
    c1: '#1e8449', c2: '#145a32', c3: '#f9e79f',
    subtitle: 'Grammar, Spelling & Writing',
    decor: 'school'
  }
};

const coversDir = path.join(root, 'covers');
const frenchBooks = BOOKS.filter((b) => b.categories.includes('french-learning-books'));
let count = 0;

frenchBooks.forEach((book) => {
  const design = FRENCH_DESIGNS[book.id];
  if (!design) return;
  const svg = baseCover({
    title: book.title,
    label: 'FRENCH LEARNING BOOKS',
    ...design
  });
  fs.writeFileSync(path.join(coversDir, book.id + '.svg'), svg, 'utf8');
  book.coverImage = 'covers/' + book.id + '.svg';
  count += 1;
});

const header = '/* Book database for LifeWithBooks (generated/normalized) */\n';
const out =
  header +
  '\nconst BOOKS = ' + JSON.stringify(BOOKS, null, 2) + ';\n' +
  '\nconst CATEGORIES = ' + JSON.stringify(CATEGORIES, null, 2) + ';\n' +
  '\nif (typeof module !== "undefined") {\n  module.exports = { BOOKS, CATEGORIES };\n}\n';

fs.writeFileSync(path.join(root, 'js', 'books.js'), out, 'utf8');
console.log('Generated rich covers for', count, 'French Learning books.');
