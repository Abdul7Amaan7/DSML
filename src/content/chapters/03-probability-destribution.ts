
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
          'Identify the distribution and explain its basic meaning.',
      },
      {
        id: `${data.slug}-task-2`,
        title: 'Compare',
        difficulty: 'medium',
        task: data.tasks[1],
        expectedOutcome:
          'Choose the correct distribution and explain why it fits.',
      },
      {
        id: `${data.slug}-task-3`,
        title: 'Apply it',
        difficulty: 'hard',
        task: data.tasks[2],
        expectedOutcome:
          'Solve a practical probability problem and interpret the result.',
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
  id: 'probabilitydistributions',
  number: 3,
  title: 'Probability Distributions',
  tagline:
    'Understand how probabilities are spread across possible outcomes and learn to choose the right distribution for real-world data.',
  priority: 'extreme',

  topics: [
    lesson({
      slug: 'what-is-probability-distribution',
      title: 'Introduction to Probability Distributions',
      summary:
        'Understand what a probability distribution is before learning its different types.',
      definition:
        'A probability distribution is a way of showing all possible outcomes of something and how likely each outcome is.',
      why:
        'Instead of looking at one outcome at a time, a distribution gives us the complete picture of what can happen and what is more or less likely.',
      purpose:
        'Understand possible outcomes, their chances, and the patterns they create.',
      when: [
        'You want to understand how data values are spread.',
        'You want to calculate the chances of different outcomes.',
        'You need to choose a suitable statistical or machine learning method.',
      ],
      simpleExample:
        'When rolling a dice, the possible outcomes are 1, 2, 3, 4, 5, and 6. Each outcome has a probability of 1/6. These outcomes and probabilities together form a probability distribution.',
      realLife: {
        problem:
          'A business wants to understand how many products it might sell in a day.',
        approach: [
          'Collect daily sales data.',
          'Find the different possible sales values.',
          'Calculate how frequently each value occurs.',
          'Use the pattern to understand likely sales outcomes.',
        ],
        outcome:
          'The business gets a picture of its sales pattern and can plan inventory more effectively.',
      },
      tasks: [
        'A fair dice has 6 possible outcomes. Write the probability of each outcome.',
        'A shop sells 0, 1, 2, or 3 products per hour. Explain how you could build a probability distribution from its historical data.',
        'Create a probability distribution for the number of customers arriving in an hour using sample data. Check whether all probabilities add up to 1.',
      ],
      questions: [
        {
          q: 'What is a probability distribution?',
          a: 'It describes the possible outcomes of an event and the probability of each outcome.',
        },
        {
          q: 'What is the sum of all probabilities in a valid distribution?',
          a: 'The sum must be 1, or 100%.',
        },
        {
          q: 'Why are probability distributions useful in Data Science?',
          a: 'They help us understand uncertainty, patterns, and the likelihood of different outcomes.',
        },
      ],
      pitfalls: [
        'All probabilities must be between 0 and 1.',
        'The total probability of all possible outcomes must equal 1.',
        'A distribution describes uncertainty; it does not guarantee an exact result.',
      ],
    }),

    lesson({
      slug: 'normal-distribution',
      title: 'Normal Distribution (Gaussian)',
      summary:
        'Understand the famous bell-shaped curve and why many real-world measurements follow it approximately.',
      definition:
        'A Normal Distribution is a bell-shaped curve where most values are near the average and fewer values are far away from it.',
      why:
        'Many measurements naturally cluster around an average. The Normal Distribution gives us a simple way to understand this pattern.',
      purpose:
        'Understand the center and spread of data and estimate how common or unusual a value is.',
      when: [
        'You are analyzing heights, measurement errors, or exam scores.',
        'Your data looks roughly bell-shaped.',
        'You want to apply statistical methods that assume normally distributed data.',
      ],
      simpleExample:
        'Imagine students scoring around 70 marks. Most students score near 70, fewer score 40 or 100, and very few score extremely low or high marks. This can create a bell-shaped curve.',
      realLife: {
        problem:
          'A teacher wants to understand how students performed in an examination.',
        approach: [
          'Collect the students’ marks.',
          'Calculate the mean and standard deviation.',
          'Plot a histogram to check whether the marks look bell-shaped.',
          'Use the distribution to understand common and unusual scores.',
        ],
        outcome:
          'The teacher can understand the typical performance and how far students vary from the average.',
      },
      tasks: [
        'The average mark is 70. Explain where most students might score if marks follow a Normal Distribution.',
        'Two datasets have the same mean but different standard deviations. Explain how their bell-shaped curves would differ.',
        'Generate 1,000 normally distributed values in Python. Plot a histogram and explain the shape.',
      ],
      questions: [
        {
          q: 'What is a Normal Distribution?',
          a: 'A symmetric, bell-shaped distribution in which values cluster around the mean.',
        },
        {
          q: 'What are the mean, median, and mode in a perfect Normal Distribution?',
          a: 'They are all equal and located at the center.',
        },
        {
          q: 'What is the 68–95–99.7 rule?',
          a: 'About 68% of values lie within 1 standard deviation, 95% within 2, and 99.7% within 3 standard deviations of the mean.',
        },
        {
          q: 'Why is the Normal Distribution important in ML?',
          a: 'It is used in statistical modeling, assumptions about errors, and many data analysis techniques.',
        },
      ],
      detail:
        'The mean controls the center of the curve. The standard deviation controls its width. A small standard deviation creates a narrow curve; a large one creates a wider curve.',
      code: `import numpy as np
import matplotlib.pyplot as plt

data = np.random.normal(
    loc=70,       # Mean
    scale=10,      # Standard deviation
    size=1000      # Number of values
)

plt.hist(data, bins=30, edgecolor="black")
plt.title("Normal Distribution")
plt.xlabel("Values")
plt.ylabel("Frequency")
plt.show()`,
      pitfalls: [
        'Not every dataset follows a Normal Distribution.',
        'A bell-shaped histogram does not prove perfect normality.',
        'Always check the data before assuming it is normally distributed.',
      ],
    }),

    lesson({
      slug: 'standard-normal-z-score',
      title: 'Standard Normal Distribution (Z-score)',
      summary:
        'Learn how to convert a value into a common scale to understand how far it is from the average.',
      definition:
        'A Z-score tells us how many standard deviations a value is above or below the mean.',
      why:
        'Marks, salaries, and other measurements may use different scales. Z-scores help us compare how unusual values are relative to their own groups.',
      purpose:
        'Compare values from different distributions and identify values that are unusually high or low.',
      when: [
        'You want to compare scores from different exams.',
        'You want to understand how far a value is from its average.',
        'You want to identify unusually high or low observations.',
      ],
      simpleExample:
        'A student scores 80. The class average is 70 and the standard deviation is 5. The Z-score is (80 − 70) / 5 = 2. The student scored 2 standard deviations above the average.',
      realLife: {
        problem:
          'An HR analyst wants to compare employees’ performance scores across two departments with different averages and spreads.',
        approach: [
          'Find the average score in each department.',
          'Calculate each department’s standard deviation.',
          'Convert individual scores into Z-scores.',
          'Compare the standardized scores.',
        ],
        outcome:
          'The analyst can compare relative performance rather than comparing raw scores directly.',
      },
      tasks: [
        'A value is 90, the mean is 80, and the standard deviation is 5. Calculate its Z-score.',
        'Student A scores 80 in a test with mean 70 and standard deviation 5. Student B scores 90 in a test with mean 80 and standard deviation 10. Compare their Z-scores.',
        'Calculate Z-scores for a column of employee salaries using Pandas. Identify values above 2 and below −2 and explain what those values mean.',
      ],
      questions: [
        {
          q: 'What is a Z-score?',
          a: 'It tells us how many standard deviations a value is away from the mean.',
        },
        {
          q: 'What does a Z-score of 0 mean?',
          a: 'The value is exactly equal to the mean.',
        },
        {
          q: 'What does a negative Z-score mean?',
          a: 'The value is below the mean.',
        },
        {
          q: 'Why do we use Z-scores?',
          a: 'To compare values on a common scale and understand how unusual they are relative to their distribution.',
        },
      ],
      detail:
        'Simple formula: Z-score = (Value − Mean) / Standard Deviation. Z = 0 means average; Z = +2 means two standard deviations above average; Z = −2 means two below average.',
      code: `import numpy as np

data = np.array([50, 60, 70, 80, 90])

mean = np.mean(data)
std = np.std(data)

z_scores = (data - mean) / std

print("Mean:", mean)
print("Standard Deviation:", std)
print("Z-scores:", z_scores)`,
      pitfalls: [
        'A Z-score is not a probability by itself.',
        'A Z-score does not automatically mean a value is an error.',
        'Standardization can be misleading if the data is highly skewed.',
      ],
    }),

    lesson({
      slug: 'bernoulli-distribution',
      title: 'Bernoulli Distribution',
      summary:
        'Understand situations where there are only two possible outcomes: success or failure.',
      definition:
        'A Bernoulli Distribution describes one experiment that has only two possible outcomes: success (1) or failure (0).',
      why:
        'Many real-world questions have only two answers. Bernoulli helps us represent and analyze these yes-or-no outcomes.',
      purpose:
        'Model a single yes-or-no event using its probability of success.',
      when: [
        'A customer either purchases or does not purchase.',
        'A student either passes or fails.',
        'An email either is spam or is not spam.',
        'A machine either produces a defective item or a non-defective item.',
      ],
      simpleExample:
        'A customer either buys a product (1) or does not buy it (0). If the purchase probability is 0.3, then P(1) = 0.3 and P(0) = 0.7.',
      realLife: {
        problem:
          'A marketing team wants to represent whether one visitor converts into a customer.',
        approach: [
          'Define conversion as success (1).',
          'Define no conversion as failure (0).',
          'Estimate the conversion probability from historical data.',
        ],
        outcome:
          'Each visitor’s conversion outcome can be modeled as a Bernoulli random variable.',
      },
      tasks: [
        'A coin has a 50% chance of Heads. Write the two possible outcomes and their probabilities.',
        'A website conversion rate is 8%. Explain how one visitor’s conversion can be modeled using a Bernoulli Distribution.',
        'Create a Python simulation of 100 customer visits where each customer has a 20% probability of purchasing. Count the number of conversions.',
      ],
      questions: [
        {
          q: 'What is a Bernoulli Distribution?',
          a: 'A distribution for one experiment with two possible outcomes, usually coded as 1 and 0.',
        },
        {
          q: 'What are the possible outcomes?',
          a: 'Success (1) and failure (0).',
        },
        {
          q: 'What is the difference between Bernoulli and Binomial?',
          a: 'Bernoulli describes one trial. Binomial describes the total number of successes across multiple independent Bernoulli trials.',
        },
      ],
      code: `import numpy as np

# 1 = purchase, 0 = no purchase
result = np.random.binomial(
    n=1,
    p=0.20
)

print("Customer result:", result)`,
      pitfalls: [
        'There must be only two possible outcomes.',
        'Success does not have to mean something positive; it is simply the outcome being studied.',
        'Do not confuse one Bernoulli trial with many Binomial trials.',
      ],
    }),

    lesson({
      slug: 'binomial-distribution',
      title: 'Binomial Distribution',
      summary:
        'Calculate the probability of getting a certain number of successes in repeated yes-or-no experiments.',
      definition:
        'A Binomial Distribution tells us the probability of getting a specific number of successes in a fixed number of independent trials.',
      why:
        'Instead of studying one customer at a time, we may want to know how many customers out of 100 will purchase a product.',
      purpose:
        'Estimate the number of successes in a fixed number of similar experiments.',
      when: [
        'The number of trials is fixed.',
        'Each trial has two possible outcomes.',
        'The probability of success stays the same.',
        'The trials are independent.',
      ],
      simpleExample:
        'If 5 customers each have a 20% chance of purchasing, the Binomial Distribution helps calculate the chance that exactly 2 customers will purchase.',
      realLife: {
        problem:
          'A company wants to estimate how many customers will purchase from a group of 50 visitors.',
        approach: [
          'Set the number of visitors to 50.',
          'Estimate the purchase probability for one visitor.',
          'Assume visitors’ outcomes are independent and have the same probability.',
          'Calculate the probability of different purchase counts.',
        ],
        outcome:
          'The company can estimate the likely number of purchases and use it for planning.',
      },
      tasks: [
        'A coin is tossed 5 times. What are the number of trials and probability of Heads?',
        'A customer has a 10% probability of purchasing. For 20 independent customers, explain what X represents in a Binomial Distribution.',
        'A website has 100 visitors and a 5% conversion probability. Calculate the expected number of conversions and simulate the results using Python.',
      ],
      questions: [
        {
          q: 'What is a Binomial Distribution?',
          a: 'It gives the probability of a specific number of successes in a fixed number of independent trials.',
        },
        {
          q: 'What are the conditions for a Binomial Distribution?',
          a: 'Fixed number of trials, two outcomes per trial, independent trials, and constant probability of success.',
        },
        {
          q: 'What is the expected value of a Binomial Distribution?',
          a: 'Expected value = n × p.',
        },
        {
          q: 'What is the difference between Bernoulli and Binomial?',
          a: 'Bernoulli has one trial. Binomial has multiple trials and counts the number of successes.',
        },
      ],
      detail:
        'Simple idea: Expected successes = Number of trials × Probability of success. For 100 visitors with a 5% purchase probability, expected purchases = 100 × 0.05 = 5.',
      code: `import numpy as np

# 100 visitors, 5% conversion probability
results = np.random.binomial(
    n=1,
    p=0.05,
    size=100
)

conversions = results.sum()

print("Total visitors:", len(results))
print("Total conversions:", conversions)`,
      pitfalls: [
        'The number of trials must be fixed.',
        'The probability of success should remain constant.',
        'If trials are dependent, the Binomial model may not fit.',
      ],
    }),

    lesson({
      slug: 'poisson-distribution',
      title: 'Poisson Distribution',
      summary:
        'Understand how to estimate the number of times something happens in a fixed period or space.',
      definition:
        'A Poisson Distribution estimates the probability of a certain number of events occurring in a fixed interval, when events happen at a roughly constant average rate.',
      why:
        'Businesses often need to estimate how many calls, orders, errors, or visitors may arrive within a particular time period.',
      purpose:
        'Model the number of events that happen during a fixed interval using an average event rate.',
      when: [
        'You are counting customer arrivals per hour.',
        'You are counting support calls per day.',
        'You are studying defects per batch or errors per page.',
        'Events occur independently at a roughly constant rate.',
      ],
      simpleExample:
        'A call center receives an average of 4 calls per minute. The Poisson Distribution helps calculate the probability of receiving exactly 6 calls in the next minute.',
      realLife: {
        problem:
          'A customer support team wants to estimate how many calls it may receive during the next hour.',
        approach: [
          'Collect call arrival data over many hours.',
          'Calculate the average calls per hour.',
          'Use the average as the Poisson rate (lambda).',
          'Estimate the probability of different call counts.',
        ],
        outcome:
          'The team can plan staffing based on expected call volume and the chance of unusually busy periods.',
      },
      tasks: [
        'A shop receives an average of 3 customers per hour. What is the Poisson rate (lambda)?',
        'A server receives an average of 5 requests per second. Explain what the Poisson Distribution can help calculate.',
        'A call center averages 6 calls per hour. Use Python to calculate the probability of receiving exactly 4 calls in one hour.',
      ],
      questions: [
        {
          q: 'What is a Poisson Distribution?',
          a: 'It models the number of events occurring in a fixed interval when the average event rate is known.',
        },
        {
          q: 'What does lambda (λ) represent?',
          a: 'The average number of events occurring in the interval.',
        },
        {
          q: 'What is the mean of a Poisson Distribution?',
          a: 'Its mean is lambda (λ). Its variance is also lambda.',
        },
        {
          q: 'How is Poisson different from Binomial?',
          a: 'Binomial counts successes in a fixed number of trials. Poisson counts events in a fixed interval using an average rate.',
        },
      ],
      code: `from scipy.stats import poisson

# Average 6 calls per hour
lambda_rate = 6

# Probability of exactly 4 calls
probability = poisson.pmf(
    k=4,
    mu=lambda_rate
)

print("Probability:", probability)
print("Percentage:", probability * 100, "%")`,
      pitfalls: [
        'Lambda must refer to the chosen time or space interval.',
        'Do not confuse the average number of events with the exact number that will occur.',
        'The model assumes a reasonably stable event rate and independent occurrences.',
      ],
    }),

    lesson({
      slug: 'uniform-distribution',
      title: 'Uniform Distribution',
      summary:
        'Understand situations where every possible value in a given range has an equal chance.',
      definition:
        'A Uniform Distribution means all possible outcomes within a specified range are equally likely.',
      why:
        'Sometimes we have no reason to prefer one value over another. Uniform Distribution provides a simple model where every value has the same chance.',
      purpose:
        'Represent equally likely outcomes and generate random values within a range.',
      when: [
        'You are rolling a fair dice.',
        'You are selecting a random number from a range.',
        'You need a simple random simulation.',
      ],
      simpleExample:
        'A fair dice has six possible outcomes. Each outcome from 1 to 6 has an equal probability of 1/6.',
      realLife: {
        problem:
          'A data analyst needs to randomly assign participants to groups for an experiment.',
        approach: [
          'Define the possible group assignments.',
          'Make sure each assignment has an equal chance.',
          'Generate random assignments using Python.',
        ],
        outcome:
          'Participants are assigned randomly, helping reduce selection bias in the experiment.',
      },
      tasks: [
        'For a fair dice, write the probability of getting any one number.',
        'Explain the difference between choosing a random integer from 1 to 10 and choosing a random value between 0 and 1.',
        'Generate 1,000 random values between 0 and 10 in Python. Plot a histogram and explain why the values should be spread relatively evenly.',
      ],
      questions: [
        {
          q: 'What is a Uniform Distribution?',
          a: 'A distribution where every possible outcome within the defined range has the same probability or density.',
        },
        {
          q: 'What is the difference between discrete and continuous Uniform Distributions?',
          a: 'Discrete Uniform has a finite set of equally likely outcomes. Continuous Uniform has equal probability density across an interval.',
        },
        {
          q: 'Where is Uniform Distribution used?',
          a: 'Random sampling, simulations, experiment design, and generating random numbers.',
        },
      ],
      code: `import numpy as np
import matplotlib.pyplot as plt

data = np.random.uniform(
    low=0,
    high=10,
    size=1000
)

plt.hist(data, bins=20, edgecolor="black")
plt.title("Uniform Distribution")
plt.xlabel("Values")
plt.ylabel("Frequency")
plt.show()`,
      pitfalls: [
        'Equal probability applies only to the defined outcomes or range.',
        'Continuous values have probability 0 at any exact single point; probabilities apply to intervals.',
        'Do not assume real-world data is uniformly distributed without evidence.',
      ],
    }),

    lesson({
      slug: 'exponential-distribution',
      title: 'Exponential Distribution',
      summary:
        'Understand how to model the waiting time until the next event happens.',
      definition:
        'An Exponential Distribution describes the waiting time between events that occur at a constant average rate.',
      why:
        'Knowing how many events happen on average is useful, but sometimes we also need to know how long we may wait for the next event.',
      purpose:
        'Estimate waiting times between events and understand the chance of waiting longer or shorter than expected.',
      when: [
        'You want to estimate time until the next customer arrives.',
        'You are measuring time between phone calls.',
        'You are analyzing time between system failures under a constant failure rate assumption.',
      ],
      simpleExample:
        'A restaurant receives 6 customers per hour on average. The Exponential Distribution can help estimate how long we might wait for the next customer.',
      realLife: {
        problem:
          'A technical support team wants to estimate the time between incoming customer requests.',
        approach: [
          'Calculate the average number of requests per hour.',
          'Convert the rate into the appropriate time unit.',
          'Use the Exponential Distribution to estimate waiting times.',
        ],
        outcome:
          'The team can understand typical waiting times and the chance of a longer gap between requests.',
      },
      tasks: [
        'If events happen at an average rate of 2 per hour, what is the average waiting time between events?',
        'A restaurant gets 10 customers per hour. Explain the difference between using Poisson to count customers and Exponential to estimate waiting time.',
        'Use Python to generate 1,000 waiting times for an event rate of 5 per hour. Plot a histogram and describe the shape.',
      ],
      questions: [
        {
          q: 'What is an Exponential Distribution?',
          a: 'It models the waiting time between events that happen at a constant average rate.',
        },
        {
          q: 'What is the relationship between Poisson and Exponential Distributions?',
          a: 'Poisson models the number of events in an interval. Exponential models the waiting time between those events.',
        },
        {
          q: 'What is the average waiting time?',
          a: 'The average waiting time is 1 / lambda when lambda is the event rate per unit time.',
        },
        {
          q: 'What is the memoryless property?',
          a: 'The future waiting time does not depend on how long we have already waited, under the Exponential model.',
        },
      ],
      code: `import numpy as np
import matplotlib.pyplot as plt

# Average 5 events per hour
rate = 5

waiting_times = np.random.exponential(
    scale=1 / rate,
    size=1000
)

plt.hist(waiting_times, bins=30, edgecolor="black")
plt.title("Exponential Distribution")
plt.xlabel("Waiting time (hours)")
plt.ylabel("Frequency")
plt.show()`,
      pitfalls: [
        'The rate and waiting-time units must match.',
        'The model assumes a constant event rate.',
        'Do not confuse the number of events with the time between events.',
      ],
    }),

    lesson({
      slug: 'central-limit-theorem',
      title: 'Central Limit Theorem (CLT)',
      summary:
        'Understand why averages often form a bell-shaped pattern even when the original data does not.',
      definition:
        'The Central Limit Theorem says that when we take many sufficiently large random samples and calculate their averages, those averages tend to follow a Normal Distribution under suitable conditions.',
      why:
        'Real-world data may be skewed or irregular. The CLT helps explain why averages can still behave approximately normally, making many statistical techniques possible.',
      purpose:
        'Understand the distribution of sample averages and why it is important in statistics and data analysis.',
      when: [
        'You are working with sample averages.',
        'You want to understand confidence intervals and statistical inference.',
        'You need to understand why averages tend to become more stable with larger samples.',
      ],
      simpleExample:
        'Individual customer spending may be highly skewed. But if we repeatedly select groups of 50 customers and calculate the average spending for each group, those averages tend to form a more bell-shaped distribution.',
      realLife: {
        problem:
          'A company wants to estimate the average spending of all its customers by analyzing samples instead of every customer.',
        approach: [
          'Randomly select a sample of customers.',
          'Calculate the average spending for that sample.',
          'Repeat the process many times.',
          'Observe how the sample averages are distributed.',
        ],
        outcome:
          'The distribution of sample averages becomes approximately Normal under suitable conditions, helping the company estimate the population mean.',
      },
      tasks: [
        'Explain the CLT in your own words without using mathematical terminology.',
        'Why might averages of samples look more Normal than the original customer-spending data?',
        'Simulate 1,000 samples of size 30 from a highly skewed distribution. Calculate each sample mean and plot their distribution. Compare it with the original data.',
      ],
      questions: [
        {
          q: 'What is the Central Limit Theorem?',
          a: 'It states that sample means tend to follow an approximately Normal Distribution when sample sizes are sufficiently large and conditions are met.',
        },
        {
          q: 'Does the original data need to be normally distributed for the CLT to work?',
          a: 'No. Under suitable conditions, the distribution of sample means can become approximately Normal even when the original data is not.',
        },
        {
          q: 'What happens when sample size increases?',
          a: 'The sample means tend to become more concentrated around the population mean, and their distribution becomes more nearly Normal under the theorem’s conditions.',
        },
        {
          q: 'What is the standard error of the sample mean?',
          a: 'It is the standard deviation of the sample-mean distribution. For independent observations with population standard deviation sigma, it is sigma / square root of n.',
        },
      ],
      detail:
        'Important difference: The original data distribution describes individual values. The sampling distribution describes a statistic, such as the mean, calculated from many samples. Larger samples generally make sample means less variable.',
      code: `import numpy as np
import matplotlib.pyplot as plt

# Original data is strongly skewed
population = np.random.exponential(
    scale=10,
    size=100000
)

sample_means = []

# Repeatedly take samples and calculate their means
for _ in range(1000):
    sample = np.random.choice(
        population,
        size=30
    )
    sample_means.append(np.mean(sample))

plt.hist(sample_means, bins=30, edgecolor="black")
plt.title("Central Limit Theorem")
plt.xlabel("Sample means")
plt.ylabel("Frequency")
plt.show()`,
      pitfalls: [
        'The CLT applies to sample statistics, not automatically to individual observations.',
        'A larger sample size does not fix biased or non-random sampling.',
        'The required sample size depends on the original distribution and the accuracy needed.',
      ],
    }),
  ],
}

export default ch
