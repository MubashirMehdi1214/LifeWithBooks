/**
 * Shared jsPDF builder for LifeWithBooks original guides.
 */
const fs = require('fs');
const path = require('path');
const { jsPDF } = require('jspdf');

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

class LifeWithBooksGuidePdf {
  constructor(options) {
    this.meta = options.meta;
    this.blocks = options.blocks;
    this.outFile = options.outFile;
    this.brandRgb = options.brandRgb || [13, 59, 46];
    this.accentRgb = options.accentRgb || [30, 86, 66];
    this.coverLines = options.coverLines || [];
    this.introParagraphs = options.introParagraphs || [];
    this.disclaimer = options.disclaimer || '';
    this.doc = new jsPDF({ unit: 'mm', format: 'a4', compress: true });
    this.y = MT;
    this.section = 'Introduction';
    this.tocPageMap = [];
  }

  addPage(isContent) {
    this.doc.addPage();
    this.y = MT;
    if (isContent) this.drawRunningHeader();
  }

  drawRunningHeader() {
    const d = this.doc;
    d.setDrawColor(...this.accentRgb);
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
    if (this.y + mm > PAGE_H - MB) this.addPage(true);
  }

  writeLines(lines, opts = {}) {
    const d = this.doc;
    const size = opts.size || 10.5;
    const lh = opts.lineHeight || size * 0.42;
    d.setFont('helvetica', opts.style || 'normal');
    d.setFontSize(size);
    d.setTextColor(...(opts.color || [34, 34, 34]));
    lines.forEach((line) => {
      this.ensureSpace(lh + 1);
      d.text(line, ML, this.y);
      this.y += lh;
    });
  }

  writeParagraph(text, opts = {}) {
    sanitize(text).split(/\n\n+/).forEach((para, i) => {
      if (i > 0) this.y += 3;
      this.writeLines(this.doc.splitTextToSize(para.trim(), CW), opts);
    });
  }

  writeHeading(text, level) {
    const t = sanitize(text);
    if (level === 2) {
      this.section = t;
      this.y += 4;
      this.ensureSpace(14);
      this.doc.setFillColor(...this.brandRgb);
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
      this.doc.setTextColor(...this.accentRgb);
      this.doc.text(t, ML, this.y);
      this.y += 7;
    }
  }

  buildCover() {
    const d = this.doc;
    d.setFillColor(...this.brandRgb);
    d.rect(0, 0, PAGE_W, PAGE_H, 'F');
    d.setFont('helvetica', 'bold');
    d.setFontSize(11);
    d.setTextColor(220, 200, 160);
    d.text('LIFEWITHBOOKS', PAGE_W / 2, 55, { align: 'center', charSpace: 1.2 });
    d.setDrawColor(220, 200, 160);
    d.line(50, 62, PAGE_W - 50, 62);
    d.setFontSize(24);
    d.setTextColor(255, 255, 255);
    d.text(d.splitTextToSize(sanitize(this.meta.title), 150), PAGE_W / 2, 92, { align: 'center' });
    if (this.meta.subtitle) {
      d.setFont('helvetica', 'italic');
      d.setFontSize(11);
      d.setTextColor(230, 220, 200);
      d.text(d.splitTextToSize(sanitize(this.meta.subtitle), 140), PAGE_W / 2, 125, { align: 'center' });
    }
    d.setFont('helvetica', 'normal');
    d.setFontSize(10);
    d.setTextColor(230, 220, 200);
    let cy = 165;
    this.coverLines.forEach((line) => {
      d.text(line, PAGE_W / 2, cy, { align: 'center' });
      cy += 8;
    });
    d.setFontSize(9);
    d.text('www.lifewithbooks.co', PAGE_W / 2, PAGE_H - 35, { align: 'center' });
    d.text('Free PDF Edition', PAGE_W / 2, PAGE_H - 28, { align: 'center' });
  }

  buildTocPlaceholder() {
    this.doc.addPage();
  }

