/* Batch 3: epic classics, Sherlock novels, and high-search public-domain titles. */
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const PDFDocument = require('pdfkit');

const root = path.join(__dirname, '..');
const pdfDir = path.join(root, 'pdfs');
const coverDir = path.join(root, 'covers-img');
fs.mkdirSync(pdfDir, { recursive: true });
fs.mkdirSync(coverDir, { recursive: true });

const booksPath = path.join(root, 'js', 'books.js');
const { BOOKS, CATEGORIES } = require(booksPath);

const NEW_BOOKS = [
  { id: 'les-miserables', gid: 135, title: 'Les Miserables', cover: 'literature', cats: ['novels', 'literature-books'],
    excerpt: 'Victor Hugo\'s sweeping epic of justice, mercy and redemption in nineteenth-century France.',
    about: 'Jean Valjean, hunted for stealing a loaf of bread, rebuilds his life while Paris seethes with revolution. Hugo weaves dozens of unforgettable characters into a story of law, grace and human dignity.',
    why: 'One of the greatest novels ever written — vast, compassionate and impossible to forget once you begin.' },
  { id: 'don-quixote', gid: 996, title: 'Don Quixote', cover: 'literature', cats: ['novels', 'literature-books'],
    excerpt: 'Cervantes\'s comic masterpiece of a knight, his squire and impossible dreams.',
    about: 'Alonso Quixano reads too many romances and sets out as Don Quixote to revive chivalry, with Sancho Panza at his side through windmills, inns and hard-won wisdom.',
    why: 'Often called the first modern novel — hilarious, tender and endlessly influential.' },
  { id: 'war-and-peace', gid: 2600, title: 'War and Peace', cover: 'literature', cats: ['novels', 'literature-books'],
    excerpt: 'Tolstoy\'s monumental novel of love, fate and Napoleon\'s invasion of Russia.',
    about: 'Aristocratic families in Moscow and Petersburg live through war, peace and spiritual searching as history crashes into private life.',
    why: 'The supreme achievement of realist fiction — challenging in length, unmatched in scope and humanity.' },
  { id: 'anne-of-avonlea', gid: 47, title: 'Anne of Avonlea', cover: 'kids', cats: ['novels', 'kids-learning-books', 'literature-books'],
    excerpt: 'Anne Shirley becomes a teacher and grows up in Montgomery\'s beloved sequel.',
    about: 'Now a young woman, Anne takes a schoolroom, cares for twins and navigates friendship, romance and the scrapes only she could cause.',
    why: 'Warm, funny and full of heart — a comfort read for every generation.' },
  { id: 'anne-of-the-island', gid: 51, title: 'Anne of the Island', cover: 'kids', cats: ['novels', 'kids-learning-books', 'literature-books'],
    excerpt: 'Anne leaves Prince Edward Island for college and new love in the third Anne book.',
    about: 'At Redmond College, Anne discovers independence, ambition and the complicated question of who she will marry.',
    why: 'Perfect for readers who grew up with Anne of Green Gables and want to follow her into adulthood.' },
  { id: 'the-sign-of-the-four', gid: 2097, title: 'The Sign of the Four', cover: 'novel', cats: ['novels', 'literature-books'],
    excerpt: 'Sherlock Holmes investigates treasure, betrayal and murder in colonial London.',
    about: 'Mary Morstan hires Holmes to explain mysterious pearls and a father\'s disappearance, leading to a chase involving the Agra treasure.',
    why: 'A tight, exotic Holmes adventure — essential for detective fiction fans.' },
  { id: 'the-valley-of-fear', gid: 7496, title: 'The Valley of Fear', cover: 'novel', cats: ['novels', 'literature-books'],
    excerpt: 'Holmes unravels a coded warning and a secret society in the Pennsylvania coalfields.',
    about: 'A murder in Sussex connects to a hidden past in America, testing Holmes against an enemy as organized as Moriarty\'s web.',
    why: 'Doyle\'s final Holmes novel blends mystery with American frontier drama.' },
  { id: 'the-return-of-sherlock-holmes', gid: 2093, title: 'The Return of Sherlock Holmes', cover: 'novel', cats: ['novels', 'literature-books'],
    excerpt: 'Thirteen stories marking Holmes\'s return after Reichenbach Falls.',
    about: 'Holmes reappears to solve cases from blackmail to stolen plans, proving his methods still unmatched.',
    why: 'The collection that brought Holmes back — includes classics like "The Adventure of the Empty House".' },
  { id: 'the-memoirs-of-sherlock-holmes', gid: 834, title: 'The Memoirs of Sherlock Holmes', cover: 'novel', cats: ['novels', 'literature-books'],
    excerpt: 'Eleven Holmes stories including the confrontation with Professor Moriarty.',
    about: 'Watson records some of Holmes\'s most famous cases, culminating in the struggle at Reichenbach Falls.',
    why: 'Home to "The Final Problem" — a cornerstone of detective literature.' },
  { id: 'his-last-bow', gid: 2343, title: 'His Last Bow', cover: 'novel', cats: ['novels', 'literature-books'],
    excerpt: 'Holmes and Watson\'s wartime espionage caper and other late cases.',
    about: 'The title story sends an ageing Holmes into secret service on the eve of the First World War.',
    why: 'A mature, atmospheric collection for readers who know the earlier canon.' },
  { id: 'the-hunchback-of-notre-dame', gid: 2610, title: 'The Hunchback of Notre-Dame', cover: 'literature', cats: ['novels', 'literature-books'],
    excerpt: 'Hugo\'s Gothic tale of Quasimodo, Esmeralda and medieval Paris.',
    about: 'In the shadow of Notre-Dame, outcasts and rulers collide in a tragedy of beauty, cruelty and fate.',
    why: 'Vivid setting, fierce emotion and one of literature\'s most famous cathedrals.' },
  { id: 'anna-karenina', gid: 1399, title: 'Anna Karenina', cover: 'literature', cats: ['novels', 'literature-books'],
    excerpt: 'Tolstoy\'s novel of passion, society and the search for an honest life.',
    about: 'Anna\'s affair with Count Vronsky unfolds alongside Levin\'s quest for meaning in work, family and faith.',
    why: 'Widely ranked among the greatest novels — psychologically deep and beautifully observed.' },
  { id: 'the-brothers-karamazov', gid: 28054, title: 'The Brothers Karamazov', cover: 'literature', cats: ['novels', 'literature-books'],
    excerpt: 'Dostoevsky\'s final novel of faith, doubt and a murder that divides a family.',
    about: 'Three brothers — Dmitri, Ivan and Alyosha — orbit their corrupt father until violence forces a reckoning with guilt and God.',
    why: 'A towering work of philosophy and drama that rewards serious readers.' },
  { id: 'the-odyssey', gid: 1727, title: 'The Odyssey', cover: 'literature', cats: ['novels', 'literature-books', 'adventure-books'],
    excerpt: 'Homer\'s epic of Odysseus\'s ten-year journey home after the Trojan War.',
    about: 'Monsters, gods and temptations delay Odysseus while Penelope holds off suitors in Ithaca.',
    why: 'The foundation of Western adventure storytelling — still thrilling after three millennia.' },
  { id: 'paradise-lost', gid: 26, title: 'Paradise Lost', cover: 'literature', cats: ['novels', 'literature-books'],
    excerpt: 'Milton\'s epic poem of the Fall, Satan and the loss of Eden.',
    about: 'In blank verse of astonishing power, Milton retells Genesis with cosmic scope and unsettling sympathy for the rebel angel.',
    why: 'Essential English poetry — challenging but endlessly quoted and debated.' },
  { id: 'the-last-of-the-mohicans', gid: 3289, title: 'The Last of the Mohicans', cover: 'adventure', cats: ['novels', 'adventure-books', 'literature-books'],
    excerpt: 'Cooper\'s frontier adventure during the French and Indian War.',
    about: 'Hawkeye and his companions protect Cora and Alice Munro through wilderness battles and ambush.',
    why: 'The classic American frontier romance — action, loyalty and vivid landscape.' },
  { id: 'kidnapped', gid: 421, title: 'Kidnapped', cover: 'adventure', cats: ['novels', 'adventure-books', 'literature-books'],
    excerpt: 'Stevenson\'s Scottish adventure of shipwreck, betrayal and Jacobite intrigue.',
    about: 'Young David Balfour is kidnapped and thrown into a world of clan feuds, with Alan Breck as his daring ally.',
    why: 'Fast, witty and perfect for readers who loved Treasure Island.' },
  { id: 'the-prince-and-the-pauper', gid: 578, title: 'The Prince and the Pauper', cover: 'kids', cats: ['novels', 'kids-learning-books', 'literature-books'],
    excerpt: 'Twain\'s tale of two boys who swap places in Tudor England.',
    about: 'Prince Edward and Tom Canty trade lives, exposing injustice and kindness in court and slum alike.',
    why: 'A fun, moral adventure that introduces Twain\'s humour to younger readers.' },
  { id: 'heidi', gid: 1448, title: 'Heidi', cover: 'kids', cats: ['kids-learning-books', 'stories-books', 'literature-books'],
    excerpt: 'Spyri\'s Alpine story of an orphan girl who heals hearts in the mountains.',
    about: 'Heidi brings joy to her grandfather\'s hut, then faces loneliness in the city before finding her way home.',
    why: 'Gentle, wholesome and beloved worldwide — ideal family reading.' },
  { id: 'the-adventures-of-pinocchio', gid: 500, title: 'The Adventures of Pinocchio', cover: 'kids', cats: ['kids-learning-books', 'stories-books'],
    excerpt: 'Collodi\'s original puppet who longs to become a real boy.',
    about: 'Pinocchio\'s nose grows, he escapes a whale and learns hard lessons about truth and responsibility.',
    why: 'Darker and richer than many adaptations — a true fairy-tale classic.' },
  { id: 'the-idiot', gid: 2638, title: 'The Idiot', cover: 'literature', cats: ['novels', 'literature-books'],
    excerpt: 'Dostoevsky\'s novel of Prince Myshkin, innocence and a destructive love triangle.',
    about: 'Returning from a Swiss clinic, the gentle Prince Myshkin enters Petersburg society and is torn between two women.',
    why: 'A study of goodness under pressure — strange, moving and uniquely Dostoevsky.' },
  { id: 'the-mayor-of-casterbridge', gid: 143, title: 'The Mayor of Casterbridge', cover: 'literature', cats: ['novels', 'literature-books'],
    excerpt: 'Hardy\'s tragedy of a man who sells his wife and cannot escape the past.',
    about: 'Michael Henchard rises to become mayor of Casterbridge, but old sins and fierce pride destroy what he builds.',
    why: 'Hardy at his most dramatic — fate, character and rural England in one gripping arc.' },
  { id: 'the-house-of-the-seven-gables', gid: 873, title: 'The House of the Seven Gables', cover: 'literature', cats: ['novels', 'literature-books'],
    excerpt: 'Hawthorne\'s Gothic romance of a cursed New England family.',
    about: 'Generations of the Pyncheon family are haunted by guilt and a gloomy mansion until love and honesty offer release.',
    why: 'Atmospheric American Gothic with Hawthorne\'s moral depth.' },
  { id: 'the-turn-of-the-screw', gid: 209, title: 'The Turn of the Screw', cover: 'novel', cats: ['novels', 'literature-books'],
    excerpt: 'James\'s unsettling novella of a governess, two children and possible ghosts.',
    about: 'A young governess at a remote estate becomes convinced that sinister figures threaten her charges.',
    why: 'Short, chilling and endlessly debated — the perfect literary ghost story.' },
  { id: 'the-awakening', gid: 160, title: 'The Awakening', cover: 'literature', cats: ['novels', 'literature-books'],
    excerpt: 'Chopin\'s novel of Edna Pontellier and the cost of self-discovery.',
    about: 'In Creole Louisiana, Edna questions marriage, motherhood and the life expected of a respectable woman.',
    why: 'A landmark of early feminist fiction — quiet, bold and still provocative.' }
];

