
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
          'Understand the basic concept and explain it using a simple example.',
      },
      {
        id: `${data.slug}-task-2`,
        title: 'Compare',
        difficulty: 'medium',
        task: data.tasks[1],
        expectedOutcome:
          'Compare the concept with related Machine Learning and Deep Learning concepts.',
      },
      {
        id: `${data.slug}-task-3`,
        title: 'Apply it',
        difficulty: 'hard',
        task: data.tasks[2],
        expectedOutcome:
          'Apply the concept to a realistic problem and explain the approach and results.',
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
  id: 'deep-learning-tensorflow',
  number: 18,
  title: 'Introduction to Deep Learning & TensorFlow',
  tagline:
    'Understand Artificial Intelligence, Machine Learning, Deep Learning and the tools used to build neural networks.',
  priority: 'extreme',

  topics: [
    lesson({
      slug: 'artificial-intelligence',
      title: 'Artificial Intelligence (AI)',
      summary:
        'Understand how computers can perform tasks that normally require human intelligence.',
      definition:
        'Artificial Intelligence is the broader field of creating computer systems that can perform tasks that normally require human intelligence, such as understanding language, recognising images, solving problems and making decisions.',
      why:
        'AI helps computers perform useful intelligent tasks that would otherwise require significant human effort. It is used in many modern applications, including chatbots, recommendation systems and virtual assistants.',
      purpose:
        'Its purpose is to develop systems that can perform tasks such as reasoning, understanding, problem-solving, learning and decision-making.',
      when: [
        'When building systems that understand human language.',
        'When developing virtual assistants and chatbots.',
        'When creating systems that recognise images or speech.',
        'When automating tasks that involve intelligent decisions.',
      ],
      simpleExample:
        'Imagine asking a chatbot, "What is Machine Learning?" The chatbot processes your question and generates an understandable answer. This is an example of an AI application.',
      detail:
        'Artificial Intelligence is a broad field. It includes rule-based systems, search and planning methods, Machine Learning and Deep Learning. Not every AI system learns from data. Some systems follow rules written by developers.',
      realLife: {
        problem:
          'A company receives thousands of customer questions every day and wants to provide automatic responses.',
        approach: [
          'Build an AI-powered chatbot.',
          'Allow customers to enter questions in natural language.',
          'Use language-processing techniques to understand the questions.',
          'Generate or retrieve suitable answers.',
          'Provide the response to the customer.',
        ],
        outcome:
          'The company can automatically answer many common customer questions and reduce repetitive manual work.',
      },
      tasks: [
        'Write down five examples of AI applications that you use in everyday life.',
        'Compare a rule-based chatbot with an AI-powered chatbot.',
        'Choose a real-world problem and explain how an AI system could help solve it.',
      ],
      questions: [
        {
          q: 'What is Artificial Intelligence?',
          a: 'Artificial Intelligence is the field of creating computer systems that can perform tasks that normally require human intelligence.',
        },
        {
          q: 'Is Machine Learning part of Artificial Intelligence?',
          a: 'Yes. Machine Learning is a subfield of Artificial Intelligence that allows computers to learn patterns from data.',
        },
        {
          q: 'Does every AI system use Machine Learning?',
          a: 'No. Some AI systems use predefined rules, search algorithms or planning methods without learning from data.',
        },
        {
          q: 'Give some examples of Artificial Intelligence.',
          a: 'Virtual assistants, chatbots, image recognition systems, recommendation systems and speech recognition applications are examples of AI applications.',
        },
      ],
      pitfalls: [
        'Do not assume that AI and Machine Learning mean exactly the same thing.',
        'Not every AI system uses neural networks.',
        'AI does not necessarily mean that a computer thinks exactly like a human.',
      ],
    }),

    lesson({
      slug: 'machine-learning',
      title: 'Machine Learning (ML)',
      summary:
        'Understand how computers learn patterns from data and use them to make predictions.',
      definition:
        'Machine Learning is a subfield of Artificial Intelligence in which algorithms learn patterns from data and use those patterns to make predictions, classifications or discover useful structures.',
      why:
        'Machine Learning allows computers to learn from examples instead of requiring developers to manually write every rule for every situation.',
      purpose:
        'Its purpose is to build models that can learn from existing data and use what they learned to make predictions or identify patterns in new data.',
      when: [
        'When predicting house prices using historical data.',
        'When identifying spam emails.',
        'When predicting whether a customer may leave a company.',
        'When grouping customers based on their behaviour.',
        'When making recommendations based on previous activity.',
      ],
      simpleExample:
        'Imagine you want to predict house prices. You provide historical information such as house size, number of bedrooms and actual prices. The Machine Learning algorithm learns the relationship between these features and prices. It can then predict the price of a new house.',
      detail:
        'A typical supervised Machine Learning workflow contains input features, target values, a learning algorithm and a trained model. During training, the algorithm learns patterns from examples. After training, the model can make predictions for new records.',
      realLife: {
        problem:
          'A real estate company wants to estimate house prices using information about previously sold houses.',
        approach: [
          'Collect historical house information and prices.',
          'Clean the data and prepare useful features.',
          'Choose a suitable algorithm such as Linear Regression.',
          'Train the model using historical examples.',
          'Evaluate predictions using unseen testing data.',
          'Use the trained model to estimate new house prices.',
        ],
        outcome:
          'The company receives estimated house prices based on patterns learned from historical sales data.',
      },
      tasks: [
        'Create a small dataset containing house size and house price.',
        'Compare Linear Regression and Decision Tree Regression on the same dataset.',
        'Build a house price prediction model using a real dataset and evaluate its predictions.',
      ],
      questions: [
        {
          q: 'What is Machine Learning?',
          a: 'Machine Learning is a part of AI where algorithms learn patterns from data and use those patterns to make predictions or discover useful structures.',
        },
        {
          q: 'How does a Machine Learning model learn?',
          a: 'The model uses training data to learn patterns or relationships. Its learning process depends on the algorithm being used.',
        },
        {
          q: 'What are the main types of Machine Learning?',
          a: 'The commonly taught categories are supervised learning, unsupervised learning and reinforcement learning.',
        },
        {
          q: 'Give an example of Machine Learning.',
          a: 'A house price prediction model that learns from historical house sizes and prices is an example of Machine Learning.',
        },
      ],
      code: `from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error

X = [[500], [800], [1000], [1200], [1500], [1800]]
y = [25, 40, 55, 65, 80, 95]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.33,
    random_state=42
)

model = LinearRegression()

model.fit(X_train, y_train)

predictions = model.predict(X_test)

print("Predictions:", predictions)
print("Actual values:", y_test)
print("MAE:", mean_absolute_error(y_test, predictions))`,
      pitfalls: [
        'Machine Learning does not guarantee correct predictions.',
        'Poor-quality training data can produce poor models.',
        'Do not evaluate a model only on its training data.',
        'Machine Learning is broader than Deep Learning.',
      ],
    }),

    lesson({
      slug: 'deep-learning',
      title: 'Deep Learning (DL)',
      summary:
        'Understand how multi-layer neural networks learn complex patterns from data.',
      definition:
        'Deep Learning is a subfield of Machine Learning that uses neural networks containing multiple layers to learn complex patterns from data.',
      why:
        'Deep Learning can learn useful features automatically from large and complex datasets, such as images, audio and text. This makes it useful for tasks where manually designing all the features is difficult.',
      purpose:
        'Its purpose is to learn complex relationships and representations using neural networks with multiple layers.',
      when: [
        'When recognising objects in images.',
        'When identifying faces in photographs.',
        'When converting speech into text.',
        'When processing natural language.',
        'When working with large and complex datasets.',
      ],
      simpleExample:
        'Imagine teaching a computer to recognise cats. The neural network learns simple patterns such as edges, then shapes and textures, and eventually more complex visual patterns. It uses these learned patterns to predict whether a new image contains a cat.',
      detail:
        'A neural network contains an input layer, one or more hidden layers and an output layer. During training, information passes through the network to generate predictions. The model calculates its error and uses backpropagation and an optimization algorithm to update its learnable weights.',
      realLife: {
        problem:
          'A company wants to build an application that recognises objects in photographs.',
        approach: [
          'Collect a large collection of labelled images.',
          'Prepare and preprocess the images.',
          'Build a neural network, such as a Convolutional Neural Network.',
          'Train the network using the labelled images.',
          'Evaluate its performance using unseen images.',
          'Use the trained network to recognise objects in new photographs.',
        ],
        outcome:
          'The application can identify objects in photographs based on visual patterns learned during training.',
      },
      tasks: [
        'Explain the difference between Machine Learning and Deep Learning using a house price prediction and image recognition example.',
        'Draw a simple neural network containing an input layer, two hidden layers and an output layer.',
        'Build a basic neural network for classifying handwritten digits using a labelled image dataset.',
      ],
      questions: [
        {
          q: 'What is Deep Learning?',
          a: 'Deep Learning is a part of Machine Learning that uses neural networks with multiple layers to learn complex patterns from data.',
        },
        {
          q: 'What is a neural network?',
          a: 'A neural network is a computational model made of connected units arranged in layers. It learns patterns by adjusting its weights during training.',
        },
        {
          q: 'Why is Deep Learning useful for image recognition?',
          a: 'Deep Learning models can learn visual features such as edges, textures, shapes and objects from image data.',
        },
        {
          q: 'What is the difference between Machine Learning and Deep Learning?',
          a: 'Machine Learning includes many types of algorithms. Deep Learning is a part of Machine Learning that uses multi-layer neural networks.',
        },
      ],
      pitfalls: [
        'Deep Learning does not always perform better than traditional Machine Learning.',
        'Deep Learning often needs more data and computing resources.',
        'A neural network with more layers is not automatically a better model.',
        'Deep Learning models can overfit if they are not trained and evaluated carefully.',
      ],
    }),

    lesson({
      slug: 'ai-vs-machine-learning-vs-deep-learning',
      title: 'Difference Between AI, ML and DL',
      summary:
        'Understand how Artificial Intelligence, Machine Learning and Deep Learning are related.',
      definition:
        'Artificial Intelligence is the broadest field. Machine Learning is a subfield of AI that learns from data. Deep Learning is a subfield of Machine Learning that uses multi-layer neural networks.',
      why:
        'Understanding the relationship helps you identify which technology is being used to solve a particular problem and prevents confusion between these commonly used terms.',
      purpose:
        'Its purpose is to explain the hierarchy and differences between AI, ML and DL.',
      when: [
        'When learning Artificial Intelligence and Machine Learning.',
        'When choosing an approach for a real-world problem.',
        'When preparing for Data Science and Machine Learning interviews.',
        'When explaining how modern AI applications work.',
      ],
      simpleExample:
        'Imagine a computer system that recognises handwritten digits. AI describes the overall intelligent task. ML describes learning patterns from labelled examples. DL describes using a multi-layer neural network to learn visual features and recognise the digits.',
      detail:
        'Think of three nested categories. AI contains ML, and ML contains DL. Not every AI system uses Machine Learning, and not every Machine Learning model uses Deep Learning. For example, a Decision Tree is a Machine Learning algorithm but not a Deep Learning neural network.',
      realLife: {
        problem:
          'A student is confused about whether a chatbot, house price prediction model and image recognition system are AI, ML or DL.',
        approach: [
          'Identify the overall intelligent task.',
          'Check whether the system learns patterns from data.',
          'Check whether it uses a neural network with multiple layers.',
          'Classify the system based on these characteristics.',
        ],
        outcome:
          'The student understands that AI is the broader field, ML is a part of AI, and DL is a part of ML.',
      },
      tasks: [
        'Write one simple definition each for AI, ML and DL.',
        'Compare a rule-based chatbot, a house price prediction model and a neural network image classifier.',
        'Choose five real-world applications and explain whether they use AI, ML or DL, and why.',
      ],
      questions: [
        {
          q: 'What is the relationship between AI, ML and DL?',
          a: 'Deep Learning is a subset of Machine Learning, and Machine Learning is a subset of Artificial Intelligence.',
        },
        {
          q: 'Is Deep Learning a part of Machine Learning?',
          a: 'Yes. Deep Learning is a type of Machine Learning that uses neural networks with multiple layers.',
        },
        {
          q: 'Can AI exist without Machine Learning?',
          a: 'Yes. AI systems can use predefined rules, search, planning and other techniques without learning from data.',
        },
        {
          q: 'Is every Machine Learning model a neural network?',
          a: 'No. Decision Trees, Random Forests, Linear Regression and Support Vector Machines are examples of Machine Learning methods that are not neural networks.',
        },
      ],
      pitfalls: [
        'Do not use AI, ML and DL as interchangeable terms.',
        'Do not assume every AI application uses Deep Learning.',
        'Remember that Deep Learning is a subset of Machine Learning.',
      ],
    }),

    lesson({
      slug: 'introduction-to-tensorflow',
      title: 'Introduction to TensorFlow',
      summary:
        'Understand what TensorFlow is and how it helps developers build and train Deep Learning models.',
      definition:
        'TensorFlow is an open-source software framework for numerical computation and Machine Learning. It provides tools for building, training, evaluating and deploying Machine Learning and Deep Learning models.',
      why:
        'Building neural networks involves many mathematical operations. TensorFlow provides ready-to-use tools for these operations, automatic differentiation and model training.',
      purpose:
        'Its purpose is to make it easier to create, train and use Machine Learning and Deep Learning models.',
      when: [
        'When building neural networks.',
        'When training image classification models.',
        'When developing speech recognition applications.',
        'When working with numerical tensors and automatic differentiation.',
        'When building and deploying Deep Learning applications.',
      ],
      simpleExample:
        'Imagine you want to recognise handwritten digits. TensorFlow provides tools to create a neural network, train it using labelled images and use the trained model to recognise digits in new images.',
      detail:
        'TensorFlow provides tensors for representing numerical data, mathematical operations, automatic differentiation for calculating gradients, and APIs such as Keras for building and training neural networks.',
      realLife: {
        problem:
          'A developer wants to build a handwritten digit recognition application.',
        approach: [
          'Collect a labelled handwritten digit dataset.',
          'Prepare the images and their labels.',
          'Create a neural network using TensorFlow and Keras.',
          'Compile the model with a suitable loss function and optimizer.',
          'Train the model using the training images.',
          'Evaluate the model using testing images.',
          'Save the trained model for later use.',
        ],
        outcome:
          'The developer builds a trained neural network that can predict handwritten digits in new images.',
      },
      tasks: [
        'Install TensorFlow and check its version using Python.',
        'Create a basic Keras Sequential model containing two Dense layers.',
        'Build and train a handwritten digit classification model using TensorFlow and evaluate its accuracy.',
      ],
      questions: [
        {
          q: 'What is TensorFlow?',
          a: 'TensorFlow is an open-source framework used for numerical computation and building, training and deploying Machine Learning and Deep Learning models.',
        },
        {
          q: 'Why do we use TensorFlow?',
          a: 'It provides tools for tensor operations, automatic differentiation and neural network development, making Deep Learning workflows easier to implement.',
        },
        {
          q: 'Can TensorFlow be used for image recognition?',
          a: 'Yes. TensorFlow can be used to build and train neural networks for image classification, object detection and other computer vision tasks.',
        },
        {
          q: 'What is the relationship between TensorFlow and Deep Learning?',
          a: 'Deep Learning is an approach based on multi-layer neural networks. TensorFlow is a framework that can be used to implement and train those networks.',
        },
      ],
      code: `import tensorflow as tf

print("TensorFlow version:", tf.__version__)

model = tf.keras.Sequential([
    tf.keras.layers.Input(shape=(4,)),
    tf.keras.layers.Dense(16, activation="relu"),
    tf.keras.layers.Dense(1, activation="sigmoid")
])

model.summary()`,
      pitfalls: [
        'TensorFlow is a framework, not a Machine Learning algorithm.',
        'Creating a model does not automatically train it.',
        'A model needs suitable input data, a loss function and an optimizer for training.',
        'Choose an output layer and loss function that match the prediction problem.',
      ],
    }),

    lesson({
      slug: 'introduction-to-keras',
      title: 'Introduction to Keras',
      summary:
        'Learn how Keras makes creating and training neural networks easier.',
      definition:
        'Keras is a high-level Deep Learning API that provides a simple way to create, configure, train and evaluate neural networks. It is commonly used through tf.keras in TensorFlow workflows.',
      why:
        'Writing every neural network operation manually can be complicated. Keras provides reusable layers and training methods that make neural network development easier.',
      purpose:
        'Its purpose is to simplify the process of designing, training and evaluating neural network models.',
      when: [
        'When creating a basic neural network.',
        'When stacking multiple neural network layers.',
        'When configuring loss functions and optimizers.',
        'When training and evaluating Deep Learning models.',
      ],
      simpleExample:
        'Imagine building a neural network using building blocks. Keras provides ready-made layers that you can connect together to create a model.',
      detail:
        'The Keras Sequential API is useful when layers can be arranged in a simple sequence. You define the layers, compile the model with a loss function and optimizer, and train it using fit().',
      realLife: {
        problem:
          'A student wants to create a neural network that predicts whether a customer will purchase a product.',
        approach: [
          'Prepare numerical input features and target labels.',
          'Create a Sequential model.',
          'Add suitable Dense layers.',
          'Compile the model using an optimizer and loss function.',
          'Train the model using fit().',
          'Evaluate its performance using test data.',
        ],
        outcome:
          'The student creates a trained neural network using a straightforward layer-based workflow.',
      },
      tasks: [
        'Create a Sequential model with one hidden Dense layer.',
        'Add an output layer and understand the role of its activation function.',
        'Build, compile, train and evaluate a basic binary classification neural network.',
      ],
      questions: [
        {
          q: 'What is Keras?',
          a: 'Keras is a high-level Deep Learning API used to build, train and evaluate neural networks.',
        },
        {
          q: 'What is a Sequential model?',
          a: 'It is a Keras model in which layers are arranged one after another in a sequence.',
        },
        {
          q: 'What does Dense mean in Keras?',
          a: 'Dense is a fully connected neural network layer in which each output unit receives input from all units in the previous layer.',
        },
        {
          q: 'What is the difference between TensorFlow and Keras?',
          a: 'TensorFlow is a broader Machine Learning framework. Keras provides a high-level API for building and training neural networks, commonly through TensorFlow.',
        },
      ],
      code: `import tensorflow as tf

model = tf.keras.Sequential([
    tf.keras.layers.Input(shape=(4,)),
    tf.keras.layers.Dense(16, activation="relu"),
    tf.keras.layers.Dense(8, activation="relu"),
    tf.keras.layers.Dense(1, activation="sigmoid")
])

model.compile(
    optimizer="adam",
    loss="binary_crossentropy",
    metrics=["accuracy"]
)

model.summary()`,
      pitfalls: [
        'Choose an output layer that matches the task.',
        'Binary classification commonly uses a sigmoid output and binary cross-entropy loss.',
        'Multiclass classification commonly uses softmax with a suitable multiclass loss.',
        'A model must be compiled before training with fit().',
      ],
    }),
  ],
}

export default ch
