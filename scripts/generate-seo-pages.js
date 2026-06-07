/* Generate static SEO pages: /book/*.html, /category/*.html, /articles/*.html, js/article-meta.js */
const fs = require('fs');
const path = require('path');
const { renderHead, renderScripts, ORIGIN, esc } = require('./site-head.js');

const root = path.join(__dirname, '..');
const today = new Date().toISOString().slice(0, 10);

const { BOOKS, CATEGORIES } = require(path.join(root, 'js', 'books.js'));
const { BOOK_RICH_CONTENT } = require(path.join(root, 'js', 'book-rich-content.js'));
const { CATEGORY_RICH_CONTENT } = require(path.join(root, 'js', 'category-rich-content.js'));
const { AUTHORS } = require(path.join(root, 'js', 'authors-data.js'));
const { pdfPublicPath } = require('./pdf-download-path');
let ARTICLES = [];
try {
  require(path.join(root, 'js', 'articles-more-1.js'));
  require(path.join(root, 'js', 'articles-more-2.js'));
  require(path.join(root, 'js', 'articles-more-3.js'));
  require(path.join(root, 'js', 'articles-more-4.js'));
  require(path.join(root, 'js', 'articles-more-5.js'));
  try { require(path.join(root, 'js', 'articles-more-6.js')); } catch (e) {}
  try { require(path.join(root, 'js', 'articles-more-7.js')); } catch (e) {}
  try { require(path.join(root, 'js', 'articles-adsense-rewrites.js')); } catch (e) {}
  ARTICLES = require(path.join(root, 'js', 'articles.js')).ARTICLES || [];
} catch (e) {}

const CATEGORY_SEO = {
  'ielts-preparation': {
    pageTitle: 'Free IELTS Preparation Books PDF | Practice Tests | LifeWithBooks',
    metaDescription: 'Free IELTS preparation books and PDF study guides — Academic practice tests, Writing Task 1 & 2, Speaking topics, vocabulary and Listening tips on LifeWithBooks.',
    intro: 'Prepare for IELTS Academic with free reference guides on LifeWithBooks. Browse practice test strategies, writing and speaking frameworks, vocabulary builders and listening techniques — then use official IELTS materials for full exam readiness.',
    heading: 'Free IELTS Preparation Books'
  },
  'css-pms-books': {
    pageTitle: 'Free CSS PMS Exam Books PDF | Past Papers | LifeWithBooks',
    metaDescription: 'Free CSS and PMS exam preparation guides for Pakistani students — English essay, precis, current affairs and general knowledge PDF resources on LifeWithBooks.',
    intro: 'CSS and PMS candidates in Pakistan can browse free study guides on LifeWithBooks covering English essay writing, precis, current affairs, general knowledge and provincial PMS preparation — structured overviews to complement your official syllabus and past papers.',
    heading: 'CSS & PMS Exam Books'
  },
  'matric-fsc-notes': {
    pageTitle: 'Free Matric FSc Notes PDF | Study Guides | LifeWithBooks',
    metaDescription: 'Free Matric and FSc notes PDF guides for Pakistani students — English, Physics, Chemistry, Biology and Mathematics revision on LifeWithBooks.',
    intro: 'Matric and FSc students can find free PDF study guides on LifeWithBooks for English grammar, Physics short questions, Chemistry, Biology and Mathematics. Use these structured overviews alongside your board textbooks and past papers.',
    heading: 'Matric & FSc Notes'
  },
  'islamic-books': {
    pageTitle: 'Free Islamic Books PDF | Download | LifeWithBooks',
    metaDescription: 'Free Islamic books and study guides PDF — Seerah, Arabic, Islamic history and Quran translation resources on LifeWithBooks.',
    intro: 'Browse free Islamic book guides on LifeWithBooks — overviews of Seerah, Arabic for beginners, Islamic history timelines and Quran translation study methods. We link to reputable publishers for authorised editions.',
    heading: 'Free Islamic Books'
  },
  'kids-learning-books': {
    pageTitle: 'Free Kids Learning Books PDF | Educational | LifeWithBooks',
    metaDescription: 'Free kids learning books PDF — classic fairy tales, fables, adventure stories and educational reads for children on LifeWithBooks.',
    intro: 'Parents and teachers can download free kids learning books and classic stories on LifeWithBooks — Aesop\'s Fables, Grimm\'s Fairy Tales, Alice in Wonderland and more public-domain titles safe for family reading.',
    heading: 'Kids Learning Books'
  },
  'programming-books': {
    pageTitle: 'Free Programming Books PDF | Python HTML JavaScript | LifeWithBooks',
    metaDescription: 'Free programming books and beginner guides PDF — Python, HTML, CSS, JavaScript, Git and SQL on LifeWithBooks.',
    intro: 'Learn programming with free beginner guides on LifeWithBooks. Start with Python, HTML and CSS, then move to JavaScript, Git version control and SQL databases — each guide links to official documentation for deeper learning.',
    heading: 'Free Programming Books'
  },
  'vocabulary-books': {
    pageTitle: 'Free Vocabulary Ebooks (PDF) | LifeWithBooks',
    metaDescription: 'Browse free vocabulary ebooks and PDF study guides for English learners on LifeWithBooks.',
    intro: 'Free vocabulary ebooks and PDF resources for English learners: photo dictionaries, core word lists, and vocabulary-in-use style guides.',
    heading: 'Free Vocabulary Ebooks'
  },
  'english-learning-books': {
    pageTitle: 'English Learning Books PDF Free Download | LifeWithBooks',
    metaDescription: 'English learning books PDF — free grammar, conversation, vocabulary and course guides. Free english books pdf download at lifewithbooks.co.',
    intro: 'Browse english learning books PDF guides on LifeWithBooks — grammar, conversation practice, vocabulary and course overviews. Start your free english books pdf download today with no signup.',
    heading: 'English Learning Books PDF'
  },
  'self-development-books': {
    pageTitle: 'Free Self Development Books PDF | LifeWithBooks',
    metaDescription: 'Free self development books PDF and free business books PDF — motivation, leadership, prosperity and personal growth titles on LifeWithBooks.',
    intro: 'Build better habits with free self development books and free business books PDF on LifeWithBooks — public-domain classics like As a Man Thinketh, Meditations, Scientific Advertising and modern study guides for lifelong growth.',
    heading: 'Self Development Books'
  },
  'business-books': {
    pageTitle: 'Free Business Books PDF | Leadership & Management | LifeWithBooks',
    metaDescription: 'Free business books PDF — leadership, management, marketing classics and study guides. Download a free business book overview on LifeWithBooks.',
    intro: 'Looking for a free business book? Browse free business books PDF guides on LifeWithBooks — leadership, strategy, advertising and personal effectiveness classics you can read online before buying official editions.',
    heading: 'Free Business Books PDF'
  },
  'german-learning-books': {
    pageTitle: 'German Learning Books PDF | Deutsch Intensiv Wortschatz | LifeWithBooks',
    metaDescription: 'German learning books PDF — Goethe exam guides, Deutsch Intensiv Wortschatz, grammar and vocabulary for A1–C1 learners on LifeWithBooks.',
    intro: 'Learn German with free German learning books on LifeWithBooks — Goethe-Zertifikat preparation, Deutsch Intensiv Wortschatz vocabulary guides, grammar references and conversation practice for every level from A1 to C2.',
    heading: 'German Learning Books',
    extraIntro: '<p style="text-align:center;max-width:760px;margin:0 auto 30px;">Popular resources include <a href="../book/so-gehts-zu-b2.html">So geht\'s zu B2</a>, <a href="../book/deutsch-intensiv-wortschatz-c1.html">Deutsch Intensiv Wortschatz C1</a>, Goethe B1 vocabulary, grammar lists and letter-writing practice — all browsable free on LifeWithBooks.</p>'
  },
  'deutsch-books': {
    pageTitle: 'Deutsch Books PDF | German Language Learning | LifeWithBooks',
    metaDescription: 'Deutsch books PDF — German grammar, Wortschatz and Goethe exam resources. Browse Deutsch Intensiv Wortschatz and more on LifeWithBooks.',
    intro: 'Browse Deutsch books for German learners — grammar workbooks, Deutsch Intensiv Wortschatz vocabulary, Goethe exam practice sets and primary-school quizzes. Find structured overviews for every CEFR level.',
    heading: 'Deutsch Books',
    extraIntro: '<p style="text-align:center;max-width:760px;margin:0 auto 30px;">Advanced learners often search for <strong>Deutsch Intensiv Wortschatz</strong> — see our <a href="../book/deutsch-intensiv-wortschatz-c1.html">C1 vocabulary guide</a> plus Goethe B1/B2 Wortschatz and grammar references in this category.</p>'
  },
  'o-level-a-level': {
    pageTitle: 'Free O Level A Level Study Materials PDF | LifeWithBooks',
    metaDescription: 'Free O Level and A Level study guides PDF — Cambridge English, Math, Biology, Psychology and IGCSE preparation on LifeWithBooks.',
    intro: 'Cambridge O Level, A Level and IGCSE students can browse free revision guides on LifeWithBooks covering English Language, Mathematics, Biology, Psychology and exam planning strategies.',
    heading: 'O Level & A Level'
  },
  'adventure-books': {
    pageTitle: 'Free Adventure Books PDF | Jules Verne & Classics | LifeWithBooks',
    metaDescription: 'Free adventure books PDF — 20,000 Leagues Under the Sea, Treasure Island, Around the World in 80 Days and classic novels. Instant download.',
    intro: 'Download free adventure books PDF — Jules Verne, Robert Louis Stevenson, Alexandre Dumas and more public-domain classics. Captain Nemo, pirates, and globe-trotting heroes await.',
    heading: 'Free Adventure Books PDF'
  }
};

