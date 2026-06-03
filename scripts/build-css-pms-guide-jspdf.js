const fs = require('fs');
const path = require('path');
const { LifeWithBooksGuidePdf } = require('./lib/lifewithbooks-guide-pdf');
const { CSS_GUIDE_META, CSS_GUIDE_BLOCKS } = require('../content/css-pms-english-essay-guide.js');

const root = path.join(__dirname, '..');
const OUT = path.join(root, 'downloads', 'css-pms-english-essay-guide.pdf');
const META = path.join(root, 'content', 'css-pdf-meta.json');

const builder = new LifeWithBooksGuidePdf({
  meta: CSS_GUIDE_META,
  blocks: CSS_GUIDE_BLOCKS,
  outFile: OUT,
  brandRgb: [26, 42, 74],
  accentRgb: [139, 105, 20],
  coverLines: [
    'FPSC marking criteria | TEEL structure | 50 transitions',
    '10 complete Pakistan essays (~850 words each)',
    '200 CSS terms | Precis practice | 30-day plan'
  ],
  introParagraphs: [
    {
      heading: 'About This Guide',
      text: 'This LifeWithBooks original supports candidates for the CSS English Essay and compulsory English paper. It focuses on what FPSC examiners reward: relevant argument, Pakistan-specific evidence, controlled expression, and realistic timing. Sample essays illustrate approach; you must still produce original scripts in the exam.'
    },
    {
      heading: 'How to Use This Book',
      text: 'Outline before you write. Study one model essay per day, then rewrite its outline from memory. Practise precis weekly. Keep a notebook of verified statistics with years. Pair this guide with past papers and daily quality editorials.'
    }
  ],
  disclaimer:
    'Independent editorial content by LifeWithBooks (lifewithbooks.co). Not affiliated with FPSC. Syllabus and policies change — confirm on fpsc.gov.pk. Statistics are approximate and cited for educational argument; verify before the exam. Model essays are not for verbatim reproduction.'
});

const stats = builder.run();
fs.writeFileSync(META, JSON.stringify({ pageCount: stats.pageCount, bytes: stats.bytes, builtAt: new Date().toISOString() }, null, 2));

const booksPath = path.join(root, 'js', 'books.js');
let src = fs.readFileSync(booksPath, 'utf8');
const id = 'css-pms-english-essay-guide';
if (src.includes(`"id": "${id}"`)) {
  if (src.includes(`"id": "${id}"`)) {
    const re = new RegExp(`("id": "${id}"[\\s\\S]*?"pageCount": )\\d+`);
    if (re.test(src)) src = src.replace(re, `$1${stats.pageCount}`);
    else {
      src = src.replace(
        `"pdfDirect": true,\n    "excerpt":`,
        `"pdfDirect": true,\n    "pageCount": ${stats.pageCount},\n    "excerpt":`
      );
    }
    fs.writeFileSync(booksPath, src, 'utf8');
  }
}
console.log('PDF:', OUT);
console.log('Pages:', stats.pageCount, '|', Math.round(stats.bytes / 1024) + 'KB');
