/* Add high-traffic category books (reference summaries + a few public-domain). */
const fs = require('fs');
const path = require('path');

const booksPath = path.join(__dirname, '..', 'js', 'books.js');
let { BOOKS, CATEGORIES } = require(booksPath);

const NEW_CATEGORIES = [
  { slug: 'ielts-preparation', label: 'IELTS Preparation' },
  { slug: 'css-pms-books', label: 'CSS PMS Pakistan' },
  { slug: 'matric-fsc-notes', label: 'Matric FSc Notes' },
  { slug: 'islamic-books', label: 'Islamic Books' },
  { slug: 'programming-books', label: 'Programming Books' },
  { slug: 'self-development-books', label: 'Self Development Books' },
  { slug: 'o-level-a-level', label: 'O Level A Level' }
];

const OFFICIAL = {
  ielts: 'https://www.ielts.org/',
  python: 'https://docs.python.org/3/',
  css: 'https://www.cambridgeinternational.org/',
  islam: 'https://quran.com/'
};

function refBook(def) {
  return {
    id: def.id,
    title: def.title,
    categories: def.cats,
    cover: def.cover || 'english',
    excerpt: def.excerpt,
    description: def.description || [
      '## About This Guide',
      def.about,
      '## Who It Is For',
      def.who,
      '## How to Use This Resource',
      def.use || 'Use this LifeWithBooks overview to plan your study, then obtain official materials from trusted publishers and exam bodies for complete preparation.'
    ],
    access: 'summary',
    license: 'reference',
    officialUrl: def.officialUrl || ''
  };
}

