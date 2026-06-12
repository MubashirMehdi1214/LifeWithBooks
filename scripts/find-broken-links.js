/* Find internal links pointing to non-existent local files. */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const ORIGIN = 'https://www.lifewithbooks.co';
const linkRe = /https?:\/\/www\.lifewithbooks\.co\/([a-zA-Z0-9_./%-]+)/g;
const seen = new Set();
const broken = [];

function scanFile(file) {
  const content = fs.readFileSync(file, 'utf8');
  let m;
  while ((m = linkRe.exec(content)) !== null) {
    const rel = decodeURIComponent(m[1].split(/[?#]/)[0]);
    if (seen.has(rel)) continue;
    seen.add(rel);
    const full = path.join(root, rel);
    if (!fs.existsSync(full)) broken.push({ from: path.relative(root, file), url: rel });
  }
}

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    if (name === 'node_modules' || name === '.git') continue;
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full);
    else if (/\.(html|js|xml)$/i.test(name)) scanFile(full);
  }
}

walk(root);
console.log('Broken internal links:', broken.length);
broken.forEach((b) => console.log(b.url, '<-', b.from));
