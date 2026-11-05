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
  id: 'essential-machine-learning-concepts',
  number: 8,
  title: 'Essential Concepts for Machine Learning',
  tagline:
    'Understand the statistical foundations behind machine learning models, probability distributions, model complexity, and parameter estimation.',
  priority: 'extreme',
  topics: [
    lesson({
      slug: 'bias-variance-tradeoff',
      title: 'Bias-Variance Tradeoff',
      summary:
        'Understand how model complexity affects prediction errors and why balancing bias and variance is essential for building models that generalize well.',
      definition:
        'The bias-variance tradeoff describes the balance between two sources of prediction error. Bias is the error caused by overly simple assumptions in a model, while variance is the error caused by a model being too sensitive to changes in its training data. A good machine learning model balances both to minimize generalization error.',
      why:
        'A model with high bias may fail to learn important patterns, while a model with high variance may memorize training data and perform poorly on unseen data. Understanding this tradeoff helps select appropriate model complexity and improve performance on new observations.',
      purpose:
        'The purpose is to find a model that captures meaningful patterns without memorizing noise. It guides decisions such as choosing model complexity, regularization strength, training data size, and validation strategies.',
      when: [
        'When comparing simple and complex machine learning models.',
        'When training accuracy is high but test accuracy is low.',
        'When both training and test performance are poor.',
        'When selecting regularization or model complexity.',
        'When tuning hyperparameters using cross-validation.',
      ],
      simpleExample:
        'Imagine predicting house prices using the number of bedrooms. A straight-line model may be too simple to capture complex relationships, producing high bias. A very complicated model may fit every training observation, including unusual prices, producing high variance. A model with suitable complexity can capture the general relationship and predict new house prices more reliably.',
      detail:
        'The expected prediction error can be understood through three components: bias squared, variance, and irreducible noise. Increasing model complexity often reduces bias but increases variance. The ideal model is near the point where their combined contribution is minimized. More training data can often reduce variance, while better features or a more suitable model can reduce bias.',
      realLife: {
        problem:
          'A real estate company notices that its simple house-price prediction model consistently misses important price differences, while a highly complex model performs well during training but poorly on new properties.',
        approach: [
          'Train models with different levels of complexity.',
          'Measure training and validation errors.',
          'Use cross-validation to compare generalization performance.',
          'Apply regularization to control excessive model complexity.',
        ],
        outcome:
          'The company selects a model that captures important pricing patterns without overfitting the training data.',
      },
      tasks: [
        'Explain the difference between bias and variance using a house-price prediction example.',
        'A model has 98% training accuracy but 70% test accuracy. Explain which error is likely high and why.',
        'Compare a decision tree with depth 2, depth 10, and an unrestricted decision tree. Explain how you would select the best complexity using validation results.',
      ],
      questions: [
        {
          q: 'What is the bias-variance tradeoff?',
          a: 'It is the balance between bias and variance when building a predictive model. High bias means the model is too simple, while high variance means the model is too sensitive to its training data. The objective is to minimize their combined contribution to generalization error.',
          followUp:
            'How can cross-validation help identify a model with an appropriate bias-variance balance?',
        },
        {
          q: 'What happens when a model has high bias?',
          a: 'A high-bias model makes overly strong assumptions and fails to learn important patterns. It usually underfits and performs poorly on both training and test data.',
          followUp:
            'How can increasing model complexity help reduce bias?',
        },
        {
          q: 'What happens when a model has high variance?',
          a: 'A high-variance model is overly sensitive to its training data. It may perform very well on training data but poorly on unseen data.',
          followUp:
            'Name two techniques that can reduce variance.',
        },
        {
          q: 'How can you reduce the variance of a machine learning model?',
          a: 'You can collect more representative training data, use regularization, reduce model complexity, apply cross-validation, or use ensemble methods such as bagging.',
          followUp:
            'Why does bagging often reduce the variance of unstable models?',
        },
      ],
      code: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import PolynomialFeatures
from sklearn.pipeline import make_pipeline
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error

np.random.seed(42)

X = np.linspace(0, 10, 100).reshape(-1, 1)
y = np.sin(X).ravel() + np.random.normal(0, 0.2, 100)

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=42
)

for degree in [1, 3, 15]:
    model = make_pipeline(
        PolynomialFeatures(degree),
        LinearRegression()
    )

    model.fit(X_train, y_train)

    train_error = mean_squared_error(
        y_train, model.predict(X_train)
    )
    test_error = mean_squared_error(
        y_test, model.predict(X_test)
    )

    print(
        f"Degree {degree}: "
        f"Train MSE={train_error:.3f}, "
        f"Test MSE={test_error:.3f}"
    )`,
      pitfalls: [
        'Assuming that a more complex model is always better.',
        'Using training accuracy alone to select a model.',
        'Confusing high bias with high variance.',
        'Assuming that reducing bias always improves test performance.',
        'Ignoring irreducible noise when discussing prediction error.',
      ],
    }),

    lesson({
      slug: 'overfitting-and-underfitting',
      title: 'Overfitting and Underfitting',
      summary:
        'Learn why machine learning models can memorize training data or fail to learn meaningful patterns, and how to identify and prevent both problems.',
      definition:
        'Overfitting occurs when a model learns the training data too closely, including random noise and unimportant details. It performs well on training data but poorly on unseen data. Underfitting occurs when a model is too simple or insufficiently trained to capture the underlying patterns, resulting in poor performance on both training and test data.',
      why:
        'A model must perform well on data it has never seen. Overfitting and underfitting are two major reasons why a model may fail to generalize. Identifying them helps improve reliability and real-world prediction performance.',
      purpose:
        'The purpose is to build models that learn meaningful patterns and generalize to unseen observations instead of memorizing examples or ignoring important relationships.',
      when: [
        'When training and test performance are significantly different.',
        'When choosing model complexity.',
        'When deciding whether to collect more training data.',
        'When applying regularization or early stopping.',
        'When evaluating models with validation data.',
      ],
      simpleExample:
        'Suppose you train a model to recognize cats and dogs. An underfitted model may not learn enough visual features and incorrectly classify many training images. An overfitted model may memorize the exact training images but fail when it sees a new cat or dog. A well-fitted model learns general features such as shape, texture, and facial structure.',
      detail:
        'A common diagnostic is to compare training and validation errors. High training error and high validation error suggest underfitting. Low training error and much higher validation error suggest overfitting. Low and similar training and validation errors suggest better generalization, although performance should also be checked on a separate test set.',
      realLife: {
        problem:
          'An online retailer builds a customer purchase prediction model. The model performs extremely well on historical training records but produces unreliable predictions for new customers.',
        approach: [
          'Compare training, validation, and test performance.',
          'Use cross-validation to check consistency.',
          'Apply regularization and limit unnecessary model complexity.',
          'Use early stopping when training a neural network.',
          'Collect more representative training examples when possible.',
        ],
        outcome:
          'The retailer obtains a model that performs more consistently on new customer data.',
      },
      tasks: [
        'Explain overfitting and underfitting with one real-world machine learning example.',
        'A model has training error of 2% and validation error of 25%. Identify the likely issue and suggest two solutions.',
        'Train decision trees with different maximum depths and compare training and validation accuracy to identify underfitting and overfitting.',
      ],
      questions: [
        {
          q: 'What is overfitting?',
          a: 'Overfitting happens when a model learns training data too closely, including noise. It performs well on training data but poorly on unseen data.',
          followUp:
            'What is the difference between overfitting and high variance?',
        },
        {
          q: 'What is underfitting?',
          a: 'Underfitting occurs when a model is too simple or insufficiently trained to learn the underlying patterns. It usually performs poorly on both training and test data.',
          followUp:
            'How can you reduce underfitting?',
        },
        {
          q: 'How can you prevent overfitting?',
          a: 'Common techniques include regularization, cross-validation, early stopping, data augmentation, pruning decision trees, and collecting more representative training data.',
          followUp:
            'How does L2 regularization help prevent overfitting?',
        },
        {
          q: 'What is the difference between training, validation, and test data?',
          a: 'Training data is used to fit model parameters. Validation data helps tune hyperparameters and compare models. Test data provides a final evaluation on data that was not used during model development.',
          followUp:
            'Why should the test set not be repeatedly used for hyperparameter tuning?',
        },
      ],
      code: `from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score

X, y = make_classification(
    n_samples=1000,
    n_features=20,
    random_state=42
)

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=42
)

for depth in [1, 3, 5, 15, None]:
    model = DecisionTreeClassifier(
        max_depth=depth,
        random_state=42
    )

    model.fit(X_train, y_train)

    train_accuracy = accuracy_score(
        y_train, model.predict(X_train)
    )
    test_accuracy = accuracy_score(
        y_test, model.predict(X_test)
    )

    print(
        f"Depth={depth}: "
        f"Train={train_accuracy:.3f}, "
        f"Test={test_accuracy:.3f}"
    )`,
      pitfalls: [
        'Using test data repeatedly during model development.',
        'Assuming high training accuracy means the model is good.',
        'Applying regularization without checking whether the model already underfits.',
        'Ignoring data leakage when splitting datasets.',
        'Treating a single train-test split as definitive evidence of generalization.',
      ],
    }),

    lesson({
      slug: 'maximum-likelihood-estimation',
      title: 'Maximum Likelihood Estimation (MLE)',
      summary:
        'Understand how statistical models estimate unknown parameters by choosing values that make the observed data most likely.',
      definition:
        'Maximum Likelihood Estimation (MLE) is a method for estimating unknown parameters of a statistical model. It selects the parameter values that maximize the likelihood of observing the collected data under the assumed probability model.',
      why:
        'Machine learning models often contain unknown parameters that must be learned from data. MLE provides a mathematical foundation for estimating these parameters and is closely connected to training methods used in classification, regression, and probabilistic models.',
      purpose:
        'The purpose of MLE is to find parameter values that best explain the observed dataset under a chosen probability distribution or statistical model.',
      when: [
        'When estimating the parameters of probability distributions.',
        'When fitting logistic regression models.',
        'When estimating the mean and variance of normally distributed data.',
        'When training probabilistic machine learning models.',
        'When deriving or understanding model loss functions.',
      ],
      simpleExample:
        'Suppose a coin is flipped 10 times and produces 7 heads. We assume the coin has an unknown probability p of producing heads. Under a Bernoulli model, the likelihood is proportional to p⁷(1-p)³. The value of p that maximizes this likelihood is 0.7, so the MLE estimate of the probability of heads is 70%.',
      detail:
        'The likelihood function measures how compatible different parameter values are with the observed data. For independent observations, the joint likelihood is the product of their individual probability values. Maximizing the likelihood is equivalent to maximizing the log-likelihood because the logarithm is a strictly increasing function. MLE is not the same as calculating the probability of a parameter value; it evaluates the likelihood of the observed data for a given parameter.',
      realLife: {
        problem:
          'A payment company wants to estimate the probability that a transaction is fraudulent based on historical transaction outcomes.',
        approach: [
          'Assume a suitable probabilistic model for the observed outcomes.',
          'Define the likelihood function using the collected data.',
          'Calculate the log-likelihood to simplify the product of probabilities.',
          'Find parameter values that maximize the log-likelihood.',
          'Evaluate the fitted model on unseen transactions.',
        ],
        outcome:
          'The company obtains parameter estimates that best fit its observed transaction data under the selected model.',
      },
      tasks: [
        'A coin is flipped 20 times and produces 14 heads. Calculate the MLE estimate of the probability of heads.',
        'Explain why maximizing log-likelihood gives the same parameter estimate as maximizing likelihood.',
        'Write a Python function that calculates the Bernoulli log-likelihood for different probability values and identifies the MLE.',
      ],
      questions: [
        {
          q: 'What is Maximum Likelihood Estimation?',
          a: 'MLE is a statistical method that estimates model parameters by choosing the values that maximize the likelihood of observing the given data.',
          followUp:
            'What is the difference between a likelihood function and a probability distribution?',
        },
        {
          q: 'What is the likelihood function?',
          a: 'The likelihood function represents how compatible different parameter values are with the observed dataset under an assumed statistical model.',
          followUp:
            'Why is likelihood not generally interpreted as the probability of a parameter?',
        },
        {
          q: 'Why do we use log-likelihood instead of likelihood?',
          a: 'Logarithms convert products of probabilities into sums, making calculations easier and often more numerically stable. Since the logarithm is strictly increasing, maximizing likelihood and log-likelihood produces the same parameter estimates.',
          followUp:
            'What happens to the log-likelihood when an observation has an extremely small probability?',
        },
        {
          q: 'What is the MLE of the probability of heads for a coin flipped 10 times with 7 heads?',
          a: 'The MLE is 7/10 = 0.7, or 70%, under the Bernoulli model.',
          followUp:
            'Would the estimate necessarily be exactly 0.7 if we used a Bayesian prior?',
        },
      ],
      code: `import numpy as np
from scipy.optimize import minimize_scalar

# Observed coin tosses: 1 = heads, 0 = tails
data = np.array([1, 1, 0, 1, 1, 1, 0, 1, 0, 1])

def negative_log_likelihood(p):
    if p <= 0 or p >= 1:
        return np.inf

    log_likelihood = np.sum(
        data * np.log(p) +
        (1 - data) * np.log(1 - p)
    )

    return -log_likelihood

result = minimize_scalar(
    negative_log_likelihood,
    bounds=(0.0001, 0.9999),
    method='bounded'
)

print("MLE probability of heads:", result.x)
print("Observed proportion:", data.mean())`,
      pitfalls: [
        'Confusing likelihood with the probability of a parameter value.',
        'Forgetting to specify the probability model or distribution.',
        'Ignoring numerical underflow when multiplying many small probabilities.',
        'Assuming MLE estimates are always unbiased in finite samples.',
        'Assuming the MLE is always unique or exists within the parameter space.',
      ],
    }),

    lesson({
      slug: 'maximum-a-posteriori',
      title: 'Maximum A Posteriori (MAP)',
      summary:
        'Learn how Bayesian estimation combines observed data with prior beliefs to estimate the most probable parameter value.',
      definition:
        'Maximum A Posteriori (MAP) estimation is a method for estimating unknown parameters using Bayes’ theorem. It selects the parameter value that maximizes the posterior probability, combining the likelihood of the observed data with a prior distribution over the parameters.',
      why:
        'MLE estimates parameters using observed data, but it does not directly incorporate prior knowledge. MAP allows existing knowledge or assumptions about parameter values to influence estimation, which can be useful when training data is limited.',
      purpose:
        'The purpose of MAP is to estimate parameters by balancing evidence from observed data with prior information about plausible parameter values.',
      when: [
        'When training data is limited.',
        'When prior knowledge about model parameters is available.',
        'When estimating parameters using Bayesian methods.',
        'When using regularization in probabilistic models.',
        'When you want to discourage implausible parameter values.',
      ],
      simpleExample:
        'Suppose a coin is flipped only twice and both results are heads. MLE estimates the probability of heads as 1.0. However, if we have a prior belief that the coin is probably fair, a Bayesian prior can pull the MAP estimate away from 1.0. The final estimate depends on the selected prior distribution.',
      detail:
        'Bayes’ theorem gives the posterior as proportional to likelihood multiplied by prior. MAP chooses the parameter value with the highest posterior density. If the prior is uniform over the allowed parameter space, MAP and MLE coincide when the maximum exists. For continuous parameters, MAP is a maximum of posterior density and can depend on parameterization.',
      realLife: {
        problem:
          'A startup has very little historical data about customer conversion rates but has industry information suggesting that conversion rates are usually within a certain range.',
        approach: [
          'Define a probability model for customer conversions.',
          'Choose a prior distribution based on available industry knowledge.',
          'Calculate the likelihood using observed customer outcomes.',
          'Combine prior and likelihood to obtain the posterior distribution.',
          'Find the parameter value with the highest posterior density.',
        ],
        outcome:
          'The startup obtains a conversion-rate estimate that uses both its limited observations and relevant prior information.',
      },
      tasks: [
        'Explain why MAP estimation may be useful when only a small number of observations are available.',
        'Compare MLE and MAP for a coin that produces 2 heads in 2 flips when a prior favors fair coins.',
        'Use a Beta(2, 2) prior and 7 heads from 10 flips to calculate the MAP estimate of the Bernoulli probability.',
      ],
      questions: [
        {
          q: 'What is MAP estimation?',
          a: 'MAP estimation selects the parameter value that maximizes the posterior distribution, combining the likelihood of the observed data with a prior distribution.',
          followUp:
            'Which theorem is used to obtain the posterior distribution?',
        },
        {
          q: 'What is the difference between MLE and MAP?',
          a: 'MLE maximizes the likelihood using observed data. MAP maximizes the posterior by combining the likelihood with prior information.',
          followUp:
            'Under what prior does MAP coincide with MLE?',
        },
        {
          q: 'What is a prior distribution?',
          a: 'A prior distribution represents the assumptions or information about a parameter before considering the current observed dataset.',
          followUp:
            'What can happen if the prior is too strong or poorly chosen?',
        },
        {
          q: 'How is MAP related to regularization?',
          a: 'Maximizing a posterior with a suitable prior can be equivalent to minimizing a loss function with a regularization penalty. For example, a Gaussian prior on coefficients leads to an L2-style penalty.',
          followUp:
            'Which prior distribution is associated with L1 regularization?',
        },
      ],
      code: `import numpy as np
from scipy.stats import beta
from scipy.optimize import minimize_scalar

# Observations
heads = 7
tails = 3

# Beta prior parameters
alpha = 2
beta_param = 2

def negative_log_posterior(p):
    if p <= 0 or p >= 1:
        return np.inf

    log_likelihood = (
        heads * np.log(p) +
        tails * np.log(1 - p)
    )

    log_prior = (
        (alpha - 1) * np.log(p) +
        (beta_param - 1) * np.log(1 - p)
    )

    return -(log_likelihood + log_prior)

result = minimize_scalar(
    negative_log_posterior,
    bounds=(0.0001, 0.9999),
    method='bounded'
)

print("MAP estimate:", result.x)

# Analytical MAP for this Beta-Bernoulli example
analytical_map = (
    alpha + heads - 1
) / (
    alpha + beta_param + heads + tails - 2
)

print("Analytical MAP:", analytical_map)`,
      pitfalls: [
        'Assuming MAP and MLE always produce the same estimate.',
        'Choosing a prior without considering the problem context.',
        'Confusing a prior distribution with a posterior distribution.',
        'Assuming MAP provides the entire posterior uncertainty; it provides only a maximizing point.',
        'Ignoring that MAP estimates can depend on parameterization for continuous parameters.',
      ],
    }),

    lesson({
      slug: 'bayesian-statistics-basics',
      title: 'Bayesian Statistics Basics',
      summary:
        'Understand how Bayesian statistics updates beliefs using observed evidence and Bayes’ theorem.',
      definition:
        'Bayesian statistics is an approach to statistical inference that combines prior knowledge with observed data to calculate updated beliefs about unknown parameters or hypotheses. It uses Bayes’ theorem to obtain a posterior distribution.',
      why:
        'Traditional statistical methods often focus on estimating parameters or testing hypotheses using sampling distributions. Bayesian statistics provides a framework for incorporating prior knowledge and expressing uncertainty through probability distributions over unknown parameters.',
      purpose:
        'The purpose is to update existing beliefs when new evidence becomes available and quantify uncertainty about unknown quantities.',
      when: [
        'When prior knowledge is available.',
        'When working with small or limited datasets.',
        'When uncertainty about parameters needs to be quantified.',
        'When making sequential updates as new data arrives.',
        'When building Bayesian machine learning models.',
      ],
      simpleExample:
        'Suppose a medical test detects a disease. Before testing, a person has a certain probability of having the disease based on its prevalence. After receiving a positive test result, Bayes’ theorem combines the prior probability, test sensitivity, and false-positive rate to calculate the updated probability of disease.',
      detail:
        'Bayes’ theorem can be expressed as posterior = likelihood × prior / evidence. The prior represents beliefs before observing the current data. The likelihood describes how compatible the observed data is with a parameter or hypothesis. The evidence normalizes the result, and the posterior represents the updated distribution after observing the data.',
      realLife: {
        problem:
          'A medical organization wants to estimate the probability that a patient has a particular disease after receiving a positive diagnostic test.',
        approach: [
          'Determine the disease prevalence in the relevant population.',
          'Identify the test sensitivity and specificity.',
          'Calculate the probability of a positive result under disease and no-disease conditions.',
          'Apply Bayes’ theorem to update the probability.',
          'Communicate the posterior probability rather than relying only on test accuracy.',
        ],
        outcome:
          'The organization estimates the probability of disease after accounting for both the test result and the disease prevalence.',
      },
      tasks: [
        'Identify the prior, likelihood, and posterior in a medical testing example.',
        'A disease prevalence is 1%, test sensitivity is 99%, and specificity is 95%. Calculate the probability of disease after a positive test.',
        'Describe how a Bayesian model could update a customer churn probability as new customer activity data arrives.',
      ],
      questions: [
        {
          q: 'What is Bayesian statistics?',
          a: 'Bayesian statistics is a framework for updating beliefs about unknown parameters or hypotheses using observed evidence and Bayes’ theorem.',
          followUp:
            'How does Bayesian inference differ from frequentist inference?',
        },
        {
          q: 'What are prior, likelihood, and posterior?',
          a: 'The prior represents information before observing the current data. The likelihood describes how well parameter values explain the observed data. The posterior combines prior and likelihood to represent updated beliefs.',
          followUp:
            'What role does the evidence term play in Bayes’ theorem?',
        },
        {
          q: 'What is Bayes’ theorem?',
          a: 'Bayes’ theorem calculates the posterior probability using the prior probability and the likelihood of observed evidence, divided by the evidence probability.',
          followUp:
            'Why is the base rate important in medical diagnosis?',
        },
        {
          q: 'What is a posterior distribution?',
          a: 'A posterior distribution is the updated probability distribution over unknown parameters or hypotheses after incorporating observed data.',
          followUp:
            'How can a credible interval be interpreted?',
        },
      ],
      code: `# Medical test example using Bayes' theorem

prevalence = 0.01
sensitivity = 0.99
specificity = 0.95

false_positive_rate = 1 - specificity

probability_positive = (
    sensitivity * prevalence
    + false_positive_rate * (1 - prevalence)
)

posterior = (
    sensitivity * prevalence
    / probability_positive
)

print(
    "Probability of disease after positive test:",
    round(posterior * 100, 2),
    "%"
)`,
      pitfalls: [
        'Confusing prior probability with posterior probability.',
        'Ignoring base rates when interpreting positive test results.',
        'Assuming a positive test always means a high probability of disease.',
        'Choosing priors without understanding their influence.',
        'Treating Bayesian posterior probabilities as automatically objective regardless of model assumptions.',
      ],
    }),

    lesson({
      slug: 'probability-density-function',
      title: 'Probability Density Function (PDF)',
      summary:
        'Learn how probability density functions describe the distribution of continuous random variables.',
      definition:
        'A Probability Density Function (PDF) describes the relative likelihood of different values of a continuous random variable. The area under the PDF curve over an interval gives the probability that the variable falls within that interval. The total area under a valid PDF is equal to 1.',
      why:
        'Many real-world measurements, such as height, weight, temperature, and time, are continuous. PDFs help describe their distributions, calculate probabilities over intervals, and understand uncertainty in statistical models.',
      purpose:
        'The purpose is to represent the distribution of a continuous random variable and calculate probabilities over ranges of values.',
      when: [
        'When working with continuous variables.',
        'When modeling normally distributed measurements.',
        'When calculating probabilities over intervals.',
        'When studying statistical distributions.',
        'When building probabilistic machine learning models.',
      ],
      simpleExample:
        'Suppose adult heights are modeled using a normal distribution. A PDF curve shows where heights are more concentrated. The height of the curve at 170 cm is a density value, not the probability of someone being exactly 170 cm tall. The probability of being between 165 cm and 175 cm is the area under the curve between those two values.',
      detail:
        'For a continuous random variable X, the probability of an interval is calculated by integrating its density over that interval. The probability at any exact single point is zero for an ordinary continuous distribution. A PDF can have values greater than 1, provided its total area remains equal to 1.',
      realLife: {
        problem:
          'A manufacturing company wants to understand how the thickness of products varies around its target measurement.',
        approach: [
          'Collect thickness measurements from manufactured products.',
          'Choose a suitable continuous probability distribution.',
          'Estimate the distribution parameters.',
          'Plot the PDF to understand where measurements are concentrated.',
          'Calculate the probability that a product falls outside acceptable limits.',
        ],
        outcome:
          'The company estimates the proportion of products expected to fall within its manufacturing tolerance range.',
      },
      tasks: [
        'Explain why the probability of a continuous random variable being exactly 10 is normally zero.',
        'Generate 1,000 values from a normal distribution and plot their estimated density.',
        'Calculate the probability that a normally distributed measurement falls between 45 and 55 when the mean is 50 and standard deviation is 5.',
      ],
      questions: [
        {
          q: 'What is a Probability Density Function?',
          a: 'A PDF describes the density of a continuous random variable. Probabilities are calculated using the area under the curve over an interval.',
          followUp:
            'Can a PDF have a value greater than 1?',
        },
        {
          q: 'Why is the probability at an exact point zero for a continuous variable?',
          a: 'A single point has zero width, so its area under a continuous density curve is zero. Positive probabilities are assigned to intervals.',
          followUp:
            'How would you calculate the probability that X is between 2 and 5?',
        },
        {
          q: 'What is the total area under a valid PDF?',
          a: 'The total area under a valid PDF over its entire support is equal to 1, representing total probability.',
          followUp:
            'What does the area under a PDF between two values represent?',
        },
        {
          q: 'What is the difference between a PDF and a PMF?',
          a: 'A PDF describes continuous random variables using density, while a PMF assigns probabilities to individual values of a discrete random variable.',
          followUp:
            'Which function would you use to model the number of defective products?',
        },
      ],
      code: `import numpy as np
import matplotlib.pyplot as plt
from scipy.stats import norm

# Normal distribution parameters
mean = 50
std_dev = 5

x = np.linspace(30, 70, 500)

pdf_values = norm.pdf(
    x,
    loc=mean,
    scale=std_dev
)

# Probability of a value between 45 and 55
probability = norm.cdf(
    55, loc=mean, scale=std_dev
) - norm.cdf(
    45, loc=mean, scale=std_dev
)

plt.plot(x, pdf_values)
plt.xlabel("Measurement")
plt.ylabel("Probability Density")
plt.title("Normal Distribution PDF")
plt.show()

print("Probability between 45 and 55:", probability)`,
      pitfalls: [
        'Interpreting PDF height as the probability of an exact value.',
        'Assuming every PDF value must be less than or equal to 1.',
        'Forgetting that total area under a valid PDF equals 1.',
        'Confusing density with probability.',
        'Using a PDF for a discrete random variable instead of a PMF.',
      ],
    }),

    lesson({
      slug: 'probability-mass-function',
      title: 'Probability Mass Function (PMF)',
      summary:
        'Understand how probability mass functions assign probabilities to individual outcomes of discrete random variables.',
      definition:
        'A Probability Mass Function (PMF) gives the probability that a discrete random variable takes a particular value. Every probability must be non-negative, and the sum of probabilities over all possible outcomes must equal 1.',
      why:
        'Many machine learning and business problems involve counting outcomes, such as the number of purchases, defective products, clicks, or successful transactions. PMFs help represent and calculate probabilities for these discrete outcomes.',
      purpose:
        'The purpose is to describe the probability distribution of a discrete random variable and calculate the probability of individual outcomes or groups of outcomes.',
      when: [
        'When working with discrete random variables.',
        'When modeling counts or categories.',
        'When using Bernoulli or binomial distributions.',
        'When calculating probabilities of specific outcomes.',
        'When studying discrete probability distributions.',
      ],
      simpleExample:
        'Suppose a fair six-sided die is rolled. The random variable X represents the number shown. Each possible value from 1 to 6 has probability 1/6. The PMF assigns a probability to each individual outcome, and all six probabilities add up to 1.',
      detail:
        'For a discrete random variable X, the PMF is written as P(X = x). Unlike a PDF, the PMF directly gives the probability of an individual outcome. For example, a binomial PMF can calculate the probability of getting exactly 3 successes in 5 independent trials.',
      realLife: {
        problem:
          'An e-commerce company wants to estimate the probability of receiving a specific number of orders during a fixed period.',
        approach: [
          'Define the discrete random variable as the number of orders.',
          'Collect historical order-count data.',
          'Choose an appropriate discrete distribution, such as Poisson, if its assumptions are reasonable.',
          'Estimate the distribution parameters.',
          'Calculate probabilities for different order counts.',
        ],
        outcome:
          'The company estimates the probability of different order volumes and can use the results for operational planning.',
      },
      tasks: [
        'A fair die is rolled once. Write its PMF and calculate the probability of rolling an even number.',
        'Calculate the probability of exactly 3 heads in 5 fair coin flips using the binomial distribution.',
        'Generate a binomial distribution for 10 trials with a success probability of 0.4 and visualize its PMF.',
      ],
      questions: [
        {
          q: 'What is a Probability Mass Function?',
          a: 'A PMF gives the probability that a discrete random variable takes a particular value.',
          followUp:
            'What condition must the sum of all PMF probabilities satisfy?',
        },
        {
          q: 'What is the difference between a PMF and a PDF?',
          a: 'A PMF gives direct probabilities for individual discrete outcomes. A PDF describes density for continuous outcomes, where probabilities are calculated using areas over intervals.',
          followUp:
            'Can the probability of an exact value be positive for a continuous variable?',
        },
        {
          q: 'What is a Bernoulli distribution?',
          a: 'A Bernoulli distribution models one trial with two possible outcomes, usually represented as success (1) and failure (0), with success probability p.',
          followUp:
            'What is the relationship between Bernoulli and binomial distributions?',
        },
        {
          q: 'What is a binomial distribution?',
          a: 'A binomial distribution models the number of successes in a fixed number of independent trials, where each trial has the same probability of success.',
          followUp:
            'What assumptions are required for a binomial distribution?',
        },
      ],
      code: `import numpy as np
import matplotlib.pyplot as plt
from scipy.stats import binom

# Binomial distribution
n = 10
p = 0.4

outcomes = np.arange(0, n + 1)

probabilities = binom.pmf(
    outcomes,
    n,
    p
)

plt.bar(outcomes, probabilities)
plt.xlabel("Number of successes")
plt.ylabel("Probability")
plt.title("Binomial Distribution PMF")
plt.show()

for outcome, probability in zip(
    outcomes, probabilities
):
    print(
        f"P(X={outcome}) = {probability:.4f}"
    )`,
      pitfalls: [
        'Using a PMF for continuous measurements.',
        'Forgetting that all possible outcome probabilities must sum to 1.',
        'Assigning negative probabilities.',
        'Confusing the number of trials with the number of successes.',
        'Using a binomial model when trial independence or constant success probability is not reasonable.',
      ],
    }),

    lesson({
      slug: 'cumulative-distribution-function',
      title: 'Cumulative Distribution Function (CDF)',
      summary:
        'Learn how the cumulative distribution function calculates the probability that a random variable is less than or equal to a given value.',
      definition:
        'A Cumulative Distribution Function (CDF) gives the probability that a random variable X is less than or equal to a value x. It accumulates probability from the lowest possible value up to x. It is defined for both discrete and continuous random variables.',
      why:
        'The CDF provides a consistent way to calculate cumulative probabilities for different types of random variables. It is useful for percentiles, thresholds, risk analysis, and understanding how observations are distributed.',
      purpose:
        'The purpose is to calculate cumulative probability, determine percentiles, compare distributions, and evaluate the probability that a random variable falls below a specified threshold.',
      when: [
        'When calculating the probability that a value is below a threshold.',
        'When finding percentiles and quantiles.',
        'When comparing probability distributions.',
        'When calculating probabilities over intervals.',
        'When evaluating statistical models and distribution assumptions.',
      ],
      simpleExample:
        'Suppose exam scores follow a normal distribution. The CDF at 70 gives the probability that a randomly selected student scores 70 or less. If the CDF value is 0.80, approximately 80% of students are expected to score at or below 70.',
      detail:
        'The CDF is non-decreasing and ranges from 0 to 1. For a continuous random variable, the probability between a and b is F(b) - F(a). For a discrete random variable, the CDF increases in steps as probability mass is accumulated. The inverse CDF is commonly used to calculate quantiles.',
      realLife: {
        problem:
          'A bank wants to understand the percentage of loan applicants whose credit scores fall below a specified risk threshold.',
        approach: [
          'Collect credit score observations.',
          'Estimate or select an appropriate distribution.',
          'Calculate the CDF at the selected credit-score threshold.',
          'Interpret the result as the cumulative proportion or probability.',
          'Compare results across customer segments.',
        ],
        outcome:
          'The bank estimates the proportion of applicants below the threshold and uses it as one input in risk assessment.',
      },
      tasks: [
        'If F(70) = 0.80, explain what this means in terms of student examination scores.',
        'A continuous random variable has F(5) = 0.65 and F(10) = 0.90. Calculate the probability that X lies between 5 and 10.',
        'Generate a normal distribution and plot its CDF. Calculate the 90th percentile.',
      ],
      questions: [
        {
          q: 'What is a Cumulative Distribution Function?',
          a: 'A CDF gives the probability that a random variable is less than or equal to a specified value: F(x) = P(X ≤ x).',
          followUp:
            'What is the range of a CDF?',
        },
        {
          q: 'What are the main properties of a CDF?',
          a: 'A CDF is non-decreasing, takes values between 0 and 1, is right-continuous, and approaches 0 and 1 at the lower and upper extremes of the real line.',
          followUp:
            'Why can a discrete CDF contain jumps?',
        },
        {
          q: 'How do you calculate the probability between two values using a CDF?',
          a: 'For a continuous random variable, P(a < X ≤ b) = F(b) - F(a). For discrete variables, the same expression gives P(a < X ≤ b).',
          followUp:
            'How would you calculate P(X > 10) using a CDF?',
        },
        {
          q: 'What is the difference between a CDF and a PDF?',
          a: 'A CDF gives cumulative probability up to a value. A PDF describes density for continuous variables, and its integral over an interval gives probability.',
          followUp:
            'How can a PDF be obtained from a differentiable CDF?',
        },
      ],
      code: `import numpy as np
import matplotlib.pyplot as plt
from scipy.stats import norm

mean = 50
std_dev = 10

x = np.linspace(10, 90, 500)

cdf_values = norm.cdf(
    x,
    loc=mean,
    scale=std_dev
)

plt.plot(x, cdf_values)
plt.xlabel("Value")
plt.ylabel("Cumulative Probability")
plt.title("Normal Distribution CDF")
plt.grid(True)
plt.show()

probability = (
    norm.cdf(60, loc=mean, scale=std_dev)
    - norm.cdf(40, loc=mean, scale=std_dev)
)

percentile_90 = norm.ppf(
    0.90,
    loc=mean,
    scale=std_dev
)

print("P(40 < X <= 60):", probability)
print("90th percentile:", percentile_90)`,
      pitfalls: [
        'Confusing cumulative probability with density.',
        'Assuming a CDF decreases as x increases.',
        'Forgetting to subtract the lower CDF value when calculating interval probabilities.',
        'Confusing the 90th percentile with a 90% probability at one exact point.',
        'Assuming every CDF is smooth; discrete CDFs contain jumps.',
      ],
    }),

    lesson({
      slug: 'log-likelihood',
      title: 'Log-Likelihood',
      summary:
        'Understand how logarithms simplify likelihood calculations and why log-likelihood is central to machine learning loss functions.',
      definition:
        'Log-likelihood is the natural logarithm of a likelihood function. It measures how compatible a set of model parameters is with the observed data on a logarithmic scale. For independent observations, it converts the product of individual likelihood values into a sum of log probabilities.',
      why:
        'Likelihood values can become extremely small when many observations are involved. Multiplying many small probabilities can cause numerical underflow. Log-likelihood makes calculations easier and provides a convenient objective for statistical estimation and machine learning optimization.',
      purpose:
        'The purpose is to simplify likelihood calculations, estimate model parameters, and construct optimization objectives such as negative log-likelihood loss.',
      when: [
        'When estimating parameters using Maximum Likelihood Estimation.',
        'When training logistic regression models.',
        'When evaluating probabilistic classification models.',
        'When calculating the probability of observed datasets.',
        'When deriving negative log-likelihood loss functions.',
      ],
      simpleExample:
        'Suppose a model predicts a probability of 0.8 for an observed positive outcome. Its log-likelihood contribution is log(0.8), approximately -0.223. If the model predicts probabilities for multiple independent observations, their log-likelihood contributions are added together.',
      detail:
        'For independent observations, the likelihood is the product of individual probabilities or probability densities. Taking the natural logarithm transforms this product into a sum. Maximizing log-likelihood produces the same parameter estimates as maximizing likelihood. Machine learning commonly minimizes negative log-likelihood because optimization algorithms are typically written as minimization problems.',
      realLife: {
        problem:
          'A machine learning team trains a binary classification model to predict whether customers will cancel their subscriptions.',
        approach: [
          'Train a model that outputs a probability of cancellation.',
          'Compare predicted probabilities with the actual binary outcomes.',
          'Calculate the log-likelihood of the observed outcomes.',
          'Use negative log-likelihood as the training loss.',
          'Optimize model parameters to minimize the loss.',
        ],
        outcome:
          'The team trains a probabilistic classifier that is rewarded for assigning high probabilities to outcomes that actually occur.',
      },
      tasks: [
        'Calculate the log-likelihood contribution when a model assigns probability 0.9 to an observed positive outcome.',
        'Explain why maximizing likelihood and maximizing log-likelihood produce the same parameter estimates.',
        'Calculate the binary negative log-likelihood for actual labels [1, 0, 1] and predicted probabilities [0.8, 0.3, 0.6].',
      ],
      questions: [
        {
          q: 'What is log-likelihood?',
          a: 'Log-likelihood is the logarithm of the likelihood function. It measures how compatible model parameters are with observed data.',
          followUp:
            'Why is log-likelihood commonly used instead of raw likelihood?',
        },
        {
          q: 'Why does log-likelihood convert multiplication into addition?',
          a: 'Because the logarithm of a product equals the sum of the logarithms of its factors. This simplifies calculations for independent observations.',
          followUp:
            'What mathematical property makes this transformation possible?',
        },
        {
          q: 'What is negative log-likelihood?',
          a: 'Negative log-likelihood is the negative of the log-likelihood. It is commonly used as a loss function that machine learning algorithms minimize.',
          followUp:
            'How is binary cross-entropy related to negative log-likelihood?',
        },
        {
          q: 'What happens when a model assigns a very low probability to the actual outcome?',
          a: 'Its log-likelihood contribution becomes a large negative value, so its negative log-likelihood loss becomes large. This penalizes confident incorrect predictions.',
          followUp:
            'Why can log-loss be more informative than classification accuracy?',
        },
      ],
      code: `import numpy as np
from sklearn.metrics import log_loss

# Actual binary outcomes
y_true = np.array([1, 0, 1])

# Predicted probability of class 1
y_prob = np.array([0.8, 0.3, 0.6])

# Log-likelihood
log_likelihood = np.sum(
    y_true * np.log(y_prob)
    + (1 - y_true) * np.log(1 - y_prob)
)

# Negative log-likelihood
negative_log_likelihood = -log_likelihood

# Average binary cross-entropy
average_loss = log_loss(y_true, y_prob)

print("Log-likelihood:", log_likelihood)
print("Negative log-likelihood:", negative_log_likelihood)
print("Average log loss:", average_loss)`,
      pitfalls: [
        'Confusing likelihood with log-likelihood.',
        'Forgetting the negative sign when converting log-likelihood into a minimization loss.',
        'Taking the logarithm of zero without numerical safeguards.',
        'Assuming log-likelihood values must always be negative; this is not universally true for continuous densities.',
        'Confusing average negative log-likelihood with total negative log-likelihood.',
      ],
    }),

    lesson({
      slug: 'law-of-large-numbers',
      title: 'Law of Large Numbers',
      summary:
        'Understand why sample averages tend to get closer to the expected value as the number of independent observations increases.',
      definition:
        'The Law of Large Numbers states that, under suitable conditions, the sample average of repeated observations converges toward the expected value as the number of observations increases. It explains why larger samples generally provide more stable estimates of population averages.',
      why:
        'Machine learning and statistics rely on samples to estimate population characteristics. The Law of Large Numbers explains why estimates based on larger representative samples tend to become more stable and why repeated experiments help reveal underlying averages.',
      purpose:
        'The purpose is to explain the long-run behavior of sample averages and provide a foundation for statistical estimation, simulation, and data analysis.',
      when: [
        'When estimating population means from sample data.',
        'When performing repeated simulations or Monte Carlo methods.',
        'When understanding why larger samples can provide more stable averages.',
        'When analyzing repeated experiments.',
        'When explaining the behavior of sample proportions.',
      ],
      simpleExample:
        'Suppose you repeatedly toss a fair coin and record the proportion of heads. After 10 tosses, the proportion might be 0.6. After 100 tosses, it may be closer to 0.5. After thousands of tosses, the proportion will generally become more stable around the true probability of 0.5.',
      detail:
        'The weak Law of Large Numbers states that the sample average converges in probability to the population expectation under suitable assumptions, such as independent and identically distributed observations with a finite expected value. The strong Law states that convergence occurs almost surely under its applicable conditions. The law does not guarantee that every larger finite sample is closer to the expected value than the previous sample.',
      realLife: {
        problem:
          'An online platform wants to estimate its average order value using customer transactions, but early estimates change significantly as new orders arrive.',
        approach: [
          'Collect transaction values over time.',
          'Calculate the running average after each new observation.',
          'Observe how the estimate changes as the sample size increases.',
          'Ensure the sample is representative and account for changes in customer behavior.',
          'Use the estimate with an appropriate uncertainty measure.',
        ],
        outcome:
          'The platform obtains a more stable estimate of average order value as more representative transaction data becomes available.',
      },
      tasks: [
        'Explain the Law of Large Numbers using 10 coin tosses compared with 10,000 coin tosses.',
        'Simulate 100, 1,000, and 10,000 fair coin tosses and compare the proportion of heads.',
        'Explain why the Law of Large Numbers does not guarantee that every additional observation will make the sample average closer to the population mean.',
      ],
      questions: [
        {
          q: 'What is the Law of Large Numbers?',
          a: 'It states that the sample average converges toward the expected value as the number of observations increases, provided suitable assumptions are satisfied.',
          followUp:
            'Does it guarantee that every larger sample has a more accurate average?',
        },
        {
          q: 'Why is the Law of Large Numbers important in statistics?',
          a: 'It explains why sample averages and proportions become more stable as more observations are collected, providing a foundation for estimating population characteristics.',
          followUp:
            'How does it support Monte Carlo simulation?',
        },
        {
          q: 'What is the difference between the weak and strong Law of Large Numbers?',
          a: 'The weak law describes convergence in probability of the sample average to the expected value. The strong law describes almost-sure convergence under its applicable assumptions.',
          followUp:
            'What does convergence in probability mean?',
        },
        {
          q: 'Is the Law of Large Numbers the same as the Central Limit Theorem?',
          a: 'No. The Law of Large Numbers explains that sample averages converge toward the population expectation. The Central Limit Theorem describes the approximate distribution of standardized sample averages under suitable conditions.',
          followUp:
            'How does the Central Limit Theorem help construct confidence intervals?',
        },
      ],
      code: `import numpy as np
import matplotlib.pyplot as plt

np.random.seed(42)

# Simulate fair coin tosses
tosses = np.random.binomial(
    n=1,
    p=0.5,
    size=10000
)

# Running proportion of heads
running_average = (
    np.cumsum(tosses)
    / np.arange(1, len(tosses) + 1)
)

plt.plot(running_average)
plt.axhline(
    y=0.5,
    linestyle='--',
    label='Expected probability = 0.5'
)

plt.xlabel("Number of coin tosses")
plt.ylabel("Running proportion of heads")
plt.title("Law of Large Numbers")
plt.legend()
plt.show()

print("Final proportion:", running_average[-1])`,
      pitfalls: [
        'Assuming every additional observation must move the average closer to the expected value.',
        'Confusing the Law of Large Numbers with the Central Limit Theorem.',
        'Assuming a large biased sample automatically represents the population.',
        'Ignoring dependence between observations when applying standard versions of the law.',
        'Assuming the law guarantees a particular accuracy for a specific finite sample size.',
      ],
    }),
  ],
}

export default ch