/* Generate js/articles-more-3.js — "Free [Title] PDF Guide" SEO articles. */
const fs = require('fs');
const path = require('path');

const { BOOKS } = require(path.join(__dirname, '..', 'js', 'books.js'));

const GUIDE_IDS = [
  'dracula',
  'the-picture-of-dorian-gray',
  'little-women',
  'a-tale-of-two-cities',
  'the-adventures-of-tom-sawyer',
  'adventures-of-huckleberry-finn',
  'around-the-world-in-eighty-days',
  'the-call-of-the-wild',
  'alices-adventures-in-wonderland',
  'the-time-machine',
  'wuthering-heights',
  'moby-dick',
  'the-scarlet-letter',
  'the-adventures-of-sherlock-holmes',
  'the-strange-case-of-dr-jekyll-and-mr-hyde'
];

const DATES = [
  '2026-05-20', '2026-05-22', '2026-05-24', '2026-05-26', '2026-05-28',
  '2026-05-30', '2026-06-01', '2026-06-03', '2026-06-05', '2026-06-07',
  '2026-06-09', '2026-06-11', '2026-06-13', '2026-06-15', '2026-06-17'
];

const EXTRA = {
  dracula: {
    author: 'Bram Stoker',
    year: '1897',
    hook: 'the novel that defined the modern vampire',
    readTime: '8–12 hours',
    audience: 'horror fans, Gothic literature readers and anyone curious about the original Count Dracula before Hollywood versions',
    tips: 'Read in evening sessions — the epistolary format (letters and journal entries) makes it easy to pause between chapters. Keep a note of character names as the story shifts between narrators.'
  },
  'the-picture-of-dorian-gray': {
    author: 'Oscar Wilde',
    year: '1890',
    hook: 'Wilde\'s only novel — a witty, unsettling fable about beauty and moral decay',
    readTime: '5–7 hours',
    audience: 'readers who enjoy philosophical fiction, sharp dialogue and Victorian social satire',
    tips: 'Pay attention to Lord Henry\'s epigrams — they sound charming but carry the book\'s central warning about influence and vanity.'
  },
  'little-women': {
    author: 'Louisa May Alcott',
    year: '1868',
    hook: 'one of the most beloved coming-of-age novels in English',
    readTime: '10–14 hours',
    audience: 'teen and adult readers, families reading together, and anyone who wants a warm story about ambition and sisterhood',
    tips: 'Many editions include both parts of the story. If the tone shifts midway, that is normal — Part Two follows the sisters into adulthood.'
  },
  'a-tale-of-two-cities': {
    author: 'Charles Dickens',
    year: '1859',
    hook: 'Dickens\'s sweeping novel of the French Revolution',
    readTime: '10–12 hours',
    audience: 'historical fiction lovers and readers ready for Dickens\'s blend of drama, romance and sacrifice',
    tips: 'The opening chapter is famous for a reason — read it twice. If the first fifty pages feel dense, push through to the Paris sections where the plot accelerates.'
  },
  'the-adventures-of-tom-sawyer': {
    author: 'Mark Twain',
    year: '1876',
    hook: 'the definitive American boyhood adventure',
    readTime: '6–8 hours',
    audience: 'young readers, parents, and adults who want a funny, nostalgic portrait of childhood on the Mississippi',
    tips: 'Twain\'s humour is dry — read aloud if a scene feels flat. The whitewashing fence chapter is a masterclass in persuasion.'
  },
  'adventures-of-huckleberry-finn': {
    author: 'Mark Twain',
    year: '1884',
    hook: 'often called the great American novel',
    readTime: '9–11 hours',
    audience: 'mature readers ready for adventure, satire and a serious moral journey on the Mississippi River',
    tips: 'The novel uses historical language that can be uncomfortable today. Read with context: Twain was critiquing the society that produced those attitudes.'
  },
  'around-the-world-in-eighty-days': {
    author: 'Jules Verne',
    year: '1872',
    hook: 'the globe-trotting race that popularised adventure travel fiction',
    readTime: '6–8 hours',
    audience: 'travel lovers, adventure readers and anyone who wants a brisk, optimistic story',
    tips: 'Track Fogg\'s route on a map as you read — it adds to the fun and helps you follow the timetable that drives the suspense.'
  },
  'the-call-of-the-wild': {
    author: 'Jack London',
    year: '1903',
    hook: 'a raw, powerful novella about instinct and survival',
    readTime: '3–4 hours',
    audience: 'readers who want a short, intense classic — ideal for a weekend read',
    tips: 'This is a novella, not a full novel. Read it in one or two sittings to feel the momentum of Buck\'s transformation.'
  },
  'alices-adventures-in-wonderland': {
    author: 'Lewis Carroll',
    year: '1865',
    hook: 'the surreal classic that invented a new kind of children\'s imagination',
    readTime: '3–5 hours',
    audience: 'children, parents, and adults who enjoy wordplay, logic puzzles and pure whimsy',
    tips: 'Do not hunt for a single hidden meaning in every scene — enjoy the nonsense first, then notice the gentle satire of Victorian manners.'
  },
  'the-time-machine': {
    author: 'H.G. Wells',
    year: '1895',
    hook: 'the pioneering science-fiction novella about humanity\'s distant future',
    readTime: '3–4 hours',
    audience: 'sci-fi fans, philosophy-minded readers and anyone curious where the genre began',
    tips: 'The middle section is really a social essay disguised as adventure. Wells is asking what class division might become if stretched across millennia.'
  },
  'wuthering-heights': {
    author: 'Emily Brontë',
    year: '1847',
    hook: 'a stormy masterpiece of passion and revenge on the Yorkshire moors',
    readTime: '9–11 hours',
    audience: 'readers who enjoy intense, atmospheric romance and do not need likeable characters on every page',
    tips: 'Keep a simple family tree as you read — generations overlap and names repeat. The frame narrator Lockwood gives you permission to feel confused at first.'
  },
  'moby-dick': {
    author: 'Herman Melville',
    year: '1851',
    hook: 'the epic American novel about obsession, whaling and the white whale',
    readTime: '15–20 hours',
    audience: 'serious readers ready for digressions, symbolism and one of literature\'s greatest adventure plots',
    tips: 'Treat the whaling chapters like optional deep dives — skim when you must, slow down for Ahab\'s speeches. Many readers alternate one chapter of plot with one chapter of lore.'
  },
  'the-scarlet-letter': {
    author: 'Nathaniel Hawthorne',
    year: '1850',
    hook: 'a foundational American novel about guilt, judgement and quiet courage',
    readTime: '6–8 hours',
    audience: 'readers interested in Puritan America, moral drama and psychological fiction',
    tips: 'Hawthorne\'s sentences are long — read aloud when you lose the thread. The scaffold scenes anchor the whole book; note what changes each time Hester stands there.'
  },
  'the-adventures-of-sherlock-holmes': {
    author: 'Arthur Conan Doyle',
    year: '1892',
    hook: 'twelve perfect detective stories that invented the modern mystery',
    readTime: '6–8 hours',
    audience: 'mystery fans, short-story readers and anyone who wants bite-sized classics',
    tips: 'Each story stands alone — read one per day like a mini puzzle. After finishing, compare how often Holmes is right versus lucky.'
  },
  'the-strange-case-of-dr-jekyll-and-mr-hyde': {
    author: 'Robert Louis Stevenson',
    year: '1886',
    hook: 'the short classic about divided identity that changed horror forever',
    readTime: '2–3 hours',
    audience: 'busy readers, horror fans and students who need a manageable classic in one sitting',
    tips: 'You likely know the twist already — read for Stevenson\'s language about temptation and respectability. The book is shorter than most film adaptations suggest.'
  }
};

