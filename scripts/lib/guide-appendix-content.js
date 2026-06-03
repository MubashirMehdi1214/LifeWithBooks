/**
 * Rich appendix blocks appended to thin Gemini PDFs (LifeWithBooks originals).
 */
const { descriptionToBlocks } = require('./book-to-pdf-blocks');

function repeatItems(title, items, chunkSize) {
  const blocks = [{ type: 'h2', text: title }];
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    blocks.push({
      type: 'p',
      text: chunk.map((x, j) => `${i + j + 1}. ${x}`).join('\n')
    });
  }
  return blocks;
}

const PREP_EXERCISES = [
  'I am interested ___ learning English. (in)',
  'She arrived ___ Monday morning. (on)',
  'We met ___ the airport. (at)',
  'He has lived here ___ 2020. (since)',
  'The report is ___ the manager\'s desk. (on)',
  'She is good ___ mathematics. (at)',
  'Thank you ___ your help. (for)',
  'I agree ___ your point. (with)',
  'They walked ___ the bridge. (across)',
  'We talked ___ the phone for an hour. (on)',
  'She is afraid ___ spiders. (of)',
  'He apologized ___ being late. (for)',
  'This book belongs ___ me. (to)',
  'We succeeded ___ finishing on time. (in)',
  'She depends ___ public transport. (on)',
  'I look forward ___ meeting you. (to)',
  'He insisted ___ paying the bill. (on)',
  'They laughed ___ the joke. (at)',
  'She specializes ___ international law. (in)',
  'We waited ___ the bus for twenty minutes. (for)',
  'The picture hangs ___ the wall. (on)',
  'She is ___ home now. (at)',
  'We travel ___ train when possible. (by)',
  'He jumped ___ the swimming pool. (into)',
  'The cat hid ___ the sofa. (under)',
  'She stood ___ me in the queue. (behind)',
  'The office is ___ the bank and the library. (between)',
  'They discussed the plan ___ detail. (in)',
  'I will see you ___ the weekend. (at / on — both common)',
  'She has worked here ___ three years. (for)',
  'We drove ___ the tunnel. (through)',
  'He fell ___ the stairs. (down)',
  'The bird flew ___ the roof. (over)',
  'She is ___ charge of the project. (in)',
  'We agreed ___ a new deadline. (on)',
  'He is married ___ a doctor. (to)',
  'She complained ___ the noise. (about)',
  'I ran ___ an old friend yesterday. (into)',
  'They voted ___ the proposal. (for)',
  'We need to focus ___ quality first. (on)'
];

const MEETING_PHRASES = [
  'Thank you all for joining today.',
  'Let\'s get started — we have a full agenda.',
  'The purpose of this meeting is to review progress.',
  'Could I have your attention for a moment?',
  'Before we begin, does anyone have urgent items?',
  'I\'d like to hand over to Sarah for the next section.',
  'As you can see from the slide, sales increased last quarter.',
  'The main takeaway from this data is...',
  'Does anyone have questions so far?',
  'If I understand correctly, you\'re suggesting...',
  'Could you clarify what you mean by that?',
  'That\'s a fair point — let me address it.',
  'I see what you mean, and I partly agree.',
  'I\'m not sure I follow — could you give an example?',
  'Let me play devil\'s advocate for a second.',
  'We may need more time to decide on this.',
  'Can we table this and return to it later?',
  'I propose we move forward with option B.',
  'Are we all aligned on the next steps?',
  'Let me summarize what we\'ve agreed.',
  'The action item for me is to send the report by Friday.',
  'Who will take ownership of the follow-up?',
  'We\'re running short on time — let\'s prioritize.',
  'I\'ll circulate the minutes after the call.',
  'Thanks everyone — that\'s all for today.',
  'Could we schedule a follow-up next week?',
  'I\'d like to push back on that timeline slightly.',
  'From a budget perspective, we need to be careful.',
  'The risk here is delayed delivery.',
  'We should loop in the legal team before signing.',
  'Let\'s take this offline and discuss separately.',
  'I\'m happy to volunteer for that task.',
  'We need a concrete deadline, not a rough estimate.',
  'Can everyone confirm they received the document?',
  'I\'ll share my screen for the demo.',
  'Sorry — you were breaking up. Could you repeat that?',
  'Let\'s mute if we\'re not speaking.',
  'I agree with the general direction.',
  'We don\'t have enough data to decide yet.',
  'That aligns with what we discussed last month.',
  'I\'ll flag this as a blocker in the tracker.'
];

