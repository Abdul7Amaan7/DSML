
import { topic, type Chapter, type InterviewQA } from '../types'

type Lesson = {
  slug: string
  title: string
  summary: string
  definition: string
  why: string
  purpose: string
  when: string[]
  simpleExample: string
  realLife: { problem: string; approach: string[]; outcome: string }
  tasks: [string, string, string]
  questions: InterviewQA[]
  detail?: string
  code?: string
  pitfalls?: string[]
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
        ? [{ heading: 'How to interpret it', body: data.detail }]
        : []),
    ],
    {
      title: `Real-life example: ${data.title}`,
      domain: 'data-science',
      problem: data.realLife.problem,
      approach: data.realLife.approach,
      outcome: data.realLife.outcome,
    },
    [
      {
        id: `${data.slug}-task-1`,
        title: 'Try it',
        difficulty: 'easy',
        task: data.tasks[0],
        expectedOutcome:
          'Calculate the probability and explain it in one simple sentence.',
      },
      {
        id: `${data.slug}-task-2`,
        title: 'Compare',
        difficulty: 'medium',
        task: data.tasks[1],
        expectedOutcome:
          'Choose the correct probability rule and explain your reasoning.',
      },
      {
        id: `${data.slug}-task-3`,
        title: 'Apply it',
        difficulty: 'hard',
        task: data.tasks[2],
        expectedOutcome:
          'Solve a real-world probability problem and explain your conclusion.',
      },
    ],
    data.questions,
    {
      code: data.code
        ? [{ title: 'Python example', lang: 'python', source: data.code }]
        : undefined,
      pitfalls: data.pitfalls,
    },
  )
}

