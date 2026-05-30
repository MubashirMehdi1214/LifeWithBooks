const fs = require('fs');
const path = require('path');

const snippet =
  '  <!-- Google AdSense (site verification + ads) -->\n' +
  '  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5913415234423873" crossorigin="anonymous"></script>';

const files = [
  'all-books.html', 'about.html', 'articles.html', 'article.html', 'book.html',
  'category.html', 'contact.html', 'cookie-policy.html', 'disclaimer.html',
  'dmca.html', 'download.html', 'privacy-policy.html', 'terms.html'
];

let n = 0;
files.forEach((f) => {
  const p = path.join(__dirname, '..', f);
  let html = fs.readFileSync(p, 'utf8');
  if (html.includes('adsbygoogle.js')) return;
  html = html.replace(
    '  <link rel="stylesheet" href="css/style.css">',
    '  <link rel="stylesheet" href="css/style.css">\n' + snippet
  );
  fs.writeFileSync(p, html);
  n += 1;
});
console.log('Updated', n, 'HTML files with AdSense snippet.');
