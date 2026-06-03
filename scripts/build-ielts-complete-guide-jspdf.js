/**
 * Build IELTS Complete Preparation Guide PDF with jsPDF.
 * Output: downloads/ielts-complete-preparation-guide.pdf
 */
const fs = require('fs');
const path = require('path');
const { jsPDF } = require('jspdf');
const { IELTS_GUIDE_META, IELTS_GUIDE_BLOCKS } = require(path.join(__dirname, '../content/ielts-complete-preparation-guide.js'));

const root = path.join(__dirname, '..');
const OUT_DIR = path.join(root, 'downloads');
const OUT_FILE = path.join(OUT_DIR, 'ielts-complete-preparation-guide.pdf');
const META_FILE = path.join(root, 'content', 'ielts-pdf-meta.json');

const BRAND = '#0d3b2e';
const BRAND_RGB = [13, 59, 46];
const ACCENT_RGB = [30, 86, 66];
const PAGE_W = 210;
const PAGE_H = 297;
const ML = 18;
const MR = 18;
const MT = 26;
const MB = 24;
const HEADER_Y = 12;
const FOOTER_Y = 287;
const CW = PAGE_W - ML - MR;

function sanitize(text) {
  return String(text)
    .replace(/\u2014/g, '-')
    .replace(/\u2013/g, '-')
    .replace(/\u2018|\u2019/g, "'")
    .replace(/\u201c|\u201d/g, '"')
    .replace(/\u2026/g, '...')
    .replace(/[\u2022]/g, '-');
}

class IeltsGuidePdf {
  constructor() {
    this.doc = new jsPDF({ unit: 'mm', format: 'a4', compress: true });
    this.y = MT;
    this.section = 'Introduction';
    this.inCover = false;
    this.inToc = false;
    this.tocEntries = [];
    this.tocPageMap = [];
  }