function download(url, dest, redirects) {
  redirects = redirects || 0;
  return new Promise((resolve, reject) => {
    if (redirects > 8) return reject(new Error('too many redirects'));
    const lib = url.indexOf('https:') === 0 ? https : http;
    const req = lib.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 LifeWithBooks' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        const next = res.headers.location.indexOf('http') === 0
          ? res.headers.location
          : new URL(res.headers.location, url).href;
        return resolve(download(next, dest, redirects + 1));
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error('HTTP ' + res.statusCode));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve(fs.statSync(dest).size)));
      file.on('error', reject);
    });
    req.on('error', reject);
    req.setTimeout(180000, () => req.destroy(new Error('timeout')));
  });
}

async function fetchPdf(gid, dest) {
  const urls = [
    'https://www.gutenberg.org/ebooks/' + gid + '.pdf.noimages',
    'https://www.gutenberg.org/cache/epub/' + gid + '/pg' + gid + '.pdf'
  ];
  for (const url of urls) {
    try {
      const size = await download(url, dest);
      if (size > 5000) return size;
    } catch (e) { /* try text build */ }
  }
  return 0;
}

function fetchText(gid) {
  const urls = [
    'https://www.gutenberg.org/cache/epub/' + gid + '/pg' + gid + '.txt',
    'https://www.gutenberg.org/files/' + gid + '/' + gid + '-0.txt'
  ];
  function tryUrl(i) {
    return new Promise((resolve, reject) => {
      if (i >= urls.length) return reject(new Error('no text source'));
      https.get(urls[i], { headers: { 'User-Agent': 'Mozilla/5.0 LifeWithBooks' } }, (res) => {
        if (res.statusCode !== 200) { res.resume(); return resolve(tryUrl(i + 1)); }
        let data = '';
        res.setEncoding('utf8');
        res.on('data', (c) => { data += c; });
        res.on('end', () => resolve(data));
      }).on('error', () => resolve(tryUrl(i + 1)));
    });
  }
  return tryUrl(0);
}

