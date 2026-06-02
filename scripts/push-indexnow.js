/* Notify Bing/Yandex of new/updated URLs via IndexNow (run after deploy). */
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

function readSitemapUrls() {
  const xml = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
  const urls = [];
  const re = /<loc>([^<]+)<\/loc>/g;
  let m;
  while ((m = re.exec(xml)) !== null) urls.push(m[1]);
  return urls;
}

const urlList = readSitemapUrls().slice(0, 200);
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
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      console.log('IndexNow response:', res.statusCode, data || '(empty)');
      if (res.statusCode >= 200 && res.statusCode < 300) {
        console.log('Submitted', urlList.length, 'URLs');
      } else {
        process.exitCode = 1;
      }
    });
  }
);

req.on('error', (err) => {
  console.error('IndexNow error:', err.message);
  process.exitCode = 1;
});

req.write(body);
req.end();
