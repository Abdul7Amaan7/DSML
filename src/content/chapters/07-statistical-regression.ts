
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
  id: 'regression',
  number: 7,
  title: 'Regression & Statistical Relationships',
  tagline:
    'Understand relationships between variables, measure correlation, build regression models, evaluate predictions, and identify problems in statistical models.',
  priority: 'extreme',

  topics: [
    // --------------------------------------------------
    // 1. COVARIANCE VS CORRELATION
    // --------------------------------------------------
    lesson({
      slug: 'covariance-vs-correlation',
      title: 'Covariance vs Correlation',
      summary:
        'Understand how two variables move together and the difference between measuring direction and strength of a relationship.',

      definition:
        'Covariance measures how two variables change together. Correlation measures both the direction and strength of their relationship using a standardized value between -1 and +1.',

      why:
        'In data science, we often work with multiple variables and want to understand how they are related. Covariance tells us whether variables tend to move in the same or opposite directions, while correlation makes the relationship easier to compare.',

      purpose:
        'To understand relationships between variables and identify whether they tend to increase together, decrease together, or move independently.',

      when: [
        'When analyzing relationships between sales and advertising expenditure.',
        'When studying relationships between employee experience and salary.',
        'When exploring relationships between variables before building a machine learning model.',
        'When identifying related features in a dataset.',
        'When comparing relationships between variables measured in different units.',
      ],

      simpleExample:
        'Suppose a company increases its advertising budget and its sales also increase. This suggests positive covariance and potentially positive correlation. If advertising expenditure increases while delivery time decreases, the relationship may be negative.',

      realLife: {
        problem:
          'An e-commerce company wants to understand how advertising expenditure and monthly sales are related.',
        approach: [
          'Collect monthly advertising expenditure and sales data.',
          'Calculate covariance to understand the direction of their joint movement.',
          'Calculate correlation to measure the strength and direction of their linear relationship.',
          'Interpret the results before using the variables in a predictive model.',
        ],
        outcome:
          'The company understands whether advertising expenditure and sales tend to move together and how strongly they are associated.',
      },

      tasks: [
        'Explain the difference between covariance and correlation using sales and advertising expenditure.',
        'A dataset has a positive covariance between study hours and exam scores. Explain what this indicates.',
        'Compare covariance and correlation for three variables measured in different units and explain why correlation is easier to compare.',
      ],

      questions: [
        {
          q: 'What is covariance?',
          a: 'Covariance measures whether two variables tend to increase together or move in opposite directions.',
        },
        {
          q: 'What is correlation?',
          a: 'Correlation measures the direction and strength of the relationship between two variables, usually on a scale from -1 to +1.',
        },
        {
          q: 'What is the main difference between covariance and correlation?',
          a: 'Covariance is affected by the units and scales of the variables. Correlation is standardized, making it easier to compare relationships.',
        },
        {
          q: 'Can covariance be greater than 1?',
          a: 'Yes. Covariance has no fixed range and can take any positive or negative value.',
        },
        {
          q: 'What is the range of correlation?',
          a: 'Correlation ranges from -1 to +1.',
        },
        {
          q: 'Does covariance measure the strength of a relationship?',
          a: 'Its magnitude depends on the measurement scales, so it is not a standardized measure of relationship strength.',
        },
      ],

      detail:
        'Covariance can be positive, negative, or approximately zero. Positive covariance means the variables tend to move in the same direction. Negative covariance means they tend to move in opposite directions. Correlation standardizes covariance by dividing it by the product of the variables’ standard deviations. A correlation near +1 indicates a strong positive linear relationship, near -1 indicates a strong negative linear relationship, and near 0 indicates little linear relationship.',

      pitfalls: [
        'Covariance is not restricted to values between -1 and +1.',
        'Correlation is not proof of causation.',
        'Zero correlation does not necessarily mean that no relationship exists.',
        'Outliers can strongly affect both covariance and correlation.',
      ],

      code: `import pandas as pd

data = {
    "Advertising": [10, 20, 30, 40, 50],
    "Sales": [100, 150, 200, 250, 300]
}

df = pd.DataFrame(data)

# Calculate covariance
print("Covariance:")
print(df.cov())

# Calculate correlation
print("\\nCorrelation:")
print(df.corr())

# Calculate relationship between two variables
print(
    "\\nAdvertising and Sales Correlation:",
    df["Advertising"].corr(df["Sales"])
)`,
    }),

    // --------------------------------------------------
    // 2. PEARSON CORRELATION
    // --------------------------------------------------
    lesson({
      slug: 'pearson-correlation',
      title: 'Pearson Correlation',
      summary:
        'Learn how to measure the strength and direction of a linear relationship between two numerical variables.',

      definition:
        'Pearson correlation is a statistical measure that describes the strength and direction of the linear relationship between two numerical variables. Its correlation coefficient is represented by r and ranges from -1 to +1.',

      why:
        'It helps analysts identify how strongly two numerical variables are linearly related. It is commonly used during exploratory data analysis and feature selection.',

      purpose:
        'To measure the strength and direction of a linear relationship between two numerical variables.',

      when: [
        'When checking the relationship between advertising expenditure and sales.',
        'When analyzing the relationship between study hours and exam scores.',
        'When exploring numerical features before building a regression model.',
        'When checking relationships between temperature and electricity consumption.',
        'When the relationship between variables appears approximately linear.',
      ],

      simpleExample:
        'Suppose the Pearson correlation between study hours and exam scores is 0.90. This indicates a strong positive linear relationship: students who study more hours tend to achieve higher scores.',

      realLife: {
        problem:
          'An education company wants to understand whether students who spend more time studying generally achieve higher exam scores.',
        approach: [
          'Collect students’ study hours and exam scores.',
          'Create a scatter plot to inspect the relationship.',
          'Calculate Pearson correlation using Python.',
          'Interpret the coefficient and check whether the relationship appears linear.',
        ],
        outcome:
          'The company understands the strength and direction of the linear relationship between study hours and exam scores.',
      },

      tasks: [
        'Interpret a Pearson correlation coefficient of +0.85 between study hours and exam scores.',
        'Compare Pearson correlation values of -0.90, +0.60, and +0.05.',
        'Create a Python program that calculates Pearson correlation between advertising expenditure and sales and interprets the result.',
      ],

      questions: [
        {
          q: 'What is Pearson correlation?',
          a: 'It measures the strength and direction of the linear relationship between two numerical variables.',
        },
        {
          q: 'What is the range of Pearson correlation?',
          a: 'It ranges from -1 to +1.',
        },
        {
          q: 'What does a Pearson correlation of +1 indicate?',
          a: 'A perfect positive linear relationship between two variables.',
        },
        {
          q: 'What does a Pearson correlation of -1 indicate?',
          a: 'A perfect negative linear relationship between two variables.',
        },
        {
          q: 'What does a Pearson correlation of 0 indicate?',
          a: 'It indicates no linear correlation, although a nonlinear relationship may still exist.',
        },
        {
          q: 'Is Pearson correlation sensitive to outliers?',
          a: 'Yes. Extreme values can significantly change the correlation coefficient.',
        },
      ],

      detail:
        'Pearson correlation is calculated by dividing the covariance of two variables by the product of their standard deviations. For example, r = 0.95 indicates a strong positive linear relationship, while r = -0.95 indicates a strong negative linear relationship. Pearson correlation measures linear association, not causation.',

      pitfalls: [
        'Do not interpret correlation as causation.',
        'Check for outliers before calculating Pearson correlation.',
        'Pearson correlation may miss strong nonlinear relationships.',
        'Do not assume that a high correlation guarantees accurate predictions.',
      ],

      code: `import pandas as pd
from scipy.stats import pearsonr
import matplotlib.pyplot as plt

study_hours = [1, 2, 3, 4, 5, 6, 7, 8]
exam_scores = [35, 40, 50, 55, 65, 70, 80, 90]

# Calculate Pearson correlation
r, p_value = pearsonr(study_hours, exam_scores)

print("Pearson Correlation:", r)
print("P-value:", p_value)

if r > 0:
    print("Positive linear relationship")
elif r < 0:
    print("Negative linear relationship")
else:
    print("No linear correlation")

# Visualize the relationship
plt.scatter(study_hours, exam_scores)
plt.xlabel("Study Hours")
plt.ylabel("Exam Scores")
plt.title("Study Hours vs Exam Scores")
plt.show()`,
    }),

    // --------------------------------------------------
    // 3. SPEARMAN CORRELATION
    // --------------------------------------------------
    lesson({
      slug: 'spearman-correlation',
      title: 'Spearman Correlation',
      summary:
        'Understand how to measure relationships using ranks instead of original numerical values.',

      definition:
        'Spearman correlation is a statistical measure that evaluates the strength and direction of a monotonic relationship between two variables using their ranks rather than their original values.',

      why:
        'Not every relationship between variables is linear. Sometimes one variable consistently increases as another increases, but the relationship is curved. Spearman correlation can measure this type of monotonic relationship.',

      purpose:
        'To measure whether two variables generally move in the same or opposite direction based on their ranked values.',

      when: [
        'When the relationship between variables is monotonic but not necessarily linear.',
        'When working with ordinal or ranked data.',
        'When analyzing customer satisfaction ratings.',
        'When comparing product popularity rankings.',
        'When outliers make Pearson correlation less suitable.',
      ],

      simpleExample:
        'Suppose customers rank three products based on preference. Spearman correlation can measure whether customer preference rankings are related to product quality rankings.',

      realLife: {
        problem:
          'An e-commerce company wants to understand whether products with higher customer satisfaction rankings also receive higher popularity rankings.',
        approach: [
          'Collect customer satisfaction scores and product popularity rankings.',
          'Convert the observations into ranks.',
          'Calculate Spearman correlation.',
          'Interpret whether the rankings move in the same or opposite direction.',
        ],
        outcome:
          'The company understands whether higher satisfaction rankings tend to correspond with higher popularity rankings.',
      },

      tasks: [
        'Explain Spearman correlation using customer satisfaction rankings.',
        'A Spearman correlation coefficient is 0.88. Interpret the relationship.',
        'Compare Pearson and Spearman correlation for a dataset containing extreme outliers and a nonlinear monotonic relationship.',
      ],

      questions: [
        {
          q: 'What is Spearman correlation?',
          a: 'It measures the strength and direction of a monotonic relationship using the ranks of two variables.',
        },
        {
          q: 'What is the range of Spearman correlation?',
          a: 'It ranges from -1 to +1.',
        },
        {
          q: 'What is the main difference between Pearson and Spearman correlation?',
          a: 'Pearson measures linear relationships using original numerical values, while Spearman measures monotonic relationships using ranks.',
        },
        {
          q: 'Can Spearman correlation be used for ordinal data?',
          a: 'Yes. It is particularly useful for ranked and ordinal data.',
        },
        {
          q: 'Does Spearman correlation require a linear relationship?',
          a: 'No. It can measure monotonic relationships that are not linear.',
        },
        {
          q: 'Is Spearman correlation affected by outliers?',
          a: 'It is generally less sensitive to extreme numerical values than Pearson correlation, although unusual observations can still affect rankings.',
        },
      ],

      detail:
        'A monotonic relationship means that as one variable increases, the other generally increases or generally decreases. The rate of change does not need to remain constant. Spearman correlation first converts observations into ranks and then measures the correlation between those ranks.',

      pitfalls: [
        'Spearman correlation measures monotonic relationships, not every possible nonlinear relationship.',
        'It does not establish causation.',
        'Tied ranks require appropriate handling.',
        'Do not assume Spearman correlation is completely unaffected by outliers.',
      ],

      code: `from scipy.stats import spearmanr
import matplotlib.pyplot as plt

customer_ratings = [1, 2, 3, 4, 5, 6, 7, 8]
product_popularity = [10, 15, 20, 35, 40, 60, 75, 90]

# Calculate Spearman correlation
correlation, p_value = spearmanr(
    customer_ratings,
    product_popularity
)

print("Spearman Correlation:", correlation)
print("P-value:", p_value)

plt.scatter(customer_ratings, product_popularity)
plt.xlabel("Customer Ratings")
plt.ylabel("Product Popularity")
plt.title("Customer Ratings vs Product Popularity")
plt.show()`,
    }),

    // --------------------------------------------------
    // 4. SIMPLE LINEAR REGRESSION
    // --------------------------------------------------
    lesson({
      slug: 'simple-linear-regression',
      title: 'Simple Linear Regression',
      summary:
        'Learn how to predict one numerical variable using a single independent variable.',

      definition:
        'Simple linear regression is a supervised machine learning and statistical technique that models the relationship between one independent variable (X) and one dependent variable (Y) using a straight-line equation.',

      why:
        'Businesses often want to predict numerical values using available information. Simple linear regression provides an understandable way to estimate how one variable changes when another variable changes.',

      purpose:
        'To understand and predict a numerical outcome using one input variable.',

      when: [
        'When predicting salary using years of experience.',
        'When estimating sales using advertising expenditure.',
        'When predicting house prices using house size.',
        'When estimating delivery time using delivery distance.',
        'When studying the effect of one numerical variable on another.',
      ],

      simpleExample:
        'A company wants to predict an employee’s salary based on years of experience. Years of experience is X, and salary is Y. The regression model learns a straight line that best fits the observed data.',

      realLife: {
        problem:
          'A company wants to estimate employee salaries based on their years of professional experience.',
        approach: [
          'Collect historical employee experience and salary data.',
          'Use years of experience as the independent variable.',
          'Use salary as the dependent variable.',
          'Train a simple linear regression model.',
          'Evaluate the model and predict salaries for new employees.',
        ],
        outcome:
          'The company receives a mathematical model that estimates salary based on years of experience.',
      },

      tasks: [
        'Identify the independent and dependent variables when predicting house prices using house size.',
        'A regression equation is Salary = 20000 + 5000 × Experience. Predict the salary for an employee with four years of experience.',
        'Build a simple linear regression model in Python using study hours to predict exam scores and evaluate its performance.',
      ],

      questions: [
        {
          q: 'What is simple linear regression?',
          a: 'It is a statistical method that models the relationship between one independent variable and one dependent variable using a straight line.',
        },
        {
          q: 'What is the regression equation?',
          a: 'The equation is Y = b0 + b1X, where b0 is the intercept and b1 is the slope.',
        },
        {
          q: 'What is an independent variable?',
          a: 'It is the input variable used to explain or predict the dependent variable.',
        },
        {
          q: 'What is a dependent variable?',
          a: 'It is the outcome variable that the model attempts to explain or predict.',
        },
        {
          q: 'What is the slope in linear regression?',
          a: 'It represents the expected change in the predicted dependent variable for a one-unit increase in the independent variable.',
        },
        {
          q: 'What is the intercept?',
          a: 'It is the predicted value of Y when X equals zero.',
        },
        {
          q: 'Is linear regression used for classification?',
          a: 'Ordinary linear regression is primarily used for predicting continuous numerical outcomes, not classification.',
        },
      ],

      detail:
        'The regression line is selected by minimizing the sum of squared residuals in ordinary least squares regression. The slope describes the expected change in Y for each one-unit increase in X. The intercept is the predicted Y value when X is zero, although that value may not have a meaningful real-world interpretation.',

      pitfalls: [
        'Linear regression assumes a suitable linear relationship between X and Y.',
        'A relationship does not automatically mean that X causes Y.',
        'Extreme outliers can strongly influence the regression line.',
        'Do not evaluate a model only on its training data.',
        'Do not extrapolate far beyond the observed range without justification.',
      ],

      code: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

# Input feature: years of experience
X = np.array([1, 2, 3, 4, 5, 6]).reshape(-1, 1)

# Target: annual salary in thousands
y = np.array([25, 30, 40, 45, 55, 60])

# Create and train model
model = LinearRegression()
model.fit(X, y)

# Predict salary
predictions = model.predict(X)

print("Slope:", model.coef_[0])
print("Intercept:", model.intercept_)
print("Predicted salary for 4 years:",
      model.predict([[4]])[0])

print("R-squared:", r2_score(y, predictions))
print("MSE:", mean_squared_error(y, predictions))

# Visualize regression line
plt.scatter(X, y, label="Actual Data")
plt.plot(X, predictions, label="Regression Line")
plt.xlabel("Years of Experience")
plt.ylabel("Salary")
plt.legend()
plt.show()`,
    }),

    // --------------------------------------------------
    // 5. MULTIPLE LINEAR REGRESSION
    // --------------------------------------------------
    lesson({
      slug: 'multiple-linear-regression',
      title: 'Multiple Linear Regression',
      summary:
        'Understand how to predict one numerical outcome using two or more independent variables.',

      definition:
        'Multiple linear regression is a statistical technique that models the relationship between one dependent variable and two or more independent variables.',

      why:
        'Real-world outcomes are usually influenced by several factors. For example, house prices depend on size, location, number of bedrooms, and property age. Multiple linear regression allows us to consider multiple inputs together.',

      purpose:
        'To predict a numerical outcome and understand the relationship between the outcome and multiple input variables.',

      when: [
        'When predicting house prices using size, bedrooms, and location-related features.',
        'When predicting employee salaries using experience, education, and skills.',
        'When forecasting sales using advertising, price, and seasonal factors.',
        'When estimating customer spending using age, income, and purchase history.',
        'When analyzing the combined relationship of multiple variables with an outcome.',
      ],

      simpleExample:
        'A real estate company wants to predict house prices using house size, number of bedrooms, and house age. Instead of using only house size, the model uses all three variables to make a prediction.',

      realLife: {
        problem:
          'A real estate company wants to estimate property prices using several property characteristics.',
        approach: [
          'Collect historical house prices, sizes, bedrooms, and property ages.',
          'Select house price as the dependent variable.',
          'Select size, bedrooms, and age as independent variables.',
          'Train a multiple linear regression model.',
          'Evaluate predictions using a test dataset.',
        ],
        outcome:
          'The company can estimate house prices using several relevant property characteristics rather than relying on a single feature.',
      },

      tasks: [
        'Identify three independent variables that could help predict house prices.',
        'A model predicts salary using experience, education, and skill score. Explain why using multiple variables may be more useful than using experience alone.',
        'Build a multiple linear regression model in Python using at least three input features and evaluate its performance.',
      ],

      questions: [
        {
          q: 'What is multiple linear regression?',
          a: 'It is a regression technique that predicts one numerical dependent variable using two or more independent variables.',
        },
        {
          q: 'What is the difference between simple and multiple linear regression?',
          a: 'Simple linear regression uses one independent variable, while multiple linear regression uses two or more independent variables.',
        },
        {
          q: 'What is the multiple linear regression equation?',
          a: 'Y = b0 + b1X1 + b2X2 + ... + bnXn, where each coefficient represents the effect associated with its predictor, holding other included predictors constant.',
        },
        {
          q: 'What does a regression coefficient represent?',
          a: 'It represents the expected change in the predicted outcome for a one-unit increase in that predictor, holding the other predictors constant.',
        },
        {
          q: 'Can multiple linear regression use categorical variables?',
          a: 'Yes. Categorical variables can be converted into numerical indicator variables using techniques such as one-hot encoding.',
        },
        {
          q: 'What is multicollinearity?',
          a: 'It occurs when two or more independent variables are highly linearly related, making individual coefficient estimates less reliable.',
        },
      ],

      detail:
        'Each coefficient describes the expected change in the dependent variable for a one-unit increase in its corresponding independent variable, while holding other included predictors constant. The intercept represents the predicted outcome when all predictors are zero.',

      pitfalls: [
        'Adding more features does not always improve the model on unseen data.',
        'Check for multicollinearity between independent variables.',
        'Categorical variables need suitable encoding.',
        'Avoid data leakage when preparing training and testing datasets.',
        'A high R-squared does not automatically mean that the model is reliable.',
      ],

      code: `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, r2_score

# Dataset
data = {
    "Experience": [1, 2, 3, 4, 5, 6, 7, 8],
    "Education": [12, 14, 15, 16, 16, 18, 18, 20],
    "SkillScore": [50, 55, 60, 65, 70, 75, 85, 90],
    "Salary": [25000, 30000, 35000, 40000,
               45000, 55000, 65000, 75000]
}

df = pd.DataFrame(data)

# Independent variables
X = df[["Experience", "Education", "SkillScore"]]

# Dependent variable
y = df["Salary"]

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=42
)

# Train model
model = LinearRegression()
model.fit(X_train, y_train)

# Predict
predictions = model.predict(X_test)

print("Coefficients:", model.coef_)
print("Intercept:", model.intercept_)
print("R-squared:", r2_score(y_test, predictions))
print("MAE:", mean_absolute_error(y_test, predictions))

# Predict salary for a new employee
new_employee = pd.DataFrame({
    "Experience": [5],
    "Education": [16],
    "SkillScore": [75]
})

print("Predicted Salary:", model.predict(new_employee)[0])`,
    }),

    // --------------------------------------------------
    // 6. R-SQUARED AND ADJUSTED R-SQUARED
    // --------------------------------------------------
    lesson({
      slug: 'r-squared-adjusted-r-squared',
      title: 'R-squared and Adjusted R-squared',
      summary:
        'Learn how to evaluate how well a regression model explains the variation in the target variable.',

      definition:
        'R-squared (R²) measures the proportion of variation in the dependent variable explained by a regression model relative to a baseline that predicts the mean. Adjusted R-squared modifies R-squared by considering the number of predictors and sample size.',

      why:
        'When building regression models, we need to understand how much of the variation in the target variable is explained by the model. Adjusted R-squared also helps us evaluate whether adding more predictors genuinely improves model fit after accounting for model complexity.',

      purpose:
        'To evaluate the explanatory fit of a regression model and compare models with different numbers of predictors.',

      when: [
        'When evaluating simple linear regression.',
        'When comparing multiple linear regression models.',
        'When checking whether additional independent variables improve model fit.',
        'When analyzing how much variation in sales or salary is explained by a model.',
        'When comparing models that use different numbers of predictors on the same response data.',
      ],

      simpleExample:
        'Suppose a regression model has R-squared = 0.80. This means that the model explains 80% of the observed variation in the target variable relative to the mean-only baseline. The remaining 20% is not explained by the fitted model.',

      realLife: {
        problem:
          'A company builds two salary prediction models. The first uses experience only, while the second uses experience, education, and skills.',
        approach: [
          'Train both regression models on comparable data.',
          'Calculate R-squared for both models.',
          'Calculate adjusted R-squared to account for the number of predictors.',
          'Compare their results and evaluate performance on unseen data.',
        ],
        outcome:
          'The company understands whether additional predictors improve model fit and whether the improvement is worth the added complexity.',
      },

      tasks: [
        'Interpret an R-squared value of 0.75 for a house price prediction model.',
        'A model has R-squared = 0.90 and adjusted R-squared = 0.65. Explain why the values may differ.',
        'Build two regression models using different numbers of predictors and compare their R-squared and adjusted R-squared values.',
      ],

      questions: [
        {
          q: 'What is R-squared?',
          a: 'R-squared measures the proportion of variation in the dependent variable explained by the fitted regression model relative to a mean-only baseline.',
        },
        {
          q: 'What is the range of R-squared?',
          a: 'For ordinary least squares regression with an intercept, it generally ranges from 0 to 1 on the training data. On test data, or in some models without an intercept, it can be negative.',
        },
        {
          q: 'What does R-squared = 0.90 mean?',
          a: 'It means the model explains 90% of the observed variation in the target variable relative to the baseline, for the evaluated dataset.',
        },
        {
          q: 'What is adjusted R-squared?',
          a: 'It is a modified version of R-squared that accounts for the number of predictors and sample size.',
        },
        {
          q: 'Why do we use adjusted R-squared?',
          a: 'Because ordinary R-squared cannot decrease when additional predictors are added to an ordinary least squares model with an intercept. Adjusted R-squared penalizes unnecessary predictors.',
        },
        {
          q: 'Can R-squared be negative?',
          a: 'Yes. It can be negative when the model performs worse than predicting the mean on the evaluated data, such as on a test dataset.',
        },
        {
          q: 'Does a high R-squared guarantee a good model?',
          a: 'No. A model can have high R-squared and still suffer from overfitting, biased assumptions, poor predictions on new data, or misleading relationships.',
        },
      ],

      detail:
        'For ordinary least squares regression with an intercept, R-squared generally increases or stays the same when predictors are added to the same training dataset. Adjusted R-squared can increase or decrease depending on whether the added predictors improve fit enough to justify their complexity. Always combine these metrics with residual analysis and test-set performance.',

      pitfalls: [
        'A high R-squared does not prove that the model is accurate on new data.',
        'R-squared does not prove causation.',
        'Adjusted R-squared is not a replacement for test-set evaluation.',
        'Do not compare R-squared values from unrelated target variables or incompatible datasets.',
        'A low R-squared does not automatically mean a model is useless.',
      ],

      code: `import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score
from sklearn.model_selection import train_test_split

data = {
    "Experience": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    "Education": [12, 14, 15, 16, 16, 18, 18, 20, 20, 21],
    "Salary": [20, 25, 30, 35, 40, 48, 55, 65, 70, 80]
}

df = pd.DataFrame(data)

X = df[["Experience", "Education"]]
y = df["Salary"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = LinearRegression()
model.fit(X_train, y_train)

predictions = model.predict(X_test)

r2 = r2_score(y_test, predictions)

n = len(y_test)
p = X_test.shape[1]

if n > p + 1:
    adjusted_r2 = 1 - (
        (1 - r2) * (n - 1) / (n - p - 1)
    )
else:
    adjusted_r2 = float("nan")

print("R-squared:", r2)
print("Adjusted R-squared:", adjusted_r2)

# Note: For model selection, calculate these
# metrics on the same evaluation dataset.`,
    }),

    // --------------------------------------------------
    // 7. RESIDUAL ANALYSIS
    // --------------------------------------------------
    lesson({
      slug: 'residual-analysis',
      title: 'Residual Analysis',
      summary:
        'Understand how to inspect prediction errors and identify problems in a regression model.',

      definition:
        'Residual analysis is the process of examining the differences between actual observed values and predicted values from a regression model to evaluate whether the model fits the data appropriately.',

      why:
        'A model may produce predictions that look reasonable but still have hidden problems. Residual analysis helps identify patterns, outliers, nonlinearity, unequal error variance, and other issues.',

      purpose:
        'To evaluate regression model assumptions, understand prediction errors, and identify areas where the model may need improvement.',

      when: [
        'After training a linear regression model.',
        'When checking whether a linear relationship is appropriate.',
        'When identifying unusual observations or outliers.',
        'When checking whether error variance is approximately constant.',
        'When evaluating whether regression assumptions are reasonable.',
      ],

      simpleExample:
        'A model predicts a house price of ₹50 lakh, but the actual house price is ₹55 lakh. The residual is ₹5 lakh because the actual value is greater than the predicted value.',

      realLife: {
        problem:
          'A real estate company builds a regression model to predict property prices but wants to understand why some predictions are inaccurate.',
        approach: [
          'Calculate predicted property prices using the model.',
          'Calculate residuals by subtracting predictions from actual prices.',
          'Plot residuals against predicted values.',
          'Check for patterns, extreme errors, and changing error variance.',
          'Improve the model if the residuals reveal systematic problems.',
        ],
        outcome:
          'The company understands where the model makes errors and whether the regression assumptions appear reasonable.',
      },

      tasks: [
        'A model predicts a house price of ₹40 lakh, but the actual price is ₹45 lakh. Calculate the residual.',
        'Explain what a random scatter of residuals around zero indicates.',
        'Create a regression model in Python and plot residuals against predicted values to identify possible model problems.',
      ],

      questions: [
        {
          q: 'What is a residual?',
          a: 'A residual is the difference between an observed value and its predicted value.',
        },
        {
          q: 'What is the formula for residual?',
          a: 'Residual = Actual value - Predicted value.',
        },
        {
          q: 'What does a residual of zero mean?',
          a: 'The predicted value exactly matches the observed value for that observation.',
        },
        {
          q: 'What should a good residual plot look like?',
          a: 'For a suitable regression model, residuals should generally appear randomly scattered around zero without a clear systematic pattern.',
        },
        {
          q: 'What does a curved pattern in a residual plot indicate?',
          a: 'It may indicate that the model is missing a nonlinear relationship or is otherwise incorrectly specified.',
        },
        {
          q: 'What is the difference between residual and error?',
          a: 'A residual is calculated from observed sample data and fitted predictions. A statistical error is the unobserved difference between an observation and the true population regression relationship.',
        },
      ],

      detail:
        'A residual is calculated as actual value minus predicted value. Positive residuals mean the model underpredicted the observation, while negative residuals mean it overpredicted. A useful residual plot should show no strong systematic pattern. Residual analysis can also include checking a Q-Q plot for approximate normality when that assumption is relevant to inference.',

      pitfalls: [
        'Do not confuse residuals with percentage errors.',
        'A good-looking residual plot does not guarantee that every regression assumption is satisfied.',
        'Do not automatically remove every large residual.',
        'Residual normality is mainly relevant to certain forms of statistical inference, not a universal requirement for accurate predictions.',
        'Always investigate systematic residual patterns.',
      ],

      code: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression

X = np.array([1, 2, 3, 4, 5, 6, 7, 8]).reshape(-1, 1)
y = np.array([20, 25, 31, 35, 42, 45, 52, 55])

model = LinearRegression()
model.fit(X, y)

# Predictions
predictions = model.predict(X)

# Calculate residuals
residuals = y - predictions

print("Actual Values:", y)
print("Predicted Values:", predictions)
print("Residuals:", residuals)

# Residual plot
plt.scatter(predictions, residuals)
plt.axhline(y=0, linestyle="--")
plt.xlabel("Predicted Values")
plt.ylabel("Residuals")
plt.title("Residual Analysis")
plt.show()`,
    }),

    // --------------------------------------------------
    // 8. MULTICOLLINEARITY
    // --------------------------------------------------
    lesson({
      slug: 'multicollinearity',
      title: 'Multicollinearity',
      summary:
        'Understand what happens when independent variables in a regression model are highly related to each other.',

      definition:
        'Multicollinearity occurs when two or more independent variables in a regression model have a strong linear relationship with one another.',

      why:
        'When independent variables contain similar information, it becomes difficult for a regression model to separate their individual contributions. This can make coefficient estimates unstable and difficult to interpret.',

      purpose:
        'To identify and manage highly related independent variables so that regression coefficients can be interpreted more reliably.',

      when: [
        'When building multiple linear regression models.',
        'When regression coefficients change significantly after adding or removing predictors.',
        'When independent variables measure similar characteristics.',
        'When investigating unusually large standard errors of regression coefficients.',
        'When checking Variance Inflation Factor (VIF) values.',
      ],

      simpleExample:
        'Suppose a house price model uses both house size in square feet and house size in square meters. These variables contain almost identical information and will be highly correlated, creating multicollinearity.',

      realLife: {
        problem:
          'A real estate company predicts property prices using house size in square feet, house size in square meters, and number of bedrooms.',
        approach: [
          'Calculate correlations between independent variables.',
          'Inspect the relationships between similar features.',
          'Calculate Variance Inflation Factor (VIF).',
          'Identify redundant variables.',
          'Consider removing, combining, or regularizing highly related predictors when appropriate.',
        ],
        outcome:
          'The company can build a more interpretable regression model with reduced redundancy among its predictors.',
      },

      tasks: [
        'Explain multicollinearity using house size in square feet and square meters.',
        'A regression model has a VIF value of 12 for one predictor. Explain why this may be a concern.',
        'Create a Python program to calculate VIF for multiple independent variables and suggest a suitable way to investigate high values.',
      ],

      questions: [
        {
          q: 'What is multicollinearity?',
          a: 'It occurs when two or more independent variables in a regression model are strongly linearly related.',
        },
        {
          q: 'Why is multicollinearity a problem?',
          a: 'It can make individual regression coefficients unstable, increase their standard errors, and make it difficult to identify each predictor’s separate contribution.',
        },
        {
          q: 'What is VIF?',
          a: 'Variance Inflation Factor measures how much the variance of an estimated regression coefficient is inflated because of linear relationships with other predictors.',
        },
        {
          q: 'What does VIF = 1 mean?',
          a: 'It indicates that the predictor has no linear relationship with the other predictors in the model.',
        },
        {
          q: 'What does a high VIF indicate?',
          a: 'It indicates that a predictor may be strongly explained by other independent variables, suggesting possible multicollinearity.',
        },
        {
          q: 'How can we handle multicollinearity?',
          a: 'We can investigate redundant variables, remove or combine predictors, use dimensionality reduction, or apply regularization depending on the goal.',
        },
        {
          q: 'Does multicollinearity always reduce prediction accuracy?',
          a: 'No. It mainly makes individual coefficient estimates difficult to interpret and unstable. Prediction performance may remain acceptable.',
        },
      ],

      detail:
        'VIF is calculated by regressing one predictor against all the other predictors and measuring how well those predictors explain it. VIF = 1 indicates no linear relationship with the other predictors. Values above 5 or 10 are sometimes used as investigation guidelines, but there is no universal cutoff. A high VIF should be interpreted in the context of the model and its purpose.',

      pitfalls: [
        'Do not assume that every high correlation between predictors makes a model unusable.',
        'Do not remove variables without considering their business or scientific importance.',
        'A high VIF does not automatically mean that the model has poor predictive performance.',
        'Standardization alone does not remove multicollinearity.',
        'Check the relationship between predictors, not only their relationship with the target.',
      ],

      code: `import pandas as pd
from statsmodels.stats.outliers_influence import variance_inflation_factor
from statsmodels.tools.tools import add_constant

data = {
    "HouseSize": [1000, 1200, 1400, 1600, 1800, 2000],
    "HouseSizeMeters": [93, 111, 130, 149, 167, 186],
    "Bedrooms": [2, 2, 3, 3, 4, 4],
    "Age": [10, 8, 7, 5, 4, 2]
}

df = pd.DataFrame(data)

# Add intercept
X = add_constant(df)

# Calculate VIF
vif_data = pd.DataFrame()

vif_data["Feature"] = X.columns

vif_data["VIF"] = [
    variance_inflation_factor(X.values, i)
    for i in range(X.shape[1])
]

print(vif_data)

# Investigate high VIF values.
# Do not remove a feature automatically.`,
    }),

    // --------------------------------------------------
    // 9. HETEROSCEDASTICITY
    // --------------------------------------------------
    lesson({
      slug: 'heteroscedasticity',
      title: 'Heteroscedasticity',
      summary:
        'Understand when the variance of regression errors changes across different predicted values or input levels.',

      definition:
        'Heteroscedasticity occurs when the variance of the errors or residuals in a regression model is not constant across observations or levels of the predictors.',

      why:
        'Ordinary least squares regression commonly relies on constant error variance for standard statistical inference. When this assumption is violated, the usual standard errors and statistical tests may become unreliable.',

      purpose:
        'To identify unequal error variance and choose appropriate methods to improve regression inference.',

      when: [
        'When analyzing residual plots after linear regression.',
        'When predicting house prices across different price ranges.',
        'When studying salary differences across experience levels.',
        'When residuals become more spread out as predicted values increase.',
        'When checking regression assumptions before interpreting p-values and confidence intervals.',
      ],

      simpleExample:
        'A model predicts the monthly spending of customers. For customers with low predicted spending, prediction errors are small. For customers with high predicted spending, prediction errors are much larger. This changing error variance may indicate heteroscedasticity.',

      realLife: {
        problem:
          'A bank builds a regression model to predict customer spending. The prediction errors become larger for customers with higher income.',
        approach: [
          'Train the regression model.',
          'Calculate residuals for all observations.',
          'Create a residual-versus-fitted-values plot.',
          'Check whether residual spread changes across predicted values.',
          'Consider robust standard errors, transformations, or an appropriate model.',
        ],
        outcome:
          'The bank identifies changing error variance and can use more suitable methods for reliable statistical inference.',
      },

      tasks: [
        'Explain heteroscedasticity using customer spending predictions.',
        'A residual plot shows a funnel-shaped pattern. Explain what it may indicate.',
        'Create a Python program to inspect residual variance and perform the Breusch-Pagan test.',
      ],

      questions: [
        {
          q: 'What is heteroscedasticity?',
          a: 'It occurs when the variance of regression errors is not constant across observations.',
        },
        {
          q: 'What is homoscedasticity?',
          a: 'It means that the variance of regression errors is approximately constant across observations.',
        },
        {
          q: 'How can we detect heteroscedasticity?',
          a: 'We can inspect residual plots or use statistical tests such as the Breusch-Pagan test.',
        },
        {
          q: 'What does a funnel-shaped residual plot indicate?',
          a: 'It may indicate that residual variance increases or decreases as predicted values change.',
        },
        {
          q: 'Why is heteroscedasticity a problem?',
          a: 'In ordinary least squares regression, it can make conventional standard errors, p-values, and confidence intervals unreliable.',
        },
        {
          q: 'How can we handle heteroscedasticity?',
          a: 'We can use heteroscedasticity-robust standard errors, suitable transformations, weighted least squares, or another appropriate model.',
        },
        {
          q: 'Does heteroscedasticity make OLS coefficients automatically biased?',
          a: 'No. Under the usual exogeneity and other relevant assumptions, OLS coefficient estimates can remain unbiased, but conventional inference becomes unreliable and OLS may be inefficient.',
        },
      ],

      detail:
        'Homoscedasticity means the residual variance is approximately constant. Heteroscedasticity means the residual variance changes. A funnel-shaped pattern in a residual plot is a common warning sign. The Breusch-Pagan test evaluates whether residual variance is related to explanatory variables. A small p-value provides evidence against constant variance under the test assumptions.',

      pitfalls: [
        'Do not confuse heteroscedasticity with multicollinearity.',
        'A residual plot should be examined rather than relying only on one statistical test.',
        'Heteroscedasticity does not automatically mean OLS coefficients are biased.',
        'Robust standard errors improve inference but do not automatically fix model misspecification.',
        'Do not transform variables without understanding how the transformation affects interpretation.',
      ],

      code: `import pandas as pd
import statsmodels.api as sm
import matplotlib.pyplot as plt

from statsmodels.stats.diagnostic import het_breuschpagan

data = {
    "Experience": [1, 2, 3, 4, 5, 6, 7, 8],
    "Salary": [20, 25, 30, 38, 45, 55, 75, 95]
}

df = pd.DataFrame(data)

X = sm.add_constant(df["Experience"])
y = df["Salary"]

# Fit regression model
model = sm.OLS(y, X).fit()

# Calculate residuals
residuals = model.resid
predictions = model.fittedvalues

# Residual plot
plt.scatter(predictions, residuals)
plt.axhline(y=0, linestyle="--")
plt.xlabel("Predicted Values")
plt.ylabel("Residuals")
plt.title("Checking Heteroscedasticity")
plt.show()

# Breusch-Pagan test
test = het_breuschpagan(
    residuals,
    model.model.exog
)

labels = [
    "LM Statistic",
    "LM P-value",
    "F Statistic",
    "F P-value"
]

print(dict(zip(labels, test)))

# A small p-value provides evidence
# against constant error variance.`,
    }),

    // --------------------------------------------------
    // 10. AUTOCORRELATION
    // --------------------------------------------------
    lesson({
      slug: 'autocorrelation',
      title: 'Autocorrelation',
      summary:
        'Learn how errors or observations can be related to their previous values, especially in time-series data.',

      definition:
        'Autocorrelation is the relationship between a variable and its own past values at different time lags. In regression analysis, error autocorrelation occurs when regression errors are correlated across observations, often over time.',

      why:
        'Many datasets contain observations collected over time, such as daily sales, monthly revenue, and stock prices. Consecutive observations or model errors may be related. Ignoring this relationship can lead to unreliable statistical inference and poor forecasting.',

      purpose:
        'To identify relationships across time and check whether regression errors are independent across observations.',

      when: [
        'When analyzing daily or monthly sales data.',
        'When forecasting stock prices or financial indicators.',
        'When studying monthly website traffic.',
        'When analyzing weather or temperature measurements over time.',
        'When checking whether regression residuals are correlated across time.',
      ],

      simpleExample:
        'Suppose a company records daily sales. If sales are high today, they may also be high tomorrow because of an ongoing marketing campaign. This relationship between current and previous observations is an example of autocorrelation.',

      realLife: {
        problem:
          'An e-commerce company builds a model to forecast daily sales but notices that prediction errors remain positive for several consecutive days.',
        approach: [
          'Collect daily sales data over a suitable period.',
          'Train a regression model to predict sales.',
          'Calculate the model residuals in chronological order.',
          'Inspect residual autocorrelation using an autocorrelation plot.',
          'Use an appropriate time-series model or account for temporal dependence.',
        ],
        outcome:
          'The company identifies time-related patterns and can improve forecasting and statistical inference by accounting for temporal dependence.',
      },

      tasks: [
        'Explain autocorrelation using daily website traffic.',
        'A regression model has positively correlated residuals across consecutive days. Explain what this indicates.',
        'Create a Python program that calculates and plots autocorrelation for daily sales data and explain how to interpret the results.',
      ],

      questions: [
        {
          q: 'What is autocorrelation?',
          a: 'It measures the relationship between a variable and its own past or lagged values.',
        },
        {
          q: 'What is lag in autocorrelation?',
          a: 'A lag represents the number of time steps between two observations being compared.',
        },
        {
          q: 'What does positive autocorrelation mean?',
          a: 'It means observations or errors tend to move in the same direction across nearby time periods.',
        },
        {
          q: 'What does negative autocorrelation mean?',
          a: 'It means observations or errors tend to move in opposite directions across nearby time periods.',
        },
        {
          q: 'How can we detect autocorrelation in regression residuals?',
          a: 'We can use residual autocorrelation plots, the Durbin-Watson statistic, and the Ljung-Box test.',
        },
        {
          q: 'What is the Durbin-Watson test?',
          a: 'It is a statistical test commonly used to check for first-order autocorrelation in regression residuals.',
        },
        {
          q: 'What does a Durbin-Watson value near 2 indicate?',
          a: 'It generally suggests little first-order autocorrelation in the residuals.',
        },
        {
          q: 'How can autocorrelation be handled?',
          a: 'Depending on the problem, we can include lagged variables, use time-series models, or use methods that account for serially correlated errors.',
        },
      ],

      detail:
        'Autocorrelation is often examined at different lags. Positive autocorrelation means nearby values tend to be similar, while negative autocorrelation means nearby values tend to move in opposite directions. The Durbin-Watson statistic ranges approximately from 0 to 4: values near 2 suggest little first-order autocorrelation, values below 2 suggest positive autocorrelation, and values above 2 suggest negative autocorrelation. The statistic has limitations and should not be treated as a complete test for all forms of serial dependence.',

      pitfalls: [
        'Do not randomly shuffle time-series data before chronological model evaluation.',
        'Autocorrelation is different from correlation between two separate variables.',
        'A Durbin-Watson value near 2 does not rule out autocorrelation at higher lags.',
        'Ignoring temporal dependence can produce unreliable standard errors.',
        'Always preserve the chronological order when evaluating forecasting models.',
      ],

      code: `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

from statsmodels.graphics.tsaplots import plot_acf
from statsmodels.stats.stattools import durbin_watson

# Sample daily sales data
sales = pd.Series([
    100, 110, 115, 120, 130,
    125, 140, 150, 155, 165,
    170, 180, 175, 190, 200,
    210, 205, 220, 230, 240
])

# Calculate autocorrelation at different lags
print("Lag 1 Autocorrelation:", sales.autocorr(lag=1))
print("Lag 2 Autocorrelation:", sales.autocorr(lag=2))

# Plot autocorrelation
plot_acf(sales, lags=8)
plt.title("Sales Autocorrelation")
plt.show()

# Durbin-Watson is normally applied to
# regression residuals, not raw sales values.
residuals = np.array([
    2, 3, 1, 4, 2, 5, 3, 6, 4, 7
])

dw = durbin_watson(residuals)

print("Durbin-Watson Statistic:", dw)`,
    }),
  ],
}

export default ch
