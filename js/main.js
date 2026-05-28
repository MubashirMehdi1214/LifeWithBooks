/* LifeWithBooks - shared site behaviour */

/* ---------- Helpers ---------- */
function $(sel, ctx) { return (ctx || document).querySelector(sel); }
function $$(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }
function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function hashString(input) {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = ((hash << 5) - hash) + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function getCoverTheme(book) {
  const seed = hashString((book.id || '') + '|' + (book.title || ''));
  const hueA = seed % 360;
  const hueB = (hueA + 28 + (seed % 48)) % 360;
  const satA = 58 + (seed % 18);
  const satB = 50 + ((seed >> 3) % 22);
  const lightA = 34 + ((seed >> 5) % 10);
  const lightB = 42 + ((seed >> 7) % 12);
  const angle = 120 + (seed % 120);
  return {
    start: `hsl(${hueA} ${satA}% ${lightA}%)`,
    end: `hsl(${hueB} ${satB}% ${lightB}%)`,
    angle: `${angle}deg`
  };
}

function getDriveFileId(url) {
  if (!url) return '';
  const byPath = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (byPath && byPath[1]) return byPath[1];
  const byQuery = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (byQuery && byQuery[1]) return byQuery[1];
  return '';
}

function getBookCoverImage(book) {
  if (book.coverImage) return book.coverImage;
  const driveFileId = getDriveFileId(book.pdf || '');
  if (driveFileId) return `https://drive.google.com/thumbnail?id=${driveFileId}&sz=w1000`;
  return '';
}

/* ---------- Header / footer injection ---------- */
function buildCategoryDropdown() {
  if (typeof CATEGORIES === 'undefined') return '';
  return CATEGORIES
    .map(c => `<li><a href="category.html?cat=${encodeURIComponent(c.slug)}">${c.label}</a></li>`)
    .join('');
}

function injectHeader() {
  const headerHost = $('#site-header-host');
  if (!headerHost) return;
  const currentPage = (document.body.dataset.page || '').toLowerCase();
  const isHome = currentPage === 'home';
  const isAll = currentPage === 'all-books';
  const isAbout = currentPage === 'about';
  const isContact = currentPage === 'contact';

  headerHost.innerHTML = `
    <header class="site-header">
      <a class="site-logo" href="index.html" aria-label="LifeWithBooks home">
        <span class="logo-mark">L</span>
        <span class="logo-text">
          <strong>LifeWithBooks</strong>
          <span>Free PDF Library</span>
        </span>
      </a>
    </header>
    <nav class="main-nav" id="mainNav" aria-label="Main">
      <div class="nav-inner">
        <button class="menu-toggle" id="menuToggle" aria-label="Toggle menu" aria-expanded="false">&#9776;</button>
        <ul>
          <li${isHome ? ' class="active"' : ''}><a href="index.html">Home</a></li>
          <li class="has-dropdown${isAll ? ' active' : ''}">
            <a href="all-books.html">All Books</a>
            <ul>${buildCategoryDropdown()}</ul>
          </li>
          <li${isAbout ? ' class="active"' : ''}><a href="about.html">About Us</a></li>
          <li${isContact ? ' class="active"' : ''}><a href="contact.html">Contact</a></li>
        </ul>
      </div>
    </nav>
  `;

  const nav = $('#mainNav');
  const toggle = $('#menuToggle');
  toggle && toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  $$('#mainNav li.has-dropdown > a').forEach(a => {
    a.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        a.parentElement.classList.toggle('is-open');
      }
    });
  });
}

