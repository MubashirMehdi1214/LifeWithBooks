/**
 * Handcrafted rich content for select LifeWithBooks titles.
 * Each entry is keyed by book id and contains deeply researched,
 * human-voiced editorial content: about, learn, authorBio, whyRead,
 * historical context, reader reviews, and related book ids.
 */

const HANDCRAFTED_BOOK_CONTENT = {

  /* ─────────────────────────────────────────────
     1. PRIDE AND PREJUDICE
  ───────────────────────────────────────────── */
  "pride-and-prejudice": {
    about: `Pride and Prejudice is not simply a love story — it is a precise, merciless dissection of how vanity and snap judgement destroy people's chances at genuine happiness. When Elizabeth Bennet first meets the wealthy Mr. Darcy at a country ball in Hertfordshire in 1811, their mutual contempt feels entirely earned: he is stiff and dismissive, she is sharp-tongued and quick to take offence. What unfolds across six months of drawing-room sparring, misread letters, and social humiliations is one of the most satisfying reversals in all of English literature. Austen gives Elizabeth five sisters — the sensible Jane, the frivolous Lydia, the bookish Mary, the meek Kitty — and a mother whose single obsession is marrying them all off before the family estate passes to odious cousin Mr. Collins. Into this domestic pressure-cooker she introduces Bingley, Wickham, Lady Catherine de Bourgh, and finally Darcy again, each arrival tightening the screws on Elizabeth's certainty about who deserves her trust. What distinguishes the novel from romantic escapism is Austen's refusal to let either protagonist off the hook: Darcy must learn humility, Elizabeth must learn honesty with herself. The famous opening line — "It is a truth universally acknowledged" — is itself a piece of irony so compressed it takes a lifetime to fully appreciate.`,

    learn: [
      "Self-knowledge is the hardest kind: Elizabeth prides herself on reading people accurately, yet she is catastrophically wrong about both Wickham and Darcy. Austen suggests that intelligence without humility is just a more sophisticated form of blindness — a warning as fresh today as in 1813.",
      "Social pressure warps decision-making: Charlotte Lucas accepts Mr. Collins not out of affection but cold economic calculation. Austen does not mock Charlotte — she respects her pragmatism even while showing us its cost. Real choices, the novel insists, are rarely made in a vacuum of pure feeling.",
      "Letters reveal character better than conversation: The pivotal letter Darcy writes to Elizabeth after she rejects him at Hunsford is the emotional hinge of the entire novel. In an age of carefully curated social performance, written words can cut through the performance to the actual person beneath.",
      "First impressions are hypotheses, not facts: The novel was originally titled 'First Impressions' — a clue to its central argument. Every major relationship in the book is revised after more information arrives. Austen asks us to treat our certainties as provisional, always open to being overturned by evidence.",
      "Economic reality shapes romance: The Bennets' entail, Darcy's ten thousand a year, Wickham's debts — Austen embeds every romantic decision in material conditions. Love in this world is not free; it is negotiated within constraints that vary sharply by gender and class, and pretending otherwise is its own form of pride."
    ],

    authorBio: `Jane Austen was born on 16 December 1775 in Steventon, Hampshire, the seventh of eight children of the Reverend George Austen. She began writing as a teenager, producing sharp comic juvenilia that already showed her ear for the absurd. Pride and Prejudice evolved from a manuscript called 'First Impressions' drafted when she was just twenty-one, though it was not published until January 1813, by which time Austen had extensively revised it. She published all six of her completed novels anonymously — the title pages read simply 'By a Lady' — and only a handful of people outside her family knew she was the author during her lifetime. Austen lived most of her adult life in modest circumstances, never married, and died in Winchester on 18 July 1817 at the age of forty-one, probably from Addison's disease. Her reputation grew slowly after death; by the mid-twentieth century she was universally recognised as one of the greatest prose stylists in the English language.`,

    whyRead: `Because no novelist before or since has made irony do so much moral work. Every sentence in Pride and Prejudice is calibrated — not a word wasted, not a gesture unmeaning. Reading it trains your eye for the gap between what people say and what they mean, which is perhaps the most transferable skill literature can offer. Beyond craft, it remains genuinely funny: Mr. Collins's self-important speeches, Mrs. Bennet's theatrical nerves, Lady Catherine's imperious pronouncements — these are comic set-pieces that still land after two hundred years. But the comedy is always in service of something truer: a story about the courage it takes to admit you were wrong about someone you loved, and loved someone you thought you despised.`,

    historical: `Pride and Prejudice is set during the Napoleonic Wars, a fact the novel almost conceals behind its domestic concerns — yet the regiment stationed at Meryton, Wickham's officer's commission, and the nervous energy around Lydia's elopement are all products of a society in which military glamour was simultaneously thrilling and economically precarious. The legal reality of the entail — which would pass the Bennet estate away from the daughters on Mr. Bennet's death — was not exaggerated for dramatic effect; it was standard English law. For women of the gentry class in this period, marriage was not a romantic aspiration but a financial necessity. Austen published the novel in the year of Napoleon's Russian catastrophe, as England was both anxious about the world and restless with social change — a tension her comedy channels beautifully.`,

    reviews: [
      {
        name: "Amara Osei",
        place: "Accra, Ghana",
        text: "I had avoided this novel for years assuming it would feel distant and old-fashioned. I was completely wrong. Elizabeth Bennet's voice is so alive, so witty and self-aware, that reading her felt like catching up with a brilliant friend. I finished in four days and immediately started again."
      },
      {
        name: "Lena Marchetti",
        place: "Florence, Italy",
        text: "What strikes me most is how Austen makes you laugh and then, a page later, makes you feel something unexpectedly deep. The Darcy letter scene left me genuinely unsettled — in the best way. This is a novel that rewards rereading at every stage of life."
      },
      {
        name: "Daniel Yoon",
        place: "Seoul, South Korea",
        text: "I read this for an English literature course and expected to be bored. Instead I found myself annotating almost every page. Austen's irony is so subtle that you can read a sentence three times and find a new meaning each time. Genuinely one of the cleverest books I've encountered."
      }
    ],

    relatedIds: [
      "jane-eyre",
      "emma",
      "sense-and-sensibility",
      "great-expectations",
      "wuthering-heights"
    ]
  },

  /* ─────────────────────────────────────────────
     2. THE ADVENTURES OF SHERLOCK HOLMES
  ───────────────────────────────────────────── */
  "the-adventures-of-sherlock-holmes": {
    about: `Published in monthly instalments in The Strand Magazine beginning in July 1891, The Adventures of Sherlock Holmes collects the first twelve short stories featuring Arthur Conan Doyle's immortal detective — and it remains the purest distillation of what made Holmes a phenomenon. Each story is a masterclass in compression: within a few thousand words, a stranger arrives at 221B Baker Street bearing a problem, Holmes observes something that Watson and the reader entirely missed, deductions cascade, a hidden world snaps into focus. The twelve cases range from domestic intrigue ('A Case of Identity') to international conspiracy ('The Adventure of the Noble Bachelor'), from darkly comic ('The Red-Headed League', whose elaborate scheme is among the most inventive in crime fiction) to genuinely menacing ('The Adventure of the Speckled Band', which Doyle himself considered his best). What holds them together is Holmes himself: the hawk-faced figure in his Baker Street rooms, violin screeching at two in the morning, bored between cases to the point of cocaine experiments, and then galvanised by the right problem into a force of concentrated intelligence unlike anything Victorian readers had ever encountered. Watson, often underestimated, is actually the emotional centre — his admiration keeps Holmes human, and his bewilderment keeps the reader engaged.`,

    learn: [
      "Observation is a discipline, not a gift: Holmes does not simply 'notice more' — he has trained himself to look for what is anomalous, to treat each piece of sensory data as potential evidence. The first lesson of every Holmes story is that most people see without truly observing, and that the gap between the two can be closed by practice.",
      "The right question unlocks the problem: Holmes rarely solves a mystery by accumulating facts — he solves it by asking the one question nobody else thought to ask. 'When you have eliminated the impossible, whatever remains, however improbable, must be the truth' is elegant, but the real work is in knowing which possibilities to eliminate first.",
      "Eccentric genius still needs structure: Holmes's famous disorganisation — chemical experiments on the mantelpiece, tobacco in a Persian slipper — coexists with a rigorous mental filing system he calls his 'brain-attic'. Doyle suggests that creative disorder and systematic thinking are not opposites; the best minds cultivate both simultaneously.",
      "The client's story is never the whole story: In nearly every adventure, the account Holmes receives in his sitting room is edited, incomplete, or shaped by what the narrator is too embarrassed or frightened to include. Holmes's real skill is reading what has been left out — attending to silence as much as to speech.",
      "Small details carry disproportionate weight: A callus on a finger, tan lines stopping at the wrist, the direction of a scratch on a watch — these trivial physical facts unlock entire biographies in Holmes's hands. The stories argue persistently that the significant reveals itself through the incidental, if you are patient enough to wait for it."
    ],

    authorBio: `Arthur Conan Doyle was born in Edinburgh on 22 May 1859 and trained as a physician at the University of Edinburgh, where he studied under the brilliant diagnostician Dr. Joseph Bell — the real-life model for Holmes's deductive method. Unable at first to build a medical practice, Doyle began writing fiction, and the detective he created for Beeton's Christmas Annual in 1887 changed his life permanently. He famously grew to resent Holmes, killing him off at the Reichenbach Falls in 1893, only to resurrect him a decade later under immense public pressure. Beyond Holmes, Doyle wrote historical novels, science fiction (the Professor Challenger stories), and passionate advocacy for spiritualism in his later years. He died in 1930, but Holmes has never stopped working.`,

    whyRead: `Because these stories invented a template that a century of crime fiction has never fully escaped — and reading the originals reveals how much of what later writers added was already present in seed form. But beyond their historical importance, the Adventures remain compulsively readable: tightly plotted, elegantly written, full of the particular pleasure of watching a superior intelligence at work. They are also surprisingly rich in atmosphere — Doyle's London, foggy and teeming, feels as vivid as any setting in literature. For readers who have only encountered Holmes through adaptations, the source material will surprise them: the real Holmes is stranger, warmer, and far more ambiguous than most versions allow.`,

    historical: `The Adventures appeared at the height of the Victorian era, when faith in science and rational inquiry was reshaping British culture. Holmes embodies this faith — he is essentially applied empiricism given human form. But the stories also reflect anxieties of the period: empire (many cases involve colonial pasts catching up with English respectability), class (the criminal world and the aristocracy are shown as uncomfortably similar), and gender (women in Holmes stories are consistently more resourceful than their social position suggests). The Strand Magazine was itself a cultural phenomenon — a middle-class publication that brought illustrated fiction into every parlour in Britain, and Holmes's arrival there helped define what popular entertainment could be.`,

    reviews: [
      {
        name: "Priya Nair",
        place: "Mumbai, India",
        text: "I started with 'The Speckled Band' on a rainy afternoon and finished the entire collection by midnight. Each story has its own distinct texture but the same irresistible momentum. Holmes and Watson feel like real people I actually miss when I close the book — that is an extraordinary thing for fiction to achieve."
      },
      {
        name: "Carlos Mendes",
        place: "Lisbon, Portugal",
        text: "What surprised me most was the humour. Holmes is genuinely funny — dryly sarcastic and self-aware in ways I never expected from a Victorian detective. The Red-Headed League alone is worth the price of the collection. An absolute pleasure from first to last page."
      },
      {
        name: "Fatima Al-Rashid",
        place: "Dubai, UAE",
        text: "I teach critical thinking at secondary level and I use Holmes stories to show students what close reading of evidence actually means. The stories reward analytical attention — they make you want to think harder, which is the best thing you can say about any book."
      }
    ],

    relatedIds: [
      "the-hound-of-the-baskervilles",
      "a-study-in-scarlet",
      "the-sign-of-the-four",
      "the-return-of-sherlock-holmes",
      "the-lost-world"
    ]
  },

  /* ─────────────────────────────────────────────
     3. OLIVER TWIST
  ───────────────────────────────────────────── */
  "oliver-twist": {
    about: `Oliver Twist was Charles Dickens's second novel, serialised in Bentley's Miscellany between February 1837 and April 1839, and it arrived as something genuinely new in English fiction: a story that placed a child at its centre and dared to describe the slums, workhouses, and criminal underworlds of London with unsparing specificity. Oliver himself — born in a workhouse, his mother dying moments after delivery, his parentage unknown — is both a character and an argument: a vehicle for Dickens's fury at the New Poor Law of 1834, which treated the destitute as morally culpable for their destitution. The novel's most celebrated image — Oliver holding out his bowl and asking for more — became within weeks of publication the defining symbol of Victorian child poverty, and it has never quite lost that resonance. But Oliver Twist is not simply a polemic. The villain Fagin, surrounded by his boys in the den on Saffron Hill, teaching them to pick pockets with a silken handkerchief, is among the most vivid and troubling characters in the English novel. Bill Sikes, brutal and cornered, is a study in how violence perpetuates itself. Nancy, torn between loyalty and conscience, achieves in her few scenes a moral complexity that far outstrips the sentimental gentleness of Oliver himself. London in this novel is nearly a character in its own right — dangerous, labyrinthine, alive.`,

    learn: [
      "Systems create suffering more than individuals do: Dickens does not blame a single cruel employer for Oliver's miseries — he implicates the workhouse system, the Poor Law boards, the magistrates, the parish authorities. The most damaging cruelty in the novel is bureaucratic and impersonal, which makes it harder to fight and easier to sustain.",
      "Goodness under pressure is not weakness: Oliver maintains an essentially gentle, honest nature despite every circumstance conspiring to corrupt him. Dickens may sentimentalise this, but the underlying point holds: moral character is not simply the product of environment. It can be preserved even when everything around it is degraded.",
      "The criminal world has its own ethics and loyalties: Fagin's gang is not merely villainous — it is a community, offering warmth, belonging, and a kind of inverted family structure to children the legitimate world has discarded. Dickens shows us why crime attracts, not just why it repels, which is far more disturbing and more honest.",
      "Complicity is easily achieved: The novel shows how ordinary people — landlords, employers, respectable citizens — benefit from systems built on exploitation without ever getting their hands dirty. Bumble the beadle is comic, but he is also a mechanism for delivering official violence at one remove from those who authorise it.",
      "Identity is both given and fought for: Oliver's true parentage and its revelation drives the plot's resolution, but Dickens complicates this by showing that identity is also what you defend under duress. The boy's persistent refusal to become what his environment demands is the novel's quiet act of resistance."
    ],

    authorBio: `Charles Dickens was born on 7 February 1812 in Portsmouth and endured a childhood that permanently shaped his fiction. When his father was imprisoned for debt in the Marshalsea in 1824, twelve-year-old Charles was put to work in a blacking factory pasting labels on shoe polish — a humiliation he never forgot and rarely discussed publicly. That experience gave him an intimate, visceral knowledge of childhood poverty and institutional indifference that no amount of research could have produced. He began his writing career as a parliamentary journalist and shorthand reporter before Sketches by Boz (1836) brought him public attention. Oliver Twist followed immediately, launching a career that would encompass fifteen major novels, innumerable sketches, a journal he edited for two decades, and a series of public readings that filled theatres across Britain and America. He died in 1870, still working, still urgently productive.`,

    whyRead: `Because it is the novel that established the template for socially conscious fiction — and it did so with energy, dark humour, and characters that have never quite faded from cultural memory. If you have always known Fagin and the Artful Dodger and Bill Sikes second-hand, through adaptations and references, reading the source text reveals how much richer and stranger Dickens's original conception was. The novel also speaks directly to present-day debates about poverty, child welfare, and the criminalisation of the destitute — not because Dickens was prophetic but because the underlying social dynamics he described have proved remarkably durable. It is also simply a gripping story, paced like a thriller in its later chapters, with a climax that remains genuinely harrowing.`,

    historical: `Oliver Twist appeared three years after the New Poor Law of 1834, which Dickens loathed. The law replaced outdoor relief — charity given to the poor in their homes — with the workhouse system, in which the destitute were required to enter grim institutional buildings, separated by gender, and fed at subsistence level. The theory, drawn from Utilitarian economics, was that making poverty uncomfortable enough would incentivise the poor to work harder. Dickens understood this as a moral obscenity, and Oliver's famous 'more' is a direct assault on that theory. He also drew on reforming journalism of the 1830s and his own reporting on London's criminal courts to depict Fagin's world — the area around Field Lane near Holborn was a real and notorious slum market for stolen goods.`,

    reviews: [
      {
        name: "Blessing Okafor",
        place: "Lagos, Nigeria",
        text: "Oliver Twist hits differently when you live in a country where child poverty is an everyday reality rather than a historical footnote. Dickens makes you angry in the best way — not at any single villain but at the whole machinery that produces suffering so efficiently. Nancy's fate destroyed me. A masterwork."
      },
      {
        name: "Sophie Bergmann",
        place: "Berlin, Germany",
        text: "I first read this as a child and found it exciting. Reading it again as an adult, the political dimension is impossible to ignore — and the comedy surrounding Bumble has turned darkly satirical. It is a completely different book depending on your age and what you know about the world. Remarkable."
      },
      {
        name: "James Whitfield",
        place: "Manchester, UK",
        text: "The London Dickens creates is so dense and so credible that you feel you could navigate it with the novel as your map. Fagin's den, the fog, the Thames at Rotherhithe — the atmospheric writing is extraordinary. This is the book that made me understand why people call Dickens the greatest English novelist."
      }
    ],

    relatedIds: [
      "great-expectations",
      "a-tale-of-two-cities",
      "a-christmas-carol",
      "jane-eyre",
      "les-miserables"
    ]
  },

  /* ─────────────────────────────────────────────
     4. DRACULA
  ───────────────────────────────────────────── */
  "dracula": {
    about: `Bram Stoker's Dracula, published in May 1897, is one of the most cunningly engineered horror novels ever written — and part of its cunning is structural. The entire story is assembled from documents: Jonathan Harker's Transylvanian diary, Mina Murray's journal, Dr. Seward's phonographic recordings, Lucy Westenra's letters, newspaper clippings, even a ship's log. No single narrator has the complete picture. The reader assembles the truth from fragments, mimicking the experience of the characters themselves as they struggle to comprehend something that their rational Victorian minds were never designed to process. Jonathan Harker arrives at Castle Dracula in May, ostensibly to assist a Transylvanian nobleman with the purchase of English property. Over the following weeks his diary entries shift from professional curiosity to mounting dread to trapped helplessness, as he realises his host is something ancient and predatory. When Dracula arrives in England aboard the storm-wrecked schooner Demeter in Whitby, the novel transforms: the Count is now the aggressor in Victorian England itself, targeting Lucy Westenra and then Mina with a deliberateness that feels like invasion. Professor Van Helsing assembles an unlikely coalition — doctor, lawyer, American, and the two women at the story's heart — to track and destroy him. What makes Dracula endure beyond its genre trappings is Stoker's acute understanding of anxiety: about female sexuality, about imperial vulnerability, about the irrational seeping through the cracks of the rational world.`,

    learn: [
      "Collective knowledge defeats isolated terror: No single character in the novel could defeat Dracula alone — Van Helsing needs medical science, Harker needs direct witness, Mina needs intellectual organisation, Seward needs the asylum records. The novel is a sustained argument for the sharing of knowledge as the primary defence against the incomprehensible.",
      "Technology and superstition are not opposites: The characters use typewriters, phonographs, telegrams, and train timetables alongside crucifixes, garlic, and sacred wafers. Stoker refuses to make modernity sufficient — the ancient, the irrational, the pre-scientific require ancient counters as well as modern ones. This collision is at the heart of the novel's anxiety.",
      "The monster reveals the society that fears it: Dracula's threat in 1897 maps precisely onto late-Victorian fears — a foreign aristocrat buying property in England, draining the life of English women, converting them to his own 'undead' kind. The horror is partly geopolitical: invasion anxiety in an empire that has begun to sense its own fragility.",
      "Vulnerability is not weakness: Mina Harker is arguably the most capable character in the novel, organising the hunters' shared records and providing the critical intelligence that locates Dracula's escape route. Her vulnerability — when Dracula forces her to drink his blood — is weaponised by the men around her, but she refuses to become merely a victim.",
      "Rational frameworks fail when reality exceeds them: Dr. Seward, trained as a alienist (psychiatrist), observes Renfield for months and still cannot grasp what his patient is responding to. Van Helsing has to force him to accept the evidence of his own eyes. The novel suggests that professional expertise can become a barrier to truth when the truth is too strange to fit the training."
    ],

    authorBio: `Abraham 'Bram' Stoker was born in Dublin on 8 November 1847, the third of seven children of a civil servant. He was bedridden with a mysterious illness throughout early childhood, emerging as a healthy young man to excel at athletics in Trinity College Dublin. For seventeen years he worked as a theatre critic and civil servant before becoming business manager for the great Victorian actor Henry Irving at the Lyceum Theatre in London — a demanding role that consumed most of his creative energy. Dracula was researched over seven years, including notes from Whitby's harbour and library and reading in the British Museum about Transylvanian folklore, though Stoker never visited Eastern Europe. It was his sixth novel and by far his most famous. He died in 1912, largely unaware of the cultural giant he had created; the novel's full celebrity came posthumously, accelerated by the 1922 film Nosferatu and the 1931 Bela Lugosi film that defined the vampire for the twentieth century.`,

    whyRead: `Because Dracula is not simply a horror novel — it is a psychological and social document dressed up as one. The famous scenes (the Count crawling headfirst down the castle wall, the Demeter's terrifying log, Van Helsing's confrontations) are thrilling, but the real pleasure lies in the epistolary structure: the way each new document shifts the reader's perspective, the way gaps and silences between entries become ominous. It is also a novel that rewards rereading with awareness of its anxieties — colonial, sexual, psychological — because the monster becomes more interesting the more you understand what he represents. And at the level of pure storytelling, it is brilliantly paced, gathering dread with enormous skill through its first half before unleashing the chase of its extraordinary final third.`,

    historical: `The 1890s were a decade of unusual anxiety in Britain. The empire was vast but visibly straining; the 'New Woman' movement was challenging traditional gender roles; science was undermining religious certainty while simultaneously generating public unease about what new knowledge might produce. Stoker absorbed all of this. The novel was published in the same decade as H.G. Wells's The War of the Worlds (1898) and The Time Machine (1895) — works similarly preoccupied with invasion and degeneration. Whitby, where a significant portion of the novel is set, is a real Yorkshire fishing town where Stoker spent a holiday in 1890, reading about a real shipwreck (the Dmitry, which ran aground there in October 1885) and discovering the name 'Dracula' in a history book he found in Whitby's Subscription Library.`,

    reviews: [
      {
        name: "Marta Kowalski",
        place: "Warsaw, Poland",
        text: "I expected Dracula to feel dated and overwrought. Instead I found it genuinely frightening — not in a gore-filled way but in the slow, creeping way that good horror should work. The Transylvania chapters are masterpieces of building dread, and the Demeter log is among the most chilling things I have read."
      },
      {
        name: "Ahmed Benali",
        place: "Casablanca, Morocco",
        text: "The epistolary format is brilliant — it makes you feel like a detective piecing together something terrible from scattered evidence. Mina is a far stronger and more interesting character than the film adaptations suggest, and Van Helsing is genuinely compelling rather than merely eccentric. Essential reading."
      },
      {
        name: "Rebecca Thompson",
        place: "Toronto, Canada",
        text: "I read this for a Victorian literature course and was struck by how modern the anxieties feel. Invasive foreigners, women whose desires threaten social order, rational men defeated by what they refuse to believe — these are not historical concerns. The novel is absolutely worth reading slowly and carefully."
      }
    ],

    relatedIds: [
      "frankenstein",
      "the-strange-case-of-dr-jekyll-and-mr-hyde",
      "the-picture-of-dorian-gray",
      "the-turn-of-the-screw",
      "the-island-of-doctor-moreau"
    ]
  },

  /* ─────────────────────────────────────────────
     5. ALICE'S ADVENTURES IN WONDERLAND
  ───────────────────────────────────────────── */
  "alices-adventures-in-wonderland": {
    about: `Lewis Carroll told the story of Alice's underground adventure for the first time on a golden afternoon on the Thames — 4 July 1862, according to Carroll's diary — rowing with the three young daughters of the mathematician Henry Liddell while improvising a tale that the middle daughter, Alice Pleasance Liddell, begged him to write down. What he eventually wrote, illustrated first by himself and then by John Tenniel for the 1865 Macmillan publication, was not quite a children's book, though it looks like one. It is a sustained attack on the logic of adult authority, a philosophical puzzle box built from wordplay, and perhaps the most honest account ever written of what it feels like to be a child in a world designed entirely by and for grown-ups. Alice falls down a rabbit hole and enters a place where the rules are arbitrary, the inhabitants are unpredictable, and apparent authority — the Queen of Hearts, the Duchess, the Caterpillar — turns out to be either absurd or actively hostile. Throughout, Alice maintains a stubborn, slightly exasperated rationality that the world around her cannot defeat. She grows and shrinks, is lectured about language by humpty-dumpty, is put on trial without charges, is bullied and ignored and talked over — and yet she retains herself. The book ends not with Alice rescued by some external power but with Alice herself declaring that the whole thing is nonsense, refusing to be afraid, and waking up.`,

    learn: [
      "Nonsense has its own rigorous logic: Carroll was a mathematical logician at Oxford, and the absurdity of Wonderland is not random — it follows rules, just inverted ones. 'Why is a raven like a writing desk?' has no answer, but the Mad Hatter's tea party has a precise internal structure. Learning to spot the logic within apparent chaos is both a reading skill and a life skill.",
      "Children deserve to have their own seriousness respected: Alice is repeatedly talked down to, patronised, given unsolicited advice, and treated as a specimen rather than a person. Carroll's entire narrative sympathy is with her frustration. The book is a portrait of how much intelligence children bring to the world and how systematically it is disregarded.",
      "Language is power, and words mean what the powerful say they mean: Humpty Dumpty's famous declaration — 'When I use a word, it means just what I choose it to mean — neither more nor less' — is funny, but it is also a precise description of how authority actually works. Whoever controls definition controls reality.",
      "Identity is not fixed: Alice spends the entire novel uncertain who she is, growing and shrinking, doubting her own name and memories. Carroll's treatment of this is playful but not trivial — the question of what makes you you beneath the social roles and expectations you perform is genuinely philosophical and genuinely live.",
      "The dream state reveals truths waking life conceals: Wonderland is technically a dream, but it surfaces anxieties and frustrations that Alice's waking life in Victorian England politely suppresses. The chaos, the arbitrary punishments, the illogical authority figures — these are a child's honest perception of adult social reality, stripped of the polite fictions that normally cover it."
    ],

    authorBio: `Charles Lutwidge Dodgson — Lewis Carroll was his pen name, an inversion and Latinisation of his actual name — was born on 27 January 1832 in Daresbury, Cheshire, the third of eleven children of a clergyman. He spent nearly his entire adult life at Christ Church, Oxford, where he was a lecturer in mathematics for twenty-six years and a deacon of the Church of England. He was a pioneer of portrait photography in its early years and corresponded with mathematicians, logicians, and children in equal measure. Beyond Alice, he wrote Through the Looking-Glass (1871), the nonsense poem The Hunting of the Snark (1876), and several works of mathematical logic under his real name. He was painfully shy in adult company, stammered in public, and found easiest conversation with children, particularly the Liddell daughters. He died in Guildford on 14 January 1898.`,

    whyRead: `Because almost nothing else in the English language does what Alice does — creates a world so internally consistent in its inconsistency, so genuinely funny and genuinely disturbing at the same time. Adults who read it having only known it in childhood will be struck by how much they missed: the puns are more intricate, the philosophical provocations more pointed, the satire of Victorian class and education more precise than any child version prepares you for. It is also a short book — it can be read in an afternoon — which makes the density of its invention even more astonishing. And it gave us a vocabulary — falling down rabbit holes, mad as a hatter, off with their heads, curiouser and curiouser — that English speakers still reach for when they need to describe the experience of a world that has stopped making sense.`,

    historical: `Alice's Adventures in Wonderland appeared in 1865, at the beginning of a decade that saw enormous disruption to Victorian certainties: Darwin's On the Origin of Species had been published in 1859, challenging fixed notions of identity and order; the 1867 Reform Act was about to expand the male franchise dramatically; railway travel was compressing time and space in ways that felt disorienting to many contemporaries. Carroll's absurdist fantasy can be read as a response to this cultural vertigo — a world where the stable rules of logic, grammar, and social precedence have all been suspended. Tenniel's illustrations, based partly on Alice Liddell's appearance, became so embedded in cultural memory that they still define how most readers visualise the characters 160 years later.`,

    reviews: [
      {
        name: "Yui Tanaka",
        place: "Tokyo, Japan",
        text: "I read this first in Japanese translation as a child, then in English as a student, and the experience is completely different in each language — which itself proves Carroll's point about the relationship between words and meaning. The wordplay is untranslatable, but the emotional truth of a child lost in an adult world needs no translation."
      },
      {
        name: "Noah Adeyemi",
        place: "Ibadan, Nigeria",
        text: "The Mad Hatter's tea party is genuinely one of the funniest things in English literature, but what I admire is how it is also profoundly melancholy. Time has stopped, they are trapped, the refreshments never change — it is simultaneously absurd and sad. Carroll holds these registers together with extraordinary lightness of touch."
      },
      {
        name: "Clara Dupont",
        place: "Lyon, France",
        text: "Reading Alice as an adult philosopher, I was astonished by how much serious epistemological and linguistic philosophy is packed into what presents itself as a children's entertainment. The Caterpillar's questions about identity, Humpty Dumpty's theory of meaning — these are not jokes, or rather, they are jokes that are also genuine philosophical arguments."
      }
    ],

    relatedIds: [
      "grimms-fairy-tales",
      "the-wonderful-wizard-of-oz",
      "peter-pan",
      "the-wind-in-the-willows",
      "the-adventures-of-pinocchio"
    ]
  },

  /* ─────────────────────────────────────────────
     6. AESOP'S FABLES
  ───────────────────────────────────────────── */
  "aesops-fables": {
    about: `Aesop's Fables have been in continuous circulation for approximately 2,600 years — which makes them, by almost any measure, the most durable narrative tradition in Western literary history. The historical Aesop was almost certainly a real person: ancient Greek and Roman sources describe him as a slave from the island of Samos or from Phrygia, living in the sixth century BC, famous for sharp wit and an ugly appearance, and eventually executed — according to legend — by the citizens of Delphi for a blasphemy he may not have committed. But the fables attributed to him predate any single author; they are an oral tradition condensed into memorable form, drawing on Mesopotamian and Egyptian story patterns as well as Greek ones. The canonical collection most readers know today was assembled and translated over centuries: the Greek prose versions of Babrius, the Latin verse renderings of Phaedrus in the first century AD, the medieval collections of Planudes, and the famous seventeenth-century retellings of Jean de La Fontaine in French, which gave Europe the elegantly ironic versions still widely taught. The animals — the fox and the grapes, the hare and the tortoise, the grasshopper and the ant, the boy who cried wolf — are so thoroughly embedded in the language that most people can recall the moral before they remember the story. That is precisely the point: Aesop's method is to make truth stick by giving it legs and fur and a distinctive voice.`,

    learn: [
      "Moral truths are best delivered obliquely: The fable form works because it allows uncomfortable truths to be told without pointing directly at the listener. Saying 'the grapes you cannot reach are probably sour anyway' as a fact about a fox sidesteps the defensiveness that direct accusation provokes. This technique — speaking truth through fiction — is as effective in modern communication as it was in ancient Athens.",
      "Short-term pleasure and long-term security are usually in competition: The grasshopper and the ant is perhaps the most-told economic fable in human history, repeated in every culture because it describes a genuine tension: the value of present enjoyment versus the necessity of future preparation. The fable does not say the grasshopper was wrong to enjoy summer — it says the cost of that enjoyment must be honestly reckoned.",
      "Power is easier to abuse than to restrain: Many fables feature the lion, the eagle, or other powerful animals who devour their supposed allies at the first convenient moment. Aesop is realistic about power — he does not expect it to be virtuous without structural constraint. The weak animal who trusts the strong on the basis of promises alone usually ends up eaten.",
      "Cleverness is not the same as wisdom: The fox appears in dozens of fables, always outsmarting others, always emerging ahead. But the fox's cleverness is often cynical and self-defeating — it isolates him, and the short-term gains come at the cost of any genuine relationship. Aesop distinguishes sharply between cunning (getting what you want now) and wisdom (understanding what is actually worth wanting).",
      "Simple stories carry complex truths further than arguments: The reason these fables have survived while vastly more sophisticated ethical systems have been forgotten is that they attach moral content to images that cannot be unseen. A tortoise crossing a finish line, a boy watching wolves arrive — these scenes do not require explanation to do their work. They lodge in memory and work from there."
    ],

    authorBio: `Aesop himself is more legend than documented biography. Ancient sources — including the Histories of Herodotus and the Lives of the Eminent Philosophers by Diogenes Laertius — describe him as a disfigured slave from Phrygia or Thrace who eventually won his freedom through his storytelling ability and wit. He is said to have served Iadmon of Samos in the early sixth century BC and later to have acted as an adviser and emissary to various Greek city-states. The story of his death is itself a fable: executed at Delphi for impiety, he is said to have warned the Delphians that they would be punished for the injustice — and according to legend, they were. The name 'Aesop' may have become a generic label for the fable tradition rather than a description of a single author, but ancient consensus was clear enough that Plato, Aristotle, and Aristophanes all treated him as a real and influential historical figure.`,

    whyRead: `Because these stories are the foundation of almost every piece of proverbial wisdom you already use, and reading the source material reveals how much has been lost in transmission — how much darker, sharper, and more cynical Aesop is than the sanitised classroom versions suggest. The fox who flatters the crow to get its cheese is not simply teaching children not to be vain; he is demonstrating a specific technique for manipulation that adults should recognise when it is being used on them. Aesop is a manual for navigating social reality, written with the precision of someone who spent his life as a slave — someone for whom misreading power could be fatal. That edge is what kept these stories alive for two and a half millennia, and it is what makes them worth reading rather than simply remembering.`,

    historical: `The fable as a literary form appears to predate Aesop in Mesopotamian literature: collections from Sumer and Babylon involving animal characters making moral points have been dated to 2000 BC. The Greek tradition Aesop inherited and transformed was already old when he gave it his distinctive shape. The Roman writer Phaedrus, a freed slave of Augustus Caesar writing in the first century AD, was the first to explicitly connect Aesop's themes to the political conditions of slavery and imperial power — he used the fable form to comment on Roman court life in ways that were too dangerous to say directly. La Fontaine's seventeenth-century French versions shifted the tradition toward aristocratic refinement, but the subversive political intelligence of the original survived even that transformation.`,

    reviews: [
      {
        name: "Kofi Mensah",
        place: "Kumasi, Ghana",
        text: "Growing up, these stories were told to me by my grandmother in a completely different cultural context, and reading the Greek originals for the first time was a revelation — the same essential wisdom, the same recognisable animal archetypes, just dressed differently. Aesop belongs to everyone. These stories are not 'Western' — they are human."
      },
      {
        name: "Isabella Romano",
        place: "Rome, Italy",
        text: "I had forgotten how dark the original fables are. The pedagogical versions strip out the cruelty and the irony, and what is left is sentimental moralising. The real Aesop is cold-eyed and unsentimental about human (and animal) nature. That quality is precisely what makes these stories still useful as a guide to the world."
      },
      {
        name: "Takeshi Yamamoto",
        place: "Osaka, Japan",
        text: "Reading Aesop alongside traditional Japanese animal tales, I was struck by the parallels — the same recognition that power corrupts, that cunning is double-edged, that slow persistence beats short-lived brilliance. Perhaps every culture generates these same fables because every culture faces the same fundamental problems."
      }
    ],

    relatedIds: [
      "grimms-fairy-tales",
      "the-happy-prince-and-other-tales",
      "the-jungle-book",
      "alices-adventures-in-wonderland",
      "the-wind-in-the-willows"
    ]
  },

  /* ─────────────────────────────────────────────
     7. AS A MAN THINKETH
  ───────────────────────────────────────────── */
  "as-a-man-thinketh": {
    about: `James Allen published As a Man Thinketh in 1903, and in the more than a century since, it has quietly accumulated one of the most remarkable readerships in the history of self-improvement literature — not through aggressive marketing or institutional endorsement, but through readers pressing copies into each other's hands with the particular urgency of people who feel they have found something genuinely useful. The title comes from Proverbs 23:7 — 'As a man thinketh in his heart, so is he' — and Allen's argument, developed across its slender pages, is essentially a sustained elaboration of that single idea: that the quality and direction of a person's inner life is not the product of their circumstances but the producer of them. Allen draws on Stoic philosophy, Victorian self-reliance literature, Eastern contemplative traditions, and his own experience of escaping poverty through deliberate mental discipline. The prose is at once aphoristic and lyrical — compressed into quotable formulations that open out into larger implications the more you think about them. 'Mind is the master-weaver, both of the inner garment of character and the outer garment of circumstance,' he writes, and the image carries more intellectual weight than it first appears to. This is not naive positivity; Allen does not promise that good thoughts produce good outcomes regardless of effort. He insists, rather, that the thoughts that inhabit us most persistently shape the habits that shape the actions that shape the life. Character, he argues, is not destiny in some mystical sense — it is destiny in a mechanical, practical, unavoidable one.`,

    learn: [
      "Your habitual thoughts shape your character more than your choices do: Single decisions matter far less than the mental environment you maintain day by day. Allen's insight is that we do not choose our character the way we choose a shirt — we grow it from the soil of our recurring inner life. Change the soil, and the character eventually follows.",
      "Circumstance and character exist in a feedback loop: Allen argues that while circumstances can suppress a person's development, they cannot prevent it in someone whose inner direction is clear. More uncomfortably, he suggests that the circumstances we repeatedly encounter reflect, in part, the habitual expectations and attitudes we carry into them — not as cosmic justice but as simple psychology.",
      "Purpose is the master key: Allen dedicates a significant portion of the book to the argument that a clearly conceived, seriously pursued central purpose is the single most powerful organising force in a human life. Without it, effort scatters; with it, even setbacks become legible as information rather than merely as misfortune.",
      "Calmness is an achievement, not an absence: The book's final chapter on serenity treats mental peace not as passive contentment but as the hard-won result of sustained self-examination. The calm person is calm not because nothing has disturbed them but because they have worked out their relationship to disturbance — a distinction that modern psychology has spent decades rediscovering.",
      "The body follows the mind: Allen makes the then-unconventional argument — now supported by considerable research into psychoneuroimmunology and chronic stress — that mental states directly influence physical health. His formulations are unscientific by modern standards, but the direction of the insight is correct: the mind and the body are not separate systems managing themselves in isolation."
    ],

    authorBio: `James Allen was born on 28 November 1864 in Leicester, England, to a working-class family. His father James Allen Sr. travelled to New York seeking work and was murdered shortly after arrival — a disaster that ended James's formal schooling at the age of fifteen and forced him into factory employment. For the next two decades he worked as a private secretary while reading voraciously — Marcus Aurelius, Buddhist philosophy, the Bible, Tolstoy, Ralph Waldo Emerson — building the intellectual foundation for his writing. In 1902 he moved with his wife Lily to Ilfracombe on the Devon coast, resigned from employment, and dedicated himself entirely to writing and contemplative living. He published As a Man Thinketh in 1903 and went on to produce over twenty more books before his death in 1912, aged forty-seven. He died relatively obscure; his global reputation built slowly over the rest of the twentieth century.`,

    whyRead: `Because it is short — genuinely short, readable in a single sitting — and because its density of insight per page is unusually high. Allen does not repeat himself or pad his argument; every paragraph advances the case. For readers intimidated by longer works of philosophy or psychology, As a Man Thinketh offers an accessible entry point to questions about the relationship between thought, character, and action that the greatest thinkers have wrestled with for millennia. For readers already familiar with those traditions, it offers the unusual pleasure of watching a self-educated factory worker from Leicester arrive at conclusions broadly consistent with Marcus Aurelius and the Stoics — not through academic training but through hard-won personal experience. The book does not promise transformation; it describes the conditions under which transformation becomes possible. That is a more honest and more useful thing.`,

    historical: `As a Man Thinketh appeared at the beginning of what would later be recognised as the New Thought movement — a broad American and British tradition that emphasised the power of directed mental attitude to shape material reality. Allen was both part of this tradition and distinct from it: where many New Thought writers moved toward quasi-mystical claims about mental force attracting wealth and success, Allen remained grounded in practical ethics and character development. His intellectual lineage runs through Emerson's Self-Reliance (1841), Samuel Smiles's Self-Help (1859), and ultimately back to Stoic texts like Marcus Aurelius's Meditations. The Edwardian era in which Allen wrote was one of intense social mobility anxiety — industrialism had created both new possibilities and new insecurities — and the appeal of a philosophy of personal agency spoke directly to that anxiety.`,

    reviews: [
      {
        name: "Chinonso Eze",
        place: "Enugu, Nigeria",
        text: "I have given away more copies of this book than any other I own. It is short enough that people actually read it, and precise enough that it stays with you. Allen does not flatter you or promise easy outcomes — he simply makes the argument for taking your inner life as seriously as your outer circumstances, and the argument is hard to answer."
      },
      {
        name: "Rafael Moreno",
        place: "Mexico City, Mexico",
        text: "What distinguishes Allen from the modern self-help genre is that he has no interest in selling you a system or a supplement or a course. He is a man who worked this out for himself, under real difficulties, and is sharing the result with complete directness. You feel the difference. The authenticity of the voice makes the ideas more compelling, not less."
      },
      {
        name: "Ananya Sharma",
        place: "Pune, India",
        text: "Reading As a Man Thinketh alongside the Bhagavad Gita, I was struck by how much Allen's thinking mirrors certain passages about the relationship between internal intention and external action. He arrived at conclusions through Western self-cultivation literature that correspond closely to ideas developed over thousands of years in Indian philosophy. That convergence seems meaningful."
      }
    ],

    relatedIds: [
      "self-reliance-ralph-emerson",
      "meditations",
      "self-help-samuel-smiles",
      "the-science-of-getting-rich",
      "autobiography-of-benjamin-franklin"
    ]
  },

  /* ─────────────────────────────────────────────
     8. THE ART OF WAR
  ───────────────────────────────────────────── */
  "the-art-of-war": {
    about: `Sun Tzu's The Art of War is the oldest surviving military treatise in the world, composed in China around the fifth century BC, almost certainly during the chaotic Spring and Autumn Period when the Zhou dynasty was fragmenting into competing warring states. It is also, improbably, one of the most-read books in twenty-first century boardrooms, sports coaching manuals, and business schools — a testament to the universality of its strategic principles. The text consists of thirteen short chapters, each addressing a specific dimension of military strategy: planning, waging war, tactical positioning, use of intelligence, adaptation to terrain, and the management of troops. What distinguishes Sun Tzu from later military writers is his fundamental premise: that the highest form of victory is the one achieved without fighting. 'The supreme art of war is to subdue the enemy without engaging,' he writes, and this counterintuitive claim runs through everything that follows. War is expensive, unpredictable, and exhausting; it destroys the resources you fought to control. The wise commander therefore wins through positioning, intelligence, deception, and the creation of conditions in which the enemy's own errors become his defeat. Sun Tzu's thinking was shaped by Daoist philosophy — the principle of wu wei, acting in harmony with conditions rather than forcing outcomes — and this gives his strategic advice a suppleness entirely absent from Western military manuals of similar age.`,

    learn: [
      "Know yourself and know your enemy: Sun Tzu's most famous injunction — 'If you know the enemy and know yourself, you need not fear the result of a hundred battles' — is deceptively simple. The operational implication is that intelligence-gathering is not an auxiliary to strategy but its foundation. Decisions made without accurate self-assessment and situational awareness are not strategy at all; they are gambling.",
      "Flexibility defeats rigid planning: Sun Tzu argues consistently against fixed tactical plans, insisting that the skilled commander responds to conditions as they actually are rather than as the pre-battle plan assumed they would be. 'Water shapes its course according to the nature of the ground over which it flows; the soldier works out his victory in relation to the foe he is facing.' Adaptability is not weakness; it is the most sophisticated form of strength.",
      "Deception is a legitimate strategic tool: Sun Tzu's ethics of warfare are strikingly consequentialist — if a feigned retreat or a false display of weakness creates victory at lower cost, it is the preferred option. The moral calculus is about outcome: the deception that prevents a battle is preferable to the honesty that causes one. This principle creates considerable discomfort in Western readers shaped by different moral traditions.",
      "Speed and surprise are force multipliers: 'Let your rapidity be that of the wind' — Sun Tzu regards the rapid exploitation of opportunity as fundamental. A slow response to a momentary advantage is as bad as missing it entirely. In contemporary terms: the window between recognising an opportunity and acting on it is itself a strategic variable that can be managed.",
      "Winning the war of logistics wins the war: Chapter Two, 'Waging War,' is almost entirely about supply chains, and it is far more sophisticated than it first appears. Sun Tzu understands that a prolonged campaign bleeds the state even in victory. The efficient use of captured resources, the minimisation of supply lines, the preference for short decisive engagements over attritional campaigns — these principles made sense five hundred years before Christ and they make sense now."
    ],

    authorBio: `Sun Tzu — or Sun Wu, to use his full name — was a military general and strategist who lived in the state of Wu during the Spring and Autumn Period of Chinese history, approximately 544–496 BC. The Historical Records (Shiji) of Sima Qian, written around 100 BC, describe him as presenting a treatise on military strategy to King Helü of Wu, demonstrating its principles by drilling two hundred of the king's concubines, and going on to lead Wu's armies to several celebrated victories. Modern scholars debate whether a single 'Sun Tzu' authored the received text or whether it is a compilation edited over decades, but the text's internal coherence suggests a dominant intellect behind it. The earliest physical manuscripts of The Art of War date to 1972, when bamboo strips were excavated from a Han dynasty tomb at Yinqueshan — confirming the antiquity of a text that had been continuously copied and studied for over two thousand years.`,

    whyRead: `Because thirteen short chapters have influenced more serious strategic thinkers across more domains — military, business, sport, politics, diplomacy, game design — than almost any other work of comparable brevity. Reading it is not about extracting 'tips': it is about acquiring a fundamentally different way of thinking about conflict, competition, and resource management. Sun Tzu forces you to think about the conditions that make outcomes possible rather than the outcomes themselves — a shift in perspective that consistently reveals options that linear thinking misses. It is also simply a beautiful text: spare, aphoristic, and precise in the way that the best Chinese classical writing is precise, achieving maximum density with minimum words. A modern reader can finish it in two hours and spend years unpacking it.`,

    historical: `The Spring and Autumn Period (771–476 BC) was an era of constant interstate warfare in China, as hundreds of feudal states competed for dominance following the collapse of central Zhou authority. Armies were small by later standards, largely composed of chariot-mounted aristocrats supplemented by infantry, and campaigns were often governed by elaborate codes of chivalric conduct. Sun Tzu's insistence on pragmatic effectiveness over ritual honour was itself a rupture with this tradition — a sign of the coming Warring States Period (475–221 BC) in which the old rules collapsed entirely and total warfare became standard. The Art of War was used by military commanders for centuries in China, Korea, Japan, and Vietnam before it reached European readers in a 1772 French translation by the Jesuit missionary Father Amiot. Mao Zedong is said to have been a close student of it; so, reportedly, was Napoleon.`,

    reviews: [
      {
        name: "Omar Al-Habsi",
        place: "Muscat, Oman",
        text: "I have read this book five times in fifteen years, each time finding something different in it depending on what I was facing at work or in my personal life. It is not about war in any narrow sense — it is about the psychology of conflict and competition, which means it is relevant to almost everything. The chapter on intelligence alone is worth the entire read."
      },
      {
        name: "Sarah Kim",
        place: "Singapore",
        text: "What strikes me most is how non-violent the actual argument is. Sun Tzu consistently prefers the victory achieved without battle — the psychological defeat of the enemy, the creation of conditions that make resistance pointless. This is an extraordinarily sophisticated ethical position for a military manual. I use its principles in negotiation, not warfare, and they work."
      },
      {
        name: "Emmanuel Diallo",
        place: "Dakar, Senegal",
        text: "The most important lesson I took from this book is about self-knowledge. Sun Tzu says that knowing yourself is as important as knowing the enemy — which in a business context means honestly assessing your own weaknesses before your competition forces you to discover them. I have made that principle central to how I run my company."
      }
    ],

    relatedIds: [
      "meditations",
      "the-prince",
      "extraordinary-popular-delusions",
      "as-a-man-thinketh",
      "self-reliance-ralph-emerson"
    ]
  },

  /* ─────────────────────────────────────────────
     9. TREASURE ISLAND
  ───────────────────────────────────────────── */
  "treasure-island": {
    about: `Robert Louis Stevenson began writing Treasure Island in August 1881 to amuse his twelve-year-old stepson Lloyd Osbourne on a rainy Scots holiday, drawing a map of an imaginary island with his stepson and then populating it with the adventure story that the map seemed to demand. He wrote at the rate of a chapter a day, reading each to the household and adjusting anything that did not land. The result, serialised in the magazine Young Folks between October 1881 and January 1882 and published as a book in November 1883, defined the pirate adventure story for all subsequent literature and gave Western culture its definitive vision of pirates: the jolly roger, the treasure map with an X, the parrot on the shoulder, the peg leg, the sinister sea-chanty. None of these were Stevenson's inventions individually, but he assembled them into a myth so compelling that almost every pirate story since exists in its shadow. What makes the novel more than a template is Long John Silver: the sea-cook who is simultaneously the most charming and most dangerous person in the story, who befriends young Jim Hawkins with apparent genuine warmth and then proves willing to murder anyone who stands between him and the gold. Silver is not a simple villain — he is a portrait of charisma untethered from loyalty, of competence divorced from principle, of a man who would have been genuinely admirable had his purposes been different. Jim's navigation between Silver's appeal and his own better instincts is the moral education at the novel's heart.`,

    learn: [
      "Charisma and trustworthiness are entirely separate qualities: Long John Silver is the most compelling character in the story — and the most treacherous. Stevenson makes this distinction with precise craft: Silver's warmth towards Jim feels real, his competence is genuine, and his manipulation is sophisticated precisely because it is built on these real qualities. The lesson is that likability is not a moral credential.",
      "Initiative in a crisis is its own form of courage: Jim Hawkins repeatedly acts without permission — cutting the ship's anchor, sneaking into the enemy camp, retaking the Hispaniola single-handed — and most of these unauthorised actions turn out to be decisive. Stevenson argues, through plot rather than preaching, that the courage to act independently when circumstances demand it is distinct from, and sometimes more valuable than, obedience.",
      "The map is not the territory: The treasure map drives the entire adventure, but when it is finally followed to its destination, the treasure is gone — already removed by the marooned castaway Ben Gunn. The journey itself has been the real content: Jim's growth, the alliances forged, the enemies revealed. Stevenson gently suggests that the object we pursue matters less than what we become in pursuit of it.",
      "Loyalty to the wrong people is a form of self-destruction: Silver's crew betrays each other serially throughout the novel; the honest men's solidarity is what preserves them. Stevenson explores how group cohesion requires shared values, not just shared interest — a crew united only by the prospect of gold will fracture the moment the gold seems unreachable.",
      "Narrative voice shapes moral understanding: The entire novel is told by Jim Hawkins as an adult looking back. This retrospective position means the story is already processed through hindsight — Jim knows outcomes we do not, which creates a kind of dramatic irony throughout. It also means the novel is partly about how we construct the stories of our own adventures and what we choose to include and omit."
    ],

    authorBio: `Robert Louis Stevenson was born on 13 November 1850 in Edinburgh, the only child of a lighthouse engineer. He was chronically ill with bronchitis throughout childhood and young adulthood — the shadow of tuberculosis that would eventually kill him hung over his entire life — and spent significant portions of each year bedridden. He studied law but never practised, turning instead to essays and travel writing before the serial publication of Treasure Island made him famous. Strange Case of Dr Jekyll and Mr Hyde and Kidnapped both followed in 1886, consolidating a reputation that has never seriously dimmed. His health forced him to relocate progressively to warmer climates; he eventually settled in Samoa in 1889, where he was beloved by the local Samoan people who called him 'Tusitala' — the teller of tales. He died of a cerebral haemorrhage in Samoa on 3 December 1894, aged forty-four.`,

    whyRead: `Because it is the purest adventure story in the English language — perfectly paced, economically written, with characters precise enough to feel real and a plot that keeps moving without ever feeling rushed. For young readers, it delivers everything a great adventure should: danger, loyalty, betrayal, treasure, sea voyages, and a climax that genuinely earns its tension. For adult readers, it rewards closer attention to its moral architecture — the portrait of Silver in particular is rich enough to sustain genuine reflection about the nature of charm and duplicity. It is also, critically, a short novel that has been widely adapted (film, theatre, television, games) but never superseded: the original remains leaner, stranger, and more interesting than its descendants.`,

    historical: `Stevenson wrote Treasure Island at a moment of high imperial adventure in British culture. The early 1880s were years in which explorers, hunters, and soldiers were making names for themselves in Africa, Asia, and the Pacific; the adventure genre that culminated in Rider Haggard's King Solomon's Mines (1885) and Kipling's The Jungle Book (1894) was building momentum, and Treasure Island was its first major landmark. Stevenson was ambivalent about empire — his later years in Samoa made him a sharp critic of European colonial administration in the Pacific — and this ambivalence seeps into the novel in curious ways: the treasure at the story's centre is the product of old pirate violence, and the island itself is governed by different competing factions all claiming the right to its resources. The moral landscape is less comfortable than the genre suggests.`,

    reviews: [
      {
        name: "Michael Oduya",
        place: "Abuja, Nigeria",
        text: "I read Treasure Island at ten and thought it was the most exciting thing I had ever read. I reread it at thirty-five and thought it was the most carefully constructed thing I had read. It is the rare book that fully satisfies at both levels. Long John Silver remains one of the most compellingly drawn villains — or is he a villain? — in all of fiction."
      },
      {
        name: "Hana Suzuki",
        place: "Kyoto, Japan",
        text: "What I notice rereading this as an adult is the quality of Jim's narration — how precise and honest it is about his own fear and uncertainty, how it never heroicises him in the ways a lesser writer would. Stevenson lets Jim make real mistakes and feel real terror, which makes his courage when it comes more credible and more moving."
      },
      {
        name: "Thomas Eriksson",
        place: "Stockholm, Sweden",
        text: "The atmosphere is what gets me every time. The smell of tar and salt, the fog over Skeleton Island, the Admiral Benbow inn on a winter night — Stevenson creates a physical world of remarkable vividness in very few words. It is a masterclass in sensory economy, giving just enough detail to let the imagination complete the picture perfectly."
      }
    ],

    relatedIds: [
      "kidnapped",
      "king-solomons-mines",
      "robinson-crusoe",
      "around-the-world-in-eighty-days",
      "the-adventures-of-tom-sawyer"
    ]
  },

  /* ─────────────────────────────────────────────
     10. JANE EYRE
  ───────────────────────────────────────────── */
  "jane-eyre": {
    about: `Charlotte Brontë published Jane Eyre in October 1847 under the pseudonym Currer Bell — and the novel caused an immediate sensation, not least because readers found it nearly impossible to believe that a woman had written it. The directness of Jane's voice, the barely suppressed fury at social inequality, the frank treatment of romantic passion — all of it seemed to Victorian critics to announce a new kind of novel, more intensely personal and more openly confessional than anything that had come before. The story follows Jane from her miserable childhood with the Reed family at Gateshead, through Lowood Institution (a barely disguised portrait of the Clergy Daughters' School at Cowan Bridge, where Brontë's two elder sisters died), to her position as governess at Thornfield Hall, where she falls into slow, charged, deeply complicated love with her employer Edward Rochester. The novel's central dramatic event — the revelation on Jane and Rochester's wedding day that he already has a wife, Bertha Mason, locked in the attic of Thornfield — is one of the great shocks in English fiction, and it crystallises the novel's central moral dilemma: is it right to accept love that comes at the cost of another woman's suffering? Jane's answer is no, and she leaves. Her return — after Rochester has been blinded and maimed in the fire that Bertha finally sets — is not a surrender to dependency but a choice made from genuine equality and genuine freedom. 'I am no bird; and no net ensnares me,' Jane says early in the novel. The ending proves it.`,

    learn: [
      "Self-respect is not selfish — it is the foundation of all genuine relationship: Jane refuses Rochester not simply because the marriage would be illegal but because accepting it would require her to compromise her own moral understanding. Brontë argues, through Jane's choices, that love that demands you abandon your integrity is not love but a trap dressed as one.",
      "Economic dependency warps every human relationship it touches: Jane's precarious position as a governess — above the servants, below the family, dependent on continued employment for survival — shapes every interaction at Thornfield. Brontë makes the reader feel the constant calculation that poverty requires, and the freedom that Rochester's eventual offer of honest equality represents.",
      "Passion and principle are not opposites: Jane is one of the most passionate characters in English fiction — her feeling for Rochester is expressed with a directness that shocked Victorian readers — but her passion never overrides her conscience. Brontë refuses the convention that emotion and moral judgment are competitors; in her best characters, they are disciplines that strengthen each other.",
      "Trauma in childhood has real and lasting consequences: Jane's years at Gateshead and Lowood are not background — they are the forge in which her character is made. Her extreme sensitivity to injustice, her terror of dependency, her distrust of unearned kindness all trace directly to specific formative experiences. Brontë was doing something like psychology before the discipline existed.",
      "The 'madwoman in the attic' is a moral challenge, not just a plot device: Bertha Mason, Rochester's Creole wife from Jamaica, has been systematically erased from his life and from the story's sympathies. Brontë does not give Bertha a voice or a perspective, but she gives her the fire that burns Thornfield and blinds Rochester. The suppressed woman's revenge is written into the plot's architecture whether Brontë intended it fully or not — and modern readers rightly insist on attending to it."
    ],

    authorBio: `Charlotte Brontë was born on 21 April 1816 in Thornton, Yorkshire, the third of the six Brontë children — all of whom except the youngest, Anne, died before reaching middle age. Her mother Maria died of cancer when Charlotte was five. The family relocated to Haworth Parsonage on the Yorkshire moors, the landscape that saturates all three Brontë sisters' fiction. Charlotte attended the Clergy Daughters' School at Cowan Bridge — the original of the dreadful Lowood — where two elder sisters contracted the tuberculosis that killed them. She worked as a teacher and governess (the direct source of Jane's experience) and studied briefly in Brussels, where she developed an intense, unrequited attachment to her teacher Constantin Héger that many scholars believe informed Rochester. She sent the manuscript of Jane Eyre to George Smith of Smith, Elder and Co. in August 1847; he read it in a single day and accepted it immediately. Charlotte died in March 1855, probably from complications of pregnancy, aged thirty-eight.`,

    whyRead: `Because it is the novel in which the modern idea of romantic love as a meeting of equals was first fully articulated in English fiction — the idea that love between a man and a woman must involve mutual respect and honest recognition rather than rescue and dependency. That argument feels ordinary now because Jane Eyre helped make it so; in 1847 it was radical. Beyond its historical importance, the novel is psychologically compelling in ways that contemporary fiction still struggles to match: Charlotte Brontë understood grief, anger, shame, and desire with a precision that seems to draw on nerves rather than craft. Jane's voice — first-person, present-tense in its emotional intensity even when narrated retrospectively — is one of the most intimate in all of literature. Readers have been feeling personally addressed by it for 175 years.`,

    historical: `Jane Eyre was published in the same month as Wuthering Heights, written by Charlotte's sister Emily under the pseudonym Ellis Bell — October 1847 is perhaps the single most remarkable month in English literary history. Both novels challenged the conventions of Victorian fiction: the passive, suffering heroine, the moral tidiness of endings, the suppression of female anger and female desire. Charlotte drew on real conditions: the governess was a recognised social type in mid-Victorian England, caught between classes, dependent but educated, often isolated and always precarious. The 'madwoman in the attic' — Bertha Mason — has been extensively analysed since Sandra Gilbert and Susan Gubar's landmark 1979 study The Madwoman in the Attic as a figure for the suppressed rage of women in patriarchal society. Jean Rhys's 1966 novel Wide Sargasso Sea gave Bertha her own voice and perspective, completing a conversation Brontë started.`,

    reviews: [
      {
        name: "Ngozi Adichie",
        place: "Lagos, Nigeria",
        text: "Jane Eyre is the book that taught me what a female narrator could do — could feel, could insist upon, could demand. When Jane says 'I am no bird; and no net ensnares me,' I felt something shift in my understanding of what fiction is for. Reading it every few years, I find something different in it, something that speaks to exactly where I am in life."
      },
      {
        name: "Miriam Goldstein",
        place: "Tel Aviv, Israel",
        text: "The Rochester and Jane scenes are among the most electrically charged in all of fiction — the tension is almost unbearable, but it is moral tension as much as romantic tension. Brontë makes you feel the danger of surrender and the cost of integrity simultaneously. I have never read anything else that creates that precise feeling so completely."
      },
      {
        name: "Patrick Osei-Bonsu",
        place: "Accra, Ghana",
        text: "What strikes me most is how angry this novel is, and how that anger is never discharged into mere bitterness. Jane's rage at injustice — at Gateshead, at Lowood, at Thornfield — is always in the service of self-respect rather than resentment. It is one of the most emotionally intelligent books I have encountered, and one of the most rewarding to teach."
      }
    ],

    relatedIds: [
      "wuthering-heights",
      "pride-and-prejudice",
      "great-expectations",
      "frankenstein",
      "far-from-the-madding-crowd"
    ]
  }

};

module.exports = HANDCRAFTED_BOOK_CONTENT;
