/* Generate js/articles-more-3.js — "Free [Title] PDF Guide" SEO articles. */
const fs = require('fs');
const path = require('path');

const { BOOKS } = require(path.join(__dirname, '..', 'js', 'books.js'));

const BATCH3_IDS = [
  'dracula',
  'the-picture-of-dorian-gray',
  'little-women',
  'a-tale-of-two-cities',
  'the-adventures-of-tom-sawyer',
  'adventures-of-huckleberry-finn',
  'around-the-world-in-eighty-days',
  'the-call-of-the-wild',
  'alices-adventures-in-wonderland',
  'the-time-machine',
  'wuthering-heights',
  'moby-dick',
  'the-scarlet-letter',
  'the-adventures-of-sherlock-holmes',
  'the-strange-case-of-dr-jekyll-and-mr-hyde'
];

const BATCH4_IDS = [
  'emma', 'sense-and-sensibility', 'persuasion', 'northanger-abbey', 'oliver-twist',
  'a-christmas-carol', 'silas-marner', 'far-from-the-madding-crowd',
  'twenty-thousand-leagues-under-the-sea', 'the-mysterious-island',
  'the-hound-of-the-baskervilles', 'a-study-in-scarlet', 'the-invisible-man',
  'the-island-of-doctor-moreau', 'ivanhoe', 'the-three-musketeers',
  'the-man-in-the-iron-mask', 'crime-and-punishment', 'the-metamorphosis', 'candide',
  'meditations', 'walden', 'narrative-of-the-life-of-frederick-douglass',
  'the-importance-of-being-earnest', 'the-wind-in-the-willows', 'black-beauty',
  'the-happy-prince-and-other-tales', 'the-great-gatsby', 'the-jungle', 'common-sense'
];

const BATCH5_IDS = [
  'les-miserables', 'don-quixote', 'war-and-peace', 'anne-of-avonlea', 'anne-of-the-island',
  'the-sign-of-the-four', 'the-valley-of-fear', 'the-return-of-sherlock-holmes',
  'the-memoirs-of-sherlock-holmes', 'his-last-bow', 'the-hunchback-of-notre-dame',
  'anna-karenina', 'the-brothers-karamazov', 'the-odyssey', 'paradise-lost',
  'the-last-of-the-mohicans', 'kidnapped', 'the-prince-and-the-pauper', 'heidi',
  'the-adventures-of-pinocchio', 'the-idiot', 'the-mayor-of-casterbridge',
  'the-house-of-the-seven-gables', 'the-turn-of-the-screw', 'the-awakening'
];

const batchArg = process.argv.find(a => a.startsWith('--batch='));
const batch = batchArg ? batchArg.split('=')[1] : '3';
const GUIDE_IDS = batch === '5' ? BATCH5_IDS : batch === '4' ? BATCH4_IDS : BATCH3_IDS;
const OUT_VAR = batch === '5' ? 'ARTICLES_MORE_5' : batch === '4' ? 'ARTICLES_MORE_4' : 'ARTICLES_MORE_3';
const OUT_FILE = batch === '5' ? 'articles-more-5.js' : batch === '4' ? 'articles-more-4.js' : 'articles-more-3.js';

const DATES = batch === '5'
  ? [
    '2026-07-19', '2026-07-20', '2026-07-21', '2026-07-22', '2026-07-23',
    '2026-07-24', '2026-07-25', '2026-07-26', '2026-07-27', '2026-07-28',
    '2026-07-29', '2026-07-30', '2026-07-31', '2026-08-01', '2026-08-02',
    '2026-08-03', '2026-08-04', '2026-08-05', '2026-08-06', '2026-08-07',
    '2026-08-08', '2026-08-09', '2026-08-10', '2026-08-11', '2026-08-12'
  ]
  : batch === '4'
  ? [
    '2026-06-19', '2026-06-20', '2026-06-21', '2026-06-22', '2026-06-23',
    '2026-06-24', '2026-06-25', '2026-06-26', '2026-06-27', '2026-06-28',
    '2026-06-29', '2026-06-30', '2026-07-01', '2026-07-02', '2026-07-03',
    '2026-07-04', '2026-07-05', '2026-07-06', '2026-07-07', '2026-07-08',
    '2026-07-09', '2026-07-10', '2026-07-11', '2026-07-12', '2026-07-13',
    '2026-07-14', '2026-07-15', '2026-07-16', '2026-07-17', '2026-07-18'
  ]
  : [
  '2026-05-20', '2026-05-22', '2026-05-24', '2026-05-26', '2026-05-28',
  '2026-05-30', '2026-06-01', '2026-06-03', '2026-06-05', '2026-06-07',
  '2026-06-09', '2026-06-11', '2026-06-13', '2026-06-15', '2026-06-17'
];