function injectFooter() {
  const footerHost = $('#site-footer-host');
  if (!footerHost) return;
  footerHost.innerHTML = `
    <footer class="site-footer">
      <div class="footer-inner">
        <div>
          <span class="brand-name">Free PDF<br>Books</span>
          <p>Your gateway to endless stories, knowledge and inspiration. Explore thousands of free ebooks across every genre — from timeless classics to hidden indie gems. No fees, no subscriptions, just instant access to the books you love.</p>
        </div>
        <div>
          <h4>Categories</h4>
          <ul>
            <li><a href="category.html?cat=english-learning-books">English Learning</a></li>
            <li><a href="category.html?cat=french-learning-books">French Learning</a></li>
            <li><a href="category.html?cat=german-learning-books">German Learning</a></li>
            <li><a href="category.html?cat=spanish-learning-books">Spanish Learning</a></li>
            <li><a href="category.html?cat=deutsch-books">Deutsch Learning</a></li>
            <li><a href="category.html?cat=kids-learning-books">Kids Learning</a></li>
          </ul>
        </div>
        <div class="contact-info">
          <h4>Contact us</h4>
          <p><span class="icon">&#9742;</span> Phone: +92 311 518 9291</p>
          <p><span class="icon">&#128222;</span> WhatsApp: +92 311 518 9291</p>
          <p><span class="icon">&#9993;</span> <a href="mailto:munashirmehdi@mail.com" style="color:inherit;">munashirmehdi@mail.com</a></p>
          <p><span class="icon">&#127968;</span> LifeWithBooks Editorial Office</p>
          <p><span class="icon">&#128205;</span> Karachi, Pakistan</p>
        </div>
        <div>
          <h4>Policies</h4>
          <ul>
            <li><a href="about.html">About Us</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li><a href="privacy-policy.html">Privacy Policy</a></li>
            <li><a href="terms.html">Terms &amp; Conditions</a></li>
            <li><a href="dmca.html">DMCA / Copyright</a></li>
            <li><a href="disclaimer.html">Disclaimer</a></li>
            <li><a href="cookie-policy.html">Cookie Policy</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        &copy; ${new Date().getFullYear()} LifeWithBooks &middot; All Rights Reserved &middot;
        <a href="privacy-policy.html" style="color:inherit;">Privacy</a> &middot;
        <a href="terms.html" style="color:inherit;">Terms</a> &middot;
        <a href="dmca.html" style="color:inherit;">DMCA</a> &middot;
        <a href="disclaimer.html" style="color:inherit;">Disclaimer</a> &middot;
        <a href="cookie-policy.html" style="color:inherit;">Cookies</a>
      </div>
    </footer>
    <a href="#top" class="back-to-top" id="backToTop" aria-label="Back to top">&#8593;</a>
  `;

  const backBtn = $('#backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) backBtn.classList.add('show');
    else backBtn.classList.remove('show');
  }, { passive: true });
}

/* ---------- Card renderer ---------- */
function bookCardHTML(book) {
  const cat = book.categories && book.categories[0]
    ? CATEGORIES.find(c => c.slug === book.categories[0])
    : null;
  const coverTheme = getCoverTheme(book);
  const coverStyle = `--cover-start:${coverTheme.start};--cover-end:${coverTheme.end};--cover-angle:${coverTheme.angle};`;
  const coverImage = getBookCoverImage(book);
  const fallbackStyle = coverImage ? 'display:none;' : '';
  const coverVisual = coverImage
    ? `
          <img
            class="cover-image"
            src="${escapeHtml(coverImage)}"
            alt="${escapeHtml(book.title)} cover"
            loading="lazy"
            referrerpolicy="no-referrer"
            onerror="this.remove();this.nextElementSibling.style.display='block';"
          />
          <div class="book book-fallback" style="${coverStyle}${fallbackStyle}">
            <span class="title-on-cover">${escapeHtml(book.title)}</span>
            <span class="ribbon"></span>
          </div>
        `
    : `
          <div class="book book-fallback" style="${coverStyle}">
            <span class="title-on-cover">${escapeHtml(book.title)}</span>
            <span class="ribbon"></span>
          </div>
        `;
  return `
    <article class="book-card cover-${escapeHtml(book.cover || 'english')}">
      <a class="thumb" href="book.html?id=${encodeURIComponent(book.id)}" aria-label="${escapeHtml(book.title)}">
        <div class="cover">
          ${coverVisual}
        </div>
      </a>
      <div class="info">
        <h3><a href="book.html?id=${encodeURIComponent(book.id)}">${escapeHtml(book.title)}</a></h3>
        <a class="read-more" href="book.html?id=${encodeURIComponent(book.id)}">Read More</a>
      </div>
    </article>
  `;
}

function renderBookGrid(containerSel, books, limit) {
  const el = $(containerSel);
  if (!el) return;
  const list = (typeof limit === 'number' ? books.slice(0, limit) : books);
  el.innerHTML = list.map(bookCardHTML).join('') ||
    '<p style="grid-column:1/-1;text-align:center;color:#999;">No books found.</p>';
}

