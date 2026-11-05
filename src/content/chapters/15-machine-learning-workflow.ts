
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
  id: 'machine-learning-workflow',
  number: 15,
  title: 'Machine Learning Workflow & Model Evaluation',
  tagline:
    'Learn the complete process of building, training, testing, and evaluating Machine Learning models.',
  priority: 'extreme',
  topics: [
    lesson({
      slug: 'collect-data',
      title: 'Collect Data',
      summary:
        'Learn how to gather the information needed to train a Machine Learning model.',
      definition:
        'Data Collection is the process of gathering information from different sources so that a Machine Learning model can learn patterns and make predictions.',
      why:
        'A Machine Learning model learns from data. If the collected data is incomplete, incorrect, outdated, or unrelated to the problem, the model may produce poor predictions.',
      purpose:
        'The purpose is to gather enough relevant and reliable data to solve the problem. The quality and usefulness of the collected data strongly affect the model’s performance.',
      when: [
        'When starting a new Machine Learning project.',
        'When building a prediction or classification model.',
        'When existing data is not sufficient.',
        'When combining information from multiple sources.',
      ],
      simpleExample:
        'Imagine you want to predict house prices. You collect information about houses, including area, number of bedrooms, location, age, and selling price. This information becomes the dataset used to train the model.',
      detail:
        'Common sources of data include:\n\n- CSV and Excel files.\n- Databases such as MySQL and PostgreSQL.\n- APIs that provide data from other applications.\n- Websites through permitted web scraping.\n- Sensors and IoT devices.\n- Surveys and user-generated information.\n\nBefore collecting data, identify the problem, decide what information is required, and check whether you have permission to use it.',
      realLife: {
        problem:
          'A real estate company wants to predict the selling price of houses.',
        approach: [
          'Collect historical house sale records.',
          'Gather house area, location, bedrooms, and age.',
          'Collect the actual selling price for each house.',
          'Combine the information into a structured dataset.',
        ],
        outcome:
          'The company gets a dataset that can be used to train a house-price prediction model.',
      },
      tasks: [
        'Find or create a dataset containing house prices and house features.',
        'Compare data collected from a CSV file, database, and API.',
        'Collect and combine multiple relevant datasets for a house-price prediction project.',
      ],
      questions: [
        {
          q: 'What is data collection in Machine Learning?',
          a:
            'Data collection is the process of gathering relevant information from sources such as files, databases, APIs, sensors, and surveys.',
        },
        {
          q: 'Why is data collection important?',
          a:
            'A model learns patterns from data. Poor-quality or irrelevant data can lead to inaccurate predictions.',
        },
        {
          q: 'What are common sources of Machine Learning data?',
          a:
            'Common sources include CSV files, Excel files, databases, APIs, websites, sensors, and surveys.',
        },
        {
          q: 'What is a dataset?',
          a:
            'A dataset is a collection of related data organized for analysis or model training.',
        },
        {
          q: 'What is the difference between data and a dataset?',
          a:
            'Data refers to individual facts or values, while a dataset is an organized collection of those values.',
        },
      ],
      code: `import pandas as pd

data = {
    "area": [1000, 1200, 1500, 1800],
    "bedrooms": [2, 2, 3, 4],
    "price": [3000000, 3500000, 4500000, 5500000]
}

df = pd.DataFrame(data)

print(df)
print("Number of rows:", len(df))
print("Columns:", df.columns.tolist())`,
      pitfalls: [
        'Collecting irrelevant information that does not help solve the problem.',
        'Using outdated or unreliable data.',
        'Ignoring privacy, consent, and data usage permissions.',
        'Collecting too little data to represent the real problem.',
      ],
    }),

    lesson({
      slug: 'clean-data',
      title: 'Clean Data',
      summary:
        'Learn how to find and fix missing, incorrect, duplicate, and inconsistent data.',
      definition:
        'Data Cleaning is the process of identifying and correcting problems in a dataset. It includes handling missing values, removing unwanted duplicates, correcting errors, and making data consistent.',
      why:
        'Real-world data is often messy. It may contain empty cells, duplicate records, spelling mistakes, incorrect values, or inconsistent formats. A model trained on poor-quality data may learn incorrect patterns.',
      purpose:
        'The purpose is to make the dataset accurate, consistent, and suitable for analysis and Machine Learning.',
      when: [
        'After collecting data.',
        'When a dataset contains missing values.',
        'When duplicate records are present.',
        'When values have incorrect formats or inconsistent spellings.',
        'Before training a Machine Learning model.',
      ],
      simpleExample:
        'Imagine a student dataset where some ages are missing, some students appear twice, and marks are written as text instead of numbers. Data cleaning means fixing these issues so the dataset becomes usable.',
      detail:
        'Common data-cleaning activities include:\n\n1. Missing values: Fill them using an appropriate method or remove affected rows when justified.\n2. Duplicate records: Identify repeated records and remove only those that are genuinely duplicates.\n3. Incorrect values: Correct impossible or invalid entries.\n4. Data types: Convert values into appropriate types, such as numbers or dates.\n5. Inconsistent categories: Standardize values such as "Mumbai", "mumbai", and "MUMBAI".\n\nImportant: Learn preprocessing values from training data only when preparing a predictive model. Do not use test data to calculate imputation or scaling values.',
      realLife: {
        problem:
          'A school has a student dataset containing missing marks, duplicate students, and inconsistent names.',
        approach: [
          'Find missing values in the dataset.',
          'Check whether student records are duplicated.',
          'Correct invalid marks and data types.',
          'Standardize inconsistent text values.',
        ],
        outcome:
          'The school gets a more consistent dataset that can be used for analysis and prediction.',
      },
      tasks: [
        'Create a dataset containing missing values and duplicate records.',
        'Compare dropping missing values with filling them using mean or median.',
        'Clean a real dataset using Pandas and explain each correction.',
      ],
      questions: [
        {
          q: 'What is data cleaning?',
          a:
            'Data cleaning is the process of finding and fixing problems such as missing values, duplicates, incorrect entries, and inconsistent formats.',
        },
        {
          q: 'Why is data cleaning important?',
          a:
            'It improves data quality and reduces the chance of a model learning incorrect patterns from bad data.',
        },
        {
          q: 'What are missing values?',
          a:
            'Missing values are entries where information has not been recorded or is unavailable.',
        },
        {
          q: 'Should we always remove duplicate rows?',
          a:
            'No. First check whether they are accidental duplicates. Repeated transactions or events may be valid records.',
        },
        {
          q: 'What is data preprocessing?',
          a:
            'Data preprocessing is the broader process of preparing raw data for analysis or Machine Learning. It includes cleaning, transforming, encoding, and scaling data.',
        },
      ],
      code: `import pandas as pd

data = {
    "name": ["Aman", "Riya", "Aman", "Rahul"],
    "age": [23, None, 23, 25],
    "marks": [85, 90, 85, None]
}

df = pd.DataFrame(data)

print("Original data:")
print(df)

df = df.drop_duplicates()

df["age"] = df["age"].fillna(df["age"].median())
df["marks"] = df["marks"].fillna(df["marks"].median())

print("\\nCleaned data:")
print(df)`,
      pitfalls: [
        'Removing too many rows can result in losing useful information.',
        'Mean imputation can be affected by extreme values; median may be more appropriate for skewed data.',
        'Not every repeated value represents a duplicate record.',
        'Filling missing values before splitting the data can cause data leakage in predictive workflows.',
      ],
    }),

    lesson({
      slug: 'exploratory-data-analysis',
      title: 'Exploratory Data Analysis (EDA)',
      summary:
        'Learn how to understand a dataset by examining its values, patterns, relationships, and distributions.',
      definition:
        'Exploratory Data Analysis (EDA) is the process of examining and visualizing data to understand its structure, identify patterns, discover relationships, and find unusual values before building a Machine Learning model.',
      why:
        'EDA helps us understand what the data contains. It can reveal missing values, unusual records, imbalanced categories, relationships between features, and possible problems that need to be addressed.',
      purpose:
        'The purpose is to understand the dataset before choosing features and training a model. It helps guide decisions about cleaning, feature engineering, and model selection.',
      when: [
        'After collecting and initially cleaning data.',
        'Before selecting features for a model.',
        'When trying to understand relationships between variables.',
        'When investigating unusual values or unexpected patterns.',
        'When communicating findings through charts and summaries.',
      ],
      simpleExample:
        'Imagine you have student marks and study hours. Through EDA, you calculate average marks, check the distribution of scores, and create a chart comparing study hours with marks. You may discover that students who study more hours generally score higher.',
      detail:
        'EDA commonly includes three types of analysis:\n\n1. Univariate analysis: Examines one variable, such as the distribution of student marks.\n2. Bivariate analysis: Examines the relationship between two variables, such as study hours and marks.\n3. Multivariate analysis: Examines relationships among three or more variables.\n\nCommon EDA tools include:\n\n- Pandas for summaries and data inspection.\n- Matplotlib and Seaborn for charts.\n- Histograms for distributions.\n- Box plots for spread and potential outliers.\n- Scatter plots for relationships between numerical variables.\n- Correlation matrices for numerical relationships.',
      realLife: {
        problem:
          'A college wants to understand what factors are related to student performance.',
        approach: [
          'Calculate average marks and other descriptive statistics.',
          'Visualize the distribution of student scores.',
          'Compare study hours with marks using a scatter plot.',
          'Investigate missing values and unusual observations.',
        ],
        outcome:
          'The college understands the dataset better and can identify useful variables for a student-performance model.',
      },
      tasks: [
        'Load a student dataset and calculate its mean, median, and standard deviation.',
        'Create histograms, box plots, and scatter plots to understand the data.',
        'Perform univariate, bivariate, and multivariate analysis on a real dataset and write your findings.',
      ],
      questions: [
        {
          q: 'What is Exploratory Data Analysis?',
          a:
            'EDA is the process of examining and visualizing a dataset to understand its structure, patterns, relationships, and unusual values.',
        },
        {
          q: 'Why is EDA important?',
          a:
            'EDA helps identify data-quality issues and understand which variables may be useful before training a model.',
        },
        {
          q: 'What is univariate analysis?',
          a:
            'Univariate analysis studies one variable at a time, such as examining the distribution of house prices.',
        },
        {
          q: 'What is bivariate analysis?',
          a:
            'Bivariate analysis studies the relationship between two variables, such as house area and house price.',
        },
        {
          q: 'What is multivariate analysis?',
          a:
            'Multivariate analysis examines relationships among three or more variables.',
        },
      ],
      code: `import pandas as pd
import matplotlib.pyplot as plt

data = {
    "study_hours": [1, 2, 3, 4, 5, 6],
    "marks": [40, 45, 55, 65, 75, 85]
}

df = pd.DataFrame(data)

print(df.describe())
print("\\nCorrelation:")
print(df.corr())

plt.scatter(df["study_hours"], df["marks"])
plt.xlabel("Study Hours")
plt.ylabel("Marks")
plt.title("Study Hours vs Marks")
plt.show()`,
      pitfalls: [
        'Correlation does not prove that one variable causes another.',
        'A chart should be selected based on the type of data and question.',
        'Do not ignore unusual observations without investigating them.',
        'EDA should not be used to make decisions based on information from the test set that would not be available at prediction time.',
      ],
    }),

    lesson({
      slug: 'feature-engineering',
      title: 'Feature Engineering',
      summary:
        'Learn how to create, transform, and select useful input variables to improve model performance.',
      definition:
        'Feature Engineering is the process of selecting, creating, or transforming input variables so that a Machine Learning model can learn useful patterns more effectively. These input variables are called features.',
      why:
        'Raw data is not always in the best format for a model. Useful information may need to be extracted, categories may need to be converted into numbers, and numerical features may need scaling.',
      purpose:
        'The purpose is to make the input data more useful for learning. Good features can help a model identify patterns that may be difficult to discover from raw data.',
      when: [
        'When raw columns are not suitable for model training.',
        'When useful information can be created from existing columns.',
        'When categorical values need numerical encoding.',
        'When features have very different numerical scales.',
        'When irrelevant or redundant features need to be removed.',
      ],
      simpleExample:
        'Imagine a dataset contains a date of birth. Instead of giving the raw date directly to a simple model, you can create an age feature. You can also convert a city column into numerical categories using one-hot encoding.',
      detail:
        'Common feature-engineering techniques include:\n\n1. Feature creation: Create a new column from existing information, such as age from date of birth.\n2. Encoding: Convert categories such as city or department into numerical representations.\n3. Scaling: Put numerical features on comparable scales using StandardScaler or MinMaxScaler.\n4. Feature selection: Choose useful existing features and remove irrelevant ones.\n5. Transformation: Apply methods such as logarithmic transformation to suitable numerical features.\n\nFeature selection chooses existing features. Feature extraction creates a new representation, such as PCA components.\n\nFit transformations using training data only, then apply the learned transformations to validation and test data.',
      realLife: {
        problem:
          'A company wants to predict employee salaries using experience, education, job role, and location.',
        approach: [
          'Create experience groups if they are useful for the problem.',
          'Encode job role and location.',
          'Scale numerical features when required by the algorithm.',
          'Remove features that are irrelevant or leak the target.',
        ],
        outcome:
          'The model receives better-prepared features that can help it learn salary-related patterns.',
      },
      tasks: [
        'Create an age feature from a date-of-birth column.',
        'Compare one-hot encoding and label encoding on a categorical dataset.',
        'Build a preprocessing pipeline that creates and transforms features without data leakage.',
      ],
      questions: [
        {
          q: 'What is feature engineering?',
          a:
            'Feature engineering is the process of creating, selecting, and transforming input variables to help a Machine Learning model learn useful patterns.',
        },
        {
          q: 'What is a feature?',
          a:
            'A feature is an input variable used by a Machine Learning model to make predictions.',
        },
        {
          q: 'What is feature selection?',
          a:
            'Feature selection is the process of choosing useful existing features and removing features that are irrelevant or redundant.',
        },
        {
          q: 'What is feature scaling?',
          a:
            'Feature scaling adjusts numerical values to comparable ranges or distributions. It is especially useful for algorithms such as KNN, SVM, and many gradient-based models.',
        },
        {
          q: 'What is one-hot encoding?',
          a:
            'One-hot encoding converts a categorical feature into multiple binary columns, with each column representing a category.',
        },
      ],
      code: `import pandas as pd

data = {
    "name": ["Aman", "Riya", "Rahul"],
    "date_of_birth": [
        "2000-05-10",
        "1999-08-15",
        "2001-02-20"
    ],
    "city": ["Mumbai", "Pune", "Mumbai"],
    "salary": [40000, 50000, 35000]
}

df = pd.DataFrame(data)

df["date_of_birth"] = pd.to_datetime(df["date_of_birth"])

df["age"] = (
    pd.Timestamp("2026-01-01") - df["date_of_birth"]
).dt.days // 365

df = pd.get_dummies(df, columns=["city"], dtype=int)

print(df)`,
      pitfalls: [
        'Do not use information that would only become available after the prediction is made.',
        'Do not calculate scaling or imputation values using the test set.',
        'Creating too many unnecessary features can make a model more complex.',
        'Encoding a category as an integer can accidentally suggest an order that does not exist.',
      ],
    }),

    lesson({
      slug: 'train-test-split',
      title: 'Train/Test Split',
      summary:
        'Learn how to divide a dataset so that a model can be trained on one part and tested on unseen data.',
      definition:
        'Train/Test Split is the process of dividing a dataset into separate training and testing portions. The training data is used to fit the model, while the testing data is kept separate to evaluate how well the model performs on unseen examples.',
      why:
        'A model may perform very well on the data it has already seen but poorly on new data. Testing on unseen examples gives us a better idea of how well the model generalizes.',
      purpose:
        'The purpose is to evaluate whether a model has learned useful patterns instead of simply memorizing its training examples.',
      when: [
        'Before training a supervised Machine Learning model.',
        'When comparing different algorithms.',
        'When estimating performance on unseen examples.',
        'When checking for overfitting.',
      ],
      simpleExample:
        'Imagine you have 1,000 student records. You use 800 records to train the model and keep 200 records for testing. The model learns from the 800 records, and you use the remaining 200 to check how well it predicts student results.',
      detail:
        'A common split is:\n\n- 80% training data.\n- 20% testing data.\n\nOther splits, such as 70/30 or 75/25, may also be appropriate.\n\nFor classification problems, stratified splitting can preserve class proportions in both sets. For time-series data, use chronological splitting rather than a random split.\n\nA validation set or cross-validation can be used for model selection and hyperparameter tuning. Keep the final test set separate until the final evaluation.\n\nPreprocessing steps such as imputation, scaling, and encoding should be fitted on training data only. A scikit-learn Pipeline helps prevent leakage.',
      realLife: {
        problem:
          'A bank wants to predict whether a customer will repay a loan.',
        approach: [
          'Collect historical loan records.',
          'Divide the records into training and testing sets.',
          'Train the model using only the training set.',
          'Evaluate its predictions on the unseen testing set.',
        ],
        outcome:
          'The bank gets an estimate of how well the model may perform on new customer records.',
      },
      tasks: [
        'Split a dataset into 80% training and 20% testing data.',
        'Compare random splitting with stratified splitting for classification.',
        'Create a complete preprocessing and model pipeline that keeps the test set separate.',
      ],
      questions: [
        {
          q: 'What is train/test split?',
          a:
            'It is the process of dividing data into training and testing sets so that a model can be trained on one portion and evaluated on unseen data.',
        },
        {
          q: 'Why do we split data?',
          a:
            'We split data to estimate how well the model performs on new examples rather than only checking its performance on training data.',
        },
        {
          q: 'What is training data?',
          a:
            'Training data is the portion of the dataset used by the learning algorithm to fit the model.',
        },
        {
          q: 'What is testing data?',
          a:
            'Testing data is a separate portion used to evaluate the final model on examples it did not use during training.',
        },
        {
          q: 'What is data leakage?',
          a:
            'Data leakage occurs when information that would not legitimately be available during training or prediction influences the model-building process, producing overly optimistic results.',
        },
      ],
      code: `from sklearn.model_selection import train_test_split
from sklearn.datasets import load_iris

data = load_iris()

X = data.data
y = data.target

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

print("Training rows:", len(X_train))
print("Testing rows:", len(X_test))
print("Training labels:", len(y_train))
print("Testing labels:", len(y_test))`,
      pitfalls: [
        'Do not train the model using the test set.',
        'Do not repeatedly tune a model against the final test set.',
        'Use stratification where appropriate for imbalanced classification.',
        'Use chronological splitting for time-series prediction.',
        'Do not fit preprocessing transformations on the complete dataset before splitting.',
      ],
    }),

    lesson({
      slug: 'choose-ml-algorithm',
      title: 'Choose ML Algorithm',
      summary:
        'Learn how to select a suitable Machine Learning algorithm based on the problem and data.',
      definition:
        'Choosing an ML algorithm means selecting a learning method that is suitable for the problem, the type of target variable, the available data, and the project requirements.',
      why:
        'Different algorithms solve different types of problems and have different strengths and limitations. Choosing a suitable algorithm helps build a model that is accurate, efficient, and practical.',
      purpose:
        'The purpose is to select one or more candidate algorithms that can learn useful patterns from the prepared data.',
      when: [
        'After understanding and preparing the dataset.',
        'When deciding how to solve a regression problem.',
        'When building a classification model.',
        'When grouping data without labeled targets.',
        'When comparing different approaches to the same problem.',
      ],
      simpleExample:
        'Imagine you want to predict house prices. Since the target is a numerical value, you can start with Linear Regression, Decision Tree Regression, or Random Forest Regression. If you want to predict whether a customer will leave a service, you need a classification algorithm instead.',
      detail:
        'Algorithm selection depends on the problem:\n\nRegression: Predicts numerical values. Examples include Linear Regression, Decision Tree Regression, and Random Forest Regression.\n\nClassification: Predicts categories or labels. Examples include Logistic Regression, Decision Trees, KNN, SVM, and Random Forest Classifier.\n\nClustering: Groups similar observations without labeled target values. Examples include K-Means and DBSCAN.\n\nThe best algorithm depends on factors such as dataset size, feature types, interpretability, prediction speed, computational cost, and evaluation results. It is usually better to compare a few reasonable baseline models than to assume one algorithm is always best.',
      realLife: {
        problem:
          'An online store wants to predict whether a customer will purchase a product.',
        approach: [
          'Identify the target as a yes-or-no outcome.',
          'Recognize the task as a classification problem.',
          'Try Logistic Regression as a baseline.',
          'Compare it with a Decision Tree and Random Forest using suitable validation.',
        ],
        outcome:
          'The store selects a classification model based on measured performance and business requirements.',
      },
      tasks: [
        'Identify suitable algorithms for house-price prediction and spam detection.',
        'Compare Linear Regression, Decision Tree, and Random Forest for a prediction task.',
        'Train and compare multiple candidate algorithms using cross-validation.',
      ],
      questions: [
        {
          q: 'How do you choose a Machine Learning algorithm?',
          a:
            'Consider the problem type, target variable, dataset size, feature types, interpretability, computational needs, and validation performance.',
        },
        {
          q: 'Which algorithms are commonly used for regression?',
          a:
            'Linear Regression, Decision Tree Regression, Random Forest Regression, and Support Vector Regression are common examples.',
        },
        {
          q: 'Which algorithms are commonly used for classification?',
          a:
            'Logistic Regression, Decision Trees, KNN, SVM, and Random Forest are common classification algorithms.',
        },
        {
          q: 'Can we try more than one algorithm?',
          a:
            'Yes. Comparing multiple suitable algorithms using the same validation strategy often helps identify a better model.',
        },
        {
          q: 'Is the most complex algorithm always the best?',
          a:
            'No. A simpler model may perform well, be easier to explain, and require fewer resources. The choice should be based on evidence and project requirements.',
        },
      ],
      code: `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

data = load_iris()

X_train, X_test, y_train, y_test = train_test_split(
    data.data,
    data.target,
    test_size=0.2,
    random_state=42,
    stratify=data.target
)

models = {
    "Logistic Regression": LogisticRegression(max_iter=1000),
    "Random Forest": RandomForestClassifier(
        n_estimators=100,
        random_state=42
    )
}

for name, model in models.items():
    model.fit(X_train, y_train)
    predictions = model.predict(X_test)

    print(name)
    print("Accuracy:", accuracy_score(y_test, predictions))`,
      pitfalls: [
        'Do not choose an algorithm only because it is popular.',
        'Do not compare algorithms using different test sets or inconsistent evaluation methods.',
        'A high training score does not guarantee good performance on unseen data.',
        'Consider interpretability and deployment requirements, not only accuracy.',
      ],
    }),

    lesson({
      slug: 'train-model',
      title: 'Train Model',
      summary:
        'Learn how a Machine Learning algorithm finds patterns from training data.',
      definition:
        'Model Training is the process of providing training data to a Machine Learning algorithm so that it can learn patterns and adjust its internal parameters to make predictions.',
      why:
        'An algorithm needs to learn from examples before it can make useful predictions. Training allows it to identify relationships between input features and the target variable.',
      purpose:
        'The purpose is to create a trained model that has learned patterns from the training dataset and can make predictions on new data.',
      when: [
        'After selecting an algorithm.',
        'After preparing features and target values.',
        'After splitting the data into training and testing sets.',
        'When building or updating a predictive model.',
      ],
      simpleExample:
        'Imagine training a model to predict house prices. You provide historical house sizes, locations, bedrooms, and actual selling prices. The algorithm learns relationships between the features and prices. After training, it can estimate the price of another house.',
      detail:
        'A basic training process:\n\n1. Select the algorithm.\n2. Provide the training features (X_train).\n3. Provide the training target (y_train).\n4. The algorithm learns from the examples.\n5. The fitted model stores the learned parameters or patterns.\n\nIn scikit-learn, the fit() method is commonly used to train a model.\n\nFor many algorithms, training involves minimizing a loss or error function. The exact learning process depends on the algorithm.',
      realLife: {
        problem:
          'A company wants to predict whether a customer will cancel a subscription.',
        approach: [
          'Prepare historical customer information.',
          'Select a classification algorithm.',
          'Provide training features and known cancellation labels.',
          'Fit the algorithm using the training dataset.',
        ],
        outcome:
          'The company gets a trained model that can estimate cancellation risk for new customers.',
      },
      tasks: [
        'Train a Linear Regression model using a small numerical dataset.',
        'Compare the training performance of Logistic Regression and Random Forest.',
        'Train a classification model using a preprocessing pipeline and explain what fit() does.',
      ],
      questions: [
        {
          q: 'What is model training?',
          a:
            'Model training is the process in which an algorithm learns patterns and adjusts its parameters using training data.',
        },
        {
          q: 'What is the fit() method in scikit-learn?',
          a:
            'The fit() method trains a model using input features and their corresponding target values.',
        },
        {
          q: 'What are X and y in Machine Learning?',
          a:
            'X represents the input features, while y represents the target variable the model is trying to predict.',
        },
        {
          q: 'What is a trained model?',
          a:
            'A trained model is a fitted learning system that has learned patterns or parameters from training data.',
        },
        {
          q: 'What is a loss function?',
          a:
            'A loss function measures how far a model’s predictions are from the actual target values according to a chosen mathematical objective.',
        },
      ],
      code: `from sklearn.datasets import load_diabetes
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

data = load_diabetes()

X = data.data
y = data.target

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

model = LinearRegression()

model.fit(X_train, y_train)

print("Model trained successfully")
print("Learned coefficients:", model.coef_)
print("Intercept:", model.intercept_)`,
      pitfalls: [
        'Training on the test set makes the evaluation unreliable.',
        'A model can memorize training examples instead of learning general patterns.',
        'Training data should represent the type of data the model will encounter.',
        'Preprocessing steps must be learned from training data only.',
      ],
    }),

    lesson({
      slug: 'evaluate-model',
      title: 'Evaluate Model',
      summary:
        'Learn how to check whether a trained model makes accurate and reliable predictions.',
      definition:
        'Model Evaluation is the process of measuring how well a trained Machine Learning model performs on data that was not used to fit it. The evaluation method and metrics depend on whether the task is regression, classification, or another type of learning problem.',
      why:
        'A model may perform well on training data but fail on new examples. Evaluation helps us understand its strengths, weaknesses, and ability to generalize.',
      purpose:
        'The purpose is to measure model performance, compare candidate models, detect problems such as overfitting, and decide whether the model is suitable for the intended task.',
      when: [
        'After training a model.',
        'When comparing different algorithms.',
        'Before deploying a model.',
        'When checking for overfitting or underfitting.',
        'When monitoring an existing model.',
      ],
      simpleExample:
        'Imagine a model predicts whether students will pass an exam. You test it on 100 students whose results are already known. If it predicts 90 correctly, its accuracy is 90%. However, you should also check metrics such as precision and recall when the classes are imbalanced or mistakes have different costs.',
      detail:
        'The evaluation metrics depend on the problem.\n\nFor regression:\n\n- MAE: Average absolute difference between actual and predicted values.\n- MSE: Average squared prediction error.\n- RMSE: Square root of MSE, expressed in the target variable’s units.\n- R²: Measures how much of the target variation is explained by the model relative to a baseline.\n\nFor classification:\n\n- Accuracy: Proportion of predictions that are correct.\n- Precision: Of the positive predictions, how many were actually positive?\n- Recall: Of the actual positive examples, how many did the model identify?\n- F1-score: Harmonic mean of precision and recall.\n- Confusion Matrix: Shows correct and incorrect predictions by class.\n\nUse validation data or cross-validation to compare models and tune hyperparameters. Keep the final test set for an unbiased final evaluation.',
      realLife: {
        problem:
          'A bank has trained a model to identify potentially fraudulent transactions.',
        approach: [
          'Test the model on transactions not used for training.',
          'Calculate precision and recall.',
          'Inspect the confusion matrix to understand false positives and false negatives.',
          'Compare performance with business requirements.',
        ],
        outcome:
          'The bank understands how reliably the model identifies suspicious transactions and whether it is suitable for use.',
      },
      tasks: [
        'Calculate accuracy, precision, recall, and F1-score for a classification example.',
        'Compare MAE, MSE, and RMSE for a regression model.',
        'Evaluate multiple models using cross-validation and explain which metrics matter for the project.',
      ],
      questions: [
        {
          q: 'What is model evaluation?',
          a:
            'Model evaluation measures how well a trained model performs on data that was not used to fit it.',
        },
        {
          q: 'What is accuracy?',
          a:
            'Accuracy is the proportion of all predictions that are correct.',
        },
        {
          q: 'What is precision?',
          a:
            'Precision measures how many of the examples predicted as positive are actually positive.',
        },
        {
          q: 'What is recall?',
          a:
            'Recall measures how many of the actual positive examples the model successfully identifies.',
        },
        {
          q: 'What is the F1-score?',
          a:
            'The F1-score is the harmonic mean of precision and recall. It is useful when both types of performance matter.',
        },
        {
          q: 'What is a confusion matrix?',
          a:
            'A confusion matrix is a table that compares actual classes with predicted classes, showing true positives, true negatives, false positives, and false negatives for binary classification.',
        },
        {
          q: 'Why is accuracy not always enough?',
          a:
            'Accuracy can be misleading when classes are imbalanced or when false positives and false negatives have different costs. Precision, recall, F1-score, and other metrics may be more informative.',
        },
      ],
      code: `from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    confusion_matrix
)

data = load_breast_cancer()

X_train, X_test, y_train, y_test = train_test_split(
    data.data,
    data.target,
    test_size=0.2,
    random_state=42,
    stratify=data.target
)

model = LogisticRegression(max_iter=5000)

model.fit(X_train, y_train)

predictions = model.predict(X_test)

print("Accuracy:", accuracy_score(y_test, predictions))
print("Precision:", precision_score(y_test, predictions))
print("Recall:", recall_score(y_test, predictions))
print("F1 Score:", f1_score(y_test, predictions))
print("Confusion Matrix:")
print(confusion_matrix(y_test, predictions))`,
      pitfalls: [
        'Do not evaluate a model only on its training data.',
        'Accuracy alone can be misleading for imbalanced datasets.',
        'Choose metrics based on the real cost of different prediction errors.',
        'Do not repeatedly tune against the final test set.',
        'A good test score does not guarantee that performance will remain the same after deployment.',
      ],
    }),

    lesson({
      slug: 'prediction-and-deployment',
      title: 'Prediction & Deployment',
      summary:
        'Learn how to use a trained model to make predictions and make it available to real users or applications.',
      definition:
        'Prediction is the process of using a trained model to produce an output for new input data. Deployment is the process of making that trained model available through an application, API, website, or other system so that it can be used in practice.',
      why:
        'A trained model is useful only when it can help solve a real problem. Prediction produces outputs for new cases, while deployment makes those predictions accessible to users or other software.',
      purpose:
        'The purpose is to turn a trained model into a usable solution. It allows an application or user to send new information and receive a model prediction.',
      when: [
        'After the model has been trained and evaluated.',
        'When an application needs predictions for new data.',
        'When a business wants to use a model in its daily operations.',
        'When providing predictions through a website or API.',
      ],
      simpleExample:
        'Imagine you have trained a house-price prediction model. A user enters a house area, number of bedrooms, and other details on a website. The website sends this information to the model and displays the predicted price.',
      detail:
        'A simple deployment process:\n\n1. Train and evaluate the model.\n2. Save the trained model and required preprocessing steps.\n3. Build an application or API around the model.\n4. Accept new input data from users or other systems.\n5. Apply the same preprocessing used during training.\n6. Generate and return predictions.\n7. Monitor performance, errors, and data changes.\n\nCommon deployment options include REST APIs built with FastAPI or Flask, web applications, cloud services, and batch prediction jobs.\n\nDeployment also requires versioning, security, input validation, logging, and monitoring. If the incoming data changes over time, the model may need to be retrained.',
      realLife: {
        problem:
          'A real estate website wants to show estimated house prices to visitors.',
        approach: [
          'Train and evaluate a house-price model.',
          'Save the model and preprocessing pipeline.',
          'Create an API that accepts house information.',
          'Use the trained model to predict the price.',
          'Return the prediction to the website.',
        ],
        outcome:
          'Website visitors can enter house details and receive estimated prices through the deployed model.',
      },
      tasks: [
        'Use a trained model to predict the price of a new house.',
        'Save and load a trained model using joblib.',
        'Build a small FastAPI application that accepts input data and returns a model prediction.',
      ],
      questions: [
        {
          q: 'What is prediction in Machine Learning?',
          a:
            'Prediction is the process of using a trained model to generate an output for new input data.',
        },
        {
          q: 'What is model deployment?',
          a:
            'Model deployment means making a trained model available through an application, API, website, or another system so it can be used.',
        },
        {
          q: 'What is an API in model deployment?',
          a:
            'An API allows another application to send input data to a model service and receive its prediction as a response.',
        },
        {
          q: 'What is model serialization?',
          a:
            'Model serialization is the process of saving a trained model into a file or format so it can be loaded and used later.',
        },
        {
          q: 'Why is model monitoring important?',
          a:
            'Monitoring helps detect errors, changes in incoming data, and drops in prediction quality after deployment.',
        },
      ],
      code: `from sklearn.datasets import load_diabetes
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import joblib

data = load_diabetes()

X_train, X_test, y_train, y_test = train_test_split(
    data.data,
    data.target,
    test_size=0.2,
    random_state=42
)

model = LinearRegression()

model.fit(X_train, y_train)

joblib.dump(model, "house_model.pkl")

loaded_model = joblib.load("house_model.pkl")

new_data = X_test[:2]

predictions = loaded_model.predict(new_data)

print("Predictions:", predictions)`,
      pitfalls: [
        'Use the same preprocessing during prediction that was used during training.',
        'Validate incoming data before passing it to the model.',
        'Do not expose model services without appropriate security and access controls.',
        'Monitor real-world performance instead of assuming the original test score will remain unchanged.',
        'A deployed model may need updates when real-world data patterns change.',
      ],
    }),

    lesson({
      slug: 'model-evaluation-metrics',
      title: 'Model Evaluation Metrics',
      summary:
        'Understand the different measurements used to judge how well a Machine Learning model performs.',
      definition:
        'Model Evaluation Metrics are numerical measurements used to understand how accurately and reliably a Machine Learning model makes predictions. Different metrics are used for regression and classification problems.',
      why:
        'A single score does not explain every type of model error. Different metrics help us understand how close numerical predictions are to actual values or how well a classification model identifies different classes.',
      purpose:
        'The purpose is to measure model quality, compare models, understand mistakes, and select a model that meets the requirements of the problem.',
      when: [
        'After training a Machine Learning model.',
        'When comparing multiple candidate models.',
        'When deciding whether a model is suitable for a real-world task.',
        'When false positives and false negatives have different costs.',
        'When monitoring a deployed model.',
      ],
      simpleExample:
        'Imagine a model predicts whether emails are spam. If it correctly identifies 90 out of 100 emails, its accuracy is 90%. But if it misses many spam emails, its recall may be poor. This is why we examine multiple metrics instead of relying only on accuracy.',
      detail:
        'Regression metrics:\n\n- MAE (Mean Absolute Error): The average absolute difference between actual and predicted values. Lower is better.\n- MSE (Mean Squared Error): The average squared difference. It penalizes large errors more heavily. Lower is better.\n- RMSE (Root Mean Squared Error): The square root of MSE. It is in the same units as the target. Lower is better.\n- R² (R-squared): Compares the model with a baseline that predicts the target mean. Higher is generally better, but it can be negative on test data.\n\nClassification metrics:\n\n- Accuracy: Correct predictions divided by all predictions.\n- Precision: TP / (TP + FP). Of predicted positives, how many were correct?\n- Recall: TP / (TP + FN). Of actual positives, how many were found?\n- F1-score: Harmonic mean of precision and recall.\n- Confusion Matrix: Summarizes correct and incorrect predictions by class.\n\nWhere TP means true positive, TN means true negative, FP means false positive, and FN means false negative.\n\nMetric selection depends on the problem. For example, missing a fraudulent transaction may be more costly than incorrectly flagging a legitimate one, so recall may be especially important. The decision threshold also affects classification metrics.',
      realLife: {
        problem:
          'A medical screening system needs to identify patients who may have a particular condition.',
        approach: [
          'Evaluate the model on separate test data.',
          'Calculate recall to understand how many actual positive cases it detects.',
          'Calculate precision to understand how many flagged cases are truly positive.',
          'Review the confusion matrix and consider the consequences of different errors.',
        ],
        outcome:
          'The team understands the model’s detection ability and can choose a suitable operating threshold based on clinical requirements.',
      },
      tasks: [
        'Calculate MAE, MSE, and RMSE from actual and predicted numerical values.',
        'Calculate accuracy, precision, recall, and F1-score from a confusion matrix.',
        'Compare two classification models on an imbalanced dataset and justify the most appropriate evaluation metrics.',
      ],
      questions: [
        {
          q: 'What are model evaluation metrics?',
          a:
            'They are numerical measurements used to assess how well a Machine Learning model performs.',
        },
        {
          q: 'What is the difference between MAE and MSE?',
          a:
            'MAE averages absolute errors, while MSE averages squared errors and penalizes large errors more strongly.',
        },
        {
          q: 'What is RMSE?',
          a:
            'RMSE is the square root of Mean Squared Error. It measures prediction error in the same units as the target variable.',
        },
        {
          q: 'What is R-squared?',
          a:
            'R-squared measures how much target variation is explained by the model compared with a baseline that predicts the training target mean. On unseen data, it can be negative.',
        },
        {
          q: 'What is the difference between precision and recall?',
          a:
            'Precision measures how reliable positive predictions are, while recall measures how many actual positive cases are identified.',
        },
        {
          q: 'When should we use F1-score?',
          a:
            'F1-score is useful when both precision and recall matter and we want a single summary that balances them.',
        },
        {
          q: 'What is a false positive?',
          a:
            'A false positive occurs when the model predicts a positive class even though the actual class is negative.',
        },
        {
          q: 'What is a false negative?',
          a:
            'A false negative occurs when the model predicts a negative class even though the actual class is positive.',
        },
      ],
      code: `from sklearn.metrics import (
    mean_absolute_error,
    mean_squared_error,
    r2_score
)
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score
)
import numpy as np

actual = [100, 200, 300, 400]
predicted = [110, 190, 280, 420]

print("MAE:", mean_absolute_error(actual, predicted))
print("MSE:", mean_squared_error(actual, predicted))
print("RMSE:", np.sqrt(mean_squared_error(actual, predicted)))
print("R2:", r2_score(actual, predicted))

actual_classes = [1, 0, 1, 1, 0, 0]
predicted_classes = [1, 0, 0, 1, 0, 1]

print("Accuracy:", accuracy_score(actual_classes, predicted_classes))
print("Precision:", precision_score(actual_classes, predicted_classes))
print("Recall:", recall_score(actual_classes, predicted_classes))
print("F1:", f1_score(actual_classes, predicted_classes))`,
      pitfalls: [
        'Do not use regression metrics to evaluate a classification model or vice versa.',
        'Accuracy can hide poor performance on a minority class.',
        'MAE, MSE, and RMSE are measured on different scales and should not be compared directly without considering their definitions.',
        'R-squared is not a percentage accuracy score.',
        'A metric should reflect the actual cost of mistakes in the application.',
      ],
    }),
  ],
}

export default ch