function cleanText(raw) {
  let text = raw.replace(/\r\n/g, '\n');
  const startRe = /\*\*\*\s*START OF (?:THE|THIS) PROJECT GUTENBERG EBOOK[\s\S]*?\*\*\*/i;
  const endRe = /\*\*\*\s*END OF (?:THE|THIS) PROJECT GUTENBERG EBOOK/i;
  const s = text.search(startRe);
  if (s !== -1) text = text.slice(s).replace(startRe, '');
  const e = text.search(endRe);
  if (e !== -1) text = text.slice(0, e);
  return text.trim();
}

function toParagraphs(text) {
  const lines = text.split(/\n/).map((l) => l.trim()).filter(Boolean);
  const out = [];
  let buf = '';
  for (const line of lines) {
    if (/^(CHAPTER|Chapter|BOOK|Book|Part|PART|LETTER|Letter|ACT|SCENE|CANTO)\b/.test(line) || (line.length < 60 && line === line.toUpperCase() && /[A-Z]/.test(line))) {
      if (buf) { out.push(buf.trim()); buf = ''; }
      out.push(line);
      continue;
    }
    buf += (buf ? ' ' : '') + line;
    if (buf.length > 700) { out.push(buf.trim()); buf = ''; }
  }
  if (buf) out.push(buf.trim());
  return out.filter(Boolean);
}

