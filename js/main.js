/* LifeWithBooks - shared site behaviour */

const SITE_ORIGIN = 'https://www.lifewithbooks.co';
const SITE_OG_IMAGE = SITE_ORIGIN + '/og-image.png';

/* ---------- Helpers ---------- */
function $(sel, ctx) { return (ctx || document).querySelector(sel); }
function $$(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }
function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

/** Site search uses ?q=; accept ?s= for legacy/sitelinks URLs. */
function getSearchQuery() {
  return (getParam('q') || getParam('s') || '').trim();
}

const CATEGORY_SEO = {
  'vocabulary-books': {
    heading: 'Free Vocabulary Ebooks',
    pageTitle: 'Free Vocabulary Ebooks (PDF) | LifeWithBooks',
    metaDescription:
      'Browse free vocabulary ebooks and PDF study guides for English learners — visual dictionaries, word lists, and upper-intermediate vocabulary books. Read online on LifeWithBooks.',
    intro:
      'Free vocabulary ebooks and PDF resources for English learners: photo dictionaries, core word lists, and vocabulary-in-use style guides. Pick a title to read more or find an official copy.',
    collectionName: 'Free Vocabulary Ebooks — LifeWithBooks'
  },
  'english-learning-books': {
    pageTitle: 'English Learning Books (Free PDF) | LifeWithBooks',
    metaDescription:
      'Free English learning books and PDF guides — grammar, conversation, vocabulary and study resources for beginners to advanced learners.',
    intro:
      'English learning books available to browse for free — courses, grammar, conversation practice and study guides for every level.',
    collectionName: 'English Learning Books — LifeWithBooks'
  }
};

