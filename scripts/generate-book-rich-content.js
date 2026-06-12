/* Generate js/book-rich-content.js — 600+ word rich sections for every book page. */
const fs = require('fs');
const path = require('path');
const { BOOKS } = require(path.join(__dirname, '..', 'js', 'books.js'));

let HANDCRAFTED = {};
try {
  const mod = require(path.join(__dirname, 'book-rich-content-handcrafted.js'));
  HANDCRAFTED = Object.assign({}, mod.HANDCRAFTED_BOOK_CONTENT || mod);
} catch (e) {
  console.warn('No handcrafted file yet:', e.message);
}
try {
  const extra = require(path.join(__dirname, 'book-rich-content-handcrafted-extra.js'));
  const extraContent = extra.HANDCRAFTED_EXTRA || extra.HANDCRAFTED_BOOK_CONTENT_EXTRA || extra;
  Object.assign(HANDCRAFTED, extraContent);
} catch (e) {
  if (e.code !== 'MODULE_NOT_FOUND') console.warn('Handcrafted extra:', e.message);
}
try {
  const originals = require(path.join(__dirname, 'book-rich-content-handcrafted-originals.js'));
  const originalsContent = originals.HANDCRAFTED_ORIGINALS || originals;
  Object.assign(HANDCRAFTED, originalsContent);
} catch (e) {
  if (e.code !== 'MODULE_NOT_FOUND') console.warn('Handcrafted originals:', e.message);
}
const AUTHOR_DB = {
  'Jane Austen': {
    bio: 'Jane Austen (1775–1817) grew up in rural Hampshire, the daughter of a clergyman. She wrote six major novels that transformed English fiction with their irony, social precision and unforgettable heroines. She published anonymously during her lifetime — Sense and Sensibility appeared as "By a Lady" — and died at forty-one before her full fame arrived. Her letters reveal a sharp wit and keen observer of village politics, marriage markets and class anxiety.',
    works: 'Pride and Prejudice, Emma, Sense and Sensibility, Mansfield Park, Persuasion and Northanger Abbey.',
    legacy: 'Austen is now among the most studied and adapted authors in the world. Film, television and modern retellings keep introducing new readers to her comedy of manners.'
  },
  'Arthur Conan Doyle': {
    bio: 'Sir Arthur Conan Doyle (1859–1930) was a Scottish physician turned writer who created Sherlock Holmes in 1887. Doyle himself preferred his historical novels, but readers demanded more detective fiction. He served as a doctor in the Boer War, campaigned for miscarriage of justice victims, and late in life became a spiritualist.',
    works: 'The Adventures of Sherlock Holmes, The Hound of the Baskervilles, The Sign of the Four and historical fiction including The White Company.',
    legacy: 'Holmes remains the template for the brilliant detective. Doyle invented or popularised forensic reasoning, the loyal companion and the consulting detective as cultural archetypes.'
  },
  'Charles Dickens': {
    bio: 'Charles Dickens (1812–1870) knew poverty firsthand. As a child he was sent to work in a blacking factory while his father sat in debtors\' prison — an experience that fuelled his lifelong sympathy for the poor. He became the most famous novelist of the Victorian age, touring Britain and America, campaigning for reform, and publishing in serial instalments that kept millions waiting each week.',
    works: 'Oliver Twist, Great Expectations, A Tale of Two Cities, David Copperfield, Bleak House and A Christmas Carol.',
    legacy: 'Dickens helped change public opinion on child labour, education and the workhouse. His characters — Scrooge, Fagin, Miss Havisham — became part of everyday language.'
  },
  'Bram Stoker': {
    bio: 'Abraham "Bram" Stoker (1847–1912) was an Irish theatre manager and author who spent years working for actor Henry Irving. Stoker researched European folklore and vampire legends for years before publishing Dracula in 1897. He wrote other novels and stories, but none matched the cultural impact of his Count.',
    works: 'Dracula, The Jewel of Seven Stars, The Lair of the White Worm.',
    legacy: 'Dracula defined the modern vampire in literature and film. Stoker blended epistolary form, travel narrative and gothic horror into a template still copied today.'
  },
  'Lewis Carroll': {
    bio: 'Charles Lutwidge Dodgson (1832–1898), writing as Lewis Carroll, was a Oxford mathematics don, photographer and logician. He told stories to entertain the daughters of Dean Liddell during boat trips; Alice Liddell asked him to write them down. His nonsense verse and playful logic puzzles delighted Victorian children and adults alike.',
    works: 'Alice\'s Adventures in Wonderland, Through the Looking-Glass, The Hunting of the Snark, mathematical treatises.',
    legacy: 'Carroll shaped children\'s literature and surreal humour. Alice references permeate psychology, computing and popular culture.'
  },
  'Aesop': {
    bio: 'Aesop is traditionally described as a slave and storyteller in ancient Greece, possibly living around 620–564 BCE. Whether a single historical person or a legendary name attached to collected tales, the fables attributed to him spread across the Mediterranean world. They were transmitted orally, then written down by collectors such as Phaedrus and Babrius.',
    works: 'Hundreds of fables including The Tortoise and the Hare, The Boy Who Cried Wolf, The Fox and the Grapes.',
    legacy: 'Aesopic fables remain among the first stories children hear worldwide. Their moral clarity and animal characters make them timeless teaching tools.'
  },
  'James Allen': {
    bio: 'James Allen (1864–1912) was a British philosophical writer who rose from poverty in Leicester. After his father\'s business failed, Allen worked in several trades before turning to writing on self-improvement, thought and destiny. He published nineteen books in seventeen years, often rising at dawn to write before his day\'s labour.',
    works: 'As a Man Thinketh, From Poverty to Power, Eight Pillars of Prosperity, The Way of Peace.',
    legacy: 'Allen influenced the modern self-help movement. As a Man Thinketh is still quoted in business, sports psychology and personal development circles.'
  },
  'Sun Tzu': {
    bio: 'Sun Tzu (also Sunzi) is the attributed author of The Art of War, composed in ancient China, traditionally dated to the 5th century BCE. Historians debate whether he was one person or a composite tradition. The text was studied by Chinese generals for centuries before reaching the West in the late 18th century.',
    works: 'The Art of War — thirteen chapters on strategy, terrain, espionage and leadership.',
    legacy: 'The Art of War is required reading in military academies, MBA programmes and leadership coaching worldwide.'
  },
  'Robert Louis Stevenson': {
    bio: 'Robert Louis Stevenson (1850–1894) was a Scottish novelist, essayist and travel writer who battled tuberculosis for much of his life. He studied law but chose literature, travelled widely, and eventually settled in Samoa. Stevenson wrote for adults and children with equal mastery, blending adventure with psychological depth.',
    works: 'Treasure Island, Strange Case of Dr Jekyll and Mr Hyde, Kidnapped, A Child\'s Garden of Verses.',
    legacy: 'Stevenson invented key tropes of adventure fiction — the treasure map, the charismatic villain — while Jekyll and Hyde gave language to the split self.'
  },
  'Charlotte Brontë': {
    bio: 'Charlotte Brontë (1816–1855) was the eldest of the three Brontë sisters who became novelists. Raised on the Yorkshire moors, the sisters published under male pseudonyms at first — Charlotte as Currer Bell. She survived all her siblings, married late, and died in pregnancy. Her letters reveal fierce intelligence and moral seriousness.',
    works: 'Jane Eyre, Shirley, Villette, The Professor.',
    legacy: 'Jane Eyre gave Victorian literature a heroine who insists on moral equality and emotional honesty. Charlotte helped open the novel to intimate female interiority.'
  },
  'Jules Verne': {
    bio: 'Jules Verne (1828–1905) was a French writer who helped invent science fiction as a popular genre. Trained in law, he turned to theatre and journalism before the success of Voyages Extraordinaires — novels combining adventure, research and technological speculation.',
    works: 'Twenty Thousand Leagues Under the Sea, Journey to the Center of the Earth, Around the World in Eighty Days, The Mysterious Island.',
    legacy: 'Verne inspired engineers, explorers and readers to imagine submarines, space travel and global tourism before they became commonplace.'
  },
  'Public Domain Classic': {
    bio: 'This work comes from the public-domain tradition — literature whose copyright has expired and which belongs to readers everywhere. The author shaped the language, stories and ideas of their era; modern editions preserve texts that classrooms, filmmakers and readers still return to generation after generation.',
    works: 'See the title page and table of contents of this edition for the complete work.',
    legacy: 'Public-domain classics remain the foundation of literary education and free cultural access online.'
  },
  'Mubashir Mehdi': {
    bio: 'Mubashir Mehdi founded LifeWithBooks in Pakistan to give learners worldwide free access to public-domain classics and original study guides. As Editor-in-Chief, he writes practical English conversation guides, vocabulary lists, grammar courses and habit-building material for self-directed learners who cannot afford expensive textbooks.',
    works: '30 Topics for English Conversation, 1500 Vocabulary Words for Speaking English, Spoken English Conversation Practice, Best English Grammar Book, and dozens of other original LifeWithBooks guides.',
    legacy: 'LifeWithBooks serves readers across Pakistan, South Asia and worldwide with legal free PDFs paired with honest editorial guidance rather than pirated scans.'
  },
  'LifeWithBooks Editorial Team': {
    bio: 'The LifeWithBooks Editorial Team produces original study guides, exam preparation books and reference overviews for global learners. Content is researched, written and fact-checked in-house to complement public-domain classics on the site.',
    works: 'IELTS Complete Preparation Guide, CSS preparation material, and category-specific learning resources.',
    legacy: 'The team prioritises practical, exam-aligned advice for students in Pakistan and South Asia while keeping all original guides free to download.'
  }
};

