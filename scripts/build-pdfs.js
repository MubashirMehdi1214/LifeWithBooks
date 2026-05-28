/* Build branded LifeWithBooks PDFs from public-domain Gutenberg text, hosted on our own domain */
const fs = require('fs');
const path = require('path');
const https = require('https');
const PDFDocument = require('pdfkit');

const root = path.join(__dirname, '..');
const pdfDir = path.join(root, 'pdfs');
fs.mkdirSync(pdfDir, { recursive: true });

const { BOOKS } = require(path.join(root, 'js', 'books.js'));

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
  'journey-to-the-center-of-the-earth': 3748,
  'the-call-of-the-wild': 215,
  'king-solomons-mines': 2166,
  'the-lost-world': 139
};

function fetchText(gid) {
  const urls = [
    'https://www.gutenberg.org/cache/epub/' + gid + '/pg' + gid + '.txt',
    'https://www.gutenberg.org/files/' + gid + '/' + gid + '-0.txt'
  ];
  function tryUrl(i) {
    return new Promise((resolve, reject) => {
      if (i >= urls.length) return reject(new Error('no text source'));
      https.get(urls[i], { headers: { 'User-Agent': 'Mozilla/5.0 LifeWithBooks' } }, (res) => {
        if (res.statusCode !== 200) { res.resume(); return resolve(tryUrl(i + 1)); }
        let data = '';
        res.setEncoding('utf8');
        res.on('data', (c) => { data += c; });
        res.on('end', () => resolve(data));
      }).on('error', () => resolve(tryUrl(i + 1)));
    });
  }
  return tryUrl(0);
}

function cleanText(raw) {
  let text = raw.replace(/\r\n/g, '\n');
  const startRe = /\*\*\*\s*START OF (?:THE|THIS) PROJECT GUTENBERG EBOOK[\s\S]*?\*\*\*/i;
  const endRe = /\*\*\*\s*END OF (?:THE|THIS) PROJECT GUTENBERG EBOOK/i;
  const s = text.search(startRe);
  if (s !== -1) {
    const after = text.slice(s).replace(startRe, '');
    text = after;
  }
  const e = text.search(endRe);
  if (e !== -1) text = text.slice(0, e);
  return text.trim();
}

function buildPdf(book, text) {
  return new Promise((resolve, reject) => {
    const dest = path.join(pdfDir, book.id + '.pdf');
    const doc = new PDFDocument({ size: 'A4', margins: { top: 64, bottom: 64, left: 64, right: 64 }, info: { Title: book.title, Author: 'LifeWithBooks', Creator: 'LifeWithBooks - www.lifewithbooks.co' } });
    const stream = fs.createWriteStream(dest);
    doc.pipe(stream);

    // Title page
    doc.rect(0, 0, doc.page.width, doc.page.height).fill('#1E565C');
    doc.fillColor('#faf0e2').font('Helvetica-Bold').fontSize(14).text('LIFEWITHBOOKS', 0, 150, { align: 'center', characterSpacing: 3 });
    doc.moveTo(180, 180).lineTo(doc.page.width - 180, 180).strokeColor('#faf0e2').lineWidth(1).stroke();
    doc.fillColor('#ffffff').font('Times-Bold').fontSize(30).text(book.title, 64, 280, { align: 'center', width: doc.page.width - 128 });
    doc.fillColor('#d8e8e6').font('Times-Italic').fontSize(13).text((book.excerpt || '').slice(0, 160), 80, 420, { align: 'center', width: doc.page.width - 160 });
    doc.fillColor('#faf0e2').font('Helvetica').fontSize(11).text('Free PDF Edition  •  www.lifewithbooks.co', 0, doc.page.height - 120, { align: 'center' });
    doc.fontSize(8).fillColor('#bcd3d1').text('This is a public-domain work, formatted and provided free by LifeWithBooks.', 64, doc.page.height - 90, { align: 'center', width: doc.page.width - 128 });

    // Body
    doc.addPage();
    doc.fillColor('#222222').font('Times-Roman').fontSize(11.5);
    const paragraphs = text.split(/\n{2,}/).map((p) => p.replace(/\n/g, ' ').trim()).filter(Boolean);
    paragraphs.forEach((p) => {
      doc.text(p, { align: 'left', paragraphGap: 8, lineGap: 2 });
    });

    // Footer branding on every page
    const range = doc.bufferedPageRange ? doc.bufferedPageRange() : null;

    doc.end();
    stream.on('finish', () => resolve(fs.statSync(dest).size));
    stream.on('error', reject);
  });
}

(async () => {
  const ids = Object.keys(MAP);
  for (const bookId of ids) {
    const book = BOOKS.find((b) => b.id === bookId);
    if (!book) { console.log('SKIP (no book)', bookId); continue; }
    try {
      const raw = await fetchText(MAP[bookId]);
      const text = cleanText(raw);
      if (text.length < 500) { console.log('SHORT TEXT', bookId, text.length); continue; }
      const size = await buildPdf(book, text);
      console.log('OK   ', bookId, (size / 1024 | 0) + 'KB');
    } catch (e) {
      console.log('FAIL ', bookId, e.message);
    }
  }
  console.log('Done.');
})();
