/* LifeWithBooks - shared site behaviour */

const SITE_ORIGIN = 'https://www.lifewithbooks.co';
const SITE_OG_IMAGE = SITE_ORIGIN + '/og-home.webp';

function getBookPageUrl(id) {
  return SITE_ORIGIN + '/book/' + encodeURIComponent(id) + '.html';
}
function getArticlePageUrl(id) {
  return SITE_ORIGIN + '/articles/' + encodeURIComponent(id) + '.html';
}
function getCategoryPageUrl(slug) {
  return SITE_ORIGIN + '/category/' + slug + '.html';
}
function pagePrefix() {
  return document.body && document.body.dataset.pathDepth === '1' ? '../' : '';
}
/** Prefix relative asset paths (covers/, covers-img/) for pages in subfolders. */
function resolveAssetPath(path) {
  if (!path) return path;
  if (/^https?:\/\//i.test(path) || /^data:/i.test(path)) return path;
  if (path.charAt(0) === '/') return path;
  const prefix = pagePrefix();
  if (prefix && path.indexOf(prefix) !== 0) return prefix + path.replace(/^\.\//, '');
  return path;
}
function getBookPagePath(id) {
  return pagePrefix() + 'book/' + encodeURIComponent(id) + '.html';
}
function getArticlePagePath(id) {
  return pagePrefix() + 'articles/' + encodeURIComponent(id) + '.html';
}
function getCategoryPagePath(slug) {
  return pagePrefix() + 'category/' + slug + '.html';
}

function localWebpPath(src) {
  if (!src || /^https?:\/\//i.test(src)) return null;
  if (/\.webp$/i.test(src)) return src;
  if (/\.(jpg|jpeg|png)$/i.test(src)) return src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  return null;
}

function pictureTag(src, alt, opts) {
  opts = opts || {};
  const w = opts.width || 200;
  const h = opts.height || 200;
  const loading = opts.loading || 'lazy';
  const cls = opts.class ? ' class="' + opts.class + '"' : '';
  const fp = opts.fetchpriority ? ' fetchpriority="' + opts.fetchpriority + '"' : '';
  const extra = opts.referrerpolicy ? ' referrerpolicy="' + opts.referrerpolicy + '"' : '';
  const onerr = opts.onerror ? ' onerror="' + opts.onerror + '"' : '';
  const webp = localWebpPath(src);
  if (webp && webp !== src) {
    return '<picture><source srcset="' + escapeHtml(webp) + '" type="image/webp"><img' + cls + ' src="' + escapeHtml(src) + '" alt="' + escapeHtml(alt) + '" width="' + w + '" height="' + h + '" loading="' + loading + '"' + fp + extra + onerr + '></picture>';
  }
  return '<img' + cls + ' src="' + escapeHtml(src) + '" alt="' + escapeHtml(alt) + '" width="' + w + '" height="' + h + '" loading="' + loading + '"' + fp + extra + onerr + '>';
}

function isNewBook(book) {
  const newCats = ['ielts-preparation', 'css-pms-books', 'matric-fsc-notes', 'islamic-books', 'programming-books', 'o-level-a-level', 'self-development-books'];
  return book && book.access === 'summary' && (book.categories || []).some(c => newCats.includes(c));
}

function isRecentlyUpdated(dateStr, days) {
  if (!dateStr) return false;
  return (Date.now() - new Date(dateStr).getTime()) < (days || 7) * 86400000;
}

function shareButtonsHTML(url, title) {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const wa = encodeURIComponent('Check this free guide: ' + title + ' ' + url);
  return `<div class="share-buttons">
    <a class="share-wa" href="https://wa.me/?text=${wa}" target="_blank" rel="noopener">WhatsApp</a>
    <a class="share-fb" href="https://www.facebook.com/sharer/sharer.php?u=${u}" target="_blank" rel="noopener">Facebook</a>
    <a class="share-tw" href="https://twitter.com/intent/tweet?text=${t}&amp;url=${u}" target="_blank" rel="noopener">X / Twitter</a>
    <button type="button" class="share-copy" data-share-url="${escapeHtml(url)}">Copy link</button>
  </div>`;
}

function bindShareCopyButtons(root) {
  (root || document).querySelectorAll('[data-share-url]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      navigator.clipboard.writeText(btn.getAttribute('data-share-url'));
      btn.textContent = 'Copied!';
      setTimeout(function() { btn.textContent = 'Copy link'; }, 2000);
    });
  });
}