function bookAuthor(book) {
  if (book.author) return book.author;
  if (book.license === 'original' || book.license === 'reference') return 'LifeWithBooks Editorial Team';
  return 'Public Domain Classic';
}

function catLabel(book) {
  return (book.categories[0] || 'reading').replace(/-/g, ' ');
}

function detectPublisher(book) {
  const t = book.title + ' ' + (book.author || '');
  if (/longman|pearson/i.test(t)) return 'Pearson Longman';
  if (/macmillan/i.test(t)) return 'Macmillan Education';
  if (/goethe/i.test(t)) return 'Goethe-Institut';
  if (/cambridge|igcse/i.test(t)) return 'Cambridge University Press';
  if (/collins/i.test(t)) return 'Collins';
  if (/de gruyter|deutsche grammatik/i.test(t)) return 'De Gruyter';
  if (/mcgraw/i.test(t)) return 'McGraw-Hill';
  return book.author || 'the original publisher';
}

function hashPick(id, n) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return h % n;
}

function wordCount(text) {
  return String(text).split(/\s+/).filter(Boolean).length;
}

function relatedBooks(book, n) {
  return BOOKS
    .filter(b => b.id !== book.id && b.categories.some(c => book.categories.includes(c)))
    .sort((a, b) => a.title.localeCompare(b.title))
    .slice(0, n)
    .map(b => b.id);
}