function buildPdf(book, text) {
  return new Promise((resolve, reject) => {
    const dest = path.join(pdfDir, book.id + '.pdf');
    const doc = new PDFDocument({ size: 'A4', margins: { top: 64, bottom: 64, left: 64, right: 64 }, info: { Title: book.title, Author: 'LifeWithBooks', Creator: 'LifeWithBooks - www.lifewithbooks.co' } });
    const stream = fs.createWriteStream(dest);
    doc.pipe(stream);
    doc.rect(0, 0, doc.page.width, doc.page.height).fill('#1E565C');
    doc.fillColor('#faf0e2').font('Helvetica-Bold').fontSize(14).text('LIFEWITHBOOKS', 0, 150, { align: 'center', characterSpacing: 3 });
    doc.moveTo(180, 180).lineTo(doc.page.width - 180, 180).strokeColor('#faf0e2').lineWidth(1).stroke();
    doc.fillColor('#ffffff').font('Times-Bold').fontSize(28).text(book.title, 64, 280, { align: 'center', width: doc.page.width - 128 });
    doc.fillColor('#d8e8e6').font('Times-Italic').fontSize(13).text((book.excerpt || '').slice(0, 160), 80, 420, { align: 'center', width: doc.page.width - 160 });
    doc.fillColor('#faf0e2').font('Helvetica').fontSize(11).text('Free PDF Edition  \u2022  www.lifewithbooks.co', 0, doc.page.height - 120, { align: 'center' });
    doc.fontSize(8).fillColor('#bcd3d1').text('This is a public-domain work, formatted and provided free by LifeWithBooks.', 64, doc.page.height - 90, { align: 'center', width: doc.page.width - 128 });
    doc.addPage();
    doc.fillColor('#222222').font('Times-Roman').fontSize(11.5);
    const paragraphs = toParagraphs(text);
    console.log('  BUILD ', book.id, paragraphs.length, 'paragraphs');
    paragraphs.forEach((p) => doc.text(p, { align: 'left', paragraphGap: 8, lineGap: 2 }));
    doc.end();
    stream.on('finish', () => resolve(fs.statSync(dest).size));
    stream.on('error', reject);
  });
}