const CONVERSATION_TOPICS = [
  'Daily routines and time management',
  'Favorite foods and cooking habits',
  'Travel experiences and dream destinations',
  'Work, study and career goals',
  'Technology and social media use',
  'Health, fitness and sleep',
  'Movies, music and entertainment',
  'Family traditions and celebrations',
  'Environmental issues and recycling',
  'Learning languages and study tips',
  'Friendship and social life',
  'Money, saving and budgeting',
  'Hobbies and creative projects',
  'News and current events (neutral topics)',
  'Childhood memories',
  'City life versus countryside',
  'Public transport and commuting',
  'Shopping online versus in stores',
  'Stress and relaxation methods',
  'Future plans for the next five years'
];

const TECH_VOCAB = [
  'assembly line — a manufacturing process where parts are added in sequence',
  'calibration — setting equipment to accurate measurement standards',
  'circuit board — flat board connecting electronic components',
  'compressor — device that increases gas pressure',
  'corrosion — gradual damage to metal from chemical reaction',
  'diagnostic — test or tool used to identify faults',
  'efficiency rating — measure of how well a system uses energy',
  'fault tolerance — ability to keep working when parts fail',
  'gear ratio — relationship between rotating speeds in machinery',
  'hydraulic — systems using liquid under pressure to move parts',
  'insulation — material that reduces heat or electrical transfer',
  'junction box — enclosure for electrical connections',
  'kilowatt-hour — unit of electrical energy consumption',
  'load capacity — maximum weight or force a structure can bear',
  'maintenance schedule — planned intervals for service and checks',
  'non-conductive — material that does not carry electricity',
  'operating manual — document explaining how to use equipment',
  'prototype — first working model of a new design',
  'quality assurance — processes ensuring products meet standards',
  'resistance — opposition to electrical current flow',
  'specification sheet — detailed list of product requirements',
  'torque — twisting force applied to rotate an object',
  'upstream / downstream — earlier or later stages in a process',
  'voltage — electrical force that drives current',
  'warranty period — time during which repairs are covered',
  'yield — percentage of acceptable output from production',
  'zero defect — quality goal of no faulty items',
  'batch number — code identifying a production group',
  'conveyor belt — moving surface transporting items',
  'decommission — take equipment out of service safely'
];

const VOCAB_UNITS = [
  'achievement, accomplish, milestone, setback, perseverance',
  'ambiguous, clarify, precise, vague, interpret',
  'benefit, drawback, advantage, trade-off, consequence',
  'collaborate, coordinate, delegate, contribute, facilitate',
  'diverse, homogeneous, inclusive, representative, demographic',
  'emphasize, highlight, understate, exaggerate, convey',
  'feasible, viable, impractical, realistic, ambitious',
  'genuine, authentic, artificial, sincere, deceptive',
  'hypothesis, evidence, conclude, assume, verify',
  'implement, execute, postpone, initiate, abandon',
  'justify, rationalize, defend, criticize, acknowledge',
  'keen, enthusiastic, reluctant, indifferent, passionate',
  'legitimate, valid, questionable, lawful, ethical',
  'moderate, extreme, gradual, sudden, substantial',
  'notion, concept, perception, misconception, insight',
  'objective, subjective, impartial, biased, neutral',
  'persistent, consistent, sporadic, intermittent, steady',
  'qualify, meet requirements, eligible, exempt, comply',
  'reluctant, willing, eager, hesitant, determined',
  'significant, negligible, minor, major, noteworthy'
];

