
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
          'Understand the concept and explain it using a simple example.',
      },
      {
        id: `${data.slug}-task-2`,
        title: 'Compare',
        difficulty: 'medium',
        task: data.tasks[1],
        expectedOutcome:
          'Compare different neural network concepts and explain how they work.',
      },
      {
        id: `${data.slug}-task-3`,
        title: 'Apply it',
        difficulty: 'hard',
        task: data.tasks[2],
        expectedOutcome:
          'Apply the concept in a neural network project and explain the results.',
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
  id: 'neural-network-fundamentals',
  number: 19,
  title: 'Neural Network Fundamentals',
  tagline:
    'Understand artificial neurons, perceptrons, neural network layers, forward propagation, backpropagation, loss functions and optimizers.',
  priority: 'extreme',

  topics: [
    lesson({
      slug: 'artificial-neurons',
      title: 'Artificial Neurons',
      summary:
        'Understand the basic building block of a neural network and how it processes input data.',
      definition:
        'An artificial neuron is a mathematical unit in a neural network. It receives input values, multiplies them by weights, adds a bias and passes the result through an activation function to produce an output.',
      why:
        'Neurons allow a neural network to learn relationships between input features and output values. By connecting many neurons, a network can learn more complex patterns.',
      purpose:
        'Its purpose is to process input information and produce an output that can be passed to another neuron or layer.',
      when: [
        'When learning how neural networks work.',
        'When understanding weights and biases.',
        'When building a perceptron or Multi-Layer Perceptron.',
        'When studying how neural networks learn patterns.',
      ],
      simpleExample:
        'Imagine predicting whether a student will pass an exam using study hours and attendance. An artificial neuron receives these values, gives each one a weight, adds a bias and calculates an output.',
      detail:
        'A neuron first calculates a weighted sum: z = x1*w1 + x2*w2 + b. It then applies an activation function: output = activation(z). The weights control the contribution of each input, while the bias shifts the result. During training, the network adjusts these values to reduce prediction errors.',
      realLife: {
        problem:
          'A school wants to estimate whether a student is likely to pass based on study hours and attendance.',
        approach: [
          'Collect study hours and attendance information.',
          'Pass both values into an artificial neuron.',
          'Multiply each input by its corresponding weight.',
          'Add the bias.',
          'Apply an activation function to calculate the output.',
        ],
        outcome:
          'The neuron produces an output based on the information it receives. A trained network can use this output to help predict student performance.',
      },
      tasks: [
        'Write a Python program that calculates a weighted sum using two inputs, two weights and one bias.',
        'Change the weights and bias and observe how the neuron output changes.',
        'Build a simple artificial neuron using TensorFlow and compare its output with a manually calculated result.',
      ],
      questions: [
        {
          q: 'What is an artificial neuron?',
          a: 'An artificial neuron is a mathematical unit that receives inputs, multiplies them by weights, adds a bias and applies an activation function to produce an output.',
        },
        {
          q: 'What is a weight in a neural network?',
          a: `A weight controls how strongly an input contributes to the neuron's calculation.`,
        },
        {
          q: 'What is bias?',
          a: 'Bias is an additional learnable value added to the weighted sum. It helps the neuron adjust its output independently of the input values.',
        },
        {
          q: 'What is the basic calculation of a neuron?',
          a: 'It calculates a weighted sum of the inputs plus a bias, then passes that result through an activation function.',
        },
      ],
      code: `import numpy as np

inputs = np.array([5.0, 80.0])

weights = np.array([0.4, 0.02])

bias = -1.0

weighted_sum = np.dot(inputs, weights) + bias

output = 1 / (1 + np.exp(-weighted_sum))

print("Weighted sum:", weighted_sum)
print("Neuron output:", output)`,
      pitfalls: [
        'Weights and biases are different: weights control input contributions, while bias shifts the weighted sum.',
        'A neuron does not automatically learn just because it calculates an output.',
        'The activation function affects the output of the neuron.',
      ],
    }),

    lesson({
      slug: 'single-layer-perceptron',
      title: 'Single Layer Perceptron',
      summary:
        'Understand the simplest trainable neural network used for basic classification.',
      definition:
        'A Single Layer Perceptron is a basic neural network model with input features connected directly to one trainable output layer. It uses weights, a bias and an activation function to classify data.',
      why:
        'It introduces the fundamental ideas of neural networks, including weights, bias, prediction errors and learning from examples.',
      purpose:
        'Its purpose is to learn a simple decision boundary that separates classes in a dataset.',
      when: [
        'When learning the basics of neural networks.',
        'When solving simple binary classification problems.',
        'When working with linearly separable data.',
        'When studying how weights are updated during training.',
      ],
      simpleExample:
        'Imagine classifying students as Pass or Fail using study hours. The perceptron learns a boundary that separates students predicted to pass from those predicted to fail.',
      detail:
        'A perceptron calculates a weighted sum of input features and applies a threshold activation function. During training, it compares its prediction with the correct class and adjusts its weights when it makes a mistake. A basic perceptron can learn linearly separable patterns but cannot solve XOR by itself.',
      realLife: {
        problem:
          'A teacher wants a basic model that classifies students as Pass or Fail using study hours.',
        approach: [
          'Collect labelled student records.',
          'Use study hours as the input feature.',
          'Create a perceptron classifier.',
          'Train it using labelled examples.',
          'Check predictions on unseen student records.',
        ],
        outcome:
          'The perceptron learns a simple classification boundary when the data is linearly separable.',
      },
      tasks: [
        'Draw a Single Layer Perceptron with two inputs and one output.',
        'Compare a perceptron with an artificial neuron and explain their relationship.',
        'Train a Perceptron classifier using Scikit-learn and evaluate its performance on a classification dataset.',
      ],
      questions: [
        {
          q: 'What is a Single Layer Perceptron?',
          a: 'It is a basic trainable neural network that uses input features connected to one trainable output layer to perform classification.',
        },
        {
          q: 'Can a Single Layer Perceptron solve every classification problem?',
          a: 'No. A basic perceptron can learn linearly separable patterns, but it cannot solve non-linearly separable problems such as XOR on its own.',
        },
        {
          q: 'What does a perceptron learn?',
          a: 'It learns weights and a bias that define a decision boundary for classifying input data.',
        },
        {
          q: 'What is the difference between a neuron and a perceptron?',
          a: 'A neuron is a computational unit. A perceptron is a simple trainable neural network model based on a neuron-like calculation and a threshold activation.',
        },
      ],
      code: `from sklearn.linear_model import Perceptron

X = [
    [1, 1],
    [2, 1],
    [1, 2],
    [4, 4],
    [5, 4],
    [4, 5]
]

y = [0, 0, 0, 1, 1, 1]

model = Perceptron(random_state=42)

model.fit(X, y)

predictions = model.predict([
    [2, 2],
    [5, 5]
])

print("Predictions:", predictions)`,
      pitfalls: [
        'A basic perceptron cannot learn every possible decision boundary.',
        'It is mainly suitable for linearly separable classification problems.',
        'A single perceptron is not the same as a deep neural network.',
      ],
    }),

    lesson({
      slug: 'multi-layer-perceptron',
      title: 'Multi-Layer Perceptron (MLP)',
      summary:
        'Understand how multiple neural network layers learn more complex patterns.',
      definition:
        'A Multi-Layer Perceptron is a feedforward neural network containing an input layer, one or more hidden layers and an output layer. It uses connected neurons and nonlinear activation functions to learn complex relationships.',
      why:
        'Real-world data often contains relationships that cannot be represented by a simple straight line. Hidden layers and nonlinear activation functions allow an MLP to learn more complex patterns.',
      purpose:
        'Its purpose is to learn complex relationships between input features and target outputs.',
      when: [
        'When solving classification problems.',
        'When predicting numerical values.',
        'When data contains nonlinear relationships.',
        'When a simple linear model is not sufficient.',
      ],
      simpleExample:
        'Imagine predicting whether a student will pass using study hours, attendance, previous marks and assignment scores. An MLP processes these inputs through hidden layers and learns how they relate to the final result.',
      detail:
        'An MLP passes information from the input layer through one or more hidden layers to the output layer. Each layer performs weighted calculations and applies an activation function. During training, backpropagation calculates gradients and an optimizer updates the learnable parameters.',
      realLife: {
        problem:
          'A school wants to predict student pass or fail results using several performance-related features.',
        approach: [
          'Collect study hours, attendance and previous marks.',
          'Prepare the input features and target labels.',
          'Create an MLP with hidden layers.',
          'Train the network using labelled examples.',
          'Evaluate predictions using unseen data.',
        ],
        outcome:
          'The MLP can learn complex relationships among student features and produce pass or fail predictions.',
      },
      tasks: [
        'Draw an MLP containing an input layer, two hidden layers and one output layer.',
        'Create an MLP with different hidden layer sizes and compare the results.',
        'Build a student pass/fail classification model using TensorFlow Keras and evaluate it.',
      ],
      questions: [
        {
          q: 'What is a Multi-Layer Perceptron?',
          a: 'An MLP is a feedforward neural network containing an input layer, one or more hidden layers and an output layer.',
        },
        {
          q: 'Why do we use hidden layers?',
          a: 'Hidden layers help the network learn intermediate and complex patterns from input features.',
        },
        {
          q: 'What makes an MLP different from a Single Layer Perceptron?',
          a: 'An MLP contains one or more hidden layers and can learn nonlinear relationships when suitable nonlinear activation functions are used.',
        },
        {
          q: 'Can an MLP solve XOR?',
          a: 'Yes. An MLP with a suitable hidden layer and nonlinear activation function can learn the XOR relationship.',
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
        'More hidden layers do not automatically make a model better.',
        'Without nonlinear activation functions, stacking ordinary Dense layers still produces an overall linear transformation.',
        'Too many parameters can cause overfitting.',
        'Choose the output layer and loss function based on the problem.',
      ],
    }),

    lesson({
      slug: 'input-hidden-output-layers',
      title: 'Input, Hidden and Output Layers',
      summary:
        'Understand the three main types of layers in a neural network.',
      definition:
        'A neural network is commonly organised into an input layer, one or more hidden layers and an output layer. Each layer has a different role in processing information.',
      why:
        'Understanding layers helps you understand how information travels through a neural network and how the network converts input data into predictions.',
      purpose:
        'Their purpose is to receive input features, learn useful patterns and generate final predictions.',
      when: [
        'When designing a neural network architecture.',
        'When deciding how many input features a model needs.',
        'When selecting hidden layer sizes.',
        'When choosing the output structure for classification or regression.',
      ],
      simpleExample:
        'For a student prediction model, the input layer receives study hours, attendance and previous marks. Hidden layers learn relationships between these features. The output layer predicts the result.',
      detail:
        'The input layer represents the input features. Hidden layers perform weighted computations and apply activation functions. The output layer produces the final result. For binary classification, one sigmoid output is common; for multiclass classification, a softmax output is common; for ordinary regression, a linear output is often used.',
      realLife: {
        problem:
          'A company wants to predict whether a customer will purchase a product.',
        approach: [
          'Use age, income and previous purchases as input features.',
          'Create an input layer that accepts these features.',
          'Add hidden layers to learn patterns.',
          'Add an output layer for the purchase prediction.',
          'Train and evaluate the network.',
        ],
        outcome:
          'The network processes customer information through its layers and produces a purchase prediction.',
      },
      tasks: [
        'Draw a neural network with three input features, one hidden layer and one output neuron.',
        'Compare the output layer used for binary classification, multiclass classification and regression.',
        'Build three small Keras models with different output structures and explain their use cases.',
      ],
      questions: [
        {
          q: 'What is an input layer?',
          a: 'The input layer receives the features that are supplied to a neural network.',
        },
        {
          q: 'What is a hidden layer?',
          a: 'A hidden layer processes information from the previous layer and learns useful patterns through its weights, biases and activation functions.',
        },
        {
          q: 'What is an output layer?',
          a: 'The output layer produces the final prediction of a neural network.',
        },
        {
          q: 'How many output neurons are needed for binary classification?',
          a: 'A common design uses one sigmoid output neuron to represent the probability of the positive class.',
        },
      ],
      code: `import tensorflow as tf

model = tf.keras.Sequential([
    tf.keras.layers.Input(shape=(3,)),
    tf.keras.layers.Dense(8, activation="relu"),
    tf.keras.layers.Dense(4, activation="relu"),
    tf.keras.layers.Dense(1, activation="sigmoid")
])

model.summary()`,
      pitfalls: [
        'The number of input features must match the model input shape.',
        'The output layer must match the prediction task.',
        'Hidden layer size should be selected based on validation performance rather than guessing that bigger is always better.',
      ],
    }),

    lesson({
      slug: 'activation-functions',
      title: 'Activation Functions',
      summary:
        'Understand how activation functions help neural networks learn nonlinear patterns.',
      definition:
        'An activation function is a mathematical function applied to a neuron output. It determines how the neuron passes information to the next layer.',
      why:
        'Activation functions introduce nonlinearity into neural networks. Without nonlinear activation functions, stacking ordinary Dense layers would still behave like one linear transformation and would not learn complex nonlinear relationships.',
      purpose:
        'Their purpose is to help neural networks learn complex patterns and produce outputs suitable for different tasks.',
      when: [
        'When building hidden layers in neural networks.',
        'When choosing an output layer for classification.',
        'When training regression models.',
        'When selecting suitable neural network architectures.',
      ],
      simpleExample:
        'Imagine a neuron calculates a value of -2. A ReLU activation changes it to 0. If the value is 5, ReLU keeps it as 5.',
      detail:
        'Common activation functions include ReLU, Sigmoid, Tanh and Softmax. ReLU is commonly used in hidden layers. Sigmoid produces values between 0 and 1 and is commonly used for binary classification outputs. Softmax converts a vector of scores into class probabilities that sum to 1. Tanh produces values between -1 and 1.',
      realLife: {
        problem:
          'A neural network needs to classify photographs into different categories.',
        approach: [
          'Prepare the image data.',
          'Create hidden Dense or convolutional layers.',
          'Use ReLU in suitable hidden layers.',
          'Use Softmax in the output layer for single-label multiclass classification.',
          'Train and evaluate the model.',
        ],
        outcome:
          'The network can learn nonlinear visual patterns and produce class probability estimates.',
      },
      tasks: [
        'Calculate ReLU outputs for -5, 0 and 5.',
        'Compare ReLU, Sigmoid, Tanh and Softmax and identify their output ranges.',
        'Build two classification models using different hidden-layer activation functions and compare their validation performance.',
      ],
      questions: [
        {
          q: 'What is an activation function?',
          a: `It is a mathematical function applied to a neuron's calculated value to produce its output.`,
        },
        {
          q: 'Why are activation functions important?',
          a: 'Nonlinear activation functions allow neural networks to learn nonlinear relationships. Without them, stacked linear layers remain equivalent to a linear transformation.',
        },
        {
          q: 'What is ReLU?',
          a: 'ReLU returns zero for negative inputs and returns the input itself for positive inputs.',
        },
        {
          q: 'What is the difference between Sigmoid and Softmax?',
          a: 'Sigmoid independently maps a value to a range between 0 and 1. Softmax converts a vector of scores into a probability distribution across classes.',
        },
      ],
      code: `import tensorflow as tf

values = tf.constant([-5.0, -2.0, 0.0, 2.0, 5.0])

relu = tf.keras.activations.relu(values)
sigmoid = tf.keras.activations.sigmoid(values)
tanh = tf.keras.activations.tanh(values)

scores = tf.constant([[2.0, 1.0, 0.5]])
softmax = tf.keras.activations.softmax(scores)

print("ReLU:", relu.numpy())
print("Sigmoid:", sigmoid.numpy())
print("Tanh:", tanh.numpy())
print("Softmax:", softmax.numpy())`,
      pitfalls: [
        'Do not use Softmax as a general replacement for ReLU in hidden layers.',
        'Sigmoid can suffer from vanishing gradients when its inputs are very large or very small.',
        'Softmax is commonly used for mutually exclusive multiclass classification, not every multilabel problem.',
        'Choose activation functions according to the task and architecture.',
      ],
    }),

    lesson({
      slug: 'forward-propagation',
      title: 'Forward Propagation',
      summary:
        'Understand how input data moves through a neural network to produce a prediction.',
      definition:
        'Forward propagation is the process of passing input data through the layers of a neural network to calculate its output or prediction.',
      why:
        'A neural network needs to calculate predictions before it can compare them with actual answers and measure its error.',
      purpose:
        'Its purpose is to process input features through the network and generate a prediction.',
      when: [
        'When understanding how neural networks generate predictions.',
        'When calculating the output of a neuron or layer.',
        'When training and evaluating a neural network.',
        'When learning the relationship between forward propagation and backpropagation.',
      ],
      simpleExample:
        'Imagine giving a neural network information about a student. The input features enter the network, pass through hidden layers and finally reach the output layer, which predicts Pass or Fail.',
      detail:
        'During forward propagation, each layer receives the previous layer output, calculates weighted sums, adds biases and applies activation functions. The final layer produces the prediction. During training, the prediction is compared with the target using a loss function.',
      realLife: {
        problem:
          'A school wants to predict student results using study hours and attendance.',
        approach: [
          'Provide study hours and attendance as inputs.',
          'Pass the input values through the first hidden layer.',
          'Calculate weighted sums and apply activation functions.',
          'Pass the resulting values through later layers.',
          'Calculate the final pass or fail prediction.',
        ],
        outcome:
          'The neural network produces a prediction that can be compared with the actual student result.',
      },
      tasks: [
        'Draw a flow diagram showing input, hidden layers and output during forward propagation.',
        'Calculate the output of a single neuron using two inputs, weights and a bias.',
        'Build a Keras model and use predict() to observe its forward-pass predictions.',
      ],
      questions: [
        {
          q: 'What is forward propagation?',
          a: 'It is the process of passing input data through a neural network to calculate a prediction.',
        },
        {
          q: 'What happens during forward propagation?',
          a: 'Each layer calculates weighted sums, adds biases, applies activation functions and passes its outputs to the next layer.',
        },
        {
          q: 'Does forward propagation update weights?',
          a: 'No. A normal forward pass calculates predictions using the current weights. Weight updates happen during the training process after gradients are calculated.',
        },
        {
          q: 'What happens after forward propagation during training?',
          a: 'The prediction is compared with the actual target using a loss function. Backpropagation then calculates gradients for updating the model parameters.',
        },
      ],
      code: `import tensorflow as tf

model = tf.keras.Sequential([
    tf.keras.layers.Input(shape=(2,)),
    tf.keras.layers.Dense(4, activation="relu"),
    tf.keras.layers.Dense(1, activation="sigmoid")
])

inputs = tf.constant([
    [5.0, 80.0],
    [3.0, 60.0]
])

predictions = model(inputs, training=False)

print("Predictions:")
print(predictions.numpy())`,
      pitfalls: [
        'Forward propagation calculates outputs but does not itself update the weights.',
        'The output depends on the current learned weights and biases.',
        'A prediction is not automatically a correct prediction.',
      ],
    }),

    lesson({
      slug: 'backpropagation',
      title: 'Backpropagation',
      summary:
        'Understand how a neural network calculates gradients to improve its predictions.',
      definition:
        'Backpropagation is an algorithm that calculates how the loss changes with respect to the weights and biases of a neural network by applying the chain rule of calculus from the output layer backward through the network.',
      why:
        'A neural network needs to understand how its parameters contributed to the prediction error so that an optimizer can update them and improve future predictions.',
      purpose:
        'Its purpose is to calculate gradients of the loss with respect to the learnable parameters.',
      when: [
        'When training neural networks.',
        'When learning how neural network weights are updated.',
        'When studying gradient-based optimization.',
        'When understanding how TensorFlow calculates gradients.',
      ],
      simpleExample:
        'Imagine a model predicts 70 marks when the actual result is 90. Backpropagation calculates how changing the network weights would affect the error. An optimizer uses these gradients to adjust the weights.',
      detail:
        'Backpropagation begins with the loss at the output. Using the chain rule, it calculates gradients layer by layer toward the earlier layers. These gradients tell the optimizer how the loss changes when each weight or bias changes. Backpropagation calculates gradients; the optimizer applies the parameter updates.',
      realLife: {
        problem:
          'A neural network predicts student marks but makes large errors.',
        approach: [
          'Pass student features through the network.',
          'Calculate predicted marks.',
          'Compare predicted marks with actual marks using a loss function.',
          'Use backpropagation to calculate gradients for the weights and biases.',
          'Use an optimizer to update the parameters.',
          'Repeat the training process over multiple batches and epochs.',
        ],
        outcome:
          'The model can gradually reduce its training loss by updating parameters in directions suggested by the gradients.',
      },
      tasks: [
        'Explain backpropagation using a simple example of a prediction error.',
        'Compare forward propagation and backpropagation.',
        'Use TensorFlow GradientTape to calculate the gradient of a simple mathematical function.',
      ],
      questions: [
        {
          q: 'What is backpropagation?',
          a: 'Backpropagation calculates gradients of the loss with respect to neural network weights and biases using the chain rule.',
        },
        {
          q: 'Why do we use backpropagation?',
          a: 'It tells the training algorithm how changes in the network parameters affect the loss, allowing the optimizer to improve the model.',
        },
        {
          q: 'Does backpropagation update weights directly?',
          a: 'Backpropagation calculates gradients. An optimizer uses those gradients to update the weights and biases.',
        },
        {
          q: 'What is the chain rule?',
          a: 'The chain rule is a calculus rule used to calculate the derivative of a function made from other connected functions. It allows gradients to be calculated through multiple neural network layers.',
        },
      ],
      code: `import tensorflow as tf

weight = tf.Variable(2.0)

with tf.GradientTape() as tape:
    prediction = weight * 3.0
    loss = (prediction - 10.0) ** 2

gradient = tape.gradient(loss, weight)

print("Loss:", loss.numpy())
print("Gradient:", gradient.numpy())`,
      pitfalls: [
        'Backpropagation calculates gradients; it is not the same as an optimizer.',
        'Gradients describe how the loss changes locally as parameters change.',
        'Very small gradients can slow learning in some networks.',
        'Incorrect loss functions or disconnected computations can prevent useful gradients from being calculated.',
      ],
    }),

    lesson({
      slug: 'loss-functions',
      title: 'Loss Functions',
      summary:
        'Understand how a neural network measures the difference between predictions and actual answers.',
      definition:
        'A loss function is a mathematical function that measures how different a model prediction is from the actual target value.',
      why:
        'A neural network needs a measurable objective during training. The loss function provides a numerical signal that helps the optimizer improve the model.',
      purpose:
        'Its purpose is to quantify prediction error so the training process can work toward reducing it.',
      when: [
        'When compiling a neural network.',
        'When choosing an objective for regression.',
        'When training binary or multiclass classification models.',
        'When comparing training and validation loss.',
      ],
      simpleExample:
        'Suppose the actual student mark is 90 and the model predicts 80. A regression loss function calculates how far the prediction is from the actual mark.',
      detail:
        'Different problems need different loss functions. Mean Squared Error is commonly used for regression. Binary Crossentropy is commonly used for binary classification. Categorical Crossentropy is commonly used for multiclass classification with one-hot encoded targets. Sparse Categorical Crossentropy is commonly used for multiclass classification with integer class labels.',
      realLife: {
        problem:
          'A school builds a model to predict student marks and needs to measure its prediction errors.',
        approach: [
          'Collect actual student marks.',
          'Train a model to predict marks.',
          'Choose Mean Squared Error as the regression loss.',
          'Calculate the difference between predicted and actual marks.',
          'Use the loss during training to guide parameter updates.',
        ],
        outcome:
          'The model receives a numerical measure of its prediction error and can be trained to reduce that error.',
      },
      tasks: [
        'Calculate the squared error for actual values of 90 and predicted values of 80.',
        'Compare Mean Squared Error and Mean Absolute Error.',
        'Train a regression model and a binary classification model using suitable loss functions.',
      ],
      questions: [
        {
          q: 'What is a loss function?',
          a: 'A loss function measures how different the model predictions are from the actual target values.',
        },
        {
          q: 'Why is a loss function important?',
          a: 'It provides the objective that the optimizer tries to minimize during training.',
        },
        {
          q: 'Which loss function is commonly used for regression?',
          a: 'Mean Squared Error and Mean Absolute Error are common regression loss functions.',
        },
        {
          q: 'Which loss function is commonly used for binary classification?',
          a: 'Binary Crossentropy is commonly used for binary classification when the model produces suitable probability outputs.',
        },
      ],
      code: `import tensorflow as tf

actual = tf.constant([90.0, 80.0, 70.0])
predicted = tf.constant([80.0, 85.0, 65.0])

mse = tf.keras.losses.MeanSquaredError()

loss = mse(actual, predicted)

print("Mean Squared Error:", loss.numpy())

binary_loss = tf.keras.losses.BinaryCrossentropy()

actual_labels = tf.constant([1.0, 0.0, 1.0])
predicted_probabilities = tf.constant([0.9, 0.2, 0.7])

print(
    "Binary Crossentropy:",
    binary_loss(actual_labels, predicted_probabilities).numpy()
)`,
      pitfalls: [
        'A loss function is not always the same as the final evaluation metric.',
        'Choose a loss function that matches the task and output representation.',
        'A lower training loss does not guarantee good performance on unseen data.',
        'Do not compare loss values from different loss functions as if they were directly equivalent.',
      ],
    }),

    lesson({
      slug: 'gradient-descent',
      title: 'Gradient Descent',
      summary:
        'Understand how a neural network adjusts its weights to reduce prediction error.',
      definition:
        'Gradient Descent is an optimization algorithm that updates model parameters in the direction opposite to the loss gradient in order to reduce the loss.',
      why:
        'Neural networks can contain many learnable weights and biases. Gradient-based optimization helps adjust these values to improve model predictions.',
      purpose:
        'Its purpose is to find parameter values that reduce the chosen loss function.',
      when: [
        'When training neural networks.',
        'When learning how model parameters are updated.',
        'When understanding learning rate.',
        'When studying optimization algorithms.',
      ],
      simpleExample:
        'Imagine standing on a hill and wanting to reach a low point. You look at the slope and take a step downhill. Gradient Descent follows a similar idea: it uses the gradient to decide how to change model parameters to reduce loss.',
      detail:
        'Gradient Descent calculates the gradient of the loss with respect to the parameters and updates them in the opposite direction. The learning rate controls the size of each update. A very large learning rate can overshoot useful values, while a very small learning rate can make training slow.',
      realLife: {
        problem:
          'A neural network makes inaccurate student mark predictions and needs to improve its weights.',
        approach: [
          'Initialize the network weights.',
          'Calculate predictions using forward propagation.',
          'Calculate the loss.',
          'Calculate gradients using backpropagation.',
          'Update weights in the opposite direction of the gradients.',
          'Repeat the process during training.',
        ],
        outcome:
          'The model can gradually find parameter values that reduce the training loss.',
      },
      tasks: [
        'Explain Gradient Descent using the hill analogy.',
        'Compare learning rates of 0.001, 0.01 and 0.1 on a simple optimization problem.',
        'Implement basic Gradient Descent for a simple mathematical function and plot how the loss changes.',
      ],
      questions: [
        {
          q: 'What is Gradient Descent?',
          a: 'Gradient Descent is an optimization algorithm that updates parameters in the direction opposite to the loss gradient to reduce the loss.',
        },
        {
          q: 'What is a learning rate?',
          a: 'The learning rate controls the size of each parameter update during optimization.',
        },
        {
          q: 'What happens if the learning rate is too high?',
          a: 'Updates may overshoot useful parameter values, causing unstable training or preventing convergence.',
        },
        {
          q: 'What happens if the learning rate is too low?',
          a: 'Training may become very slow because parameter updates are too small.',
        },
      ],
      code: `import tensorflow as tf

weight = tf.Variable(0.0)

learning_rate = 0.1

for step in range(10):
    with tf.GradientTape() as tape:
        loss = (weight - 5.0) ** 2

    gradient = tape.gradient(loss, weight)

    weight.assign_sub(learning_rate * gradient)

    print(
        "Step:", step + 1,
        "Weight:", weight.numpy(),
        "Loss:", loss.numpy()
    )`,
      pitfalls: [
        'Gradient Descent does not guarantee finding a global minimum for every non-convex problem.',
        'A learning rate that is too large can make training unstable.',
        'A learning rate that is too small can make training very slow.',
        'Gradient Descent and backpropagation are different: one updates parameters, while the other calculates gradients.',
      ],
    }),

    lesson({
      slug: 'optimizers',
      title: 'Optimizers',
      summary:
        'Understand the algorithms that use gradients to update neural network weights during training.',
      definition:
        'An optimizer is an algorithm that updates the trainable parameters of a neural network using gradients calculated from the loss function.',
      why:
        'Neural networks need their weights and biases to be updated during training. Optimizers control how these updates happen and can affect training speed and stability.',
      purpose:
        'Their purpose is to adjust model parameters to reduce the loss and improve model performance.',
      when: [
        'When compiling a neural network.',
        'When choosing how weights should be updated.',
        'When training large neural networks.',
        'When experimenting with different learning strategies.',
      ],
      simpleExample:
        'Imagine a model repeatedly makes incorrect predictions. An optimizer uses the calculated gradients to adjust its weights. Different optimizers use different update strategies to improve the training process.',
      detail:
        'Common optimizers include SGD, Momentum, RMSprop and Adam. SGD uses gradient-based updates. Momentum uses information from previous updates to smooth movement. RMSprop adapts update sizes using a moving average of squared gradients. Adam combines adaptive learning-rate ideas with momentum-like estimates.',
      realLife: {
        problem:
          'A developer is training an image classification neural network and wants to improve its training process.',
        approach: [
          'Create the neural network architecture.',
          'Choose a suitable loss function.',
          'Select an optimizer such as Adam or SGD.',
          'Compile the model.',
          'Train the model and monitor training and validation performance.',
          'Compare optimizer settings using validation data.',
        ],
        outcome:
          'The developer can identify an optimizer configuration that trains the model effectively for the selected problem.',
      },
      tasks: [
        'Create a Keras model and compile it using SGD.',
        'Train the same model using SGD and Adam and compare training histories.',
        'Experiment with different learning rates and optimizers using a validation dataset.',
      ],
      questions: [
        {
          q: 'What is an optimizer?',
          a: 'An optimizer is an algorithm that updates neural network weights and biases using gradients to reduce the loss.',
        },
        {
          q: 'Name some commonly used optimizers.',
          a: 'SGD, Momentum, RMSprop and Adam are commonly used optimizers.',
        },
        {
          q: 'What is Adam?',
          a: 'Adam is an optimizer that combines momentum-like estimates with adaptive learning-rate adjustments based on moving averages of gradients and squared gradients.',
        },
        {
          q: 'What is the difference between a loss function and an optimizer?',
          a: 'The loss function measures prediction error. The optimizer uses gradients of that loss to update model parameters.',
        },
      ],
      code: `import tensorflow as tf

model = tf.keras.Sequential([
    tf.keras.layers.Input(shape=(2,)),
    tf.keras.layers.Dense(8, activation="relu"),
    tf.keras.layers.Dense(1, activation="sigmoid")
])

model.compile(
    optimizer=tf.keras.optimizers.Adam(
        learning_rate=0.001
    ),
    loss="binary_crossentropy",
    metrics=["accuracy"]
)

model.summary()

print("Optimizer:", model.optimizer)`,
      pitfalls: [
        'An optimizer cannot train a model without a suitable loss and training data.',
        'Adam is popular but is not guaranteed to be the best optimizer for every problem.',
        'The learning rate is important even when using adaptive optimizers.',
        'Compare optimizers using validation performance rather than training loss alone.',
      ],
    }),
  ],
}

export default ch
