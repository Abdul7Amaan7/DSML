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
          'Identify the concept or calculate the requested value and explain it in one sentence.',
      },
      {
        id: `${data.slug}-task-2`,
        title: 'Compare',
        difficulty: 'medium',
        task: data.tasks[1],
        expectedOutcome:
          'Interpret the result correctly and support your answer with statistical reasoning.',
      },
      {
        id: `${data.slug}-task-3`,
        title: 'Apply it',
        difficulty: 'hard',
        task: data.tasks[2],
        expectedOutcome:
          'Apply the concept to a realistic situation and explain one limitation or next step.',
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
  id: 'experimental-design-and-ab-testing',
  number: 9,
  title: 'Experimental Design & A/B Testing',
  tagline:
    'Learn how to design controlled experiments, compare alternatives, calculate statistical significance, and make reliable data-driven decisions.',
  priority: 'extreme',
  topics: [
    lesson({
      slug: 'ab-testing',
      title: 'A/B Testing',
      summary:
        'Understand how to compare two versions of a product, feature, or experience using a controlled experiment to determine which performs better.',
      definition:
        'A/B testing is an experimental method in which participants are randomly assigned to two or more groups that receive different versions of a product, feature, or experience. The performance of the groups is compared using a predefined metric to estimate the effect of the change.',
      why:
        'Businesses frequently make product decisions based on assumptions. A/B testing provides measurable evidence about whether a change actually improves an outcome, such as conversion rate, revenue, engagement, or retention.',
      purpose:
        'The purpose is to determine whether a proposed change produces a meaningful improvement compared with the existing experience while reducing the influence of confounding factors.',
      when: [
        'When comparing two website layouts or landing pages.',
        'When testing different button colors, text, or placements.',
        'When evaluating changes to checkout or registration flows.',
        'When comparing marketing campaigns or email subject lines.',
        'When measuring the impact of a new product feature.',
      ],
      simpleExample:
        'An e-commerce website wants to improve its checkout conversion rate. Version A uses the existing checkout page, while Version B uses a redesigned checkout page. Visitors are randomly assigned to one version. After collecting enough observations, the company compares the percentage of visitors who complete a purchase.',
      detail:
        'A typical A/B test begins with a hypothesis, a primary metric, and an experimental design. Users are randomly assigned to a control or treatment experience. The experiment runs for a predefined period or until the planned sample size is reached. The results are analyzed using an appropriate statistical method and interpreted alongside practical impact and potential risks.',
      realLife: {
        problem:
          'An online shopping platform wants to determine whether a redesigned checkout page increases the number of completed purchases.',
        approach: [
          'Define the hypothesis that the redesigned checkout page improves conversion.',
          'Choose checkout conversion rate as the primary metric.',
          'Randomly assign eligible visitors to the existing and redesigned pages.',
          'Collect conversion data using consistent tracking.',
          'Compare conversion rates and calculate uncertainty around the difference.',
          'Evaluate statistical and practical significance before making a decision.',
        ],
        outcome:
          'The company uses experimental evidence to decide whether to launch the redesigned checkout experience.',
      },
      tasks: [
        'Explain A/B testing using an example of two different website landing pages.',
        'Version A receives 1,000 visitors and generates 100 purchases. Version B receives 1,000 visitors and generates 125 purchases. Calculate both conversion rates and their absolute difference.',
        'Design an A/B test for a new registration page. Define the hypothesis, control, treatment, primary metric, randomization unit, and success criteria.',
      ],
      questions: [
        {
          q: 'What is A/B testing?',
          a: 'A/B testing is a controlled experiment in which participants are randomly assigned to different versions of an experience. Their outcomes are compared using predefined metrics to estimate the effect of a change.',
          followUp:
            'Why is random assignment important in an A/B test?',
        },
        {
          q: 'What are the control and treatment versions in A/B testing?',
          a: 'The control is the existing or baseline experience, while the treatment is the modified experience being tested.',
          followUp:
            'Can an A/B test have more than one treatment group?',
        },
        {
          q: 'What is a primary metric in A/B testing?',
          a: 'A primary metric is the main outcome used to evaluate whether the experiment achieved its objective, such as conversion rate, revenue per user, or retention.',
          followUp:
            'Why should the primary metric be selected before the experiment starts?',
        },
        {
          q: 'What is the difference between A/B testing and observational analysis?',
          a: 'A/B testing uses controlled random assignment to reduce confounding, while observational analysis compares naturally occurring groups that may differ in important ways.',
          followUp:
            'Why can observational comparisons lead to misleading conclusions?',
        },
        {
          q: 'What is a conversion rate?',
          a: 'Conversion rate is the proportion of eligible users or visitors who complete a specified action, such as making a purchase or submitting a registration form.',
          followUp:
            'What other metrics would you monitor alongside conversion rate?',
        },
      ],
      code: `import numpy as np
from scipy.stats import norm

# Experiment results
visitors_a = 1000
conversions_a = 100

visitors_b = 1000
conversions_b = 125

# Conversion rates
rate_a = conversions_a / visitors_a
rate_b = conversions_b / visitors_b

# Absolute difference
difference = rate_b - rate_a

# Pooled conversion rate
pooled_rate = (
    conversions_a + conversions_b
) / (
    visitors_a + visitors_b
)

# Standard error under the null hypothesis
standard_error = np.sqrt(
    pooled_rate * (1 - pooled_rate)
    * (1 / visitors_a + 1 / visitors_b)
)

# Two-proportion z-test
z_score = difference / standard_error

p_value = 2 * (
    1 - norm.cdf(abs(z_score))
)

print("Version A conversion:", rate_a)
print("Version B conversion:", rate_b)
print("Absolute improvement:", difference)
print("Relative improvement:", difference / rate_a)
print("Z-score:", z_score)
print("P-value:", p_value)`,
      pitfalls: [
        'Running an experiment without a clearly defined hypothesis.',
        'Changing multiple important elements without planning how to interpret their effects.',
        'Stopping the experiment as soon as a favorable p-value appears.',
        'Ignoring sample size and statistical power.',
        'Using different eligibility rules or tracking methods across groups.',
        'Focusing only on conversion rate while ignoring revenue, retention, or negative user impacts.',
        'Treating statistical significance as proof that the treatment caused every observed difference without checking experiment quality.',
      ],
    }),

    lesson({
      slug: 'randomization',
      title: 'Randomization',
      summary:
        'Understand how randomly assigning participants to experimental groups helps reduce selection bias and create comparable groups.',
      definition:
        'Randomization is the process of assigning participants or experimental units to different groups using a chance-based mechanism. In a randomized experiment, each eligible unit has a known probability of receiving each assigned treatment. This helps balance both observed and unobserved characteristics across groups on average.',
      why:
        'If participants choose their own groups or are assigned based on existing characteristics, the groups may differ before the experiment begins. These differences can influence the outcome and make it difficult to determine whether the treatment caused the observed change.',
      purpose:
        'The purpose is to create comparable experimental groups, reduce selection bias, and support valid causal conclusions when combined with appropriate experimental design and analysis.',
      when: [
        'When assigning users to A/B test variations.',
        'When conducting clinical or scientific experiments.',
        'When comparing different marketing strategies.',
        'When testing new machine learning product features.',
        'When designing experiments where participant characteristics may affect outcomes.',
      ],
      simpleExample:
        'A company wants to compare two versions of its mobile application. Instead of allowing users to select their preferred version, the system randomly assigns eligible users to Version A or Version B. This reduces the chance that users with different preferences or behavior patterns systematically end up in one group.',
      detail:
        'Randomization can be performed using a random number generator, random assignment service, or stable hashing mechanism. In digital experiments, assignment is often performed at the user level and persisted so the same user consistently sees the same variant. Randomization does not guarantee perfectly identical groups in a finite sample; it balances characteristics in expectation. Stratified or blocked randomization can help balance important characteristics in smaller experiments.',
      realLife: {
        problem:
          'A streaming platform wants to test whether a new recommendation algorithm increases viewing time, but users have very different viewing habits.',
        approach: [
          'Define eligible users before assignment.',
          'Randomly assign users to the existing and new recommendation systems.',
          'Persist the assignment so users do not switch groups unexpectedly.',
          'Check whether important baseline characteristics are reasonably balanced.',
          'Analyze users according to their original assigned groups.',
        ],
        outcome:
          'The platform reduces selection bias and can estimate the impact of the new recommendation system more reliably.',
      },
      tasks: [
        'Explain why randomly assigning users is better than allowing users to choose their A/B test version.',
        'A test has 2,000 eligible users. Describe how you would randomly divide them into two equal groups.',
        'Design a randomized experiment that tests whether personalized recommendations increase purchases. Explain the randomization unit and how you would prevent users from switching groups.',
      ],
      questions: [
        {
          q: 'What is randomization in experimental design?',
          a: 'Randomization is the chance-based assignment of participants or experimental units to different treatment groups. It helps create comparable groups and reduce selection bias.',
          followUp:
            'Does randomization guarantee that every characteristic will be identical across groups?',
        },
        {
          q: 'Why is randomization important in A/B testing?',
          a: 'It reduces systematic differences between groups before the treatment is applied, making it easier to attribute outcome differences to the treatment.',
          followUp:
            'What is the difference between randomization and random sampling?',
        },
        {
          q: 'What is selection bias?',
          a: 'Selection bias occurs when the process of selecting or assigning participants creates systematic differences between groups that affect the results.',
          followUp:
            'How can self-selection create bias in an experiment?',
        },
        {
          q: 'What is stratified randomization?',
          a: 'Stratified randomization divides participants into important subgroups, such as age groups or geographic regions, and then randomizes participants within each subgroup.',
          followUp:
            'When might stratified randomization be useful?',
        },
        {
          q: 'What is a randomization unit?',
          a: 'A randomization unit is the entity that receives the random assignment, such as an individual user, household, account, store, or geographic region.',
          followUp:
            'Why should the randomization unit match the way treatment is delivered?',
        },
      ],
      code: `import numpy as np
import pandas as pd

np.random.seed(42)

# Create sample user IDs
users = pd.DataFrame({
    "user_id": range(1, 1001)
})

# Randomly assign users to two groups
users["group"] = np.random.choice(
    ["Control", "Treatment"],
    size=len(users),
    p=[0.5, 0.5]
)

print(users.head())

# Check group sizes
print(users["group"].value_counts())

# Check assignment proportions
print(users["group"].value_counts(normalize=True))`,
      pitfalls: [
        'Allowing participants to choose their own experimental group.',
        'Changing a participant assignment during the experiment.',
        'Randomizing at the wrong level, such as individual page views instead of users.',
        'Assuming randomization guarantees perfectly balanced groups in every sample.',
        'Ignoring interference between participants, such as users sharing treatment experiences.',
        'Failing to persist assignments in a digital experiment.',
      ],
    }),

    lesson({
      slug: 'control-group-vs-treatment-group',
      title: 'Control Group vs Treatment Group',
      summary:
        'Learn the difference between baseline and intervention groups and how comparing them helps estimate the effect of an experiment.',
      definition:
        'A control group is the group that receives the existing, standard, or baseline condition in an experiment. A treatment group is the group that receives the new intervention or change being evaluated. Comparing outcomes between these groups helps estimate the effect of the treatment.',
      why:
        'Without a suitable control group, it is difficult to know whether an observed improvement happened because of the new intervention or because of external factors such as seasonality, market changes, or general user behavior.',
      purpose:
        'The purpose is to establish a baseline for comparison and estimate how much an intervention changes the outcome relative to what would have happened under the control condition.',
      when: [
        'When evaluating a new website or application feature.',
        'When comparing a new marketing campaign with an existing campaign.',
        'When testing a pricing or checkout change.',
        'When measuring the impact of training or educational programs.',
        'When conducting clinical or scientific experiments.',
      ],
      simpleExample:
        'An online store wants to test a new discount banner. The control group sees the existing store page, while the treatment group sees the new discount banner. If the treatment group has a higher purchase rate, the company can estimate the effect of showing the new banner.',
      detail:
        'The treatment effect is often estimated as the difference between the average outcome in the treatment group and the average outcome in the control group. In a randomized experiment, this difference can estimate the average causal effect under suitable assumptions. The control condition should be clearly defined, and other aspects of the experience should remain consistent whenever possible.',
      realLife: {
        problem:
          'A food delivery company wants to know whether offering free delivery to selected users increases the number of completed orders.',
        approach: [
          'Define a control group that receives the standard delivery fee.',
          'Define a treatment group that receives the free-delivery offer.',
          'Randomly assign eligible users to the two groups.',
          'Measure completed orders per eligible user.',
          'Compare average outcomes between groups.',
        ],
        outcome:
          'The company estimates the effect of the free-delivery offer and can evaluate whether the additional orders justify its cost.',
      },
      tasks: [
        'Explain the difference between a control group and a treatment group using an email marketing example.',
        'The control group has an average purchase rate of 8%, while the treatment group has 10%. Calculate the absolute treatment effect in percentage points.',
        'Design an experiment to test a new mobile app feature. Specify the control experience, treatment experience, outcome metric, and comparison method.',
      ],
      questions: [
        {
          q: 'What is a control group?',
          a: 'A control group receives the baseline or standard condition and provides a comparison for evaluating the effect of an intervention.',
          followUp:
            'Why is a control group important in a randomized experiment?',
        },
        {
          q: 'What is a treatment group?',
          a: 'A treatment group receives the new intervention or change being evaluated in the experiment.',
          followUp:
            'Can an experiment have multiple treatment groups?',
        },
        {
          q: 'What is treatment effect?',
          a: 'Treatment effect is the difference in outcomes attributable to receiving the treatment. In a simple randomized experiment, it is often estimated by comparing average outcomes between treatment and control groups.',
          followUp:
            'What is the difference between an absolute effect and a relative effect?',
        },
        {
          q: 'Can a control group receive a placebo?',
          a: 'Yes. In many experiments, especially clinical trials, the control group receives a placebo or another standard condition to provide a suitable comparison.',
          followUp:
            'Why might a placebo be useful in a clinical experiment?',
        },
        {
          q: 'What is the difference between a control group and a baseline measurement?',
          a: 'A control group is a separate comparison group. A baseline measurement is an observation collected before treatment. They serve different purposes and are not interchangeable.',
          followUp:
            'Why can comparing before-and-after measurements alone be misleading?',
        },
      ],
      code: `import numpy as np
from scipy.stats import ttest_ind

np.random.seed(42)

# Simulated outcome: purchases per user
control = np.random.normal(
    loc=4.0,
    scale=1.5,
    size=500
)

treatment = np.random.normal(
    loc=4.5,
    scale=1.5,
    size=500
)

# Average outcomes
control_mean = control.mean()
treatment_mean = treatment.mean()

# Estimated treatment effect
treatment_effect = treatment_mean - control_mean

# Welch's independent samples t-test
result = ttest_ind(
    treatment,
    control,
    equal_var=False
)

print("Control mean:", control_mean)
print("Treatment mean:", treatment_mean)
print("Estimated treatment effect:", treatment_effect)
print("P-value:", result.pvalue)`,
      pitfalls: [
        'Comparing groups that differ systematically before treatment.',
        'Changing several factors between control and treatment without a suitable design.',
        'Using a control group that does not represent the relevant baseline condition.',
        'Confusing a before-and-after comparison with a randomized control comparison.',
        'Ignoring treatment costs or negative secondary outcomes.',
      ],
    }),

    lesson({
      slug: 'statistical-significance',
      title: 'Statistical Significance',
      summary:
        'Understand p-values, significance levels, and how statistical tests help determine whether observed differences are inconsistent with a null hypothesis.',
      definition:
        'Statistical significance is a statistical decision about whether observed data provide sufficient evidence against a specified null hypothesis at a chosen significance level. A result is commonly called statistically significant when its p-value is less than or equal to the chosen alpha level.',
      why:
        'Observed differences between experimental groups can occur because of random variation. Statistical significance helps evaluate whether the data are sufficiently inconsistent with a null hypothesis, rather than treating every observed difference as a real effect.',
      purpose:
        'The purpose is to provide a structured method for evaluating evidence against a null hypothesis while controlling the long-run Type I error rate at a chosen significance level under the test assumptions.',
      when: [
        'When comparing conversion rates in A/B testing.',
        'When evaluating differences between experimental groups.',
        'When testing whether a new feature changes a business metric.',
        'When analyzing relationships between variables.',
        'When deciding whether experimental evidence supports rejecting a null hypothesis.',
      ],
      simpleExample:
        'A company tests two checkout pages and observes a higher conversion rate in Version B. It performs a statistical test and obtains a p-value of 0.03. If the significance level is 0.05 and the test assumptions are satisfied, the result is statistically significant because 0.03 is less than 0.05.',
      detail:
        'The null hypothesis usually represents no effect or no difference. The alternative hypothesis represents the effect or difference being investigated. The p-value is the probability, assuming the null hypothesis and test assumptions are true, of obtaining a result at least as extreme as the observed result. A p-value is not the probability that the null hypothesis is true. Statistical significance also does not establish that an effect is large or practically useful.',
      realLife: {
        problem:
          'An e-commerce company observes that a new product page appears to increase purchases but wants to determine whether the difference is statistically significant.',
        approach: [
          'Define the null hypothesis that the conversion rates are equal.',
          'Define the alternative hypothesis that the conversion rates differ.',
          'Choose a significance level before analyzing the data.',
          'Select an appropriate statistical test for the metric and design.',
          'Calculate the test statistic and p-value.',
          'Interpret the result alongside the effect size and confidence interval.',
        ],
        outcome:
          'The company determines whether its data provide sufficient evidence against the no-difference hypothesis at the selected significance level.',
      },
      tasks: [
        'Explain statistical significance and the meaning of a p-value in simple language.',
        'An A/B test produces a p-value of 0.02 using a significance level of 0.05. State the statistical decision and explain what it does not prove.',
        'Compare two conversion rates using a two-proportion z-test. Define the null hypothesis, alternative hypothesis, significance level, and interpretation.',
      ],
      questions: [
        {
          q: 'What is statistical significance?',
          a: 'Statistical significance means that the observed data provide sufficient evidence against a null hypothesis at a predefined significance level, assuming the test assumptions hold.',
          followUp:
            'Does statistical significance guarantee that an experiment has a meaningful business impact?',
        },
        {
          q: 'What is a p-value?',
          a: 'A p-value is the probability, assuming the null hypothesis and test assumptions are true, of obtaining a result at least as extreme as the one observed.',
          followUp:
            'Why is a p-value not the probability that the null hypothesis is true?',
        },
        {
          q: 'What is the significance level?',
          a: 'The significance level, usually represented by alpha, is the chosen threshold for controlling the long-run probability of a Type I error when the null hypothesis is true and the test assumptions hold.',
          followUp:
            'What happens if we choose alpha = 0.01 instead of alpha = 0.05?',
        },
        {
          q: 'What is a Type I error?',
          a: 'A Type I error occurs when a true null hypothesis is rejected. Its long-run probability is controlled by the significance level under the test assumptions.',
          followUp:
            'What is a Type II error?',
        },
        {
          q: 'What is a confidence interval?',
          a: 'A confidence interval is a range produced by a statistical procedure that, under repeated sampling and its assumptions, contains the true parameter at the stated confidence level in the specified proportion of samples.',
          followUp:
            'How can a confidence interval help interpret an A/B test?',
        },
      ],
      code: `from statsmodels.stats.proportion import proportions_ztest

# A/B test conversion data
conversions = [120, 145]
visitors = [1000, 1000]

# H0: Conversion rates are equal
# H1: Conversion rates are different

z_stat, p_value = proportions_ztest(
    count=conversions,
    nobs=visitors,
    alternative="two-sided"
)

alpha = 0.05

print("Z-statistic:", z_stat)
print("P-value:", p_value)

if p_value <= alpha:
    print("Reject the null hypothesis.")
    print("The difference is statistically significant.")
else:
    print("Fail to reject the null hypothesis.")
    print("There is insufficient evidence of a difference.")`,
      pitfalls: [
        'Interpreting the p-value as the probability that the null hypothesis is true.',
        'Assuming a statistically significant result is automatically important to the business.',
        'Treating a non-significant result as proof that there is no effect.',
        'Repeatedly checking p-values and stopping as soon as significance appears without a valid sequential testing plan.',
        'Ignoring multiple comparisons when testing many metrics or variants.',
        'Selecting the significance level after seeing the results.',
      ],
    }),

    lesson({
      slug: 'practical-significance',
      title: 'Practical Significance',
      summary:
        'Learn why statistical evidence alone is not enough and how to evaluate whether an observed effect is large enough to matter in real-world decisions.',
      definition:
        'Practical significance refers to whether an observed effect is large enough to be meaningful or useful in a real-world context. It considers the magnitude of the effect, business value, implementation costs, risks, and operational constraints rather than relying only on statistical significance.',
      why:
        'A very small effect can become statistically significant when the sample size is extremely large. However, implementing a change may not be worthwhile if the improvement is too small to justify its cost or complexity.',
      purpose:
        'The purpose is to evaluate whether an effect has enough real-world value to justify a business, product, or operational decision.',
      when: [
        'When interpreting A/B testing results.',
        'When deciding whether to launch a new product feature.',
        'When comparing business improvements with implementation costs.',
        'When evaluating small but statistically significant differences.',
        'When assessing whether an improvement justifies operational risk.',
      ],
      simpleExample:
        'A website redesign increases conversion rate from 10.00% to 10.05%. With millions of visitors, this difference might be statistically significant. However, if redesigning the website costs a large amount of money, the additional conversions may not justify the expense. The effect may be statistically significant but not practically significant.',
      detail:
        'Practical significance is context-dependent. It can be evaluated using absolute effect size, relative improvement, expected revenue or cost savings, implementation costs, confidence intervals, and predefined minimum meaningful effects. A useful experiment defines the smallest effect worth acting on before data collection begins.',
      realLife: {
        problem:
          'An online retailer runs an experiment that produces a statistically significant increase in conversion rate, but the improvement is very small and requires expensive engineering work.',
        approach: [
          'Calculate the absolute and relative change in conversion rate.',
          'Estimate the number of additional purchases expected.',
          'Calculate the expected financial benefit.',
          'Compare expected benefits with implementation and maintenance costs.',
          'Evaluate risks and possible negative effects on other metrics.',
        ],
        outcome:
          'The retailer decides whether the improvement is valuable enough to justify the cost of launching the new experience.',
      },
      tasks: [
        'Explain the difference between statistical significance and practical significance.',
        'A redesign increases conversion from 5.0% to 5.1%. Calculate the absolute improvement in percentage points and relative improvement.',
        'An experiment increases annual profit by an estimated ₹50,000 but requires ₹2,00,000 in development and maintenance costs. Explain how you would evaluate whether the change is practically worthwhile.',
      ],
      questions: [
        {
          q: 'What is practical significance?',
          a: 'Practical significance describes whether an observed effect is large and valuable enough to matter in a real-world decision.',
          followUp:
            'Why should business costs be considered when evaluating practical significance?',
        },
        {
          q: 'What is the difference between statistical and practical significance?',
          a: 'Statistical significance evaluates evidence against a null hypothesis. Practical significance evaluates whether the size of the effect is meaningful in the real-world context.',
          followUp:
            'Can a result be statistically significant but not practically significant?',
        },
        {
          q: 'Can a non-significant result still be practically important?',
          a: 'Yes. A potentially important effect may fail to reach statistical significance when the sample is too small or the estimate is too uncertain. More data or a better-designed experiment may be needed.',
          followUp:
            'How does statistical power affect this situation?',
        },
        {
          q: 'What is effect size?',
          a: 'Effect size measures the magnitude of a difference or relationship. It helps describe how large an observed effect is rather than only whether it is statistically detectable.',
          followUp:
            'Why is effect size important when interpreting p-values?',
        },
        {
          q: 'How can practical significance be evaluated in an A/B test?',
          a: 'It can be evaluated by examining the absolute and relative effect, confidence interval, expected financial impact, implementation costs, risks, and the minimum improvement worth launching.',
          followUp:
            'What is a minimum detectable effect?',
        },
      ],
      code: `# Evaluate the practical impact of an A/B test

visitors = 100000

control_rate = 0.050
treatment_rate = 0.051

development_cost = 200000
profit_per_purchase = 500

# Absolute and relative improvement
absolute_improvement = (
    treatment_rate - control_rate
)

relative_improvement = (
    absolute_improvement / control_rate
)

# Expected additional purchases
additional_purchases = (
    visitors * absolute_improvement
)

# Expected additional profit
additional_profit = (
    additional_purchases * profit_per_purchase
)

net_benefit = additional_profit - development_cost

print(
    "Absolute improvement:",
    absolute_improvement * 100,
    "percentage points"
)

print(
    "Relative improvement:",
    relative_improvement * 100,
    "%"
)

print("Additional purchases:", additional_purchases)
print("Additional profit:", additional_profit)
print("Net benefit:", net_benefit)

if net_benefit > 0:
    print("Positive estimated financial impact.")
else:
    print("Estimated financial impact does not cover the cost.")`,
      pitfalls: [
        'Assuming statistical significance automatically means business value.',
        'Ignoring implementation and maintenance costs.',
        'Evaluating only relative improvement without checking absolute improvement.',
        'Ignoring uncertainty around the estimated effect.',
        'Choosing a minimum meaningful effect after seeing the results.',
        'Focusing on one metric while overlooking negative effects on other important metrics.',
      ],
    }),

    lesson({
      slug: 'sample-size',
      title: 'Sample Size',
      summary:
        'Understand how many observations are needed for an experiment to detect an effect with an acceptable level of precision and statistical power.',
      definition:
        'Sample size is the number of experimental units or observations included in a study. In experimental design, the required sample size is estimated using factors such as the expected effect size, outcome variability, significance level, desired statistical power, and experimental design.',
      why:
        'A sample that is too small may fail to detect a real effect, while an unnecessarily large sample can waste time, money, and resources. Planning sample size helps experiments produce sufficiently precise and informative results.',
      purpose:
        'The purpose is to determine how many observations are needed to detect a predefined effect or estimate a quantity with an acceptable level of uncertainty.',
      when: [
        'Before launching an A/B test.',
        'When planning clinical or scientific experiments.',
        'When comparing two conversion rates.',
        'When estimating population parameters with a desired margin of error.',
        'When balancing experiment cost against statistical reliability.',
      ],
      simpleExample:
        'Suppose a website has a conversion rate of 10%, and the company wants to detect an increase to 12%. Testing only 20 visitors per group may not provide enough information. A larger sample is needed to reliably detect a 2-percentage-point difference at the chosen significance level and power.',
      detail:
        'Sample size depends on the minimum detectable effect, significance level, desired power, and variability. Smaller effects generally require larger samples. Higher power and stricter significance thresholds also generally require larger samples. For a two-group comparison of means, variability matters; for conversion rates, the baseline rate and expected difference matter. Clustered or repeated observations may require design-effect adjustments.',
      realLife: {
        problem:
          'A digital marketing team wants to compare two advertising campaigns but needs to estimate how many users should be included before the experiment begins.',
        approach: [
          'Identify the primary metric and its baseline value.',
          'Define the minimum improvement worth detecting.',
          'Choose the significance level and desired power.',
          'Estimate variability or baseline conversion rate.',
          'Calculate the required sample size using an appropriate method.',
          'Adjust for expected attrition, clustering, or other design considerations.',
        ],
        outcome:
          'The team establishes a target sample size before running the experiment and avoids making decisions based on an inadequately sized test.',
      },
      tasks: [
        'Explain why sample size is important in A/B testing.',
        'A website has a baseline conversion rate of 10% and wants to detect an increase to 12%. Identify the inputs required to calculate sample size.',
        'Calculate the required sample size per group for two independent proportions using a baseline rate of 10%, a treatment rate of 12%, a 5% significance level, and 80% power.',
      ],
      questions: [
        {
          q: 'What is sample size?',
          a: 'Sample size is the number of experimental units or observations included in a study or experiment.',
          followUp:
            'Why is sample size planning important before an A/B test?',
        },
        {
          q: 'What factors affect required sample size?',
          a: 'Important factors include the expected effect size, data variability, significance level, desired statistical power, and the experimental design.',
          followUp:
            'How does a smaller minimum detectable effect affect sample size?',
        },
        {
          q: 'What is the minimum detectable effect?',
          a: 'The minimum detectable effect is the smallest effect that an experiment is designed to detect with a specified statistical power and significance level.',
          followUp:
            'Why should the minimum detectable effect be chosen before the experiment?',
        },
        {
          q: 'What happens when the sample size is too small?',
          a: 'The experiment may have low statistical power, wide confidence intervals, and a higher chance of failing to detect a real effect.',
          followUp:
            'Can a small sample still produce a statistically significant result?',
        },
        {
          q: 'Does a larger sample size always make an experiment better?',
          a: 'A larger sample can improve precision and power, but it does not correct poor randomization, measurement errors, selection bias, or a badly designed experiment.',
          followUp:
            'Why can a very large sample make tiny effects statistically significant?',
        },
      ],
      code: `from statsmodels.stats.power import NormalIndPower
from statsmodels.stats.proportion import proportion_effectsize

# Expected conversion rates
control_rate = 0.10
treatment_rate = 0.12

# Effect size for two independent proportions
effect_size = proportion_effectsize(
    treatment_rate,
    control_rate
)

# Sample size calculation
analysis = NormalIndPower()

sample_size = analysis.solve_power(
    effect_size=abs(effect_size),
    power=0.80,
    alpha=0.05,
    ratio=1.0,
    alternative="two-sided"
)

print(
    "Required sample size per group:",
    round(sample_size)
)

print(
    "Total required sample size:",
    2 * round(sample_size)
)`,
      pitfalls: [
        'Choosing sample size without defining a minimum detectable effect.',
        'Ignoring the baseline conversion rate or outcome variability.',
        'Assuming a small sample is sufficient because the observed difference looks large.',
        'Increasing sample size after seeing unfavorable results without a valid plan.',
        'Forgetting to account for attrition, clustering, or repeated measurements.',
        'Assuming a larger sample fixes biased assignment or poor measurement.',
      ],
    }),

    lesson({
      slug: 'power-analysis',
      title: 'Power Analysis',
      summary:
        'Learn how statistical power measures an experiment’s ability to detect a real effect and how power analysis helps plan reliable studies.',
      definition:
        'Power analysis is a statistical method used to determine the probability that a test will correctly reject a false null hypothesis for a specified effect size and significance level. Statistical power is commonly represented as 1 - beta, where beta is the probability of a Type II error.',
      why:
        'An experiment may fail to detect a real effect simply because it does not have enough observations or because the effect is difficult to distinguish from random variation. Power analysis helps plan experiments that have a reasonable chance of detecting effects that matter.',
      purpose:
        'The purpose is to estimate the sample size needed for a desired power or understand how sample size, effect size, variability, and significance level affect an experiment’s ability to detect an effect.',
      when: [
        'Before conducting an A/B test.',
        'When determining sample size for a clinical trial.',
        'When comparing two group means or proportions.',
        'When evaluating the risk of Type II errors.',
        'When planning experiments with limited time or resources.',
      ],
      simpleExample:
        'Suppose a company plans an A/B test with 80% statistical power. If the true effect equals the minimum detectable effect used in the power calculation, the test has an 80% probability of rejecting the null hypothesis under the specified assumptions. It has a 20% probability of failing to reject the null hypothesis in that situation.',
      detail:
        'Power depends on effect size, sample size, variability, significance level, and the statistical test. Increasing sample size, increasing the true effect size, or reducing variability generally increases power. Lowering alpha generally reduces power if other factors remain fixed. A common planning convention is 80% or 90% power, but the appropriate value depends on the consequences of missed effects and the cost of experimentation.',
      realLife: {
        problem:
          'A product team plans to test a new recommendation algorithm but wants to avoid running an experiment that is too small to detect an improvement that would justify the development cost.',
        approach: [
          'Define the null and alternative hypotheses.',
          'Choose the minimum effect worth detecting.',
          'Select the significance level.',
          'Choose a target power, such as 80% or 90%.',
          'Estimate the sample size using the expected variability and test design.',
          'Check whether the required sample size is achievable within the planned experiment duration.',
        ],
        outcome:
          'The team launches an experiment with a planned ability to detect a meaningful improvement under the chosen assumptions.',
      },
      tasks: [
        'Explain statistical power and its relationship with Type II error.',
        'An experiment has 80% power. Explain what this means when the true effect equals the effect used in the power calculation.',
        'Use Python to calculate the sample size required for 90% power when comparing two independent groups with a specified effect size and significance level.',
      ],
      questions: [
        {
          q: 'What is statistical power?',
          a: 'Statistical power is the probability of correctly rejecting a false null hypothesis for a specified alternative effect and under the assumptions of the test. It is equal to 1 - beta.',
          followUp:
            'What does 80% statistical power mean?',
        },
        {
          q: 'What is a Type II error?',
          a: 'A Type II error occurs when a false null hypothesis is not rejected. Its probability is represented by beta.',
          followUp:
            'How does increasing sample size generally affect Type II error?',
        },
        {
          q: 'What is the relationship between power and sample size?',
          a: 'For a fixed effect size, significance level, and variability, increasing sample size generally increases statistical power.',
          followUp:
            'Can power be increased without collecting more observations?',
        },
        {
          q: 'What factors affect statistical power?',
          a: 'The main factors are effect size, sample size, variability, significance level, and the statistical test or experimental design.',
          followUp:
            'How does reducing measurement noise affect power?',
        },
        {
          q: 'What is the difference between power analysis and sample size calculation?',
          a: 'Power analysis is the broader process of examining relationships among power, effect size, sample size, significance level, and variability. Sample size calculation is one common use of power analysis.',
          followUp:
            'Can power analysis be used after an experiment has been completed?',
        },
      ],
      code: `from statsmodels.stats.power import TTestIndPower

# Independent two-group comparison
analysis = TTestIndPower()

# Cohen's d effect size
effect_size = 0.5

# Calculate required sample size per group
sample_size = analysis.solve_power(
    effect_size=effect_size,
    power=0.90,
    alpha=0.05,
    ratio=1.0,
    alternative="two-sided"
)

print(
    "Required sample size per group:",
    round(sample_size)
)

# Calculate power for a fixed sample size
calculated_power = analysis.power(
    effect_size=effect_size,
    nobs1=100,
    alpha=0.05,
    ratio=1.0,
    alternative="two-sided"
)

print("Power with 100 per group:", calculated_power)

# Calculate power for different sample sizes
for size in [30, 50, 100, 200]:
    power = analysis.power(
        effect_size=effect_size,
        nobs1=size,
        alpha=0.05,
        ratio=1.0
    )

    print(f"Sample size {size}: Power = {power:.3f}")`,
      pitfalls: [
        'Confusing statistical power with the probability that the research hypothesis is true.',
        'Assuming 80% power guarantees that an experiment will detect an effect.',
        'Ignoring the effect size used in the power calculation.',
        'Choosing power without considering the cost of missing a meaningful effect.',
        'Treating observed post-hoc power as a substitute for interpreting the confidence interval and p-value.',
        'Using a power calculation that does not match the actual experimental design or statistical test.',
      ],
    }),
  ],
}

export default ch