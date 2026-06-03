/**
 * Turn books.js description + supplements into jsPDF content blocks.
 */
function descriptionToBlocks(description) {
  const blocks = [];
  if (!Array.isArray(description)) return blocks;
  description.forEach((chunk) => {
    const text = String(chunk).trim();
    if (!text) return;
    if (text.startsWith('## ')) {
      blocks.push({ type: 'h2', text: text.slice(3).trim() });
      return;
    }
    if (text.startsWith('### ')) {
      blocks.push({ type: 'h3', text: text.slice(4).trim() });
      return;
    }
    text.split(/\n\n+/).forEach((para) => {
      if (para.trim()) blocks.push({ type: 'p', text: para.trim() });
    });
  });
  return blocks;
}

function listParagraph(title, items) {
  return {
    type: 'p',
    text: title + '\n\n' + items.map((x, i) => `${i + 1}. ${x}`).join('\n')
  };
}

function phraseList(title, phrases) {
  return {
    type: 'p',
    text: title + '\n\n' + phrases.map((p) => `- ${p}`).join('\n')
  };
}

function studyPlanWeeks(topic) {
  return [
    { type: 'h2', text: 'Four-Week Study Plan' },
    { type: 'p', text: `Use this plan to study ${topic} in manageable daily sessions (30-45 minutes). Adjust pace to your level.` },
    { type: 'h3', text: 'Week 1 — Foundations' },
    { type: 'p', text: 'Days 1-2: Skim the full guide and note unknown words. Days 3-4: Study one core chapter and write a one-page summary in your own words. Days 5-7: Complete practice exercises aloud; record yourself if possible.' },
    { type: 'h3', text: 'Week 2 — Active Practice' },
    { type: 'p', text: 'Days 8-10: Focus on the hardest section for you; redo examples without looking. Days 11-12: Teach the material to a friend or explain it aloud alone. Days 13-14: Mixed review quiz from all sections so far.' },
    { type: 'h3', text: 'Week 3 — Real Usage' },
    { type: 'p', text: 'Days 15-17: Use new language in real tasks (email, conversation, presentation). Days 18-19: Read or listen to authentic English on the same topic. Days 20-21: Write 300 words applying what you learned.' },
    { type: 'h3', text: 'Week 4 — Consolidation' },
    { type: 'p', text: 'Days 22-24: Full timed practice under exam or workplace conditions. Days 25-26: Fix weak areas using the answer key and notes. Days 27-28: Final review and confidence checklist before moving to advanced material.' }
  ];
}

