/* Generate SVG avatar illustrations for editorial team author pages. */
const fs = require('fs');
const path = require('path');

const authors = [
  { id: 'sarah-mitchell', color: '#7b1c1c', initial: 'SM' },
  { id: 'james-parker', color: '#0d47a1', initial: 'JP' },
  { id: 'mubashir-mehdi', color: '#1E565C', initial: 'MM' }
];

const dir = path.join(__dirname, '..', 'covers');
authors.forEach(a => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160">
  <circle cx="80" cy="80" r="78" fill="${a.color}"/>
  <circle cx="80" cy="62" r="28" fill="#faf0e2"/>
  <ellipse cx="80" cy="128" rx="42" ry="36" fill="#faf0e2"/>
  <text x="80" y="88" text-anchor="middle" font-family="Nunito,Arial,sans-serif" font-size="22" font-weight="700" fill="${a.color}">${a.initial}</text>
</svg>`;
  fs.writeFileSync(path.join(dir, 'author-' + a.id + '.svg'), svg, 'utf8');
});
console.log('Wrote', authors.length, 'author avatars');