  rgb(hex) {
    const n = parseInt(hex.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  addPage(isContent) {
    this.doc.addPage();
    this.y = MT;
    if (isContent) this.drawRunningHeader();
  }

  drawRunningHeader() {
    const d = this.doc;
    d.setDrawColor(...ACCENT_RGB);
    d.setLineWidth(0.3);
    d.line(ML, 18, PAGE_W - MR, 18);
    d.setFont('helvetica', 'normal');
    d.setFontSize(8);
    d.setTextColor(90, 110, 105);
    const head = sanitize(this.section);
    d.text(head.length > 72 ? head.slice(0, 69) + '...' : head, ML, HEADER_Y);
    d.text('LifeWithBooks', PAGE_W - MR, HEADER_Y, { align: 'right' });
    this.y = MT;
  }

  ensureSpace(mm) {
    if (this.y + mm > PAGE_H - MB) {
      this.addPage(true);
    }
  }

  writeLines(lines, opts = {}) {
    const d = this.doc;
    const size = opts.size || 10.5;
    const lh = opts.lineHeight || size * 0.42;
    const style = opts.style || 'normal';
    d.setFont('helvetica', style);
    d.setFontSize(size);
    d.setTextColor(...(opts.color || [34, 34, 34]));

    lines.forEach((line) => {
      this.ensureSpace(lh + 1);
      d.text(line, ML, this.y);
      this.y += lh;
    });
  }

  writeParagraph(text, opts = {}) {
    const parts = sanitize(text).split(/\n\n+/);
    parts.forEach((para, i) => {
      if (i > 0) this.y += 3;
      const lines = this.doc.splitTextToSize(para.trim(), CW);
      this.writeLines(lines, opts);
    });
  }

  writeHeading(text, level) {
    const t = sanitize(text);
    if (level === 2) {
      this.section = t;
      this.y += 4;
      this.ensureSpace(14);
      this.doc.setFillColor(...BRAND_RGB);
      this.doc.rect(ML, this.y - 5, CW, 9, 'F');
      this.doc.setFont('helvetica', 'bold');
      this.doc.setFontSize(13);
      this.doc.setTextColor(255, 255, 255);
      this.doc.text(t, ML + 3, this.y + 1.5);
      this.y += 12;
    } else {
      this.y += 3;
      this.ensureSpace(10);
      this.doc.setFont('helvetica', 'bold');
      this.doc.setFontSize(11);
      this.doc.setTextColor(...ACCENT_RGB);
      this.doc.text(t, ML, this.y);
      this.y += 7;
    }
  }

  buildCover() {
    const d = this.doc;
    this.inCover = true;
    d.setFillColor(...BRAND_RGB);
    d.rect(0, 0, PAGE_W, PAGE_H, 'F');
    d.setFont('helvetica', 'bold');
    d.setFontSize(11);
    d.setTextColor(191, 230, 214);
    d.text('LIFEWITHBOOKS', PAGE_W / 2, 55, { align: 'center', charSpace: 1.2 });
    d.setDrawColor(191, 230, 214);
    d.setLineWidth(0.4);
    d.line(50, 62, PAGE_W - 50, 62);
    d.setFontSize(26);
    d.setTextColor(255, 255, 255);
    const titleLines = d.splitTextToSize(sanitize(IELTS_GUIDE_META.title), 150);
    d.text(titleLines, PAGE_W / 2, 95, { align: 'center' });
    d.setFont('helvetica', 'italic');
    d.setFontSize(12);
    d.setTextColor(216, 240, 230);
    const subLines = d.splitTextToSize(sanitize(IELTS_GUIDE_META.subtitle), 140);
    d.text(subLines, PAGE_W / 2, 130, { align: 'center' });
    d.setFont('helvetica', 'normal');
    d.setFontSize(10);
    d.text('Original preparation guide for Academic & General Training', PAGE_W / 2, 175, { align: 'center' });
    d.text('8 chapters  |  300 vocabulary words  |  30-day study plan', PAGE_W / 2, 185, { align: 'center' });
    d.text('Band 7-8 sample essays  |  Practice passage with answers', PAGE_W / 2, 195, { align: 'center' });
    d.setFontSize(9);
    d.setTextColor(191, 230, 214);
    d.text('www.lifewithbooks.co', PAGE_W / 2, PAGE_H - 35, { align: 'center' });
    d.text('Free PDF Edition', PAGE_W / 2, PAGE_H - 28, { align: 'center' });
    this.inCover = false;
  }

  buildTocPlaceholder() {
    this.doc.addPage();
    this.inToc = true;
  }

  renderToc(pageMap) {
    this.doc.setPage(2);
    this.doc.setFillColor(255, 255, 255);
    this.doc.rect(0, 0, PAGE_W, PAGE_H, 'F');
    this.y = 32;
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(20);
    this.doc.setTextColor(...BRAND_RGB);
    this.doc.text('Table of Contents', ML, this.y);
    this.y += 14;

    this.doc.setFont('helvetica', 'normal');
    pageMap.forEach((e) => {
      if (this.y > PAGE_H - 40) return;
      const indent = e.level === 2 ? 4 : 0;
      const size = e.level === 2 ? 10.5 : 11;
      this.doc.setFontSize(size);
      this.doc.setTextColor(40, 40, 40);
      const label = sanitize(e.title);
      const titleX = ML + indent;
      this.doc.text(label, titleX, this.y);
      const pageStr = String(e.page);
      this.doc.setTextColor(...BRAND_RGB);
      this.doc.text(pageStr, PAGE_W - MR, this.y, { align: 'right' });
      const titleW = this.doc.getTextWidth(label);
      const pageW = this.doc.getTextWidth(pageStr);
      const dotStart = titleX + titleW + 2;
      const dotEnd = PAGE_W - MR - pageW - 2;
      let dx = dotStart;
      this.doc.setTextColor(180, 180, 180);
      while (dx < dotEnd) {
        this.doc.text('.', dx, this.y);
        dx += 1.8;
      }
      this.y += e.level === 2 ? 6.5 : 7.5;
    });
    this.inToc = false;
  }

  buildIntro() {
    this.doc.addPage();
    this.drawRunningHeader();
    this.tocPageMap.push({ title: 'About This Guide', page: this.doc.getNumberOfPages(), level: 1 });
    this.section = 'About This Guide';
    this.writeHeading('About This Guide', 2);
    this.writeParagraph(
      'This is an original LifeWithBooks preparation book for serious IELTS candidates — especially students in Pakistan and South Asia targeting Band 6.5–7.5 for study abroad, migration, or professional registration. It reflects the four-skill IELTS format (2024–2026). Use it with official Cambridge, British Council, or IDP practice materials.'
    );
    this.tocPageMap.push({ title: 'How to Use This Book', page: this.doc.getNumberOfPages(), level: 1 });
    this.writeHeading('How to Use This Book', 2);
    this.writeParagraph(
      'Work through Chapters 1–6 in order. Complete the Reading practice in Chapter 2 under exam timing. Rewrite the Task 2 samples in your own words. Record Speaking cue cards from Chapter 5. Follow the 30-day plan in Chapter 8 if you study while working. This PDF matches the full web edition at lifewithbooks.co.'
    );
  }

  buildBlocks() {
    IELTS_GUIDE_BLOCKS.forEach((block) => {
      if (block.type === 'h2') {
        this.tocPageMap.push({ title: block.text, page: this.doc.getNumberOfPages(), level: 2 });
        this.writeHeading(block.text, 2);
      } else if (block.type === 'h3') {
        this.writeHeading(block.text, 3);
      } else if (block.type === 'essay') {
        this.y += 2;
        this.ensureSpace(10);
        this.doc.setFont('helvetica', 'bold');
        this.doc.setFontSize(11);
        this.doc.setTextColor(...BRAND_RGB);
        this.doc.text(sanitize(block.title || 'Sample Essay'), ML, this.y);
        this.y += 7;
        this.writeParagraph(block.text, { size: 10 });
        if (block.comment) {
          this.y += 2;
          this.doc.setFillColor(232, 245, 238);
          const boxText = 'Examiner note: ' + sanitize(block.comment);
          const lines = this.doc.splitTextToSize(boxText, CW - 8);
          const boxH = lines.length * 4.5 + 8;
          this.ensureSpace(boxH);
          const y0 = this.y;
          this.doc.rect(ML, y0, CW, boxH, 'F');
          this.doc.setFont('helvetica', 'italic');
          this.doc.setFontSize(9);
          this.doc.setTextColor(50, 80, 65);
          this.doc.text(lines, ML + 4, y0 + 6);
          this.y = y0 + boxH + 4;
        }
      } else if (block.type === 'p') {
        const isVocab = /^\w+ \([^)]+\) —/.test(block.text);
        this.writeParagraph(block.text, { size: isVocab ? 9 : 10.5, lineHeight: isVocab ? 4.2 : 4.6 });
      }
    });
  }

  applyFooters() {
    const total = this.doc.getNumberOfPages();
    for (let i = 1; i <= total; i++) {
      this.doc.setPage(i);
      this.doc.setDrawColor(200, 210, 205);
      this.doc.setLineWidth(0.2);
      if (i === 1) continue;
      this.doc.line(ML, FOOTER_Y - 5, PAGE_W - MR, FOOTER_Y - 5);
      this.doc.setFont('helvetica', 'normal');
      this.doc.setFontSize(8);
      this.doc.setTextColor(130, 145, 140);
      this.doc.text('LifeWithBooks  |  lifewithbooks.co', ML, FOOTER_Y);
      this.doc.text(`Page ${i} of ${total}`, PAGE_W - MR, FOOTER_Y, { align: 'right' });
      if (i === 2) {
        this.doc.text('Table of Contents', PAGE_W / 2, FOOTER_Y, { align: 'center' });
      } else {
        this.doc.text(sanitize(IELTS_GUIDE_META.title), PAGE_W / 2, FOOTER_Y, { align: 'center' });
      }
    }
  }

  save() {
    fs.mkdirSync(OUT_DIR, { recursive: true });
    const buf = Buffer.from(this.doc.output('arraybuffer'));
    fs.writeFileSync(OUT_FILE, buf);
    return { pageCount: this.doc.getNumberOfPages(), bytes: buf.length };
  }

  run() {
    this.buildCover();
    this.buildTocPlaceholder();
    this.buildIntro();
    this.buildBlocks();
    this.renderToc(this.tocPageMap);
    this.addDisclaimer();
    this.applyFooters();
    return this.save();
  }

  addDisclaimer() {
    this.addPage(true);
    this.section = 'Disclaimer';
    this.writeHeading('Disclaimer', 2);
    this.writeParagraph(
      'This guide is independent editorial content published by LifeWithBooks (lifewithbooks.co). It is not affiliated with or endorsed by IELTS, British Council, IDP, or Cambridge Assessment English. Test rules, fees, and centre availability change — always confirm details on ielts.org and official registration sites before booking. Sample answers illustrate approaches; examiners may score differently in live marking.'
    );
  }
}

function updateBooksMeta(pageCount) {
  const booksPath = path.join(root, 'js', 'books.js');
  let src = fs.readFileSync(booksPath, 'utf8');
  src = src.replace(
    /"id": "ielts-complete-preparation-guide"([\s\S]*?)"pdf": "[^"]*"/,
    `"id": "ielts-complete-preparation-guide"$1"pdf": "downloads/ielts-complete-preparation-guide.pdf"`
  );
  if (!src.includes('"pdfDirect"')) {
    src = src.replace(
      /"pdf": "(?:public\/)?downloads\/ielts-complete-preparation-guide\.pdf"/,
      '"pdf": "downloads/ielts-complete-preparation-guide.pdf",\n    "pdfDirect": true,\n    "pageCount": ' + pageCount
    );
  } else {
    src = src.replace(/"pageCount": \d+/, '"pageCount": ' + pageCount);
  }
  if (!src.includes('"blurb"')) {
    src = src.replace(
      /"excerpt": "Original 8-chapter IELTS guide[^"]*"/,
      '"excerpt": "Original 8-chapter IELTS guide — Band 7–8 essays, 300 topic words, practice passage, 30-day plan. Free PDF download.",\n    "blurb": "Complete preparation for IELTS Academic and General Training (2024–2026 format). Eight chapters cover all four skills with Pakistan-focused advice, examiner-annotated Writing samples, a timed Reading practice passage, 300 thematic vocabulary entries, and a realistic 30-day schedule for busy students."'
    );
  }
  fs.writeFileSync(booksPath, src, 'utf8');
}

const stats = new IeltsGuidePdf().run();
fs.writeFileSync(META_FILE, JSON.stringify({ pageCount: stats.pageCount, bytes: stats.bytes, builtAt: new Date().toISOString() }, null, 2));
updateBooksMeta(stats.pageCount);
console.log('PDF:', OUT_FILE);
console.log('Pages:', stats.pageCount, '| Size:', Math.round(stats.bytes / 1024) + 'KB');
