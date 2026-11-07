
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
          'Understand the working process, important components and mathematical calculations.',
      },
      {
        id: `${data.slug}-task-3`,
        title: 'Apply it',
        difficulty: 'hard',
        task: data.tasks[2],
        expectedOutcome:
          'Build a practical solution, evaluate its performance and explain its limitations.',
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
  id: 'ngram-language-models',
  number: 22,
  title: 'N-Gram Language Models',

  tagline:
    'Understand how computers learn word patterns, calculate sentence probabilities, predict the next word and handle unseen word combinations using statistical language models.',

  priority: 'extreme',

  topics: [

    // =====================================================
    // 1. UNIGRAM
    // =====================================================

    lesson({
      slug: 'unigram',
      title: 'Unigram',

      summary:
        'Understand how a language model studies individual words and predicts text without considering the previous words.',

      images: [
        {
          src: 'https://www.wasilzafar.com/images/series/nlp/ngram-model-orders-context-windows.webp',
          alt: 'Unigram, Bigram and Trigram context window comparison',
          title: 'N-Gram Context Windows',
          caption:
            'A Unigram model considers one word at a time and does not use previous words as context.',
          width: 1200,
          height: 675,
          fit: 'contain',
        },
      ],

      definition:
        'A Unigram is the simplest type of N-Gram. It represents a single word in a sentence. A Unigram Language Model calculates the probability of individual words without considering the words that appear before or after them. For example, in the sentence "I love machine learning", the unigrams are I, love, machine and learning.',

      why:
        'Computers need a way to understand how frequently words appear in a collection of text. A Unigram model provides a simple statistical method for calculating the probability of individual words. It helps us understand word frequency and serves as the foundation for more advanced language models.',

      purpose:
        'The main purpose of a Unigram model is to calculate the probability of individual words based on their frequency in a training dataset.',

      when: [
        'When calculating how frequently individual words appear in a document.',
        'When building a simple statistical language model.',
        'When creating basic text classification features.',
        'When analysing word frequency in customer reviews.',
        'When calculating the basic probability of words in a vocabulary.',
        'When learning the fundamentals of N-Gram language models.',
      ],

      simpleExample:
        'Imagine that your training dataset contains the following sentence:\n\n"I love Python and I love Machine Learning."\n\nThe individual word counts are:\n\n- I = 2\n- love = 2\n- Python = 1\n- and = 1\n- Machine = 1\n- Learning = 1\n\nTotal words = 8.\n\nThe probability of the word "love" is:\n\nP(love) = 2 / 8 = 0.25\n\nThis means the word "love" represents 25% of the words in this small training dataset.',

      detail:
        'A Unigram model follows these steps:\n\n1. Collect Text: Gather a collection of sentences or documents.\n\n2. Tokenize: Split the text into individual words.\n\n3. Count Words: Calculate how many times each word appears.\n\n4. Calculate Probability: Divide the frequency of a word by the total number of words.\n\n5. Predict: Use the calculated probabilities to estimate how likely a word is.\n\nFormula:\n\nP(w) = Count(w) / Total number of words\n\nWhere:\n\n- P(w) = Probability of a word.\n- Count(w) = Number of times the word appears.\n- Total number of words = Total tokens in the training corpus.\n\nImportant limitation:\n\nA Unigram model does not understand word order or relationships between words.\n\nFor example:\n\n"I love Python" and "Python love I" contain the same individual words. A Unigram model cannot distinguish their grammatical order because it only considers individual word frequencies.',

      realLife: {
        problem:
          'An online shopping company receives thousands of customer reviews and wants to understand which words customers use most frequently.',

        approach: [
          'Collect customer reviews from the website.',
          'Convert the reviews into lowercase text.',
          'Tokenize each review into individual words.',
          'Count the frequency of every word.',
          'Calculate the probability of each word using its total frequency.',
          'Display the most frequently used words in a report.',
        ],

        outcome:
          'The company can identify frequently occurring words such as good, quality, price and delivery. These statistics provide a basic understanding of customer feedback.',
      },

      tasks: [
        'Take five English sentences and manually separate them into individual words. Calculate the frequency of every unique word.',
        'Explain how a Unigram Language Model calculates word probability. Compare two words using a small example dataset.',
        'Build a Python Unigram Language Model using a collection of customer reviews. Display the ten most frequent words and calculate their probabilities.',
      ],

      questions: [
        {
          q: 'What is a Unigram?',
          a: 'A Unigram is a sequence containing a single word. For example, the sentence "I love Python" contains three unigrams: I, love and Python.',
        },
        {
          q: 'What is a Unigram Language Model?',
          a: 'A Unigram Language Model calculates the probability of individual words without considering the previous words in a sentence.',
        },
        {
          q: 'How do you calculate Unigram probability?',
          a: 'Divide the frequency of a particular word by the total number of words in the training corpus.',
        },
        {
          q: 'What is the main limitation of a Unigram model?',
          a: 'It ignores word order and relationships between words. Therefore, it cannot properly understand sentence structure or context.',
        },
        {
          q: 'What is a vocabulary in a Unigram model?',
          a: 'Vocabulary is the collection of unique words found in the training dataset.',
        },
        {
          q: 'Does a Unigram model consider previous words?',
          a: 'No. Each word is treated independently of the other words in the sentence.',
        },
      ],

      code: `from collections import Counter
import re

# Training text
text = """
I love Python and I love machine learning.
Python is useful for machine learning.
"""

# Tokenize the text
words = re.findall(r"\\b\\w+\\b", text.lower())

# Count individual words
unigram_counts = Counter(words)

# Calculate total words
total_words = len(words)

# Calculate unigram probabilities
for word, count in unigram_counts.items():
    probability = count / total_words

    print(
        word,
        "Count:", count,
        "Probability:", round(probability, 4)
    )

# Predict the probability of a word
target = "python"

probability = (
    unigram_counts[target] / total_words
)

print("Probability of Python:", probability)

# Display the five most frequent words
print(unigram_counts.most_common(5))`,

      pitfalls: [
        'A Unigram contains only one word, not two or three words.',
        'Unigram models ignore word order and sentence structure.',
        'The probability of a word depends on the training corpus.',
        'Always use consistent tokenization when counting words.',
        'Words with different capitalisation may be counted separately if text is not normalized.',
        'A Unigram model alone cannot understand the complete meaning of a sentence.',
      ],
    }),

    // =====================================================
    // 2. BIGRAM
    // =====================================================

    lesson({
      slug: 'bigram',
      title: 'Bigram',

      summary:
        'Understand how a language model studies pairs of consecutive words to learn simple word relationships and predict the next word.',

      images: [
        {
          src: 'https://www.wasilzafar.com/images/series/nlp/ngram-model-orders-context-windows.webp',
          alt: 'Bigram context window showing two consecutive words',
          title: 'Bigram Context',
          caption:
            'A Bigram contains two consecutive words and uses the previous word to predict the next word.',
          width: 1200,
          height: 675,
          fit: 'contain',
        },
      ],

      definition:
        'A Bigram is a sequence of two consecutive words in a sentence. A Bigram Language Model calculates the probability of a word based on the immediately preceding word. For example, the sentence "I love Python programming" produces these bigrams: "I love", "love Python" and "Python programming".',

      why:
        'A Unigram model studies words independently and ignores their order. However, word order is important in human language. Bigram models solve part of this problem by studying pairs of consecutive words. They help computers learn which words commonly appear together.',

      purpose:
        'The main purpose of a Bigram model is to understand relationships between two consecutive words and estimate the probability of the next word using one previous word.',

      when: [
        'When building basic next-word prediction applications.',
        'When analysing common word combinations in documents.',
        'When developing simple autocomplete systems.',
        'When analysing phrases in customer reviews.',
        'When studying word relationships in a language.',
        'When building traditional statistical language models.',
      ],

      simpleExample:
        'Consider the sentence:\n\n"I love machine learning."\n\nThe bigrams are:\n\n1. I love\n2. love machine\n3. machine learning\n\nImagine your training dataset contains these sentences:\n\n"I love Python."\n"I love Machine Learning."\n"I enjoy Python."\n\nThe word "I" appears twice with "love" and once with "enjoy".\n\nTherefore:\n\nP(love | I) = 2 / 3 = 0.667\n\nThis means that after seeing the word "I", the model predicts "love" with a probability of approximately 66.7%.',

      detail:
        'A Bigram model works through these steps:\n\n1. Collect Sentences: Gather a collection of training sentences.\n\n2. Tokenize: Split every sentence into individual words.\n\n3. Generate Bigrams: Create pairs of consecutive words.\n\n4. Count Pairs: Calculate how frequently each pair appears.\n\n5. Count Previous Words: Calculate how frequently the first word appears as a context.\n\n6. Calculate Probability: Divide the frequency of a word pair by the frequency of its first word.\n\nFormula:\n\nP(w2 | w1) = Count(w1, w2) / Count(w1)\n\nWhere:\n\n- w1 = Previous word.\n- w2 = Next word.\n- Count(w1, w2) = Frequency of the word pair.\n- Count(w1) = Frequency of the previous word.\n\nExample:\n\nTraining sentences:\n\n"I love Python."\n"I love Java."\n"I like Python."\n\nBigram counts:\n\n- I love = 2\n- I like = 1\n- love Python = 1\n- love Java = 1\n\nTherefore:\n\nP(love | I) = 2 / 3\n\nP(like | I) = 1 / 3\n\nThe model can use these probabilities to predict the next word after seeing "I".\n\nA Bigram model uses the Markov assumption: it considers only the immediately previous word instead of the complete sentence history.',

      realLife: {
        problem:
          'A mobile keyboard application wants to suggest the next word while users are typing messages.',

        approach: [
          'Collect a large collection of text messages.',
          'Tokenize the messages into individual words.',
          'Generate consecutive word pairs.',
          'Count how frequently each word follows another word.',
          'Calculate conditional probabilities for the word pairs.',
          'When a user types a word, suggest the most probable following words.',
        ],

        outcome:
          'The keyboard can provide simple next-word suggestions based on common word combinations, making typing faster.',
      },

      tasks: [
        'Take five sentences and generate all possible bigrams. Calculate how frequently each pair appears.',
        'Calculate P(Python | love) and P(Java | love) using a small training dataset. Explain the conditional probability formula.',
        'Build a Python Bigram Language Model that accepts a word and suggests the three most probable next words using your training sentences.',
      ],

      questions: [
        {
          q: 'What is a Bigram?',
          a: 'A Bigram is a sequence of two consecutive words. For example, "machine learning" is a Bigram.',
        },
        {
          q: 'What is a Bigram Language Model?',
          a: 'A Bigram Language Model predicts the probability of the next word using only the immediately preceding word.',
        },
        {
          q: 'How many previous words does a Bigram model consider?',
          a: 'It considers one previous word when predicting the next word.',
        },
        {
          q: 'What is the formula for Bigram probability?',
          a: 'P(w2 | w1) = Count(w1, w2) / Count(w1). It divides the frequency of a word pair by the frequency of its first word.',
        },
        {
          q: 'What is the difference between Unigram and Bigram?',
          a: 'A Unigram considers individual words without context. A Bigram considers pairs of consecutive words and uses one previous word for prediction.',
        },
        {
          q: 'What is the Markov assumption in a Bigram model?',
          a: 'It assumes that the next word depends only on the immediately preceding word rather than the complete previous sentence.',
        },
        {
          q: 'What is the main limitation of a Bigram model?',
          a: 'It considers only one previous word, so it may miss important information from earlier parts of a sentence.',
        },
      ],

      code: `from collections import Counter
import re

sentences = [
    "I love Python",
    "I love Java",
    "I like Python",
    "I love machine learning"
]

# Create bigram counts
bigram_counts = Counter()
unigram_context_counts = Counter()

for sentence in sentences:

    words = re.findall(
        r"\\b\\w+\\b",
        sentence.lower()
    )

    for i in range(len(words) - 1):

        previous_word = words[i]
        next_word = words[i + 1]

        bigram_counts[
            (previous_word, next_word)
        ] += 1

        unigram_context_counts[
            previous_word
        ] += 1

# Calculate bigram probabilities
for (first, second), count in bigram_counts.items():

    probability = (
        count / unigram_context_counts[first]
    )

    print(
        first, "->", second,
        "Probability:", round(probability, 4)
    )

# Predict next words
def predict_next_word(word):

    candidates = []

    for (first, second), count in bigram_counts.items():

        if first == word.lower():

            probability = (
                count / unigram_context_counts[first]
            )

            candidates.append(
                (second, probability)
            )

    return sorted(
        candidates,
        key=lambda item: item[1],
        reverse=True
    )

print("Suggestions:", predict_next_word("i"))`,

      pitfalls: [
        'A Bigram always contains two consecutive tokens.',
        'A Bigram model considers only one previous word.',
        'Word order matters. "machine learning" and "learning machine" are different bigrams.',
        'A pair not found in the training dataset receives zero probability without smoothing.',
        'A Bigram model may fail when the next word depends on a longer context.',
        'Always calculate conditional probability using the correct context count.',
      ],
    }),

    // =====================================================
    // 3. TRIGRAM
    // =====================================================

    lesson({
      slug: 'trigram',
      title: 'Trigram',

      summary:
        'Understand how a language model studies groups of three consecutive words and uses two previous words to predict the next word.',

      images: [
        {
          src: 'https://www.wasilzafar.com/images/series/nlp/ngram-model-orders-context-windows.webp',
          alt: 'Trigram model context window showing three consecutive words',
          title: 'Trigram Context',
          caption:
            'A Trigram contains three consecutive words. Two words provide context for predicting the third.',
          width: 1200,
          height: 675,
          fit: 'contain',
        },
      ],

      definition:
        'A Trigram is a sequence of three consecutive words in a sentence. A Trigram Language Model predicts the next word using the two immediately preceding words. For example, the sentence "I love machine learning" produces the trigrams "I love machine" and "love machine learning".',

      why:
        'A Bigram model considers only one previous word. Sometimes one word is not enough to understand the intended context. A Trigram model considers two previous words, which helps it learn more detailed word relationships and make better predictions in many situations.',

      purpose:
        'The main purpose of a Trigram model is to predict the next word using two previous words and capture more contextual information than a Bigram model.',

      when: [
        'When developing statistical next-word prediction systems.',
        'When building simple autocomplete applications.',
        'When analysing common three-word phrases.',
        'When improving basic text prediction using additional context.',
        'When developing traditional speech recognition systems.',
        'When studying the relationship between context size and language prediction.',
      ],

      simpleExample:
        'Consider the sentence:\n\n"I love machine learning."\n\nThe trigrams are:\n\n1. I love machine\n2. love machine learning\n\nNow consider the prediction:\n\nP(learning | love, machine)\n\nImagine that the training dataset contains these sequences:\n\n- I love machine learning.\n- I love machine vision.\n- I love machine learning.\n\nThe context "love machine" appears three times.\n\nThe word "learning" follows it twice.\n\nTherefore:\n\nP(learning | love, machine) = 2 / 3 = 0.667\n\nThe model uses both "love" and "machine" to predict the next word.',

      detail:
        'A Trigram model works through these steps:\n\n1. Collect Sentences: Gather text from a training corpus.\n\n2. Tokenize: Split the sentences into individual words.\n\n3. Generate Trigrams: Create groups of three consecutive words.\n\n4. Count Trigrams: Calculate the frequency of each three-word sequence.\n\n5. Count Contexts: Count how frequently the first two words appear together.\n\n6. Calculate Probability: Divide the trigram frequency by the frequency of its two-word context.\n\nFormula:\n\nP(w3 | w1, w2) = Count(w1, w2, w3) / Count(w1, w2)\n\nWhere:\n\n- w1 and w2 = Previous two words.\n- w3 = Next word.\n- Count(w1, w2, w3) = Frequency of the complete trigram.\n- Count(w1, w2) = Frequency of the two-word context.\n\nExample:\n\n"I love machine learning."\n"I love machine vision."\n"I love machine learning."\n\nThe context "I love" appears three times.\n\nP(machine | I, love) = 3 / 3 = 1\n\nThe model predicts "machine" after "I love" with probability 1 in this small dataset.\n\nImportant limitation:\n\nAs the number of words in an N-Gram increases, the number of possible combinations also increases. Many combinations will not appear in the training dataset. This is called the Data Sparsity Problem.',

      realLife: {
        problem:
          'A text prediction application wants to provide more accurate word suggestions by considering the last two words typed by a user.',

        approach: [
          'Collect a large collection of sentences.',
          'Generate three-word sequences from the training text.',
          'Count how frequently each two-word context appears.',
          'Calculate the probability of every next word after each context.',
          'Store the trigram probabilities.',
          'Use the last two words typed by the user to generate possible next-word suggestions.',
        ],

        outcome:
          'The application can use two-word context to produce more relevant suggestions than a simple Bigram model in suitable situations.',
      },

      tasks: [
        'Take five sentences and generate all possible trigrams. Calculate the frequency of each three-word sequence.',
        'Compare Unigram, Bigram and Trigram models using the sentence "I love machine learning". Explain how their context windows differ.',
        'Build a Python Trigram Language Model that predicts the next word from two previous words. Compare its predictions with your Bigram model.',
      ],

      questions: [
        {
          q: 'What is a Trigram?',
          a: 'A Trigram is a sequence of three consecutive words. For example, "I love Python" is a Trigram.',
        },
        {
          q: 'How many previous words does a Trigram model consider?',
          a: 'It considers two previous words to predict the next word.',
        },
        {
          q: 'What is the Trigram probability formula?',
          a: 'P(w3 | w1, w2) = Count(w1, w2, w3) / Count(w1, w2).',
        },
        {
          q: 'What is the difference between Bigram and Trigram?',
          a: 'A Bigram model uses one previous word as context, while a Trigram model uses two previous words.',
        },
        {
          q: 'Why can a Trigram model make better predictions than a Bigram model?',
          a: 'It considers more context, which can help distinguish between words that have different meanings or probabilities depending on the previous two words.',
        },
        {
          q: 'What is Data Sparsity?',
          a: 'Data Sparsity occurs when many possible word combinations are missing from the training dataset. It becomes a bigger problem as the N-Gram size increases.',
        },
        {
          q: 'What is the limitation of a Trigram model?',
          a: 'It only considers the previous two words and may not understand long-range relationships in a sentence. It also requires more training data than a Bigram model.',
        },
      ],

      code: `from collections import Counter
import re

sentences = [
    "I love machine learning",
    "I love machine vision",
    "I love machine learning",
    "I enjoy machine learning"
]

trigram_counts = Counter()
context_counts = Counter()

for sentence in sentences:

    words = re.findall(
        r"\\b\\w+\\b",
        sentence.lower()
    )

    for i in range(len(words) - 2):

        context = (
            words[i],
            words[i + 1]
        )

        trigram = (
            words[i],
            words[i + 1],
            words[i + 2]
        )

        trigram_counts[trigram] += 1
        context_counts[context] += 1

# Calculate trigram probabilities
for trigram, count in trigram_counts.items():

    context = trigram[:2]

    probability = (
        count / context_counts[context]
    )

    print(
        trigram,
        "Probability:",
        round(probability, 4)
    )

# Predict next word
def predict_next_word(word1, word2):

    context = (
        word1.lower(),
        word2.lower()
    )

    suggestions = []

    for trigram, count in trigram_counts.items():

        if trigram[:2] == context:

            probability = (
                count / context_counts[context]
            )

            suggestions.append(
                (trigram[2], probability)
            )

    return sorted(
        suggestions,
        key=lambda item: item[1],
        reverse=True
    )

print(
    predict_next_word("love", "machine")
)`,

      pitfalls: [
        'A Trigram contains exactly three consecutive tokens.',
        'A Trigram model uses two previous words as context.',
        'A larger context does not guarantee better performance when training data is limited.',
        'Unseen trigrams can receive zero probability without smoothing.',
        'The model still cannot understand long-distance relationships beyond its context window.',
        'Always compare models using the same test dataset and tokenization.',
      ],
    }),

    // =====================================================
    // 4. N-GRAM PROBABILITY
    // =====================================================

    lesson({
      slug: 'ngram-probability',
      title: 'N-Gram Probability',

      summary:
        'Understand how statistical language models calculate the probability of word sequences and predict the next word using frequency counts.',

      images: [
        {
          src: 'https://miro.medium.com/v2/resize:fit:1200/1*tYu7tbhRXThGr-CwpDKLTw.png',
          alt: 'Language modelling diagram showing N-Gram probabilities',
          title: 'N-Gram Probability',
          caption:
            'Word sequence probabilities are estimated using the frequency of observed word combinations.',
          width: 1200,
          height: 800,
          fit: 'contain',
        },
      ],

      definition:
        'N-Gram Probability is a statistical method used to calculate how likely a sequence of words is to appear in a language. It uses the frequency of word sequences in a training corpus. Depending on the N-Gram order, the model uses zero, one, two or more previous words to estimate the probability of the next word.',

      why:
        'A language model needs to estimate which word is likely to appear next in a sentence. N-Gram probability provides a mathematical method for making these predictions using previously observed word combinations. It allows computers to calculate the likelihood of sentences and compare different possible word sequences.',

      purpose:
        'Its main purpose is to estimate the probability of word sequences and predict likely next words using statistical information from a training corpus.',

      when: [
        'When predicting the next word in a sentence.',
        'When building statistical autocomplete systems.',
        'When estimating how likely a sentence is to occur.',
        'When developing traditional speech recognition systems.',
        'When comparing different possible word sequences.',
        'When building statistical spelling correction applications.',
      ],

      simpleExample:
        'Imagine the training dataset contains:\n\n"I love Python."\n"I love Java."\n"I love Python."\n\nThe word pair "I love" appears three times.\n\nThe complete sequence "I love Python" appears two times.\n\nTherefore:\n\nP(Python | I, love) = 2 / 3 = 0.667\n\nThis means the model estimates that Python is the next word after "I love" with a probability of approximately 66.7%.\n\nAnother possible continuation is Java:\n\nP(Java | I, love) = 1 / 3 = 0.333\n\nThe probabilities add up to 1 because these are the only observed continuations in this small example.',

      detail:
        'N-Gram probability is generally calculated using Maximum Likelihood Estimation (MLE).\n\nMaximum Likelihood Estimation uses observed frequencies to estimate probability values.\n\nGeneral conditional probability formula:\n\nP(next word | previous words) = Count(previous words + next word) / Count(previous words)\n\nFor different N-Gram models:\n\n1. Unigram:\n\nP(w) = Count(w) / Total word count\n\n2. Bigram:\n\nP(w2 | w1) = Count(w1, w2) / Count(w1)\n\n3. Trigram:\n\nP(w3 | w1, w2) = Count(w1, w2, w3) / Count(w1, w2)\n\nSentence Probability:\n\nThe probability of a sentence can be estimated by multiplying its conditional word probabilities.\n\nFor a Bigram model:\n\nP(w1, w2, w3) = P(w1) × P(w2 | w1) × P(w3 | w2)\n\nFor a Trigram model, the prediction uses the previous two words, with appropriate sentence-start context.\n\nExample:\n\n"I love Python"\n\nP(sentence) = P(I) × P(love | I) × P(Python | love)\n\nThe model multiplies the individual conditional probabilities to estimate the complete sentence probability.\n\nZero Probability Problem:\n\nIf a word combination never appears in the training dataset, its Maximum Likelihood probability becomes zero.\n\nFor example:\n\nP(love | I) may be positive, but an unseen bigram such as "love TensorFlow" may receive zero probability.\n\nIf any word in a sentence receives zero probability, the complete sentence probability also becomes zero.\n\nSmoothing methods such as Laplace and Kneser-Ney help solve this problem.',

      realLife: {
        problem:
          'A search engine wants to rank possible query completions based on how commonly different word sequences occur in its text collection.',

        approach: [
          'Collect a large text corpus containing search queries and documents.',
          'Tokenize the text into words.',
          'Generate Unigram, Bigram and Trigram counts.',
          'Calculate conditional probabilities using frequency counts.',
          'Estimate the probability of different query completions.',
          'Rank the suggestions using their estimated probabilities.',
        ],

        outcome:
          'The search engine can use observed language patterns to generate more likely query suggestions and rank possible word sequences.',
      },

      tasks: [
        'Calculate Unigram, Bigram and Trigram probabilities manually using five sample sentences.',
        'Calculate the probability of "I love Python" using a Bigram model. Show all word counts and probability calculations.',
        'Build a Python N-Gram probability calculator that accepts a training corpus and calculates sentence probabilities using Unigram, Bigram and Trigram models. Identify what happens when an unseen sequence is entered.',
      ],

      questions: [
        {
          q: 'What is N-Gram Probability?',
          a: 'It is the estimated probability of a word or word sequence based on the frequency of observed N-Grams in a training corpus.',
        },
        {
          q: 'What is Maximum Likelihood Estimation?',
          a: 'Maximum Likelihood Estimation is a method that estimates probabilities using observed frequency counts in the training dataset.',
        },
        {
          q: 'What is the general N-Gram probability formula?',
          a: 'P(w | context) = Count(context + w) / Count(context).',
        },
        {
          q: 'How is sentence probability calculated?',
          a: 'Sentence probability is estimated by multiplying the conditional probabilities of its words, using the selected language model.',
        },
        {
          q: 'What is the Zero Probability Problem?',
          a: 'It occurs when an N-Gram does not appear in the training corpus. Its estimated probability becomes zero, which can make the probability of an entire sentence zero.',
        },
        {
          q: 'What is the difference between joint and conditional probability?',
          a: 'Joint probability measures the probability of multiple events occurring together. Conditional probability measures the probability of one event occurring given another event or context.',
        },
        {
          q: 'How can we solve the Zero Probability Problem?',
          a: 'We can use smoothing techniques such as Laplace Smoothing, Good-Turing Smoothing and Kneser-Ney Smoothing to assign probability to unseen N-Grams.',
        },
        {
          q: 'Why are logarithms used when calculating sentence probability?',
          a: 'Sentence probabilities can become extremely small. Logarithms convert multiplication into addition and help prevent numerical underflow.',
        },
      ],

      code: `from collections import Counter
import re

sentences = [
    "I love Python",
    "I love Java",
    "I love Python",
    "I enjoy Python"
]

unigram_counts = Counter()
bigram_counts = Counter()
trigram_counts = Counter()

bigram_contexts = Counter()
trigram_contexts = Counter()

for sentence in sentences:

    words = re.findall(
        r"\\b\\w+\\b",
        sentence.lower()
    )

    unigram_counts.update(words)

    for i in range(len(words) - 1):

        bigram = (
            words[i],
            words[i + 1]
        )

        bigram_counts[bigram] += 1
        bigram_contexts[words[i]] += 1

    for i in range(len(words) - 2):

        trigram = tuple(words[i:i + 3])

        trigram_counts[trigram] += 1
        trigram_contexts[tuple(words[i:i + 2])] += 1

# Bigram probability
def bigram_probability(first, second):

    denominator = bigram_contexts[first]

    if denominator == 0:
        return 0

    return (
        bigram_counts[(first, second)]
        / denominator
    )

# Trigram probability
def trigram_probability(first, second, third):

    context = (first, second)

    denominator = trigram_contexts[context]

    if denominator == 0:
        return 0

    return (
        trigram_counts[(first, second, third)]
        / denominator
    )

print(
    "Bigram:",
    bigram_probability("i", "love")
)

print(
    "Trigram:",
    trigram_probability(
        "i", "love", "python"
    )
)

# Estimate sentence probability using bigrams
def sentence_probability(sentence):

    words = sentence.lower().split()

    probability = 1.0

    for i in range(1, len(words)):

        probability *= bigram_probability(
            words[i - 1],
            words[i]
        )

    return probability

print(
    "Sentence probability:",
    sentence_probability("i love python")
)`,

      pitfalls: [
        'Maximum Likelihood Estimation uses observed counts and can assign zero probability to unseen sequences.',
        'Conditional probability must use the correct context count as its denominator.',
        'Do not confuse the probability of a word with the probability of a word given a context.',
        'Sentence probability can become extremely small when many probabilities are multiplied.',
        'Use log probabilities when working with long sentences.',
        'Higher-order N-Grams require more training data because they create more possible combinations.',
      ],
    }),

    // =====================================================
    // 5. PERPLEXITY
    // =====================================================

    lesson({
      slug: 'perplexity',
      title: 'Perplexity',

      summary:
        'Understand how to evaluate a language model by measuring how surprised it is when predicting words in unseen text.',

      images: [
        {
          src: 'https://image1.slideserve.com/2384790/perplexity-model-comparison2-l.jpg',
          alt: 'Comparison of perplexity for Unigram Bigram and Trigram models',
          title: 'Perplexity Model Comparison',
          caption:
            'Perplexity measures how well different language models predict a test dataset. Lower values generally indicate better prediction.',
          width: 1200,
          height: 900,
          fit: 'contain',
        },
      ],

      definition:
        'Perplexity is an evaluation metric used in Natural Language Processing to measure how well a language model predicts a sequence of words. It measures how uncertain or surprised the model is when it encounters text. A lower perplexity generally means that the model assigns higher probability to the test text and predicts it more confidently.',

      why:
        'Building a language model is not enough. We also need to measure how well it predicts new sentences that were not used during training. Perplexity provides a mathematical way to evaluate and compare language models using unseen test data.',

      purpose:
        'The main purpose of Perplexity is to measure how well a statistical language model predicts the next words in a test dataset.',

      when: [
        'When comparing Unigram, Bigram and Trigram language models.',
        'When evaluating different language model configurations.',
        'When measuring prediction quality on unseen text.',
        'When comparing different smoothing techniques.',
        'When analysing how confidently a language model predicts words.',
        'When studying statistical language model performance.',
      ],

      simpleExample:
        'Imagine two language models are predicting the next word in the sentence:\n\n"I love machine learning."\n\nModel A assigns a high probability to the correct next words.\n\nModel B assigns very low probabilities to the correct next words.\n\nModel A will generally have lower Perplexity because it is less surprised by the actual sentence.\n\nThink of Perplexity as a measure of uncertainty:\n\n- Lower Perplexity = The model is less surprised by the test text.\n- Higher Perplexity = The model is more surprised by the test text.\n\nFor example, a model with Perplexity 10 is generally better than a model with Perplexity 50 when both are evaluated using the same test data, vocabulary and tokenization.',

      detail:
        'Perplexity is calculated using the probability assigned to a test sequence.\n\nFormula:\n\nPP(W) = P(W)^(-1/N)\n\nWhere:\n\n- PP(W) = Perplexity of the test sequence.\n- P(W) = Probability of the complete word sequence.\n- N = Number of predicted tokens.\n\nAn equivalent formula using conditional probabilities is:\n\nPP(W) = (1 / (P(w1) × P(w2 | w1) × ... × P(wN | context)))^(1/N)\n\nLogarithmic Formula:\n\nPP(W) = exp(-1/N × Sum(log(P(wi | context))))\n\nThis version is more practical because it avoids multiplying extremely small probability values.\n\nSimple Numerical Example:\n\nSuppose a model assigns these probabilities to three words:\n\n- Word 1 = 0.5\n- Word 2 = 0.5\n- Word 3 = 0.5\n\nComplete probability:\n\nP(W) = 0.5 × 0.5 × 0.5 = 0.125\n\nNumber of words = 3.\n\nPerplexity:\n\nPP(W) = (1 / 0.125)^(1/3)\n\nPP(W) = 2\n\nThis means the model has an average uncertainty equivalent to choosing between approximately two equally likely possibilities at each position.\n\nImportant Evaluation Rules:\n\n1. Train the model using training data.\n2. Evaluate it using separate test data.\n3. Do not train on the test dataset.\n4. Use consistent tokenization and vocabulary when comparing models.\n5. Ensure that all test tokens receive valid probabilities, including through appropriate unknown-word handling or smoothing.\n\nA lower Perplexity is generally better, but it does not automatically guarantee better performance in every real-world application.',

      realLife: {
        problem:
          'A company has developed three statistical language models and wants to identify which one predicts customer messages most accurately.',

        approach: [
          'Collect a text dataset and divide it into training and test datasets.',
          'Train a Unigram model using the training data.',
          'Train a Bigram and Trigram model using the same training data.',
          'Calculate the probability of each test word using the corresponding model.',
          'Calculate the Perplexity of each model using the test dataset.',
          'Compare the results using the same vocabulary and tokenization rules.',
        ],

        outcome:
          'The company can compare the prediction uncertainty of the three models and identify which model better predicts the unseen customer messages.',
      },

      tasks: [
        'Explain Perplexity using a simple example. Why does a lower Perplexity generally indicate better language prediction?',
        'Calculate Perplexity manually when a model assigns probabilities of 0.5, 0.5 and 0.5 to three consecutive words.',
        'Build a Python Perplexity calculator using logarithms. Compare a Unigram and Bigram model on a held-out test dataset.',
      ],

      questions: [
        {
          q: 'What is Perplexity in NLP?',
          a: 'Perplexity is an evaluation metric that measures how well a language model predicts a sequence of words. It represents the model uncertainty when predicting test text.',
        },
        {
          q: 'What does a low Perplexity mean?',
          a: 'A low Perplexity generally means the model assigns higher probabilities to the actual test words and is less surprised by the test data.',
        },
        {
          q: 'What is the Perplexity formula?',
          a: 'PP(W) = P(W)^(-1/N), where P(W) is the probability of the test sequence and N is the number of predicted tokens.',
        },
        {
          q: 'Why do we use Perplexity?',
          a: 'We use Perplexity to evaluate and compare language models by measuring how well they predict unseen text.',
        },
        {
          q: 'What is the difference between high and low Perplexity?',
          a: 'High Perplexity indicates greater uncertainty about the next word. Low Perplexity indicates that the model assigns higher probability to the observed words.',
        },
        {
          q: 'Why should we use test data to calculate Perplexity?',
          a: 'Test data helps measure how well a model predicts new text instead of simply memorising the training dataset.',
        },
        {
          q: 'Why are logarithms used in Perplexity calculations?',
          a: 'Logarithms convert multiplication into addition and help avoid numerical underflow when multiplying many small probabilities.',
        },
        {
          q: 'Does lower Perplexity always mean a better real-world language model?',
          a: 'Not necessarily. Perplexity is an intrinsic evaluation metric. A model should also be evaluated on the actual application because lower Perplexity does not guarantee better performance on every task.',
        },
      ],

      code: `import math

# Probability of each predicted word
probabilities = [
    0.5,
    0.5,
    0.5
]

# Calculate perplexity using logarithms
def calculate_perplexity(probabilities):

    if not probabilities:
        raise ValueError("No probabilities provided")

    if any(p <= 0 or p > 1 for p in probabilities):
        raise ValueError(
            "Every probability must be between 0 and 1"
        )

    total_log_probability = sum(
        math.log(p)
        for p in probabilities
    )

    average_log_probability = (
        total_log_probability / len(probabilities)
    )

    perplexity = math.exp(
        -average_log_probability
    )

    return perplexity

result = calculate_perplexity(probabilities)

print("Perplexity:", round(result, 4))

# Compare two models
model_a = [0.8, 0.7, 0.9]
model_b = [0.3, 0.2, 0.4]

print(
    "Model A:",
    calculate_perplexity(model_a)
)

print(
    "Model B:",
    calculate_perplexity(model_b)
)`,

      pitfalls: [
        'Lower Perplexity generally indicates better prediction, but comparisons require the same evaluation setup.',
        'Always calculate Perplexity on unseen test data.',
        'An unseen word with zero probability can make Perplexity infinite.',
        'Use logarithms to avoid numerical underflow.',
        'The number of predicted tokens must be calculated consistently.',
        'Perplexity values are not directly comparable when tokenization or vocabulary differs.',
        'Perplexity alone cannot measure every aspect of language understanding.',
      ],
    }),

    // =====================================================
    // 6. LAPLACE SMOOTHING
    // =====================================================

    lesson({
      slug: 'laplace-smoothing',
      title: 'Laplace Smoothing',

      summary:
        'Understand how adding one to word counts prevents unseen word combinations from receiving zero probability.',

      images: [
        {
          src: 'https://www.wasilzafar.com/images/series/nlp/smoothing-probability-redistribution-seen-unseen.webp',
          alt: 'N-Gram smoothing comparison showing unseen combinations receiving probability',
          title: 'Probability Redistribution',
          caption:
            'Laplace Smoothing adds a small amount of probability to unseen word combinations instead of assigning them zero probability.',
          width: 1200,
          height: 675,
          fit: 'contain',
        },
      ],

      definition:
        'Laplace Smoothing is a statistical technique used in language models to solve the Zero Probability Problem. It adds one to every possible N-Gram count before calculating probabilities. It is also called Add-One Smoothing because one is added to each count.',

      why:
        'A language model calculates probability using frequency counts. If a word combination never appears in the training dataset, its probability becomes zero. This can cause the probability of an entire sentence to become zero. Laplace Smoothing solves this problem by adding one to every possible count, allowing unseen combinations to receive a small non-zero probability.',

      purpose:
        'Its main purpose is to prevent zero probabilities by assigning a small amount of probability to N-Grams that were not observed during training.',

      when: [
        'When learning how smoothing techniques work in statistical language models.',
        'When handling unseen word combinations in small datasets.',
        'When implementing basic Naive Bayes text classification.',
        'When experimenting with simple Bigram and Trigram models.',
        'When comparing Maximum Likelihood Estimation with smoothed probabilities.',
        'When learning how probability mass is distributed among observed and unseen events.',
      ],

      simpleExample:
        'Imagine your training dataset contains these sentences:\n\n"I love Python."\n"I love Java."\n"I enjoy Python."\n\nAfter the word "love", the following words are:\n\n- Python = 1\n- Java = 1\n- Machine = 0\n\nWithout smoothing:\n\nP(Machine | love) = 0 / 2 = 0\n\nThe model has never seen "love Machine", so it assigns zero probability.\n\nNow apply Laplace Smoothing.\n\nAssume the vocabulary contains four possible next words:\n\nPython, Java, Machine and Learning.\n\nFormula:\n\nP(w | context) = (Count(context, w) + 1) / (Count(context) + V)\n\nP(Machine | love) = (0 + 1) / (2 + 4)\n\n= 1 / 6\n\n= 0.1667\n\nNow the unseen word combination receives a non-zero probability.',

      detail:
        'Laplace Smoothing works through these steps:\n\n1. Build Vocabulary: Collect all unique words in the training dataset.\n\n2. Count N-Grams: Calculate the frequency of each word combination.\n\n3. Add One: Add 1 to every possible N-Gram count.\n\n4. Adjust Denominator: Add the vocabulary size to the original context count.\n\n5. Calculate Probability: Divide the adjusted N-Gram count by the adjusted context count.\n\nBigram Formula:\n\nP(w2 | w1) = (Count(w1, w2) + 1) / (Count(w1) + V)\n\nWhere:\n\n- Count(w1, w2) = Frequency of the Bigram.\n- Count(w1) = Frequency of the previous word.\n- V = Number of unique words in the vocabulary.\n\nTrigram Formula:\n\nP(w3 | w1, w2) = (Count(w1, w2, w3) + 1) / (Count(w1, w2) + V)\n\nNumerical Example:\n\nSuppose the context "I love" has these counts:\n\n- Python = 3\n- Java = 1\n- Machine = 0\n- Learning = 0\n\nTotal context count = 4.\n\nVocabulary size = 4.\n\nUsing Laplace Smoothing:\n\nP(Python | I love) = (3 + 1) / (4 + 4) = 0.5\n\nP(Java | I love) = (1 + 1) / (4 + 4) = 0.25\n\nP(Machine | I love) = (0 + 1) / (4 + 4) = 0.125\n\nP(Learning | I love) = (0 + 1) / (4 + 4) = 0.125\n\nThe probabilities add up to 1.\n\nLimitation:\n\nLaplace Smoothing is easy to understand and implement, but it can assign too much probability to unseen combinations, especially when the vocabulary is very large.\n\nMore advanced methods such as Good-Turing and Kneser-Ney generally provide better estimates for statistical language modelling.',

      realLife: {
        problem:
          'A simple text classification system is trained using a small collection of customer messages. During testing, it encounters words or word combinations that were never observed during training.',

        approach: [
          'Collect and tokenize the customer messages.',
          'Calculate the frequency of words and word combinations.',
          'Identify possible unseen combinations.',
          'Add one to the observed counts using Laplace Smoothing.',
          'Adjust the denominator using the vocabulary size.',
          'Calculate the smoothed probabilities and use them for prediction.',
        ],

        outcome:
          'The classification system can avoid assigning zero probability to unseen combinations, making its probability calculations more reliable than unsmoothed frequency estimates.',
      },

      tasks: [
        'Explain the Zero Probability Problem using a simple sentence containing an unseen word combination.',
        'Calculate the probability of four possible next words using Laplace Smoothing when their counts are 3, 1, 0 and 0.',
        'Build a Python Bigram model with and without Laplace Smoothing. Compare the probability of an observed and an unseen word combination.',
      ],

      questions: [
        {
          q: 'What is Laplace Smoothing?',
          a: 'Laplace Smoothing is a technique that adds one to every possible event count to prevent unseen N-Grams from receiving zero probability.',
        },
        {
          q: 'What is another name for Laplace Smoothing?',
          a: 'It is also called Add-One Smoothing because one is added to every count.',
        },
        {
          q: 'Why is Laplace Smoothing required?',
          a: 'It prevents unseen word combinations from receiving zero probability, which would otherwise make the probability of an entire sentence zero.',
        },
        {
          q: 'What is the Bigram Laplace Smoothing formula?',
          a: 'P(w2 | w1) = (Count(w1, w2) + 1) / (Count(w1) + V), where V is the vocabulary size.',
        },
        {
          q: 'What is the role of vocabulary size in Laplace Smoothing?',
          a: 'Vocabulary size is added to the denominator because one is added to the count of every possible next word.',
        },
        {
          q: 'What is the Zero Probability Problem?',
          a: 'It occurs when an unseen N-Gram receives zero probability because it never appeared in the training dataset.',
        },
        {
          q: 'What is the main limitation of Laplace Smoothing?',
          a: 'It can assign too much probability to unseen events, particularly when the vocabulary is large.',
        },
        {
          q: 'What is the difference between MLE and Laplace Smoothing?',
          a: 'MLE calculates probabilities using original frequency counts. Laplace Smoothing adds one to the counts so unseen combinations receive non-zero probability.',
        },
      ],

      code: `from collections import Counter
import re

sentences = [
    "I love Python",
    "I love Java",
    "I love Python",
    "I enjoy Python"
]

bigram_counts = Counter()
context_counts = Counter()

for sentence in sentences:

    words = re.findall(
        r"\\b\\w+\\b",
        sentence.lower()
    )

    for i in range(len(words) - 1):

        first = words[i]
        second = words[i + 1]

        bigram_counts[(first, second)] += 1
        context_counts[first] += 1

# Vocabulary
vocabulary = set()

for sentence in sentences:
    vocabulary.update(
        re.findall(r"\\b\\w+\\b", sentence.lower())
    )

vocab_size = len(vocabulary)

# Laplace smoothing
def laplace_probability(first, second):

    count = bigram_counts[(first, second)]

    context_count = context_counts[first]

    probability = (
        (count + 1)
        /
        (context_count + vocab_size)
    )

    return probability

print(
    "Observed:",
    laplace_probability("i", "love")
)

print(
    "Unseen:",
    laplace_probability("love", "machine")
)`,

      pitfalls: [
        'Laplace Smoothing adds one to every possible N-Gram count.',
        'Vocabulary size must be included in the denominator.',
        'Do not add one only to observed word combinations.',
        'A larger vocabulary can significantly affect the smoothed probabilities.',
        'Laplace Smoothing can overestimate the probability of unseen events.',
        'Smoothing does not mean that the model has actually observed the missing word combination.',
      ],
    }),

    // =====================================================
    // 7. GOOD-TURING SMOOTHING
    // =====================================================

    lesson({
      slug: 'good-turing-smoothing',
      title: 'Good-Turing Smoothing',

      summary:
        'Understand how language models estimate the probability of unseen word combinations using the frequency of events observed once, twice and more.',

      images: [
        {
          src: 'https://slidetodoc.com/presentation_image/1a6e448de3e52788de5f02bc277c4293/image-35.jpg',
          alt: 'N-Gram smoothing diagram showing probability redistribution',
          title: 'Smoothing and Discounting',
          caption:
            'Smoothing reduces some probability assigned to observed events and reserves probability for unseen events.',
          width: 1200,
          height: 675,
          fit: 'contain',
        },
      ],

      definition:
        'Good-Turing Smoothing is a statistical technique used to estimate the probability of events that have never appeared in a training dataset. It uses the number of events that occur once, twice, three times and so on. It estimates how much probability should be reserved for unseen events by studying the frequency of rare observed events.',

      why:
        'In real-world language datasets, many possible word combinations are never observed. Simply assigning zero probability to these combinations creates problems for language models. Good-Turing Smoothing solves this problem by studying how many events occur with different frequency counts and estimating how much probability belongs to unseen events.',

      purpose:
        'Its main purpose is to estimate the probability of unseen events using frequency-of-frequency statistics and redistribute some probability mass from observed events.',

      when: [
        'When working with statistical language models.',
        'When estimating the probability of unseen N-Grams.',
        'When analysing rare word combinations in large text datasets.',
        'When studying statistical smoothing techniques.',
        'When working with sparse language data.',
        'When learning how frequency-of-frequency statistics can improve probability estimation.',
      ],

      simpleExample:
        'Imagine that your training dataset contains 100 different word combinations.\n\nTheir frequency counts are:\n\n- 40 combinations appear once.\n- 30 combinations appear twice.\n- 20 combinations appear three times.\n- 10 combinations appear four times.\n\nIn Good-Turing Smoothing, we study how many combinations occur with each frequency.\n\nFor example:\n\nN1 = 40\n\nN2 = 30\n\nWhere:\n\n- N1 = Number of events occurring exactly once.\n- N2 = Number of events occurring exactly twice.\n\nThe Good-Turing adjusted count for an event occurring once is approximately:\n\nc* = (c + 1) × N(c + 1) / N(c)\n\nFor an event with count 1:\n\nc* = 2 × N2 / N1\n\nc* = 2 × 30 / 40\n\nc* = 1.5\n\nThe adjusted count is 1.5 instead of the original count of 1.\n\nThe main idea is that frequency information helps us estimate how probability should be distributed among rare and unseen events.',

      detail:
        'Good-Turing Smoothing is based on Frequency of Frequencies.\n\nImportant Terms:\n\n- N1: Number of different events observed exactly once.\n- N2: Number of different events observed exactly twice.\n- N3: Number of different events observed exactly three times.\n- Nc: Number of different events observed exactly c times.\n- c: Original frequency of an event.\n- c*: Adjusted frequency after Good-Turing estimation.\n\nGood-Turing Adjusted Count Formula:\n\nc* = (c + 1) × N(c + 1) / Nc\n\nExample:\n\nSuppose:\n\nN1 = 50\nN2 = 30\nN3 = 20\n\nFor an event occurring once:\n\nc* = (1 + 1) × 30 / 50\n\nc* = 1.2\n\nFor an event occurring twice:\n\nc* = (2 + 1) × 20 / 30\n\nc* = 2\n\nEstimating Unseen Probability:\n\nThe total probability mass assigned to unseen events is approximately:\n\nP0 = N1 / N\n\nWhere:\n\n- N1 = Number of events observed exactly once.\n- N = Total number of observed event tokens.\n\nIf N1 = 50 and N = 500:\n\nP0 = 50 / 500 = 0.10\n\nApproximately 10% of the probability mass is reserved for unseen events.\n\nHow it works:\n\n1. Count all observed events.\n2. Group events according to their frequency.\n3. Calculate N1, N2, N3 and other frequency-of-frequency values.\n4. Adjust observed counts using the Good-Turing formula.\n5. Reserve probability mass for unseen events.\n6. Normalize the probability distribution.\n\nImportant Note:\n\nThe basic formula is a teaching-level explanation. Real Good-Turing implementations often use smoothing of the frequency-of-frequency table because some higher-frequency buckets may be missing or unreliable.',

      realLife: {
        problem:
          'A speech recognition system is trained using a large collection of spoken sentences. During testing, it encounters word combinations that were not present in the training data.',

        approach: [
          'Collect a large text corpus containing speech transcripts.',
          'Generate N-Grams and count their frequencies.',
          'Group N-Grams according to their occurrence counts.',
          'Calculate frequency-of-frequency values such as N1 and N2.',
          'Apply Good-Turing adjusted counts to rare observed N-Grams.',
          'Estimate the probability mass reserved for unseen N-Grams.',
        ],

        outcome:
          'The language model can assign probability to previously unseen word combinations instead of treating every missing combination as impossible.',
      },

      tasks: [
        'Explain Frequency of Frequencies. Calculate N1, N2 and N3 from a small collection of word combinations.',
        'Calculate the Good-Turing adjusted count for an event with count 1 when N1 = 40 and N2 = 30. Also calculate the estimated unseen probability mass when N = 400.',
        'Build a Python program that calculates frequency-of-frequency values from a collection of N-Grams and estimates adjusted counts using the Good-Turing formula. Identify what happens when a required frequency bucket is missing.',
      ],

      questions: [
        {
          q: 'What is Good-Turing Smoothing?',
          a: 'Good-Turing Smoothing is a statistical method that estimates probabilities for unseen events by studying the frequency of rare observed events.',
        },
        {
          q: 'What is Frequency of Frequencies?',
          a: 'Frequency of Frequencies represents how many different events occur a particular number of times. For example, N1 represents the number of events observed exactly once.',
        },
        {
          q: 'What does N1 represent?',
          a: 'N1 represents the number of different events that occur exactly once in the training dataset.',
        },
        {
          q: 'What does N2 represent?',
          a: 'N2 represents the number of different events that occur exactly twice in the training dataset.',
        },
        {
          q: 'What is the Good-Turing adjusted count formula?',
          a: 'The basic formula is c* = (c + 1) × N(c + 1) / Nc, where c is the original count and Nc is the number of events occurring exactly c times.',
        },
        {
          q: 'How does Good-Turing estimate unseen probability?',
          a: 'It estimates the probability mass of unseen events using N1 / N, where N1 is the number of events observed once and N is the total number of observed event tokens.',
        },
        {
          q: 'What is the difference between Laplace and Good-Turing Smoothing?',
          a: 'Laplace adds one to every possible event count. Good-Turing uses frequency-of-frequency statistics to adjust observed counts and estimate probability for unseen events.',
        },
        {
          q: 'Why is Good-Turing Smoothing useful?',
          a: 'It provides a statistical method for estimating the probability of unseen events, especially when a dataset contains many rare observations.',
        },
      ],

      code: `from collections import Counter

# Example event counts
event_counts = {
    "I love": 1,
    "love Python": 2,
    "Python is": 2,
    "is useful": 3,
    "love Java": 1,
    "Java programming": 3
}

# Calculate frequency of frequencies
frequency_of_frequencies = Counter(
    event_counts.values()
)

print(
    "Frequency of frequencies:",
    frequency_of_frequencies
)

# Good-Turing adjusted count
def good_turing_count(count):

    current_frequency = (
        frequency_of_frequencies[count]
    )

    next_frequency = (
        frequency_of_frequencies[count + 1]
    )

    if current_frequency == 0:
        return 0

    if next_frequency == 0:
        raise ValueError(
            "Missing next frequency bucket. "
            "A smoothed count-of-counts table is needed."
        )

    adjusted_count = (
        (count + 1)
        * next_frequency
        / current_frequency
    )

    return adjusted_count

# Display adjusted counts
for event, count in event_counts.items():

    try:
        adjusted = good_turing_count(count)

        print(
            event,
            "Original:", count,
            "Adjusted:", round(adjusted, 4)
        )

    except ValueError as error:
        print(event, error)

# Estimate unseen probability mass
total_events = sum(event_counts.values())

N1 = frequency_of_frequencies[1]

unseen_probability = N1 / total_events

print(
    "Estimated unseen probability mass:",
    unseen_probability
)`,

      pitfalls: [
        'N1 represents the number of different events occurring exactly once, not the total number of unique words.',
        'Good-Turing uses frequency-of-frequency statistics rather than simply adding one.',
        'Missing frequency buckets can make the basic Good-Turing formula undefined.',
        'Real implementations may need smoothed frequency-of-frequency estimates.',
        'The unseen probability mass must be distributed across possible unseen events appropriately.',
        'Do not confuse Good-Turing Smoothing with Laplace Smoothing.',
        'The simple formula is an educational approximation, not a complete production-ready language model.',
      ],
    }),

    // =====================================================
    // 8. KNESER-NEY SMOOTHING
    // =====================================================

    lesson({
      slug: 'kneser-ney-smoothing',
      title: 'Kneser-Ney Smoothing',

      summary:
        'Understand how an advanced N-Gram smoothing technique uses discounted counts and the number of distinct preceding contexts to estimate more reliable probabilities.',

      images: [
        {
          src: 'https://image3.slideserve.com/5746595/kneser-ney-smoothing-cont-l.jpg',
          alt: 'Kneser-Ney continuation probability and interpolation formula',
          title: 'Kneser-Ney Continuation Probability',
          caption:
            'Kneser-Ney considers how many different preceding words can lead to a particular word, rather than relying only on its raw frequency.',
          width: 1200,
          height: 675,
          fit: 'contain',
        },
      ],

      definition:
        'Kneser-Ney Smoothing is an advanced statistical smoothing technique used in N-Gram Language Models. It combines discounted N-Gram counts with lower-order continuation probabilities. Instead of using only the frequency of a word, it also considers how many different contexts the word appears in. This helps the model estimate more reliable probabilities for unseen word combinations.',

      why:
        'Simple smoothing methods such as Laplace treat unseen combinations using a basic count adjustment. However, not all words are equally likely to appear in new contexts. For example, a word that appears frequently in only one fixed phrase may be less useful for predicting new combinations than a word that appears in many different contexts. Kneser-Ney solves this problem by considering the number of distinct preceding contexts.',

      purpose:
        'Its main purpose is to improve N-Gram probability estimates by discounting observed counts and using continuation probabilities from lower-order models.',

      when: [
        'When building more advanced statistical language models.',
        'When handling sparse Bigram and Trigram datasets.',
        'When improving the probability estimates of unseen word combinations.',
        'When studying advanced N-Gram smoothing techniques.',
        'When building traditional statistical speech recognition systems.',
        'When learning the difference between raw word frequency and continuation probability.',
      ],

      simpleExample:
        'Imagine that the word "Francisco" appears many times in the phrase "San Francisco".\n\nHowever, it rarely appears after any other word.\n\nNow imagine that the word "coffee" appears after many different words:\n\n- hot coffee\n- cold coffee\n- fresh coffee\n- strong coffee\n\nBoth words may have high frequency, but coffee appears in more different contexts.\n\nA simple frequency-based model may consider both words common.\n\nKneser-Ney gives importance to the number of distinct contexts in which a word appears.\n\nTherefore, "coffee" may receive a higher continuation probability because it can naturally follow many different words.\n\nThis helps the model make better predictions when it encounters a new context.',

      detail:
        'Kneser-Ney Smoothing generally uses two important ideas:\n\n1. Absolute Discounting:\n\nA small constant D is subtracted from the count of every observed N-Gram.\n\nInstead of assigning all observed probability directly to the existing combinations, some probability mass is reserved for unseen combinations.\n\n2. Continuation Probability:\n\nThe model estimates how many different preceding words can appear before a particular word.\n\nBigram continuation probability:\n\nP_cont(w) = Number of distinct words appearing before w / Total number of distinct observed bigrams\n\nFor example:\n\n"hot coffee"\n"cold coffee"\n"fresh coffee"\n\nThe word coffee has three distinct preceding words.\n\nTherefore, its continuation count is 3.\n\nInterpolated Kneser-Ney Formula:\n\nP_KN(w | h) = max(C(h,w) - D, 0) / C(h) + lambda(h) × P_cont(w)\n\nWhere:\n\n- C(h,w) = Count of the N-Gram.\n- C(h) = Count of the context.\n- D = Discount value.\n- lambda(h) = Amount of probability reserved for lower-order continuation probabilities.\n- P_cont(w) = Continuation probability of the next word.\n\nFor a Bigram model:\n\nlambda(h) = D × Number of distinct words following h / C(h)\n\nExample:\n\nSuppose the context "I like" occurs 10 times.\n\nThe word "Python" follows it 5 times.\n\nAssume D = 0.75.\n\nThe discounted part is:\n\n(5 - 0.75) / 10 = 0.425\n\nThe remaining probability is distributed through the continuation probability.\n\nWhy Kneser-Ney is useful:\n\n- It does not depend only on raw word frequency.\n- It considers how many different contexts lead to a word.\n- It redistributes probability from observed N-Grams.\n- It can provide more reliable estimates for unseen combinations.\n\nImportant Note:\n\nThe formula shown here is interpolated absolute-discount Kneser-Ney for a basic Bigram model. Production implementations often use modified Kneser-Ney with separate discount values for different count levels and recursive lower-order continuation distributions.',

      realLife: {
        problem:
          'A speech recognition system must predict words in spoken sentences. Its training dataset contains many repeated phrases but also needs to handle new word combinations.',

        approach: [
          'Collect a large speech transcription dataset.',
          'Generate Bigram and Trigram counts.',
          'Calculate the number of distinct preceding contexts for each word.',
          'Apply absolute discounting to observed N-Gram counts.',
          'Calculate continuation probabilities.',
          'Combine the discounted probabilities with lower-order continuation probabilities.',
          'Evaluate the language model using held-out data and Perplexity.',
        ],

        outcome:
          'The language model can use both observed word frequencies and the diversity of word contexts to produce more reliable predictions for sparse text data.',
      },

      tasks: [
        'Explain Kneser-Ney Smoothing using the examples "San Francisco" and "hot coffee". Why does the number of distinct preceding contexts matter?',
        'Calculate continuation probabilities for five words using a small Bigram dataset. Identify which words have the most distinct preceding contexts.',
        'Implement a basic interpolated Kneser-Ney Bigram model using Python. Compare its predictions with an unsmoothed Bigram model and Laplace Smoothing.',
      ],

      questions: [
        {
          q: 'What is Kneser-Ney Smoothing?',
          a: 'Kneser-Ney is an advanced N-Gram smoothing technique that combines discounted word counts with continuation probabilities from lower-order language models.',
        },
        {
          q: 'Why is Kneser-Ney Smoothing used?',
          a: 'It helps estimate probabilities for unseen word combinations and improves lower-order probability estimates by considering how many different contexts a word appears in.',
        },
        {
          q: 'What is Continuation Probability?',
          a: 'Continuation Probability measures how many different preceding contexts can lead to a particular word, divided by the total number of distinct observed word pairs.',
        },
        {
          q: 'What is Absolute Discounting?',
          a: 'Absolute Discounting subtracts a fixed discount value from observed N-Gram counts and reserves the removed probability mass for lower-order estimates.',
        },
        {
          q: 'What is the role of the discount value D?',
          a: 'The discount value determines how much count is removed from observed N-Grams to make probability available for unseen combinations.',
        },
        {
          q: 'How is Kneser-Ney different from Laplace Smoothing?',
          a: 'Laplace adds one to every possible count. Kneser-Ney uses discounted counts and continuation probabilities based on distinct preceding contexts.',
        },
        {
          q: 'Why is Kneser-Ney considered an advanced smoothing technique?',
          a: 'It uses both frequency information and context diversity to estimate lower-order probabilities, making it more effective for sparse N-Gram data.',
        },
        {
          q: 'What is Modified Kneser-Ney?',
          a: 'Modified Kneser-Ney is an improved version that commonly uses different discount values for N-Grams with different frequency counts.',
        },
      ],

      code: `from collections import Counter, defaultdict

sentences = [
    "hot coffee tastes good",
    "cold coffee tastes good",
    "fresh coffee smells good",
    "strong coffee tastes good",
    "hot tea tastes good"
]

bigram_counts = Counter()
context_counts = Counter()

# Count distinct contexts
preceding_contexts = defaultdict(set)
following_words = defaultdict(set)

for sentence in sentences:

    words = sentence.lower().split()

    for i in range(len(words) - 1):

        first = words[i]
        second = words[i + 1]

        bigram_counts[(first, second)] += 1
        context_counts[first] += 1

        preceding_contexts[second].add(first)
        following_words[first].add(second)

# Continuation probability
total_distinct_bigrams = len(bigram_counts)

def continuation_probability(word):

    distinct_preceding = len(
        preceding_contexts[word]
    )

    if total_distinct_bigrams == 0:
        return 0

    return (
        distinct_preceding
        / total_distinct_bigrams
    )

# Basic interpolated Kneser-Ney
def kneser_ney_probability(
    first,
    second,
    discount=0.75
):

    context_count = context_counts[first]

    if context_count == 0:
        return continuation_probability(second)

    observed_count = bigram_counts[
        (first, second)
    ]

    discounted_probability = (
        max(observed_count - discount, 0)
        / context_count
    )

    distinct_following = len(
        following_words[first]
    )

    interpolation_weight = (
        discount * distinct_following
        / context_count
    )

    lower_order_probability = (
        continuation_probability(second)
    )

    return (
        discounted_probability
        +
        interpolation_weight
        * lower_order_probability
    )

print(
    "Continuation probability:",
    continuation_probability("coffee")
)

print(
    "Kneser-Ney probability:",
    kneser_ney_probability(
        "hot",
        "coffee"
    )
)`,

      pitfalls: [
        'Kneser-Ney uses distinct preceding contexts, not only raw word frequency.',
        'Continuation probability and ordinary Unigram probability are different.',
        'The discount value must be selected appropriately.',
        'Do not confuse basic absolute-discount Kneser-Ney with Modified Kneser-Ney.',
        'The interpolation weight must correctly account for the discounted probability mass.',
        'A complete implementation must handle unseen contexts and lower-order distributions.',
        'The example code demonstrates basic interpolated Bigram Kneser-Ney, not a complete production-ready recursive Trigram implementation.',
      ],
    }),

    // =====================================================
    // 9. INTERPOLATION
    // =====================================================

    lesson({
      slug: 'ngram-interpolation',
      title: 'Interpolation',

      summary:
        'Understand how language models combine Unigram, Bigram and Trigram probabilities to improve predictions when some word combinations are rare or unseen.',

      images: [
        {
          src: 'https://www.wasilzafar.com/images/series/nlp/smoothing-probability-redistribution-seen-unseen.webp',
          alt: 'N-Gram probability smoothing and distribution',
          title: 'Combining N-Gram Estimates',
          caption:
            'Interpolation combines information from different N-Gram orders to produce a more reliable probability estimate.',
          width: 1200,
          height: 675,
          fit: 'contain',
        },
      ],

      definition:
        'Interpolation is a smoothing technique in which a language model combines probability estimates from multiple N-Gram models. Instead of depending only on a Trigram or Bigram probability, it combines Unigram, Bigram and Trigram probabilities using different weights. This allows the model to use both short and longer word contexts when predicting the next word.',

      why:
        'A Trigram model provides more context than a Bigram model, but it may fail when a particular three-word combination has never appeared in the training dataset. A Bigram model may still provide a useful probability, and a Unigram model may provide an even more general estimate. Interpolation combines these different probability estimates to reduce the effect of sparse data.',

      purpose:
        'The main purpose of Interpolation is to combine multiple N-Gram probability estimates so that a language model can use information from different context sizes.',

      when: [
        'When building statistical language models with multiple N-Gram orders.',
        'When handling unseen or rare Trigram combinations.',
        'When combining Unigram, Bigram and Trigram probabilities.',
        'When improving word prediction using different context lengths.',
        'When developing traditional speech recognition systems.',
        'When studying smoothing and probability redistribution.',
      ],

      simpleExample:
        'Imagine a language model wants to predict the next word after the context:\n\n"I love"\n\nIt calculates three probabilities:\n\nUnigram probability:\n\nP(Python) = 0.20\n\nBigram probability:\n\nP(Python | love) = 0.50\n\nTrigram probability:\n\nP(Python | I, love) = 0.80\n\nInstead of using only the Trigram probability, the model combines all three.\n\nAssume the weights are:\n\n- Unigram weight = 0.2\n- Bigram weight = 0.3\n- Trigram weight = 0.5\n\nFormula:\n\nP = (0.2 × 0.20) + (0.3 × 0.50) + (0.5 × 0.80)\n\nP = 0.04 + 0.15 + 0.40\n\nP = 0.59\n\nThe final interpolated probability is 0.59.\n\nThis combines general word frequency with information from one-word and two-word contexts.',

      detail:
        'Interpolation combines multiple N-Gram probabilities using weighted addition.\n\nLinear Interpolation Formula:\n\nP(w3 | w1, w2) = λ1 × P(w3) + λ2 × P(w3 | w2) + λ3 × P(w3 | w1, w2)\n\nWhere:\n\n- λ1 = Unigram weight.\n- λ2 = Bigram weight.\n- λ3 = Trigram weight.\n- P(w3) = Unigram probability.\n- P(w3 | w2) = Bigram probability.\n- P(w3 | w1, w2) = Trigram probability.\n\nImportant Rule:\n\nλ1 + λ2 + λ3 = 1\n\nThe weights must be non-negative and add up to 1 to form a valid weighted probability distribution.\n\nNumerical Example:\n\nUnigram probability = 0.20\n\nBigram probability = 0.50\n\nTrigram probability = 0.80\n\nWeights:\n\nλ1 = 0.20\nλ2 = 0.30\nλ3 = 0.50\n\nCalculation:\n\nP = (0.20 × 0.20) + (0.30 × 0.50) + (0.50 × 0.80)\n\nP = 0.59\n\nHow to choose weights:\n\n1. Prepare a training dataset.\n2. Train the different N-Gram models.\n3. Prepare a separate validation dataset.\n4. Try different combinations of interpolation weights.\n5. Calculate the prediction performance for each combination.\n6. Select weights that perform well on the validation data.\n\nWhy Interpolation is useful:\n\n- Unigram provides general word frequency information.\n- Bigram provides information from one previous word.\n- Trigram provides information from two previous words.\n- Combining them reduces dependence on any single N-Gram order.\n\nImportant Difference:\n\nBackoff and Interpolation are related but different techniques.\n\nBackoff uses a lower-order model when a higher-order N-Gram is unavailable or unreliable.\n\nInterpolation combines the different N-Gram probability estimates instead of relying only on the highest-order model.',

      realLife: {
        problem:
          'A mobile keyboard application uses a Trigram model to predict the next word. However, many word combinations are missing from its training dataset, causing unreliable predictions.',

        approach: [
          'Collect a large text dataset from different types of messages.',
          'Build Unigram, Bigram and Trigram language models.',
          'Calculate probability estimates for each model.',
          'Assign a weight to each N-Gram model.',
          'Combine their probabilities using linear interpolation.',
          'Tune the weights using a separate validation dataset.',
          'Use the combined probability to rank possible next-word suggestions.',
        ],

        outcome:
          'The keyboard can use general word frequency and multiple levels of context to make more reliable next-word predictions, including when some longer N-Grams are missing.',
      },

      tasks: [
        'Explain Interpolation using Unigram, Bigram and Trigram models. Why is combining different context sizes useful?',
        'Calculate the interpolated probability when Unigram = 0.20, Bigram = 0.50 and Trigram = 0.80, using weights 0.2, 0.3 and 0.5.',
        'Build a Python language model that combines Unigram, Bigram and Trigram probabilities using linear interpolation. Experiment with different weights and compare the prediction results.',
      ],

      questions: [
        {
          q: 'What is Interpolation in NLP?',
          a: 'Interpolation is a smoothing technique that combines probabilities from multiple N-Gram models using weighted addition.',
        },
        {
          q: 'Why is Interpolation used?',
          a: 'It combines information from different context sizes and reduces dependence on a single N-Gram model, helping with sparse data.',
        },
        {
          q: 'What is Linear Interpolation?',
          a: 'Linear Interpolation combines multiple probability estimates by multiplying each probability by a weight and adding the results.',
        },
        {
          q: 'What is the Interpolation formula for a Trigram model?',
          a: 'P = λ1 × P(w) + λ2 × P(w | previous word) + λ3 × P(w | previous two words).',
        },
        {
          q: 'What is the role of Lambda in Interpolation?',
          a: 'Lambda represents the weight assigned to an individual N-Gram model. It controls how much importance that model receives in the final probability.',
        },
        {
          q: 'What should be the sum of interpolation weights?',
          a: 'The weights should be non-negative and their sum should equal 1.',
        },
        {
          q: 'How are interpolation weights selected?',
          a: 'Weights can be tuned using a separate validation dataset to find a combination that provides better prediction performance.',
        },
        {
          q: 'What is the difference between Backoff and Interpolation?',
          a: 'Backoff uses lower-order probabilities when a higher-order estimate is unavailable or unreliable. Interpolation combines different N-Gram probability estimates at the same time.',
        },
        {
          q: 'How does Interpolation help with Data Sparsity?',
          a: 'When a higher-order N-Gram has little or no observed data, lower-order models can still contribute useful probability estimates.',
        },
      ],

      code: `from collections import Counter
import re

sentences = [
    "I love Python",
    "I love Java",
    "I love Python",
    "I enjoy Python",
    "I enjoy machine learning"
]

unigram_counts = Counter()
bigram_counts = Counter()
trigram_counts = Counter()

bigram_contexts = Counter()
trigram_contexts = Counter()

for sentence in sentences:

    words = re.findall(
        r"\\b\\w+\\b",
        sentence.lower()
    )

    unigram_counts.update(words)

    for i in range(len(words) - 1):

        bigram = tuple(words[i:i + 2])

        bigram_counts[bigram] += 1
        bigram_contexts[words[i]] += 1

    for i in range(len(words) - 2):

        trigram = tuple(words[i:i + 3])

        trigram_counts[trigram] += 1
        trigram_contexts[
            tuple(words[i:i + 2])
        ] += 1

total_words = sum(unigram_counts.values())

# Unigram probability
def unigram_probability(word):

    return (
        unigram_counts[word]
        / total_words
    )

# Bigram probability
def bigram_probability(first, second):

    context_count = bigram_contexts[first]

    if context_count == 0:
        return 0

    return (
        bigram_counts[(first, second)]
        / context_count
    )

# Trigram probability
def trigram_probability(first, second, third):

    context = (first, second)

    context_count = trigram_contexts[context]

    if context_count == 0:
        return 0

    return (
        trigram_counts[(first, second, third)]
        / context_count
    )

# Linear interpolation
def interpolated_probability(
    first,
    second,
    third,
    lambda1=0.2,
    lambda2=0.3,
    lambda3=0.5
):

    if any(
        weight < 0
        for weight in [
            lambda1,
            lambda2,
            lambda3
        ]
    ):
        raise ValueError("Weights cannot be negative")

    if abs(
        lambda1 + lambda2 + lambda3 - 1
    ) > 1e-9:
        raise ValueError(
            "Interpolation weights must sum to 1"
        )

    p1 = unigram_probability(third)

    p2 = bigram_probability(
        second,
        third
    )

    p3 = trigram_probability(
        first,
        second,
        third
    )

    return (
        lambda1 * p1
        +
        lambda2 * p2
        +
        lambda3 * p3
    )

result = interpolated_probability(
    "i",
    "love",
    "python"
)

print(
    "Interpolated probability:",
    round(result, 4)
)`,

      pitfalls: [
        'Interpolation combines multiple N-Gram probabilities using weighted addition.',
        'Weights should be non-negative and sum to 1.',
        'A higher-order N-Gram should not automatically receive all the weight.',
        'Weights should be tuned using validation data rather than the test dataset.',
        'All N-Gram models must use consistent tokenization and vocabulary.',
        'Interpolation and Backoff are not the same technique.',
        'A lower-order model can still provide useful information when a higher-order N-Gram is unseen.',
      ],
    }),
  ],
}

export default ch
