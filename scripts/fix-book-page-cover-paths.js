/* Fix broken cover markup in static book/*.html pages */
const fs = require('fs');
const path = require('path');

const bookDir = path.join(__dirname, '..', 'book');
let n = 0;

function wrapCover(html) {
  if (html.includes('id="cover-container"')) return html;
  const picMatch = html.match(/<picture>[\s\S]*?<img([^>]*class="book-detail-cover"[^>]*)>[\s\S]*?<\/picture>/);
  if (picMatch) {
    const imgTag = picMatch[0].replace(/<img/, '<img id="book-cover-img" class="book-cover-img"');
    return html.replace(picMatch[0],
      '<div class="book-cover-section"><div id="cover-container" class="cover-container">' + imgTag + '</div></div>');
  }
  const imgMatch = html.match(/<img class="book-detail-cover"[^>]*>/);
  if (imgMatch) {
    const newImg = imgMatch[0]
      .replace('class="book-detail-cover"', 'id="book-cover-img" class="book-cover-img book-detail-cover"');
    return html.replace(imgMatch[0],
      '<div class="book-cover-section"><div id="cover-container" class="cover-container">' + newImg + '</div></div>');
  }
  return html;
}

for (const f of fs.readdirSync(bookDir)) {
  if (!f.endsWith('.html')) continue;
  const fp = path.join(bookDir, f);
  let html = fs.readFileSync(fp, 'utf8');
  const before = html;
  html = html.replace(/\.\.\/(https?:\/\/)/gi, '$1');
  html = html.replace(
    /<picture><source srcset="(https:\/\/[^"]+)" type="image\/webp"><img ([^>]*)><\/picture>/gi,
    '<img $2>'
  );
  html = html.replace(/\sclass="book-cover-img"\s+class="/g, ' class="');
  html = wrapCover(html);
  if (!html.includes('referrerpolicy') && html.includes('book-cover-img')) {
    html = html.replace(/<img id="book-cover-img"/, '<img id="book-cover-img" referrerpolicy="no-referrer"');
  }
  if (html !== before) {
    fs.writeFileSync(fp, html, 'utf8');
    n++;
  }
}

console.log('Fixed', n, 'book pages');
