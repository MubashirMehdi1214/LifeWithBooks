/* Assemble content/ielts-complete-preparation-guide.js from chapter sources + vocab */
const fs = require('fs');
const path = require('path');
const { VOCAB_TOPICS } = require('./ielts-guide/vocab-data');
const { CHAPTER_BLOCKS } = require('./ielts-guide/chapters');

const outPath = path.join(__dirname, '../content/ielts-complete-preparation-guide.js');

function blocksToDescription(blocks) {
  const lines = [];
  blocks.forEach((b) => {
    if (b.type === 'h2') lines.push('## ' + b.text);
    else if (b.type === 'h3') lines.push('## ' + b.text);
    else if (b.type === 'p') {
      b.text.split(/\n\n+/).forEach((para) => {
        if (para.trim()) lines.push(para.trim());
      });
    } else if (b.type === 'essay') {
      lines.push('## ' + (b.title || 'Sample Essay'));
      lines.push(b.text);
      if (b.comment) lines.push('Examiner note: ' + b.comment);
    } else if (b.type === 'box') {
      lines.push(b.text);
    }
  });
  return lines;
}

function vocabBlocks() {
  const blocks = [{ type: 'h2', text: 'Chapter 7: 300 IELTS Vocabulary Words' }];
  blocks.push({
    type: 'p',
    text: 'Memorising lists without context fails in IELTS. Learn each word with its collocation, then use it once in a spoken answer and once in a written sentence the same week. Below are 300 high-utility topic words (50 per theme) used regularly in Reading passages and Writing/Speaking prompts.'
  });
  VOCAB_TOPICS.forEach((topic) => {
    blocks.push({ type: 'h3', text: topic.topic + ' (50 words)' });
    topic.words.forEach((w) => {
      blocks.push({
        type: 'p',
        text: `${w.term} (${w.pos}) — ${w.def} Example: ${w.ex} Collocation: ${w.col}.`
      });
    });
  });
  return blocks;
}

const ch8Index = CHAPTER_BLOCKS.findIndex((b) => b.type === 'h2' && b.text.indexOf('Chapter 8:') === 0);
const beforeCh8 = ch8Index === -1 ? CHAPTER_BLOCKS : CHAPTER_BLOCKS.slice(0, ch8Index);
const ch8On = ch8Index === -1 ? [] : CHAPTER_BLOCKS.slice(ch8Index);
const IELTS_GUIDE_BLOCKS = [...beforeCh8, ...vocabBlocks(), ...ch8On];

const IELTS_GUIDE_META = {
  id: 'ielts-complete-preparation-guide',
  title: 'IELTS Complete Preparation Guide',
  subtitle: 'Academic & General Training — strategies, samples and a 30-day plan for Pakistani and international students',
  excerpt: 'Original 8-chapter IELTS guide: format, Reading and Listening tactics, Writing Task 1 & 2 with Band 7–8 essays, Speaking, 300 topic words, practice passage, and a realistic 30-day schedule.',
  wordCountNote: '8000+ words of preparation content'
};

const IELTS_GUIDE_DESCRIPTION = [
  '## About This Guide',
  'This is an original LifeWithBooks preparation book written for serious candidates — especially students in Pakistan and South Asia who need Band 6.5–7.5 for study abroad, skilled migration, or professional registration. It follows the current four-skill IELTS format (2024–2026): computer and paper delivery, unchanged timing, and the same band descriptors. Use it alongside official practice tests from British Council, IDP, or Cambridge.',
  '## How to Use This Book',
  'Read Chapters 1–6 in order, complete the Reading practice in Chapter 2 under timed conditions, rewrite the sample essays in Chapter 4 in your own words, record yourself on the Speaking cue cards in Chapter 5, and follow the 30-day plan in Chapter 8 if you are working or studying full-time. Download the PDF to study offline.',
  ...blocksToDescription(IELTS_GUIDE_BLOCKS)
];

const file = `/* Auto-generated — run: node scripts/build-ielts-guide-content.js */
const IELTS_GUIDE_META = ${JSON.stringify(IELTS_GUIDE_META, null, 2)};

const IELTS_GUIDE_BLOCKS = ${JSON.stringify(IELTS_GUIDE_BLOCKS, null, 2)};

const IELTS_GUIDE_DESCRIPTION = ${JSON.stringify(IELTS_GUIDE_DESCRIPTION, null, 2)};

module.exports = {
  IELTS_GUIDE_META,
  IELTS_GUIDE_BLOCKS,
  IELTS_GUIDE_DESCRIPTION
};
`;

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, file, 'utf8');

const words = IELTS_GUIDE_DESCRIPTION.join(' ').split(/\s+/).length;
console.log('Wrote', outPath);
console.log('Approximate word count:', words);
