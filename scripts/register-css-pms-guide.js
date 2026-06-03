const fs = require('fs');
const path = require('path');
const { CSS_GUIDE_META, CSS_GUIDE_DESCRIPTION } = require('../content/css-pms-english-essay-guide.js');

const booksPath = path.join(__dirname, '../js/books.js');
let src = fs.readFileSync(booksPath, 'utf8');

const entry = {
  id: CSS_GUIDE_META.id,
  title: CSS_GUIDE_META.title,
  categories: ['css-pms-books', 'english-learning-books'],
  cover: 'english',
  pdf: 'public/downloads/css-pms-english-essay-guide.pdf',
  pdfDirect: true,
  pageCount: 0,
  excerpt: CSS_GUIDE_META.excerpt,
  blurb: 'Complete CSS/PMS English Essay preparation: FPSC marking breakdown, three introduction formulas, TEEL paragraphs, fifty transitions, ten full Pakistan-focused model essays with examiner notes, two hundred vocabulary entries, precis method with practice, and a thirty-day schedule for working aspirants.',
  description: CSS_GUIDE_DESCRIPTION,
  access: 'download',
  license: 'original',
  author: 'LifeWithBooks Editorial Team',
  coverImage: 'covers-img/css-pms-english-essay-guide.jpg'
};

const re = new RegExp(`"id": "${entry.id}"[\\s\\S]*?\\n  \\},`);
if (re.test(src)) {
  const block = '  ' + JSON.stringify(entry, null, 2).replace(/\n/g, '\n  ') + '\n  },';
  src = src.replace(re, block.slice(0, -1));
} else {
  const marker = '  {\n    "id": "css-english-essay-writing-guide"';
  const insert = '  ' + JSON.stringify(entry, null, 2).replace(/\n/g, '\n  ') + ',\n';
  src = src.replace(marker, insert + marker);
}
fs.writeFileSync(booksPath, src, 'utf8');
console.log('Registered', entry.id, '-', CSS_GUIDE_DESCRIPTION.length, 'lines');
