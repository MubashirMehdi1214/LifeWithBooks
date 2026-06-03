/* CSS PMS English Essay Guide — chapters 1, 2, 5, 6 */
const { ESSAYS_PART1 } = require('./essays-part1');
const { ESSAYS_PART2 } = require('./essays-part2');

const CHAPTER_BLOCKS = [
  { type: 'h2', text: 'Chapter 1: What CSS Examiners Want' },
  {
    type: 'p',
    text: `The CSS English Essay is not a test of how much you know. It is a test of how clearly you argue under pressure. Federal Public Service Commission (FPSC) examiners mark hundreds of scripts in a week; they reward structure, relevance, and controlled language. Understanding the split between Content, Expression, and Style is the difference between a script that feels "hardworking" and one that scores Band A.

FPSC marking (conceptual split used by coaches and successful candidates): Content carries roughly 40%. This is thesis, relevance to the topic, depth of argument, use of examples, and balance (not one-sided ranting). Expression carries about 30%: grammar, sentence control, paragraph unity, precis skills in the compulsory paper, and readability. Style carries about 30%: introduction and conclusion quality, transitions, appropriate register, and confidence without ornamentation. You can write a beautiful sentence that scores zero on content if it does not advance the argument.

What separates Band A from Band C: Band A scripts open with a clear position, sustain it, and end with feasible recommendations tied to Pakistan. Band C scripts list facts without analysis ("Pakistan has corruption, inflation, pollution...") or drift off-topic in paragraph three. Band A candidates outline for ten minutes; Band C candidates start writing immediately and repeat the introduction in different words.

Three fatal mistakes ninety percent of candidates make: (1) No outline — they discover their real thesis in paragraph four. (2) Topic drift — a question on "water crisis" becomes an essay on "everything wrong with Pakistan." (3) Memorised blocks — imported paragraphs on CPEC, IMF, or Kashmir that do not answer the exact wording. Examiners spot paste-ins instantly.

How toppers think differently: They treat the question as a contract. Underline every keyword. If the topic says "in Pakistan," global examples support but do not replace local analysis. Toppers keep one statistics notebook (literacy, debt/GDP, TI rank, water per capita, female labour force participation) and deploy two or three accurate figures per essay, not twenty vague ones. They write for a tired examiner, not for Facebook applause.

Essay length and time: Aim for 2,500–3,000 words in three hours. That is roughly 400–500 words per hour after outlining. Plan: 15 minutes outline, 150 minutes writing (about 25 minutes per major section), 15 minutes revision. Under-length essays signal weak preparation; over-length risks an unfinished conclusion — the worst place to stop.

Common mistake with correction: A candidate wrote, "Democracy is good. Pakistan needs democracy. Many countries have democracy." Correct approach: "Pakistan's democratic project, interrupted repeatedly by martial law (1958, 1977, 1999), still produced the 1973 Constitution — yet today legislative gridlock and low trust (Gallup Pakistan surveys routinely show scepticism toward institutions) weaken accountability. Democracy here must mean deliverable local government, not only periodic elections." The second version has history, specificity, and argument.`
  },

  { type: 'h2', text: 'Chapter 2: Essay Structure' },
  {
    type: 'p',
    text: `A CSS essay is a legal brief in plain English: claim, evidence, implication, link. Master three introduction formulas, TEEL body paragraphs, three conclusion types, and fifty transitions you can deploy without sounding mechanical.

FORMULA 1 — STATISTICAL HOOK

Template: "According to [source/year], [statistic]. This reality demands [your angle] because [reason]."

Example A (Education): "According to UNESCO estimates for 2023, Pakistan's literacy rate remains near 62 percent. This reality demands a shift from enrollment slogans to learning outcomes because a nation that cannot read critically cannot govern itself competently."

Example B (Water): "The Pakistan Council of Research in Water Resources warns that per capita water availability has fallen from about 5,000 cubic metres in 1951 toward 1,000 cubic metres — the scarcity threshold. This reality demands coordinated storage and governance, not provincial blame games alone."

Example C (Economy): "With public debt exceeding 70 percent of GDP in recent fiscal data, Pakistan faces a financing constraint that politics often ignores. This reality demands export-led growth and tax reform, not repeated short-term relief packages without structural change."

FORMULA 2 — QUOTE HOOK

Use quotes sparingly; attribute correctly; interpret immediately — never drop a quote and walk away.

Example A: "Quaid-e-Azam Muhammad Ali Jinnah called for unity, faith, and discipline. In today's polarized polity, that triad is not nostalgia but a governance requirement if federal bargains on resources and security are to hold."

Example B: "As Allama Iqbal wrote of the self that must rise, Pakistan's youth bulge will either become demographic dividend or social fracture. Policy must train skills and protect merit, not preserve patronage."

Example C: "Aristotle's claim that man is a political animal reads differently in Pakistan when half the population remains under-represented in formal labour markets. Political citizenship without economic participation produces restless societies."

FORMULA 3 — RHETORICAL QUESTION

Open with one sharp question; answer it in the thesis sentence.

Example A: "Can a federation survive when water, tax, and curriculum disputes are argued in existential tones? Pakistan's answer must be institutional dialogue backed by law, not episodic anger."

Example B: "If technology creates jobs and destroys them in the same decade, who bears the cost of transition? The state, the market, and households must share retraining and safety nets."

Example C: "When press freedom rankings place Pakistan among the most dangerous environments for journalists, is democracy only a ballot ritual? Protection of speech is the test."

TEEL BODY PARAGRAPH

T — Topic sentence: one claim, no statistics yet. "Federal reform without local government empowerment will fail."

E — Explanation: why the claim holds. "Citizens experience the state at the union-council level; when delivery fails there, national slogans lose meaning."

E — Evidence: data, law, case, or historical reference accepted in CSS. PBS labour surveys, Article 140-A, 2022 flood response gaps, IMF programme conditionality — cite year where possible.

L — Link: tie back to thesis. "Therefore any essay on governance in Pakistan must treat devolution as operational, not decorative."

Complete TEEL example (Corruption): "Accountability institutions fail when investigation is selective. NAB and anti-corruption rhetoric peak before elections, yet Transparency International ranked Pakistan 133rd of 180 countries in 2023 — signalling persistent perception of abuse. High-profile recoveries rarely match the scale of informal rent extraction in permits, land, and procurement. Until prosecution is predictable rather than political, deterrence remains weak. Thus corruption is not only moral failure but a design problem in how power is supervised."

CONCLUSION TEMPLATES

Example A (Reformist): "In sum, Pakistan's path lies not in denial but in sequenced reform: credible elections, neutral prosecution, and measurable service delivery within five-year horizons voters can judge."

Example B (Balanced): "Neither utopia nor collapse is inevitable. With accurate data, disciplined fiscal choices, and education that rewards reasoning, the state can convert youth into capability rather than unrest."

Example C (Forward-looking): "The essay question will be decided in classrooms, courtrooms, and press rooms long before it is settled in slogans. Candidates who write with that seriousness deserve the services they seek to join."

50 CSS TRANSITION PHRASES

Adding information: Furthermore, Moreover, In addition, Similarly, Likewise, Equally important, Notably, It should also be noted, Another dimension is, Building on this,

Contrasting: However, Nevertheless, On the other hand, Conversely, Yet, Notwithstanding, Despite this, While it is true that, Although, In contrast,

Cause and effect: Therefore, Consequently, As a result, Hence, Thus, For this reason, Owing to, Because of this, This leads to, The outcome is,

Summarizing: In conclusion, To summarize, Overall, In short, Ultimately, Taking stock, Viewed collectively, The weight of evidence suggests, On balance, To recapitulate,

Emphasizing: Crucially, Above all, Most significantly, Indeed, Undoubtedly, It is imperative that, The central issue is, What matters most is, Decisively, Without exaggeration,`
  },

  { type: 'h2', text: 'Chapter 3: Ten Complete CSS Essays' },
  {
    type: 'p',
    text: 'Each model essay below is approximately 850 words, structured for the CSS English Essay paper. Read the essay once for argument, once for structure, then rewrite the outline from memory. Do not memorise paragraphs verbatim — examiners penalize obvious templates. Examiner notes explain Band A features.'
  },
  ...ESSAYS_PART1.map((e) => ({ type: 'essay', title: e.title, text: e.text, comment: e.comment })),
  ...ESSAYS_PART2.map((e) => ({ type: 'essay', title: e.title, text: e.text, comment: e.comment })),

  { type: 'h2', text: 'Chapter 4: CSS Vocabulary' },
  {
    type: 'p',
    text: 'Use these words actively in outlines before the exam. One strong collocation beats five dictionary definitions you cannot place. Entries use the format: word | definition | CSS example sentence.'
  },

  { type: 'h2', text: 'Chapter 5: Precis Writing' },
  {
    type: 'p',
    text: `Precis is one-third of the English paper's discipline. You reduce a passage to one-third length, in your own words, keeping the author's sequence and tone. Title, if required, must capture the gist.

Exact steps to reduce by one-third: (1) Read twice — first for theme, second for structure. (2) Count words in the original (e.g. 300 words → precis target 100). (3) Number paragraphs in the original; your precis should mirror that logic in fewer sentences. (4) Underline main ideas only — delete examples, illustrations, and repetition. (5) Draft in third person, past tense unless the passage is argumentative present. (6) Count again; cut adjectives before cutting ideas. (7) Write the title last.

Practice Passage 1 (approx. 180 words): "Parliamentary democracy in Pakistan has been interrupted by martial law but never entirely extinguished. Each restoration of civilian rule raised hopes that federalism would mature. Yet provincial grievances over resources, appointments, and policing repeatedly strain the federation. Critics argue that elites capture parties while courts face pressure. Supporters counter that voter turnout and media diversity still differentiate Pakistan from one-party states. The 18th Amendment decentralized some powers, but implementation lags in local government. Without credible local delivery, citizens see democracy as distant theatre."

Model precis (~60 words): Title: Democracy's Survival and Local Weakness. Pakistan's democracy survived coups but suffers elite capture and weak devolution despite the 18th Amendment; turnout and media sustain hope, yet citizens distrust distant institutions without local delivery.

Practice Passage 2 (approx. 170 words): "Climate change punishes Pakistan for emissions it barely produces. Glacial melt threatens Indus flows; heatwaves wreck harvests; 2022 floods displaced millions. Adaptation requires storage, early warning, and crop research. Mitigation means energy efficiency and renewables, yet coal remains politically convenient. International climate finance promises often arrive slowly. Farmers need extension services, not slogans. Cities need urban planning, not unregulated sprawl on floodplains."

Model precis (~57 words): Title: Low Emissions, High Climate Cost. Pakistan faces outsized climate harm via melt, heat, and floods; adaptation needs storage and services, mitigation needs cleaner energy, and global finance must match local planning instead of reactive disaster spending.

Common mistakes: Changing the author's conclusion; adding your opinion; wrong length; copying phrases; wrong title; writing a summary list instead of a flowing paragraph.`
  },

  { type: 'h2', text: 'Chapter 6: 30-Day Plan' },
  {
    type: 'p',
    text: `Week 1 (Foundation): Days 1–2 read Chapters 1–2; Day 3 outline three topics without writing full essays; Day 4 write one introduction per formula (9 intros total, 200 words each); Day 5 precis Passage 1 timed; Day 6 vocabulary Governance + Economic (80 words); Day 7 rest or read Dawn editorial.

Week 2 (Writing): Days 8–12 write one model essay outline + 2500-word essay alternating topics (Democracy, Climate, Education, Corruption, Economy); Day 13 peer review or self-mark against Content/Expression/Style; Day 14 precis Passage 2 + Social vocab 40 words.

Week 3 (Depth): Days 15–19 second full essay each on remaining five topics; Day 20 transition phrase drills (use 15 per essay); Day 21 timed 3-hour mock — full essay only; Day 22 analyse mock; Day 23 Environmental + Transition vocab.

Week 4 (Exam mode): Days 24–26 two timed mocks on unseen topics; Day 27 revise statistics notebook; Day 28 rewrite weakest essay intro/conclusion only; Day 29 light precis + outline practice; Day 30 rest — sleep, route to centre, documents.

Working professionals: study 5:30–7:00 am daily; Saturday 3-hour mock; skip social media essay "hacks" unless they teach outlining. Consistency beats weekend cramming.`
  }
];

module.exports = { CHAPTER_BLOCKS };
