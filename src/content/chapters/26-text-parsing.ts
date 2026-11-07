import { topic, type Chapter, type InterviewQA } from '../types'

type LessonImage = {
  src: string
  alt: string
  title?: string
  caption?: string
  width: number
  height: number
  fit: 'cover' | 'contain'
}

type Lesson = {
  slug: string
  title: string
  summary: string
  definition: string
  why: string
  purpose: string
  when: string[]
  simpleExample: string
  realLife: {
    problem: string
    approach: string[]
    outcome: string
  }
  tasks: [string, string, string]
  questions: InterviewQA[]
  detail?: string
  code?: string
  pitfalls?: string[]
  images?: LessonImage[]
}

function lesson(data: Lesson) {
  return topic(
    data.slug,
    data.title,
    data.summary,
    {
      definition: data.definition,
      whyUsed: data.why,
      whenToUse: data.when,
    },
    [
      { heading: 'What it is', body: data.definition },
      { heading: 'Why it matters', body: data.why },
      { heading: 'Purpose', body: data.purpose },
      {
        heading: 'When to use it',
        body: data.when.map((item) => `- ${item}`).join('\n'),
      },
      { heading: 'Simple example', body: data.simpleExample },
      ...(data.detail
        ? [{ heading: 'How it works', body: data.detail }]
        : []),
    ],
    {
      title: `Real-life example: ${data.title}`,
      domain: 'nlp',
      problem: data.realLife.problem,
      approach: data.realLife.approach,
      outcome: data.realLife.outcome,
    },
    [
      {
        id: `${data.slug}-task-1`,
        title: 'Understand it',
        difficulty: 'easy',
        task: data.tasks[0],
        expectedOutcome:
          'Explain the concept in your own words and provide a simple example.',
      },
      {
        id: `${data.slug}-task-2`,
        title: 'Explore it',
        difficulty: 'medium',
        task: data.tasks[1],
        expectedOutcome:
          'Understand the important components and how the technique works.',
      },
      {
        id: `${data.slug}-task-3`,
        title: 'Apply it',
        difficulty: 'hard',
        task: data.tasks[2],
        expectedOutcome:
          'Build a practical solution, analyze its output, and explain its limitations.',
      },
    ],
    data.questions,
    {
      code: data.code
        ? [
            {
              title: `Python example: ${data.title}`,
              lang: 'python',
              source: data.code,
            },
          ]
        : undefined,
      pitfalls: data.pitfalls,
      images: data.images,
    },
  )
}

