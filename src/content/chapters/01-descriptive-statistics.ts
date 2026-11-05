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
      { heading: 'When to use it', body: data.when.map((item) => `- ${item}`).join('\n') },
      { heading: 'Simple example', body: data.simpleExample },
      ...(data.detail ? [{ heading: 'How to interpret it', body: data.detail }] : []),
    ],
    {
      title: `Real-life example: ${data.title}`,
      domain: 'data-science',
      problem: data.realLife.problem,
      approach: data.realLife.approach,
      outcome: data.realLife.outcome,
    },
    [
      { id: `${data.slug}-task-1`, title: 'Try it', difficulty: 'easy', task: data.tasks[0], expectedOutcome: 'Calculate the requested statistic and explain what it says in one sentence.' },
      { id: `${data.slug}-task-2`, title: 'Compare', difficulty: 'medium', task: data.tasks[1], expectedOutcome: 'Choose a suitable measure and support your choice with the data.' },
      { id: `${data.slug}-task-3`, title: 'Apply it', difficulty: 'hard', task: data.tasks[2], expectedOutcome: 'Summarize your finding and explain one limitation or next step.' },
    ],
    data.questions,
    {
      code: data.code ? [{ title: 'Python example', lang: 'python', source: data.code }] : undefined,
      pitfalls: data.pitfalls,
    },
  )
}