const NEW_BOOKS = [
  refBook({ id: 'ielts-academic-practice-tests-guide', title: 'IELTS Academic Practice Tests Guide', cats: ['ielts-preparation', 'english-learning-books'], cover: 'english',
    excerpt: 'Original LifeWithBooks guide to IELTS Academic format, scoring bands, and how to prepare with practice tests and official resources.',
    about: 'This guide explains the four IELTS Academic modules — Listening, Reading, Writing and Speaking — with timing, question types and band descriptors in plain language. It helps candidates understand what examiners assess and how to structure a realistic study plan using free and official materials.',
    who: 'International students, professionals and migrants preparing for IELTS Academic who want a clear roadmap before buying courses or books.', officialUrl: OFFICIAL.ielts }),
  refBook({ id: 'ielts-writing-task-1-and-2-guide', title: 'IELTS Writing Task 1 and 2 Complete Guide', cats: ['ielts-preparation'], cover: 'english',
    excerpt: 'Task-by-task IELTS Writing strategies for Academic Task 1 graphs and Task 2 essays — structure, vocabulary and timing.',
    about: 'Covers how to describe charts, maps and processes in Task 1 and how to plan, argue and revise Task 2 essays. Includes paragraph templates, common band-limiting mistakes and a weekly writing practice schedule.',
    who: 'Candidates who lose marks on structure, word count or unclear overview sentences in IELTS Writing.', officialUrl: OFFICIAL.ielts }),
  refBook({ id: 'ielts-speaking-practice-question-bank', title: 'IELTS Speaking Practice Question Bank', cats: ['ielts-preparation'], cover: 'english',
    excerpt: 'Topic-based IELTS Speaking Part 1, 2 and 3 practice themes with sample follow-up questions and fluency tips.',
    about: 'Organises high-frequency speaking topics — work, study, hometown, hobbies, technology — with cue-card style prompts and follow-up questions similar to real interviews. Emphasises extending answers without memorising scripts.',
    who: 'Learners who need daily speaking practice but lack a partner or structured question list.', officialUrl: OFFICIAL.ielts }),
  refBook({ id: 'ielts-vocabulary-builder-3000-words', title: 'IELTS Vocabulary Builder 3000 Words', cats: ['ielts-preparation', 'vocabulary-books'], cover: 'vocabulary',
    excerpt: 'Thematic IELTS vocabulary framework covering academic word lists, collocations and topic-based study methods.',
    about: 'Groups essential Academic Word List themes with collocations, example sentences and spaced-review tips. Focuses on productive vocabulary you can use in Writing and Speaking, not isolated word lists.',
    who: 'Intermediate and upper-intermediate learners targeting band 6.5+ who need systematic vocabulary growth.', officialUrl: OFFICIAL.ielts }),
  refBook({ id: 'ielts-listening-practice-guide', title: 'IELTS Listening Practice Guide', cats: ['ielts-preparation'], cover: 'english',
    excerpt: 'How to train for IELTS Listening accents, distractors, spelling and section-by-section timing.',
    about: 'Explains each of the four listening sections, common trap answers, note-taking shorthand and how to build ear training with podcasts, lectures and official practice tests.',
    who: 'Candidates who miss answers because of accent variety, fast speech or losing focus mid-section.', officialUrl: OFFICIAL.ielts }),
  refBook({ id: 'css-english-essay-writing-guide', title: 'CSS English Essay Writing Guide', cats: ['css-pms-books'], cover: 'english',
    excerpt: 'Essay planning, outlines and argument structure for CSS English Paper — tailored for Pakistani competitive exams.',
    about: 'Covers selecting topics, thesis statements, paragraph unity, quotations and conclusion strategies expected in CSS English Essay. Includes outline templates and time management for the three-hour paper.',
    who: 'CSS aspirants preparing English Essay and needing a repeatable writing method under exam pressure.' }),
  refBook({ id: 'css-current-affairs-preparation', title: 'CSS Current Affairs Preparation', cats: ['css-pms-books'], cover: 'business',
    excerpt: 'How to build a CSS Current Affairs notebook — sources, themes and answer-writing for Pakistan and world affairs.',
    about: 'Maps recurring CSS themes: foreign policy, economy, climate, technology and governance. Shows how to convert news into exam-ready paragraphs with facts, analysis and Pakistan-specific angles.',
    who: 'CSS and PMS candidates who feel overwhelmed by daily news and need a filter for exam relevance.' }),
  refBook({ id: 'css-general-knowledge-guide', title: 'CSS General Knowledge Guide', cats: ['css-pms-books'], cover: 'business',
    excerpt: 'Structured CSS GK topics — history, geography, science and Pakistan studies revision framework.',
    about: 'Organises high-yield GK areas tested in competitive exams: Islamic history, world geography, basic science, international organisations and Pakistan constitutional milestones.',
    who: 'Students beginning CSS preparation who need a syllabus-aligned GK checklist.' }),
  refBook({ id: 'pms-punjab-exam-preparation', title: 'PMS Punjab Exam Preparation', cats: ['css-pms-books'], cover: 'business',
    excerpt: 'Overview of PMS Punjab exam stages, subjects and study planning for provincial management service candidates.',
    about: 'Explains written papers, interview expectations and how PMS differs from CSS. Offers a monthly study calendar balancing English, GK and optional subjects.',
    who: 'Punjab PMS applicants planning their first attempt or improving after a near miss.' }),
  refBook({ id: 'css-english-precis-writing-guide', title: 'CSS English Precis Writing Guide', cats: ['css-pms-books'], cover: 'english',
    excerpt: 'Precis and comprehension techniques for CSS — title writing, compression ratios and clarity.',
    about: 'Teaches how to identify core ideas, remove examples and repetition, and write a title that captures the passage argument. Includes practice workflow and common marking deductions.',
    who: 'CSS candidates who lose marks on Precis length, title accuracy or distorted meaning.' }),
  refBook({ id: 'matric-english-grammar-complete', title: 'Matric English Grammar Complete', cats: ['matric-fsc-notes', 'grammar-books'], cover: 'grammar',
    excerpt: 'Matric English grammar topics — tenses, voice, narration, prepositions and essay basics for Pakistani boards.',
    about: 'Reviews board-exam grammar with simple rules, examples and short drills aligned to Matric English papers. Links grammar to composition and comprehension marks.',
    who: 'Matric students in Punjab and other boards preparing English Paper grammar sections.' }),
  refBook({ id: 'fsc-physics-short-questions', title: 'FSc Physics Short Questions', cats: ['matric-fsc-notes'], cover: 'kids',
    excerpt: 'FSc Part 1 and 2 Physics short-question revision themes — definitions, laws and numerical tips.',
    about: 'Summarises chapter-wise short questions commonly tested in Pakistani intermediate Physics: mechanics, waves, electricity and modern physics foundations.',
    who: 'FSc students doing last-month revision or building daily short-answer practice.' }),
  refBook({ id: 'matric-biology-notes-guide', title: 'Matric Biology Notes Guide', cats: ['matric-fsc-notes', 'kids-learning-books'], cover: 'kids',
    excerpt: 'Matric Biology study framework — cell biology, human systems and diagram-based revision.',
    about: 'Organises Matric Biology into digestible units with mnemonic tips for labels, processes and definitions frequently asked in board exams.',
    who: 'Matric science students who need structured notes before practical and theory papers.' }),
  refBook({ id: 'fsc-chemistry-important-questions', title: 'FSc Chemistry Important Questions', cats: ['matric-fsc-notes'], cover: 'kids',
    excerpt: 'High-frequency FSc Chemistry questions — organic, inorganic and physical chemistry revision.',
    about: 'Highlights reaction mechanisms, periodic trends and numerical problem types common in intermediate Chemistry papers across Pakistani boards.',
    who: 'FSc Part 1 and 2 students prioritising repeated past-paper question styles.' }),
  refBook({ id: 'matric-mathematics-solved-guide', title: 'Matric Mathematics Solved Guide', cats: ['matric-fsc-notes'], cover: 'kids',
    excerpt: 'Matric Math exam preparation — algebra, geometry and word-problem strategies with worked examples.',
    about: 'Breaks down Matric Mathematics into skill areas: factorisation, trigonometry intro, geometry proofs and past-paper time management.',
    who: 'Matric students aiming to improve step-marking and reduce careless errors in Math papers.' }),
  refBook({ id: 'the-sealed-nectar-prophet-biography', title: 'The Sealed Nectar — Prophet Biography', cats: ['islamic-books'], cover: 'literature',
    excerpt: 'Overview of the Sealed Nectar (Ar-Raheeq Al-Makhtum) — the life of Prophet Muhammad (PBUH) for English readers.',
    about: 'Introduces the structure, historical context and themes of this widely read Prophetic biography. Guides readers toward authorised English translations and print editions from reputable Islamic publishers.',
    who: 'Muslim and non-Muslim readers seeking a trustworthy introduction to Seerah literature in English.', officialUrl: OFFICIAL.islam }),
  refBook({ id: 'islam-the-natural-way', title: 'Islam The Natural Way', cats: ['islamic-books'], cover: 'literature',
    excerpt: 'Introduction to core Islamic beliefs, worship and character — study guide and reading overview.',
    about: 'Summarises pillars of faith, prayer, fasting and ethical living in accessible language for new Muslims and students of comparative religion.',
    who: 'Readers beginning Islamic studies who want a structured overview before deeper texts.' }),
  refBook({ id: 'arabic-for-beginners-guide', title: 'Arabic for Beginners Guide', cats: ['islamic-books', 'english-learning-books'], cover: 'english',
    excerpt: 'Modern Standard Arabic basics for Quran and daily phrases — alphabet, grammar and study plan.',
    about: 'Covers Arabic letters, short vowels, core vocabulary and simple sentence patterns with a 30-day study rhythm suitable for self-learners.',
    who: 'English speakers learning Arabic for Quran understanding or travel and conversation basics.' }),
  refBook({ id: 'islamic-history-timeline', title: 'Islamic History Timeline', cats: ['islamic-books'], cover: 'literature',
    excerpt: 'Major events in Islamic history from the Prophetic era to the modern period — revision timeline.',
    about: 'Presents a chronological framework: Khulafa Rashidun, Umayyads, Abbasids, Ottoman period and key reform movements, with study tips for exams and general knowledge.',
    who: 'Students, CSS candidates and curious readers who need history in chronological order.' }),
  refBook({ id: 'quran-translation-guide-english', title: 'Quran Translation Guide English', cats: ['islamic-books'], cover: 'literature',
    excerpt: 'How to choose and study an English Quran translation — tafsir basics and respectful reading.',
    about: 'Compares types of translations (literal vs interpretive), recommends starting with short surahs and pairing reading with reputable tafsir introductions.',
    who: 'English-speaking Muslims and researchers beginning Quranic study.', officialUrl: OFFICIAL.islam }),
  refBook({ id: 'python-programming-beginner-guide', title: 'Python Programming Beginner Guide', cats: ['programming-books'], cover: 'business',
    excerpt: 'Learn Python from zero — variables, loops, functions and projects with links to official documentation.',
    about: 'A practical first course outline: installing Python, writing scripts, debugging errors and building mini-projects. Points to the official Python tutorial for depth.',
    who: 'Absolute beginners who want a free roadmap before paid bootcamps.', officialUrl: OFFICIAL.python }),
  refBook({ id: 'html-css-web-design-basics', title: 'HTML CSS Web Design Basics', cats: ['programming-books'], cover: 'business',
    excerpt: 'Build your first website with HTML5 semantics and modern CSS layout — flexbox, grids and responsive design.',
    about: 'Walks through page structure, typography, colours and mobile-friendly layouts with a simple portfolio project checklist.',
    who: 'Students and hobbyists starting web development without prior coding experience.' }),
  refBook({ id: 'javascript-fundamentals-guide', title: 'JavaScript Fundamentals Guide', cats: ['programming-books'], cover: 'business',
    excerpt: 'JavaScript basics for the web — DOM, events, fetch API and beginner project ideas.',
    about: 'Explains variables, functions, arrays and DOM manipulation, then introduces async concepts for interactive pages.',
    who: 'Learners who know HTML/CSS and want to add interactivity to static sites.' }),
  refBook({ id: 'git-version-control-guide', title: 'Git Version Control Guide', cats: ['programming-books'], cover: 'business',
    excerpt: 'Git and GitHub essentials — commits, branches, pull requests and collaboration workflow.',
    about: 'Teaches daily Git commands, branching strategy for solo projects and how open-source collaboration works on GitHub.',
    who: 'Developers and students who need Git for school projects or first jobs.' }),
  refBook({ id: 'sql-database-beginner-guide', title: 'SQL Database Beginner Guide', cats: ['programming-books'], cover: 'business',
    excerpt: 'SQL SELECT, JOIN, INSERT and database design basics for analysts and developers.',
    about: 'Introduces relational tables, primary keys, simple queries and how databases power apps and reports.',
    who: 'Programmers and data-curious learners starting with SQLite or MySQL.' }),
  refBook({ id: 'o-level-english-language-guide', title: 'O Level English Language Guide', cats: ['o-level-a-level', 'english-learning-books'], cover: 'english',
    excerpt: 'Cambridge O Level English Language skills — reading, writing, summary and directed writing.',
    about: 'Maps paper components, mark schemes and revision tactics for O Level English with past-paper practice routines.',
    who: 'O Level candidates and teachers in Pakistan and international schools.', officialUrl: OFFICIAL.css }),
  refBook({ id: 'a-level-biology-study-guide', title: 'A Level Biology Study Guide', cats: ['o-level-a-level'], cover: 'health',
    excerpt: 'A Level Biology revision framework — cells, genetics, ecology and exam technique.',
    about: 'Organises syllabus topics into review cycles with emphasis on diagrams, definitions and long-answer structure.',
    who: 'A Level Biology students preparing for Cambridge or equivalent boards.', officialUrl: OFFICIAL.css }),
  refBook({ id: 'o-level-mathematics-guide', title: 'O Level Mathematics Guide', cats: ['o-level-a-level'], cover: 'kids',
    excerpt: 'O Level Math topic checklist — algebra, geometry, trigonometry and statistics revision.',
    about: 'Breaks the syllabus into weekly revision blocks with calculator and non-calculator paper tips.',
    who: 'O Level Math students building confidence before mocks and final exams.', officialUrl: OFFICIAL.css }),
  refBook({ id: 'cambridge-igcse-preparation', title: 'Cambridge IGCSE Preparation', cats: ['o-level-a-level'], cover: 'english',
    excerpt: 'IGCSE study planning — subject selection, revision timetables and resource strategy.',
    about: 'Helps students balance multiple IGCSE subjects, use past papers effectively and manage stress during the exam season.',
    who: 'IGCSE students and parents planning a two-year preparation path.', officialUrl: OFFICIAL.css }),
  refBook({ id: 'a-level-psychology-notes', title: 'A Level Psychology Notes', cats: ['o-level-a-level'], cover: 'self',
    excerpt: 'A Level Psychology core studies overview — research methods, approaches and evaluation frameworks.',
    about: 'Summarises key studies, ethics and how to write evaluation paragraphs that earn AO marks.',
    who: 'A Level Psychology students who need structured notes before exams.', officialUrl: OFFICIAL.css }),
  refBook({ id: 'acres-of-diamonds', title: 'Acres of Diamonds', cats: ['self-development-books', 'self-grooming-books'], cover: 'self',
    excerpt: 'Russell Conwell\'s classic lecture on finding opportunity where you already are — public-domain wisdom.',
    about: 'Argues that wealth and success often lie in your own community and talents, not distant places. A motivational cornerstone of American self-help.',
    who: 'Readers interested in classic motivation and entrepreneurship thinking.', access: 'summary' }),
  refBook({ id: 'the-science-of-getting-rich', title: 'The Science of Getting Rich', cats: ['self-development-books'], cover: 'self',
    excerpt: 'Wallace Wattles\' 1910 prosperity classic — mindset, gratitude and purposeful action.',
    about: 'Presents a philosophy of creative thinking, efficient action and gratitude as foundations for financial and personal growth.',
    who: 'Self-development readers exploring early 20th-century prosperity literature.' }),
  refBook({ id: 'self-reliance-ralph-emerson', title: 'Self Reliance — Ralph Emerson', cats: ['self-development-books', 'literature-books'], cover: 'self',
    excerpt: 'Emerson\'s essential essay on independent thought, trust and nonconformity.',
    about: 'A foundational American essay urging readers to trust inner conviction over social conformity — concise and quotable.',
    who: 'Students of American literature and readers seeking philosophical encouragement.' })
];