function coverImgError(img) {
  if (img.dataset.fallback && img.src !== img.dataset.fallback) {
    img.src = img.dataset.fallback;
    img.removeAttribute('data-fallback');
    return;
  }
  img.style.display = 'none';
  var wrap = img.closest('.cover');
  if (wrap) {
    var fb = wrap.querySelector('.book');
    if (fb) fb.style.display = 'block';
  }
}

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
  },
  'self-development-books': {
    pageTitle: 'Free Self Development Books PDF | LifeWithBooks',
    metaDescription: 'Free self development books PDF — classic motivation, Stoicism and personal growth on LifeWithBooks.',
    intro: 'Browse free self development books and guides on LifeWithBooks.',
    collectionName: 'Self Development Books — LifeWithBooks'
  },
  'ielts-preparation': {
    heading: 'Free IELTS Preparation Books',
    pageTitle: 'Free IELTS Preparation Books PDF | Practice Tests | LifeWithBooks',
    metaDescription: 'Free IELTS preparation books and PDF study guides — Academic practice tests, Writing, Speaking, vocabulary and Listening on LifeWithBooks.',
    intro: 'Prepare for IELTS Academic with free reference guides on LifeWithBooks — practice strategies, writing frameworks, speaking topics and vocabulary builders.',
    collectionName: 'IELTS Preparation — LifeWithBooks'
  },
  'css-pms-books': {
    heading: 'CSS & PMS Exam Books',
    pageTitle: 'Free CSS PMS Exam Books PDF | Past Papers | LifeWithBooks',
    metaDescription: 'Free CSS and PMS exam preparation guides for Pakistani students on LifeWithBooks.',
    intro: 'CSS and PMS candidates can browse free study guides covering English essay, precis, current affairs and general knowledge.',
    collectionName: 'CSS PMS Books — LifeWithBooks'
  },
  'matric-fsc-notes': {
    heading: 'Matric & FSc Notes',
    pageTitle: 'Free Matric FSc Notes PDF | Study Guides | LifeWithBooks',
    metaDescription: 'Free Matric and FSc notes PDF guides for Pakistani students on LifeWithBooks.',
    intro: 'Matric and FSc study guides for English, Physics, Chemistry, Biology and Mathematics.',
    collectionName: 'Matric FSc Notes — LifeWithBooks'
  },
  'islamic-books': {
    heading: 'Free Islamic Books',
    pageTitle: 'Free Islamic Books PDF | Download | LifeWithBooks',
    metaDescription: 'Free Islamic books and study guides PDF on LifeWithBooks.',
    intro: 'Browse Islamic book guides — Seerah, Arabic, history and Quran translation resources.',
    collectionName: 'Islamic Books — LifeWithBooks'
  },
  'programming-books': {
    heading: 'Free Programming Books',
    pageTitle: 'Free Programming Books PDF | Python HTML JavaScript | LifeWithBooks',
    metaDescription: 'Free programming beginner guides — Python, HTML, CSS, JavaScript, Git and SQL on LifeWithBooks.',
    intro: 'Learn programming with free guides on Python, web development, JavaScript, Git and SQL.',
    collectionName: 'Programming Books — LifeWithBooks'
  },
  'o-level-a-level': {
    heading: 'O Level & A Level',
    pageTitle: 'Free O Level A Level Study Materials PDF | LifeWithBooks',
    metaDescription: 'Free O Level and A Level study guides PDF on LifeWithBooks.',
    intro: 'Cambridge O Level, A Level and IGCSE revision guides and exam preparation.',
    collectionName: 'O Level A Level — LifeWithBooks'
  },
  'kids-learning-books': {
    pageTitle: 'Free Kids Learning Books PDF | Educational | LifeWithBooks',
    metaDescription: 'Free kids learning books PDF — classics and educational reads for children on LifeWithBooks.',
    intro: 'Free kids learning books and classic stories for family reading.',
    collectionName: 'Kids Learning Books — LifeWithBooks'
  }
};

function getCategorySeo(slug) {
  return CATEGORY_SEO[slug] || null;
}

const ARTICLE_COVER_CATEGORIES = {
  english: 'english-learning-books',
  vocabulary: 'vocabulary-books',
  french: 'french-learning-books',
  german: 'german-learning-books',
  spanish: 'spanish-learning-books',
  kids: 'kids-learning-books',
  literature: 'literature-books',
  novel: 'novels',
  adventure: 'adventure-books',
  grammar: 'grammar-books',
  health: 'health-books',
  self: 'self-grooming-books',
  business: 'business-books',
  trading: 'trading-books'
};

const ARTICLE_CATEGORY_LINKS = {
  'build-english-vocabulary-through-reading': 'vocabulary-books',
  'learn-a-language-with-free-books': 'english-learning-books',
  'learn-french-with-free-books': 'french-learning-books',
  'learn-german-through-reading-guide': 'german-learning-books',
  'spanish-reading-plan-for-beginners': 'spanish-learning-books',
  'english-beginners-first-30-days': 'english-learning-books',
  'essential-english-grammar-self-study': 'grammar-books',
  'where-to-find-free-books-legally': 'literature-books',
  'what-is-public-domain-and-why-it-matters': 'literature-books'
};

function getArticleCategorySlug(article) {
  if (!article) return '';
  if (ARTICLE_CATEGORY_LINKS[article.id]) return ARTICLE_CATEGORY_LINKS[article.id];
  if (article.cover && ARTICLE_COVER_CATEGORIES[article.cover]) return ARTICLE_COVER_CATEGORIES[article.cover];
  return '';
}

function getArticlesList() {
  return typeof ARTICLES !== 'undefined' && Array.isArray(ARTICLES) ? ARTICLES : [];
}

function getRelatedBooksForArticle(article, limit) {
  const cat = getArticleCategorySlug(article);
  if (!cat) return [];
  return BOOKS.filter(b => b.categories.includes(cat)).slice(0, limit || 4);
}

function getRelatedArticlesForCategory(slug, limit) {
  const list = getArticlesList();
  if (!list.length) return [];
  const matched = list.filter(a => getArticleCategorySlug(a) === slug);
  return (matched.length ? matched : list).slice(0, limit || 4);
}

function getRelatedArticlesForBook(book, limit) {
  const list = getArticlesList();
  if (!list.length || !book) return [];
  const cats = book.categories || [];
  const matched = list.filter(a => {
    const slug = getArticleCategorySlug(a);
    return slug && cats.includes(slug);
  });
  return (matched.length ? matched : list).slice(0, limit || 3);
}

function isJunkSearchQuery(q) {
  if (!q) return false;
  const lower = q.toLowerCase();
  return (
    lower.includes('search_term_string') ||
    lower.includes('search_form_string') ||
    lower.includes('{') ||
    lower.includes('}')
  );
}

function applySearchQuerySeo(basePath, query) {
  const canonical = SITE_ORIGIN + basePath;
  if (query) {
    setMeta('meta[name="robots"]', 'content', 'noindex, follow');
  }
  setCanonical(canonical);
  if (query && isJunkSearchQuery(query)) {
    document.title = 'Search | LifeWithBooks';
  }
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
  return resolveAssetPath('covers/' + book.id + '.svg');
}

function getBookShareImage(book) {
  return SITE_ORIGIN + '/og/books/' + book.id + '.webp';
}

function getCategoryShareImage(slug) {
  return SITE_ORIGIN + '/og/categories/' + slug + '.webp';
}

