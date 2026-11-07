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
          'Understand how the technique converts text into numerical data.',
      },
      {
        id: `${data.slug}-task-3`,
        title: 'Apply it',
        difficulty: 'hard',
        task: data.tasks[2],
        expectedOutcome:
          'Build a practical text-processing solution and evaluate its results.',
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
  id: 'text-representation',
  number: 23,
  title: 'Text Representation',
  tagline:
    'Learn how computers convert human language into numerical data that machine learning models can understand.',
  priority: 'extreme',

  topics: [
    lesson({
      slug: 'bag-of-words',
      title: 'Bag of Words',
      summary:
        'A simple text representation technique that converts sentences into numerical vectors by counting how often each word appears.',

      definition:
        'Bag of Words (BoW) is a technique used in Natural Language Processing (NLP) to convert text into numbers. It creates a vocabulary of unique words from the given documents and represents each document using the frequency of those words.\n\nIt is called Bag of Words because it considers which words are present and how often they appear, but it does not consider their original order.',

      why:
        'Machine learning algorithms cannot directly understand sentences like humans. They need numerical data as input.\n\nBag of Words converts text into numerical vectors so that machine learning algorithms can process documents and identify patterns.',

      purpose:
        'The main purpose of Bag of Words is to represent text documents numerically using word frequencies.\n\nIt helps machine learning models work with text data for tasks such as spam detection, sentiment analysis, and document classification.',

      when: [
        'When converting text documents into numerical data.',
        'When building a basic text classification model.',
        'When developing a simple spam detection system.',
        'When working with small text datasets.',
        'When word frequency is more important than word order.',
      ],

      simpleExample:
        'Suppose we have three sentences:\n\nSentence 1: I love Python\nSentence 2: I love Machine Learning\nSentence 3: Python is easy\n\nStep 1: Create a vocabulary of unique words:\n\n[I, love, Python, Machine, Learning, is, easy]\n\nStep 2: Count the occurrence of each word in every sentence.\n\nSentence 1: [1, 1, 1, 0, 0, 0, 0]\nSentence 2: [1, 1, 0, 1, 1, 0, 0]\nSentence 3: [0, 0, 1, 0, 0, 1, 1]\n\nThese numerical vectors can now be given to a machine learning model.',

      detail:
        'Bag of Words generally follows three steps:\n\n1. Tokenization: Break the documents into individual words.\n2. Vocabulary creation: Collect all unique words from the documents.\n3. Vector creation: Count how many times each vocabulary word appears in each document.\n\nFor example, if the vocabulary is [cat, dog, apple], the sentence "cat dog cat" becomes [2, 1, 0].\n\nThe model only sees the counts. It does not know whether the original sentence was "cat eats dog" or "dog eats cat".',

      realLife: {
        problem:
          'An email service needs to identify whether incoming emails are spam or not spam.',
        approach: [
          'Collect a dataset containing spam and non-spam emails.',
          'Clean the text and split each email into individual words.',
          'Create a vocabulary using Bag of Words.',
          'Convert every email into a numerical vector.',
          'Train a classification model using the vectors and their labels.',
        ],
        outcome:
          'The model can learn which word patterns are commonly found in spam emails and use them to classify new emails.',
      },

      tasks: [
        'Take five simple sentences and identify all unique words to create a vocabulary.',
        'Convert the sentences into Bag of Words vectors manually.',
        'Build a text classification model using Bag of Words and a machine learning algorithm.',
      ],

      code: `from sklearn.feature_extraction.text import CountVectorizer

documents = [
    "I love Python",
    "I love Machine Learning",
    "Python is easy"
]

vectorizer = CountVectorizer()

X = vectorizer.fit_transform(documents)

print("Vocabulary:")
print(vectorizer.get_feature_names_out())

print("\\nNumerical Vectors:")
print(X.toarray())`,

      pitfalls: [
        'Bag of Words does not understand the meaning of words.',
        'It ignores the order of words in a sentence.',
        'It can create very large and sparse vectors.',
        'Words with similar meanings are treated as completely different words.',
        'Common words may receive high importance even when they are not useful.',
      ],

      questions: [
        {
          q: 'What is Bag of Words?',
          a: 'Bag of Words is a text representation technique that converts documents into numerical vectors based on the frequency of words.',
        },
        {
          q: 'Why is it called Bag of Words?',
          a: 'Because it treats a document like a bag containing words. It considers word frequency but ignores the original order of words.',
        },
        {
          q: 'Does Bag of Words understand the meaning of words?',
          a: 'No. It only counts word occurrences. It does not understand context, meaning, or relationships between words.',
        },
        {
          q: 'What is a vocabulary in Bag of Words?',
          a: 'A vocabulary is the collection of all unique words found in the training documents.',
        },
        {
          q: 'What is a major limitation of Bag of Words?',
          a: 'It ignores word order and meaning, and it can generate large sparse vectors.',
        },
      ],
    }),

    lesson({
      slug: 'count-vectorizer',
      title: 'Count Vectorizer',
      summary:
        'A Scikit-learn tool that converts text documents into numerical vectors by counting word occurrences.',

      definition:
        'CountVectorizer is a feature extraction tool provided by Scikit-learn. It converts a collection of text documents into a matrix of word counts.\n\nIt automatically tokenizes text, creates a vocabulary of unique words, and counts how many times each word appears in each document.',

      why:
        'Writing a Bag of Words implementation manually can take time. CountVectorizer performs the process automatically.\n\nIt provides an easy way to convert text into numerical features that can be used by machine learning algorithms.',

      purpose:
        'The purpose of CountVectorizer is to transform raw text into a numerical document-term matrix.\n\nEach row represents a document, and each column represents a word from the vocabulary. The values represent word counts.',

      when: [
        'When converting text into word-count features.',
        'When preparing text data for machine learning models.',
        'When implementing Bag of Words using Python.',
        'When building spam detection or sentiment classification systems.',
        'When you need to experiment with word frequency features.',
      ],

      simpleExample:
        'Consider these documents:\n\nDocument 1: I love Python\nDocument 2: I love Java\n\nCountVectorizer creates a vocabulary:\n\n[Java, Python, I, love]\n\nThe numerical representation is:\n\nDocument 1: [0, 1, 1, 1]\nDocument 2: [1, 0, 1, 1]\n\nEach number represents how many times a word appears in that document.',

      detail:
        'CountVectorizer performs several operations:\n\n1. Tokenization: Splits text into tokens.\n2. Lowercasing: Converts words to lowercase by default.\n3. Vocabulary creation: Finds unique tokens.\n4. Counting: Counts each token in every document.\n5. Matrix creation: Produces a document-term matrix.\n\nImportant methods:\n\n- fit(): Learns the vocabulary from the documents.\n- transform(): Converts documents using the learned vocabulary.\n- fit_transform(): Learns the vocabulary and converts documents in one step.\n- get_feature_names_out(): Returns the vocabulary words.',

      realLife: {
        problem:
          'A company wants to classify customer feedback into categories such as positive, negative, and neutral.',
        approach: [
          'Collect customer feedback messages.',
          'Clean and prepare the text.',
          'Use CountVectorizer to convert feedback into word-count vectors.',
          'Train a classification model using the numerical features.',
          'Use the trained model to classify new feedback.',
        ],
        outcome:
          'Customer feedback becomes numerical data that can be used by a machine learning model for automatic classification.',
      },

      tasks: [
        'Create five sample documents and identify the unique words in them.',
        'Use CountVectorizer to generate a vocabulary and document-term matrix.',
        'Build a sentiment classification model using CountVectorizer and Logistic Regression.',
      ],

      code: `from sklearn.feature_extraction.text import CountVectorizer

documents = [
    "I love Python",
    "Python is easy",
    "I love Machine Learning"
]

vectorizer = CountVectorizer()

X = vectorizer.fit_transform(documents)

print("Vocabulary:")
print(vectorizer.get_feature_names_out())

print("\\nDocument Term Matrix:")
print(X.toarray())

new_documents = ["I love learning Python"]

new_vectors = vectorizer.transform(new_documents)

print("\\nNew Document Vector:")
print(new_vectors.toarray())`,

      pitfalls: [
        'CountVectorizer considers word frequency, not word meaning.',
        'The vocabulary can become very large for large datasets.',
        'It produces sparse matrices when most documents contain only a few vocabulary words.',
        'By default, tokens containing fewer than two characters are excluded.',
        'Always fit the vectorizer on training data and use transform() on test data to avoid data leakage.',
      ],

      questions: [
        {
          q: 'What is CountVectorizer?',
          a: 'CountVectorizer is a Scikit-learn tool that converts text documents into numerical vectors by counting word occurrences.',
        },
        {
          q: 'What is the difference between Bag of Words and CountVectorizer?',
          a: 'Bag of Words is the general text representation approach. CountVectorizer is a Python tool that implements this approach.',
        },
        {
          q: 'What does fit_transform() do?',
          a: 'It learns the vocabulary from the documents and converts those documents into numerical vectors in one operation.',
        },
        {
          q: 'What is a document-term matrix?',
          a: 'It is a matrix in which rows represent documents, columns represent vocabulary words, and values represent word counts.',
        },
        {
          q: 'Why should we use transform() on test data?',
          a: 'It ensures that test data uses the vocabulary learned from training data instead of creating a new vocabulary. This also prevents data leakage.',
        },
      ],
    }),

    lesson({
      slug: 'tf-idf',
      title: 'TF-IDF',
      summary:
        'A text representation technique that gives higher importance to useful words and lower importance to words that appear in many documents.',

      definition:
        'TF-IDF stands for Term Frequency-Inverse Document Frequency. It is a technique used in NLP to measure how important a word is in a particular document compared with a collection of documents.\n\nIt gives higher scores to words that appear frequently in a document but are not common across all documents.',

      why:
        'Some words appear in almost every document, such as "the", "is", "and", and "a". These words may not help distinguish one document from another.\n\nTF-IDF reduces the importance of common words and gives more importance to words that help identify the topic of a document.',

      purpose:
        'The main purpose of TF-IDF is to identify important words in documents and convert text into weighted numerical vectors.\n\nIt is commonly used in search engines, document similarity, and text classification.',

      when: [
        'When finding important words in a document.',
        'When building a search engine.',
        'When comparing documents based on their content.',
        'When performing text classification.',
        'When common words should have less importance.',
      ],

      simpleExample:
        'Imagine two documents:\n\nDocument 1: Python is a programming language. Python is easy.\nDocument 2: Java is a programming language.\n\nThe words "is" and "a" appear in both documents. They are not very useful for distinguishing the documents.\n\nThe word "Python" appears mainly in Document 1, so it may receive a higher TF-IDF score for that document.\n\nTF-IDF helps identify words that are more informative for a particular document.',

      detail:
        'TF-IDF combines two values:\n\n1. Term Frequency (TF): Measures how frequently a word appears in a document.\n\nA simple formula is:\n\nTF(t, d) = Count of word t in document d / Total words in document d\n\n2. Inverse Document Frequency (IDF): Measures how rare a word is across all documents.\n\nA common smoothed formula is:\n\nIDF(t) = log((1 + N) / (1 + DF(t))) + 1\n\nWhere:\n- N = Total number of documents.\n- DF(t) = Number of documents containing word t.\n\nFinal formula:\n\nTF-IDF(t, d) = TF(t, d) × IDF(t)\n\nA word that appears frequently in one document but rarely across the collection can receive a higher score.',

      realLife: {
        problem:
          'A search engine needs to find which documents are most relevant to a user searching for "Python programming".',
        approach: [
          'Collect and prepare a collection of documents.',
          'Convert the documents into TF-IDF vectors.',
          'Convert the search query into a TF-IDF vector using the same vectorizer.',
          'Calculate similarity between the query and document vectors.',
          'Rank documents according to their similarity scores.',
        ],
        outcome:
          'The search engine can rank documents based on how relevant their words are to the user query.',
      },

      tasks: [
        'Calculate simple term frequency values for a few words in a document.',
        'Use TfidfVectorizer to convert a collection of documents into TF-IDF vectors.',
        'Build a simple document search system using TF-IDF and cosine similarity.',
      ],

      code: `from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

documents = [
    "Python is a programming language",
    "Python is useful for machine learning",
    "Java is also a programming language"
]

vectorizer = TfidfVectorizer()

X = vectorizer.fit_transform(documents)

print("Vocabulary:")
print(vectorizer.get_feature_names_out())

print("\\nTF-IDF Matrix:")
print(X.toarray())

query = ["Python machine learning"]

query_vector = vectorizer.transform(query)

similarity = cosine_similarity(query_vector, X)

print("\\nDocument Similarity:")
print(similarity)`,

      pitfalls: [
        'TF-IDF does not understand the actual meaning of words.',
        'Words with similar meanings are treated as different features.',
        'It does not naturally understand word order or context.',
        'The result depends on the document collection used to calculate IDF.',
        'Fit the vectorizer only on training documents when building an ML pipeline.',
      ],

      questions: [
        {
          q: 'What is TF-IDF?',
          a: 'TF-IDF is a text representation technique that measures how important a word is in a document compared with the complete document collection.',
        },
        {
          q: 'What is Term Frequency?',
          a: 'Term Frequency measures how often a particular word appears in a document.',
        },
        {
          q: 'What is Inverse Document Frequency?',
          a: 'Inverse Document Frequency measures how rare or common a word is across a collection of documents.',
        },
        {
          q: 'Why does TF-IDF reduce the importance of common words?',
          a: 'Common words appear in many documents and usually do not help distinguish one document from another. IDF reduces their weight.',
        },
        {
          q: 'What is the difference between CountVectorizer and TF-IDF?',
          a: 'CountVectorizer represents text using word counts, while TF-IDF represents text using weighted word importance.',
        },
        {
          q: 'Where is TF-IDF used?',
          a: 'It is used in information retrieval, search engines, document similarity, and text classification.',
        },
      ],
    }),

    lesson({
      slug: 'latent-semantic-analysis',
      title: 'Latent Semantic Analysis (LSA)',
      summary:
        'A technique that uses mathematical decomposition to discover hidden relationships between words and documents.',

      definition:
        'Latent Semantic Analysis (LSA) is a technique used in NLP to discover hidden patterns and relationships between words and documents.\n\nIt commonly uses Singular Value Decomposition (SVD) to reduce a large document-term matrix into a smaller representation.\n\nThis helps identify documents that discuss similar topics, even when they use different words.',

      why:
        'Traditional methods such as Bag of Words and TF-IDF represent words as separate features. They do not directly understand that different words can be related.\n\nFor example, "car" and "automobile" have similar meanings, but traditional word-count methods treat them as different words.\n\nLSA can discover some hidden relationships by analyzing patterns across documents.',

      purpose:
        'The purpose of LSA is to reduce the dimensions of a document-term matrix and identify hidden semantic patterns in a document collection.\n\nIt is useful for document clustering, information retrieval, and topic exploration.',

      when: [
        'When reducing the dimensions of text data.',
        'When discovering hidden topics in a collection of documents.',
        'When comparing documents with related vocabulary.',
        'When building a basic document retrieval system.',
        'When working with large TF-IDF matrices.',
      ],

      simpleExample:
        'Suppose we have these documents:\n\nDocument 1: I love football and cricket.\nDocument 2: Football is a popular sport.\nDocument 3: Python is a programming language.\n\nThe first two documents contain words related to sports. The third document is about programming.\n\nLSA can analyze word patterns across the documents and help represent the first two documents closer together in a reduced semantic space.',

      detail:
        'LSA generally works in these steps:\n\n1. Create a document-term matrix using CountVectorizer or TF-IDF.\n2. Apply Singular Value Decomposition (SVD).\n3. Keep only the most important components.\n4. Represent documents using the reduced set of components.\n5. Use these representations for similarity, clustering, or topic analysis.\n\nSVD decomposes a matrix into three matrices:\n\nA = U × Σ × Vᵀ\n\nBy keeping only the largest singular values, we create a smaller representation that preserves important patterns.\n\nLSA is also commonly called Latent Semantic Indexing (LSI) when used in information retrieval.',

      realLife: {
        problem:
          'A digital library contains thousands of documents. Users want to find documents about similar topics even when the documents use different words.',
        approach: [
          'Collect the library documents.',
          'Convert them into TF-IDF vectors.',
          'Apply TruncatedSVD to reduce the dimensions.',
          'Represent each document in the reduced semantic space.',
          'Compare documents using cosine similarity.',
        ],
        outcome:
          'The library can discover documents with similar word patterns and organize related documents more effectively.',
      },

      tasks: [
        'Create a small document collection containing different topics such as sports, technology, and education.',
        'Convert the documents into TF-IDF vectors and apply TruncatedSVD.',
        'Compare documents using cosine similarity in the reduced semantic space.',
      ],

      code: `from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import TruncatedSVD
from sklearn.metrics.pairwise import cosine_similarity

documents = [
    "Football and cricket are popular sports",
    "Football is played by many people",
    "Python is used for machine learning",
    "Machine learning is part of artificial intelligence"
]

vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(documents)

svd = TruncatedSVD(n_components=2, random_state=42)

reduced_vectors = svd.fit_transform(X)

print("Original Matrix Shape:")
print(X.shape)

print("\\nReduced Matrix Shape:")
print(reduced_vectors.shape)

print("\\nReduced Document Vectors:")
print(reduced_vectors)

similarity = cosine_similarity(reduced_vectors)

print("\\nDocument Similarity:")
print(similarity)`,

      pitfalls: [
        'LSA does not understand language in the same way as humans.',
        'The number of SVD components must be selected carefully.',
        'Reducing too many dimensions can remove useful information.',
        'LSA can be difficult to interpret because its components are combinations of words.',
        'It does not naturally capture word order or deep contextual meaning.',
      ],

      questions: [
        {
          q: 'What is Latent Semantic Analysis?',
          a: 'LSA is a technique that discovers hidden relationships between words and documents using matrix decomposition.',
        },
        {
          q: 'Which mathematical technique is commonly used in LSA?',
          a: 'LSA commonly uses Singular Value Decomposition (SVD) to reduce the dimensions of a document-term matrix.',
        },
        {
          q: 'What is the purpose of SVD in LSA?',
          a: 'SVD helps reduce a large matrix into a smaller representation while preserving important patterns.',
        },
        {
          q: 'What is the difference between TF-IDF and LSA?',
          a: 'TF-IDF creates weighted word vectors, while LSA applies dimensionality reduction to discover hidden patterns in those vectors.',
        },
        {
          q: 'What is the difference between LSA and LSI?',
          a: 'They are closely related terms. LSA describes the underlying analysis technique, while LSI commonly refers to its use in information retrieval.',
        },
      ],
    }),

    lesson({
      slug: 'word-embeddings',
      title: 'Word Embeddings',
      summary:
        'A technique that represents words as dense numerical vectors so that relationships between words can be captured.',

      definition:
        'Word Embeddings are numerical representations of words in the form of dense vectors.\n\nUnlike Bag of Words and TF-IDF, which usually create sparse vectors, word embeddings represent words using a smaller number of meaningful numerical values.\n\nWords that appear in similar contexts can have similar vector representations.',

      why:
        'Traditional text representation techniques treat words as separate features and do not naturally capture semantic relationships.\n\nFor example, "king" and "queen" have related meanings, but Bag of Words does not know that relationship.\n\nWord embeddings help models learn relationships between words from their usage in text.',

      purpose:
        'The purpose of word embeddings is to represent words in a continuous numerical space where semantic and contextual relationships can be learned.\n\nThey are useful for language understanding, text classification, machine translation, and many other NLP tasks.',

      when: [
        'When building NLP and deep learning applications.',
        'When capturing relationships between words.',
        'When working with text classification tasks.',
        'When building chatbots and question-answering systems.',
        'When converting words into dense numerical features for neural networks.',
      ],

      simpleExample:
        'Imagine the following words:\n\nKing, Queen, Man, Woman, Apple, Banana.\n\nA word embedding model converts each word into a numerical vector.\n\nFor example:\n\nKing → [0.25, 0.81, 0.42, ...]\nQueen → [0.27, 0.79, 0.44, ...]\nApple → [0.91, 0.12, 0.33, ...]\n\nThe vectors for "King" and "Queen" may be closer to each other than the vectors for "King" and "Apple".\n\nThe actual vector values are learned from data. These example numbers are only for understanding.',

      detail:
        'Word embeddings are learned by training a model on a large collection of text.\n\nThe model learns to represent words using numerical vectors based on patterns in their surrounding words.\n\nImportant characteristics:\n\n- Dense representation: Most vector values are non-zero.\n- Lower dimensionality: A word may be represented using tens or hundreds of values instead of thousands of vocabulary features.\n- Semantic relationships: Related words can have similar vector representations.\n- Learned features: The model learns useful patterns from text data.\n\nWord2Vec, GloVe, and fastText are popular methods for creating word embeddings.',

      realLife: {
        problem:
          'A chatbot needs to recognize that different words can have similar meanings, such as "happy", "glad", and "joyful".',
        approach: [
          'Collect a large text dataset.',
          'Train or load a word embedding model.',
          'Convert words into dense numerical vectors.',
          'Use these vectors as input features for an NLP model.',
          'Use the learned representations to improve language-related predictions.',
        ],
        outcome:
          'The chatbot can use learned word relationships to improve its ability to process similar words and expressions.',
      },

      tasks: [
        'Understand the difference between sparse vectors and dense vectors.',
        'Load a pre-trained word embedding model and inspect the vectors of common words.',
        'Build a simple NLP classification model using word embeddings as input.',
      ],

      code: `import numpy as np

embeddings = {
    "king": np.array([0.8, 0.7, 0.2]),
    "queen": np.array([0.8, 0.6, 0.3]),
    "apple": np.array([0.1, 0.2, 0.9])
}

def cosine_similarity(a, b):
    return np.dot(a, b) / (
        np.linalg.norm(a) * np.linalg.norm(b)
    )

print(
    "King and Queen:",
    cosine_similarity(embeddings["king"], embeddings["queen"])
)

print(
    "King and Apple:",
    cosine_similarity(embeddings["king"], embeddings["apple"])
)`,

      pitfalls: [
        'Word embeddings need suitable training data to learn useful relationships.',
        'Traditional static word embeddings usually assign one vector to each word, even when the word has multiple meanings.',
        'Embeddings can learn biases present in their training data.',
        'A word not included in the vocabulary may be difficult for some embedding methods to represent.',
        'Similar vectors do not guarantee that two words have exactly the same meaning.',
      ],

      questions: [
        {
          q: 'What are word embeddings?',
          a: 'Word embeddings are dense numerical vectors that represent words and help models learn relationships between them.',
        },
        {
          q: 'Why are word embeddings used?',
          a: 'They help machine learning models capture useful word relationships and work with text as numerical data.',
        },
        {
          q: 'What is the difference between sparse and dense vectors?',
          a: 'Sparse vectors contain many zero values, while dense vectors contain mostly non-zero values.',
        },
        {
          q: 'How are word embeddings different from Bag of Words?',
          a: 'Bag of Words represents words using their frequency, while word embeddings represent words using learned dense numerical vectors.',
        },
        {
          q: 'Name some popular word embedding techniques.',
          a: 'Word2Vec, GloVe, and fastText are popular word embedding techniques.',
        },
      ],
    }),

    lesson({
      slug: 'word2vec',
      title: 'Word2Vec',
      summary:
        'A word embedding technique that learns word relationships by predicting words from their surrounding context.',

      definition:
        'Word2Vec is a popular word embedding technique that converts words into dense numerical vectors.\n\nIt learns word representations by studying which words appear near each other in sentences.\n\nWords that appear in similar contexts often receive similar vector representations.',

      why:
        'Traditional methods such as Bag of Words and TF-IDF do not naturally capture relationships between words.\n\nWord2Vec learns these relationships from large text collections, making it useful for NLP applications that need meaningful word representations.',

      purpose:
        'The purpose of Word2Vec is to learn dense word vectors from surrounding word patterns.\n\nIt uses two main training architectures: Continuous Bag of Words (CBOW) and Skip-gram.',

      when: [
        'When learning word relationships from text data.',
        'When creating word embeddings for NLP applications.',
        'When building text classification systems.',
        'When working with recommendation or similarity tasks involving words.',
        'When training embeddings from a domain-specific text dataset.',
      ],

      simpleExample:
        'Consider this sentence:\n\n"The cat is sitting on the mat."\n\nWord2Vec learns relationships by studying nearby words.\n\nFor example, when it sees the word "cat", it may learn that words such as "the", "is", and "sitting" frequently appear around it.\n\nAfter training on many sentences, the model creates a numerical vector for each word.\n\nWord2Vec has two main approaches:\n\n1. CBOW: Predicts a target word using surrounding context words.\n2. Skip-gram: Predicts surrounding context words using a target word.',

      detail:
        'Word2Vec uses a shallow neural network to learn word vectors.\n\n**1. CBOW (Continuous Bag of Words)**\n\nCBOW takes surrounding words as input and predicts the missing or target word.\n\nExample:\n\n"The cat is ___ on the mat."\n\nThe model uses nearby words to predict "sitting".\n\n**2. Skip-gram**\n\nSkip-gram takes one target word as input and predicts its surrounding context words.\n\nExample:\n\nInput: "sitting"\n\nPossible context words: "is", "on", "cat", "the".\n\nThe trained model learns vector representations for words from these prediction tasks.',

      realLife: {
        problem:
          'A company wants to build a system that can identify words related to a product category, even when users use different vocabulary.',
        approach: [
          'Collect product descriptions and customer reviews.',
          'Prepare and tokenize the text.',
          'Train a Word2Vec model using CBOW or Skip-gram.',
          'Generate word vectors from the trained model.',
          'Compare word vectors to find related terms.',
        ],
        outcome:
          'The company can discover related words from its own product language and use them in search or text analysis systems.',
      },

      tasks: [
        'Understand the difference between CBOW and Skip-gram using simple sentences.',
        'Train a Word2Vec model on a small text dataset using Gensim.',
        'Find similar words using a trained Word2Vec model and evaluate the results.',
      ],

      code: `from gensim.models import Word2Vec

sentences = [
    ["python", "is", "a", "programming", "language"],
    ["java", "is", "a", "programming", "language"],
    ["python", "is", "useful", "for", "machine", "learning"],
    ["machine", "learning", "uses", "data"],
    ["deep", "learning", "uses", "neural", "networks"]
]

model = Word2Vec(
    sentences=sentences,
    vector_size=50,
    window=3,
    min_count=1,
    workers=1,
    sg=1,
    epochs=100
)

print("Word Vector:")
print(model.wv["python"])

print("\\nSimilar Words:")
print(model.wv.most_similar("python", topn=3))`,

      pitfalls: [
        'Word2Vec requires enough training text to learn useful word relationships.',
        'The quality of embeddings depends on the training dataset.',
        'Traditional Word2Vec creates one vector per word and does not automatically handle unseen words.',
        'CBOW and Skip-gram learn word representations using different prediction directions.',
        'A small dataset may produce unreliable similarity results.',
      ],

      questions: [
        {
          q: 'What is Word2Vec?',
          a: 'Word2Vec is a word embedding technique that learns dense numerical word vectors by predicting words from their surrounding context.',
        },
        {
          q: 'What are the two main architectures of Word2Vec?',
          a: 'The two main architectures are CBOW (Continuous Bag of Words) and Skip-gram.',
        },
        {
          q: 'What is CBOW?',
          a: 'CBOW predicts a target word using its surrounding context words.',
        },
        {
          q: 'What is Skip-gram?',
          a: 'Skip-gram predicts surrounding context words using a target word.',
        },
        {
          q: 'What is the main difference between CBOW and Skip-gram?',
          a: 'CBOW uses context words to predict the target word, while Skip-gram uses the target word to predict context words.',
        },
        {
          q: 'Which Python library can be used to implement Word2Vec?',
          a: 'Gensim provides a commonly used Word2Vec implementation.',
        },
      ],
    }),

    lesson({
      slug: 'glove',
      title: 'GloVe',
      summary:
        'A word embedding technique that learns word vectors using word co-occurrence statistics from a text collection.',

      definition:
        'GloVe stands for Global Vectors for Word Representation. It is a word embedding technique that learns numerical vectors by analyzing how frequently words appear together across a large text collection.\n\nIt uses global word co-occurrence information to learn relationships between words.',

      why:
        'Words often have relationships because they appear in similar contexts.\n\nFor example, "doctor" may frequently appear near words such as "hospital", "patient", and "medicine".\n\nGloVe uses these co-occurrence patterns to learn useful word representations.',

      purpose:
        'The purpose of GloVe is to create dense word vectors by using statistical information about how words appear together in a large collection of documents.\n\nThese vectors can then be used in different NLP applications.',

      when: [
        'When using pre-trained word embeddings.',
        'When learning word relationships from large text collections.',
        'When building NLP classification models.',
        'When working with word similarity tasks.',
        'When global word co-occurrence statistics are useful.',
      ],

      simpleExample:
        'Consider these sentences:\n\n1. The doctor works in a hospital.\n2. The nurse works in a hospital.\n3. The doctor helps the patient.\n\nThe words "doctor", "nurse", "hospital", and "patient" appear in related contexts.\n\nGloVe analyzes how frequently words appear together and uses this information to create word vectors.\n\nWords with related co-occurrence patterns can receive similar vector representations.',

      detail:
        'GloVe learns word vectors using a word co-occurrence matrix.\n\nA co-occurrence matrix records how frequently two words appear near each other in a text collection.\n\nThe general process is:\n\n1. Collect a large text dataset.\n2. Build a word co-occurrence matrix.\n3. Calculate how frequently words appear together within a context window.\n4. Learn word vectors by optimizing a mathematical objective based on co-occurrence statistics.\n5. Use the resulting vectors in NLP applications.\n\nUnlike Word2Vec, which trains a model using context prediction tasks, GloVe directly uses global co-occurrence statistics in its learning objective.',

      realLife: {
        problem:
          'A language application needs word vectors that capture relationships between words across a large collection of text.',
        approach: [
          'Collect a large text corpus.',
          'Build or obtain a word co-occurrence matrix.',
          'Train GloVe embeddings or load pre-trained GloVe vectors.',
          'Convert words into dense numerical vectors.',
          'Use vector similarity to identify related words.',
        ],
        outcome:
          'The application can use learned word representations to support similarity calculations and downstream NLP tasks.',
      },

      tasks: [
        'Understand how a word co-occurrence matrix records relationships between words.',
        'Load pre-trained GloVe vectors and inspect a few word representations.',
        'Use GloVe vectors to find similar words and build a small NLP application.',
      ],

      code: `import gensim.downloader as api

model = api.load("glove-wiki-gigaword-50")

print("Word Vector:")
print(model["computer"])

print("\\nSimilar Words:")
print(model.most_similar("computer", topn=5))

print("\\nWord Similarity:")
print(model.similarity("king", "queen"))`,

      pitfalls: [
        'GloVe depends on the quality and coverage of its text corpus.',
        'Pre-trained GloVe models may not contain specialized domain vocabulary.',
        'Traditional GloVe embeddings assign one vector to each word, even when it has multiple meanings.',
        'The co-occurrence matrix can be large for a very large vocabulary.',
        'GloVe vectors do not automatically understand the complete sentence context.',
      ],

      questions: [
        {
          q: 'What is GloVe?',
          a: 'GloVe stands for Global Vectors for Word Representation. It learns word embeddings using global word co-occurrence statistics.',
        },
        {
          q: 'What is a word co-occurrence matrix?',
          a: 'It is a matrix that records how frequently words appear together within a specified context window.',
        },
        {
          q: 'How does GloVe learn word vectors?',
          a: 'GloVe analyzes word co-occurrence statistics and learns vectors by optimizing an objective based on those statistics.',
        },
        {
          q: 'What is the difference between Word2Vec and GloVe?',
          a: 'Word2Vec learns vectors through context prediction tasks, while GloVe learns vectors using global word co-occurrence statistics.',
        },
        {
          q: 'Can GloVe understand different meanings of the same word?',
          a: 'Traditional GloVe creates one static vector per word, so it does not automatically create different representations for different meanings.',
        },
      ],
    }),

    lesson({
      slug: 'fasttext',
      title: 'fastText',
      summary:
        'A word embedding technique that represents words using character-level subword information, helping it handle rare and unseen words.',

      definition:
        'fastText is a word representation technique developed by Facebook AI Research. It is based on the idea of representing words using smaller parts called character n-grams.\n\nInstead of treating every word as a completely separate unit, fastText learns representations using the character patterns inside words.\n\nThis helps it create useful representations for rare words and some words that were not seen during training.',

      why:
        'Traditional Word2Vec and GloVe models generally learn one vector for each known word.\n\nIf a new or misspelled word is not present in their vocabulary, they may not be able to provide its vector.\n\nfastText uses subword information, so it can build word representations using character patterns.',

      purpose:
        'The purpose of fastText is to improve word representation by learning from both complete words and their character-level subword units.\n\nIt is particularly useful for languages with rich word structures and datasets containing rare words.',

      when: [
        'When working with rare words.',
        'When handling words that share common prefixes or suffixes.',
        'When working with morphologically rich languages.',
        'When creating word embeddings for domain-specific text.',
        'When some words may not appear in the training vocabulary.',
      ],

      simpleExample:
        'Consider the word:\n\n"playing"\n\nfastText can represent this word using character n-grams such as:\n\n"pla", "lay", "ayi", "yin", "ing".\n\nThese are simplified examples of character groups.\n\nThe word representation is learned using information from these subword units along with the word itself.\n\nBecause related words can share character patterns, fastText can learn useful information about words that are rare or unseen.',

      detail:
        'fastText extends the Word2Vec approach by representing words using character n-grams.\n\nFor example, a word such as "playing" can be broken into smaller character groups. The model learns vectors for these subword units.\n\nThe representation of a word is built using its character n-gram vectors.\n\nImportant benefits:\n\n1. Subword information: Learns from smaller parts of words.\n2. Rare words: Can use shared character patterns to create better representations.\n3. Unseen words: Can construct vectors for many unseen words from their character n-grams.\n4. Morphology: Can capture some information about prefixes, suffixes, and word forms.\n\nThis makes fastText especially useful when word forms change frequently.',

      realLife: {
        problem:
          'A multilingual text classification system receives rare words, spelling variations, and words with different grammatical forms.',
        approach: [
          'Collect text data from the required languages.',
          'Train a fastText model or use pre-trained fastText vectors.',
          'Represent words using their character n-grams.',
          'Generate word vectors using the learned subword information.',
          'Use the vectors in a text classification or similarity application.',
        ],
        outcome:
          'The system can make better use of shared character patterns when handling rare and previously unseen words.',
      },

      tasks: [
        'Understand how a word can be divided into character n-grams.',
        'Train a fastText model using a small text dataset.',
        'Compare the handling of rare or unseen words in Word2Vec and fastText.',
      ],

      code: `from gensim.models import FastText

sentences = [
    ["playing", "football", "every", "day"],
    ["players", "enjoy", "playing", "football"],
    ["play", "is", "a", "popular", "activity"],
    ["python", "is", "a", "programming", "language"]
]

model = FastText(
    sentences=sentences,
    vector_size=50,
    window=3,
    min_count=1,
    workers=1,
    min_n=3,
    max_n=6,
    epochs=100
)

print("Known Word Vector:")
print(model.wv["playing"])

print("\\nSimilar Words:")
print(model.wv.most_similar("playing", topn=3))

print("\\nVector for a New Word:")
print(model.wv["playfully"])`,

      pitfalls: [
        'fastText still needs suitable training data to learn useful subword patterns.',
        'Character similarity does not always mean that two words have similar meanings.',
        'It may generate less useful representations for unusual spellings or completely unrelated character patterns.',
        'Subword information can increase the amount of model data that needs to be stored.',
        'It does not automatically understand the full context of a word inside a sentence.',
      ],

      questions: [
        {
          q: 'What is fastText?',
          a: 'fastText is a word embedding technique that represents words using character-level subword information.',
        },
        {
          q: 'What are character n-grams?',
          a: 'Character n-grams are groups of consecutive characters taken from a word. For example, "playing" can contain character groups such as "pla", "lay", and "ing".',
        },
        {
          q: 'Why is fastText useful for rare words?',
          a: 'It can use character patterns learned from other words to create useful representations for rare words.',
        },
        {
          q: 'What is the difference between Word2Vec and fastText?',
          a: 'Word2Vec generally learns one vector per known word, while fastText also learns from character n-grams inside words.',
        },
        {
          q: 'Can fastText handle unseen words?',
          a: 'It can often construct a vector for an unseen word using its character n-grams, provided those subword patterns are available in the trained model.',
        },
        {
          q: 'Where is fastText useful?',
          a: 'It is useful for text classification, multilingual NLP, rare-word handling, and languages with many word variations.',
        },
      ],
    }),
  ],
}

export default ch