/* Assemble content/css-pms-english-essay-guide.js */
const fs = require('fs');
const path = require('path');
const { CHAPTER_BLOCKS } = require('./css-guide/chapters');
const { VOCAB_SECTIONS } = require('./css-guide/vocab-data');

const outPath = path.join(__dirname, '../content/css-pms-english-essay-guide.js');

function vocabBlocks() {
  const blocks = [];
  const order = ['governance', 'economic', 'social', 'environmental', 'transitions'];
  const labels = {
    governance: 'Governance (40 words)',
    economic: 'Economic Terms (40 words)',
    social: 'Social Terms (40 words)',
    environmental: 'Environmental Terms (40 words)',
    transitions: 'Transition Phrases (40 phrases)'
  };
  order.forEach((key) => {
    blocks.push({ type: 'h3', text: labels[key] });
    VOCAB_SECTIONS[key].forEach((w) => {
      blocks.push({
        type: 'p',
        text: `${w.term} | ${w.def} | Example: ${w.ex}`
      });
    });
  });
  return blocks;
}

function insertVocab(blocks) {
  const idx = blocks.findIndex((b) => b.type === 'h2' && b.text === 'Chapter 5: Precis Writing');
  if (idx === -1) return [...blocks, ...vocabBlocks()];
  const ch4 = blocks.findIndex((b) => b.type === 'h2' && b.text === 'Chapter 4: CSS Vocabulary');
  const introEnd = ch4 + 2;
  return [...blocks.slice(0, introEnd), ...vocabBlocks(), ...blocks.slice(introEnd)];
}

const CSS_GUIDE_BLOCKS = insertVocab(CHAPTER_BLOCKS);

const CSS_GUIDE_META = {
  id: 'css-pms-english-essay-guide',
  title: 'CSS PMS English Essay Guide',
  subtitle: 'FPSC essay structure, ten Band A model essays, vocabulary, precis, and a 30-day plan for working aspirants',
  excerpt: 'Original CSS/PMS English Essay guide: examiner marking, TEEL structure, ten 850-word Pakistan essays, 200 exam terms, precis practice, and 30-day schedule. Free PDF.'
};

function blocksToDescription(blocks) {
  const lines = [
    '## About This Guide',
    'Original LifeWithBooks preparation for the CSS English Essay and related compulsory English skills. Written for Pakistani aspirants who need argument, not filler.',
    '## How to Use This Book',
    'Master Chapters 1–2, study one model essay daily in Chapter 3, learn vocabulary in Chapter 4, practise precis weekly, follow the 30-day plan in Chapter 6. Download the PDF for offline use.'
  ];
  blocks.forEach((b) => {
    if (b.type === 'h2' || b.type === 'h3') lines.push('## ' + b.text);
    else if (b.type === 'p') b.text.split(/\n\n+/).forEach((p) => p.trim() && lines.push(p.trim()));
    else if (b.type === 'essay') {
      lines.push('## ' + (b.title || 'Essay'));
      lines.push(b.text);
      if (b.comment) lines.push('Examiner note: ' + b.comment);
    }
  });
  return lines;
}

const CSS_GUIDE_DESCRIPTION = blocksToDescription(CSS_GUIDE_BLOCKS);

const file = `/* Auto-generated — node scripts/build-css-guide-content.js */
const CSS_GUIDE_META = ${JSON.stringify(CSS_GUIDE_META, null, 2)};

const CSS_GUIDE_BLOCKS = ${JSON.stringify(CSS_GUIDE_BLOCKS, null, 2)};

const CSS_GUIDE_DESCRIPTION = ${JSON.stringify(CSS_GUIDE_DESCRIPTION, null, 2)};

module.exports = { CSS_GUIDE_META, CSS_GUIDE_BLOCKS, CSS_GUIDE_DESCRIPTION };
`;

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, file, 'utf8');
const words = CSS_GUIDE_DESCRIPTION.join(' ').split(/\s+/).length;
console.log('Wrote', outPath, '| ~' + words + ' words');
