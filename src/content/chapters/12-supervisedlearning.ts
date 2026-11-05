
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
        ? [{ heading: 'How it works', body: data.detail }]
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
          'Identify the concept or build a basic model and explain how it works.',
      },
      {
        id: `${data.slug}-task-2`,
        title: 'Compare',
        difficulty: 'medium',
        task: data.tasks[1],
        expectedOutcome:
          'Compare model behavior and interpret the results using appropriate evaluation metrics.',
      },
      {
        id: `${data.slug}-task-3`,
        title: 'Apply it',
        difficulty: 'hard',
        task: data.tasks[2],
        expectedOutcome:
          'Apply the algorithm to a realistic dataset, evaluate its performance, and explain its limitations.',
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
  id: 'supervised-learning',
  number: 11,
  title: 'Supervised Learning',
  tagline:
    'Understand how machines learn from labeled data to predict numerical values and classify observations.',
  priority: 'extreme',
  topics: [
    lesson({
      slug: 'introduction-to-supervised-learning',
      title: 'Introduction to Supervised Learning',
      summary:
        'Learn how supervised machine learning uses labeled examples to discover patterns and make predictions.',
      definition:
        'Supervised Learning is a machine learning approach in which a model learns from labeled training data. Each training example contains input features (X) and a known target or output (y). The model learns a relationship between X and y and uses it to predict outputs for previously unseen inputs.',
      why:
        'Supervised learning is useful because many real-world problems involve predicting an outcome from historical examples. It allows organizations to automate decisions, estimate future values, identify categories, and make data-driven predictions.',
      purpose:
        'The purpose is to learn a mapping from input features to a target variable so that the model can generalize to new observations.',
      when: [
        'When historical data contains known outcomes.',
        'When predicting numerical values such as house prices or sales.',
        'When classifying observations such as spam or non-spam emails.',
        'When automating decisions based on previously labeled examples.',
      ],
      simpleExample:
        'Suppose you have a dataset containing students’ study hours and their final exam marks. Study hours are the input feature (X), while exam marks are the target (y). A supervised learning model learns the relationship and predicts marks for a new student.',
      detail:
        'The basic workflow is:\n\n1. Collect labeled data.\n2. Separate features (X) and target (y).\n3. Split the data into training and testing sets.\n4. Train the model using the training data.\n5. Predict outcomes for unseen test data.\n6. Evaluate the predictions using suitable metrics.\n\nThe main challenge is generalization: a model should perform well on new data, not simply memorize its training examples.',
      realLife: {
        problem:
          'An educational institution wants to predict student performance using historical student records.',
        approach: [
          'Collect historical records containing attendance, study hours, and previous marks.',
          'Use the known final marks as the target variable.',
          'Train a supervised learning model on historical examples.',
          'Evaluate predictions on students whose records were not used during training.',
        ],
        outcome:
          'The institution can estimate student performance and identify students who may need additional academic support.',
      },
      tasks: [
        'Create a small dataset containing study hours and exam marks. Identify the features and target variable.',
        'Split a labeled dataset into training and testing sets using train_test_split.',
        'Train a regression model to predict student marks and evaluate its performance on unseen data.',
      ],
      code: `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error

# Labeled dataset
data = {
    "study_hours": [1, 2, 3, 4, 5, 6, 7, 8],
    "marks": [35, 40, 50, 55, 65, 70, 80, 90]
}

df = pd.DataFrame(data)

# Features and target
X = df[["study_hours"]]
y = df["marks"]

# Split the data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=42
)

# Train the model
model = LinearRegression()
model.fit(X_train, y_train)

# Make predictions
predictions = model.predict(X_test)

print("Predictions:", predictions)
print("Actual:", y_test.values)
print("MAE:", mean_absolute_error(y_test, predictions))`,
      pitfalls: [
        'Training and evaluating on the same observations can give an overly optimistic result.',
        'A model can memorize training examples instead of learning general patterns.',
        'Incorrect or inconsistent labels can reduce model quality.',
        'Data leakage can make test performance look better than real-world performance.',
      ],
      questions: [
        {
          q: 'What is supervised learning?',
          a: 'Supervised learning is a machine learning approach where a model learns from labeled data containing input features and known target values.',
          followUp:
            'Can you give an example of supervised learning? Predicting house prices using historical house data is one example.',
        },
        {
          q: 'What is labeled data?',
          a: 'Labeled data contains input observations along with their correct outputs or target values. For example, an email and its label of spam or not spam.',
        },
        {
          q: 'What are the two main types of supervised learning?',
          a: 'The two main types are regression, which predicts numerical values, and classification, which predicts categories or class labels.',
        },
        {
          q: 'Why do we split data into training and testing sets?',
          a: 'The training set is used to learn model parameters, while the testing set estimates how well the trained model performs on unseen data.',
        },
      ],
    }),

    lesson({
      slug: 'regression-in-supervised-learning',
      title: 'Regression',
      summary:
        'Understand how regression models predict continuous numerical values from input features.',
      definition:
        'Regression is a supervised learning task in which a model predicts a continuous numerical target based on one or more input features.',
      why:
        'Many business and scientific problems require numerical predictions. Regression helps estimate quantities such as prices, revenue, demand, temperature, and delivery time.',
      purpose:
        'The purpose is to estimate a numerical outcome and understand how input variables relate to that outcome.',
      when: [
        'When the target variable is continuous or numerical.',
        'When estimating house prices from property characteristics.',
        'When forecasting sales or product demand.',
        'When predicting salary, temperature, or delivery time.',
      ],
      simpleExample:
        'A model receives a house’s area, number of bedrooms, and location information and predicts its selling price. The predicted price is a numerical value, so this is a regression problem.',
      detail:
        'A regression model learns a function that maps features to a numerical target. For example:\n\nPrice = f(area, bedrooms, location)\n\nCommon regression algorithms include Linear Regression, Decision Tree Regression, Random Forest Regression, and Support Vector Regression.\n\nCommon evaluation metrics include MAE, MSE, RMSE, and R-squared.',
      realLife: {
        problem:
          'A real estate company wants to estimate property prices before listing homes for sale.',
        approach: [
          'Collect historical house prices and property information.',
          'Select relevant features such as area, bedrooms, and location.',
          'Train a regression model using historical prices.',
          'Evaluate predictions using MAE and RMSE.',
        ],
        outcome:
          'The company can generate estimated property prices to support pricing decisions.',
      },
      tasks: [
        'Create a dataset containing house areas and selling prices. Identify the numerical target.',
        'Train Linear Regression and Decision Tree Regression on the same dataset and compare their MAE.',
        'Build a regression model using multiple house features and evaluate it using MAE, RMSE, and R-squared.',
      ],
      code: `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

data = {
    "area": [800, 1000, 1200, 1500, 1800, 2000, 2200, 2500],
    "bedrooms": [2, 2, 2, 3, 3, 3, 4, 4],
    "price": [40, 50, 60, 75, 90, 100, 115, 130]
}

df = pd.DataFrame(data)

X = df[["area", "bedrooms"]]
y = df["price"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=42
)

model = RandomForestRegressor(
    n_estimators=100,
    random_state=42
)

model.fit(X_train, y_train)

predictions = model.predict(X_test)

print("MAE:", mean_absolute_error(y_test, predictions))
print("RMSE:", mean_squared_error(y_test, predictions) ** 0.5)
print("R2:", r2_score(y_test, predictions))`,
      pitfalls: [
        'Using regression when the target represents categories rather than numerical values.',
        'Assuming a regression model always produces realistic predictions outside the training range.',
        'Ignoring outliers that can strongly influence some regression algorithms.',
        'Comparing models using different test datasets.',
      ],
      questions: [
        {
          q: 'What is regression in machine learning?',
          a: 'Regression is a supervised learning task that predicts continuous numerical values using input features.',
        },
        {
          q: 'Give examples of regression problems.',
          a: 'House price prediction, sales forecasting, salary estimation, and temperature prediction are examples of regression.',
        },
        {
          q: 'Which metrics are commonly used for regression?',
          a: 'Common metrics include Mean Absolute Error (MAE), Mean Squared Error (MSE), Root Mean Squared Error (RMSE), and R-squared.',
        },
        {
          q: 'Can regression predict negative values?',
          a: 'Yes. Many regression models can produce negative predictions unless their structure or constraints prevent it. Whether that is acceptable depends on the target and problem.',
        },
      ],
    }),

    lesson({
      slug: 'classification-in-supervised-learning',
      title: 'Classification',
      summary:
        'Learn how classification models predict discrete categories or class labels.',
      definition:
        'Classification is a supervised learning task in which a model learns from labeled examples and predicts which predefined category or class an observation belongs to.',
      why:
        'Classification is important for problems where the output represents a category rather than a numerical measurement. It is widely used in fraud detection, medical screening, spam filtering, and customer segmentation tasks.',
      purpose:
        'The purpose is to assign observations to meaningful categories and, in many algorithms, estimate the probability of belonging to each class.',
      when: [
        'When the target variable contains categories.',
        'When identifying spam and non-spam emails.',
        'When predicting whether a customer will leave a service.',
        'When detecting fraudulent transactions.',
        'When classifying images into predefined categories.',
      ],
      simpleExample:
        'An email classification model examines the words and other characteristics of an email and predicts whether it belongs to the spam or not-spam category.',
      detail:
        'Classification can be divided into:\n\n- Binary classification: exactly two classes, such as fraud or legitimate.\n- Multiclass classification: more than two mutually exclusive classes, such as cat, dog, or bird.\n- Multilabel classification: one observation can have multiple labels, such as an image containing both a car and a person.\n\nCommon evaluation metrics include accuracy, precision, recall, F1-score, ROC-AUC, and the confusion matrix.',
      realLife: {
        problem:
          'A bank wants to identify potentially fraudulent transactions.',
        approach: [
          'Collect historical transactions with verified fraud labels.',
          'Prepare features such as transaction amount, time, and transaction behavior.',
          'Train a classification algorithm.',
          'Evaluate the model using precision, recall, F1-score, and a confusion matrix.',
        ],
        outcome:
          'The bank can flag suspicious transactions for additional investigation.',
      },
      tasks: [
        'Create a dataset containing customer information and a binary churn label.',
        'Train Logistic Regression and Decision Tree classifiers and compare their accuracy.',
        'Build a fraud classification model and evaluate precision, recall, F1-score, and the confusion matrix.',
      ],
      code: `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

data = {
    "study_hours": [1, 2, 2, 3, 4, 5, 6, 7, 8, 9],
    "attendance": [40, 50, 55, 60, 65, 70, 80, 85, 90, 95],
    "passed": [0, 0, 0, 0, 1, 1, 1, 1, 1, 1]
}

df = pd.DataFrame(data)

X = df[["study_hours", "attendance"]]
y = df["passed"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42, stratify=y
)

model = DecisionTreeClassifier(
    max_depth=3,
    random_state=42
)

model.fit(X_train, y_train)

predictions = model.predict(X_test)

print("Accuracy:", accuracy_score(y_test, predictions))
print("Confusion Matrix:")
print(confusion_matrix(y_test, predictions))
print("Classification Report:")
print(classification_report(y_test, predictions, zero_division=0))`,
      pitfalls: [
        'Using accuracy alone for highly imbalanced classification datasets.',
        'Ignoring the cost of false positives and false negatives.',
        'Assuming predicted probabilities are always well calibrated.',
        'Using a classification algorithm for a continuous target without defining a meaningful classification rule.',
      ],
      questions: [
        {
          q: 'What is classification in machine learning?',
          a: 'Classification is a supervised learning task that predicts discrete categories or class labels from input features.',
        },
        {
          q: 'What is the difference between binary and multiclass classification?',
          a: 'Binary classification predicts between two classes, while multiclass classification predicts one class from more than two possible classes.',
        },
        {
          q: 'What is multilabel classification?',
          a: 'Multilabel classification allows one observation to belong to multiple classes at the same time. For example, an image may contain a person, a car, and a tree.',
        },
        {
          q: 'Why is accuracy sometimes misleading?',
          a: 'With imbalanced data, a model can achieve high accuracy by predicting the majority class while failing to identify the minority class. Precision, recall, F1-score, and PR-AUC may provide more useful information.',
        },
      ],
    }),

    lesson({
      slug: 'linear-regression',
      title: 'Linear Regression',
      summary:
        'Learn how Linear Regression models the relationship between input features and a continuous target using a linear equation.',
      definition:
        'Linear Regression is a supervised learning algorithm used to predict a continuous numerical target by modeling a linear relationship between input features and the target variable.',
      why:
        'It provides a simple and interpretable baseline for numerical prediction. It also helps understand how changes in input variables are associated with changes in the predicted outcome.',
      purpose:
        'The purpose is to estimate the best-fitting linear relationship between features and a numerical target.',
      when: [
        'When predicting a continuous numerical value.',
        'When the relationship between features and target is reasonably linear.',
        'When an interpretable baseline model is required.',
        'When analyzing the effect of input variables on a numerical outcome.',
      ],
      simpleExample:
        'Suppose study hours and exam marks have a roughly linear relationship. A model might learn the equation:\n\nMarks = 30 + 7 × Study Hours\n\nFor 5 study hours, the predicted marks would be 65.',
      detail:
        'Simple Linear Regression uses one feature:\n\n\\(y = \\beta_0 + \\beta_1x + \\epsilon\\)\n\nWhere:\n- y = target variable.\n- x = input feature.\n- β₀ = intercept.\n- β₁ = slope or coefficient.\n- ε = error term.\n\nThe model commonly estimates coefficients by minimizing the sum of squared residuals (Ordinary Least Squares).\n\nMultiple Linear Regression extends this equation to multiple features.',
      realLife: {
        problem:
          'An education platform wants to estimate exam marks based on students’ study hours.',
        approach: [
          'Collect student study-hour and exam-mark records.',
          'Visualize the relationship using a scatter plot.',
          'Train a Linear Regression model.',
          'Evaluate the predictions using MAE and RMSE.',
        ],
        outcome:
          'The platform can estimate expected marks and explain the approximate relationship between study hours and performance.',
      },
      tasks: [
        'Create a dataset with study hours and exam marks and visualize it using a scatter plot.',
        'Train Linear Regression and interpret the intercept and coefficient.',
        'Evaluate a Linear Regression model using MAE, RMSE, and R-squared on unseen data.',
      ],
      code: `import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, r2_score

data = {
    "study_hours": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    "marks": [32, 40, 45, 53, 60, 65, 73, 80, 87, 95]
}

df = pd.DataFrame(data)

X = df[["study_hours"]]
y = df["marks"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = LinearRegression()
model.fit(X_train, y_train)

predictions = model.predict(X_test)

print("Intercept:", model.intercept_)
print("Coefficient:", model.coef_[0])
print("MAE:", mean_absolute_error(y_test, predictions))
print("R2:", r2_score(y_test, predictions))

plt.scatter(X, y)
plt.plot(X, model.predict(X), color="red")
plt.xlabel("Study Hours")
plt.ylabel("Marks")
plt.title("Study Hours vs Marks")
plt.show()`,
      pitfalls: [
        'Assuming every relationship is linear.',
        'Ignoring influential outliers.',
        'Interpreting correlation or regression coefficients as proof of causation.',
        'Extrapolating far beyond the range of training data.',
        'Ignoring residual patterns and model assumptions when making statistical inferences.',
      ],
      questions: [
        {
          q: 'What is Linear Regression?',
          a: 'Linear Regression is a supervised learning algorithm that predicts a continuous target using a linear equation involving one or more input features.',
        },
        {
          q: 'What is the difference between slope and intercept?',
          a: 'The slope represents the expected change in the predicted target for a one-unit increase in a feature, holding other features constant. The intercept is the predicted target when all features are zero.',
        },
        {
          q: 'What is the cost function in Linear Regression?',
          a: 'A common cost function is Mean Squared Error or the sum of squared residuals. Ordinary Least Squares chooses coefficients that minimize the sum of squared residuals.',
        },
        {
          q: 'What does a residual represent?',
          a: 'A residual is the difference between an actual target value and the corresponding predicted value.',
        },
      ],
    }),

    lesson({
      slug: 'multiple-linear-regression',
      title: 'Multiple Linear Regression',
      summary:
        'Understand how a regression model uses multiple input features to predict one continuous target.',
      definition:
        'Multiple Linear Regression is a regression algorithm that models a continuous target using two or more independent variables.',
      why:
        'Real-world outcomes are often influenced by several factors. Multiple Linear Regression allows a model to consider multiple predictors instead of relying on a single feature.',
      purpose:
        'The purpose is to estimate the combined linear relationship between several input variables and a numerical target.',
      when: [
        'When a numerical target depends on multiple features.',
        'When estimating house prices using area, bedrooms, and age.',
        'When predicting sales using advertising expenditure and seasonal factors.',
        'When studying the relationship between multiple explanatory variables and an outcome.',
      ],
      simpleExample:
        'House prices may depend on area, number of bedrooms, and property age. A model uses all these variables to estimate the house price.',
      detail:
        'The equation is:\n\n\\(y = \\beta_0 + \\beta_1x_1 + \\beta_2x_2 + \\cdots + \\beta_nx_n + \\epsilon\\)\n\nEach coefficient represents the expected change in the predicted target for a one-unit increase in its feature, while holding the other included features constant.\n\nBefore interpreting coefficients, check feature scales, relationships, multicollinearity, and the suitability of the linear model.',
      realLife: {
        problem:
          'A real estate business wants to predict house prices using multiple property characteristics.',
        approach: [
          'Collect historical prices, area, bedrooms, property age, and location features.',
          'Clean and encode the input variables.',
          'Train a Multiple Linear Regression model.',
          'Evaluate the model on unseen data and inspect residuals.',
        ],
        outcome:
          'The business can estimate house prices using several relevant property characteristics.',
      },
      tasks: [
        'Create a house dataset containing area, bedrooms, and price.',
        'Train a Multiple Linear Regression model and interpret its coefficients.',
        'Compare a single-feature model with a multiple-feature model using the same test split.',
      ],
      code: `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, r2_score

data = {
    "area": [800, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600],
    "bedrooms": [2, 2, 2, 3, 3, 3, 3, 4, 4, 4],
    "age": [15, 12, 10, 8, 7, 5, 4, 3, 2, 1],
    "price": [40, 48, 55, 65, 72, 82, 90, 105, 115, 125]
}

df = pd.DataFrame(data)

X = df[["area", "bedrooms", "age"]]
y = df["price"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = LinearRegression()
model.fit(X_train, y_train)

predictions = model.predict(X_test)

print("Intercept:", model.intercept_)
print("Coefficients:")
print(pd.Series(model.coef_, index=X.columns))

print("MAE:", mean_absolute_error(y_test, predictions))
print("R2:", r2_score(y_test, predictions))`,
      pitfalls: [
        'Adding irrelevant features can increase complexity without improving generalization.',
        'Strong multicollinearity can make individual coefficient estimates unstable.',
        'A linear model may fail to capture nonlinear relationships.',
        'A higher training R-squared does not guarantee better test performance.',
      ],
      questions: [
        {
          q: 'What is Multiple Linear Regression?',
          a: 'It is a regression technique that predicts one continuous target using two or more independent variables.',
        },
        {
          q: 'How is simple Linear Regression different from Multiple Linear Regression?',
          a: 'Simple Linear Regression uses one input feature, whereas Multiple Linear Regression uses two or more input features.',
        },
        {
          q: 'What does a regression coefficient mean?',
          a: 'It represents the expected change in the predicted target for a one-unit increase in that feature, while holding other included features constant.',
        },
        {
          q: 'What is multicollinearity?',
          a: 'Multicollinearity occurs when two or more predictors are strongly linearly related. It can make coefficient estimates and their standard errors unstable.',
        },
      ],
    }),

    lesson({
      slug: 'logistic-regression',
      title: 'Logistic Regression',
      summary:
        'Learn how Logistic Regression predicts class probabilities and performs classification using the logistic function.',
      definition:
        'Logistic Regression is a supervised classification algorithm that models the probability of an observation belonging to a particular class. For binary classification, it commonly uses the sigmoid function to convert a linear score into a probability between zero and one.',
      why:
        'It is a useful and interpretable classification baseline. It provides probability estimates and is often effective when the relationship between features and log-odds is approximately linear.',
      purpose:
        'The purpose is to estimate class probabilities and assign observations to categories using a decision threshold.',
      when: [
        'When solving binary classification problems.',
        'When predicting whether a customer will churn.',
        'When estimating whether a transaction is fraudulent.',
        'When predicting whether a student will pass or fail.',
        'When a relatively interpretable classification baseline is needed.',
      ],
      simpleExample:
        'A model predicts that a customer has a 0.85 probability of leaving a subscription service. If the decision threshold is 0.5, the model classifies the customer as likely to churn.',
      detail:
        'Logistic Regression first calculates a linear score:\n\n\\(z = \\beta_0 + \\beta_1x_1 + \\cdots + \\beta_nx_n\\)\n\nIt then applies the sigmoid function:\n\n\\(P(y=1|X) = \\frac{1}{1+e^{-z}}\\)\n\nThe output is a probability between 0 and 1. A threshold converts this probability into a predicted class.\n\nLogistic Regression is generally trained by minimizing log loss (binary cross-entropy), not ordinary squared error.',
      realLife: {
        problem:
          'A subscription company wants to identify customers who are likely to cancel their subscriptions.',
        approach: [
          'Collect historical customer data with churn labels.',
          'Prepare features such as usage, subscription length, and support requests.',
          'Train a Logistic Regression classifier.',
          'Evaluate the model using precision, recall, F1-score, and ROC-AUC.',
        ],
        outcome:
          'The company can identify customers who may need retention support.',
      },
      tasks: [
        'Create a binary dataset containing customer usage and churn labels.',
        'Train Logistic Regression and inspect its predicted probabilities.',
        'Compare different classification thresholds using precision and recall.',
      ],
      code: `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report

data = {
    "usage": [10, 15, 20, 25, 30, 35, 40, 45, 50, 55],
    "support_calls": [8, 7, 6, 6, 5, 4, 3, 2, 1, 0],
    "churn": [1, 1, 1, 1, 1, 0, 0, 0, 0, 0]
}

df = pd.DataFrame(data)

X = df[["usage", "support_calls"]]
y = df["churn"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42, stratify=y
)

model = make_pipeline(
    StandardScaler(),
    LogisticRegression(random_state=42)
)

model.fit(X_train, y_train)

predictions = model.predict(X_test)
probabilities = model.predict_proba(X_test)

print("Predictions:", predictions)
print("Probabilities:")
print(probabilities)
print("Accuracy:", accuracy_score(y_test, predictions))
print(classification_report(y_test, predictions, zero_division=0))`,
      pitfalls: [
        'Assuming Logistic Regression is a regression algorithm for continuous targets; it is commonly used for classification.',
        'Assuming the default 0.5 threshold is always appropriate.',
        'Ignoring feature scaling when predictors have very different scales.',
        'Using accuracy alone when classes are imbalanced.',
        'Assuming predicted probabilities are automatically well calibrated.',
      ],
      questions: [
        {
          q: 'Why is Logistic Regression used for classification?',
          a: 'It estimates class probabilities using a logistic function and assigns observations to classes using a decision threshold.',
        },
        {
          q: 'What is the sigmoid function?',
          a: 'The sigmoid function converts a real-valued input into a number between zero and one, making it useful for estimating binary class probabilities.',
        },
        {
          q: 'Why is Logistic Regression called regression?',
          a: 'It models a linear relationship with the log-odds of the outcome. Despite its name, it is commonly used as a classification algorithm.',
        },
        {
          q: 'What is the default classification threshold?',
          a: 'A common default threshold is 0.5 for binary classification, but it can be changed depending on the business objective and the costs of false positives and false negatives.',
        },
      ],
    }),

    lesson({
      slug: 'decision-trees',
      title: 'Decision Trees',
      summary:
        'Understand how Decision Trees make predictions by repeatedly splitting data using feature-based rules.',
      definition:
        'A Decision Tree is a supervised learning algorithm that makes predictions through a tree-like structure of decision rules. It can be used for both classification and regression.',
      why:
        'Decision Trees are easy to understand and can model nonlinear relationships and feature interactions without requiring feature scaling.',
      purpose:
        'The purpose is to divide observations into increasingly similar groups using feature-based conditions until a prediction can be made.',
      when: [
        'When an interpretable rule-based model is useful.',
        'When relationships between features and target are nonlinear.',
        'When working with numerical and encoded categorical features.',
        'When building a baseline classification or regression model.',
      ],
      simpleExample:
        'A student prediction tree might ask whether attendance is above 75%. If yes, it checks study hours. Based on the answers, it predicts whether the student is likely to pass.',
      detail:
        'A Decision Tree contains:\n\n- Root node: the first decision point.\n- Internal nodes: additional feature-based decisions.\n- Branches: outcomes of the decisions.\n- Leaf nodes: final predictions.\n\nClassification trees commonly use Gini impurity or entropy to measure class impurity. Regression trees commonly choose splits that reduce squared error or another suitable loss.\n\nTree depth, minimum samples per leaf, and pruning help control overfitting.',
      realLife: {
        problem:
          'A bank wants to classify loan applicants based on their financial and credit information.',
        approach: [
          'Collect historical applicant information and loan repayment labels.',
          'Prepare relevant features such as income and credit score.',
          'Train a Decision Tree classifier.',
          'Limit tree depth and evaluate it on unseen applicants.',
        ],
        outcome:
          'The bank obtains a model that produces understandable feature-based decision rules for loan classification.',
      },
      tasks: [
        'Create a small dataset and train a Decision Tree classifier.',
        'Experiment with max_depth values and compare training and testing accuracy.',
        'Build a Decision Tree model and visualize its decision rules using plot_tree.',
      ],
      code: `import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier, plot_tree
from sklearn.metrics import accuracy_score

data = {
    "income": [20, 25, 30, 35, 40, 50, 60, 70, 80, 90],
    "credit_score": [400, 420, 450, 480, 500, 600, 650, 700, 750, 800],
    "approved": [0, 0, 0, 0, 0, 1, 1, 1, 1, 1]
}

df = pd.DataFrame(data)

X = df[["income", "credit_score"]]
y = df["approved"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42, stratify=y
)

model = DecisionTreeClassifier(
    max_depth=3,
    min_samples_leaf=2,
    random_state=42
)

model.fit(X_train, y_train)

predictions = model.predict(X_test)

print("Accuracy:", accuracy_score(y_test, predictions))

plt.figure(figsize=(12, 7))
plot_tree(
    model,
    feature_names=X.columns,
    class_names=["Rejected", "Approved"],
    filled=True
)
plt.show()`,
      pitfalls: [
        'Allowing trees to grow too deep can cause overfitting.',
        'Small changes in training data can produce a different tree.',
        'Decision Trees can create biased splits when some features have many possible split points.',
        'A tree can be interpretable at small depths but difficult to understand when very large.',
      ],
      questions: [
        {
          q: 'What is a Decision Tree?',
          a: 'A Decision Tree is a supervised learning algorithm that makes predictions by applying a sequence of feature-based decision rules.',
        },
        {
          q: 'What are Gini impurity and entropy?',
          a: 'They are measures of class impurity used by classification trees to evaluate how well a split separates different classes.',
        },
        {
          q: 'What is pruning?',
          a: 'Pruning reduces the complexity of a Decision Tree by removing branches that may not improve generalization.',
        },
        {
          q: 'Can Decision Trees be used for regression?',
          a: 'Yes. Regression trees predict numerical values, commonly using the average target value of training observations in a leaf.',
        },
      ],
    }),

    lesson({
      slug: 'k-nearest-neighbours',
      title: 'K-Nearest Neighbours (KNN)',
      summary:
        'Learn how KNN predicts a class or numerical value using the nearest observations in the training dataset.',
      definition:
        'K-Nearest Neighbours is a supervised learning algorithm that predicts the output of a new observation based on the K closest training observations in feature space.',
      why:
        'KNN is simple and intuitive. It can model nonlinear decision boundaries and provides a useful baseline for classification and regression.',
      purpose:
        'The purpose is to use similarity between observations to make predictions for new data points.',
      when: [
        'When a simple similarity-based model is useful.',
        'When the dataset is relatively small or moderate in size.',
        'When local patterns are important.',
        'When a nonlinear classification boundary may be needed.',
      ],
      simpleExample:
        'Suppose a new fruit has a weight and size similar to five known fruits. If four of the five nearest fruits are apples, KNN predicts that the new fruit is an apple.',
      detail:
        'KNN works in the following way:\n\n1. Select a value for K.\n2. Calculate the distance between a new observation and training observations.\n3. Identify the K nearest observations.\n4. For classification, use majority voting or distance-weighted voting.\n5. For regression, commonly use the average or distance-weighted average of their target values.\n\nEuclidean distance is a common distance measure. Feature scaling is important because features with larger numerical ranges can dominate distance calculations.',
      realLife: {
        problem:
          'An online retailer wants to recommend products to customers with similar purchasing characteristics.',
        approach: [
          'Represent customers using relevant behavioral features.',
          'Scale the numerical features.',
          'Calculate distances between customer observations.',
          'Find similar customers and examine their purchasing behavior.',
        ],
        outcome:
          'The retailer can identify groups of similar customers and use their behavior to support recommendations.',
      },
      tasks: [
        'Create a small dataset with two numerical features and train a KNN classifier.',
        'Compare K values such as 1, 3, and 5 using a validation dataset.',
        'Build a scaled KNN pipeline and compare its performance with an unscaled KNN model.',
      ],
      code: `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score

data = {
    "weight": [150, 160, 170, 180, 190, 200, 210, 220, 230, 240],
    "size": [5, 5, 6, 6, 7, 7, 8, 8, 9, 9],
    "fruit": ["Apple", "Apple", "Apple", "Apple", "Apple",
              "Orange", "Orange", "Orange", "Orange", "Orange"]
}

df = pd.DataFrame(data)

X = df[["weight", "size"]]
y = df["fruit"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42, stratify=y
)

model = make_pipeline(
    StandardScaler(),
    KNeighborsClassifier(n_neighbors=3)
)

model.fit(X_train, y_train)

predictions = model.predict(X_test)

print("Predictions:", predictions)
print("Actual:", y_test.values)
print("Accuracy:", accuracy_score(y_test, predictions))`,
      pitfalls: [
        'Choosing K without validation.',
        'Ignoring feature scaling when features have different units or ranges.',
        'Using KNN on very high-dimensional data without considering distance concentration.',
        'Ignoring prediction-time cost when the training dataset is large.',
      ],
      questions: [
        {
          q: 'What is KNN?',
          a: 'KNN is a supervised learning algorithm that predicts an observation using the labels or target values of its K nearest training observations.',
        },
        {
          q: 'What does K represent in KNN?',
          a: 'K represents the number of nearest neighbors considered when making a prediction.',
        },
        {
          q: 'Why is feature scaling important in KNN?',
          a: 'KNN uses distances. A feature with a large numerical range can dominate distance calculations and distort which observations are considered nearest.',
        },
        {
          q: 'Is KNN a lazy learning algorithm?',
          a: 'Yes. KNN is called a lazy learner because it generally stores training examples and performs most of its computation when a prediction is requested.',
        },
      ],
    }),

    lesson({
      slug: 'support-vector-machines',
      title: 'Support Vector Machines (SVM)',
      summary:
        'Understand how SVM finds a decision boundary that separates classes with the largest possible margin.',
      definition:
        'Support Vector Machine is a supervised learning algorithm used for classification and regression. In classification, it finds a separating hyperplane that aims to maximize the margin between classes.',
      why:
        'SVM can perform well on datasets with clear class separation and can model nonlinear decision boundaries using kernel functions.',
      purpose:
        'The purpose is to find a decision boundary that separates observations while controlling the trade-off between margin size and classification errors.',
      when: [
        'When classification boundaries are important.',
        'When working with datasets that have many features.',
        'When a nonlinear decision boundary may be needed.',
        'When the dataset is small or medium-sized and suitable for kernel methods.',
      ],
      simpleExample:
        'Imagine plotting two groups of points representing cats and dogs using two measurements. SVM tries to find a line that separates the groups while maximizing the distance to the nearest points from both classes.',
      detail:
        'Important concepts:\n\n- Hyperplane: the decision boundary separating classes.\n- Margin: the distance between the boundary and the nearest observations.\n- Support vectors: observations closest to the decision boundary that help define the margin.\n- Kernel trick: allows SVM to represent nonlinear boundaries without explicitly computing the transformed feature coordinates.\n\nCommon kernels include linear, polynomial, and radial basis function (RBF).\n\nThe C parameter controls the trade-off between margin width and training errors. For the RBF kernel, gamma controls how far the influence of individual training points reaches.',
      realLife: {
        problem:
          'A medical research team wants to classify observations into two categories using measured patient features.',
        approach: [
          'Prepare a labeled dataset with relevant numerical measurements.',
          'Split the dataset into training and testing sets.',
          'Scale the numerical features.',
          'Train an SVM and tune C and kernel parameters using cross-validation.',
          'Evaluate classification performance using suitable metrics.',
        ],
        outcome:
          'The research team obtains a classification model that can support analysis of new observations. Its predictions should be validated before any clinical use.',
      },
      tasks: [
        'Train a linear SVM classifier on a small labeled dataset.',
        'Compare linear and RBF kernels using the same train/test split.',
        'Tune C and gamma using cross-validation and evaluate the final model on a held-out test set.',
      ],
      code: `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, classification_report

data = {
    "feature_1": [1, 2, 2, 3, 6, 7, 8, 9, 3, 8],
    "feature_2": [1, 2, 3, 2, 6, 7, 8, 9, 1, 7],
    "label": [0, 0, 0, 0, 1, 1, 1, 1, 0, 1]
}

df = pd.DataFrame(data)

X = df[["feature_1", "feature_2"]]
y = df["label"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42, stratify=y
)

model = make_pipeline(
    StandardScaler(),
    SVC(kernel="rbf", C=1.0, gamma="scale")
)

model.fit(X_train, y_train)

predictions = model.predict(X_test)

print("Accuracy:", accuracy_score(y_test, predictions))
print(classification_report(y_test, predictions, zero_division=0))`,
      pitfalls: [
        'Ignoring feature scaling.',
        'Choosing C and gamma without validation.',
        'Assuming a nonlinear kernel is always better than a linear kernel.',
        'Using kernel SVM on very large datasets without considering computational cost.',
      ],
      questions: [
        {
          q: 'What is an SVM?',
          a: 'Support Vector Machine is a supervised learning algorithm that finds a decision boundary, commonly maximizing the margin between classes.',
        },
        {
          q: 'What are support vectors?',
          a: 'Support vectors are the training observations closest to the decision boundary. They play a key role in defining the separating hyperplane.',
        },
        {
          q: 'What is the kernel trick?',
          a: 'The kernel trick allows SVM to model nonlinear relationships by computing similarities corresponding to a higher-dimensional feature space without explicitly constructing that space.',
        },
        {
          q: 'What is the difference between C and gamma?',
          a: 'C controls the penalty for classification errors and the margin trade-off. Gamma controls the influence range of individual points for kernels such as RBF.',
        },
      ],
    }),

    lesson({
      slug: 'random-forest',
      title: 'Random Forest',
      summary:
        'Learn how Random Forest combines multiple Decision Trees to improve prediction stability and reduce overfitting.',
      definition:
        'Random Forest is an ensemble learning algorithm that builds multiple Decision Trees using bootstrap samples of the training data and randomized feature subsets. It combines their predictions to produce a final output.',
      why:
        'A single Decision Tree can be sensitive to changes in training data. Combining many diverse trees often reduces variance and improves generalization.',
      purpose:
        'The purpose is to combine multiple tree models to produce more stable and reliable predictions for classification and regression tasks.',
      when: [
        'When working with tabular classification problems.',
        'When predicting numerical values using multiple features.',
        'When nonlinear relationships and feature interactions are present.',
        'When a strong tree-based baseline is needed.',
        'When feature scaling is inconvenient or unnecessary.',
      ],
      simpleExample:
        'Suppose 100 Decision Trees predict whether a customer will leave a service. If most trees predict that the customer will churn, the Random Forest classifier predicts churn based on the combined vote.',
      detail:
        'Random Forest uses two important sources of randomness:\n\n1. Bootstrap sampling: each tree is trained using a random sample of training observations drawn with replacement.\n2. Random feature selection: each split considers a randomized subset of features.\n\nFor classification, predictions are combined using voting or class probabilities. For regression, tree predictions are commonly averaged.\n\nImportant parameters include n_estimators, max_depth, max_features, min_samples_split, and min_samples_leaf.',
      realLife: {
        problem:
          'An e-commerce company wants to predict whether a customer will purchase a product.',
        approach: [
          'Collect historical customer behavior and purchase labels.',
          'Prepare relevant features such as visits, time spent, and cart activity.',
          'Train a Random Forest classifier.',
          'Tune model parameters and evaluate it on unseen customer data.',
        ],
        outcome:
          'The company can estimate purchase likelihood and identify customer behavior associated with purchasing.',
      },
      tasks: [
        'Train a Random Forest classifier on a small labeled dataset.',
        'Compare a single Decision Tree with Random Forest using the same evaluation split.',
        'Tune n_estimators, max_depth, and min_samples_leaf using cross-validation.',
      ],
      code: `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

data = {
    "visits": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    "time_spent": [2, 3, 4, 5, 6, 7, 8, 9, 10, 12],
    "cart_items": [0, 0, 1, 1, 2, 2, 3, 3, 4, 5],
    "purchased": [0, 0, 0, 0, 0, 1, 1, 1, 1, 1]
}

df = pd.DataFrame(data)

X = df[["visits", "time_spent", "cart_items"]]
y = df["purchased"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42, stratify=y
)

model = RandomForestClassifier(
    n_estimators=100,
    max_depth=4,
    min_samples_leaf=1,
    random_state=42
)

model.fit(X_train, y_train)

predictions = model.predict(X_test)

print("Accuracy:", accuracy_score(y_test, predictions))
print(classification_report(y_test, predictions, zero_division=0))

importance = pd.Series(
    model.feature_importances_,
    index=X.columns
).sort_values(ascending=False)

print("Feature Importance:")
print(importance)`,
      pitfalls: [
        'Assuming Random Forest always performs better than every other algorithm.',
        'Using feature importance as proof that a feature causes the target outcome.',
        'Ignoring class imbalance and evaluation metrics.',
        'Assuming feature importance values are unbiased for every type of feature.',
        'Using a very large forest without considering memory and prediction costs.',
      ],
      questions: [
        {
          q: 'What is Random Forest?',
          a: 'Random Forest is an ensemble algorithm that combines multiple randomized Decision Trees to make classification or regression predictions.',
        },
        {
          q: 'How does Random Forest reduce overfitting compared with a single tree?',
          a: 'It combines many diverse trees, which can reduce prediction variance compared with relying on one highly sensitive tree.',
        },
        {
          q: 'What is bootstrap sampling?',
          a: 'Bootstrap sampling creates a training sample by drawing observations with replacement from the original training dataset.',
        },
        {
          q: 'Does Random Forest require feature scaling?',
          a: 'Generally no. Tree-based models split using feature thresholds and are usually not sensitive to differences in numerical feature scales.',
        },
        {
          q: 'Can Random Forest perform regression?',
          a: 'Yes. RandomForestRegressor combines predictions from multiple regression trees, commonly by averaging their outputs.',
        },
      ],
    }),

    lesson({
      slug: 'model-training-and-testing',
      title: 'Model Training and Testing',
      summary:
        'Understand how to divide data into training, validation, and testing sets to evaluate model generalization.',
      definition:
        'Model training is the process of fitting an algorithm to training data. Model testing is the process of evaluating the trained model on separate observations that were not used to fit it.',
      why:
        'A model can perform very well on training data but poorly on new observations. Proper data splitting helps estimate how well it generalizes beyond the examples it has already seen.',
      purpose:
        'The purpose is to train models fairly, tune them without using the final test set, and obtain a more realistic estimate of predictive performance.',
      when: [
        'When developing any supervised machine learning model.',
        'When comparing different algorithms.',
        'When selecting hyperparameters.',
        'When checking whether a model is overfitting.',
      ],
      simpleExample:
        'Suppose a dataset contains 1,000 labeled customer records. You use 800 records to train a model and reserve 200 records for final testing. The model is evaluated on the reserved records after training and model selection.',
      detail:
        'A common workflow is:\n\n- Training set: used to fit the model.\n- Validation set: used to compare models and tune hyperparameters.\n- Test set: used for final evaluation after model selection.\n\nAlternatively, cross-validation can be used on the training portion for model selection, while the test set remains untouched.\n\nFor time-series data, use chronological splitting rather than random shuffling. For classification, stratified splitting can help preserve class proportions.',
      realLife: {
        problem:
          'A company wants to compare several customer churn prediction models fairly.',
        approach: [
          'Reserve a test dataset before model selection.',
          'Use training data to fit candidate models.',
          'Use cross-validation to tune and compare the candidates.',
          'Evaluate the selected model once on the untouched test dataset.',
        ],
        outcome:
          'The company obtains a more reliable estimate of how the selected model may perform on new customers.',
      },
      tasks: [
        'Split a labeled dataset into training and testing sets.',
        'Compare model performance on training and testing data to identify possible overfitting.',
        'Build a complete training workflow using cross-validation and a final untouched test set.',
      ],
      code: `import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.ensemble import RandomForestClassifier

data = {
    "hours": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    "attendance": [40, 50, 55, 60, 65, 70, 80, 85, 90, 95],
    "passed": [0, 0, 0, 0, 1, 1, 1, 1, 1, 1]
}

df = pd.DataFrame(data)

X = df[["hours", "attendance"]]
y = df["passed"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

# Cross-validation only on training data
scores = cross_val_score(
    model,
    X_train,
    y_train,
    cv=3,
    scoring="accuracy"
)

print("Cross-validation scores:", scores)
print("Mean CV accuracy:", scores.mean())

# Fit on the full training data
model.fit(X_train, y_train)

print("Training accuracy:", model.score(X_train, y_train))
print("Testing accuracy:", model.score(X_test, y_test))`,
      pitfalls: [
        'Using test data to tune hyperparameters repeatedly.',
        'Preprocessing the complete dataset before splitting when preprocessing learns from data.',
        'Using random splitting for time-series forecasting.',
        'Ignoring stratification when class proportions matter.',
        'Drawing strong conclusions from very small test datasets.',
      ],
      questions: [
        {
          q: 'What is the difference between training and testing data?',
          a: 'Training data is used to fit a model, while testing data is held aside to evaluate how well the model predicts unseen observations.',
        },
        {
          q: 'What is a validation set?',
          a: 'A validation set is used during model development to compare models and tune hyperparameters without using the final test set.',
        },
        {
          q: 'What is cross-validation?',
          a: 'Cross-validation repeatedly divides training data into training and validation folds to estimate model performance more reliably during model selection.',
        },
        {
          q: 'Why should the test set remain untouched during model selection?',
          a: 'Repeatedly using test results to make decisions causes information leakage from the test set and makes the final performance estimate overly optimistic.',
        },
      ],
    }),

    lesson({
      slug: 'overfitting-and-underfitting',
      title: 'Overfitting and Underfitting',
      summary:
        'Understand why machine learning models may learn too little or memorize training data instead of generalizing.',
      definition:
        'Underfitting occurs when a model is too simple to capture important patterns in the data. Overfitting occurs when a model learns training-specific details, including noise, and performs poorly on unseen data.',
      why:
        'Understanding these problems is essential because a model must learn useful patterns without memorizing the training examples. Both can lead to poor real-world predictions.',
      purpose:
        'The purpose is to find an appropriate balance between model complexity and generalization performance.',
      when: [
        'When training performance is much worse than expected.',
        'When training and testing scores differ significantly.',
        'When choosing model complexity or regularization strength.',
        'When tuning tree depth, KNN neighbors, or other hyperparameters.',
      ],
      simpleExample:
        'A very simple model predicts almost the same marks for every student, even though study hours matter. This is underfitting. A very complex model memorizes every training student’s marks but makes poor predictions for new students. This is overfitting.',
      detail:
        'Typical patterns:\n\n- Underfitting: high training error and high validation error.\n- Good fit: reasonably low training and validation error, with a small generalization gap.\n- Overfitting: very low training error but noticeably higher validation error.\n\nWays to reduce underfitting include increasing model capacity, adding useful features, or reducing excessive regularization.\n\nWays to reduce overfitting include regularization, pruning, more representative training data, feature selection, data augmentation where appropriate, and cross-validation.',
      realLife: {
        problem:
          'A company trains a customer purchase model that performs extremely well on historical training data but poorly on new customers.',
        approach: [
          'Compare training and validation performance.',
          'Inspect model complexity and potential data leakage.',
          'Tune model complexity using cross-validation.',
          'Evaluate the selected model on an untouched test set.',
        ],
        outcome:
          'The company can select a model that generalizes more reliably to new customer observations.',
      },
      tasks: [
        'Train a shallow Decision Tree and observe its training and testing performance.',
        'Increase tree depth and compare the training and testing scores.',
        'Use cross-validation and hyperparameter tuning to select a model that balances fit and generalization.',
      ],
      code: `from sklearn.datasets import make_moons
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score

X, y = make_moons(
    n_samples=500,
    noise=0.25,
    random_state=42
)

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=42, stratify=y
)

for depth in [1, 2, 3, 5, 10, None]:
    model = DecisionTreeClassifier(
        max_depth=depth,
        random_state=42
    )

    model.fit(X_train, y_train)

    train_score = accuracy_score(
        y_train, model.predict(X_train)
    )

    test_score = accuracy_score(
        y_test, model.predict(X_test)
    )

    print(
        f"Depth={depth}, "
        f"Training={train_score:.3f}, "
        f"Testing={test_score:.3f}"
    )`,
      pitfalls: [
        'Assuming a higher training score always means a better model.',
        'Trying to solve overfitting by repeatedly checking the test set.',
        'Assuming every difference between training and testing scores is overfitting; sampling variation also matters.',
        'Reducing model complexity too much and creating underfitting.',
      ],
      questions: [
        {
          q: 'What is overfitting?',
          a: 'Overfitting occurs when a model learns training-specific patterns or noise and performs poorly on unseen data.',
        },
        {
          q: 'What is underfitting?',
          a: 'Underfitting occurs when a model is too simple or insufficiently trained to capture important patterns in the data.',
        },
        {
          q: 'How can overfitting be reduced?',
          a: 'Methods include regularization, pruning, cross-validation, feature selection, early stopping where applicable, and collecting more representative training data.',
        },
        {
          q: 'What is the difference between training and testing error in an overfit model?',
          a: 'An overfit model often has very low training error but substantially higher validation or testing error.',
        },
      ],
    }),
  ],
}

export default ch