function getBookCoverImage(book) {
  if (book.coverImage) {
    const img = book.coverImage;
    if (/^https?:\/\//i.test(img)) return img;
    return resolveAssetPath(img);
  }
  const gutenbergId = getGutenbergId(book.pdf || '');
  if (gutenbergId) return `https://www.gutenberg.org/cache/epub/${gutenbergId}/pg${gutenbergId}.cover.medium.jpg`;
  const driveFileId = getDriveFileId(book.pdf || '');
  if (driveFileId) return `https://drive.google.com/thumbnail?id=${driveFileId}&sz=w1000`;
  return getLocalCoverPath(book);
}

function normalizeBrokenCoverSrc(src) {
  if (!src) return src;
  return String(src).replace(/^\.\.\/(https?:\/\/)/i, '$1');
}

function getBookCoverUrl(book) {
  if (book.coverUrl && /^https?:\/\//i.test(book.coverUrl)) return book.coverUrl;
  const stored = getBookCoverImage(book);
  if (stored && /^https?:\/\//i.test(stored)) return stored;
  if (stored && !/\.svg(\?|$)/i.test(stored)) return stored;
  if (book.isbn) {
    return 'https://covers.openlibrary.org/b/isbn/' + encodeURIComponent(String(book.isbn).replace(/[^\dX]/gi, '')) + '-L.jpg';
  }
  const title = encodeURIComponent(
    (book.title || '').replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim()
  );
  return 'https://covers.openlibrary.org/b/title/' + title + '-L.jpg';
}

function getCategoryColorsForCover(book) {
  const slug = (book.categories && book.categories[0]) || '';
  const cat = CATEGORIES.find(function(c) { return c.slug === slug; });
  const label = cat ? cat.label : '';
  const map = {
    'Novels': { top: '#7b1c1c', bottom: '#b71c1c', spine: '#4a0808' },
    'Literature Books': { top: '#7b1c1c', bottom: '#b71c1c', spine: '#4a0808' },
    'IELTS Preparation': { top: '#0d47a1', bottom: '#1976d2', spine: '#082d6e' },
    'CSS PMS Pakistan': { top: '#1a237e', bottom: '#3949ab', spine: '#0d1642' },
    'Kids Learning Books': { top: '#e65100', bottom: '#ff8f00', spine: '#bf360c' },
    'Programming Books': { top: '#1a1a2e', bottom: '#16213e', spine: '#0f0f1a' },
    'Islamic Books': { top: '#004d40', bottom: '#00796b', spine: '#00251a' },
    'Self Development Books': { top: '#4a148c', bottom: '#7b1fa2', spine: '#2a0854' },
    'Matric FSc Notes': { top: '#1b5e20', bottom: '#388e3c', spine: '#0a2e0d' },
    'English Learning Books': { top: '#006064', bottom: '#0097a7', spine: '#003840' }
  };
  return map[label] || { top: '#1a4731', bottom: '#2d6a4f', spine: '#0d2e1c' };
}

function generateCanvasCover(book) {
  const container = document.getElementById('cover-container');
  if (!container) return;
  const existing = container.querySelector('canvas.book-cover-canvas');
  if (existing) return;
  const img = document.getElementById('book-cover-img');
  if (img) img.style.display = 'none';
  const colors = getCategoryColorsForCover(book);
  const canvas = document.createElement('canvas');
  canvas.width = 300;
  canvas.height = 420;
  canvas.className = 'book-cover-canvas';
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', book.title + ' cover');
  const ctx = canvas.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 300, 420);
  grad.addColorStop(0, colors.top);
  grad.addColorStop(1, colors.bottom);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 300, 420);
  ctx.fillStyle = colors.spine;
  ctx.fillRect(0, 0, 30, 420);
  ctx.fillStyle = 'rgba(255,255,255,0.15)';
  ctx.fillRect(30, 0, 270, 70);
  ctx.fillStyle = 'rgba(255,255,255,0.9)';
  ctx.font = 'bold 16px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('LifeWithBooks', 165, 42);
  ctx.strokeStyle = 'rgba(255,255,255,0.3)';
  ctx.beginPath();
  ctx.moveTo(50, 80);
  ctx.lineTo(280, 80);
  ctx.stroke();
  const words = (book.title || '').split(/\s+/);
  const lines = [];
  let line = '';
  ctx.font = 'bold 26px Arial, sans-serif';
  words.forEach(function(word) {
    const test = line ? line + ' ' + word : word;
    if (ctx.measureText(test).width > 220 && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  });
  if (line) lines.push(line);
  const lineHeight = 34;
  let y = (420 - lines.length * lineHeight) / 2;
  ctx.fillStyle = '#fff';
  lines.forEach(function(l) {
    ctx.fillText(l, 165, y);
    y += lineHeight;
  });
  const author = getBookAuthor(book);
  if (author) {
    ctx.fillStyle = 'rgba(255,255,255,0.75)';
    ctx.font = '16px Arial, sans-serif';
    ctx.fillText(author.slice(0, 36), 165, y + 8);
  }
  ctx.fillStyle = '#16a34a';
  if (ctx.roundRect) {
    ctx.beginPath();
    ctx.roundRect(100, 370, 100, 32, 16);
    ctx.fill();
  } else {
    ctx.fillRect(100, 370, 100, 32);
  }
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 16px Arial, sans-serif';
  ctx.fillText('FREE', 150, 392);
  container.appendChild(canvas);
}

function setupBookCoverFallbacks(img, book) {
  if (!img || img.dataset.coverBound === '1') return;
  img.dataset.coverBound = '1';
  const primaryUrl = getBookCoverUrl(book);
  let step = 0;
  img.onerror = function() {
    step += 1;
    if (step === 1) {
      const m = primaryUrl.replace('-L.jpg', '-M.jpg');
      if (img.src !== m) {
        img.src = m;
        return;
      }
    }
    if (step === 2) {
      fetch('https://www.googleapis.com/books/v1/volumes?q=intitle:' + encodeURIComponent(book.title) + '&maxResults=1')
        .then(function(r) { return r.json(); })
        .then(function(data) {
          const thumb = data.items && data.items[0] && data.items[0].volumeInfo &&
            data.items[0].volumeInfo.imageLinks &&
            data.items[0].volumeInfo.imageLinks.thumbnail;
          if (thumb) {
            img.style.display = '';
            img.src = thumb.replace(/^http:/, 'https:').replace(/zoom=1/, 'zoom=2');
            return;
          }
          generateCanvasCover(book);
        })
        .catch(function() { generateCanvasCover(book); });
      return;
    }
    generateCanvasCover(book);
  };
}

function initBookDetailCoverEnhance(book) {
  if (!book) return;
  const wrap = $('#book-detail');
  if (!wrap) return;
  let img = document.getElementById('book-cover-img');
  if (!img) {
    const picImg = wrap.querySelector('picture img.book-detail-cover, img.book-detail-cover');
    if (picImg) {
      img = picImg;
      img.id = 'book-cover-img';
      if (!img.classList.contains('book-cover-img')) img.classList.add('book-cover-img');
    }
  }
  if (!img) return;
  let container = document.getElementById('cover-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'cover-container';
    container.className = 'cover-container';
    const section = document.createElement('div');
    section.className = 'book-cover-section';
    const parent = img.closest('picture') || img;
    parent.parentNode.insertBefore(section, parent);
    section.appendChild(container);
    container.appendChild(parent);
  }
  img.src = normalizeBrokenCoverSrc(img.src);
  const primary = getBookCoverUrl(book);
  const isSvg = /\.svg(\?|$)/i.test(img.src);
  const isBroken = !img.src || img.src.indexOf('../http') !== -1;
  if (isBroken || isSvg) {
    img.style.display = '';
    img.src = primary;
  }
  setupBookCoverFallbacks(img, book);
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
    .map(c => `<li><a href="${getCategoryPagePath(c.slug)}">${c.label}</a></li>`)
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
      <a class="site-logo" href="/" aria-label="LifeWithBooks home">
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
          <li${isHome ? ' class="active"' : ''}><a href="/">Home</a></li>
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
  const coverVisual = pictureTag(primarySrc, book.title + ' cover', {
    class: 'cover-image',
    width: 200,
    height: 200,
    loading: 'lazy',
    referrerpolicy: 'no-referrer',
    onerror: 'coverImgError(this)'
  }).replace('<img', primarySrc !== localFallback ? '<img data-fallback="' + escapeHtml(localFallback) + '"' : '<img');
  return `
    <article class="book-card cover-${escapeHtml(book.cover || 'english')}">
      <a class="thumb" href="${getBookPagePath(book.id)}" aria-label="${escapeHtml(book.title)}">
        <div class="cover">
          ${coverVisual}
          ${categoryCover}
        </div>
      </a>
      <div class="info">
        <h3><a href="${getBookPagePath(book.id)}">${escapeHtml(book.title)}</a>${isNewBook(book) ? ' <span class="badge-new">New</span>' : ''}</h3>
        <a class="read-more" href="${getBookPagePath(book.id)}">Read More</a>
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

function findBookById(id) {
  return BOOKS.find(function(b) { return b.id === id; });
}

function getBookAuthor(book) {
  if (book.author) return book.author;
  const ex = book.excerpt || '';
  const byMatch = ex.match(/\bby\s+([A-Z][A-Za-z\s.'-]+)/);
  if (byMatch) return byMatch[1].trim();
  const fromMatch = ex.match(/\bfrom\s+([A-Z][A-Za-z\s.'-]+)/);
  if (fromMatch) return fromMatch[1].trim();
  if (book.license === 'public-domain') return 'Public Domain';
  return 'LifeWithBooks';
}

function estimateReadTime(article) {
  let words = 0;
  if (article.body && article.body.length) {
    words = article.body.join(' ').split(/\s+/).length;
  } else if (article.excerpt) {
    words = article.excerpt.split(/\s+/).length * 8;
  }
  return Math.max(3, Math.round(words / 200)) + ' min read';
}

const HOME_CATEGORY_META = [
  { slug: 'ielts-preparation', label: 'IELTS Preparation', icon: '\uD83C\uDF93', gradient: 'cat-blue' },
  { slug: 'css-pms-books', label: 'CSS PMS Exam', icon: '\uD83D\uDCDD', gradient: 'cat-purple' },
  { slug: 'literature-books', label: 'Classic Novels', icon: '\uD83D\uDCD5', gradient: 'cat-red' },
  { slug: 'kids-learning-books', label: 'Kids Learning', icon: '\uD83E\uDDD2', gradient: 'cat-yellow' },
  { slug: 'matric-fsc-notes', label: 'Matric FSc Notes', icon: '\uD83D\uDD2C', gradient: 'cat-green' },
  { slug: 'islamic-books', label: 'Islamic Books', icon: '\u262A\uFE0F', gradient: 'cat-teal' },
  { slug: 'programming-books', label: 'Programming', icon: '\uD83D\uDCBB', gradient: 'cat-dark' },
  { slug: 'self-development-books', label: 'Self Development', icon: '\uD83C\uDF1F', gradient: 'cat-orange' }
];

const CATEGORY_PILL_MAP = {
  'ielts-preparation': 'cat-pill-blue',
  'css-pms-books': 'cat-pill-purple',
  'literature-books': 'cat-pill-red',
  'novels': 'cat-pill-red',
  'kids-learning-books': 'cat-pill-yellow',
  'matric-fsc-notes': 'cat-pill-green',
  'islamic-books': 'cat-pill-teal',
  'programming-books': 'cat-pill-dark',
  'self-development-books': 'cat-pill-orange',
  'english-learning-books': 'cat-pill-blue'
};

const TRENDING_BOOK_IDS = [
  'pride-and-prejudice',
  'the-adventures-of-sherlock-holmes',
  'ielts-academic-practice-tests-guide',
  'css-english-essay-writing-guide',
  'aesops-fables',
  'python-programming-beginner-guide'
];

const FEATURED_ARTICLE_IDS = [
  'how-to-prepare-for-ielts-using-free-pdf-books',
  'complete-css-exam-preparation-guide-pakistan',
  'best-free-books-for-matric-students-pakistan'
];

const HERO_STACK_IDS = ['pride-and-prejudice', 'ielts-academic-practice-tests-guide', 'python-programming-beginner-guide'];

function categoryLabelForBook(book) {
  const slug = (book.categories && book.categories[0]) || '';
  const cat = CATEGORIES.find(function(c) { return c.slug === slug; });
  return cat ? cat.label : 'Books';
}

function categoryPillClass(slug) {
  return CATEGORY_PILL_MAP[slug] || 'cat-pill-teal';
}

function trendingBookCardHTML(book) {
  const catSlug = (book.categories && book.categories[0]) || '';
  const coverSrc = getBookCoverImage(book);
  const localFallback = getLocalCoverPath(book);
  const author = getBookAuthor(book);
  const pillClass = categoryPillClass(catSlug);
  const coverBlock = coverSrc
    ? '<img src="' + escapeHtml(coverSrc) + '" alt="' + escapeHtml(book.title) + ' cover" width="120" height="180" loading="lazy" referrerpolicy="no-referrer" onerror="coverImgError(this)"' + (coverSrc !== localFallback ? ' data-fallback="' + escapeHtml(localFallback) + '"' : '') + '>'
    : '<div class="cover-fallback cover-' + escapeHtml(book.cover || 'english') + '">' + escapeHtml(book.title.slice(0, 24)) + '</div>';
  return `
    <article class="trending-card">
      <div class="trending-card__cover">
        <span class="trending-card__badge">Free</span>
        ${coverBlock}
      </div>
      <div class="trending-card__body">
        <h3><a href="${getBookPagePath(book.id)}">${escapeHtml(book.title)}</a></h3>
        <p class="trending-card__author">${escapeHtml(author)}</p>
        <span class="trending-card__cat ${pillClass}">${escapeHtml(categoryLabelForBook(book))}</span>
        <a class="trending-card__link" href="${getBookPagePath(book.id)}">Download Free &rarr;</a>
      </div>
    </article>`;
}

function homeCategoryCardHTML(meta) {
  const count = BOOKS.filter(function(b) { return b.categories.includes(meta.slug); }).length;
  return `
    <a class="category-card ${meta.gradient}" href="${getCategoryPagePath(meta.slug)}">
      <span class="category-card__icon" aria-hidden="true">${meta.icon}</span>
      <span class="category-card__name">${escapeHtml(meta.label)}</span>
      <span class="category-card__count">${count} book${count === 1 ? '' : 's'}</span>
      <span class="category-card__arrow" aria-hidden="true">&rarr;</span>
    </a>`;
}

function homeArticleCardHTML(a) {
  const catSlug = ARTICLE_COVER_CATEGORIES[a.cover || 'english'] || 'english-learning-books';
  const cat = CATEGORIES.find(function(c) { return c.slug === catSlug; });
  const pillClass = categoryPillClass(catSlug);
  return `
    <article class="home-article-card">
      <span class="home-article-card__badge ${pillClass}">${escapeHtml(cat ? cat.label : 'Guide')}</span>
      <h3><a href="${getArticlePagePath(a.id)}">${escapeHtml(a.title)}</a></h3>
      <p class="home-article-card__excerpt">${escapeHtml(a.excerpt || '')}</p>
      <p class="home-article-card__meta">${escapeHtml(a.author || 'Mubashir Mehdi')} &middot; ${escapeHtml(estimateReadTime(a))}</p>
      <a class="home-article-card__link" href="${getArticlePagePath(a.id)}">Read Guide &rarr;</a>
    </article>`;
}

function recentBookCardHTML(book) {
  const coverSrc = getBookCoverImage(book);
  const localFallback = getLocalCoverPath(book);
  const imgTag = coverSrc
    ? '<img src="' + escapeHtml(coverSrc) + '" alt="" width="80" height="120" loading="lazy" referrerpolicy="no-referrer" onerror="coverImgError(this)"' + (coverSrc !== localFallback ? ' data-fallback="' + escapeHtml(localFallback) + '"' : '') + '>'
    : '';
  return `
    <article class="recent-card">
      <div class="recent-card__cover">
        <span class="recent-card__new">New</span>
        ${imgTag}
      </div>
      <div class="recent-card__body">
        <h3><a href="${getBookPagePath(book.id)}">${escapeHtml(book.title)}</a></h3>
      </div>
    </article>`;
}

function renderHeroBookStack() {
  const host = $('#hero-book-stack');
  if (!host) return;
  const books = HERO_STACK_IDS.map(findBookById).filter(Boolean);
  host.innerHTML = '<div class="hero-book-stack">' + books.map(function(book, i) {
    const src = getBookCoverImage(book);
    return '<div class="hero-book-stack__item" style="z-index:' + (i + 1) + '"><img src="' + escapeHtml(src) + '" alt="" width="160" height="240" loading="eager" fetchpriority="' + (i === 1 ? 'high' : 'auto') + '" referrerpolicy="no-referrer"></div>';
  }).join('') + '</div>';
}

function initStatsCounter() {
  const bar = $('#stats-bar');
  if (!bar) return;
  const nums = bar.querySelectorAll('.stat-item__num');
  let animated = false;
  let completed = false;

  function setFinalValues() {
    nums.forEach(function(el) {
      if (el.dataset.final) {
        el.textContent = el.dataset.final;
      } else {
        const target = parseInt(el.dataset.target, 10) || 0;
        const suffix = el.dataset.suffix || '';
        el.textContent = target + suffix;
      }
    });
    completed = true;
  }

  function animateValue(el, onDone) {
    if (el.classList.contains('stat-item__num--text')) {
      el.textContent = el.dataset.final || 'Zero';
      if (onDone) onDone();
      return;
    }
    const target = parseInt(el.dataset.target, 10) || 0;
    const suffix = el.dataset.suffix || '';
    const duration = 1200;
    const start = performance.now();
    el.textContent = suffix === '%' ? '0%' : '0';
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);
      el.textContent = current + suffix;
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else if (onDone) {
        onDone();
      }
    }
    requestAnimationFrame(tick);
  }

  function runAnimation() {
    if (animated) return;
    animated = true;
    let done = 0;
    const total = nums.length;
    nums.forEach(function(el) {
      if (el.classList.contains('stat-item__num--text')) {
        el.textContent = el.dataset.final || 'Zero';
        done++;
        if (done >= total) completed = true;
        return;
      }
      el.textContent = el.dataset.suffix === '%' ? '0%' : '0';
      animateValue(el, function() {
        done++;
        if (done >= total) completed = true;
      });
    });
  }

  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(function(entries) {
      if (entries.some(function(e) { return e.isIntersecting; })) {
        runAnimation();
        obs.disconnect();
      }
    }, { threshold: 0.1 });
    obs.observe(bar);
  }

  runAnimation();

  setTimeout(function() {
    if (!completed) setFinalValues();
  }, 3000);
}

function initNewsletterForm() {
  const form = $('#newsletterForm');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const emailEl = $('#newsletterEmail');
    const email = emailEl ? emailEl.value.trim() : '';
    if (!email) return;
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Subscribed!';
    btn.disabled = true;
    form.reset();
    setTimeout(function() {
      btn.textContent = original;
      btn.disabled = false;
    }, 3000);
  });
}

/* ---------- Home page ---------- */
function initHome() {
  if (document.body.dataset.page !== 'home') return;

  const articlesGrid = $('#home-articles-grid');
  if (articlesGrid && typeof ARTICLES !== 'undefined') {
    const featured = FEATURED_ARTICLE_IDS.map(function(id) {
      return ARTICLES.find(function(a) { return a.id === id; });
    }).filter(Boolean);
    articlesGrid.innerHTML = featured.map(homeArticleCardHTML).join('');
  }

  const recentGrid = $('#home-recent-grid');
  if (recentGrid && typeof BOOKS !== 'undefined') {
    const recent = BOOKS.slice(-4).reverse();
    recentGrid.innerHTML = recent.map(recentBookCardHTML).join('');
  }

  initStatsCounter();
  initNewsletterForm();

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
  const rawQ = getSearchQuery();
  applySearchQuerySeo('/all-books.html', rawQ);
  const q = rawQ.toLowerCase();
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
function categoryGridSelector() {
  return document.getElementById('category-grid') ? '#category-grid' : 'section.section .book-grid';
}

function initCategory() {
  if (document.body.dataset.page !== 'category') return;
  const slug = document.body.dataset.cat || getParam('cat') || 'english-learning-books';
  const isStatic = document.body.dataset.seoStatic === 'true';
  const gridSel = categoryGridSelector();
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
  const pageUrl = isStatic ? getCategoryPageUrl(slug) : SITE_ORIGIN + '/category.html?cat=' + encodeURIComponent(slug);
  setShareMeta({
    title: pageTitle,
    description: metaDesc,
    url: pageUrl,
    image: getCategoryShareImage(slug)
  });

  let items = BOOKS.filter(b => b.categories.includes(slug));
  const rawQ = getSearchQuery();
  applySearchQuerySeo('/category.html?cat=' + encodeURIComponent(slug), rawQ);
  const q = rawQ.toLowerCase();
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
  renderBookGrid(gridSel, items);

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
    renderBookGrid(gridSel, filtered);
    const qEl = $('#cat-query-note');
    if (qEl) qEl.textContent = query ? ' matching "' + query + '"' : '';
  }
  searchInput && searchInput.addEventListener('input', () => {
    filterCategoryBooks(searchInput.value.toLowerCase().trim());
  });
  searchForm && searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = searchInput.value.trim();
    if (isStatic) {
      window.location.href = getCategoryPagePath(slug) + (val ? '?q=' + encodeURIComponent(val) : '');
    } else {
      const params = new URLSearchParams({ cat: slug });
      if (val) params.set('q', val);
      window.location.href = 'category.html?' + params.toString();
    }
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
      "url": getBookPageUrl(b.id)
    }))
  });

  const relatedArticles = getRelatedArticlesForCategory(slug, 4);
  const articlesHost = $('#category-articles');
  if (articlesHost && relatedArticles.length) {
    const links = relatedArticles.map(a =>
      `<li><a href="${getArticlePagePath(a.id)}"><span>${escapeHtml(a.title)}</span><span class="arrow">Read More &raquo;</span></a></li>`
    ).join('');
    articlesHost.innerHTML = `
      <section class="section" style="padding-top:0;">
        <div class="related-posts" style="max-width:760px;margin:0 auto;">
          <h3>Related Reading Guides</h3>
          <ul>${links}</ul>
          <p style="margin-top:16px;"><a href="articles.html">View all articles &raquo;</a></p>
        </div>
      </section>`;
  }
}

/* ---------- Book detail page ---------- */
function initBookDetail() {
  if (document.body.dataset.page !== 'book') return;
  const id = document.body.dataset.bookId || getParam('id');
  const isStatic = document.body.dataset.seoStatic === 'true';
  const book = BOOKS.find(b => b.id === id);
  const wrap = $('#book-detail');
  if (!book) {
    if (wrap) wrap.innerHTML = '<p style="text-align:center;padding:40px 0;">Sorry, this book could not be found. <a href="all-books.html">Browse all books</a>.</p>';
    return;
  }
  initBookDetailCoverEnhance(book);

  if (isStatic) {
    if (typeof ARTICLES !== 'undefined' && wrap) {
      const relatedArticles = getRelatedArticlesForBook(book, 3);
      const guideArticle = getArticlesList().find(a => a.id === 'free-' + book.id + '-pdf-guide');
      if (relatedArticles.length || guideArticle) {
        const extra = document.createElement('div');
        extra.className = 'related-posts';
        extra.style.marginTop = '36px';
        extra.innerHTML = '<h3>Related Reading Guides</h3>' +
          (guideArticle ? `<p style="margin:20px 0 0;"><a href="${getArticlePagePath(guideArticle.id)}"><strong>Free ${escapeHtml(book.title)} PDF Guide</strong> — reading tips and download help &raquo;</a></p>` : '') +
          (relatedArticles.length ? `<ul>${relatedArticles.map(a =>
            `<li><a href="${getArticlePagePath(a.id)}"><span>${escapeHtml(a.title)}</span><span class="arrow">Read More &raquo;</span></a></li>`
          ).join('')}</ul>` : '');
        wrap.appendChild(extra);
      }
    }
    return;
  }

  const primaryCat = book.categories[0] || 'english-learning-books';
  const catObj = CATEGORIES.find(c => c.slug === primaryCat);

  const downloadable = isDownloadable(book);
  const pageTitle = downloadable
    ? book.title + ' | Free PDF Download - LifeWithBooks'
    : book.title + ' | Book Overview - LifeWithBooks';
  const pageDesc = (book.excerpt || ('Read about ' + book.title + ' on LifeWithBooks, the free ebook library.')).slice(0, 320);
  const pageUrl = getBookPageUrl(book.id);
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
      { "@type": "ListItem", "position": 2, "name": catObj ? catObj.label : 'Books', "item": getCategoryPageUrl(primaryCat) },
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

  const pdfDirectHref = book.pdfDirect && book.pdf
    ? (book.pdf.indexOf('/') === 0 ? book.pdf : '/' + String(book.pdf).replace(/^public\//, ''))
    : '';
  const downloadBlock = downloadable
    ? book.pdfDirect && pdfDirectHref
      ? `
    <div class="download-block">
      ${getLicenseBadge(book)}
      <p style="margin:14px 0 16px;font-size:15px;">Original LifeWithBooks guide — free PDF you can keep and share.</p>
      <a class="btn" href="${escapeHtml(pdfDirectHref)}" download="${escapeHtml(book.id)}.pdf">&#8595; Download Free PDF</a>
      ${book.pageCount ? `<p class="download-meta" style="margin:14px 0 0;font-size:13px;color:var(--contrast-3);">${escapeHtml(String(book.pageCount))}-page PDF &middot; Instant download</p>` : ''}
    </div>`
      : `
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
    <li><a href="${getBookPagePath(b.id)}">
      <span>${escapeHtml(b.title)}</span>
      <span class="arrow">Read More &raquo;</span>
    </a></li>
  `).join('');

  const relatedArticles = getRelatedArticlesForBook(book, 3);
  const guideArticle = getArticlesList().find(a => a.id === 'free-' + book.id + '-pdf-guide');
  const guideLink = guideArticle
    ? `<p style="margin:20px 0 0;"><a href="${getArticlePagePath(guideArticle.id)}"><strong>Free ${escapeHtml(book.title)} PDF Guide</strong> — reading tips and download help &raquo;</a></p>`
    : '';
  const guidesHTML = relatedArticles.length || guideArticle
    ? `<div class="related-posts" style="margin-top:36px;">
        <h3>Related Reading Guides</h3>
        ${guideLink}
        ${relatedArticles.length ? `<ul>${relatedArticles.map(a =>
          `<li><a href="${getArticlePagePath(a.id)}"><span>${escapeHtml(a.title)}</span><span class="arrow">Read More &raquo;</span></a></li>`
        ).join('')}</ul>` : ''}
      </div>`
    : '';

  wrap.innerHTML = `
    <div class="breadcrumb">
      <a href="index.html">Home</a> &raquo;
      <a href="category.html?cat=${primaryCat}">${catObj ? escapeHtml(catObj.label) : 'Books'}</a> &raquo;
      <span>${escapeHtml(book.title)}</span>
    </div>

    <div class="book-cover-section">
      <div id="cover-container" class="cover-container">
        <img
          id="book-cover-img"
          class="book-cover-img book-detail-cover"
          src="${escapeHtml(getBookCoverUrl(book))}"
          alt="${escapeHtml(book.title)} cover"
          width="280"
          height="420"
          loading="eager"
          referrerpolicy="no-referrer"
        />
      </div>
    </div>

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
    ${guidesHTML}
  `;
  initBookDetailCoverEnhance(book);
}


/* ---------- Articles (blog) ---------- */
function articleCardHTML(a) {
  return `
    <article class="book-card cover-${escapeHtml(a.cover || 'english')} article-card">
      <a class="thumb" href="${getArticlePagePath(a.id)}" aria-label="${escapeHtml(a.title)}">
        <div class="cover">
          <div class="book"><span class="title-on-cover">${escapeHtml(a.title)}</span><span class="ribbon"></span></div>
        </div>
      </a>
      <div class="info">
        <h3><a href="${getArticlePagePath(a.id)}">${escapeHtml(a.title)}</a></h3>
        <p class="article-excerpt">${escapeHtml(a.excerpt || '')}</p>
        <a class="read-more" href="${getArticlePagePath(a.id)}">Read Article</a>
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
    title: 'Free Reading Guides & Book Articles | LifeWithBooks',
    description: '116+ free reading guides and PDF book articles: IELTS, CSS, Matric, programming, vocabulary tips and classic reviews from LifeWithBooks.',
    url: SITE_ORIGIN + '/articles.html',
    image: SITE_ORIGIN + '/og-articles.webp'
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
      "url": getArticlePageUrl(a.id)
    }))
  });
}

