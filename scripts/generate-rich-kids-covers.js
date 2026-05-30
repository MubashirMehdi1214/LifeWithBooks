/* Rich playful / storybook SVG covers for Kids Learning books.
   Inspired by classic illustrated covers (Alice, Wizard of Oz). */
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
  const lines = wrapTitle(title, 15);
  const lineHeight = size * 1.1;
  const startY = y - ((lines.length - 1) * lineHeight) / 2;
  const tspans = lines
    .map((ln, i) => `<tspan x="150" dy="${i === 0 ? 0 : lineHeight}" text-anchor="middle">${xmlEscape(ln)}</tspan>`)
    .join('');
  return `<text x="150" y="${startY}" text-anchor="middle" font-family="Georgia, 'Palatino Linotype', serif" font-size="${size}" font-weight="700" fill="${color}">${tspans}</text>`;
}

function kidsFooter(label) {
  return `
  <line x1="50" y1="288" x2="250" y2="288" stroke="rgba(255,255,255,0.35)" stroke-width="1"/>
  <text x="150" y="312" text-anchor="middle" font-family="Arial" font-size="9" font-weight="700" fill="rgba(255,255,255,0.8)" letter-spacing="2">LIFEWITHBOOKS</text>
  <text x="150" y="332" text-anchor="middle" font-family="Arial" font-size="10" font-weight="700" fill="#fff" letter-spacing="1">${xmlEscape(label)}</text>
  <circle cx="118" cy="358" r="5" fill="#ff6b6b"/>
  <circle cx="136" cy="358" r="5" fill="#ffd93d"/>
  <circle cx="154" cy="358" r="5" fill="#6bcb77"/>
  <circle cx="172" cy="358" r="5" fill="#4d96ff"/>
  <circle cx="190" cy="358" r="5" fill="#c77dff"/>`;
}