// Public domain additions with Gutenberg (handled separately if PDF needed)
const PD_ADD = [
  { id: 'arabian-nights-stories', gid: 344, title: 'Arabian Nights Stories', cover: 'kids', cats: ['kids-learning-books', 'stories-books', 'islamic-books'],
    excerpt: 'Selected tales from One Thousand and One Nights — Scheherazade, Aladdin and Sinbad in public-domain translation.',
    about: 'A collection of frame stories from the Arabian Nights tradition, blending adventure, magic and moral lessons that shaped world folklore.',
    why: 'Perfect for family reading and cultural literacy — many stories familiar from films in their original narrative form.' }
];

// Fix acres/science/self-reliance - user wanted public domain PDFs. Mark for expand if gutenberg ids exist:
// acres 1158, science of getting rich 598, self reliance 2944 - add download in expand hook or separate

NEW_CATEGORIES.forEach(c => {
  if (!CATEGORIES.find(x => x.slug === c.slug)) CATEGORIES.push(c);
});

let added = 0;
NEW_BOOKS.forEach(b => {
  if (!BOOKS.find(x => x.id === b.id)) { BOOKS.push(b); added++; }
});

const out =
  '/* Book database for LifeWithBooks (generated/normalized) */\n\nconst BOOKS = ' +
  JSON.stringify(BOOKS, null, 2) + ';\n\nconst CATEGORIES = ' +
  JSON.stringify(CATEGORIES, null, 2) + ';\n\nif (typeof module !== "undefined") {\n  module.exports = { BOOKS, CATEGORIES };\n}\n';
fs.writeFileSync(booksPath, out, 'utf8');
console.log('Added', added, 'reference books. Categories now', CATEGORIES.length, 'Books', BOOKS.length);
console.log('Run: node scripts/expand-arabian-nights.js for PD title if needed');
