const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');

const pp = fs.readFileSync(path.join(root, 'book/pride-and-prejudice.html'), 'utf8');
const words = pp.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length;
const richMatch = pp.match(/<div class="book-rich-content">([\s\S]*?)<\/div>/);
const richWords = richMatch
  ? richMatch[1].replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length
  : 0;

console.log('P&P total word count:', words);
console.log('P&P rich section words:', richWords);
console.log('Has book-section:', pp.includes('book-section'));
console.log('Has What Readers Say:', pp.includes('What Readers Say'));
console.log('Has About Jane Austen:', pp.includes('About Jane Austen'));
console.log('Rich after download:', pp.indexOf('download-block') < pp.indexOf('book-rich-content'));

let t1 = 0;
let t2 = 0;
fs.readdirSync(path.join(root, 'articles')).forEach(f => {
  const c = fs.readFileSync(path.join(root, 'articles', f), 'utf8');
  if (c.includes('structured overview and study tips')) t1++;
  if (/Browse our .+ guide on LifeWithBooks/.test(c)) t2++;
});
console.log('Template phrase 1:', t1, '(must be 0)');
console.log('Template phrase 2:', t2, '(must be 0)');

const { BOOK_RICH_CONTENT } = require(path.join(root, 'js/book-rich-content.js'));
let thin = 0;
for (const [, b] of Object.entries(BOOK_RICH_CONTENT)) {
  const w = [b.about, b.authorBio, b.whyRead, b.historical, (b.learn || []).join(' '), (b.reviews || []).map(r => r.text).join(' ')]
    .join(' ').split(/\s+/).filter(Boolean).length;
  if (w < 800) thin++;
}
console.log('Books under 800w in data:', thin);

const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const urls = (sitemap.match(/<loc>/g) || []).length;
console.log('Sitemap URLs:', urls);
