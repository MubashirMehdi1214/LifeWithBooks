/* Rewrite Gutenberg URLs in js/books.js to local self-hosted paths */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const booksPath = path.join(root, 'js', 'books.js');
let src = fs.readFileSync(booksPath, 'utf8');

const IDS = [
  'pride-and-prejudice', 'jane-eyre', 'frankenstein', 'dracula',
  'the-picture-of-dorian-gray', 'little-women', 'the-art-of-war',
  'extraordinary-popular-delusions', 'the-prince', 'wealth-of-nations-abridged-selection',
  'scientific-advertising', 'treasure-island', 'around-the-world-in-eighty-days',
  'journey-to-the-center-of-the-earth', 'the-call-of-the-wild', 'king-solomons-mines', 'the-lost-world'
];

let changed = 0;
IDS.forEach((id) => {
  const pdfLocal = exists(path.join(root, 'pdfs', id + '.pdf')) ? 'pdfs/' + id + '.pdf' : null;
  const coverLocal = exists(path.join(root, 'covers-img', id + '.jpg')) ? 'covers-img/' + id + '.jpg' : null;

  // Match the book block by id and replace its gutenberg pdf line
  const idRe = new RegExp('(id:\\s*"' + id.replace(/[-]/g, '\\-') + '"[\\s\\S]*?)pdf:\\s*"https:\\/\\/www\\.gutenberg\\.org[^"]*"');
  if (pdfLocal && idRe.test(src)) {
    src = src.replace(idRe, function (m, head) {
      return head + 'pdf: "' + pdfLocal + '",\n    coverImage: "' + coverLocal + '"';
    });
    changed += 1;
  }
});

fs.writeFileSync(booksPath, src, 'utf8');
console.log('Updated', changed, 'book entries to local PDFs/covers.');

function exists(p) { try { fs.accessSync(p); return true; } catch (e) { return false; } }