const GRAMMAR_POINTS = [
  'Present simple for habits and facts: She works in IT. Water boils at 100°C.',
  'Present continuous for now and temporary situations: I am studying for an exam this week.',
  'Past simple for completed past actions: We finished the project yesterday.',
  'Past continuous for background actions: It was raining when I left.',
  'Present perfect for life experience and recent past with present relevance: I have visited London twice.',
  'Present perfect continuous for duration until now: She has been learning English for three years.',
  'Future with will for decisions and predictions: I think it will rain tomorrow.',
  'Future with going to for plans: We are going to launch the app next month.',
  'First conditional for real possibilities: If you study daily, you will improve.',
  'Second conditional for hypothetical present: If I had more time, I would travel more.',
  'Third conditional for past hypotheticals: If we had left earlier, we would have arrived on time.',
  'Modal must for strong obligation: You must wear safety equipment.',
  'Modal should for advice: You should review your notes before the test.',
  'Modal might for possibility: The meeting might be delayed.',
  'Passive voice when agent is unknown or unimportant: The report was approved yesterday.',
  'Relative clauses with who/which/that: The engineer who led the team received an award.',
  'Reported speech backshift: She said she was tired.',
  'Articles: a/an for first mention; the for known items; zero article for general plural nouns.',
  'Countable vs uncountable: many ideas / much information.',
  'Gerunds after certain verbs: I enjoy reading; He avoided answering.'
];

function studyPlanBlocks(topic) {
  return [
    { type: 'h2', text: 'Four-Week Study Plan' },
    { type: 'p', text: `Use this plan to study ${topic} in daily 30-45 minute sessions.` },
    { type: 'h3', text: 'Week 1 — Foundations' },
    { type: 'p', text: 'Days 1-2: Skim the guide and list unknown words. Days 3-4: Study one core chapter and summarize it in your own words. Days 5-7: Do practice exercises aloud; record yourself if possible.' },
    { type: 'h3', text: 'Week 2 — Active Practice' },
    { type: 'p', text: 'Days 8-10: Focus on your weakest section; redo examples without looking. Days 11-12: Explain the material to a friend or aloud alone. Days 13-14: Mixed review from all sections.' },
    { type: 'h3', text: 'Week 3 — Real Usage' },
    { type: 'p', text: 'Days 15-17: Use new language in real tasks. Days 18-19: Read or listen to authentic English on the same topic. Days 20-21: Write 300 words applying what you learned.' },
    { type: 'h3', text: 'Week 4 — Consolidation' },
    { type: 'p', text: 'Days 22-24: Timed practice under exam or workplace conditions. Days 25-26: Fix weak areas using notes and answer keys. Days 27-28: Final review before moving to advanced material.' }
  ];
}

