/* Emergency SEO audit: sitemap, noindex, redirects, missing files */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const ORIGIN = 'https://www.lifewithbooks.co';

function exists(rel) {
  return fs.existsSync(path.join(root, rel));
}

function hasNoindex(rel) {
  const full = path.join(root, rel);
  if (!exists(rel) || fs.statSync(full).isDirectory()) return false;
  return /noindex/i.test(fs.readFileSync(full, 'utf8'));
}

const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const urls = (sitemap.match(/<loc>(.*?)<\/loc>/g) || []).map((u) =>
  u.replace(/<\/?loc>/g, '')
);

const missing = [];
const noindexInSitemap = [];
urls.forEach((url) => {
  const fp = url.replace(ORIGIN + '/', '');
  if (fp === '' || fp === '/') return;
  if (!exists(fp)) missing.push(fp);
  else if (hasNoindex(fp)) noindexInSitemap.push(fp);
});

console.log('=== SITEMAP AUDIT ===');
console.log('Total URLs:', urls.length);
console.log('Missing files:', missing.length);
missing.forEach((f) => console.log('  MISSING:', f));
console.log('Noindex in sitemap:', noindexInSitemap.length);
noindexInSitemap.forEach((f) => console.log('  NOINDEX:', f));

const vercel = require(path.join(root, 'vercel.json'));
const staticRedirects = (vercel.redirects || []).filter((r) => !r.destination.includes(':'));
const brokenRedirects = staticRedirects.filter((r) => {
  const dest = r.destination.replace(/^\//, '');
  return !exists(dest);
});
console.log('\n=== STATIC REDIRECT TARGETS ===');
console.log('Broken static redirects:', brokenRedirects.length);
brokenRedirects.forEach((r) => console.log('  ', r.source, '->', r.destination));

const verify = [
  'book/pride-and-prejudice.html',
  'articles/how-to-prepare-for-ielts-using-free-pdf-books.html',
  'category/novels.html',
  'author/sarah-mitchell.html',
];
console.log('\n=== KEY PAGES ===');
verify.forEach((f) => {
  console.log(f, exists(f) ? 'EXISTS' : 'MISSING', hasNoindex(f) ? 'NOINDEX' : 'indexable');
});
