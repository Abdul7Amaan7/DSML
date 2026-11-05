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
  id: 'data-science-fundamentals',
  number: 10,
  title: 'Data Science Fundamentals',
  tagline:
    'Learn how to collect, understand, clean, explore, visualize, and prepare real-world datasets for data analysis and machine learning.',
  priority: 'extreme',
  topics: [
    lesson({
      slug: 'introduction-to-data-science',
      title: 'Introduction to Data Science',
      summary:
        'Understand what data science is, how it works, and how statistics, programming, domain knowledge, and machine learning are combined to solve real-world problems.',
      definition:
        'Data science is an interdisciplinary field that uses statistics, mathematics, programming, data analysis, visualization, and machine learning to extract useful information from data. It involves collecting, processing, analyzing, and interpreting data to support decisions and build predictive solutions.',
      why:
        'Organizations generate large amounts of data from websites, applications, transactions, sensors, and customers. Data science helps transform this raw information into insights, identify patterns, understand behavior, and make better decisions.',
      purpose:
        'The purpose is to extract meaningful knowledge from data, solve business problems, explain patterns, predict future outcomes, and support evidence-based decisions.',
      when: [
        'When a business wants to understand customer behavior.',
        'When predicting sales, demand, or customer churn.',
        'When identifying patterns in large datasets.',
        'When improving business operations using data.',
        'When building recommendation systems or predictive models.',
        'When analyzing scientific, financial, healthcare, or marketing data.',
      ],
      simpleExample:
        'An online shopping company collects information about customer visits, searches, purchases, and product ratings. A data scientist analyzes this information to identify popular products, understand customer preferences, predict future purchases, and recommend relevant products.',
      detail:
        'A typical data science workflow includes problem understanding, data collection, data cleaning, exploratory data analysis, feature engineering, model development, evaluation, and communication of results. Not every data science project requires machine learning. Some projects focus entirely on descriptive analysis, visualization, experimentation, or statistical inference.',
      realLife: {
        problem:
          'An e-commerce company wants to understand why sales are decreasing and identify ways to improve customer purchases.',
        approach: [
          'Understand the business problem and define measurable objectives.',
          'Collect customer, product, transaction, and website activity data.',
          'Clean and prepare the collected datasets.',
          'Perform exploratory data analysis to identify trends.',
          'Build visualizations and investigate customer behavior.',
          'Use statistical analysis or machine learning where appropriate.',
          'Present actionable findings to the business team.',
        ],
        outcome:
          'The company identifies important sales patterns, understands customer behavior, and makes data-driven decisions to improve its business.',
      },
      tasks: [
        'Explain data science in your own words and identify at least four areas of knowledge used in it.',
        'A retail company wants to reduce customer churn. Explain how data science could help solve this problem.',
        'Design a complete data science workflow for predicting monthly sales for an e-commerce business.',
      ],
      questions: [
        {
          q: 'What is data science?',
          a: 'Data science is the field of extracting useful information and insights from data using statistics, programming, mathematics, visualization, domain knowledge, and machine learning.',
          followUp:
            'What are the main stages of a typical data science project?',
        },
        {
          q: 'What is the difference between data science and data analytics?',
          a: 'Data analytics generally focuses on examining data to answer specific questions and support decisions. Data science includes analytics but also covers statistical modeling, machine learning, experimentation, and predictive systems.',
          followUp:
            'Can a data scientist work without building machine learning models?',
        },
        {
          q: 'What are the main steps in the data science lifecycle?',
          a: 'Common steps include problem definition, data collection, cleaning, exploration, feature engineering, modeling, evaluation, deployment, and monitoring.',
          followUp:
            'Why is problem definition important before collecting data?',
        },
        {
          q: 'What is the difference between descriptive, predictive, and prescriptive analytics?',
          a: 'Descriptive analytics explains what happened. Predictive analytics estimates what may happen. Prescriptive analytics recommends actions based on available information and objectives.',
          followUp:
            'Give one business example of each type of analytics.',
        },
        {
          q: 'Does every data science project require machine learning?',
          a: 'No. Some projects can be solved using SQL, descriptive statistics, visualization, hypothesis testing, or business analysis without training a machine learning model.',
          followUp:
            'When would a machine learning model be more appropriate than a descriptive analysis?',
        },
      ],
      code: `import pandas as pd

# Example business dataset
data = {
    "customer_id": [101, 102, 103, 104, 105],
    "age": [25, 32, 28, 45, 38],
    "purchases": [5, 8, 3, 12, 7],
    "total_spent": [2500, 6200, 1500, 9800, 5400]
}

df = pd.DataFrame(data)

# Understand the dataset
print("Dataset:")
print(df)

# Basic statistics
print("\\nStatistical Summary:")
print(df.describe())

# Average customer spending
print("\\nAverage Spending:")
print(df["total_spent"].mean())

# Total purchases
print("\\nTotal Purchases:")
print(df["purchases"].sum())

# Identify the highest-spending customer
highest_spender = df.loc[
    df["total_spent"].idxmax()
]

print("\\nHighest Spending Customer:")
print(highest_spender)`,
      pitfalls: [
        'Assuming data science is only about machine learning.',
        'Starting analysis without understanding the actual business problem.',
        'Ignoring domain knowledge when interpreting results.',
        'Using incorrect or incomplete data to make decisions.',
        'Focusing on technical model performance without considering business value.',
      ],
    }),

    lesson({
      slug: 'structured-and-unstructured-data',
      title: 'Types of Data: Structured and Unstructured',
      summary:
        'Understand structured, semi-structured, and unstructured data and how different data formats are stored, processed, and analyzed.',
      definition:
        'Structured data is organized according to a predefined schema, commonly in rows and columns. Unstructured data does not follow a fixed tabular schema and includes formats such as images, audio, video, and free-form text. Semi-structured data has some organizational structure, such as JSON or XML, but does not necessarily follow a rigid relational table schema.',
      why:
        'Real-world data comes from many sources and in different formats. Understanding its structure helps select appropriate storage systems, processing tools, and analysis techniques.',
      purpose:
        'The purpose is to identify the format and organization of available data so that it can be stored, processed, queried, and analyzed effectively.',
      when: [
        'When designing a database or data warehouse.',
        'When collecting data from APIs and applications.',
        'When analyzing CSV, Excel, or relational database records.',
        'When processing documents, images, audio, or video.',
        'When selecting data processing and storage technologies.',
      ],
      simpleExample:
        'A customer database containing customer ID, name, email, and age in separate columns is structured data. An API response containing nested JSON objects is semi-structured data. Customer reviews, product images, and recorded customer calls are examples of unstructured data.',
      detail:
        'Structured data is commonly stored in relational databases and tabular formats. Semi-structured data often uses JSON, XML, or document-oriented storage. Unstructured data may be stored in object storage or file systems and processed using natural language processing, computer vision, or audio processing techniques. The distinction is based on organization and schema, not simply whether a file is digital.',
      realLife: {
        problem:
          'An online retailer collects customer information, order records, product descriptions, customer reviews, and product photographs.',
        approach: [
          'Store customer and order records in relational tables.',
          'Process API responses and nested product metadata as JSON.',
          'Store product images in object storage.',
          'Use text processing techniques to analyze customer reviews.',
          'Connect the different data sources using common identifiers.',
        ],
        outcome:
          'The retailer can analyze both tabular business data and customer-generated content using appropriate tools.',
      },
      tasks: [
        'Classify a CSV customer table, a JSON API response, a PDF report, and a product image as structured, semi-structured, or unstructured data.',
        'Explain the differences between structured, semi-structured, and unstructured data with practical examples.',
        'Design a data storage approach for an e-commerce platform containing customer records, nested product information, reviews, and product images.',
      ],
      questions: [
        {
          q: 'What is structured data?',
          a: 'Structured data follows a predefined schema and is commonly organized into rows and columns, such as a relational database table or CSV file.',
          followUp:
            'Why is structured data generally easier to query using SQL?',
        },
        {
          q: 'What is unstructured data?',
          a: 'Unstructured data does not follow a fixed tabular schema. Examples include images, videos, audio recordings, documents, and free-form text.',
          followUp:
            'Which techniques can be used to analyze unstructured text?',
        },
        {
          q: 'What is semi-structured data?',
          a: 'Semi-structured data contains organizational information such as keys, tags, or nested objects but does not necessarily follow a rigid relational schema. JSON and XML are common examples.',
          followUp:
            'Why is JSON commonly used for exchanging data between applications?',
        },
        {
          q: 'What is the difference between structured and unstructured data?',
          a: 'Structured data follows a predefined organization, while unstructured data does not have a fixed tabular schema and often requires specialized processing.',
          followUp:
            'Can unstructured data be converted into structured features?',
        },
        {
          q: 'Is JSON structured or unstructured data?',
          a: 'JSON is generally classified as semi-structured data because it organizes information using keys, values, arrays, and nested objects without requiring a rigid relational table schema.',
          followUp:
            'How can nested JSON data be converted into a pandas DataFrame?',
        },
      ],
      code: `import pandas as pd
import json

# Structured data
structured_data = {
    "customer_id": [101, 102, 103],
    "name": ["Aman", "Riya", "Rahul"],
    "age": [25, 30, 28]
}

df = pd.DataFrame(structured_data)

print("Structured Data:")
print(df)

# Semi-structured JSON data
json_data = [
    {
        "customer_id": 101,
        "name": "Aman",
        "address": {
            "city": "Mumbai",
            "pincode": 400001
        }
    },
    {
        "customer_id": 102,
        "name": "Riya",
        "address": {
            "city": "Pune",
            "pincode": 411001
        }
    }
]

# Convert nested JSON into tabular data
json_df = pd.json_normalize(json_data)

print("\\nSemi-Structured JSON:")
print(json_df)

# Unstructured data examples
unstructured_data = [
    "The product quality is excellent.",
    "Delivery was delayed.",
    "The customer shared a product photograph."
]

print("\\nUnstructured Data Examples:")
for item in unstructured_data:
    print(item)`,
      pitfalls: [
        'Assuming all digital files are structured data.',
        'Classifying JSON as ordinary relational tabular data without considering its nested schema.',
        'Assuming unstructured data cannot be analyzed.',
        'Ignoring data relationships when combining different formats.',
        'Choosing storage technology without considering access patterns and data volume.',
      ],
    }),

    lesson({
      slug: 'data-collection',
      title: 'Data Collection',
      summary:
        'Learn how to gather relevant data from databases, APIs, files, surveys, sensors, and other sources while maintaining data quality and reliability.',
      definition:
        'Data collection is the process of gathering information from relevant sources for analysis, research, reporting, or machine learning. Data can be collected through databases, APIs, surveys, web forms, experiments, sensors, application logs, and external datasets.',
      why:
        'The quality and relevance of collected data directly affect the reliability of analysis and machine learning results. Poor collection methods can introduce bias, missing information, inaccurate measurements, and incomplete coverage.',
      purpose:
        'The purpose is to obtain accurate, relevant, representative, and sufficiently complete data that can answer a defined question or support a specific business objective.',
      when: [
        'When starting a data science project.',
        'When building a machine learning training dataset.',
        'When monitoring customer or application activity.',
        'When collecting survey responses.',
        'When integrating multiple data sources.',
        'When gathering real-time information from sensors or APIs.',
      ],
      simpleExample:
        'A food delivery company wants to understand customer delivery experiences. It collects order details from its database, delivery times from application logs, customer feedback from surveys, and location information from its delivery system.',
      detail:
        'Data collection can be primary or secondary. Primary data is collected directly for the current purpose, such as through surveys or experiments. Secondary data already exists and is reused, such as public datasets or company records. A collection plan should define the target population, sampling method, required fields, collection frequency, data permissions, and validation rules.',
      realLife: {
        problem:
          'A company wants to build a model that predicts whether a customer will stop using its subscription service.',
        approach: [
          'Define the target variable and prediction objective.',
          'Identify relevant data sources such as subscriptions, payments, support tickets, and usage logs.',
          'Collect historical customer records using SQL or APIs.',
          'Define a consistent time window for collecting features and outcomes.',
          'Validate data types, identifiers, timestamps, and record completeness.',
          'Document data sources, collection methods, and permissions.',
        ],
        outcome:
          'The company creates a dataset containing relevant customer behavior and subscription information for churn analysis.',
      },
      tasks: [
        'List five different sources from which a data scientist can collect data.',
        'Explain the difference between primary and secondary data collection with examples.',
        'Create a data collection plan for predicting customer churn, including sources, required fields, collection frequency, and possible data-quality risks.',
      ],
      questions: [
        {
          q: 'What is data collection?',
          a: 'Data collection is the process of gathering relevant information from sources such as databases, APIs, surveys, applications, sensors, and external datasets.',
          followUp:
            'Why should the objective be defined before collecting data?',
        },
        {
          q: 'What is the difference between primary and secondary data?',
          a: 'Primary data is collected directly for a particular research purpose. Secondary data already exists and is reused for a new analysis.',
          followUp:
            'What are the advantages and disadvantages of using secondary data?',
        },
        {
          q: 'What are common data collection methods?',
          a: 'Common methods include surveys, interviews, experiments, database queries, API requests, application logs, web forms, sensors, and public datasets.',
          followUp:
            'Which collection method would you use to gather real-time application events?',
        },
        {
          q: 'What is sampling in data collection?',
          a: 'Sampling is the process of selecting a subset of observations from a target population to study or analyze.',
          followUp:
            'What is the difference between random sampling and convenience sampling?',
        },
        {
          q: 'What is data quality?',
          a: 'Data quality describes how suitable data is for its intended purpose, considering characteristics such as accuracy, completeness, consistency, validity, and timeliness.',
          followUp:
            'How can poor data quality affect machine learning results?',
        },
      ],
      code: `import pandas as pd
import requests
from io import StringIO

# 1. Collect data from a CSV file
csv_data = """customer_id,age,purchases
101,25,5
102,30,8
103,28,3
"""

csv_df = pd.read_csv(StringIO(csv_data))

print("CSV Data:")
print(csv_df)

# 2. Collect data from an API
url = "https://jsonplaceholder.typicode.com/users"

response = requests.get(url, timeout=10)
response.raise_for_status()

api_data = response.json()

api_df = pd.json_normalize(api_data)

print("\\nAPI Data:")
print(api_df[["id", "name", "email"]].head())

# 3. Combine collected datasets
print("\\nCSV dataset shape:", csv_df.shape)
print("API dataset shape:", api_df.shape)`,
      pitfalls: [
        'Collecting data without defining the problem or target population.',
        'Using biased samples that do not represent the population.',
        'Ignoring privacy, consent, and data access permissions.',
        'Collecting irrelevant fields that add complexity without value.',
        'Ignoring timestamps and time zones.',
        'Combining datasets without validating identifiers and relationships.',
        'Failing to document data sources and collection methods.',
      ],
    }),

    lesson({
      slug: 'data-cleaning',
      title: 'Data Cleaning',
      summary:
        'Understand how to identify and correct inaccurate, inconsistent, invalid, and poorly formatted data before analysis or model training.',
      definition:
        'Data cleaning is the process of detecting, correcting, standardizing, or removing inaccurate, inconsistent, incomplete, and invalid data. It may involve fixing data types, standardizing categories, correcting formatting, handling missing values, removing unwanted records, and validating business rules.',
      why:
        'Real-world datasets often contain errors caused by manual entry, system integrations, inconsistent formats, incorrect measurements, or data processing issues. These problems can lead to misleading statistics, unreliable visualizations, and poor machine learning performance.',
      purpose:
        'The purpose is to improve dataset quality and make the data consistent, valid, and suitable for the intended analysis or modeling task.',
      when: [
        'After collecting data from multiple sources.',
        'Before exploratory data analysis.',
        'Before training machine learning models.',
        'When datasets contain inconsistent labels or formats.',
        'When database records contain invalid values.',
        'When preparing data for reporting or visualization.',
      ],
      simpleExample:
        'Suppose a customer dataset contains city values such as Mumbai, mumbai, MUMBAI, and Mumabi. These values may represent the same city but appear as different categories. Data cleaning standardizes them to a consistent value so that grouping and analysis produce correct results.',
      detail:
        'A data-cleaning workflow generally starts with profiling the dataset, identifying quality issues, defining correction rules, applying transformations, and validating the cleaned result. Cleaning should preserve valid information. Original data should be retained or changes documented so that important observations are not removed without justification.',
      realLife: {
        problem:
          'A retail company receives customer records from several branches. The records contain inconsistent city names, different date formats, incorrect data types, and invalid purchase values.',
        approach: [
          'Inspect the dataset using shape, info, describe, and value counts.',
          'Standardize text values and category labels.',
          'Convert dates and numeric columns to appropriate data types.',
          'Validate values against business rules.',
          'Investigate invalid and suspicious records.',
          'Document every transformation and validate the resulting dataset.',
        ],
        outcome:
          'The company creates a more consistent dataset that can be reliably analyzed across branches.',
      },
      tasks: [
        'Identify five common data-quality problems in a customer dataset.',
        'Clean a DataFrame containing inconsistent city names, numeric values stored as strings, and inconsistent date formats.',
        'Build a reusable Python data-cleaning function that standardizes column names, text categories, data types, and invalid records.',
      ],
      questions: [
        {
          q: 'What is data cleaning?',
          a: 'Data cleaning is the process of identifying and correcting or removing inaccurate, inconsistent, invalid, and incomplete data.',
          followUp:
            'Why should data cleaning happen before exploratory data analysis?',
        },
        {
          q: 'What are common data-cleaning operations?',
          a: 'Common operations include handling missing values, removing duplicates, correcting data types, standardizing text, validating ranges, and correcting inconsistent formats.',
          followUp:
            'Which data-cleaning operations can change the statistical distribution of a dataset?',
        },
        {
          q: 'What is data validation?',
          a: 'Data validation checks whether values satisfy expected rules, formats, types, ranges, or business constraints.',
          followUp:
            'How would you validate an age column?',
        },
        {
          q: 'What is data preprocessing?',
          a: 'Data preprocessing is the broader process of transforming raw data into a suitable format for analysis or machine learning. It includes cleaning, encoding, scaling, feature engineering, and other transformations.',
          followUp:
            'How is data cleaning related to data preprocessing?',
        },
        {
          q: 'How do you identify data-quality issues using pandas?',
          a: 'You can use methods such as info(), describe(), isna(), duplicated(), unique(), value_counts(), and data-type checks to inspect a dataset.',
          followUp:
            'Why should you inspect data before applying cleaning operations?',
        },
      ],
      code: `import pandas as pd

data = {
    "Customer Name": [" Aman ", "RIYA", "rahul", "Sneha"],
    "City": ["mumbai", "MUMBAI", "Pune", "pune"],
    "Age": ["25", "30", "28", "35"],
    "Purchase Amount": ["2500", "4000", "invalid", "3200"]
}

df = pd.DataFrame(data)

print("Original Dataset:")
print(df)

# Standardize column names
df.columns = (
    df.columns
    .str.strip()
    .str.lower()
    .str.replace(" ", "_")
)

# Clean text columns
df["customer_name"] = (
    df["customer_name"]
    .str.strip()
    .str.title()
)

df["city"] = (
    df["city"]
    .str.strip()
    .str.title()
)

# Convert numeric columns
df["age"] = pd.to_numeric(
    df["age"],
    errors="coerce"
)

df["purchase_amount"] = pd.to_numeric(
    df["purchase_amount"],
    errors="coerce"
)

print("\\nCleaned Dataset:")
print(df)

print("\\nData Types:")
print(df.dtypes)

print("\\nMissing Values:")
print(df.isna().sum())`,
      pitfalls: [
        'Deleting records without understanding why they are invalid.',
        'Replacing all unusual values without investigating them.',
        'Changing categorical values in ways that alter their meaning.',
        'Converting invalid strings to missing values without reviewing the result.',
        'Cleaning the entire dataset before separating training and test data when transformations learn parameters from data.',
        'Failing to document cleaning decisions.',
      ],
    }),

    lesson({
      slug: 'missing-value-handling',
      title: 'Missing-Value Handling',
      summary:
        'Learn how to identify missing data and choose suitable techniques such as deletion, mean imputation, median imputation, and model-based methods.',
      definition:
        'Missing-value handling is the process of identifying and treating observations where one or more data values are unavailable. Common approaches include removing rows or columns, filling values using statistical measures, using a constant category, or applying more advanced imputation methods.',
      why:
        'Missing values can cause errors in calculations, visualizations, and machine learning algorithms. Poor handling can also introduce bias or distort the relationships between variables.',
      purpose:
        'The purpose is to manage incomplete information while preserving as much useful data as possible and minimizing distortion in analysis or modeling.',
      when: [
        'When a dataset contains blank or null values.',
        'When preparing data for machine learning algorithms that do not accept missing values.',
        'When analyzing incomplete customer or transaction records.',
        'When a column contains partially recorded measurements.',
        'When building a preprocessing pipeline.',
      ],
      simpleExample:
        'Suppose a customer dataset contains ages of 25, 30, missing, 35, and 40. The mean age of the available observations is 32.5. Mean imputation fills the missing value with 32.5. If the data contains extreme age values, median imputation may be more appropriate because it is less sensitive to outliers.',
      detail:
        'Missingness is often classified into three mechanisms. MCAR (Missing Completely At Random) means missingness is unrelated to observed and unobserved data. MAR (Missing At Random) means missingness depends on observed information. MNAR (Missing Not At Random) means missingness depends on the missing value itself or other unobserved information. The missingness mechanism influences which handling method is appropriate.',
      realLife: {
        problem:
          'A bank collects customer information, but some records have missing income, age, and employment details.',
        approach: [
          'Identify missing values and calculate missing percentages.',
          'Investigate whether missingness is random or related to customer characteristics.',
          'Use median imputation for appropriate numerical features.',
          'Use mode or a separate unknown category for suitable categorical features.',
          'Consider dropping records or columns when the missing information cannot be reliably recovered.',
          'Fit imputation rules using training data only and apply them to validation and test data.',
        ],
        outcome:
          'The bank prepares a more complete dataset while reducing the risk of information loss and data leakage.',
      },
      tasks: [
        'Explain the difference between MCAR, MAR, and MNAR with one example each.',
        'Handle missing values in a dataset using mean, median, and mode imputation. Compare the results.',
        'Build a scikit-learn preprocessing pipeline that imputes numerical and categorical missing values without leaking information from the test dataset.',
      ],
      questions: [
        {
          q: 'What are missing values?',
          a: 'Missing values represent data entries that are unavailable, unrecorded, or unknown in a dataset.',
          followUp:
            'How can missing values be identified in pandas?',
        },
        {
          q: 'What are common methods for handling missing values?',
          a: 'Common methods include removing rows or columns, mean or median imputation, mode imputation, constant-value imputation, and advanced methods such as KNN or iterative imputation.',
          followUp:
            'When would median imputation be preferred over mean imputation?',
        },
        {
          q: 'What is the difference between MCAR, MAR, and MNAR?',
          a: 'MCAR means missingness is unrelated to observed or unobserved data. MAR means it depends on observed data. MNAR means it depends on the missing value itself or unobserved information.',
          followUp:
            'Why can MNAR data be difficult to handle?',
        },
        {
          q: 'Why can deleting rows with missing values be dangerous?',
          a: 'It can reduce the sample size and introduce bias if the missingness is related to important characteristics or outcomes.',
          followUp:
            'When is dropping rows a reasonable approach?',
        },
        {
          q: 'What is data imputation?',
          a: 'Imputation is the process of filling missing values using estimated or predefined replacement values, such as a mean, median, mode, constant, or model-based prediction.',
          followUp:
            'How can you avoid data leakage during imputation?',
        },
      ],
      code: `import pandas as pd
from sklearn.impute import SimpleImputer
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder

data = {
    "age": [25, 30, None, 40, 35],
    "salary": [30000, None, 45000, 60000, 50000],
    "city": ["Mumbai", "Pune", None, "Mumbai", "Pune"]
}

df = pd.DataFrame(data)

print("Missing Values:")
print(df.isna().sum())

# Simple pandas imputation
df["age"] = df["age"].fillna(
    df["age"].median()
)

df["salary"] = df["salary"].fillna(
    df["salary"].median()
)

df["city"] = df["city"].fillna(
    df["city"].mode()[0]
)

print("\\nImputed Dataset:")
print(df)

# Pipeline-oriented preprocessing example
numeric_features = ["age", "salary"]
categorical_features = ["city"]

preprocessor = ColumnTransformer(
    transformers=[
        (
            "numeric",
            SimpleImputer(strategy="median"),
            numeric_features
        ),
        (
            "categorical",
            SimpleImputer(strategy="most_frequent"),
            categorical_features
        )
    ]
)

transformed = preprocessor.fit_transform(df)

print("\\nPreprocessed Data:")
print(transformed)`,
      pitfalls: [
        'Filling every missing numerical value with zero without considering its meaning.',
        'Using mean imputation when the distribution is highly skewed.',
        'Dropping too many rows and losing important information.',
        'Ignoring why values are missing.',
        'Calculating imputation values using the full dataset before train-test splitting.',
        'Assuming imputation always removes the bias caused by missing data.',
      ],
    }),

    lesson({
      slug: 'duplicate-removal',
      title: 'Duplicate Removal',
      summary:
        'Understand how to identify exact and logical duplicate records and remove unwanted repetitions without deleting valid observations.',
      definition:
        'Duplicate removal is the process of identifying and handling repeated records in a dataset. Exact duplicates contain identical values across selected columns, while logical duplicates represent the same real-world entity or event even when some fields differ.',
      why:
        'Duplicates can inflate counts, distort averages, increase the apparent frequency of events, and create misleading analysis. In machine learning, repeated records can also cause data leakage when nearly identical observations appear in both training and test sets.',
      purpose:
        'The purpose is to ensure that each record represents the intended unique observation or entity according to clearly defined business rules.',
      when: [
        'When combining datasets from multiple sources.',
        'When importing repeated records from APIs or spreadsheets.',
        'When analyzing customer, transaction, or product data.',
        'When preparing data for machine learning.',
        'When validating database uniqueness constraints.',
      ],
      simpleExample:
        'A customer dataset contains two identical records for customer ID 101. If both records are counted, the customer may be included twice in customer totals and average calculations. Duplicate removal keeps the intended unique record.',
      detail:
        'Exact duplicates can be identified across all columns or a selected subset of columns. Logical duplicates may require matching business keys such as customer ID, email, transaction ID, or a combination of fields. When duplicate records contain conflicting information, a decision rule is needed to determine which record is authoritative, such as keeping the latest valid update.',
      realLife: {
        problem:
          'An online platform imports customer records from several marketing systems. The combined dataset contains repeated customer records and inconsistent contact information.',
        approach: [
          'Identify the fields that define a unique customer.',
          'Use duplicate checks on customer IDs and other business keys.',
          'Compare repeated records for conflicting information.',
          'Apply a documented rule for retaining the authoritative record.',
          'Remove unwanted duplicates and validate unique counts.',
        ],
        outcome:
          'The platform creates a more accurate customer dataset and avoids double-counting customers in reports.',
      },
      tasks: [
        'Create a pandas DataFrame containing exact duplicate rows and identify them.',
        'Remove duplicate customers using customer_id while keeping the latest record.',
        'Design a duplicate-detection strategy for transaction records when transaction IDs are sometimes missing.',
      ],
      questions: [
        {
          q: 'What are duplicate records?',
          a: 'Duplicate records are repeated observations that represent the same record, entity, or event according to the chosen uniqueness rules.',
          followUp:
            'What is the difference between exact and logical duplicates?',
        },
        {
          q: 'How do you identify duplicates in pandas?',
          a: 'The duplicated() method identifies repeated rows, while keep controls which occurrence is considered the duplicate. You can specify a subset of columns to define uniqueness.',
          followUp:
            'What does keep="last" do?',
        },
        {
          q: 'How do you remove duplicate rows in pandas?',
          a: 'The drop_duplicates() method removes repeated rows. You can specify selected columns using subset and choose which occurrence to keep.',
          followUp:
            'How would you remove duplicate customer IDs while keeping the latest record?',
        },
        {
          q: 'Why are duplicate records harmful in data analysis?',
          a: 'They can inflate counts, distort statistical summaries, create incorrect business reports, and introduce data leakage or over-representation during model training.',
          followUp:
            'How can duplicates affect class distribution in a classification problem?',
        },
        {
          q: 'Should every duplicate-looking record be deleted?',
          a: 'No. Repeated values may represent legitimate repeated events. The correct decision depends on the entity, event definition, and business rules.',
          followUp:
            'Why might two identical purchase amounts represent two valid transactions?',
        },
      ],
      code: `import pandas as pd

data = {
    "customer_id": [101, 102, 103, 101, 104, 102],
    "name": [
        "Aman", "Riya", "Rahul",
        "Aman", "Sneha", "Riya"
    ],
    "city": [
        "Mumbai", "Pune", "Delhi",
        "Mumbai", "Hyderabad", "Pune"
    ]
}

df = pd.DataFrame(data)

print("Original Dataset:")
print(df)

# Identify duplicate rows
print("\\nDuplicate Rows:")
print(df[df.duplicated()])

# Identify duplicate customer IDs
print("\\nDuplicate Customer IDs:")
print(
    df[df.duplicated(
        subset=["customer_id"],
        keep=False
    )]
)

# Remove duplicate customer IDs
cleaned_df = df.drop_duplicates(
    subset=["customer_id"],
    keep="first"
)

print("\\nAfter Duplicate Removal:")
print(cleaned_df)

print("\\nRemaining Records:", len(cleaned_df))`,
      pitfalls: [
        'Deleting records based only on one matching field without understanding its meaning.',
        'Removing valid repeated transactions.',
        'Keeping the first record when the latest record is more reliable.',
        'Ignoring differences in capitalization, whitespace, or formatting.',
        'Failing to define a business key for logical duplicate detection.',
      ],
    }),

    lesson({
      slug: 'outlier-detection',
      title: 'Outlier Detection',
      summary:
        'Learn how to identify observations that differ substantially from the rest of the data using statistical techniques and visualizations.',
      definition:
        'An outlier is an observation that differs substantially from the general pattern of a dataset. Outliers can occur because of measurement errors, data-entry mistakes, unusual events, or genuine rare observations. Common detection methods include the Interquartile Range (IQR), Z-score, box plots, and model-based approaches.',
      why:
        'Outliers can strongly influence means, standard deviations, correlations, and some machine learning models. Detecting them helps analysts investigate unusual observations and decide whether special treatment is needed.',
      purpose:
        'The purpose is to identify unusual observations, understand why they occur, and decide whether to retain, correct, transform, or remove them based on the analysis objective.',
      when: [
        'When numerical columns contain extreme values.',
        'When mean and median differ substantially.',
        'When regression models are sensitive to unusual observations.',
        'When monitoring fraud or unusual transactions.',
        'When performing quality checks on sensor or business data.',
      ],
      simpleExample:
        'Suppose the monthly salaries of five employees are ₹30,000, ₹35,000, ₹32,000, ₹34,000, and ₹5,00,000. The final value is much higher than the others. It may be a genuine executive salary or a data-entry error. Outlier detection identifies it for investigation rather than automatically deleting it.',
      detail:
        'The IQR method calculates Q1 and Q3, then identifies observations below Q1 - 1.5 × IQR or above Q3 + 1.5 × IQR as potential outliers. The Z-score measures how many standard deviations an observation is from the mean and is often used with approximately normal distributions. Neither method proves that an observation is erroneous. Domain knowledge and data-generation context are necessary before deciding what to do.',
      realLife: {
        problem:
          'A financial company wants to detect unusually large transactions that may represent fraud, system errors, or legitimate high-value purchases.',
        approach: [
          'Inspect transaction amount distributions using summary statistics.',
          'Visualize transaction amounts with histograms and box plots.',
          'Apply IQR or suitable statistical detection methods.',
          'Investigate flagged transactions using customer and transaction context.',
          'Retain legitimate extreme transactions and correct or remove confirmed errors.',
        ],
        outcome:
          'The company identifies unusual transactions for further investigation without automatically discarding valid high-value activity.',
      },
      tasks: [
        'Explain what an outlier is and provide two possible reasons why it may occur.',
        'Calculate Q1, Q3, IQR, and the outlier boundaries for a given numerical dataset.',
        'Apply IQR and Z-score methods to a transaction dataset. Compare the observations flagged by both methods and explain which ones should be investigated.',
      ],
      questions: [
        {
          q: 'What is an outlier?',
          a: 'An outlier is an observation that differs substantially from the general pattern or distribution of the dataset.',
          followUp:
            'What are common causes of outliers?',
        },
        {
          q: 'What is the IQR method for outlier detection?',
          a: 'The IQR method calculates Q1 and Q3, then uses 1.5 times the interquartile range to define lower and upper potential-outlier boundaries.',
          followUp:
            'Why is IQR often more robust than standard deviation?',
        },
        {
          q: 'What is a Z-score?',
          a: 'A Z-score measures how many standard deviations a value is above or below the mean. Large absolute Z-scores can indicate potential outliers.',
          followUp:
            'Why might Z-score detection be unreliable for heavily skewed data?',
        },
        {
          q: 'Should outliers always be removed?',
          a: 'No. Outliers may represent valid rare events or important business information. They should be investigated before deciding whether to remove, cap, transform, or retain them.',
          followUp:
            'Why might removing fraudulent transactions be inappropriate when building a fraud detection model?',
        },
        {
          q: 'How do outliers affect machine learning models?',
          a: 'Outliers can influence model parameters and distances. For example, ordinary least squares regression is sensitive to extreme observations, and distance-based algorithms can be affected by unusual feature values.',
          followUp:
            'Which algorithms are generally more robust to extreme numerical values?',
        },
      ],
      code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from scipy.stats import zscore

data = {
    "salary": [
        30000, 35000, 32000, 34000,
        36000, 31000, 33000, 500000
    ]
}

df = pd.DataFrame(data)

# IQR method
q1 = df["salary"].quantile(0.25)
q3 = df["salary"].quantile(0.75)

iqr = q3 - q1

lower_bound = q1 - 1.5 * iqr
upper_bound = q3 + 1.5 * iqr

iqr_outliers = df[
    (df["salary"] < lower_bound)
    | (df["salary"] > upper_bound)
]

print("IQR Lower Bound:", lower_bound)
print("IQR Upper Bound:", upper_bound)
print("IQR Outliers:")
print(iqr_outliers)

# Z-score method
df["z_score"] = zscore(df["salary"])

z_outliers = df[
    df["z_score"].abs() > 3
]

print("\\nZ-score Outliers:")
print(z_outliers)

# Box plot
plt.boxplot(df["salary"])
plt.ylabel("Salary")
plt.title("Salary Outlier Detection")
plt.show()`,
      pitfalls: [
        'Automatically removing every extreme value.',
        'Using Z-score without considering skewness or distribution shape.',
        'Ignoring business context and legitimate rare events.',
        'Applying outlier thresholds without checking the measurement units.',
        'Using the same outlier treatment for every feature.',
        'Calculating preprocessing thresholds using the full dataset before splitting training and test data.',
      ],
    }),

    lesson({
      slug: 'exploratory-data-analysis',
      title: 'Exploratory Data Analysis (EDA)',
      summary:
        'Learn how to investigate datasets using descriptive statistics, distributions, relationships, and visualizations before building models.',
      definition:
        'Exploratory Data Analysis (EDA) is the process of examining and summarizing a dataset to understand its structure, distributions, relationships, patterns, anomalies, and data-quality issues. It combines statistical summaries and visual techniques to develop an understanding of the data before formal modeling.',
      why:
        'Before building a machine learning model, a data scientist needs to understand what the dataset contains, which variables are important, how values are distributed, and whether unexpected problems exist. EDA helps prevent incorrect assumptions and guides later analysis.',
      purpose:
        'The purpose is to understand the dataset, discover patterns, identify data-quality problems, generate hypotheses, and decide which analytical or modeling techniques may be appropriate.',
      when: [
        'After collecting and initially cleaning a dataset.',
        'Before feature engineering or machine learning.',
        'When investigating customer or business trends.',
        'When identifying relationships between variables.',
        'When diagnosing unexpected model behavior.',
        'When preparing insights for stakeholders.',
      ],
      simpleExample:
        'A retail company has a dataset containing customer age, city, product category, purchase amount, and order date. Through EDA, the data scientist discovers that sales increase during weekends, certain cities generate more revenue, and a small number of orders have unusually high values.',
      detail:
        'EDA commonly includes examining dataset dimensions, column types, missing values, duplicates, summary statistics, category frequencies, numerical distributions, correlations, and relationships between features and the target variable. Univariate analysis studies one variable, bivariate analysis studies two variables, and multivariate analysis examines multiple variables together.',
      realLife: {
        problem:
          'An e-commerce company wants to understand declining revenue and identify which products, customer groups, and time periods contribute to the change.',
        approach: [
          'Inspect the dataset shape, columns, data types, and missing values.',
          'Calculate descriptive statistics for sales and purchase amounts.',
          'Analyze sales trends by month and product category.',
          'Compare customer behavior across regions.',
          'Visualize numerical distributions and relationships.',
          'Identify unusual patterns and generate hypotheses for further analysis.',
        ],
        outcome:
          'The company identifies important revenue patterns and obtains a clear direction for deeper analysis and business decisions.',
      },
      tasks: [
        'Explain EDA and identify the difference between univariate, bivariate, and multivariate analysis.',
        'Perform EDA on a customer dataset using shape, info, describe, value_counts, and correlation.',
        'Conduct a complete EDA of an e-commerce dataset and prepare a report containing data-quality findings, important patterns, visualizations, and actionable conclusions.',
      ],
      questions: [
        {
          q: 'What is Exploratory Data Analysis?',
          a: 'EDA is the process of examining a dataset using statistics and visualizations to understand its structure, patterns, relationships, distributions, and quality issues.',
          followUp:
            'Why should EDA be performed before building a machine learning model?',
        },
        {
          q: 'What is univariate analysis?',
          a: 'Univariate analysis examines one variable at a time to understand its distribution, frequency, central tendency, and spread.',
          followUp:
            'Which visualizations are useful for univariate numerical analysis?',
        },
        {
          q: 'What is bivariate analysis?',
          a: 'Bivariate analysis examines the relationship between two variables, such as age and salary or advertising spend and sales.',
          followUp:
            'Which plot would you use to investigate the relationship between two numerical variables?',
        },
        {
          q: 'What is multivariate analysis?',
          a: 'Multivariate analysis examines relationships or patterns involving three or more variables at the same time.',
          followUp:
            'How can a pair plot help during multivariate exploration?',
        },
        {
          q: 'What are common steps in EDA?',
          a: 'Common steps include understanding dataset structure, checking missing values and duplicates, calculating summary statistics, studying distributions, examining relationships, detecting outliers, and documenting findings.',
          followUp:
            'How would you investigate a highly skewed numerical feature?',
        },
      ],
      code: `import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

df = sns.load_dataset("titanic")

# Dataset structure
print("Shape:", df.shape)
print("\\nData Types:")
print(df.dtypes)

print("\\nDataset Information:")
df.info()

# Descriptive statistics
print("\\nNumerical Summary:")
print(df.describe())

print("\\nCategorical Summary:")
print(df.describe(include="object"))

# Missing values
print("\\nMissing Values:")
print(df.isna().sum())

# Univariate analysis
df["age"].dropna().hist(bins=20)
plt.xlabel("Age")
plt.ylabel("Frequency")
plt.title("Age Distribution")
plt.show()

# Categorical analysis
sns.countplot(data=df, x="class")
plt.title("Passenger Class Distribution")
plt.show()

# Bivariate analysis
sns.boxplot(
    data=df,
    x="class",
    y="fare"
)
plt.title("Fare by Passenger Class")
plt.show()

# Correlation analysis
numeric_df = df.select_dtypes(
    include="number"
)

sns.heatmap(
    numeric_df.corr(),
    annot=True,
    cmap="coolwarm"
)
plt.title("Correlation Heatmap")
plt.show()`,
      pitfalls: [
        'Building a model before understanding the dataset.',
        'Looking only at averages and ignoring distributions.',
        'Treating correlation as proof of causation.',
        'Ignoring missing values and outliers during exploration.',
        'Creating visualizations without asking a specific analytical question.',
        'Using target information improperly during feature exploration and preprocessing.',
      ],
    }),

    lesson({
      slug: 'data-visualization',
      title: 'Data Visualization',
      summary:
        'Understand how charts and graphical representations communicate patterns, trends, comparisons, distributions, and relationships in data.',
      definition:
        'Data visualization is the graphical representation of data using charts, plots, graphs, maps, and other visual elements. It helps communicate numerical information and reveal patterns, trends, differences, distributions, and relationships that may be difficult to identify from raw tables.',
      why:
        'Large datasets can be difficult to understand through numbers alone. Visualizations make important information easier to interpret, communicate, and explore, helping analysts and decision-makers identify trends and anomalies.',
      purpose:
        'The purpose is to communicate data clearly, support exploration, identify patterns, compare values, and help people make informed decisions.',
      when: [
        'When comparing categories or groups.',
        'When analyzing trends over time.',
        'When understanding numerical distributions.',
        'When identifying relationships between variables.',
        'When presenting analytical findings to stakeholders.',
        'When monitoring business performance using dashboards.',
      ],
      simpleExample:
        'A company wants to compare monthly sales across a year. A line chart shows how sales change over time, while a bar chart can compare total sales across product categories. A histogram can show how individual order amounts are distributed.',
      detail:
        'Different charts answer different questions. Bar charts compare categories, line charts show trends over ordered observations, histograms display numerical distributions, box plots summarize spread and potential outliers, scatter plots examine relationships between numerical variables, and heatmaps display values using color. A suitable chart depends on the variable types and the analytical question.',
      realLife: {
        problem:
          'A sales manager receives a spreadsheet containing thousands of transactions and wants to understand revenue trends and identify the best-performing product categories.',
        approach: [
          'Aggregate transactions into monthly sales totals.',
          'Create a line chart to visualize sales trends.',
          'Use a bar chart to compare product categories.',
          'Use a histogram to understand order-value distributions.',
          'Create a heatmap to investigate relationships between numerical variables.',
          'Build a dashboard that communicates the most important findings.',
        ],
        outcome:
          'The manager can quickly identify sales patterns, compare categories, and make more informed business decisions.',
      },
      tasks: [
        'Explain when you would use a bar chart, line chart, histogram, scatter plot, and box plot.',
        'Create a monthly sales line chart and a product-category bar chart using matplotlib or seaborn.',
        'Build a small sales analysis dashboard containing at least four visualizations and write three business insights based on the results.',
      ],
      questions: [
        {
          q: 'What is data visualization?',
          a: 'Data visualization is the graphical representation of information using charts, graphs, maps, and other visual elements to communicate patterns and insights.',
          followUp:
            'Why is visualization important in data science?',
        },
        {
          q: 'When should you use a bar chart?',
          a: 'A bar chart is useful for comparing numerical values across discrete categories, such as sales by product or customers by city.',
          followUp:
            'What is the difference between a bar chart and a histogram?',
        },
        {
          q: 'When should you use a line chart?',
          a: 'A line chart is useful for displaying trends and changes across ordered values, especially time-series data.',
          followUp:
            'Why should time values usually be arranged in chronological order?',
        },
        {
          q: 'What is a histogram?',
          a: 'A histogram displays the frequency or density distribution of numerical data by grouping observations into intervals called bins.',
          followUp:
            'How can changing the number of bins affect a histogram?',
        },
        {
          q: 'What is a scatter plot?',
          a: 'A scatter plot displays pairs of numerical observations to help identify relationships, clusters, trends, and unusual points.',
          followUp:
            'Can a scatter plot prove that one variable causes another?',
        },
      ],
      code: `import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

data = {
    "month": [
        "Jan", "Feb", "Mar", "Apr",
        "May", "Jun"
    ],
    "sales": [
        12000, 15000, 14000,
        18000, 22000, 25000
    ],
    "category": [
        "Electronics", "Clothing",
        "Electronics", "Furniture",
        "Clothing", "Electronics"
    ],
    "order_value": [
        1200, 1500, 900, 2200, 1800, 2500
    ]
}

df = pd.DataFrame(data)

# Line chart: Sales trend
plt.figure(figsize=(8, 4))
plt.plot(
    df["month"],
    df["sales"],
    marker="o"
)
plt.xlabel("Month")
plt.ylabel("Sales")
plt.title("Monthly Sales Trend")
plt.grid(True)
plt.show()

# Bar chart: Category sales
category_sales = df.groupby(
    "category"
)["sales"].sum()

category_sales.plot(
    kind="bar",
    title="Sales by Category"
)
plt.ylabel("Sales")
plt.show()

# Histogram: Order value distribution
plt.hist(
    df["order_value"],
    bins=5
)
plt.xlabel("Order Value")
plt.ylabel("Frequency")
plt.title("Order Value Distribution")
plt.show()

# Scatter plot: Sales vs order value
sns.scatterplot(
    data=df,
    x="order_value",
    y="sales"
)
plt.title("Sales vs Order Value")
plt.show()`,
      pitfalls: [
        'Choosing a chart that does not match the data type or question.',
        'Using misleading axis scales or truncated axes without clear labeling.',
        'Adding too many colors, labels, and decorative elements.',
        'Using a line chart for unrelated categorical observations.',
        'Ignoring missing values and aggregation rules before plotting.',
        'Assuming a visual correlation proves causation.',
      ],
    }),

    lesson({
      slug: 'feature-selection-and-feature-engineering',
      title: 'Feature Selection and Feature Engineering',
      summary:
        'Learn how to choose useful input variables and create meaningful new features to improve machine learning model quality and performance.',
      definition:
        'Feature selection is the process of choosing the most relevant existing input variables for a machine learning model. Feature engineering is the process of creating, transforming, or combining variables to make useful patterns easier for a model to learn. Both techniques help prepare meaningful inputs for machine learning.',
      why:
        'Raw datasets often contain irrelevant, redundant, poorly formatted, or insufficiently informative variables. Feature selection can reduce unnecessary complexity, while feature engineering can reveal useful information that is not directly represented in the original columns.',
      purpose:
        'The purpose is to create a useful and manageable set of model inputs that improves predictive performance, reduces unnecessary computation, and makes models easier to interpret.',
      when: [
        'When preparing a dataset for machine learning.',
        'When a dataset contains many irrelevant or redundant columns.',
        'When raw variables do not capture useful business patterns.',
        'When improving model performance and interpretability.',
        'When creating time-based, interaction, or aggregated features.',
        'When reducing dimensionality or multicollinearity.',
      ],
      simpleExample:
        'A customer dataset contains date_of_birth and registration_date. Instead of using the raw dates directly, a data scientist can create customer_age and account_tenure_days. These engineered features may be more useful for predicting customer purchases or churn.',
      detail:
        'Feature selection methods include filter methods such as correlation and statistical tests, wrapper methods such as recursive feature elimination, and embedded methods such as L1 regularization and tree-based feature importance. Feature engineering includes scaling, encoding categorical variables, extracting date components, creating ratios, aggregating transaction histories, and combining existing features. Feature selection and transformations must be fitted using training data only to avoid leakage.',
      realLife: {
        problem:
          'An online retailer wants to predict which customers are likely to purchase again. Its raw dataset contains transaction timestamps, customer details, product information, and historical order records.',
        approach: [
          'Identify relevant source columns and remove identifiers that have no predictive meaning.',
          'Create features such as days_since_last_purchase and total_orders.',
          'Calculate average_order_value and customer_lifetime_spend.',
          'Encode categorical variables and scale numerical variables when appropriate.',
          'Select relevant features using statistical or model-based methods.',
          'Fit feature transformations using training data and evaluate them on unseen data.',
        ],
        outcome:
          'The retailer builds a more informative model dataset that captures customer purchasing behavior.',
      },
      tasks: [
        'Explain the difference between feature selection and feature engineering using a customer dataset.',
        'Create age, account tenure, total purchases, and average order value features from raw customer and transaction data.',
        'Build a machine learning preprocessing pipeline that performs numerical imputation, categorical encoding, and feature selection without leaking information from the test dataset.',
      ],
      questions: [
        {
          q: 'What is feature selection?',
          a: 'Feature selection is the process of choosing relevant existing input variables for a machine learning model while removing unnecessary or less useful features.',
          followUp:
            'What are filter, wrapper, and embedded feature selection methods?',
        },
        {
          q: 'What is feature engineering?',
          a: 'Feature engineering is the process of creating, transforming, or combining variables to represent useful patterns in a format that a machine learning model can learn from.',
          followUp:
            'Give three examples of feature engineering for customer churn prediction.',
        },
        {
          q: 'What is the difference between feature selection and feature extraction?',
          a: 'Feature selection chooses a subset of existing features. Feature extraction creates new representations from the original data, such as principal components produced by PCA.',
          followUp:
            'Why might PCA be useful for high-dimensional data?',
        },
        {
          q: 'What is one-hot encoding?',
          a: 'One-hot encoding converts categorical values into binary indicator columns, with each column representing a category.',
          followUp:
            'When might one-hot encoding create too many features?',
        },
        {
          q: 'What is data leakage in feature engineering?',
          a: 'Data leakage occurs when information unavailable at prediction time or information from validation or test data influences model training or preprocessing, producing overly optimistic evaluation results.',
          followUp:
            'How can you prevent leakage when creating time-based features?',
        },
        {
          q: 'Why is feature scaling important?',
          a: 'Feature scaling brings numerical variables onto comparable scales. It is particularly important for algorithms such as KNN, SVM, and regularized linear models that are sensitive to feature magnitude.',
          followUp:
            'What is the difference between standardization and normalization?',
        },
      ],
      code: `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.feature_selection import SelectKBest, f_classif
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression

data = {
    "age": [25, 30, 35, 40, 28, 45, 32, 38],
    "total_orders": [2, 8, 10, 1, 4, 12, 5, 7],
    "total_spent": [
        2000, 8500, 12000, 1000,
        4500, 15000, 6000, 9000
    ],
    "city": [
        "Mumbai", "Pune", "Delhi", "Mumbai",
        "Pune", "Delhi", "Mumbai", "Pune"
    ],
    "churn": [1, 0, 0, 1, 0, 0, 1, 0]
}

df = pd.DataFrame(data)

# Feature engineering
df["average_order_value"] = (
    df["total_spent"] / df["total_orders"]
)

X = df.drop(columns=["churn"])
y = df["churn"]

# Split before fitting preprocessing steps
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.25,
    random_state=42,
    stratify=y
)

numeric_features = [
    "age",
    "total_orders",
    "total_spent",
    "average_order_value"
]

categorical_features = ["city"]

numeric_pipeline = Pipeline([
    ("imputer", SimpleImputer(strategy="median")),
    ("scaler", StandardScaler())
])

categorical_pipeline = Pipeline([
    ("imputer", SimpleImputer(strategy="most_frequent")),
    ("encoder", OneHotEncoder(handle_unknown="ignore"))
])

preprocessor = ColumnTransformer([
    ("numeric", numeric_pipeline, numeric_features),
    ("categorical", categorical_pipeline, categorical_features)
])

model_pipeline = Pipeline([
    ("preprocessor", preprocessor),
    ("selection", SelectKBest(
        score_func=f_classif,
        k=4
    )),
    ("model", LogisticRegression(max_iter=1000))
])

model_pipeline.fit(X_train, y_train)

print("Training accuracy:", model_pipeline.score(
    X_train, y_train
))

print("Testing accuracy:", model_pipeline.score(
    X_test, y_test
))`,
      pitfalls: [
        'Selecting features using the entire dataset before train-test splitting.',
        'Creating features using information that would not be available at prediction time.',
        'Removing features only because their individual correlation with the target is low.',
        'Assuming feature importance proves a causal relationship.',
        'Creating duplicate or highly redundant features without checking their effect.',
        'Applying scaling or encoding inconsistently between training and prediction data.',
        'Ignoring the meaning of features and relying entirely on automated selection methods.',
      ],
    }),
  ],
}

export default ch