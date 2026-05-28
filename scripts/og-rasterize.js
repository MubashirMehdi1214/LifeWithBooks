/* Rasterize Open Graph SVGs to PNG (1200x630) so social platforms render them.
   Converts og-image.svg, og/categories/*.svg and og/books/*.svg. */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const root = path.join(__dirname, '..');

async function convert(svgPath, pngPath) {
  const svg = fs.readFileSync(svgPath);
  await sharp(svg, { density: 144 })
    .resize(1200, 630, { fit: 'fill' })
    .png({ quality: 90 })
    .toFile(pngPath);
}

async function convertDir(dir) {
  if (!fs.existsSync(dir)) return 0;
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.svg'));
  let n = 0;
  for (const f of files) {
    try {
      await convert(path.join(dir, f), path.join(dir, f.replace(/\.svg$/, '.png')));
      n += 1;
    } catch (e) {
      console.log('FAIL', path.join(dir, f), e.message);
    }
  }
  return n;
}

(async () => {
  await convert(path.join(root, 'og-image.svg'), path.join(root, 'og-image.png'));
  console.log('og-image.png done');
  const cats = await convertDir(path.join(root, 'og', 'categories'));
  console.log('category PNGs:', cats);
  const books = await convertDir(path.join(root, 'og', 'books'));
  console.log('book PNGs:', books);
  console.log('Done.');
})();
