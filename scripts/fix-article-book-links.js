/**
 * Fix legacy book.html?id= links in generated article HTML.
 */
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'articles');
let n = 0;
for (const file of fs.readdirSync(dir)) {
  if (!file.endsWith('.html')) continue;
  const fp = path.join(dir, file);
  let html = fs.readFileSync(fp, 'utf8');
  const next = html.replace(
    /book\.html\?id=([^&"'\s<]+)/g,
    (_, id) => 'https://www.lifewithbooks.co/book/' + decodeURIComponent(id) + '.html'
  );
  if (next !== html) {
    fs.writeFileSync(fp, next, 'utf8');
    n++;
  }
}
console.log('Fixed book links in', n, 'article pages');
