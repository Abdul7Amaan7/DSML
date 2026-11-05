
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
  id: 'unsupervised-learning',
  number: 13,
  title: 'Unsupervised Learning',
  tagline:
    'Discover hidden patterns, groups, relationships, and unusual observations in unlabeled data.',
  priority: 'extreme',
  topics: [
    lesson({
      slug: 'introduction-to-unsupervised-learning',
      title: 'Introduction to Unsupervised Learning',
      summary:
        'Understand how machine learning discovers hidden patterns and relationships in data without predefined answers.',
      definition:
        'Unsupervised Learning is a type of machine learning in which a model learns from unlabeled data. Unlike supervised learning, the dataset does not contain predefined target answers. The model analyzes the data and tries to discover patterns, similarities, groups, or unusual observations.',
      why:
        'In real-world situations, we often have large amounts of data but do not know the correct categories or answers in advance. Unsupervised learning helps us explore that data and discover useful information that may not be immediately visible.',
      purpose:
        'The purpose is to discover hidden structures, group similar observations, reduce the complexity of data, and identify unusual patterns without requiring predefined labels.',
      when: [
        'When a dataset does not contain target labels.',
        'When discovering groups of similar customers or products.',
        'When exploring patterns in large datasets.',
        'When reducing the number of features in a dataset.',
        'When identifying unusual observations or suspicious activities.',
      ],
      simpleExample:
        'Imagine a supermarket has information about 500 customers, including their age, shopping frequency, and spending amount.\n\nThe supermarket does not know which customers belong to which group.\n\nAn unsupervised learning algorithm can analyze their shopping behavior and discover groups such as frequent shoppers, occasional shoppers, and high-spending shoppers.\n\nThe model discovers the groups without being given their names beforehand.',
      detail:
        'Unsupervised learning mainly includes these types of problems:\n\n1. Clustering: Groups similar observations together. Examples include K-Means, Hierarchical Clustering, and DBSCAN.\n2. Dimensionality Reduction: Reduces the number of features while trying to preserve useful information. Example: PCA.\n3. Anomaly Detection: Identifies observations that behave differently from normal patterns. Example: Isolation Forest.\n\nBasic workflow:\n\n1. Collect unlabeled data.\n2. Clean and prepare the dataset.\n3. Select useful features.\n4. Apply an unsupervised learning algorithm.\n5. Examine the discovered patterns or groups.\n6. Interpret the results using domain knowledge.\n\nBecause there are no predefined target labels, evaluating unsupervised learning can be more difficult than evaluating supervised learning.',
      realLife: {
        problem:
          'A shopping company has thousands of customer records but does not know which customers have similar shopping behavior.',
        approach: [
          'Collect customer information such as age, spending, and shopping frequency.',
          'Clean the dataset and prepare the numerical features.',
          'Apply a clustering algorithm to discover similar customers.',
          'Analyze the resulting groups and understand their behavior.',
        ],
        outcome:
          'The company discovers customer groups and can use those insights to improve marketing campaigns and customer experience.',
      },
      tasks: [
        'Create a small customer dataset containing age, spending, and shopping frequency. Identify why it is unlabeled.',
        'Apply K-Means to the dataset and explain the groups discovered by the algorithm.',
        'Explore a real-world unlabeled dataset and identify which unsupervised learning technique would be useful and why.',
      ],
      code: `import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

data = {
    "age": [20, 22, 25, 45, 48, 50, 30, 32, 35],
    "spending": [1000, 1200, 1500, 8000, 8500, 9000, 3000, 3500, 4000],
    "visits": [2, 3, 2, 10, 12, 11, 5, 6, 5]
}

df = pd.DataFrame(data)

# There is no target column or predefined group label.
X = df[["age", "spending", "visits"]]

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

model = KMeans(
    n_clusters=3,
    random_state=42,
    n_init=10
)

df["cluster"] = model.fit_predict(X_scaled)

print(df)

print("\\nCustomer group averages:")
print(df.groupby("cluster").mean())`,
      pitfalls: [
        'Assuming unsupervised learning requires labeled target data.',
        'Assuming every discovered group automatically has a meaningful business interpretation.',
        'Choosing an algorithm without understanding the data.',
        'Ignoring feature scaling when using distance-based algorithms.',
        'Assuming every unsupervised algorithm produces clusters.',
        'Treating discovered patterns as proof of cause-and-effect relationships.',
      ],
      questions: [
        {
          q: 'What is Unsupervised Learning?',
          a: 'Unsupervised Learning is a machine learning approach where a model learns from unlabeled data and discovers hidden patterns, groups, or relationships.',
        },
        {
          q: 'Does unsupervised learning require labeled data?',
          a: 'No. It works with data that does not have predefined target labels.',
        },
        {
          q: 'What are the main types of unsupervised learning?',
          a: 'Common tasks include clustering, dimensionality reduction, and anomaly detection.',
        },
        {
          q: 'What is the difference between supervised and unsupervised learning?',
          a: 'Supervised learning learns from labeled examples with known answers, while unsupervised learning discovers patterns from data without predefined answers.',
        },
        {
          q: 'Give a real-world example of unsupervised learning.',
          a: 'Customer segmentation is a common example. A company groups customers based on similar spending habits and shopping behavior without predefined group labels.',
        },
      ],
    }),

    lesson({
      slug: 'k-means-clustering',
      title: 'K-Means Clustering',
      summary:
        'Learn how K-Means automatically divides similar data points into a chosen number of groups.',
      definition:
        'K-Means Clustering is an unsupervised learning algorithm that divides unlabeled data into K groups called clusters. It assigns observations to the nearest cluster center, known as a centroid.',
      why:
        'Businesses often have customer or product data without predefined categories. K-Means helps discover groups of similar observations, making large datasets easier to understand.',
      purpose:
        'The purpose is to group similar data points together so that observations within the same cluster are relatively close to one another.',
      when: [
        'When grouping customers based on spending behavior.',
        'When grouping products with similar characteristics.',
        'When discovering patterns in numerical datasets.',
        'When creating customer segments for marketing.',
        'When exploring groups in unlabeled data.',
      ],
      simpleExample:
        'Imagine a shop has information about 100 customers, including how much they spend and how frequently they shop.\n\nIf we choose K = 3, K-Means tries to divide those customers into three groups based on their similarities.\n\nAfter examining the groups, the shop might identify frequent shoppers, occasional shoppers, and high-spending shoppers.',
      detail:
        'How K-Means works:\n\n1. Choose the number of clusters (K).\n2. Initialize K cluster centers called centroids.\n3. Assign each data point to its nearest centroid.\n4. Calculate the average position of the points in each cluster.\n5. Move each centroid to its new average position.\n6. Repeat until the cluster assignments or centroids stop changing significantly.\n\nImportant terms:\n\n- K: The number of clusters.\n- Centroid: The center of a cluster.\n- Inertia: The sum of squared distances between data points and their assigned centroids.\n- Elbow Method: A technique that examines inertia for different K values to help select a useful number of clusters.',
      realLife: {
        problem:
          'An online shopping company wants to divide customers into groups based on their spending and shopping frequency.',
        approach: [
          'Collect customer information such as annual spending and number of purchases.',
          'Clean the data and scale the numerical features.',
          'Apply K-Means using different K values.',
          'Use the Elbow Method and inspect the customer groups.',
        ],
        outcome:
          'The company discovers customer groups with similar shopping habits and can create more relevant marketing campaigns.',
      },
      tasks: [
        'Create a dataset with customer spending and purchase frequency. Apply K-Means with K = 3.',
        'Try K values from 2 to 8 and plot inertia to understand the Elbow Method.',
        'Apply K-Means to a customer dataset, visualize the clusters, and explain the characteristics of each group.',
      ],
      code: `import pandas as pd
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

data = {
    "spending": [
        1000, 1200, 1500, 1800,
        5000, 5200, 5500, 5800,
        10000, 11000, 12000, 13000
    ],
    "purchases": [
        2, 3, 2, 4,
        10, 12, 11, 13,
        20, 22, 25, 24
    ]
}

df = pd.DataFrame(data)

X = df[["spending", "purchases"]]

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

model = KMeans(
    n_clusters=3,
    random_state=42,
    n_init=10
)

df["cluster"] = model.fit_predict(X_scaled)

print(df)

plt.scatter(
    df["spending"],
    df["purchases"],
    c=df["cluster"]
)

plt.xlabel("Annual Spending")
plt.ylabel("Number of Purchases")
plt.title("Customer Segmentation")
plt.show()

inertias = []

for k in range(1, 9):
    model = KMeans(
        n_clusters=k,
        random_state=42,
        n_init=10
    )

    model.fit(X_scaled)
    inertias.append(model.inertia_)

plt.plot(range(1, 9), inertias, marker="o")
plt.xlabel("Number of Clusters")
plt.ylabel("Inertia")
plt.title("Elbow Method")
plt.show()`,
      pitfalls: [
        'Choosing K without examining the data or cluster quality.',
        'Forgetting to scale features when their numerical ranges differ significantly.',
        'Assuming K-Means works well for irregularly shaped clusters.',
        'Assuming every cluster contains the same number of observations.',
        'Treating cluster numbers such as 0, 1, and 2 as meaningful categories without examining them.',
      ],
      questions: [
        {
          q: 'What is K-Means Clustering?',
          a: 'K-Means is an unsupervised algorithm that groups similar data points into K clusters based on their distance from cluster centers.',
        },
        {
          q: 'What does K represent?',
          a: 'K represents the number of clusters the algorithm should create.',
        },
        {
          q: 'What is a centroid?',
          a: 'A centroid is the center of a cluster, calculated as the mean position of the points assigned to that cluster.',
        },
        {
          q: 'What is the Elbow Method?',
          a: 'The Elbow Method compares inertia for different K values. We look for a point where increasing the number of clusters produces much smaller improvements.',
        },
        {
          q: 'Why is feature scaling important in K-Means?',
          a: 'K-Means commonly uses distance calculations. Features with larger numerical ranges can dominate those calculations and influence the clusters unfairly.',
        },
      ],
    }),

    lesson({
      slug: 'hierarchical-clustering',
      title: 'Hierarchical Clustering',
      summary:
        'Understand how Hierarchical Clustering creates a tree-like structure of groups based on similarity.',
      definition:
        'Hierarchical Clustering is an unsupervised learning algorithm that organizes data into a hierarchy of clusters. It creates groups by repeatedly merging smaller clusters or splitting larger clusters.',
      why:
        'It helps us understand how observations are related at different levels of similarity. It is especially useful when we want to explore relationships between observations without choosing the final number of clusters at the beginning.',
      purpose:
        'The purpose is to build a hierarchy of nested groups and show how individual observations are related to one another.',
      when: [
        'When grouping similar customers or products.',
        'When exploring relationships between biological samples.',
        'When the number of clusters is not known in advance.',
        'When a tree-like visualization of groups is useful.',
        'When working with datasets where pairwise distances are manageable.',
      ],
      simpleExample:
        'Imagine five students: A, B, C, D, and E.\n\nStudents A and B have similar marks. Students C and D also have similar marks. Student E is different from the others.\n\nHierarchical Clustering can first group A with B, then C with D, and later combine these smaller groups into larger groups.\n\nThe result looks like a family tree of groups.',
      detail:
        'There are two main approaches:\n\n1. Agglomerative Clustering (bottom-up): Starts with each observation as its own cluster and repeatedly merges the closest clusters.\n2. Divisive Clustering (top-down): Starts with all observations in one cluster and repeatedly splits them into smaller groups.\n\nA dendrogram is a tree-like diagram that shows how clusters are joined together.\n\nCommon linkage methods:\n\n- Single linkage: Uses the minimum distance between observations in two clusters.\n- Complete linkage: Uses the maximum distance between observations in two clusters.\n- Average linkage: Uses the average pairwise distance.\n- Ward linkage: Merges clusters to minimize the increase in within-cluster variance.',
      realLife: {
        problem:
          'A retail company wants to understand how its products are related based on price, sales, and customer ratings.',
        approach: [
          'Collect product information such as price, sales volume, and ratings.',
          'Prepare and scale numerical features where appropriate.',
          'Apply Agglomerative Clustering.',
          'Create a dendrogram to examine the relationships between products.',
        ],
        outcome:
          'The company discovers groups of similar products and can use the results to improve product organization and marketing.',
      },
      tasks: [
        'Create a small dataset containing measurements for different products and apply Agglomerative Clustering.',
        'Experiment with single, complete, and average linkage and compare the resulting groups.',
        'Create a dendrogram and explain how cutting it at different heights changes the number of clusters.',
      ],
      code: `import pandas as pd
import matplotlib.pyplot as plt

from sklearn.preprocessing import StandardScaler
from sklearn.cluster import AgglomerativeClustering
from scipy.cluster.hierarchy import dendrogram, linkage

data = {
    "price": [100, 120, 110, 500, 520, 510, 1000, 1100],
    "sales": [20, 22, 19, 50, 55, 52, 10, 12]
}

df = pd.DataFrame(data)

scaler = StandardScaler()
X_scaled = scaler.fit_transform(df)

model = AgglomerativeClustering(
    n_clusters=3,
    linkage="ward"
)

df["cluster"] = model.fit_predict(X_scaled)

print(df)

linked = linkage(X_scaled, method="ward")

plt.figure(figsize=(10, 6))
dendrogram(linked)

plt.title("Hierarchical Clustering")
plt.xlabel("Data Points")
plt.ylabel("Distance")
plt.show()

plt.scatter(
    df["price"],
    df["sales"],
    c=df["cluster"]
)

plt.xlabel("Price")
plt.ylabel("Sales")
plt.title("Product Clusters")
plt.show()`,
      pitfalls: [
        'Assuming the same clusters will be produced by every linkage method.',
        'Ignoring feature scaling when features have different units.',
        'Assuming a dendrogram automatically identifies the correct number of clusters.',
        'Using hierarchical clustering on very large datasets without considering its computational cost.',
        'Choosing a distance metric without considering the nature of the data.',
      ],
      questions: [
        {
          q: 'What is Hierarchical Clustering?',
          a: 'It is an unsupervised algorithm that creates a hierarchy of groups by repeatedly merging or splitting clusters.',
        },
        {
          q: 'What is the difference between agglomerative and divisive clustering?',
          a: 'Agglomerative clustering starts with individual observations and merges them. Divisive clustering starts with one large group and splits it into smaller groups.',
        },
        {
          q: 'What is a dendrogram?',
          a: 'A dendrogram is a tree-like diagram showing how observations or clusters are joined together at different distances.',
        },
        {
          q: 'What is linkage?',
          a: 'Linkage defines how the distance between two clusters is calculated. Common methods include single, complete, average, and Ward linkage.',
        },
        {
          q: 'Does Hierarchical Clustering require K in advance?',
          a: 'The hierarchy can be built without selecting the final number of clusters. However, a final grouping is obtained by choosing a dendrogram cut level or number of clusters.',
        },
      ],
    }),

    lesson({
      slug: 'dbscan',
      title: 'DBSCAN',
      summary:
        'Learn how DBSCAN finds dense groups of data points and identifies isolated points as noise.',
      definition:
        'DBSCAN stands for Density-Based Spatial Clustering of Applications with Noise. It is an unsupervised clustering algorithm that groups closely packed observations into clusters and identifies observations in low-density regions as noise.',
      why:
        'Some datasets contain clusters with irregular shapes or isolated observations. DBSCAN can identify these groups without requiring the number of clusters in advance.',
      purpose:
        'The purpose is to discover dense groups in data while identifying observations that do not belong to any sufficiently dense group.',
      when: [
        'When clusters have irregular shapes.',
        'When the number of clusters is unknown.',
        'When identifying isolated observations is important.',
        'When working with geographical or spatial data.',
        'When the data contains meaningful density-based patterns.',
      ],
      simpleExample:
        'Imagine plotting restaurant locations on a city map.\n\nMany restaurants may be concentrated in a few busy areas, while some restaurants are far away from the others.\n\nDBSCAN can identify the busy areas as clusters and mark isolated locations as noise.',
      detail:
        'DBSCAN uses two important parameters:\n\n- Epsilon (eps): The maximum distance used to define a neighborhood.\n- Min_samples: The minimum number of observations required in an epsilon neighborhood for a point to be a core point.\n\nIt identifies three types of points:\n\n1. Core point: Has at least Min_samples observations in its neighborhood, including itself.\n2. Border point: Does not have enough neighbors to be a core point, but lies within the neighborhood of a core point.\n3. Noise point: Is neither a core point nor a border point.\n\nThe algorithm expands clusters by connecting observations that are density-reachable from core points.',
      realLife: {
        problem:
          'A delivery company wants to identify areas where delivery orders are concentrated and detect isolated delivery locations.',
        approach: [
          'Collect latitude and longitude coordinates for delivery locations.',
          'Choose an appropriate distance measure and neighborhood radius.',
          'Apply DBSCAN to identify dense geographical areas.',
          'Inspect observations classified as noise.',
          'Visualize the clusters on a map.',
        ],
        outcome:
          'The company can identify delivery hotspots and isolated locations that may need different operational planning.',
      },
      tasks: [
        'Create a dataset containing two-dimensional points and apply DBSCAN.',
        'Experiment with different eps and min_samples values and observe how the clusters change.',
        'Apply DBSCAN to geographical or synthetic data and visualize clusters and noise points separately.',
      ],
      code: `import pandas as pd
import matplotlib.pyplot as plt

from sklearn.cluster import DBSCAN
from sklearn.preprocessing import StandardScaler

data = {
    "x": [1, 1.2, 1.4, 1.1, 5, 5.2, 5.4, 5.1, 10],
    "y": [1, 1.1, 1.3, 1.4, 5, 5.1, 5.3, 5.4, 1]
}

df = pd.DataFrame(data)

scaler = StandardScaler()
X_scaled = scaler.fit_transform(df)

model = DBSCAN(
    eps=0.5,
    min_samples=2
)

df["cluster"] = model.fit_predict(X_scaled)

print(df)

plt.scatter(
    df["x"],
    df["y"],
    c=df["cluster"]
)

plt.xlabel("X")
plt.ylabel("Y")
plt.title("DBSCAN Clustering")
plt.show()

print("Cluster labels:", model.labels_)
print("-1 represents noise.")`,
      pitfalls: [
        'Choosing eps without understanding the distance scale of the features.',
        'Forgetting to scale features when their units and ranges differ.',
        'Assuming DBSCAN works equally well for clusters with very different densities.',
        'Treating every noise point as a confirmed real-world anomaly.',
        'Using ordinary Euclidean distance on latitude and longitude without considering an appropriate geographical distance metric.',
      ],
      questions: [
        {
          q: 'What is DBSCAN?',
          a: 'DBSCAN is a density-based clustering algorithm that groups densely connected observations and identifies points in sparse regions as noise.',
        },
        {
          q: 'What do eps and min_samples mean?',
          a: 'Eps is the neighborhood radius, while min_samples is the minimum number of observations required in that neighborhood for a point to be considered a core point.',
        },
        {
          q: 'What is a noise point?',
          a: 'A noise point is an observation that is neither a core point nor a border point belonging to a cluster.',
        },
        {
          q: 'What is the difference between K-Means and DBSCAN?',
          a: 'K-Means requires a chosen number of clusters and groups observations around centroids. DBSCAN uses density, can identify noise, and does not require the number of clusters in advance.',
        },
        {
          q: 'Can DBSCAN detect irregularly shaped clusters?',
          a: 'Yes. DBSCAN can discover irregularly shaped clusters when their density structure is suitable.',
        },
      ],
    }),

    lesson({
      slug: 'dimensionality-reduction',
      title: 'Dimensionality Reduction',
      summary:
        'Understand how to reduce the number of features in a dataset while retaining useful information.',
      definition:
        'Dimensionality Reduction is the process of reducing the number of features or dimensions in a dataset while trying to preserve as much useful information as possible.',
      why:
        'Datasets sometimes contain hundreds or thousands of features. Working with too many features can increase computation, make visualization difficult, and introduce redundant or noisy information.',
      purpose:
        'The purpose is to simplify a dataset by representing it using fewer dimensions while preserving important patterns and relationships.',
      when: [
        'When a dataset contains a large number of features.',
        'When reducing computational requirements.',
        'When visualizing high-dimensional data in two or three dimensions.',
        'When reducing redundancy between features.',
        'When preparing data for machine learning algorithms.',
      ],
      simpleExample:
        'Imagine a dataset containing 50 measurements for every customer.\n\nIt is difficult to visualize 50 dimensions on a graph.\n\nDimensionality Reduction can transform those 50 features into two new dimensions, making it possible to create a two-dimensional visualization.\n\nSome information may be lost, but the smaller representation can still preserve important patterns.',
      detail:
        'There are two common approaches:\n\n1. Feature Selection: Select a smaller subset of the original features. For example, keep 10 useful features out of 50.\n2. Feature Extraction: Create new features by transforming the original features. For example, PCA creates new directions called principal components.\n\nPrincipal Component Analysis (PCA) is a popular linear dimensionality reduction technique.\n\nPCA works by:\n\n1. Finding directions that capture the greatest variation in the data.\n2. Creating new components from the original features.\n3. Ranking components by the amount of variance they explain.\n4. Keeping a selected number of components.\n\nThe explained variance ratio tells us how much of the original data variation is represented by each component.',
      realLife: {
        problem:
          'A research team has a dataset containing 100 measurements for every sample and wants to visualize similarities between observations.',
        approach: [
          'Inspect the dataset and prepare the numerical features.',
          'Standardize features where appropriate.',
          'Apply PCA to transform the original features.',
          'Keep two principal components for visualization.',
          'Inspect explained variance to understand how much information is retained.',
        ],
        outcome:
          'The research team can visualize high-dimensional observations in two dimensions and explore possible patterns.',
      },
      tasks: [
        'Create a dataset with several numerical features and apply PCA.',
        'Compare the explained variance of the first two and first three principal components.',
        'Apply PCA to a high-dimensional dataset and visualize observations using two principal components.',
      ],
      code: `import pandas as pd
import matplotlib.pyplot as plt

from sklearn.datasets import load_iris
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA

iris = load_iris()

X = pd.DataFrame(
    iris.data,
    columns=iris.feature_names
)

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

pca = PCA(n_components=2)

X_reduced = pca.fit_transform(X_scaled)

reduced_df = pd.DataFrame(
    X_reduced,
    columns=["PC1", "PC2"]
)

print(reduced_df.head())

print(
    "Explained variance ratio:",
    pca.explained_variance_ratio_
)

print(
    "Total variance retained:",
    pca.explained_variance_ratio_.sum()
)

plt.scatter(
    reduced_df["PC1"],
    reduced_df["PC2"],
    c=iris.target
)

plt.xlabel("Principal Component 1")
plt.ylabel("Principal Component 2")
plt.title("PCA - Dimensionality Reduction")
plt.show()`,
      pitfalls: [
        'Assuming dimensionality reduction always improves model performance.',
        'Applying PCA to features with very different scales without considering standardization.',
        'Assuming principal components have the same direct meaning as the original features.',
        'Keeping too few components and losing important information.',
        'Confusing feature selection with feature extraction.',
        'Fitting PCA on the complete dataset before splitting when building a predictive workflow. Fit PCA on training data only using a Pipeline.',
      ],
      questions: [
        {
          q: 'What is dimensionality reduction?',
          a: 'It is the process of reducing the number of features or dimensions while trying to preserve important information.',
        },
        {
          q: 'What is PCA?',
          a: 'Principal Component Analysis is a linear dimensionality reduction technique that transforms original features into principal components ordered by the amount of variance they explain.',
        },
        {
          q: 'What is the difference between feature selection and feature extraction?',
          a: 'Feature selection keeps a subset of existing features, whereas feature extraction creates new transformed features from the original ones.',
        },
        {
          q: 'Why is PCA used?',
          a: 'PCA is used to reduce dimensionality, summarize correlated features, reduce computation, and visualize high-dimensional data.',
        },
        {
          q: 'What is explained variance ratio?',
          a: 'It indicates the proportion of total variance in the original data explained by a principal component.',
        },
      ],
    }),

    lesson({
      slug: 'anomaly-detection',
      title: 'Anomaly Detection',
      summary:
        'Learn how to identify observations that behave differently from the normal patterns in a dataset.',
      definition:
        'Anomaly Detection is the process of identifying observations, events, or patterns that differ significantly from expected behavior. These unusual observations are called anomalies or outliers.',
      why:
        'Unusual observations can indicate fraud, equipment failure, security threats, data-entry errors, or unexpected business activity. Detecting them helps organizations investigate possible problems.',
      purpose:
        'The purpose is to identify unusual observations that may require investigation or special handling.',
      when: [
        'When detecting unusual financial transactions.',
        'When identifying suspicious login activity.',
        'When monitoring machines for possible failures.',
        'When identifying unusual network traffic.',
        'When checking datasets for unexpected observations.',
      ],
      simpleExample:
        'Imagine a customer usually spends between ₹500 and ₹2,000 per transaction.\n\nOne day, the same account makes a transaction of ₹100,000.\n\nAn anomaly detection system may identify this transaction as unusual because it is very different from the customer’s normal behavior.\n\nHowever, an unusual transaction is not automatically fraud. It needs further investigation.',
      detail:
        'Common anomaly detection approaches include:\n\n1. Statistical methods: Use techniques such as Z-scores or the Interquartile Range (IQR) to identify unusual values.\n2. Distance-based methods: Identify observations that are far away from their neighbors.\n3. Density-based methods: Identify observations in unusually low-density regions, such as Local Outlier Factor (LOF).\n4. Isolation-based methods: Use algorithms such as Isolation Forest, which isolate unusual observations more quickly than typical ones.\n\nThree common types of anomalies:\n\n- Point anomaly: One observation is unusual compared with the rest.\n- Contextual anomaly: An observation is unusual in a particular situation, such as high electricity usage at night.\n- Collective anomaly: A group or sequence of observations is unusual even if individual observations look normal.\n\nAnomaly detection can be supervised, semi-supervised, or unsupervised depending on the availability of reliable anomaly labels.',
      realLife: {
        problem:
          'A bank wants to identify suspicious transactions that differ from normal customer behavior.',
        approach: [
          'Collect historical transaction information.',
          'Prepare features such as transaction amount, frequency, and time.',
          'Apply an Isolation Forest model.',
          'Generate anomaly scores and flag unusual observations.',
          'Investigate flagged transactions using additional evidence.',
        ],
        outcome:
          'The bank can prioritize unusual transactions for further review and potentially identify suspicious activity earlier.',
      },
      tasks: [
        'Create a numerical dataset and use the IQR method to identify unusual observations.',
        'Apply Isolation Forest to a dataset and inspect the observations predicted as anomalies.',
        'Build an anomaly detection workflow using transaction-like data and explain why flagged records need investigation rather than automatic rejection.',
      ],
      code: `import pandas as pd
import matplotlib.pyplot as plt

from sklearn.ensemble import IsolationForest

data = {
    "amount": [
        500, 600, 700, 550, 800,
        650, 750, 900, 1000, 850,
        1200, 1100, 950, 700, 50000
    ]
}

df = pd.DataFrame(data)

model = IsolationForest(
    contamination=0.1,
    random_state=42
)

df["anomaly"] = model.fit_predict(df[["amount"]])

df["status"] = df["anomaly"].map({
    1: "Normal",
    -1: "Anomaly"
})

print(df)

anomalies = df[df["anomaly"] == -1]

print("Detected anomalies:")
print(anomalies)

plt.scatter(
    df.index,
    df["amount"],
    c=df["anomaly"]
)

plt.xlabel("Transaction Index")
plt.ylabel("Transaction Amount")
plt.title("Anomaly Detection")
plt.show()`,
      pitfalls: [
        'Assuming every unusual observation is an error or fraudulent transaction.',
        'Ignoring business context when deciding what is anomalous.',
        'Choosing the contamination parameter without understanding the expected anomaly proportion.',
        'Evaluating anomaly detection only with accuracy when anomaly labels are highly imbalanced.',
        'Using only one feature when unusual behavior depends on several variables.',
        'Assuming an unsupervised algorithm knows which observations are truly fraudulent.',
      ],
      questions: [
        {
          q: 'What is anomaly detection?',
          a: 'Anomaly detection is the process of identifying observations or patterns that differ significantly from normal behavior.',
        },
        {
          q: 'What is an outlier?',
          a: 'An outlier is an observation that is unusually far from the general pattern of the data. It may be an error, a rare valid observation, or an important unusual event.',
        },
        {
          q: 'What is Isolation Forest?',
          a: 'Isolation Forest is an anomaly detection algorithm that uses random decision trees to isolate observations. Unusual observations often require fewer splits to isolate.',
        },
        {
          q: 'What is the difference between clustering and anomaly detection?',
          a: 'Clustering groups similar observations together, while anomaly detection focuses on finding observations that differ from expected patterns.',
        },
        {
          q: 'What are point, contextual, and collective anomalies?',
          a: 'A point anomaly is one unusual observation. A contextual anomaly is unusual in a particular situation. A collective anomaly is an unusual group or sequence of observations.',
        },
        {
          q: 'Can anomaly detection work without labeled data?',
          a: 'Yes. Unsupervised methods such as Isolation Forest and Local Outlier Factor can identify unusual observations without predefined anomaly labels.',
        },
      ],
    }),
  ],
}

export default ch
