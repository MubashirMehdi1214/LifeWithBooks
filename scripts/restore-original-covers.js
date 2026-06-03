/**
 * Restore original Google Drive coverImage URLs for pdfspart2 guides.
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const booksPath = path.join(__dirname, '..', 'js', 'books.js');
const old = execSync('git show fe00c88:js/books.js', { encoding: 'utf8' });

const ids = [
  'longman-photo-dictionary-american-english',
  'english-unlimited',
  'preposition-focus-on-building-mastery',
  'technical-english',
  'english-for-meetings-phrases-expressions',
  'mcgraw-hill-conversational-american-english',
  'english-vocabulary-in-use-upper-intermediate',
  'practical-english-usage',
  'spoken-english-conversation-practice',
  'english-phonetics-and-phonology',
  'talk-english-secret-to-speak-english',
  'how-to-get-really-good-at-english',
  'learn-how-to-speak-english-fluently-7-easy-steps',
  'macmillan-english-grammar-in-context-intermediate-1',
  'fundamentals-of-english-grammar-workbook',
  'english-in-everyday-life'
];

let src = fs.readFileSync(booksPath, 'utf8');

for (const id of ids) {
  const reOld = new RegExp('"id": "' + id + '"[\\s\\S]*?"coverImage": "([^"]+)"');
  const m = old.match(reOld);
  if (!m) {
    console.warn('No old cover for', id);
    continue;
  }
  const url = m[1];
  const reBlock = new RegExp(
    '("id":\\s*"' + id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '"[\\s\\S]*?"coverImage":\\s*")[^"]*(")',
    'm'
  );
  if (reBlock.test(src)) {
    src = src.replace(reBlock, '$1' + url + '$2');
    console.log('Restored cover:', id);
  }
}

fs.writeFileSync(booksPath, src, 'utf8');