function slugId(bookId) {
  return 'free-' + bookId + '-pdf-guide';
}

function coverFor(book) {
  return book.cover || 'literature';
}

function buildBody(book, meta) {
  const bookUrl = 'book.html?id=' + encodeURIComponent(book.id);
  const title = book.title;
  return [
    'Looking for a free ' + title + ' PDF? You are in the right place. ' + title + ' by ' + meta.author + ' (' + meta.year + ') is a public-domain classic, which means you can download and read the complete text legally at no cost. LifeWithBooks hosts a clean PDF edition you can save to your phone, tablet or computer — no sign-up, no subscription, and no pirated scans from unknown sources.',
    'This guide explains what the book is about, who will enjoy it, how long it takes to read, and exactly where to get your free copy on LifeWithBooks.',
    '## What Is ' + title + '?',
    book.excerpt + ' First published in ' + meta.year + ', it remains ' + meta.hook + '. Because copyright has expired, readers worldwide can access legitimate free editions — and our library is one of the easiest places to start.',
    '## Why Download the Free PDF?',
    'A free PDF lets you read offline on any device, search for passages instantly, adjust font size for comfortable reading, and keep the book forever without relying on a streaming service or broken web pages. For students, teachers and self-learners, a downloadable public-domain text is one of the most practical study tools available.',
    'Unlike unofficial upload sites, LifeWithBooks clearly labels public-domain titles and provides a direct download through our book page. You get the full novel — not a sample chapter or a low-quality scan missing pages.',
    '## Who Should Read This Book?',
    meta.audience + '. If you are building a classics reading list, studying English literature, or simply want a great story without buying another paperback, this free PDF is an excellent choice.',
    '## How Long Does It Take to Read?',
    'Most readers finish ' + title + ' in about ' + meta.readTime + ' at a comfortable pace. Because this is a PDF, you can read in short sessions — ten minutes on a commute, twenty minutes before sleep — and pick up exactly where you left off.',
    '## Reading Tips for the Best Experience',
    meta.tips + ' If you use a phone, switch to landscape mode or increase text size in your PDF reader. Bookmark key chapters as you go — especially helpful for long classics.',
    '## About the Author',
    meta.author + ' wrote ' + title + ' in the nineteenth or early twentieth century, and the book has never gone out of print. Reading the original text — not just a summary — lets you see why teachers, filmmakers and other writers keep returning to this material.',
    '## Is It Legal to Download?',
    'Yes. Public-domain works are no longer under copyright, so sharing and downloading them is legal. LifeWithBooks only offers direct downloads for titles that qualify. We also publish original guides and reference pages for modern copyrighted books, pointing readers to official sources instead of piracy.',
    '## Similar Free Classics on LifeWithBooks',
    'If you enjoy ' + title + ', browse our literature and adventure categories for more free PDF classics — from Dickens and Austen to Verne and Doyle. Building a personal digital library costs nothing when you stick to public-domain titles.',
    '## Download Your Free ' + title + ' PDF',
    'Ready to start reading? Visit our ' + title + ' book page on LifeWithBooks, tap Download Free PDF, and save the file to your device. You can also read the full description, explore related books, and open our reading guides for tips on getting more from every page.',
    'Start here: ' + bookUrl + ' — free, legal, and ready in seconds.'
  ];
}

