/* Inject static HTML into listing pages so articles/books are visible without JS (AdSense + crawlers). */
const fs = require('fs');
const path = require('path');
const { esc } = require('./site-head.js');

const root = path.join(__dirname, '..');
const { BOOKS } = require(path.join(root, 'js', 'books.js'));

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
} catch (e) {
  console.warn('Articles not loaded for listing patch:', e.message);
}

function isPdfGuide(a) {
  return /^free-.+-pdf-guide$/.test(a.id);
}

function articleCardHtml(a) {
  const cover = a.cover || 'english';
  return `<article class="book-card cover-${esc(cover)} article-card">
      <a class="thumb" href="articles/${encodeURIComponent(a.id)}.html" aria-label="${esc(a.title)}">
        <div class="cover">
          <div class="book"><span class="title-on-cover">${esc(a.title)}</span><span class="ribbon"></span></div>
        </div>
      </a>
      <div class="info">
        <h3><a href="articles/${encodeURIComponent(a.id)}.html">${esc(a.title)}</a></h3>
        <p class="article-excerpt">${esc(a.excerpt || '')}</p>
        <a class="read-more" href="articles/${encodeURIComponent(a.id)}.html">Read Article</a>
      </div>
    </article>`;
}

function homeArticleCardHtml(a) {
  return `<article class="home-article-card">
      <span class="home-article-card__badge cat-pill-teal">Guide</span>
      <h3><a href="articles/${encodeURIComponent(a.id)}.html">${esc(a.title)}</a></h3>
      <p class="home-article-card__excerpt">${esc(a.excerpt || '')}</p>
      <p class="home-article-card__meta">${esc(a.author || 'LifeWithBooks')} &middot; ${esc(a.date || '')}</p>
      <a class="home-article-card__link" href="articles/${encodeURIComponent(a.id)}.html">Read Guide &rarr;</a>
    </article>`;
}

function simpleBookCardHtml(book) {
  const img = book.coverImage && !/^https?:\/\//i.test(book.coverImage)
    ? book.coverImage
    : 'covers-img/' + book.id + '.jpg';
  const badge = book.pdfDirect ? '<span class="book-card__pdf-badge">Free PDF</span>' : '';
  return `<article class="book-card cover-${esc(book.cover || 'english')}">
      <a class="thumb" href="book/${encodeURIComponent(book.id)}.html" aria-label="${esc(book.title)}">
        <div class="cover">${badge}<img class="cover-image" src="${esc(img)}" alt="${esc(book.title)} cover" width="200" height="200" loading="lazy"></div>
      </a>
      <div class="info">
        <h3><a href="book/${encodeURIComponent(book.id)}.html">${esc(book.title)}</a></h3>
        <p>${esc((book.excerpt || '').slice(0, 120))}</p>
      </div>
    </article>`;
}

function curatedListHtml(title, bookIds) {
  const items = bookIds.map(id => BOOKS.find(b => b.id === id)).filter(Boolean);
  if (!items.length) return '';
  const lis = items.map(b =>
    `<li><a href="book/${encodeURIComponent(b.id)}.html">${esc(b.title)}</a></li>`
  ).join('\n        ');
  return `<section class="static-curated-list" style="max-width:900px;margin:0 auto 40px;">
      <h3 style="text-align:center;margin-bottom:16px;color:var(--contrast);">${esc(title)}</h3>
      <ul style="columns:2;gap:24px;list-style:none;padding:0;line-height:2;">${lis}</ul>
    </section>`;
}

function replaceGrid(html, gridId, inner) {
  const re = new RegExp(`(<div class="book-grid" id="${gridId}">)\\s*</div>`, 'i');
  if (!re.test(html)) {
    const re2 = new RegExp(`(<div class="article-feature-grid" id="${gridId}">)\\s*</div>`, 'i');
    if (re2.test(html)) return html.replace(re2, `$1\n    ${inner}\n    </div>`);
    return html;
  }
  return html.replace(re, `$1\n    ${inner}\n    </div>`);
}