function getDecorSvg(decor, c3, uid) {
  const d = {
    alphabet: `
      <rect x="88" y="92" width="36" height="36" rx="4" fill="#e74c3c" transform="rotate(-8 106 110)"/>
      <text x="106" y="116" text-anchor="middle" font-family="Arial" font-size="20" font-weight="800" fill="#fff">A</text>
      <rect x="132" y="88" width="36" height="36" rx="4" fill="#3498db"/>
      <text x="150" y="112" text-anchor="middle" font-family="Arial" font-size="20" font-weight="800" fill="#fff">B</text>
      <rect x="176" y="94" width="36" height="36" rx="4" fill="#f1c40f" transform="rotate(8 194 112)"/>
      <text x="194" y="118" text-anchor="middle" font-family="Arial" font-size="20" font-weight="800" fill="#fff">C</text>`,
    fairy: `
      <path d="M150 78 L175 118 H125 Z" fill="rgba(255,255,255,0.9)"/>
      <rect x="118" y="118" width="64" height="48" rx="4" fill="rgba(255,255,255,0.75)"/>
      <circle cx="135" cy="62" r="3" fill="#fff" opacity="0.9"/><circle cx="165" cy="55" r="2" fill="#fff"/><circle cx="180" cy="72" r="2.5" fill="#fff"/>`,
    games: `
      <rect x="100" y="100" width="44" height="44" rx="8" fill="rgba(255,255,255,0.25)"/>
      <circle cx="112" cy="112" r="4" fill="#fff"/><circle cx="132" cy="112" r="4" fill="#fff"/>
      <circle cx="112" cy="132" r="4" fill="#fff"/><circle cx="132" cy="132" r="4" fill="#fff"/>
      <circle cx="122" cy="122" r="4" fill="#fff"/>
      <path d="M168 108 L198 108 L183 138 Z" fill="rgba(255,255,255,0.3)"/>`,
    comic: `
      <ellipse cx="95" cy="115" rx="42" ry="28" fill="#fff" opacity="0.92"/>
      <text x="95" y="120" text-anchor="middle" font-family="Arial" font-size="11" font-weight="700" fill="#333">Get up!</text>
      <ellipse cx="205" cy="108" rx="38" ry="26" fill="#fff" opacity="0.85"/>
      <text x="205" y="113" text-anchor="middle" font-family="Arial" font-size="10" font-weight="700" fill="#333">Turn on!</text>`,
    reading: `
      <path d="M110 95 V145 Q150 125 190 95 V145 Q150 165 110 145 Z" fill="rgba(255,255,255,0.85)"/>
      <line x1="150" y1="120" x2="150" y2="145" stroke="rgba(0,0,0,0.15)" stroke-width="1"/>`,
    sounds: `
      <circle cx="150" cy="118" r="24" fill="rgba(255,255,255,0.2)"/>
      ${[0, 1, 2, 3].map((i) => `<path d="M${174 + i * 14} 108 Q${182 + i * 14} 118 ${174 + i * 14} 128" fill="none" stroke="rgba(255,255,255,0.${5 - i})" stroke-width="3"/>`).join('')}`,
    workbook: `
      <rect x="62" y="94" width="176" height="56" rx="4" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)"/>
      <rect x="62" y="94" width="10" height="56" fill="${c3 || '#e84393'}"/>
      ${[0, 1, 2, 3].map((i) => `<line x1="78" y1="${108 + i * 11}" x2="220" y2="${108 + i * 11}" stroke="rgba(255,255,255,0.2)"/>`).join('')}`,
    mindfulness: `
      <ellipse cx="150" cy="115" rx="55" ry="22" fill="rgba(255,255,255,0.25)"/>
      <ellipse cx="130" cy="108" rx="28" ry="14" fill="rgba(255,255,255,0.2)"/>
      <ellipse cx="170" cy="112" rx="32" ry="16" fill="rgba(255,255,255,0.18)"/>`,
    confidence: `
      <polygon points="150,88 162,118 195,118 168,138 178,168 150,152 122,168 132,138 105,118 138,118" fill="#ffd93d" stroke="#fff" stroke-width="2"/>`,
    maker: `
      <rect x="135" y="108" width="30" height="40" rx="4" fill="rgba(255,255,255,0.85)"/>
      <polygon points="150,82 165,108 135,108" fill="${c3 || '#ff6b6b'}"/>
      <circle cx="118" cy="125" r="10" fill="rgba(255,255,255,0.35)"/>
      <circle cx="182" cy="125" r="10" fill="rgba(255,255,255,0.35)"/>`,
    parent: `
      <circle cx="125" cy="115" r="18" fill="rgba(255,255,255,0.35)"/>
      <circle cx="175" cy="115" r="14" fill="rgba(255,255,255,0.3)"/>
      <path d="M150 128 C130 150 170 150 150 128" fill="#ff6b6b" opacity="0.7"/>`,
    writing: `
      <rect x="118" y="100" width="64" height="48" rx="3" fill="#fff" opacity="0.9"/>
      <line x1="128" y1="115" x2="172" y2="115" stroke="#ccc"/><line x1="128" y1="128" x2="165" y2="128" stroke="#ccc"/>
      <line x1="175" y1="108" x2="195" y2="138" stroke="${c3 || '#f39c12'}" stroke-width="3" stroke-linecap="round"/>`,
    smoothie: `
      <circle cx="120" cy="125" r="14" fill="#ff6b6b"/><circle cx="150" cy="118" r="14" fill="#ffd93d"/>
      <circle cx="180" cy="125" r="14" fill="#6bcb77"/>
      <rect x="128" y="132" width="44" height="22" rx="6" fill="rgba(255,255,255,0.5)"/>`,
    stories: `
      <path d="M95 95 H205 V155 H95 Z" fill="rgba(255,255,255,0.2)" rx="4"/>
      <text x="150" y="130" text-anchor="middle" font-size="36">✨</text>`,
    flashcards: `
      <rect x="88" y="98" width="48" height="64" rx="6" fill="#fff" opacity="0.9" transform="rotate(-6 112 130)"/>
      <rect x="118" y="94" width="48" height="64" rx="6" fill="#fff" opacity="0.85"/>
      <rect x="148" y="100" width="48" height="64" rx="6" fill="#fff" opacity="0.9" transform="rotate(6 172 132)"/>
      <text x="142" y="132" text-anchor="middle" font-family="Arial" font-size="22" font-weight="800" fill="${c3 || '#e84393'}">Aa</text>`,
    german: `
      <text x="150" y="120" text-anchor="middle" font-size="32">🇩🇪</text>
      <rect x="115" y="352" width="22" height="10" fill="#000"/><rect x="137" y="352" width="22" height="10" fill="#DD0000"/><rect x="159" y="352" width="22" height="10" fill="#FFCE00"/>`
  };
  return d[decor] || '';
}

