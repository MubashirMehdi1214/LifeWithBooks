/**
 * Generate polished cover art for LifeWithBooks original guides (no stock photo available).
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const root = path.join(__dirname, '..');

const GUIDES = {
  'ielts-complete-preparation-guide': {
    gradient: ['#0d47a1', '#1565c0', '#1976d2'],
    kicker: 'OFFICIAL GUIDE',
    headline: 'IELTS',
    sub: 'Complete Preparation',
    badge: 'FREE PDF',
    footer: 'Band 7–8 · 8 Chapters',
    accent: '#ffc107'
  },
  'css-pms-english-essay-guide': {
    gradient: ['#1a237e', '#283593', '#3949ab'],
    kicker: 'CSS / PMS PAKISTAN',
    headline: 'English',
    sub: 'Essay Guide',
    badge: 'FREE PDF',
    footer: '30 Pages · Outlines',
    accent: '#ff9800'
  },
  'ielts-academic-practice-tests-guide': {
    gradient: ['#006064', '#00838f', '#0097a7'],
    kicker: 'IELTS PREP',
    headline: 'Academic',
    sub: 'Practice Tests',
    badge: 'STUDY GUIDE',
    footer: 'LifeWithBooks',
    accent: '#80deea'
  },
  'python-programming-beginner-guide': {
    gradient: ['#1a1a2e', '#16213e', '#0f3460'],
    kicker: 'PROGRAMMING',
    headline: 'Python',
    sub: 'Beginner Guide',
    badge: 'FREE',
    footer: 'LifeWithBooks Team',
    accent: '#ffd54f',
    icon: '🐍'
  },
  '1500-vocabulary-words-for-speaking-english': {
    gradient: ['#b71c1c', '#c62828', '#e53935'],
    kicker: 'VOCABULARY',
    headline: '1500 Words',
    sub: 'Speaking English',
    badge: 'FREE PDF',
    footer: 'Mubashir Mehdi · 15 pages',
    accent: '#ffeb3b'
  },
  '30-topics-for-english-conversation': {
    gradient: ['#0d47a1', '#1565c0', '#1976d2'],
    kicker: 'CONVERSATION',
    headline: '30 Topics',
    sub: 'English Speaking',
    badge: 'FREE PDF',
    footer: 'Mubashir Mehdi · 9 pages',
    accent: '#80cbc4'
  }
};

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function buildSvg(meta) {
  const [c0, c1, c2] = meta.gradient;
  const icon = meta.icon
    ? `<text x="150" y="118" font-size="52" text-anchor="middle">${meta.icon}</text>`
    : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="600" viewBox="0 0 400 600">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c0}"/>
      <stop offset="55%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000" flood-opacity="0.35"/>
    </filter>
  </defs>
  <rect width="400" height="600" fill="url(#bg)"/>
  <rect x="0" y="0" width="28" height="600" fill="rgba(0,0,0,0.22)"/>
  <rect x="28" y="0" width="372" height="88" fill="rgba(255,255,255,0.12)"/>
  <text x="214" y="38" font-family="Arial,sans-serif" font-size="13" font-weight="700" letter-spacing="3" fill="rgba(255,255,255,0.9)" text-anchor="middle">${esc(meta.kicker)}</text>
  <text x="214" y="68" font-family="Georgia,serif" font-size="18" fill="rgba(255,255,255,0.75)" text-anchor="middle">LifeWithBooks</text>
  ${icon}
  <text x="214" y="${meta.icon ? 248 : 220}" font-family="Georgia,serif" font-size="56" font-weight="700" fill="#fff" text-anchor="middle" filter="url(#shadow)">${esc(meta.headline)}</text>
  <text x="214" y="${meta.icon ? 302 : 274}" font-family="Arial,sans-serif" font-size="26" font-weight="600" fill="rgba(255,255,255,0.92)" text-anchor="middle">${esc(meta.sub)}</text>
  <rect x="132" y="340" width="164" height="44" rx="22" fill="${meta.accent}"/>
  <text x="214" y="369" font-family="Arial,sans-serif" font-size="16" font-weight="800" fill="#1a1a1a" text-anchor="middle">${esc(meta.badge)}</text>
  <line x1="72" y1="420" x2="328" y2="420" stroke="rgba(255,255,255,0.25)" stroke-width="2"/>
  <text x="214" y="458" font-family="Arial,sans-serif" font-size="15" fill="rgba(255,255,255,0.8)" text-anchor="middle">${esc(meta.footer)}</text>
  <text x="214" y="560" font-family="Arial,sans-serif" font-size="12" fill="rgba(255,255,255,0.45)" text-anchor="middle">lifewithbooks.co</text>
</svg>`;
}

async function saveCover(id, svg) {
  const outDir = path.join(root, 'covers-img');
  fs.mkdirSync(outDir, { recursive: true });
  const jpgPath = path.join(outDir, id + '.jpg');
  const webpPath = path.join(outDir, id + '.webp');
  const buf = await sharp(Buffer.from(svg)).resize(400, 600, { fit: 'cover' }).jpeg({ quality: 90 }).toBuffer();
  fs.writeFileSync(jpgPath, buf);
  await sharp(buf).webp({ quality: 85 }).toFile(webpPath);
  console.log('OK', id, jpgPath);
}

(async function main() {
  for (const [id, meta] of Object.entries(GUIDES)) {
    await saveCover(id, buildSvg(meta));
  }
  console.log('Done — run: npm run perf-build && npm run seo-pages');
})();
