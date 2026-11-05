
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
          'Identify the sampling concept and explain it using a simple example.',
      },
      {
        id: `${data.slug}-task-2`,
        title: 'Compare',
        difficulty: 'medium',
        task: data.tasks[1],
        expectedOutcome:
          'Compare the sampling methods and explain why a particular method is suitable.',
      },
      {
        id: `${data.slug}-task-3`,
        title: 'Apply it',
        difficulty: 'hard',
        task: data.tasks[2],
        expectedOutcome:
          'Apply the sampling concept to a realistic data science problem and explain its limitations.',
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
  id: 'samplingtechniques',
  number: 6,
  title: 'Sampling Techniques',
  tagline:
    'Understand how to select representative samples, reduce sampling errors, study sampling distributions, and make reliable conclusions about populations.',
  priority: 'extreme',

  topics: [

    // --------------------------------------------------
    // 1. POPULATION VS SAMPLE
    // --------------------------------------------------

    lesson({
      slug: 'population-vs-sample',
      title: 'Population vs Sample',
      summary:
        'Understand the difference between an entire group being studied and a smaller group selected from it.',

      definition:
        'A population is the complete group of individuals, objects, or observations that a researcher wants to study. A sample is a smaller subset selected from that population to collect information and make conclusions about the larger group.',

      why:
        'Studying every individual in a large population can be expensive, time-consuming, or impossible. Sampling allows analysts to study a smaller group and use its information to understand the larger population.',

      purpose:
        'To understand how sample data can be used to estimate population characteristics and make decisions without collecting information from every member of the population.',

      when: [
        'When conducting customer satisfaction surveys for a large company.',
        'When estimating the average salary of employees in an organization.',
        'When analyzing the quality of products manufactured in a factory.',
        'When studying the purchasing behavior of customers across a country.',
      ],

      simpleExample:
        'A university has 10,000 students and wants to understand their average daily study time. Asking all 10,000 students would take significant time. Instead, the university selects 500 students and collects their study-time information. Here, 10,000 students represent the population and 500 students represent the sample.',

      realLife: {
        problem:
          'An e-commerce company wants to understand the average amount spent by its 100,000 customers.',

        approach: [
          'Identify all 100,000 customers as the target population.',
          'Select a suitable sample of 1,000 customers.',
          'Collect their purchasing information.',
          'Calculate the sample average spending.',
          'Use the sample result to estimate the population average.',
          'Consider sampling error and whether the sample represents the target population.',
        ],

        outcome:
          'The company can estimate average customer spending without analyzing every customer individually.',
      },

      tasks: [
        'A college has 5,000 students and selects 200 students for a survey. Identify the population and sample.',
        'A company has 20,000 employees across five cities. Explain why studying a sample may be more practical than studying every employee.',
        'Create a Python dataset containing 1,000 customer spending values, select a sample of 100 customers, and compare the population mean with the sample mean.',
      ],

      questions: [
        {
          q: 'What is a population in statistics?',
          a: 'A population is the complete group of individuals or observations that a researcher wants to study.',
        },
        {
          q: 'What is a sample?',
          a: 'A sample is a smaller subset selected from a population for statistical analysis.',
        },
        {
          q: 'What is the main difference between population and sample?',
          a: 'A population includes the entire group being studied, while a sample includes only a selected portion of that group.',
        },
        {
          q: 'Why do we use samples instead of studying the entire population?',
          a: 'Sampling saves time, money, and resources and makes research practical when populations are very large.',
        },
        {
          q: 'What is a population parameter?',
          a: 'A population parameter is a numerical value describing a population, such as its mean, variance, or proportion.',
        },
        {
          q: 'What is a sample statistic?',
          a: 'A sample statistic is a numerical value calculated from sample data, such as the sample mean or sample standard deviation.',
        },
      ],

      detail:
        'Population values are commonly represented using Greek symbols. For example, μ represents the population mean and σ represents the population standard deviation. Sample values are commonly represented using symbols such as x̄ for the sample mean and s for the sample standard deviation. We use sample statistics to estimate unknown population parameters.',

      code: `import numpy as np

# Complete population data
population = np.array([
    100, 200, 300, 400, 500,
    600, 700, 800, 900, 1000
])

# Select a sample of 4 observations
sample = np.random.default_rng(42).choice(
    population,
    size=4,
    replace=False
)

# Calculate population and sample means
population_mean = np.mean(population)
sample_mean = np.mean(sample)

print("Population:", population)
print("Sample:", sample)

print("Population Mean:", population_mean)
print("Sample Mean:", sample_mean)`,

      pitfalls: [
        'A larger sample does not automatically guarantee a representative sample.',
        'Do not confuse population parameters with sample statistics.',
        'A biased sample can produce misleading conclusions even when the sample size is large.',
        'Clearly define the target population before collecting data.',
      ],
    }),

    // --------------------------------------------------
    // 2. RANDOM SAMPLING
    // --------------------------------------------------

    lesson({
      slug: 'random-sampling',
      title: 'Random Sampling',
      summary:
        'Learn how to select observations randomly so that each population member has a known chance of selection.',

      definition:
        'Random sampling is a sampling method in which members of a population are selected using a random process. In simple random sampling, every possible sample of a given size has an equal chance of being selected.',

      why:
        'If researchers select participants based only on convenience or personal preference, the sample may not represent the population. Random sampling helps reduce selection bias and supports statistical inference.',

      purpose:
        'To select a sample without deliberately favoring particular population members and improve the fairness of the sampling process.',

      when: [
        'When selecting customers for a satisfaction survey.',
        'When choosing products for quality inspection.',
        'When selecting students for an academic study.',
        'When conducting research where every population member can be listed and accessed.',
      ],

      simpleExample:
        'A company has 1,000 employees and wants to survey 100 employees. It assigns every employee a unique number and randomly selects 100 numbers. Every employee has an equal chance of being selected under this simple random sampling procedure.',

      realLife: {
        problem:
          'A manufacturing company produces 50,000 products daily and wants to inspect 500 products for quality.',

        approach: [
          'Create a list of all products manufactured during the selected period.',
          'Assign a unique identification number to every product.',
          'Use a random number generator to select 500 products.',
          'Inspect the selected products.',
          'Calculate the defect rate in the sample.',
          'Use the sample results to estimate the overall defect rate.',
        ],

        outcome:
          'The company gets a randomly selected sample for quality analysis without manually choosing products.',
      },

      tasks: [
        'A company has 500 employees and wants to randomly select 50 employees. Explain how you would perform simple random sampling.',
        'Explain why randomly selecting customers is generally better than surveying only customers who visit the website frequently.',
        'Create a Python program that randomly selects 100 customers from a dataset containing 1,000 customers using NumPy.',
      ],

      questions: [
        {
          q: 'What is random sampling?',
          a: 'Random sampling is a method of selecting observations using a random process so that selection is not deliberately influenced by the researcher.',
        },
        {
          q: 'What is simple random sampling?',
          a: 'It is a sampling method in which every possible sample of a fixed size has an equal probability of selection.',
        },
        {
          q: 'Why is random sampling important?',
          a: 'It helps reduce selection bias and supports valid statistical conclusions when the sampling frame and procedure are appropriate.',
        },
        {
          q: 'What is the difference between random sampling and convenience sampling?',
          a: 'Random sampling uses a random selection procedure, while convenience sampling selects participants because they are easy to access.',
        },
        {
          q: 'Can random sampling guarantee a perfectly representative sample?',
          a: 'No. Random sampling reduces systematic selection bias, but a sample may still differ from the population because of chance variation or nonresponse.',
        },
      ],

      detail:
        'In simple random sampling without replacement, an individual cannot be selected more than once. In sampling with replacement, an individual can be selected again. Random selection does not guarantee that every sample has exactly the same characteristics as the population.',

      code: `import numpy as np
import pandas as pd

# Create customer dataset
customers = pd.DataFrame({
    "customer_id": range(1, 1001),
    "spending": np.random.default_rng(42).integers(
        100, 5000, size=1000
    )
})

# Randomly select 100 customers
sample = customers.sample(
    n=100,
    random_state=42
)

print("Total Customers:", len(customers))
print("Selected Customers:", len(sample))

print("\\nRandom Sample:")
print(sample.head())

print("\\nPopulation Average Spending:",
      customers["spending"].mean())

print("Sample Average Spending:",
      sample["spending"].mean())`,

      pitfalls: [
        'Random selection does not eliminate nonresponse bias.',
        'Do not repeatedly select observations without considering replacement.',
        'Use a fixed random seed when reproducible results are required.',
        'Make sure the sampling frame includes the target population.',
      ],
    }),

    // --------------------------------------------------
    // 3. STRATIFIED SAMPLING
    // --------------------------------------------------

    lesson({
      slug: 'stratified-sampling',
      title: 'Stratified Sampling',
      summary:
        'Learn how to divide a population into meaningful groups and randomly select samples from every group.',

      definition:
        'Stratified sampling is a sampling technique in which a population is divided into smaller groups called strata based on shared characteristics. Random samples are then selected from each stratum.',

      why:
        'Some populations contain different groups that may have different characteristics. If we randomly select one sample from the entire population, smaller groups may be underrepresented. Stratified sampling helps ensure that important groups are included.',

      purpose:
        'To improve representation of important population groups and obtain more reliable estimates when groups differ in meaningful ways.',

      when: [
        'When surveying employees from different departments.',
        'When analyzing customers from different age groups.',
        'When conducting research across different geographical regions.',
        'When comparing educational performance across different student categories.',
      ],

      simpleExample:
        'A college has 1,000 students: 600 undergraduate students and 400 postgraduate students. The researcher wants a sample of 100 students. Using proportional stratified sampling, 60 undergraduate students and 40 postgraduate students are randomly selected.',

      realLife: {
        problem:
          'An e-commerce company wants to survey customers from different age groups. Its customer population contains young, middle-aged, and older customers.',

        approach: [
          'Divide customers into age-based groups.',
          'Calculate the population size of each group.',
          'Decide the total sample size.',
          'Allocate sample observations to each group.',
          'Randomly select customers within each group.',
          'Combine the selected customers into the final sample.',
        ],

        outcome:
          'The company obtains a sample that includes customers from every important age group instead of relying on one group being selected by chance.',
      },

      tasks: [
        'A university has 700 undergraduate and 300 postgraduate students. Select a proportional sample of 100 students.',
        'A company has customers from three regions. Explain how stratified sampling can improve the representation of smaller regions.',
        'Create a Python program that divides employees into departments and randomly selects a proportional sample from each department.',
      ],

      questions: [
        {
          q: 'What is stratified sampling?',
          a: 'It is a sampling method in which the population is divided into groups called strata and random samples are selected from each group.',
        },
        {
          q: 'What is a stratum?',
          a: 'A stratum is a subgroup of a population whose members share a particular characteristic, such as age group, department, or region.',
        },
        {
          q: 'Why do we use stratified sampling?',
          a: 'It ensures that important population groups are represented in the sample and can improve the precision of estimates.',
        },
        {
          q: 'What is proportional stratified sampling?',
          a: 'It is a method where the sample size selected from each stratum is proportional to that stratum’s population size.',
        },
        {
          q: 'What is the difference between random and stratified sampling?',
          a: 'Simple random sampling selects from the entire population, while stratified sampling first divides the population into groups and then samples from each group.',
        },
        {
          q: 'Does stratified sampling always require equal sample sizes from every group?',
          a: 'No. Proportional allocation uses each group’s population share. Equal allocation is another option when researchers want similar sample sizes for comparisons.',
        },
      ],

      detail:
        'In proportional stratified sampling, the sample size for a group is calculated as nₕ = (Nₕ / N) × n. Here, Nₕ is the population size of a stratum, N is the total population, and n is the total sample size. Disproportionate sampling may be useful when smaller groups need additional representation, but population estimates may require sampling weights.',

      code: `import pandas as pd

# Employee dataset
employees = pd.DataFrame({
    "employee_id": range(1, 1001),
    "department": (
        ["IT"] * 500 +
        ["HR"] * 300 +
        ["Sales"] * 200
    )
})

# Total sample size
sample_size = 100

# Proportional stratified sampling
sample = (
    employees.groupby("department", group_keys=False)
    .apply(
        lambda group: group.sample(
            n=round(
                len(group) / len(employees) * sample_size
            ),
            random_state=42
        )
    )
)

print("Population Distribution:")
print(employees["department"].value_counts())

print("\\nSample Distribution:")
print(sample["department"].value_counts())

print("\\nSelected Employees:")
print(sample.head())`,

      pitfalls: [
        'Strata should be clearly defined and should not accidentally omit population members.',
        'Do not confuse stratified sampling with cluster sampling.',
        'Incorrect sample allocation can produce misleading population estimates.',
        'Disproportionate sampling may require weighting during analysis.',
        'Make sure random selection is performed within each stratum.',
      ],
    }),

    // --------------------------------------------------
    // 4. SYSTEMATIC SAMPLING
    // --------------------------------------------------

    lesson({
      slug: 'systematic-sampling',
      title: 'Systematic Sampling',
      summary:
        'Learn how to select observations at regular intervals after choosing a random starting point.',

      definition:
        'Systematic sampling is a sampling technique in which a researcher selects a random starting point and then chooses every kth observation from an ordered population list.',

      why:
        'Randomly selecting each observation individually can become difficult when dealing with large datasets or production lines. Systematic sampling provides a simple and organized way to select observations at regular intervals.',

      purpose:
        'To select samples efficiently using a fixed interval while maintaining a random starting point.',

      when: [
        'When inspecting products moving along a manufacturing line.',
        'When selecting customer records from an ordered database.',
        'When conducting surveys using a customer list.',
        'When monitoring transactions generated throughout the day.',
      ],

      simpleExample:
        'A company has 1,000 customers and wants to select 100 customers. The sampling interval is 1,000 / 100 = 10. If the random starting point is 4, the selected customers will be 4, 14, 24, 34, and so on.',

      realLife: {
        problem:
          'A factory manufactures 10,000 products daily and wants to inspect 500 products for quality.',

        approach: [
          'Calculate the sampling interval using population size divided by sample size.',
          'Calculate 10,000 / 500 = 20.',
          'Randomly select a starting position between 1 and 20.',
          'Inspect every 20th product after the starting position.',
          'Record defects and calculate the sample defect rate.',
        ],

        outcome:
          'The factory can inspect products regularly throughout production without randomly selecting every product individually.',
      },

      tasks: [
        'A population contains 500 customers and you need a sample of 50. Calculate the sampling interval.',
        'A company selects every 15th customer after a random starting point. Explain how this method differs from simple random sampling.',
        'Create a Python program that selects every kth observation from a dataset after choosing a random starting position.',
      ],

      questions: [
        {
          q: 'What is systematic sampling?',
          a: 'It is a sampling method in which a random starting point is selected and then every kth observation is chosen.',
        },
        {
          q: 'How do we calculate the sampling interval?',
          a: 'Sampling interval k = Population size (N) / Sample size (n), when this gives a suitable integer interval.',
        },
        {
          q: 'Why is a random starting point important?',
          a: 'It prevents the researcher from always beginning at the same position and helps reduce selection bias.',
        },
        {
          q: 'What is the difference between random and systematic sampling?',
          a: 'Random sampling selects observations using a random procedure. Systematic sampling selects observations at fixed intervals after a random start.',
        },
        {
          q: 'What is periodicity in systematic sampling?',
          a: 'Periodicity occurs when a repeating pattern in the population list matches the sampling interval and can cause a biased sample.',
        },
      ],

      detail:
        'The sampling interval is commonly calculated as k = N / n. For example, if the population has 1,000 observations and the required sample size is 100, k = 10. Select a random starting position from the first 10 observations and then select every 10th observation. Check the ordering of the population list because repeating patterns can distort the sample.',

      code: `import numpy as np
import pandas as pd

# Create population dataset
population = pd.DataFrame({
    "customer_id": range(1, 1001)
})

# Required sample size
sample_size = 100

# Calculate sampling interval
N = len(population)
k = N // sample_size

# Choose a random starting position
rng = np.random.default_rng(42)
start = rng.integers(0, k)

# Select every kth observation
sample = population.iloc[start::k].head(sample_size)

print("Population Size:", N)
print("Sample Size:", len(sample))
print("Sampling Interval:", k)
print("Random Starting Position:", start + 1)

print("\\nSelected Customers:")
print(sample.head(10))`,

      pitfalls: [
        'Always use a random starting point.',
        'Check whether the population list contains repeating patterns.',
        'Do not assume every kth record is representative when the data has periodicity.',
        'The sampling interval may need adjustment when N is not evenly divisible by n.',
      ],
    }),

    // --------------------------------------------------
    // 5. SAMPLING DISTRIBUTION
    // --------------------------------------------------

    lesson({
      slug: 'sampling-distribution',
      title: 'Sampling Distribution',
      summary:
        'Understand how a statistic such as the sample mean behaves across many samples from the same population.',

      definition:
        'A sampling distribution is the probability distribution of a statistic, such as the sample mean or sample proportion, obtained by taking all possible samples of the same size from a population under a specified sampling procedure.',

      why:
        'A sample statistic changes from one sample to another. Understanding the sampling distribution helps us measure this variation and perform statistical inference, confidence intervals, and hypothesis testing.',

      purpose:
        'To understand how sample statistics vary across repeated samples and how accurately they estimate population parameters.',

      when: [
        'When understanding why different samples produce different averages.',
        'When calculating confidence intervals.',
        'When performing hypothesis testing.',
        'When studying the Central Limit Theorem.',
        'When estimating the probability of obtaining a particular sample statistic.',
      ],

      simpleExample:
        'Suppose a population contains customer spending values. You repeatedly select samples of 30 customers and calculate the average spending for each sample. The distribution of these sample averages is called the sampling distribution of the sample mean.',

      realLife: {
        problem:
          'An e-commerce company wants to understand how much its estimated average customer spending could change if different samples of customers were selected.',

        approach: [
          'Start with a population of customer spending values.',
          'Randomly select a sample of 30 customers.',
          'Calculate the sample mean.',
          'Repeat the sampling process many times.',
          'Store the mean from every sample.',
          'Plot the distribution of all calculated sample means.',
        ],

        outcome:
          'The company can understand the variability of sample averages and how consistently its sample mean estimates the population mean.',
      },

      tasks: [
        'Explain why two different random samples from the same population can produce different sample means.',
        'A researcher selects 100 samples of size 30 and calculates the mean of each sample. Explain what the resulting distribution represents.',
        'Create a Python simulation that repeatedly selects samples from a population and plots the sampling distribution of the sample mean.',
      ],

      questions: [
        {
          q: 'What is a sampling distribution?',
          a: 'It is the probability distribution of a sample statistic, such as the sample mean, across repeated samples of the same size.',
        },
        {
          q: 'What is the sampling distribution of the sample mean?',
          a: 'It is the distribution formed by the sample means obtained from repeated samples of the same size.',
        },
        {
          q: 'What is the Central Limit Theorem?',
          a: 'Under suitable conditions, the sampling distribution of the sample mean approaches a normal distribution as the sample size increases, even when the original population is not normally distributed.',
        },
        {
          q: 'What is the mean of the sampling distribution of the sample mean?',
          a: 'For random sampling under suitable conditions, its expected value is the population mean μ.',
        },
        {
          q: 'What is the standard deviation of the sampling distribution of the sample mean?',
          a: 'It is the standard error of the sample mean. For independent observations, it is σ / √n.',
        },
        {
          q: 'Does the sampling distribution contain individual population observations?',
          a: 'No. It contains values of a statistic calculated from repeated samples, not the original individual observations.',
        },
      ],

      detail:
        'The Central Limit Theorem explains why the sample mean often has an approximately normal sampling distribution for sufficiently large samples under suitable conditions. If the population has mean μ and standard deviation σ, the sampling distribution of the sample mean has expected value μ and standard error σ / √n for independent observations. For sampling without replacement from a finite population, a finite population correction may be needed.',

      code: `import numpy as np
import matplotlib.pyplot as plt

# Create a population with a skewed distribution
rng = np.random.default_rng(42)

population = rng.exponential(
    scale=50,
    size=100000
)

# Repeated sampling settings
sample_size = 30
number_of_samples = 1000

sample_means = []

# Take repeated samples
for _ in range(number_of_samples):
    sample = rng.choice(
        population,
        size=sample_size,
        replace=True
    )

    sample_means.append(np.mean(sample))

# Convert to NumPy array
sample_means = np.array(sample_means)

# Display statistics
print("Population Mean:", np.mean(population))
print("Mean of Sample Means:", np.mean(sample_means))
print("Standard Deviation of Sample Means:",
      np.std(sample_means, ddof=1))

# Plot sampling distribution
plt.hist(
    sample_means,
    bins=30,
    edgecolor="black"
)

plt.title("Sampling Distribution of Sample Mean")
plt.xlabel("Sample Mean")
plt.ylabel("Frequency")

plt.show()`,

      pitfalls: [
        'Do not confuse a sampling distribution with the distribution of the original population.',
        'The Central Limit Theorem does not mean that the original data becomes normally distributed.',
        'The required sample size depends on population shape and the desired accuracy.',
        'Samples should follow a suitable random sampling procedure.',
        'Account for dependence and finite population effects when necessary.',
      ],
    }),

    // --------------------------------------------------
    // 6. SAMPLING BIAS
    // --------------------------------------------------

    lesson({
      slug: 'sampling-bias',
      title: 'Sampling Bias',
      summary:
        'Learn why an incorrectly selected sample can produce misleading conclusions about a population.',

      definition:
        'Sampling bias occurs when the sampling process systematically favors certain members of a population over others, causing the selected sample to differ from the target population in a way that can distort research conclusions.',

      why:
        'A sample may contain thousands of observations and still produce incorrect conclusions if certain groups are consistently excluded or overrepresented. Understanding sampling bias helps analysts collect more reliable data.',

      purpose:
        'To identify and reduce systematic errors in sample selection so that research findings are more representative of the target population.',

      when: [
        'When designing customer surveys.',
        'When collecting online feedback.',
        'When analyzing employee satisfaction.',
        'When building machine learning datasets.',
        'When evaluating whether a dataset represents the target population.',
      ],

      simpleExample:
        'A company wants to understand customer satisfaction among all its customers. However, it only surveys customers who recently purchased products. Customers who stopped purchasing because of poor service are excluded. The resulting sample may show higher satisfaction than the actual customer population.',

      realLife: {
        problem:
          'A mobile application company wants to measure satisfaction among all its users but collects feedback only from users who frequently open the application.',

        approach: [
          'Identify the target population as all application users.',
          'Review which users are included in the feedback process.',
          'Identify inactive and occasional users who are missing.',
          'Use a suitable sampling strategy to include different user groups.',
          'Monitor response rates across groups.',
          'Compare the sample composition with the target population.',
        ],

        outcome:
          'The company reduces the risk of collecting feedback only from highly engaged users and obtains a more balanced understanding of user satisfaction.',
      },

      tasks: [
        'A company surveys only its most loyal customers to measure customer satisfaction. Identify the possible sampling bias.',
        'A university collects student feedback through an optional online survey. Explain how nonresponse bias may affect the results.',
        'Design a sampling strategy for a nationwide customer satisfaction survey that reduces undercoverage, selection bias, and nonresponse bias.',
      ],

      questions: [
        {
          q: 'What is sampling bias?',
          a: 'Sampling bias occurs when the sampling process systematically favors some population members over others.',
        },
        {
          q: 'What causes sampling bias?',
          a: 'It can result from convenience sampling, undercoverage, voluntary participation, nonresponse, or an incomplete sampling frame.',
        },
        {
          q: 'What is selection bias?',
          a: 'Selection bias occurs when the method of selecting participants creates systematic differences between the selected sample and the target population.',
        },
        {
          q: 'What is nonresponse bias?',
          a: 'Nonresponse bias occurs when people who do not respond differ meaningfully from those who respond, potentially distorting the results.',
        },
        {
          q: 'Can a large sample still be biased?',
          a: 'Yes. A large sample does not remove systematic bias if the sampling method consistently excludes or overrepresents certain groups.',
        },
        {
          q: 'How can sampling bias be reduced?',
          a: 'Clearly define the target population, use a suitable sampling frame, apply probability sampling where possible, monitor nonresponse, and use appropriate weighting when justified.',
        },
      ],

      detail:
        'Common forms include undercoverage bias, selection bias, and nonresponse bias. Undercoverage happens when some members of the target population are missing from the sampling frame. Nonresponse bias happens when response patterns are related to the variable being studied. Increasing sample size alone does not solve these systematic problems.',

      code: `import pandas as pd
import numpy as np

# Customer population
customers = pd.DataFrame({
    "customer_id": range(1, 1001),
    "customer_type": (
        ["Active"] * 700 +
        ["Inactive"] * 300
    ),
    "satisfaction": np.random.default_rng(42).integers(
        1, 6, size=1000
    )
})

# Biased sample: only active customers
biased_sample = customers[
    customers["customer_type"] == "Active"
].sample(
    n=100,
    random_state=42
)

# Random sample from the entire population
random_sample = customers.sample(
    n=100,
    random_state=42
)

print("Population Distribution:")
print(customers["customer_type"].value_counts(normalize=True))

print("\\nBiased Sample Distribution:")
print(biased_sample["customer_type"].value_counts(normalize=True))

print("\\nRandom Sample Distribution:")
print(random_sample["customer_type"].value_counts(normalize=True))

print("\\nPopulation Satisfaction Mean:",
      customers["satisfaction"].mean())

print("Biased Sample Satisfaction Mean:",
      biased_sample["satisfaction"].mean())

print("Random Sample Satisfaction Mean:",
      random_sample["satisfaction"].mean())`,

      pitfalls: [
        'A large sample does not automatically eliminate sampling bias.',
        'Do not survey only easily accessible participants when studying a wider population.',
        'Voluntary response surveys may overrepresent people with strong opinions.',
        'Nonresponse can create bias when respondents and nonrespondents differ.',
        'Weighting can help in some situations but cannot always correct missing information or unmeasured differences.',
      ],
    }),

    // --------------------------------------------------
    // 7. STANDARD ERROR
    // --------------------------------------------------

    lesson({
      slug: 'standard-error',
      title: 'Standard Error (SE)',
      summary:
        'Understand how much a sample statistic is expected to vary across repeated samples.',

      definition:
        'Standard Error is the standard deviation of the sampling distribution of a statistic. It measures how much a statistic, such as the sample mean, is expected to vary across repeated samples of the same size.',

      why:
        'A sample mean is only an estimate of the population mean. If we select a different sample, the estimated mean may change. Standard Error helps us understand the precision of that estimate.',

      purpose:
        'To measure the uncertainty or sampling variability associated with a sample statistic and help calculate confidence intervals and perform hypothesis tests.',

      when: [
        'When calculating confidence intervals for a population mean.',
        'When interpreting the precision of a sample mean.',
        'When comparing estimates from different samples.',
        'When performing hypothesis testing.',
        'When understanding how sample size affects estimation uncertainty.',
      ],

      simpleExample:
        'Suppose a researcher selects 100 customers and calculates an average spending of ₹500. The population standard deviation is ₹100. The standard error of the sample mean is 100 / √100 = ₹10. This indicates the standard deviation of the sampling distribution of the sample mean under the stated assumptions.',

      realLife: {
        problem:
          'An e-commerce company estimates average customer spending using a sample of 100 customers and wants to understand the uncertainty of its estimate.',

        approach: [
          'Collect a random sample of 100 customer spending values.',
          'Calculate the sample mean.',
          'Calculate the sample standard deviation.',
          'Calculate the standard error using s / √n.',
          'Use the standard error to construct a confidence interval.',
          'Explain the precision of the estimated average spending.',
        ],

        outcome:
          'The company can report its estimated average spending together with an indication of how much the estimate may vary across repeated samples.',
      },

      tasks: [
        'A population standard deviation is 20 and the sample size is 100. Calculate the standard error of the sample mean.',
        'Two researchers calculate standard errors of 5 and 2 for their estimates. Explain which estimate is more precise, assuming they estimate the same parameter using comparable methods.',
        'Create a Python program that calculates the standard error of a sample mean for different sample sizes and demonstrates how increasing sample size reduces the standard error.',
      ],

      questions: [
        {
          q: 'What is Standard Error?',
          a: 'Standard Error is the standard deviation of the sampling distribution of a statistic.',
        },
        {
          q: 'What is the formula for the standard error of the sample mean?',
          a: 'SE = σ / √n when the population standard deviation is known. When it is unknown, we commonly estimate it using s / √n.',
        },
        {
          q: 'What happens to standard error when sample size increases?',
          a: 'Standard error generally decreases because it is inversely proportional to the square root of the sample size under independent sampling conditions.',
        },
        {
          q: 'What is the difference between standard deviation and standard error?',
          a: 'Standard deviation measures the spread of individual observations. Standard error measures the variability of a sample statistic across repeated samples.',
        },
        {
          q: 'Why is standard error important?',
          a: 'It helps measure estimation uncertainty and is used in confidence intervals, hypothesis testing, and statistical inference.',
        },
        {
          q: 'Does a smaller standard error mean the sample is unbiased?',
          a: 'No. A smaller standard error indicates greater precision, but it does not guarantee that the estimate is free from systematic bias.',
        },
      ],

      detail:
        'For a sample mean, SE = σ / √n when observations are independent and the population standard deviation is known. In practice, we usually estimate it using SE = s / √n. If the sample size increases from 100 to 400, the standard error becomes half as large, assuming the same population variability. For sampling without replacement from a finite population, a finite population correction may be needed.',

      code: `import numpy as np
import pandas as pd

# Sample customer spending data
spending = np.array([
    400, 450, 500, 550, 600,
    480, 520, 530, 470, 510,
    490, 560, 580, 440, 460,
    540, 510, 500, 490, 530
])

# Calculate sample statistics
sample_mean = np.mean(spending)
sample_std = np.std(spending, ddof=1)
sample_size = len(spending)

# Calculate standard error
standard_error = sample_std / np.sqrt(sample_size)

print("Sample Mean:", sample_mean)
print("Sample Standard Deviation:", sample_std)
print("Sample Size:", sample_size)
print("Standard Error:", standard_error)

# Demonstrate effect of sample size
sample_sizes = [10, 20, 50, 100, 200, 500]

population_std = 100

for n in sample_sizes:
    se = population_std / np.sqrt(n)
    print(f"Sample Size: {n}, Standard Error: {se:.2f}")`,

      pitfalls: [
        'Do not confuse standard deviation with standard error.',
        'A small standard error does not guarantee that the estimate is unbiased.',
        'Do not forget to use the square root of sample size in the formula.',
        'Use sample standard deviation when population standard deviation is unknown.',
        'Consider dependence between observations because correlated observations can increase estimation uncertainty.',
      ],
    }),
  ],
}

export default ch