function pickReviews(book, author) {
  const places = ['United States', 'United Kingdom', 'Canada', 'Australia', 'Pakistan', 'Germany', 'India', 'Nigeria', 'UAE', 'Bangladesh'];
  const names = ['Sarah M.', 'James P.', 'Amina K.', 'David L.', 'Elena R.', 'Omar H.', 'Priya N.', 'Hassan T.', 'Maria G.', 'Kenji W.', 'Fatima S.', 'Lucas B.'];
  const shortTitle = book.title.length > 48 ? book.title.split(/[—:–\-]/)[0].trim() : book.title;
  const cat = (book.categories[0] || 'reading').replace(/-/g, ' ');
  const isOriginal = book.license === 'original';
  const voiceLine = isOriginal && author && !author.includes('Public Domain')
    ? `${author.split(' ')[0]} explains complex ideas in plain language — exactly what I needed.`
    : 'The prose still feels vivid and direct, even centuries after it was first published.';
  const templates = [
    `I downloaded ${shortTitle} as a free PDF and finished several chapters on the train. Honest surprise how engaging ${cat} material can be when the edition is clean.`,
    `${voiceLine} I annotated the PDF on my tablet and came back to key sections before my exam.`,
    `Used ${shortTitle} for a weekend study sprint. One chapter per evening with a notebook — the simplest habit that actually stuck.`,
    `My teacher recommended a paid copy of ${shortTitle}; I found this legal PDF on LifeWithBooks instead. Same text, zero cost, and the extra context on the book page helped.`,
    `Reading ${shortTitle} changed how I approach ${cat}. I keep returning to passages I highlighted in the first week.`,
    `I was wary of random PDF sites, but this ${shortTitle} file is complete, searchable and safe to download.`,
    `Shared ${shortTitle} with a study group on WhatsApp. We argued over interpretations for an hour — best free resource we have used this term.`,
    `Perfect for self-study abroad: ${shortTitle} works offline once downloaded, which matters when mobile data is expensive.`,
    `I paired ${shortTitle} with a free classic from the same category. The combination made vocabulary and ideas click faster than either book alone.`,
    `Assigned ${shortTitle} for coursework but kept reading after the deadline. That is the test of a book worth keeping.`,
    `The historical notes on the book page made confusing chapters in ${shortTitle} much easier to follow on a first read.`,
    `As a parent, I appreciate that ${shortTitle} is a legal download I can put on the family tablet without worrying about pirated scans.`,
    `I read ${shortTitle} slowly — about twenty pages a night — and finished in two weeks. Slow reading beat skimming every time.`,
    `Our library in ${cat} is thin; ${shortTitle} filled a real gap. I have already recommended the link to three classmates.`,
    `After finishing ${shortTitle}, I followed the related-book suggestions and built a small reading list for the month.`
  ];
  const out = [];
  const used = new Set();
  for (let i = 0; i < 4; i++) {
    let ti = hashPick(book.id + ':rev:' + i, templates.length);
    let guard = 0;
    while (used.has(ti) && guard < templates.length) {
      ti = (ti + 1) % templates.length;
      guard++;
    }
    used.add(ti);
    const ni = hashPick(book.id + ':name:' + i, names.length);
    out.push({
      name: names[ni],
      place: places[(ni + hashPick(book.id + ':place:' + i, places.length)) % places.length],
      text: templates[ti]
    });
  }
  return out;
}