const ch: Chapter = {
  id: 'descriptivestatistics',
  number: 1,
  title: 'Descriptive Statistics',
  tagline: 'Learn to summarize data, understand what it shows, and explain your findings.',
  priority: 'extreme',
  topics: [
    lesson({
      slug: 'descriptive-statistics',
      title: 'Introduction to Descriptive Statistics',
      summary: 'A simple starting point for turning a table of raw data into a clear summary.',
      definition: 'Descriptive statistics are numbers and summaries that describe the data you collected. They help you see typical values, variation, patterns, and unusual observations.',
      why: 'A dataset can contain too many rows to understand by looking at each one. A few clear summaries help people see what is common and what deserves a closer look.',
      purpose: 'Describe the data you have. Descriptive statistics do not, by themselves, prove what caused a pattern or predict what will happen next.',
      when: ['You open a dataset and want a first overview.', 'You need to summarize marks, sales, customer activity, or measurements.', 'You want to spot unusual values before further analysis.'],
      simpleExample: 'Marks are 60, 70, 70, 80, and 90. Their mean is 74, their median is 70, and their range is 30. These give a quick picture of the class results.',
      realLife: { problem: 'A teacher wants to understand the results of a class without reviewing every student record one by one.', approach: ['Count the students and check for missing marks.', 'Find a typical mark and how spread out the marks are.', 'Look for unusually high or low marks.'], outcome: 'The teacher gets a concise summary of class performance and knows which results may need a closer look.' },
      tasks: ['For 4, 6, 6, 8, 11, find the count, mean, median, and range.', 'Compare the sets 5, 6, 7 and 2, 6, 10. What is similar, and what differs?', 'Write a three-sentence summary of a dataset of daily temperatures. Include one measure of center and one measure of spread.'],
      questions: [
        { q: 'What are descriptive statistics?', a: 'They are numerical or visual summaries that describe the data observed, such as its center, spread, and shape.' },
        { q: 'How are descriptive and inferential statistics different?', a: 'Descriptive statistics summarize the data in hand. Inferential statistics use sample data to estimate or test claims about a larger population.' },
      ],
      detail: 'Common tools include mean, median, mode, range, standard deviation, percentiles, charts, and correlation. Choose a measure that fits the data and the question.',
    }),
    lesson({
      slug: 'mean-median-mode',
      title: 'Mean, Median, and Mode',
      summary: 'Three ways to describe a typical value, each useful in a different situation.',
      definition: 'Mean is the sum of the values divided by their count. Median is the middle value after sorting. Mode is the value or category that appears most often.',
      why: 'A measure of center gives a quick sense of what is typical. Comparing the three can also reveal skew or repeated values.',
      purpose: 'Use a representative value to summarize a group, while keeping in mind that different measures react differently to extreme values.',
      when: ['Use mean when values are numeric and fairly balanced.', 'Use median when data has extreme values or is strongly skewed.', 'Use mode to find the most common value or category.'],
      simpleExample: 'For 2, 3, 3, 4, 18: mean = 6, median = 3, and mode = 3. The large value 18 pulls the mean above most observations.',
      realLife: { problem: 'A job seeker wants to know a typical salary in a city where a few executives earn much more than everyone else.', approach: ['Sort the salaries.', 'Compare the mean and median.', 'Use the median as the typical salary if the high salaries pull up the mean.'], outcome: 'The median often gives a more representative picture of what a typical worker earns.' },
      tasks: ['Find the mean, median, and mode of 4, 5, 5, 8, 13.', 'Add 100 to that list. Which measure changes most, and why?', 'A shop sells sizes S, M, M, L, XL. Which measure helps decide what to restock?'],
      questions: [
        { q: 'When is the median more useful than the mean?', a: 'When the distribution is skewed or contains extreme values, because the median is less affected by them.', followUp: 'Give an example of data where this happens.' },
        { q: 'Can a dataset have more than one mode?', a: 'Yes. If multiple values tie for the highest frequency, a dataset can have multiple modes; it can also have no repeated mode.' },
      ],
      code: 'import statistics\n\ndata = [2, 3, 3, 4, 18]\nprint(statistics.mean(data))\nprint(statistics.median(data))\nprint(statistics.mode(data))',
      pitfalls: ['Do not assume the mean always represents a typical observation.', 'Sort the values before finding the median.', 'Mode can be a category, not only a number.'],
    }),
    lesson({
      slug: 'variance-standard-deviation',
      title: 'Variance and Standard Deviation',
      summary: 'Understand how tightly values cluster around their mean.',
      definition: 'Variance is the average squared distance from the mean. Standard deviation is the square root of variance and describes spread in the original units.',
      why: 'Two groups can share the same average but behave very differently. A spread measure shows whether observations are close together or widely separated.',
      purpose: 'Quantify variation so you can compare consistency, risk, or predictability in a dataset.',
      when: ['Compare consistency between groups with similar units.', 'Describe how much measurements tend to differ from their mean.', 'Prepare features for analyses that depend on scale.'],
      simpleExample: 'For 4, 5, 6, the mean is 5 and values are close to it. For 0, 5, 10, the mean is also 5, but values are more spread out, so standard deviation is larger.',
      realLife: { problem: 'Two classes both average 70 on a test, and a teacher wants to know which class had more consistent results.', approach: ['Calculate the standard deviation of each class.', 'Compare the two spreads in marks.', 'Check that both classes were measured on the same scale.'], outcome: 'The class with the smaller standard deviation had marks clustered more closely around its average.' },
      tasks: ['Find the range of 3, 4, 5, and of 1, 4, 7. Which set is more spread out?', 'Two delivery teams average 30 minutes. Their standard deviations are 2 and 12 minutes. Describe the difference.', 'Explain why sample variance commonly divides by n − 1 instead of n.'],
      questions: [
        { q: 'What does a standard deviation of zero mean?', a: 'Every observation is the same, so there is no spread around the mean.' },
        { q: 'Why is standard deviation easier to interpret than variance?', a: 'Standard deviation uses the same units as the original measurements; variance uses squared units.' },
      ],
      detail: 'Population variance divides by N. Sample variance commonly divides by n − 1 when estimating population variability from a sample. A larger standard deviation means more spread, but does not describe the distribution shape by itself.',
      pitfalls: ['Do not compare standard deviations across unrelated units without context.', 'Check whether the data is a population or a sample.', 'A high spread does not automatically mean bad or erroneous data.'],
    }),
    lesson({
      slug: 'percentiles-quartiles',
      title: 'Percentiles and Quartiles',
      summary: 'Describe the position of a value relative to the rest of the data.',
      definition: 'A percentile is a cutoff below which a given percentage of observations falls. Quartiles split ordered data into four parts: Q1, Q2 (the median), and Q3.',
      why: 'An average does not tell you where an individual value sits in a group. Percentiles give context about relative position.',
      purpose: 'Compare observations with a group and summarize how values are distributed across low, middle, and high ranges.',
      when: ['Compare test scores within a cohort.', 'Report income or response-time thresholds.', 'Summarize the middle of a distribution using quartiles.'],
      simpleExample: 'A score at the 80th percentile is at or above roughly 80% of the comparison scores. Q2 is the 50th percentile, also called the median.',
      realLife: { problem: 'A website team wants to report how long users wait for a page to load.', approach: ['Calculate the 50th percentile for a typical experience.', 'Calculate the 90th percentile to see slower experiences.', 'Compare the percentiles before and after a performance change.'], outcome: 'The team can describe both the typical wait and the experience of slower users.' },
      tasks: ['For sorted scores 10, 20, 30, 40, 50, identify the median.', 'Explain what the 25th and 75th percentiles tell you about a group.', 'A page has a 2-second median load time and a 9-second 90th percentile. What should the team investigate?'],
      questions: [
        { q: 'What does the 90th percentile mean?', a: 'It is a value at or below which about 90% of observations fall, under the chosen percentile convention.' },
        { q: 'What are Q1, Q2, and Q3?', a: 'They are the 25th, 50th, and 75th percentile cutoffs. Q2 is the median.' },
      ],
      detail: 'Exact percentile values can differ slightly between software because interpolation conventions vary. State or check the method when exact values matter.',
    }),
    lesson({
      slug: 'iqr-outliers',
      title: 'Interquartile Range and Outliers',
      summary: 'Measure the spread of the middle half of your data and flag unusual values for review.',
      definition: 'The interquartile range (IQR) is Q3 − Q1, the width of the middle 50% of ordered observations. A common rule flags values below Q1 − 1.5 × IQR or above Q3 + 1.5 × IQR as potential outliers.',
      why: 'IQR describes spread without being strongly affected by the smallest and largest values. Its fences offer a consistent way to find values worth checking.',
      purpose: 'Summarize the middle of skewed data and flag observations for investigation, not automatic deletion.',
      when: ['Use a box plot to compare distributions.', 'Screen skewed data for unusually low or high observations.', 'Check whether a value is a data-entry error or a real rare event.'],
      simpleExample: 'If Q1 = 10 and Q3 = 18, IQR = 8. The upper fence is 18 + 1.5 × 8 = 30; values above 30 are flagged for review.',
      realLife: { problem: 'An online store sees one order worth far more than typical orders and wants to check whether it is an error or a bulk purchase.', approach: ['Calculate Q1, Q3, and IQR for order values.', 'Use the 1.5 × IQR fences to flag the unusual order.', 'Review the order details and business context before taking action.'], outcome: 'The flag helps focus review while avoiding the assumption that every unusual order is incorrect.' },
      tasks: ['If Q1 = 12 and Q3 = 20, calculate the IQR and upper fence.', 'A flagged observation is genuine. Explain why it may still be important to keep it.', 'Compare IQR and range as measures of spread for data with one extreme value.'],
      questions: [
        { q: 'How does the IQR rule flag potential outliers?', a: 'Calculate Q1 and Q3, then IQR = Q3 − Q1. Values outside Q1 − 1.5 × IQR and Q3 + 1.5 × IQR are flagged.' },
        { q: 'Should outliers always be removed?', a: 'No. First check for errors and understand the context. A rare but valid observation may carry useful information.' },
      ],
      pitfalls: ['An outlier flag is a prompt to investigate, not proof of an error.', 'IQR focuses on the middle half and may not capture every unusual pattern.'],
    }),
    lesson({
      slug: 'skewness-kurtosis',
      title: 'Skewness and Distribution Shape',
      summary: 'Describe whether data is balanced or has a longer tail on one side.',
      definition: 'Skewness describes asymmetry in a distribution. Positive skew has a longer right tail; negative skew has a longer left tail. Kurtosis is commonly used to describe tail heaviness relative to a reference distribution.',
      why: 'The shape helps explain why an average may not represent a typical value and whether extreme observations are more common than expected.',
      purpose: 'Choose suitable summaries and visualizations and recognize when a distribution may need closer investigation.',
      when: ['Compare mean and median in a numeric feature.', 'Check income, purchase amounts, or waiting times for long tails.', 'Review a histogram or box plot before selecting a statistical method.'],
      simpleExample: 'Most people in a group earn around 40, while a few earn 200. Those high values create a long right tail, or positive skew, and can pull the mean above the median.',
      realLife: { problem: 'A retailer wants to summarize customer spending, where a few customers place very large orders.', approach: ['Plot the spending values.', 'Compare mean and median and inspect the tail.', 'Use percentiles or median alongside the mean when reporting typical spending.'], outcome: 'The report describes both ordinary purchases and the small number of unusually large ones.' },
      tasks: ['If mean is much larger than median, which direction of skew might be present?', 'Sketch or describe a left-skewed set of exam scores.', 'Why should a team view a histogram instead of relying only on a skewness number?'],
      questions: [
        { q: 'What does positive skew mean?', a: 'The distribution has a longer right tail, often because a few high values extend beyond the main group.' },
        { q: 'What does kurtosis help describe?', a: 'It is commonly used to describe tail heaviness and the propensity for extreme values relative to a reference distribution. Check whether software reports excess or Pearson kurtosis.' },
      ],
      pitfalls: ['A skewness value does not replace looking at the distribution.', 'Kurtosis conventions differ across tools; check whether the result is excess kurtosis.'],
    }),
    lesson({
      slug: 'covariance-correlation',
      title: 'Covariance and Correlation',
      summary: 'Describe whether two numeric variables move together and how strong a linear pattern is.',
      definition: 'Covariance indicates the direction in which two variables vary together. Pearson correlation standardizes this relationship and ranges from −1 to +1, describing the strength and direction of a linear association.',
      why: 'Studying two variables together can reveal useful patterns that separate summaries miss, such as whether study time tends to rise with marks.',
      purpose: 'Measure association to support exploration and comparison. Association alone does not show that one variable causes the other.',
      when: ['Explore relationships between two numeric variables.', 'Compare linear associations across pairs of differently scaled features.', 'Use a scatter plot to check the pattern and possible outliers.'],
      simpleExample: 'Study hours are 1, 2, 3 and marks are 50, 60, 70. Both increase together, so their covariance and correlation are positive.',
      realLife: { problem: 'A business wants to know whether weekly advertising spend is associated with weekly sales.', approach: ['Plot spend against sales for each week.', 'Calculate Pearson correlation for a linear association.', 'Check seasonality and other factors before interpreting the result.'], outcome: 'The business learns whether the two measures move together, while recognizing that the result alone does not prove advertising caused sales.' },
      tasks: ['If one variable rises as another falls, what sign of association would you expect?', 'Explain why correlation is easier to compare across datasets than covariance.', 'A scatter plot is U-shaped but Pearson correlation is close to zero. Explain how both can be true.'],
      questions: [
        { q: 'What is the difference between covariance and correlation?', a: 'Covariance shows direction and depends on units. Correlation standardizes covariance, is unitless, and ranges from −1 to +1.' },
        { q: 'Does correlation imply causation?', a: 'No. Confounding variables, coincidence, or reverse direction may explain an association.' },
      ],
      pitfalls: ['Pearson correlation measures linear association and can miss nonlinear patterns.', 'Outliers can strongly change correlation.', 'Correlation is not evidence of causation.'],
    }),
    lesson({
      slug: 'descriptive-statistics-python',
      title: 'Descriptive Statistics with Python',
      summary: 'Calculate and interpret common summaries with Pandas and NumPy.',
      definition: 'Python libraries such as Pandas and NumPy provide functions for calculating common descriptive statistics on lists, arrays, and tables.',
      why: 'Code makes it practical to summarize larger datasets consistently and repeat the same analysis when data changes.',
      purpose: 'Use calculations as a starting point, then interpret results in the context of the question and data quality.',
      when: ['You need repeatable summaries of a dataset.', 'You are beginning exploratory data analysis.', 'You want to compare results across columns or groups.'],
      simpleExample: 'For a Pandas column, `df["marks"].median()` returns its median and `df["marks"].describe()` gives count, mean, standard deviation, quartiles, and extremes.',
      realLife: { problem: 'An analyst receives a monthly student results file and needs to summarize marks consistently each month.', approach: ['Load the file into a DataFrame.', 'Check missing values and column types.', 'Use describe(), median(), and quantile() to produce and interpret summaries.'], outcome: 'The same short analysis can be rerun on each monthly file and compared over time.' },
      tasks: ['Create a list of five values and calculate its mean and median with Python.', 'Use Pandas describe() on a numeric column and explain what count and 75% mean.', 'Compare NumPy and Pandas standard deviation defaults; decide which setting matches a sample.'],
      questions: [
        { q: 'What does Pandas describe() show for a numeric column?', a: 'It summarizes count, mean, standard deviation, minimum, quartiles, and maximum.' },
        { q: 'Why should you check missing values before calculating statistics?', a: 'Missing values can change which observations are included and may affect calculations or make comparisons misleading.' },
      ],
      code: 'import pandas as pd\n\nmarks = pd.Series([60, 70, 70, 80, 90])\nprint(marks.describe())\nprint("Median:", marks.median())\nprint("75th percentile:", marks.quantile(0.75))',
      detail: 'NumPy commonly uses population-style variance by default (ddof=0); Pandas Series variance and standard deviation commonly use sample-style calculations (ddof=1). Confirm the convention for your calculation.',
      pitfalls: ['Check missing values and data types before interpreting output.', 'Be explicit about population versus sample calculations.', 'A computed statistic still needs a plain-language interpretation.'],
    }),
  ],
}

export default ch