function playfulCover(opts) {
  const { c1, c2, c3, title, subtitle, badge, decor, label } = opts;
  const uid = Math.random().toString(36).slice(2, 8);
  const decorSvg = getDecorSvg(decor, c3, uid);
  const badgeBig = badge && ['alphabet', 'stories', 'writing', 'flashcards'].includes(decor)
    ? `<text x="150" y="208" text-anchor="middle" font-family="Arial" font-size="40" font-weight="800" fill="rgba(255,255,255,0.95)">${xmlEscape(badge)}</text>`
    : '';
  const badgeCorner = badge && !badgeBig
    ? `<rect x="205" y="34" width="58" height="30" rx="8" fill="rgba(0,0,0,0.2)" stroke="rgba(255,255,255,0.45)"/>
       <text x="234" y="55" text-anchor="middle" font-family="Arial" font-size="${badge.length > 3 ? 13 : 17}" font-weight="800" fill="#fff">${xmlEscape(badge)}</text>`
    : '';

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400" width="300" height="400">
  <defs>
    <linearGradient id="bg${uid}" x1="0" y1="0" x2="0.2" y2="1">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
    <linearGradient id="spine${uid}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="rgba(0,0,0,0.3)"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
    </linearGradient>
  </defs>
  <rect width="300" height="400" fill="url(#bg${uid})"/>
  <rect x="0" y="0" width="28" height="400" fill="url(#spine${uid})"/>
  ${c3 ? `<rect x="0" y="0" width="300" height="8" fill="${c3}"/>` : ''}
  <rect x="16" y="16" width="268" height="368" rx="6" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
  ${decorSvg}
  ${badgeCorner}
  ${badgeBig}
  ${titleBlock(title, badgeBig ? 255 : 200, 16, '#ffffff')}
  ${subtitle ? `<text x="150" y="272" text-anchor="middle" font-family="Arial" font-size="10" font-weight="600" fill="rgba(255,255,255,0.9)">${xmlEscape(subtitle)}</text>` : ''}
  ${kidsFooter(label || 'KIDS LEARNING BOOKS')}
</svg>`;
}

/** Classic framed illustration style (Alice / Oz inspired). */
function storybookCover(opts) {
  const { title, subtitle, scene, bg, frame } = opts;
  const uid = Math.random().toString(36).slice(2, 8);
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400" width="300" height="400">
  <defs>
    <linearGradient id="paper${uid}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${bg || '#e8dcc8'}"/>
      <stop offset="100%" stop-color="${bg ? bg : '#d4c4a8'}"/>
    </linearGradient>
  </defs>
  <rect width="300" height="400" fill="url(#paper${uid})"/>
  <rect x="0" y="0" width="24" height="400" fill="rgba(0,0,0,0.12)"/>
  ${titleBlock(title, 52, 14, frame || '#1a2a3a')}
  <rect x="45" y="72" width="210" height="175" rx="3" fill="#faf6ef" stroke="${frame || '#1a3a52'}" stroke-width="3"/>
  <rect x="52" y="79" width="196" height="161" fill="#87ceeb" opacity="0.35"/>
  ${scene}
  ${subtitle ? `<text x="150" y="268" text-anchor="middle" font-family="Georgia, serif" font-size="11" font-style="italic" fill="#555">${xmlEscape(subtitle)}</text>` : ''}
  <line x1="60" y1="285" x2="240" y2="285" stroke="${frame || '#1a3a52'}" stroke-width="1" opacity="0.4"/>
  <text x="150" y="308" text-anchor="middle" font-family="Arial" font-size="9" fill="#666" letter-spacing="2">LIFEWITHBOOKS</text>
  <text x="150" y="328" text-anchor="middle" font-family="Arial" font-size="10" font-weight="700" fill="${frame || '#1a3a52'}">KIDS LEARNING BOOKS</text>
  <text x="150" y="368" text-anchor="middle" font-family="Arial" font-size="9" fill="#888">Free to read on LifeWithBooks</text>
</svg>`;
}

