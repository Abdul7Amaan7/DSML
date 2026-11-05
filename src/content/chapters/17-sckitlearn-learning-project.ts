
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
          'Identify the concept or build a basic example and explain how it works.',
      },
      {
        id: `${data.slug}-task-2`,
        title: 'Compare',
        difficulty: 'medium',
        task: data.tasks[1],
        expectedOutcome:
          'Compare the results and explain how the function affects the Machine Learning workflow.',
      },
      {
        id: `${data.slug}-task-3`,
        title: 'Apply it',
        difficulty: 'hard',
        task: data.tasks[2],
        expectedOutcome:
          'Apply the function to a realistic dataset and explain the results and limitations.',
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
  id: 'must-practice-scikit-learn-functions',
  number: 17,
  title: 'Must-Practice Scikit-learn Functions',
  tagline: 'Learn the essential functions used to prepare data, train models and evaluate Machine Learning performance.',
  priority: 'extreme',
  topics: [
    lesson({
      slug: 'train-test-split',
      title: 'train_test_split()',
      summary: 'Divide your dataset into training and testing parts.',
      definition:
        'train_test_split() is a Scikit-learn function that divides input features and target values into separate training and testing datasets.',
      why:
        'A model must be tested using data it did not learn from. This helps us understand whether it can make predictions on new data.',
      purpose:
        'Its purpose is to create separate datasets for teaching a model and checking its performance.',
      when: [
        'When building a supervised Machine Learning model.',
        'When you need to measure performance on unseen data.',
        'When you want a reproducible random split.',
      ],
      simpleExample:
        'Imagine you have 100 student records. You use 80 records to teach the model and keep 20 records aside to test its predictions.',
      realLife: {
        problem: 'A school wants to predict student exam results using historical student records.',
        approach: [
          'Collect student information and exam results.',
          'Separate input features from the target.',
          'Use train_test_split() to create training and testing datasets.',
          'Train the model using the training data.',
          'Evaluate predictions using the testing data.',
        ],
        outcome:
          'The school can check how well the model predicts results for students whose records were not used during training.',
      },
      tasks: [
        'Create a dataset with 100 records and split it into 80% training data and 20% testing data.',
        'Try test_size values of 0.2 and 0.3 and compare the sizes of the resulting datasets.',
        'Split a classification dataset using stratify=y and explain why preserving class proportions can be useful.',
      ],
      questions: [
        {
          q: 'What is train_test_split()?',
          a: 'It divides a dataset into training and testing portions. The training portion is used to train the model, while the testing portion is used to evaluate it.',
          followUp: 'What is the purpose of random_state?',
        },
        {
          q: 'What does test_size=0.2 mean?',
          a: 'It means 20% of the records are used for testing and the remaining 80% are used for training.',
        },
        {
          q: 'Why do we use random_state?',
          a: 'It makes the random split reproducible. Running the code again with the same data and settings produces the same split.',
        },
      ],
      code: `from sklearn.model_selection import train_test_split

X = [[1], [2], [3], [4], [5], [6], [7], [8], [9], [10]]
y = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

print("Training records:", len(X_train))
print("Testing records:", len(X_test))`,
      pitfalls: [
        'Do not train the model on the testing dataset.',
        'Do not repeatedly use the test set to tune the model.',
        'For classification, consider stratify=y when preserving class proportions matters.',
        'For time-series data, use chronological splitting instead of a random split.',
      ],
    }),

    lesson({
      slug: 'standard-scaler',
      title: 'StandardScaler()',
      summary: 'Put numerical features on a common scale.',
      definition:
        'StandardScaler is a preprocessing tool that standardizes numerical features by subtracting their mean and dividing by their standard deviation.',
      why:
        'Features can have very different numerical ranges. Some algorithms are affected by these differences, so scaling can help them learn more effectively.',
      purpose:
        'Its purpose is to make numerical features comparable in scale without changing their basic information.',
      when: [
        'When using K-Nearest Neighbours.',
        'When using Support Vector Machines.',
        'When using Logistic Regression or other scale-sensitive optimization methods.',
        'When numerical features have very different ranges.',
      ],
      simpleExample:
        'Age might range from 18 to 60, while salary might range from 20,000 to 100,000. StandardScaler transforms both features to a comparable scale.',
      realLife: {
        problem: 'A company wants to predict whether a customer will purchase a product using age and annual income.',
        approach: [
          'Collect customer age and income.',
          'Split the dataset into training and testing portions.',
          'Fit StandardScaler on the training features.',
          'Transform training and testing features using the fitted scaler.',
          'Train a suitable model on the scaled data.',
        ],
        outcome:
          'The model receives numerical features on a more comparable scale, which can help scale-sensitive algorithms.',
      },
      tasks: [
        'Create a dataset containing age and salary and apply StandardScaler.',
        'Compare the original values with the standardized values.',
        'Build a Pipeline containing StandardScaler and LogisticRegression, then evaluate it.',
      ],
      questions: [
        {
          q: 'What is StandardScaler?',
          a: 'It standardizes numerical features by subtracting the mean and dividing by the standard deviation.',
        },
        {
          q: 'Why is feature scaling important?',
          a: 'Algorithms based on distances or optimization can be affected when features have very different scales.',
        },
        {
          q: 'Should we fit StandardScaler on the complete dataset?',
          a: 'No. Fit it on training data only and use the fitted scaler to transform testing data. A Pipeline can handle this safely during cross-validation.',
        },
      ],
      code: `from sklearn.preprocessing import StandardScaler

X_train = [
    [18, 20000],
    [25, 50000],
    [30, 80000],
    [35, 60000]
]

X_test = [
    [28, 45000]
]

scaler = StandardScaler()

X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

print(X_train_scaled)
print(X_test_scaled)`,
      pitfalls: [
        'Do not fit the scaler separately on training and testing data.',
        'StandardScaler is not necessary for every algorithm. Decision trees and random forests generally do not require it.',
        'StandardScaler does not make data normally distributed.',
      ],
    }),

    lesson({
      slug: 'pipeline',
      title: 'Pipeline()',
      summary: 'Combine preprocessing and model training into one workflow.',
      definition:
        'Pipeline is a Scikit-learn tool that connects multiple processing steps and a final estimator into one sequential workflow.',
      why:
        'Without a Pipeline, you may need to write and manage every preprocessing and training step separately. A Pipeline makes the process more organised and helps prevent data leakage during cross-validation.',
      purpose:
        'Its purpose is to combine data preparation and model training so that the same steps are applied consistently during training and prediction.',
      when: [
        'When scaling features before training a model.',
        'When combining multiple preprocessing steps.',
        'When using GridSearchCV or cross-validation.',
        'When preparing a model for a repeatable workflow.',
      ],
      simpleExample:
        'Think of a Pipeline as an assembly line. First, it scales the data. Next, it sends the scaled data to a Machine Learning model.',
      realLife: {
        problem: 'A bank wants to predict whether a customer will repay a loan.',
        approach: [
          'Collect customer information.',
          'Create a Pipeline with StandardScaler and LogisticRegression.',
          'Train the Pipeline using training data.',
          'Pass new customer records to the trained Pipeline.',
        ],
        outcome:
          'The same preprocessing and prediction steps are applied consistently without manually repeating them.',
      },
      tasks: [
        'Create a Pipeline containing StandardScaler and LogisticRegression.',
        'Compare the Pipeline with separately executed scaling and model training.',
        'Use a Pipeline with GridSearchCV to tune a model without leaking validation-fold information.',
      ],
      questions: [
        {
          q: 'What is a Pipeline in Scikit-learn?',
          a: 'A Pipeline combines multiple preprocessing steps and a final estimator into one workflow.',
        },
        {
          q: 'Why is Pipeline useful?',
          a: 'It keeps code organised, applies transformations consistently and helps prevent preprocessing leakage during cross-validation.',
        },
        {
          q: 'Can a Pipeline contain multiple preprocessing steps?',
          a: 'Yes. It can contain multiple transformers followed by a final estimator.',
        },
      ],
      code: `from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

pipeline = Pipeline([
    ("scaler", StandardScaler()),
    ("model", LogisticRegression())
])

pipeline.fit(X_train, y_train)

predictions = pipeline.predict(X_test)

print(predictions)`,
      pitfalls: [
        'All intermediate Pipeline steps must be transformers.',
        'The final step must be an estimator that can perform the required task.',
        'Do not preprocess the complete dataset before cross-validation when the preprocessing learns values from data.',
      ],
    }),

    lesson({
      slug: 'column-transformer',
      title: 'ColumnTransformer()',
      summary: 'Apply different preprocessing methods to different columns.',
      definition:
        'ColumnTransformer applies different transformers to selected columns of a dataset and combines their outputs.',
      why:
        'Real-world datasets often contain numerical and categorical columns. These different data types usually need different preprocessing methods.',
      purpose:
        'Its purpose is to prepare different types of columns together in one preprocessing workflow.',
      when: [
        'When a dataset contains numerical and categorical columns.',
        'When numerical columns need scaling.',
        'When categorical columns need encoding.',
        'When building a complete preprocessing Pipeline.',
      ],
      simpleExample:
        'In a customer dataset, Age and Salary can be standardized, while City can be converted into binary columns using OneHotEncoder.',
      realLife: {
        problem: 'A company wants to predict customer purchases using age, salary and city.',
        approach: [
          'Identify numerical columns such as Age and Salary.',
          'Identify categorical columns such as City.',
          'Apply StandardScaler to numerical columns.',
          'Apply OneHotEncoder to categorical columns.',
          'Combine the preprocessing with a Machine Learning model.',
        ],
        outcome:
          'The model receives numerical input after the different column types have been processed appropriately.',
      },
      tasks: [
        'Create a dataset with Age, Salary and City columns.',
        'Apply StandardScaler to Age and Salary and OneHotEncoder to City.',
        'Combine ColumnTransformer and LogisticRegression inside a Pipeline and evaluate the model.',
      ],
      questions: [
        {
          q: 'What is ColumnTransformer?',
          a: 'It applies different preprocessing operations to different columns of a dataset.',
        },
        {
          q: 'Why do we use ColumnTransformer?',
          a: 'It allows numerical and categorical columns to be processed differently within one workflow.',
        },
        {
          q: 'What is the difference between Pipeline and ColumnTransformer?',
          a: 'Pipeline connects processing steps sequentially. ColumnTransformer applies different transformations to selected columns and combines the results.',
        },
      ],
      code: `from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder

preprocessor = ColumnTransformer([
    ("numeric", StandardScaler(), ["Age", "Salary"]),
    ("categorical", OneHotEncoder(handle_unknown="ignore"), ["City"])
])`,
      pitfalls: [
        'Make sure the selected column names exist in the input dataset.',
        'Use handle_unknown="ignore" when new categories may appear during prediction.',
        'ColumnTransformer preprocesses columns; it does not train the final Machine Learning model by itself.',
      ],
    }),

    lesson({
      slug: 'label-encoder',
      title: 'LabelEncoder()',
      summary: 'Convert target category labels into numerical values.',
      definition:
        'LabelEncoder converts unique target labels into integer values. For example, it can convert Low, Medium and High into numerical class identifiers.',
      why:
        'Many Scikit-learn classification workflows work with numerical class labels. LabelEncoder provides a way to convert text target labels into integers.',
      purpose:
        'Its purpose is to encode categorical target labels into numerical identifiers.',
      when: [
        'When classification target labels are stored as text.',
        'When you need to convert target categories into integer identifiers.',
        'When preparing target labels for a compatible classification workflow.',
      ],
      simpleExample:
        'A model needs to classify customer feedback as Positive, Negative or Neutral. LabelEncoder converts these names into numerical class identifiers.',
      realLife: {
        problem: 'A company has customer feedback labels stored as Positive, Negative and Neutral.',
        approach: [
          'Collect the target labels.',
          'Create a LabelEncoder.',
          'Fit the encoder on the target labels.',
          'Transform the labels into integer identifiers.',
          'Keep the fitted encoder for converting predictions back to their original labels.',
        ],
        outcome:
          'The text target labels are represented as numerical class identifiers.',
      },
      tasks: [
        'Create a list of text labels and encode them using LabelEncoder.',
        'Print the classes_ attribute and compare original and encoded labels.',
        'Train a classifier using encoded target labels and convert its predictions back using inverse_transform().',
      ],
      questions: [
        {
          q: 'What is LabelEncoder?',
          a: 'It converts unique target labels into integer identifiers.',
        },
        {
          q: 'Is LabelEncoder generally used for input features?',
          a: 'No. It is commonly used for target labels. For unordered categorical input features, OneHotEncoder is usually more suitable.',
        },
        {
          q: 'What does inverse_transform() do?',
          a: 'It converts encoded numerical labels back into their original class labels.',
        },
      ],
      code: `from sklearn.preprocessing import LabelEncoder

labels = ["Low", "Medium", "High", "Low", "High"]

encoder = LabelEncoder()

encoded_labels = encoder.fit_transform(labels)

print("Encoded:", encoded_labels)
print("Classes:", encoder.classes_)

original_labels = encoder.inverse_transform(encoded_labels)

print("Original:", original_labels)`,
      pitfalls: [
        'Do not assume the assigned numbers represent a meaningful ranking.',
        'Use OneHotEncoder for unordered categorical input features.',
        'Keep the fitted encoder so predictions can be converted back into original labels.',
      ],
    }),

    lesson({
      slug: 'one-hot-encoder',
      title: 'OneHotEncoder()',
      summary: 'Convert categorical input features into binary columns.',
      definition:
        'OneHotEncoder converts each category into a separate binary feature column. A value of 1 indicates the category is present, while 0 indicates it is absent.',
      why:
        'Many Machine Learning algorithms cannot directly work with text categories. One-hot encoding converts categories into numerical features without assigning them an artificial ranking.',
      purpose:
        'Its purpose is to represent categorical input features numerically.',
      when: [
        'When working with city, department or product category columns.',
        'When categories do not have a natural order.',
        'When preparing categorical data for a Machine Learning model.',
      ],
      simpleExample:
        'A City column containing Mumbai, Pune and Delhi becomes three columns: City_Mumbai, City_Pune and City_Delhi.',
      realLife: {
        problem: 'An online store wants to predict customer purchases using product categories.',
        approach: [
          'Collect product category information.',
          'Identify unique categories.',
          'Use OneHotEncoder to create binary columns.',
          'Train a model using the encoded features.',
        ],
        outcome:
          'The model can use numerical representations of product categories instead of raw text values.',
      },
      tasks: [
        'Create a list of cities and convert them using OneHotEncoder.',
        'Compare LabelEncoder and OneHotEncoder on an unordered category column.',
        'Use OneHotEncoder inside a ColumnTransformer and Pipeline to train a classification model.',
      ],
      questions: [
        {
          q: 'What is OneHotEncoder?',
          a: 'It converts categorical values into separate binary columns.',
        },
        {
          q: 'Why is OneHotEncoder useful?',
          a: 'It avoids giving unordered categories artificial numerical rankings.',
        },
        {
          q: 'What does handle_unknown="ignore" do?',
          a: 'It allows the encoder to handle previously unseen categories during transformation without raising an unknown-category error.',
        },
      ],
      code: `from sklearn.preprocessing import OneHotEncoder

cities = [
    ["Mumbai"],
    ["Pune"],
    ["Delhi"],
    ["Mumbai"]
]

encoder = OneHotEncoder(sparse_output=False)

encoded_cities = encoder.fit_transform(cities)

print(encoded_cities)
print(encoder.get_feature_names_out(["City"]))`,
      pitfalls: [
        'One-hot encoding can create many columns when a feature has thousands of unique categories.',
        'Use handle_unknown="ignore" when unseen categories are possible.',
        'Do not use LabelEncoder as a replacement for one-hot encoding on unordered input features.',
      ],
    }),

    lesson({
      slug: 'grid-search-cv',
      title: 'GridSearchCV()',
      summary: 'Find good model settings by testing different hyperparameter combinations.',
      definition:
        'GridSearchCV is a Scikit-learn model-selection tool that tests combinations of specified hyperparameters using cross-validation and selects the combination with the best average score.',
      why:
        'A Machine Learning model can perform differently depending on its settings. GridSearchCV helps compare multiple combinations systematically.',
      purpose:
        'Its purpose is to search for suitable hyperparameters and select a model based on cross-validation performance.',
      when: [
        'When a model has important hyperparameters to tune.',
        'When comparing different parameter combinations.',
        'When you want to automate hyperparameter searching.',
        'When you want to use cross-validation during model selection.',
      ],
      simpleExample:
        'A Decision Tree can have different maximum depths. GridSearchCV tests the selected depth values and compares their cross-validation scores.',
      realLife: {
        problem: 'A bank wants to improve a model that predicts whether a customer will repay a loan.',
        approach: [
          'Choose a classification algorithm.',
          'Define the hyperparameters to test.',
          'Create a GridSearchCV object.',
          'Train it using training data.',
          'Review the best parameters and cross-validation score.',
        ],
        outcome:
          'The bank obtains a model configuration that performed best among the tested combinations under the selected cross-validation setup.',
      },
      tasks: [
        'Create a DecisionTreeClassifier and test several max_depth values.',
        'Compare GridSearchCV results using different scoring metrics.',
        'Build a preprocessing Pipeline and use GridSearchCV to tune both preprocessing-compatible model settings and model hyperparameters.',
      ],
      questions: [
        {
          q: 'What is GridSearchCV?',
          a: 'It tests specified hyperparameter combinations using cross-validation and selects the combination with the best average validation score.',
        },
        {
          q: 'What is a hyperparameter?',
          a: 'A hyperparameter is a model setting chosen before or during model selection, rather than a parameter learned directly from the training examples.',
        },
        {
          q: 'What does cv=5 mean?',
          a: 'It uses five-fold cross-validation, where the training data is divided into five parts and each part is used for validation once.',
        },
      ],
      code: `from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import GridSearchCV

model = DecisionTreeClassifier(random_state=42)

parameters = {
    "max_depth": [2, 3, 4, 5],
    "min_samples_split": [2, 4, 6]
}

grid_search = GridSearchCV(
    estimator=model,
    param_grid=parameters,
    cv=5,
    scoring="accuracy"
)

grid_search.fit(X_train, y_train)

print(grid_search.best_params_)
print(grid_search.best_score_)

best_model = grid_search.best_estimator_`,
      pitfalls: [
        'GridSearchCV can become slow when too many combinations are tested.',
        'Choose a scoring metric that matches the actual problem.',
        'Use training data for model selection and keep the final test set separate.',
        'For imbalanced classification, accuracy may not be the best scoring metric.',
      ],
    }),

    lesson({
      slug: 'cross-val-score',
      title: 'cross_val_score()',
      summary: 'Evaluate a model using multiple cross-validation splits.',
      definition:
        'cross_val_score() evaluates an estimator using cross-validation and returns a score for each validation split.',
      why:
        'A single train/test split can produce an unusually high or low score depending on which records are selected. Cross-validation provides multiple evaluation results.',
      purpose:
        'Its purpose is to estimate model performance more reliably by evaluating it on several different data splits.',
      when: [
        'When comparing Machine Learning algorithms.',
        'When checking how consistently a model performs.',
        'When evaluating a model with limited training data.',
        'When selecting a suitable model before final testing.',
      ],
      simpleExample:
        'With five-fold cross-validation, the dataset is divided into five parts. The model is trained five times, and each part is used for validation once.',
      realLife: {
        problem: 'A company wants to compare different models for predicting customer purchases.',
        approach: [
          'Prepare the training dataset.',
          'Choose multiple candidate models.',
          'Evaluate each model using cross_val_score().',
          'Calculate and compare their average scores.',
          'Select a suitable model for further testing.',
        ],
        outcome:
          'The company can compare models across several validation splits instead of depending on only one split.',
      },
      tasks: [
        'Evaluate a DecisionTreeClassifier using five-fold cross-validation.',
        'Compare the average cross-validation scores of LogisticRegression and DecisionTreeClassifier.',
        'Evaluate an imbalanced classification problem using an appropriate metric such as F1 or average precision.',
      ],
      questions: [
        {
          q: 'What is cross_val_score()?',
          a: 'It evaluates a model using cross-validation and returns one score for each validation split.',
        },
        {
          q: 'What is five-fold cross-validation?',
          a: 'The data is divided into five parts. The model trains on four parts and validates on the remaining part, repeating this process five times.',
        },
        {
          q: 'What is the difference between train_test_split() and cross_val_score()?',
          a: 'train_test_split() creates a train/test split. cross_val_score() evaluates an estimator across multiple cross-validation splits.',
        },
      ],
      code: `from sklearn.model_selection import cross_val_score
from sklearn.tree import DecisionTreeClassifier

model = DecisionTreeClassifier(random_state=42)

scores = cross_val_score(
    model,
    X,
    y,
    cv=5,
    scoring="accuracy"
)

print("Individual scores:", scores)
print("Average score:", scores.mean())`,
      pitfalls: [
        'Do not use the final test set as the cross-validation dataset.',
        'Choose a scoring metric appropriate for the task.',
        'Use stratified folds for many classification problems when preserving class proportions is important.',
        'For time-series data, use a time-aware validation strategy rather than ordinary shuffled folds.',
      ],
    }),

    lesson({
      slug: 'fit-predict-and-evaluation',
      title: 'fit(), predict() and Model Evaluation',
      summary: 'Train a model, generate predictions and measure its performance.',
      definition:
        'fit() trains an estimator using data. predict() generates predictions for new input data. Evaluation metrics compare predictions with actual target values to measure model performance.',
      why:
        'These are the basic steps of almost every supervised Machine Learning project. Without training, the model has not learned from the data. Without evaluation, we cannot judge its performance.',
      purpose:
        'Their purpose is to train a model, use what it learned to make predictions and measure how close those predictions are to the actual answers.',
      when: [
        'When training a supervised Machine Learning model.',
        'When making predictions for new records.',
        'When measuring regression or classification performance.',
        'When comparing different trained models.',
      ],
      simpleExample:
        'You give a model student study hours and their marks. fit() teaches it using training examples. predict() estimates marks for new students. An evaluation metric compares the estimates with their actual marks.',
      realLife: {
        problem: 'A school wants to estimate students marks using their study hours.',
        approach: [
          'Prepare study hours as input features and marks as target values.',
          'Split the data into training and testing portions.',
          'Create a LinearRegression model.',
          'Use fit() to train the model.',
          'Use predict() to estimate marks for the testing data.',
          'Use Mean Absolute Error to measure prediction error.',
        ],
        outcome:
          'The school receives predicted marks and an evaluation result that helps it understand how accurate the model is.',
      },
      tasks: [
        'Train a LinearRegression model using a small dataset.',
        'Generate predictions and calculate Mean Absolute Error and R-squared.',
        'Train a classification model and evaluate it using a confusion matrix, precision, recall and F1-score.',
      ],
      questions: [
        {
          q: 'What does fit() do?',
          a: 'fit() trains an estimator using the supplied training data. The estimator learns the parameters needed for its task.',
        },
        {
          q: 'What does predict() do?',
          a: 'predict() uses a fitted model to generate predictions for new input data.',
        },
        {
          q: 'What is the difference between regression and classification evaluation?',
          a: 'Regression metrics measure numerical prediction errors, while classification metrics measure how well predicted classes match actual classes.',
        },
      ],
      code: `from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, r2_score

X = [[1], [2], [3], [4], [5], [6], [7], [8], [9], [10]]
y = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

model = LinearRegression()

model.fit(X_train, y_train)

predictions = model.predict(X_test)

print("Predictions:", predictions)
print("Actual values:", y_test)
print("Mean Absolute Error:", mean_absolute_error(y_test, predictions))
print("R-squared:", r2_score(y_test, predictions))`,
      pitfalls: [
        'Use a regression model for numerical targets and a classification model for class labels.',
        'Do not use accuracy_score() with ordinary LinearRegression predictions.',
        'Do not evaluate a model only on the data it was trained on.',
        'Choose evaluation metrics based on the actual business problem.',
      ],
    }),
  ],
}

export default ch