function appendixForBook(book) {
  const id = book.id;
  const blocks = [
    { type: 'h2', text: 'Extended Study Material' },
    {
      type: 'p',
      text: 'The following sections were prepared by Mubashir Mehdi for LifeWithBooks to supplement this guide with additional explanations, examples and practice. Work through them after reading the main chapters.'
    },
    ...descriptionToBlocks(book.description)
  ];

  if (/preposition|fundamentals|macmillan|practical-english-usage/i.test(id)) {
    blocks.push(...repeatItems('Preposition and Grammar Drills', PREP_EXERCISES, 10));
    blocks.push(...repeatItems('Grammar Reference Notes', GRAMMAR_POINTS, 5));
  }

  if (/vocabulary|longman|mcgraw|1500|black-book/i.test(id)) {
    blocks.push(...repeatItems('Topic Vocabulary Sets', VOCAB_UNITS, 5));
    blocks.push({
      type: 'h2',
      text: 'Collocation Practice'
    });
    blocks.push({
      type: 'p',
      text: 'Match the verb to the natural noun partner:\n\nmake — a decision, progress, a mistake, an effort\n\ndo — homework, research, your best, damage\n\ntake — a break, responsibility, notes, action\n\nhave — a meeting, an impact, fun, difficulty\n\ngive — advice, a presentation, permission, feedback\n\npay — attention, a compliment, the bill, a visit\n\nkeep — a promise, calm, records, in touch\n\nbreak — a habit, the news, a record, the law'
    });
  }

  if (/conversation|spoken|talk-english|30-topics|meetings|mcgraw/i.test(id)) {
    blocks.push(...repeatItems('Conversation Topic Prompts', CONVERSATION_TOPICS, 5));
    blocks.push({
      type: 'h2',
      text: 'Sample Dialogues'
    });
    blocks.push({
      type: 'p',
      text: 'Dialogue A — At work\n\nA: Do you have a minute to discuss the timeline?\nB: Sure. I think we can finish by Friday if we prioritize testing.\nA: What risks should we mention in the report?\nB: Mainly delivery delays and budget limits.\n\nDialogue B — Daily life\n\nA: Have you tried the new cafe on Main Street?\nB: Not yet. Is the food any good?\nA: Yes, especially the soups. It is quiet enough to study there.\nB: Want to go tomorrow after class?\n\nDialogue C — Phone call\n\nA: Hi, this is Ali from Bright Solutions. Is Maria available?\nB: She is in a meeting until three. Can I take a message?\nA: Please ask her to call me back regarding the invoice.\nB: Of course. I will let her know.'
    });
  }

  if (/meetings|business|technical/i.test(id)) {
    blocks.push(...repeatItems('Professional Meeting Phrases', MEETING_PHRASES, 10));
  }

  if (/technical-english/i.test(id)) {
    blocks.push(...repeatItems('Technical Vocabulary', TECH_VOCAB, 6));
    blocks.push({
      type: 'h2',
      text: 'Describing a Process'
    });
    blocks.push({
      type: 'p',
      text: 'Use sequencers when explaining technical procedures: First, ensure the power supply is disconnected. Next, remove the access panel using the approved screwdriver. Then, inspect the circuit board for visible damage. After that, replace any faulty components according to the specification sheet. Finally, reassemble the unit and run a diagnostic test before returning it to service.\n\nPractice: Write a six-step procedure for a task you know (installing software, changing a tire, preparing a lab sample).'
    });
  }

  if (/phonetics|pronunciation/i.test(id)) {
    blocks.push({
      type: 'h2',
      text: 'Minimal Pairs for Pronunciation'
    });
    blocks.push({
      type: 'p',
      text: 'Say each pair clearly. Record yourself and compare with dictionary audio.\n\nship / sheep | bit / beat | full / fool | cap / cup | fan / van\nthink / sink | three / free | west / vest | piece / bees | cat / cut\nwork / walk | bird / board | hat / hot | pool / pull | thin / tin\n\nPractice sentence: The ship sailed past the deep sheep field near the cheap chip shop.'
    });
    blocks.push({
      type: 'h2',
      text: 'Word Stress Patterns'
    });
    blocks.push({
      type: 'p',
      text: 'Two-syllable nouns often stress the first syllable: TA-ble, PIC-ture, MOR-ning.\nTwo-syllable verbs often stress the second: re-CORD, pre-SENT, con-DUCT.\nSuffixes change stress: -tion (informa-TION), -ic (pho-TO-graph-ic), -ity (uni-ver-SI-ty).\n\nDrill: photograph (noun) vs photograph (verb) — PHO-to-graph vs photo-GRAPH.'
    });
  }

  if (/english-unlimited|how-to-get|learn-how|ielts/i.test(id)) {
    blocks.push({
      type: 'h2',
      text: 'CEFR Level Self-Check'
    });
    blocks.push({
      type: 'p',
      text: 'A2: I can handle simple exchanges about familiar topics.\nB1: I can describe experiences, events, dreams and ambitions.\nB2: I can interact with fluency and produce clear detailed text on many subjects.\nC1: I can express myself fluently without much obvious searching for words.\n\nRate yourself honestly on speaking, writing, listening and reading. Study at the level that challenges you without overwhelming you.'
    });
  }

  blocks.push({
    type: 'h2',
    text: 'Extended Reading Passage'
  });
  blocks.push({
    type: 'p',
    text: 'Read aloud once for gist, then again for vocabulary. Underline five new words and write your own summary paragraph.\n\nEffective language learning depends on consistent exposure and active use. Many learners spend years studying grammar rules without speaking regularly, which creates a gap between knowledge and performance. Research suggests that daily contact with meaningful input — podcasts, articles, conversations, films with subtitles — builds the mental patterns needed for fluent speech. Output matters too: writing short paragraphs, recording yourself, and joining discussions force your brain to retrieve vocabulary under time pressure, which strengthens long-term memory.\n\nAnother key factor is error tolerance. Advanced speakers make mistakes; the goal is communication, not perfection. Keep a personal error log: note recurring problems (prepositions, articles, word order) and review them weekly. Pair study with real tasks — emails, presentations, travel — so new language serves a purpose. Finally, set measurable goals: learn twenty collocations this month, hold a ten-minute conversation twice a week, or finish one graded reader. Small, steady progress beats occasional marathon sessions.'
  });

  blocks.push({
    type: 'h2',
    text: 'Error Correction Exercises'
  });
  blocks.push({
    type: 'p',
    text: 'Find and fix the mistake in each sentence. Answers are in parentheses.\n\n1. She don\'t like spicy food. (doesn\'t)\n2. I have been to Paris last year. (went — specific past time)\n3. He is more taller than his brother. (taller — remove more)\n4. We discussed about the problem. (discussed the — no about)\n5. She suggested me to apply. (suggested that I apply)\n6. I am agree with you. (I agree)\n7. He explained me the rules. (explained the rules to me)\n8. The informations are useful. (information — uncountable)\n9. I look forward to meet you. (to meeting)\n10. She is married with a lawyer. (married to)\n11. I have a news for you. (some news — uncountable)\n12. He did a mistake. (made a mistake)\n13. We must to finish today. (must finish)\n14. She is boring of the lecture. (bored by / bored with)\n15. I am here since three hours. (have been here for)\n16. He said that he will come. (would come — reported speech)\n17. The children is playing outside. (children are)\n18. I am used to wake up early. (used to waking up)\n19. She is responsible of the team. (responsible for)\n20. We need discuss this later. (need to discuss)'
  });

  blocks.push({
    type: 'h2',
    text: 'Sentence Building Practice'
  });
  blocks.push({
    type: 'p',
    text: 'Combine the prompts into full sentences. Example: [weather / bad / stay home] -> Because the weather was bad, we decided to stay home.\n\n1. [deadline / tight / work / weekend]\n2. [not familiar / software / ask / colleague]\n3. [train / delayed / arrive / late]\n4. [research / shows / exercise / improves / memory]\n5. [although / tired / finish / assignment]\n6. [if / more time / learn / second language]\n7. [manager / praised / team / hard work]\n8. [before / presentation / rehearse / twice]\n9. [customer / complained / slow / service]\n10. [since / moved / city / made / friends]\n11. [unless / study / regularly / forget / vocabulary]\n12. [despite / rain / match / continued]\n13. [recommend / book / anyone / interested / history]\n14. [while / waiting / bus / read / article]\n15. [as soon as / hear / news / call / me]'
  });

  if ((book.pageCount || 99) < 7) {
    blocks.push({
      type: 'h2',
      text: 'Additional Vocabulary Builder'
    });
    blocks.push({
      type: 'p',
      text: VOCAB_UNITS.map((line, i) => `Set ${i + 1}: ${line}`).join('\n\n')
    });
    blocks.push({
      type: 'h2',
      text: 'Writing Prompts'
    });
    blocks.push({
      type: 'p',
      text: 'Write 120-150 words for each prompt.\n\n1. Describe your ideal study routine and explain why it would work.\n2. Compare online learning with classroom learning from your experience.\n3. Explain a technical or work process you know well, step by step.\n4. Write an email requesting a meeting to discuss a project update.\n5. Describe a challenge you overcame when learning English and what you learned from it.'
    });
  }

  blocks.push(...studyPlanBlocks(book.title));

  blocks.push({ type: 'h2', text: 'About LifeWithBooks' });
  blocks.push({
    type: 'p',
    text: 'LifeWithBooks (lifewithbooks.co) is a free library of classic literature, language guides and educational PDFs for readers worldwide. This guide was written for learners who want practical, accessible material. Share the link with classmates; please credit LifeWithBooks when sharing files online.'
  });

  return blocks;
}

module.exports = { appendixForBook };