const SCENES = {
  bears: `
    <ellipse cx="150" cy="155" rx="70" ry="45" fill="#8B6914" opacity="0.25"/>
    <circle cx="110" cy="130" r="22" fill="#6d4c2a"/><circle cx="190" cy="130" r="22" fill="#6d4c2a"/>
    <circle cx="110" cy="125" r="8" fill="#6d4c2a"/><circle cx="190" cy="125" r="8" fill="#6d4c2a"/>
    <ellipse cx="95" cy="175" rx="22" ry="10" fill="#d4a574"/><ellipse cx="150" cy="178" rx="26" ry="11" fill="#c4956a"/><ellipse cx="205" cy="175" rx="22" ry="10" fill="#e8b88a"/>
    <text x="95" y="179" text-anchor="middle" font-size="8" fill="#555">hot</text>
    <text x="150" y="182" text-anchor="middle" font-size="8" fill="#555">just right</text>
    <text x="205" y="179" text-anchor="middle" font-size="8" fill="#555">cold</text>`,
  seuss: `
    <ellipse cx="150" cy="165" rx="75" ry="40" fill="#27ae60"/>
    <ellipse cx="130" cy="148" rx="18" ry="22" fill="#f9e79f" stroke="#fff" stroke-width="2"/>
    <ellipse cx="170" cy="152" rx="16" ry="20" fill="#f9e79f" stroke="#fff" stroke-width="2"/>
    <rect x="118" y="168" width="64" height="8" rx="2" fill="#8B4513" opacity="0.6"/>
    <path d="M80 120 Q150 90 220 120" fill="none" stroke="#2ecc71" stroke-width="4" stroke-linecap="round"/>`,
  oz: `
    <rect x="60" y="175" width="180" height="12" fill="#f1c40f"/>
    <rect x="60" y="187" width="180" height="12" fill="#27ae60"/>
    <path d="M150 95 L165 130 H135 Z" fill="#2ecc71"/>
    <circle cx="150" cy="145" r="20" fill="#f1c40f" opacity="0.8"/>`,
  wonder: `
    <rect x="100" y="110" width="28" height="40" rx="3" fill="#fff" stroke="#c0392b" transform="rotate(-12 114 130)"/>
    <text x="114" y="135" font-size="16" fill="#c0392b">♥</text>
    <circle cx="175" cy="125" r="18" fill="#9b59b6" opacity="0.6"/>
    <path d="M130 170 Q150 150 170 170" fill="none" stroke="#1abc9c" stroke-width="3"/>`
};