function getCategorySeo(slug) {
  return CATEGORY_SEO[slug] || null;
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

function getGutenbergId(url) {
  if (!url || url.indexOf('gutenberg.org') === -1) return '';
  const m = url.match(/(?:ebooks\/|epub\/|files\/)(\d+)/);
  return m && m[1] ? m[1] : '';
}

function getLocalCoverPath(book) {
  return 'covers/' + book.id + '.svg';
}

function getBookShareImage(book) {
  return SITE_ORIGIN + '/og/books/' + book.id + '.png';
}

function getCategoryShareImage(slug) {
  return SITE_ORIGIN + '/og/categories/' + slug + '.png';
}

function getBookCoverImage(book) {
  if (book.coverImage) return book.coverImage;
  const gutenbergId = getGutenbergId(book.pdf || '');
  if (gutenbergId) return `https://www.gutenberg.org/cache/epub/${gutenbergId}/pg${gutenbergId}.cover.medium.jpg`;
  const driveFileId = getDriveFileId(book.pdf || '');
  if (driveFileId) return `https://drive.google.com/thumbnail?id=${driveFileId}&sz=w1000`;
  return getLocalCoverPath(book);
}

function isDownloadable(book) {
  return book && book.access === 'download' && !!book.pdf;
}

function getLicenseBadge(book) {
  const map = {
    'public-domain': { text: 'Public Domain - Free to download', cls: 'lic-public' },
    'original': { text: 'Original LifeWithBooks Guide', cls: 'lic-original' },
    'reference': { text: 'Reference - find the official edition', cls: 'lic-reference' }
  };
  const info = map[book.license] || map['reference'];
  return '<span class="license-badge ' + info.cls + '">' + escapeHtml(info.text) + '</span>';
}

function getOfficialSourceLinks(book) {
  const q = encodeURIComponent(book.title || '');
  const openLibrary = 'https://openlibrary.org/search?q=' + q;
  const googleBooks = 'https://www.google.com/search?tbm=bks&q=' + q;
  return (
    '<a class="btn outline" href="' + openLibrary + '" target="_blank" rel="noopener nofollow">Find on Open Library</a>' +
    '<a class="btn outline" href="' + googleBooks + '" target="_blank" rel="noopener nofollow">Search Google Books</a>'
  );
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
  const isArticles = currentPage === 'articles' || currentPage === 'article';

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
          <li${isArticles ? ' class="active"' : ''}><a href="articles.html">Articles</a></li>
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
          <p>Your gateway to stories, knowledge and inspiration. Explore ${(typeof BOOKS !== 'undefined' ? BOOKS.length : '140')}+ free ebooks and original guides — from timeless public-domain classics to practical health and learning resources. No fees, no subscriptions, just instant access to the books you love.</p>
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
            <li><a href="articles.html">Articles</a></li>
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
  const primarySrc = getBookCoverImage(book);
  const localFallback = getLocalCoverPath(book);
  const categoryCover = `
          <div class="book" style="display:none;">
            <span class="title-on-cover">${escapeHtml(book.title)}</span>
            <span class="ribbon"></span>
          </div>
        `;
  const coverVisual = `
          <img
            class="cover-image"
            src="${escapeHtml(primarySrc)}"
            alt="${escapeHtml(book.title)} cover"
            loading="lazy"
            referrerpolicy="no-referrer"
            onerror="if(this.dataset.fallback){this.src=this.dataset.fallback;this.dataset.fallback='';}else{this.style.display='none';if(this.nextElementSibling)this.nextElementSibling.style.display='block';}"
            ${primarySrc !== localFallback ? 'data-fallback="' + escapeHtml(localFallback) + '"' : ''}
          />
          ${categoryCover}
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
    "vocabulary-books",
    "grammar-books",
    "french-learning-books",
    "german-learning-books",
    "spanish-learning-books",
    "deutsch-books",
    "kids-learning-books",
    "health-books",
    "novels",
    "trading-books",
    "adventure-books",
    "literature-books",
    "business-books",
    "self-grooming-books"
  ];

  /* All books — scrollable panel on home */
  renderBookGrid('#all-books-grid', BOOKS);

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
  const q = getSearchQuery().toLowerCase();
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
function setShareMeta(opts) {
  if (opts.title) {
    document.title = opts.title;
    setMeta('meta[property="og:title"]', 'content', opts.title);
    setMeta('meta[name="twitter:title"]', 'content', opts.title);
  }
  if (opts.description) {
    setMeta('meta[name="description"]', 'content', opts.description);
    setMeta('meta[property="og:description"]', 'content', opts.description);
    setMeta('meta[name="twitter:description"]', 'content', opts.description);
  }
  if (opts.url) {
    setMeta('meta[property="og:url"]', 'content', opts.url);
    setCanonical(opts.url);
  }
  if (opts.image) {
    setMeta('meta[property="og:image"]', 'content', opts.image);
    setMeta('meta[name="twitter:image"]', 'content', opts.image);
    setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
  }
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
  const seo = getCategorySeo(slug);
  const title = $('#cat-title');
  const desc = $('#cat-description');
  const label = cat ? cat.label : 'Category';
  const intro = seo
    ? seo.intro
    : cat
      ? 'Browse our latest collection of ' + cat.label.toLowerCase() + ' available to read for free as PDF or study guides on LifeWithBooks.'
      : 'Browse books by category on LifeWithBooks.';
  if (title) title.textContent = seo && seo.heading ? seo.heading : label;
  if (desc) desc.textContent = intro;

  const pageTitle = seo
    ? seo.pageTitle
    : label + ' | LifeWithBooks - Free PDF Ebook Library';
  const metaDesc = seo ? seo.metaDescription : intro;
  const pageUrl = SITE_ORIGIN + '/category.html?cat=' + encodeURIComponent(slug);
  setShareMeta({
    title: pageTitle,
    description: metaDesc,
    url: pageUrl,
    image: getCategoryShareImage(slug)
  });

  let items = BOOKS.filter(b => b.categories.includes(slug));
  const q = getSearchQuery().toLowerCase();
  if (q) {
    items = items.filter(b =>
      b.title.toLowerCase().includes(q) ||
      (b.excerpt || '').toLowerCase().includes(q)
    );
    const qEl = $('#cat-query-note');
    if (qEl) qEl.textContent = ' matching "' + q + '"';
    const input = $('#catSearchInput');
    if (input) input.value = q;
  }
  renderBookGrid('#category-grid', items);

  const searchForm = $('#catSearchForm');
  const searchInput = $('#catSearchInput');
  function filterCategoryBooks(query) {
    let filtered = BOOKS.filter(b => b.categories.includes(slug));
    if (query) {
      filtered = filtered.filter(b =>
        b.title.toLowerCase().includes(query) ||
        (b.excerpt || '').toLowerCase().includes(query)
      );
    }
    renderBookGrid('#category-grid', filtered);
    const qEl = $('#cat-query-note');
    if (qEl) qEl.textContent = query ? ' matching "' + query + '"' : '';
  }
  searchInput && searchInput.addEventListener('input', () => {
    filterCategoryBooks(searchInput.value.toLowerCase().trim());
  });
  searchForm && searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = searchInput.value.trim();
    const params = new URLSearchParams({ cat: slug });
    if (val) params.set('q', val);
    window.location.href = 'category.html?' + params.toString();
  });

  injectJsonLd('jsonld-breadcrumbs', {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.lifewithbooks.co/" },
      { "@type": "ListItem", "position": 2, "name": "All Books", "item": "https://www.lifewithbooks.co/all-books.html" },
      { "@type": "ListItem", "position": 3, "name": label, "item": pageUrl }
    ]
  });
  injectJsonLd('jsonld-collection', {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": seo ? seo.collectionName : label + ' - LifeWithBooks',
    "url": pageUrl,
    "description": metaDesc,
    "hasPart": items.slice(0, 30).map(b => ({
      "@type": "Book",
      "name": b.title,
      "url": "https://www.lifewithbooks.co/book.html?id=" + encodeURIComponent(b.id)
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

  const downloadable = isDownloadable(book);
  const pageTitle = downloadable
    ? book.title + ' | Free PDF Download - LifeWithBooks'
    : book.title + ' | Book Overview - LifeWithBooks';
  const pageDesc = (book.excerpt || ('Read about ' + book.title + ' on LifeWithBooks, the free ebook library.')).slice(0, 320);
  const pageUrl = SITE_ORIGIN + '/book.html?id=' + encodeURIComponent(book.id);
  const coverImg = getBookCoverImage(book);
  const shareImg = getBookShareImage(book);
  const localCover = getLocalCoverPath(book);

  setShareMeta({
    title: pageTitle,
    description: pageDesc,
    url: pageUrl,
    image: shareImg
  });
  setMeta('meta[property="og:type"]', 'content', 'book');

  injectJsonLd('jsonld-book', {
    "@context": "https://schema.org",
    "@type": "Book",
    "name": book.title,
    "url": pageUrl,
    "image": shareImg,
    "description": pageDesc,
    "inLanguage": "en",
    "bookFormat": "https://schema.org/EBook",
    "isAccessibleForFree": downloadable,
    "publisher": {
      "@type": "Organization",
      "name": "LifeWithBooks",
      "url": "https://www.lifewithbooks.co/"
    }
  });
  injectJsonLd('jsonld-breadcrumbs', {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.lifewithbooks.co/" },
      { "@type": "ListItem", "position": 2, "name": catObj ? catObj.label : 'Books', "item": "https://www.lifewithbooks.co/category.html?cat=" + encodeURIComponent(primaryCat) },
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

  const whoFor = catObj
    ? '<h2>Who is this book for?</h2><p>This title is ideal for readers interested in ' +
      escapeHtml(catObj.label.toLowerCase()) +
      '. Whether you are a beginner exploring the topic or returning for a refresher, the overview above helps you decide if it is the right fit before you read or obtain a copy.</p>'
    : '';

  const downloadBlock = downloadable
    ? `
    <div class="download-block">
      ${getLicenseBadge(book)}
      <p style="margin:14px 0 16px;font-size:15px;">This is a free, legal edition you can download and keep. The download stays on LifeWithBooks.</p>
      <a class="btn" href="download.html?id=${encodeURIComponent(book.id)}">&#8595; Download Free PDF</a>
    </div>`
    : `
    <div class="download-block summary-block">
      ${getLicenseBadge(book)}
      <p style="margin:14px 0 16px;font-size:15px;">We provide a detailed overview of this book for study and reference. To read the full work, please support the author and publisher by getting an official copy.</p>
      <div class="official-links">${getOfficialSourceLinks(book)}</div>
    </div>`;

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

    <img
      class="book-detail-cover"
      src="${escapeHtml(coverImg)}"
      alt="${escapeHtml(book.title)} cover"
      loading="eager"
      referrerpolicy="no-referrer"
      onerror="if(this.dataset.fallback){this.src=this.dataset.fallback;this.dataset.fallback='';}else{this.style.display='none';}"
      ${coverImg !== localCover ? 'data-fallback="' + escapeHtml(localCover) + '"' : ''}
    />

    <h1>${escapeHtml(book.title)}</h1>
    <div class="meta">${tags}</div>

    <article class="article">
      ${paragraphs}
      ${whoFor}
    </article>

    ${downloadBlock}

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


/* ---------- Articles (blog) ---------- */
function articleCardHTML(a) {
  return `
    <article class="book-card cover-${escapeHtml(a.cover || 'english')} article-card">
      <a class="thumb" href="article.html?id=${encodeURIComponent(a.id)}" aria-label="${escapeHtml(a.title)}">
        <div class="cover">
          <div class="book"><span class="title-on-cover">${escapeHtml(a.title)}</span><span class="ribbon"></span></div>
        </div>
      </a>
      <div class="info">
        <h3><a href="article.html?id=${encodeURIComponent(a.id)}">${escapeHtml(a.title)}</a></h3>
        <p class="article-excerpt">${escapeHtml(a.excerpt || '')}</p>
        <a class="read-more" href="article.html?id=${encodeURIComponent(a.id)}">Read Article</a>
      </div>
    </article>`;
}

function initArticles() {
  if (document.body.dataset.page !== 'articles') return;
  if (typeof ARTICLES === 'undefined') return;
  const el = $('#articles-grid');
  if (el) {
    const sorted = ARTICLES.slice().sort(function(a, b) {
      return (b.date || '').localeCompare(a.date || '');
    });
    el.innerHTML = sorted.map(articleCardHTML).join('');
  }
  setShareMeta({
    title: 'Articles & Reading Guides | LifeWithBooks',
    description: 'Original reading guides and articles from the LifeWithBooks editorial team.',
    url: SITE_ORIGIN + '/articles.html',
    image: SITE_ORIGIN + '/og-image.png'
  });
  injectJsonLd('jsonld-articles', {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "LifeWithBooks Articles",
    "url": SITE_ORIGIN + "/articles.html",
    "blogPost": ARTICLES.map(a => ({
      "@type": "BlogPosting",
      "headline": a.title,
      "datePublished": a.date,
      "url": SITE_ORIGIN + "/article.html?id=" + encodeURIComponent(a.id)
    }))
  });
}

function initArticleDetail() {
  if (document.body.dataset.page !== 'article') return;
  if (typeof ARTICLES === 'undefined') return;
  const id = getParam('id');
  const a = ARTICLES.find(x => x.id === id);
  const wrap = $('#article-detail');
  if (!wrap) return;
  if (!a) {
    wrap.innerHTML = '<p style="text-align:center;padding:40px 0;">Sorry, this article could not be found. <a href="articles.html">Browse all articles</a>.</p>';
    return;
  }
  const url = SITE_ORIGIN + '/article.html?id=' + encodeURIComponent(a.id);
  const desc = (a.excerpt || '').slice(0, 320);
  setShareMeta({ title: a.title + ' | LifeWithBooks', description: desc, url: url, image: SITE_ORIGIN + '/og-image.png' });
  setMeta('meta[property="og:type"]', 'content', 'article');

  const body = (a.body || []).map(p =>
    p.indexOf('## ') === 0 ? '<h2>' + escapeHtml(p.slice(3)) + '</h2>' : '<p>' + escapeHtml(p) + '</p>'
  ).join('');
  let dateStr = a.date;
  try { dateStr = new Date(a.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }); } catch (e) {}
  const others = ARTICLES.filter(x => x.id !== a.id).slice(0, 6);
  const relatedHTML = others.map(x =>
    `<li><a href="article.html?id=${encodeURIComponent(x.id)}"><span>${escapeHtml(x.title)}</span><span class="arrow">Read More &raquo;</span></a></li>`
  ).join('');

  wrap.innerHTML = `
    <div class="breadcrumb">
      <a href="index.html">Home</a> &raquo;
      <a href="articles.html">Articles</a> &raquo;
      <span>${escapeHtml(a.title)}</span>
    </div>
    <h1>${escapeHtml(a.title)}</h1>
    <div class="meta"><span class="tag">${escapeHtml(dateStr)}</span><span class="tag">${escapeHtml(a.author || 'LifeWithBooks')}</span></div>
    <article class="article">${body}</article>
    <div class="download-block">
      <p style="margin-bottom:14px;">Enjoyed this guide? Explore our free library of public-domain classics and original guides.</p>
      <a class="btn" href="all-books.html">Browse Free Books</a>
    </div>
    <div class="related-posts"><h3>More Articles</h3><ul>${relatedHTML}</ul></div>
  `;

  injectJsonLd('jsonld-article', {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": a.title,
    "description": desc,
    "datePublished": a.date,
    "author": { "@type": "Organization", "name": a.author || "LifeWithBooks" },
    "publisher": { "@type": "Organization", "name": "LifeWithBooks", "url": SITE_ORIGIN + "/" },
    "mainEntityOfPage": url,
    "image": SITE_ORIGIN + "/og-image.png"
  });
  injectJsonLd('jsonld-breadcrumbs', {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_ORIGIN + "/" },
      { "@type": "ListItem", "position": 2, "name": "Articles", "item": SITE_ORIGIN + "/articles.html" },
      { "@type": "ListItem", "position": 3, "name": a.title, "item": url }
    ]
  });
}

/* ---------- Cookie consent + ads readiness ---------- */
/* To enable Google AdSense after approval:
   1. Set ADSENSE_CLIENT below to your publisher id, e.g. 'ca-pub-1234567890123456'.
   2. Paste the same id into ads.txt (replace the placeholder line).
   Ads only load after the visitor accepts cookies. */
const ADSENSE_CLIENT = 'ca-pub-5913415234423873';
const COOKIE_KEY = 'lwb_cookie_consent';

function loadAdSense() {
  if (!ADSENSE_CLIENT) return;
  if (document.querySelector('script[src*="adsbygoogle.js"]')) return;
  const s = document.createElement('script');
  s.id = 'lwb-adsense';
  s.async = true;
  s.crossOrigin = 'anonymous';
  s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + ADSENSE_CLIENT;
  document.head.appendChild(s);
}

function injectCookieBanner() {
  let consent = null;
  try { consent = localStorage.getItem(COOKIE_KEY); } catch (e) {}
  if (consent === 'accepted') { loadAdSense(); return; }
  if (consent === 'declined') return;

  const bar = document.createElement('div');
  bar.className = 'cookie-banner';
  bar.setAttribute('role', 'dialog');
  bar.setAttribute('aria-label', 'Cookie consent');
  bar.innerHTML =
    '<p>We use cookies to keep this library free, understand how it is used, and (in future) show relevant ads. See our <a href="cookie-policy.html">Cookie Policy</a>.</p>' +
    '<div class="cookie-actions">' +
      '<button type="button" class="cookie-btn decline" id="cookieDecline">Decline</button>' +
      '<button type="button" class="cookie-btn accept" id="cookieAccept">Accept</button>' +
    '</div>';
  document.body.appendChild(bar);

  function close(choice) {
    try { localStorage.setItem(COOKIE_KEY, choice); } catch (e) {}
    bar.remove();
    if (choice === 'accepted') loadAdSense();
  }
  const accept = document.getElementById('cookieAccept');
  const decline = document.getElementById('cookieDecline');
  accept && accept.addEventListener('click', () => close('accepted'));
  decline && decline.addEventListener('click', () => close('declined'));
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  injectHeader();
  injectFooter();
  initHome();
  initAllBooks();
  initCategory();
  initBookDetail();
  initArticles();
  initArticleDetail();
  injectCookieBanner();
});
