
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
  id: 'scikit-learn',
  number: 16,
  title: 'Scikit-learn',
  tagline:
    'Implement Machine Learning concepts using Python and Scikit-learn, from data preparation to model training and evaluation.',
  priority: 'extreme',
  topics: [
    lesson({
      slug: 'introduction-to-scikit-learn',
      title: 'Introduction to Scikit-learn',
      summary:
        'Learn what Scikit-learn is, how to install it, and how to build your first Machine Learning model.',
      definition:
        'Scikit-learn is a popular open-source Python library used for Machine Learning. It provides ready-to-use algorithms and tools for classification, regression, clustering, preprocessing, feature selection, and model evaluation.',
      why:
        'Building Machine Learning algorithms from scratch requires a lot of code. Scikit-learn provides simple, consistent tools that make it easier to train models, make predictions, and evaluate results.',
      purpose:
        'The purpose is to help developers and data scientists implement Machine Learning algorithms without writing every algorithm from the beginning.',
      when: [
        'When building classification models.',
        'When predicting numerical values using regression.',
        'When grouping similar data using clustering.',
        'When preparing data for Machine Learning.',
        'When evaluating and comparing different models.',
      ],
      simpleExample:
        'Imagine you want to predict whether an email is spam or not. Instead of writing the complete classification algorithm yourself, you can use Scikit-learn to train a model using labeled email examples.',
      detail:
        'Scikit-learn provides tools in several areas:\n\n1. Classification: Predict categories, such as spam or not spam.\n2. Regression: Predict numerical values, such as house prices.\n3. Clustering: Group similar observations, such as customers.\n4. Preprocessing: Scale numerical features and encode categories.\n5. Model selection: Split datasets and perform cross-validation.\n6. Evaluation: Calculate accuracy, precision, recall, MAE, and other metrics.\n\nInstallation:\n\nRun `python -m pip install scikit-learn` in your terminal.\n\nImport the library in Python using `import sklearn`. Many commonly used classes are imported from modules such as `sklearn.linear_model`, `sklearn.tree`, and `sklearn.metrics`.',
      realLife: {
        problem:
          'A company wants to predict whether customers will leave its subscription service.',
        approach: [
          'Collect historical customer information.',
          'Prepare the data using Pandas and Scikit-learn preprocessing tools.',
          'Train a classification model.',
          'Evaluate the model using suitable classification metrics.',
        ],
        outcome:
          'The company gets a trained model that can estimate whether a customer is likely to leave.',
      },
      tasks: [
        'Install Scikit-learn and print its installed version.',
        'Load a built-in Scikit-learn dataset and explore its features.',
        'Build a complete classification model using a built-in dataset and evaluate its predictions.',
      ],
      questions: [
        {
          q: 'What is Scikit-learn?',
          a:
            'Scikit-learn is a Python Machine Learning library that provides tools for classification, regression, clustering, preprocessing, and model evaluation.',
        },
        {
          q: 'Why do we use Scikit-learn?',
          a:
            'It provides ready-to-use algorithms and a consistent API, making Machine Learning development easier and faster.',
        },
        {
          q: 'How do you install Scikit-learn?',
          a:
            'Run `python -m pip install scikit-learn` in the terminal.',
        },
        {
          q: 'How do you import Scikit-learn?',
          a:
            'You can import the package using `import sklearn` or import specific classes from modules such as `sklearn.linear_model`.',
        },
        {
          q: 'What types of Machine Learning does Scikit-learn support?',
          a:
            'It supports supervised learning, unsupervised learning, preprocessing, model selection, and evaluation.',
        },
      ],
      code: `# Install in your terminal:
# python -m pip install scikit-learn pandas numpy matplotlib

import sklearn
from sklearn.datasets import load_iris

print("Scikit-learn version:", sklearn.__version__)

data = load_iris()

print("Feature names:", data.feature_names)
print("Target names:", data.target_names)
print("Dataset shape:", data.data.shape)

print("First five rows:")
print(data.data[:5])`,
      pitfalls: [
        'The package is installed as scikit-learn but commonly imported as sklearn.',
        'Scikit-learn is mainly designed for traditional Machine Learning, not building deep neural networks like TensorFlow or PyTorch.',
        'Installing a library does not automatically prepare your dataset or guarantee good model performance.',
        'Use a virtual environment to keep project dependencies organized.',
      ],
    }),

    lesson({
      slug: 'scikit-learn-data-representation',
      title: 'Data Representation',
      summary:
        'Understand how Scikit-learn represents input data, features, and target labels using arrays and tables.',
      definition:
        'Data Representation describes how information is organized before it is passed to a Machine Learning algorithm. In Scikit-learn, input features are commonly represented by a two-dimensional array or DataFrame called X, while the target values are commonly represented by a one-dimensional array called y.',
      why:
        'A Machine Learning algorithm needs data in a consistent structure. Understanding X and y helps you provide the correct input and output values when training a model.',
      purpose:
        'The purpose is to organize data so that the algorithm can understand which values are inputs and which values it should predict.',
      when: [
        'When loading a dataset.',
        'When separating input columns and target columns.',
        'When passing data into fit() and predict().',
        'When converting Pandas DataFrames into NumPy arrays.',
      ],
      simpleExample:
        'Imagine predicting student marks using study hours and attendance. The X data contains study hours and attendance, while y contains the actual marks. Each row represents one student.',
      detail:
        'Consider this dataset:\n\nStudy Hours | Attendance | Marks\n2 | 70 | 45\n4 | 80 | 65\n6 | 90 | 85\n\nThe feature matrix X contains:\n\n[[2, 70], [4, 80], [6, 90]]\n\nThe target array y contains:\n\n[45, 65, 85]\n\nImportant concepts:\n\n- Samples: Individual observations or rows.\n- Features: Input variables or columns used for prediction.\n- Labels/targets: The values the model learns to predict.\n- Feature matrix: The collection of input features, usually two-dimensional.\n- Target array: The output values, usually one-dimensional.\n\nScikit-learn generally expects X to have shape `(number_of_samples, number_of_features)`. For a single feature, use a two-dimensional structure such as `[[2], [4], [6]]`, not `[2, 4, 6]`.',
      realLife: {
        problem:
          'A school wants to predict student marks using study hours and attendance.',
        approach: [
          'Represent study hours and attendance as input features.',
          'Represent student marks as the target.',
          'Organize every student as one row.',
          'Pass X and y to the selected algorithm.',
        ],
        outcome:
          'The dataset is organized in a format that Scikit-learn can use for training.',
      },
      tasks: [
        'Create a NumPy array containing three students and two features.',
        'Separate the features and target from a Pandas DataFrame.',
        'Load a real dataset and inspect the number of samples, features, and target values.',
      ],
      questions: [
        {
          q: 'What is X in Scikit-learn?',
          a:
            'X represents the input features used by a Machine Learning model. It is generally a two-dimensional structure.',
        },
        {
          q: 'What is y in Scikit-learn?',
          a:
            'y represents the target or output values that the model is trained to predict.',
        },
        {
          q: 'What is a feature?',
          a:
            'A feature is an input variable used by a model to make predictions.',
        },
        {
          q: 'What is a label?',
          a:
            'A label is the correct category or target value associated with a training example, commonly used in supervised learning.',
        },
        {
          q: 'Why should X usually be two-dimensional?',
          a:
            'Because Scikit-learn expects rows to represent samples and columns to represent features, including when there is only one feature.',
        },
      ],
      code: `import numpy as np
import pandas as pd

data = {
    "study_hours": [2, 4, 6],
    "attendance": [70, 80, 90],
    "marks": [45, 65, 85]
}

df = pd.DataFrame(data)

X = df[["study_hours", "attendance"]]
y = df["marks"]

print("Feature matrix:")
print(X)

print("\\nTarget:")
print(y)

print("\\nX shape:", X.shape)
print("y shape:", y.shape)

# NumPy representation
X_array = np.array([
    [2, 70],
    [4, 80],
    [6, 90]
])

y_array = np.array([45, 65, 85])

print("NumPy X shape:", X_array.shape)
print("NumPy y shape:", y_array.shape)`,
      pitfalls: [
        'Do not include the target column inside X when training a predictive model.',
        'Do not pass a one-dimensional array for X when Scikit-learn expects two dimensions.',
        'Keep the order of feature columns consistent between training and prediction.',
        'Do not confuse samples, features, and target values.',
      ],
    }),

    lesson({
      slug: 'scikit-learn-estimator-api',
      title: 'Estimator API: Fit, Predict and Transform',
      summary:
        'Learn the common methods used to train models, make predictions, and prepare data in Scikit-learn.',
      definition:
        'The Scikit-learn Estimator API is a common interface followed by many Scikit-learn objects. The fit() method learns from data, predict() generates predictions, and transform() applies a learned data transformation.',
      why:
        'A consistent API makes it easier to work with different algorithms. Once you understand fit(), predict(), and transform(), you can use many Scikit-learn models and preprocessing tools in a similar way.',
      purpose:
        'The purpose is to provide a consistent way to train models, transform features, and generate predictions.',
      when: [
        'When training a Machine Learning model.',
        'When generating predictions for new data.',
        'When scaling or encoding features.',
        'When building preprocessing pipelines.',
      ],
      simpleExample:
        'Imagine using Linear Regression to predict house prices. You call fit() to teach the model using house data. You call predict() to estimate the price of a new house. If you use StandardScaler, you call fit() to learn scaling values and transform() to scale the data.',
      detail:
        'The main methods are:\n\n1. fit(X, y): Learns model parameters from features and target values. Some transformers use `fit(X)` because they do not need a target.\n2. predict(X): Generates predictions using a fitted predictive model.\n3. transform(X): Applies a learned transformation to input data.\n4. fit_transform(X): Learns a transformation and applies it to the data, often used for training data.\n5. score(X, y): Returns a default score. Its meaning depends on the estimator; for example, many classifiers return accuracy and many regressors return R².\n\nAn estimator is an object that learns from data using fit(). A transformer is an estimator that can transform data. A predictor is an estimator that can make predictions.',
      realLife: {
        problem:
          'A data scientist needs to scale customer information and train a model to predict customer behavior.',
        approach: [
          'Create a StandardScaler to learn feature scaling values.',
          'Use fit_transform() on the training features.',
          'Train a classification estimator using fit().',
          'Use predict() to make predictions on prepared test data.',
        ],
        outcome:
          'The data is transformed consistently, and the trained model can make predictions.',
      },
      tasks: [
        'Train a Linear Regression model using fit() and generate predictions using predict().',
        'Use StandardScaler and compare fit(), transform(), and fit_transform().',
        'Build a Pipeline containing a preprocessing transformer and a predictive model.',
      ],
      questions: [
        {
          q: 'What is fit() in Scikit-learn?',
          a:
            'fit() learns parameters or patterns from the supplied training data.',
        },
        {
          q: 'What is predict()?',
          a:
            'predict() uses a fitted predictive model to generate outputs for new input data.',
        },
        {
          q: 'What is transform()?',
          a:
            'transform() applies a learned transformation to input data, such as scaling numerical features.',
        },
        {
          q: 'What is fit_transform()?',
          a:
            'fit_transform() learns a transformation from data and applies it to that data in one operation.',
        },
        {
          q: 'What is an estimator?',
          a:
            'An estimator is a Scikit-learn object that learns from data through its fit() method.',
        },
        {
          q: 'What is a Pipeline?',
          a:
            'A Pipeline connects preprocessing steps and a final estimator so that they can be fitted and used together.',
        },
      ],
      code: `from sklearn.datasets import load_diabetes
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.pipeline import make_pipeline

data = load_diabetes()

X_train, X_test, y_train, y_test = train_test_split(
    data.data,
    data.target,
    test_size=0.2,
    random_state=42
)

model = make_pipeline(
    StandardScaler(),
    LinearRegression()
)

# fit() learns from training data
model.fit(X_train, y_train)

# predict() creates predictions
predictions = model.predict(X_test)

# score() returns the estimator's default score
print("R2 score:", model.score(X_test, y_test))
print("First predictions:", predictions[:5])`,
      pitfalls: [
        'Do not call predict() before fitting a model.',
        'Do not fit a scaler separately on test data.',
        'fit_transform() should generally be used on training data, while transform() is used on test data.',
        'The score() method does not mean the same metric for every estimator.',
      ],
    }),

    lesson({
      slug: 'scikit-learn-conventions',
      title: 'Scikit-learn Conventions',
      summary:
        'Understand the common rules and design patterns followed by Scikit-learn objects.',
      definition:
        'Scikit-learn conventions are the common design rules used by its estimators and transformers. They include methods such as fit(), predict(), and transform(), constructor parameters, learned attributes, and consistent input and output structures.',
      why:
        'Understanding these conventions makes code easier to read and helps you move between algorithms without learning a completely different interface for every model.',
      purpose:
        'The purpose is to provide a predictable and consistent way to create, configure, train, inspect, and use Machine Learning objects.',
      when: [
        'When using different Scikit-learn algorithms.',
        'When reading Scikit-learn documentation.',
        'When building reusable Machine Learning pipelines.',
        'When inspecting model parameters and learned attributes.',
      ],
      simpleExample:
        'Imagine using Logistic Regression and Random Forest. Both models can be created by passing parameters into their constructors, trained with fit(), and used for predictions with predict(). You do not need to learn a completely different training method for each one.',
      detail:
        'Important conventions include:\n\n1. Constructor parameters: Settings such as `max_depth` or `n_estimators` are usually passed when creating an estimator.\n2. fit(): Learns from training data.\n3. predict(): Produces predictions when supported.\n4. transform(): Applies a learned transformation when supported.\n5. Learned attributes: Attributes ending with an underscore are commonly created after fitting, such as `coef_` and `classes_`.\n6. get_params(): Returns estimator configuration parameters.\n7. set_params(): Updates estimator parameters.\n8. clone(): Creates an unfitted estimator with the same parameters.\n\nScikit-learn generally follows the convention of not changing input data in place. Many estimators also provide a score() method, but the score definition depends on the estimator.',
      realLife: {
        problem:
          'A data scientist wants to compare Logistic Regression and Random Forest without writing a different training workflow for each.',
        approach: [
          'Create both estimators with their configuration parameters.',
          'Train each using fit().',
          'Generate predictions using predict().',
          'Inspect learned attributes and compare evaluation results.',
        ],
        outcome:
          'The data scientist can use a consistent workflow to compare different algorithms.',
      },
      tasks: [
        'Create two Scikit-learn estimators and inspect their parameters.',
        'Use get_params() and set_params() on a Decision Tree.',
        'Train multiple estimators using the same workflow and compare their predictions.',
      ],
      questions: [
        {
          q: 'What are Scikit-learn conventions?',
          a:
            'They are common design rules that make Scikit-learn estimators and transformers follow a consistent interface.',
        },
        {
          q: 'What is get_params()?',
          a:
            'get_params() returns the configuration parameters of an estimator.',
        },
        {
          q: 'What is set_params()?',
          a:
            'set_params() changes the configuration parameters of an estimator.',
        },
        {
          q: 'What does an underscore at the end of an attribute usually mean?',
          a:
            'In Scikit-learn, a trailing underscore commonly indicates an attribute learned or created during fitting, such as coef_.',
        },
        {
          q: 'What is the difference between a parameter and an attribute?',
          a:
            'A parameter is usually a setting supplied when creating or configuring an estimator. A learned attribute is created during fitting from data.',
        },
      ],
      code: `from sklearn.linear_model import LogisticRegression
from sklearn.datasets import load_iris

data = load_iris()

model = LogisticRegression(max_iter=1000)

# Inspect constructor parameters
print("Parameters:")
print(model.get_params())

# Update a parameter
model.set_params(C=0.5)

# Train the estimator
model.fit(data.data, data.target)

# Inspect learned attributes
print("Classes:", model.classes_)
print("Coefficients shape:", model.coef_.shape)

# Make predictions
predictions = model.predict(data.data[:5])

print("Predictions:", predictions)`,
      pitfalls: [
        'Constructor parameters are not the same as learned attributes.',
        'Learned attributes usually become available only after fit().',
        'Not every estimator supports predict() or transform(); available methods depend on the object.',
        'Do not assume score() always returns accuracy.',
      ],
    }),

    lesson({
      slug: 'linear-and-logistic-regression',
      title: 'Linear Modelling: Linear and Logistic Regression',
      summary:
        'Learn how to use Linear Regression for numerical predictions and Logistic Regression for classification.',
      definition:
        'Linear modelling includes algorithms that use a linear combination of input features. Linear Regression predicts numerical values, while Logistic Regression estimates class probabilities and is commonly used for classification.',
      why:
        'These models are useful starting points because they are relatively simple, fast to train, and often easier to interpret than more complex algorithms.',
      purpose:
        'The purpose is to understand and implement two important supervised learning algorithms using Scikit-learn.',
      when: [
        'Use Linear Regression when predicting numerical values.',
        'Use Logistic Regression when predicting class labels or probabilities.',
        'When you need a simple baseline model.',
        'When understanding the relationship between input features and predictions is important.',
      ],
      simpleExample:
        'Linear Regression can predict a house price using its area. Logistic Regression can predict whether an email is spam or not spam.',
      detail:
        'Linear Regression:\n\nIt estimates a numerical output using input features. The model learns coefficients and an intercept that minimize squared prediction errors during ordinary least squares fitting.\n\nLogistic Regression:\n\nIt calculates a score from input features and converts it into a probability using a logistic function for binary classification. The predicted class depends on the chosen decision threshold.\n\nIn Scikit-learn:\n\n- `LinearRegression()` is imported from `sklearn.linear_model`.\n- `LogisticRegression()` is also imported from `sklearn.linear_model`.\n- Both use fit() and predict().\n- Logistic Regression also provides predict_proba() for class probabilities when supported.',
      realLife: {
        problem:
          'A real estate company wants to estimate house prices, while an email service wants to detect spam messages.',
        approach: [
          'Use Linear Regression for house-price prediction.',
          'Use Logistic Regression for spam classification.',
          'Train each model using labeled historical data.',
          'Evaluate them using regression and classification metrics respectively.',
        ],
        outcome:
          'The company can solve two different prediction problems using suitable linear models.',
      },
      tasks: [
        'Train Linear Regression using a house-price-style numerical dataset.',
        'Train Logistic Regression using the Iris dataset and compare predicted classes with probabilities.',
        'Compare both models and explain why regression metrics and classification metrics are different.',
      ],
      questions: [
        {
          q: 'What is Linear Regression?',
          a:
            'Linear Regression is a supervised learning algorithm that predicts numerical values using a linear relationship between input features and a target.',
        },
        {
          q: 'What is Logistic Regression?',
          a:
            'Logistic Regression is a classification algorithm that estimates class probabilities using a logistic function for binary classification.',
        },
        {
          q: 'What is the main difference between Linear and Logistic Regression?',
          a:
            'Linear Regression predicts numerical values, while Logistic Regression is used to predict categories or class probabilities.',
        },
        {
          q: 'Is Logistic Regression a classification algorithm?',
          a:
            'Yes. Despite its name, Logistic Regression is commonly used for classification.',
        },
        {
          q: 'What is predict_proba()?',
          a:
            'predict_proba() returns estimated class probabilities for each input example when the estimator supports probability prediction.',
        },
      ],
      code: `from sklearn.datasets import load_diabetes, load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.metrics import mean_absolute_error, accuracy_score

# Linear Regression
regression_data = load_diabetes()

X_train, X_test, y_train, y_test = train_test_split(
    regression_data.data,
    regression_data.target,
    test_size=0.2,
    random_state=42
)

linear_model = LinearRegression()
linear_model.fit(X_train, y_train)

regression_predictions = linear_model.predict(X_test)

print("Linear Regression MAE:")
print(mean_absolute_error(y_test, regression_predictions))

# Logistic Regression
classification_data = load_breast_cancer()

X_train, X_test, y_train, y_test = train_test_split(
    classification_data.data,
    classification_data.target,
    test_size=0.2,
    random_state=42,
    stratify=classification_data.target
)

logistic_model = LogisticRegression(max_iter=5000)
logistic_model.fit(X_train, y_train)

class_predictions = logistic_model.predict(X_test)
probabilities = logistic_model.predict_proba(X_test)

print("Logistic Regression accuracy:")
print(accuracy_score(y_test, class_predictions))

print("First class probabilities:")
print(probabilities[:5])`,
      pitfalls: [
        'Do not use Linear Regression when the required output is a class label.',
        'Logistic Regression is a classification algorithm despite its name.',
        'Scaling can be important for Logistic Regression, especially when features have different scales.',
        'A predicted probability is not automatically a guaranteed outcome.',
        'The classification threshold can affect precision and recall.',
      ],
    }),

    lesson({
      slug: 'ridge-lasso-and-polynomial-features',
      title: 'Extended Linear Modelling: Ridge, Lasso and Polynomial Features',
      summary:
        'Learn how regularization controls model complexity and how polynomial features help model curved relationships.',
      definition:
        'Extended Linear Modelling includes techniques that improve or expand basic linear models. Ridge Regression and Lasso Regression add regularization to control coefficient size, while Polynomial Features create additional input terms that allow a linear model to represent nonlinear relationships.',
      why:
        'A basic Linear Regression model can overfit when it has too many features or when the relationship between inputs and the target is more complex than a straight line. These techniques help manage complexity and represent more flexible relationships.',
      purpose:
        'The purpose is to reduce overfitting, control model coefficients, and allow linear models to capture certain curved patterns.',
      when: [
        'When a linear model overfits the training data.',
        'When many input features are present.',
        'When features are strongly correlated.',
        'When the relationship between inputs and output is curved.',
        'When you want to reduce the influence of less useful coefficients.',
      ],
      simpleExample:
        'Imagine predicting house prices using area. A basic linear model assumes a straight-line relationship. Polynomial Features can add area squared, allowing the model to represent a curved relationship. Ridge and Lasso can help control the size of the learned coefficients.',
      detail:
        'Ridge Regression:\n\nAdds an L2 penalty to the ordinary least squares objective. It shrinks coefficients toward zero but usually does not make them exactly zero.\n\nLasso Regression:\n\nAdds an L1 penalty. It can make some coefficients exactly zero, which can perform a form of feature selection.\n\nPolynomial Features:\n\nCreates extra columns such as x², x³, or interactions between features. A linear model can then learn a curved relationship in the original input space.\n\nIn Scikit-learn:\n\n- Ridge: `Ridge()`.\n- Lasso: `Lasso()`.\n- Polynomial transformation: `PolynomialFeatures()`.\n\nRegularization strength is controlled by alpha for Ridge and Lasso. Larger alpha generally means stronger regularization. Feature scaling is important for fair regularization across differently scaled features.',
      realLife: {
        problem:
          'A company has many features for predicting sales, and a basic Linear Regression model performs well on training data but poorly on unseen data.',
        approach: [
          'Compare ordinary Linear Regression with Ridge and Lasso.',
          'Scale numerical features inside a pipeline.',
          'Tune the regularization strength using validation.',
          'Test Polynomial Features if the relationship appears curved.',
        ],
        outcome:
          'The company can select a model with better-controlled complexity and potentially better performance on new data.',
      },
      tasks: [
        'Train Ridge and Lasso models using a regression dataset.',
        'Compare coefficient values for Linear Regression, Ridge, and Lasso.',
        'Use PolynomialFeatures with Ridge and compare performance using cross-validation.',
      ],
      questions: [
        {
          q: 'What is Ridge Regression?',
          a:
            'Ridge Regression is Linear Regression with an L2 regularization penalty that discourages large coefficients.',
        },
        {
          q: 'What is Lasso Regression?',
          a:
            'Lasso Regression is Linear Regression with an L1 penalty that can make some coefficients exactly zero.',
        },
        {
          q: 'What is the difference between Ridge and Lasso?',
          a:
            'Ridge uses L2 regularization and generally shrinks coefficients without making them exactly zero. Lasso uses L1 regularization and can remove some coefficients by setting them to zero.',
        },
        {
          q: 'What is regularization?',
          a:
            'Regularization adds a penalty to the learning objective to discourage excessive model complexity or large coefficients.',
        },
        {
          q: 'What are Polynomial Features?',
          a:
            'Polynomial Features create extra input columns such as squared terms and interaction terms so that a linear estimator can represent more complex relationships.',
        },
        {
          q: 'Does Polynomial Regression use a linear model?',
          a:
            'Yes. It transforms the input features into polynomial terms and then fits a linear model to those transformed features.',
        },
      ],
      code: `from sklearn.datasets import load_diabetes
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler, PolynomialFeatures
from sklearn.linear_model import LinearRegression, Ridge, Lasso
from sklearn.metrics import mean_squared_error

data = load_diabetes()

X_train, X_test, y_train, y_test = train_test_split(
    data.data,
    data.target,
    test_size=0.2,
    random_state=42
)

models = {
    "Linear Regression": make_pipeline(
        StandardScaler(),
        LinearRegression()
    ),
    "Ridge": make_pipeline(
        StandardScaler(),
        Ridge(alpha=1.0)
    ),
    "Lasso": make_pipeline(
        StandardScaler(),
        Lasso(alpha=0.1, max_iter=10000)
    )
}

for name, model in models.items():
    model.fit(X_train, y_train)
    predictions = model.predict(X_test)

    print(name)
    print("MSE:", mean_squared_error(y_test, predictions))

# Polynomial features with regularization
polynomial_model = make_pipeline(
    PolynomialFeatures(degree=2, include_bias=False),
    StandardScaler(),
    Ridge(alpha=1.0)
)

polynomial_model.fit(X_train, y_train)

print(
    "Polynomial Ridge MSE:",
    mean_squared_error(
        y_test,
        polynomial_model.predict(X_test)
    )
)`,
      pitfalls: [
        'Ridge and Lasso do not automatically solve every overfitting problem.',
        'Lasso may select one feature from a group of highly correlated features unpredictably.',
        'Polynomial features can greatly increase the number of columns.',
        'High polynomial degrees can cause overfitting.',
        'Tune alpha and polynomial degree using validation rather than the final test set.',
      ],
    }),

    lesson({
      slug: 'stochastic-gradient-descent',
      title: 'Stochastic Gradient Descent (SGD)',
      summary:
        'Learn how a model updates its parameters using small pieces of training data to reduce prediction error.',
      definition:
        'Stochastic Gradient Descent (SGD) is an optimization method that updates model parameters using the gradient of the loss function. In its stochastic form, it uses one training example at a time; mini-batch variants use small groups of examples.',
      why:
        'Some models are trained by minimizing a loss function. SGD can update parameters efficiently without calculating the gradient using the entire dataset for every update.',
      purpose:
        'The purpose is to optimize model parameters so that the prediction error or chosen objective becomes smaller.',
      when: [
        'When training linear models on large datasets.',
        'When using SGDClassifier or SGDRegressor.',
        'When data is too large for repeated full-batch updates.',
        'When incremental or online learning is useful.',
      ],
      simpleExample:
        'Imagine you are trying to find the lowest point in a valley while wearing a blindfold. You check the slope near your current position and take a small step downhill. You repeat this process until you reach a low point. SGD works similarly by updating model parameters to reduce loss.',
      detail:
        'A simplified parameter update is:\n\nNew parameter = Old parameter − Learning rate × Gradient\n\nThe gradient indicates the direction in which the loss increases most quickly. Moving in the opposite direction helps reduce the loss.\n\nImportant terms:\n\n- Gradient: Direction and rate of change of the loss.\n- Learning rate: Controls the size of each update.\n- Epoch: One complete pass through the training dataset.\n- Batch: The group of examples used for one update.\n\nScikit-learn provides SGDClassifier for classification and SGDRegressor for regression. These estimators are sensitive to feature scales, so scaling is usually important. Learning-rate settings, regularization, and number of iterations need to be chosen carefully.',
      realLife: {
        problem:
          'A company needs to train a classification model on a large dataset containing millions of customer records.',
        approach: [
          'Prepare and scale the training features.',
          'Select SGDClassifier for the classification task.',
          'Train the estimator using the training data.',
          'Evaluate performance on separate unseen data.',
        ],
        outcome:
          'The company can use an optimization method designed for efficient parameter updates on large datasets.',
      },
      tasks: [
        'Train an SGDClassifier using the Iris dataset.',
        'Compare SGDClassifier with Logistic Regression on the same classification dataset.',
        'Build a scaled SGD pipeline and tune its learning rate and regularization using validation.',
      ],
      questions: [
        {
          q: 'What is Stochastic Gradient Descent?',
          a:
            'SGD is an optimization method that updates model parameters using gradient information from individual examples or small batches of examples.',
        },
        {
          q: 'What is a gradient?',
          a:
            'A gradient describes the direction and rate of change of a function with respect to its parameters.',
        },
        {
          q: 'What is the learning rate?',
          a:
            'The learning rate controls how large a parameter update is during optimization.',
        },
        {
          q: 'What is an epoch?',
          a:
            'An epoch is one complete pass through the training dataset.',
        },
        {
          q: 'What is the difference between SGDClassifier and SGDRegressor?',
          a:
            'SGDClassifier is used for classification, while SGDRegressor is used for regression. Both use stochastic gradient-based optimization.',
        },
      ],
      code: `from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import SGDClassifier
from sklearn.metrics import accuracy_score

data = load_breast_cancer()

X_train, X_test, y_train, y_test = train_test_split(
    data.data,
    data.target,
    test_size=0.2,
    random_state=42,
    stratify=data.target
)

model = make_pipeline(
    StandardScaler(),
    SGDClassifier(
        loss="log_loss",
        learning_rate="optimal",
        max_iter=2000,
        random_state=42
    )
)

model.fit(X_train, y_train)

predictions = model.predict(X_test)

print("Accuracy:", accuracy_score(y_test, predictions))`,
      pitfalls: [
        'A learning rate that is too high can make optimization unstable.',
        'A learning rate that is too low can make training very slow.',
        'Scaling is important for many SGD-based models.',
        'SGD results can vary with data ordering and random initialization.',
        'A large number of iterations does not automatically guarantee a good model.',
      ],
    }),

    lesson({
      slug: 'support-vector-machines',
      title: 'Support Vector Machines (SVM)',
      summary:
        'Learn how SVM separates classes by finding a decision boundary with a large margin.',
      definition:
        'Support Vector Machine (SVM) is a supervised learning algorithm used for classification and regression. For classification, it tries to find a decision boundary, called a hyperplane, that separates classes while maximizing the margin between them.',
      why:
        'SVM can create useful decision boundaries in datasets with many features. It also supports kernels, which allow it to model nonlinear class boundaries.',
      purpose:
        'The purpose is to classify observations or predict numerical values by learning a suitable decision function from training data.',
      when: [
        'When solving classification problems.',
        'When there are many numerical features.',
        'When a clear margin-based separation is useful.',
        'When nonlinear patterns may be handled using a kernel.',
      ],
      simpleExample:
        'Imagine plotting students using study hours and attendance. Some students belong to the pass class and others to the fail class. SVM tries to find a boundary that separates these two groups while keeping the margin as wide as possible.',
      detail:
        'Important SVM concepts:\n\n1. Hyperplane: The decision boundary separating classes.\n2. Margin: The distance between the decision boundary and the closest training points.\n3. Support vectors: The training examples closest to the boundary that influence its position.\n4. Kernel: A method that allows SVM to model nonlinear relationships.\n5. C parameter: Controls the trade-off between a wider margin and classification errors on training data.\n6. Gamma: For RBF and some other kernels, controls how far the influence of an individual training example reaches.\n\nScikit-learn provides SVC for classification and SVR for regression. Feature scaling is generally important. SVM training can become expensive for very large datasets, especially with nonlinear kernels.',
      realLife: {
        problem:
          'A medical research team wants to classify observations into two categories using numerical measurements.',
        approach: [
          'Prepare and scale numerical features.',
          'Train an SVC classifier.',
          'Compare linear and RBF kernels.',
          'Evaluate performance using suitable classification metrics.',
        ],
        outcome:
          'The team gets a model that learns a decision boundary for classifying new observations.',
      },
      tasks: [
        'Train a linear SVC using a classification dataset.',
        'Compare linear and RBF kernels after scaling the features.',
        'Tune C and gamma using cross-validation and evaluate the final model.',
      ],
      questions: [
        {
          q: 'What is SVM?',
          a:
            'SVM is a supervised learning algorithm that finds a decision function for classification or regression. In classification, it commonly seeks a separating hyperplane with a large margin.',
        },
        {
          q: 'What is a hyperplane?',
          a:
            'A hyperplane is a decision boundary that separates classes in a feature space.',
        },
        {
          q: 'What are support vectors?',
          a:
            'Support vectors are training examples that lie closest to the decision boundary and influence the learned margin.',
        },
        {
          q: 'What is the kernel trick?',
          a:
            'The kernel trick allows SVM to model nonlinear decision boundaries by using kernel functions without explicitly calculating a high-dimensional feature representation.',
        },
        {
          q: 'What does C control in SVM?',
          a:
            'C controls the trade-off between allowing training errors and maintaining a wider margin. Larger C generally penalizes training errors more strongly.',
        },
        {
          q: 'Why is feature scaling important for SVM?',
          a:
            'SVM relies on distances and dot products, so features with much larger numerical scales can dominate the model.',
        },
      ],
      code: `from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score

data = load_breast_cancer()

X_train, X_test, y_train, y_test = train_test_split(
    data.data,
    data.target,
    test_size=0.2,
    random_state=42,
    stratify=data.target
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

print("Accuracy:", accuracy_score(y_test, predictions))`,
      pitfalls: [
        'SVM can perform poorly when important features have very different scales.',
        'C and gamma strongly influence the decision boundary.',
        'A very complex boundary may overfit the training data.',
        'SVC can be expensive on large datasets.',
        'Do not assume an RBF kernel is always better than a linear kernel.',
      ],
    }),

    lesson({
      slug: 'anomaly-detection-scikit-learn',
      title: 'Anomaly Detection',
      summary:
        'Learn how to identify observations that are very different from normal patterns using Scikit-learn.',
      definition:
        'Anomaly Detection is the process of identifying observations that differ significantly from the expected behavior or normal pattern of a dataset. Scikit-learn provides algorithms such as Isolation Forest and Local Outlier Factor for this task.',
      why:
        'Unusual observations may indicate fraud, equipment failure, suspicious activity, or data-quality problems. Detecting them can help people investigate possible issues.',
      purpose:
        'The purpose is to identify unusual records that deserve further investigation.',
      when: [
        'When detecting potentially fraudulent transactions.',
        'When monitoring unusual network activity.',
        'When finding unusual sensor readings.',
        'When identifying unexpected patterns in customer behavior.',
        'When investigating unusual data points.',
      ],
      simpleExample:
        'Imagine most online purchases are between ₹100 and ₹5,000, but one transaction is ₹5,00,000. An anomaly detection model may flag that transaction because it is very different from the usual pattern. It does not automatically mean fraud; it means the transaction deserves investigation.',
      detail:
        'Common Scikit-learn algorithms:\n\n1. Isolation Forest: Builds random trees that isolate observations. Unusual points are often isolated using fewer splits.\n2. Local Outlier Factor (LOF): Compares the local density around an observation with the density around its neighbors.\n3. One-Class SVM: Learns a boundary around a region considered normal.\n\nScikit-learn estimators may provide `predict()` results where -1 represents an outlier and 1 represents an inlier. The exact API and behavior depend on the estimator.\n\nOutlier detection and novelty detection are related but different:\n\n- Outlier detection looks for unusual observations within a dataset that may contain anomalies.\n- Novelty detection learns from data considered normal and checks whether new observations are unusual.\n\nThe contamination setting in some algorithms controls an assumed or expected proportion of outliers; it does not establish which observations are truly anomalous.',
      realLife: {
        problem:
          'A bank wants to identify unusual transactions that may require fraud investigation.',
        approach: [
          'Collect transaction features such as amount and transaction frequency.',
          'Prepare numerical features and scale them when appropriate.',
          'Train an Isolation Forest model.',
          'Review transactions flagged as unusual.',
        ],
        outcome:
          'The bank gets a list of unusual transactions that can be investigated further.',
      },
      tasks: [
        'Create a small dataset containing normal and unusual numerical observations.',
        'Train Isolation Forest and inspect its predictions.',
        'Compare Isolation Forest and Local Outlier Factor on a realistic anomaly-detection problem.',
      ],
      questions: [
        {
          q: 'What is anomaly detection?',
          a:
            'Anomaly detection identifies observations that differ significantly from the expected patterns in a dataset.',
        },
        {
          q: 'What is Isolation Forest?',
          a:
            'Isolation Forest is an anomaly-detection algorithm that uses random trees to isolate observations. Unusual observations often require fewer splits to isolate.',
        },
        {
          q: 'What is Local Outlier Factor?',
          a:
            'Local Outlier Factor identifies observations whose local density is much lower than the density around their neighbors.',
        },
        {
          q: 'What does -1 mean in Isolation Forest predictions?',
          a:
            'In Scikit-learn Isolation Forest, -1 indicates an outlier and 1 indicates an inlier.',
        },
        {
          q: 'What is the difference between outlier detection and novelty detection?',
          a:
            'Outlier detection searches for unusual observations within a dataset, while novelty detection learns normal behavior and identifies unusual new observations.',
        },
      ],
      code: `import numpy as np
from sklearn.ensemble import IsolationForest

X = np.array([
    [10, 100],
    [12, 110],
    [11, 105],
    [13, 115],
    [9, 95],
    [12, 108],
    [10, 102],
    [500, 900]
])

model = IsolationForest(
    contamination=0.125,
    random_state=42
)

model.fit(X)

predictions = model.predict(X)

for point, prediction in zip(X, predictions):
    label = "Anomaly" if prediction == -1 else "Normal"
    print(point, label)`,
      pitfalls: [
        'An anomaly is not automatically a fraud or an error.',
        'Scaling and feature selection can affect distance-based anomaly detection.',
        'The contamination value is an assumption or setting, not a verified fraud rate.',
        'Some anomalies are legitimate rare events.',
        'Always investigate flagged observations using domain knowledge.',
      ],
    }),

    lesson({
      slug: 'knn-scikit-learn',
      title: 'K-Nearest Neighbours (KNN)',
      summary:
        'Learn how KNN predicts a result by looking at the closest examples in the training dataset.',
      definition:
        'K-Nearest Neighbours (KNN) is a supervised learning algorithm that predicts the output for a new observation using the K closest training examples. For classification, it commonly uses the majority class among the neighbors. For regression, it commonly averages their target values.',
      why:
        'KNN is easy to understand and provides a simple way to make predictions based on similarity between observations.',
      purpose:
        'The purpose is to classify or predict new observations by comparing them with nearby examples in the training data.',
      when: [
        'When solving small or medium-sized classification problems.',
        'When similar observations are expected to have similar outputs.',
        'When building a simple baseline model.',
        'When relationships between observations can be represented using a suitable distance metric.',
      ],
      simpleExample:
        'Imagine a new student has studied for 5 hours. You look at the three students with the most similar study patterns. If two of them passed and one failed, KNN may predict that the new student will pass.',
      detail:
        'How KNN works:\n\n1. Store the training examples.\n2. Receive a new observation.\n3. Calculate the distance between the new observation and training examples.\n4. Find the K closest neighbors.\n5. Use their labels or target values to make a prediction.\n\nImportant concepts:\n\n- K: Number of neighbors considered.\n- Distance metric: Method used to measure similarity, such as Euclidean distance.\n- Voting: Classification predictions often use the most common neighbor class.\n- Averaging: Regression predictions often average the target values of neighbors.\n\nScikit-learn provides KNeighborsClassifier and KNeighborsRegressor. KNN is sensitive to feature scales, so scaling is usually important.',
      realLife: {
        problem:
          'A healthcare system wants to classify a new patient using measurements from similar historical patients.',
        approach: [
          'Prepare the patient measurements.',
          'Scale numerical features.',
          'Train a KNN classifier.',
          'Find the closest training observations for a new patient.',
        ],
        outcome:
          'The system predicts a class using the labels of similar historical observations.',
      },
      tasks: [
        'Train KNeighborsClassifier using the Iris dataset.',
        'Compare K values such as 3, 5, and 7.',
        'Tune K and the distance metric using cross-validation and evaluate the final model.',
      ],
      questions: [
        {
          q: 'What is KNN?',
          a:
            'KNN is a supervised learning algorithm that predicts a new observation using the labels or target values of its closest training examples.',
        },
        {
          q: 'What does K represent in KNN?',
          a:
            'K represents the number of nearest training observations considered when making a prediction.',
        },
        {
          q: 'How does KNN classify a new observation?',
          a:
            'It finds the K nearest training examples and commonly predicts the class that receives the most votes.',
        },
        {
          q: 'Why is feature scaling important for KNN?',
          a:
            'KNN uses distances, so features with larger numerical scales can dominate the distance calculation.',
        },
        {
          q: 'What happens when K is very small?',
          a:
            'The model becomes sensitive to individual observations and noise, which can lead to overfitting.',
        },
        {
          q: 'Is KNN a lazy learning algorithm?',
          a:
            'Yes. KNN mainly stores training data and performs much of its work when a new prediction is requested.',
        },
      ],
      code: `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score

data = load_iris()

X_train, X_test, y_train, y_test = train_test_split(
    data.data,
    data.target,
    test_size=0.2,
    random_state=42,
    stratify=data.target
)

model = make_pipeline(
    StandardScaler(),
    KNeighborsClassifier(n_neighbors=5)
)

model.fit(X_train, y_train)

predictions = model.predict(X_test)

print("Accuracy:", accuracy_score(y_test, predictions))

new_sample = X_test[:1]

print("Predicted class:", model.predict(new_sample))`,
      pitfalls: [
        'A very small K can make predictions sensitive to noise.',
        'A very large K can smooth away useful local patterns.',
        'Scaling is important because KNN depends on distances.',
        'Prediction can become slow when the training dataset is very large.',
        'The best K depends on the dataset and should be selected using validation.',
      ],
    }),

    lesson({
      slug: 'decision-trees-scikit-learn',
      title: 'Decision Trees: Classification and Regression',
      summary:
        'Learn how Decision Trees make predictions by asking a sequence of questions about input features.',
      definition:
        'A Decision Tree is a supervised learning algorithm that makes predictions by splitting data into smaller groups using feature-based rules. A DecisionTreeClassifier predicts categories, while a DecisionTreeRegressor predicts numerical values.',
      why:
        'Decision Trees are easy to understand and can model nonlinear relationships and feature interactions without requiring feature scaling.',
      purpose:
        'The purpose is to learn a sequence of decision rules that can be used to classify observations or predict numerical values.',
      when: [
        'When solving classification problems.',
        'When predicting numerical values.',
        'When you want rules that are relatively easy to interpret.',
        'When relationships between features may be nonlinear.',
        'When numerical and categorical inputs have been appropriately prepared.',
      ],
      simpleExample:
        'Imagine predicting whether a student will pass an exam. The tree first asks whether study hours are greater than 4. Depending on the answer, it may ask another question about attendance. After following the branches, it predicts pass or fail.',
      detail:
        'A Decision Tree contains:\n\n- Root node: The first decision point.\n- Internal nodes: Questions or feature-based splits.\n- Branches: Outcomes of the decisions.\n- Leaf nodes: Final predictions.\n\nFor classification, Scikit-learn can use criteria such as Gini impurity and entropy to evaluate splits. For regression, it can use criteria based on squared error or absolute error.\n\nImportant parameters:\n\n- `max_depth`: Maximum depth of the tree.\n- `min_samples_split`: Minimum number of samples needed to split a node.\n- `min_samples_leaf`: Minimum number of samples required at a leaf.\n- `criterion`: Method used to evaluate split quality.\n\nLimiting tree depth and tuning these parameters can help control overfitting.',
      realLife: {
        problem:
          'A bank wants to classify loan applicants as low risk or high risk.',
        approach: [
          'Collect applicant information such as income and repayment history.',
          'Train a DecisionTreeClassifier.',
          'Inspect the learned feature-based rules.',
          'Evaluate predictions using a confusion matrix and suitable metrics.',
        ],
        outcome:
          'The bank gets a classification model that makes decisions using learned feature-based rules.',
      },
      tasks: [
        'Train a DecisionTreeClassifier using the Iris dataset.',
        'Compare trees with different maximum depths.',
        'Train a DecisionTreeRegressor and a DecisionTreeClassifier and explain their differences.',
      ],
      questions: [
        {
          q: 'What is a Decision Tree?',
          a:
            'A Decision Tree is a supervised learning algorithm that makes predictions through a sequence of feature-based splits.',
        },
        {
          q: 'What is a root node?',
          a:
            'The root node is the first node where the tree begins making a decision.',
        },
        {
          q: 'What is a leaf node?',
          a:
            'A leaf node is the final node that provides the model prediction.',
        },
        {
          q: 'What is Gini impurity?',
          a:
            'Gini impurity measures how mixed the classes are within a node. Lower impurity means the node contains a more concentrated class distribution.',
        },
        {
          q: 'Why do Decision Trees overfit?',
          a:
            'A tree that grows too deep can learn details and noise from training data instead of general patterns.',
        },
        {
          q: 'How can we reduce Decision Tree overfitting?',
          a:
            'Use controls such as max_depth, min_samples_split, min_samples_leaf, or pruning, and select settings using validation.',
        },
      ],
      code: `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier, plot_tree
from sklearn.metrics import accuracy_score
import matplotlib.pyplot as plt

data = load_iris()

X_train, X_test, y_train, y_test = train_test_split(
    data.data,
    data.target,
    test_size=0.2,
    random_state=42,
    stratify=data.target
)

model = DecisionTreeClassifier(
    max_depth=3,
    random_state=42
)

model.fit(X_train, y_train)

predictions = model.predict(X_test)

print("Accuracy:", accuracy_score(y_test, predictions))

plt.figure(figsize=(12, 7))

plot_tree(
    model,
    feature_names=data.feature_names,
    class_names=data.target_names,
    filled=True
)

plt.show()`,
      pitfalls: [
        'Deep trees can overfit training data.',
        'Small changes in the training data can produce a different tree.',
        'Feature importance does not prove that a feature causes the target.',
        'Trees do not generally require numerical feature scaling.',
        'Interpretability can decrease when a tree becomes very large.',
      ],
    }),

    lesson({
      slug: 'adaboost-and-gradient-boosting',
      title: 'Boosting: AdaBoost and Gradient Boosting',
      summary:
        'Learn how boosting combines multiple weak learners to build a stronger predictive model.',
      definition:
        'Boosting is an ensemble learning technique that combines multiple models sequentially. Each new learner focuses on improving the errors or remaining loss of the existing ensemble. AdaBoost adjusts the importance of training examples, while Gradient Boosting fits new learners to the current loss gradients.',
      why:
        'A single simple model may not capture all useful patterns. Boosting combines several learners to create a stronger model that can improve predictive performance.',
      purpose:
        'The purpose is to build a powerful predictive model by combining multiple simpler learners in sequence.',
      when: [
        'When a single decision tree is not accurate enough.',
        'When solving structured tabular-data problems.',
        'When you want to compare ensemble methods with individual models.',
        'When nonlinear relationships and complex patterns are present.',
      ],
      simpleExample:
        'Imagine several students answering the same set of questions. The first student makes mistakes. The next student focuses more on the difficult questions. Later students continue improving the areas where the combined group performs poorly. Boosting follows a similar idea by building models sequentially.',
      detail:
        'AdaBoost:\n\nAdaBoost gives more importance to examples that previous learners classified incorrectly. Later learners focus more on those difficult examples, and the final prediction combines the learners.\n\nGradient Boosting:\n\nGradient Boosting builds an additive model in stages. Each new learner is fitted to improve the current model by following the gradient of a chosen loss function.\n\nImportant parameters include:\n\n- `n_estimators`: Number of boosting stages or learners.\n- `learning_rate`: Controls the contribution of each learner.\n- `max_depth` or tree-related settings: Controls the complexity of individual learners.\n\nScikit-learn provides AdaBoostClassifier, AdaBoostRegressor, GradientBoostingClassifier, and GradientBoostingRegressor. Boosting models can overfit if they become too complex, so use validation and appropriate regularization.',
      realLife: {
        problem:
          'An online business wants to predict which customers are likely to cancel a subscription.',
        approach: [
          'Prepare historical customer information.',
          'Train an AdaBoost or Gradient Boosting classifier.',
          'Tune the number of estimators and learning rate.',
          'Evaluate performance on unseen data.',
        ],
        outcome:
          'The business gets an ensemble model that combines multiple learners to predict customer cancellation.',
      },
      tasks: [
        'Train an AdaBoostClassifier on the Iris dataset.',
        'Compare AdaBoost and Gradient Boosting using the same train/test split.',
        'Tune learning_rate and n_estimators using cross-validation and compare model performance.',
      ],
      questions: [
        {
          q: 'What is boosting?',
          a:
            'Boosting is an ensemble technique that combines learners sequentially, with later learners improving the errors or remaining loss of the current ensemble.',
        },
        {
          q: 'What is AdaBoost?',
          a:
            'AdaBoost is a boosting algorithm that adjusts training-example weights so later learners focus more on examples that previous learners handled incorrectly.',
        },
        {
          q: 'What is Gradient Boosting?',
          a:
            'Gradient Boosting builds an additive model stage by stage, fitting new learners to improve the current model using gradients of a loss function.',
        },
        {
          q: 'What is the difference between bagging and boosting?',
          a:
            'Bagging trains models independently, often on bootstrap samples, and combines them. Boosting trains learners sequentially so later learners improve the current ensemble.',
        },
        {
          q: 'What does learning_rate control?',
          a:
            'The learning rate controls how much each new learner contributes to the overall ensemble.',
        },
        {
          q: 'Can boosting overfit?',
          a:
            'Yes. Too many stages or overly complex learners can overfit. Validation and regularization help control this.',
        },
      ],
      code: `from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.ensemble import (
    AdaBoostClassifier,
    GradientBoostingClassifier
)
from sklearn.metrics import accuracy_score

data = load_breast_cancer()

X_train, X_test, y_train, y_test = train_test_split(
    data.data,
    data.target,
    test_size=0.2,
    random_state=42,
    stratify=data.target
)

models = {
    "AdaBoost": AdaBoostClassifier(
        n_estimators=100,
        learning_rate=0.5,
        random_state=42
    ),
    "Gradient Boosting": GradientBoostingClassifier(
        n_estimators=100,
        learning_rate=0.1,
        max_depth=2,
        random_state=42
    )
}

for name, model in models.items():
    model.fit(X_train, y_train)

    predictions = model.predict(X_test)

    print(name)
    print("Accuracy:", accuracy_score(y_test, predictions))`,
      pitfalls: [
        'Boosting models can overfit if they are too complex.',
        'A very high learning rate can make training unstable or reduce generalization.',
        'More estimators do not always mean better performance.',
        'Compare boosting with simpler baselines using the same validation approach.',
        'Do not tune repeatedly against the final test set.',
      ],
    }),

    lesson({
      slug: 'kmeans-and-hierarchical-clustering',
      title: 'Clustering: K-Means and Hierarchical Methods',
      summary:
        'Learn how to group similar observations without using predefined target labels.',
      definition:
        'Clustering is an unsupervised learning technique that groups similar observations together. K-Means creates a predefined number of clusters using centroids, while hierarchical clustering builds a tree-like structure of nested groups.',
      why:
        'Sometimes a dataset does not have target labels. Clustering helps discover natural groupings and patterns without requiring a correct output for every observation.',
      purpose:
        'The purpose is to discover groups of similar data points and understand the structure of an unlabeled dataset.',
      when: [
        'When grouping customers by purchasing behavior.',
        'When exploring unlabeled datasets.',
        'When discovering groups of similar documents or products.',
        'When organizing observations into meaningful clusters.',
      ],
      simpleExample:
        'Imagine an online store has customer information but no customer categories. K-Means can group customers with similar purchasing patterns. The store can then study the groups and identify different customer segments.',
      detail:
        'K-Means:\n\n1. Choose the number of clusters K.\n2. Initialize K centroids.\n3. Assign each observation to its nearest centroid.\n4. Recalculate centroids using the assigned observations.\n5. Repeat until the assignments or centroids stop changing significantly.\n\nHierarchical Clustering:\n\nIt creates a hierarchy of clusters. Agglomerative clustering starts with individual observations and repeatedly merges groups. A dendrogram shows how the groups are combined.\n\nImportant differences:\n\n- K-Means requires the number of clusters to be chosen in advance.\n- Hierarchical clustering can show relationships at multiple grouping levels.\n- Both methods can be affected by feature scaling and the distance measure.\n- K-Means works best when clusters are reasonably compact and roughly spherical.\n- Hierarchical methods can become computationally expensive for large datasets.',
      realLife: {
        problem:
          'An online store wants to group customers according to their spending and shopping frequency.',
        approach: [
          'Collect customer spending and purchase-frequency data.',
          'Scale numerical features.',
          'Apply K-Means to create customer groups.',
          'Use hierarchical clustering to explore how customer groups relate to one another.',
        ],
        outcome:
          'The store discovers customer segments that can help it understand different purchasing patterns.',
      },
      tasks: [
        'Apply KMeans to a small dataset containing two numerical features.',
        'Compare K-Means and Agglomerative Clustering on the same scaled dataset.',
        'Build a customer segmentation project and explain the clusters using their feature averages.',
      ],
      questions: [
        {
          q: 'What is clustering?',
          a:
            'Clustering is an unsupervised learning technique that groups similar observations together without requiring predefined target labels.',
        },
        {
          q: 'What is K-Means?',
          a:
            'K-Means is a clustering algorithm that divides observations into K groups by assigning points to the nearest centroid and updating the centroids.',
        },
        {
          q: 'What is a centroid?',
          a:
            'A centroid is the center of a cluster, calculated as the mean of the observations assigned to it in standard K-Means.',
        },
        {
          q: 'What is hierarchical clustering?',
          a:
            'Hierarchical clustering builds a tree-like hierarchy of groups by repeatedly merging or splitting clusters.',
        },
        {
          q: 'What is a dendrogram?',
          a:
            'A dendrogram is a tree diagram that displays how observations or clusters are joined in hierarchical clustering.',
        },
        {
          q: 'Why is feature scaling important for clustering?',
          a:
            'Many clustering methods use distances, so features with larger numerical scales can dominate the grouping process.',
        },
      ],
      code: `from sklearn.datasets import make_blobs
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans, AgglomerativeClustering
import matplotlib.pyplot as plt

X, _ = make_blobs(
    n_samples=200,
    centers=3,
    random_state=42
)

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# K-Means
kmeans = KMeans(
    n_clusters=3,
    random_state=42,
    n_init=10
)

kmeans_labels = kmeans.fit_predict(X_scaled)

# Hierarchical clustering
hierarchical = AgglomerativeClustering(
    n_clusters=3
)

hierarchical_labels = hierarchical.fit_predict(X_scaled)

print("K-Means clusters:")
print(kmeans_labels[:10])

print("Hierarchical clusters:")
print(hierarchical_labels[:10])

plt.scatter(
    X_scaled[:, 0],
    X_scaled[:, 1],
    c=kmeans_labels
)

plt.title("K-Means Clustering")
plt.xlabel("Feature 1")
plt.ylabel("Feature 2")
plt.show()`,
      pitfalls: [
        'K-Means requires K to be chosen before fitting.',
        'K-Means can struggle with irregularly shaped clusters and clusters with different densities.',
        'Different initial centroids can produce different results.',
        'Cluster labels are identifiers, not meaningful rankings.',
        'Hierarchical clustering can be expensive on large datasets.',
        'A cluster should be interpreted using domain knowledge rather than assuming every group has an obvious business meaning.',
      ],
    }),
  ],
}

export default ch