function initArticleDetail() {
  if (document.body.dataset.page !== 'article') return;
  if (typeof ARTICLES === 'undefined') return;
  const id = document.body.dataset.articleId || getParam('id');
  const isStatic = document.body.dataset.seoStatic === 'true';
  const a = ARTICLES.find(x => x.id === id);
  const wrap = $('#article-detail');
  if (!wrap) return;
  if (!a) {
    wrap.innerHTML = '<p style="text-align:center;padding:40px 0;">Sorry, this article could not be found. <a href="articles.html">Browse all articles</a>.</p>';
    return;
  }
  const url = isStatic ? getArticlePageUrl(a.id) : SITE_ORIGIN + '/article.html?id=' + encodeURIComponent(a.id);
  const desc = (a.excerpt || '').slice(0, 320);
  setShareMeta({ title: a.title + ' | LifeWithBooks', description: desc, url: url, image: SITE_ORIGIN + '/og-articles.webp' });
  setMeta('meta[property="og:type"]', 'content', 'article');
  if (isStatic) {
    injectJsonLd('jsonld-article', {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": a.title,
      "description": desc,
      "datePublished": a.date,
      "dateModified": modified,
      "author": { "@type": "Person", "name": a.author || "Mubashir Mehdi" },
      "publisher": { "@type": "Organization", "name": "LifeWithBooks", "url": SITE_ORIGIN + "/" },
      "mainEntityOfPage": url,
      "image": SITE_ORIGIN + "/og-articles.webp"
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
    const catSlug = getArticleCategorySlug(a);
    const catObj = catSlug ? CATEGORIES.find(c => c.slug === catSlug) : null;
    const relatedBooks = getRelatedBooksForArticle(a, 4);
    const others = ARTICLES.filter(x => x.id !== a.id).slice(0, 4);
    if (relatedBooks.length || others.length) {
      const extra = document.createElement('div');
      extra.innerHTML = (relatedBooks.length
        ? `<div class="related-posts" style="margin-top:36px;"><h3>Free Books in This Topic</h3><ul>${relatedBooks.map(b =>
            `<li><a href="${getBookPagePath(b.id)}"><span>${escapeHtml(b.title)}</span><span class="arrow">View Book &raquo;</span></a></li>`
          ).join('')}</ul>${catObj ? `<p style="margin-top:16px;"><a href="${getCategoryPagePath(catSlug)}">Browse all ${escapeHtml(catObj.label.toLowerCase())} &raquo;</a></p>` : ''}</div>`
        : '') +
        (others.length
          ? `<div class="related-posts"><h3>You Might Also Like</h3><ul>${others.map(x =>
              `<li><a href="${getArticlePagePath(x.id)}"><span>${escapeHtml(x.title)}</span><span class="arrow">Read More &raquo;</span></a></li>`
            ).join('')}</ul></div>`
          : '');
      wrap.appendChild(extra);
    }
    return;
  }

  const modified = a.date || new Date().toISOString().slice(0, 10);
  const updatedLabel = isRecentlyUpdated(a.date, 7) ? ' <span class="badge-updated">Updated</span>' : '';
  const body = (a.body || []).map(p =>
    p.indexOf('## ') === 0 ? '<h2>' + escapeHtml(p.slice(3)) + '</h2>' : '<p>' + escapeHtml(p) + '</p>'
  ).join('');
  let dateStr = a.date;
  try { dateStr = new Date(a.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }); } catch (e) {}
  const others = ARTICLES.filter(x => x.id !== a.id).slice(0, 6);
  const relatedHTML = others.map(x =>
    `<li><a href="${getArticlePagePath(x.id)}"><span>${escapeHtml(x.title)}</span><span class="arrow">Read More &raquo;</span></a></li>`
  ).join('');

  const catSlug = getArticleCategorySlug(a);
  const catObj = catSlug ? CATEGORIES.find(c => c.slug === catSlug) : null;
  const relatedBooks = getRelatedBooksForArticle(a, 4);
  const booksHTML = relatedBooks.length
    ? `<div class="related-posts" style="margin-top:36px;">
        <h3>Free Books in This Topic</h3>
        <ul>${relatedBooks.map(b =>
          `<li><a href="${getBookPagePath(b.id)}"><span>${escapeHtml(b.title)}</span><span class="arrow">View Book &raquo;</span></a></li>`
        ).join('')}</ul>
        ${catObj ? `<p style="margin-top:16px;"><a href="${getCategoryPagePath(catSlug)}">Browse all ${escapeHtml(catObj.label.toLowerCase())} &raquo;</a></p>` : ''}
      </div>`
    : '';

  wrap.innerHTML = `
    <div class="breadcrumb">
      <a href="index.html">Home</a> &raquo;
      <a href="articles.html">Articles</a> &raquo;
      <span>${escapeHtml(a.title)}</span>
    </div>
    <h1>${escapeHtml(a.title)}${updatedLabel}</h1>
    <div class="meta"><span class="tag">${escapeHtml(dateStr)}</span><span class="tag">Last updated: ${escapeHtml(modified.slice(0, 7))}</span><span class="tag">${escapeHtml(a.author || 'Mubashir Mehdi')}</span></div>
    ${shareButtonsHTML(url, a.title)}
    <article class="article">${body}</article>
    <div class="download-block">
      <p style="margin-bottom:14px;">Enjoyed this guide? Explore our free library of public-domain classics, vocabulary ebooks and language learning books.</p>
      <a class="btn" href="all-books.html">Browse Free PDF Books</a>
      ${catObj ? `<a class="btn outline" style="margin-left:10px;" href="${getCategoryPagePath(catSlug)}">${escapeHtml(catObj.label)}</a>` : ''}
    </div>
    ${booksHTML}
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
    "image": SITE_ORIGIN + "/og-articles.webp"
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
  bindShareCopyButtons();
  const deferred = () => injectCookieBanner();
  if (typeof requestIdleCallback === 'function') requestIdleCallback(deferred);
  else setTimeout(deferred, 100);
});
