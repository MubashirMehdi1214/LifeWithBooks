/* Expand the legal library: fetch ~24 more public-domain Gutenberg classics,
   build branded LifeWithBooks PDFs + download covers, and append entries to js/books.js.
   Every added book is access:"download", license:"public-domain". */
const fs = require('fs');
const path = require('path');
const https = require('https');
const PDFDocument = require('pdfkit');

const root = path.join(__dirname, '..');
const pdfDir = path.join(root, 'pdfs');
const coverDir = path.join(root, 'covers-img');
fs.mkdirSync(pdfDir, { recursive: true });
fs.mkdirSync(coverDir, { recursive: true });

const booksPath = path.join(root, 'js', 'books.js');
const { BOOKS, CATEGORIES } = require(booksPath);

// New public-domain titles. cover = theme color key used across the site.
const NEW_BOOKS = [
  { id: 'the-adventures-of-sherlock-holmes', gid: 1661, title: 'The Adventures of Sherlock Holmes', cover: 'novel', cats: ['novels', 'literature-books'],
    excerpt: 'Twelve classic detective stories featuring Sherlock Holmes and Dr Watson, from Arthur Conan Doyle.',
    about: 'This collection gathers twelve of the earliest and most celebrated Sherlock Holmes short stories, in which the brilliant detective and his loyal companion Dr Watson unravel baffling mysteries through observation and deduction.',
    why: 'Doyle invented the template for modern detective fiction here. Each self-contained case is a satisfying puzzle, and Holmes remains one of literature\'s most magnetic characters.' },
  { id: 'a-tale-of-two-cities', gid: 98, title: 'A Tale of Two Cities', cover: 'literature', cats: ['novels', 'literature-books'],
    excerpt: 'Dickens\'s sweeping novel of love and sacrifice set in London and Paris during the French Revolution.',
    about: 'Set against the turmoil of the French Revolution, this novel follows characters in London and Paris whose lives become entangled in resurrection, revenge and self-sacrifice.',
    why: 'With one of the most famous openings and endings in English literature, it pairs gripping historical drama with unforgettable themes of redemption.' },
  { id: 'great-expectations', gid: 1400, title: 'Great Expectations', cover: 'literature', cats: ['novels', 'literature-books'],
    excerpt: 'The coming-of-age story of the orphan Pip, his mysterious fortune and the lessons of ambition.',
    about: 'Great Expectations traces the life of the orphan Pip from a humble childhood to unexpected wealth, exploring class, guilt, loyalty and the gap between appearance and worth.',
    why: 'Dickens combines vivid characters such as Miss Havisham and the convict Magwitch with a moving study of what it really means to become a gentleman.' },
  { id: 'the-adventures-of-tom-sawyer', gid: 74, title: 'The Adventures of Tom Sawyer', cover: 'kids', cats: ['novels', 'kids-learning-books', 'adventure-books'],
    excerpt: 'Mark Twain\'s timeless tale of boyhood mischief, treasure and adventure along the Mississippi.',
    about: 'Tom Sawyer is a mischievous boy growing up beside the Mississippi River, whose escapades include whitewashing fences, hunting for treasure and witnessing a crime.',
    why: 'Twain captures the freedom and imagination of childhood with humour and warmth, making this a favourite for readers of every age.' },
  { id: 'adventures-of-huckleberry-finn', gid: 76, title: 'Adventures of Huckleberry Finn', cover: 'adventure', cats: ['novels', 'literature-books', 'adventure-books'],
    excerpt: 'Huck Finn and the runaway Jim journey down the Mississippi in Twain\'s great American novel.',
    about: 'Huckleberry Finn escapes his old life and rafts down the Mississippi with Jim, a man fleeing slavery, in a journey that questions the conscience of a nation.',
    why: 'Often called the great American novel, it blends adventure, satire and a powerful moral awakening told in Huck\'s unforgettable voice.' },
  { id: 'the-scarlet-letter', gid: 25344, title: 'The Scarlet Letter', cover: 'literature', cats: ['novels', 'literature-books'],
    excerpt: 'Hawthorne\'s study of sin, guilt and judgement in Puritan New England.',
    about: 'In Puritan Boston, Hester Prynne is forced to wear a scarlet "A" for adultery while refusing to name the father, in a tale of public shame and private conscience.',
    why: 'A foundational American novel that examines hypocrisy, dignity and resilience with haunting psychological depth.' },
  { id: 'wuthering-heights', gid: 768, title: 'Wuthering Heights', cover: 'literature', cats: ['novels', 'literature-books'],
    excerpt: 'Emily Bronte\'s stormy tale of passion and revenge on the Yorkshire moors.',
    about: 'The intense, destructive love between Heathcliff and Catherine plays out across two generations on the wild Yorkshire moors.',
    why: 'Bronte\'s only novel is a fierce, atmospheric masterpiece of obsession that broke the conventions of its time.' },
  { id: 'alices-adventures-in-wonderland', gid: 11, title: 'Alice\'s Adventures in Wonderland', cover: 'kids', cats: ['novels', 'kids-learning-books', 'stories-books'],
    excerpt: 'Lewis Carroll\'s whimsical journey down the rabbit hole into a world of nonsense and wonder.',
    about: 'Alice follows a waistcoat-wearing White Rabbit into a surreal world of talking creatures, riddles and impossible logic.',
    why: 'A joyful, inventive classic whose wordplay and imagination have delighted children and adults for over 150 years.' },
  { id: 'the-wonderful-wizard-of-oz', gid: 55, title: 'The Wonderful Wizard of Oz', cover: 'kids', cats: ['novels', 'kids-learning-books', 'stories-books'],
    excerpt: 'Dorothy and her friends follow the yellow brick road in Baum\'s beloved American fairy tale.',
    about: 'A cyclone sweeps Dorothy to the magical land of Oz, where she journeys to the Emerald City with a Scarecrow, a Tin Woodman and a Cowardly Lion.',
    why: 'A warm, imaginative adventure about friendship, courage and finding that what you seek is often already within you.' },
  { id: 'peter-pan', gid: 16, title: 'Peter Pan', cover: 'kids', cats: ['novels', 'kids-learning-books', 'adventure-books'],
    excerpt: 'The boy who never grows up takes the Darling children to Neverland in J.M. Barrie\'s classic.',
    about: 'Peter Pan whisks Wendy, John and Michael off to Neverland, a world of pirates, fairies and the fearsome Captain Hook.',
    why: 'A magical celebration of childhood and imagination that has enchanted generations of readers.' },
  { id: 'the-jungle-book', gid: 236, title: 'The Jungle Book', cover: 'adventure', cats: ['novels', 'kids-learning-books', 'adventure-books'],
    excerpt: 'Kipling\'s stories of Mowgli the man-cub raised by wolves in the Indian jungle.',
    about: 'A collection of tales centred on Mowgli, a boy raised by wolves and taught the law of the jungle by Baloo the bear and Bagheera the panther.',
    why: 'Vivid, wise and adventurous, these stories about belonging and the natural world remain enduringly popular.' },
  { id: 'moby-dick', gid: 2701, title: 'Moby-Dick', cover: 'adventure', cats: ['novels', 'literature-books', 'adventure-books'],
    excerpt: 'Captain Ahab\'s obsessive hunt for the great white whale in Melville\'s epic sea novel.',
    about: 'Aboard the whaling ship Pequod, the sailor Ishmael witnesses Captain Ahab\'s monomaniacal pursuit of the white whale that maimed him.',
    why: 'A towering work of American literature that blends thrilling adventure with profound meditations on obsession, nature and fate.' },
  { id: 'the-time-machine', gid: 35, title: 'The Time Machine', cover: 'adventure', cats: ['novels', 'adventure-books', 'literature-books'],
    excerpt: 'H.G. Wells\'s pioneering science-fiction journey into the distant future of humanity.',
    about: 'A Victorian inventor travels far into the future and discovers the gentle Eloi and the sinister Morlocks, a vision of where society might be heading.',
    why: 'One of the first and most influential science-fiction novels, packed with ideas that still feel strikingly modern.' },
  { id: 'the-war-of-the-worlds', gid: 36, title: 'The War of the Worlds', cover: 'adventure', cats: ['novels', 'adventure-books', 'literature-books'],
    excerpt: 'Wells\'s gripping account of a Martian invasion of Earth.',
    about: 'When cylinders fall from Mars and unleash deadly war machines, an ordinary narrator struggles to survive the collapse of civilisation.',
    why: 'A tense, visionary alien-invasion story that defined a genre and still resonates as a study of human fragility.' },
  { id: 'the-strange-case-of-dr-jekyll-and-mr-hyde', gid: 43, title: 'The Strange Case of Dr Jekyll and Mr Hyde', cover: 'novel', cats: ['novels', 'literature-books'],
    excerpt: 'Stevenson\'s chilling tale of a respectable doctor and his monstrous alter ego.',
    about: 'A lawyer investigates the disturbing connection between the kindly Dr Jekyll and the violent Mr Hyde, uncovering a dark experiment of the divided self.',
    why: 'A taut, unsettling classic whose central idea has become a permanent part of our language and imagination.' },
  { id: 'heart-of-darkness', gid: 219, title: 'Heart of Darkness', cover: 'literature', cats: ['novels', 'literature-books'],
    excerpt: 'Conrad\'s haunting voyage up the Congo River and into the depths of the human soul.',
    about: 'The sailor Marlow recounts his journey up the Congo in search of the enigmatic ivory trader Kurtz, confronting the brutality of colonialism.',
    why: 'A short but profound novel whose imagery and moral questions have influenced writers and filmmakers for over a century.' },
  { id: 'the-count-of-monte-cristo', gid: 1184, title: 'The Count of Monte Cristo', cover: 'adventure', cats: ['novels', 'adventure-books', 'literature-books'],
    excerpt: 'Dumas\'s sweeping epic of wrongful imprisonment, hidden treasure and elaborate revenge.',
    about: 'Edmond Dantes is betrayed and imprisoned, escapes, discovers a fortune and returns as the mysterious Count of Monte Cristo to repay his enemies.',
    why: 'A thrilling, page-turning adventure of justice and redemption that remains one of the most satisfying revenge stories ever written.' },
  { id: 'gullivers-travels', gid: 829, title: 'Gulliver\'s Travels', cover: 'adventure', cats: ['novels', 'adventure-books', 'literature-books'],
    excerpt: 'Swift\'s satirical voyages to lands of tiny people, giants and talking horses.',
    about: 'Lemuel Gulliver\'s four voyages take him to Lilliput, Brobdingnag and stranger places still, each a sharp satire of human nature and politics.',
    why: 'Both a fantastical adventure and a witty critique of society, it can be enjoyed as pure story or biting commentary.' },
  { id: 'robinson-crusoe', gid: 521, title: 'Robinson Crusoe', cover: 'adventure', cats: ['novels', 'adventure-books', 'literature-books'],
    excerpt: 'Defoe\'s classic tale of a castaway surviving alone on a desert island.',
    about: 'Shipwrecked and alone, Robinson Crusoe builds a life on a remote island over many years, learning self-reliance and reflecting on fortune and faith.',
    why: 'Often called the first English novel, it is the original survival story and a gripping study of ingenuity and endurance.' },
  { id: 'anne-of-green-gables', gid: 45, title: 'Anne of Green Gables', cover: 'kids', cats: ['novels', 'kids-learning-books', 'literature-books'],
    excerpt: 'The spirited orphan Anne Shirley transforms life at Green Gables in Montgomery\'s beloved novel.',
    about: 'Talkative, imaginative Anne is mistakenly sent to an elderly brother and sister, and quickly wins hearts on Prince Edward Island.',
    why: 'A heart-warming, funny and tender story about belonging, imagination and growing up that readers return to again and again.' },
  { id: 'the-secret-garden', gid: 113, title: 'The Secret Garden', cover: 'kids', cats: ['novels', 'kids-learning-books', 'literature-books'],
    excerpt: 'A lonely girl discovers a hidden garden and new life in Burnett\'s gentle classic.',
    about: 'Orphaned Mary Lennox is sent to a gloomy Yorkshire manor, where she uncovers a locked garden that brings healing to everyone around it.',
    why: 'A tender story about renewal, friendship and the restorative power of nature, loved by children and adults alike.' },
  { id: 'grimms-fairy-tales', gid: 2591, title: 'Grimms\' Fairy Tales', cover: 'kids', cats: ['stories-books', 'kids-learning-books'],
    excerpt: 'The original collection of timeless fairy tales gathered by the Brothers Grimm.',
    about: 'This collection brings together the classic tales of the Brothers Grimm, including Cinderella, Hansel and Gretel, Rapunzel and many more.',
    why: 'These foundational stories have shaped storytelling worldwide and remain magical, moral and endlessly retellable.' },
  { id: 'aesops-fables', gid: 21, title: 'Aesop\'s Fables', cover: 'kids', cats: ['stories-books', 'kids-learning-books', 'self-grooming-books'],
    excerpt: 'Short, wise fables with timeless moral lessons attributed to Aesop.',
    about: 'A collection of brief fables, each ending in a moral, featuring clever animals such as the tortoise and the hare and the fox and the grapes.',
    why: 'Perfect for quick reading and reflection, these fables teach lasting lessons about character, patience and wisdom.' },
  { id: 'as-a-man-thinketh', gid: 4507, title: 'As a Man Thinketh', cover: 'self', cats: ['self-grooming-books', 'business-books'],
    excerpt: 'James Allen\'s classic on how thought shapes character, circumstance and success.',
    about: 'This short, influential essay argues that our thoughts shape our character, our circumstances and ultimately our destiny.',
    why: 'A foundational self-development text, concise and quotable, that has inspired generations of readers seeking personal growth.' },
  { id: 'self-help-samuel-smiles', gid: 935, title: 'Self-Help', cover: 'self', cats: ['self-grooming-books', 'business-books'],
    excerpt: 'Samuel Smiles\'s Victorian classic on character, perseverance and self-improvement.',
    about: 'Through real-life examples of inventors, artists and entrepreneurs, Smiles argues that diligence, character and perseverance are the true engines of success.',
    why: 'The book that popularised the term "self-help", full of motivating examples of what determination can achieve.' },
  { id: 'autobiography-of-benjamin-franklin', gid: 20203, title: 'The Autobiography of Benjamin Franklin', cover: 'business', cats: ['business-books', 'self-grooming-books'],
    excerpt: 'Franklin\'s own account of his rise through industry, virtue and lifelong self-improvement.',
    about: 'One of the Founding Fathers recounts his journey from humble beginnings to international renown, including his famous plan for cultivating thirteen virtues.',
    why: 'A practical, inspiring memoir on discipline, frugality and continuous self-improvement that reads like timeless personal-development advice.' }
];

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
    const paragraphs = text.split(/\n{2,}/).map((p) => p.replace(/\n/g, ' ').trim()).filter(Boolean);
    paragraphs.forEach((p) => doc.text(p, { align: 'left', paragraphGap: 8, lineGap: 2 }));
    doc.end();
    stream.on('finish', () => resolve(fs.statSync(dest).size));
    stream.on('error', reject);
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
      const raw = await fetchText(def.gid);
      const text = cleanText(raw);
      if (text.length < 2000) { console.log('SHORT  ', def.id, text.length); continue; }
      const size = await buildPdf(def, text);
      const hasCover = await fetchCover(def.gid, path.join(coverDir, def.id + '.jpg'));
      BOOKS.push(makeEntry(def, hasCover));
      added += 1;
      console.log('ADDED  ', def.id, (size / 1024 | 0) + 'KB', hasCover ? '+cover' : 'no-cover');
    } catch (e) {
      console.log('FAIL   ', def.id, e.message);
    }
  }
  serialize();
  console.log('Done. Added', added, 'books. Total now', BOOKS.length);
})();
