/* Download public-domain Gutenberg PDFs and covers locally so LifeWithBooks hosts them itself */
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const root = path.join(__dirname, '..');
const pdfDir = path.join(root, 'pdfs');
const coverDir = path.join(root, 'covers-img');
fs.mkdirSync(pdfDir, { recursive: true });
fs.mkdirSync(coverDir, { recursive: true });

// bookId -> gutenberg numeric id
const MAP = {
  'pride-and-prejudice': 1342,
  'jane-eyre': 1260,
  'frankenstein': 84,
  'dracula': 345,
  'the-picture-of-dorian-gray': 174,
  'little-women': 514,
  'the-art-of-war': 132,
  'extraordinary-popular-delusions': 24518,
  'the-prince': 1232,
  'wealth-of-nations-abridged-selection': 3300,
  'scientific-advertising': 42976,
  'treasure-island': 120,
  'around-the-world-in-eighty-days': 103,
  'journey-to-the-center-of-the-earth': 188,
  'the-call-of-the-wild': 215,
  'king-solomons-mines': 2166,
  'the-lost-world': 139
};

function download(url, dest, redirects) {
  redirects = redirects || 0;
  return new Promise((resolve, reject) => {
    if (redirects > 6) return reject(new Error('too many redirects'));
    const lib = url.indexOf('https:') === 0 ? https : http;
    const req = lib.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 LifeWithBooks' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        const next = res.headers.location.indexOf('http') === 0
          ? res.headers.location
          : new URL(res.headers.location, url).href;
        return resolve(download(next, dest, redirects + 1));
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error('HTTP ' + res.statusCode + ' for ' + url));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve(fs.statSync(dest).size)));
      file.on('error', reject);
    });
    req.on('error', reject);
    req.setTimeout(60000, () => req.destroy(new Error('timeout')));
  });
}

(async () => {
  const ids = Object.keys(MAP);
  for (const bookId of ids) {
    const gid = MAP[bookId];
    const pdfUrl = 'https://www.gutenberg.org/cache/epub/' + gid + '/pg' + gid + '.pdf';
    const altPdfUrl = 'https://www.gutenberg.org/ebooks/' + gid + '.pdf.noimages';
    const coverUrl = 'https://www.gutenberg.org/cache/epub/' + gid + '/pg' + gid + '.cover.medium.jpg';
    const pdfDest = path.join(pdfDir, bookId + '.pdf');
    const coverDest = path.join(coverDir, bookId + '.jpg');
    try {
      let size;
      try {
        size = await download(pdfUrl, pdfDest);
      } catch (e) {
        size = await download(altPdfUrl, pdfDest);
      }
      console.log('PDF  ', bookId, (size / 1024 | 0) + 'KB');
    } catch (e) {
      console.log('PDF  FAIL', bookId, e.message);
    }
    try {
      const csize = await download(coverUrl, coverDest);
      console.log('COVER', bookId, (csize / 1024 | 0) + 'KB');
    } catch (e) {
      console.log('COVER FAIL', bookId, e.message);
    }
  }
  console.log('Done.');
})();
