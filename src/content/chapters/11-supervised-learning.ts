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
  number: 12,
  title: 'Supervised Learning Models',
  tagline:
    'Learn how machines use labeled data to predict numerical values and classify observations using popular machine learning algorithms.',
  priority: 'extreme',
  topics: [
    lesson({
      slug: 'linear-regression',
      title: 'Linear Regression',
      summary:
        'Learn how to predict continuous numerical values by modeling a linear relationship between an input variable and a target.',
      definition:
        'Linear Regression is a supervised machine learning algorithm used to predict a continuous numerical target. It models the relationship between an independent variable and a dependent variable using a straight-line equation.',
      why:
        'Linear regression provides a simple and interpretable way to predict numerical outcomes. It also helps understand how changes in an input variable are associated with changes in the predicted target.',
      purpose:
        'The purpose is to estimate a numerical output using a linear relationship between input features and a target variable.',
      when: [
        'When predicting continuous values such as salary, sales, marks, or house prices.',
        'When the relationship between predictors and target is reasonably linear.',
        'When you need an interpretable baseline regression model.',
        'When estimating the relationship between one predictor and a numerical outcome.',
        'When you want to understand the direction and size of a predictor coefficient.',
      ],
      simpleExample:
        `Suppose students who study more hours generally receive higher examination marks. A linear regression model learns a line from previous student records and uses study hours to predict marks for a new student.`,
      detail:
        'Simple linear regression uses the equation:\n\n\\[\\hat{y} = b_0 + b_1x\\]\n\nWhere:\n\n- **ŷ:** Predicted output.\n- **b₀:** Intercept.\n- **b₁:** Slope or coefficient.\n- **x:** Input feature.\n\nThe model commonly learns its coefficients using Ordinary Least Squares (OLS), which minimizes the sum of squared residuals.\n\nA residual is the difference between the actual target and the predicted target.\n\nFor multiple input features, the model becomes multiple linear regression. The standard linear regression model can also be written as a linear combination of several features.',
      realLife: {
        problem:
          'An educational institute wants to predict student examination marks based on the number of hours students study.',
        approach: [
          'Collect historical study-hour and examination-mark data.',
          'Separate study hours as the input feature and marks as the target.',
          'Split observations into training and testing sets.',
          'Train a Linear Regression model using the training data.',
          'Predict marks on unseen testing data.',
          'Evaluate the model using MAE, RMSE, and R².',
        ],
        outcome:
          'The institute gets a baseline model for estimating marks and can interpret how study hours relate to predicted performance.',
      },
      tasks: [
        'Create a dataset containing study hours and examination marks. Train a simple Linear Regression model.',
        'Interpret the slope and intercept of your model and predict marks for a student who studies 6 hours.',
        'Build a Linear Regression model using a real-world dataset, evaluate it with MAE, RMSE, and R², and inspect its residual plot.',
      ],
      questions: [
        {
          q: 'What is Linear Regression?',
          a: 'Linear Regression is a supervised learning algorithm that predicts continuous numerical values by modeling a linear relationship between input features and a target.',
        },
        {
          q: 'What is the difference between independent and dependent variables?',
          a: 'An independent variable is an input or predictor used by the model. A dependent variable is the output or target the model tries to predict.',
        },
        {
          q: 'What is the slope in Linear Regression?',
          a: 'The slope represents the expected change in the predicted target for a one-unit increase in the input variable.',
        },
        {
          q: 'What is the intercept?',
          a: 'The intercept is the predicted target value when the input variables are zero. Its practical interpretation depends on whether zero is meaningful in the dataset.',
        },
        {
          q: 'What is the cost function used in Linear Regression?',
          a: 'A common objective is Mean Squared Error or the equivalent sum of squared residuals. The model chooses coefficients that minimize this error.',
        },
        {
          q: 'What is a residual?',
          a: 'A residual is the difference between an actual target value and the model prediction.',
        },
        {
          q: 'What are the evaluation metrics for Linear Regression?',
          a: 'Common metrics include MAE, MSE, RMSE, and R².',
        },
        {
          q: 'What are common assumptions of classical Linear Regression?',
          a: 'Common assumptions for classical inference include linearity in parameters, independent errors, constant error variance, and no perfect multicollinearity. Residual normality is often considered for exact small-sample inference.',
        },
      ],
      code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

data = {
    "study_hours": [1, 2, 3, 4, 5, 6, 7, 8],
    "marks": [35, 40, 50, 55, 65, 70, 80, 90]
}

df = pd.DataFrame(data)

X = df[["study_hours"]]
y = df["marks"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=42
)

model = LinearRegression()
model.fit(X_train, y_train)

predictions = model.predict(X_test)

print("Slope:", model.coef_[0])
print("Intercept:", model.intercept_)
print("MAE:", mean_absolute_error(y_test, predictions))
print("RMSE:", np.sqrt(mean_squared_error(y_test, predictions)))
print("R2:", r2_score(y_test, predictions))

new_student = pd.DataFrame({"study_hours": [6]})
print("Predicted Marks:", model.predict(new_student)[0])

plt.scatter(X, y, label="Actual data")
plt.plot(X, model.predict(X), label="Regression line")
plt.xlabel("Study Hours")
plt.ylabel("Marks")
plt.title("Linear Regression")
plt.legend()
plt.show()`,
      pitfalls: [
        'Using Linear Regression when the relationship is strongly nonlinear without suitable feature transformations.',
        'Evaluating the model only on training data.',
        'Ignoring outliers and influential observations.',
        'Assuming a high R² automatically means accurate predictions.',
        'Extrapolating far beyond the range of training data.',
        'Interpreting association as proof of causation.',
      ],
    }),

    lesson({
      slug: 'multiple-regression',
      title: 'Multiple Regression',
      summary:
        'Understand how to predict a continuous target using multiple independent variables in one regression model.',
      definition:
        'Multiple Linear Regression is a supervised learning algorithm that predicts a continuous numerical target using two or more independent variables.',
      why:
        'Most real-world outcomes depend on multiple factors. Multiple regression allows a model to consider several predictors simultaneously instead of relying on only one feature.',
      purpose:
        'The purpose is to understand and predict an outcome using multiple relevant features while estimating the relationship between each predictor and the target, holding the other included predictors constant.',
      when: [
        'When several factors influence a numerical outcome.',
        'When predicting house prices using area, bedrooms, and location-related features.',
        'When predicting student marks using study hours, attendance, and previous marks.',
        'When analyzing sales using advertising, price, and customer traffic.',
        'When comparing the contribution of several predictors.',
      ],
      simpleExample:
        `A student's final marks may depend on study hours, attendance, and previous examination marks. Multiple regression combines these features to estimate final marks.`,
      detail:
        'Multiple regression uses the equation:\n\n\\[\\hat{y} = b_0 + b_1x_1 + b_2x_2 + \\cdots + b_nx_n\\]\n\nWhere:\n\n- **ŷ:** Predicted target.\n- **b₀:** Intercept.\n- **b₁, b₂, ..., bₙ:** Regression coefficients.\n- **x₁, x₂, ..., xₙ:** Independent variables.\n\nEach coefficient represents the expected change in the predicted target for a one-unit increase in that feature, holding other included predictors constant.\n\nImportant concepts:\n\n- **Multicollinearity:** Strong linear relationships among predictors.\n- **Overfitting:** A model learns noise instead of general patterns.\n- **Feature selection:** Choosing useful input variables.\n- **Adjusted R²:** Adjusts R² for the number of predictors and sample size.\n- **Residual analysis:** Checks whether errors show systematic patterns.',
      realLife: {
        problem:
          'A school wants to predict students’ final examination marks using study hours, attendance, and previous examination performance.',
        approach: [
          'Collect study hours, attendance, previous marks, and final marks.',
          'Clean the dataset and handle missing values.',
          'Select relevant independent variables.',
          'Split the dataset into training and testing sets.',
          'Train a Multiple Linear Regression model.',
          'Evaluate its predictions and inspect the coefficients.',
        ],
        outcome:
          'The school gets a model that considers several academic factors when estimating final marks.',
      },
      tasks: [
        'Create a dataset with study hours, attendance, previous marks, and final marks. Train a multiple regression model.',
        'Compare a simple regression model with a multiple regression model using MAE, RMSE, and R².',
        'Build a multiple regression model on a real dataset. Investigate multicollinearity, inspect coefficients, and evaluate performance on unseen data.',
      ],
      questions: [
        {
          q: 'What is Multiple Linear Regression?',
          a: 'Multiple Linear Regression predicts a continuous numerical target using two or more independent variables.',
        },
        {
          q: 'What is the difference between simple and multiple regression?',
          a: 'Simple regression uses one predictor, while multiple regression uses two or more predictors.',
        },
        {
          q: 'What does a regression coefficient represent?',
          a: 'It represents the expected change in the predicted target for a one-unit increase in that predictor, holding other included predictors constant.',
        },
        {
          q: 'What is multicollinearity?',
          a: 'Multicollinearity occurs when two or more independent variables are strongly linearly related. It can make coefficient estimates unstable and increase standard errors.',
        },
        {
          q: 'How can multicollinearity be detected?',
          a: 'It can be investigated using a correlation matrix and Variance Inflation Factor (VIF).',
        },
        {
          q: 'What is Adjusted R-squared?',
          a: 'Adjusted R-squared modifies R² by accounting for the number of predictors and sample size. It can decrease when an unhelpful predictor is added.',
        },
        {
          q: 'Does adding more features always improve a regression model?',
          a: 'No. Irrelevant features can increase overfitting and reduce generalization to unseen data.',
        },
        {
          q: 'Why do we split a dataset into training and testing sets?',
          a: 'The training set is used to fit the model, while the testing set estimates how well it performs on unseen observations.',
        },
      ],
      code: `import pandas as pd
import numpy as np

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

data = {
    "study_hours": [1, 2, 3, 4, 5, 6, 7, 8],
    "attendance": [50, 55, 60, 65, 75, 80, 90, 95],
    "previous_marks": [35, 40, 45, 50, 60, 65, 75, 85],
    "final_marks": [38, 43, 52, 57, 68, 73, 83, 92]
}

df = pd.DataFrame(data)

X = df[
    ["study_hours", "attendance", "previous_marks"]
]

y = df["final_marks"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=42
)

model = LinearRegression()
model.fit(X_train, y_train)

predictions = model.predict(X_test)

print("MAE:", mean_absolute_error(y_test, predictions))
print("RMSE:", np.sqrt(mean_squared_error(y_test, predictions)))
print("R2:", r2_score(y_test, predictions))

coefficients = pd.DataFrame({
    "Feature": X.columns,
    "Coefficient": model.coef_
})

print("\\nCoefficients:")
print(coefficients)

print("Intercept:", model.intercept_)

new_student = pd.DataFrame({
    "study_hours": [6],
    "attendance": [85],
    "previous_marks": [70]
})

print("Predicted Marks:", model.predict(new_student)[0])`,
      pitfalls: [
        'Including irrelevant or redundant features.',
        'Ignoring multicollinearity.',
        'Using features that contain information from the target or future data.',
        'Comparing coefficients without considering their different units.',
        'Evaluating only on training data.',
        'Assuming regression coefficients prove causal relationships.',
      ],
    }),

    lesson({
      slug: 'logistic-regression',
      title: 'Logistic Regression',
      summary:
        'Learn how to predict class probabilities and classify observations into categories using a logistic function.',
      definition:
        'Logistic Regression is a supervised classification algorithm used to estimate the probability that an observation belongs to a particular class. Despite its name, it is primarily used for classification rather than continuous-value prediction.',
      why:
        'Many real-world problems require predicting categories rather than numerical values. Logistic regression provides a relatively simple, interpretable method for binary classification and can also support multiclass classification.',
      purpose:
        'The purpose is to estimate class probabilities and assign observations to categories using a decision threshold.',
      when: [
        'When predicting whether an email is spam or not spam.',
        'When predicting whether a customer will leave a service.',
        'When classifying a loan application as approved or rejected.',
        'When predicting whether a student will pass or fail.',
        'When you need interpretable classification probabilities.',
      ],
      simpleExample:
        'A college wants to predict whether a student will pass an examination. The model uses attendance and study hours to estimate a probability of passing. If the predicted probability is at least 0.5, the model classifies the student as likely to pass, using that chosen threshold.',
      detail:
        'Logistic regression applies the sigmoid function to a linear combination of features:\n\n\\[P(Y=1|X) = \\frac{1}{1 + e^{-z}}\\]\n\nWhere:\n\n\\[z = b_0 + b_1x_1 + \\cdots + b_nx_n\\]\n\nThe sigmoid function converts a real-valued score into a probability between 0 and 1.\n\nClassification process:\n\n1. The model receives input features.\n2. It calculates a linear score.\n3. The sigmoid function converts the score into a probability.\n4. A decision threshold converts the probability into a predicted class.\n\nFor binary classification, 0.5 is a common default threshold, but the best threshold depends on the problem and the costs of false positives and false negatives.\n\nLogistic regression commonly uses log loss (binary cross-entropy) as its objective and regularization to control model complexity.',
      realLife: {
        problem:
          'An online learning platform wants to predict whether a student is likely to complete a course.',
        approach: [
          'Collect historical student data.',
          'Use attendance, study hours, and assignment completion as features.',
          'Label past students as completed or not completed.',
          'Train a Logistic Regression classifier.',
          'Evaluate predictions using precision, recall, F1-score, and ROC-AUC.',
          'Select a decision threshold suitable for the business objective.',
        ],
        outcome:
          'The platform can identify students who may need additional support and prioritize interventions.',
      },
      tasks: [
        'Create a binary dataset with student attendance and pass/fail labels. Train a Logistic Regression classifier.',
        'Compare model performance using accuracy, precision, recall, and F1-score.',
        'Build a Logistic Regression model for customer churn prediction. Experiment with different classification thresholds and explain the effect on precision and recall.',
      ],
      questions: [
        {
          q: 'What is Logistic Regression?',
          a: 'Logistic Regression is a supervised classification algorithm that estimates the probability of an observation belonging to a class.',
        },
        {
          q: 'Why is Logistic Regression used for classification?',
          a: 'It uses a logistic function to convert a linear score into a probability that can be used to classify observations.',
        },
        {
          q: 'What is the sigmoid function?',
          a: 'The sigmoid function maps any real-valued input to a value between 0 and 1.',
        },
        {
          q: 'What is the default classification threshold?',
          a: 'A threshold of 0.5 is commonly used for binary classification, but it can be adjusted based on the problem.',
        },
        {
          q: 'What is the difference between Linear Regression and Logistic Regression?',
          a: 'Linear Regression predicts continuous numerical values, while Logistic Regression estimates class probabilities for classification.',
        },
        {
          q: 'What is log loss?',
          a: 'Log loss measures how well predicted class probabilities match actual binary labels. It penalizes confident incorrect predictions heavily.',
        },
        {
          q: 'What is the difference between precision and recall?',
          a: 'Precision measures how many predicted positives are actually positive. Recall measures how many actual positives the model correctly identifies.',
        },
        {
          q: 'Can Logistic Regression handle multiple classes?',
          a: 'Yes. It can use strategies such as one-vs-rest or multinomial logistic regression, depending on the implementation.',
        },
      ],
      code: `import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    classification_report
)

data = {
    "study_hours": [1, 2, 2, 3, 4, 5, 6, 7, 8, 9],
    "attendance": [30, 40, 45, 50, 60, 65, 75, 80, 90, 95],
    "passed": [0, 0, 0, 0, 1, 1, 1, 1, 1, 1]
}

df = pd.DataFrame(data)

X = df[["study_hours", "attendance"]]
y = df["passed"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42, stratify=y
)

model = LogisticRegression()
model.fit(X_train, y_train)

predictions = model.predict(X_test)
probabilities = model.predict_proba(X_test)[:, 1]

print("Accuracy:", accuracy_score(y_test, predictions))
print("Precision:", precision_score(y_test, predictions, zero_division=0))
print("Recall:", recall_score(y_test, predictions, zero_division=0))
print("F1 Score:", f1_score(y_test, predictions, zero_division=0))

print("\\nClassification Report:")
print(classification_report(y_test, predictions, zero_division=0))

new_student = pd.DataFrame({
    "study_hours": [6],
    "attendance": [80]
})

print("Pass Probability:", model.predict_proba(new_student)[0][1])
print("Predicted Class:", model.predict(new_student)[0])`,
      pitfalls: [
        'Thinking Logistic Regression predicts continuous numerical values.',
        'Assuming 0.5 is always the best classification threshold.',
        'Using accuracy alone on imbalanced datasets.',
        'Ignoring feature scaling when regularization is used and features have very different scales.',
        'Ignoring class imbalance.',
        'Interpreting model probabilities as perfectly calibrated without checking calibration.',
      ],
    }),

    lesson({
      slug: 'decision-trees',
      title: 'Decision Trees',
      summary:
        'Understand how a tree-based algorithm makes predictions by repeatedly splitting data using feature-based rules.',
      definition:
        'A Decision Tree is a supervised learning algorithm that makes predictions by splitting a dataset into smaller groups using decision rules. It can be used for both classification and regression.',
      why:
        'Decision trees can model nonlinear relationships and interactions between features. Their rule-based structure also makes individual predictions relatively easy to explain.',
      purpose:
        'The purpose is to divide observations into increasingly homogeneous groups so that predictions can be made from the resulting tree structure.',
      when: [
        'When the relationship between features and target is nonlinear.',
        'When you need a model that supports both classification and regression.',
        'When feature interactions may influence the target.',
        'When you want understandable rule-based predictions.',
        'When you need a baseline tree-based model.',
      ],
      simpleExample:
        'A school wants to predict whether a student will pass. A decision tree may first check attendance. If attendance is high, it may check study hours. Based on these conditions, the student is classified as likely to pass or fail.',
      detail:
        'A decision tree contains:\n\n- **Root node:** The first decision point.\n- **Internal node:** A feature-based decision or split.\n- **Branch:** The outcome of a decision.\n- **Leaf node:** The final prediction.\n\nHow it works:\n\n1. The algorithm evaluates possible feature splits.\n2. It selects a split that improves node purity or reduces prediction error.\n3. It divides the dataset into child nodes.\n4. It repeats the process until a stopping condition is reached.\n5. It predicts using the final leaf node.\n\nCommon splitting criteria:\n\n- **Gini impurity:** Measures class mixing in classification nodes.\n- **Entropy:** Measures uncertainty in classification nodes.\n- **Information gain:** Measures reduction in entropy after a split.\n- **Mean Squared Error:** Commonly used for regression tree splits.\n\nImportant hyperparameters include max_depth, min_samples_split, min_samples_leaf, and max_features.',
      realLife: {
        problem:
          'A bank wants to classify loan applicants as likely to repay or default based on their financial information.',
        approach: [
          'Collect labeled historical loan records.',
          'Prepare features such as income, credit score, and existing debt.',
          'Train a Decision Tree classifier.',
          'Limit tree depth to control complexity.',
          'Evaluate predictions using precision, recall, F1-score, and a confusion matrix.',
        ],
        outcome:
          'The bank gets a rule-based classification model that can help identify applicants with different repayment risk profiles.',
      },
      tasks: [
        'Train a Decision Tree classifier using a small student pass/fail dataset.',
        'Compare trees with different max_depth values and observe how their training and testing scores change.',
        'Train and evaluate a Decision Tree on a real classification dataset. Visualize the tree and explain its important decision rules.',
      ],
      questions: [
        {
          q: 'What is a Decision Tree?',
          a: 'A Decision Tree is a supervised learning algorithm that predicts outcomes using a sequence of feature-based decision rules.',
        },
        {
          q: 'Can Decision Trees be used for regression?',
          a: 'Yes. Classification trees predict categories, while regression trees predict numerical values.',
        },
        {
          q: 'What is the root node?',
          a: 'The root node is the first node in a decision tree and represents the first split of the dataset.',
        },
        {
          q: 'What is Gini impurity?',
          a: 'Gini impurity measures how mixed the classes are within a node. Lower impurity indicates a more homogeneous node.',
        },
        {
          q: 'What is entropy in a Decision Tree?',
          a: 'Entropy measures class uncertainty or impurity within a node. A split that reduces entropy can provide information gain.',
        },
        {
          q: 'What is information gain?',
          a: 'Information gain measures how much a split reduces entropy compared with the parent node.',
        },
        {
          q: 'Why do Decision Trees overfit?',
          a: 'A deep tree can learn noise and very specific patterns in training data, leading to poor performance on unseen data.',
        },
        {
          q: 'How can you prevent Decision Tree overfitting?',
          a: 'Use pruning and control parameters such as max_depth, min_samples_split, and min_samples_leaf.',
        },
      ],
      code: `import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier, plot_tree
from sklearn.metrics import accuracy_score, classification_report
import matplotlib.pyplot as plt

data = {
    "study_hours": [1, 2, 2, 3, 4, 5, 6, 7, 8, 9],
    "attendance": [30, 40, 45, 50, 60, 65, 75, 80, 90, 95],
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
    min_samples_leaf=1,
    random_state=42
)

model.fit(X_train, y_train)

predictions = model.predict(X_test)

print("Accuracy:", accuracy_score(y_test, predictions))
print(classification_report(y_test, predictions, zero_division=0))

plt.figure(figsize=(12, 7))

plot_tree(
    model,
    feature_names=X.columns,
    class_names=["Fail", "Pass"],
    filled=True
)

plt.title("Student Performance Decision Tree")
plt.show()`,
      pitfalls: [
        'Allowing the tree to grow too deep.',
        'Ignoring overfitting and testing performance.',
        'Assuming feature importance proves causation.',
        'Using a single tree without considering its instability.',
        'Failing to tune stopping and pruning parameters.',
      ],
    }),

    lesson({
      slug: 'k-nearest-neighbours',
      title: 'K-Nearest Neighbours (KNN)',
      summary:
        'Learn how to classify or predict an observation using the closest examples in the training dataset.',
      definition:
        'K-Nearest Neighbours is a supervised, instance-based learning algorithm that makes predictions using the K closest training observations to a new data point.',
      why:
        'KNN provides a simple approach to classification and regression. It can capture nonlinear decision boundaries without explicitly learning a parametric model during training.',
      purpose:
        'The purpose is to predict the class or numerical value of a new observation based on the examples that are closest to it in feature space.',
      when: [
        'When working with small or medium-sized datasets.',
        'When nearby observations are likely to have similar outcomes.',
        'When relationships are nonlinear.',
        'When you need a simple classification or regression baseline.',
        'When the dataset has meaningful distance measurements between observations.',
      ],
      simpleExample:
        'Suppose a new student has study hours and attendance similar to three students who passed and two who failed. With K = 5, KNN checks the five nearest students and predicts the majority class.',
      detail:
        'How KNN works:\n\n1. Choose the number of neighbors K.\n2. Calculate the distance between a new observation and the training observations.\n3. Select the K nearest observations.\n4. For classification, predict the majority class.\n5. For regression, predict an average or distance-weighted average of neighbor targets.\n\nA common distance measure is Euclidean distance:\n\n\\[d(x,y) = \\sqrt{\\sum_{i=1}^{n}(x_i-y_i)^2}\\]\n\nImportant considerations:\n\n- **K value:** Small K can create noisy predictions; large K can oversmooth local patterns.\n- **Feature scaling:** Important because features with larger numerical ranges can dominate distance calculations.\n- **Distance metric:** Euclidean, Manhattan, and other metrics may be suitable depending on the data.\n- **Computational cost:** Predictions may become expensive for large training datasets.',
      realLife: {
        problem:
          'An educational platform wants to classify a new student based on the performance of similar existing students.',
        approach: [
          'Collect labeled student records.',
          'Select numerical features such as study hours and attendance.',
          'Scale features using training data.',
          'Choose a suitable K value.',
          'Find the nearest training observations for each new student.',
          'Predict the majority class and evaluate the results.',
        ],
        outcome:
          'The platform can classify students using the behavior and outcomes of similar historical students.',
      },
      tasks: [
        'Create a small student dataset and classify a new student using KNN with K = 3.',
        'Compare KNN models using K values of 1, 3, 5, and 7. Explain the effect on performance.',
        'Build a KNN classifier using a real dataset. Apply feature scaling, tune K with cross-validation, and evaluate the final model.',
      ],
      questions: [
        {
          q: 'What is K-Nearest Neighbours?',
          a: 'KNN is a supervised learning algorithm that predicts an observation using the labels or values of its K closest training observations.',
        },
        {
          q: 'What does K represent in KNN?',
          a: 'K represents the number of nearest training observations used to make a prediction.',
        },
        {
          q: 'How does KNN classify a new observation?',
          a: 'It finds the K closest training observations and predicts the majority class among them, optionally using distance weighting.',
        },
        {
          q: 'What happens when K is too small?',
          a: 'The model may become sensitive to noise and individual observations, leading to overfitting.',
        },
        {
          q: 'What happens when K is too large?',
          a: 'The model may become too smooth and overlook local patterns, potentially causing underfitting.',
        },
        {
          q: 'Why is feature scaling important in KNN?',
          a: 'KNN relies on distance calculations. Features with larger numerical ranges can dominate the distance unless features are scaled appropriately.',
        },
        {
          q: 'Is KNN a lazy learning algorithm?',
          a: 'Yes. KNN stores training examples and performs much of its computation when making predictions instead of learning a compact model during training.',
        },
        {
          q: 'Can KNN be used for regression?',
          a: 'Yes. KNN regression predicts a numerical value using the average or distance-weighted average of nearby observations.',
        },
      ],
      code: `import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.pipeline import make_pipeline
from sklearn.metrics import accuracy_score, classification_report

data = {
    "study_hours": [1, 2, 2, 3, 4, 5, 6, 7, 8, 9],
    "attendance": [30, 40, 45, 50, 60, 65, 75, 80, 90, 95],
    "passed": [0, 0, 0, 0, 1, 1, 1, 1, 1, 1]
}

df = pd.DataFrame(data)

X = df[["study_hours", "attendance"]]
y = df["passed"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42, stratify=y
)

model = make_pipeline(
    StandardScaler(),
    KNeighborsClassifier(n_neighbors=3)
)

model.fit(X_train, y_train)

predictions = model.predict(X_test)

print("Accuracy:", accuracy_score(y_test, predictions))
print(classification_report(y_test, predictions, zero_division=0))

new_student = pd.DataFrame({
    "study_hours": [5],
    "attendance": [75]
})

print("Predicted Class:", model.predict(new_student)[0])`,
      pitfalls: [
        'Choosing K without validation.',
        'Ignoring feature scaling.',
        'Using an inappropriate distance metric.',
        'Using KNN on very high-dimensional data without considering distance concentration.',
        'Ignoring prediction-time computational cost.',
        'Allowing class imbalance to dominate majority voting.',
      ],
    }),

    lesson({
      slug: 'support-vector-machines',
      title: 'Support Vector Machines (SVM)',
      summary:
        'Understand how Support Vector Machines find decision boundaries that separate classes with a large margin.',
      definition:
        'Support Vector Machine is a supervised learning algorithm used mainly for classification, although it also supports regression. It identifies a decision boundary, called a hyperplane, that separates classes while maximizing the margin between them.',
      why:
        'SVM can perform well on high-dimensional datasets and can model nonlinear decision boundaries using kernel functions.',
      purpose:
        'The purpose is to find a decision boundary that separates classes with a large margin and generalizes well to unseen observations.',
      when: [
        'When solving binary classification problems.',
        'When working with small or medium-sized datasets.',
        'When the number of features is relatively high.',
        'When classes can be separated using a linear or kernel-based boundary.',
        'When you want to experiment with linear and nonlinear decision boundaries.',
      ],
      simpleExample:
        'Imagine a dataset containing students who passed and failed. An SVM tries to find a boundary that separates the two groups while keeping the largest possible distance from the closest observations of each class.',
      detail:
        'Important SVM concepts:\n\n- **Hyperplane:** The decision boundary separating classes.\n- **Margin:** The distance between the hyperplane and the nearest training observations.\n- **Support vectors:** Training observations closest to the decision boundary; they influence its position.\n- **Kernel:** A function that allows the algorithm to model nonlinear decision boundaries.\n\nCommon kernels:\n\n- **Linear:** Uses a linear decision boundary.\n- **Polynomial:** Models polynomial relationships.\n- **RBF:** Models flexible nonlinear boundaries using a radial basis function.\n\nImportant hyperparameters:\n\n- **C:** Controls the trade-off between margin width and training misclassification. Larger C penalizes training errors more strongly.\n- **Gamma:** For RBF and other applicable kernels, controls how far the influence of individual observations extends.\n- **Kernel:** Specifies the type of decision boundary.\n\nSVM often benefits from feature scaling because its optimization and distance-based kernel calculations depend on feature magnitudes.',
      realLife: {
        problem:
          'A company wants to classify incoming emails as spam or not spam using numerical text features.',
        approach: [
          'Collect labeled email records.',
          'Convert email content into numerical features.',
          'Split the data into training and testing sets.',
          'Scale features where appropriate.',
          'Train an SVM classifier using a suitable kernel.',
          'Tune C and gamma using cross-validation.',
          'Evaluate using precision, recall, F1-score, and ROC-AUC.',
        ],
        outcome:
          'The company gets a classification model that can distinguish spam and legitimate emails.',
      },
      tasks: [
        'Train a linear SVM classifier using a small binary student dataset.',
        'Compare linear and RBF kernels on the same dataset and explain the differences.',
        'Build an SVM model using a real classification dataset. Scale features, tune C and gamma using cross-validation, and evaluate performance.',
      ],
      questions: [
        {
          q: 'What is a Support Vector Machine?',
          a: 'SVM is a supervised learning algorithm that finds a decision boundary separating classes while maximizing the margin.',
        },
        {
          q: 'What is a hyperplane?',
          a: 'A hyperplane is the decision boundary used by an SVM to separate observations belonging to different classes.',
        },
        {
          q: 'What are support vectors?',
          a: 'Support vectors are the training observations closest to the decision boundary. They strongly influence the learned hyperplane.',
        },
        {
          q: 'What is the margin in SVM?',
          a: 'The margin is the distance between the decision boundary and the closest observations from the classes.',
        },
        {
          q: 'What is the kernel trick?',
          a: 'The kernel trick allows SVM to model nonlinear relationships by computing similarities corresponding to an implicit higher-dimensional feature space.',
        },
        {
          q: 'What is the difference between linear and RBF kernels?',
          a: 'A linear kernel creates a linear decision boundary, while an RBF kernel can create flexible nonlinear decision boundaries.',
        },
        {
          q: 'What does the C parameter control?',
          a: 'C controls the penalty for training errors. A larger C prioritizes fitting training observations, while a smaller C allows more violations in exchange for a wider margin.',
        },
        {
          q: 'Why is feature scaling important in SVM?',
          a: 'Feature scaling prevents large-magnitude features from dominating the model and is especially important for distance-based kernels.',
        },
        {
          q: 'Can SVM be used for regression?',
          a: 'Yes. Support Vector Regression (SVR) predicts continuous numerical values using a margin-based approach.',
        },
      ],
      code: `import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, classification_report

data = {
    "study_hours": [1, 2, 2, 3, 4, 5, 6, 7, 8, 9],
    "attendance": [30, 40, 45, 50, 60, 65, 75, 80, 90, 95],
    "passed": [0, 0, 0, 0, 1, 1, 1, 1, 1, 1]
}

df = pd.DataFrame(data)

X = df[["study_hours", "attendance"]]
y = df["passed"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42, stratify=y
)

model = make_pipeline(
    StandardScaler(),
    SVC(
        kernel="rbf",
        C=1.0,
        gamma="scale"
    )
)

model.fit(X_train, y_train)

predictions = model.predict(X_test)

print("Accuracy:", accuracy_score(y_test, predictions))
print(classification_report(y_test, predictions, zero_division=0))

new_student = pd.DataFrame({
    "study_hours": [5],
    "attendance": [75]
})

print("Predicted Class:", model.predict(new_student)[0])`,
      pitfalls: [
        'Forgetting to scale features.',
        'Choosing C and gamma without validation.',
        'Using an unnecessarily complex kernel.',
        'Ignoring class imbalance.',
        'Assuming SVM always performs well on large datasets.',
        'Treating support vectors as the only observations used during all prediction operations.',
      ],
    }),

    lesson({
      slug: 'random-forest',
      title: 'Random Forest',
      summary:
        'Learn how an ensemble of decision trees combines predictions to improve model stability and predictive performance.',
      definition:
        'Random Forest is a supervised ensemble learning algorithm that builds multiple decision trees using bootstrap samples and random subsets of features. It combines their predictions to produce a final classification or regression result.',
      why:
        'A single decision tree can be unstable and prone to overfitting. Random Forest reduces variance by combining predictions from many diverse trees.',
      purpose:
        'The purpose is to produce more stable and often more accurate predictions by combining multiple decision trees instead of depending on one tree.',
      when: [
        'When solving classification or regression problems.',
        'When relationships between features and target are nonlinear.',
        'When feature interactions may be important.',
        'When you want a strong tree-based baseline.',
        'When you need a model that usually requires less feature scaling than distance-based algorithms.',
      ],
      simpleExample:
        'Suppose a school wants to predict whether a student will pass or fail. Instead of using one decision tree, Random Forest trains many trees. Each tree predicts a class, and the forest combines their votes to make the final prediction.',
      detail:
        'How Random Forest works:\n\n1. It creates multiple bootstrap samples from the training dataset.\n2. It trains a decision tree on each sample.\n3. At each split, each tree considers a random subset of available features.\n4. The trees grow independently according to their stopping rules.\n5. Their predictions are combined.\n\nPrediction methods:\n\n- **Classification:** Majority voting or averaged class probabilities.\n- **Regression:** Average predictions from individual trees.\n\nImportant hyperparameters:\n\n- **n_estimators:** Number of trees in the forest.\n- **max_depth:** Maximum depth of each tree.\n- **max_features:** Number or proportion of features considered at each split.\n- **min_samples_split:** Minimum observations required to split a node.\n- **min_samples_leaf:** Minimum observations required in a leaf.\n\nRandom Forest uses bagging and feature randomness to make individual trees less correlated. It can estimate feature importance, but importance values should be interpreted carefully, especially when features are correlated or have different numbers of possible split points.',
      realLife: {
        problem:
          'A bank wants to predict whether a customer is likely to default on a loan.',
        approach: [
          'Collect historical customer and loan records.',
          'Prepare features such as income, credit history, loan amount, and repayment behavior.',
          'Split the data into training and testing sets.',
          'Train a Random Forest classifier.',
          'Tune the number of trees and tree-depth parameters.',
          'Evaluate using precision, recall, F1-score, and ROC-AUC.',
          'Inspect feature importance as a starting point for further analysis.',
        ],
        outcome:
          'The bank gets an ensemble classification model that combines multiple decision trees to estimate default risk.',
      },
      tasks: [
        'Train a Random Forest classifier using a student pass/fail dataset.',
        'Compare a single Decision Tree with Random Forest using the same train/test split.',
        'Build a Random Forest model on a real dataset. Tune its hyperparameters, evaluate performance, and investigate feature importance.',
      ],
      questions: [
        {
          q: 'What is Random Forest?',
          a: 'Random Forest is an ensemble learning algorithm that combines predictions from multiple decision trees to improve stability and predictive performance.',
        },
        {
          q: 'Why is Random Forest called an ensemble algorithm?',
          a: 'It combines multiple individual models, called decision trees, to produce a final prediction.',
        },
        {
          q: 'What is bagging?',
          a: 'Bagging trains multiple models on bootstrap samples of the training data and combines their predictions to reduce variance.',
        },
        {
          q: 'How does Random Forest make predictions?',
          a: 'For classification, it combines tree votes or class probabilities. For regression, it averages the predictions of individual trees.',
        },
        {
          q: 'What is the difference between Decision Tree and Random Forest?',
          a: 'A Decision Tree uses one tree, while Random Forest combines many randomized trees. Random Forest is generally more stable and less prone to variance from an individual tree.',
        },
        {
          q: 'What is feature randomness in Random Forest?',
          a: 'At each split, a tree considers only a randomly selected subset of features rather than every feature.',
        },
        {
          q: 'Does Random Forest require feature scaling?',
          a: 'Usually not. Tree-based models generally do not depend on distance calculations or gradient-based optimization that requires features to be on comparable scales.',
        },
        {
          q: 'What is out-of-bag evaluation?',
          a: 'Out-of-bag evaluation uses training observations not selected in a particular tree’s bootstrap sample to estimate model performance.',
        },
        {
          q: 'Can Random Forest be used for regression?',
          a: 'Yes. Random Forest Regressor averages predictions from multiple regression trees to predict continuous numerical values.',
        },
      ],
      code: `import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix
)

data = {
    "study_hours": [1, 2, 2, 3, 4, 5, 6, 7, 8, 9],
    "attendance": [30, 40, 45, 50, 60, 65, 75, 80, 90, 95],
    "previous_marks": [20, 30, 35, 40, 55, 60, 70, 80, 85, 90],
    "passed": [0, 0, 0, 0, 1, 1, 1, 1, 1, 1]
}

df = pd.DataFrame(data)

X = df[
    ["study_hours", "attendance", "previous_marks"]
]

y = df["passed"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42, stratify=y
)

model = RandomForestClassifier(
    n_estimators=100,
    max_depth=5,
    random_state=42
)

model.fit(X_train, y_train)

predictions = model.predict(X_test)

print("Accuracy:", accuracy_score(y_test, predictions))
print("\\nConfusion Matrix:")
print(confusion_matrix(y_test, predictions))

print("\\nClassification Report:")
print(classification_report(y_test, predictions, zero_division=0))

# Feature importance
importance = pd.DataFrame({
    "Feature": X.columns,
    "Importance": model.feature_importances_
}).sort_values(
    by="Importance",
    ascending=False
)

print("\\nFeature Importance:")
print(importance)

new_student = pd.DataFrame({
    "study_hours": [6],
    "attendance": [85],
    "previous_marks": [70]
})

print("Predicted Class:", model.predict(new_student)[0])`,
      pitfalls: [
        'Assuming more trees always improve performance significantly.',
        'Ignoring class imbalance.',
        'Using feature importance as proof of causation.',
        'Assuming Random Forest always outperforms every individual model.',
        'Ignoring hyperparameter tuning and validation.',
        'Using a random split for data that requires time-based validation.',
        'Ignoring the model size and prediction cost when deploying many trees.',
      ],
    }),
  ],
}

export default ch