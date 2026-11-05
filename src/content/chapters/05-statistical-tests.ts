
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
          'Identify the correct statistical test or calculate the requested value and explain it simply.',
      },
      {
        id: `${data.slug}-task-2`,
        title: 'Compare',
        difficulty: 'medium',
        task: data.tasks[1],
        expectedOutcome:
          'Interpret the statistical result correctly and explain why the selected test is appropriate.',
      },
      {
        id: `${data.slug}-task-3`,
        title: 'Apply it',
        difficulty: 'hard',
        task: data.tasks[2],
        expectedOutcome:
          'Apply the test to a realistic data science problem and explain the conclusion and limitations.',
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
  id: 'statisticaltests',
  number: 5,
  title: 'Statistical Tests',
  tagline:
    'Learn the most important statistical tests used to compare averages, analyze relationships, measure differences, and make data-driven decisions.',
  priority: 'extreme',

  topics: [

    // --------------------------------------------------
    // 1. Z-TEST
    // --------------------------------------------------

    lesson({
      slug: 'z-test',
      title: 'Z-test',
      summary:
        'Learn how to compare a sample mean or proportion with a reference value using the Z-distribution.',

      definition:
        'A Z-test is a statistical test used to determine whether a sample mean or proportion differs significantly from a population reference value. It is commonly used when the population standard deviation is known or when large-sample conditions make a normal approximation appropriate.',

      why:
        'When we collect sample data, the sample average may be different from the expected population average. A Z-test helps us determine whether the difference is large enough to be considered statistically significant.',

      purpose:
        'To test whether a sample mean or proportion is significantly different from a known or expected population value.',

      when: [
        'When comparing a sample average with a known population average and the population standard deviation is known.',
        'When checking whether a website conversion rate differs from an expected conversion rate.',
        'When testing whether the average weight of products meets a company standard.',
        'When working with large samples where normal approximation conditions are satisfied.',
      ],

      simpleExample:
        'A company claims that its products have an average weight of 500 grams. The population standard deviation is known to be 10 grams. An analyst selects 100 products and finds an average weight of 503 grams. A Z-test can help determine whether the difference is statistically significant.',

      realLife: {
        problem:
          'An e-commerce company claims that its website conversion rate is 5%. The marketing team wants to check whether the actual conversion rate is different.',

        approach: [
          'Define H0: The population conversion rate is 5%.',
          'Define H1: The population conversion rate is different from 5%.',
          'Collect website visitor and purchase data.',
          'Calculate the sample conversion rate.',
          'Perform a one-proportion Z-test.',
          'Compare the p-value with the significance level.',
        ],

        outcome:
          'The company can determine whether its observed conversion rate provides sufficient statistical evidence of a difference from the expected 5%.',
      },

      tasks: [
        'A company claims that the average delivery time is 30 minutes. The population standard deviation is 5 minutes. A sample of 100 deliveries has an average of 31 minutes. Identify the information needed to perform a Z-test.',
        'A website has an expected conversion rate of 10%. Out of 500 visitors, 65 make a purchase. Calculate the sample conversion rate and explain whether a one-proportion Z-test is appropriate.',
        'Create a Python program that performs a one-sample Z-test on delivery times when the population standard deviation is known. Interpret the p-value using alpha = 0.05.',
      ],

      questions: [
        {
          q: 'What is a Z-test?',
          a: 'A Z-test is a statistical test used to compare a sample mean or proportion with a reference population value using the standard normal distribution.',
        },
        {
          q: 'When should we use a Z-test?',
          a: 'We commonly use it when the population standard deviation is known for a mean test, or when suitable large-sample normal approximation conditions hold.',
        },
        {
          q: 'What is the Z-test formula for a sample mean?',
          a: 'Z = (x̄ - μ) / (σ / √n), where x̄ is the sample mean, μ is the population mean, σ is the population standard deviation, and n is the sample size.',
        },
        {
          q: 'What is the difference between a Z-test and a T-test?',
          a: 'A Z-test uses the standard normal distribution. A T-test uses the t-distribution and is commonly used when the population standard deviation is unknown and estimated from the sample.',
        },
        {
          q: 'Can a Z-test be used for proportions?',
          a: 'Yes. A one-proportion Z-test can compare a sample proportion with a reference population proportion when normal approximation conditions are appropriate.',
        },
      ],

      detail:
        'The Z-score tells us how many standard errors the sample estimate is away from the reference value. A large positive or negative Z-score indicates that the observed result is relatively far from the null hypothesis value. For a two-sided test, a sufficiently large absolute Z-score produces a small p-value.',

      code: `import numpy as np
from scipy import stats

# Sample data
sample = np.array([
    502, 504, 498, 501, 505,
    503, 499, 500, 506, 502
])

# Population information
population_mean = 500
population_std = 10
alpha = 0.05

# Calculate sample statistics
sample_mean = np.mean(sample)
n = len(sample)

# Calculate Z-score
z_score = (
    (sample_mean - population_mean)
    / (population_std / np.sqrt(n))
)

# Two-tailed p-value
p_value = 2 * stats.norm.sf(abs(z_score))

print("Sample Mean:", sample_mean)
print("Z-score:", z_score)
print("P-value:", p_value)

if p_value <= alpha:
    print("Reject H0")
else:
    print("Fail to reject H0")`,

      pitfalls: [
        'Do not use a Z-test for a mean simply because the sample size is large; check the assumptions and whether the standard deviation is known or a suitable approximation is justified.',
        'Do not confuse population standard deviation with sample standard deviation.',
        'Check independence of observations.',
        'For proportion tests, verify that the normal approximation conditions are satisfied.',
        'A statistically significant result does not automatically mean the difference is practically important.',
      ],
    }),

    // --------------------------------------------------
    // 2. T-TEST
    // --------------------------------------------------

    lesson({
      slug: 't-test-independent-paired',
      title: 'T-test (Independent and Paired)',
      summary:
        'Learn how to compare averages between two groups or compare measurements from the same group at two different times.',

      definition:
        'A T-test is a statistical test used to determine whether there is a significant difference between means. It uses the t-distribution and is commonly used when the population standard deviation is unknown. There are different types of T-tests, including independent and paired T-tests.',

      why:
        'In real-world analysis, we frequently compare two groups or measure changes before and after an activity. A T-test helps us determine whether the difference between their averages is statistically significant.',

      purpose:
        'To compare two means and evaluate whether the observed difference provides sufficient statistical evidence of a real population difference.',

      when: [
        'Use an independent T-test when comparing two separate groups, such as students from two different classrooms.',
        'Use a paired T-test when comparing the same people before and after training.',
        'When comparing average salaries between two independent departments.',
        'When checking whether a new teaching method improves student performance.',
        'When the population standard deviation is unknown and the relevant t-test assumptions are reasonable.',
      ],

      simpleExample:
        'Independent T-test: Compare the average marks of students from Class A and Class B. Paired T-test: Compare the marks of the same students before and after a training program.',

      realLife: {
        problem:
          'A training institute wants to determine whether its new teaching program improves student examination scores.',

        approach: [
          'Collect examination scores from students before the training program.',
          'Conduct the training program.',
          'Collect examination scores from the same students after training.',
          'Calculate the difference between each student’s before and after scores.',
          'Perform a paired T-test on the differences.',
          'Interpret the p-value and estimated average improvement.',
        ],

        outcome:
          'The institute can evaluate whether the new training program produces a statistically significant change in student performance.',
      },

      tasks: [
        'Two classrooms have average examination scores of 75 and 82. The students are different in each classroom. Identify which T-test is appropriate.',
        'A company measures employee productivity before and after a training program using the same employees. Explain why a paired T-test is appropriate.',
        'Create a Python program that performs both an independent Welch T-test and a paired T-test using sample datasets. Interpret both p-values.',
      ],

      questions: [
        {
          q: 'What is a T-test?',
          a: 'A T-test is a statistical test used to compare means using the t-distribution, commonly when the population standard deviation is unknown.',
        },
        {
          q: 'What are the two common types of T-tests?',
          a: 'Independent T-test and paired T-test.',
        },
        {
          q: 'What is an independent T-test?',
          a: 'It compares the means of two separate, independent groups, such as students from two different classrooms.',
        },
        {
          q: 'What is a paired T-test?',
          a: 'It compares two related measurements, such as the scores of the same students before and after training.',
        },
        {
          q: 'What is the difference between independent and paired T-tests?',
          a: 'An independent T-test compares two unrelated groups. A paired T-test compares related observations or repeated measurements from the same subjects.',
        },
        {
          q: 'What is Welch’s T-test?',
          a: 'Welch’s T-test is an independent two-sample T-test that does not assume equal population variances.',
        },
      ],

      detail:
        'Independent T-test: The two groups should contain independent observations. Welch’s T-test is often a good default because it does not require equal variances. Paired T-test: The observations must be meaningfully paired, and the differences between paired measurements should be approximately normally distributed when the sample is small. Both tests require careful consideration of outliers and sampling conditions.',

      code: `import numpy as np
from scipy import stats

# --------------------------------
# 1. Independent T-test
# --------------------------------

class_a = np.array([75, 80, 85, 78, 82, 88])
class_b = np.array([85, 90, 87, 92, 89, 86])

# Welch's independent T-test
independent_result = stats.ttest_ind(
    class_a,
    class_b,
    equal_var=False
)

print("Independent T-test")
print("Class A Mean:", np.mean(class_a))
print("Class B Mean:", np.mean(class_b))
print("P-value:", independent_result.pvalue)

# --------------------------------
# 2. Paired T-test
# --------------------------------

before_training = np.array([
    60, 65, 70, 68, 72, 75
])

after_training = np.array([
    70, 72, 78, 75, 80, 82
])

paired_result = stats.ttest_rel(
    before_training,
    after_training
)

print("\\nPaired T-test")
print("Before Mean:", np.mean(before_training))
print("After Mean:", np.mean(after_training))
print("P-value:", paired_result.pvalue)

alpha = 0.05

if independent_result.pvalue <= alpha:
    print("Independent test: Significant difference")
else:
    print("Independent test: Insufficient evidence")

if paired_result.pvalue <= alpha:
    print("Paired test: Significant change")
else:
    print("Paired test: Insufficient evidence")`,

      pitfalls: [
        'Do not use an independent T-test when observations are paired.',
        'Do not use a paired T-test for completely unrelated groups.',
        'Check outliers because they can strongly affect means.',
        'For small samples, examine whether the data or paired differences are reasonably compatible with normality.',
        'Consider Welch’s T-test when equal variances cannot be assumed.',
      ],
    }),

    // --------------------------------------------------
    // 3. CHI-SQUARE TEST
    // --------------------------------------------------

    lesson({
      slug: 'chi-square-test',
      title: 'Chi-square Test',
      summary:
        'Learn how to test relationships between categorical variables and compare observed frequencies with expected frequencies.',

      definition:
        'The Chi-square test is a statistical test used to analyze categorical data. It checks whether observed frequencies differ significantly from expected frequencies. Two common types are the Chi-square test of independence and the Chi-square goodness-of-fit test.',

      why:
        'Many business and data science problems involve categories instead of numerical measurements. For example, customer gender, payment method, product category, and customer satisfaction level. The Chi-square test helps us identify whether categorical variables are related.',

      purpose:
        'To determine whether there is a statistically significant association between categorical variables or whether observed category frequencies differ from an expected distribution.',

      when: [
        'When checking whether gender and product preference are related.',
        'When analyzing whether payment method is associated with customer age group.',
        'When checking whether customer satisfaction categories follow an expected distribution.',
        'When studying relationships between categorical variables in survey data.',
      ],

      simpleExample:
        'A company wants to know whether customer age group is related to preferred payment method. It collects data for young, middle-aged, and older customers using cash, cards, and UPI. A Chi-square test of independence can check whether the two categorical variables are associated.',

      realLife: {
        problem:
          'An e-commerce company wants to understand whether customer age group is associated with preferred payment method.',

        approach: [
          'Collect customer age groups and payment method information.',
          'Organize the data into a contingency table.',
          'Calculate the expected frequency for each category combination under the assumption of independence.',
          'Perform a Chi-square test of independence.',
          'Interpret the Chi-square statistic and p-value.',
        ],

        outcome:
          'The company can determine whether there is statistical evidence of an association between customer age group and payment preference.',
      },

      tasks: [
        'A survey records customer preferences for Cash, Card, and UPI. Identify why a Chi-square test may be appropriate.',
        'Create a contingency table containing customer age groups and preferred payment methods. Explain what a significant Chi-square result would mean.',
        'Write Python code using scipy.stats.chi2_contingency() to test whether customer age group and payment method are associated.',
      ],

      questions: [
        {
          q: 'What is a Chi-square test?',
          a: 'It is a statistical test used to analyze categorical data by comparing observed frequencies with expected frequencies.',
        },
        {
          q: 'What are the common types of Chi-square tests?',
          a: 'The Chi-square test of independence and the Chi-square goodness-of-fit test.',
        },
        {
          q: 'What is a Chi-square test of independence?',
          a: 'It checks whether two categorical variables are statistically associated.',
        },
        {
          q: 'What is a Chi-square goodness-of-fit test?',
          a: 'It checks whether the observed frequencies of one categorical variable match an expected distribution.',
        },
        {
          q: 'What is the Chi-square formula?',
          a: 'χ² = Σ[(O - E)² / E], where O represents observed frequency and E represents expected frequency.',
        },
        {
          q: 'Does a significant Chi-square test prove causation?',
          a: 'No. It indicates evidence of an association, not that one categorical variable causes the other.',
        },
      ],

      detail:
        'The test compares observed frequencies with expected frequencies. A larger Chi-square statistic indicates a greater difference between them. For a test of independence, degrees of freedom are (rows - 1) × (columns - 1). Expected cell frequencies should be sufficiently large for the usual approximation to be reliable. When expected counts are small, consider an exact test or an appropriate alternative.',

      code: `import numpy as np
from scipy.stats import chi2_contingency

# Rows: Customer age groups
# Columns: Payment methods
# Cash, Card, UPI

observed = np.array([
    [30, 20, 50],
    [20, 40, 40],
    [40, 30, 30]
])

# Perform Chi-square test of independence
chi2, p_value, dof, expected = chi2_contingency(
    observed
)

print("Chi-square Statistic:", chi2)
print("P-value:", p_value)
print("Degrees of Freedom:", dof)

print("\\nExpected Frequencies:")
print(expected)

alpha = 0.05

if p_value <= alpha:
    print("Reject H0: Variables are associated")
else:
    print("Fail to reject H0: Insufficient evidence of association")`,

      pitfalls: [
        'Use categorical frequency data rather than raw continuous measurements.',
        'Do not interpret association as causation.',
        'Check expected cell frequencies before relying on the Chi-square approximation.',
        'Each observation should belong to only one category combination in a standard independence test.',
        'A significant result does not tell you which categories differ; examine standardized residuals or suitable follow-up analyses.',
      ],
    }),

    // --------------------------------------------------
    // 4. ANOVA
    // --------------------------------------------------

    lesson({
      slug: 'anova',
      title: 'ANOVA (Analysis of Variance)',
      summary:
        'Learn how to compare the average values of three or more independent groups using one statistical test.',

      definition:
        'ANOVA stands for Analysis of Variance. It is a statistical method used to determine whether there is a statistically significant difference between the means of three or more groups.',

      why:
        'When comparing several groups, performing many separate T-tests increases the overall risk of false-positive results. ANOVA allows us to compare multiple group means using one overall statistical test.',

      purpose:
        'To determine whether at least one group mean differs significantly from the others.',

      when: [
        'When comparing average examination scores across three or more classrooms.',
        'When comparing sales performance across multiple marketing campaigns.',
        'When evaluating different teaching methods.',
        'When comparing average customer spending across multiple store locations.',
      ],

      simpleExample:
        'A company wants to compare the average sales generated by three advertising campaigns: Campaign A, Campaign B, and Campaign C. ANOVA checks whether there is evidence that at least one campaign has a different average sales result.',

      realLife: {
        problem:
          'A training institute wants to compare student examination performance across three different teaching methods.',

        approach: [
          'Divide students into three independent teaching groups.',
          'Collect examination scores from each group.',
          'Calculate the mean score for each group.',
          'Perform a one-way ANOVA test.',
          'Compare the p-value with the significance level.',
          'If the overall test is significant, perform an appropriate post-hoc test to identify which groups differ.',
        ],

        outcome:
          'The institute can determine whether the teaching methods have different average performance and investigate which specific methods differ.',
      },

      tasks: [
        'Three classrooms have different average examination scores. Explain why ANOVA is more appropriate than conducting several separate T-tests.',
        'A company compares average monthly sales across four branches. Identify the null and alternative hypotheses for a one-way ANOVA.',
        'Create Python code using scipy.stats.f_oneway() to compare three groups and interpret the F-statistic and p-value.',
      ],

      questions: [
        {
          q: 'What is ANOVA?',
          a: 'ANOVA is a statistical method used to compare the means of three or more groups.',
        },
        {
          q: 'What does ANOVA stand for?',
          a: 'Analysis of Variance.',
        },
        {
          q: 'Why do we use ANOVA instead of multiple T-tests?',
          a: 'ANOVA allows us to compare multiple group means in one overall test and helps avoid the increased family-wise false-positive risk caused by many unadjusted pairwise T-tests.',
        },
        {
          q: 'What is the null hypothesis in one-way ANOVA?',
          a: 'All population group means are equal.',
        },
        {
          q: 'What is the alternative hypothesis in ANOVA?',
          a: 'At least one population group mean is different.',
        },
        {
          q: 'What is a post-hoc test?',
          a: 'A post-hoc test is a follow-up procedure used after a significant overall ANOVA result to identify which specific groups differ.',
        },
      ],

      detail:
        'ANOVA compares variation between groups with variation within groups. If the variation between group means is large relative to the variation within groups, the F-statistic becomes larger. A significant ANOVA result only tells us that at least one mean differs; it does not identify the specific groups. Tukey’s HSD is one common post-hoc method for pairwise comparisons.',

      code: `import numpy as np
from scipy import stats

# Examination scores from three classrooms
class_a = np.array([75, 80, 85, 78, 82])
class_b = np.array([85, 90, 88, 92, 89])
class_c = np.array([65, 70, 68, 72, 69])

# Calculate group means
print("Class A Mean:", np.mean(class_a))
print("Class B Mean:", np.mean(class_b))
print("Class C Mean:", np.mean(class_c))

# Perform one-way ANOVA
f_statistic, p_value = stats.f_oneway(
    class_a,
    class_b,
    class_c
)

print("\\nF-statistic:", f_statistic)
print("P-value:", p_value)

alpha = 0.05

if p_value <= alpha:
    print("Reject H0: At least one group mean differs")
else:
    print("Fail to reject H0: Insufficient evidence of a difference")

# Post-hoc analysis can be performed
# after a significant overall ANOVA result.`,

      pitfalls: [
        'ANOVA does not directly tell you which groups differ.',
        'Do not perform multiple unadjusted T-tests as a replacement for a planned overall comparison.',
        'Check independence, residual normality, and equal variance assumptions for classical one-way ANOVA.',
        'Use a suitable post-hoc test after a significant overall result.',
        'Do not confuse ANOVA with a test that compares variances only.',
      ],
    }),

    // --------------------------------------------------
    // 5. F-TEST
    // --------------------------------------------------

    lesson({
      slug: 'f-test',
      title: 'F-test',
      summary:
        'Understand how the F-distribution is used to compare variances and test statistical models.',

      definition:
        'An F-test is a statistical test that uses the F-distribution to evaluate hypotheses involving variance ratios. It is used in procedures such as comparing two population variances and testing the overall significance of regression models and ANOVA.',

      why:
        'Variance tells us how spread out data values are. In statistics, comparing variability is important when evaluating groups, checking model performance, and understanding whether differences between groups are large relative to variation within groups.',

      purpose:
        'To evaluate hypotheses involving variance ratios and assess whether observed variability differences provide statistical evidence.',

      when: [
        'When comparing the variances of two normally distributed independent populations.',
        'When analyzing the overall significance of a regression model.',
        'When performing ANOVA to compare multiple group means.',
        'When evaluating variance-related assumptions in statistical analysis.',
      ],

      simpleExample:
        'A company wants to compare the consistency of product weights from two manufacturing machines. It collects product weight measurements from both machines and uses an F-test to compare their population variances, provided the normality and independence assumptions are reasonable.',

      realLife: {
        problem:
          'A manufacturing company wants to determine whether two production machines have different levels of variation in product weight.',

        approach: [
          'Collect product weight measurements from both machines.',
          'Calculate the sample variance for each machine.',
          'Define H0: The population variances are equal.',
          'Define H1: The population variances are different.',
          'Perform an appropriate two-sided variance comparison.',
          'Interpret the p-value and variance estimates.',
        ],

        outcome:
          'The company can evaluate whether there is statistical evidence that one machine produces more variable product weights than the other.',
      },

      tasks: [
        'Machine A has a sample variance of 16 and Machine B has a sample variance of 9. Calculate the ratio of the larger sample variance to the smaller sample variance.',
        'Explain why an F-test is used in ANOVA and what the F-statistic represents.',
        'Write Python code to compare the variances of two independent normal populations using an appropriate F-test and interpret the result.',
      ],

      questions: [
        {
          q: 'What is an F-test?',
          a: 'An F-test is a statistical test that uses the F-distribution to evaluate hypotheses involving variance ratios or model significance.',
        },
        {
          q: 'What is the basic F-statistic for comparing two variances?',
          a: 'F = s1² / s2², where s1² and s2² are sample variances. The reference distribution and degrees of freedom depend on the test formulation.',
        },
        {
          q: 'What is the relationship between F-test and ANOVA?',
          a: 'ANOVA uses an F-statistic to compare between-group variation with within-group variation.',
        },
        {
          q: 'What is the F-distribution?',
          a: 'It is a continuous probability distribution used in tests involving ratios of independent variance estimates.',
        },
        {
          q: 'Can an F-test be used in regression?',
          a: 'Yes. An F-test can evaluate whether a regression model or a group of predictors provides significant explanatory value compared with a restricted model.',
        },
      ],

      detail:
        'For the classical two-variance F-test, the ratio of two independent sample variances follows an F-distribution under the assumption that both populations are normally distributed. The degrees of freedom are n1 - 1 and n2 - 1. This test is sensitive to non-normality, so Levene’s test or Brown-Forsythe test may be preferable for comparing variances when normality is questionable. In ANOVA, F = MS between / MS within.',

      code: `import numpy as np
from scipy import stats

# Measurements from two machines
machine_a = np.array([
    98, 100, 102, 99, 101,
    97, 103, 100, 99, 101
])

machine_b = np.array([
    95, 105, 100, 110, 90,
    108, 92, 103, 97, 100
])

# Calculate sample variances
variance_a = np.var(machine_a, ddof=1)
variance_b = np.var(machine_b, ddof=1)

# Put the larger variance in the numerator
if variance_a >= variance_b:
    f_statistic = variance_a / variance_b
    df1 = len(machine_a) - 1
    df2 = len(machine_b) - 1
else:
    f_statistic = variance_b / variance_a
    df1 = len(machine_b) - 1
    df2 = len(machine_a) - 1

# Two-sided p-value
upper_tail = stats.f.sf(f_statistic, df1, df2)
lower_tail = stats.f.cdf(f_statistic, df1, df2)

p_value = min(1.0, 2 * min(upper_tail, lower_tail))

print("Machine A Variance:", variance_a)
print("Machine B Variance:", variance_b)
print("F-statistic:", f_statistic)
print("P-value:", p_value)

alpha = 0.05

if p_value <= alpha:
    print("Reject H0: Evidence of different variances")
else:
    print("Fail to reject H0: Insufficient evidence of different variances")`,

      pitfalls: [
        'The classical two-variance F-test assumes independent samples from normally distributed populations.',
        'Do not assume every F-test is simply a comparison of two variances.',
        'The F-statistic is a ratio and cannot be interpreted as a direct percentage difference.',
        'Do not confuse the F-test in ANOVA with the classical two-population variance test.',
        'Consider Levene’s test when comparing variances with non-normal data.',
      ],
    }),

    // --------------------------------------------------
    // 6. MANN-WHITNEY U TEST
    // --------------------------------------------------

    lesson({
      slug: 'mann-whitney-u-test',
      title: 'Mann-Whitney U Test',
      summary:
        'Learn how to compare two independent groups using ranks instead of relying on a normal-distribution assumption.',

      definition:
        'The Mann-Whitney U test is a non-parametric statistical test used to compare two independent groups. It works with the ranks of observations instead of directly comparing group means.',

      why:
        'Real-world datasets sometimes contain outliers or highly skewed values that make the assumptions of a standard independent T-test unsuitable. The Mann-Whitney U test provides an alternative for comparing two independent groups without requiring normally distributed data.',

      purpose:
        'To determine whether observations from one independent group tend to have different values or ranks from observations in another group.',

      when: [
        'When comparing two independent groups with strongly skewed numerical data.',
        'When the data contains influential outliers.',
        'When comparing customer satisfaction ratings between two independent groups.',
        'When comparing waiting times between two independent service centers.',
        'When an ordinal measurement is being compared between two independent groups.',
      ],

      simpleExample:
        'A company wants to compare customer satisfaction ratings from two independent branches. Since the ratings are ordinal and may not satisfy the assumptions of a T-test, the company can use the Mann-Whitney U test to compare the distributions of ratings.',

      realLife: {
        problem:
          'An online shopping company wants to compare delivery waiting times between two independent delivery partners. The data contains unusually long delivery times and is strongly right-skewed.',

        approach: [
          'Collect delivery times from both delivery partners.',
          'Check the distributions and identify extreme values.',
          'Combine the observations and rank them from smallest to largest.',
          'Perform the Mann-Whitney U test.',
          'Interpret the U-statistic and p-value.',
          'Compare group medians and distributions alongside the test result.',
        ],

        outcome:
          'The company can evaluate whether delivery-time distributions differ between the two delivery partners without relying on the normality assumption of a standard T-test.',
      },

      tasks: [
        'Two delivery partners have independent delivery-time datasets containing outliers. Explain why Mann-Whitney U may be suitable.',
        'Explain the difference between an independent T-test and the Mann-Whitney U test.',
        'Create a Python program using scipy.stats.mannwhitneyu() to compare customer satisfaction scores from two independent branches.',
      ],

      questions: [
        {
          q: 'What is the Mann-Whitney U test?',
          a: 'It is a non-parametric test used to compare two independent groups using ranks.',
        },
        {
          q: 'When should we use the Mann-Whitney U test?',
          a: 'It can be used when comparing two independent groups with ordinal data or numerical data that makes a parametric T-test unsuitable.',
        },
        {
          q: 'Is Mann-Whitney U a non-parametric test?',
          a: 'Yes. It does not require the same normal-distribution assumption as the independent T-test.',
        },
        {
          q: 'What is the difference between Mann-Whitney U and an independent T-test?',
          a: 'An independent T-test compares means using the t-distribution. Mann-Whitney U compares the ranks of observations between two independent groups.',
        },
        {
          q: 'Does Mann-Whitney U always compare medians?',
          a: 'No. It generally tests whether the distributions or rank tendencies differ. It can be interpreted as a median comparison when the group distributions have similar shapes and differ mainly in location.',
        },
        {
          q: 'Which Python function performs the Mann-Whitney U test?',
          a: 'scipy.stats.mannwhitneyu().',
        },
      ],

      detail:
        'The Mann-Whitney U test combines the observations from both groups, ranks them, and compares the rank sums. A small p-value provides evidence that the groups differ in their distributions or rank tendencies. If the distributions have similar shapes, the result can often be interpreted as a difference in location. It does not automatically test whether the medians are different.',

      code: `import numpy as np
from scipy import stats

# Customer satisfaction scores
# Two independent branches

branch_a = np.array([
    3, 4, 5, 2, 4,
    3, 5, 4, 2, 3
])

branch_b = np.array([
    5, 5, 4, 4, 5,
    3, 5, 4, 5, 4
])

# Perform Mann-Whitney U test
result = stats.mannwhitneyu(
    branch_a,
    branch_b,
    alternative='two-sided'
)

print("Branch A Median:", np.median(branch_a))
print("Branch B Median:", np.median(branch_b))

print("U-statistic:", result.statistic)
print("P-value:", result.pvalue)

alpha = 0.05

if result.pvalue <= alpha:
    print("Reject H0: Evidence of different distributions")
else:
    print("Fail to reject H0: Insufficient evidence of a difference")`,

      pitfalls: [
        'Use the test for two independent groups, not paired observations.',
        'Do not automatically interpret the result as a difference in medians.',
        'Mann-Whitney U does not mean that normality and all other assumptions can be ignored.',
        'Check the shape of both distributions before interpreting the result.',
        'Use the Wilcoxon signed-rank test for paired or matched observations instead.',
      ],
    }),
  ],
}

export default ch
