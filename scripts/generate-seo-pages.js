/* Generate static SEO pages: /book/*.html, /category/*.html, /articles/*.html, js/article-meta.js */
const fs = require('fs');
const path = require('path');
const { renderHead, renderScripts, ORIGIN, esc } = require('./site-head.js');

const root = path.join(__dirname, '..');
const today = new Date().toISOString().slice(0, 10);

const { BOOKS, CATEGORIES } = require(path.join(root, 'js', 'books.js'));
let ARTICLES = [];
try {
  require(path.join(root, 'js', 'articles-more-1.js'));
  require(path.join(root, 'js', 'articles-more-2.js'));
  require(path.join(root, 'js', 'articles-more-3.js'));
  require(path.join(root, 'js', 'articles-more-4.js'));
  require(path.join(root, 'js', 'articles-more-5.js'));
  try { require(path.join(root, 'js', 'articles-more-6.js')); } catch (e) {}
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
    pageTitle: 'English Learning Books (Free PDF) | LifeWithBooks',
    metaDescription: 'Free English learning books and PDF guides on LifeWithBooks.',
    intro: 'English learning books available to browse for free — courses, grammar, conversation practice and study guides.',
    heading: 'English Learning Books'
  },
  'self-development-books': {
    pageTitle: 'Free Self Development Books PDF | LifeWithBooks',
    metaDescription: 'Free self development books PDF — classic motivation, Stoicism, prosperity and personal growth titles on LifeWithBooks.',
    intro: 'Build better habits with free self development books on LifeWithBooks — public-domain classics like As a Man Thinketh, The Art of War, Meditations and modern study guides for lifelong growth.',
    heading: 'Self Development Books'
  },
  'o-level-a-level': {
    pageTitle: 'Free O Level A Level Study Materials PDF | LifeWithBooks',
    metaDescription: 'Free O Level and A Level study guides PDF — Cambridge English, Math, Biology, Psychology and IGCSE preparation on LifeWithBooks.',
    intro: 'Cambridge O Level, A Level and IGCSE students can browse free revision guides on LifeWithBooks covering English Language, Mathematics, Biology, Psychology and exam planning strategies.',
    heading: 'O Level & A Level'
  }
};

function escJson(s) {
  return JSON.stringify(s);
}

function coverPicture(book, p, eager) {
  const src = book.coverImage ? p + book.coverImage : p + 'covers/' + book.id + '.svg';
  const webp = book.coverImage ? src.replace(/\.(jpg|jpeg|png)$/i, '.webp') : null;
  const loading = eager ? 'eager' : 'lazy';
  const fp = eager ? ' fetchpriority="high"' : '';
  if (webp) {
    return `<picture><source srcset="${esc(webp)}" type="image/webp"><img class="book-detail-cover" src="${esc(src)}" alt="${esc(book.title)} cover" width="280" height="420" loading="${loading}"${fp}></picture>`;
  }
  return `<img class="book-detail-cover" src="${esc(src)}" alt="${esc(book.title)} cover" width="280" height="420" loading="${loading}"${fp}>`;
}

