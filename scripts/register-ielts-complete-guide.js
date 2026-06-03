/* Register IELTS Complete Preparation Guide in books.js and regenerate its SEO page */
const fs = require('fs');
const path = require('path');
const { IELTS_GUIDE_META, IELTS_GUIDE_DESCRIPTION } = require('../content/ielts-complete-preparation-guide.js');

const root = path.join(__dirname, '..');
const booksPath = path.join(root, 'js', 'books.js');
let src = fs.readFileSync(booksPath, 'utf8');

const entry = {
  id: IELTS_GUIDE_META.id,
  title: IELTS_GUIDE_META.title,
  categories: ['ielts-preparation', 'english-learning-books'],
  cover: 'english',
  pdf: 'downloads/ielts-complete-preparation-guide.pdf',
  pdfDirect: true,
  pageCount: 0,
  blurb: 'Complete preparation for IELTS Academic and General Training (2024–2026 format). Eight chapters cover all four skills with Pakistan-focused advice, examiner-annotated Writing samples, a timed Reading practice passage, 300 thematic vocabulary entries, and a realistic 30-day schedule for busy students.',
  excerpt: IELTS_GUIDE_META.excerpt,
  description: IELTS_GUIDE_DESCRIPTION,
  access: 'download',
  license: 'original',
  author: 'LifeWithBooks Editorial Team',
  coverImage: 'covers-img/ielts-complete-preparation-guide.jpg'
};

if (src.includes('"id": "ielts-complete-preparation-guide"')) {
  console.log('Book entry already exists — update description in place');
  const re = /"id": "ielts-complete-preparation-guide"[\s\S]*?\n  \},/;
  const block = '  ' + JSON.stringify(entry, null, 2).replace(/\n/g, '\n  ').replace(/^  /, '') + '\n  },';
  src = src.replace(re, block.slice(0, -1));
} else {
  const marker = '  {\n    "id": "ielts-academic-practice-tests-guide"';
  const insert = '  ' + JSON.stringify(entry, null, 2).replace(/\n/g, '\n  ') + ',\n';
  if (!src.includes(marker)) throw new Error('insert marker not found');
  src = src.replace(marker, insert + marker);
}

fs.writeFileSync(booksPath, src, 'utf8');
console.log('Updated books.js —', IELTS_GUIDE_DESCRIPTION.length, 'description lines');

const { BOOKS } = require(booksPath);
const book = BOOKS.find((b) => b.id === entry.id);
if (!book) throw new Error('book not found after write');

console.log('Run: npm run build-ielts-guide && npm run seo-pages');