const BOOK_SEO = {
  '30-topics-for-english-conversation': {
    pageTitle: '30 Topics for English Conversation PDF | Free Download | LifeWithBooks',
    h1: '30 Topics for English Conversation - Free PDF Guide',
    metaDescription: 'Download 30 Topics for English Conversation PDF free. Essential topics for IELTS speaking, job interviews and everyday English. No signup required.',
    extraHtml: '<p>This free <strong>30 topics for English conversation PDF</strong> guide covers 30 essential themes for English conversation practice — perfect for IELTS speaking preparation, job interviews, and everyday English. Download free with no signup required.</p><p>Looking for a <strong>30 topics for English conversation PDF</strong>? Each topic includes warm-up questions, key vocabulary and sample answers so you can practise speaking confidently every day.</p>',
    relatedIds: ['ielts-complete-preparation-guide', 'spoken-english-conversation-practice', '1500-vocabulary-words-for-speaking-english'],
    faq: [
      { q: 'Is 30 Topics for English Conversation available as PDF?', a: 'Yes — download the 30 Topics for English Conversation PDF free at lifewithbooks.co with one click. No signup needed.' },
      { q: 'Is this book good for IELTS speaking?', a: 'Yes — the guide covers common IELTS speaking topics with questions, vocabulary and sample answers ideal for band 6+ practice.' }
    ]
  },
  'twenty-thousand-leagues-under-the-sea': {
    pageTitle: '20,000 Leagues Under the Sea Free PDF | Jules Verne | LifeWithBooks',
    h1: '20,000 Leagues Under the Sea by Jules Verne - Free PDF Download',
    metaDescription: 'Download 20,000 Leagues Under the Sea by Jules Verne completely free. Classic adventure novel featuring Captain Nemo. No signup required. Instant PDF download.',
    extraHtml: '<p>Download the <strong>20000 leagues under the sea PDF</strong> free — Jules Verne\'s 1870 masterpiece aboard Captain Nemo\'s submarine Nautilus. This <strong>20000 leagues under the sea free download</strong> is a complete public-domain edition you can keep forever.</p><p>Searching for <strong>Captain Nemo PDF</strong> or <strong>Jules Verne PDF free</strong>? This LifeWithBooks edition includes the full novel — one of the most downloaded adventure classics on our site.</p>',
    relatedIds: ['journey-to-the-center-of-the-earth', 'around-the-world-in-eighty-days', 'the-mysterious-island', 'treasure-island'],
    faq: [
      { q: 'Is 20,000 Leagues Under the Sea available as a free PDF?', a: 'Yes — download the complete Jules Verne novel free at lifewithbooks.co. No signup required.' },
      { q: 'Who is Captain Nemo?', a: 'Captain Nemo is the mysterious commander of the submarine Nautilus in this classic Jules Verne adventure novel.' }
    ]
  },
  'journey-to-the-center-of-the-earth': {
    pageTitle: 'Journey to the Center of the Earth PDF Free | Jules Verne | LifeWithBooks',
    h1: 'Journey to the Center of the Earth — Free PDF by Jules Verne',
    metaDescription: 'Download Journey to the Center of the Earth by Jules Verne free PDF. Classic underground adventure novel. Public domain — instant download.',
    extraHtml: '<p>Free <strong>Jules Verne PDF</strong> — Journey to the Center of the Earth follows Professor Lidenbrock into volcanic depths. Download this public-domain adventure classic alongside our other Verne titles.</p>'
  },
  'around-the-world-in-eighty-days': {
    pageTitle: 'Around the World in 80 Days PDF Free | Jules Verne | LifeWithBooks',
    h1: 'Around the World in Eighty Days — Free PDF Download',
    metaDescription: 'Download Around the World in 80 Days by Jules Verne free PDF. Phileas Fogg\'s globe-trotting race against time. Free public-domain download.',
    extraHtml: '<p>Download <strong>Around the World in 80 Days</strong> as a free Jules Verne PDF — the adventure that defined globe-trotting fiction for generations of readers.</p>'
  },
  'the-mysterious-island': {
    pageTitle: 'The Mysterious Island PDF Free | Jules Verne | LifeWithBooks',
    h1: 'The Mysterious Island by Jules Verne — Free PDF',
    metaDescription: 'Download The Mysterious Island by Jules Verne free PDF. Castaway survival adventure — sequel to 20,000 Leagues. Public domain download.',
    extraHtml: '<p>Another essential <strong>Jules Verne PDF free</strong> download — The Mysterious Island connects to Captain Nemo\'s world in this gripping castaway adventure.</p>'
  },
  'treasure-island': {
    pageTitle: 'Treasure Island PDF Free Download | Robert Louis Stevenson | LifeWithBooks',
    h1: 'Treasure Island — Free PDF Download',
    metaDescription: 'Download Treasure Island by Robert Louis Stevenson free PDF. Classic pirate adventure with Long John Silver. Instant public-domain download.',
    extraHtml: '<p>One of the most searched <strong>adventure book PDF</strong> titles — Treasure Island is free to download with pirates, buried gold and Jim Hawkins.</p>'
  },
  'ielts-complete-preparation-guide': {
    pageTitle: 'IELTS Preparation Guide PDF Free | 3000 Words | LifeWithBooks',
    h1: 'IELTS Complete Preparation Guide — Free PDF Download',
    metaDescription: 'Free IELTS preparation guide PDF — how to prepare for IELTS with books, 3000 vocabulary words, Writing, Speaking and 30-day study plan. Download free.',
    extraHtml: '<p>Looking for an <strong>IELTS PDF</strong> or <strong>how to prepare for IELTS with books</strong>? This original LifeWithBooks guide covers all four skills with 300 thematic vocabulary entries — your complete <strong>IELTS preparation guide PDF free</strong> download.</p><p>Includes <strong>IELTS 3000 words PDF</strong> vocabulary themes, band 7+ Writing samples, Reading practice and a realistic 30-day schedule for busy students.</p>',
    relatedIds: ['ielts-vocabulary-builder-3000-words', '30-topics-for-english-conversation', 'spoken-english-conversation-practice'],
    faq: [
      { q: 'Where can I find IELTS 3000 words PDF?', a: 'Download our free IELTS Complete Preparation Guide at lifewithbooks.co — it includes 300 essential thematic vocabulary entries plus a link to our IELTS 3000 Words vocabulary builder.' },
      { q: 'How to prepare for IELTS with books?', a: 'Start with this free IELTS preparation guide PDF, then add official Cambridge practice tests. Our guide explains all four modules and includes a 30-day study plan.' }
    ]
  },
  'ielts-vocabulary-builder-3000-words': {
    pageTitle: 'IELTS 3000 Words PDF | Free Vocabulary Guide | LifeWithBooks',
    h1: 'IELTS 3000 Words PDF — Vocabulary Builder Guide',
    metaDescription: 'Download our IELTS 3000 words PDF study guide free. Thematic vocabulary for Academic IELTS Writing and Speaking — band 6.5+ word lists on LifeWithBooks.',
    extraHtml: '<p>Searching for an <strong>IELTS 3000 words PDF</strong>? This LifeWithBooks vocabulary builder groups essential Academic Word List themes with collocations and review tips. Use this <strong>IELTS 3000 words PDF</strong> overview to plan systematic vocabulary growth for your exam.</p>'
  },
  'so-gehts-zu-b2': {
    pageTitle: 'So geht\'s zu B2 PDF Kostenlos | Goethe B2 Übungsbuch | LifeWithBooks',
    h1: 'So geht\'s zu B2 — Kostenloses PDF für Goethe B2',
    metaDescription: 'So geht\'s zu B2 PDF kostenlos herunterladen — German B2 exam Übungsbuch. Grammar, Wortschatz and Goethe-Zertifikat B2 practice on LifeWithBooks.',
    extraHtml: '<p>Searching for <strong>so geht\'s zu B2</strong> or <strong>So gehts zu B2</strong>? Download this German B2 practice workbook free — ideal alongside Goethe-Zertifikat B2 preparation materials on LifeWithBooks.</p>'
  },
  'deutsch-intensiv-wortschatz-c1': {
    pageTitle: 'Deutsch Intensiv Wortschatz C1 PDF Kostenlos | Goethe C1 | LifeWithBooks',
    h1: 'Deutsch Intensiv Wortschatz C1 — Kostenloses PDF',
    metaDescription: 'Deutsch Intensiv Wortschatz C1 PDF kostenlos — intensive German vocabulary for Goethe C1. Free PDF download on LifeWithBooks.',
    extraHtml: '<p><strong>Deutsch Intensiv Wortschatz</strong> is one of the most searched German vocabulary resources for C1 learners. Download the free PDF with thematic word sets, collocations and productive exercises for Goethe C1 exam preparation.</p>'
  }
};