/* ---------- Home page ---------- */
function initHome() {
  if (document.body.dataset.page !== 'home') return;

  const featured = [
    "english-learning-books",
    "french-learning-books",
    "german-learning-books",
    "spanish-learning-books",
    "deutsch-books",
    "kids-learning-books"
  ];

  /* All books */
  renderBookGrid('#all-books-grid', BOOKS, 24);

  /* Per-category sections */
  const host = $('#category-sections');
  if (host) {
    host.innerHTML = featured.map(slug => {
      const cat = CATEGORIES.find(c => c.slug === slug);
      const items = BOOKS.filter(b => b.categories.includes(slug)).slice(0, 24);
      if (!items.length) return '';
      return `
        <section class="section">
          <div class="section-title"><a href="category.html?cat=${slug}">${cat.label}</a></div>
          <div class="book-grid">${items.map(bookCardHTML).join('')}</div>
        </section>
      `;
    }).join('');
  }

  const searchForm = $('#heroSearch');
  searchForm && searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const q = $('#heroSearch input').value.trim();
    if (q) window.location.href = 'all-books.html?q=' + encodeURIComponent(q);
  });
}

/* ---------- All books page ---------- */
function initAllBooks() {
  if (document.body.dataset.page !== 'all-books') return;
  const q = (getParam('q') || '').toLowerCase().trim();
  let list = BOOKS.slice();
  if (q) {
    list = list.filter(b => b.title.toLowerCase().includes(q) || (b.excerpt || '').toLowerCase().includes(q));
    const qEl = $('#current-query');
    if (qEl) qEl.textContent = ' matching "' + q + '"';
    const input = $('#searchInput');
    if (input) input.value = q;
  }
  renderBookGrid('#all-books-grid', list);

  const searchForm = $('#searchForm');
  searchForm && searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = $('#searchInput').value.trim();
    window.location.href = 'all-books.html' + (val ? '?q=' + encodeURIComponent(val) : '');
  });
}

/* ---------- SEO helpers ---------- */
function setMeta(selector, attr, value) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    const [key, val] = selector.replace(/[\[\]"']/g, '').split('=');
    el.setAttribute(key, val);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}
function setCanonical(url) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', url);
}
function injectJsonLd(id, data) {
  const existing = document.getElementById(id);
  if (existing) existing.remove();
  const s = document.createElement('script');
  s.type = 'application/ld+json';
  s.id = id;
  s.textContent = JSON.stringify(data);
  document.head.appendChild(s);
}

/* ---------- Category page ---------- */
function initCategory() {
  if (document.body.dataset.page !== 'category') return;
  const slug = getParam('cat') || 'english-learning-books';
  const cat = CATEGORIES.find(c => c.slug === slug);
  const title = $('#cat-title');
  const desc = $('#cat-description');
  const label = cat ? cat.label : 'Category';
  const intro = cat
    ? 'Browse our latest collection of ' + cat.label.toLowerCase() + ' with curated summaries, learning guidance and legal source recommendations.'
    : 'Browse books by category on LifeWithBooks.';
  if (title) title.textContent = label;
  if (desc) desc.textContent = intro;

  const pageTitle = label + ' | LifeWithBooks - Free PDF Ebook Library';
  const pageUrl = 'https://lifewithbooks.vercel.app/category.html?cat=' + encodeURIComponent(slug);
  document.title = pageTitle;
  setMeta('meta[name="description"]', 'content', intro);
  setMeta('meta[property="og:title"]', 'content', pageTitle);
  setMeta('meta[property="og:description"]', 'content', intro);
  setMeta('meta[property="og:url"]', 'content', pageUrl);
  setCanonical(pageUrl);

  const items = BOOKS.filter(b => b.categories.includes(slug));
  renderBookGrid('#category-grid', items);

  injectJsonLd('jsonld-breadcrumbs', {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://lifewithbooks.vercel.app/" },
      { "@type": "ListItem", "position": 2, "name": "All Books", "item": "https://lifewithbooks.vercel.app/all-books.html" },
      { "@type": "ListItem", "position": 3, "name": label, "item": pageUrl }
    ]
  });
  injectJsonLd('jsonld-collection', {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": label + ' - LifeWithBooks',
    "url": pageUrl,
    "description": intro,
    "hasPart": items.slice(0, 30).map(b => ({
      "@type": "Book",
      "name": b.title,
      "url": "https://lifewithbooks.vercel.app/book.html?id=" + encodeURIComponent(b.id)
    }))
  });
}

