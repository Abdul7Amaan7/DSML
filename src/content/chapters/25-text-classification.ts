import { topic, type Chapter, type InterviewQA } from '../types'

type LessonImage = {
  src: string
  alt: string
  title?: string
  caption?: string
  width: number
  height: number
  fit: 'cover' | 'contain'
}

type Lesson = {
  slug: string
  title: string
  summary: string
  definition: string
  why: string
  purpose: string
  when: string[]
  simpleExample: string
  realLife: {
    problem: string
    approach: string[]
    outcome: string
  }
  tasks: [string, string, string]
  questions: InterviewQA[]
  detail?: string
  code?: string
  pitfalls?: string[]
  images?: LessonImage[]
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
      domain: 'nlp',
      problem: data.realLife.problem,
      approach: data.realLife.approach,
      outcome: data.realLife.outcome,
    },
    [
      {
        id: `${data.slug}-task-1`,
        title: 'Understand it',
        difficulty: 'easy',
        task: data.tasks[0],
        expectedOutcome:
          'Explain the concept in your own words and provide a simple real-world example.',
      },
      {
        id: `${data.slug}-task-2`,
        title: 'Explore it',
        difficulty: 'medium',
        task: data.tasks[1],
        expectedOutcome:
          'Understand the working process, important components, and practical implementation.',
      },
      {
        id: `${data.slug}-task-3`,
        title: 'Apply it',
        difficulty: 'hard',
        task: data.tasks[2],
        expectedOutcome:
          'Build a practical solution, evaluate its performance, and explain its limitations.',
      },
    ],
    data.questions,
    {
      code: data.code
        ? [
            {
              title: `Python example: ${data.title}`,
              lang: 'python',
              source: data.code,
            },
          ]
        : undefined,
      pitfalls: data.pitfalls,
      images: data.images,
    },
  )
}