const ch: Chapter = {
  id: 'text-parsing',
  number: 25,
  title: 'Text Parsing',
  tagline:
    'Understand how computers analyze sentence structure, identify grammatical relationships, and build meaningful syntax trees.',
  priority: 'extreme',

  topics: [
    lesson({
      slug: 'syntax-parsing',
      title: 'Syntax Parsing',
      summary:
        'The process of analyzing a sentence to understand its grammatical structure and relationships between words.',

      definition:
        'Syntax Parsing is an NLP technique used to analyze the grammatical structure of a sentence.\n\nIt identifies how words are arranged and how they are related to one another.\n\nFor example, it can identify the subject, verb, and object in a sentence and represent their relationships using a tree structure.',

      why:
        'Understanding individual words is not always enough to understand a sentence.\n\nFor example:\n\n"The dog chased the cat."\n"The cat chased the dog."\n\nBoth sentences contain almost the same words, but their meanings are different because the grammatical relationships are different.\n\nSyntax parsing helps a computer understand these structural relationships.',

      purpose:
        'The purpose of syntax parsing is to identify the grammatical structure of a sentence.\n\nIt helps NLP systems understand sentence organization, identify grammatical roles, and process relationships between words.',

      when: [
        'When identifying the subject, verb, and object of a sentence.',
        'When analyzing sentence grammar.',
        'When building question-answering systems.',
        'When developing machine translation systems.',
        'When extracting relationships between entities.',
        'When analyzing complex sentence structures.',
      ],

      simpleExample:
        'Consider this sentence:\n\n"The boy eats an apple."\n\nThe sentence contains:\n\n- Subject: The boy\n- Verb: eats\n- Object: an apple\n\nA syntax parser identifies these grammatical relationships.\n\nA simplified tree structure looks like this:\n\nSentence (S)\n├── Noun Phrase (NP): The boy\n└── Verb Phrase (VP)\n    ├── Verb (V): eats\n    └── Noun Phrase (NP): an apple\n\nThis structure helps a computer understand who performs the action and what receives the action.',

      detail:
        'Syntax parsing generally produces one of two important structures:\n\n**1. Constituency Parsing**\n\nIt divides a sentence into groups of words called constituents or phrases.\n\nFor example:\n\n"The small boy eats an apple."\n\n- Noun Phrase (NP): The small boy\n- Verb Phrase (VP): eats an apple\n\nThese phrases can be represented using a tree.\n\n**2. Dependency Parsing**\n\nIt identifies relationships between individual words.\n\nFor example:\n\n"The boy eats an apple."\n\n- eats → Root verb\n- boy → Subject of eats\n- apple → Object of eats\n- The → Determiner of boy\n- an → Determiner of apple\n\nConstituency parsing focuses on phrase groups, while dependency parsing focuses on relationships between words.',

      realLife: {
        problem:
          'A question-answering application needs to understand who performed an action and what object was involved.',
        approach: [
          'Receive a sentence from the user.',
          'Tokenize the sentence into individual words.',
          'Apply a syntax parser.',
          'Identify the grammatical relationships between words.',
          'Extract the subject, action, and object.',
        ],
        outcome:
          'The application can use sentence structure to identify important relationships and improve its understanding of the user query.',
      },

      tasks: [
        'Take five English sentences and manually identify their subjects, verbs, and objects.',
        'Use spaCy to perform dependency parsing on sample sentences.',
        'Build a simple information extraction application that identifies subjects, actions, and objects.',
      ],

      code: `import spacy

nlp = spacy.load("en_core_web_sm")

sentence = "The boy eats an apple."

doc = nlp(sentence)

for token in doc:
    print(
        token.text,
        token.dep_,
        token.head.text,
        token.pos_
    )

print("\\nSubject:")
for token in doc:
    if token.dep_ == "nsubj":
        print(token.text)

print("\\nObject:")
for token in doc:
    if token.dep_ in ["dobj", "obj"]:
        print(token.text)`,

      pitfalls: [
        'A sentence can have more than one possible grammatical structure.',
        'Long and complex sentences can be difficult to parse correctly.',
        'Ambiguous words can create multiple possible interpretations.',
        'Different languages follow different grammatical rules.',
        'A parsing error can affect downstream NLP tasks.',
      ],

      questions: [
        {
          q: 'What is syntax parsing?',
          a: 'Syntax parsing is the process of analyzing the grammatical structure of a sentence and identifying relationships between its words.',
        },
        {
          q: 'Why is syntax parsing important in NLP?',
          a: 'It helps computers understand sentence structure, grammatical roles, and relationships between words.',
        },
        {
          q: 'What are the two main types of syntax parsing?',
          a: 'The two main types are Constituency Parsing and Dependency Parsing.',
        },
        {
          q: 'What is constituency parsing?',
          a: 'Constituency parsing divides a sentence into grammatical groups called phrases, such as noun phrases and verb phrases.',
        },
        {
          q: 'What is dependency parsing?',
          a: 'Dependency parsing identifies grammatical relationships between individual words, such as subject, object, and modifier.',
        },
        {
          q: 'What is the difference between constituency and dependency parsing?',
          a: 'Constituency parsing focuses on groups of words, while dependency parsing focuses on relationships between individual words.',
        },
      ],
    }),

    lesson({
      slug: 'grammar-formalisms',
      title: 'Grammar Formalisms',
      summary:
        'Formal systems that describe the grammatical rules used to construct valid sentences in a language.',

      definition:
        'Grammar Formalisms are structured systems used to describe how words and phrases can be combined to form sentences.\n\nThey define grammatical rules that explain which word combinations are valid and how sentence structures can be organized.\n\nIn NLP, grammar formalisms help computers represent and analyze the structure of human language.',

      why:
        'Human languages follow grammatical patterns. For example, English sentences commonly follow a subject-verb-object structure.\n\nA computer needs a formal way to represent these patterns so that it can analyze sentences consistently.\n\nGrammar formalisms provide the rules and structures required for this process.',

      purpose:
        'The purpose of grammar formalisms is to represent the grammatical rules and structures of natural language in a precise and organized way.\n\nThey are used in parsing, grammar checking, language understanding, and computational linguistics.',

      when: [
        'When defining grammatical rules for a language.',
        'When building syntax parsers.',
        'When analyzing sentence structures.',
        'When designing grammar-based NLP systems.',
        'When studying computational linguistics.',
      ],

      simpleExample:
        'Consider the sentence:\n\n"The girl reads a book."\n\nA simple grammar can describe its structure using rules:\n\nS → NP VP\nNP → Det N\nVP → V NP\nDet → The | a\nN → girl | book\nV → reads\n\nThese rules explain how the sentence can be constructed:\n\n- S represents a sentence.\n- NP represents a noun phrase.\n- VP represents a verb phrase.\n- Det represents a determiner.\n- N represents a noun.\n- V represents a verb.\n\nThe rules provide a formal description of the sentence structure.',

      detail:
        'Different grammar formalisms describe language structure in different ways.\n\nSome important approaches include:\n\n**1. Context-Free Grammar (CFG)**\n\nUses production rules to describe how phrases can be constructed.\n\n**2. Dependency Grammar**\n\nDescribes grammatical relationships between individual words.\n\n**3. Feature-Based Grammar**\n\nUses grammatical features such as number, gender, person, and tense to describe and restrict valid structures.\n\n**4. Tree-Adjoining Grammar (TAG)**\n\nUses structured tree fragments that can be combined to represent more complex sentence structures.\n\nThese approaches provide different ways to describe the grammar of natural language.',

      realLife: {
        problem:
          'A language-learning application needs to check whether a sentence follows basic English grammatical patterns.',
        approach: [
          'Define grammatical categories such as nouns, verbs, and determiners.',
          'Create grammar rules describing valid phrase structures.',
          'Analyze user sentences using a grammar-based parser.',
          'Check whether the sentence follows the defined rules.',
          'Identify possible grammatical structure problems.',
        ],
        outcome:
          'The application can use formal grammar rules to analyze sentence structures and provide basic grammar feedback.',
      },

      tasks: [
        'Learn the meaning of grammar symbols such as S, NP, VP, N, and V.',
        'Write simple grammar rules for sentences such as "The boy plays football".',
        'Build a basic grammar-based sentence parser using NLTK.',
      ],

      code: `import nltk

grammar = nltk.CFG.fromstring("""
    S -> NP VP
    NP -> Det N
    VP -> V NP
    Det -> "the" | "a"
    N -> "boy" | "ball"
    V -> "kicks"
""")

parser = nltk.ChartParser(grammar)

sentence = ["the", "boy", "kicks", "a", "ball"]

for tree in parser.parse(sentence):
    print(tree)
    tree.pretty_print()`,

      pitfalls: [
        'A simple grammar may not represent every possible sentence in a natural language.',
        'Different grammar formalisms have different strengths and limitations.',
        'Natural language contains ambiguity that cannot always be resolved using simple rules.',
        'Grammar rules may need to account for agreement, tense, and other grammatical features.',
        'A grammar designed for one language may not work correctly for another language.',
      ],

      questions: [
        {
          q: 'What are grammar formalisms?',
          a: 'Grammar formalisms are structured systems used to describe grammatical rules and how words and phrases combine to form sentences.',
        },
        {
          q: 'Why are grammar formalisms used in NLP?',
          a: 'They provide a formal way for computers to represent and analyze sentence structures.',
        },
        {
          q: 'Name some grammar formalisms.',
          a: 'Examples include Context-Free Grammar, Dependency Grammar, Feature-Based Grammar, and Tree-Adjoining Grammar.',
        },
        {
          q: 'What is a production rule?',
          a: 'A production rule describes how a grammatical symbol can be expanded into other grammatical symbols or words.',
        },
        {
          q: 'What is the difference between CFG and Dependency Grammar?',
          a: 'CFG describes how phrases are constructed using grammar rules, while Dependency Grammar describes relationships between individual words.',
        },
      ],
    }),

    lesson({
      slug: 'treebanks',
      title: 'Treebanks',
      summary:
        'Collections of sentences that have been annotated with grammatical structures and parsing information.',

      definition:
        'A Treebank is a collection of sentences that have been annotated with their grammatical structure.\n\nEach sentence is usually associated with a syntax tree or dependency structure that shows how its words are related.\n\nTreebanks are important datasets used to train and evaluate NLP parsing systems.',

      why:
        'A parser needs examples of correctly analyzed sentences to learn how language is structured.\n\nTreebanks provide these examples by storing sentences along with their grammatical annotations.\n\nThey help researchers train parsing models and measure how accurately those models understand sentence structure.',

      purpose:
        'The purpose of a treebank is to provide structured and annotated language data for computational linguistics and NLP.\n\nIt is commonly used for training parsers, evaluating parsing systems, and studying grammatical patterns.',

      when: [
        'When training a statistical or machine learning parser.',
        'When evaluating the accuracy of a parsing model.',
        'When studying grammatical structures in a language.',
        'When developing language-specific NLP systems.',
        'When building datasets for computational linguistics research.',
      ],

      simpleExample:
        'Consider this sentence:\n\n"The dog chased the cat."\n\nA treebank stores the sentence along with its grammatical structure.\n\nA simplified dependency annotation could be:\n\n- chased → Root verb\n- dog → Subject of chased\n- cat → Object of chased\n- The → Determiner of dog\n- the → Determiner of cat\n\nThis annotated example teaches a parser how words are related in a sentence.',

      detail:
        'A treebank usually contains:\n\n1. Sentences: The original text.\n2. Tokens: Individual words or punctuation marks.\n3. Part-of-speech tags: Labels such as noun, verb, adjective, and adverb.\n4. Syntax annotations: Constituency trees or dependency relationships.\n5. Additional information: Depending on the treebank, it may include lemmas, grammatical features, and semantic annotations.\n\nPopular resources include:\n\n- Penn Treebank: A well-known English treebank containing syntactic annotations.\n- Universal Dependencies: A multilingual framework and collection of treebanks using consistent grammatical annotation guidelines.\n\nTreebanks provide annotated examples that can be used as reference data for parsing systems.',

      realLife: {
        problem:
          'A research team wants to develop a parser that can identify grammatical relationships in English sentences.',
        approach: [
          'Choose an annotated dataset such as Penn Treebank or Universal Dependencies.',
          'Load sentences and their grammatical annotations.',
          'Use the annotated examples to train a parsing model.',
          'Test the model on sentences that were not used for training.',
          'Compare predicted structures with the correct annotations.',
        ],
        outcome:
          'The research team can train and evaluate a parser using real examples of grammatically annotated sentences.',
      },

      tasks: [
        'Understand the difference between ordinary text and syntactically annotated text.',
        'Explore a few sentences from the Universal Dependencies treebank.',
        'Load a treebank dataset and inspect its words, tags, and dependency relationships.',
      ],

      code: `import nltk

nltk.download("treebank")

from nltk.corpus import treebank

sentences = treebank.sents()

print("First Sentence:")
print(sentences[0])

print("\\nFirst Parsed Sentence:")
tree = treebank.parsed_sents()[0]

print(tree)
tree.pretty_print()

print("\\nNumber of Sentences:")
print(len(sentences))`,

      pitfalls: [
        'Creating a treebank requires careful manual or assisted annotation.',
        'Different treebanks may follow different annotation guidelines.',
        'A model trained on one treebank may not perform equally well on another domain.',
        'Annotation mistakes can affect the quality of trained parsing models.',
        'Treebanks may not contain enough examples for rare grammatical structures.',
      ],

      questions: [
        {
          q: 'What is a treebank?',
          a: 'A treebank is a collection of sentences annotated with grammatical structures, such as constituency trees or dependency relationships.',
        },
        {
          q: 'Why are treebanks important in NLP?',
          a: 'They provide annotated examples for training, evaluating, and studying syntactic parsing systems.',
        },
        {
          q: 'What information can a treebank contain?',
          a: 'It can contain sentences, tokens, part-of-speech tags, grammatical features, and syntactic annotations.',
        },
        {
          q: 'What is the Penn Treebank?',
          a: 'Penn Treebank is a well-known English language dataset containing syntactic annotations used in NLP research.',
        },
        {
          q: 'What is Universal Dependencies?',
          a: 'Universal Dependencies is a multilingual framework and collection of treebanks that provides consistent grammatical annotation guidelines.',
        },
        {
          q: 'How are treebanks used to evaluate parsers?',
          a: 'The parser predicts grammatical structures for test sentences, and its predictions are compared with the annotated reference structures.',
        },
      ],
    }),

    lesson({
      slug: 'context-free-grammars',
      title: 'Context-Free Grammars (CFG)',
      summary:
        'A formal grammar system that describes how words and phrases combine to form valid sentence structures.',

      definition:
        'A Context-Free Grammar (CFG) is a formal system used to describe the structure of sentences using production rules.\n\nEach rule explains how a grammatical symbol can be replaced by other symbols or words.\n\nCFG is widely used in syntax parsing because it can represent phrase structures such as noun phrases and verb phrases.',

      why:
        'A computer needs rules to understand how words can be grouped into meaningful phrases.\n\nFor example, a noun phrase may contain a determiner followed by a noun.\n\nContext-Free Grammar provides a simple and organized way to represent these grammatical patterns.',

      purpose:
        'The purpose of CFG is to define the grammatical structure of a language using production rules.\n\nIt helps parsers determine whether a sentence can be generated by a grammar and construct its possible syntax trees.',

      when: [
        'When defining simple sentence structures.',
        'When building rule-based syntax parsers.',
        'When analyzing noun phrases and verb phrases.',
        'When learning constituency parsing.',
        'When studying formal language theory and computational linguistics.',
      ],

      simpleExample:
        'Consider the sentence:\n\n"The boy plays football."\n\nA simple CFG can use these rules:\n\nS → NP VP\nNP → Det N\nVP → V N\nDet → The\nN → boy | football\nV → plays\n\nThe sentence is generated as follows:\n\nS\n├── NP\n│   ├── Det: The\n│   └── N: boy\n└── VP\n    ├── V: plays\n    └── N: football\n\nThe grammar explains how the sentence is divided into grammatical components.',

      detail:
        'A Context-Free Grammar is generally represented using four components:\n\nG = (V, Σ, R, S)\n\nWhere:\n\n- V: Set of non-terminal symbols, such as S, NP, and VP.\n- Σ: Set of terminal symbols, such as actual words.\n- R: Set of production rules.\n- S: Start symbol representing the complete sentence.\n\nExample production rules:\n\nS → NP VP\nNP → Det N\nVP → V NP\nDet → the | a\nN → boy | ball\nV → kicks\n\nThe parser starts with S and repeatedly applies production rules until it generates the input sentence.\n\nA CFG can generate more than one possible parse tree for an ambiguous sentence.',

      realLife: {
        problem:
          'A language-learning application needs to identify whether a simple sentence follows a predefined grammatical structure.',
        approach: [
          'Define grammatical symbols such as S, NP, VP, Det, N, and V.',
          'Write production rules describing valid sentence structures.',
          'Tokenize the input sentence.',
          'Use a CFG parser to check whether the sentence can be generated.',
          'Display the resulting parse tree.',
        ],
        outcome:
          'The application can analyze sentences using explicit grammatical rules and display their phrase structures.',
      },

      tasks: [
        'Learn the difference between terminal and non-terminal symbols.',
        'Write CFG production rules for simple English sentences.',
        'Build a parser using NLTK that generates parse trees for multiple sentences.',
      ],

      code: `import nltk

grammar = nltk.CFG.fromstring("""
    S -> NP VP
    NP -> Det N
    VP -> V NP
    Det -> "the" | "a"
    N -> "boy" | "girl" | "ball"
    V -> "kicks" | "throws"
""")

parser = nltk.ChartParser(grammar)

sentences = [
    ["the", "boy", "kicks", "a", "ball"],
    ["the", "girl", "throws", "the", "ball"]
]

for sentence in sentences:
    print("\\nSentence:", " ".join(sentence))

    for tree in parser.parse(sentence):
        print(tree)
        tree.pretty_print()`,

      pitfalls: [
        'A basic CFG may not capture every grammatical rule of a natural language.',
        'Ambiguous sentences can generate multiple parse trees.',
        'A grammar needs enough production rules to cover the sentences being analyzed.',
        'Basic CFG rules do not automatically enforce agreement between words.',
        'Large grammars can become difficult to maintain.',
      ],

      questions: [
        {
          q: 'What is a Context-Free Grammar?',
          a: 'A CFG is a formal grammar that describes sentence structures using production rules.',
        },
        {
          q: 'What are the four components of a CFG?',
          a: 'A CFG contains non-terminal symbols, terminal symbols, production rules, and a start symbol.',
        },
        {
          q: 'What are terminal symbols?',
          a: 'Terminal symbols are the actual words or tokens that appear in the final sentence.',
        },
        {
          q: 'What are non-terminal symbols?',
          a: 'Non-terminal symbols represent grammatical categories such as Sentence, Noun Phrase, and Verb Phrase.',
        },
        {
          q: 'What is a production rule?',
          a: 'A production rule defines how a non-terminal symbol can be expanded into other symbols.',
        },
        {
          q: 'Can a CFG generate multiple parse trees for one sentence?',
          a: 'Yes. An ambiguous grammar can generate multiple valid parse trees for the same sentence.',
        },
      ],
    }),

    lesson({
      slug: 'features-and-unification',
      title: 'Features and Unification',
      summary:
        'A grammar technique that uses grammatical properties and checks whether they are compatible when combining words and phrases.',

      definition:
        'Features and Unification are concepts used in feature-based grammar systems to represent and check grammatical information.\n\nFeatures describe properties of words or phrases, such as number, gender, person, and tense.\n\nUnification is the process of combining feature structures when their values are compatible.',

      why:
        'Basic grammar rules may allow sentence structures that are grammatically incorrect.\n\nFor example:\n\n"The boy plays football." → Correct\n"The boy play football." → Incorrect in standard present-tense agreement.\n\nFeatures and unification help grammar systems check whether grammatical properties agree when phrases are combined.',

      purpose:
        'The purpose of features and unification is to represent grammatical information and enforce constraints between different parts of a sentence.\n\nIt helps grammar systems handle subject-verb agreement, number agreement, gender agreement, and other grammatical relationships.',

      when: [
        'When checking subject-verb agreement.',
        'When representing grammatical properties of words.',
        'When building feature-based grammar systems.',
        'When handling agreement between noun phrases and verb phrases.',
        'When designing grammar rules that need additional constraints.',
      ],

      simpleExample:
        'Consider these sentences:\n\n"The boy plays football."\n"The boys play football."\n\nThe subject and verb must agree in number.\n\nWe can represent their features as:\n\nSingular subject:\nNumber = Singular\n\nSingular verb:\nNumber = Singular\n\nPlural subject:\nNumber = Plural\n\nPlural verb:\nNumber = Plural\n\nUnification checks whether the features are compatible.\n\n"The boy plays" → Compatible\n"The boys plays" → Not compatible under these simplified rules.',

      detail:
        'A feature structure stores grammatical properties as key-value pairs.\n\nExample noun phrase:\n\nNP = {\n  Number: Singular,\n  Person: Third,\n  Gender: Masculine\n}\n\nExample verb phrase:\n\nVP = {\n  Number: Singular,\n  Person: Third,\n  Tense: Present\n}\n\nDuring unification, compatible feature values are combined into a unified structure.\n\nFor example:\n\nNumber = Singular + Number = Singular → Successful unification.\n\nNumber = Singular + Number = Plural → Unification failure.\n\nA grammar can use these constraints to prevent incompatible grammatical structures from being combined.',

      realLife: {
        problem:
          'A grammar-checking application needs to identify sentences where the subject and verb do not agree.',
        approach: [
          'Identify grammatical features such as number and person.',
          'Assign features to nouns, noun phrases, and verbs.',
          'Create grammar rules that require compatible features.',
          'Apply unification when combining grammatical structures.',
          'Flag structures where required feature values do not match.',
        ],
        outcome:
          'The application can identify certain grammatical agreement problems that simple phrase structure rules may not detect.',
      },

      tasks: [
        'Understand grammatical features such as number, person, gender, and tense.',
        'Create feature structures for singular and plural nouns and verbs.',
        'Build a simple agreement checker that identifies subject-verb number mismatches.',
      ],

      code: `def unify_features(first, second):
    result = first.copy()

    for feature, value in second.items():
        if feature in result and result[feature] != value:
            return None

        result[feature] = value

    return result


singular_subject = {
    "number": "singular",
    "person": "third"
}

singular_verb = {
    "number": "singular",
    "person": "third"
}

plural_verb = {
    "number": "plural",
    "person": "third"
}

print("Compatible Features:")
print(unify_features(singular_subject, singular_verb))

print("\\nIncompatible Features:")
print(unify_features(singular_subject, plural_verb))`,

      pitfalls: [
        'Not all grammatical relationships can be represented using only number and person.',
        'Feature structures can become complex when many grammatical properties are included.',
        'Different languages may use different agreement rules.',
        'A successful unification does not guarantee that the complete sentence is grammatically correct.',
        'Missing or incorrectly assigned feature values can lead to incorrect results.',
      ],

      questions: [
        {
          q: 'What are grammatical features?',
          a: 'Grammatical features are properties of words or phrases, such as number, person, gender, and tense.',
        },
        {
          q: 'What is unification in NLP?',
          a: 'Unification is the process of combining feature structures when their values are compatible.',
        },
        {
          q: 'Why are features and unification used?',
          a: 'They help grammar systems check grammatical agreement and prevent incompatible structures from being combined.',
        },
        {
          q: 'What is subject-verb agreement?',
          a: 'Subject-verb agreement means that the verb form should match the subject in grammatical properties such as number and person.',
        },
        {
          q: 'What happens when two feature structures have conflicting values?',
          a: 'Unification fails because the structures contain incompatible feature values.',
        },
        {
          q: 'Can unification identify every grammatical error?',
          a: 'No. It checks the constraints represented in the feature system, but it cannot automatically detect every grammatical or semantic problem.',
        },
      ],
    }),

    lesson({
      slug: 'statistical-parsing',
      title: 'Statistical Parsing',
      summary:
        'A parsing approach that uses probabilities learned from annotated language data to identify the most likely sentence structure.',

      definition:
        'Statistical Parsing is an NLP technique that uses statistical models and probabilities to determine the grammatical structure of a sentence.\n\nInstead of relying only on manually written grammar rules, statistical parsers learn patterns from previously annotated sentences.\n\nWhen a sentence has multiple possible parse trees, the parser can use learned probabilities to select the most likely structure.',

      why:
        'Natural language often contains ambiguous sentences that can have more than one grammatical interpretation.\n\nA rule-based parser may generate multiple possible structures without knowing which one is most likely.\n\nStatistical parsing uses information learned from real language examples to choose a likely interpretation.',

      purpose:
        'The purpose of statistical parsing is to identify the most likely grammatical structure of a sentence using statistical patterns learned from annotated data.\n\nIt helps improve parsing accuracy and handle ambiguity in natural language.',

      when: [
        'When analyzing sentences with multiple possible structures.',
        'When building data-driven syntax parsers.',
        'When working with annotated treebank datasets.',
        'When developing language understanding applications.',
        'When selecting the most likely parse tree from multiple candidates.',
      ],

      simpleExample:
        'Consider this sentence:\n\n"I saw the man with a telescope."\n\nThis sentence can have two meanings:\n\n1. I used a telescope to see the man.\n2. I saw a man who had a telescope.\n\nBoth interpretations can produce different grammatical structures.\n\nA statistical parser uses patterns learned from training data to estimate which structure is more likely in a given context.',

      detail:
        'Statistical parsing generally follows these steps:\n\n1. Collect annotated sentences from a treebank.\n2. Extract grammatical patterns from the annotated data.\n3. Estimate probabilities for possible grammatical structures.\n4. Generate possible parses for a new sentence.\n5. Calculate or compare their probabilities.\n6. Select the most likely parse.\n\nCommon statistical parsing approaches include:\n\n- Probabilistic Context-Free Grammar (PCFG).\n- Lexicalized Parsing.\n- Data-driven Dependency Parsing.\n\nStatistical parsers use evidence from language data instead of depending entirely on manually defined rules.',

      realLife: {
        problem:
          'A search application receives sentences that contain ambiguous grammatical structures and needs to understand the most likely relationships between words.',
        approach: [
          'Collect sentences with grammatical annotations.',
          'Train a statistical parsing model using the annotated examples.',
          'Provide a new sentence to the trained parser.',
          'Generate possible grammatical structures.',
          'Use learned probabilities to select the most likely structure.',
        ],
        outcome:
          'The application can use patterns learned from real sentences to make more informed parsing decisions.',
      },

      tasks: [
        'Understand the difference between rule-based and statistical parsing.',
        'Explore a treebank and learn how a statistical parser uses annotated examples.',
        'Compare possible parses of ambiguous sentences using a probabilistic parsing approach.',
      ],

      code: `import nltk

grammar = nltk.PCFG.fromstring("""
    S -> NP VP [1.0]
    NP -> Det N [0.7] | N [0.3]
    VP -> V NP [0.6] | V [0.4]
    Det -> "the" [1.0]
    N -> "boy" [0.5] | "ball" [0.5]
    V -> "kicks" [1.0]
""")

parser = nltk.ViterbiParser(grammar)

sentence = ["the", "boy", "kicks", "the", "ball"]

for tree in parser.parse(sentence):
    print(tree)
    print("Probability:", tree.prob())`,

      pitfalls: [
        'Statistical parsing requires suitable training data.',
        'The parser may perform poorly on domains that differ from its training data.',
        'Rare grammatical structures may not have enough examples.',
        'Incorrect treebank annotations can affect model quality.',
        'The most probable parse is not guaranteed to be the correct interpretation.',
      ],

      questions: [
        {
          q: 'What is statistical parsing?',
          a: 'Statistical parsing uses probabilities learned from annotated language data to identify the most likely grammatical structure of a sentence.',
        },
        {
          q: 'Why is statistical parsing useful?',
          a: 'It helps handle grammatical ambiguity by using patterns learned from real language examples.',
        },
        {
          q: 'What is the difference between rule-based and statistical parsing?',
          a: 'Rule-based parsing mainly uses manually defined grammar rules, while statistical parsing uses probabilities learned from annotated data.',
        },
        {
          q: 'What is a treebank used for in statistical parsing?',
          a: 'A treebank provides sentences with grammatical annotations that can be used to train and evaluate statistical parsers.',
        },
        {
          q: 'How does a statistical parser handle ambiguity?',
          a: 'It compares possible parse structures using learned probabilities and selects the most likely one.',
        },
      ],
    }),

    lesson({
      slug: 'probabilistic-cfg',
      title: 'Probabilistic Context-Free Grammars (PCFG)',
      summary:
        'An extension of Context-Free Grammar that assigns probabilities to grammar rules to select the most likely sentence structure.',

      definition:
        'A Probabilistic Context-Free Grammar (PCFG) is a Context-Free Grammar in which each production rule has an associated probability.\n\nA normal CFG describes which grammatical structures are possible. A PCFG also estimates how likely each structure is.\n\nIt helps a parser choose between multiple possible parse trees.',

      why:
        'A normal Context-Free Grammar can generate multiple parse trees for an ambiguous sentence.\n\nHowever, it does not tell us which parse tree is more likely.\n\nPCFG adds probabilities to production rules so that a parser can compare possible structures and choose the most probable one.',

      purpose:
        'The purpose of PCFG is to represent grammatical rules together with their probabilities.\n\nIt is used for probabilistic syntax parsing, ambiguity resolution, and selecting likely grammatical structures.',

      when: [
        'When a sentence can have multiple possible parse trees.',
        'When selecting the most probable grammatical structure.',
        'When building statistical constituency parsers.',
        'When learning grammar patterns from treebanks.',
        'When combining grammar rules with statistical information.',
      ],

      simpleExample:
        'Suppose a grammar contains these rules:\n\nS → NP VP [1.0]\nNP → Det N [0.7]\nNP → N [0.3]\nVP → V NP [0.6]\nVP → V [0.4]\n\nThe values in brackets represent probabilities.\n\nFor example:\n\nNP → Det N [0.7]\n\nThis means that, according to this grammar, 70% of the NP expansions use a determiner followed by a noun.\n\nWhen multiple parse trees are possible, PCFG calculates their probabilities and prefers the tree with the higher probability.',

      detail:
        'A PCFG extends a normal CFG by assigning a probability to every production rule.\n\nFor each non-terminal symbol, the probabilities of its alternative production rules should add up to 1.\n\nExample:\n\nNP → Det N [0.7]\nNP → N [0.3]\n\n0.7 + 0.3 = 1.0\n\nThe probability of a complete parse tree is calculated by multiplying the probabilities of the production rules used in that tree.\n\nFormula:\n\nP(Tree) = Product of the probabilities of all rules used in the tree.\n\nIf two parse trees are possible, the parser can compare their probabilities and select the tree with the higher probability.\n\nThe probabilities can be estimated from a treebank by counting how often each production rule is used for a particular non-terminal.',

      realLife: {
        problem:
          'A grammar parser receives a sentence that can be interpreted in multiple ways and needs to choose the most likely grammatical structure.',
        approach: [
          'Collect syntactically annotated sentences from a treebank.',
          'Extract production rules from the annotated trees.',
          'Calculate probabilities for alternative grammar rules.',
          'Generate possible parse trees for a new sentence.',
          'Calculate the probability of each parse tree.',
          'Choose the parse tree with the highest probability.',
        ],
        outcome:
          'The parser can use learned grammatical patterns to select the most probable structure instead of treating all valid structures equally.',
      },

      tasks: [
        'Understand the difference between CFG and PCFG.',
        'Create a small PCFG with production rules and probabilities using NLTK.',
        'Generate parse trees for a sentence and compare their probabilities.',
      ],

      code: `import nltk

grammar = nltk.PCFG.fromstring("""
    S -> NP VP [1.0]

    NP -> Det N [0.6]
    NP -> N [0.4]

    VP -> V NP [0.7]
    VP -> V [0.3]

    Det -> "the" [1.0]

    N -> "boy" [0.5]
    N -> "ball" [0.5]

    V -> "kicks" [1.0]
""")

parser = nltk.ViterbiParser(grammar)

sentence = [
    "the",
    "boy",
    "kicks",
    "the",
    "ball"
]

print("Possible Parse Trees:")

for tree in parser.parse(sentence):
    print(tree)
    print("Tree Probability:", tree.prob())`,

      pitfalls: [
        'The probabilities of alternative rules for the same non-terminal must add up to 1.',
        'PCFG requires suitable grammar rules and probability estimates.',
        'A PCFG may not capture every dependency between different parts of a sentence.',
        'The most probable parse tree is not always the correct interpretation.',
        'The quality of probabilities depends on the annotated training data.',
      ],

      questions: [
        {
          q: 'What is a PCFG?',
          a: 'A Probabilistic Context-Free Grammar is a CFG in which every production rule has an associated probability.',
        },
        {
          q: 'What is the difference between CFG and PCFG?',
          a: 'CFG defines possible grammatical structures, while PCFG assigns probabilities to grammar rules to estimate how likely those structures are.',
        },
        {
          q: 'Why are probabilities used in PCFG?',
          a: 'Probabilities help a parser choose the most likely parse tree when a sentence has multiple possible grammatical structures.',
        },
        {
          q: 'How is the probability of a parse tree calculated?',
          a: 'It is calculated by multiplying the probabilities of all production rules used to generate that tree.',
        },
        {
          q: 'How are PCFG probabilities estimated?',
          a: 'They can be estimated from an annotated treebank by counting how often each production rule occurs for a particular non-terminal.',
        },
        {
          q: 'What is the Viterbi parser?',
          a: 'A Viterbi parser is an algorithm used with probabilistic grammars to find the most probable parse for an input sentence.',
        },
      ],
    }),
  ],
}

export default ch