const EXTRA = {
  dracula: {
    author: 'Bram Stoker',
    year: '1897',
    hook: 'the novel that defined the modern vampire',
    readTime: '8–12 hours',
    audience: 'horror fans, Gothic literature readers and anyone curious about the original Count Dracula before Hollywood versions',
    tips: 'Read in evening sessions — the epistolary format (letters and journal entries) makes it easy to pause between chapters. Keep a note of character names as the story shifts between narrators.'
  },
  'the-picture-of-dorian-gray': {
    author: 'Oscar Wilde',
    year: '1890',
    hook: 'Wilde\'s only novel — a witty, unsettling fable about beauty and moral decay',
    readTime: '5–7 hours',
    audience: 'readers who enjoy philosophical fiction, sharp dialogue and Victorian social satire',
    tips: 'Pay attention to Lord Henry\'s epigrams — they sound charming but carry the book\'s central warning about influence and vanity.'
  },
  'little-women': {
    author: 'Louisa May Alcott',
    year: '1868',
    hook: 'one of the most beloved coming-of-age novels in English',
    readTime: '10–14 hours',
    audience: 'teen and adult readers, families reading together, and anyone who wants a warm story about ambition and sisterhood',
    tips: 'Many editions include both parts of the story. If the tone shifts midway, that is normal — Part Two follows the sisters into adulthood.'
  },
  'a-tale-of-two-cities': {
    author: 'Charles Dickens',
    year: '1859',
    hook: 'Dickens\'s sweeping novel of the French Revolution',
    readTime: '10–12 hours',
    audience: 'historical fiction lovers and readers ready for Dickens\'s blend of drama, romance and sacrifice',
    tips: 'The opening chapter is famous for a reason — read it twice. If the first fifty pages feel dense, push through to the Paris sections where the plot accelerates.'
  },
  'the-adventures-of-tom-sawyer': {
    author: 'Mark Twain',
    year: '1876',
    hook: 'the definitive American boyhood adventure',
    readTime: '6–8 hours',
    audience: 'young readers, parents, and adults who want a funny, nostalgic portrait of childhood on the Mississippi',
    tips: 'Twain\'s humour is dry — read aloud if a scene feels flat. The whitewashing fence chapter is a masterclass in persuasion.'
  },
  'adventures-of-huckleberry-finn': {
    author: 'Mark Twain',
    year: '1884',
    hook: 'often called the great American novel',
    readTime: '9–11 hours',
    audience: 'mature readers ready for adventure, satire and a serious moral journey on the Mississippi River',
    tips: 'The novel uses historical language that can be uncomfortable today. Read with context: Twain was critiquing the society that produced those attitudes.'
  },
  'around-the-world-in-eighty-days': {
    author: 'Jules Verne',
    year: '1872',
    hook: 'the globe-trotting race that popularised adventure travel fiction',
    readTime: '6–8 hours',
    audience: 'travel lovers, adventure readers and anyone who wants a brisk, optimistic story',
    tips: 'Track Fogg\'s route on a map as you read — it adds to the fun and helps you follow the timetable that drives the suspense.'
  },
  'the-call-of-the-wild': {
    author: 'Jack London',
    year: '1903',
    hook: 'a raw, powerful novella about instinct and survival',
    readTime: '3–4 hours',
    audience: 'readers who want a short, intense classic — ideal for a weekend read',
    tips: 'This is a novella, not a full novel. Read it in one or two sittings to feel the momentum of Buck\'s transformation.'
  },
  'alices-adventures-in-wonderland': {
    author: 'Lewis Carroll',
    year: '1865',
    hook: 'the surreal classic that invented a new kind of children\'s imagination',
    readTime: '3–5 hours',
    audience: 'children, parents, and adults who enjoy wordplay, logic puzzles and pure whimsy',
    tips: 'Do not hunt for a single hidden meaning in every scene — enjoy the nonsense first, then notice the gentle satire of Victorian manners.'
  },
  'the-time-machine': {
    author: 'H.G. Wells',
    year: '1895',
    hook: 'the pioneering science-fiction novella about humanity\'s distant future',
    readTime: '3–4 hours',
    audience: 'sci-fi fans, philosophy-minded readers and anyone curious where the genre began',
    tips: 'The middle section is really a social essay disguised as adventure. Wells is asking what class division might become if stretched across millennia.'
  },
  'wuthering-heights': {
    author: 'Emily Brontë',
    year: '1847',
    hook: 'a stormy masterpiece of passion and revenge on the Yorkshire moors',
    readTime: '9–11 hours',
    audience: 'readers who enjoy intense, atmospheric romance and do not need likeable characters on every page',
    tips: 'Keep a simple family tree as you read — generations overlap and names repeat. The frame narrator Lockwood gives you permission to feel confused at first.'
  },
  'moby-dick': {
    author: 'Herman Melville',
    year: '1851',
    hook: 'the epic American novel about obsession, whaling and the white whale',
    readTime: '15–20 hours',
    audience: 'serious readers ready for digressions, symbolism and one of literature\'s greatest adventure plots',
    tips: 'Treat the whaling chapters like optional deep dives — skim when you must, slow down for Ahab\'s speeches. Many readers alternate one chapter of plot with one chapter of lore.'
  },
  'the-scarlet-letter': {
    author: 'Nathaniel Hawthorne',
    year: '1850',
    hook: 'a foundational American novel about guilt, judgement and quiet courage',
    readTime: '6–8 hours',
    audience: 'readers interested in Puritan America, moral drama and psychological fiction',
    tips: 'Hawthorne\'s sentences are long — read aloud when you lose the thread. The scaffold scenes anchor the whole book; note what changes each time Hester stands there.'
  },
  'the-adventures-of-sherlock-holmes': {
    author: 'Arthur Conan Doyle',
    year: '1892',
    hook: 'twelve perfect detective stories that invented the modern mystery',
    readTime: '6–8 hours',
    audience: 'mystery fans, short-story readers and anyone who wants bite-sized classics',
    tips: 'Each story stands alone — read one per day like a mini puzzle. After finishing, compare how often Holmes is right versus lucky.'
  },
  'the-strange-case-of-dr-jekyll-and-mr-hyde': {
    author: 'Robert Louis Stevenson',
    year: '1886',
    hook: 'the short classic about divided identity that changed horror forever',
    readTime: '2–3 hours',
    audience: 'busy readers, horror fans and students who need a manageable classic in one sitting',
    tips: 'You likely know the twist already — read for Stevenson\'s language about temptation and respectability. The book is shorter than most film adaptations suggest.'
  },
  emma: { author: 'Jane Austen', year: '1815', hook: 'a comedy of matchmaking and self-knowledge', readTime: '10–12 hours', audience: 'fans of witty romance, Austen readers and anyone who enjoys social comedy with heart', tips: 'Emma is not always likeable — that is intentional. Notice how Austen lets her heroine learn without losing her spark.' },
  'sense-and-sensibility': { author: 'Jane Austen', year: '1811', hook: 'Austen\'s first published novel of two sisters and contrasting temperaments', readTime: '9–11 hours', audience: 'romance readers, Austen beginners and students of Regency fiction', tips: 'Track how Elinor and Marianne each grow toward balance — the title is the whole theme.' },
  persuasion: { author: 'Jane Austen', year: '1817', hook: 'Austen\'s mature second-chance romance', readTime: '7–9 hours', audience: 'readers who love quiet, emotional love stories with depth', tips: 'Save the letter chapter for when you can read it without interruptions — it earns its reputation.' },
  'northanger-abbey': { author: 'Jane Austen', year: '1817', hook: 'a playful satire of Gothic fiction', readTime: '6–8 hours', audience: 'Austen fans, Gothic readers and students exploring genre parody', tips: 'Knowing a little about Gothic tropes helps, but the comedy lands even if you do not.' },
  'oliver-twist': { author: 'Charles Dickens', year: '1838', hook: 'Dickens\'s famous orphan tale of poverty and survival', readTime: '10–14 hours', audience: 'historical fiction readers, Dickens fans and students of Victorian social reform', tips: 'If the London slang slows you down, keep reading — Dickens rewards persistence with unforgettable scenes.' },
  'a-christmas-carol': { author: 'Charles Dickens', year: '1843', hook: 'the definitive Christmas redemption story', readTime: '2–3 hours', audience: 'everyone — families, students and holiday readers', tips: 'Ideal for one or two sittings in December (or any month you need a reminder about generosity).' },
  'silas-marner': { author: 'George Eliot', year: '1861', hook: 'a compact novel about exile, gold and redemption', readTime: '6–8 hours', audience: 'readers who want moral depth without an epic length', tips: 'Notice how the village itself becomes a character — community is the hidden subject.' },
  'far-from-the-madding-crowd': { author: 'Thomas Hardy', year: '1874', hook: 'Hardy\'s novel of independence, pride and rural life', readTime: '10–12 hours', audience: 'literary romance readers and fans of strong female protagonists', tips: 'Hardy\'s landscape descriptions reward slow reading — picture the Wessex countryside as you go.' },
  'twenty-thousand-leagues-under-the-sea': { author: 'Jules Verne', year: '1870', hook: 'the underwater adventure that defined science fiction', readTime: '10–12 hours', audience: 'adventure and sci-fi fans of all ages', tips: 'Some catalogues of marine life read like a textbook — skim when needed and enjoy the wonder.' },
  'the-mysterious-island': { author: 'Jules Verne', year: '1874', hook: 'castaway survival powered by science and teamwork', readTime: '12–15 hours', audience: 'Verne fans, survival-story readers and STEM-curious teens', tips: 'Treat each problem the castaways solve as a mini episode — great for serial reading.' },
  'the-hound-of-the-baskervilles': { author: 'Arthur Conan Doyle', year: '1902', hook: 'Holmes\'s most atmospheric novel-length case', readTime: '5–7 hours', audience: 'mystery lovers and anyone new to Sherlock Holmes', tips: 'Read at night if you can — the moor setting is half the scare.' },
  'a-study-in-scarlet': { author: 'Arthur Conan Doyle', year: '1887', hook: 'the first Sherlock Holmes novel', readTime: '4–6 hours', audience: 'detective fiction fans and Holmes newcomers', tips: 'The middle section jumps to America — stay with it; the payoff reconnects brilliantly.' },
  'the-invisible-man': { author: 'H.G. Wells', year: '1897', hook: 'science fiction about power without accountability', readTime: '4–5 hours', audience: 'sci-fi readers and fans of psychological thrillers', tips: 'Watch how Griffin\'s invisibility mirrors isolation — the theme is social as much as scientific.' },
  'the-island-of-doctor-moreau': { author: 'H.G. Wells', year: '1896', hook: 'a dark fable of science crossing moral lines', readTime: '4–5 hours', audience: 'horror, sci-fi and ethics-minded readers', tips: 'Short and unsettling — read in one sitting for maximum effect.' },
  ivanhoe: { author: 'Walter Scott', year: '1819', hook: 'knights, tournaments and Saxon–Norman conflict', readTime: '12–15 hours', audience: 'historical adventure fans and medieval fiction lovers', tips: 'Keep a simple list of major knights and nobles — Scott assumes you enjoy the tapestry.' },
  'the-three-musketeers': { author: 'Alexandre Dumas', year: '1844', hook: 'the ultimate swashbuckling adventure', readTime: '15–20 hours', audience: 'adventure readers who love friendship, wit and swordplay', tips: 'Read in long chapters — Dumas builds momentum and pays off in bursts.' },
  'the-man-in-the-iron-mask': { author: 'Alexandre Dumas', year: '1847', hook: 'the Musketeers\' epic finale of loyalty and intrigue', readTime: '12–16 hours', audience: 'fans of The Three Musketeers and historical adventure', tips: 'Finish the Musketeers trilogy in order if you can — emotional weight accumulates.' },
  'crime-and-punishment': { author: 'Fyodor Dostoevsky', year: '1866', hook: 'a psychological masterpiece of guilt and conscience', readTime: '15–18 hours', audience: 'serious literary readers ready for depth and intensity', tips: 'Read when you can focus — this is not a background listen. Short daily sessions still work well.' },
  'the-metamorphosis': { author: 'Franz Kafka', year: '1915', hook: 'the surreal novella that changed modern fiction', readTime: '2–3 hours', audience: 'modern literature students and readers who enjoy strange, symbolic fiction', tips: 'Accept the premise quickly and read for family dynamics — the bug is only half the story.' },
  candide: { author: 'Voltaire', year: '1759', hook: 'satirical adventure mocking blind optimism', readTime: '3–4 hours', audience: 'philosophy-curious readers and fans of sharp humour', tips: 'Each chapter is brief — perfect for commute reading with a notebook for quotable lines.' },
  meditations: { author: 'Marcus Aurelius', year: 'c. 170 AD', hook: 'Stoic wisdom from a Roman emperor\'s private journal', readTime: '4–6 hours', audience: 'self-improvement readers, leaders and philosophy beginners', tips: 'Read one short section per morning — this book is designed for revisiting, not rushing.' },
  walden: { author: 'Henry David Thoreau', year: '1854', hook: 'classic reflection on simple living and nature', readTime: '8–10 hours', audience: 'minimalists, nature lovers and American literature readers', tips: 'Some chapters are denser than others — skim the logistics, slow down for the philosophy.' },
  'narrative-of-the-life-of-frederick-douglass': { author: 'Frederick Douglass', year: '1845', hook: 'a foundational American autobiography of freedom and literacy', readTime: '3–4 hours', audience: 'history students, educators and every serious American reader', tips: 'Read the passages on learning to read slowly — they are the moral core of the book.' },
  'the-importance-of-being-earnest': { author: 'Oscar Wilde', year: '1895', hook: 'Wilde\'s funniest comedy of manners', readTime: '2–3 hours', audience: 'play lovers, comedy fans and Wilde enthusiasts', tips: 'Read aloud with a friend if possible — the dialogue is the whole pleasure.' },
  'the-wind-in-the-willows': { author: 'Kenneth Grahame', year: '1908', hook: 'gentle riverbank adventures with Mole, Rat and Toad', readTime: '5–7 hours', audience: 'families, bedtime readers and Anglophile fiction fans', tips: 'Perfect before sleep — let the river scenes slow your breathing.' },
  'black-beauty': { author: 'Anna Sewell', year: '1877', hook: 'the classic horse story about kindness and cruelty', readTime: '4–6 hours', audience: 'children, animal lovers and Victorian fiction readers', tips: 'Short chapters make this ideal for reading aloud one chapter per night.' },
  'the-happy-prince-and-other-tales': { author: 'Oscar Wilde', year: '1888', hook: 'bittersweet fairy tales for children and adults', readTime: '1–2 hours', audience: 'families and readers who love lyrical, moral stories', tips: 'Keep tissues nearby — Wilde\'s tenderness cuts deep.' },
  'the-great-gatsby': { author: 'F. Scott Fitzgerald', year: '1925', hook: 'the Jazz Age tragedy of ambition and illusion', readTime: '4–6 hours', audience: 'American literature students and fans of lyrical, tragic romance', tips: 'Track motifs of green light, eyes and water — Fitzgerald layers symbols without hiding the plot.' },
  'the-jungle': { author: 'Upton Sinclair', year: '1906', hook: 'muckraking fiction that exposed industrial exploitation', readTime: '10–12 hours', audience: 'history readers, social justice students and gritty realism fans', tips: 'The early packinghouse chapters are intense — take breaks, but do not skip them.' },
  'common-sense': { author: 'Thomas Paine', year: '1776', hook: 'the pamphlet that helped shape American independence', readTime: '1–2 hours', audience: 'history buffs, civics students and concise nonfiction lovers', tips: 'Read in one sitting with a highlighter — Paine writes to persuade quickly.' },
  'les-miserables': { author: 'Victor Hugo', year: '1862', hook: 'one of the greatest novels of redemption ever written', readTime: '30–40 hours', audience: 'serious literary readers ready for an epic', tips: 'Treat it like a miniseries — read one book (section) per week and track the main families on a note card.' },
  'don-quixote': { author: 'Miguel de Cervantes', year: '1605', hook: 'the novel that invented modern fiction', readTime: '25–35 hours', audience: 'classic literature fans and lovers of comedy with depth', tips: 'Alternate between Quixote\'s madness and Sancho\'s plain speech — the contrast is the comedy.' },
  'war-and-peace': { author: 'Leo Tolstoy', year: '1869', hook: 'the supreme epic of private life under history', readTime: '35–45 hours', audience: 'ambitious readers and students of Russian literature', tips: 'Do not skip the essay chapters entirely — skim first, reread later once you know the characters.' },
  'anne-of-avonlea': { author: 'L.M. Montgomery', year: '1909', hook: 'Anne\'s warm, funny path into teaching and adulthood', readTime: '6–8 hours', audience: 'fans of Anne of Green Gables and gentle coming-of-age fiction', tips: 'Read after Green Gables for the full emotional payoff.' },
  'anne-of-the-island': { author: 'L.M. Montgomery', year: '1915', hook: 'Anne at college and the long question of who to marry', readTime: '7–9 hours', audience: 'Anne series readers and romance fans', tips: 'Keep tissues nearby for the letters and reunions — Montgomery earns every tear.' },
  'the-sign-of-the-four': { author: 'Arthur Conan Doyle', year: '1890', hook: 'Holmes at his most exotic and energetic', readTime: '4–5 hours', audience: 'mystery lovers and Sherlock Holmes completists', tips: 'Read after A Study in Scarlet to meet Watson and Holmes in order.' },
  'the-valley-of-fear': { author: 'Arthur Conan Doyle', year: '1915', hook: 'Holmes versus a secret society across two continents', readTime: '5–6 hours', audience: 'detective fiction fans who enjoy longer plots', tips: 'The American backstory is a novella inside the novel — read it as a separate act.' },
  'the-return-of-sherlock-holmes': { author: 'Arthur Conan Doyle', year: '1905', hook: 'Holmes returns with thirteen new cases', readTime: '6–8 hours', audience: 'Sherlock fans after The Memoirs', tips: 'Start with The Empty House — it explains the gap after Reichenbach.' },
  'the-memoirs-of-sherlock-holmes': { author: 'Arthur Conan Doyle', year: '1894', hook: 'eleven cases culminating at Reichenbach Falls', readTime: '6–8 hours', audience: 'essential reading for Holmes canon fans', tips: 'Save The Final Problem for when you can read the next collection soon after.' },
  'his-last-bow': { author: 'Arthur Conan Doyle', year: '1917', hook: 'Holmes in wartime espionage and late-career cases', readTime: '4–6 hours', audience: 'readers who have finished the main Holmes collections', tips: 'The title story is best read knowing the characters\' full history.' },
  'the-hunchback-of-notre-dame': { author: 'Victor Hugo', year: '1831', hook: 'Gothic Paris and the bell-ringer of Notre-Dame', readTime: '12–16 hours', audience: 'Gothic romance readers and Hugo fans after Les Miserables', tips: 'Some architecture chapters are dense — skim on first read if needed.' },
  'anna-karenina': { author: 'Leo Tolstoy', year: '1877', hook: 'passion, society and the search for an honest life', readTime: '25–30 hours', audience: 'literary fiction readers ready for depth', tips: 'Track both Anna and Levin plotlines — the novel needs both threads.' },
  'the-brothers-karamazov': { author: 'Fyodor Dostoevsky', year: '1880', hook: 'faith, doubt and murder in a Russian family', readTime: '25–30 hours', audience: 'serious readers of philosophy and drama', tips: 'The Grand Inquisitor chapter is famous — read slowly; it is the book\'s philosophical core.' },
  'the-odyssey': { author: 'Homer', year: 'c. 8th century BC', hook: 'the original epic journey home', readTime: '12–15 hours', audience: 'mythology fans, students and adventure readers', tips: 'Keep a list of gods and hosts Odysseus meets — repetition is part of the oral style.' },
  'paradise-lost': { author: 'John Milton', year: '1667', hook: 'the great English epic of the Fall', readTime: '10–14 hours', audience: 'poetry lovers and theology-curious readers', tips: 'Read aloud for the rhythm — Milton\'s blank verse opens up when spoken.' },
  'the-last-of-the-mohicans': { author: 'James Fenimore Cooper', year: '1826', hook: 'the classic American frontier adventure', readTime: '10–12 hours', audience: 'historical adventure fans', tips: 'Cooper\'s prose is formal — persist through the first chapters.' },
  kidnapped: { author: 'Robert Louis Stevenson', year: '1886', hook: 'Scottish adventure after Treasure Island', readTime: '6–8 hours', audience: 'adventure readers and Stevenson fans', tips: 'The friendship between David and Alan Breck is the heart — watch how trust builds.' },
  'the-prince-and-the-pauper': { author: 'Mark Twain', year: '1881', hook: 'Twain\'s Tudor swap of prince and beggar boy', readTime: '5–7 hours', audience: 'young readers and Twain fans', tips: 'Great read-aloud for families — short chapters and clear moral stakes.' },
  heidi: { author: 'Johanna Spyri', year: '1881', hook: 'Alpine warmth and healing in a children\'s classic', readTime: '5–7 hours', audience: 'families and readers who love wholesome fiction', tips: 'Perfect bedtime reading — gentle chapters and uplifting tone.' },
  'the-adventures-of-pinocchio': { author: 'Carlo Collodi', year: '1883', hook: 'the original puppet who wants to be real', readTime: '4–6 hours', audience: 'children and adults who enjoy fairy tales with bite', tips: 'Do not expect the Disney version — Collodi is sharper and funnier.' },
  'the-idiot': { author: 'Fyodor Dostoevsky', year: '1869', hook: 'innocence tested in corrupt society', readTime: '18–22 hours', audience: 'Dostoevsky readers after Crime and Punishment', tips: 'Prince Myshkin is not foolish — read for how others misread his kindness.' },
  'the-mayor-of-casterbridge': { author: 'Thomas Hardy', year: '1886', hook: 'Hardy\'s tragedy of pride and past sins', readTime: '10–12 hours', audience: 'Hardy fans and literary tragedy readers', tips: 'Note how Henchard\'s character is both sympathetic and self-destructive.' },
  'the-house-of-the-seven-gables': { author: 'Nathaniel Hawthorne', year: '1851', hook: 'American Gothic in a cursed New England house', readTime: '8–10 hours', audience: 'Gothic and American literature readers', tips: 'Pair with The Scarlet Letter — Hawthorne explores guilt from another angle.' },
  'the-turn-of-the-screw': { author: 'Henry James', year: '1898', hook: 'the perfect ambiguous ghost novella', readTime: '2–3 hours', audience: 'horror fans who prefer psychological dread', tips: 'Decide for yourself what is real — James never confirms the ghosts.' },
  'the-awakening': { author: 'Kate Chopin', year: '1899', hook: 'a landmark novel of a woman\'s self-discovery', readTime: '4–6 hours', audience: 'American literature students and feminist fiction readers', tips: 'Short enough for one weekend — notice how the sea scenes mirror Edna\'s freedom.' }
};