const ch: Chapter = {
  id: 'text-classification-and-clustering',
  number: 24,
  title: 'Text Classification and Clustering',
  tagline:
    'Learn how machine learning algorithms classify text into predefined categories and group similar documents automatically.',
  priority: 'extreme',

  topics: [
    lesson({
      slug: 'text-classification',
      title: 'Text Classification',
      summary:
        'A supervised machine learning technique that automatically assigns text documents to predefined categories.',

      definition:
        'Text Classification is a Natural Language Processing (NLP) task that assigns predefined labels or categories to text documents.\n\nA machine learning model learns from previously labeled text examples and uses that knowledge to classify new text.\n\nFor example, an email can be classified as Spam or Not Spam.',

      why:
        'Companies receive thousands of emails, messages, reviews, and support requests every day. Manually reading and organizing all this information takes time.\n\nText classification helps automate this process by identifying the category of a text document.',

      purpose:
        'The purpose of text classification is to automatically organize text into meaningful categories.\n\nIt is commonly used for spam detection, sentiment analysis, news categorization, customer support routing, and topic classification.',

      when: [
        'When assigning categories to emails or messages.',
        'When identifying positive, negative, or neutral sentiment.',
        'When detecting spam or unwanted messages.',
        'When organizing news articles by topic.',
        'When automatically routing customer support requests.',
      ],

      simpleExample:
        'Imagine an email classification system.\n\nTraining examples:\n\nEmail 1: "You won a free prize!" → Spam\nEmail 2: "Your meeting is scheduled for tomorrow." → Not Spam\nEmail 3: "Claim your free gift now!" → Spam\nEmail 4: "Please find the project report attached." → Not Spam\n\nThe model learns patterns from these labeled emails.\n\nNew email:\n"Congratulations! Claim your free reward."\n\nPrediction: Spam\n\nThe model uses patterns learned from previous examples to predict the category of new text.',

      detail:
        'Text classification generally follows these steps:\n\n1. Collect text data: Gather emails, reviews, messages, or documents.\n2. Label the data: Assign the correct category to each example.\n3. Text preprocessing: Clean text, remove unnecessary characters, and tokenize it when needed.\n4. Feature extraction: Convert text into numerical features using Bag of Words, TF-IDF, or embeddings.\n5. Model training: Train a classification algorithm using the text features and labels.\n6. Prediction: Give new text to the trained model to predict its category.\n7. Evaluation: Measure performance using accuracy, precision, recall, and F1-score.\n\nText classification is a supervised learning problem because the model learns from labeled examples.',

      realLife: {
        problem:
          'An online shopping company receives thousands of customer messages. It wants to automatically identify whether a message is about delivery, payment, returns, or product complaints.',
        approach: [
          'Collect customer messages and their correct categories.',
          'Clean and prepare the text data.',
          'Convert text into numerical features using TF-IDF.',
          'Train a classification model using labeled examples.',
          'Use the trained model to predict categories for new messages.',
        ],
        outcome:
          'Customer messages can be automatically organized into categories, helping the support team respond more efficiently.',
      },

      tasks: [
        'Collect ten example messages and manually label them as Spam or Not Spam.',
        'Convert the messages into TF-IDF features and train a classification model.',
        'Build a text classification application that predicts categories for new messages and evaluates its performance.',
      ],

      code: `from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report

texts = [
    "Win a free prize now",
    "Claim your free gift today",
    "Congratulations you won money",
    "Meeting is scheduled for tomorrow",
    "Please send the project report",
    "Let's discuss the assignment"
]

labels = [
    "spam",
    "spam",
    "spam",
    "not_spam",
    "not_spam",
    "not_spam"
]

vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(texts)

X_train, X_test, y_train, y_test = train_test_split(
    X,
    labels,
    test_size=0.33,
    random_state=42,
    stratify=labels
)

model = LogisticRegression()
model.fit(X_train, y_train)

predictions = model.predict(X_test)

print("Accuracy:")
print(accuracy_score(y_test, predictions))

print("\\nClassification Report:")
print(classification_report(y_test, predictions))

new_message = ["Claim your free money now"]

new_vector = vectorizer.transform(new_message)

print("\\nPrediction:")
print(model.predict(new_vector))`,

      pitfalls: [
        'Text classification requires labeled training data.',
        'Poor-quality labels can reduce model performance.',
        'Unbalanced classes can make accuracy misleading.',
        'Text must be converted into numerical features before using traditional machine learning algorithms.',
        'The model may perform poorly on text that is very different from its training data.',
        'Fit the vectorizer on training data only to avoid data leakage.',
      ],

      questions: [
        {
          q: 'What is text classification?',
          a: 'Text classification is an NLP task that automatically assigns predefined categories or labels to text documents.',
        },
        {
          q: 'Is text classification supervised or unsupervised learning?',
          a: 'Text classification is generally a supervised learning task because the model learns from labeled text examples.',
        },
        {
          q: 'What are some applications of text classification?',
          a: 'Spam detection, sentiment analysis, news categorization, and customer support routing are common applications.',
        },
        {
          q: 'Why do we need feature extraction in text classification?',
          a: 'Traditional machine learning algorithms require numerical input. Feature extraction converts text into numerical representations.',
        },
        {
          q: 'Which evaluation metrics are used for text classification?',
          a: 'Common metrics include accuracy, precision, recall, F1-score, and confusion matrix.',
        },
      ],
    }),

    lesson({
      slug: 'feature-selection',
      title: 'Feature Selection',
      summary:
        'A technique that selects the most useful features from a dataset and removes irrelevant or unnecessary features.',

      definition:
        'Feature Selection is the process of selecting the most relevant input features for a machine learning model.\n\nIn text classification, a text vectorizer may create thousands of features, where each feature represents a word or term.\n\nFeature selection identifies the most useful words and removes irrelevant or less informative ones.',

      why:
        'Text datasets can contain thousands or even millions of unique words. Not all words help a model make accurate predictions.\n\nFor example, common words such as "the", "is", and "a" may provide little information for distinguishing spam from non-spam emails.\n\nRemoving unnecessary features can reduce complexity, improve training speed, and sometimes improve model performance.',

      purpose:
        'The purpose of feature selection is to reduce the number of input features while keeping the most useful information for prediction.\n\nIt helps create simpler, faster, and potentially more accurate machine learning models.',

      when: [
        'When a text dataset contains a very large vocabulary.',
        'When many words are irrelevant to the prediction task.',
        'When reducing model training time.',
        'When improving model interpretability.',
        'When trying to reduce overfitting caused by unnecessary features.',
      ],

      simpleExample:
        'Suppose an email classification dataset contains these words:\n\n[free, offer, prize, meeting, report, tomorrow, the, is, a, and]\n\nThe model needs to identify spam emails.\n\nWords such as "free", "offer", and "prize" may be useful for identifying spam.\n\nWords such as "the", "is", and "a" may provide less useful information.\n\nFeature selection can identify and keep the more informative features while removing less useful ones.',

      detail:
        'Feature selection methods are commonly divided into three categories:\n\n**1. Filter Methods**\n\nThese methods select features using statistical measurements without training a machine learning model.\n\nExamples:\n- Chi-Square test\n- Mutual Information\n- ANOVA F-test\n- Variance Threshold\n\n**2. Wrapper Methods**\n\nThese methods evaluate different combinations of features by repeatedly training a model.\n\nExamples:\n- Recursive Feature Elimination (RFE)\n- Sequential Feature Selection\n\n**3. Embedded Methods**\n\nThese methods perform feature selection during model training.\n\nExamples:\n- L1 Regularization\n- Decision Tree Feature Importance\n- Lasso-based selection\n\nFor text classification, Chi-Square and Mutual Information are commonly used feature selection methods.',

      realLife: {
        problem:
          'A spam detection dataset contains 50,000 unique words. Training a model using every feature takes more time and includes many unimportant words.',
        approach: [
          'Convert emails into numerical TF-IDF features.',
          'Apply a feature selection method such as Chi-Square.',
          'Select the most informative words for spam classification.',
          'Train the model using the selected features.',
          'Compare model performance before and after feature selection.',
        ],
        outcome:
          'The model uses fewer features, which can reduce training time and make the important word patterns easier to identify.',
      },

      tasks: [
        'Create a small text dataset and identify which words may be useful for classification.',
        'Use SelectKBest and Chi-Square to select important text features.',
        'Compare a classification model trained with all features against one trained with selected features.',
      ],

      code: `from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.feature_selection import SelectKBest, chi2

texts = [
    "free money and free prizes",
    "claim your free reward",
    "win a free gift today",
    "project meeting tomorrow",
    "send the project report",
    "team meeting is scheduled"
]

labels = [1, 1, 1, 0, 0, 0]

vectorizer = TfidfVectorizer()

X = vectorizer.fit_transform(texts)

selector = SelectKBest(
    score_func=chi2,
    k=5
)

X_selected = selector.fit_transform(X, labels)

selected_features = vectorizer.get_feature_names_out()[
    selector.get_support()
]

print("Original Feature Count:")
print(X.shape[1])

print("\\nSelected Feature Count:")
print(X_selected.shape[1])

print("\\nSelected Features:")
print(selected_features)`,

      pitfalls: [
        'Removing too many features can remove useful information.',
        'Feature selection must be performed using training data only.',
        'Different feature selection methods may select different words.',
        'A feature that looks unimportant individually may be useful when combined with other features.',
        'Feature selection does not always improve model accuracy.',
      ],

      questions: [
        {
          q: 'What is feature selection?',
          a: 'Feature selection is the process of selecting the most relevant input features and removing unnecessary ones.',
        },
        {
          q: 'Why is feature selection important in NLP?',
          a: 'Text datasets can contain thousands of word features. Feature selection helps remove less useful words and reduce model complexity.',
        },
        {
          q: 'What are the three main types of feature selection?',
          a: 'The three main types are Filter Methods, Wrapper Methods, and Embedded Methods.',
        },
        {
          q: 'What is the Chi-Square test used for in text classification?',
          a: 'It measures the relationship between a text feature and a target category to identify informative features.',
        },
        {
          q: 'What is the difference between feature selection and feature extraction?',
          a: 'Feature selection chooses existing features, while feature extraction creates new features or transforms existing ones into another representation.',
        },
      ],
    }),

    lesson({
      slug: 'knn',
      title: 'K-Nearest Neighbors (KNN)',
      summary:
        'A supervised learning algorithm that classifies new text by looking at the most similar examples in the training dataset.',

      definition:
        'K-Nearest Neighbors (KNN) is a supervised machine learning algorithm used for classification and regression.\n\nIn text classification, KNN compares a new document with existing documents and finds the K most similar examples.\n\nIt predicts the category based on the majority category among those nearest examples.',

      why:
        'Sometimes a new text document is very similar to documents that have already been classified.\n\nInstead of learning a complex mathematical boundary during training, KNN uses the similarity between documents to make predictions.',

      purpose:
        'The purpose of KNN is to classify new text based on the categories of similar documents.\n\nIt is useful for understanding similarity-based classification and can work with numerical text representations such as TF-IDF.',

      when: [
        'When similar documents are expected to have similar categories.',
        'When working with small or medium-sized datasets.',
        'When building a simple text classification baseline.',
        'When using TF-IDF vectors with a suitable distance or similarity measure.',
        'When you want a simple algorithm that does not require a complex training process.',
      ],

      simpleExample:
        'Suppose we have these classified messages:\n\nMessage 1: "Win free money" → Spam\nMessage 2: "Claim your free prize" → Spam\nMessage 3: "Meeting tomorrow" → Not Spam\nMessage 4: "Send the project report" → Not Spam\n\nA new message arrives:\n"Win a free prize today"\n\nKNN finds the K most similar messages.\n\nIf K = 3 and two of the nearest messages are Spam while one is Not Spam, the predicted category is Spam.\n\nK represents the number of nearest neighbors considered for the prediction.',

      detail:
        'KNN works through these steps:\n\n1. Convert text into numerical vectors using TF-IDF or another representation.\n2. Choose a value for K.\n3. Calculate the distance or similarity between the new document and training documents.\n4. Find the K nearest training examples.\n5. Count the categories of the nearest examples.\n6. Predict the category with the highest vote.\n\nCommon distance measures include:\n\n- Euclidean Distance\n- Manhattan Distance\n- Cosine Distance\n\nFor high-dimensional text vectors, cosine similarity or cosine distance is often a useful choice.\n\nKNN is called a lazy learning algorithm because it mainly stores training examples and performs the nearest-neighbor search when a prediction is requested.',

      realLife: {
        problem:
          'A company wants to classify incoming customer messages by comparing them with previously categorized messages.',
        approach: [
          'Collect previously labeled customer messages.',
          'Convert the messages into TF-IDF vectors.',
          'Choose a value for K.',
          'Compare new messages with existing messages using cosine distance.',
          'Predict the category using the majority vote of the nearest messages.',
        ],
        outcome:
          'New messages can be classified based on the categories of similar historical messages.',
      },

      tasks: [
        'Understand how KNN classifies a new document using nearby examples.',
        'Convert text into TF-IDF vectors and train a KNN classifier.',
        'Experiment with different K values and compare classification performance.',
      ],

      code: `from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

texts = [
    "free money win prize",
    "claim your free reward",
    "win a free gift",
    "project meeting tomorrow",
    "send the project report",
    "team meeting today",
    "free offer available",
    "please review the report"
]

labels = [
    "spam",
    "spam",
    "spam",
    "work",
    "work",
    "work",
    "spam",
    "work"
]

vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(texts)

X_train, X_test, y_train, y_test = train_test_split(
    X,
    labels,
    test_size=0.25,
    random_state=42,
    stratify=labels
)

model = KNeighborsClassifier(
    n_neighbors=3,
    metric="cosine",
    algorithm="brute"
)

model.fit(X_train, y_train)

predictions = model.predict(X_test)

print("Accuracy:")
print(accuracy_score(y_test, predictions))

new_text = ["claim your free money"]

new_vector = vectorizer.transform(new_text)

print("\\nPrediction:")
print(model.predict(new_vector))`,

      pitfalls: [
        'Choosing a very small K can make predictions sensitive to noise.',
        'Choosing a very large K can make the model ignore local patterns.',
        'KNN can be slow during prediction because it compares new examples with stored training examples.',
        'High-dimensional text data can make distance calculations less effective.',
        'The choice of distance metric can strongly affect performance.',
        'Features should be represented and scaled appropriately for the selected distance measure.',
      ],

      questions: [
        {
          q: 'What is KNN?',
          a: 'K-Nearest Neighbors is a supervised learning algorithm that predicts a category by looking at the K most similar training examples.',
        },
        {
          q: 'What does K represent in KNN?',
          a: 'K represents the number of nearest neighbors considered when making a prediction.',
        },
        {
          q: 'Why is KNN called a lazy learning algorithm?',
          a: 'Because it does not build a complex model during training. It stores the training data and performs most of the work when a prediction is requested.',
        },
        {
          q: 'Which distance measures are used in KNN?',
          a: 'Common measures include Euclidean distance, Manhattan distance, and cosine distance.',
        },
        {
          q: 'Why is cosine distance useful for text classification?',
          a: 'Text vectors are often high-dimensional and sparse. Cosine distance compares the direction of vectors rather than relying only on their absolute magnitude.',
        },
        {
          q: 'What happens if K is too large?',
          a: 'The model may consider too many neighbors and overlook local patterns in the data.',
        },
      ],
    }),

    lesson({
      slug: 'support-vector-machine',
      title: 'Support Vector Machine (SVM)',
      summary:
        'A supervised learning algorithm that finds a decision boundary to separate text documents into different categories.',

      definition:
        'Support Vector Machine (SVM) is a supervised machine learning algorithm used for classification and regression.\n\nFor text classification, SVM learns a decision boundary that separates documents belonging to different categories.\n\nIt tries to find a boundary with the largest possible margin between the classes.',

      why:
        'Text classification datasets often contain thousands of features because each word can become a feature.\n\nSVM can work effectively with high-dimensional numerical data and is a popular traditional machine learning approach for text classification.',

      purpose:
        'The purpose of SVM is to find a decision boundary that separates different categories as effectively as possible.\n\nIt is commonly used for spam detection, sentiment analysis, document classification, and topic categorization.',

      when: [
        'When working with high-dimensional text features.',
        'When using TF-IDF vectors for classification.',
        'When separating documents into two or more categories.',
        'When building traditional machine learning text classifiers.',
        'When a strong classification baseline is required.',
      ],

      simpleExample:
        'Suppose we have two categories of emails:\n\nSpam:\n- Win a free prize.\n- Claim your free reward.\n\nNot Spam:\n- Meeting is scheduled.\n- Send the project report.\n\nSVM converts these emails into numerical vectors and learns a boundary between the two categories.\n\nWhen a new email arrives, the model checks which side of the decision boundary the email belongs to.\n\nThe predicted side determines whether the email is Spam or Not Spam.',

      detail:
        'SVM works by finding a decision boundary called a hyperplane.\n\nImportant concepts:\n\n1. Hyperplane: A boundary that separates different classes.\n2. Margin: The distance between the hyperplane and the closest training examples from each class.\n3. Support Vectors: The training examples closest to the decision boundary. They help determine the position of the boundary.\n4. Kernel: A function that allows SVM to learn nonlinear decision boundaries in some cases.\n\nCommon kernels:\n\n- Linear Kernel\n- Polynomial Kernel\n- RBF Kernel\n\nFor many traditional text classification tasks, Linear SVM is a strong choice because text data often has many dimensions.',

      realLife: {
        problem:
          'An email platform wants to identify whether an email is spam or not spam using thousands of word-based features.',
        approach: [
          'Collect labeled spam and non-spam emails.',
          'Convert emails into TF-IDF vectors.',
          'Train a Linear SVM classifier.',
          'The model learns a decision boundary between the two categories.',
          'Use the trained model to classify new emails.',
        ],
        outcome:
          'The platform can automatically classify emails based on patterns learned from previously labeled examples.',
      },

      tasks: [
        'Understand hyperplanes, margins, and support vectors using a simple two-class example.',
        'Train a Linear SVM classifier using TF-IDF text features.',
        'Compare Linear SVM performance with KNN on the same text dataset.',
      ],

      code: `from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import LinearSVC
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report

texts = [
    "win free money now",
    "claim your free prize",
    "get a free reward",
    "meeting scheduled tomorrow",
    "send the project report",
    "please review the assignment",
    "free gift available today",
    "team meeting at office"
]

labels = [
    "spam",
    "spam",
    "spam",
    "work",
    "work",
    "work",
    "spam",
    "work"
]

vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(texts)

X_train, X_test, y_train, y_test = train_test_split(
    X,
    labels,
    test_size=0.25,
    random_state=42,
    stratify=labels
)

model = LinearSVC()
model.fit(X_train, y_train)

predictions = model.predict(X_test)

print("Accuracy:")
print(accuracy_score(y_test, predictions))

print("\\nClassification Report:")
print(classification_report(y_test, predictions))

new_text = ["claim your free prize now"]

new_vector = vectorizer.transform(new_text)

print("\\nPrediction:")
print(model.predict(new_vector))`,

      pitfalls: [
        'SVM requires numerical input, so text must first be converted into features.',
        'The choice of kernel and regularization parameter can affect performance.',
        'SVM does not directly provide probability estimates in its standard LinearSVC implementation.',
        'Nonlinear kernels can become computationally expensive for large datasets.',
        'A model trained on one domain may perform poorly on a very different domain.',
      ],

      questions: [
        {
          q: 'What is Support Vector Machine?',
          a: 'SVM is a supervised learning algorithm that finds a decision boundary to separate different classes.',
        },
        {
          q: 'What is a hyperplane?',
          a: 'A hyperplane is a decision boundary that separates different classes in a feature space.',
        },
        {
          q: 'What are support vectors?',
          a: 'Support vectors are the training examples closest to the decision boundary. They help determine the position of the hyperplane.',
        },
        {
          q: 'What is the margin in SVM?',
          a: 'The margin is the distance between the decision boundary and the closest training examples from the different classes.',
        },
        {
          q: 'What is the purpose of a kernel in SVM?',
          a: 'A kernel helps SVM learn nonlinear decision boundaries by working with relationships between data points in a transformed feature space.',
        },
        {
          q: 'Why is Linear SVM popular for text classification?',
          a: 'Text data often has many features, and Linear SVM can work effectively with high-dimensional sparse text representations.',
        },
      ],
    }),

    lesson({
      slug: 'k-means',
      title: 'K-Means Clustering',
      summary:
        'An unsupervised learning algorithm that groups similar text documents into K clusters based on their numerical features.',

      definition:
        'K-Means is an unsupervised machine learning algorithm that divides data into K clusters.\n\nEach cluster contains data points that are relatively close to one another. The algorithm uses a central point called a centroid to represent each cluster.\n\nIn NLP, K-Means can group similar documents using numerical text representations such as TF-IDF vectors.',

      why:
        'Sometimes text documents do not have predefined labels. Manually assigning categories to thousands of documents can take a lot of time.\n\nK-Means helps discover groups of similar documents without requiring labeled training data.',

      purpose:
        'The purpose of K-Means is to discover natural groups in text data.\n\nIt is useful for document clustering, grouping customer feedback, organizing news articles, and exploring large collections of text.',

      when: [
        'When grouping similar documents without predefined labels.',
        'When organizing large collections of articles.',
        'When exploring topics in customer feedback.',
        'When grouping similar support tickets.',
        'When discovering patterns in unlabeled text data.',
      ],

      simpleExample:
        'Imagine a collection of news articles:\n\nArticle 1: Football match results and players.\nArticle 2: Cricket match and team performance.\nArticle 3: Python programming and software development.\nArticle 4: Artificial intelligence and machine learning.\n\nIf K = 2, K-Means tries to divide these documents into two groups based on their numerical features.\n\nPossible result:\n\nCluster 1: Sports articles.\nCluster 2: Technology articles.\n\nThe algorithm discovers groups based on feature similarity. It does not automatically know that the groups are called Sports or Technology.',

      detail:
        'K-Means follows these steps:\n\n1. Choose the number of clusters K.\n2. Initialize K centroids.\n3. Calculate the distance between each document vector and each centroid.\n4. Assign every document to its nearest centroid.\n5. Recalculate each centroid using the mean of the assigned points.\n6. Repeat the assignment and centroid update steps until the clusters become stable or the maximum number of iterations is reached.\n\nFor text clustering:\n\n1. Convert documents into numerical vectors using TF-IDF.\n2. Apply K-Means to the vectors.\n3. Inspect the words with high average TF-IDF values in each cluster to understand its topic.\n\nK-Means requires the number of clusters to be specified before training.',

      realLife: {
        problem:
          'A news company has thousands of articles but does not have categories for all of them. It wants to organize articles into groups automatically.',
        approach: [
          'Collect news articles from different sources.',
          'Clean and prepare the article text.',
          'Convert articles into TF-IDF vectors.',
          'Choose a suitable number of clusters.',
          'Apply K-Means to group similar article vectors.',
          'Inspect important words in each cluster to understand the topics.',
        ],
        outcome:
          'The company can discover groups of similar news articles without manually labeling every document.',
      },

      tasks: [
        'Understand the meaning of clusters and centroids using a small dataset.',
        'Convert sample documents into TF-IDF vectors and apply K-Means.',
        'Experiment with different K values and compare cluster quality using the silhouette score.',
      ],

      code: `from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

documents = [
    "football players and sports match",
    "cricket team and sports tournament",
    "football match and cricket match",
    "python programming language",
    "machine learning and artificial intelligence",
    "software development using python"
]

vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(documents)

model = KMeans(
    n_clusters=2,
    random_state=42,
    n_init=10
)

clusters = model.fit_predict(X)

print("Cluster Assignments:")
print(clusters)

print("\\nSilhouette Score:")
print(silhouette_score(X, clusters))

terms = vectorizer.get_feature_names_out()

for cluster_id, center in enumerate(model.cluster_centers_):
    top_indices = center.argsort()[-5:][::-1]

    top_words = [terms[i] for i in top_indices]

    print(f"\\nCluster {cluster_id}:")
    print(top_words)`,

      pitfalls: [
        'K-Means requires the number of clusters K to be selected in advance.',
        'Different initial centroids can produce different results.',
        'K-Means can be affected by outliers.',
        'It works best when clusters are reasonably compact and separated.',
        'The algorithm does not automatically understand the meaning of each cluster.',
        'A cluster number does not represent a meaningful category name by itself.',
      ],

      questions: [
        {
          q: 'What is K-Means clustering?',
          a: 'K-Means is an unsupervised learning algorithm that groups similar data points into K clusters.',
        },
        {
          q: 'Is K-Means supervised or unsupervised learning?',
          a: 'K-Means is an unsupervised learning algorithm because it does not require predefined labels.',
        },
        {
          q: 'What is a centroid?',
          a: 'A centroid is the central point of a cluster, calculated using the mean of the points assigned to that cluster.',
        },
        {
          q: 'How does K-Means work?',
          a: 'It initializes centroids, assigns points to their nearest centroid, recalculates the centroids, and repeats until the clusters become stable.',
        },
        {
          q: 'How do we select the value of K?',
          a: 'We can use techniques such as the Elbow Method and Silhouette Score to help choose a suitable number of clusters.',
        },
        {
          q: 'Can K-Means automatically name the clusters?',
          a: 'No. It creates numerical cluster groups. We need to inspect the documents or important words to understand and name each cluster.',
        },
      ],
    }),

    lesson({
      slug: 'hierarchical-clustering',
      title: 'Hierarchical Clustering',
      summary:
        'An unsupervised learning technique that groups similar documents into a tree-like structure of clusters.',

      definition:
        'Hierarchical Clustering is an unsupervised machine learning technique that creates a hierarchy of clusters.\n\nUnlike K-Means, it does not require the number of clusters to be fixed at the beginning. We can examine the hierarchy and choose a suitable number of groups later.\n\nIn NLP, it can be used to organize documents according to their similarity.',

      why:
        'Sometimes we do not know how many categories exist in a collection of documents.\n\nHierarchical clustering helps explore relationships between documents and shows how smaller groups can be combined into larger groups.',

      purpose:
        'The purpose of hierarchical clustering is to discover nested groups of similar data points and represent their relationships using a tree-like structure called a dendrogram.\n\nIt is useful for document grouping, topic exploration, and discovering relationships in text collections.',

      when: [
        'When exploring document relationships without knowing the number of clusters.',
        'When creating a hierarchy of related documents.',
        'When analyzing small or medium-sized text collections.',
        'When visualizing how similar documents are grouped together.',
        'When studying relationships between different topics.',
      ],

      simpleExample:
        'Suppose we have four documents:\n\nDocument 1: Football match and players.\nDocument 2: Cricket match and teams.\nDocument 3: Python programming.\nDocument 4: Machine learning.\n\nHierarchical clustering compares the documents and gradually creates groups.\n\nPossible hierarchy:\n\n- Football and Cricket → Sports group.\n- Python and Machine Learning → Technology group.\n- Sports and Technology → Larger document collection.\n\nThe grouping process can be displayed using a dendrogram, which shows when individual documents or clusters are joined.',

      detail:
        'There are two main approaches:\n\n**1. Agglomerative Clustering (Bottom-Up)**\n\nThis is the most commonly used hierarchical clustering approach.\n\n- Start with every document as its own cluster.\n- Find the two closest clusters.\n- Merge them into one cluster.\n- Repeat until all documents belong to one large cluster or the stopping condition is reached.\n\n**2. Divisive Clustering (Top-Down)**\n\n- Start with all documents in one large cluster.\n- Split the cluster into smaller groups.\n- Continue splitting until the desired grouping is reached.\n\nImportant linkage methods:\n\n- Single Linkage: Uses the minimum distance between points in two clusters.\n- Complete Linkage: Uses the maximum distance between points in two clusters.\n- Average Linkage: Uses the average distance between points in two clusters.\n- Ward Linkage: Merges clusters in a way that minimizes the increase in within-cluster variance.\n\nA dendrogram is a tree diagram that displays the merging process. Cutting the dendrogram at a selected height gives a possible number of clusters.',

      realLife: {
        problem:
          'A research organization has a collection of documents from different subjects. It wants to discover how the documents are related without deciding the number of groups in advance.',
        approach: [
          'Collect and clean the documents.',
          'Convert the documents into TF-IDF vectors.',
          'Calculate distances between the document vectors.',
          'Apply agglomerative hierarchical clustering.',
          'Visualize the relationships using a dendrogram when the dataset is small enough.',
          'Choose a suitable number of clusters by cutting the hierarchy.',
        ],
        outcome:
          'The organization can explore document relationships and create groups at different levels of similarity.',
      },

      tasks: [
        'Understand the difference between agglomerative and divisive clustering.',
        'Apply AgglomerativeClustering to a small collection of TF-IDF document vectors.',
        'Create a dendrogram and experiment with different linkage methods.',
      ],

      code: `from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import AgglomerativeClustering
from sklearn.metrics import silhouette_score
from scipy.cluster.hierarchy import dendrogram, linkage
import matplotlib.pyplot as plt

documents = [
    "football match and sports players",
    "cricket team and sports tournament",
    "football and cricket are sports",
    "python programming language",
    "machine learning and artificial intelligence",
    "software development using python"
]

vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(documents)

model = AgglomerativeClustering(
    n_clusters=2,
    metric="cosine",
    linkage="average"
)

clusters = model.fit_predict(X.toarray())

print("Cluster Assignments:")
print(clusters)

print("\\nSilhouette Score:")
print(silhouette_score(X, clusters, metric="cosine"))

Z = linkage(
    X.toarray(),
    method="average",
    metric="cosine"
)

plt.figure(figsize=(10, 5))

dendrogram(
    Z,
    labels=[f"Document {i + 1}" for i in range(len(documents))]
)

plt.title("Hierarchical Clustering Dendrogram")
plt.xlabel("Documents")
plt.ylabel("Cosine Distance")
plt.tight_layout()
plt.show()`,

      pitfalls: [
        'Hierarchical clustering can be computationally expensive for large datasets.',
        'The result depends on the selected distance metric and linkage method.',
        'Early cluster merging decisions generally cannot be reversed in agglomerative clustering.',
        'Different linkage methods can produce different cluster structures.',
        'A dendrogram can become difficult to read when there are many documents.',
        'The clusters still need interpretation before assigning meaningful topic names.',
      ],

      questions: [
        {
          q: 'What is Hierarchical Clustering?',
          a: 'Hierarchical clustering is an unsupervised learning technique that groups similar data points into a tree-like hierarchy of clusters.',
        },
        {
          q: 'What are the two main types of hierarchical clustering?',
          a: 'The two main types are Agglomerative Clustering and Divisive Clustering.',
        },
        {
          q: 'What is Agglomerative Clustering?',
          a: 'Agglomerative clustering is a bottom-up approach that starts with individual data points and repeatedly merges the closest clusters.',
        },
        {
          q: 'What is Divisive Clustering?',
          a: 'Divisive clustering is a top-down approach that starts with one large cluster and repeatedly divides it into smaller clusters.',
        },
        {
          q: 'What is a dendrogram?',
          a: 'A dendrogram is a tree diagram that displays how individual data points or clusters are merged during hierarchical clustering.',
        },
        {
          q: 'What is linkage in hierarchical clustering?',
          a: 'Linkage defines how the distance between two clusters is calculated. Common methods include single, complete, average, and Ward linkage.',
        },
        {
          q: 'What is the difference between K-Means and Hierarchical Clustering?',
          a: 'K-Means creates a specified number of clusters using centroids, while hierarchical clustering creates a tree-like structure of groups that can be examined at different levels.',
        },
      ],
    }),
  ],
}

export default ch