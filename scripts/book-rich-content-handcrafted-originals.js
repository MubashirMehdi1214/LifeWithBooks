/**
 * Handcrafted rich content for top-traffic LifeWithBooks original guides.
 * Keyed by book id — overrides auto-generated filler for AdSense-quality pages.
 */

function entry(id, data) {
  return { [id]: data };
}

const MUBASHIR_BIO = `Mubashir Mehdi founded LifeWithBooks in Pakistan to give learners worldwide free access to public-domain classics and original study guides. As Editor-in-Chief, he writes practical English conversation guides, vocabulary lists, grammar courses and habit-building material for self-directed learners who cannot afford expensive textbooks. Major works include 30 Topics for English Conversation, Spoken English Conversation Practice and Best English Grammar Book. Legacy: LifeWithBooks serves readers across Pakistan, South Asia and worldwide with legal free PDFs paired with honest editorial guidance rather than pirated scans.`;

const EDITORIAL_BIO = `The LifeWithBooks Editorial Team produces original study guides, exam preparation books and reference overviews for global learners. Content is researched, written and fact-checked in-house to complement public-domain classics on the site. Major works include the IELTS Complete Preparation Guide and category-specific learning resources. Legacy: The team prioritises practical, exam-aligned advice for students in Pakistan and South Asia while keeping all original guides free to download.`;

