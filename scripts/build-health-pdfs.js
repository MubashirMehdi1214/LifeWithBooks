/* Build branded LifeWithBooks health PDFs from our own guide content,
   self-host them under pdfs/health/, repoint the 13 health books, and
   rebrand any "Health Fruits Tips" wording to LifeWithBooks. */
const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');
const PDFDocument = require('pdfkit');

const root = path.join(__dirname, '..');
const healthDir = path.join(root, 'pdfs', 'health');
fs.mkdirSync(healthDir, { recursive: true });

const booksPath = path.join(root, 'js', 'books.js');
const { BOOKS, CATEGORIES } = require(booksPath);

const guideDataPath = 'C:/Users/hp/.cursor/projects/Fruitswebsite/components/PDFGuides/guideData.ts';

function loadGuides() {
  const tsSource = fs.readFileSync(guideDataPath, 'utf8');
  const { code } = esbuild.transformSync(tsSource, { loader: 'ts', format: 'cjs' });
  const m = { exports: {} };
  const fn = new Function('module', 'exports', 'require', code);
  fn(m, m.exports, require);
  return m.exports.guides;
}

const ACCENT = '#0d6b4f';
const DARK = '#0b3d2e';
const CREAM = '#f3faf6';

function rebrand(str) {
  return String(str)
    .replace(/Health Fruits Tips/gi, 'LifeWithBooks')
    .replace(/healthfruitstips\.com/gi, 'lifewithbooks.co')
    .replace(/@healthfruitstips/gi, '@lifewithbooks');
}

function ensureSpace(doc, needed) {
  const bottom = doc.page.height - doc.page.margins.bottom;
  if (doc.y + needed > bottom) doc.addPage();
}

function renderPage(doc, page) {
  ensureSpace(doc, 80);
  doc.moveDown(0.6);
  doc.fillColor(DARK).font('Helvetica-Bold').fontSize(17).text(rebrand(page.title));
  if (page.subtitle) {
    doc.fillColor('#5a6b64').font('Helvetica-Oblique').fontSize(11).text(rebrand(page.subtitle));
  }
  doc.moveDown(0.4);

  (page.bullets || []).forEach((b) => {
    ensureSpace(doc, 28);
    doc.fillColor('#222').font('Helvetica').fontSize(11);
    doc.text('•  ' + rebrand(b), { indent: 6, lineGap: 2, paragraphGap: 3 });
  });

  if (page.tableHeaders && page.tableRows) {
    doc.moveDown(0.4);
    if (page.tableTitle) {
      doc.fillColor(ACCENT).font('Helvetica-Bold').fontSize(11).text(rebrand(page.tableTitle));
    }
    const cols = page.tableHeaders.length;
    const usable = doc.page.width - doc.page.margins.left - doc.page.margins.right;
    const colW = usable / cols;
    const drawRow = (cells, isHeader) => {
      ensureSpace(doc, 22);
      const y = doc.y;
      const x0 = doc.page.margins.left;
      doc.font(isHeader ? 'Helvetica-Bold' : 'Helvetica').fontSize(9.5).fillColor(isHeader ? '#fff' : '#222');
      if (isHeader) doc.rect(x0, y - 2, usable, 18).fill(ACCENT);
      doc.fillColor(isHeader ? '#fff' : '#222');
      cells.forEach((c, i) => {
        doc.text(rebrand(String(c)), x0 + i * colW + 4, y + 2, { width: colW - 8 });
      });
      doc.y = y + 18;
    };
    drawRow(page.tableHeaders, true);
    page.tableRows.forEach((r) => drawRow(r, false));
    doc.moveDown(0.4);
  }

  const boxes = [];
  if (page.infoBoxTitle) boxes.push([page.infoBoxTitle, page.infoBoxContent, '#e7f3ee']);
  if (page.factBoxTitle) boxes.push([page.factBoxTitle, page.factBoxContent, '#fdf3e3']);
  boxes.forEach(([t, c, bg]) => {
    ensureSpace(doc, 50);
    const x0 = doc.page.margins.left;
    const usable = doc.page.width - doc.page.margins.left - doc.page.margins.right;
    const startY = doc.y;
    doc.font('Helvetica-Bold').fontSize(10).fillColor(DARK);
    const th = doc.heightOfString(rebrand(t), { width: usable - 24 });
    doc.font('Helvetica').fontSize(10);
    const ch = doc.heightOfString(rebrand(c || ''), { width: usable - 24 });
    const boxH = th + ch + 18;
    doc.rect(x0, startY, usable, boxH).fill(bg);
    doc.fillColor(DARK).font('Helvetica-Bold').fontSize(10).text(rebrand(t), x0 + 12, startY + 8, { width: usable - 24 });
    doc.fillColor('#333').font('Helvetica').fontSize(10).text(rebrand(c || ''), x0 + 12, doc.y + 2, { width: usable - 24 });
    doc.y = startY + boxH + 6;
  });

  if (page.checklist) {
    doc.moveDown(0.2);
    page.checklist.forEach((c) => {
      ensureSpace(doc, 20);
      doc.fillColor('#222').font('Helvetica').fontSize(10.5).text('[ ]  ' + rebrand(c), { indent: 6, paragraphGap: 2 });
    });
  }
  if (page.tip) {
    ensureSpace(doc, 30);
    doc.fillColor(ACCENT).font('Helvetica-Oblique').fontSize(10.5).text(rebrand(page.tip), { paragraphGap: 3 });
  }
  if (page.quote) {
    ensureSpace(doc, 30);
    doc.fillColor('#5a6b64').font('Times-Italic').fontSize(11).text('“' + rebrand(page.quote) + '”', { paragraphGap: 3 });
  }
}