const ARTICLE_SEO = {
  'how-to-prepare-for-ielts-using-free-pdf-books': {
    pageTitle: 'How to Prepare for IELTS Using Free PDF Books | LifeWithBooks',
    metaDescription: 'How to prepare for IELTS with books — free IELTS PDF guides, 3000 words vocabulary and 8-week study plan. Download free at lifewithbooks.co.',
    extraHtml: '<p>Wondering <strong>how to prepare for IELTS with books</strong> on a budget? This guide shows you how to combine free <strong>IELTS PDF</strong> resources with official practice tests for band 7+ results.</p>',
    faq: [
      { q: 'Where can I find IELTS 3000 words PDF?', a: 'Download our free IELTS vocabulary guide with 3000 essential words at lifewithbooks.co/book/ielts-vocabulary-builder-3000-words.html — or get the full IELTS Complete Preparation Guide with vocabulary built in.' },
      { q: 'Can I pass IELTS with only free PDF books?', a: 'Free guides help you plan and understand the test, but you should also complete official practice tests under timed conditions before booking your exam.' }
    ]
  }
};

function getBookSeo(book) {
  return BOOK_SEO[book.id] || {};
}

function renderFaqHtml(faq) {
  if (!faq || !faq.length) return '';
  const items = faq.map(item =>
    `<details class="faq-item"><summary>${esc(item.q)}</summary><p>${esc(item.a)}</p></details>`
  ).join('\n      ');
  return `<section class="book-faq"><h2>Frequently Asked Questions</h2>\n      ${items}\n    </section>`;
}