function supplementForBook(book) {
  const id = book.id;
  const blocks = [];

  blocks.push({ type: 'h2', text: 'How to Use This Guide' });
  blocks.push({
    type: 'p',
    text: 'This is an original LifeWithBooks study guide by Mubashir Mehdi. Read each section once for overview, then return for focused practice. Keep a notebook for new vocabulary, example sentences you want to reuse, and mistakes you want to avoid. Study little and often rather than one long session per month.'
  });

  if (/preposition|grammar|macmillan|fundamentals|practical-english-usage/i.test(id)) {
    blocks.push({ type: 'h2', text: 'Grammar Practice — Common Patterns' });
    blocks.push({
      type: 'p',
      text: 'Complete each item in your notebook. Check answers mentally using the rules in the main chapters.\n\n1. I am interested ___ learning English. (in)\n2. She arrived ___ Monday morning. (on)\n3. We met ___ the airport. (at)\n4. He has lived here ___ 2020. (since)\n5. The report is ___ the manager\'s desk. (on)\n6. She is good ___ mathematics. (at)\n7. Thank you ___ your help. (for)\n8. I agree ___ your point. (with)\n9. They walked ___ the bridge. (across)\n10. We talked ___ the phone for an hour. (on)\n11. She is afraid ___ spiders. (of)\n12. He apologized ___ being late. (for)\n13. This book belongs ___ me. (to)\n14. We succeeded ___ finishing on time. (in)\n15. She depends ___ public transport. (on)\n16. I look forward ___ meeting you. (to)\n17. He insisted ___ paying the bill. (on)\n18. They laughed ___ the joke. (at)\n19. She specializes ___ international law. (in)\n20. We waited ___ the bus for twenty minutes. (for)'
    });
  }

  if (/vocabulary|longman|mcgraw|black-book|1500/i.test(id)) {
    blocks.push(
      phraseList('High-Frequency Speaking Phrases', [
        'Could you clarify what you mean by that?',
        'In my experience, this usually works well.',
        'That is a valid point; however, we should also consider...',
        'Let me summarize the main idea in my own words.',
        'I am not entirely sure — could you give an example?',
        'From my perspective, the priority should be...',
        'That reminds me of a similar situation when...',
        'Would you mind repeating the last part?',
        'I see what you mean, and I partly agree.',
        'Let us focus on the practical next steps.',
        'The data suggests a clear trend toward...',
        'One challenge we might face is...',
        'I would recommend starting with the basics.',
        'That depends on the context and audience.',
        'To put it simply, the goal is to...',
        'I need a moment to think about that.',
        'Could we compare the advantages and disadvantages?',
        'In the long run, consistency matters most.',
        'I have been working on improving this skill.',
        'Thanks for sharing — that was helpful.'
      ])
    );
  }

  if (/conversation|spoken|talk-english|meetings|30-topics/i.test(id)) {
    blocks.push({ type: 'h2', text: 'Sample Dialogues for Practice' });
    blocks.push({
      type: 'p',
      text: 'Dialogue A — At work\n\nA: Do you have a minute to discuss the timeline?\nB: Sure. I think we can finish by Friday if we prioritize testing.\nA: Good point. What risks should we mention in the report?\nB: Mainly delivery delays and budget limits. I can draft a paragraph.\n\nDialogue B — Daily life\n\nA: Have you tried the new cafe on Main Street?\nB: Not yet. Is the food any good?\nA: Yes, especially the soups. It is quiet enough to study there too.\nB: Sounds perfect. Want to go tomorrow after class?\n\nDialogue C — Travel\n\nA: Excuse me, how do I get to the museum from here?\nB: Take the green line two stops, then walk five minutes north.\nA: Do I need to change trains?\nB: No, it is a direct ride. The stop is called Heritage Square.'
    });
    blocks.push(
      listParagraph('Discussion Questions (answer aloud)', [
        'What skill do you want to improve most this month?',
        'Describe a book or film that changed your opinion.',
        'How do you handle stress before an important exam?',
        'What would you do if you had an extra free hour each day?',
        'Which country would you visit for language practice and why?',
        'What is the best advice you have received about learning?',
        'How has technology changed the way you study?',
        'What habit helps you stay motivated when progress feels slow?',
        'Describe a teacher or mentor who influenced you.',
        'What topic could you talk about for ten minutes without preparation?'
      ])
    );
  }

  if (/phonetics|pronunciation/i.test(id)) {
    blocks.push({ type: 'h2', text: 'Minimal Pairs for Pronunciation Drills' });
    blocks.push({
      type: 'p',
      text: 'Say each pair clearly. Record yourself and compare with a dictionary audio.\n\nship / sheep | bit / beat | full / fool | cap / cup | fan / van\nthink / sink | three / free | west / vest | piece / bees | cat / cut\nwork / walk | bird / board | hat / hot | pool / pull | thin / tin\nPractice sentence: The ship sailed past the deep sheep field near the cheap chip shop.'
    });
  }

  if (/technical-english|meetings|business/i.test(id)) {
    blocks.push(
      phraseList('Professional Email and Meeting Phrases', [
        'Thank you for your prompt response.',
        'Please find the updated document attached.',
        'Could we schedule a brief call to align on next steps?',
        'I wanted to follow up on our conversation yesterday.',
        'Let me know if you need any further clarification.',
        'As discussed, the deadline remains next Wednesday.',
        'I suggest we table this item until we have more data.',
        'From a technical perspective, the main constraint is...',
        'We need to escalate this issue to the project lead.',
        'The root cause appears to be a configuration error.',
        'I will circulate the meeting minutes by end of day.',
        'Are we aligned on the action items?',
        'I propose we run a pilot before full deployment.',
        'The metrics show improvement compared to last quarter.',
        'Please loop in the finance team before we finalize.'
      ])
    );
  }

  if (/ielts|learn-how|how-to-get|english-unlimited/i.test(id)) {
    blocks.push({ type: 'h2', text: 'Self-Study Checklist' });
    blocks.push({
      type: 'p',
      text: 'Before you finish this guide, confirm you can: explain the main ideas without reading; use at least twenty new words in original sentences; complete one timed practice task; identify three personal errors you will watch for; plan the next resource you will study. If any item is difficult, revisit that chapter and add one extra day of practice.'
    });
  }

  blocks.push(...studyPlanWeeks(book.title));

  blocks.push({ type: 'h2', text: 'About LifeWithBooks' });
  blocks.push({
    type: 'p',
    text: 'LifeWithBooks (lifewithbooks.co) is a free library of classic literature, language guides and educational PDFs for readers worldwide. This guide was written for learners who want practical, accessible material without paywalls. Share the link with classmates and colleagues; please credit LifeWithBooks when sharing files online.'
  });

  return blocks;
}

function buildBlocksForBook(book) {
  return [
    ...descriptionToBlocks(book.description),
    ...supplementForBook(book)
  ];
}

function introForBook(book) {
  const author = book.author || 'Mubashir Mehdi';
  return [
    {
      heading: 'About This Guide',
      text: (book.excerpt || book.title) + ' This expanded PDF edition combines structured explanations, examples and practice material for self-study. Author: ' + author + '. Publisher: LifeWithBooks.'
    },
    {
      heading: 'Who This Book Is For',
      text: 'Intermediate learners, university students, professionals and self-study readers who want clear English they can use in conversation, writing and exams. No prior teacher is required if you follow the study plan at the end of this guide.'
    }
  ];
}

module.exports = {
  descriptionToBlocks,
  buildBlocksForBook,
  introForBook
};