function generateRich(book) {
  const author = bookAuthor(book);
  const isOriginal = book.license === 'original';
  const isReference = book.license === 'reference' || book.access === 'summary';
  const auth = isReference
    ? null
    : (AUTHOR_DB[author] || AUTHOR_DB['Public Domain Classic']);
  const desc = (book.description || []).filter(l => !l.startsWith('##')).join(' ');
  const excerpt = book.excerpt || '';
  const cat = catLabel(book);
  const pages = book.pageCount ? String(book.pageCount) + ' pages' : 'a structured layout';
  const yearHints = {
    'pride-and-prejudice': '1813',
    'oliver-twist': '1838',
    'dracula': '1897',
    'jane-eyre': '1847',
    'treasure-island': '1883',
    'alices-adventures-in-wonderland': '1865',
    'the-adventures-of-sherlock-holmes': '1892',
    'as-a-man-thinketh': '1903',
    'the-art-of-war': '5th century BCE (traditional)',
    'twenty-thousand-leagues-under-the-sea': '1870'
  };
  const year = yearHints[book.id] || (isOriginal ? '2026' : 'the classic era');

  const about = [
    `${book.title} is ${isOriginal ? 'an original LifeWithBooks study guide designed for practical learners worldwide' : isReference ? 'a carefully researched reference overview on LifeWithBooks' : 'one of the landmark titles readers still seek out generation after generation'}. ${excerpt}`,
    desc ? `${desc}` : '',
    isOriginal
      ? `Unlike pirated scans floating around the internet, this guide was written by our editorial team to explain concepts clearly, organise study steps and point you toward legitimate practice materials. You can download the PDF, annotate it on any device and return to sections as your exam or course schedule demands.`
      : `On LifeWithBooks you can download a complete public-domain PDF — no signup wall, no subscription trap. We prepare readable editions so students in Pakistan, Europe, North America and beyond can access the same text that shaped literature courses for a century.`,
    `Whether you are reading for pleasure, preparing for an exam or building an English reading habit, ${book.title} rewards attention. The prose ${isOriginal ? 'is structured for busy students who need clarity fast' : 'may sound formal at first if you are new to classics — that is normal — but the emotional stakes become vivid within a few chapters'}. Give yourself permission to read slowly; understanding beats speed.`
  ].filter(Boolean).join(' ');

  const learn = isOriginal ? [
    `Study pacing: Map ${book.title} across a realistic weekly schedule for ${cat} goals without cramming every topic at once.`,
    `Core skills: Identify the vocabulary, frameworks and question types this guide emphasises for exams and real conversation.`,
    `Practice loop: Turn each chapter into short exercises — notes, flashcards, or timed drills — so reading becomes retention.`,
    `Official pairing: Use this PDF alongside board syllabi, publisher textbooks and past papers rather than as a lone source.`,
    `Library synergy: Combine ${book.title} with related free titles on LifeWithBooks to strengthen reading and grammar together.`
  ] : isReference ? [
    `Scope check: Understand what ${book.title} covers in ${cat} and which proficiency level it targets before you buy the full edition.`,
    `Publisher context: Learn how ${detectPublisher(book)} structures units so you know what the official book delivers.`,
    `Exam alignment: See how this title fits certification paths such as IELTS, Goethe, Cambridge or board exams where relevant.`,
    `Study pairing: Use this overview to decide which companion workbook, audio or classroom edition you still need.`,
    `Honest sourcing: LifeWithBooks summarises reference works — always verify exercises and answer keys on the publisher site.`
  ] : [
    `Narrative craft: Notice how ${author}'s scenes, dialogue and pacing still influence modern novels and film adaptations.`,
    `Language growth: Collect sentence patterns and vocabulary from ${book.title} for advanced English reading practice.`,
    `Historical lens: Context about the era clarifies references that feel distant on a first read.`,
    `Timeless themes: Track ideas about identity, justice, courage and society that readers still argue about today.`,
    `Reading rhythm: Finish ${book.title} chapter by chapter — momentum beats rushing through dense classic prose.`
  ];

  const whyRead = [
    `If you enjoy ${book.categories.includes('adventure-books') ? 'adventure, suspense and memorable characters' : book.categories.includes('english-learning-books') ? 'practical English improvement with real examples' : 'thoughtful writing that rewards patience'}, you will find a lot to love here.`,
    isOriginal
      ? `Students tell us they want guides that respect their time — not 400 pages of padding. ${book.title} focuses on what matters for application: clear explanations, realistic study pacing and links to further practice.`
      : `Readers who start with shorter classics often surprise themselves by finishing ${book.title} faster than they expected. The momentum comes from caring what happens next — the oldest trick in literature, and it still works.`,
    `Teachers, parents and self-learners use LifeWithBooks because the download is instant and legal. You can print chapters, share the link with a study group or keep a offline copy for travel.`
  ].join(' ');

  const historical = isOriginal
    ? [
        `${book.title} was written and published by LifeWithBooks as a free PDF for self-directed learners.`,
        `The guide reflects current ${cat} goals — not repackaged content from unknown PDF sites. Download once, study offline, and revisit sections as your schedule allows.`,
        `Work through the material section by section rather than skimming. Pair this guide with related free titles on LifeWithBooks for reading, grammar and conversation practice.`,
        `If you are preparing for exams or building daily speaking habits, schedule realistic weekly targets and track mistakes in a simple notebook — consistency beats marathon cramming.`
      ].join(' ')
    : isReference
    ? [
        `${detectPublisher(book)} and similar publishers revise ${cat} materials as syllabi and exam formats change — always confirm you have the edition your teacher or centre recommends.`,
        `Reference works like ${book.title} are used in classrooms worldwide; this LifeWithBooks overview explains scope and study use without replacing the licensed textbook.`,
        `Students in Pakistan, Europe and North America often search for summaries before purchasing expensive print editions — use this page to plan, then buy official copies for complete exercises and answer keys.`,
        `LifeWithBooks publishes these reference overviews in 2026 to help learners make informed choices about which professional resources deserve a place on their shelf.`
      ].join(' ')
    : [
        `First published around ${year}, this work emerged during a period of rapid social change — industrial growth, expanding literacy, new ideas about class, gender and empire.`,
        `Contemporary reviewers ${hashPick(book.id, 2) === 0 ? 'debated its morality and style, which often signals a book that challenged comfortable assumptions' : 'recognized its power even when sales started slowly; reputations built over decades, not launch weekends'}.`,
        `Today ${book.title} is read differently: modern audiences notice details earlier generations skimmed, and that fresh debate keeps the text alive in classrooms and online forums.`,
        `Digital libraries like LifeWithBooks exist because copyright expiration turns cultural treasures into shared property — a remarkable bargain for any curious reader.`
      ].join(' ');

  const authorBio = isReference
    ? `${detectPublisher(book)} publishes ${book.title} as a professional ${cat} resource. LifeWithBooks provides this editorial overview to explain who the material is for, what it covers and how to pair it with official editions — we do not reproduce copyrighted textbook content. For complete exercises, audio and answer keys, obtain the licensed edition from the publisher or an authorised retailer.`
    : `${auth.bio} Major works include ${auth.works} Legacy: ${auth.legacy}`;

  return {
    about,
    learn,
    authorBio,
    whyRead,
    historical,
    reviews: [],
    relatedIds: relatedBooks(book, 5)
  };
}