function patchArticlesPage() {
  const fp = path.join(root, 'articles.html');
  let html = fs.readFileSync(fp, 'utf8');
  const editorial = ARTICLES.filter(a => !isPdfGuide(a))
    .slice()
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  const cards = editorial.map(articleCardHtml).join('\n    ');
  const intro = `<p style="text-align:center;max-width:720px;margin:-10px auto 24px;color:var(--contrast-3);">
      <strong>${editorial.length} editorial guides</strong> live at <code>/articles/</code> on this site — reading tips, exam prep, book reviews and study methods.
      Open any guide directly (example: <a href="articles/how-to-build-a-daily-reading-habit.html">daily reading habit</a>) or browse the grid below.
      Subscribe via <a href="feed.xml">RSS</a>.</p>`;
  html = html.replace(
    /<p style="text-align:center;max-width:680px;margin:-20px auto 30px[^"]*">[\s\S]*?<\/p>/,
    intro
  );
  html = replaceGrid(html, 'articles-grid', cards);
  fs.writeFileSync(fp, html, 'utf8');
  console.log('Patched articles.html with', editorial.length, 'static article cards');
}

function patchIndexHomeArticles() {
  const fp = path.join(root, 'index.html');
  let html = fs.readFileSync(fp, 'utf8');
  const featuredIds = [
    'best-free-classic-novels-to-start-with',
    'learn-a-language-with-free-books',
    'how-to-build-a-daily-reading-habit',
    'how-to-prepare-for-ielts-using-free-pdf-books',
    'complete-css-exam-preparation-guide-pakistan',
    'best-free-kids-learning-books-pdf-parents'
  ];
  const featured = featuredIds.map(id => ARTICLES.find(a => a.id === id)).filter(Boolean);
  const cards = featured.map(homeArticleCardHtml).join('\n    ');
  html = replaceGrid(html, 'home-articles-grid', cards);
  fs.writeFileSync(fp, html, 'utf8');
  console.log('Patched index.html with', featured.length, 'featured article cards');
}

function patchAllBooksPage() {
  const fp = path.join(root, 'all-books.html');
  let html = fs.readFileSync(fp, 'utf8');
  const curated = [
    curatedListHtml('Popular Free Classics', [
      'pride-and-prejudice', 'jane-eyre', 'dracula', 'the-adventures-of-sherlock-holmes',
      'treasure-island', 'frankenstein', 'great-expectations', 'moby-dick'
    ]),
    curatedListHtml('English &amp; IELTS Study Guides', [
      'ielts-complete-preparation-guide', 'practical-english-usage',
      'english-vocabulary-in-use-upper-intermediate', 'learn-how-to-speak-english-fluently-7-easy-steps'
    ]),
    curatedListHtml('Pakistan Exam Preparation', [
      'css-general-knowledge-guide', 'css-english-essay-writing-guide',
      'matric-english-grammar-complete', 'fsc-physics-short-questions'
    ])
  ].join('\n\n    ');
  if (!html.includes('static-curated-list')) {
    html = html.replace(
      '<div class="book-grid" id="all-books-grid"></div>',
      curated + '\n\n    <div class="book-grid" id="all-books-grid"></div>'
    );
  }
  const downloadable = BOOKS.filter(b => b.pdfDirect || b.access === 'download')
    .slice()
    .sort((a, b) => a.title.localeCompare(b.title))
    .slice(0, 24);
  const cards = downloadable.map(simpleBookCardHtml).join('\n    ');
  html = replaceGrid(html, 'all-books-grid', cards);
  const pakistanIds = ['ielts-complete-preparation-guide', 'css-general-knowledge-guide', 'matric-english-grammar-complete', 'fsc-chemistry-important-questions'];
  const pakCards = pakistanIds.map(id => BOOKS.find(b => b.id === id)).filter(Boolean).map(simpleBookCardHtml).join('\n    ');
  html = replaceGrid(html, 'pakistan-study-grid', pakCards);
  fs.writeFileSync(fp, html, 'utf8');
  console.log('Patched all-books.html with curated lists +', downloadable.length, 'book cards');
}

patchArticlesPage();
patchIndexHomeArticles();
patchAllBooksPage();
