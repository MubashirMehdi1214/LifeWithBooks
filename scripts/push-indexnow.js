/* Notify Bing/Yandex of SEO URLs via IndexNow (batched). */
const fs = require('fs');
const path = require('path');
const https = require('https');

const root = path.join(__dirname, '..');
const HOST = 'www.lifewithbooks.co';
const ORIGIN = 'https://' + HOST;
const KEY = '5e8f2a1bc94d';
const KEY_FILE = path.join(root, KEY + '.txt');

if (!fs.existsSync(KEY_FILE)) {
  fs.writeFileSync(KEY_FILE, KEY, 'utf8');
}

function collectSeoUrls() {
  const urls = new Set();
  const addDir = (dir, prefix) => {
    const full = path.join(root, dir);
    if (!fs.existsSync(full)) return;
    fs.readdirSync(full).filter(f => f.endsWith('.html')).forEach(f => {
      urls.add(ORIGIN + prefix + f);
    });
  };
  addDir('book', '/book/');
  addDir('articles', '/articles/');
  addDir('category', '/category/');
  urls.add(ORIGIN + '/');
  urls.add(ORIGIN + '/all-books.html');
  urls.add(ORIGIN + '/articles.html');
  return Array.from(urls);
}

function postBatch(urlList) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: ORIGIN + '/' + KEY + '.txt',
      urlList: urlList
    });
    const req = https.request(
      {
        hostname: 'api.indexnow.org',
        path: '/indexnow',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': Buffer.byteLength(body)
        }
      },
      (res) => {
        let data = '';
        res.on('data', (c) => { data += c; });
        res.on('end', () => resolve({ status: res.statusCode, data, count: urlList.length }));
      }
    );
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

(async () => {
  const all = collectSeoUrls();
  const batchSize = 10000;
  let ok = 0;
  for (let i = 0; i < all.length; i += batchSize) {
    const batch = all.slice(i, i + batchSize);
    try {
      const r = await postBatch(batch);
      console.log('IndexNow batch', Math.floor(i / batchSize) + 1, ':', r.status, r.count, 'URLs', r.data || '');
      if (r.status >= 200 && r.status < 300) ok += r.count;
    } catch (e) {
      console.error('IndexNow error:', e.message);
      process.exitCode = 1;
    }
  }
  console.log('Submitted', ok, 'of', all.length, 'URLs total');
})();