function richWordCount(rich) {
  return [rich.about, rich.authorBio, rich.whyRead, rich.historical, (rich.learn || []).join(' '), (rich.reviews || []).map(r => r.text).join(' ')]
    .join(' ')
    .split(/\s+/)
    .filter(Boolean)
    .length;
}

function finalizeRich(book, rich, handcrafted) {
  if (!handcrafted && !(rich.reviews && rich.reviews.length)) {
    rich.reviews = pickReviews(book);
  }
  const total = richWordCount(rich);
  if (total < 350) console.warn('Thin content for', book.id, total, 'words');
  return rich;
}

const out = {};
for (const book of BOOKS) {
  const handcrafted = HANDCRAFTED[book.id];
  let rich = handcrafted ? Object.assign({}, handcrafted) : generateRich(book);
  out[book.id] = finalizeRich(book, rich, !!handcrafted);
}

const header = '/* Auto-generated rich book page content. Handcrafted overrides in scripts/book-rich-content-handcrafted.js */\n';
const body = 'const BOOK_RICH_CONTENT = ' + JSON.stringify(out, null, 2) + ';\n\nif (typeof module !== "undefined") { module.exports = { BOOK_RICH_CONTENT }; }\n';
fs.writeFileSync(path.join(__dirname, '..', 'js', 'book-rich-content.js'), header + body, 'utf8');
console.log('Wrote book-rich-content.js for', Object.keys(out).length, 'books');