  renderToc(pageMap) {
    this.doc.setPage(2);
    this.doc.setFillColor(255, 255, 255);
    this.doc.rect(0, 0, PAGE_W, PAGE_H, 'F');
    this.y = 32;
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(20);
    this.doc.setTextColor(...this.brandRgb);
    this.doc.text('Table of Contents', ML, this.y);
    this.y += 14;
    this.doc.setFont('helvetica', 'normal');
    pageMap.forEach((e) => {
      if (this.y > PAGE_H - 40) return;
      const indent = e.level === 2 ? 4 : 0;
      this.doc.setFontSize(e.level === 2 ? 10.5 : 11);
      this.doc.setTextColor(40, 40, 40);
      const label = sanitize(e.title);
      const titleX = ML + indent;
      this.doc.text(label, titleX, this.y);
      const pageStr = String(e.page);
      this.doc.setTextColor(...this.brandRgb);
      this.doc.text(pageStr, PAGE_W - MR, this.y, { align: 'right' });
      const titleW = this.doc.getTextWidth(label);
      const pageW = this.doc.getTextWidth(pageStr);
      let dx = titleX + titleW + 2;
      const dotEnd = PAGE_W - MR - pageW - 2;
      this.doc.setTextColor(180, 180, 180);
      while (dx < dotEnd) {
        this.doc.text('.', dx, this.y);
        dx += 1.8;
      }
      this.y += e.level === 2 ? 6.5 : 7.5;
    });
  }

  buildIntro() {
    this.doc.addPage();
    this.drawRunningHeader();
    this.introParagraphs.forEach((item, idx) => {
      this.tocPageMap.push({ title: item.heading, page: this.doc.getNumberOfPages(), level: 1 });
      this.section = item.heading;
      this.writeHeading(item.heading, 2);
      this.writeParagraph(item.text);
      if (idx === 0) this.y += 2;
    });
  }

  buildBlocks() {
    this.blocks.forEach((block) => {
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
        this.doc.setTextColor(...this.brandRgb);
        this.doc.text(sanitize(block.title || 'Sample Essay'), ML, this.y);
        this.y += 7;
        this.writeParagraph(block.text, { size: 10, lineHeight: 4.4 });
        if (block.comment) {
          this.y += 2;
          const boxText = 'Examiner note: ' + sanitize(block.comment);
          const lines = this.doc.splitTextToSize(boxText, CW - 8);
          const boxH = lines.length * 4.5 + 8;
          this.ensureSpace(boxH);
          const y0 = this.y;
          this.doc.setFillColor(245, 240, 230);
          this.doc.rect(ML, y0, CW, boxH, 'F');
          this.doc.setFont('helvetica', 'italic');
          this.doc.setFontSize(9);
          this.doc.setTextColor(70, 55, 40);
          this.doc.text(lines, ML + 4, y0 + 6);
          this.y = y0 + boxH + 4;
        }
      } else if (block.type === 'p') {
        const isVocab = /^\w+ \|/.test(block.text);
        this.writeParagraph(block.text, {
          size: isVocab ? 9 : 10.5,
          lineHeight: isVocab ? 4.2 : 4.6
        });
      }
    });
  }

  applyFooters() {
    const total = this.doc.getNumberOfPages();
    const title = sanitize(this.meta.title);
    for (let i = 1; i <= total; i++) {
      this.doc.setPage(i);
      if (i === 1) continue;
      this.doc.setDrawColor(200, 200, 195);
      this.doc.line(ML, FOOTER_Y - 5, PAGE_W - MR, FOOTER_Y - 5);
      this.doc.setFont('helvetica', 'normal');
      this.doc.setFontSize(8);
      this.doc.setTextColor(130, 130, 125);
      this.doc.text('LifeWithBooks  |  lifewithbooks.co', ML, FOOTER_Y);
      this.doc.text(`Page ${i} of ${total}`, PAGE_W - MR, FOOTER_Y, { align: 'right' });
      this.doc.text(i === 2 ? 'Table of Contents' : title, PAGE_W / 2, FOOTER_Y, { align: 'center' });
    }
  }

  addDisclaimer() {
    if (!this.disclaimer) return;
    this.addPage(true);
    this.section = 'Disclaimer';
    this.writeHeading('Disclaimer', 2);
    this.writeParagraph(this.disclaimer);
  }

  run() {
    this.buildCover();
    this.buildTocPlaceholder();
    this.buildIntro();
    this.buildBlocks();
    this.renderToc(this.tocPageMap);
    this.addDisclaimer();
    this.applyFooters();
    fs.mkdirSync(path.dirname(this.outFile), { recursive: true });
    const buf = Buffer.from(this.doc.output('arraybuffer'));
    fs.writeFileSync(this.outFile, buf);
    return { pageCount: this.doc.getNumberOfPages(), bytes: buf.length };
  }
}

module.exports = { LifeWithBooksGuidePdf, sanitize, PAGE_W, PAGE_H };