function fetchCover(gid, destPath) {
  const url = 'https://www.gutenberg.org/cache/epub/' + gid + '/pg' + gid + '.cover.medium.jpg';
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 LifeWithBooks' } }, (res) => {
      if (res.statusCode !== 200) { res.resume(); return resolve(false); }
      const f = fs.createWriteStream(destPath);
      res.pipe(f);
      f.on('finish', () => { f.close(); resolve(true); });
      f.on('error', () => resolve(false));
    }).on('error', () => resolve(false));
  });
}

function makeEntry(def, hasCover) {
  const entry = {
    id: def.id,
    title: def.title,
    categories: def.cats,
    cover: def.cover,
    pdf: 'pdfs/' + def.id + '.pdf',
    excerpt: def.excerpt,
    description: [
      '## About the Book',
      def.about,
      '## Why Read It',
      def.why,
      '## Free Public-Domain Edition',
      'This LifeWithBooks edition is a branded PDF you can download and keep, prepared from the complete public-domain text so you can read it on any device.'
    ],
    access: 'download',
    license: 'public-domain'
  };
  if (hasCover) entry.coverImage = 'covers-img/' + def.id + '.jpg';
  return entry;
}

function serialize() {
  const out =
    '/* Book database for LifeWithBooks (generated/normalized) */\n' +
    '\nconst BOOKS = ' + JSON.stringify(BOOKS, null, 2) + ';\n' +
    '\nconst CATEGORIES = ' + JSON.stringify(CATEGORIES, null, 2) + ';\n' +
    '\nif (typeof module !== "undefined") {\n  module.exports = { BOOKS, CATEGORIES };\n}\n';
  fs.writeFileSync(booksPath, out, 'utf8');
}

(async () => {
  let added = 0;
  for (const def of NEW_BOOKS) {
    if (BOOKS.find((b) => b.id === def.id)) { console.log('EXISTS', def.id); continue; }
    try {
      console.log('FETCH  ', def.id);
      const pdfDest = path.join(pdfDir, def.id + '.pdf');
      let size = await fetchPdf(def.gid, pdfDest);
      if (!size) {
        const raw = await fetchText(def.gid);
        const text = cleanText(raw);
        if (text.length < 2000) { console.log('SHORT  ', def.id, text.length); continue; }
        size = await buildPdf(def, text);
      }
      const hasCover = await fetchCover(def.gid, path.join(coverDir, def.id + '.jpg'));
      BOOKS.push(makeEntry(def, hasCover));
      added += 1;
      serialize();
      console.log('ADDED  ', def.id, (size / 1024 | 0) + 'KB', hasCover ? '+cover' : 'no-cover');
    } catch (e) {
      console.log('FAIL   ', def.id, e.message);
    }
  }
  console.log('Done. Added', added, 'books. Total now', BOOKS.length);
})();
