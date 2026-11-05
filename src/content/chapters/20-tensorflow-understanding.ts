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
          'Understand the basic concept and explain how it works.',
      },
      {
        id: `${data.slug}-task-2`,
        title: 'Compare',
        difficulty: 'medium',
        task: data.tasks[1],
        expectedOutcome:
          'Compare model behavior and interpret the results.',
      },
      {
        id: `${data.slug}-task-3`,
        title: 'Apply it',
        difficulty: 'hard',
        task: data.tasks[2],
        expectedOutcome:
          'Apply the concept to a realistic dataset, evaluate the result, and explain its limitations.',
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
  id: 'tensorflow',
  number: 20,
  title: 'TensorFlow',
  tagline:
    'Learn how to build, train, evaluate, visualize, and export deep learning models using TensorFlow.',
  priority: 'extreme',
  topics: [
    lesson({
      slug: 'introduction-and-installation',
      title: 'Introduction and Installation',
      summary:
        'Understand what TensorFlow is, why it is used, and how to install it in Python.',
      definition:
        'TensorFlow is an open-source machine learning framework. It helps developers create and train machine learning and deep learning models. It provides tools for working with numerical data, tensors, neural networks, and model deployment.',
      why:
        'Building neural networks requires mathematical operations, data processing, automatic differentiation, and model training. TensorFlow provides these tools in one framework, so developers do not need to implement everything manually.',
      purpose:
        'The purpose of TensorFlow is to make it easier to build, train, evaluate, and deploy machine learning models.',
      when: [
        'When building neural networks and deep learning models.',
        'When working with image, text, audio, or numerical data.',
        'When training models using CPUs, GPUs, or supported accelerators.',
        'When preparing models for production applications.',
      ],
      simpleExample:
        'Imagine building an application that recognizes cats and dogs from photographs. TensorFlow provides the tools to prepare images, build a neural network, train it, and use it to predict whether a new image contains a cat or a dog.',
      detail:
        'TensorFlow is the framework that provides the mathematical and computational tools. Keras provides a convenient high-level interface for creating neural networks. You can use TensorFlow operations directly or build models through tf.keras.',
      realLife: {
        problem:
          'A company wants to develop an application that recognizes objects in uploaded photographs.',
        approach: [
          'Collect and prepare labeled images.',
          'Use TensorFlow and Keras to create a neural network.',
          'Train the model using the prepared images.',
          'Evaluate the model using images it has not seen during training.',
        ],
        outcome:
          'The application can use the trained model to recognize objects in new photographs.',
      },
      tasks: [
        'Explain TensorFlow in your own words and identify three applications of it.',
        'Install TensorFlow and check its version in Python.',
        'Create a Python environment, install TensorFlow, and run a small tensor calculation.',
      ],
      questions: [
        {
          q: 'What is TensorFlow?',
          a: 'TensorFlow is an open-source framework used to build, train, and deploy machine learning and deep learning models.',
          followUp:
            'It provides tensor operations, automatic differentiation, neural network tools, and support for different computing devices.',
        },
        {
          q: 'Why is TensorFlow used in deep learning?',
          a: 'It provides tools to perform mathematical operations, build neural networks, calculate gradients, and train models efficiently.',
        },
        {
          q: 'What is the relationship between TensorFlow and Keras?',
          a: 'TensorFlow is a machine learning framework, while Keras is a high-level API commonly used with TensorFlow to build and train neural networks.',
        },
      ],
      code: `import tensorflow as tf

print("TensorFlow version:", tf.__version__)

# Create two tensors
a = tf.constant([10, 20, 30])
b = tf.constant([1, 2, 3])

# Perform an operation
result = tf.add(a, b)

print(result.numpy())`,
      pitfalls: [
        'TensorFlow is a framework, not a machine learning algorithm.',
        'Installing TensorFlow does not automatically create a trained model.',
        'GPU support depends on compatible hardware, drivers, and software versions.',
        'Use a virtual environment to keep project dependencies separate.',
      ],
    }),

    lesson({
      slug: 'tensorflow-basics',
      title: 'TensorFlow Basics',
      summary:
        'Learn the basic TensorFlow workflow and understand constants, variables, operations, and automatic calculations.',
      definition:
        'TensorFlow basics are the fundamental features used to perform calculations and build machine learning models. These include tensors, variables, mathematical operations, and automatic differentiation.',
      why:
        'Before building a neural network, you need to understand how TensorFlow stores data and performs calculations. These basic operations are the foundation of model training.',
      purpose:
        'The purpose is to become comfortable with TensorFlow objects and operations before using them to build neural networks.',
      when: [
        'When starting a TensorFlow project.',
        'When performing mathematical operations on data.',
        'When creating values that a model needs to learn.',
        'When understanding how TensorFlow calculates gradients.',
      ],
      simpleExample:
        'Think of TensorFlow as a calculator that can work with large collections of numbers. You can create values, add them, multiply them, and calculate how a result changes when an input changes.',
      detail:
        'A constant stores a value that is not updated during normal model training. A Variable stores a value that can be updated, such as a neural network weight. TensorFlow operations perform calculations on these values. GradientTape can record calculations and calculate gradients.',
      realLife: {
        problem:
          'A developer wants to calculate and update numerical values while training a neural network.',
        approach: [
          'Create input values using TensorFlow constants.',
          'Create trainable parameters using TensorFlow variables.',
          'Perform mathematical operations.',
          'Calculate gradients when required.',
        ],
        outcome:
          'The developer understands the basic operations used internally during model training.',
      },
      tasks: [
        'Create a TensorFlow constant and print its value.',
        'Create two variables and perform addition, subtraction, and multiplication.',
        'Use GradientTape to calculate the gradient of a mathematical expression.',
      ],
      questions: [
        {
          q: 'What are the basic building blocks of TensorFlow?',
          a: 'Tensors, variables, operations, and automatic differentiation are important basic building blocks.',
        },
        {
          q: 'What is the difference between a constant and a variable?',
          a: 'A constant represents a value that is not updated during normal execution. A variable stores a value that can be updated, such as a trainable model weight.',
        },
        {
          q: 'What is GradientTape?',
          a: 'GradientTape records operations performed during a calculation and can calculate gradients using automatic differentiation.',
        },
      ],
      code: `import tensorflow as tf

# Constant
a = tf.constant(10)

# Variable
b = tf.Variable(5.0)

# Mathematical operations
addition = a + b
multiplication = a * b

print("Addition:", addition.numpy())
print("Multiplication:", multiplication.numpy())

# Automatic differentiation
x = tf.Variable(3.0)

with tf.GradientTape() as tape:
    y = x ** 2

gradient = tape.gradient(y, x)

print("Gradient:", gradient.numpy())`,
      pitfalls: [
        'A constant and a variable are not interchangeable.',
        'A TensorFlow Variable does not automatically become trainable in every situation.',
        'GradientTape calculates gradients; it does not automatically update model weights.',
        'TensorFlow tensors are immutable, while variables support updates.',
      ],
    }),

    lesson({
      slug: 'tensors-and-operations',
      title: 'Tensors and Operations',
      summary:
        'Understand tensors, their dimensions, shapes, data types, and mathematical operations.',
      definition:
        'A tensor is a data structure used by TensorFlow to store numerical values. It can represent a single number, a list of numbers, a table of numbers, or data with many dimensions.',
      why:
        'Neural networks process data using numerical calculations. Tensors provide a consistent way to represent input data, model weights, and predictions.',
      purpose:
        'The purpose is to understand how data is represented and manipulated inside TensorFlow.',
      when: [
        'When preparing data for neural networks.',
        'When performing mathematical operations.',
        'When checking input and output shapes.',
        'When working with images, text, and multidimensional data.',
      ],
      simpleExample:
        'A single number such as 10 is a scalar tensor. A list such as [10, 20, 30] is a one-dimensional tensor. A table of numbers is a two-dimensional tensor.',
      detail:
        'Tensor rank describes the number of dimensions. Shape describes the size along each dimension. Data type describes the kind of values stored, such as float32 or int32. TensorFlow provides operations such as add, multiply, reshape, reduce_sum, and matrix multiplication.',
      realLife: {
        problem:
          'An image recognition model needs image data represented in a numerical format.',
        approach: [
          'Load the image as numerical pixel values.',
          'Represent the image as a tensor.',
          'Check the tensor shape and data type.',
          'Perform operations to prepare the image for the model.',
        ],
        outcome:
          'The image becomes numerical input that a neural network can process.',
      },
      tasks: [
        'Create scalar, one-dimensional, and two-dimensional tensors.',
        'Check the rank, shape, and data type of different tensors.',
        'Create a three-dimensional tensor and perform reshape, addition, and matrix multiplication.',
      ],
      questions: [
        {
          q: 'What is a tensor?',
          a: 'A tensor is a multidimensional data structure used to store and process numerical values.',
        },
        {
          q: 'What is tensor rank?',
          a: 'Tensor rank is the number of dimensions in a tensor. A scalar has rank 0, a vector has rank 1, and a matrix has rank 2.',
        },
        {
          q: 'What is the difference between shape and rank?',
          a: 'Rank tells how many dimensions a tensor has. Shape tells the size of the tensor along each dimension.',
        },
      ],
      code: `import tensorflow as tf

# Scalar: rank 0
scalar = tf.constant(10)

# Vector: rank 1
vector = tf.constant([10, 20, 30])

# Matrix: rank 2
matrix = tf.constant([
    [1, 2],
    [3, 4]
])

print("Scalar:", scalar.numpy())
print("Vector:", vector.numpy())
print("Matrix:", matrix.numpy())

print("Vector rank:", tf.rank(vector).numpy())
print("Matrix shape:", matrix.shape)

# Addition
a = tf.constant([1, 2, 3])
b = tf.constant([4, 5, 6])

print("Addition:", tf.add(a, b).numpy())

# Matrix multiplication
result = tf.matmul(matrix, matrix)
print("Matrix multiplication:")
print(result.numpy())

# Reshape
reshaped = tf.reshape(vector, (3, 1))
print("Reshaped tensor:")
print(reshaped.numpy())`,
      pitfalls: [
        'Rank and shape describe different properties.',
        'Tensor shapes must be compatible for many operations.',
        'Matrix multiplication has different rules from element-wise multiplication.',
        'Neural networks commonly use floating-point input values.',
      ],
    }),

    lesson({
      slug: 'neural-networks',
      title: 'Neural Networks',
      summary:
        'Understand how neural networks learn patterns from data using connected artificial neurons.',
      definition:
        'A neural network is a machine learning model made up of connected artificial neurons arranged in layers. It learns patterns by adjusting weights and biases during training.',
      why:
        'Neural networks can learn complex relationships that may be difficult to represent using simple mathematical rules. They are widely used for images, text, speech, and prediction tasks.',
      purpose:
        'The purpose is to learn patterns from examples and use those learned patterns to make predictions on new data.',
      when: [
        'When solving image classification problems.',
        'When working with text and speech.',
        'When learning complex relationships in numerical data.',
        'When simpler machine learning models do not provide sufficient performance.',
      ],
      simpleExample:
        'Imagine predicting whether a student will pass an examination. A neural network receives study hours and attendance as inputs, processes them through hidden layers, and produces a pass or fail prediction.',
      detail:
        'A neural network typically has an input layer, one or more hidden layers, and an output layer. Each neuron calculates a weighted sum of its inputs, adds a bias, and applies an activation function. During training, the model adjusts its weights to reduce prediction error.',
      realLife: {
        problem:
          'An online learning platform wants to predict whether a student is likely to pass a course.',
        approach: [
          'Collect study hours, attendance, and previous assessment scores.',
          'Provide the data to a neural network.',
          'Train the network using historical student results.',
          'Use the trained model to predict outcomes for new students.',
        ],
        outcome:
          'The platform receives predictions that can help identify students who may need additional support.',
      },
      tasks: [
        'Draw a basic neural network containing input, hidden, and output layers.',
        'Explain the role of weights, biases, and activation functions.',
        'Build a small neural network using TensorFlow and train it on numerical data.',
      ],
      questions: [
        {
          q: 'What is a neural network?',
          a: 'A neural network is a machine learning model made up of connected artificial neurons that learn patterns from data.',
        },
        {
          q: 'What are the main layers of a neural network?',
          a: 'The main layers are the input layer, hidden layers, and output layer.',
        },
        {
          q: 'How does a neural network learn?',
          a: 'It makes predictions, calculates the error using a loss function, calculates gradients through backpropagation, and updates its weights using an optimizer.',
        },
      ],
      code: `import tensorflow as tf

model = tf.keras.Sequential([
    tf.keras.Input(shape=(2,)),
    tf.keras.layers.Dense(8, activation="relu"),
    tf.keras.layers.Dense(1, activation="sigmoid")
])

model.summary()`,
      pitfalls: [
        'A neural network does not automatically understand the meaning of its input data.',
        'More layers do not always produce a better model.',
        'Neural networks can overfit training data.',
        'The output activation and loss function must match the prediction task.',
      ],
    }),

    lesson({
      slug: 'keras',
      title: 'Keras',
      summary:
        'Learn how Keras makes it easier to create, train, and evaluate neural networks.',
      definition:
        'Keras is a high-level deep learning API used to build and train neural networks. It provides ready-to-use components such as layers, models, optimizers, loss functions, and training methods.',
      why:
        'Building neural networks directly with low-level mathematical operations can require a lot of code. Keras simplifies this process by providing reusable building blocks.',
      purpose:
        'The purpose of Keras is to make neural network development easier, faster, and more organized.',
      when: [
        'When creating neural network architectures.',
        'When training classification and regression models.',
        'When experimenting with different layers and optimizers.',
        'When evaluating and saving deep learning models.',
      ],
      simpleExample:
        'Think of Keras as a set of building blocks. Instead of manually writing every calculation for a neural network, you can connect ready-made layers and tell the model how to learn.',
      detail:
        'In TensorFlow projects, you commonly use tf.keras. You define a model, add layers, compile it with an optimizer and loss function, train it using fit(), and evaluate it using evaluate().',
      realLife: {
        problem:
          'A developer needs to build a model that predicts house prices from property information.',
        approach: [
          'Prepare numerical property features.',
          'Create a Keras neural network.',
          'Compile the model with an optimizer and regression loss.',
          'Train and evaluate the model.',
        ],
        outcome:
          'The developer can build and train a neural network without manually implementing every mathematical operation.',
      },
      tasks: [
        'Import tf.keras and create a simple Sequential model.',
        'Create a model with two Dense layers and inspect its summary.',
        'Build, compile, train, and evaluate a small regression model using Keras.',
      ],
      questions: [
        {
          q: 'What is Keras?',
          a: 'Keras is a high-level deep learning API used to build, train, and evaluate neural networks.',
        },
        {
          q: 'Why is Keras used with TensorFlow?',
          a: 'Keras provides a simpler interface for creating neural networks while TensorFlow provides the underlying computational framework.',
        },
        {
          q: 'What are the main steps in a Keras workflow?',
          a: 'Define a model, compile it, train it, evaluate it, and use it to make predictions.',
        },
      ],
      code: `import tensorflow as tf

model = tf.keras.Sequential([
    tf.keras.Input(shape=(3,)),
    tf.keras.layers.Dense(8, activation="relu"),
    tf.keras.layers.Dense(1)
])

model.compile(
    optimizer="adam",
    loss="mean_squared_error",
    metrics=["mae"]
)

model.summary()`,
      pitfalls: [
        'Keras is an API, not a dataset or a trained model.',
        'A model must be compiled before using the standard fit() training workflow.',
        'Choose a loss function that matches the task.',
        'Do not assume that a model with more layers is always better.',
      ],
    }),

    lesson({
      slug: 'sequential-models',
      title: 'Sequential Models',
      summary:
        'Learn how to create neural networks by stacking layers in a simple sequence.',
      definition:
        'A Sequential model is a Keras model in which layers are arranged one after another. The output of one layer becomes the input of the next layer.',
      why:
        'Many beginner neural networks have a simple structure where information flows from the input layer through hidden layers to the output layer. Sequential models make this structure easy to create.',
      purpose:
        'The purpose is to build straightforward neural networks without manually connecting every layer.',
      when: [
        'When building a simple feedforward neural network.',
        'When the model has a single input and a single output path.',
        'When layers can be stacked in a straight sequence.',
        'When learning the basic Keras model-building workflow.',
      ],
      simpleExample:
        'Imagine a production line. The first stage receives raw material, the next stage processes it, and the final stage produces the finished product. In a Sequential model, data moves through layers in the same order.',
      detail:
        'You can create a Sequential model by passing a list of layers to tf.keras.Sequential(). You can also add layers one by one using model.add(). For more complex connections, multiple inputs, or branching paths, use the Keras Functional API instead.',
      realLife: {
        problem:
          'A company wants to predict whether a customer will leave a subscription service.',
        approach: [
          'Provide customer information as input features.',
          'Pass the features through hidden Dense layers.',
          'Use an output layer with a sigmoid activation.',
          'Train the Sequential model using historical customer data.',
        ],
        outcome:
          'The model produces a probability that a customer will leave the service.',
      },
      tasks: [
        'Create a Sequential model with one hidden layer.',
        'Add multiple layers and inspect the model summary.',
        'Build and train a Sequential binary classification model using a small dataset.',
      ],
      questions: [
        {
          q: 'What is a Sequential model?',
          a: 'A Sequential model is a Keras model where layers are arranged in a simple sequence, one after another.',
        },
        {
          q: 'When should you use a Sequential model?',
          a: 'Use it when the neural network has a straightforward single input-to-output path.',
        },
        {
          q: 'What is an alternative to the Sequential API?',
          a: 'The Keras Functional API supports more complex model structures, including multiple inputs, multiple outputs, and branching connections.',
        },
      ],
      code: `import tensorflow as tf

model = tf.keras.Sequential([
    tf.keras.Input(shape=(4,)),
    tf.keras.layers.Dense(16, activation="relu"),
    tf.keras.layers.Dense(8, activation="relu"),
    tf.keras.layers.Dense(1, activation="sigmoid")
])

model.summary()`,
      pitfalls: [
        'Sequential models are not suitable for every neural network architecture.',
        'The first layer must receive data with the correct input shape.',
        'Layers are executed in the order in which they are added.',
        'Use the Functional API when the model requires branching or multiple inputs.',
      ],
    }),

    lesson({
      slug: 'dense-layers',
      title: 'Dense Layers',
      summary:
        'Understand fully connected layers and how neurons use weights and biases to process information.',
      definition:
        'A Dense layer is a neural network layer in which every neuron receives input from every output of the previous layer. It is also called a fully connected layer.',
      why:
        'Dense layers allow a neural network to combine information from input features and learn relationships between them.',
      purpose:
        'The purpose is to transform input values into useful learned representations or final predictions.',
      when: [
        'When building basic feedforward neural networks.',
        'When combining information from multiple input features.',
        'When creating hidden layers.',
        'When producing classification or regression outputs.',
      ],
      simpleExample:
        'Suppose a model receives study hours, attendance, and assignment marks. A Dense layer connects each of these three inputs to its neurons so that the model can learn how they relate to examination performance.',
      detail:
        `A Dense layer calculates a weighted sum of its inputs, adds a bias, and optionally applies an activation function. The units argument controls the number of neurons in the layer. The activation argument controls the function applied to each neuron's output.`,
      realLife: {
        problem: 
          'An education platform wants to predict student performance using multiple input features.',
        approach: [
          'Provide study hours, attendance, and assignment marks as inputs.',
          'Pass the features through a Dense hidden layer.',
          'Apply an activation function such as ReLU.',
          'Use an output Dense layer to predict the result.',
        ],
        outcome:
          'The network learns combinations of student features that help predict performance.',
      },
      tasks: [
        'Create a Dense layer with four neurons.',
        'Compare Dense layers using ReLU, sigmoid, and linear activations.',
        'Build a neural network with two hidden Dense layers and one output layer.',
      ],
      questions: [
        {
          q: 'What is a Dense layer?',
          a: 'A Dense layer is a fully connected neural network layer where every neuron receives input from all outputs of the previous layer.',
        },
        {
          q: 'What does the units parameter mean?',
          a: 'The units parameter specifies the number of neurons in a Dense layer.',
        },
        {
          q: 'What is the role of activation in a Dense layer?',
          a: 'An activation function controls the output of neurons and helps neural networks learn nonlinear relationships.',
        },
      ],
      code: `import tensorflow as tf

model = tf.keras.Sequential([
    tf.keras.Input(shape=(3,)),
    tf.keras.layers.Dense(8, activation="relu"),
    tf.keras.layers.Dense(4, activation="relu"),
    tf.keras.layers.Dense(1, activation="linear")
])

model.summary()`,
      pitfalls: [
        'The units parameter represents neurons, not input features.',
        'A Dense layer is not the same as a convolutional layer.',
        'Without nonlinear activations between layers, stacking Dense layers alone still represents a linear transformation.',
        'Choose the output layer activation based on the prediction task.',
      ],
    }),

    lesson({
      slug: 'hidden-layers',
      title: 'Hidden Layers',
      summary:
        'Understand the layers between input and output that help a neural network learn patterns.',
      definition:
        'Hidden layers are the layers located between the input layer and output layer of a neural network. They process information and learn useful patterns from the input data.',
      why:
        'Many real-world problems contain complex relationships. Hidden layers allow neural networks to learn intermediate patterns instead of relying only on a direct relationship between inputs and outputs.',
      purpose:
        'The purpose is to learn useful representations and complex relationships from input data.',
      when: [
        'When a problem requires learning nonlinear relationships.',
        'When building multilayer neural networks.',
        'When working with image, text, or numerical prediction tasks.',
        'When a simple model cannot capture the patterns in the data.',
      ],
      simpleExample:
        'A student performance model may first learn relationships between attendance and study hours. A later hidden layer may combine those patterns with assignment marks to identify more complex performance patterns.',
      detail:
        'Each hidden layer receives the output of the previous layer and produces a new representation. Early layers may learn simpler patterns, while later layers can combine those patterns. The actual learned patterns depend on the data, architecture, and training process.',
      realLife: {
        problem:
          'A model needs to recognize objects in photographs.',
        approach: [
          'Provide numerical image pixels as input.',
          'Use hidden layers to process image information.',
          'Train the network to recognize useful visual patterns.',
          'Use an output layer to predict the object category.',
        ],
        outcome:
          'The network learns internal representations that help distinguish different object categories.',
      },
      tasks: [
        'Create a neural network with one hidden layer.',
        'Compare a model with one hidden layer and a model with three hidden layers.',
        'Train two models with different numbers of hidden layers and compare their validation performance.',
      ],
      questions: [
        {
          q: 'What is a hidden layer?',
          a: 'A hidden layer is a layer between the input and output layers that processes information and learns patterns.',
        },
        {
          q: 'Why do neural networks use hidden layers?',
          a: 'Hidden layers help neural networks learn intermediate representations and complex relationships in data.',
        },
        {
          q: 'Does adding more hidden layers always improve a model?',
          a: 'No. More layers increase model complexity and may increase training time or overfitting. The architecture should be selected based on the problem and validation results.',
        },
      ],
      code: `import tensorflow as tf

model = tf.keras.Sequential([
    tf.keras.Input(shape=(5,)),
    tf.keras.layers.Dense(32, activation="relu"),
    tf.keras.layers.Dense(16, activation="relu"),
    tf.keras.layers.Dense(8, activation="relu"),
    tf.keras.layers.Dense(1, activation="sigmoid")
])

model.summary()`,
      pitfalls: [
        'Hidden layers do not have to contain the same number of neurons.',
        'More hidden layers do not guarantee better performance.',
        'A network with only linear operations cannot learn general nonlinear relationships just by stacking more linear layers.',
        'Monitor validation performance to identify overfitting.',
      ],
    }),

    lesson({
      slug: 'optimizers',
      title: 'Optimizers',
      summary:
        'Learn how optimizers update neural network weights to reduce prediction errors.',
      definition:
        'An optimizer is an algorithm that updates the trainable weights and biases of a neural network using calculated gradients. Its goal is to reduce the model loss during training.',
      why:
        'A neural network starts with initial parameter values that usually produce imperfect predictions. An optimizer uses gradient information to adjust these values so that the model can improve.',
      purpose:
        'The purpose is to control how a model learns by deciding how its parameters should be updated.',
      when: [
        'When training a neural network.',
        'When selecting how model weights should be updated.',
        'When experimenting with learning rates.',
        'When a model learns too slowly or training becomes unstable.',
      ],
      simpleExample:
        'Imagine walking down a hill to reach its lowest point. An optimizer uses information about the slope to decide which direction to move and how large a step to take. The lowest point represents a smaller loss.',
      detail:
        'Common optimizers include SGD, RMSprop, and Adam. SGD updates parameters using gradient information. Adam maintains moving estimates of gradients and squared gradients to adapt parameter updates. The learning rate controls the size of updates.',
      realLife: {
        problem:
          'A neural network produces inaccurate predictions during its initial training.',
        approach: [
          'Calculate the model loss.',
          'Calculate gradients using backpropagation.',
          'Select an optimizer such as Adam.',
          'Update weights and repeat training.',
        ],
        outcome:
          'The model gradually adjusts its parameters to reduce prediction errors.',
      },
      tasks: [
        'Create a model using the Adam optimizer.',
        'Compare SGD and Adam using the same neural network.',
        'Train models with different learning rates and compare their loss curves.',
      ],
      questions: [
        {
          q: 'What is an optimizer in deep learning?',
          a: 'An optimizer is an algorithm that updates neural network parameters using gradients to reduce the loss.',
        },
        {
          q: 'What are common TensorFlow optimizers?',
          a: 'Common optimizers include SGD, Adam, and RMSprop.',
        },
        {
          q: 'What is the difference between an optimizer and a loss function?',
          a: 'A loss function measures prediction error. An optimizer uses gradient information from that loss to update model parameters.',
        },
      ],
      code: `import tensorflow as tf

model = tf.keras.Sequential([
    tf.keras.Input(shape=(2,)),
    tf.keras.layers.Dense(8, activation="relu"),
    tf.keras.layers.Dense(1)
])

model.compile(
    optimizer=tf.keras.optimizers.Adam(
        learning_rate=0.001
    ),
    loss="mean_squared_error"
)

print(model.optimizer)`,
      pitfalls: [
        'An optimizer does not decide whether a prediction is correct; the loss function measures the error.',
        'A learning rate that is too high can make training unstable.',
        'A learning rate that is too low can make training very slow.',
        'The best optimizer depends on the model and dataset.',
      ],
    }),

    lesson({
      slug: 'gradient-descent',
      title: 'Gradient Descent',
      summary:
        'Understand how a model uses gradients to move toward parameter values that reduce its loss.',
      definition:
        'Gradient Descent is an optimization method that updates model parameters in the opposite direction of the loss gradient. It aims to find parameter values that reduce the loss.',
      why:
        'Neural networks may contain thousands or millions of trainable parameters. Gradient Descent provides a mathematical method for adjusting these parameters based on prediction errors.',
      purpose:
        'The purpose is to minimize the loss function by repeatedly adjusting model weights and biases.',
      when: [
        'When training neural networks.',
        'When minimizing a differentiable loss function.',
        'When learning how neural network weights are updated.',
        'When understanding SGD, batch Gradient Descent, and mini-batch Gradient Descent.',
      ],
      simpleExample:
        'Imagine standing on a hill and wanting to reach a low point. You look at the direction of the steepest downward slope and take a step in that direction. You repeat until you reach a point where the loss stops improving significantly.',
      detail:
        'The basic update rule is: new parameter = old parameter - learning rate multiplied by the gradient. Batch Gradient Descent uses the entire training dataset for an update. Stochastic Gradient Descent uses one example at a time. Mini-batch Gradient Descent uses a small group of examples.',
      realLife: {
        problem:
          'A neural network predicts house prices but its initial predictions contain large errors.',
        approach: [
          'Calculate predictions using current weights.',
          'Calculate the loss between predictions and actual prices.',
          'Calculate gradients of the loss with respect to the weights.',
          'Update weights in the direction that reduces the loss.',
        ],
        outcome:
          'The model can gradually improve its predictions by reducing its training loss.',
      },
      tasks: [
        'Explain Gradient Descent using a hill-climbing or hill-descent example.',
        'Compare batch, stochastic, and mini-batch Gradient Descent.',
        'Train a neural network with two learning rates and compare the loss curves.',
      ],
      questions: [
        {
          q: 'What is Gradient Descent?',
          a: 'Gradient Descent is an optimization method that updates model parameters in the opposite direction of the loss gradient to reduce the loss.',
        },
        {
          q: 'What is the learning rate?',
          a: 'The learning rate controls how large each parameter update is during optimization.',
        },
        {
          q: 'What is the difference between batch and stochastic Gradient Descent?',
          a: 'Batch Gradient Descent calculates an update using the entire training dataset, while stochastic Gradient Descent uses one training example per update.',
        },
      ],
      code: `import tensorflow as tf

# A simple variable to optimize
weight = tf.Variable(10.0)

learning_rate = 0.1

for step in range(20):
    with tf.GradientTape() as tape:
        loss = (weight - 3.0) ** 2

    gradient = tape.gradient(loss, weight)

    weight.assign_sub(
        learning_rate * gradient
    )

    print(
        "Step:", step + 1,
        "Weight:", weight.numpy(),
        "Loss:", loss.numpy()
    )`,
      pitfalls: [
        'A learning rate that is too large may cause the loss to increase or fluctuate.',
        'A learning rate that is too small may require many updates.',
        'Gradient Descent can converge to local minima or flat regions depending on the loss surface.',
        'Gradient Descent is an optimization method; Adam and SGD are commonly used optimizer implementations.',
      ],
    }),

    lesson({
      slug: 'model-training',
      title: 'Model Training',
      summary:
        'Learn how to compile a neural network and train it using data with the Keras fit method.',
      definition:
        'Model training is the process of teaching a neural network to learn patterns from training data by making predictions, calculating loss, and updating its parameters.',
      why:
        'A model initially has untrained parameter values. Training allows it to adjust its weights and biases using examples so that it can make useful predictions.',
      purpose:
        'The purpose is to learn model parameters that help the network perform well on data it has not seen before.',
      when: [
        'After preparing and splitting a dataset.',
        'After defining the neural network architecture.',
        'After choosing an optimizer and loss function.',
        'When improving a model using additional training data or suitable training settings.',
      ],
      simpleExample:
        'Suppose you want to predict examination marks from study hours. You provide many examples of study hours and actual marks. The model makes predictions, compares them with actual marks, and adjusts its weights to reduce errors.',
      detail:
        'The usual Keras workflow is to define a model, compile it, and call fit(). During training, an epoch represents one complete pass through the training dataset. Batch size controls how many examples are processed before an update. Validation data helps monitor performance on data not used for weight updates.',
      realLife: {
        problem:
          'A company has historical customer data and wants to train a model to predict customer churn.',
        approach: [
          'Clean and prepare the customer dataset.',
          'Separate input features and target labels.',
          'Split data into training and testing sets.',
          'Build and compile a neural network.',
          'Train using fit() and monitor validation performance.',
        ],
        outcome:
          'The company obtains a trained model that can predict churn for new customers.',
      },
      tasks: [
        'Create a small dataset and train a Keras model using fit().',
        'Compare training results using different batch sizes and epoch counts.',
        'Train a model with validation data and investigate whether it is overfitting.',
      ],
      questions: [
        {
          q: 'What is model training?',
          a: 'Model training is the process of learning model parameters from data by calculating errors and updating weights.',
        },
        {
          q: 'What is an epoch?',
          a: 'An epoch is one complete pass through the entire training dataset.',
        },
        {
          q: 'What is batch size?',
          a: 'Batch size is the number of training examples processed together before a training update.',
        },
      ],
      code: `import numpy as np
import tensorflow as tf

# Training data
X = np.array([
    [1.0],
    [2.0],
    [3.0],
    [4.0],
    [5.0]
])

y = np.array([
    2.0,
    4.0,
    6.0,
    8.0,
    10.0
])

model = tf.keras.Sequential([
    tf.keras.Input(shape=(1,)),
    tf.keras.layers.Dense(1)
])

model.compile(
    optimizer=tf.keras.optimizers.Adam(
        learning_rate=0.01
    ),
    loss="mean_squared_error",
    metrics=["mae"]
)

history = model.fit(
    X,
    y,
    epochs=100,
    batch_size=2,
    validation_split=0.2,
    verbose=0
)

print("Final training loss:", history.history["loss"][-1])
print("Final validation loss:", history.history["val_loss"][-1])

print("Prediction:", model.predict(
    np.array([[6.0]]),
    verbose=0
))`,
      pitfalls: [
        'Training accuracy or low training loss does not guarantee good performance on new data.',
        'Too many epochs can cause overfitting.',
        'Do not use the test set repeatedly to make training decisions.',
        'Preprocessing transformations should be learned from training data only.',
        'Validation data is used for monitoring and model selection, not ordinary weight updates.',
      ],
    }),

    lesson({
      slug: 'model-evaluation',
      title: 'Model Evaluation',
      summary:
        'Learn how to measure whether a trained neural network performs well on unseen data.',
      definition:
        'Model evaluation is the process of measuring a trained model using data that was not used to update its weights. It helps determine how well the model performs on new examples.',
      why:
        'A model may perform very well on training data but poorly on new data. Evaluation helps identify this problem and provides an estimate of how useful the model is.',
      purpose:
        'The purpose is to measure model performance, compare models, and identify problems such as overfitting.',
      when: [
        'After training a model.',
        'When comparing different model architectures.',
        'When checking whether a model generalizes to new data.',
        'Before deploying a model into a real application.',
      ],
      simpleExample:
        'A student practices questions from a textbook and then takes a separate examination. The examination checks whether the student learned the subject instead of simply memorizing the practice questions. Model evaluation works in a similar way.',
      detail:
        'For regression, common metrics include MAE, MSE, RMSE, and R-squared. For classification, common metrics include accuracy, precision, recall, F1-score, and confusion matrix. Keras provides evaluate() to calculate the loss and configured metrics on supplied data.',
      realLife: {
        problem:
          'A company has trained a model to predict whether customers will cancel their subscriptions.',
        approach: [
          'Keep a test dataset separate from training.',
          'Use the trained model to predict test examples.',
          'Calculate suitable classification metrics.',
          'Inspect errors and compare training with test performance.',
        ],
        outcome:
          'The company gets a clearer understanding of how reliably the model predicts churn for unseen customers.',
      },
      tasks: [
        'Evaluate a trained regression model using model.evaluate().',
        'Compare MAE and MSE and explain what each metric measures.',
        'Evaluate a binary classification model using accuracy, precision, recall, and a confusion matrix.',
      ],
      questions: [
        {
          q: 'What is model evaluation?',
          a: 'Model evaluation measures how well a trained model performs using data that was not used to update its weights.',
        },
        {
          q: 'What is the difference between training data and testing data?',
          a: 'Training data is used to learn model parameters. Testing data is held back to estimate how well the trained model performs on unseen examples.',
        },
        {
          q: 'Which metrics are used for regression and classification?',
          a: 'Regression commonly uses MAE, MSE, RMSE, and R-squared. Classification commonly uses accuracy, precision, recall, F1-score, and confusion matrix.',
        },
      ],
      code: `import numpy as np
import tensorflow as tf

X_train = np.array([
    [1.0], [2.0], [3.0], [4.0], [5.0]
])

y_train = np.array([
    2.0, 4.0, 6.0, 8.0, 10.0
])

X_test = np.array([
    [6.0], [7.0]
])

y_test = np.array([
    12.0, 14.0
])

model = tf.keras.Sequential([
    tf.keras.Input(shape=(1,)),
    tf.keras.layers.Dense(1)
])

model.compile(
    optimizer="adam",
    loss="mean_squared_error",
    metrics=["mae"]
)

model.fit(
    X_train,
    y_train,
    epochs=100,
    verbose=0
)

results = model.evaluate(
    X_test,
    y_test,
    verbose=0
)

print("Test loss:", results[0])
print("Test MAE:", results[1])

predictions = model.predict(X_test, verbose=0)
print("Predictions:", predictions.flatten())`,
      pitfalls: [
        'Do not evaluate a model only on its training data.',
        'Accuracy alone can be misleading for imbalanced classification datasets.',
        'Use regression metrics for regression and classification metrics for classification.',
        'Do not repeatedly tune a model using the final test set.',
        'A low loss value is meaningful only in relation to the chosen loss function and data scale.',
      ],
    }),

    lesson({
      slug: 'visualization',
      title: 'Visualization',
      summary:
        'Learn how to visualize training history, loss, accuracy, and model architecture.',
      definition:
        'Visualization is the process of displaying data, model structure, and training results using graphs or diagrams. TensorFlow commonly uses Matplotlib and TensorBoard for this purpose.',
      why:
        'Training a model produces numerical information such as loss and accuracy. Visualizations make it easier to understand how training changes over time and identify possible problems.',
      purpose:
        'The purpose is to understand model behavior, monitor training, and communicate results clearly.',
      when: [
        'When monitoring training and validation loss.',
        'When comparing model performance across epochs.',
        'When checking for overfitting.',
        'When inspecting model architecture and training metrics.',
      ],
      simpleExample:
        'Imagine drawing a graph where the horizontal axis represents training epochs and the vertical axis represents loss. If training loss decreases but validation loss starts increasing, the model may be overfitting.',
      detail:
        'Keras fit() returns a History object containing training and validation metrics. Matplotlib can plot these values. TensorBoard provides a dashboard for monitoring metrics, graphs, and other training information.',
      realLife: {
        problem:
          'A data scientist wants to understand why a neural network performs well on training data but poorly on validation data.',
        approach: [
          'Record training and validation loss.',
          'Plot both values against epochs.',
          'Compare how the two curves change.',
          'Investigate whether the model is overfitting or underfitting.',
        ],
        outcome:
          'The data scientist can identify training behavior and make better decisions about model complexity and training duration.',
      },
      tasks: [
        'Plot the training loss from a Keras History object.',
        'Plot training and validation loss on the same graph.',
        'Use TensorBoard to monitor a model during training.',
      ],
      questions: [
        {
          q: 'Why is visualization useful in deep learning?',
          a: 'Visualization helps developers understand training progress, compare metrics, inspect model architecture, and identify possible overfitting.',
        },
        {
          q: 'What is the Keras History object?',
          a: 'It is the object returned by model.fit() that stores training and validation metrics for each epoch.',
        },
        {
          q: 'What is TensorBoard?',
          a: 'TensorBoard is a visualization tool used to monitor and inspect TensorFlow training information, metrics, and model graphs.',
        },
      ],
      code: `import numpy as np
import tensorflow as tf
import matplotlib.pyplot as plt

X = np.linspace(0, 10, 100).reshape(-1, 1)
y = 2 * X[:, 0] + 1

model = tf.keras.Sequential([
    tf.keras.Input(shape=(1,)),
    tf.keras.layers.Dense(8, activation="relu"),
    tf.keras.layers.Dense(1)
])

model.compile(
    optimizer="adam",
    loss="mean_squared_error"
)

history = model.fit(
    X,
    y,
    epochs=30,
    validation_split=0.2,
    verbose=0
)

plt.plot(history.history["loss"], label="Training Loss")
plt.plot(history.history["val_loss"], label="Validation Loss")

plt.xlabel("Epoch")
plt.ylabel("Loss")
plt.title("Training and Validation Loss")
plt.legend()
plt.show()`,
      pitfalls: [
        'A graph should have clear labels and meaningful scales.',
        'Training loss alone does not show how well a model generalizes.',
        'Validation loss increasing while training loss decreases can indicate overfitting.',
        'Visualization helps diagnose behavior but does not replace proper evaluation.',
      ],
    }),

    lesson({
      slug: 'distributed-computing',
      title: 'Distributed Computing',
      summary:
        'Understand how TensorFlow can distribute model training across multiple devices or machines.',
      definition:
        'Distributed computing in TensorFlow means using multiple computing devices or machines to perform parts of a machine learning workload. This can help train large models or process large datasets more efficiently.',
      why:
        'Large datasets and neural networks may require more computing power than a single device can provide. Distributed training allows workloads to be shared across available hardware.',
      purpose:
        'The purpose is to improve the ability to train and process large machine learning workloads by using multiple computing resources.',
      when: [
        'When training large neural networks.',
        'When datasets are too large for efficient single-device training.',
        'When multiple GPUs or machines are available.',
        'When a production training workflow requires distributed resources.',
      ],
      simpleExample:
        'Imagine a large assignment that takes one person many hours. If several people divide the work and coordinate their results, the assignment may be completed faster. Distributed training follows a similar idea by sharing computation across devices.',
      detail:
        'TensorFlow provides distribution strategies such as MirroredStrategy for synchronous training across multiple GPUs on one machine and MultiWorkerMirroredStrategy for synchronous training across multiple workers. Distributed training requires appropriate hardware, configuration, and data handling.',
      realLife: {
        problem:
          'A company needs to train a large image recognition model using a large image dataset.',
        approach: [
          'Prepare the dataset and training pipeline.',
          'Configure available GPUs or machines.',
          'Choose a suitable TensorFlow distribution strategy.',
          'Train the model while coordinating work across devices.',
        ],
        outcome:
          'The company can use multiple computing resources for its training workload.',
      },
      tasks: [
        'Explain the difference between single-device and distributed training.',
        'Read about MirroredStrategy and MultiWorkerMirroredStrategy.',
        'Create a small model using MirroredStrategy and inspect the available devices.',
      ],
      questions: [
        {
          q: 'What is distributed training?',
          a: 'Distributed training uses multiple devices or machines to perform parts of a model training workload.',
        },
        {
          q: 'What is MirroredStrategy?',
          a: 'MirroredStrategy is a TensorFlow distribution strategy that synchronously trains replicas of a model across multiple devices, commonly GPUs on one machine.',
        },
        {
          q: 'What is the benefit of distributed computing?',
          a: 'It allows machine learning workloads to use multiple computing resources, which can help with large models and datasets.',
        },
      ],
      code: `import tensorflow as tf

strategy = tf.distribute.MirroredStrategy()

print("Number of devices:", strategy.num_replicas_in_sync)

with strategy.scope():
    model = tf.keras.Sequential([
        tf.keras.Input(shape=(4,)),
        tf.keras.layers.Dense(16, activation="relu"),
        tf.keras.layers.Dense(1)
    ])

    model.compile(
        optimizer="adam",
        loss="mean_squared_error"
    )

model.summary()`,
      pitfalls: [
        'Distributed training does not automatically make every workload faster.',
        'MirroredStrategy requires compatible devices and an appropriate environment.',
        'Communication between devices creates overhead.',
        'Batch size and learning-rate choices may need adjustment when scaling training.',
        'A single GPU or CPU workflow is usually easier for beginners to understand first.',
      ],
    }),

    lesson({
      slug: 'exporting-models',
      title: 'Exporting Models',
      summary:
        'Learn how to save, load, and export trained TensorFlow models for later use and deployment.',
      definition:
        'Model exporting is the process of saving a trained model in a format that can be reused or deployed outside the original training session. It allows applications to load a model and make predictions without training it again.',
      why:
        'Training a model can take time and computing resources. Saving it allows developers to reuse the learned parameters, share the model, and integrate it into applications.',
      purpose:
        'The purpose is to preserve trained models and make them available for prediction or deployment.',
      when: [
        'After training and evaluating a model.',
        'When using a trained model in a separate application.',
        'When sharing a model with another developer or team.',
        'When deploying a model for inference.',
      ],
      simpleExample:
        'Imagine training a model to recognize handwritten digits. You save the trained model to a file. Later, another Python application loads that file and predicts digits from new images without training the network again.',
      detail:
        'In Keras 3, model.save("model.keras") saves a complete Keras model, including its architecture and weights, and can also preserve training configuration. You can reload it using tf.keras.models.load_model(). For TensorFlow SavedModel export for inference, use model.export() where supported. Exporting and saving are related but serve different purposes.',
      realLife: {
        problem:
          'A company has trained an image classification model and wants to use it in an application.',
        approach: [
          'Train and evaluate the model.',
          'Save the complete Keras model in the .keras format.',
          'Load the model in a separate Python application.',
          'Use the loaded model to make predictions.',
        ],
        outcome:
          'The company can reuse the trained model without repeating the training process.',
      },
      tasks: [
        'Save a trained Keras model using the .keras file format.',
        'Load the saved model and compare its predictions with the original model.',
        'Export a trained model for inference and investigate how it can be served in an application.',
      ],
      questions: [
        {
          q: 'Why do we save a trained model?',
          a: 'Saving a model allows developers to reuse its learned parameters, avoid retraining, and integrate it into other applications.',
        },
        {
          q: 'How do you save a Keras model?',
          a: 'Use model.save("model.keras") to save a complete Keras model in the recommended Keras format.',
        },
        {
          q: 'What is the difference between saving and exporting a model?',
          a: 'Saving a Keras model preserves the model for later reloading and potentially further training. Exporting creates an inference artifact intended for use by a serving or deployment system.',
        },
      ],
      code: `import numpy as np
import tensorflow as tf

X = np.array([
    [1.0],
    [2.0],
    [3.0],
    [4.0]
])

y = np.array([
    2.0,
    4.0,
    6.0,
    8.0
])

model = tf.keras.Sequential([
    tf.keras.Input(shape=(1,)),
    tf.keras.layers.Dense(1)
])

model.compile(
    optimizer="adam",
    loss="mean_squared_error"
)

model.fit(X, y, epochs=100, verbose=0)

# Save the complete Keras model
model.save("my_tensorflow_model.keras")

# Load the saved model
loaded_model = tf.keras.models.load_model(
    "my_tensorflow_model.keras"
)

# Make a prediction
prediction = loaded_model.predict(
    np.array([[5.0]]),
    verbose=0
)

print("Prediction:", prediction.flatten())

# Export an inference artifact
model.export("tensorflow_exported_model")`,
      pitfalls: [
        'Save the model after checking its performance.',
        'The .keras format is used for saving a complete Keras model.',
        'In Keras 3, model.export() creates a SavedModel inference artifact; it is not interchangeable with model.save().',
        'A saved model still needs compatible dependencies and a suitable runtime environment.',
        'Exporting a model does not automatically create a complete web or mobile application.',
      ],
    }),
  ],
}

export default ch