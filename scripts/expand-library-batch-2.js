/* Batch 2: add high-search public-domain classics from Project Gutenberg. */
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
  { id: 'emma', gid: 158, title: 'Emma', cover: 'novel', cats: ['novels', 'literature-books'],
    excerpt: 'Jane Austen\'s comedy of matchmaking, misread signals and self-discovery in Regency England.',
    about: 'Emma Woodhouse is clever, wealthy and convinced she understands everyone\'s romantic prospects — except her own. Austen\'s novel is a sharp, funny study of social blindness and growth.',
    why: 'One of Austen\'s most beloved books, full of wit, misunderstanding and one of literature\'s most satisfying character arcs.' },
  { id: 'sense-and-sensibility', gid: 161, title: 'Sense and Sensibility', cover: 'novel', cats: ['novels', 'literature-books'],
    excerpt: 'The Dashwood sisters navigate love, loss and society in Jane Austen\'s first published novel.',
    about: 'After their father\'s death, Elinor and Marianne Dashwood must rely on relatives and their own judgment as they fall in love in a world that offers women little security.',
    why: 'Austen contrasts reason and emotion with humour and depth, setting the template for her later masterpieces.' },
  { id: 'persuasion', gid: 105, title: 'Persuasion', cover: 'novel', cats: ['novels', 'literature-books'],
    excerpt: 'Austen\'s mature novel of second chances, regret and quiet devotion between Anne Elliot and Captain Wentworth.',
    about: 'Years after being persuaded to reject the man she loved, Anne Elliot meets Captain Wentworth again — wiser, sadder and still unmistakably drawn to him.',
    why: 'Often called Austen\'s most emotional novel, it rewards patient readers with one of the greatest love letters in fiction.' },
  { id: 'northanger-abbey', gid: 121, title: 'Northanger Abbey', cover: 'novel', cats: ['novels', 'literature-books'],
    excerpt: 'Austen\'s playful satire of Gothic novels and youthful imagination.',
    about: 'Catherine Morland visits Bath and an old abbey, where her love of sensational fiction leads her to suspect dark secrets that prove mostly ordinary.',
    why: 'Short, funny and self-aware — an ideal Austen starting point for readers new to the classics.' },
  { id: 'oliver-twist', gid: 730, title: 'Oliver Twist', cover: 'literature', cats: ['novels', 'literature-books'],
    excerpt: 'Dickens\'s orphan hero fights poverty, crime and cruelty in Victorian London.',
    about: 'Oliver Twist escapes the workhouse only to fall among thieves led by Fagin, while secrets about his birth slowly emerge.',
    why: 'A landmark social novel that still moves readers with its energy, outrage and unforgettable characters.' },
  { id: 'a-christmas-carol', gid: 46, title: 'A Christmas Carol', cover: 'literature', cats: ['novels', 'literature-books', 'stories-books'],
    excerpt: 'Dickens\'s beloved ghost story of Scrooge, redemption and the spirit of Christmas.',
    about: 'Ebenezer Scrooge is visited by three spirits who show him his past, present and future, forcing a miser to confront the life he has wasted.',
    why: 'Short enough to read in one evening and powerful enough to revisit every year — the definitive holiday classic.' },
  { id: 'silas-marner', gid: 550, title: 'Silas Marner', cover: 'literature', cats: ['novels', 'literature-books'],
    excerpt: 'George Eliot\'s tale of exile, hoarded gold and unexpected redemption in a rural village.',
    about: 'Wrongly accused and isolated, the weaver Silas Marner lives only for his gold until a child\'s arrival transforms his world.',
    why: 'A compact, deeply human novel about community, trust and what money cannot buy.' },
  { id: 'far-from-the-madding-crowd', gid: 107, title: 'Far from the Madding Crowd', cover: 'literature', cats: ['novels', 'literature-books'],
    excerpt: 'Hardy\'s novel of independent Bathsheba Everdene and the three men who love her.',
    about: 'In rural Wessex, Bathsheba inherits a farm and must navigate pride, passion and the consequences of her choices.',
    why: 'Hardy combines landscape, drama and psychological realism in one of his most accessible masterpieces.' },
  { id: 'twenty-thousand-leagues-under-the-sea', gid: 164, title: 'Twenty Thousand Leagues Under the Sea', cover: 'adventure', cats: ['novels', 'adventure-books', 'literature-books'],
    excerpt: 'Verne\'s underwater epic aboard Captain Nemo\'s submarine, the Nautilus.',
    about: 'Professor Aronnax joins an expedition that becomes captivity aboard a advanced submarine, touring oceans and witnessing wonders and danger.',
    why: 'One of the most influential adventure novels ever written, still thrilling for readers of every age.' },
  { id: 'the-mysterious-island', gid: 4390, title: 'The Mysterious Island', cover: 'adventure', cats: ['novels', 'adventure-books', 'literature-books'],
    excerpt: 'Castaways use science and courage to survive on a remote island in Verne\'s gripping sequel world.',
    about: 'During the American Civil War, five prisoners escape by balloon and crash on an uncharted island where survival depends on ingenuity.',
    why: 'A celebration of problem-solving, teamwork and wonder — Verne at his most optimistic.' },
  { id: 'the-hound-of-the-baskervilles', gid: 2852, title: 'The Hound of the Baskervilles', cover: 'novel', cats: ['novels', 'literature-books'],
    excerpt: 'Sherlock Holmes investigates a legendary curse on the moors in Doyle\'s most famous novel-length case.',
    about: 'Sir Charles Baskerville dies mysteriously on Dartmoor, and Holmes and Watson unravel a plot where legend masks murder.',
    why: 'The perfect Holmes entry point: atmospheric, tightly plotted and impossible to put down.' },
  { id: 'a-study-in-scarlet', gid: 244, title: 'A Study in Scarlet', cover: 'novel', cats: ['novels', 'literature-books'],
    excerpt: 'The first Sherlock Holmes novel — the meeting of Holmes and Watson and a case spanning London and America.',
    about: 'Dr Watson returns from war and meets the eccentric Sherlock Holmes, who pulls him into a baffling murder investigation.',
    why: 'Where the world\'s greatest detective partnership begins — essential for mystery fans.' },
  { id: 'the-invisible-man', gid: 5230, title: 'The Invisible Man', cover: 'adventure', cats: ['novels', 'adventure-books', 'literature-books'],
    excerpt: 'H.G. Wells\'s science-fiction thriller about power, secrecy and a man who cannot be seen.',
    about: 'Griffin discovers how to make himself invisible, but the gift quickly becomes a weapon that isolates and corrupts him.',
    why: 'A fast, unsettling classic that asks what happens when science removes accountability.' },
  { id: 'the-island-of-doctor-moreau', gid: 159, title: 'The Island of Doctor Moreau', cover: 'adventure', cats: ['novels', 'adventure-books', 'literature-books'],
    excerpt: 'Wells\'s dark fable of a scientist who reshapes animals into human-like creatures.',
    about: 'Shipwrecked Edward Prendick reaches an island where Doctor Moreau performs horrific experiments in the name of science.',
    why: 'Short, provocative and still relevant to debates about ethics, biology and what makes us human.' },
  { id: 'ivanhoe', gid: 82, title: 'Ivanhoe', cover: 'adventure', cats: ['novels', 'adventure-books', 'literature-books'],
    excerpt: 'Scott\'s knights, tournaments and Saxon–Norman conflict in medieval England.',
    about: 'The disinherited knight Ivanhoe returns in disguise to fight for honour, love and Richard the Lionheart\'s England.',
    why: 'The template for historical adventure — jousts, outlaws, castles and romance in one sweeping story.' },
  { id: 'the-three-musketeers', gid: 1257, title: 'The Three Musketeers', cover: 'adventure', cats: ['novels', 'adventure-books', 'literature-books'],
    excerpt: 'Dumas\'s swashbuckling epic of d\'Artagnan, Athos, Porthos and Aramis in seventeenth-century France.',
    about: 'Young d\'Artagnan arrives in Paris, befriends three musketeers and is drawn into court intrigue, duels and dangerous loyalty.',
    why: 'Perhaps the greatest adventure novel ever written — witty, relentless and endlessly quotable.' },
  { id: 'the-man-in-the-iron-mask', gid: 2759, title: 'The Man in the Iron Mask', cover: 'adventure', cats: ['novels', 'adventure-books', 'literature-books'],
    excerpt: 'Dumas\'s prison mystery and royal intrigue — the final Musketeers saga.',
    about: 'The ageing musketeers confront a state secret: a masked prisoner whose identity threatens the throne of France.',
    why: 'For readers who loved The Three Musketeers and want the epic conclusion.' },
  { id: 'crime-and-punishment', gid: 2554, title: 'Crime and Punishment', cover: 'literature', cats: ['novels', 'literature-books'],
    excerpt: 'Dostoevsky\'s psychological masterpiece of guilt, poverty and moral torment in St Petersburg.',
    about: 'Rodion Raskolnikov commits murder believing he is above ordinary morality, then slowly unravels under conscience and suspicion.',
    why: 'One of the deepest novels ever written about the mind under pressure — challenging and unforgettable.' },
  { id: 'the-metamorphosis', gid: 5200, title: 'The Metamorphosis', cover: 'literature', cats: ['novels', 'literature-books'],
    excerpt: 'Kafka\'s surreal novella of Gregor Samsa, who wakes transformed and is slowly abandoned by his family.',
    about: 'Gregor Samsa wakes to find himself changed into a giant insect, and the story follows his isolation in painfully ordinary detail.',
    why: 'A modern classic you can read in one sitting — strange, sad and endlessly discussed.' },
  { id: 'candide', gid: 19942, title: 'Candide', cover: 'literature', cats: ['novels', 'literature-books'],
    excerpt: 'Voltaire\'s satirical adventure mocking optimism, war and pretension.',
    about: 'Candide and his companions suffer every disaster imaginable while clinging to the philosophy that we live in the best of all possible worlds.',
    why: 'Short, sharp and hilarious — philosophy as a page-turning romp.' },
  { id: 'meditations', gid: 2680, title: 'Meditations', cover: 'self', cats: ['self-grooming-books', 'business-books'],
    excerpt: 'Marcus Aurelius\'s Stoic reflections on duty, mortality and self-control — still read by leaders today.',
    about: 'The Roman emperor wrote these private notes on how to live with integrity amid chaos, loss and power.',
    why: 'One of the most practical ancient texts for modern stress, ambition and resilience.' },
  { id: 'walden', gid: 205, title: 'Walden', cover: 'self', cats: ['self-grooming-books', 'literature-books'],
    excerpt: 'Thoreau\'s classic account of simple living, nature and deliberate choice at Walden Pond.',
    about: 'Henry David Thoreau records two years of life in a cabin, reflecting on society, solitude, work and what humans truly need.',
    why: 'Foundational reading for minimalism, environmental thought and anyone questioning the pace of modern life.' },
  { id: 'narrative-of-the-life-of-frederick-douglass', gid: 23, title: 'Narrative of the Life of Frederick Douglass', cover: 'literature', cats: ['literature-books', 'self-grooming-books'],
    excerpt: 'Douglass\'s powerful autobiography of slavery, literacy and the fight for freedom.',
    about: 'Frederick Douglass recounts his childhood in bondage, his path to reading and writing, and his escape to become a leading abolitionist voice.',
    why: 'Essential American reading — clear, courageous and historically indispensable.' },
  { id: 'the-importance-of-being-earnest', gid: 844, title: 'The Importance of Being Earnest', cover: 'literature', cats: ['literature-books', 'stories-books'],
    excerpt: 'Oscar Wilde\'s brilliant comedy of mistaken identity, buns and Victorian absurdity.',
    about: 'Two gentlemen invent false personas named Ernest to escape social obligations, unleashing a perfectly constructed comic chaos.',
    why: 'Wilde\'s funniest play in prose form — endlessly quotable and light as air.' },
  { id: 'the-wind-in-the-willows', gid: 289, title: 'The Wind in the Willows', cover: 'kids', cats: ['kids-learning-books', 'stories-books', 'literature-books'],
    excerpt: 'Mole, Rat, Toad and Badger along the riverbank in Grahame\'s gentle English classic.',
    about: 'Animal friends share picnics, adventures and loyalty beside the river, led by the impulsive, lovable Toad.',
    why: 'A comforting, witty book for children and adults who miss the idea of home and friendship.' },
  { id: 'black-beauty', gid: 271, title: 'Black Beauty', cover: 'kids', cats: ['kids-learning-books', 'stories-books'],
    excerpt: 'The autobiography of a horse — a Victorian classic about kindness and cruelty.',
    about: 'Black Beauty recounts life from a peaceful meadow through harsh masters and hard work, asking for compassion toward animals.',
    why: 'One of the most influential children\'s books ever written — short chapters and strong moral clarity.' },
  { id: 'the-happy-prince-and-other-tales', gid: 902, title: 'The Happy Prince and Other Tales', cover: 'kids', cats: ['kids-learning-books', 'stories-books', 'literature-books'],
    excerpt: 'Oscar Wilde\'s fairy tales of sacrifice, compassion and bittersweet beauty.',
    about: 'Stories including The Happy Prince and The Selfish Giant blend fantasy with moral insight in Wilde\'s lyrical prose.',
    why: 'Perfect for family reading — short, memorable and emotionally rich.' },
  { id: 'the-great-gatsby', gid: 64317, title: 'The Great Gatsby', cover: 'literature', cats: ['novels', 'literature-books'],
    excerpt: 'Fitzgerald\'s Jazz Age tragedy of ambition, wealth and the green light on Long Island.',
    about: 'Nick Carraway observes his mysterious neighbour Jay Gatsby, whose fortune and obsession collide with old money and doomed love.',
    why: 'A slim, dazzling American classic whose themes of aspiration and illusion feel permanent.' },
  { id: 'the-jungle', gid: 140, title: 'The Jungle', cover: 'literature', cats: ['novels', 'literature-books'],
    excerpt: 'Sinclair\'s muckraking novel exposing labour exploitation in Chicago\'s meatpacking industry.',
    about: 'Lithuanian immigrant Jurgis Rudkus arrives in America seeking prosperity and instead confronts brutal working conditions and corruption.',
    why: 'Historically important and still gripping as a story of survival against institutional cruelty.' },
  { id: 'common-sense', gid: 147, title: 'Common Sense', cover: 'business', cats: ['business-books', 'self-grooming-books'],
    excerpt: 'Thomas Paine\'s revolutionary pamphlet that helped shape American independence.',
    about: 'Paine argues plainly why colonies should break from Britain, making political ideas accessible to ordinary readers.',
    why: 'Short, forceful and foundational — history you can read in an afternoon.' }
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
    req.setTimeout(120000, () => req.destroy(new Error('timeout')));
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
    if (/^(CHAPTER|Chapter|BOOK|Book|Part|PART|LETTER|Letter|ACT|SCENE)\b/.test(line) || (line.length < 60 && line === line.toUpperCase() && /[A-Z]/.test(line))) {
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
    doc.fillColor('#ffffff').font('Times-Bold').fontSize(30).text(book.title, 64, 280, { align: 'center', width: doc.page.width - 128 });
    doc.fillColor('#d8e8e6').font('Times-Italic').fontSize(13).text((book.excerpt || '').slice(0, 160), 80, 420, { align: 'center', width: doc.page.width - 160 });
    doc.fillColor('#faf0e2').font('Helvetica').fontSize(11).text('Free PDF Edition  \u2022  www.lifewithbooks.co', 0, doc.page.height - 120, { align: 'center' });
    doc.fontSize(8).fillColor('#bcd3d1').text('This is a public-domain work, formatted and provided free by LifeWithBooks.', 64, doc.page.height - 90, { align: 'center', width: doc.page.width - 128 });
    doc.addPage();
    doc.fillColor('#222222').font('Times-Roman').fontSize(11.5);
    const paragraphs = toParagraphs(text);
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