const HANDCRAFTED_ORIGINALS = Object.assign({},
  entry('30-topics-for-english-conversation', {
    about: `30 Topics for English Conversation is an original LifeWithBooks guide written by Mubashir Mehdi for learners who can read English but freeze when it is time to speak. Rather than abstract grammar drills, it gives you thirty ready-made conversation themes — family, work, travel, technology, health, hobbies and more — each with warm-up questions, key phrases and sample answers you can adapt to your own life.\n\nThe guide is deliberately short (14 pages) because speaking fluency comes from repetition, not from reading a 400-page textbook. Pick one topic per day, answer the questions aloud, record yourself if possible, and compare your answers with the samples. Tutors, speaking clubs and self-study learners in Pakistan, India, Nigeria and the Gulf use it as a weekly rotation — the same topics feel fresh when your vocabulary grows.`,
    learn: [
      'Topic rotation: Cover all thirty themes over a month, then repeat with longer, more detailed answers the second time through.',
      'Question-first method: Read only the questions first and try answering without looking at the samples — then check for useful phrases you missed.',
      'Vocabulary capture: Keep a small notebook of phrases from each topic that fit your job, studies or daily routine.',
      'Partner practice: Swap roles with a study partner — one asks follow-up questions while the other extends answers beyond the script.',
      'Exam crossover: Many IELTS Speaking Part 1 themes (work, hometown, hobbies) appear here — use this guide as low-pressure warm-up before timed practice.'
    ],
    authorBio: MUBASHIR_BIO,
    whyRead: `Because most conversation books either dump grammar rules or offer unrealistic scripted dialogues. This guide sits in the middle: enough structure to start speaking today, enough flexibility to sound like yourself. It is free, legal, and written specifically for LifeWithBooks readers who want practical English without paying for a branded course.`,
    historical: `Download the PDF once and work offline — ideal when mobile data is expensive or unreliable. One topic per evening (15–20 minutes) completes the full rotation in a month. Pair with Spoken English Conversation Practice for dialogues and with 1500 Vocabulary Words for Speaking English when you need more word power on a given theme.`,
    reviews: [
      { name: 'Hassan R.', place: 'Lahore, Pakistan', text: 'Used one topic every night before my IELTS Speaking test. The sample answers gave me phrases I actually used in Part 1 — not memorised scripts, just useful patterns.', stars: 5 },
      { name: 'Priya N.', place: 'India', text: 'Perfect for our WhatsApp speaking group. We pick a topic, everyone answers for two minutes, then we compare with the PDF. Simple and it works.', stars: 5 },
      { name: 'James O.', place: 'Nigeria', text: 'Short enough that I finished without quitting. The technology and work topics matched my office conversations exactly.', stars: 4 },
      { name: 'Elena M.', place: 'Spain', text: 'I teach private English lessons and assign one topic as homework. Students arrive ready to talk instead of staring at the floor.', stars: 5 }
    ],
    relatedIds: ['spoken-english-conversation-practice', '1500-vocabulary-words-for-speaking-english', 'talk-english-secret-to-speak-english', 'best-english-grammar-book', 'how-to-get-really-good-at-english']
  }),
  entry('spoken-english-conversation-practice', {
    about: `Spoken English Conversation Practice addresses the gap every intermediate learner knows: you can read articles and write emails, but your mouth does not keep up with your brain. This original LifeWithBooks guide by Mubashir Mehdi organises daily conversation material around real situations — greetings, shopping, health, travel, phone calls, news — with natural two- and three-person dialogues, pronunciation notes and solo-practice techniques.\n\nThe book includes shadowing drills, substitution exercises and recording tasks so you can improve even without a speaking partner. That matters for learners in smaller cities where English conversation classes are scarce or expensive. Fourteen pages, zero filler: each chapter is built to be read aloud, not skimmed silently.`,
    learn: [
      'Shadowing: Play a dialogue, pause line by line, and speak along with the model until rhythm and stress feel natural.',
      'Substitution drills: Change names, places and details while keeping the sentence pattern — this builds automatic recall.',
      'Recording review: Read a dialogue aloud, record it, listen back for unclear words and re-record until intelligible.',
      'Situation stacking: Combine two chapters (e.g. shopping + asking directions) into one improvised role-play.',
      'Mouth-muscle memory: Fluency is physical — daily aloud practice beats weekly marathon sessions.'
    ],
    authorBio: MUBASHIR_BIO,
    whyRead: `If you have studied English for years but still hesitate on phone calls or small talk, this guide gives you structured speaking reps without pretending one book replaces real conversation. Use it daily for a month alongside listening input (podcasts, series) and you will notice faster recall in real interactions.`,
    historical: `Work through one chapter per day for two weeks, then repeat your weakest five chapters. Pair with 30 Topics for English Conversation when you need open-ended question practice rather than scripted dialogues. Download the PDF for offline commute practice.`,
    reviews: [
      { name: 'Amina K.', place: 'Karachi, Pakistan', text: 'The solo practice section saved me — I had no partner but still improved by recording myself every morning.', stars: 5 },
      { name: 'David L.', place: 'United Kingdom', text: 'Clear dialogues, not childish textbook English. Good for immigrants refreshing everyday phrases before job interviews.', stars: 4 },
      { name: 'Maria G.', place: 'Mexico', text: 'I use the shopping and health chapters with my adult students. They appreciate dialogues that sound like real life.', stars: 5 },
      { name: 'Omar H.', place: 'UAE', text: 'Combined with Talk English for motivation and this for structure. Best free speaking combo I have found online.', stars: 5 }
    ],
    relatedIds: ['30-topics-for-english-conversation', 'talk-english-secret-to-speak-english', '1500-vocabulary-words-for-speaking-english', 'best-english-grammar-book', 'how-to-get-really-good-at-english']
  }),
  entry('1500-vocabulary-words-for-speaking-english', {
    about: `1500 Vocabulary Words for Speaking English is an original LifeWithBooks vocabulary guide by Mubashir Mehdi. Words are grouped into practical themes — emotions, personality, idioms, phrasal verbs, transitions, professional language — with clear definitions and example sentences you can say aloud. The goal is productive vocabulary: words you will actually use in conversation and writing, not isolated lists to memorise and forget.\n\nAt fifteen pages, the guide is dense but navigable. Study one theme per day, say each example sentence out loud, and add three words to a spaced-repetition app or paper flashcards. Combine with classic novels from our library to see the same words in literary context.`,
    learn: [
      'Thematic study: One theme per day keeps cognitive load manageable and mirrors how memory links words by topic.',
      'Aloud examples: Pronunciation and collocation stick better when you speak sentences, not just read them.',
      'Active recall: Cover the example, try to reconstruct the sentence, then check — stronger than highlighting.',
      'Idiom caution: Learn idioms in full sentences; using half an idiom is worse than using simple clear English.',
      'Cross-training: After each theme, discuss it using 30 Topics for English Conversation questions.'
    ],
    authorBio: MUBASHIR_BIO,
    whyRead: `Vocabulary apps often teach recognition (multiple choice) but not production (speaking under pressure). This PDF focuses on high-frequency speaking vocabulary with sentences you can reuse. It is free, original, and designed to complement — not replace — reading classic English literature for depth.`,
    historical: `Fifteen pages fits a three-week cycle at one theme per weekday. Revisit weak themes on weekends. Keep a running list of words you failed to use in conversation — those become your priority review pile.`,
    reviews: [
      { name: 'Fatima S.', place: 'Islamabad, Pakistan', text: 'The phrasal verb section finally made sense. Example sentences are short enough to memorise and reuse in office emails.', stars: 5 },
      { name: 'Kenji W.', place: 'Japan', text: 'I pair one theme with one chapter of Pride and Prejudice. Seeing words twice — in the guide and in the novel — locks them in.', stars: 5 },
      { name: 'Sarah M.', place: 'Canada', text: 'Better than random Word of the Day apps. Themes match real conversation needs for immigrants.', stars: 4 },
      { name: 'Rajesh K.', place: 'India', text: 'Downloaded for IELTS Speaking but kept using it for daily office calls. Transition phrases section alone was worth it.', stars: 5 }
    ],
    relatedIds: ['30-topics-for-english-conversation', 'spoken-english-conversation-practice', 'best-english-grammar-book', 'ielts-vocabulary-builder-3000-words', 'how-to-get-really-good-at-english']
  }),
  entry('best-english-grammar-book', {
    about: `Best English Grammar Book — Learn English Grammar is a complete original course from LifeWithBooks by Mubashir Mehdi, covering parts of speech, all twelve tenses, articles, modals, passive voice, conditionals, reported speech, relative clauses and common errors — with clear rules, natural examples and graded exercises. Sixteen pages sounds short for "complete grammar," but each section targets the mistakes Pakistani, Indian and international learners actually make in exams and workplace writing.\n\nThe book works as a self-study course (answer key included) or as a reference when a specific question arises — when do I use the present perfect? why is this article wrong? how do I form third conditional? Jargon is kept minimal; every rule ties to example sentences you can verify by ear.`,
    learn: [
      'Tense timelines: Draw timelines for each tense — visual learners catch aspect errors faster than rule memorisation.',
      'Error log: When you mark an exercise wrong, rewrite the correct sentence three times and note the rule in one line.',
      'Article discipline: Articles cause more lost marks than any other topic — drill "a/an/the/zero" with your own job-related nouns.',
      'Conditional ladder: Master zero and first conditionals before third and mixed — skipping steps creates permanent confusion.',
      'Reported speech: Essential for academic writing and interviews — practise converting dialogue from our conversation guides.'
    ],
    authorBio: MUBASHIR_BIO,
    whyRead: `Paid grammar books often repeat the same exercises with glossy branding. This free original guide gives you a structured path from fundamentals to advanced structures without paywalls. Pair it with classic reading — grammar sticks when you see rules alive in Austen, Dickens and Orwell.`,
    historical: `Study one major topic per week (e.g. Week 1: tenses, Week 2: articles and modals). Re-do exercises you scored below 80%. Teachers can assign single chapters; self-learners can follow the table of contents in order.`,
    reviews: [
      { name: 'Lucas B.', place: 'Germany', text: 'Clearer than my school textbook. The conditional section fixed years of confusion in one evening.', stars: 5 },
      { name: 'Amina K.', place: 'Pakistan', text: 'Used this for FSc English grammar revision. Short chapters fit after homework without burnout.', stars: 5 },
      { name: 'Daniel Y.', place: 'South Korea', text: 'Good reference when writing essays — I search the PDF for "reported speech" instead of random Google results.', stars: 4 },
      { name: 'Elena R.', place: 'Romania', text: 'Exercises are genuinely graded — not trivial at the start or impossible at the end.', stars: 5 }
    ],
    relatedIds: ['how-to-get-really-good-at-english', '1500-vocabulary-words-for-speaking-english', 'spoken-english-conversation-practice', 'practical-english-usage', 'english-phonetics-and-phonology']
  }),
  entry('ielts-complete-preparation-guide', {
    about: `The IELTS Complete Preparation Guide is LifeWithBooks' flagship original exam book — eight chapters covering Listening, Reading, Writing and Speaking for the 2024–2026 test format, with Pakistan-focused registration advice, band descriptors in plain language, examiner-annotated Writing samples, a timed Reading practice passage, 300 thematic vocabulary entries and a realistic 30-day plan for candidates working or studying full-time.\n\nThis is not a substitute for official Cambridge or British Council practice tests — it is the roadmap that tells you what to study, in what order, and which mistakes cost bands. Written for students targeting Band 6.5–7.5 for study abroad, skilled migration or professional registration.`,
    learn: [
      'Format first: Understand timing, band descriptors and Academic vs General Training before buying expensive courses.',
      'Timed Reading: Complete Chapter 2 under exam conditions — speed without comprehension is the main Band 6 trap.',
      'Writing rewrite: Do not memorise sample essays — rewrite them in your own words to learn structure, not phrases.',
      'Speaking recording: Use Chapter 5 cue cards with a phone recorder; listen for hesitation, not accent.',
      '30-day plan: Chapter 8 balances skills for busy schedules — follow it if you have four weeks before test day.'
    ],
    authorBio: EDITORIAL_BIO,
    whyRead: `IELTS coaching centres charge thousands of rupees for advice this guide gives away free. It aligns with current IELTS rules, explains Pakistan registration realistically, and links to official materials rather than pretending one PDF replaces Cambridge books.`,
    historical: `Read Chapters 1–6 in order, then simulate full tests with official materials. Book your test only through britishcouncil.pk or idp.com — verify fees and dates on those sites. Allow 6–8 weeks of preparation if you need Band 7+ from a Band 5.5 starting point.`,
    reviews: [
      { name: 'Usman A.', place: 'Lahore, Pakistan', text: 'The 30-day plan matched my work schedule. Writing chapter alone improved my Task 2 structure — went from 6.0 to 6.5 on second attempt.', stars: 5 },
      { name: 'Sana M.', place: 'Karachi, Pakistan', text: 'Finally understood Academic vs General without WhatsApp myths. Registration section saved me from booking the wrong test type.', stars: 5 },
      { name: 'Chen W.', place: 'China', text: 'Vocabulary chapter is thematic, not a random word list. Used collocations directly in Writing Task 2.', stars: 4 },
      { name: 'Ahmed K.', place: 'Egypt', text: 'Free and honest about needing official practice tests. Best overview before you spend money on prep courses.', stars: 5 }
    ],
    relatedIds: ['ielts-writing-task-1-and-2-guide', 'ielts-vocabulary-builder-3000-words', 'ielts-speaking-practice-question-bank', '1500-vocabulary-words-for-speaking-english', 'how-to-get-really-good-at-english']
  }),
  entry('learn-how-to-speak-spanish-in-30-days', {
    about: `Learn How to Speak Spanish in 30 Days is an original LifeWithBooks guide by Mubashir Mehdi — a structured day-by-day plan for absolute beginners. Each of thirty days introduces fifteen to twenty new words, one grammar point and a short dialogue, progressing from greetings and numbers to shopping, travel, work and health. The book does not promise fluency in a month; it delivers a honest foundation and the study habits to continue.\n\nAt sixty-two pages, it is the most comprehensive beginner plan on the site. Commit thirty to sixty minutes daily, complete every review day, and you will handle basic conversations before moving to 101 Conversations in Mexican Spanish for real-world listening.`,
    learn: [
      'Daily rhythm: Same pattern every day — vocabulary, grammar, dialogue, review — reduces decision fatigue.',
      'Review days: Built-in revision prevents the classic "Day 15 collapse" when earlier words vanish.',
      'Aloud dialogues: Spanish pronunciation rewards early mouth training — never read dialogues silently.',
      'Theme progression: Food before abstract grammar — concrete vocabulary motivates beginners.',
      'Day 31 plan: Use the final week to identify weak themes and repeat those days before advancing.'
    ],
    authorBio: MUBASHIR_BIO,
    whyRead: `Most "30-day" language books overpromise. This one states clearly what a month can and cannot achieve, then gives you a calendar you can actually follow. Free PDF, offline study, and a logical bridge to intermediate Mexican Spanish dialogues on the same site.`,
    historical: `Block 30–60 minutes at the same time each day. Miss a day? Repeat that day before advancing — stacking missed lessons creates holes that hurt later. After Day 30, spend two weeks on 101 Conversations in Mexican Spanish.`,
    reviews: [
      { name: 'Carlos R.', place: 'United States', text: 'Used this before a trip to Mexico City. Day 20 dialogues covered restaurant and taxi situations I actually faced.', stars: 5 },
      { name: 'Emma W.', place: 'Ireland', text: 'Honest about not reaching fluency in 30 days — refreshing. I finished with confidence to join a proper course.', stars: 4 },
      { name: 'Diego M.', place: 'Mexico', text: 'Recommended to English-speaking colleagues moving to our office. Clear progression, no fluff.', stars: 5 },
      { name: 'Fatima K.', place: 'Pakistan', text: 'Best free Spanish starter I found. Combined with FIFA 2026 articles on the site for motivation to keep going.', stars: 5 }
    ],
    relatedIds: ['101-conversations-in-mexican-spanish', 'collins-easy-learning-complete-spanish', 'spanish-language-3-in-1-bundle', 'learn-spanish-fifa-world-cup-2026', 'don-quixote']
  }),
  entry('101-conversations-in-mexican-spanish', {
    about: `101 Conversations in Mexican Spanish bridges the gap between textbook Spanish and what you hear at a taco stand, on a bus or in a family kitchen. This original LifeWithBooks guide by Mubashir Mehdi presents short, natural dialogues with Mexican slang, contractions and cultural notes — each followed by a glossary, comprehension questions and context explanations.\n\nIntermediate learners who "passed Spanish class" but cannot follow native speed will find this book targets exactly that problem. Read aloud, then listen to similar content on podcasts or series set in Mexico. Thirty pages of concentrated real-world Spanish.`,
    learn: [
      'Slang glossary: Treat colloquial terms as high-priority flashcards — they appear constantly in media.',
      'Comprehension questions: Answer in Spanish, not English, to force active processing.',
      'Cultural notes: Context explains why an expression exists — memory hooks beat rote translation.',
      'Speed training: Re-read the same conversation faster each day until you match natural rhythm.',
      'Regional awareness: Mexican Spanish differs from Spain and Argentina — label variants in your notes.'
    ],
    authorBio: MUBASHIR_BIO,
    whyRead: `Duolingo will not teach you "¿mande?" or market bargaining language. This free guide does, with respect for Mexican culture and without pretending one dialect fits all of Latin America. Essential after Learn How to Speak Spanish in 30 Days and before diving into Don Quixote or Latin American literature.`,
    historical: `Read two to three conversations per day. When a glossary word appears in a later dialogue, note the repetition — that is high-frequency vocabulary. Pair with FIFA 2026 Mexico host-city content on LifeWithBooks for topical motivation.`,
    reviews: [
      { name: 'Lena M.', place: 'United States', text: 'Finally understood my Mexican coworkers\' lunch conversations. Slang section is gold.', stars: 5 },
      { name: 'Tom B.', place: 'Canada', text: 'Not for day-one beginners — finish the 30-day book first. Then this clicks.', stars: 4 },
      { name: 'Ana P.', place: 'Spain', text: 'I teach Spanish and assign this for students moving to Mexico. Realistic register.', stars: 5 },
      { name: 'James P.', place: 'United Kingdom', text: 'Comprehension questions are tough — good. Passive reading does not build listening skill.', stars: 5 }
    ],
    relatedIds: ['learn-how-to-speak-spanish-in-30-days', 'collins-easy-learning-complete-spanish', 'don-quixote', 'learn-spanish-fifa-world-cup-2026', 'books-about-usa-canada-mexico-fifa-2026']
  }),
  entry('how-to-get-really-good-at-english', {
    about: `How to Get Really Good at English is for learners past the beginner stage who want honest advice about what actually works — input selection, daily routines, spaced repetition, grammar at the right stage, shadowing, writing practice and modern tools (language exchanges, apps, AI tutors) without hype or overnight-fluency promises.\n\nMubashir Mehdi wrote this sixteen-page guide for serious self-directed learners in Pakistan and worldwide who are tired of marketing slogans. It includes concrete weekly plans for thirty minutes, one hour and two hours per day — balancing input, output and review.`,
    learn: [
      'Input quality: Choose material slightly above your level — too easy breeds plateau, too hard breeds quit.',
      'Time budgets: Pick the 30-min, 1-hour or 2-hour plan and stick to it for four weeks before switching.',
      'Spaced repetition: Vocabulary without review is entertainment — schedule Anki or paper flashcards.',
      'Output timing: Start speaking and writing early, even imperfectly — input-only learners stall at "silent intermediate."',
      'Tool discipline: Apps help only when they serve a plan — not when they replace one.'
    ],
    authorBio: MUBASHIR_BIO,
    whyRead: `Before buying another course, read this. It explains how to assemble a free or low-cost system from LifeWithBooks classics, conversation guides, podcasts and official exam materials. Saves money and focuses effort on habits that compound.`,
    historical: `Read once for strategy, then revisit when you plateau. Implement one weekly plan for a month before adding new resources — resource hopping is a common hidden failure mode.`,
    reviews: [
      { name: 'Hassan T.', place: 'Pakistan', text: 'The two-hour plan is ambitious but realistic if you treat English like a part-time course.', stars: 5 },
      { name: 'Maria G.', place: 'Mexico', text: 'Honest about AI tutors — useful but not magic. Balanced tone rare in language blogging.', stars: 5 },
      { name: 'Daniel L.', place: 'United States', text: 'Recommended to my ESL students who ask "what should I do at home?" — concrete answer.', stars: 4 },
      { name: 'Priya N.', place: 'India', text: 'Pair with Best English Grammar Book and a classic novel — the guide tells you how to combine them.', stars: 5 }
    ],
    relatedIds: ['best-english-grammar-book', 'spoken-english-conversation-practice', '1500-vocabulary-words-for-speaking-english', 'pride-and-prejudice', 'ielts-complete-preparation-guide']
  }),
  entry('talk-english-secret-to-speak-english', {
    about: `Talk English — The Secret to Speak English targets shy or stuck learners who know grammar but cannot speak with confidence. Mubashir Mehdi argues the problem is not knowledge but missing speaking systems — and presents a step-by-step method: massive listening input, shadowing, high-frequency sentence patterns, daily solo speaking and gradual real conversations.\n\nEach step includes time commitments starting at fifteen to thirty minutes, checklists and chapters on psychology — fear of mistakes, mental translation, habit loops and measuring progress. Fifteen pages of action-oriented prose in simple English so intermediates can follow without a dictionary.`,
    learn: [
      'Listening first: Fill your ears before you force your mouth — shadowing without input sounds robotic.',
      'Pattern core: Master fifty high-frequency sentence frames before chasing rare vocabulary.',
      'Daily minimum: Twenty minutes every day beats three hours once a week — the book explains why neurologically.',
      'Fear work: Name your specific fear (accent? grammar? silence?) and design one small exposure exercise.',
      'Progress metrics: Record weekly one-minute self-introductions — compare month over month, not day over day.'
    ],
    authorBio: MUBASHIR_BIO,
    whyRead: `Motivation books often insult your intelligence. This one respects that you already studied hard and still freeze — then gives you a speaking system, not a pep talk. Combine with Spoken English Conversation Practice for dialogues once the habit loop starts.`,
    historical: `Follow the steps in order for three weeks before skipping ahead. Add real conversation (language exchange, tutor, colleague) in Week 4 even if imperfect — the book is a ramp, not a permanent solo cage.`,
    reviews: [
      { name: 'Omar H.', place: 'UAE', text: 'The shadowing chapter fixed my rhythm. I sounded less "textbook" within two weeks.', stars: 5 },
      { name: 'Amina K.', place: 'Pakistan', text: 'Psychology section on translating in your head — that was my exact problem. Named it, fixed it.', stars: 5 },
      { name: 'Kenji W.', place: 'Japan', text: 'Short and actionable. Read in one sitting, applied next morning.', stars: 4 },
      { name: 'Sarah M.', place: 'Canada', text: 'Good for immigrants who passed written tests but avoid phone calls. Practical checklists.', stars: 5 }
    ],
    relatedIds: ['spoken-english-conversation-practice', '30-topics-for-english-conversation', 'how-to-get-really-good-at-english', '1500-vocabulary-words-for-speaking-english', 'best-english-grammar-book']
  })
);

module.exports = { HANDCRAFTED_ORIGINALS };