/* ---------- Book detail page ---------- */
function initBookDetail() {
  if (document.body.dataset.page !== 'book') return;
  const id = getParam('id');
  const book = BOOKS.find(b => b.id === id);
  const wrap = $('#book-detail');
  if (!book) {
    wrap.innerHTML = '<p style="text-align:center;padding:40px 0;">Sorry, this book could not be found. <a href="all-books.html">Browse all books</a>.</p>';
    return;
  }

  const primaryCat = book.categories[0] || 'english-learning-books';
  const catObj = CATEGORIES.find(c => c.slug === primaryCat);

  const pageTitle = book.title + ' | Book Summary and Learning Guide - LifeWithBooks';
  const pageDesc = (book.excerpt || ('Read about ' + book.title + ' on LifeWithBooks, the free PDF ebook library.')).slice(0, 320);
  const pageUrl = 'https://lifewithbooks.vercel.app/book.html?id=' + encodeURIComponent(book.id);
  const coverImg = getBookCoverImage(book) || 'https://lifewithbooks.vercel.app/favicon.svg';

  document.title = pageTitle;
  setMeta('meta[name="description"]', 'content', pageDesc);
  setMeta('meta[property="og:title"]', 'content', pageTitle);
  setMeta('meta[property="og:description"]', 'content', pageDesc);
  setMeta('meta[property="og:url"]', 'content', pageUrl);
  setMeta('meta[property="og:image"]', 'content', coverImg);
  setMeta('meta[property="og:type"]', 'content', 'book');
  setMeta('meta[name="twitter:title"]', 'content', pageTitle);
  setMeta('meta[name="twitter:description"]', 'content', pageDesc);
  setMeta('meta[name="twitter:image"]', 'content', coverImg);
  setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
  setCanonical(pageUrl);

  injectJsonLd('jsonld-book', {
    "@context": "https://schema.org",
    "@type": "Book",
    "name": book.title,
    "url": pageUrl,
    "image": coverImg,
    "description": pageDesc,
    "inLanguage": "en",
    "bookFormat": "https://schema.org/EBook",
    "publisher": {
      "@type": "Organization",
      "name": "LifeWithBooks",
      "url": "https://lifewithbooks.vercel.app/"
    }
  });
  injectJsonLd('jsonld-breadcrumbs', {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://lifewithbooks.vercel.app/" },
      { "@type": "ListItem", "position": 2, "name": catObj ? catObj.label : 'Books', "item": "https://lifewithbooks.vercel.app/category.html?cat=" + encodeURIComponent(primaryCat) },
      { "@type": "ListItem", "position": 3, "name": book.title, "item": pageUrl }
    ]
  });
  const tags = book.categories.map(slug => {
    const c = CATEGORIES.find(x => x.slug === slug);
    return c ? '<span class="tag">' + escapeHtml(c.label) + '</span>' : '';
  }).join('');

  const paragraphs = (book.description || []).map(function(p) {
    if (p.indexOf('## ') === 0) return '<h2>' + escapeHtml(p.slice(3)) + '</h2>';
    return '<p>' + escapeHtml(p) + '</p>';
  }).join('');

  /* Related: other books in the same primary category */
  const related = BOOKS
    .filter(b => b.id !== book.id && b.categories.includes(primaryCat))
    .slice(0, 30);
  const relatedHTML = related.map(b => `
    <li><a href="book.html?id=${encodeURIComponent(b.id)}">
      <span>${escapeHtml(b.title)}</span>
      <span class="arrow">Read More &raquo;</span>
    </a></li>
  `).join('');

  wrap.innerHTML = `
    <div class="breadcrumb">
      <a href="index.html">Home</a> &raquo;
      <a href="category.html?cat=${primaryCat}">${catObj ? escapeHtml(catObj.label) : 'Books'}</a> &raquo;
      <span>${escapeHtml(book.title)}</span>
    </div>

    <h1>${escapeHtml(book.title)}</h1>
    <div class="meta">${tags}</div>

    <article class="article">
      ${paragraphs}
    </article>

    <div class="download-block">
      <p style="margin-bottom:16px;font-size:15px;">This page provides a curated summary and study guidance. Direct downloads are disabled while rights verification is in progress.</p>
      <a class="btn" href="contact.html">Request Legal Source Guidance</a>
    </div>

    <div class="copyright-block">
      <h3 style="color:var(--contrast);margin-bottom:10px;font-size:18px;">Copyright Claim</h3>
      <p>If this website has shared your copyrighted book or your personal information, please <a href="contact.html"><strong>contact us</strong></a>. You will receive an answer within 3 working days. A big thank you for your understanding.</p>
    </div>

    <div class="related-posts">
      <h3>Related Books</h3>
      <ul>${relatedHTML}</ul>
    </div>
  `;
}


/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  injectHeader();
  injectFooter();
  initHome();
  initAllBooks();
  initCategory();
  initBookDetail();
});
