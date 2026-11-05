
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
  id: 'hypothesistesting',
  number: 4,
  title: 'Hypothesis Testing',
  tagline:
    'Learn how to test assumptions, interpret statistical evidence, measure uncertainty, and make data-driven decisions.',
  priority: 'extreme',

  topics: [
    // --------------------------------------------------
    // 1. INTRODUCTION TO HYPOTHESIS TESTING
    // --------------------------------------------------
    lesson({
      slug: 'hypothesis-testing-introduction',
      title: 'Introduction to Hypothesis Testing',
      summary:
        'Understand how statisticians use sample data to test claims about a larger population.',

      definition:
        'Hypothesis testing is a statistical method used to evaluate a claim about a population using sample data. It helps us decide whether the observed evidence is strong enough to reject an initial assumption.',

      why:
        'In data analysis, we often observe differences between groups, changes in sales, or improvements in performance. However, these differences may happen because of random variation. Hypothesis testing helps us evaluate whether the evidence supports a real effect.',

      purpose:
        'To make informed decisions about a population using sample evidence rather than relying only on assumptions or observations.',

      when: [
        'When comparing the performance of two marketing campaigns.',
        'When testing whether a new website design improves conversions.',
        'When checking whether average salaries differ between two departments.',
        'When evaluating whether a new product or process has improved performance.',
      ],

      simpleExample:
        'A company claims that its average delivery time is 30 minutes. An analyst collects a sample of deliveries and tests whether the population average is actually different from 30 minutes.',

      realLife: {
        problem:
          'An e-commerce company wants to know whether its new checkout design increases the percentage of visitors who purchase products.',
        approach: [
          'Collect customer conversion data using the old and new checkout designs.',
          'Define the null and alternative hypotheses.',
          'Choose a significance level before analyzing the results.',
          'Perform an appropriate statistical test.',
          'Compare the p-value with the significance level.',
        ],
        outcome:
          'The company gets statistical evidence to help decide whether the new checkout design improves conversion rates.',
      },

      tasks: [
        'A company claims that its average delivery time is 30 minutes. Explain how you would test this claim.',
        'A marketing team wants to compare two advertising campaigns. Identify the population, sample, and claim being tested.',
        'Design a simple hypothesis-testing experiment to determine whether a new website design increases sales conversions.',
      ],

      questions: [
        {
          q: 'What is hypothesis testing?',
          a: 'It is a statistical method used to evaluate a claim about a population using sample data.',
        },
        {
          q: 'Why do we use hypothesis testing?',
          a: 'To determine whether observed differences or effects provide sufficient statistical evidence or could reasonably be due to random variation.',
        },
        {
          q: 'What are the basic steps of hypothesis testing?',
          a: 'Define H0 and H1, select alpha, collect data, calculate a test statistic and p-value, make a decision, and interpret the result in context.',
        },
        {
          q: 'What is the difference between descriptive and inferential statistics?',
          a: 'Descriptive statistics summarize observed data. Inferential statistics use sample data to estimate or test claims about a population.',
        },
      ],

      detail:
        'A hypothesis test does not prove a claim with absolute certainty. It evaluates how compatible the observed sample data is with a specified null hypothesis, under the assumptions of the chosen test.',

      pitfalls: [
        'Do not assume every observed difference is statistically significant.',
        'Use a representative sample whenever possible.',
        'Statistical significance does not automatically mean business importance.',
      ],
    }),

    // --------------------------------------------------
    // 2. NULL HYPOTHESIS
    // --------------------------------------------------
    lesson({
      slug: 'null-hypothesis',
      title: 'Null Hypothesis (H0)',
      summary:
        'Understand the default assumption that there is no effect, difference, or relationship.',

      definition:
        'The null hypothesis (H0) is the initial statistical assumption that there is no effect, no difference, or no relationship in the population. It is the assumption we test using sample data.',

      why:
        'We need a starting point before deciding whether an observed result is unusual. The null hypothesis provides that starting point and helps us evaluate evidence objectively.',

      purpose:
        'To establish a baseline assumption that can be tested using statistical evidence.',

      when: [
        'When comparing average sales between two stores.',
        'When testing whether a new advertisement changes conversion rates.',
        'When checking whether a training program improves employee performance.',
        'When investigating whether two variables are related.',
      ],

      simpleExample:
        'A company wants to test whether its new website design changes conversion rates. H0: The new website design does not change the population conversion rate.',

      realLife: {
        problem:
          'A company believes its new advertisement may increase monthly sales.',
        approach: [
          'Start with the assumption that the advertisement has no effect on average sales.',
          'Represent this assumption using H0.',
          'Collect sales data before and during the campaign using an appropriate comparison design.',
          'Perform a statistical test to evaluate the evidence.',
        ],
        outcome:
          'The company can evaluate whether there is sufficient evidence to reject the assumption that the advertisement has no effect.',
      },

      tasks: [
        'Write H0 for a company claim that the average delivery time is 30 minutes.',
        'Write the null hypothesis for a marketing campaign that is expected to have no effect on sales.',
        'A school wants to compare two teaching methods. Write H0 for the claim that both methods have the same average student score.',
      ],

      questions: [
        {
          q: 'What is the null hypothesis?',
          a: 'It is the default assumption that there is no effect, difference, or relationship in the population.',
        },
        {
          q: 'What symbol represents the null hypothesis?',
          a: 'H0, commonly written as H₀.',
        },
        {
          q: 'Does the null hypothesis usually contain equality?',
          a: 'Yes. It commonly contains equality, such as =, ≤, or ≥, depending on the test formulation.',
        },
        {
          q: 'Does failing to reject H0 mean that H0 is true?',
          a: 'No. It means the available evidence is insufficient to reject H0. It does not prove that H0 is true.',
        },
      ],

      detail:
        'Examples: H0: μ = 30 means the population mean is 30. H0: μA = μB means the two population means are equal. The exact null hypothesis depends on the research question.',

      pitfalls: [
        'Do not confuse a sample mean with a population mean.',
        'The null hypothesis is not automatically the researcher’s preferred claim.',
        'Failing to reject H0 does not prove that there is no effect.',
      ],
    }),

    // --------------------------------------------------
    // 3. ALTERNATIVE HYPOTHESIS
    // --------------------------------------------------
    lesson({
      slug: 'alternative-hypothesis',
      title: 'Alternative Hypothesis (H1)',
      summary:
        'Understand the competing hypothesis that represents an effect, difference, or relationship.',

      definition:
        'The alternative hypothesis (H1 or Ha) is the competing statement that an effect, difference, or relationship exists in the population.',

      why:
        'It represents the research question we want to investigate. It tells us what kind of result would provide evidence against the null hypothesis.',

      purpose:
        'To describe the effect or difference that the researcher wants to investigate.',

      when: [
        'When testing whether sales have increased.',
        'When checking whether delivery time has decreased.',
        'When comparing average performance between two groups.',
        'When investigating whether two variables have a relationship.',
      ],

      simpleExample:
        'H0: The new website design does not change conversion rates. H1: The new website design changes conversion rates. Here, H1 allows a difference in either direction.',

      realLife: {
        problem:
          'A training institute believes its new teaching method improves student exam scores.',
        approach: [
          'Define H0: The new method does not improve the population average score.',
          'Define H1: The new method improves the population average score.',
          'Collect results from students using the new method and a suitable comparison group.',
          'Analyze the results using an appropriate statistical test.',
        ],
        outcome:
          'The institute can assess whether there is sufficient evidence that the new teaching method improves scores.',
      },

      tasks: [
        'Write H1 for a claim that average delivery time is different from 30 minutes.',
        'Create H0 and H1 for a company claiming that its new campaign increases sales.',
        'Write H0 and H1 for a test investigating whether a new training method improves average employee performance.',
      ],

      questions: [
        {
          q: 'What is the alternative hypothesis?',
          a: 'It is the competing hypothesis that states an effect, difference, or relationship exists.',
        },
        {
          q: 'What symbol represents the alternative hypothesis?',
          a: 'H1 or Ha, commonly written as H₁ or Hₐ.',
        },
        {
          q: 'What symbols are commonly used in H1?',
          a: 'The symbols ≠, greater than (>), and less than (<), depending on the research question.',
        },
        {
          q: 'Can we prove that H1 is true?',
          a: 'No. We can find sufficient evidence to reject H0 in favor of H1, but statistical testing does not provide absolute proof.',
        },
      ],

      detail:
        'Three common forms are H1: μ ≠ 30 (a difference in either direction), H1: μ > 30 (greater than 30), and H1: μ < 30 (less than 30).',

      pitfalls: [
        'Choose the alternative hypothesis based on the research question.',
        'Do not select the direction after looking at the results.',
        'Rejecting H0 does not prove every part of a broader research explanation.',
      ],
    }),

    // --------------------------------------------------
    // 4. P-VALUE
    // --------------------------------------------------
    lesson({
      slug: 'p-value',
      title: 'P-value',
      summary:
        'Learn how to interpret the probability of observing results at least as extreme as yours, assuming H0 is true.',

      definition:
        'The p-value is the probability, assuming the null hypothesis is true, of obtaining a result at least as extreme as the observed result under the chosen statistical test.',

      why:
        'A sample result may differ from the expected value because of random variation. The p-value helps us understand how unusual the observed result would be if H0 were true.',

      purpose:
        'To measure how strongly the observed data provides evidence against the null hypothesis.',

      when: [
        'When interpreting the result of a statistical test.',
        'When comparing a p-value with the significance level.',
        'When evaluating A/B testing results.',
        'When analyzing differences between groups.',
      ],

      simpleExample:
        'Suppose a test produces p = 0.03. This means that if H0 were true, the probability of obtaining results at least as extreme as the observed results is 3%, under the test assumptions.',

      realLife: {
        problem:
          'A marketing team wants to know whether a new advertisement changes the website conversion rate.',
        approach: [
          'Run an experiment with a suitable comparison group.',
          'Collect conversion data.',
          'Perform a statistical test and calculate the p-value.',
          'Compare the p-value with the chosen significance level.',
        ],
        outcome:
          'The marketing team can assess whether the experiment provides sufficient statistical evidence of a change in conversion rate.',
      },

      tasks: [
        'A statistical test gives p = 0.04. Explain what this means in simple language, assuming H0 is true.',
        'A test produces p = 0.20. Explain why this is not strong evidence against H0.',
        'Explain why a p-value of 0.03 does not mean there is a 3% probability that H0 is true.',
      ],

      questions: [
        {
          q: 'What is a p-value?',
          a: 'It is the probability of obtaining results at least as extreme as the observed results, assuming H0 is true.',
        },
        {
          q: 'What does a small p-value indicate?',
          a: 'It indicates that the observed data would be relatively unusual if H0 were true, providing stronger evidence against H0.',
        },
        {
          q: 'Does p = 0.03 mean H0 has a 3% chance of being true?',
          a: 'No. The p-value is calculated assuming H0 is true. It is not the probability that H0 itself is true.',
        },
        {
          q: 'What is the difference between p-value and alpha?',
          a: 'The p-value is calculated from the sample data. Alpha is a threshold selected before the test to guide the decision.',
        },
      ],

      detail:
        'A smaller p-value generally indicates stronger evidence against H0. However, it does not tell us the size or practical importance of an effect. Always consider the effect size, confidence interval, sample size, and study design.',

      pitfalls: [
        'A p-value is not the probability that H0 is true.',
        'A p-value of 0.05 does not mean the result is 95% accurate.',
        'A small p-value does not automatically mean a large business impact.',
        'A large p-value does not prove that H0 is true.',
      ],
    }),

    // --------------------------------------------------
    // 5. SIGNIFICANCE LEVEL
    // --------------------------------------------------
    lesson({
      slug: 'significance-level-alpha',
      title: 'Significance Level (Alpha)',
      summary:
        'Understand how alpha sets the decision threshold for rejecting the null hypothesis.',

      definition:
        'The significance level (α) is a threshold selected before conducting a hypothesis test. It represents the maximum long-run probability of a Type I error under the null hypothesis for the chosen testing procedure.',

      why:
        'Without a predefined threshold, it would be easy to make decisions inconsistently after seeing the results. Alpha gives us a clear rule for deciding whether the evidence is statistically significant.',

      purpose:
        'To control the risk of incorrectly rejecting a true null hypothesis and establish the evidence threshold for a test.',

      when: [
        'Before conducting a hypothesis test.',
        'When comparing a p-value with a decision threshold.',
        'When designing medical or scientific experiments.',
        'When deciding how much false-positive risk is acceptable.',
      ],

      simpleExample:
        'Suppose α = 0.05 and the calculated p-value = 0.03. Since 0.03 is smaller than 0.05, we reject H0. The result is statistically significant at the 5% level.',

      realLife: {
        problem:
          'A pharmaceutical research team needs to decide how strong the evidence must be before declaring that a treatment has an effect.',
        approach: [
          'Choose a significance level of 0.01 before conducting the experiment.',
          'Collect the required sample data.',
          'Perform the appropriate statistical test.',
          'Compare the p-value with 0.01.',
        ],
        outcome:
          'The research team uses a stricter statistical threshold to reduce the risk of a false-positive conclusion.',
      },

      tasks: [
        'If α = 0.05 and p = 0.02, decide whether to reject H0.',
        'If α = 0.01 and p = 0.04, make the correct decision and explain why.',
        'Explain why choosing alpha after looking at the p-value can lead to biased conclusions.',
      ],

      questions: [
        {
          q: 'What is the significance level?',
          a: 'It is a threshold selected before testing that controls the Type I error probability under H0.',
        },
        {
          q: 'What is the most commonly used significance level?',
          a: '0.05 is commonly used, although 0.01 and 0.10 are also used depending on the situation.',
        },
        {
          q: 'What does alpha = 0.05 mean?',
          a: 'It means the testing procedure has a 5% long-run Type I error rate when H0 is true, assuming its conditions hold.',
        },
        {
          q: 'What is the decision rule using alpha?',
          a: 'If p-value ≤ alpha, reject H0. If p-value > alpha, fail to reject H0.',
        },
      ],

      detail:
        'Common significance levels are 0.10 (10%), 0.05 (5%), and 0.01 (1%). A smaller alpha creates a stricter rejection threshold and generally reduces the chance of a Type I error, but can increase the chance of a Type II error if other factors remain unchanged.',

      pitfalls: [
        'Select alpha before examining the results.',
        'Alpha is not the probability that the research conclusion is wrong.',
        'A smaller alpha does not automatically make an entire study better.',
      ],
    }),

    // --------------------------------------------------
    // 6. TYPE I ERROR
    // --------------------------------------------------
    lesson({
      slug: 'type-one-error',
      title: 'Type I Error (False Positive)',
      summary:
        'Understand the mistake of rejecting a null hypothesis that is actually true.',

      definition:
        'A Type I error occurs when we reject H0 even though H0 is actually true. It is also known as a false positive.',

      why:
        'It helps us understand the risk of incorrectly identifying an effect or difference that does not actually exist.',

      purpose:
        'To identify and control the risk of making false-positive statistical conclusions.',

      when: [
        'When interpreting statistical test decisions.',
        'When evaluating scientific experiments.',
        'When checking false alarms in fraud detection.',
        'When choosing the significance level for a test.',
      ],

      simpleExample:
        'A company concludes that its new advertisement increases sales, but in reality the advertisement has no effect. The company has made a Type I error.',

      realLife: {
        problem:
          'A fraud detection system incorrectly flags a genuine customer transaction as fraudulent.',
        approach: [
          'Treat the incorrect fraud alert as a false positive.',
          'Review the detection threshold and testing process.',
          'Evaluate how frequently genuine transactions are incorrectly flagged.',
        ],
        outcome:
          'The company can understand and control the cost of false alarms while improving its fraud detection process.',
      },

      tasks: [
        'Give an example of Type I error in a marketing campaign.',
        'Explain the relationship between alpha and Type I error.',
        'A medical test incorrectly identifies a healthy person as having a disease. Identify the error and explain its consequence.',
      ],

      questions: [
        {
          q: 'What is a Type I error?',
          a: 'Rejecting a true null hypothesis. It is also called a false positive.',
        },
        {
          q: 'What symbol represents the probability of Type I error?',
          a: 'Alpha (α).',
        },
        {
          q: 'How can we control Type I error?',
          a: 'Choose an appropriate significance level before testing and follow the assumptions of the statistical procedure.',
        },
        {
          q: 'What is an example of a Type I error in business?',
          a: 'Concluding that a new marketing campaign improves sales when it actually has no effect.',
        },
      ],

      detail:
        'Think of Type I error as a false alarm: the test reports evidence of an effect even though the null hypothesis is true. If alpha is 0.05, the procedure has a 5% Type I error probability under H0, assuming the test conditions hold.',

      pitfalls: [
        'Type I error is not the same as a calculation mistake.',
        'A false positive can have financial, medical, or operational consequences.',
        'Reducing alpha generally reduces the Type I error probability but may increase Type II error probability.',
      ],
    }),

    // --------------------------------------------------
    // 7. TYPE II ERROR
    // --------------------------------------------------
    lesson({
      slug: 'type-two-error',
      title: 'Type II Error (False Negative)',
      summary:
        'Understand the mistake of failing to reject a null hypothesis that is actually false.',

      definition:
        'A Type II error occurs when we fail to reject H0 even though H0 is actually false. It is also known as a false negative and its probability is represented by beta (β).',

      why:
        'It helps us understand the risk of missing a real effect or difference because the available evidence is not strong enough.',

      purpose:
        'To identify the possibility that a statistical test may fail to detect a genuine effect.',

      when: [
        'When designing experiments and deciding sample size.',
        'When comparing two marketing campaigns.',
        'When evaluating medical tests.',
        'When interpreting results that are not statistically significant.',
      ],

      simpleExample:
        'A new marketing campaign really increases sales, but the statistical test fails to detect the improvement. This is a Type II error.',

      realLife: {
        problem:
          'A medical screening test fails to identify a person who actually has a disease.',
        approach: [
          'Recognize the missed detection as a false negative.',
          'Evaluate the sensitivity and statistical design of the test.',
          'Review whether the sample size and testing threshold are suitable.',
        ],
        outcome:
          'Understanding false negatives helps researchers improve testing procedures and reduce the risk of missing genuine effects.',
      },

      tasks: [
        'Give an example of Type II error in a medical test.',
        'Explain the difference between Type I and Type II errors using a marketing example.',
        'A new product genuinely improves customer retention, but the experiment does not detect the improvement. Identify the error and suggest how the experiment could be improved.',
      ],

      questions: [
        {
          q: 'What is a Type II error?',
          a: 'Failing to reject a false null hypothesis. It is also called a false negative.',
        },
        {
          q: 'What symbol represents Type II error probability?',
          a: 'Beta (β).',
        },
        {
          q: 'How is Type II error different from Type I error?',
          a: 'Type I rejects a true H0. Type II fails to reject a false H0.',
        },
        {
          q: 'Can increasing sample size reduce Type II error?',
          a: 'Yes. A larger sample often increases statistical power and reduces the probability of Type II error, assuming other conditions are comparable.',
        },
      ],

      detail:
        'Type II error depends on factors such as sample size, effect size, variability, and significance level. A non-significant result may mean that no meaningful effect exists, or that the study did not have enough power to detect it.',

      pitfalls: [
        'Failing to reject H0 does not prove that H0 is true.',
        'A small sample can make real effects harder to detect.',
        'A non-significant result should be interpreted alongside its confidence interval and effect size.',
      ],
    }),

    // --------------------------------------------------
    // 8. STATISTICAL POWER
    // --------------------------------------------------
    lesson({
      slug: 'statistical-power',
      title: 'Statistical Power',
      summary:
        'Understand the ability of a statistical test to detect a real effect when one exists.',

      definition:
        'Statistical power is the probability of correctly rejecting H0 when H0 is false. It is calculated as 1 − β, where beta is the probability of Type II error.',

      why:
        'A test with low power may fail to detect a genuine effect. This can lead researchers to overlook useful improvements or important differences.',

      purpose:
        'To evaluate whether an experiment has a reasonable chance of detecting an effect of a specified size.',

      when: [
        'Before conducting an A/B test.',
        'When deciding how many participants or customers to include.',
        'When designing scientific experiments.',
        'When evaluating whether a non-significant result is informative.',
      ],

      simpleExample:
        'If statistical power is 0.80, the test has an 80% probability of detecting the specified effect when that effect truly exists, assuming the study design and assumptions hold.',

      realLife: {
        problem:
          'An e-commerce company wants to test whether a small change in its checkout process improves conversion rates.',
        approach: [
          'Estimate the current conversion rate.',
          'Decide the smallest improvement worth detecting.',
          'Choose alpha and a target statistical power.',
          'Calculate the required sample size before starting the experiment.',
        ],
        outcome:
          'The company can run an experiment designed to have a reasonable chance of detecting the expected improvement.',
      },

      tasks: [
        'If beta = 0.20, calculate statistical power.',
        'Explain what statistical power of 90% means in simple language.',
        'A company has low-powered A/B testing results. Explain three ways it could improve the experiment design.',
      ],

      questions: [
        {
          q: 'What is statistical power?',
          a: 'It is the probability of correctly rejecting H0 when H0 is false.',
        },
        {
          q: 'What is the formula for statistical power?',
          a: 'Power = 1 − β, where β is the probability of Type II error.',
        },
        {
          q: 'What is a commonly used target for statistical power?',
          a: '80% (0.80) is a common target, although the appropriate level depends on the consequences of errors.',
        },
        {
          q: 'What factors can increase statistical power?',
          a: 'A larger sample size, a larger true effect size, lower variability, and sometimes a higher significance level.',
        },
      ],

      detail:
        'Power is calculated for a specified effect size and statistical design. For example, 80% power does not mean the study detects every possible effect 80% of the time. It refers to the particular effect size used in the power calculation.',

      pitfalls: [
        'Power is not the probability that H1 is true.',
        'A high-power study does not guarantee a statistically significant result.',
        'Always define the effect size that the study is designed to detect.',
      ],
    }),

    // --------------------------------------------------
    // 9. CONFIDENCE INTERVAL
    // --------------------------------------------------
    lesson({
      slug: 'confidence-interval',
      title: 'Confidence Interval (CI)',
      summary:
        'Learn how a confidence interval estimates a population parameter and communicates uncertainty.',

      definition:
        'A confidence interval is a range of values calculated from sample data using a statistical method to estimate an unknown population parameter at a stated confidence level.',

      why:
        'A single sample estimate does not tell us how uncertain that estimate is. A confidence interval provides a range that communicates the precision of the estimate.',

      purpose:
        'To estimate a population parameter and show the uncertainty associated with that estimate.',

      when: [
        'When estimating average customer spending.',
        'When reporting average delivery time.',
        'When comparing conversion rates between two campaigns.',
        'When presenting the results of statistical experiments.',
      ],

      simpleExample:
        'An analyst estimates that average customer spending is ₹500, with a 95% confidence interval of ₹450 to ₹550. The interval communicates uncertainty around the estimated population average.',

      realLife: {
        problem:
          'An e-commerce analyst wants to estimate the average amount customers spend per order.',
        approach: [
          'Select a representative sample of customer orders.',
          'Calculate the sample average order value.',
          'Construct a confidence interval using an appropriate statistical method.',
          'Report the estimated average along with the interval.',
        ],
        outcome:
          'The business receives an estimated average order value and a range that communicates uncertainty around the estimate.',
      },

      tasks: [
        'Interpret a 95% confidence interval of ₹450 to ₹550 for average customer spending.',
        'Two studies estimate the same average, but one has a narrower confidence interval. Explain which estimate is more precise.',
        'An A/B test reports a confidence interval for the difference in conversion rates from -1% to 3%. Explain what this interval suggests about the possible effect.',
      ],

      questions: [
        {
          q: 'What is a confidence interval?',
          a: 'It is a range of plausible values for a population parameter, calculated using sample data and a statistical method.',
        },
        {
          q: 'What does a 95% confidence interval mean?',
          a: 'In repeated sampling, 95% of intervals constructed using this method would contain the true population parameter, assuming the method conditions hold.',
        },
        {
          q: 'What happens to a confidence interval when sample size increases?',
          a: 'It generally becomes narrower because the standard error decreases, assuming other conditions remain comparable.',
        },
        {
          q: 'What does a narrow confidence interval indicate?',
          a: 'It indicates greater precision in the estimate, although it does not guarantee that the estimate is unbiased.',
        },
      ],

      detail:
        'For many standard two-sided tests, a 95% confidence interval for a parameter excludes the null value exactly when the corresponding test rejects that null at the 5% significance level. For a difference between two groups, a confidence interval containing zero often indicates that the difference is not statistically significant at the corresponding two-sided level.',

      pitfalls: [
        'A 95% confidence interval does not mean there is a 95% probability that the fixed population parameter lies inside this particular interval.',
        'A confidence interval is not automatically a range containing 95% of individual observations.',
        'A narrow interval does not guarantee that the estimate is unbiased.',
      ],
    }),

    // --------------------------------------------------
    // 10. ONE-TAILED AND TWO-TAILED TESTS
    // --------------------------------------------------
    lesson({
      slug: 'one-tailed-two-tailed-tests',
      title: 'One-Tailed and Two-Tailed Tests',
      summary:
        'Understand how the research question determines whether a test checks one direction or both directions.',

      definition:
        'A one-tailed test checks for an effect in one specified direction, either greater than or less than a reference value. A two-tailed test checks for a difference in either direction.',

      why:
        'The direction of the alternative hypothesis determines how the statistical evidence is evaluated. Choosing the correct test is important for reaching a valid conclusion.',

      purpose:
        'To select the appropriate testing direction based on the research question and alternative hypothesis.',

      when: [
        'Use an upper-tailed test when testing whether sales have increased.',
        'Use a lower-tailed test when testing whether delivery time has decreased.',
        'Use a two-tailed test when checking whether average salary differs from a reference value.',
        'Use a two-tailed test when either an increase or a decrease would be important.',
      ],

      simpleExample:
        'Suppose the reference population mean is 50. Upper-tailed: H1: μ > 50. Lower-tailed: H1: μ < 50. Two-tailed: H1: μ ≠ 50.',

      realLife: {
        problem:
          'A delivery company wants to test whether a new delivery process reduces the average delivery time below 30 minutes.',
        approach: [
          'Define H0: μ = 30 minutes for the reference value.',
          'Define H1: μ < 30 minutes because the company is testing for a reduction.',
          'Choose a lower-tailed test before examining the results.',
          'Collect delivery data and perform the statistical test.',
        ],
        outcome:
          'The company evaluates whether there is sufficient evidence that the new process reduces average delivery time.',
      },

      tasks: [
        'Identify the test direction for H1: μ > 100.',
        'Identify the test direction for H1: μ ≠ 100.',
        'A company wants to test whether average customer waiting time is below 15 minutes. Write H0 and H1 and identify the correct test direction.',
      ],

      questions: [
        {
          q: 'What is a one-tailed test?',
          a: 'A statistical test in which the alternative hypothesis specifies one direction: greater than or less than.',
        },
        {
          q: 'What is a two-tailed test?',
          a: 'A statistical test that checks whether a parameter differs in either direction from a reference value.',
        },
        {
          q: 'When should we use a two-tailed test?',
          a: 'When a difference in either direction is relevant to the research question.',
        },
        {
          q: 'Can we change a two-tailed test to a one-tailed test after seeing the results?',
          a: 'No. The direction should be selected before examining the data to avoid biased conclusions.',
        },
      ],

      detail:
        'The alternative hypothesis determines the test direction. H1: μ > 50 is upper-tailed. H1: μ < 50 is lower-tailed. H1: μ ≠ 50 is two-tailed. For a two-tailed test, the significance level is divided between both tails of the reference distribution.',

      pitfalls: [
        'Choose the test direction before analyzing the data.',
        'Do not switch from two-tailed to one-tailed because the observed result is favorable.',
        'A one-tailed test is not automatically better or more powerful for every research question.',
      ],
    }),

    // --------------------------------------------------
    // 11. HYPOTHESIS TESTING WITH PYTHON
    // --------------------------------------------------
    lesson({
      slug: 'hypothesis-testing-python',
      title: 'Hypothesis Testing with Python',
      summary:
        'Apply hypothesis testing using Python, SciPy, sample data, and p-value interpretation.',

      definition:
        'Python libraries such as SciPy allow analysts to perform statistical tests, calculate p-values, and evaluate hypotheses using sample data.',

      why:
        'Manual statistical calculations can become difficult for large datasets. Python makes statistical testing repeatable and helps analysts process real-world data efficiently.',

      purpose:
        'To perform hypothesis tests programmatically and interpret their results in a clear, reproducible way.',

      when: [
        'When comparing the average values of two groups.',
        'When analyzing A/B testing results.',
        'When testing whether a sample mean differs from a reference value.',
        'When automating statistical analysis on large datasets.',
      ],

      simpleExample:
        'A company claims that its average delivery time is 30 minutes. An analyst collects sample delivery times and uses a one-sample t-test to check whether the population average differs from 30 minutes.',

      realLife: {
        problem:
          'A marketing analyst wants to determine whether a new advertising campaign changes average customer spending compared with the existing campaign.',
        approach: [
          'Collect spending data from customers in both campaigns.',
          'Check whether the groups and test assumptions are appropriate.',
          'Use an independent two-sample t-test when its assumptions are reasonable.',
          'Calculate the p-value and confidence interval.',
          'Interpret the results alongside the estimated difference.',
        ],
        outcome:
          'The analyst produces a reproducible statistical comparison that helps the marketing team evaluate the campaign.',
      },

      tasks: [
        'Create a Python list of delivery times and perform a one-sample t-test against 30 minutes.',
        'Create two sample groups representing two marketing campaigns and compare their average spending using an independent t-test.',
        'Write a short Python analysis that reports the sample means, difference between means, p-value, and a 95% confidence interval using a suitable method.',
      ],

      questions: [
        {
          q: 'Which Python library is commonly used for hypothesis testing?',
          a: 'SciPy provides many statistical tests through its scipy.stats module.',
        },
        {
          q: 'Which SciPy function performs a one-sample t-test?',
          a: 'scipy.stats.ttest_1samp().',
        },
        {
          q: 'Which SciPy function compares the means of two independent samples?',
          a: 'scipy.stats.ttest_ind().',
        },
        {
          q: 'Why should we check assumptions before performing a statistical test?',
          a: 'Because the validity of the test result depends on assumptions such as independence, distribution conditions, and variance assumptions where applicable.',
        },
      ],

      code: `import numpy as np
from scipy import stats

# Sample delivery times in minutes
delivery_times = np.array([
    28, 29, 31, 30, 32,
    27, 29, 30, 31, 33,
    28, 30, 29, 32, 31
])

# Hypotheses:
# H0: Population mean = 30 minutes
# H1: Population mean != 30 minutes

reference_mean = 30
alpha = 0.05

# Perform a two-sided one-sample t-test
result = stats.ttest_1samp(
    delivery_times,
    popmean=reference_mean,
    alternative='two-sided'
)

print("Sample mean:", np.mean(delivery_times))
print("P-value:", result.pvalue)
print("Test statistic:", result.statistic)

# Make a statistical decision
if result.pvalue <= alpha:
    print("Reject H0: statistically significant difference.")
else:
    print("Fail to reject H0: insufficient evidence of a difference.")

# Calculate a 95% confidence interval
confidence_interval = stats.t.interval(
    confidence=0.95,
    df=len(delivery_times) - 1,
    loc=np.mean(delivery_times),
    scale=stats.sem(delivery_times)
)

print("95% Confidence Interval:", confidence_interval)`,

      detail:
        'This example uses a one-sample t-test because it compares one sample mean with a reference population mean. The two-sided alternative checks for a difference in either direction. The t-test assumes independent observations and an appropriate sampling or distribution condition. For two independent groups, consider Welch’s t-test when equal variances should not be assumed.',

      pitfalls: [
        'Install SciPy and NumPy before running the example.',
        'Do not choose a statistical test without understanding the data and its assumptions.',
        'Do not interpret the p-value without considering the sample mean and confidence interval.',
        'A statistically significant result does not automatically imply practical importance.',
      ],
    }),
  ],
}

export default ch