const KIDS_DESIGNS = {
  'phrasal-verb-fun': { type: 'playful', c1: '#ff6b9d', c2: '#c44569', c3: '#ffd93d', subtitle: 'Cartoons & Games', decor: 'comic' },
  'grammar-practice-grades-3-4': { type: 'playful', c1: '#5c7cfa', c2: '#364fc7', c3: '#ff922b', subtitle: 'Grades 3–4 Workbook', badge: '3-4', decor: 'workbook' },
  'my-english-book-one': { type: 'playful', c1: '#339af0', c2: '#1864ab', c3: '#51cf66', subtitle: 'First Steps in English', badge: '1', decor: 'reading' },
  'fairyland-pupil-book-1': { type: 'playful', c1: '#da77f2', c2: '#862e9c', c3: '#ffd43b', subtitle: 'Fairy-Tale English', badge: '1', decor: 'fairy' },
  'comprehension-student-book-4-year': { type: 'playful', c1: '#20c997', c2: '#087f5b', c3: '#fcc419', subtitle: 'Reading Comprehension', badge: 'Year 4', decor: 'reading' },
  'complete-book-of-alphabet': { type: 'playful', c1: '#ff6b6b', c2: '#c92a2a', c3: '#4dabf7', subtitle: 'A to Z Activities', decor: 'alphabet' },
  'one-story-a-day': { type: 'playful', c1: '#748ffc', c2: '#364fc7', c3: '#ff8787', subtitle: 'Daily Reading for Kids', decor: 'stories' },
  'initial-sounds-picture-cards': { type: 'playful', c1: '#e64980', c2: '#a61e4d', c3: '#69db7c', subtitle: 'Picture Flashcards', decor: 'flashcards' },
  'easy-english-with-games-and-activities-2': { type: 'playful', c1: '#15aabf', c2: '#0b7285', c3: '#fab005', subtitle: 'Games & Activities', badge: '2', decor: 'games' },
  'easy-english-with-games-and-activities-1': { type: 'playful', c1: '#22b8cf', c2: '#0c8599', c3: '#ff922b', subtitle: 'Games & Activities', badge: '1', decor: 'games' },
  'my-first-grammar-3': { type: 'playful', c1: '#51cf66', c2: '#2b8a3e', c3: '#ff6b6b', subtitle: 'First Grammar Steps', badge: '3', decor: 'workbook' },
  'all-in-one-reading-passages': { type: 'playful', c1: '#4dabf7', c2: '#1971c2', c3: '#ffd43b', subtitle: 'Reading Passages', decor: 'reading' },
  'just-for-kids-grammar': { type: 'playful', c1: '#63e6be', c2: '#099268', c3: '#ff6b6b', subtitle: 'Grammar Made Fun', decor: 'workbook' },
  'alphabet-activities': { type: 'playful', c1: '#ffa94d', c2: '#e8590c', c3: '#74c0fc', subtitle: 'Hands-On ABC Learning', decor: 'alphabet' },
  'beginning-sounds': { type: 'playful', c1: '#cc5de8', c2: '#862e9c', c3: '#63e6be', subtitle: 'Phonics & Sounds', decor: 'sounds' },
  'mindfulness-exercises-for-kids': { type: 'playful', c1: '#74c0fc', c2: '#339af0', c3: '#b2f2bb', subtitle: 'Calm & Focus', decor: 'mindfulness' },
  'kid-confidence': { type: 'playful', c1: '#ff922b', c2: '#d9480f', c3: '#ffd43b', subtitle: 'Build Self-Esteem', decor: 'confidence' },
  'junior-maker': { type: 'playful', c1: '#5c7cfa', c2: '#3b5bdb', c3: '#ff6b6b', subtitle: 'STEM & Creativity', decor: 'maker' },
  'how-to-talk-so-kids-will-listen': { type: 'playful', c1: '#f06595', c2: '#c2255c', c3: '#fcc2d7', subtitle: 'Parenting Communication', decor: 'parent' },
  'how-to-talk-so-kids-can-learn': { type: 'playful', c1: '#9775fa', c2: '#6741d9', c3: '#ffd43b', subtitle: 'Help Children Learn', decor: 'parent' },
  'green-eggs-and-ham': { type: 'storybook', subtitle: 'A Classic Early Reader', scene: SCENES.seuss, bg: '#d5e8d4', frame: '#1e5631' },
  'goldilocks-and-the-three-bears': { type: 'storybook', subtitle: 'Beloved Fairy Tale', scene: SCENES.bears, bg: '#e8dcc8', frame: '#5c4033' },
  '25-wacky-wonderful-stories': { type: 'storybook', subtitle: 'Fun Stories for Young Readers', scene: SCENES.wonder, bg: '#e3d5f5', frame: '#5b2c6f' },
  '150-totally-terrific-writing-prompts': { type: 'playful', c1: '#fab005', c2: '#e67700', c3: '#339af0', subtitle: 'Creative Writing Ideas', badge: '150', decor: 'writing' },
  'deutsch-quiz-1-und-2-klasse': { type: 'playful', c1: '#ffd43b', c2: '#f59f00', c3: '#000', subtitle: 'German Quiz Grades 1–2', badge: '1–2', decor: 'german' },
  'kinderleichte-grammatik-die-vier-falle': { type: 'playful', c1: '#fab005', c2: '#d9480f', c3: '#000', subtitle: 'Easy German Grammar', decor: 'german' },
  'healthy-smoothie-recipe-book': { type: 'playful', c1: '#40c057', c2: '#2b8a3e', c3: '#ff6b6b', subtitle: 'Kid-Friendly Recipes', decor: 'smoothie' }
};

const coversDir = path.join(root, 'covers');
let count = 0;

BOOKS.forEach((book) => {
  if (!book.categories.includes('kids-learning-books')) return;
  if (book.coverImage && book.coverImage.indexOf('covers-img/') === 0) return;

  const design = KIDS_DESIGNS[book.id];
  if (!design) return;

  let svg;
  if (design.type === 'storybook') {
    svg = storybookCover({ title: book.title, ...design });
  } else {
    svg = playfulCover({ title: book.title, label: 'KIDS LEARNING BOOKS', ...design });
  }

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

fs.writeFileSync(booksPath, out, 'utf8');
console.log('Generated rich covers for', count, 'Kids Learning books.');
