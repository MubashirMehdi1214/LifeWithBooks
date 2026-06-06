/**
 * Generate Pinterest pin images + upload manifest for LifeWithBooks.
 * Usage: node scripts/generate-pinterest-pins.js [--first N] [book-id ...]
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const root = path.join(__dirname, '..');
const { BOOKS } = require(path.join(root, 'js', 'books.js'));
const PINS_DIR = path.join(root, 'pinterest', 'pins');
const ORIGIN = 'https://www.lifewithbooks.co';

const AUTHOR = {
  'pride-and-prejudice': 'Jane Austen',
  'jane-eyre': 'Charlotte Brontë',
  'frankenstein': 'Mary Shelley',
  'dracula': 'Bram Stoker',
  'a-christmas-carol': 'Charles Dickens',
  'great-expectations': 'Charles Dickens',
  'oliver-twist': 'Charles Dickens',
  'treasure-island': 'Robert Louis Stevenson',
  'the-adventures-of-sherlock-holmes': 'Arthur Conan Doyle',
  'moby-dick': 'Herman Melville',
  'war-and-peace': 'Leo Tolstoy',
  'anna-karenina': 'Leo Tolstoy',
  'crime-and-punishment': 'Fyodor Dostoevsky',
  'the-picture-of-dorian-gray': 'Oscar Wilde',
  'dracula': 'Bram Stoker',
  'wuthering-heights': 'Emily Brontë',
  'emma': 'Jane Austen',
  'persuasion': 'Jane Austen',
  'sense-and-sensibility': 'Jane Austen',
  'little-women': 'Louisa May Alcott',
  'the-great-gatsby': 'F. Scott Fitzgerald',
  'around-the-world-in-eighty-days': 'Jules Verne',
  'twenty-thousand-leagues-under-the-sea': 'Jules Verne',
  'the-time-machine': 'H.G. Wells',
  'the-war-of-the-worlds': 'H.G. Wells',
  'alice-in-wonderland': 'Lewis Carroll',
  'alices-adventures-in-wonderland': 'Lewis Carroll',
  'the-jungle-book': 'Rudyard Kipling',
  'robinson-crusoe': 'Daniel Defoe',
  'gullivers-travels': 'Jonathan Swift',
  'don-quixote': 'Miguel de Cervantes',
  'the-odyssey': 'Homer',
  'the-iliad': 'Homer',
  'meditations': 'Marcus Aurelius',
  'the-prince': 'Niccolò Machiavelli',
  'the-art-of-war': 'Sun Tzu'
};

const BOARD_BY_CATEGORY = {
  'novels': 'Free Classic Books PDF',
  'literature-books': 'Free Classic Books PDF',
  'stories-books': 'Free Classic Books PDF',
  'adventure-books': 'Free Classic Books PDF',
  'english-learning-books': 'Free English Learning PDF',
  'grammar-books': 'Free English Grammar PDF',
  'vocabulary-books': 'Free Vocabulary PDF',
  'ielts-preparation': 'Free IELTS Study Guides',
  'kids-learning-books': 'Free Kids Learning PDF'
};

function getAuthor(book) {
  if (AUTHOR[book.id]) return AUTHOR[book.id];
  const ex = book.excerpt || '';
  let m = ex.match(/^([A-Z][A-Za-z.\s'-]+?)'s\b/);
  if (m) return m[1].trim();
  m = ex.match(/\bby\s+([A-Z][A-Za-z.\s'-]+?)(?:\.|,|$)/);
  if (m) return m[1].trim();
  if (book.author) return book.author;
  return 'Classic Author';
}

function getBoard(book) {
  for (const cat of book.categories || []) {
    if (BOARD_BY_CATEGORY[cat]) return BOARD_BY_CATEGORY[cat];
  }
  return book.license === 'public-domain' ? 'Free Classic Books PDF' : 'Free Books PDF';
}

function pinTitle(book, author) {
  const short = book.title.length > 42 ? book.title.slice(0, 39) + '...' : book.title;
  if (book.license === 'public-domain') {
    return short + ' Free PDF Download - ' + author + ' Classic';
  }
  return short + ' Free PDF Download | LifeWithBooks';
}

function pinDescription(book, author) {
  const hook = (book.excerpt || book.title)
    .replace(/^[^.]+\s/, '')
    .replace(/'/g, "'")
    .slice(0, 120);
  const tagBase = book.id.replace(/-/g, '').slice(0, 24);
  const authorTag = author.replace(/[^a-zA-Z]/g, '').toLowerCase();
  const tags = ['#freebooks', '#freepdfs', '#lifewithbooks', '#' + tagBase];
  if (authorTag && authorTag !== 'classicauthor') tags.push('#' + authorTag);
  if ((book.categories || []).includes('novels')) tags.push('#classicbooks');

  return [
    'Download ' + book.title + ' by ' + author + ' completely free. No signup needed.',
    hook + '. Instant PDF download at lifewithbooks.co',
    tags.join(' ')
  ].join(' ');
}

function wrapSvgLines(text, maxLen) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = '';
  for (const w of words) {
    const next = line ? line + ' ' + w : w;
    if (next.length > maxLen && line) {
      lines.push(line);
      line = w;
    } else line = next;
  }
  if (line) lines.push(line);
  return lines.slice(0, 3);
}

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

async function buildPinImage(book, pinFile, author) {
  const coverRel = book.coverImage && book.coverImage.startsWith('covers-img/')
    ? path.join(root, book.coverImage)
    : path.join(root, 'covers-img', book.id + '.jpg');
  if (!fs.existsSync(coverRel)) {
    throw new Error('Missing cover: ' + coverRel);
  }

  const W = 1000;
  const H = 1500;
  const titleLines = wrapSvgLines(book.title, 22);
  const titleSvg = titleLines
    .map((l, i) => `<tspan x="500" y="${1180 + i * 52}">${esc(l)}</tspan>`)
    .join('');

  const bgSvg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1E565C"/>
      <stop offset="55%" stop-color="#2a747c"/>
      <stop offset="100%" stop-color="#172021"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <text x="500" y="72" font-family="Georgia,serif" font-size="22" font-weight="700" fill="#faf0e2" text-anchor="middle" letter-spacing="2">LIFEWITHBOOKS</text>
  <text x="500" y="108" font-family="Arial,sans-serif" font-size="16" fill="rgba(250,240,226,0.85)" text-anchor="middle">FREE PDF LIBRARY</text>
  <rect x="340" y="1320" width="320" height="56" rx="28" fill="#ffeb3b"/>
  <text x="500" y="1356" font-family="Arial,sans-serif" font-size="22" font-weight="800" fill="#172021" text-anchor="middle">FREE PDF</text>
  <text x="500" y="1420" font-family="Arial,sans-serif" font-size="18" fill="rgba(250,240,226,0.9)" text-anchor="middle">${esc(author)}</text>
  <text x="500" y="1460" font-family="Arial,sans-serif" font-size="15" fill="rgba(250,240,226,0.75)" text-anchor="middle">lifewithbooks.co</text>
  <text font-family="Georgia,serif" font-size="42" font-weight="700" fill="#ffffff" text-anchor="middle">${titleSvg}</text>
</svg>`);

  const coverBuf = await sharp(coverRel)
    .resize(440, 660, { fit: 'cover' })
    .toBuffer();

  const shadow = Buffer.from(`<svg width="520" height="740"><rect x="20" y="20" width="480" height="700" rx="12" fill="rgba(0,0,0,0.25)"/></svg>`);

  await sharp(bgSvg)
    .composite([
      { input: await sharp(shadow).png().toBuffer(), top: 168, left: 228 },
      { input: coverBuf, top: 150, left: 280 }
    ])
    .jpeg({ quality: 92 })
    .toFile(pinFile);
}

function csvEscape(s) {
  return '"' + String(s).replace(/"/g, '""') + '"';
}

async function main() {
  const args = process.argv.slice(2);
  const firstN = args.includes('--first')
    ? parseInt(args[args.indexOf('--first') + 1], 10)
    : 0;
  const ids = args.filter((a) => !a.startsWith('--') && a !== String(firstN));

  let books = BOOKS.filter((b) => {
    if (b.access !== 'download') return false;
    const cover = b.coverImage || '';
    return cover.startsWith('covers-img/') || fs.existsSync(path.join(root, 'covers-img', b.id + '.jpg'));
  });

  if (ids.length) books = books.filter((b) => ids.includes(b.id));
  if (firstN) books = books.slice(0, firstN);

  // Pride and Prejudice first (pin-01)
  books.sort((a, b) => {
    if (a.id === 'pride-and-prejudice') return -1;
    if (b.id === 'pride-and-prejudice') return 1;
    return a.title.localeCompare(b.title);
  });

  fs.mkdirSync(PINS_DIR, { recursive: true });

  const rows = [];
  const uploadBlocks = [];

  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    const num = String(i + 1).padStart(2, '0');
    const pinName = 'pin-' + num + '.jpg';
    const pinPath = path.join(PINS_DIR, pinName);
    const author = getAuthor(book);
    const title = pinTitle(book, author);
    const description = pinDescription(book, author);
    const link = ORIGIN + '/book/' + encodeURIComponent(book.id) + '.html';
    const board = getBoard(book);

    await buildPinImage(book, pinPath, author);

    rows.push([pinName, book.id, title, description, link, board].map(csvEscape).join(','));
    uploadBlocks.push(
      '---\nImage: ' + pinName + ' (' + book.title + ')\n' +
      'Title: ' + title + '\n' +
      'Description: ' + description + '\n' +
      'Link: ' + link + '\n' +
      'Board: ' + board + '\n'
    );
    console.log('OK', pinName, book.id);
  }

  const csv = 'pin_file,book_id,title,description,link,board\n' + rows.join('\n') + '\n';
  fs.writeFileSync(path.join(root, 'pinterest', 'pins-manifest.csv'), csv, 'utf8');
  fs.writeFileSync(path.join(root, 'pinterest', 'PIN-UPLOAD-GUIDE.txt'), uploadBlocks.join('\n'), 'utf8');

  console.log('\nCreated', books.length, 'pins in pinterest/pins/');
  console.log('Copy text: pinterest/PIN-UPLOAD-GUIDE.txt');
  console.log('CSV: pinterest/pins-manifest.csv');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