const articles = GUIDE_IDS.map((id, i) => {
  const book = BOOKS.find(b => b.id === id);
  if (!book) throw new Error('Book not found: ' + id);
  const meta = EXTRA[id];
  const title = 'Free ' + book.title + ' PDF Guide: Download the Full Book Legally';
  return {
    id: slugId(id),
    title: title,
    date: DATES[i],
    author: 'LifeWithBooks Editorial Team',
    cover: coverFor(book),
    excerpt: 'Download ' + book.title + ' as a free, legal PDF on LifeWithBooks. Public-domain edition — complete text, no sign-up. Guide includes summary, reading tips and download link.',
    body: buildBody(book, meta)
  };
});

function jsString(s) {
  return JSON.stringify(s);
}

let out = '/* SEO articles — Free [Book Title] PDF guides (batch 3). Auto-generated; edit scripts/generate-book-guide-articles.js to rebuild. */\n';
out += 'const ARTICLES_MORE_3 = [\n';
articles.forEach((a, idx) => {
  out += '  {\n';
  out += '    id: ' + jsString(a.id) + ',\n';
  out += '    title: ' + jsString(a.title) + ',\n';
  out += '    date: ' + jsString(a.date) + ',\n';
  out += '    author: ' + jsString(a.author) + ',\n';
  out += '    cover: ' + jsString(a.cover) + ',\n';
  out += '    excerpt: ' + jsString(a.excerpt) + ',\n';
  out += '    body: [\n';
  a.body.forEach(p => {
    out += '      ' + jsString(p) + ',\n';
  });
  out += '    ]\n';
  out += '  }' + (idx < articles.length - 1 ? ',' : '') + '\n';
});
out += '];\n\n';
out += 'if (typeof module !== "undefined") {\n';
out += '  module.exports = { ARTICLES_MORE_3 };\n';
out += '}\n';

const dest = path.join(__dirname, '..', 'js', 'articles-more-3.js');
fs.writeFileSync(dest, out, 'utf8');
console.log('Written', articles.length, 'book PDF guide articles to', dest);