function defaultMeta(book) {
  return {
    author: 'a classic author',
    year: 'the public-domain era',
    hook: 'a beloved work of world literature',
    readTime: 'several hours depending on pace',
    audience: 'readers of classic literature, students and anyone building a free digital library',
    tips: 'Read in short daily sessions and use your PDF reader\'s search and bookmark tools for easy navigation.'
  };
}

function slugId(bookId) {
  return 'free-' + bookId + '-pdf-guide';
}

function coverFor(book) {
  return book.cover || 'literature';
}

function buildBody(book, meta) {
  const bookUrl = 'https://www.lifewithbooks.co/book/' + encodeURIComponent(book.id) + '.html';
  const title = book.title;
  return [
    'Looking for a free ' + title + ' PDF? You are in the right place. ' + title + ' by ' + meta.author + ' (' + meta.year + ') is a public-domain classic, which means you can download and read the complete text legally at no cost. LifeWithBooks hosts a clean PDF edition you can save to your phone, tablet or computer — no sign-up, no subscription, and no pirated scans from unknown sources.',
    'This guide explains what the book is about, who will enjoy it, how long it takes to read, and exactly where to get your free copy on LifeWithBooks.',
    '## What Is ' + title + '?',
    book.excerpt + ' First published in ' + meta.year + ', it remains ' + meta.hook + '. Because copyright has expired, readers worldwide can access legitimate free editions — and our library is one of the easiest places to start.',
    '## Why Download the Free PDF?',
    'A free PDF lets you read offline on any device, search for passages instantly, adjust font size for comfortable reading, and keep the book forever without relying on a streaming service or broken web pages. For students, teachers and self-learners, a downloadable public-domain text is one of the most practical study tools available.',
    'Unlike unofficial upload sites, LifeWithBooks clearly labels public-domain titles and provides a direct download through our book page. You get the full novel — not a sample chapter or a low-quality scan missing pages.',
    '## Who Should Read This Book?',
    'This book suits ' + meta.audience.charAt(0).toLowerCase() + meta.audience.slice(1) + ' If you are building a classics reading list, studying English literature, or simply want a great story without buying another paperback, this free PDF is an excellent choice.',
    '## How Long Does It Take to Read?',
    'Most readers finish ' + title + ' in about ' + meta.readTime + ' at a comfortable pace. Because this is a PDF, you can read in short sessions — ten minutes on a commute, twenty minutes before sleep — and pick up exactly where you left off.',
    '## Reading Tips for the Best Experience',
    meta.tips + ' If you use a phone, switch to landscape mode or increase text size in your PDF reader. Bookmark key chapters as you go — especially helpful for long classics.',
    '## About the Author',
    meta.author + ' wrote ' + title + ' in ' + meta.year + ', and the book has never gone out of print. Reading the original text — not just a summary — lets you see why teachers, filmmakers and other writers keep returning to this material.',
    '## Is It Legal to Download?',
    'Yes. Public-domain works are no longer under copyright, so sharing and downloading them is legal. LifeWithBooks only offers direct downloads for titles that qualify. We also publish original guides and reference pages for modern copyrighted books, pointing readers to official sources instead of piracy.',
    '## Similar Free Classics on LifeWithBooks',
    'If you enjoy ' + title + ', browse our literature and adventure categories for more free PDF classics — from Dickens and Austen to Verne and Doyle. Building a personal digital library costs nothing when you stick to public-domain titles.',
    '## Download Your Free ' + title + ' PDF',
    'Ready to start reading? Visit our ' + title + ' book page on LifeWithBooks, tap Download Free PDF, and save the file to your device. You can also read the full description, explore related books, and open our reading guides for tips on getting more from every page.',
    'Start here: ' + bookUrl + ' — free, legal, and ready in seconds.'
  ];
}

