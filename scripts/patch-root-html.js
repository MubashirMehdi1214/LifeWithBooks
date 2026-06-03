/* Patch root HTML pages with optimized head, defer scripts, FAQ schema. */
const fs = require('fs');
const path = require('path');
const { renderHead, ORIGIN } = require('./site-head.js');

const root = path.join(__dirname, '..');
const CRITICAL = fs.readFileSync(path.join(root, 'css', 'critical.css'), 'utf8');

function commonHeadExtra() {
  return `
  <link rel="alternate" hreflang="en" href="https://www.lifewithbooks.co/">
  <link rel="alternate" hreflang="x-default" href="https://www.lifewithbooks.co/">
  <link rel="alternate" type="application/rss+xml" title="LifeWithBooks Articles" href="/feed.xml">
  <link rel="sitemap" type="application/xml" href="/sitemap.xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap"></noscript>
  <link rel="preload" as="image" href="/og-home.webp" fetchpriority="high">
  <style>${CRITICAL}</style>
  <link rel="preload" href="/css/style.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="/css/style.min.css"></noscript>
  <meta name="pinterest-rich-pin" content="true">`;
}

function patchFile(file, opts) {
  const fp = path.join(root, file);
  if (!fs.existsSync(fp)) return;
  let html = fs.readFileSync(fp, 'utf8');
  html = html.replace(/<link rel="stylesheet" href="css\/style\.css">/g, '');
  html = html.replace(/<script src="js\/books\.js"><\/script>/g, '<script src="js/books.min.js" defer></script>');
  html = html.replace(/<script src="js\/main\.js"><\/script>/g, '<script src="js/main.min.js" defer></script>');
  html = html.replace(/<script src="js\/articles-more-\d+\.js"><\/script>\s*/g, '');
  html = html.replace(/<script src="js\/articles\.js"><\/script>/g, '<script src="js/articles-bundle.min.js" defer></script>');
  if (!html.includes('style.min.css') && html.includes('</head>')) {
    html = html.replace('</head>', commonHeadExtra() + '\n</head>');
  }
  if (opts.canonical && html.includes('rel="canonical"')) {
    html = html.replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${opts.canonical}">`);
  }
  if (opts.ogImage) {
    const og = /^https?:\/\//i.test(opts.ogImage) ? opts.ogImage : ORIGIN + opts.ogImage;
    html = html.replace(/(<meta property="og:image" content=")[^"]*(")/g, `$1${og}$2`);
    html = html.replace(/(<meta name="twitter:image" content=")[^"]*(")/g, `$1${og}$2`);
  }
  fs.writeFileSync(fp, html, 'utf8');
  console.log('Patched', file);
}

['index.html', 'all-books.html', 'about.html', 'contact.html', 'articles.html', 'article.html', 'book.html', 'category.html', 'download.html', 'privacy-policy.html', 'terms.html', 'dmca.html', 'disclaimer.html', 'cookie-policy.html'].forEach(f => {
  patchFile(f, { canonical: f === 'index.html' ? 'https://www.lifewithbooks.co/' : undefined, ogImage: ORIGIN + '/og-home.webp' });
});

console.log('Root HTML pages patched');