const ch: Chapter = {
  id: 'probability',
  number: 2,
  title: 'Probability',
  tagline:
    'Understand how to measure chances, calculate possibilities, and make better decisions using data.',
  priority: 'extreme',

  topics: [
    lesson({
      slug: 'basic-probability-rules',
      title: 'Basic Probability Rules',
      summary:
        'Learn how to calculate the chance of something happening using simple numbers.',
      definition:
        'Probability tells us how likely something is to happen. Its value is always between 0 and 1, or between 0% and 100%.',
      why:
        'We cannot always know what will happen. Probability helps us measure how likely different outcomes are instead of simply guessing.',
      purpose:
        'Calculate the chance of an event happening and understand how likely or unlikely it is.',
      when: [
        'You want to calculate the chance of an event.',
        'You want to understand possible outcomes.',
        'You need a starting point for more advanced probability concepts.',
      ],
      simpleExample:
        'A coin has 2 possible outcomes: Head and Tail. The chance of getting Head is 1 out of 2 = 1/2 = 0.5 = 50%.',
      realLife: {
        problem:
          'An online store wants to understand the chance that a randomly selected visitor will purchase a product.',
        approach: [
          'Check how many visitors came to the website.',
          'Count how many visitors purchased something.',
          'Divide purchases by total visitors.',
        ],
        outcome:
          'If 20 out of 100 visitors purchase, the estimated probability of a visitor purchasing is 20%.',
      },
      tasks: [
        'A dice has 6 faces. What is the probability of getting a 4?',
        'A bag contains 3 red and 7 blue balls. Compare the probability of picking red and blue.',
        'A website has 500 visitors and 75 purchases. Calculate the purchase probability and explain what it means.',
      ],
      questions: [
        {
          q: 'What is probability?',
          a: 'Probability is a number that tells us how likely an event is to happen.',
        },
        {
          q: 'What is the range of probability?',
          a: 'Probability ranges from 0 to 1, or 0% to 100%.',
        },
        {
          q: 'What does a probability of 0 mean?',
          a: 'It means the event is impossible.',
        },
        {
          q: 'What does a probability of 1 mean?',
          a: 'It means the event is certain to happen.',
        },
      ],
      code: `# Basic probability

total_visitors = 500
purchases = 75

probability = purchases / total_visitors

print("Purchase probability:", probability)
print("Purchase percentage:", probability * 100, "%")`,
      pitfalls: [
        'Probability 0.5 means a 50% chance, not a guarantee.',
        'Probability cannot be less than 0 or greater than 1.',
        'A high probability does not guarantee that an event will happen.',
      ],
    }),

    lesson({
      slug: 'conditional-probability',
      title: 'Conditional Probability',
      summary:
        'Understand how the chance of something changes when we already know another thing has happened.',
      definition:
        'Conditional probability is the chance of an event happening when we already know that another event has happened.',
      why:
        'Sometimes we have additional information. That information can increase or decrease the probability of an event.',
      purpose:
        'Calculate probability using information that is already available.',
      when: [
        'You want to calculate the probability for a specific group of people.',
        'You have information about an earlier event.',
        'You want to analyze customer behavior based on another condition.',
      ],
      simpleExample:
        'In a class of 30 students, 10 play cricket. Out of those 10, 4 also play football. If we know a student plays cricket, the probability that they also play football is 4/10 = 40%.',
      realLife: {
        problem:
          'A marketing analyst wants to know how likely a customer is to purchase after clicking an advertisement.',
        approach: [
          'Find the number of customers who clicked the advertisement.',
          'Count how many of those customers purchased.',
          'Divide purchasers by customers who clicked.',
        ],
        outcome:
          'The analyst finds the purchase probability among ad-clicking customers, rather than among all website visitors.',
      },
      tasks: [
        'Out of 20 students who play cricket, 8 also play football. Find the probability of playing football given that the student plays cricket.',
        'Out of 100 customers who opened an email, 25 purchased. Compare this probability with the purchase rate of all customers.',
        'A company has 200 customers. Of 80 customers who used a discount, 30 purchased. Calculate the conditional probability of purchase given discount usage and explain its business meaning.',
      ],
      questions: [
        {
          q: 'What is conditional probability?',
          a: 'It is the probability of an event happening when another event is already known to have happened.',
        },
        {
          q: 'What does P(A | B) mean?',
          a: 'It means the probability of event A happening given that event B has happened.',
        },
        {
          q: 'Why is conditional probability useful in data science?',
          a: 'It helps analyze specific groups and understand how additional information changes the chance of an event.',
        },
      ],
      detail:
        'Simple formula: Probability of A given B = (Number of outcomes where both A and B happen) / (Number of outcomes where B happens). We focus only on the outcomes where B has happened.',
      pitfalls: [
        'Do not divide by the total population when the condition gives you a smaller group.',
        'P(A given B) and P(B given A) are usually different.',
      ],
    }),

    lesson({
      slug: 'independent-dependent-events',
      title: 'Independent and Dependent Events',
      summary:
        'Learn whether one event changes the probability of another event.',
      definition:
        'Independent events do not change each other’s probability. Dependent events do change each other’s probability.',
      why:
        'Knowing whether events are related helps us calculate the correct probability of multiple events happening.',
      purpose:
        'Identify whether events affect each other and choose the correct probability calculation.',
      when: [
        'You are calculating the chance of two or more events happening.',
        'You are selecting items with or without replacement.',
        'You want to understand whether previous information changes a probability.',
      ],
      simpleExample:
        'Independent: Toss a coin twice. The first toss does not change the second toss. Dependent: Pick a ball from a bag and do not return it. The number of balls left changes the next probability.',
      realLife: {
        problem:
          'An analyst wants to understand whether two customer purchases can be treated as independent events.',
        approach: [
          'Check whether the first purchase changes the chance of the second.',
          'Consider customer preferences, product relationships, and purchase history.',
          'Determine whether an independence assumption is reasonable.',
        ],
        outcome:
          'The analyst can choose an appropriate probability calculation and avoid making an incorrect independence assumption.',
      },
      tasks: [
        'Are two coin tosses independent or dependent? Explain in one sentence.',
        'A bag has 5 red and 5 blue balls. You pick a red ball and do not return it. Is the next pick independent or dependent?',
        'A customer purchases a mobile phone and then a phone case. Explain why these purchases may not be independent and how this matters for product recommendations.',
      ],
      questions: [
        {
          q: 'What are independent events?',
          a: 'Events where one event happening does not change the probability of the other.',
        },
        {
          q: 'What are dependent events?',
          a: 'Events where one event happening changes the probability of the other.',
        },
        {
          q: 'What is sampling without replacement?',
          a: 'Selecting an item and not putting it back before the next selection. This often makes events dependent.',
        },
        {
          q: 'Can two events be independent and still both happen?',
          a: 'Yes. Independence means they do not change each other’s probabilities, not that they cannot happen together.',
        },
      ],
      detail:
        'For independent events, multiply their probabilities to find the probability that both happen. For dependent events, multiply the first probability by the updated conditional probability of the second.',
      pitfalls: [
        'Do not assume events are independent just because they look unrelated.',
        'Without replacement usually changes the probabilities.',
        'Independent does not mean mutually exclusive.',
      ],
    }),

    lesson({
      slug: 'bayes-theorem',
      title: "Bayes' Theorem",
      summary:
        'Learn how to update a probability when new information becomes available.',
      definition:
        "Bayes' Theorem helps us calculate the chance of something being true after we receive new information.",
      why:
        'Our first guess may not be accurate. New evidence can help us update that guess and make a better decision.',
      purpose:
        'Combine what we knew before with new evidence to calculate an updated probability.',
      when: [
        'You receive new information about an event.',
        'You want to estimate the chance of a customer leaving.',
        'You are interpreting medical tests or spam detection results.',
        'You are building classification models.',
      ],
      simpleExample:
        'Suppose it usually rains on 20% of days. A weather forecast predicts rain. Bayes’ Theorem helps us estimate the actual chance of rain given that forecast, using how reliable the forecast is on rainy and non-rainy days.',
      realLife: {
        problem:
          'An email service wants to estimate whether an email is spam after seeing certain words in its content.',
        approach: [
          'Start with how common spam emails are.',
          'Check how often the selected words appear in spam emails.',
          'Check how often those words appear in normal emails.',
          'Combine these probabilities using Bayes’ Theorem.',
        ],
        outcome:
          'The service updates its estimate that an email is spam based on the words it contains.',
      },
      tasks: [
        'Spam makes up 30% of emails. In simple terms, what does this 30% represent before checking any words?',
        'Explain why seeing the word "prize" might change the probability that an email is spam.',
        'A disease affects 1% of people. A test is positive for 90% of affected people and 5% of unaffected people. Calculate the probability that someone actually has the disease after testing positive.',
      ],
      questions: [
        {
          q: "What is Bayes' Theorem?",
          a: 'It is a formula for updating the probability of an event using new evidence.',
        },
        {
          q: 'What is prior probability?',
          a: 'The probability we start with before considering the new evidence.',
        },
        {
          q: 'What is posterior probability?',
          a: 'The updated probability after considering the evidence.',
        },
        {
          q: 'Where is Bayes’ Theorem used?',
          a: 'Spam detection, medical testing, risk analysis, recommendation systems, and machine learning.',
        },
      ],
      detail:
        'In simple words: Updated chance = (Evidence given the event × Original chance) / Overall chance of the evidence.',
      code: `# Bayes' Theorem

p_disease = 0.01
p_positive_given_disease = 0.90
p_positive_given_no_disease = 0.05

p_no_disease = 1 - p_disease

p_positive = (
    p_positive_given_disease * p_disease
    + p_positive_given_no_disease * p_no_disease
)

p_disease_given_positive = (
    p_positive_given_disease * p_disease
    / p_positive
)

print("Probability of disease after positive test:",
      round(p_disease_given_positive * 100, 2), "%")`,
      pitfalls: [
        'Do not confuse P(A given B) with P(B given A).',
        'Do not ignore how common or rare the event was before the evidence.',
        'A positive test does not always mean the condition is present.',
      ],
    }),

    lesson({
      slug: 'total-probability-theorem',
      title: 'Total Probability Theorem',
      summary:
        'Calculate an overall probability by combining different groups or situations.',
      definition:
        'The Total Probability Theorem helps us find the overall chance of an event by considering all the different ways it can happen.',
      why:
        'Real-world data often comes from different groups. Each group may have a different probability, so we combine them to find the overall result.',
      purpose:
        'Calculate an overall probability when an event can happen through multiple separate groups or cases.',
      when: [
        'You have customers from different sources.',
        'Different groups have different success rates.',
        'You need to calculate an overall probability from group-level probabilities.',
      ],
      simpleExample:
        'A company receives 60% of orders from Website A and 40% from Website B. Website A has a 10% cancellation rate and Website B has a 20% cancellation rate. Overall cancellation probability = (0.60 × 0.10) + (0.40 × 0.20) = 0.14 = 14%.',
      realLife: {
        problem:
          'A business wants to calculate the overall chance of a customer converting when customers arrive from multiple marketing channels.',
        approach: [
          'Find the percentage of visitors from each channel.',
          'Calculate the conversion rate for each channel.',
          'Multiply each channel share by its conversion rate.',
          'Add the results together.',
        ],
        outcome:
          'The business calculates its overall conversion probability across all marketing channels.',
      },
      tasks: [
        '60% of customers use App A and 40% use App B. Their success rates are 80% and 50%. Find the overall success probability.',
        'Two marketing channels contribute 30% and 70% of visitors, with conversion rates of 5% and 10%. Which channel contributes more to total conversions?',
        'A factory has 3 machines producing 20%, 30%, and 50% of items. Their defect rates are 1%, 2%, and 4%. Calculate the overall defect probability and explain which machine contributes most to defects.',
      ],
      questions: [
        {
          q: 'What is the Total Probability Theorem?',
          a: 'It calculates an overall probability by adding the probabilities from different possible cases or groups.',
        },
        {
          q: 'Why do we multiply group probability by event probability within the group?',
          a: 'Because we want to account for both reaching that group and the event happening inside it.',
        },
        {
          q: 'Where is the theorem useful?',
          a: 'Business conversion analysis, quality control, risk calculations, and customer segmentation.',
        },
      ],
      detail:
        'Simple steps: (1) Find each group’s share. (2) Multiply it by that group’s event probability. (3) Add all the results. Make sure the groups cover all possible cases without overlap.',
      pitfalls: [
        'Group percentages should add up to 100% when the groups cover the whole population.',
        'Do not simply average group probabilities when group sizes differ.',
        'Keep probabilities in decimal form while multiplying.',
      ],
    }),

    lesson({
      slug: 'permutations-combinations',
      title: 'Permutations and Combinations',
      summary:
        'Learn to count possible arrangements and selections without listing every possibility.',
      definition:
        'Permutation means arranging items where order matters. Combination means selecting items where order does not matter.',
      why:
        'When there are many items, counting every possible arrangement manually takes too much time. These formulas make counting faster.',
      purpose:
        'Calculate how many possible arrangements or selections exist in a situation.',
      when: [
        'You are selecting people for a team.',
        'You are arranging items in a particular order.',
        'You want to count possible passwords, rankings, or groups.',
      ],
      simpleExample:
        'Choose 2 students from A, B, and C. Combinations: AB, AC, BC = 3. Permutations: AB, BA, AC, CA, BC, CB = 6. In permutations, order matters.',
      realLife: {
        problem:
          'A company wants to select employees for a project team or assign employees to different roles.',
        approach: [
          'Decide whether the task is selection or arrangement.',
          'Check whether changing the order creates a different result.',
          'Use combinations if order does not matter.',
          'Use permutations if order or roles matter.',
        ],
        outcome:
          'The company can calculate the number of possible teams or role assignments without listing them individually.',
      },
      tasks: [
        'How many ways can you select 2 students from a group of 5 if order does not matter?',
        'How many different ways can 3 people stand in a line? Explain why this is a permutation.',
        'A company selects 4 people from 10 employees for a team. Then it chooses a leader and deputy from that team. Calculate the number of possible teams and leadership arrangements.',
      ],
      questions: [
        {
          q: 'What is a permutation?',
          a: 'A way of arranging items where order matters.',
        },
        {
          q: 'What is a combination?',
          a: 'A way of selecting items where order does not matter.',
        },
        {
          q: 'How can you remember the difference?',
          a: 'Permutation = position or order matters. Combination = choose a group; order does not matter.',
        },
        {
          q: 'Where are permutations and combinations used?',
          a: 'Scheduling, team selection, passwords, rankings, probability calculations, and experiment design.',
        },
      ],
      detail:
        'Permutation formula: nPr = n! / (n − r)! . Combination formula: nCr = n! / (r! × (n − r)!). Here n is the total number of items and r is how many we select.',
      code: `# Permutations and Combinations
import math

n = 5
r = 2

permutations = math.perm(n, r)
combinations = math.comb(n, r)

print("Permutations:", permutations)
print("Combinations:", combinations)`,
      pitfalls: [
        'Always ask: Does order matter?',
        'AB and BA are different in permutations but the same in combinations.',
        'Factorial grows quickly; use Python math functions for larger values.',
      ],
    }),
  ],
}

export default ch