const articles = GUIDE_IDS.map((id, i) => {
  const book = BOOKS.find(b => b.id === id);
  if (!book) throw new Error('Book not found: ' + id);
  const meta = EXTRA[id] || defaultMeta(book);
  const title = 'Free ' + book.title + ' PDF Guide: Download the Full Book Legally';
  return {
    id: slugId(id),
    title: title,
    date: DATES[i],
    author: 'LifeWithBooks Editorial Team',
    cover: coverFor(book),
    excerpt: 'Download ' + book.title + ' as a free, legal PDF on LifeWithBooks. Public-domain edition — complete text, no sign-up. Guide includes summary, reading tips and download link.',
    body: buildBody(book, meta)
  };
});

function jsString(s) {
  return JSON.stringify(s);
}

let out = '/* SEO articles — Free [Book Title] PDF guides (batch ' + batch + '). Auto-generated; edit scripts/generate-book-guide-articles.js to rebuild. */\n';
out += 'const ' + OUT_VAR + ' = [\n';
articles.forEach((a, idx) => {
  out += '  {\n';
  out += '    id: ' + jsString(a.id) + ',\n';
  out += '    title: ' + jsString(a.title) + ',\n';
  out += '    date: ' + jsString(a.date) + ',\n';
  out += '    author: ' + jsString(a.author) + ',\n';
  out += '    cover: ' + jsString(a.cover) + ',\n';
  out += '    excerpt: ' + jsString(a.excerpt) + ',\n';
  out += '    body: [\n';
  a.body.forEach(p => {
    out += '      ' + jsString(p) + ',\n';
  });
  out += '    ]\n';
  out += '  }' + (idx < articles.length - 1 ? ',' : '') + '\n';
});
out += '];\n\n';
out += 'if (typeof module !== "undefined") {\n';
out += '  module.exports = { ' + OUT_VAR + ' };\n';
out += '}\n';

const dest = path.join(__dirname, '..', 'js', OUT_FILE);
fs.writeFileSync(dest, out, 'utf8');
console.log('Written', articles.length, 'book PDF guide articles to', dest);