function bookAuthor(book) {
  if (book.author) return book.author;
  const m = (book.excerpt || '').match(/^([A-Z][^.—]+(?:'s)?)/);
  if (m && m[1].length < 40) return m[1].replace(/'s$/, '').trim();
  if (book.license === 'reference' || book.access === 'summary') return 'LifeWithBooks Editorial Team';
  return 'Public Domain Classic';
}

function bookMetaTitle(book) {
  const dl = book.access === 'download';
  return dl
    ? book.title + ' Free PDF | Download Classic Novel | LifeWithBooks'
    : book.title + ' | Free Study Guide PDF | LifeWithBooks';
}

function bookMetaDesc(book) {
  let d = (book.excerpt || book.title + ' on LifeWithBooks.').slice(0, 155);
  if (d.length > 155) d = d.slice(0, 152) + '...';
  return d;
}

function renderBookPage(book, depth) {
  const p = depth === 0 ? '' : '../';
  const url = ORIGIN + '/book/' + encodeURIComponent(book.id) + '.html';
  const primaryCat = book.categories[0] || 'literature-books';
  const catObj = CATEGORIES.find(c => c.slug === primaryCat);
  const catLabel = catObj ? catObj.label : 'Books';
  const catUrl = ORIGIN + '/category/' + primaryCat + '.html';
  const author = bookAuthor(book);
  const downloadable = book.access === 'download';
  const cover = coverPicture(book, p, true);
  const related = BOOKS.filter(b => b.id !== book.id && b.categories.some(c => book.categories.includes(c))).slice(0, 4);
  const descHtml = (book.description || []).map(line => {
    if (line.indexOf('## ') === 0) return '<h2>' + esc(line.slice(3)) + '</h2>';
    return '<p>' + esc(line) + '</p>';
  }).join('\n      ');
  const extra = '<p>LifeWithBooks published this page on ' + today + '. Last updated ' + today + '.</p>';
  const jsonLd = `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: book.title,
    author: { '@type': 'Person', name: author },
    description: bookMetaDesc(book),
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
  })}</script>`;

  const download = downloadable
    ? `<div class="download-block"><p>This is a free, legal public-domain edition.</p><a class="btn" href="${p}download.html?id=${encodeURIComponent(book.id)}">&#8595; Download Free PDF</a></div>`
    : `<div class="download-block summary-block"><p>Reference overview — see official sources for the full work where applicable.</p></div>`;

  const relatedHtml = related.map(b =>
    `<li><a href="${encodeURIComponent(b.id)}.html"><span>${esc(b.title)}</span><span class="arrow">View &raquo;</span></a></li>`
  ).join('\n          ');

  return renderHead({
    title: bookMetaTitle(book),
    description: bookMetaDesc(book),
    canonical: url,
    ogType: 'book',
    image: ORIGIN + '/og/books/' + book.id + '.webp',
    jsonLd
  }, depth) + `
<body data-page="book" data-book-id="${esc(book.id)}" data-seo-static="true" data-path-depth="1" id="top">
  <div id="site-header-host"></div>
  <main class="book-single" id="book-detail">
    <div class="breadcrumb"><a href="${p}index.html">Home</a> &raquo; <a href="${p}category/${primaryCat}.html">${esc(catLabel)}</a> &raquo; <span>${esc(book.title)}</span></div>
    ${cover}
    <h1>${esc(book.title)}</h1>
    <div class="meta"><span class="tag">${esc(author)}</span><span class="tag">${downloadable ? 'Free PDF Download' : 'Study Guide'}</span></div>
    <article class="article">${descHtml}${extra}</article>
    ${download}
    <div class="related-posts"><h3>You Might Also Like</h3><ul>${relatedHtml}</ul></div>
  </main>
  <div id="site-footer-host"></div>
` + renderScripts(depth, true);
}

function categoryBookCard(b, p) {
  const src = b.coverImage ? p + b.coverImage : p + 'covers/' + b.id + '.svg';
  const webp = b.coverImage ? src.replace(/\.(jpg|jpeg|png)$/i, '.webp') : null;
  const fallback = p + 'covers/' + b.id + '.svg';
  let coverHtml;
  if (webp) {
    coverHtml = `<picture><source srcset="${esc(webp)}" type="image/webp"><img class="cover-image" src="${esc(src)}" alt="${esc(b.title)} cover" width="200" height="200" loading="lazy" data-fallback="${esc(fallback)}" onerror="if(this.dataset.fallback&amp;&amp;this.src!==this.dataset.fallback){this.src=this.dataset.fallback}else{this.style.display='none';var n=this.closest('.cover');if(n){var f=n.querySelector('.book');if(f)f.style.display='block'}}"></picture>`;
  } else {
    coverHtml = `<img class="cover-image" src="${esc(src)}" alt="${esc(b.title)} cover" width="200" height="200" loading="lazy" referrerpolicy="no-referrer" onerror="this.style.display='none';var n=this.closest('.cover');if(n){var f=n.querySelector('.book');if(f)f.style.display='block'}">`;
  }
  return `<article class="book-card cover-${esc(b.cover || 'english')}"><a class="thumb" href="${p}book/${encodeURIComponent(b.id)}.html"><div class="cover">${coverHtml}<div class="book" style="display:none;"><span class="title-on-cover">${esc(b.title)}</span></div></div></a><div class="info"><h3><a href="${p}book/${encodeURIComponent(b.id)}.html">${esc(b.title)}</a></h3><p class="article-excerpt">${esc((b.excerpt || '').slice(0, 100))}</p><a class="read-more" href="${p}book/${encodeURIComponent(b.id)}.html">Read More</a></div></article>`;
}

function renderCategoryPage(slug, depth) {
  const p = depth === 0 ? '' : '../';
  const seo = CATEGORY_SEO[slug];
  const cat = CATEGORIES.find(c => c.slug === slug);
  if (!cat) return '';
  const url = ORIGIN + '/category/' + slug + '.html';
  const title = seo ? seo.pageTitle : cat.label + ' | LifeWithBooks';
  const desc = seo ? seo.metaDescription : 'Browse ' + cat.label + ' on LifeWithBooks.';
  const intro = seo ? seo.intro : 'Browse free books in ' + cat.label + ' on LifeWithBooks.';
  const heading = seo ? seo.heading : cat.label;
  const items = BOOKS.filter(b => b.categories.includes(slug));
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
    <p style="text-align:center;max-width:760px;margin:0 auto 30px;">${esc(intro)}</p>
    <div class="book-grid" id="category-grid">${cards || '<p style="text-align:center;">Books coming soon.</p>'}</div>
  </section>
  <div id="category-articles"></div>
  <div id="site-footer-host"></div>
` + renderScripts(depth, true);
}

function renderArticlePage(a, depth) {
  const p = depth === 0 ? '' : '../';
  const url = ORIGIN + '/articles/' + encodeURIComponent(a.id) + '.html';
  const title = a.title + ' | LifeWithBooks';
  const desc = (a.excerpt || '').slice(0, 160);
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
  })}</script>`;

  return renderHead({ title, description: desc, canonical: url, ogType: 'article', image: ORIGIN + '/og-articles.webp', jsonLd }, depth) + `
<body data-page="article" data-article-id="${esc(a.id)}" data-seo-static="true" data-path-depth="1" id="top">
  <div id="site-header-host"></div>
  <main class="book-single">
    <div id="article-detail">
      <div class="breadcrumb"><a href="${p}index.html">Home</a> &raquo; <a href="${p}articles.html">Articles</a> &raquo; <span>${esc(a.title)}</span></div>
      <h1>${esc(a.title)}${updatedBadge}</h1>
      <div class="meta"><span class="tag">${esc(a.date)}</span><span class="tag">Last updated: ${esc(modified.slice(0, 7))}</span><span class="tag">${esc(a.author || 'Mubashir Mehdi')}</span></div>
      ${shareLinks}
      <article class="article">${body}</article>
    </div>
  </main>
  <div id="site-footer-host"></div>
  <script>document.querySelectorAll('[data-copy]').forEach(function(b){b.addEventListener('click',function(){navigator.clipboard.writeText(b.dataset.copy);b.textContent='Copied!';setTimeout(function(){b.textContent='Copy link';},2000);});});</script>
` + renderScripts(depth, true);
}

// Generate
const bookDir = path.join(root, 'book');
const catDir = path.join(root, 'category');
const artDir = path.join(root, 'articles');
[bookDir, catDir, artDir].forEach(d => fs.mkdirSync(d, { recursive: true }));

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

console.log('SEO pages:', n, 'books,', CATEGORIES.length, 'categories,', ARTICLES.length, 'articles, article-meta.js');
