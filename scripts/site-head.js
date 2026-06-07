/* Shared optimized <head> for static SEO pages (used by generate-seo-pages.js). */
const fs = require('fs');
const path = require('path');

const ORIGIN = 'https://www.lifewithbooks.co';
const CRITICAL_CSS = fs.readFileSync(path.join(__dirname, '..', 'css', 'critical.css'), 'utf8');

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderHead(opts, depth) {
  const p = depth === 0 ? '' : '../';
  const canonical = opts.canonical || ORIGIN + '/';
  const ogImage = opts.image || ORIGIN + '/og-home.webp';
  const ogImageFallback = ogImage.replace(/\.webp$/i, '.png');
  const cssHref = p + 'css/style.min.css';
  const isArticle = opts.ogType === 'article';
  const articleExtras = isArticle
    ? `<meta property="article:author" content="Mubashir Mehdi">
  <meta property="article:publisher" content="https://www.facebook.com/lifewithbooks">`
    : '';

  const preloadHero = opts.preloadHero
    ? `<link rel="preload" as="image" href="${esc(opts.preloadHero)}" fetchpriority="high">`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(opts.title)}</title>
  <meta name="description" content="${esc(opts.description)}">
  <meta name="robots" content="${esc(opts.robots || 'index, follow, max-image-preview:large')}">
  <link rel="canonical" href="${esc(canonical)}">
  <link rel="alternate" hreflang="en" href="${esc(canonical)}">
  <link rel="alternate" hreflang="x-default" href="${esc(canonical)}">
  <link rel="alternate" type="application/rss+xml" title="LifeWithBooks Articles" href="${p}feed.xml">
  <link rel="sitemap" type="application/xml" href="${p}sitemap.xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap"></noscript>
  ${preloadHero}
  <style>${CRITICAL_CSS}</style>
  <link rel="preload" href="${cssHref}" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="${cssHref}"></noscript>
  <meta property="og:type" content="${esc(opts.ogType || 'website')}">
  <meta property="og:title" content="${esc(opts.title)}">
  <meta property="og:description" content="${esc(opts.description)}">
  <meta property="og:url" content="${esc(canonical)}">
  <meta property="og:site_name" content="LifeWithBooks">
  <meta property="og:image" content="${esc(ogImage)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(opts.title)}">
  <meta name="twitter:description" content="${esc(opts.description)}">
  <meta name="twitter:image" content="${esc(ogImageFallback)}">
  <meta name="pinterest-rich-pin" content="true">
  ${articleExtras}
  <link rel="icon" type="image/svg+xml" href="${p}favicon.svg">
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-V3781QPP7K"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-V3781QPP7K');</script>
  ${opts.jsonLd || ''}
</head>`;
}

function renderScripts(depth, needsArticles) {
  const p = depth === 0 ? '' : '../';
  const articleScripts = needsArticles
    ? `<script src="${p}js/articles-bundle.min.js" defer></script>\n  `
    : '';
  return `
  <script src="${p}js/books.min.js" defer></script>
  ${articleScripts}<script src="${p}js/main.min.js" defer></script>
</body>
</html>`;
}

module.exports = { renderHead, renderScripts, ORIGIN, esc };
