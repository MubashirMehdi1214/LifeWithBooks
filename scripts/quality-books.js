/** Books with hand-written pages. Everything else is a catalog note and stays out of browse/index. */
const handMod = require('./book-rich-content-handcrafted.js');
const extraMod = require('./book-rich-content-handcrafted-extra.js');
const originalsMod = require('./book-rich-content-handcrafted-originals.js');

const hand = handMod.HANDCRAFTED_BOOK_CONTENT || handMod;
const extra = extraMod.HANDCRAFTED_EXTRA || extraMod;
const originals = originalsMod.HANDCRAFTED_ORIGINALS || originalsMod;

const QUALITY_IDS = new Set([
  ...Object.keys(hand),
  ...Object.keys(extra),
  ...Object.keys(originals)
]);

function isSummaryOnlyBook(book) {
  return (book.access === 'summary' || book.license === 'reference') && !book.pdfDirect;
}

function isEditorialBook(book) {
  return !!(book && QUALITY_IDS.has(book.id) && !isSummaryOnlyBook(book));
}

module.exports = { QUALITY_IDS, isEditorialBook, isSummaryOnlyBook };
