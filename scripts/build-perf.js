/* PageSpeed build: WebP images, minified CSS/JS, OG WebP, article bundle. */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const sharp = require('sharp');

const root = path.join(__dirname, '..');

async function toWebp(input, output, w, h) {
  if (!fs.existsSync(input)) return false;
  let pipe = sharp(input);
  if (w && h) pipe = pipe.resize(w, h, { fit: 'cover' });
  await pipe.webp({ quality: 82 }).toFile(output);
  return true;
}

async function convertImages() {
  let n = 0;
  const ogPng = path.join(root, 'og-image.png');
  if (fs.existsSync(ogPng)) {
    await sharp(ogPng).webp({ quality: 85 }).toFile(path.join(root, 'og-image.webp'));
    n++;
  }
  const coversDir = path.join(root, 'covers-img');
  if (fs.existsSync(coversDir)) {
    for (const f of fs.readdirSync(coversDir)) {
      if (!/\.(jpg|jpeg|png)$/i.test(f)) continue;
      const inp = path.join(coversDir, f);
      const out = path.join(coversDir, f.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
      await sharp(inp).webp({ quality: 80 }).toFile(out);
      n++;
    }
  }
  for (const sub of ['og/books', 'og/categories']) {
    const dir = path.join(root, sub);
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir)) {
      if (!f.endsWith('.png')) continue;
      await sharp(path.join(dir, f)).webp({ quality: 82 }).toFile(path.join(dir, f.replace(/\.png$/, '.webp')));
      n++;
    }
  }
  console.log('WebP conversions:', n);
}

async function createOgExtras() {
  const teal = '#1E565C';
  const specs = [
    { file: 'og-home.webp', title: 'LifeWithBooks', sub: 'Free PDF Library — 237+ Books' },
    { file: 'og-articles.webp', title: 'Reading Guides', sub: 'Free PDF Books & Articles' },
    { file: 'og-books.webp', title: 'Free Book Library', sub: 'Download Classic PDFs Legally' }
  ];
  for (const s of specs) {
    const title = s.title.replace(/&/g, '&amp;');
    const sub = s.sub.replace(/&/g, '&amp;');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
      <rect width="1200" height="630" fill="${teal}"/>
      <text x="600" y="260" text-anchor="middle" fill="#fff" font-family="Arial,sans-serif" font-size="72" font-weight="700">${title}</text>
      <text x="600" y="340" text-anchor="middle" fill="#faf0e2" font-family="Arial,sans-serif" font-size="36">${sub}</text>
      <text x="600" y="520" text-anchor="middle" fill="#a3d4d8" font-family="Arial,sans-serif" font-size="28">lifewithbooks.co</text>
    </svg>`;
    await sharp(Buffer.from(svg)).webp({ quality: 85 }).toFile(path.join(root, s.file));
  }
  const { CATEGORIES } = require(path.join(root, 'js', 'books.js'));
  const catDir = path.join(root, 'og', 'categories');
  fs.mkdirSync(catDir, { recursive: true });
  for (const c of CATEGORIES) {
    const label = c.label.replace(/&/g, '&amp;');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
      <rect width="1200" height="630" fill="${teal}"/>
      <text x="600" y="280" text-anchor="middle" fill="#fff" font-family="Arial,sans-serif" font-size="56" font-weight="700">${label}</text>
      <text x="600" y="360" text-anchor="middle" fill="#faf0e2" font-family="Arial,sans-serif" font-size="32">Free PDF — LifeWithBooks</text>
    </svg>`;
    await sharp(Buffer.from(svg)).webp({ quality: 85 }).toFile(path.join(catDir, c.slug + '.webp'));
  }
  console.log('OG WebP images created');
}

function minifyAssets() {
  execSync('npx esbuild css/style.css --minify --outfile=css/style.min.css', { cwd: root, stdio: 'inherit' });
  execSync('npx esbuild js/main.js --minify --outfile=js/main.min.js', { cwd: root, stdio: 'inherit' });
  execSync('npx esbuild js/books.js --minify --outfile=js/books.min.js', { cwd: root, stdio: 'inherit' });

  const articleParts = ['articles-more-1.js', 'articles-more-2.js', 'articles-more-3.js', 'articles-more-4.js', 'articles-more-5.js', 'articles-more-6.js', 'articles-more-7.js', 'articles-more-8.js', 'articles-adsense-rewrites.js', 'articles.js'];
  let bundle = '';
  for (const f of articleParts) {
    const fp = path.join(root, 'js', f);
    if (fs.existsSync(fp)) bundle += fs.readFileSync(fp, 'utf8') + '\n';
  }
  const tmp = path.join(root, 'js', '_articles_bundle_tmp.js');
  fs.writeFileSync(tmp, bundle, 'utf8');
  execSync('npx esbuild js/_articles_bundle_tmp.js --minify --outfile=js/articles-bundle.min.js', { cwd: root, stdio: 'inherit' });
  fs.unlinkSync(tmp);
  console.log('Minified CSS + JS');
}

(async () => {
  await convertImages();
  await createOgExtras();
  minifyAssets();
  console.log('perf build complete');
})();