function buildGuidePdf(guide) {
  return new Promise((resolve, reject) => {
    const dest = path.join(healthDir, guide.slug + '.pdf');
    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: 64, bottom: 70, left: 60, right: 60 },
      info: { Title: rebrand(guide.title), Author: 'LifeWithBooks', Creator: 'LifeWithBooks - www.lifewithbooks.co' }
    });
    const stream = fs.createWriteStream(dest);
    doc.pipe(stream);

    // Title page
    doc.rect(0, 0, doc.page.width, doc.page.height).fill(ACCENT);
    doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(14).text('LIFEWITHBOOKS', 0, 150, { align: 'center', characterSpacing: 3 });
    doc.moveTo(180, 178).lineTo(doc.page.width - 180, 178).strokeColor('#bfe6d6').lineWidth(1).stroke();
    if (guide.coverEmoji) doc.fontSize(46).text(guide.coverEmoji, 0, 210, { align: 'center' });
    doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(28).text(rebrand(guide.title), 60, 290, { align: 'center', width: doc.page.width - 120 });
    if (guide.subtitle) doc.fillColor('#d8f0e6').font('Helvetica-Oblique').fontSize(13).text(rebrand(guide.subtitle), 80, 380, { align: 'center', width: doc.page.width - 160 });
    if (guide.pageCountLabel) doc.fillColor('#bfe6d6').font('Helvetica').fontSize(11).text(guide.pageCountLabel + '  •  Original LifeWithBooks Guide', 0, 450, { align: 'center' });
    doc.fillColor('#ffffff').font('Helvetica').fontSize(11).text('Free Edition  •  www.lifewithbooks.co', 0, doc.page.height - 110, { align: 'center' });

    // Body
    doc.addPage();
    doc.fillColor(DARK).font('Helvetica-Bold').fontSize(20).text(rebrand(guide.title));
    if (guide.description) doc.moveDown(0.3).fillColor('#444').font('Helvetica').fontSize(11.5).text(rebrand(guide.description));
    if (guide.topics && guide.topics.length) {
      doc.moveDown(0.4).fillColor(ACCENT).font('Helvetica-Bold').fontSize(11).text('In this guide:');
      doc.fillColor('#333').font('Helvetica').fontSize(11).text(guide.topics.map(rebrand).join('  •  '));
    }
    doc.moveDown(0.5);

    (guide.contents || []).forEach((page) => renderPage(doc, page));

    // Disclaimer + sources
    if (guide.medicalDisclaimer) {
      ensureSpace(doc, 80);
      doc.moveDown(0.6).fillColor(DARK).font('Helvetica-Bold').fontSize(13).text('Disclaimer');
      doc.fillColor('#555').font('Helvetica').fontSize(10).text(rebrand(guide.medicalDisclaimer));
    }
    if (guide.references && guide.references.length) {
      ensureSpace(doc, 80);
      doc.moveDown(0.5).fillColor(DARK).font('Helvetica-Bold').fontSize(13).text('References & Sources');
      guide.references.forEach((r) => {
        ensureSpace(doc, 18);
        doc.fillColor('#444').font('Helvetica').fontSize(10).text('•  ' + rebrand(r), { indent: 6 });
      });
    }

    // Page footers
    const range = doc.bufferedPageRange();
    for (let i = range.start + 1; i < range.start + range.count; i++) {
      doc.switchToPage(i);
      doc.fillColor('#9bb3ab').font('Helvetica').fontSize(8)
        .text('LifeWithBooks  •  www.lifewithbooks.co', 60, doc.page.height - 45, { align: 'center', width: doc.page.width - 120 });
    }

    doc.end();
    stream.on('finish', () => resolve(fs.statSync(dest).size));
    stream.on('error', reject);
  });
}

function serializeBooks() {
  const header = '/* Book database for LifeWithBooks (generated/normalized) */\n';
  const out =
    header +
    '\nconst BOOKS = ' + JSON.stringify(BOOKS, null, 2) + ';\n' +
    '\nconst CATEGORIES = ' + JSON.stringify(CATEGORIES, null, 2) + ';\n' +
    '\nif (typeof module !== "undefined") {\n  module.exports = { BOOKS, CATEGORIES };\n}\n';
  fs.writeFileSync(booksPath, out, 'utf8');
}

(async () => {
  const guides = loadGuides();
  const slugSet = new Set(guides.map((g) => g.slug));
  for (const guide of guides) {
    try {
      const size = await buildGuidePdf(guide);
      console.log('PDF  ', guide.slug, (size / 1024 | 0) + 'KB');
    } catch (e) {
      console.log('FAIL ', guide.slug, e.message);
    }
  }

  // Repoint + rebrand health books
  let repointed = 0;
  BOOKS.filter((b) => b.license === 'original').forEach((b) => {
    const url = b.pdf || '';
    const slug = url.split('/').filter(Boolean).pop();
    if (slug && slugSet.has(slug)) {
      b.pdf = 'pdfs/health/' + slug + '.pdf';
      repointed += 1;
    } else {
      console.log('NO MATCH for', b.id, '->', slug);
    }
    if (b.excerpt) b.excerpt = rebrand(b.excerpt);
    if (Array.isArray(b.description)) b.description = b.description.map(rebrand);
  });

  serializeBooks();
  console.log('Repointed', repointed, 'health books to self-hosted PDFs.');
})();
