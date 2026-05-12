/* Book database for LifeWithBooks */
const BOOKS = [
  /* ---------------- English Learning ---------------- */
  {
    id: "longman-photo-dictionary-american-english",
    title: "LONGMAN PHOTO DICTIONARY OF AMERICAN ENGLISH",
    categories: ["english-learning-books", "vocabulary-books"],
    cover: "english",
    excerpt: "A visual reference for everyday American English vocabulary, organized into thematic chapters covering home, work, school, food, transport and more.",
    description: [
      "The Longman Photo Dictionary of American English uses real photographs to teach over 2,500 essential everyday words. Each themed unit—home, food, work, travel, health, school—pairs vocabulary with vivid images so learners can connect new words to real situations.",
      "Inside every chapter you will find labelled photos, short model dialogues and practice activities for listening, speaking and writing. The contextual layout helps learners pick up vocabulary in natural clusters rather than isolated lists.",
      "Suitable for beginners through to advanced students, it works equally well in the classroom or for self-study. A complete word index and category lists at the back make it easy to look up any term quickly."
    ]
  },
  {
    id: "english-unlimited",
    title: "English Unlimited",
    categories: ["english-learning-books"],
    cover: "english",
    excerpt: "A communicative course that develops practical English skills for international communication at every CEFR level.",
    description: [
      "English Unlimited is a six-level adult English course built around practical, real-world communication. The lessons focus on everyday situations such as travel, work, study and socialising.",
      "Each unit combines listening, speaking, reading, writing, grammar and vocabulary with culture and intercultural awareness pages that prepare learners for genuine international conversations.",
      "Clear self-study sections, video material and a comprehensive workbook make it equally suitable for classroom and individual learning."
    ]
  },
  {
    id: "preposition-focus-on-building-mastery",
    title: "Preposition Focus on Building Mastery",
    categories: ["english-learning-books", "grammar-books"],
    cover: "english",
    excerpt: "Master English prepositions with clear rules, examples and targeted practice exercises.",
    description: [
      "Prepositions are one of the trickiest areas of English grammar. This guide breaks them down into simple categories — time, place, movement and abstract relationships — with hundreds of natural example sentences.",
      "Each chapter introduces a small set of prepositions, explains their typical uses, points out common mistakes and gives focused exercises with full answers.",
      "Ideal for intermediate learners who want to stop guessing and start using prepositions with confidence."
    ]
  },
  {
    id: "technical-english",
    title: "Technical English",
    categories: ["english-learning-books", "business-books"],
    cover: "english",
    excerpt: "Build the specialised vocabulary and skills needed for engineering, IT and technical workplaces.",
    description: [
      "Technical English is designed for students and professionals working in engineering, electronics, mechanics and information technology. It introduces the core vocabulary, grammar and communication patterns used in technical fields.",
      "Each unit features authentic technical texts, listening activities, diagrams and case-style tasks that mirror real workplace situations.",
      "The book pairs language work with practical skills such as describing components, explaining processes, writing reports and giving short technical presentations."
    ]
  },
  {
    id: "english-for-meetings-phrases-expressions",
    title: "English for Meetings — Phrases, Expressions and One Case to Be Fluent in Meetings",
    categories: ["english-learning-books", "business-books"],
    cover: "business",
    excerpt: "Ready-made phrases and expressions for confident participation in English-language business meetings.",
    description: [
      "This compact guide gives you the exact language native speakers use in meetings — for opening, agreeing, disagreeing, interrupting politely, summarising and closing.",
      "Phrases are grouped by function and presented with short example dialogues so you can drop them straight into your next meeting.",
      "An extended case study at the end lets you see all the expressions working together in a realistic business situation."
    ]
  },
  {
    id: "mcgraw-hill-conversational-american-english",
    title: "McGraw-Hill Conversational American English",
    categories: ["english-learning-books"],
    cover: "english",
    excerpt: "Speak natural, idiomatic American English using the most common patterns and expressions.",
    description: [
      "Conversational American English from McGraw-Hill focuses on the spoken language Americans actually use every day — at home, at work, on the phone and online.",
      "It covers contractions, reductions, slang, idioms and the small talk patterns that learners often miss in traditional textbooks.",
      "Audio-style dialogues, role-plays and pronunciation tips help you sound natural and understand fast native speech."
    ]
  },
  {
    id: "english-vocabulary-in-use-upper-intermediate",
    title: "English Vocabulary in Use — Upper Intermediate",
    categories: ["english-learning-books", "vocabulary-books"],
    cover: "vocabulary",
    excerpt: "100 two-page units of upper-intermediate vocabulary with explanations on the left and practice on the right.",
    description: [
      "English Vocabulary in Use Upper-Intermediate is a self-study and classroom reference for learners who already know basic English and want to build a richer vocabulary.",
      "Each unit presents new words and expressions on the left-hand page and immediate practice exercises on the right, making it easy to study in short, focused sessions.",
      "Topics include work, study, leisure, news, technology, idioms, phrasal verbs and academic language, with a full answer key and word list."
    ]
  },
  {
    id: "practical-english-usage",
    title: "Practical English Usage",
    categories: ["english-learning-books", "grammar-books"],
    cover: "english",
    excerpt: "Michael Swan's classic A–Z reference for common English grammar and vocabulary problems.",
    description: [
      "Practical English Usage answers the questions teachers and learners ask most often about modern English. Hundreds of alphabetical entries cover grammar points, easily confused words and common mistakes.",
      "Entries are short, clearly written and full of natural example sentences, with cross-references that make it easy to navigate.",
      "It is widely used by teachers, translators and advanced learners as a trusted go-to reference."
    ]
  },
  {
    id: "spoken-english-conversation-practice",
    title: "Spoken English Conversation Practice",
    categories: ["english-learning-books"],
    cover: "english",
    excerpt: "Daily conversation practice for fluent, confident English speaking.",
    description: [
      "Spoken English Conversation Practice gives learners structured speaking material for everyday situations — greetings, shopping, travel, work, family, health and free time.",
      "Each chapter offers natural dialogues, useful patterns, vocabulary notes and pronunciation tips, followed by speaking tasks for solo or partner practice.",
      "Perfect for learners who can read and write English but freeze up when it is time to speak."
    ]
  },
  {
    id: "english-phonetics-and-phonology",
    title: "English Phonetics and Phonology — An Introduction",
    categories: ["english-learning-books"],
    cover: "english",
    excerpt: "A clear introduction to the sounds of English, stress, intonation and connected speech.",
    description: [
      "This introduction to English phonetics and phonology guides students through vowels, consonants, syllables, word stress and the music of connected speech.",
      "Every concept is explained with diagrams, transcriptions and recorded examples, then reinforced with exercises and review questions.",
      "It is an excellent starting point for language students, future teachers and anyone serious about improving English pronunciation."
    ]
  },
  {
    id: "talk-english-secret-to-speak-english",
    title: "Talk English — The Secret to Speak English",
    categories: ["english-learning-books"],
    cover: "english",
    excerpt: "A practical method for shy or stuck learners who want to start speaking English now.",
    description: [
      "Talk English shares a focused method for breaking the silence and finally speaking English with confidence, even if you have studied for years without progress.",
      "It explains the psychology of fluency, the role of input and imitation, and how to build a daily speaking routine with limited resources.",
      "Short chapters, real success stories and step-by-step action plans make it easy to follow."
    ]
  },
  {
    id: "30-topics-for-english-conversation",
    title: "30 Topics for English Conversation",
    categories: ["english-learning-books"],
    cover: "english",
    excerpt: "Thirty everyday topics with questions, vocabulary and discussion prompts.",
    description: [
      "This compact book provides 30 ready-to-use conversation topics — family, food, music, dreams, technology, money, travel and more.",
      "Each topic includes warm-up questions, key vocabulary, sample answers and follow-up discussion prompts.",
      "Use it alone with a study partner, with a tutor, or in a speaking club."
    ]
  },
  {
    id: "1500-vocabulary-words-for-speaking-english",
    title: "1500 Vocabulary Words for Speaking English",
    categories: ["english-learning-books", "vocabulary-books"],
    cover: "vocabulary",
    excerpt: "The 1,500 most useful English words for everyday speaking, grouped by topic.",
    description: [
      "1500 Vocabulary Words for Speaking English collects the highest-frequency words you need to handle everyday conversations in English.",
      "Words are organised by topic — people, places, daily routines, feelings, work, study — with simple definitions and example sentences.",
      "A perfect short, practical resource for learners who want maximum results from minimum vocabulary."
    ]
  },
  {
    id: "how-to-get-really-good-at-english",
    title: "How to Get Really Good at English",
    categories: ["english-learning-books"],
    cover: "english",
    excerpt: "A no-nonsense study plan for serious learners who want to reach a high level of English.",
    description: [
      "How to Get Really Good at English is an honest guide for learners who are tired of slow progress and want a clear path forward.",
      "It covers study habits, input choices, speaking practice, writing routines, and how to use modern tools like podcasts, audiobooks and language exchanges.",
      "Expect practical advice and weekly study plans rather than magic shortcuts."
    ]
  },
  {
    id: "learn-how-to-speak-english-fluently-7-easy-steps",
    title: "Learn How to Speak English Fluently — English Speaking Mastery in 7 Easy Steps",
    categories: ["english-learning-books"],
    cover: "english",
    excerpt: "Seven simple, step-by-step habits that move you toward fluent English speaking.",
    description: [
      "This book breaks English fluency into seven simple steps you can apply right away — from input and shadowing to thinking in English and finally speaking on demand.",
      "Each step has a clear goal, short exercises and a checklist so you always know what to do next.",
      "Ideal for intermediate learners stuck on a plateau."
    ]
  },
  {
    id: "macmillan-english-grammar-in-context-intermediate-1",
    title: "Macmillan English Grammar in Context — Intermediate (1)",
    categories: ["english-learning-books", "grammar-books"],
    cover: "grammar",
    excerpt: "Intermediate grammar presented through engaging contexts and real-world texts.",
    description: [
      "Macmillan English Grammar in Context teaches grammar through interesting topics such as science, history, nature and the arts, rather than dry isolated examples.",
      "Each unit presents a target structure, shows it working in a real text and then practises it with controlled and free exercises.",
      "Comes with a full review section and answer key."
    ]
  },
  {
    id: "fundamentals-of-english-grammar-workbook",
    title: "Fundamentals of English Grammar — Workbook",
    categories: ["english-learning-books", "grammar-books"],
    cover: "grammar",
    excerpt: "Hands-on workbook practice for all core grammar points at the intermediate level.",
    description: [
      "The Fundamentals of English Grammar Workbook gives you extra independent practice on every major grammar point taught in the main course.",
      "Exercises range from quick gap-fills to longer rewriting and editing tasks, with a clear answer key for self-checking.",
      "Use it alongside the main textbook or as a stand-alone refresher."
    ]
  },
  {
    id: "english-in-everyday-life",
    title: "English in Everyday Life",
    categories: ["english-learning-books"],
    cover: "english",
    excerpt: "Functional English for shopping, travel, work, social life and emergencies.",
    description: [
      "English in Everyday Life teaches the practical language you need outside the classroom — at the supermarket, the airport, the doctor, the bank or with new friends.",
      "Each unit centres on a real situation, with model dialogues, must-know phrases, vocabulary and cultural notes.",
      "Excellent for travellers, expats and anyone moving to an English-speaking country."
    ]
  },
  {
    id: "black-book-of-english-vocabulary",
    title: "Black Book of English Vocabulary",
    categories: ["english-learning-books", "vocabulary-books"],
    cover: "vocabulary",
    excerpt: "A high-yield vocabulary guide aimed at competitive English exam preparation.",
    description: [
      "The Black Book of English Vocabulary collects the high-frequency words tested again and again in competitive exams.",
      "Words are arranged by roots, prefixes, suffixes and themed groups so you can learn dozens at a time rather than one by one.",
      "Includes mnemonic tips, synonyms, antonyms and previous-year question practice."
    ]
  },
  {
    id: "improve-your-written-english",
    title: "Improve Your Written English",
    categories: ["english-learning-books", "grammar-books"],
    cover: "grammar",
    excerpt: "Master the essentials of grammar, punctuation and spelling for confident writing.",
    description: [
      "Improve Your Written English is a friendly, jargon-free guide to the rules every writer needs to know.",
      "It covers grammar, punctuation, spelling and common confusions, with short exercises and a chapter on style for clear, modern writing.",
      "A useful companion for students, professionals and anyone who has to write English at work."
    ]
  },
  {
    id: "best-english-grammar-book",
    title: "Best English Grammar Book — Learn English Grammar",
    categories: ["english-learning-books", "grammar-books"],
    cover: "grammar",
    excerpt: "A complete, easy-to-use English grammar reference and practice book.",
    description: [
      "This grammar book takes a learner-friendly approach: each topic is introduced with simple rules, plenty of natural examples and graded exercises.",
      "Topics include tenses, articles, conditionals, modals, reported speech, passive voice, and the most common writing problems.",
      "Equally useful as a self-study course or a classroom reference."
    ]
  },
  {
    id: "why-has-nobody-told-me-this-before",
    title: "Why Has Nobody Told Me This Before?",
    categories: ["self-grooming-books"],
    cover: "self",
    excerpt: "A practical psychology guide full of tools for everyday emotional well-being.",
    description: [
      "Why Has Nobody Told Me This Before? brings together the most useful psychology tools the author has used as a clinical psychologist.",
      "It covers everyday challenges — low mood, anxiety, self-criticism, motivation and stress — and offers practical strategies you can try the same day.",
      "Short chapters, clear diagrams and warm tone make it easy to dip in and out of whenever you need help."
    ]
  },
  {
    id: "the-power-of-your-subconscious-mind",
    title: "The Power of Your Subconscious Mind",
    categories: ["self-grooming-books"],
    cover: "self",
    excerpt: "Dr Joseph Murphy's classic on the power of belief, visualisation and the subconscious.",
    description: [
      "The Power of Your Subconscious Mind is one of the most-read self-development books of all time.",
      "Dr Joseph Murphy explains how the subconscious responds to belief, repetition and imagery, and how readers can use simple techniques to change habits, attitudes and outcomes.",
      "Filled with real stories and short, actionable affirmations."
    ]
  },
  {
    id: "surrounded-by-idiots",
    title: "Surrounded by Idiots",
    categories: ["self-grooming-books", "business-books"],
    cover: "self",
    excerpt: "Thomas Erikson's bestselling guide to understanding the four types of human behaviour.",
    description: [
      "Surrounded by Idiots presents a simple four-colour model for human behaviour: Red, Yellow, Green and Blue.",
      "Erikson explains how each type thinks, communicates and reacts under pressure, and how to adapt your style to work, sell and live more harmoniously with everyone around you.",
      "Practical, humorous and easy to apply at work and at home."
    ]
  },

  /* ---------------- French Learning ---------------- */
  {
    id: "301-expressions-pour-parler-comme-les-francais",
    title: "301 Expressions pour parler comme les Français",
    categories: ["french-learning-books"],
    cover: "french",
    excerpt: "301 idiomatic French expressions that will make you sound like a native speaker.",
    description: [
      "This pocket guide gathers 301 of the most useful French idioms and colloquial expressions, the kind you hear on the street, in films and among friends.",
      "Each entry includes a literal translation, the natural meaning, an example sentence and notes on register and usage.",
      "A fast track from textbook French to real conversation."
    ]
  },
  {
    id: "366-jours-pour-mieux-vous-exprimer-en-francais",
    title: "366 jours pour mieux vous exprimer en français",
    categories: ["french-learning-books"],
    cover: "french",
    excerpt: "A daily tip on French grammar, vocabulary or style for every day of the year.",
    description: [
      "366 jours pour mieux vous exprimer en français offers one focused tip per day to improve your written and spoken French.",
      "Topics include grammar pitfalls, vocabulary nuances, common mistakes, style choices and elegant alternatives.",
      "A perfect bedside companion for anyone who wants to refine their French little by little."
    ]
  },
  {
    id: "1600-proverbes-pour-briller",
    title: "1600 proverbes pour briller et s'amuser en société",
    categories: ["french-learning-books"],
    cover: "french",
    excerpt: "A rich collection of French proverbs to enrich your speech and writing.",
    description: [
      "This collection brings together 1600 French proverbs, sayings and aphorisms from a wide range of historical and cultural sources.",
      "Each proverb is presented with its meaning, context and, where relevant, an English equivalent.",
      "Great for advanced learners, translators and lovers of French culture."
    ]
  },
  {
    id: "les-100-fautes-de-francais-les-plus-courantes",
    title: "Les 100 fautes de français les plus courantes — et comment les corriger",
    categories: ["french-learning-books"],
    cover: "french",
    excerpt: "The 100 most common French mistakes and how to fix them for good.",
    description: [
      "Even fluent speakers make recurring mistakes in French. This book lists the top 100 errors and explains exactly why they happen.",
      "Each entry shows the wrong form, the correct form, a simple rule and an example sentence.",
      "An indispensable guide for learners aiming at intermediate or advanced fluency."
    ]
  },
  {
    id: "rick-steves-french-italian-german-phrase-book",
    title: "Rick Steves' French, Italian & German Phrase Book",
    categories: ["french-learning-books", "german-learning-books"],
    cover: "french",
    excerpt: "Travel phrases in French, Italian and German from popular travel author Rick Steves.",
    description: [
      "Rick Steves' three-in-one phrase book gives travellers the essential phrases for France, Italy and Germany in one compact volume.",
      "Topics include arrival, transport, hotels, restaurants, sightseeing, shopping and emergencies, with pronunciation hints throughout.",
      "Perfect for a multi-country European trip."
    ]
  },
  {
    id: "easy-learning-french-conversation",
    title: "Easy Learning French Conversation",
    categories: ["french-learning-books"],
    cover: "french",
    excerpt: "Collins' trusted guide to everyday French conversation.",
    description: [
      "Easy Learning French Conversation from Collins is a structured guide to building everyday spoken French.",
      "Each unit presents key phrases, sample dialogues, vocabulary and culture tips on a clear topic such as introductions, shopping or travel.",
      "Helpful pronunciation guidance and review sections support steady progress."
    ]
  },
  {
    id: "learn-french-in-a-hurry",
    title: "Learn French In A Hurry",
    categories: ["french-learning-books"],
    cover: "french",
    excerpt: "Quick-start French for travellers and beginners who are short on time.",
    description: [
      "Learn French In A Hurry compresses the essentials of French into a fast, practical short course.",
      "It introduces just enough grammar to make sentences, plus the vocabulary and phrases you will actually need on a trip.",
      "Ideal for last-minute travellers and absolute beginners."
    ]
  },
  {
    id: "practice-makes-perfect-french-pronouns-prepositions",
    title: "Practice Makes Perfect — French Pronouns and Prepositions",
    categories: ["french-learning-books"],
    cover: "french",
    excerpt: "Focused practice on two of the trickiest areas of French grammar.",
    description: [
      "French pronouns and prepositions are notoriously confusing. This workbook gives them the dedicated attention they need.",
      "Clear explanations are followed by graded exercises with a full answer key, so you can practise until the rules become second nature.",
      "Great for intermediate learners preparing for exams or aiming at fluency."
    ]
  },
  {
    id: "apprendre-a-traduire",
    title: "Apprendre à traduire",
    categories: ["french-learning-books"],
    cover: "french",
    excerpt: "A guide to learning the craft of translation between French and other languages.",
    description: [
      "Apprendre à traduire walks readers through the core skills of translation: analysis, style, register, faux amis, sentence-level decisions and revision.",
      "It uses real text excerpts and side-by-side comparisons to demonstrate what good translation looks like.",
      "An excellent introduction for students of translation and language professionals."
    ]
  },
  {
    id: "letude-pratique-de-la-langue-francaise",
    title: "L'étude pratique de la langue française",
    categories: ["french-learning-books"],
    cover: "french",
    excerpt: "Practical French study material for school-age and intermediate learners.",
    description: [
      "This classic schoolbook focuses on the practical study of French language and usage for students at the 3e and 4e school years.",
      "Topics include grammar, spelling, vocabulary, comprehension and writing practice.",
      "Useful for native-speaker school students and as a structured reference for serious French learners."
    ]
  },

  /* ---------------- German Learning ---------------- */
  {
    id: "goethe-zertifikat-c2-grosses-deutsches-sprachdiplom",
    title: "Goethe-Zertifikat C2 — Großes Deutsches Sprachdiplom, Modellsatz",
    categories: ["german-learning-books", "deutsch-books"],
    cover: "german",
    excerpt: "Official model exam for the highest level of the Goethe-Zertifikat C2.",
    description: [
      "This model exam shows the structure, task types and timing of the Großes Deutsches Sprachdiplom at C2 level.",
      "It contains full reading, listening, writing and speaking sections with marking criteria and sample answers.",
      "Essential preparation for advanced learners aiming at the highest official certificate of German."
    ]
  },
  {
    id: "goethe-zertifikat-c1-ubungssatz-01",
    title: "Goethe-Zertifikat C1 Übungssatz 01 — Kandidatenblätter, Prüferblätter",
    categories: ["german-learning-books", "deutsch-books"],
    cover: "german",
    excerpt: "Practice set for the Goethe-Zertifikat C1 exam, with candidate and examiner sheets.",
    description: [
      "This practice set mirrors the real Goethe-Zertifikat C1 exam in format, length and difficulty.",
      "It includes the full candidate sheets and the examiner sheets, plus instructions and assessment criteria.",
      "An ideal final-stage practice tool for C1 candidates."
    ]
  },
  {
    id: "goethe-zertifikat-b2-prufungsziele-testbeschreibung",
    title: "Goethe-Zertifikat B2 — Prüfungsziele, Testbeschreibung",
    categories: ["german-learning-books", "deutsch-books"],
    cover: "german",
    excerpt: "Detailed description of the goals and structure of the Goethe-Zertifikat B2 exam.",
    description: [
      "This handbook describes exactly what is tested at B2 level: the targeted competences, task types and assessment criteria.",
      "It is intended for teachers, course designers and serious candidates who want a deep understanding of the exam.",
      "A great companion to the official model and practice tests."
    ]
  },
  {
    id: "goethe-zertifikat-b2-ubungssatz-03",
    title: "Goethe-Zertifikat B2 Übungssatz 03 — Kandidaten- und Prüferblätter",
    categories: ["german-learning-books", "deutsch-books"],
    cover: "german",
    excerpt: "Third practice set for the Goethe-Zertifikat B2 exam.",
    description: [
      "Übungssatz 03 is the third official practice set for the Goethe-Zertifikat B2 exam.",
      "It contains a complete simulated exam with reading, listening, writing and speaking tasks plus the examiner sheets and marking criteria.",
      "Perfect for final exam preparation."
    ]
  },
  {
    id: "goethe-zertifikat-b1-deutschprufung",
    title: "Goethe-Zertifikat B1 — Deutschprüfung für Jugendliche und Erwachsene",
    categories: ["german-learning-books", "deutsch-books"],
    cover: "german",
    excerpt: "Official preparation book for the B1 German exam for teenagers and adults.",
    description: [
      "This book introduces the Goethe-Zertifikat B1 exam and provides a thorough overview of its modular structure.",
      "It includes practice activities for all four modules, useful study strategies and a complete sample exam.",
      "Suitable for both teenagers and adults preparing for the B1 certificate."
    ]
  },
  {
    id: "goethe-zertifikat-b1-ubungssatz-erwachsene",
    title: "Goethe-Zertifikat B1 Übungssatz Erwachsene — Kandidaten- und Prüferblätter",
    categories: ["german-learning-books", "deutsch-books"],
    cover: "german",
    excerpt: "Adult-focused practice set for the Goethe-Zertifikat B1 exam.",
    description: [
      "This practice set is the adult version of the official Goethe-Zertifikat B1 practice material.",
      "It contains a full simulated exam, the corresponding examiner sheets and detailed marking criteria.",
      "An indispensable resource for adult B1 candidates."
    ]
  },
  {
    id: "goethe-zertifikat-a2-fit-in-deutsch-2-jugendliche",
    title: "Goethe-Zertifikat A2 — Fit in Deutsch 2 für Jugendliche",
    categories: ["german-learning-books", "deutsch-books"],
    cover: "german",
    excerpt: "Teen-friendly preparation for the A2 Fit in Deutsch 2 exam.",
    description: [
      "Fit in Deutsch 2 für Jugendliche prepares teenagers for the A2 Goethe-Zertifikat exam through age-appropriate texts and topics.",
      "It walks through the exam format, gives plenty of practice and includes a full sample exam.",
      "A good fit for school-age learners with a basic foundation in German."
    ]
  },
  {
    id: "goethe-zertifikat-a2-fit-in-deutsch-2",
    title: "Goethe-Zertifikat A2 — Fit in Deutsch 2",
    categories: ["german-learning-books", "deutsch-books"],
    cover: "german",
    excerpt: "Standard preparation book for the Goethe-Zertifikat A2 Fit in Deutsch 2 exam.",
    description: [
      "This book offers a clear introduction to the A2 Fit in Deutsch 2 exam, suitable for both school and adult learners.",
      "It covers exam structure, useful strategies and includes a complete practice test with model answers.",
      "An accessible starting point for A2-level candidates."
    ]
  },
  {
    id: "goethe-zertifikat-a1-prufungsziele",
    title: "Goethe-Zertifikat A1 — Start Deutsch 1, Prüfungsziele, Testbeschreibung",
    categories: ["german-learning-books", "deutsch-books"],
    cover: "german",
    excerpt: "Goals and structure of the A1 Start Deutsch 1 exam.",
    description: [
      "This handbook lays out the goals, structure and assessment of the A1 Start Deutsch 1 exam.",
      "It is mainly aimed at teachers and course planners, but is also useful for self-directed candidates.",
      "A clear reference to what is expected at A1 level."
    ]
  },
  {
    id: "goethe-zertifikat-a1-fit-in-deutsch-1-ubungssatz-01",
    title: "Goethe-Zertifikat A1 — Fit in Deutsch 1 Übungssatz 01",
    categories: ["german-learning-books", "deutsch-books"],
    cover: "german",
    excerpt: "Practice set for the A1 Fit in Deutsch 1 youth exam.",
    description: [
      "Fit in Deutsch 1 Übungssatz 01 is a complete practice exam for young learners aiming at A1 certification.",
      "It contains candidate and examiner sheets, audio scripts and assessment criteria.",
      "Ideal classroom practice material for early teen learners of German."
    ]
  },
  {
    id: "briefe-schreiben-und-bilder-beschreiben",
    title: "Briefe schreiben und Bilder beschreiben A2 & B1",
    categories: ["german-learning-books", "deutsch-books"],
    cover: "german",
    excerpt: "Letter-writing and picture-description practice for A2 and B1 German learners.",
    description: [
      "This workbook focuses on two writing tasks that often appear in A2 and B1 German exams: writing letters and describing pictures.",
      "It provides model texts, useful phrases, common pitfalls and a wide range of practice prompts.",
      "Essential preparation for both school and adult writing exams."
    ]
  },
  {
    id: "worterbuch-der-lebensmittel",
    title: "Wörterbuch der Lebensmittel / Dictionary of Foods",
    categories: ["german-learning-books", "deutsch-books", "vocabulary-books"],
    cover: "vocabulary",
    excerpt: "Bilingual German–English dictionary of food and culinary terms.",
    description: [
      "This specialised dictionary lists food and culinary terms in German and English, side by side.",
      "It covers ingredients, dishes, cooking methods and food labels — useful for professionals in catering, translation, agriculture and the food industry.",
      "A handy reference for anyone working between German and English in food-related fields."
    ]
  },
  {
    id: "deutsch-intensiv-wortschatz-c1",
    title: "Deutsch Intensiv — Wortschatz C1",
    categories: ["german-learning-books", "deutsch-books", "vocabulary-books"],
    cover: "vocabulary",
    excerpt: "Targeted vocabulary practice for advanced learners aiming at C1 in German.",
    description: [
      "Deutsch Intensiv Wortschatz C1 is a focused vocabulary book for advanced learners.",
      "It groups topical vocabulary by theme — society, work, environment, media, culture — and follows each set with productive exercises.",
      "Perfect for C1 exam preparation and general fluency building."
    ]
  },
  {
    id: "deutsch-quiz-1-und-2-klasse",
    title: "Deutsch-Quiz 1. und 2. Klasse",
    categories: ["german-learning-books", "kids-learning-books", "deutsch-books"],
    cover: "kids",
    excerpt: "A fun German quiz book for primary school children in their first two years.",
    description: [
      "This colourful quiz book introduces young children to basic German vocabulary, grammar and spelling through short games and puzzles.",
      "Quizzes target the language skills taught in the first and second school years.",
      "A playful way to reinforce learning at home or in the classroom."
    ]
  },
  {
    id: "kinderleichte-grammatik-die-vier-falle",
    title: "Kinderleichte Grammatik — Die vier Fälle",
    categories: ["german-learning-books", "kids-learning-books", "deutsch-books", "grammar-books"],
    cover: "grammar",
    excerpt: "A child-friendly explanation of the four German cases.",
    description: [
      "Die vier Fälle simplifies the German case system — Nominativ, Akkusativ, Dativ and Genitiv — for children and beginning learners.",
      "It uses colourful diagrams, short rules and many small exercises to build confidence step by step.",
      "Equally useful for native-speaker children and adult learners of German."
    ]
  },
  {
    id: "40-grammatiklisten",
    title: "40+ Grammatiklisten",
    categories: ["german-learning-books", "deutsch-books", "grammar-books"],
    cover: "grammar",
    excerpt: "More than 40 ready-to-use grammar lists summarising key German rules.",
    description: [
      "40+ Grammatiklisten collects over forty quick reference lists for essential German grammar — verbs, prepositions, conjunctions, declensions and more.",
      "Each list fits on one or two pages and is designed for quick revision before exams or class.",
      "Perfect for teachers, tutors and self-learners."
    ]
  },
  {
    id: "grammatik-konversation-1-arbeitsblatter",
    title: "Grammatik Konversation 1 — Arbeitsblätter",
    categories: ["german-learning-books", "deutsch-books", "grammar-books"],
    cover: "grammar",
    excerpt: "Photocopiable worksheets that combine German grammar practice with conversation.",
    description: [
      "Grammatik Konversation 1 turns grammar practice into speaking practice through carefully designed worksheets.",
      "Each sheet introduces a structure and immediately puts it to work in pair and group conversation tasks.",
      "A favourite resource of many German teachers."
    ]
  },
  {
    id: "deutsche-grammatik-de-gruyter-lexikon",
    title: "Deutsche Grammatik (de Gruyter Lexikon)",
    categories: ["german-learning-books", "deutsch-books", "grammar-books"],
    cover: "grammar",
    excerpt: "Reference-style overview of German grammar from de Gruyter.",
    description: [
      "This reference work from de Gruyter provides a thorough description of German grammar with linguistic precision.",
      "It is organised alphabetically by topic for fast look-up and aimed at students, teachers and translators.",
      "A serious tool for serious learners."
    ]
  },
  {
    id: "learn-dutch-in-7-days",
    title: "Learn Dutch In 7 Days — The Ultimate Crash Course",
    categories: ["german-learning-books"],
    cover: "german",
    excerpt: "A fast-paced introduction to the basics of Dutch.",
    description: [
      "Learn Dutch In 7 Days condenses the essentials of Dutch into a one-week crash course.",
      "Each day focuses on one core area — pronunciation, basic grammar, vocabulary, travel phrases — building toward simple conversations.",
      "Ideal for travellers and curious learners who want a quick taste of Dutch."
    ]
  },
  {
    id: "teachers-grammar-book-james-williams",
    title: "The Teacher's Grammar Book — 2nd Edition",
    categories: ["english-learning-books", "grammar-books"],
    cover: "grammar",
    excerpt: "James D. Williams' clear introduction to grammar for language teachers.",
    description: [
      "The Teacher's Grammar Book is designed for language teachers who want a strong grasp of English grammar to share with students.",
      "It blends traditional grammar with modern linguistic insight and includes plenty of teaching tips and discussion questions.",
      "A trusted resource in many teacher-training programmes."
    ]
  },
  {
    id: "learn-german-fast-48-hours",
    title: "Learn German FAST — 48 Hours to Learning German",
    categories: ["german-learning-books", "deutsch-books"],
    cover: "german",
    excerpt: "A two-day crash course in essential German for absolute beginners.",
    description: [
      "Learn German FAST promises a foundation in German in just 48 hours of focused study.",
      "It covers pronunciation, key grammar, survival vocabulary and travel phrases, and ends with simple but useful sample dialogues.",
      "Not a path to fluency, but a great way to get started before a trip."
    ]
  },
  {
    id: "so-gehts-zu-b2",
    title: "So geht's zu B2 — Übungsbuch",
    categories: ["german-learning-books", "deutsch-books"],
    cover: "german",
    excerpt: "Workbook that prepares learners for the B2 German exam.",
    description: [
      "So geht's zu B2 is a workbook designed to bring learners step by step from B1 to B2 level.",
      "It includes structured practice for reading, listening, writing and speaking, plus model exam tasks.",
      "Use it alone or with a teacher as a final push toward the B2 certificate."
    ]
  },
  {
    id: "decoding-digital-leadership",
    title: "Decoding Digital Leadership",
    categories: ["business-books"],
    cover: "business",
    excerpt: "How to lead teams and organisations effectively in the digital age.",
    description: [
      "Decoding Digital Leadership examines how leadership is changing in the era of digital transformation.",
      "It looks at culture, communication, decision-making and people development in environments shaped by technology, data and constant change.",
      "Aimed at managers, founders and senior professionals."
    ]
  },
  {
    id: "public-leadership",
    title: "Public Leadership",
    categories: ["business-books"],
    cover: "business",
    excerpt: "Insights into leading effectively in the public and non-profit sectors.",
    description: [
      "Public Leadership explores what it takes to lead well in the public sector, government agencies and non-profit organisations.",
      "It covers values-based leadership, stakeholder engagement, ethics, accountability and the challenges of leading complex public systems.",
      "Recommended reading for policymakers, civil servants and community leaders."
    ]
  },

  /* ---------------- Spanish ---------------- */
  {
    id: "101-conversations-in-mexican-spanish",
    title: "101 Conversations in Mexican Spanish",
    categories: ["spanish-learning-books"],
    cover: "spanish",
    excerpt: "101 short conversations in natural Mexican Spanish to build comprehension.",
    description: [
      "101 Conversations in Mexican Spanish gives intermediate learners 101 short, natural dialogues set in everyday Mexican contexts.",
      "Each conversation features common slang, contractions and intonation patterns, with a glossary for the trickiest terms.",
      "A great bridge from textbook Spanish to the real spoken language of Mexico."
    ]
  },
  {
    id: "collins-easy-learning-complete-spanish",
    title: "Collins Easy Learning — Complete Spanish Grammar + Verbs + Vocabulary",
    categories: ["spanish-learning-books", "grammar-books"],
    cover: "spanish",
    excerpt: "Collins' three-in-one essential Spanish reference for grammar, verbs and vocabulary.",
    description: [
      "This Collins Easy Learning compilation brings together three essential Spanish references: grammar, verbs and vocabulary.",
      "Grammar topics are clearly explained with examples, verb tables cover all main tenses, and the vocabulary is organised by theme.",
      "A truly essential resource for beginner and intermediate learners of Spanish."
    ]
  },
  {
    id: "learn-how-to-speak-spanish-in-30-days",
    title: "Learn How to Speak Spanish in 30 Days",
    categories: ["spanish-learning-books"],
    cover: "spanish",
    excerpt: "A 30-day plan for going from beginner Spanish to basic conversation.",
    description: [
      "Learn How to Speak Spanish in 30 Days offers a structured month-long plan to build basic Spanish from scratch.",
      "Each day introduces new vocabulary, a grammar point and a practical speaking activity.",
      "Perfect for motivated beginners who can spend 30–60 minutes a day on Spanish."
    ]
  },
  {
    id: "spanish-language-3-in-1-bundle",
    title: "Spanish Language 3-in-1 Bundle — Spanish for Beginners",
    categories: ["spanish-learning-books"],
    cover: "spanish",
    excerpt: "Three Spanish-for-beginners books bundled into one comprehensive volume.",
    description: [
      "This three-in-one bundle brings together three popular Spanish-for-beginners titles into a single book.",
      "Together they cover pronunciation, grammar basics, essential vocabulary and survival phrases for travel and everyday life.",
      "Excellent value for absolute beginners who want a complete starter kit."
    ]
  },
  {
    id: "aprende-ingles-de-una-vez-por-todas",
    title: "Aprende inglés de una vez por todas en 10 pasos",
    categories: ["english-learning-books", "spanish-learning-books"],
    cover: "english",
    excerpt: "A ten-step plan to finally master English, written for Spanish speakers.",
    description: [
      "Aprende inglés de una vez por todas is aimed at Spanish speakers who have studied English for years without reaching fluency.",
      "It breaks down the learning process into ten clear steps, each with specific actions, study habits and recommended resources.",
      "Practical, motivating and grounded in modern language-learning research."
    ]
  },
  {
    id: "aprender-ingles-los-tiempos-verbales",
    title: "Aprender inglés — Los tiempos verbales",
    categories: ["english-learning-books", "spanish-learning-books", "grammar-books"],
    cover: "grammar",
    excerpt: "A clear guide to English verb tenses for Spanish-speaking learners.",
    description: [
      "This focused grammar book helps Spanish speakers master the English verb-tense system, which is often a major source of confusion.",
      "It compares English structures with their Spanish equivalents and offers plenty of exercises with detailed answers.",
      "An efficient way to plug a critical gap in your English."
    ]
  },
  {
    id: "curso-completo-de-ingles",
    title: "Curso Completo De Inglés",
    categories: ["english-learning-books", "spanish-learning-books"],
    cover: "english",
    excerpt: "A complete English course written in Spanish, from beginner to intermediate.",
    description: [
      "Curso Completo De Inglés is a structured English course written entirely in Spanish.",
      "It takes learners from beginner level through to upper-intermediate, with grammar, vocabulary, reading, listening and speaking exercises in every unit.",
      "A solid self-study course for serious learners."
    ]
  },
  {
    id: "500-frases-en-ingles-realmente-utiles",
    title: "500 frases en inglés realmente útiles",
    categories: ["english-learning-books", "spanish-learning-books"],
    cover: "english",
    excerpt: "500 genuinely useful English phrases with Spanish translations.",
    description: [
      "500 frases en inglés realmente útiles is a no-fluff phrase book pairing high-frequency English expressions with Spanish translations.",
      "Phrases are grouped by everyday situations — meetings, travel, shopping, dating, work — for fast practical use.",
      "Great for travellers, professionals and intermediate learners."
    ]
  },
  {
    id: "digalo-correctamente-en-ingles",
    title: "Dígalo Correctamente en Inglés",
    categories: ["english-learning-books", "spanish-learning-books"],
    cover: "english",
    excerpt: "Avoid the most common English mistakes made by Spanish speakers.",
    description: [
      "Dígalo Correctamente en Inglés focuses on the specific errors Spanish speakers tend to make in English.",
      "Each chapter explains the source of the mistake, contrasts it with correct usage and provides practice exercises.",
      "A powerful way to clean up your English."
    ]
  },
  {
    id: "gramatica-inglesa-sanchez-benedito",
    title: "Gramática Inglesa (Francisco Sánchez Benedito)",
    categories: ["english-learning-books", "spanish-learning-books", "grammar-books"],
    cover: "grammar",
    excerpt: "A comprehensive English grammar written in Spanish.",
    description: [
      "This grammar of English by Francisco Sánchez Benedito is one of the most widely used Spanish-language references on the subject.",
      "It explains English grammar systematically, with examples, comparisons to Spanish and practice exercises.",
      "Suitable as a teaching grammar or a serious self-study reference."
    ]
  },

  /* ---------------- Kids Learning ---------------- */
  {
    id: "phrasal-verb-fun",
    title: "Phrasal Verb Fun",
    categories: ["kids-learning-books", "english-learning-books"],
    cover: "kids",
    excerpt: "Playful activities that introduce children to English phrasal verbs.",
    description: [
      "Phrasal Verb Fun introduces children to the most common English phrasal verbs through cartoons, games and short stories.",
      "Each unit focuses on a small set of verbs and shows them in real, age-appropriate situations.",
      "A fun first encounter with this often-tricky area of English."
    ]
  },
  {
    id: "grammar-practice-grades-3-4",
    title: "Grammar Practice Grades 3-4",
    categories: ["kids-learning-books", "grammar-books"],
    cover: "kids",
    excerpt: "Grammar exercises designed for children in grades three and four.",
    description: [
      "Grammar Practice Grades 3-4 reinforces classroom grammar lessons with bite-sized exercises children can do alone or with a parent.",
      "Topics include parts of speech, sentence structure, punctuation and tenses.",
      "Excellent for homework support and holiday review."
    ]
  },
  {
    id: "my-english-book-one",
    title: "My English Book One",
    categories: ["kids-learning-books", "english-learning-books"],
    cover: "kids",
    excerpt: "A first English coursebook for young learners.",
    description: [
      "My English Book One introduces young children to the alphabet, basic vocabulary and simple sentence patterns.",
      "Each unit combines pictures, songs and short activities so learning feels like play.",
      "A friendly first English book for ages 5–7."
    ]
  },
  {
    id: "fairyland-pupil-book-1",
    title: "Fairyland Pupil's Book 1",
    categories: ["kids-learning-books", "english-learning-books"],
    cover: "kids",
    excerpt: "First-level English coursebook from the popular Fairyland series.",
    description: [
      "Fairyland Pupil's Book 1 is the first level in the well-known Fairyland series for very young learners of English.",
      "It uses stories, songs and characters to teach early vocabulary, language patterns and pre-literacy skills.",
      "A favourite of English teachers in primary schools around the world."
    ]
  },
  {
    id: "comprehension-student-book-4-year",
    title: "Comprehension Student Book for 4 Year",
    categories: ["kids-learning-books"],
    cover: "kids",
    excerpt: "Reading comprehension activities for four-year-olds.",
    description: [
      "This early comprehension book is aimed at four-year-old children, with short, illustrated texts and very simple questions.",
      "Activities develop listening skills, vocabulary and the foundations of independent reading.",
      "A gentle introduction to comprehension for pre-school learners."
    ]
  },
  {
    id: "complete-book-of-alphabet",
    title: "The Complete Book of Alphabet",
    categories: ["kids-learning-books"],
    cover: "kids",
    excerpt: "Letter recognition, writing and phonics in one colourful workbook.",
    description: [
      "The Complete Book of Alphabet helps children learn each letter of the alphabet through tracing, colouring, and phonics activities.",
      "Each letter has its own pages with pictures of items beginning with that sound.",
      "A great first workbook for children aged 4–6."
    ]
  },
  {
    id: "one-story-a-day",
    title: "One Story a Day",
    categories: ["kids-learning-books"],
    cover: "kids",
    excerpt: "A short illustrated story for every day of the year.",
    description: [
      "One Story a Day offers one short, illustrated story for every day of the year, perfect for bedtime reading.",
      "Stories cover a wide range of themes — friendship, animals, adventures, science and history — and are written in clear, child-friendly language.",
      "A wonderful way to build a daily reading habit."
    ]
  },
  {
    id: "initial-sounds-picture-cards",
    title: "Initial Sounds Picture Cards",
    categories: ["kids-learning-books"],
    cover: "kids",
    excerpt: "Printable picture cards for teaching initial sounds.",
    description: [
      "Initial Sounds Picture Cards provide colourful printable cards that link letters with the sounds they typically represent at the start of a word.",
      "They can be used for matching games, flashcards, sorting activities and small-group teaching.",
      "A versatile tool for phonics teachers and parents."
    ]
  },
  {
    id: "easy-english-with-games-and-activities-2",
    title: "Easy English with Games and Activities 2",
    categories: ["kids-learning-books", "english-learning-books"],
    cover: "kids",
    excerpt: "Level-two English practice through games and activities.",
    description: [
      "Easy English with Games and Activities 2 turns vocabulary and grammar practice into fun games at the elementary level.",
      "Children play their way through topics like family, food, school, animals and colours.",
      "Designed for use alone or as supplementary classroom material."
    ]
  },
  {
    id: "easy-english-with-games-and-activities-1",
    title: "Easy English with Games and Activities 1",
    categories: ["kids-learning-books", "english-learning-books"],
    cover: "kids",
    excerpt: "First-level English practice through games and activities.",
    description: [
      "Easy English with Games and Activities 1 is the first level of a popular activity-based English series for children.",
      "It introduces basic English through colouring, puzzles, matching and simple speaking games.",
      "A gentle, motivating entry point for young learners."
    ]
  },
  {
    id: "my-first-grammar-3",
    title: "My First Grammar 3",
    categories: ["kids-learning-books", "grammar-books"],
    cover: "grammar",
    excerpt: "Friendly grammar practice for children at the upper-elementary level.",
    description: [
      "My First Grammar 3 introduces children to important grammar points such as tenses, articles, plurals and prepositions.",
      "Clear explanations, colourful illustrations and short exercises make the book easy to use at home or in class.",
      "A great companion to a child's English coursebook."
    ]
  },
  {
    id: "all-in-one-reading-passages",
    title: "All in One Reading Passages",
    categories: ["kids-learning-books"],
    cover: "kids",
    excerpt: "Reading passages with comprehension questions across many topics.",
    description: [
      "All in One Reading Passages gathers short reading texts on many different themes — science, history, nature, sports, art — followed by comprehension questions.",
      "It develops both reading speed and understanding for school-age children.",
      "Excellent for daily reading practice."
    ]
  },
  {
    id: "just-for-kids-grammar",
    title: "Just for Kids — Grammar",
    categories: ["kids-learning-books", "grammar-books"],
    cover: "grammar",
    excerpt: "A grammar workbook designed entirely with young learners in mind.",
    description: [
      "Just for Kids Grammar presents the basics of grammar in a friendly, child-focused style.",
      "It includes plenty of pictures, examples drawn from a child's world and short, achievable exercises.",
      "Perfect for primary-school home practice."
    ]
  },
  {
    id: "alphabet-activities",
    title: "Alphabet Activities",
    categories: ["kids-learning-books"],
    cover: "kids",
    excerpt: "Hands-on alphabet activities for pre-school and early primary children.",
    description: [
      "Alphabet Activities is full of tracing, colouring, matching and sorting tasks to help children master the alphabet.",
      "Each letter is connected to a familiar object and a simple sound.",
      "A flexible resource for parents, tutors and early-years teachers."
    ]
  },
  {
    id: "beginning-sounds",
    title: "Beginning Sounds",
    categories: ["kids-learning-books"],
    cover: "kids",
    excerpt: "Phonics worksheets focused on the sounds at the beginning of words.",
    description: [
      "Beginning Sounds is a set of worksheets that practise hearing and writing the first sound of common words.",
      "It supports children moving from sound recognition to early reading and spelling.",
      "A useful resource for kindergarten and first-grade classrooms."
    ]
  },
  {
    id: "mindfulness-exercises-for-kids",
    title: "Mindfulness Exercises For Kids",
    categories: ["kids-learning-books", "self-grooming-books"],
    cover: "self",
    excerpt: "Simple mindfulness exercises children can do at home or at school.",
    description: [
      "Mindfulness Exercises For Kids offers short, age-appropriate activities to help children focus, relax and notice their feelings.",
      "Exercises include breathing games, body scans, mindful walking and gentle reflection prompts.",
      "Helpful for children and the adults who care for them."
    ]
  },
  {
    id: "kid-confidence",
    title: "Kid Confidence",
    categories: ["kids-learning-books", "self-grooming-books"],
    cover: "self",
    excerpt: "Help your child make friends, build resilience and develop real self-esteem.",
    description: [
      "Kid Confidence is a parenting guide that draws on modern psychology to show how to nurture genuine self-esteem in children.",
      "It explains why some popular advice can backfire and offers practical strategies for friendship, school and family life.",
      "A thoughtful resource for parents of school-age children."
    ]
  },
  {
    id: "junior-maker",
    title: "Junior Maker",
    categories: ["kids-learning-books"],
    cover: "kids",
    excerpt: "Fun maker projects that teach children to build, code and create.",
    description: [
      "Junior Maker introduces children to the maker movement with a wide range of hands-on projects.",
      "Activities span crafts, electronics, simple coding, recycling and design — each clearly explained step by step.",
      "Sparks creativity in curious children aged 8–12."
    ]
  },
  {
    id: "how-to-talk-so-kids-will-listen",
    title: "How to Talk So Kids Will Listen & Listen So Kids Will Talk",
    categories: ["kids-learning-books", "self-grooming-books"],
    cover: "self",
    excerpt: "A classic parenting guide on respectful, effective communication with children.",
    description: [
      "How to Talk So Kids Will Listen is a long-running bestseller on parent–child communication.",
      "It teaches concrete skills for handling feelings, gaining cooperation, and praising and disciplining children without resorting to threats or bribes.",
      "Decades after publication it remains a favourite of parents and teachers worldwide."
    ]
  },
  {
    id: "how-to-talk-so-kids-can-learn",
    title: "How To Talk So Kids Can Learn",
    categories: ["kids-learning-books", "self-grooming-books"],
    cover: "self",
    excerpt: "Communication skills that help teachers and parents bring out the best in children at school.",
    description: [
      "How To Talk So Kids Can Learn applies the famous communication framework to the classroom and the homework table.",
      "It shows how the way adults speak shapes children's motivation, learning and behaviour at school.",
      "Practical and full of real-life examples."
    ]
  },
  {
    id: "green-eggs-and-ham",
    title: "Green Eggs and Ham",
    categories: ["kids-learning-books", "literature-books"],
    cover: "literature",
    excerpt: "Dr. Seuss' beloved rhyming story about trying new things.",
    description: [
      "Green Eggs and Ham is one of the most famous early reader books by Dr. Seuss.",
      "Using only fifty different words, it tells the funny tale of a persistent character urging another to try a strange-looking dish.",
      "A perennial favourite for early reading and shared bedtime stories."
    ]
  },
  {
    id: "goldilocks-and-the-three-bears",
    title: "Goldilocks and the Three Bears",
    categories: ["kids-learning-books", "literature-books", "stories-books"],
    cover: "literature",
    excerpt: "The classic fairy tale retold for young readers.",
    description: [
      "Goldilocks and the Three Bears is a much-loved fairy tale about a curious girl who wanders into a cottage in the woods.",
      "This edition retells the story in clear language with friendly illustrations.",
      "A great first fairy tale for early readers."
    ]
  },
  {
    id: "25-wacky-wonderful-stories",
    title: "25 Wacky Wonderful Stories That Boost Vocabulary",
    categories: ["kids-learning-books", "vocabulary-books", "stories-books"],
    cover: "kids",
    excerpt: "Twenty-five funny stories designed to teach new vocabulary.",
    description: [
      "25 Wacky Wonderful Stories collects short, funny stories built around specific vocabulary themes.",
      "Each story is followed by a glossary and short comprehension activities.",
      "Brings vocabulary teaching to life for upper-elementary students."
    ]
  },
  {
    id: "150-totally-terrific-writing-prompts",
    title: "150 Totally Terrific Writing Prompts (Grade 2-4)",
    categories: ["kids-learning-books"],
    cover: "kids",
    excerpt: "150 creative writing prompts for students in grades 2–4.",
    description: [
      "150 Totally Terrific Writing Prompts gives young writers an idea for every day of the school year.",
      "Prompts span storytelling, opinion writing, descriptions, poetry and more.",
      "An easy way to build a daily writing habit in school or at home."
    ]
  },

  /* ---------------- Additional cross-listed ---------------- */
  {
    id: "goethe-zertifikat-b1-wortschatz",
    title: "Goethe-Zertifikat B1 — Wortschatz (Deutschprüfung)",
    categories: ["german-learning-books", "deutsch-books", "vocabulary-books"],
    cover: "vocabulary",
    excerpt: "Themed vocabulary lists for the B1 German exam.",
    description: [
      "This vocabulary companion lists the key words and expressions required for the B1 Goethe-Zertifikat exam.",
      "Words are grouped by topic and exam task type, with example sentences and notes on usage.",
      "Perfect for last-stage exam revision."
    ]
  }
];

const CATEGORIES = [
  { slug: "english-learning-books", label: "English Learning Books" },
  { slug: "novels", label: "Novels" },
  { slug: "trading-books", label: "Trading Books" },
  { slug: "french-learning-books", label: "French Learning Books" },
  { slug: "german-learning-books", label: "German Learning Books" },
  { slug: "spanish-learning-books", label: "Spanish Learning Books" },
  { slug: "deutsch-books", label: "Deutsch Books" },
  { slug: "vocabulary-books", label: "Vocabulary Books" },
  { slug: "grammar-books", label: "Grammar Books" },
  { slug: "kids-learning-books", label: "Kids Learning Books" },
  { slug: "literature-books", label: "Literature Books" },
  { slug: "business-books", label: "Business Books" },
  { slug: "self-grooming-books", label: "Self Grooming Books" },
  { slug: "adventure-books", label: "Adventure Books" },
  { slug: "stories-books", label: "Stories Books" }
];

if (typeof module !== "undefined") {
  module.exports = { BOOKS, CATEGORIES };
}
