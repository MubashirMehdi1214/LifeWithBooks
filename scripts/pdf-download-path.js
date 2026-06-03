/** Public URL path for a book PDF (root-absolute, works from any page). */
function pdfPublicPath(book) {
  if (!book || !book.pdf) return '';
  const raw = String(book.pdf);
  if (/^https?:\/\//i.test(raw)) return raw;
  const rel = raw.replace(/^public\//, '').replace(/^\//, '');
  return '/' + rel;
}

module.exports = { pdfPublicPath };
