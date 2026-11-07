
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
      {
        heading: 'What it is',
        body: data.definition,
      },
      {
        heading: 'Why it matters',
        body: data.why,
      },
      {
        heading: 'Purpose',
        body: data.purpose,
      },
      {
        heading: 'When to use it',
        body: data.when.map((item) => `- ${item}`).join('\n'),
      },
      {
        heading: 'Simple example',
        body: data.simpleExample,
      },
      ...(data.detail
        ? [
            {
              heading: 'How it works',
              body: data.detail,
            },
          ]
        : []),
    ],
    {
      title: `Real-life example: ${data.title}`,
      domain: 'natural-language-processing',
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
          'Explain the concept in your own words and provide a simple real-world example.',
      },
      {
        id: `${data.slug}-task-2`,
        title: 'Explore it',
        difficulty: 'medium',
        task: data.tasks[1],
        expectedOutcome:
          'Understand the working process, important components and practical applications.',
      },
      {
        id: `${data.slug}-task-3`,
        title: 'Apply it',
        difficulty: 'hard',
        task: data.tasks[2],
        expectedOutcome:
          'Build a practical solution, evaluate its results and explain its limitations.',
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
  id: 'natural-language-processing',
  number: 22,
  title: 'Natural Language Processing (NLP)',

  tagline:
    'Learn how computers process human language using text preprocessing, regular expressions, tokenization, stop-word removal, stemming, lemmatization and edit distance.',

  priority: 'extreme',

  topics: [

    // =====================================================
    // 1. INTRODUCTION TO NLP
    // =====================================================

    lesson({
      slug: 'introduction-to-nlp',
      title: 'Introduction to Natural Language Processing',

      summary:
        'Understand how computers process, analyse and understand human languages such as English, Hindi and other languages.',

      images: [
        {
          src: 'https://miro.medium.com/v2/resize%3Afit%3A1400/1%2A42AKf6zGfE0whRUl2oG8EQ.jpeg',
          alt: 'Natural Language Processing text preprocessing pipeline',
          title: 'NLP Preprocessing Pipeline',
          caption:
            'Text passes through different preprocessing steps before it is used for further language analysis.',
          width: 1400,
          height: 900,
          fit: 'contain',
        },
        {
          src: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=85',
          alt: 'Person writing text in a notebook',
          title: 'Human Language',
          caption:
            'NLP helps computers work with written and spoken human language.',
          width: 1200,
          height: 800,
          fit: 'cover',
        },
      ],

      definition:
        'Natural Language Processing (NLP) is a branch of Artificial Intelligence that allows computers to process, analyse and understand human language. Human language includes English, Hindi, Marathi and many other languages. NLP helps computers work with text and speech. For example, when you ask a question to a chatbot, NLP techniques help the system process your words and understand what you are asking.',

      why:
        'Humans can naturally understand sentences, questions and conversations. However, computers work with numerical data and do not automatically understand the meaning of human language. NLP helps convert language into a form that computers can analyse. It allows applications to identify important words, understand sentences, classify messages and generate responses.',

      purpose:
        'The main purpose of NLP is to make communication between humans and computers easier by allowing machines to process and work with natural human language.',

      when: [
        'When building chatbots and virtual assistants.',
        'When analysing customer reviews and feedback.',
        'When automatically translating one language into another.',
        'When identifying spam messages and unwanted emails.',
        'When extracting important information from documents.',
        'When generating summaries of long articles.',
        'When analysing the sentiment of social media posts.',
        'When building voice assistants and speech-based applications.',
      ],

      simpleExample:
        'Imagine sending a message to a customer support chatbot: "I cannot log in to my account." The computer receives this sentence as text. NLP techniques help it process the words, identify the problem and understand that you need login assistance. The chatbot can then provide instructions for resetting your password.',

      detail:
        'NLP applications generally perform several language-processing steps:\n\n1. Collect Text: Collect sentences, messages, documents or other language data.\n\n2. Text Preprocessing: Clean and prepare the text by removing unwanted characters and standardising words.\n\n3. Tokenization: Break the text into smaller units such as words or sentences.\n\n4. Text Normalization: Convert related word forms into a more standard representation using techniques such as stemming and lemmatization.\n\n5. Feature Representation: Convert text into numerical representations that machine learning models can process. Examples include Bag of Words, TF-IDF and Word Embeddings.\n\n6. Model Processing: Apply a machine learning or Deep Learning model to the processed language data.\n\n7. Output: Generate a result such as a classification, prediction, answer or summary.\n\nExample:\n\nOriginal text: "The customers are complaining about delayed deliveries!"\n\nPossible preprocessing:\n\n- Lowercase: "the customers are complaining about delayed deliveries"\n- Tokenization: ["the", "customers", "are", "complaining", "about", "delayed", "deliveries"]\n- Stop-word removal: ["customers", "complaining", "delayed", "deliveries"]\n- Lemmatization: ["customer", "complain", "delay", "delivery"]\n\nThe cleaned words can then be used for further analysis, such as identifying customer complaints.\n\nImportant NLP applications:\n\n- Sentiment Analysis: Identifies whether text expresses positive, negative or neutral feelings.\n- Machine Translation: Converts text from one language into another.\n- Text Classification: Assigns categories to text, such as spam or not spam.\n- Named Entity Recognition: Identifies names of people, places, organisations and other entities.\n- Text Summarization: Creates shorter versions of longer documents.\n- Question Answering: Produces answers to questions written in natural language.\n\nNote: Not every modern NLP model requires all traditional preprocessing steps. Transformer models often use their own tokenization and text-processing methods.',

      realLife: {
        problem:
          'An online shopping company receives thousands of customer messages every day. Employees cannot manually read every message to understand whether customers are complaining about delivery, payment, refunds or products.',

        approach: [
          'Collect customer messages from emails, feedback forms and support chats.',
          'Clean and prepare the collected text.',
          'Tokenize the sentences into individual words or subwords.',
          'Convert text into numerical representations.',
          'Train an NLP classification model to identify complaint categories.',
          'Use the trained model to classify incoming customer messages.',
        ],

        outcome:
          'The company can automatically organise customer messages into categories and send them to the appropriate support department, reducing manual work.',

      },

      tasks: [
        'Explain NLP in simple words. Identify five applications of NLP that you use in everyday life.',
        'Take ten customer messages and explain how you would clean, tokenize and prepare them for a machine learning model.',
        'Build a simple text classification project using Python and Scikit-learn. Classify messages into categories such as delivery, payment, refund and product complaints.',
      ],

      questions: [
        {
          q: 'What is Natural Language Processing?',
          a: 'NLP is a branch of Artificial Intelligence that allows computers to process, analyse and understand human language.',
        },
        {
          q: 'Why is NLP required?',
          a: 'Computers do not naturally understand human language. NLP helps computers process text and speech so that applications can analyse language and respond to users.',
        },
        {
          q: 'What are the major applications of NLP?',
          a: 'Important applications include chatbots, machine translation, sentiment analysis, spam detection, text summarization, voice assistants and question answering.',
        },
        {
          q: 'What is Text Preprocessing?',
          a: 'Text Preprocessing is the process of cleaning and preparing raw text before using it for analysis or machine learning.',
        },
        {
          q: 'What is the difference between NLP and Machine Learning?',
          a: 'Machine Learning is a broader field in which computers learn patterns from data. NLP focuses on processing human language and can use Machine Learning and Deep Learning techniques.',
        },
        {
          q: 'What is Sentiment Analysis?',
          a: 'Sentiment Analysis is an NLP task that identifies the emotional tone of text, such as positive, negative or neutral.',
        },
        {
          q: 'What is Text Classification?',
          a: 'Text Classification is the process of assigning a category to a piece of text. For example, classifying an email as spam or not spam.',
        },
        {
          q: 'What is the difference between NLP and NLU?',
          a: 'NLP is the broader field of processing human language. Natural Language Understanding (NLU) focuses specifically on interpreting the meaning and intent of language.',
        },
      ],

      code: `import re
import nltk

from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords

nltk.download("punkt")
nltk.download("punkt_tab")
nltk.download("stopwords")

text = """
The customers are complaining about
delayed deliveries and poor service!
"""

# Convert text to lowercase
text = text.lower()

# Remove punctuation and unwanted characters
text = re.sub(r"[^a-zA-Z\\s]", "", text)

# Tokenize the text
tokens = word_tokenize(text)

# Remove stop words
stop_words = set(stopwords.words("english"))

cleaned_tokens = [
    word for word in tokens
    if word not in stop_words
]

print("Original text:", text)
print("Tokens:", tokens)
print("Cleaned tokens:", cleaned_tokens)`,

      pitfalls: [
        'NLP and NLU are related but they do not mean exactly the same thing.',
        'Raw text often contains unwanted characters, spelling mistakes and inconsistent formats.',
        'Removing every common word can change the meaning of a sentence.',
        'Different languages require different language-processing resources.',
        'NLP models can misunderstand sarcasm, slang and context.',
        'Traditional preprocessing is not always required for modern Transformer models.',
      ],
    }),

    // =====================================================
    // 2. REGULAR EXPRESSIONS
    // =====================================================

    lesson({
      slug: 'regular-expressions',
      title: 'Regular Expressions (Regex)',

      summary:
        'Understand how Regular Expressions identify, search, extract, validate and replace specific text patterns.',

      images: [
        {
          src: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=85',
          alt: 'Computer programming code displayed on a screen',
          title: 'Working with Text Patterns',
          caption:
            'Regular Expressions allow programmers to search and manipulate text using predefined patterns.',
          width: 1200,
          height: 800,
          fit: 'cover',
        },
      ],

      definition:
        'Regular Expressions, commonly called Regex, are patterns used to search, match, extract and replace specific characters or groups of text inside a string. In Python, the re module provides functions for working with Regular Expressions. In NLP, Regex is commonly used to clean text, extract emails, identify numbers, remove unwanted characters and find specific word patterns.',

      why:
        'Text collected from websites, emails and social media often contains unwanted information such as punctuation, special characters, numbers, URLs and inconsistent formatting. Manually searching for every pattern is difficult. Regex provides a flexible way to identify and manipulate these patterns automatically.',

      purpose:
        'The main purpose of Regular Expressions is to identify and manipulate text patterns so that raw text can be cleaned, extracted or validated efficiently.',

      when: [
        'When removing punctuation and unwanted special characters.',
        'When extracting email addresses from documents.',
        'When identifying phone numbers and dates.',
        'When removing URLs from social media messages.',
        'When finding words that begin or end with specific characters.',
        'When validating simple text formats.',
        'When cleaning raw text before tokenization.',
      ],

      simpleExample:
        'Imagine receiving this customer message: "Hello!!! Please contact me at support123@gmail.com. Visit https://example.com." You want to extract the email address and remove the URL. Using Regex, you can identify the email pattern and URL pattern automatically instead of searching manually.',

      detail:
        'Regular Expressions use special symbols to describe text patterns.\n\nImportant Regex symbols:\n\n- . : Matches almost any single character except a newline by default.\n- \\d : Matches a digit from 0 to 9.\n- \\w : Matches a word character, usually letters, digits and underscore.\n- \\s : Matches whitespace such as spaces and tabs.\n- \\D : Matches a non-digit character.\n- \\W : Matches a non-word character.\n- \\S : Matches a non-whitespace character.\n- ^ : Matches the beginning of a string or line.\n- $ : Matches the end of a string or line.\n- * : Matches zero or more repetitions.\n- + : Matches one or more repetitions.\n- ? : Makes a preceding item optional or changes matching behaviour depending on context.\n- {n} : Matches exactly n repetitions.\n- {n,m} : Matches between n and m repetitions.\n- [abc] : Matches any one character from the group.\n- [^abc] : Matches any character except those in the group.\n- | : Represents OR between alternatives.\n\nImportant Python Regex functions:\n\n1. re.search(): Finds the first matching pattern anywhere in a string.\n2. re.findall(): Returns all matching results as a list.\n3. re.sub(): Replaces matching patterns with another value.\n4. re.match(): Checks for a match at the beginning of a string.\n5. re.split(): Splits a string using a matching pattern.\n\nExample patterns:\n\n- r\"\\\\d+\" finds one or more digits.\n- r\"[a-zA-Z]+\" finds sequences of English letters.\n- r\"\\\\s+\" matches one or more whitespace characters.\n- r\"https?://\\\\S+\" finds simple HTTP or HTTPS URL patterns.\n\nThe r prefix creates a raw Python string, which makes writing backslashes in Regex patterns easier.',

      realLife: {
        problem:
          'A company collects customer feedback from online forms. Messages contain email addresses, phone numbers, URLs and unnecessary symbols that make further analysis difficult.',

        approach: [
          'Collect raw customer feedback messages.',
          'Use Regex to identify URLs and unwanted characters.',
          'Extract email addresses and phone numbers where required.',
          'Replace repeated spaces and inconsistent formatting.',
          'Store the cleaned text for further NLP processing.',
          'Review the results to ensure important information has not been removed.',
        ],

        outcome:
          'The company obtains cleaner and more consistent text that can be used for tokenization, sentiment analysis and text classification.',
      },

      tasks: [
        'Write five Regex patterns to identify numbers, words, email-like strings, URLs and whitespace.',
        'Take a paragraph containing emails, phone numbers, URLs and punctuation. Use re.search(), re.findall() and re.sub() to process it.',
        'Create a Python text-cleaning program that removes URLs, unwanted symbols and repeated spaces while preserving useful information such as words and numbers.',
      ],

      questions: [
        {
          q: 'What is a Regular Expression?',
          a: 'A Regular Expression is a pattern used to search, match, extract or replace specific characters and text inside a string.',
        },
        {
          q: 'Which Python module is used for Regex?',
          a: 'Python provides the built-in re module for working with Regular Expressions.',
        },
        {
          q: 'What is the difference between re.search() and re.match()?',
          a: 're.search() looks for a matching pattern anywhere in the string, while re.match() checks for a match only at the beginning.',
        },
        {
          q: 'What is re.findall()?',
          a: 're.findall() returns a list containing all non-overlapping matches of a pattern in a string.',
        },
        {
          q: 'What is re.sub()?',
          a: 're.sub() replaces every matching occurrence of a pattern with a specified replacement value.',
        },
        {
          q: 'What does \\\\d mean in Regex?',
          a: '\\\\d matches a digit from 0 to 9.',
        },
        {
          q: 'What is the difference between * and + in Regex?',
          a: '* matches zero or more repetitions, whereas + matches one or more repetitions.',
        },
        {
          q: 'Why is the raw string prefix r used in Python Regex?',
          a: 'The raw string prefix helps Python preserve backslashes so that Regex patterns can be written more easily.',
        },
      ],

      code: `import re

text = """
Hello!!! Contact us at support123@gmail.com.
Call 9876543210.
Visit https://example.com
Order ID: 45892
"""

# Extract email addresses
emails = re.findall(
    r"[\\w.-]+@[\\w.-]+\\.\\w+",
    text
)

# Extract 10-digit phone numbers
phone_numbers = re.findall(
    r"\\b\\d{10}\\b",
    text
)

# Extract numbers
numbers = re.findall(
    r"\\d+",
    text
)

# Remove URLs
cleaned_text = re.sub(
    r"https?://\\S+",
    "",
    text
)

# Remove unwanted punctuation
cleaned_text = re.sub(
    r"[^a-zA-Z0-9\\s]",
    "",
    cleaned_text
)

# Replace repeated spaces
cleaned_text = re.sub(
    r"\\s+",
    " ",
    cleaned_text
).strip()

print("Emails:", emails)
print("Phone numbers:", phone_numbers)
print("Numbers:", numbers)
print("Cleaned text:", cleaned_text)`,

      pitfalls: [
        'Regex patterns can become difficult to understand when they are too complicated.',
        'A simple email Regex does not guarantee that an email address actually exists.',
        'Removing all punctuation can damage useful information such as decimal numbers and abbreviations.',
        'Regex is useful for text patterns but is not a complete language-understanding solution.',
        'Always test Regex patterns using different input examples.',
        'Use raw strings such as r"\\\\d+" to avoid confusion with Python escape sequences.',
      ],
    }),

    // =====================================================
    // 3. TOKENIZATION
    // =====================================================

    lesson({
      slug: 'tokenization',
      title: 'Tokenization',

      summary:
        'Understand how computers divide text into smaller units such as sentences, words and subwords.',

      images: [
        {
          src: 'https://www.wasilzafar.com/images/series/nlp/text-preprocessing-pipeline-steps.webp',
          alt: 'Text preprocessing diagram showing tokenization and other cleaning steps',
          title: 'Text Preprocessing and Tokenization',
          caption:
            'Tokenization divides text into smaller units that can be processed by NLP applications.',
          width: 1200,
          height: 800,
          fit: 'contain',
        },
        {
          src: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=85',
          alt: 'Written text in a notebook',
          title: 'Breaking Text into Units',
          caption:
            'A sentence can be divided into smaller words and punctuation tokens.',
          width: 1200,
          height: 800,
          fit: 'cover',
        },
      ],

      definition:
        'Tokenization is an NLP technique that divides text into smaller units called tokens. A token can be a word, sentence, punctuation mark or subword depending on the tokenizer. For example, the sentence "I love learning NLP" can be divided into four word tokens: ["I", "love", "learning", "NLP"].',

      why:
        'Computers need a structured way to process text. A complete paragraph is difficult to analyse as one large string. Tokenization breaks it into smaller units so that NLP applications can count words, analyse sentences, identify important terms and prepare text for machine learning models.',

      purpose:
        'The main purpose of Tokenization is to divide text into meaningful smaller units that can be processed and analysed by computers.',

      when: [
        'When preparing text for machine learning models.',
        'When counting word frequency in documents.',
        'When building chatbots and language-processing applications.',
        'When identifying important words in customer reviews.',
        'When dividing long documents into individual sentences.',
        'When preparing text for Word Embeddings and Transformer models.',
      ],

      simpleExample:
        'Imagine you have the sentence "Python is easy to learn." A word tokenizer can divide it into ["Python", "is", "easy", "to", "learn", "."]. Each individual element is called a token. A sentence tokenizer can instead divide a paragraph into complete sentences.',

      detail:
        'Tokenization generally works as follows:\n\n1. Input Text: Provide a sentence, paragraph or document.\n\n2. Identify Boundaries: Determine where individual words, sentences or subwords begin and end.\n\n3. Split the Text: Divide the text according to the selected tokenization method.\n\n4. Generate Tokens: Return the resulting tokens as a list or another structured representation.\n\n5. Further Processing: Use the tokens for stop-word removal, stemming, lemmatization or other NLP tasks.\n\nImportant Types of Tokenization:\n\n1. Sentence Tokenization:\n\nDivides a paragraph into individual sentences.\n\nExample:\nInput: "I love Python. NLP is interesting."\nOutput: ["I love Python.", "NLP is interesting."]\n\n2. Word Tokenization:\n\nDivides a sentence into individual words and sometimes punctuation marks.\n\nExample:\nInput: "I love Python!"\nOutput: ["I", "love", "Python", "!"]\n\n3. Subword Tokenization:\n\nDivides words into smaller units called subwords. This is commonly used in modern language models.\n\nExample:\nA word such as "unhappiness" may be divided into smaller pieces depending on the tokenizer vocabulary.\n\nPopular tokenization approaches:\n\n- Whitespace Tokenization: Splits text wherever whitespace occurs.\n- Rule-Based Tokenization: Uses language-specific rules to identify token boundaries.\n- WordPiece: A subword tokenization algorithm used in models such as BERT.\n- Byte Pair Encoding (BPE): Builds subword units by repeatedly combining frequent character sequences.\n- SentencePiece: A tokenizer framework that can learn subword units directly from text.\n\nNote: Tokenization depends on the language and application. Words, punctuation, contractions, emojis and URLs may need special handling.',

      realLife: {
        problem:
          'A company receives thousands of product reviews. It wants to count frequently used words and identify the terms customers use when describing products.',

        approach: [
          'Collect customer reviews from the website.',
          'Clean unwanted characters and formatting.',
          'Use word tokenization to divide each review into individual tokens.',
          'Convert tokens into lowercase for consistent counting.',
          'Calculate the frequency of each token.',
          'Use the results to identify commonly mentioned product features.',
        ],

        outcome:
          'The company can analyse frequently occurring words and understand which product features customers discuss most often.',
      },

      tasks: [
        'Take five English sentences and manually divide each one into word tokens. Explain the difference between a word and a token.',
        'Use NLTK to perform sentence and word tokenization. Compare the results of whitespace splitting and an NLP tokenizer.',
        'Create a Python program that reads ten customer reviews, tokenizes them and displays the 20 most frequently occurring words.',
      ],

      questions: [
        {
          q: 'What is Tokenization?',
          a: 'Tokenization is the process of dividing text into smaller units called tokens, such as words, sentences or subwords.',
        },
        {
          q: 'What is a Token?',
          a: 'A token is an individual unit produced during tokenization. It may represent a word, punctuation mark, sentence or subword.',
        },
        {
          q: 'What are the main types of Tokenization?',
          a: 'The main types include sentence tokenization, word tokenization and subword tokenization.',
        },
        {
          q: 'What is Sentence Tokenization?',
          a: 'Sentence Tokenization divides a paragraph or document into individual sentences.',
        },
        {
          q: 'What is Word Tokenization?',
          a: 'Word Tokenization divides a sentence into individual words and, depending on the tokenizer, punctuation marks.',
        },
        {
          q: 'What is Subword Tokenization?',
          a: 'Subword Tokenization divides words into smaller meaningful or frequently occurring units. It helps language models handle rare and unfamiliar words.',
        },
        {
          q: 'What is the difference between Tokenization and Stemming?',
          a: 'Tokenization divides text into smaller units. Stemming reduces words to their root-like forms by removing prefixes or suffixes.',
        },
        {
          q: 'Why is Tokenization important in NLP?',
          a: 'Tokenization creates structured text units that can be counted, analysed and converted into numerical representations for machine learning models.',
        },
      ],

      code: `import nltk

from nltk.tokenize import (
    word_tokenize,
    sent_tokenize
)

nltk.download("punkt")
nltk.download("punkt_tab")

text = """
Python is a programming language.
NLP helps computers process human language.
Tokenization is an important preprocessing step.
"""

# Sentence tokenization
sentences = sent_tokenize(text)

print("Sentences:")
print(sentences)

# Word tokenization
words = word_tokenize(text)

print("\\nWord tokens:")
print(words)

# Simple whitespace tokenization
simple_tokens = text.split()

print("\\nWhitespace tokens:")
print(simple_tokens)

# Count tokens
print("\\nTotal word tokens:", len(words))`,

      pitfalls: [
        'Splitting text only on spaces may produce incorrect tokens around punctuation.',
        'Apostrophes and contractions can be handled differently by different tokenizers.',
        'Different languages require different tokenization rules.',
        'Subword tokenization can split a familiar word into multiple tokens.',
        'Tokenization alone does not understand the meaning of a sentence.',
        'The tokenizer used during model training should also be used during inference.',
      ],
    }),

    // =====================================================
    // 4. STOP-WORD REMOVAL
    // =====================================================

    lesson({
      slug: 'stop-word-removal',
      title: 'Stop-word Removal',

      summary:
        'Understand how commonly occurring words can be removed from text to focus on selected important terms.',

      images: [
        {
          src: 'https://miro.medium.com/v2/resize%3Afit%3A1400/1%2A42AKf6zGfE0whRUl2oG8EQ.jpeg',
          alt: 'Text preprocessing diagram showing stop-word removal',
          title: 'Removing Unnecessary Words',
          caption:
            'Stop-word removal can filter common words from a token list before further text analysis.',
          width: 1400,
          height: 900,
          fit: 'contain',
        },
      ],

      definition:
        'Stop-word Removal is a text preprocessing technique that removes selected common words from a text document. These words are called stop words. Examples in English include "the", "is", "a", "an", "and" and "of". The goal is to reduce unnecessary words and focus on terms that may be more useful for a particular NLP task.',

      why:
        'Text documents often contain many frequently occurring words. In some tasks, these words provide little useful information for identifying topics or comparing documents. Removing selected stop words can reduce the number of tokens and simplify text analysis.',

      purpose:
        'The main purpose of Stop-word Removal is to reduce selected common words so that certain NLP applications can focus on more informative terms.',

      when: [
        'When performing keyword extraction.',
        'When analysing word frequency in documents.',
        'When building a simple Bag of Words text classification system.',
        'When performing some forms of document similarity analysis.',
        'When preparing text for traditional machine learning algorithms.',
        'When reducing unnecessary vocabulary in selected text-processing tasks.',
      ],

      simpleExample:
        'Imagine the sentence "The cat is sitting on the table." The words "the", "is" and "on" are common English stop words. After removing them, the remaining tokens may be ["cat", "sitting", "table"]. The important words become easier to analyse for some applications.',

      detail:
        'Stop-word Removal generally follows these steps:\n\n1. Collect Text: Obtain the original sentence or document.\n\n2. Tokenize: Divide the text into individual tokens.\n\n3. Load Stop-word List: Obtain a predefined list of common words for the selected language.\n\n4. Compare Tokens: Check whether each token appears in the stop-word list.\n\n5. Filter Words: Remove selected stop words from the token list.\n\n6. Return Cleaned Tokens: Use the remaining words for further analysis.\n\nExample:\n\nOriginal sentence:\n"The customer is not happy with the service."\n\nTokens:\n["The", "customer", "is", "not", "happy", "with", "the", "service"]\n\nAfter lowercase conversion and selected stop-word removal:\n["customer", "happy", "service"]\n\nImportant Warning:\n\nRemoving the word "not" changes the meaning of the sentence.\n\nOriginal meaning: The customer is not happy.\n\nAfter removing "not": The customer is happy.\n\nTherefore, stop-word removal should depend on the task. Words such as "not", "no" and "never" may be important for sentiment analysis and other language-understanding tasks.\n\nPopular NLP libraries:\n\n- NLTK: Provides predefined stop-word lists for multiple languages.\n- spaCy: Provides stop-word information through its language vocabularies.\n- Scikit-learn: Provides English stop words for selected text vectorization tools.',

      realLife: {
        problem:
          'A company wants to identify common topics in thousands of product reviews. Words such as "the", "is", "a" and "and" appear repeatedly and make simple keyword analysis less useful.',

        approach: [
          'Collect customer reviews.',
          'Tokenize the reviews into individual words.',
          'Load an appropriate English stop-word list.',
          'Identify common words that are not useful for the selected analysis.',
          'Remove selected stop words while preserving important terms such as negations.',
          'Analyse the remaining words to identify frequently discussed product features.',
        ],

        outcome:
          'The company can focus on more informative words and identify common product-related topics more easily.',
      },

      tasks: [
        'Write five sentences and manually identify common stop words in each sentence.',
        'Use NLTK to remove English stop words from a collection of customer reviews. Compare the original and cleaned tokens.',
        'Build a text-cleaning program that removes selected stop words but preserves negation words such as "not", "no" and "never". Test it using positive and negative customer reviews.',
      ],

      questions: [
        {
          q: 'What is Stop-word Removal?',
          a: 'Stop-word Removal is a text preprocessing technique that removes selected common words from text to simplify certain NLP tasks.',
        },
        {
          q: 'What are Stop Words?',
          a: 'Stop Words are commonly occurring words such as "the", "is", "a" and "and" that may provide limited value for some text-analysis tasks.',
        },
        {
          q: 'Why is Stop-word Removal used?',
          a: 'It can reduce the number of tokens and help traditional text-analysis methods focus on selected informative words.',
        },
        {
          q: 'Which Python library provides stop-word lists?',
          a: 'NLTK provides predefined stop-word lists for multiple languages. spaCy and Scikit-learn also provide stop-word functionality.',
        },
        {
          q: 'Why should we be careful when removing stop words?',
          a: 'Some common words change the meaning of a sentence. For example, removing "not" from "not good" can reverse the sentiment.',
        },
        {
          q: 'Is Stop-word Removal always necessary?',
          a: 'No. It depends on the NLP task and model. Many modern Transformer models retain common words because they are important for understanding context.',
        },
        {
          q: 'What happens if too many words are removed?',
          a: 'Important information and grammatical relationships may be lost, reducing the accuracy of downstream language-processing tasks.',
        },
      ],

      code: `import nltk

from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords

nltk.download("punkt")
nltk.download("punkt_tab")
nltk.download("stopwords")

text = """
The customer is not happy with the product.
The delivery service was very slow.
"""

# Convert text to lowercase
text = text.lower()

# Tokenize text
tokens = word_tokenize(text)

# Load English stop words
stop_words = set(
    stopwords.words("english")
)

# Preserve important negation words
important_words = {
    "not",
    "no",
    "never",
}

stop_words = stop_words - important_words

# Remove selected stop words
cleaned_tokens = [
    word for word in tokens
    if word not in stop_words
]

print("Original tokens:")
print(tokens)

print("\\nCleaned tokens:")
print(cleaned_tokens)`,

      pitfalls: [
        'Stop words are not useless in every NLP application.',
        'Removing "not", "no" and "never" can change the meaning of a sentence.',
        'Different languages require different stop-word lists.',
        'A stop-word list should be selected according to the task.',
        'Some modern Transformer models work better when common words are retained.',
        'Removing words does not automatically improve model accuracy.',
      ],
    }),

    // =====================================================
    // 5. STEMMING
    // =====================================================

    lesson({
      slug: 'stemming',
      title: 'Stemming',

      summary:
        'Understand how stemming reduces different forms of a word to a common root-like form by removing prefixes or suffixes.',

      images: [
        {
          src: 'https://www.ai-lawenforcement.org/sites/default/files/inline-images/Artboard_20_copy_7.png',
          alt: 'Diagram illustrating stemming and lemmatization in NLP',
          title: 'Stemming and Word Reduction',
          caption:
            'Stemming removes word endings to produce a common root-like form. The resulting form is not always a valid dictionary word.',
          width: 1200,
          height: 900,
          fit: 'contain',
        },
      ],

      definition:
        'Stemming is an NLP text normalization technique that reduces different forms of a word to a common root-like form by removing prefixes or suffixes. For example, words such as "playing", "played" and "plays" may be reduced to "play". However, stemming does not always produce a meaningful dictionary word.',

      why:
        'A single word can appear in different forms. For example, "connect", "connected", "connecting" and "connection" are related words. Without normalization, traditional text-processing systems may treat them as different terms. Stemming reduces some of these differences and can help simplify text analysis.',

      purpose:
        'The main purpose of Stemming is to reduce related word forms to a common root-like representation so that traditional NLP applications can group related terms more easily.',

      when: [
        'When building simple search engines.',
        'When creating keyword-based information retrieval systems.',
        'When analysing large collections of documents.',
        'When reducing vocabulary size in traditional text-processing systems.',
        'When working with Bag of Words and selected TF-IDF applications.',
        'When exact dictionary words are not required.',
      ],

      simpleExample:
        'Imagine a document contains the words "playing", "played", "plays" and "player". A stemming algorithm removes selected word endings to produce root-like forms. For example, "playing", "played" and "plays" may become "play". This helps some traditional NLP systems treat related word forms as similar.',

      detail:
        'Stemming generally works through the following steps:\n\n1. Collect Text: Obtain a sentence or document.\n\n2. Tokenize: Divide the text into individual words.\n\n3. Apply Stemming Rules: Use an algorithm to remove selected prefixes or suffixes.\n\n4. Generate Stem: Produce a common root-like form for each word.\n\n5. Use the Results: Apply the reduced words to selected NLP tasks.\n\nExample:\n\nOriginal words:\n\n- Playing\n- Played\n- Plays\n- Connected\n- Connecting\n\nPossible stemmed results:\n\n- Play\n- Play\n- Play\n- Connect\n- Connect\n\nPopular Stemming Algorithms:\n\n1. Porter Stemmer:\n\nA widely used rule-based stemming algorithm for English. It applies several suffix-removal rules.\n\n2. Snowball Stemmer:\n\nAn improved stemming framework that supports multiple languages and provides stemming algorithms for them.\n\n3. Lancaster Stemmer:\n\nAn aggressive stemming algorithm that can produce shorter root-like forms.\n\nImportant Difference:\n\nStemming does not usually check whether the resulting form is a valid dictionary word.\n\nFor example, the Porter Stemmer may convert "studies" into "studi". This is acceptable as a stem, even though "studi" is not a normal English word.\n\nStemming is generally faster than dictionary-based lemmatization, but it can be less accurate linguistically.',

      realLife: {
        problem:
          'A search engine stores thousands of articles. A user searches for "running", but some documents contain "run", "runs" or "ran". A simple keyword-matching system may fail to connect these related word forms.',

        approach: [
          'Collect and tokenize the text from articles.',
          'Apply a stemming algorithm to selected words.',
          'Store the resulting stemmed terms in the search index.',
          'Apply the same stemming approach to search queries.',
          'Compare the normalized query terms with indexed document terms.',
          'Evaluate search results to ensure important matches are not lost.',
        ],

        outcome:
          'The search system can match more related word forms, helping users find relevant documents even when the exact word form is different.',
      },

      tasks: [
        'Write ten English words with different suffixes and predict their possible stemmed forms.',
        'Use NLTK PorterStemmer, SnowballStemmer and LancasterStemmer. Compare their outputs for the same list of words.',
        'Create a basic keyword search system that applies stemming to both documents and search queries. Test whether it finds related word forms.',
      ],

      questions: [
        {
          q: 'What is Stemming?',
          a: 'Stemming is an NLP technique that reduces different forms of a word to a common root-like form by removing selected prefixes or suffixes.',
        },
        {
          q: 'Why is Stemming used?',
          a: 'Stemming helps traditional text-processing systems group related word forms and can reduce vocabulary size.',
        },
        {
          q: 'Does Stemming always produce a valid English word?',
          a: 'No. Stemming is rule-based and may produce a root-like form that is not a valid dictionary word.',
        },
        {
          q: 'What are the popular Stemming algorithms?',
          a: 'Popular algorithms include Porter Stemmer, Snowball Stemmer and Lancaster Stemmer.',
        },
        {
          q: 'What is Porter Stemmer?',
          a: 'Porter Stemmer is a rule-based algorithm that reduces English words by applying a sequence of suffix-removal rules.',
        },
        {
          q: 'What is Snowball Stemmer?',
          a: 'Snowball Stemmer is a stemming framework that supports multiple languages and provides algorithms for reducing words to root-like forms.',
        },
        {
          q: 'What is the difference between Stemming and Lemmatization?',
          a: 'Stemming removes word endings using rules and may produce invalid words. Lemmatization uses linguistic information and dictionary forms to produce valid base words.',
        },
        {
          q: 'Which is generally faster: Stemming or Lemmatization?',
          a: 'Stemming is generally faster because it uses simpler rules and does not usually require dictionary-based linguistic analysis.',
        },
      ],

      code: `import nltk

from nltk.tokenize import word_tokenize
from nltk.stem import (
    PorterStemmer,
    SnowballStemmer,
    LancasterStemmer
)

nltk.download("punkt")
nltk.download("punkt_tab")

text = """
The students are studying.
They studied different subjects.
They are playing and working.
"""

tokens = word_tokenize(text.lower())

porter = PorterStemmer()

snowball = SnowballStemmer("english")

lancaster = LancasterStemmer()

print("Original words:")
print(tokens)

print("\\nPorter Stemmer:")
print([
    porter.stem(word)
    for word in tokens
])

print("\\nSnowball Stemmer:")
print([
    snowball.stem(word)
    for word in tokens
])

print("\\nLancaster Stemmer:")
print([
    lancaster.stem(word)
    for word in tokens
])`,

      pitfalls: [
        'Stemming may produce words that do not exist in a dictionary.',
        'Different stemming algorithms can produce different results.',
        'Aggressive stemming can remove too much of a word.',
        'Stemming does not understand the complete context of a sentence.',
        'Stemming may not be suitable when linguistically correct base words are required.',
        'Not every NLP model needs stemming.',
      ],
    }),

    // =====================================================
    // 6. LEMMATIZATION
    // =====================================================

    lesson({
      slug: 'lemmatization',
      title: 'Lemmatization',

      summary:
        'Understand how computers convert different forms of a word into their meaningful dictionary base forms.',

      images: [
        {
          src: 'https://www.ai-lawenforcement.org/sites/default/files/inline-images/Artboard_20_copy_7.png',
          alt: 'Diagram comparing stemming and lemmatization',
          title: 'Lemmatization and Dictionary Forms',
          caption:
            'Lemmatization aims to produce valid base forms of words using linguistic information.',
          width: 1200,
          height: 900,
          fit: 'contain',
        },
      ],

      definition:
        'Lemmatization is an NLP text normalization technique that converts different forms of a word into its meaningful dictionary base form, called a lemma. Unlike stemming, lemmatization uses linguistic information and dictionary knowledge to produce valid words. For example, "running", "runs" and "ran" can be converted to "run" when the correct grammatical information is available.',

      why:
        'Different word forms can represent the same basic meaning. For example, "am", "is" and "are" are different forms of the verb "be". Lemmatization helps convert related word forms into their proper dictionary forms, making text analysis more consistent and linguistically meaningful.',

      purpose:
        'The main purpose of Lemmatization is to normalize words into their meaningful dictionary base forms while preserving linguistic correctness.',

      when: [
        'When building NLP applications that require meaningful base words.',
        'When analysing customer reviews and feedback.',
        'When performing text classification and document analysis.',
        'When building search systems that need to match different word forms.',
        'When preparing text for traditional NLP models.',
        'When accurate word normalization is more important than processing speed.',
      ],

      simpleExample:
        'Imagine the sentence "The children were playing and the mice were running." A lemmatization system can convert "children" into "child", "were" into "be", "playing" into "play", "mice" into "mouse" and "running" into "run". The result contains meaningful dictionary words rather than rough word fragments.',

      detail:
        'Lemmatization generally works through the following steps:\n\n1. Collect Text: Obtain a sentence or document.\n\n2. Tokenize: Divide the sentence into individual words.\n\n3. Identify Word Information: Determine the grammatical role of each word, such as noun, verb or adjective.\n\n4. Apply Linguistic Rules: Use a dictionary, vocabulary or language model to identify the correct base form.\n\n5. Generate Lemmas: Convert words into their meaningful dictionary forms.\n\n6. Use the Results: Apply the normalized words to further NLP tasks.\n\nExample:\n\nOriginal words:\n\n- Running\n- Runs\n- Ran\n- Mice\n- Better\n- Children\n\nPossible lemmas:\n\n- Run\n- Run\n- Run\n- Mouse\n- Good\n- Child\n\nImportant Concepts:\n\n1. Lemma:\n\nThe meaningful dictionary base form of a word.\n\n2. Part of Speech (POS):\n\nThe grammatical category of a word, such as noun, verb, adjective or adverb.\n\n3. Context:\n\nThe surrounding sentence can help determine the correct base form.\n\nFor example, the word "better" may be reduced to "good" when it is used as the comparative form of the adjective "good".\n\nNLTK Lemmatization:\n\nNLTK provides WordNetLemmatizer, which uses WordNet dictionary information.\n\nAn important detail is that the default WordNet lemmatizer assumes a noun unless another part of speech is provided.\n\nFor accurate results, provide the appropriate POS information when possible.\n\nspaCy also provides lemmatization through its language-processing pipelines.',

      realLife: {
        problem:
          'A company wants to analyse thousands of customer reviews to understand whether customers are discussing the same product feature using different forms of a word.',

        approach: [
          'Collect customer reviews.',
          'Tokenize each review into individual words.',
          'Identify the grammatical roles of words where required.',
          'Apply lemmatization using a suitable NLP library.',
          'Convert different word forms into meaningful dictionary base forms.',
          'Analyse the normalized words to identify common product-related topics.',
        ],

        outcome:
          'The company can group many related word forms into meaningful base words, making traditional keyword analysis more consistent.',
      },

      tasks: [
        'Write ten English words in different grammatical forms and identify their correct dictionary base forms.',
        'Use NLTK WordNetLemmatizer to compare noun and verb lemmatization. Explain why POS information matters.',
        'Create a Python program that tokenizes customer reviews, applies lemmatization and compares its output with Porter Stemming.',
      ],

      questions: [
        {
          q: 'What is Lemmatization?',
          a: 'Lemmatization is an NLP technique that converts different forms of a word into their meaningful dictionary base form, called a lemma.',
        },
        {
          q: 'What is a Lemma?',
          a: 'A lemma is the meaningful dictionary base form of a word. For example, "running" can have the lemma "run".',
        },
        {
          q: 'How is Lemmatization different from Stemming?',
          a: 'Stemming removes word endings using rules and may produce invalid words. Lemmatization uses linguistic information and dictionary knowledge to produce valid base forms.',
        },
        {
          q: 'Why is Part of Speech important in Lemmatization?',
          a: 'The grammatical role of a word helps determine its correct base form. The same word may need different treatment depending on whether it is a noun, verb or adjective.',
        },
        {
          q: 'Which Python library provides WordNetLemmatizer?',
          a: 'NLTK provides WordNetLemmatizer through its stem module.',
        },
        {
          q: 'What is WordNet?',
          a: 'WordNet is a lexical database of English that groups words into sets of synonyms and provides information about their meanings and relationships.',
        },
        {
          q: 'Which is generally more linguistically accurate: Stemming or Lemmatization?',
          a: 'Lemmatization generally produces more linguistically meaningful base forms because it uses dictionary information and grammatical knowledge.',
        },
        {
          q: 'Why can the default WordNetLemmatizer produce unexpected results?',
          a: 'It assumes a noun by default. Providing the correct part-of-speech information can improve the resulting lemma.',
        },
      ],

      code: `import nltk

from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from nltk.corpus import wordnet

nltk.download("punkt")
nltk.download("punkt_tab")
nltk.download("wordnet")
nltk.download("omw-1.4")

lemmatizer = WordNetLemmatizer()

words = [
    "running",
    "runs",
    "ran",
    "mice",
    "children",
    "better"
]

print("Default noun lemmatization:")

for word in words:
    print(
        word,
        "->",
        lemmatizer.lemmatize(word)
    )

print("\\nVerb lemmatization:")

verb_words = [
    "running",
    "runs",
    "ran",
    "studying",
    "studied"
]

for word in verb_words:
    print(
        word,
        "->",
        lemmatizer.lemmatize(
            word,
            pos=wordnet.VERB
        )
    )

print("\\nAdjective lemmatization:")

print(
    "better ->",
    lemmatizer.lemmatize(
        "better",
        pos=wordnet.ADJ
    )
)`,

      pitfalls: [
        'Lemmatization may require part-of-speech information for accurate results.',
        'The default NLTK WordNet lemmatizer treats words as nouns.',
        'A word can have different meanings depending on its context.',
        'Dictionary-based lemmatization can be slower than simple stemming.',
        'Different languages need appropriate dictionaries and linguistic resources.',
        'Lemmatization does not automatically understand every sentence or its complete meaning.',
      ],
    }),

    // =====================================================
    // 7. MINIMUM EDIT DISTANCE
    // =====================================================

    lesson({
      slug: 'minimum-edit-distance',
      title: 'Minimum Edit Distance',

      summary:
        'Understand how computers measure the minimum number of character operations needed to transform one word into another.',

      images: [
        {
          src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85',
          alt: 'Person using a laptop keyboard',
          title: 'Text Comparison',
          caption:
            'Minimum Edit Distance can compare two words and measure how different their character sequences are.',
          width: 1200,
          height: 800,
          fit: 'cover',
        },
      ],

      definition:
        'Minimum Edit Distance is an NLP technique used to calculate the minimum number of operations required to transform one string or word into another. The common Levenshtein distance uses three operations: insertion, deletion and substitution. Each operation usually has a cost of 1. For example, changing "cat" into "cut" requires one substitution, so the edit distance is 1.',

      why:
        'People frequently make spelling mistakes when typing messages or searching for information. Computers need a way to compare words and measure how similar or different they are. Minimum Edit Distance helps identify spelling mistakes, suggest corrections, compare strings and detect similar text.',

      purpose:
        'The main purpose of Minimum Edit Distance is to measure the difference between two strings by finding the minimum number of character operations needed to transform one into the other.',

      when: [
        'When building spelling correction applications.',
        'When suggesting the correct word for a typing mistake.',
        'When comparing similar words or names.',
        'When identifying duplicate or nearly identical text records.',
        'When matching user search queries with stored words.',
        'When comparing text entered by users with a known vocabulary.',
      ],

      simpleExample:
        'Imagine a user types "cat" but the correct word is "cut". The computer compares both words. The first character "c" is the same, and the last character "t" is also the same. Only the middle character needs to change from "a" to "u". Therefore, the Minimum Edit Distance is 1.',

      detail:
        'The common Levenshtein Minimum Edit Distance uses three basic operations:\n\n1. Insertion:\n\nAdd a new character to a word.\n\nExample: "cat" → "cart".\n\nOne insertion is required to add "r".\n\n2. Deletion:\n\nRemove an existing character from a word.\n\nExample: "cart" → "cat".\n\nOne deletion is required to remove "r".\n\n3. Substitution:\n\nReplace one character with another character.\n\nExample: "cat" → "cut".\n\nOne substitution is required to replace "a" with "u".\n\nHow Minimum Edit Distance Works:\n\n1. Take Two Words: Select the original word and target word.\n\n2. Create a Matrix: Create a table containing rows for the characters of the first word and columns for the characters of the second word. Include an additional initial row and column for empty strings.\n\n3. Initialize the Matrix: Fill the first row and column with increasing numbers because converting an empty string into a word requires insertions, and converting a word into an empty string requires deletions.\n\n4. Compare Characters: Compare the characters at each position.\n\n5. Calculate Costs: If characters match, no additional operation is required. If they differ, calculate the minimum cost of insertion, deletion and substitution.\n\n6. Find the Final Value: The bottom-right matrix cell contains the minimum edit distance.\n\nDynamic Programming Formula:\n\nLet D(i, j) represent the minimum edit distance between the first i characters of one word and the first j characters of another word.\n\nIf the current characters are equal:\n\nD(i, j) = D(i-1, j-1)\n\nIf the characters are different:\n\nD(i, j) = min(\n  D(i-1, j) + 1,\n  D(i, j-1) + 1,\n  D(i-1, j-1) + 1\n)\n\nThe three alternatives represent deletion, insertion and substitution.\n\nExample:\n\nWord 1: CAT\nWord 2: CUT\n\nOnly one substitution is needed:\n\nCAT → CUT\n\nMinimum Edit Distance = 1.\n\nImportant Note:\n\nLevenshtein distance is one common form of edit distance. Other variants may include operations such as transposition, where two neighbouring characters are swapped.',

      realLife: {
        problem:
          'An online search application receives misspelled queries. A user searches for "pyhton", but the correct word stored in the system is "python". The application needs to identify the closest matching word.',

        approach: [
          `Collect the user's search query.`,
          'Compare the query with words stored in the vocabulary.',
          'Calculate the Minimum Edit Distance for possible matches.',
          'Rank candidate words according to their edit distances.',
          'Suggest the closest suitable word to the user.',
          'Use additional context and language information when several suggestions have similar distances.',
        ],

        outcome:
          'The application can suggest "python" when the user enters "pyhton", improving the search experience and helping users correct typing mistakes.',
      },

      tasks: [
        'Calculate the edit distance manually for cat and cut, book and books, and python and pyhton.',
        'Write a Python function that calculates Levenshtein distance using insertion, deletion and substitution.',
        'Build a simple spelling suggestion application that compares a misspelled word with a vocabulary list and returns the closest matches.',
      ],

      questions: [
        {
          q: 'What is Minimum Edit Distance?',
          a: 'Minimum Edit Distance is the minimum number of character operations required to transform one string into another.',
        },
        {
          q: 'What are the three basic Levenshtein operations?',
          a: 'The three operations are insertion, deletion and substitution.',
        },
        {
          q: 'What is Insertion?',
          a: 'Insertion means adding a character to an existing string. For example, changing "cat" into "cart" requires inserting "r".',
        },
        {
          q: 'What is Deletion?',
          a: 'Deletion means removing a character from an existing string. For example, changing "cart" into "cat" requires deleting "r".',
        },
        {
          q: 'What is Substitution?',
          a: 'Substitution means replacing one character with another. For example, changing "cat" into "cut" requires replacing "a" with "u".',
        },
        {
          q: 'What is Levenshtein Distance?',
          a: 'Levenshtein Distance measures the minimum number of insertions, deletions and substitutions required to transform one string into another.',
        },
        {
          q: 'Why is Dynamic Programming used for Edit Distance?',
          a: 'Dynamic Programming stores previously calculated results in a matrix so that the same subproblems do not need to be solved repeatedly.',
        },
        {
          q: 'What is the edit distance between "cat" and "cut"?',
          a: 'The edit distance is 1 because only one substitution is required to change "a" into "u".',
        },
        {
          q: 'What is the edit distance between "book" and "books"?',
          a: 'The edit distance is 1 because one insertion, adding the letter "s", transforms "book" into "books".',
        },
        {
          q: 'Where is Minimum Edit Distance used?',
          a: 'It is used in spelling correction, search engines, approximate string matching, text comparison and duplicate detection.',
        },
      ],

      code: `def minimum_edit_distance(word1, word2):

    rows = len(word1) + 1
    cols = len(word2) + 1

    # Create a matrix
    dp = [
        [0] * cols
        for _ in range(rows)
    ]

    # Initialize first column
    for i in range(rows):
        dp[i][0] = i

    # Initialize first row
    for j in range(cols):
        dp[0][j] = j

    # Fill the matrix
    for i in range(1, rows):
        for j in range(1, cols):

            if word1[i - 1] == word2[j - 1]:
                cost = 0
            else:
                cost = 1

            insertion = dp[i][j - 1] + 1

            deletion = dp[i - 1][j] + 1

            substitution = (
                dp[i - 1][j - 1] + cost
            )

            dp[i][j] = min(
                insertion,
                deletion,
                substitution
            )

    return dp[-1][-1]


# Test examples
words = [
    ("cat", "cut"),
    ("book", "books"),
    ("python", "pyhton"),
    ("kitten", "sitting")
]

for word1, word2 in words:

    distance = minimum_edit_distance(
        word1,
        word2
    )

    print(
        word1,
        "->",
        word2,
        "=",
        distance
    )`,

      pitfalls: [
        'Minimum Edit Distance measures character-level differences, not the actual meaning of words.',
        'A smaller distance does not always mean that two words have similar meanings.',
        'The standard Levenshtein algorithm counts insertion, deletion and substitution.',
        'Transposition is not included in standard Levenshtein distance.',
        'Comparing a very large vocabulary can be computationally expensive.',
        'Spelling suggestions should also consider word frequency and sentence context.',
      ],
    }),
  ],
}

export default ch