function renderFaqSchema(faq) {
  if (!faq || !faq.length) return '';
  return `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a }
    }))
  })}</script>`;
}

function escJson(s) {
  return JSON.stringify(s);
}

function resolveGutenbergId(book) {
  if (book.gutenbergId) return String(book.gutenbergId);
  const pdf = book.pdf || '';
  return (pdf.match(/gutenberg\.org\/(?:ebooks|files)\/(\d+)/) || pdf.match(/gutenberg\.org\/cache\/epub\/(\d+)/) || [])[1] || '';
}

function bookCoverSrc(book, p) {
  if (book.coverImage && !/^https?:\/\//i.test(book.coverImage)) {
    const rel = book.coverImage.replace(/^\//, '');
    if (fs.existsSync(path.join(root, rel))) return p + book.coverImage;
  } else if (book.coverImage && /^https?:\/\//i.test(book.coverImage)) {
    return book.coverImage;
  }
  const gid = resolveGutenbergId(book);
  if (gid) return 'https://www.gutenberg.org/cache/epub/' + gid + '/pg' + gid + '.cover.medium.jpg';
  const pdf = book.pdf || '';
  const did = (pdf.match(/drive\.google\.com\/file\/d\/([^/]+)/) || pdf.match(/[?&]id=([^&]+)/) || [])[1];
  if (did) return 'https://drive.google.com/thumbnail?id=' + did + '&sz=w1000';
  return p + 'covers/' + book.id + '.svg';
}

function coverPicture(book, p, eager) {
  const src = bookCoverSrc(book, p);
  const isRemote = /^https?:\/\//i.test(src);
  const webp = !isRemote && book.coverImage && /\.(jpg|jpeg|png)$/i.test(src)
    ? src.replace(/\.(jpg|jpeg|png)$/i, '.webp')
    : null;
  const loading = eager ? 'eager' : 'lazy';
  const fp = eager ? ' fetchpriority="high"' : '';
  const jpgOnly = webp ? src : null;
  const onerr = webp && jpgOnly
    ? ` onerror="this.onerror=null;var p=this.closest('picture');if(p){p.querySelectorAll('source').forEach(function(s){s.remove();});}this.src='${esc(jpgOnly)}';"`
    : '';
  const imgAttrs = `id="book-cover-img" class="book-cover-img book-detail-cover" src="${esc(src)}" alt="${esc(book.title)} cover" width="280" height="420" loading="${loading}" referrerpolicy="no-referrer"${fp}${onerr}`;
  if (webp) {
    return `<div class="book-cover-section"><div id="cover-container" class="cover-container"><picture><source srcset="${esc(webp)}" type="image/webp"><img ${imgAttrs}></picture></div></div>`;
  }
  return `<div class="book-cover-section"><div id="cover-container" class="cover-container"><img ${imgAttrs}></div></div>`;
}

function bookAuthor(book) {
  if (book.author) return book.author;
  const m = (book.excerpt || '').match(/^([A-Z][^.—]+(?:'s)?)/);
  if (m && m[1].length < 40) return m[1].replace(/'s$/, '').trim();
  if (book.license === 'reference' || book.access === 'summary') return 'LifeWithBooks Editorial Team';
  return 'Public Domain Classic';
}

function bookMetaTitle(book) {
  const isRef = book.license === 'reference' || book.access === 'summary';
  const isClassic = book.license === 'public-domain';
  if (isRef) return book.title + ' | Reference Study Overview | LifeWithBooks';
  if (book.access === 'download' && isClassic) return book.title + ' Free PDF | Classic Novel | LifeWithBooks';
  if (book.access === 'download') return book.title + ' Free PDF | Study Guide | LifeWithBooks';
  return book.title + ' | LifeWithBooks';
}

function isSummaryOnlyBook(book) {
  return (book.access === 'summary' || book.license === 'reference') && !book.pdfDirect;
}

function isPdfGuideArticle(a) {
  return /^free-.+-pdf-guide$/.test(a.id);
}

function pdfGuideBookSlug(articleId) {
  return articleId.replace(/^free-/, '').replace(/-pdf-guide$/, '');
}

function bookMetaDesc(book) {
  let d = (book.excerpt || book.title + ' on LifeWithBooks.').slice(0, 155);
  if (d.length > 155) d = d.slice(0, 152) + '...';
  return d;
}

function sortCategoryBooks(items) {
  const rank = (b) => (b.pdfDirect ? 0 : b.access === 'download' && b.license === 'original' ? 1 : b.access === 'download' ? 2 : 3);
  return items.slice().sort((a, b) => rank(a) - rank(b) || a.title.localeCompare(b.title));
}

function getBookRich(book) {
  return BOOK_RICH_CONTENT[book.id] || null;
}

function formatLearnItem(item) {
  const colon = item.indexOf(':');
  if (colon > 0 && colon < 80) {
    return '<li><strong>' + esc(item.slice(0, colon).trim()) + ':</strong> ' + esc(item.slice(colon + 1).trim()) + '</li>';
  }
  return '<li>' + esc(item) + '</li>';
}

function resolveRichAuthorName(book, rich) {
  if (book.author) return book.author;
  const bio = rich && rich.authorBio ? String(rich.authorBio) : '';
  const was = bio.match(/^([A-Z][A-Za-z.'\u00C0-\u024F\s-]+?)\s+was\s/);
  if (was) return was[1].trim();
  const paren = bio.match(/^([A-Z][A-Za-z.'\s-]+?)\s*\(\d/);
  if (paren) return paren[1].trim();
  return bookAuthor(book);
}

function renderRichBookSections(book, p) {
  const rich = getBookRich(book);
  if (!rich) return '';
  const author = resolveRichAuthorName(book, rich);
  const title = book.title;
  let aboutText = String(rich.about || '');
  let aboutParts = aboutText.split(/\n\n+/).filter(Boolean);
  if (aboutParts.length === 1 && aboutText.split(/\s+/).filter(Boolean).length > 120) {
    const sentences = aboutText.match(/[^.!?]+[.!?]+/g) || [aboutText];
    const mid = Math.ceil(sentences.length / 2);
    aboutParts = [sentences.slice(0, mid).join(' ').trim(), sentences.slice(mid).join(' ').trim()].filter(Boolean);
  }
  const aboutHtml = aboutParts.map(para => '<p>' + esc(para) + '</p>').join('\n      ');
  const learnHtml = rich.learn && rich.learn.length
    ? '<section class="book-section"><h2>What You Will Discover</h2><ul>' + rich.learn.map(formatLearnItem).join('') + '</ul></section>'
    : '';
  const starRatings = ['★★★★★', '★★★★★', '★★★★☆', '★★★★★'];
  const reviews = (rich.reviews || []).slice(0, 4);
  const reviewsHtml = reviews.length
    ? '<section class="book-section book-reviews"><h2>What Readers Say</h2>' + reviews.map((r, i) =>
      '<div class="review"><div class="stars">' + starRatings[i % starRatings.length] + '</div><p>&ldquo;' + esc(r.text) + '&rdquo;</p><cite>&mdash; ' + esc(r.name) + ', ' + esc(r.place) + '</cite></div>'
    ).join('') + '</section>'
    : '';
  return '<div class="book-rich-content">' + [
    '<section class="book-section"><h2>About ' + esc(title) + '</h2>' + aboutHtml + '</section>',
    learnHtml,
    '<section class="book-section"><h2>About ' + esc(author) + '</h2><p>' + esc(rich.authorBio) + '</p></section>',
    '<section class="book-section"><h2>Why Read This Book in 2026</h2><p>' + esc(rich.whyRead) + '</p></section>',
    '<section class="book-section"><h2>Historical Context</h2><p>' + esc(rich.historical) + '</p></section>',
    reviewsHtml
  ].filter(Boolean).join('\n      ') + '</div>';
}

function renderRelatedBooks(book, p, seo) {
  const ids = (seo.relatedIds || []).concat((getBookRich(book) || {}).relatedIds || [])
    .concat(BOOKS.filter(b => b.id !== book.id && b.categories.some(c => book.categories.includes(c))).map(b => b.id))
    .filter((id, i, arr) => arr.indexOf(id) === i)
    .slice(0, 5);
  const items = ids.map(id => BOOKS.find(b => b.id === id)).filter(Boolean);
  if (!items.length) return '';
  const lis = items.map(b =>
    '<li><a href="' + encodeURIComponent(b.id) + '.html"><span>' + esc(b.title) + '</span><span class="arrow">View &raquo;</span></a></li>'
  ).join('\n          ');
  return '<div class="related-posts"><h3>Related Books</h3><ul>' + lis + '</ul></div>';
}

function fullGuideBannerHtml(book, p) {
  if (!book.fullGuideId) return '';
  const full = BOOKS.find((b) => b.id === book.fullGuideId);
  if (!full) return '';
  const bookUrl = p + 'book/' + encodeURIComponent(full.id) + '.html';
  const pdfUrl = full.pdfDirect && full.pdf ? pdfPublicPath(full) : '';
  const pdfBtn = pdfUrl
    ? ` <a class="btn" href="${esc(pdfUrl)}" download="${esc(full.id)}.pdf">&#8595; Download PDF${full.pageCount ? ' (' + full.pageCount + ' pages)' : ''}</a>`
    : '';
  return `<div class="book-full-guide-banner"><p><strong>Want the full book?</strong> This page is a short overview. Open our complete original guide with free PDF download:</p><p style="margin-top:12px;"><a class="btn" href="${esc(bookUrl)}">${esc(full.title)}</a>${pdfBtn}</p></div>`;
}

function renderBookPage(book, depth) {
  const p = depth === 0 ? '' : '../';
  const url = ORIGIN + '/book/' + encodeURIComponent(book.id) + '.html';
  const seo = getBookSeo(book);
  const pageTitle = seo.pageTitle || bookMetaTitle(book);
  const metaDesc = seo.metaDescription || bookMetaDesc(book);
  const h1 = seo.h1 || book.title;
  const primaryCat = book.categories[0] || 'literature-books';
  const catObj = CATEGORIES.find(c => c.slug === primaryCat);
  const catLabel = catObj ? catObj.label : 'Books';
  const catUrl = ORIGIN + '/category/' + primaryCat + '.html';
  const author = bookAuthor(book);
  const downloadable = book.access === 'download';
  const cover = coverPicture(book, p, true);
  const richHtml = renderRichBookSections(book, p);
  const descHtml = (book.description || []).map(line => {
    if (line.indexOf('## ') === 0) return '<h2>' + esc(line.slice(3)) + '</h2>';
    return '<p>' + esc(line) + '</p>';
  }).join('\n      ');
  const extraSeoHtml = seo.extraHtml || '';
  const faqHtml = renderFaqHtml(seo.faq);
  const faqSchema = renderFaqSchema(seo.faq);
  const extra = '<p>LifeWithBooks published this page on ' + today + '. Last updated ' + today + '.</p>';
  const jsonLd = `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: book.title,
    author: { '@type': 'Person', name: author },
    description: metaDesc,
    inLanguage: 'en',
    url: url,
    datePublished: today,
    dateModified: today,
    image: ORIGIN + '/og/books/' + book.id + '.png',
    publisher: { '@type': 'Organization', name: 'LifeWithBooks', url: ORIGIN + '/' }
  })}</script>
  <script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: ORIGIN + '/' },
      { '@type': 'ListItem', position: 2, name: catLabel, item: catUrl },
      { '@type': 'ListItem', position: 3, name: book.title, item: url }
    ]
  })}</script>${faqSchema}`;

  const downloadNote = book.license === 'original'
    ? 'Original LifeWithBooks guide — free PDF you can keep and share.'
    : 'This is a free, legal public-domain edition.';
  const pdfHref = book.pdfDirect && book.pdf
    ? pdfPublicPath(book)
    : p + 'download.html?id=' + encodeURIComponent(book.id);
  const downloadBtn = book.pdfDirect && book.pdf
    ? `<a class="btn" href="${esc(pdfHref)}" download="${esc(book.id)}.pdf">&#8595; Download Free PDF</a>`
    : `<a class="btn" href="${esc(pdfHref)}">&#8595; Download Free PDF</a>`;
  const download = downloadable
    ? `<div class="download-block"><p>${downloadNote}</p>${downloadBtn}<p class="download-meta">${book.pageCount ? esc(String(book.pageCount)) + '-page PDF' : 'PDF'} &middot; Instant download</p></div>`
    : `<div class="download-block summary-block"><p>Reference overview — see official sources for the full work where applicable.</p></div>`;
  const originalBadge = book.license === 'original'
    ? '<span class="tag tag-original">ORIGINAL GUIDE</span>'
    : '';
  const pageTag = book.pageCount
    ? '<span class="tag">' + esc(String(book.pageCount)) + ' pages</span>'
    : '';
  const leadHtml = book.blurb
    ? '<div class="book-lead"><p>' + esc(book.blurb) + '</p></div>'
    : '';

  const relatedBlock = renderRelatedBooks(book, p, seo);
  const skipDescArticle = !!getBookRich(book);
  const introArticleHtml = skipDescArticle ? '' : descHtml;

  return renderHead({
    title: pageTitle,
    description: metaDesc,
    canonical: url,
    ogType: 'book',
    image: ORIGIN + '/og/books/' + book.id + '.webp',
    jsonLd,
    robots: isSummaryOnlyBook(book) ? 'noindex, follow' : undefined
  }, depth) + `
<body data-page="book" data-book-id="${esc(book.id)}" data-seo-static="true" data-path-depth="1" id="top">
  <div id="site-header-host"></div>
  <main class="book-single" id="book-detail">
    <div class="breadcrumb"><a href="${p}index.html">Home</a> &raquo; <a href="${p}category/${primaryCat}.html">${esc(catLabel)}</a> &raquo; <span>${esc(book.title)}</span></div>
    ${cover}
    <h1>${esc(h1)}</h1>
    <div class="meta"><span class="tag">${esc(author)}</span>${originalBadge}${pageTag}<span class="tag">${downloadable ? 'Free PDF Download' : 'Study Guide'}</span></div>
    ${leadHtml}
    ${fullGuideBannerHtml(book, p)}
    <article class="article">${extraSeoHtml}${introArticleHtml}</article>
    ${download}
    ${richHtml}
    ${faqHtml}
    ${relatedBlock}
  </main>
  <div id="site-footer-host"></div>
` + renderScripts(depth, true);
}

function categoryBookCard(b, p) {
  function coverSrc(book) {
    if (book.coverImage && !/^https?:\/\//i.test(book.coverImage)) {
      const rel = book.coverImage.replace(/^\//, '');
      if (fs.existsSync(path.join(root, rel))) return p + book.coverImage;
    } else if (book.coverImage && /^https?:\/\//i.test(book.coverImage)) {
      return book.coverImage;
    }
    const gid = resolveGutenbergId(book);
    if (gid) return 'https://www.gutenberg.org/cache/epub/' + gid + '/pg' + gid + '.cover.medium.jpg';
    const pdf = book.pdf || '';
    const did = (pdf.match(/drive\.google\.com\/file\/d\/([^/]+)/) || pdf.match(/[?&]id=([^&]+)/) || [])[1];
    if (did) return 'https://drive.google.com/thumbnail?id=' + did + '&sz=w1000';
    return p + 'covers/' + book.id + '.svg';
  }
  const src = coverSrc(b);
  const fallback = p + 'covers/' + b.id + '.svg';
  const webp = (!/^https?:\/\//i.test(src) && /\.(jpg|jpeg|png)$/i.test(src)) ? src.replace(/\.(jpg|jpeg|png)$/i, '.webp') : null;
  let coverHtml;
  if (webp) {
    coverHtml = `<picture><source srcset="${esc(webp)}" type="image/webp"><img class="cover-image" src="${esc(src)}" alt="${esc(b.title)} cover" width="200" height="200" loading="lazy" data-fallback="${esc(fallback)}" onerror="if(this.dataset.fallback&amp;&amp;this.src!==this.dataset.fallback){this.src=this.dataset.fallback}else{this.style.display='none';var n=this.closest('.cover');if(n){var f=n.querySelector('.book');if(f)f.style.display='block'}}"></picture>`;
  } else {
    coverHtml = `<img class="cover-image" src="${esc(src)}" alt="${esc(b.title)} cover" width="200" height="200" loading="lazy" referrerpolicy="no-referrer" onerror="this.style.display='none';var n=this.closest('.cover');if(n){var f=n.querySelector('.book');if(f)f.style.display='block'}">`;
  }
  const pdfBadge = b.pdfDirect ? '<span class="book-card__pdf-badge">Free PDF</span>' : '';
  const readLabel = b.pdfDirect ? 'Download Free' : 'Read More';
  return `<article class="book-card cover-${esc(b.cover || 'english')}"><a class="thumb" href="${p}book/${encodeURIComponent(b.id)}.html"><div class="cover">${pdfBadge}${coverHtml}<div class="book" style="display:none;"><span class="title-on-cover">${esc(b.title)}</span></div></div></a><div class="info"><h3><a href="${p}book/${encodeURIComponent(b.id)}.html">${esc(b.title)}</a></h3><p class="article-excerpt">${esc((b.excerpt || '').slice(0, 100))}</p><a class="read-more" href="${p}book/${encodeURIComponent(b.id)}.html">${readLabel}</a></div></article>`;
}

function renderCategoryPage(slug, depth) {
  const p = depth === 0 ? '' : '../';
  const seo = CATEGORY_SEO[slug];
  const cat = CATEGORIES.find(c => c.slug === slug);
  if (!cat) return '';
  const url = ORIGIN + '/category/' + slug + '.html';
  const title = seo ? seo.pageTitle : cat.label + ' | LifeWithBooks';
  const desc = seo ? seo.metaDescription : 'Browse ' + cat.label + ' on LifeWithBooks.';
  const CATEGORY_RICH_ALIASES = {
    'css-pms-books': 'css-pms-pakistan',
    'health-books': 'health-wellness-books',
    'matric-fsc-notes': 'matric-fsc-books',
    'stories-books': 'kids-stories'
  };
  const richKey = CATEGORY_RICH_CONTENT[slug] ? slug : (CATEGORY_RICH_ALIASES[slug] || slug);
  const rich = CATEGORY_RICH_CONTENT[richKey] || {};
  const intro = rich.intro || (seo ? seo.intro : 'Browse free books in ' + cat.label + ' on LifeWithBooks.');
  const extraIntro = seo && seo.extraIntro ? seo.extraIntro : '';
  const heading = seo ? seo.heading : cat.label;
  const readingGuide = rich.readingGuide
    ? '<section class="category-reading-guide"><h2>Reading Guide</h2><p>' + esc(rich.readingGuide) + '</p></section>'
    : '';
  const featuredIds = rich.featuredArticleIds || [];
  const featuredHtml = featuredIds.length
    ? '<section class="category-featured-articles"><h2>Featured Reading Guides</h2><ul>' + featuredIds.map(id => {
        const a = ARTICLES.find(x => x.id === id);
        if (!a) return '';
        return '<li><a href="' + p + 'articles/' + encodeURIComponent(id) + '.html">' + esc(a.title) + '</a></li>';
      }).join('') + '</ul></section>'
    : '';
  const items = sortCategoryBooks(BOOKS.filter(b => b.categories.includes(slug)));
  const cards = items.map(b => categoryBookCard(b, p)).join('\n      ');
  const jsonLd = `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: heading,
    url: url,
    description: desc,
    hasPart: items.slice(0, 20).map(b => ({ '@type': 'Book', name: b.title, url: ORIGIN + '/book/' + b.id + '.html' }))
  })}</script>`;

  return renderHead({ title, description: desc, canonical: url, image: ORIGIN + '/og/categories/' + slug + '.webp', jsonLd }, depth) + `
<body data-page="category" data-cat="${esc(slug)}" data-seo-static="true" data-path-depth="1" id="top">
  <div id="site-header-host"></div>
  <section class="section">
    <div class="section-title"><h1>${esc(heading)}</h1></div>
    <div class="category-intro article" style="max-width:820px;margin:0 auto 30px;"><p>${esc(intro)}</p></div>
    ${extraIntro}
    ${featuredHtml}
    ${readingGuide}
    <div class="book-grid" id="category-grid">${cards || '<p style="text-align:center;">Books coming soon.</p>'}</div>
  </section>
  <div id="category-articles"></div>
  <div id="site-footer-host"></div>
` + renderScripts(depth, true);
}

function getArticleSeo(article) {
  return ARTICLE_SEO[article.id] || {};
}

const AUTHOR_PAGE_SLUGS = {
  'Sarah Mitchell': 'sarah-mitchell',
  'James Parker': 'james-parker',
  'Mubashir Mehdi': 'mubashir-mehdi'
};

function renderArticleAuthorTag(authorName, depth) {
  const p = depth === 0 ? '' : '../';
  const name = authorName || 'Mubashir Mehdi';
  const slug = AUTHOR_PAGE_SLUGS[name];
  return slug
    ? '<a href="' + p + 'author/' + slug + '.html">' + esc(name) + '</a>'
    : esc(name);
}

function renderArticlePage(a, depth) {
  const p = depth === 0 ? '' : '../';
  const url = ORIGIN + '/articles/' + encodeURIComponent(a.id) + '.html';
  const seo = getArticleSeo(a);
  const title = seo.pageTitle || a.title + ' | LifeWithBooks';
  const desc = seo.metaDescription || (a.excerpt || '').slice(0, 160);
  const extraSeoHtml = seo.extraHtml || '';
  const faqHtml = renderFaqHtml(seo.faq);
  const faqSchema = renderFaqSchema(seo.faq);
  const body = (a.body || []).map(line => {
    if (line.indexOf('## ') === 0) return '<h2>' + esc(line.slice(3)) + '</h2>';
    if (line.indexOf('### ') === 0) return '<h3>' + esc(line.slice(4)) + '</h3>';
    return '<p>' + esc(line) + '</p>';
  }).join('\n      ');
  const modified = today;
  const updatedBadge = (Date.now() - new Date(a.date).getTime()) < 7 * 86400000
    ? ' <span class="badge-updated">Updated</span>' : '';
  const shareUrl = url;
  const shareTitle = encodeURIComponent(a.title);
  const shareLinks = `
    <div class="share-buttons">
      <a class="share-wa" href="https://wa.me/?text=${encodeURIComponent('Check this free guide: ' + a.title + ' ' + shareUrl)}" target="_blank" rel="noopener">WhatsApp</a>
      <a class="share-fb" href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}" target="_blank" rel="noopener">Facebook</a>
      <a class="share-tw" href="https://twitter.com/intent/tweet?text=${shareTitle}&amp;url=${encodeURIComponent(shareUrl)}" target="_blank" rel="noopener">X / Twitter</a>
      <button type="button" class="share-copy" data-copy="${esc(shareUrl)}">Copy link</button>
    </div>`;
  const jsonLd = `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    description: desc,
    datePublished: a.date,
    dateModified: modified,
    author: { '@type': 'Person', name: a.author || 'Mubashir Mehdi' },
    publisher: { '@type': 'Organization', name: 'LifeWithBooks', url: ORIGIN + '/' },
    mainEntityOfPage: url,
    image: ORIGIN + '/og-articles.webp'
  })}</script>${faqSchema}`;

  const pdfGuide = isPdfGuideArticle(a);
  const guideCanonical = pdfGuide
    ? ORIGIN + '/book/' + encodeURIComponent(pdfGuideBookSlug(a.id)) + '.html'
    : url;

  return renderHead({
    title,
    description: desc,
    canonical: guideCanonical,
    ogType: 'article',
    image: ORIGIN + '/og-articles.webp',
    jsonLd,
    robots: pdfGuide ? 'noindex, follow' : undefined
  }, depth) + `
<body data-page="article" data-article-id="${esc(a.id)}" data-seo-static="true" data-path-depth="1" id="top">
  <div id="site-header-host"></div>
  <main class="book-single">
    <div id="article-detail">
      <div class="breadcrumb"><a href="${p}index.html">Home</a> &raquo; <a href="${p}articles.html">Articles</a> &raquo; <span>${esc(a.title)}</span></div>
      <h1>${esc(a.title)}${updatedBadge}</h1>
      <div class="meta"><span class="tag">${esc(a.date)}</span><span class="tag">Last updated: ${esc(modified.slice(0, 7))}</span><span class="tag">${renderArticleAuthorTag(a.author, depth)}</span></div>
      ${shareLinks}
      <article class="article">${extraSeoHtml}${body}</article>
      ${faqHtml}
    </div>
  </main>
  <div id="site-footer-host"></div>
  <script>document.querySelectorAll('[data-copy]').forEach(function(b){b.addEventListener('click',function(){navigator.clipboard.writeText(b.dataset.copy);b.textContent='Copied!';setTimeout(function(){b.textContent='Copy link';},2000);});});</script>
` + renderScripts(depth, true);
}

function renderAuthorPage(author, depth) {
  const p = depth === 0 ? '' : '../';
  const url = ORIGIN + '/author/' + encodeURIComponent(author.id) + '.html';
  const title = author.name + ' | ' + (author.title || 'Editor') + ' | LifeWithBooks';
  const desc = (author.bio || '').slice(0, 155) + '...';
  const avatar = p + 'covers/author-' + author.id + '.svg';
  const articlesHtml = (author.articleIds || []).map(id => {
    const a = ARTICLES.find(x => x.id === id);
    return a ? '<li><a href="' + p + 'articles/' + encodeURIComponent(id) + '.html">' + esc(a.title) + '</a></li>' : '';
  }).filter(Boolean).join('');
  const booksHtml = (author.recommendedBookIds || []).map(id => {
    const b = BOOKS.find(x => x.id === id);
    return b ? '<li><a href="' + p + 'book/' + encodeURIComponent(id) + '.html">' + esc(b.title) + '</a></li>' : '';
  }).filter(Boolean).join('');
  const social = author.social || {};
  const socialHtml = [
    social.twitter ? '<a href="' + esc(social.twitter) + '" rel="noopener" target="_blank">Twitter</a>' : '',
    social.linkedin ? '<a href="' + esc(social.linkedin) + '" rel="noopener" target="_blank">LinkedIn</a>' : ''
  ].filter(Boolean).join(' &middot; ');
  const jsonLd = `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name: author.name,
    url: url,
    description: desc,
    mainEntity: { '@type': 'Person', name: author.name, jobTitle: author.title, description: (author.bio || '').slice(0, 300) }
  })}</script>`;
  return renderHead({ title, description: desc, canonical: url, jsonLd }, depth) + `
<body data-page="author" data-author-id="${esc(author.id)}" data-seo-static="true" data-path-depth="1" id="top">
  <div id="site-header-host"></div>
  <main class="book-single author-page">
    <div class="breadcrumb"><a href="${p}index.html">Home</a> &raquo; <a href="${p}about.html">About</a> &raquo; <span>${esc(author.name)}</span></div>
    <div class="author-profile">
      <img class="author-avatar" src="${esc(avatar)}" alt="${esc(author.name)}" width="160" height="160" loading="eager">
      <h1>${esc(author.name)}</h1>
      <p class="author-title">${esc(author.title || '')}</p>
      ${socialHtml ? '<p class="author-social">' + socialHtml + '</p>' : ''}
    </div>
    <article class="article"><h2>About ${esc(author.name.split(' ')[0])}</h2><p>${esc(author.bio)}</p></article>
    ${articlesHtml ? '<section class="author-articles"><h2>Articles by ' + esc(author.name) + '</h2><ul>' + articlesHtml + '</ul></section>' : ''}
    ${booksHtml ? '<section class="author-books"><h2>Recommended Books</h2><ul>' + booksHtml + '</ul></section>' : ''}
  </main>
  <div id="site-footer-host"></div>
` + renderScripts(depth, true);
}

// Generate
const bookDir = path.join(root, 'book');
const catDir = path.join(root, 'category');
const artDir = path.join(root, 'articles');
const authorDir = path.join(root, 'author');
[bookDir, catDir, artDir, authorDir].forEach(d => fs.mkdirSync(d, { recursive: true }));

let n = 0;
BOOKS.forEach(b => {
  fs.writeFileSync(path.join(bookDir, b.id + '.html'), renderBookPage(b, 1), 'utf8');
  n++;
});

CATEGORIES.forEach(c => {
  const html = renderCategoryPage(c.slug, 1);
  if (html) fs.writeFileSync(path.join(catDir, c.slug + '.html'), html, 'utf8');
});

const meta = {};
ARTICLES.forEach(a => {
  fs.writeFileSync(path.join(artDir, a.id + '.html'), renderArticlePage(a, 1), 'utf8');
  meta[a.id] = { title: a.title, excerpt: (a.excerpt || '').slice(0, 160), date: a.date, author: a.author || 'Mubashir Mehdi' };
});

fs.writeFileSync(path.join(root, 'js', 'article-meta.js'),
  '/* Auto-generated article SEO meta map */\nconst ARTICLE_META = ' + JSON.stringify(meta, null, 2) + ';\n',
  'utf8');

AUTHORS.forEach(author => {
  fs.writeFileSync(path.join(authorDir, author.id + '.html'), renderAuthorPage(author, 1), 'utf8');
});

console.log('SEO pages:', n, 'books,', CATEGORIES.length, 'categories,', ARTICLES.length, 'articles,', AUTHORS.length, 'authors, article-meta.js');
