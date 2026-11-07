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
      {
        heading: 'What it is',
        body: data.definition,
      },
      {
        heading: 'Why it matters',
        body: data.why,
      },
      {
        heading: 'Purpose',
        body: data.purpose,
      },
      {
        heading: 'When to use it',
        body: data.when.map((item) => `- ${item}`).join('\n'),
      },
      {
        heading: 'Simple example',
        body: data.simpleExample,
      },
      ...(data.detail
        ? [
            {
              heading: 'How it works',
              body: data.detail,
            },
          ]
        : []),
    ],
    {
      title: `Real-life example: ${data.title}`,
      domain: 'deep-learning',
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
          'Understand the working process, important components and architecture of the application.',
      },
      {
        id: `${data.slug}-task-3`,
        title: 'Apply it',
        difficulty: 'hard',
        task: data.tasks[2],
        expectedOutcome:
          'Build a practical solution, evaluate its performance and explain its limitations.',
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
  id: 'deep-learning-applications',
  number: 21,
  title: 'Deep Learning Applications',

  tagline:
    'Understand how Deep Learning enables computers to recognise images, identify objects, separate visual regions, generate images and describe videos.',

  priority: 'extreme',

  topics: [

    // =====================================================
    // 1. IMAGE RECOGNITION
    // =====================================================

    lesson({
      slug: 'image-recognition',
      title: 'Image Recognition',

      summary:
        'Understand how computers identify objects, animals, people and other things inside photographs using Deep Learning.',

      images: [
        {
          src: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=1200&q=85',
          alt: 'Cat wearing sunglasses',
          title: 'Image Recognition Example',
          caption:
            'An image recognition model learns visual patterns and predicts that the photograph contains a cat.',
          width: 1200,
          height: 800,
          fit: 'cover',
        },
        {
          src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=85',
          alt: 'Collection of colourful electronic devices',
          title: 'Recognising Different Categories',
          caption:
            'A trained model can learn to distinguish between different visual categories using labelled examples.',
          width: 1200,
          height: 800,
          fit: 'cover',
        },
      ],

      definition:
        'Image Recognition is a Deep Learning application that allows computers to identify objects, people, animals and other things present in an image. For example, a computer can identify whether a photograph contains a cat, dog, car, person or tree. Convolutional Neural Networks (CNNs) are commonly used for this task.',

      why:
        'Humans can easily understand photographs, but computers receive images as numerical pixel values. They do not automatically understand what those pixels represent. Image Recognition allows a computer to learn visual patterns from thousands of example images. After training, the model can use these learned patterns to identify objects in completely new photographs.',

      purpose:
        'The main purpose of Image Recognition is to automatically understand the visual content of an image and identify which objects or categories are present.',

      when: [
        'When identifying animals such as cats, dogs and birds in photographs.',
        'When automatically organising photographs into different categories.',
        'When identifying plant diseases using leaf photographs.',
        'When recognising handwritten numbers and letters.',
        'When identifying products in online shopping applications.',
        'When building applications that need to understand the overall content of an image.',
      ],

      simpleExample:
        'Imagine that you provide a computer with 1,000 pictures of cats and 1,000 pictures of dogs. Every photograph already has its correct label. The model studies visual features such as ears, eyes, body shapes and textures. After training, you provide a completely new photograph. The model analyses its visual patterns and predicts whether it contains a cat or a dog.',

      detail:
        'Image Recognition generally works through the following steps:\n\n1. Collect Images: Gather photographs representing the categories you want the computer to recognise.\n\n2. Label Images: Assign the correct category to every photograph, such as cat, dog or car.\n\n3. Preprocess Images: Resize photographs and convert their pixel values into numerical data. Normalisation is commonly used to scale pixel values between 0 and 1.\n\n4. Extract Features: A CNN learns visual features such as edges, shapes, textures and more complex object patterns.\n\n5. Train the Model: The neural network compares its predictions with the correct labels and updates its weights to reduce prediction errors.\n\n6. Make Predictions: Provide a new image to the trained model.\n\n7. Classify the Image: The model generates a prediction score for each category. The category with the highest score becomes the predicted class.\n\n8. Evaluate: Test the model using images that were not included during training.\n\nFor example, if the model produces these scores:\n\n- Cat: 0.90\n- Dog: 0.07\n- Bird: 0.03\n\nThe model predicts Cat because it has the highest score.\n\nNote: Image Classification predicts an image-level category, while broader Image Recognition systems can include other tasks such as object detection.',

      realLife: {
        problem:
          'An online shopping website receives thousands of product photographs every day. Employees spend considerable time manually placing products into categories such as shoes, bags, watches and clothes.',

        approach: [
          'Collect thousands of product photographs from different categories.',
          'Label every photograph with its correct product category.',
          'Resize and preprocess the images.',
          'Train a CNN to learn visual patterns associated with different products.',
          'Evaluate the trained model using new product photographs.',
          'Use the trained model to suggest categories for newly uploaded products.',
        ],

        outcome:
          'The website can automatically suggest product categories, reducing manual work. Employees can review uncertain predictions before publishing products.',
      },

      tasks: [
        'Explain Image Recognition in simple words. List five objects that a computer can learn to recognise.',
        'Describe how you would train a CNN to identify cats and dogs. Explain the importance of labelled images, training data and testing data.',
        'Build an image classification model using TensorFlow/Keras and the Fashion MNIST dataset. Train the model, evaluate its test accuracy and display predictions for five test images.',
      ],

      questions: [
        {
          q: 'What is Image Recognition?',
          a: 'Image Recognition is the process of using a computer model to identify objects or categories present in an image. For example, recognising whether a photograph contains a cat, dog or car.',
        },
        {
          q: 'Which Deep Learning architecture is commonly used for Image Recognition?',
          a: 'Convolutional Neural Networks (CNNs) are commonly used because they automatically learn visual features such as edges, shapes, textures and object patterns.',
        },
        {
          q: 'What is Image Classification?',
          a: 'Image Classification means assigning a category or label to an entire image. For example, a model may classify a photograph as a cat or dog.',
        },
        {
          q: 'Why are labelled images required?',
          a: 'Labels provide the correct answers during supervised training. They help the model learn which visual patterns belong to each category.',
        },
        {
          q: 'What is the difference between Image Recognition and Object Detection?',
          a: 'Image Classification identifies the overall category of an image. Object Detection identifies individual objects and also finds their locations using bounding boxes.',
        },
        {
          q: 'What is the role of a CNN in Image Recognition?',
          a: 'A CNN automatically extracts important visual features from images and uses those features to predict the correct category.',
        },
        {
          q: 'What is Softmax?',
          a: 'Softmax is an activation function commonly used in the output layer of a multi-class classification model. It converts output scores into values that sum to 1 and can be interpreted as predicted class probabilities.',
        },
      ],

      code: `import tensorflow as tf
import numpy as np

# Load Fashion MNIST dataset
(x_train, y_train), (x_test, y_test) = (
    tf.keras.datasets.fashion_mnist.load_data()
)

# Normalize pixel values
x_train = x_train.astype("float32") / 255.0
x_test = x_test.astype("float32") / 255.0

# Build the CNN model
model = tf.keras.Sequential([
    tf.keras.layers.Input(shape=(28, 28, 1)),

    tf.keras.layers.Conv2D(
        32,
        kernel_size=3,
        activation="relu"
    ),

    tf.keras.layers.MaxPooling2D(),

    tf.keras.layers.Conv2D(
        64,
        kernel_size=3,
        activation="relu"
    ),

    tf.keras.layers.MaxPooling2D(),

    tf.keras.layers.Flatten(),

    tf.keras.layers.Dense(
        128,
        activation="relu"
    ),

    tf.keras.layers.Dropout(0.3),

    tf.keras.layers.Dense(
        10,
        activation="softmax"
    )
])

# Compile the model
model.compile(
    optimizer="adam",
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"]
)

# Train the model
model.fit(
    x_train[..., np.newaxis],
    y_train,
    epochs=5,
    batch_size=32,
    validation_split=0.2
)

# Evaluate the model
test_loss, test_accuracy = model.evaluate(
    x_test[..., np.newaxis],
    y_test
)

print("Test accuracy:", test_accuracy)

# Predict five test images
predictions = model.predict(
    x_test[:5, ..., np.newaxis]
)

print("Predicted classes:", predictions.argmax(axis=1))
print("Actual classes:", y_test[:5])`,

      pitfalls: [
        'Image Classification predicts an image-level category, while Object Detection also identifies object locations.',
        'A model may perform well on training images but poorly on new images. Always evaluate it using unseen data.',
        'Training and prediction images must use the same preprocessing steps.',
        'Unbalanced datasets can cause poor performance on categories with fewer examples.',
        'A basic Dense neural network can classify images, but CNNs are generally better at learning spatial image patterns.',
        'High accuracy does not always mean that a model performs equally well across every category.',
      ],
    }),

    // =====================================================
    // 2. IMAGE SEGMENTATION
    // =====================================================

    lesson({
      slug: 'image-segmentation',
      title: 'Image Segmentation',

      summary:
        'Understand how computers separate an image into meaningful regions by identifying the category of every pixel.',

      images: [
        {
          src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
          alt: 'Portrait photograph of a person',
          title: 'Image Segmentation Input',
          caption:
            'A segmentation model can identify the exact pixels belonging to a person and separate them from the background.',
          width: 1200,
          height: 800,
          fit: 'cover',
        },
        {
          src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85',
          alt: 'Landscape containing mountains, sky and vegetation',
          title: 'Understanding Image Regions',
          caption:
            'Segmentation can separate different visual regions, such as sky, mountains, roads and vegetation.',
          width: 1200,
          height: 800,
          fit: 'cover',
        },
      ],

      definition:
        'Image Segmentation is a Computer Vision task in which a model divides an image into meaningful regions by assigning a category to every pixel. Unlike basic Image Classification, which identifies what an image contains, Segmentation identifies the exact pixels belonging to each object or region.',

      why:
        'Sometimes identifying an object is not enough. We may also need to understand its exact shape, size and position. Image Segmentation solves this problem by separating objects and regions at the pixel level.',

      purpose:
        'Its main purpose is to identify and separate different parts of an image so that a computer can understand the exact area occupied by each object or region.',

      when: [
        'When identifying roads, vehicles and pedestrians in self-driving cars.',
        'When identifying organs or abnormal regions in medical scans.',
        'When removing or replacing the background of a photograph.',
        'When measuring the area occupied by plants in agricultural images.',
        'When identifying different objects in satellite photographs.',
        'When exact object boundaries are important.',
      ],

      simpleExample:
        'Imagine a photograph containing a person standing in front of a wall. Image Segmentation identifies the pixels belonging to the person and assigns them one label. It assigns the wall and remaining background pixels another label. The final result is a segmentation mask that shows the exact area occupied by the person and the background.',

      detail:
        'Image Segmentation generally follows these steps:\n\n1. Collect Images: Gather photographs or scans that need to be segmented.\n\n2. Create Masks: Prepare a correct pixel-level label for every training image. These labels are stored in segmentation masks.\n\n3. Preprocess: Resize images and their corresponding masks to matching dimensions. Apply compatible transformations to both.\n\n4. Extract Features: A neural network learns important visual information from the input image.\n\n5. Generate Predictions: The model predicts the category of every pixel.\n\n6. Create a Segmentation Mask: Convert the predicted pixel categories into a visual mask.\n\n7. Evaluate: Compare the predicted mask with the correct mask using measures such as Intersection over Union (IoU) and Dice Score.\n\nImportant types of Image Segmentation:\n\n- Semantic Segmentation: Assigns a class to every pixel. All cars receive the same class label.\n\n- Instance Segmentation: Identifies individual objects separately. Two cars receive different object identities.\n\n- Panoptic Segmentation: Combines semantic and instance segmentation to provide a more complete understanding of an image.\n\nU-Net is a popular architecture for segmentation. It uses an encoder to extract features and a decoder to generate a detailed segmentation mask.',

      realLife: {
        problem:
          'A medical research team wants to identify the exact area of an organ in medical scan images so specialists can measure and examine it.',

        approach: [
          'Collect medical scan images.',
          'Ask qualified specialists to prepare accurate pixel-level segmentation masks.',
          'Prepare the images and matching masks for training.',
          'Train a segmentation model such as U-Net.',
          'Compare predicted masks with the correct masks using IoU or Dice Score.',
          'Ask medical specialists to review model predictions.',
        ],

        outcome:
          'The model produces a segmentation mask highlighting the predicted organ area. It can support measurements and image review but should not replace qualified medical professionals.',
      },

      tasks: [
        'Explain Image Segmentation using an image containing a person and a background. What does it mean to label every pixel?',
        'Compare Image Classification, Object Detection and Image Segmentation. Give one real-life example of each.',
        'Study the U-Net architecture and create a small segmentation experiment using a dataset with pixel-level masks. Display the original image, correct mask and predicted mask.',
      ],

      questions: [
        {
          q: 'What is Image Segmentation?',
          a: 'Image Segmentation is the process of assigning a category to every pixel in an image to identify different objects and regions.',
        },
        {
          q: 'What is Semantic Segmentation?',
          a: 'Semantic Segmentation assigns a class label to every pixel. All objects belonging to the same category receive the same label.',
        },
        {
          q: 'What is Instance Segmentation?',
          a: 'Instance Segmentation identifies individual objects separately. For example, two people in one image receive different object identities.',
        },
        {
          q: 'What is Panoptic Segmentation?',
          a: 'Panoptic Segmentation combines Semantic and Instance Segmentation to identify both background regions and individual objects.',
        },
        {
          q: 'What is the difference between Object Detection and Image Segmentation?',
          a: 'Object Detection uses rectangular bounding boxes to locate objects. Image Segmentation identifies the exact pixels that form each object.',
        },
        {
          q: 'What is U-Net?',
          a: 'U-Net is a Deep Learning architecture commonly used for Image Segmentation. It uses an encoder and decoder with skip connections to produce detailed segmentation masks.',
        },
        {
          q: 'What is a Segmentation Mask?',
          a: 'A Segmentation Mask is an image in which pixel values represent the class or region to which each pixel belongs.',
        },
        {
          q: 'What is IoU?',
          a: 'Intersection over Union measures the overlap between a predicted segmentation region and the correct region. A higher IoU generally indicates better segmentation.',
        },
      ],

      pitfalls: [
        'Segmentation usually requires pixel-level masks, which can take considerable time to prepare.',
        'An image and its matching segmentation mask must have the same spatial dimensions.',
        'Semantic Segmentation and Instance Segmentation are different tasks.',
        'Do not evaluate a segmentation model using accuracy alone. IoU and Dice Score are also commonly used.',
        'Incorrectly labelled pixels can negatively affect model performance.',
        'Medical segmentation predictions should be reviewed by qualified professionals.',
      ],
    }),

    // =====================================================
    // 3. OBJECT DETECTION
    // =====================================================

    lesson({
      slug: 'object-detection',
      title: 'Object Detection',

      summary:
        'Understand how computers identify multiple objects in an image and locate them using rectangular bounding boxes.',

      images: [
        {
          src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1200&q=85',
          alt: 'Busy city road with buildings and vehicles',
          title: 'Object Detection Example',
          caption:
            'An object detection system can identify cars, buses, pedestrians and other objects in road images.',
          width: 1200,
          height: 800,
          fit: 'cover',
        },
        {
          src: 'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1200&q=85',
          alt: 'Car photographed outdoors',
          title: 'Vehicle Detection',
          caption:
            'A trained detection model can identify vehicles and predict their locations in an image.',
          width: 1200,
          height: 800,
          fit: 'cover',
        },
      ],

      definition:
        'Object Detection is a Computer Vision task that identifies objects in an image and predicts their exact locations. It provides two important pieces of information: what the object is and where it is located. The location is commonly represented using a rectangle called a Bounding Box.',

      why:
        'In many applications, simply identifying an object is not enough. For example, a traffic monitoring system needs to identify every car and also know where each car is located. Object Detection provides both pieces of information.',

      purpose:
        'Its main purpose is to automatically identify, classify and locate multiple objects inside an image or video.',

      when: [
        'When detecting cars, buses and pedestrians on roads.',
        'When counting people entering or leaving a building.',
        'When checking products on a manufacturing line.',
        'When identifying objects in security camera footage.',
        'When detecting damaged products in warehouses.',
        'When building applications that need to locate multiple objects in one image.',
      ],

      simpleExample:
        'Imagine a photograph showing three cars and two people on a road. An Object Detection model identifies all five objects. It draws a rectangular box around each object and displays its category, such as car or person. It may also display a confidence score indicating how strongly the model supports each prediction.',

      detail:
        'Object Detection generally works through these steps:\n\n1. Collect Images: Gather images containing the objects you want to detect.\n\n2. Annotate Objects: Draw bounding boxes around every object and assign the correct category.\n\n3. Preprocess: Resize images and prepare their bounding box annotations for training.\n\n4. Train the Model: Train a detection architecture such as YOLO using labelled images.\n\n5. Make Predictions: Give a new image to the trained model.\n\n6. Generate Boxes: The model predicts the locations, categories and confidence scores of objects.\n\n7. Filter Predictions: Remove weak or duplicate overlapping predictions using techniques such as Non-Maximum Suppression (NMS).\n\n8. Evaluate: Measure detection performance using precision, recall and mean Average Precision (mAP).\n\nImportant detection terms:\n\n- Bounding Box: A rectangle showing the location of an object.\n- Class Label: The predicted category, such as car, dog or person.\n- Confidence Score: The model confidence associated with a prediction.\n- IoU: Measures the overlap between predicted and actual bounding boxes.\n- NMS: Removes duplicate overlapping predictions.',

      realLife: {
        problem:
          'A traffic department wants to automatically count cars, buses and motorcycles using road camera images.',

        approach: [
          'Collect road images from different locations and weather conditions.',
          'Draw bounding boxes around vehicles in every training image.',
          'Assign the correct category to each vehicle.',
          'Train an object detection model such as YOLO.',
          'Evaluate the model using images that were not used during training.',
          'Use the trained model to detect and count vehicles in new camera frames.',
        ],

        outcome:
          'The system can identify different vehicles, locate them in camera footage and provide estimated traffic counts for further analysis.',
      },

      tasks: [
        'Find a street photograph and draw bounding boxes around every visible car, person and vehicle.',
        'Explain Bounding Boxes, Class Labels, Confidence Scores and IoU. Compare Object Detection with Image Classification.',
        'Use a pretrained YOLO model to detect objects in five images. Display predicted boxes and labels and explain at least three correct or incorrect predictions.',
      ],

      questions: [
        {
          q: 'What is Object Detection?',
          a: 'Object Detection is the process of identifying objects in an image and locating each object using bounding boxes.',
        },
        {
          q: 'What is a Bounding Box?',
          a: 'A Bounding Box is a rectangular box drawn around an object to indicate its location in an image.',
        },
        {
          q: 'What is a Confidence Score?',
          a: 'A Confidence Score indicates how strongly a model supports a particular prediction. It does not guarantee that the prediction is correct.',
        },
        {
          q: 'What is YOLO?',
          a: 'YOLO stands for You Only Look Once. It is a family of object detection models designed to detect objects efficiently in images and videos.',
        },
        {
          q: 'What is Non-Maximum Suppression?',
          a: 'Non-Maximum Suppression is a technique used to remove duplicate or highly overlapping bounding boxes and keep the strongest detection.',
        },
        {
          q: 'What is IoU in Object Detection?',
          a: 'Intersection over Union measures the overlap between a predicted bounding box and the actual bounding box. It is used to evaluate how accurately an object has been located.',
        },
        {
          q: 'What is mAP in Object Detection?',
          a: 'Mean Average Precision is an evaluation metric that measures object detection performance across categories using precision and recall at specified IoU thresholds.',
        },
      ],

      pitfalls: [
        'Object Detection is different from Image Classification because it also predicts object locations.',
        'A high confidence score does not guarantee a correct detection.',
        'Small, hidden and overlapping objects can be difficult to detect.',
        'Poor-quality bounding box annotations can reduce model performance.',
        'Always evaluate the model using images that represent real-world conditions.',
        'NMS can remove duplicate detections but may also affect closely positioned objects if its settings are unsuitable.',
      ],
    }),

    // =====================================================
    // 4. AUTOMATIC IMAGE CAPTIONING
    // =====================================================

    lesson({
      slug: 'automatic-image-captioning',
      title: 'Automatic Image Captioning',

      summary:
        'Understand how Deep Learning models analyse an image and automatically generate a meaningful sentence describing it.',

      images: [
        {
          src: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1200&q=85',
          alt: 'Dog looking towards the camera',
          title: 'Image Captioning Example',
          caption:
            'An image captioning model can analyse the dog and its surroundings and generate a natural-language description.',
          width: 1200,
          height: 800,
          fit: 'cover',
        },
        {
          src: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=85',
          alt: 'Dog sitting outdoors',
          title: 'From Image to Text',
          caption:
            'A model converts visual information into a sentence describing the objects and activities in a photograph.',
          width: 1200,
          height: 800,
          fit: 'cover',
        },
      ],

      definition:
        'Automatic Image Captioning is a Deep Learning application that analyses an image and automatically generates a sentence describing its content. For example, when a model receives a photograph of a dog running on grass, it may generate the sentence: "A brown dog is running in a grassy field."',

      why:
        'Computers can identify objects in photographs, but understanding and describing the complete scene requires additional information. Image Captioning combines Computer Vision and Natural Language Processing (NLP) to convert visual information into meaningful sentences.',

      purpose:
        'Its main purpose is to automatically describe the content of an image using human-readable text.',

      when: [
        'When automatically generating descriptions for photographs.',
        'When helping visually impaired users understand image content.',
        'When creating searchable descriptions for large image collections.',
        'When generating descriptions for online shopping products.',
        'When building applications that combine Computer Vision and NLP.',
        'When automatically creating captions for uploaded images.',
      ],

      simpleExample:
        'Imagine uploading a photograph showing a dog running through a green field. The model analyses the photograph, identifies the dog and understands the activity. It then generates a sentence such as "A brown dog is running in a grassy field." The sentence is generated automatically without a person typing it.',

      detail:
        'A basic Image Captioning system commonly contains two main components:\n\n1. Image Encoder: A CNN or Vision Transformer processes the image and extracts useful visual features. These features represent information such as objects, shapes and scenes.\n\n2. Text Decoder: An LSTM or Transformer receives the extracted visual information and generates a sentence one word at a time.\n\nExample of caption generation:\n\n- Input: A photograph of a dog running in a field.\n- First word: A\n- Second word: dog\n- Third word: is\n- Fourth word: running\n- Fifth word: outside\n\nFinal caption: "A dog is running outside."\n\nTraining Process:\n\n1. Collect photographs and their matching human-written captions.\n2. Convert each image into numerical visual features.\n3. Convert captions into sequences of tokens.\n4. Train the decoder to predict the next word using image features and previous words.\n5. Evaluate generated captions on unseen images.\n\nThe model learns the relationship between visual information and language through image-caption pairs.',

      realLife: {
        problem:
          'A photo-sharing website receives millions of photographs and wants to provide automatic descriptions so users can understand and search for images more easily.',

        approach: [
          'Collect photographs and their corresponding human-written captions.',
          'Use an image encoder such as a CNN to extract visual features.',
          'Pass the extracted features to a text decoder.',
          'Train the decoder using the correct image-caption pairs.',
          'Generate a caption for a completely new photograph.',
          'Check the generated caption for incorrect or misleading descriptions.',
        ],

        outcome:
          'The website can automatically suggest a short description for every uploaded photograph, making image collections easier to understand and search.',
      },

      tasks: [
        'Choose five photographs and write one sentence describing the main objects and activities in each photograph.',
        'Draw an Encoder-Decoder architecture diagram. Explain how the image encoder and text decoder work together.',
        'Use a pretrained image captioning model to generate captions for five images. Compare the generated captions with your own descriptions and identify incorrect details.',
      ],

      questions: [
        {
          q: 'What is Automatic Image Captioning?',
          a: 'Automatic Image Captioning is the process of analysing an image and generating a natural-language sentence describing its content.',
        },
        {
          q: 'Which two main components are used in a basic Image Captioning system?',
          a: 'A basic system uses an Image Encoder to extract visual information and a Text Decoder to generate a sentence.',
        },
        {
          q: 'What is the role of CNN in Image Captioning?',
          a: 'A CNN can work as an image encoder. It extracts visual features such as objects, shapes and patterns from an image.',
        },
        {
          q: 'What is the role of LSTM in Image Captioning?',
          a: 'An LSTM can work as a text decoder. It generates words sequentially while using information from previously generated words.',
        },
        {
          q: 'How is Image Captioning different from Image Classification?',
          a: 'Image Classification predicts a category such as dog. Image Captioning generates a complete sentence describing the scene.',
        },
        {
          q: 'What is an Encoder-Decoder architecture?',
          a: 'It is a model architecture in which an encoder converts input information into useful features and a decoder uses those features to generate an output.',
        },
        {
          q: 'What is Teacher Forcing?',
          a: 'Teacher Forcing is a training technique in which the decoder receives the actual previous word from the correct caption instead of always receiving its own previous prediction.',
        },
      ],

      pitfalls: [
        'A generated caption may sound correct but still describe something that is not present in the image.',
        'Models may miss small objects or important details in crowded photographs.',
        'Training requires suitable image-caption pairs.',
        'A model may describe objects correctly but misunderstand the action taking place.',
        'Always review generated captions when accuracy and accessibility are important.',
        'A caption should describe the image accurately rather than inventing objects or activities.',
      ],
    }),

    // =====================================================
    // 5. IMAGE GENERATION USING GANS
    // =====================================================

    lesson({
      slug: 'image-generation-using-gans',
      title: 'Image Generation Using GANs',

      summary:
        'Understand how two neural networks compete with each other to generate new images that look similar to real photographs.',

      images: [
        {
          src: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=1200&q=85',
          alt: 'Colourful abstract artwork',
          title: 'Generative Image Example',
          caption:
            'Generative models learn patterns from existing images and can produce new synthetic visual content.',
          width: 1200,
          height: 800,
          fit: 'cover',
        },
        {
          src: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=85',
          alt: 'Colourful abstract digital patterns',
          title: 'Synthetic Visual Patterns',
          caption:
            'A trained Generator can produce different outputs by using different random input vectors.',
          width: 1200,
          height: 800,
          fit: 'cover',
        },
      ],

      definition:
        'A Generative Adversarial Network (GAN) is a Deep Learning architecture containing two neural networks: a Generator and a Discriminator. The Generator creates synthetic images, while the Discriminator tries to identify whether an image is real or generated by the Generator.',

      why:
        'Most traditional machine learning models focus on recognising or classifying existing information. GANs are designed to learn patterns from existing data and generate completely new samples that resemble the training data.',

      purpose:
        'The main purpose of GANs is to generate new synthetic data, such as images, by learning the visual patterns and characteristics of real training examples.',

      when: [
        'When generating artificial images for creative projects.',
        'When creating synthetic training images for research.',
        'When experimenting with image-to-image translation.',
        'When generating artificial human faces or objects for experiments.',
        'When studying how neural networks can create new content.',
        'When experimenting with generative Deep Learning models.',
      ],

      simpleExample:
        'Imagine two people playing a game. The first person creates fake currency notes, while the second person tries to identify which notes are fake. The first person keeps improving the fake notes, and the second person keeps improving their ability to identify them. In a GAN, the Generator is the first person and the Discriminator is the second person.',

      detail:
        'A GAN contains two important neural networks:\n\n1. Generator:\n\nThe Generator receives random numerical input called Noise and converts it into a synthetic image. Its goal is to create images that look similar to real training images.\n\n2. Discriminator:\n\nThe Discriminator receives both real training images and generated images. Its goal is to identify whether an image is real or fake.\n\nGAN Training Process:\n\n1. Generate Noise: Create a random numerical vector.\n\n2. Generate Image: Give the random vector to the Generator to create a synthetic image.\n\n3. Discriminator Input: Provide both real images and generated images to the Discriminator.\n\n4. Discriminator Prediction: The Discriminator predicts whether each image is real or generated.\n\n5. Train Discriminator: Update the Discriminator to improve its ability to distinguish real and fake images.\n\n6. Train Generator: Update the Generator so that its images become more difficult for the Discriminator to identify.\n\n7. Repeat: Continue training both networks through their competing objectives.\n\nAfter successful training, the Generator can produce realistic-looking images that resemble the training dataset.\n\nImportant Terms:\n\n- Generator: Creates synthetic data.\n- Discriminator: Distinguishes real data from generated data.\n- Noise: Random numerical input used by the Generator.\n- Mode Collapse: A problem in which the Generator produces only a limited variety of outputs.',

      realLife: {
        problem:
          'A research team wants to generate additional synthetic images that resemble a collection of handwritten digits for a Deep Learning experiment.',

        approach: [
          'Collect and prepare a dataset of real handwritten digit images.',
          'Build a Generator that creates images from random noise.',
          'Build a Discriminator that identifies real and generated images.',
          'Train both networks using an alternating training process.',
          'Generate sample images at different stages of training.',
          'Evaluate the quality and variety of the generated digits.',
        ],

        outcome:
          'The trained Generator can create new synthetic handwritten digit images that resemble the original dataset. These generated images can be used for controlled experiments.',
      },

      tasks: [
        'Explain the roles of the Generator and Discriminator using the fake currency note example.',
        'Draw the complete GAN architecture showing random noise, Generator, generated images, real images and Discriminator.',
        'Build a simple GAN using the MNIST handwritten digit dataset. Train it and display a grid of generated digits at different training stages.',
      ],

      questions: [
        {
          q: 'What is a GAN?',
          a: 'A Generative Adversarial Network is a Deep Learning architecture containing a Generator and a Discriminator that compete during training to generate realistic-looking data.',
        },
        {
          q: 'What is the role of the Generator?',
          a: 'The Generator creates new synthetic data, such as images, using random input noise. It tries to generate outputs that the Discriminator considers real.',
        },
        {
          q: 'What is the role of the Discriminator?',
          a: 'The Discriminator checks whether an image comes from the real training dataset or was generated by the Generator.',
        },
        {
          q: 'Why is it called Adversarial?',
          a: 'It is called adversarial because the two networks have competing objectives. The Generator tries to fool the Discriminator, while the Discriminator tries to detect generated images.',
        },
        {
          q: 'What is random noise in GANs?',
          a: 'Random noise is a vector of randomly generated numerical values provided to the Generator. The Generator uses it to create different synthetic outputs.',
        },
        {
          q: 'What is Mode Collapse?',
          a: 'Mode Collapse is a GAN training problem in which the Generator produces only a limited variety of similar images instead of generating diverse outputs.',
        },
        {
          q: 'What is the difference between Generative and Discriminative models?',
          a: 'Generative models learn patterns that allow them to generate new data. Discriminative models learn to distinguish between categories or predict labels for existing data.',
        },
      ],

      pitfalls: [
        'The Generator learns patterns from training data; it does not simply copy every training image.',
        'GAN training can be unstable and may require careful parameter tuning.',
        'Mode Collapse can cause the Generator to produce very similar images repeatedly.',
        'Generated images may contain unrealistic or incorrect details.',
        'Synthetic images should never be presented as genuine photographs.',
        'A Generator producing realistic images does not automatically mean that the GAN has learned a diverse representation of the dataset.',
      ],
    }),

    // =====================================================
    // 6. VIDEO-TO-TEXT USING LSTM
    // =====================================================

    lesson({
      slug: 'video-to-text-using-lstm',
      title: 'Video-to-Text Using LSTM',

      summary:
        'Understand how computers analyse video frames in sequence and generate text describing the activities taking place.',

      images: [
        {
          src: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85',
          alt: 'People working together in an office',
          title: 'Video Understanding Example',
          caption:
            'A video understanding model can analyse multiple frames to understand the activities taking place.',
          width: 1200,
          height: 800,
          fit: 'cover',
        },
        {
          src: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=85',
          alt: 'Person playing cricket on a field',
          title: 'Understanding Actions Over Time',
          caption:
            'The order of video frames helps a model understand activities and changes over time.',
          width: 1200,
          height: 800,
          fit: 'cover',
        },
      ],

      definition:
        'Video-to-Text is a Deep Learning application in which a computer analyses a video and generates a text description of the activities or events taking place. A traditional approach combines a CNN to extract information from video frames and an LSTM to understand the sequence of frames and generate text.',

      why:
        'A single image shows only one moment, but a video contains multiple frames arranged in a particular order. Understanding this order is important because it helps a computer identify actions, activities and events over time.',

      purpose:
        'Its main purpose is to automatically convert video content into a readable sentence or short description.',

      when: [
        'When generating descriptions for uploaded video clips.',
        'When creating searchable text summaries for video libraries.',
        'When helping users understand the main activities in a video.',
        'When building automatic video captioning applications.',
        'When studying activity recognition and sequence learning.',
        'When experimenting with CNN and LSTM architectures.',
      ],

      simpleExample:
        'Imagine a short video showing a person entering a room, picking up a bag and leaving. The model selects frames from the video and processes them in the correct order. It then generates a sentence such as "A person picks up a bag and walks out of the room." The sequence of frames helps the model understand what happened.',

      detail:
        'A CNN-LSTM Video-to-Text system generally works through these steps:\n\n1. Video Input: The model receives a video containing multiple frames.\n\n2. Frame Extraction: Important frames are selected from the video in chronological order.\n\n3. CNN Feature Extraction: A CNN processes each selected frame and extracts useful visual information, such as objects and scene features.\n\n4. Sequence Formation: The extracted features are arranged in the same order as the original video frames.\n\n5. LSTM Processing: The feature sequence is passed to an LSTM one time step at a time. The LSTM uses information from previous time steps to understand how the video changes over time.\n\n6. Text Generation: A decoder uses the learned sequence information to generate a sentence.\n\n7. Final Output: The model produces a description of the main action or event.\n\nExample:\n\nVideo frames:\n\nPerson enters → Person picks up a bag → Person leaves.\n\nGenerated text:\n\n"A person enters a room, picks up a bag and leaves."\n\nWhy combine CNN and LSTM?\n\n- CNN understands visual information from individual frames.\n- LSTM learns the sequence and temporal relationship between frames.\n- Together, they can help a computer describe activities in a video.\n\nLSTMs are useful for learning sequence information, although modern video understanding systems also use Transformer-based architectures.',

      realLife: {
        problem:
          'A video-sharing platform contains thousands of activity videos and wants to generate short descriptions so users can search for videos using text.',

        approach: [
          'Collect short videos and their correct text descriptions.',
          'Extract selected frames from each video in chronological order.',
          'Use a CNN to convert every frame into a feature representation.',
          'Pass the sequence of extracted features into an LSTM.',
          'Train the model using video sequences and their matching descriptions.',
          'Generate a description for a new video and evaluate whether it describes the activity correctly.',
        ],

        outcome:
          'The platform can automatically generate short descriptions of video activities, making video content easier to search and understand.',

      },

      tasks: [
        'Explain why a video must be treated as a sequence instead of a single image. Give an example where the order of actions changes the meaning.',
        'Draw a CNN-to-LSTM workflow showing video frames, CNN feature extraction, LSTM processing and generated text. Explain the role of each component.',
        'Create a small video activity-description experiment using labelled video clips. Extract frames, build a sequence model or use a pretrained model, and compare generated descriptions with the correct captions.',
      ],

      questions: [
        {
          q: 'What is Video-to-Text?',
          a: 'Video-to-Text is the process of analysing a video and automatically generating a written description of the activities or events shown in it.',
        },
        {
          q: 'Why are video frames processed in sequence?',
          a: 'The order of video frames contains information about how an activity happens over time. Processing them in sequence helps the model understand actions and events.',
        },
        {
          q: 'What is the role of CNN in a CNN-LSTM video model?',
          a: 'The CNN extracts visual features from individual video frames, such as objects, shapes and scene information.',
        },
        {
          q: 'What is the role of LSTM?',
          a: 'An LSTM processes the extracted frame features in sequence and uses information from previous time steps to understand activities over time.',
        },
        {
          q: 'What is the difference between Image Captioning and Video-to-Text?',
          a: 'Image Captioning describes a single image. Video-to-Text describes activities across multiple frames and must understand changes and action order over time.',
        },
        {
          q: 'Why is CNN combined with LSTM?',
          a: 'CNN extracts visual information from each frame, while LSTM learns how that information changes over time. Together, they can help describe activities in a video.',
        },
        {
          q: 'What is a time step in an LSTM?',
          a: 'A time step represents one position in a sequence. In a video model, each time step may contain the extracted visual features of one selected frame.',
        },
      ],

      pitfalls: [
        'Randomly changing the order of frames can remove important action information.',
        'Extracting too few frames may cause the model to miss important activities.',
        'Extracting too many frames can increase memory usage and training time.',
        'The model may struggle with fast actions or activities that are partially hidden.',
        'Training requires suitable video-description pairs.',
        'CNN-LSTM is a useful traditional learning architecture, but it is not the only or always the best modern video understanding approach.',
      ],
    }),
  ],
}

export default ch