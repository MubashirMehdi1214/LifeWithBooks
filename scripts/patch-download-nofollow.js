/* Add rel="nofollow" to download.html links so Google stops crawling them. */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
let n = 0;

fs.readdirSync(path.join(root, 'book')).filter((f) => f.endsWith('.html')).forEach((f) => {
  const fp = path.join(root, 'book', f);
  let html = fs.readFileSync(fp, 'utf8');
  const next = html.replace(
    /<a class="btn" href="\.\.\/download\.html/g,
    '<a class="btn" rel="nofollow" href="../download.html'
  );
  if (next !== html) {
    fs.writeFileSync(fp, next, 'utf8');
    n++;
  }
});

console.log('Patched', n, 'book pages with nofollow on download links');
