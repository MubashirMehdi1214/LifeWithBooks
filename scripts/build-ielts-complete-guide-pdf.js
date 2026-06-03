/* Build LifeWithBooks IELTS Complete Preparation Guide PDF from content module */
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const { IELTS_GUIDE_META, IELTS_GUIDE_BLOCKS } = require(path.join(__dirname, '../content/ielts-complete-preparation-guide.js'));

const root = path.join(__dirname, '..');
const ACCENT = '#0d3b2e';
const TEAL = '#1a5c42';
const OUT = path.join(root, 'pdfs', 'ielts-complete-preparation-guide.pdf');

function ensureSpace(doc, h) {
  if (doc.y + h > doc.page.height - doc.page.margins.bottom) doc.addPage();
}

function writeBlock(doc, block) {
  if (block.type === 'h2') {
    ensureSpace(doc, 50);
    doc.moveDown(0.5);
    doc.fillColor(ACCENT).font('Helvetica-Bold').fontSize(16).text(block.text);
    doc.moveDown(0.3);
    return;
  }
  if (block.type === 'h3') {
    ensureSpace(doc, 36);
    doc.fillColor(TEAL).font('Helvetica-Bold').fontSize(12).text(block.text);
    doc.moveDown(0.2);
    return;
  }
  if (block.type === 'p') {
    doc.fillColor('#222').font('Helvetica').fontSize(10.5);
    (block.text || '').split('\n').forEach((line) => {
      ensureSpace(doc, 16);
      doc.text(line, { lineGap: 2, paragraphGap: 4, align: block.align || 'left' });
    });
    return;
  }
  if (block.type === 'box') {
    ensureSpace(doc, 40);
    const x = doc.page.margins.left;
    const w = doc.page.width - doc.page.margins.left - doc.page.margins.right;
    const y = doc.y;
    const h = doc.heightOfString(block.text, { width: w - 20 }) + 16;
    doc.rect(x, y, w, h).fill(block.bg || '#e8f5e9');
    doc.fillColor('#1a1a1a').font('Helvetica').fontSize(10).text(block.text, x + 10, y + 8, { width: w - 20 });
    doc.y = y + h + 8;
    return;
  }
  if (block.type === 'essay') {
    ensureSpace(doc, 60);
    doc.fillColor(ACCENT).font('Helvetica-Bold').fontSize(11).text(block.title || 'Sample Essay');
    doc.moveDown(0.2);
    doc.fillColor('#333').font('Helvetica').fontSize(10).text(block.text, { lineGap: 2 });
    doc.moveDown(0.4);
    return;
  }
}

function build() {
  return new Promise((resolve, reject) => {
    fs.mkdirSync(path.dirname(OUT), { recursive: true });
    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: 56, bottom: 56, left: 54, right: 54 },
      info: {
        Title: IELTS_GUIDE_META.title,
        Author: 'LifeWithBooks',
        Subject: 'IELTS Academic preparation for Pakistani and international students',
        Creator: 'https://www.lifewithbooks.co'
      }
    });
    const stream = fs.createWriteStream(OUT);
    doc.pipe(stream);

    doc.rect(0, 0, doc.page.width, doc.page.height).fill(ACCENT);
    doc.fillColor('#fff').font('Helvetica-Bold').fontSize(13).text('LIFEWITHBOOKS', 0, 140, { align: 'center', characterSpacing: 2 });
    doc.fontSize(26).text(IELTS_GUIDE_META.title, 50, 220, { align: 'center', width: doc.page.width - 100 });
    doc.font('Helvetica').fontSize(12).text(IELTS_GUIDE_META.subtitle, 60, 340, { align: 'center', width: doc.page.width - 120 });
    doc.fontSize(10).text('Original guide  •  Free PDF  •  lifewithbooks.co', 0, doc.page.height - 80, { align: 'center' });

    doc.addPage();
    IELTS_GUIDE_BLOCKS.forEach((b) => writeBlock(doc, b));

    ensureSpace(doc, 60);
    doc.moveDown(0.5);
    doc.fillColor('#555').font('Helvetica-Oblique').fontSize(9).text(
      'Disclaimer: This guide is independent editorial content by LifeWithBooks. It is not affiliated with or endorsed by IELTS, British Council, IDP or Cambridge. Always confirm test rules on ielts.org before booking.'
    );

    const range = doc.bufferedPageRange();
    for (let i = range.start + 1; i < range.start + range.count; i++) {
      doc.switchToPage(i);
      doc.fillColor('#888').font('Helvetica').fontSize(8)
        .text('IELTS Complete Preparation Guide — LifeWithBooks', 54, doc.page.height - 40, { align: 'center', width: doc.page.width - 108 });
    }

    doc.end();
    stream.on('finish', () => {
      const kb = (fs.statSync(OUT).size / 1024) | 0;
      console.log('Wrote', OUT, kb + 'KB');
      resolve();
    });
    stream.on('error', reject);
  });
}

build().catch((e) => { console.error(e); process.exit(1); });
