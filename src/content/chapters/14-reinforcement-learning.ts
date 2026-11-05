
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
  id: 'reinforcement-learning',
  number: 14,
  title: 'Reinforcement Learning',
  tagline:
    'Understand how machines learn through actions, rewards, and trial and error.',
  priority: 'extreme',
  topics: [
    lesson({
      slug: 'introduction-to-reinforcement-learning',
      title: 'Introduction to Reinforcement Learning',
      summary:
        'Learn how an agent improves its decisions by trying actions and receiving rewards or penalties.',
      definition:
        'Reinforcement Learning (RL) is a type of Machine Learning in which an agent learns how to make decisions by interacting with an environment. It receives rewards for good actions and penalties or smaller rewards for undesirable actions. Over time, it learns a strategy that aims to maximize its total reward.',
      why:
        'In many real-world problems, it is difficult to provide the correct answer for every situation. Reinforcement Learning allows a machine to learn from the results of its own actions instead of depending on a dataset containing the correct answer for every example.',
      purpose:
        'The main purpose is to teach an agent how to make better decisions over time. It learns a strategy, called a policy, that helps it choose actions to achieve a goal and maximize long-term rewards.',
      when: [
        'When a system needs to make a sequence of decisions.',
        'When actions affect what happens next.',
        'When an agent can learn through feedback from its environment.',
        'When the goal is to maximize long-term rewards rather than just one immediate result.',
      ],
      simpleExample:
        'Imagine teaching a robot to reach a destination in a room. When it moves closer to the destination, it receives a positive reward. When it hits a wall, it receives a penalty. Initially, it makes mistakes, but after many attempts, it learns a better route.',
      detail:
        'A basic Reinforcement Learning process works like this:\n\n1. The agent observes the current situation.\n2. It chooses an action.\n3. The environment responds to that action.\n4. The agent receives a reward or penalty.\n5. It observes the new situation.\n6. It uses this experience to improve future decisions.\n\nThis process repeats until the agent learns a useful strategy. The strategy it follows to choose actions is called a policy.',
      realLife: {
        problem:
          'A robot needs to learn how to move through a room without hitting obstacles.',
        approach: [
          'The robot observes its current position.',
          'It tries moving forward, backward, left, or right.',
          'It receives a reward for reaching the destination and penalties for hitting obstacles.',
          'It learns from repeated attempts.',
        ],
        outcome:
          'The robot gradually learns a route that helps it reach the destination while avoiding obstacles.',
      },
      tasks: [
        'Explain Reinforcement Learning using a simple game example.',
        'Compare Supervised Learning and Reinforcement Learning with examples.',
        'Design a basic Reinforcement Learning problem for a robot navigating a grid.',
      ],
      questions: [
        {
          q: 'What is Reinforcement Learning?',
          a:
            'Reinforcement Learning is a type of Machine Learning in which an agent learns by interacting with an environment and receiving rewards or penalties for its actions.',
          followUp:
            'Unlike Supervised Learning, it does not require a correct labeled answer for every action.',
        },
        {
          q: 'How does Reinforcement Learning work?',
          a:
            'The agent observes the environment, chooses an action, receives a reward, and learns from the result. It repeats this process to improve its decisions.',
        },
        {
          q: 'What is the main goal of Reinforcement Learning?',
          a:
            'Its main goal is to learn a policy that maximizes the expected total reward over time.',
        },
        {
          q: 'What is a policy in Reinforcement Learning?',
          a:
            'A policy is the strategy an agent uses to decide which action to take in a particular state.',
        },
        {
          q: 'Where is Reinforcement Learning used?',
          a:
            'It is used in robotics, game playing, resource allocation, traffic signal control, and some recommendation and optimization systems.',
        },
      ],
      code: `# A simple example of learning through rewards

actions = ["left", "right", "forward"]

rewards = {
    "left": -1,
    "right": 10,
    "forward": 2
}

for action in actions:
    print("Action:", action)
    print("Reward:", rewards[action])

best_action = max(rewards, key=rewards.get)

print("Best action:", best_action)
print("Best reward:", rewards[best_action])`,
      pitfalls: [
        'Reinforcement Learning is not simply memorizing which action gives the highest immediate reward.',
        'An action with a small immediate reward may lead to a much larger future reward.',
        'Learning can require many interactions and significant computation.',
        'A reward function that is poorly designed can encourage unwanted behavior.',
      ],
    }),

    lesson({
      slug: 'agent-and-environment',
      title: 'Agent and Environment',
      summary:
        'Understand the learner that makes decisions and the world in which it operates.',
      definition:
        'An agent is the learner or decision-maker in Reinforcement Learning. An environment is the world or system with which the agent interacts. The agent takes actions, and the environment responds by providing a new state and a reward.',
      why:
        'The agent and environment form the foundation of Reinforcement Learning. Understanding their relationship helps us identify what is learning, where it is learning, and how feedback is received.',
      purpose:
        'The purpose is to define the interaction between the decision-making system and the world in which it operates. This makes it possible to design a learning problem clearly.',
      when: [
        'When designing a Reinforcement Learning problem.',
        'When building a robot that interacts with its surroundings.',
        'When creating an AI that learns to play a game.',
        'When identifying the system that makes decisions and the system that responds.',
      ],
      simpleExample:
        'Imagine an AI playing chess. The AI is the agent, and the chess game is the environment. The AI chooses a move, and the game updates the board and tells the AI whether the game has ended or whether it has won or lost.',
      detail:
        'The interaction usually follows this sequence:\n\n1. The environment provides the current state to the agent.\n2. The agent selects an action using its policy.\n3. The environment processes the action.\n4. The environment returns the next state and a reward.\n5. The agent uses this feedback to improve its decisions.\n\nThis interaction continues until the task finishes or the learning process stops.',
      realLife: {
        problem:
          'A self-driving robot needs to navigate a warehouse and avoid obstacles.',
        approach: [
          'The robot acts as the agent.',
          'The warehouse, including shelves, walls, and other objects, acts as the environment.',
          'The robot observes its surroundings and chooses movement actions.',
          'The environment responds with the robot’s updated position and feedback.',
        ],
        outcome:
          'The robot learns to interact with the warehouse environment and improve its navigation decisions.',
      },
      tasks: [
        'Identify the agent and environment in a chess-playing AI.',
        'Explain the agent-environment interaction in a self-driving car.',
        'Design an agent-environment setup for a robot that delivers packages.',
      ],
      questions: [
        {
          q: 'What is an agent in Reinforcement Learning?',
          a:
            'An agent is the learner or decision-maker that observes the environment and chooses actions to achieve a goal.',
        },
        {
          q: 'What is an environment?',
          a:
            'An environment is the external system or world with which the agent interacts. It responds to the agent’s actions and provides new states and rewards.',
        },
        {
          q: 'What is the difference between an agent and an environment?',
          a:
            'The agent makes decisions and performs actions, while the environment receives those actions and provides feedback.',
        },
        {
          q: 'Can you give an example of an agent and environment?',
          a:
            'In a video game, the AI player is the agent and the game world is the environment.',
        },
        {
          q: 'What happens after an agent takes an action?',
          a:
            'The environment updates according to the action and returns the next state and a reward.',
        },
      ],
      code: `# Simple agent and environment interaction

class Environment:
    def __init__(self):
        self.position = 0
        self.goal = 5

    def step(self, action):
        if action == "right":
            self.position += 1
        elif action == "left":
            self.position -= 1

        reward = 10 if self.position == self.goal else -1
        done = self.position == self.goal

        return self.position, reward, done


class Agent:
    def choose_action(self):
        return "right"


environment = Environment()
agent = Agent()

done = False

while not done:
    action = agent.choose_action()

    state, reward, done = environment.step(action)

    print(
        "Action:", action,
        "| State:", state,
        "| Reward:", reward
    )`,
      pitfalls: [
        'The agent and environment are different parts of the learning system.',
        'The environment does not necessarily teach the agent directly; it provides feedback from which the agent learns.',
        'An environment can be physical, simulated, or software-based.',
      ],
    }),

    lesson({
      slug: 'rewards-in-reinforcement-learning',
      title: 'Rewards',
      summary:
        'Learn how rewards and penalties guide an agent toward achieving its goal.',
      definition:
        'A reward is a numerical value given by the environment after an agent takes an action. A positive reward encourages desirable outcomes, while a negative reward or penalty discourages undesirable outcomes. The agent tries to maximize its expected total reward over time.',
      why:
        'Rewards provide feedback about the results of actions. Without a reward signal, the agent would have no clear way to evaluate whether its decisions are helping it achieve the goal.',
      purpose:
        'The purpose of a reward is to guide the agent’s learning. It defines what outcomes the system should encourage and helps the agent learn which decisions are useful.',
      when: [
        'When defining the goal of a Reinforcement Learning problem.',
        'When encouraging an agent to complete a task.',
        'When discouraging unsafe or unwanted actions.',
        'When evaluating the results of an agent’s decisions.',
      ],
      simpleExample:
        'Imagine a robot learning to reach a charging station. It receives +10 points when it reaches the station, -5 points when it hits an obstacle, and -1 point for each unnecessary movement. These rewards encourage the robot to reach the station safely and efficiently.',
      detail:
        'A reward is usually represented by R or R(s, a, s′), depending on the problem. The reward can be immediate, but the agent also considers future rewards.\n\nFor example, an action might give only +1 immediately but lead to a situation where the agent can earn +100 later. A good strategy considers the total expected future reward, not just the immediate score.\n\nThe discount factor, usually represented by gamma (γ), controls how much future rewards matter compared with immediate rewards.',
      realLife: {
        problem:
          'An online delivery robot must deliver packages quickly while avoiding dangerous routes.',
        approach: [
          'Give a positive reward for successful delivery.',
          'Give a penalty for collisions or entering restricted areas.',
          'Apply a small movement cost to discourage unnecessary travel.',
          'Evaluate whether the reward design encourages safe and efficient behavior.',
        ],
        outcome:
          'The reward system encourages the robot to complete deliveries while avoiding undesirable actions.',
      },
      tasks: [
        'Create a reward system for an AI that plays a simple game.',
        'Compare two reward systems for a robot navigating a room.',
        'Design a reward function that balances speed, safety, and successful delivery.',
      ],
      questions: [
        {
          q: 'What is a reward in Reinforcement Learning?',
          a:
            'A reward is a numerical feedback value provided by the environment after an agent takes an action.',
        },
        {
          q: 'What is a positive reward?',
          a:
            'A positive reward encourages an agent by assigning a positive value to a desirable outcome.',
        },
        {
          q: 'What is a penalty?',
          a:
            'A penalty is a negative reward or cost that discourages an undesirable action or outcome.',
        },
        {
          q: 'Does an agent always choose the action with the highest immediate reward?',
          a:
            'No. It should consider future rewards too. An action with a smaller immediate reward may lead to a better long-term outcome.',
        },
        {
          q: 'What is a reward function?',
          a:
            'A reward function defines how numerical rewards are assigned to situations, actions, or transitions in an environment.',
        },
      ],
      code: `# A simple reward function

def calculate_reward(reached_goal, hit_obstacle, steps):
    if hit_obstacle:
        return -5

    if reached_goal:
        return 10

    return -1


print(
    "Reached goal:",
    calculate_reward(True, False, 5)
)

print(
    "Hit obstacle:",
    calculate_reward(False, True, 3)
)

print(
    "Normal movement:",
    calculate_reward(False, False, 1)
)`,
      pitfalls: [
        'A reward is feedback, not necessarily a complete explanation of why an action was good or bad.',
        'Rewarding only immediate results can lead to poor long-term decisions.',
        'A badly designed reward function can cause reward hacking, where the agent maximizes the score without achieving the intended goal.',
        'A negative reward is not always required; some environments use positive rewards and costs in different ways.',
      ],
    }),

    lesson({
      slug: 'states-and-actions',
      title: 'States and Actions',
      summary:
        'Understand what an agent observes and the choices it can make in each situation.',
      definition:
        'A state describes the current situation of the environment as observed or represented for the agent. An action is a choice the agent can make in that state. The action can change the environment and lead to a new state.',
      why:
        'States and actions describe the decision-making process. The agent needs information about its current situation and a set of possible choices before it can learn how to act.',
      purpose:
        'The purpose is to represent the situations an agent can encounter and the decisions it can make. This allows the learning algorithm to connect actions with their results.',
      when: [
        'When defining the possible situations in an environment.',
        'When deciding which actions an agent is allowed to take.',
        'When building game-playing or robotic systems.',
        'When creating a Q-table for Q-Learning.',
      ],
      simpleExample:
        'Imagine a robot moving inside a small room. Its state could be its current grid position, such as (2, 3). Its possible actions could be moving up, down, left, or right. After moving right, it may reach a new state such as (2, 4).',
      detail:
        'A Reinforcement Learning transition can be represented as:\n\nCurrent State → Action → Next State → Reward\n\nFor example:\n\n- Current state: The robot is at position (2, 3).\n- Action: Move right.\n- Next state: The robot reaches position (2, 4).\n- Reward: The environment gives a reward based on the result.\n\nThe complete set of possible states is called the state space. The complete set of possible actions is called the action space.\n\nSome environments have discrete states and actions, such as a grid game. Others have continuous states and actions, such as a robot controlling its speed or steering angle.',
      realLife: {
        problem:
          'A robot must move through a grid to reach a destination.',
        approach: [
          'Represent each grid position as a state.',
          'Define up, down, left, and right as possible actions.',
          'Update the robot’s position after every action.',
          'Give feedback based on whether it moves closer to the destination or hits an obstacle.',
        ],
        outcome:
          'The robot can learn which actions are useful in different positions.',
      },
      tasks: [
        'List the states and actions for a simple maze game.',
        'Compare discrete and continuous states with real-world examples.',
        'Design a grid environment with states, actions, rewards, and a destination.',
      ],
      questions: [
        {
          q: 'What is a state in Reinforcement Learning?',
          a:
            'A state represents the current situation of the environment that the agent uses to make a decision.',
        },
        {
          q: 'What is an action?',
          a:
            'An action is a decision or movement that an agent can perform in its current state.',
        },
        {
          q: 'What is a state space?',
          a:
            'A state space is the complete set of possible states that an agent can encounter in an environment.',
        },
        {
          q: 'What is an action space?',
          a:
            'An action space is the complete set of actions available to an agent.',
        },
        {
          q: 'What is the difference between a state and an action?',
          a:
            'A state describes where or how the agent currently is, while an action describes what the agent chooses to do next.',
        },
      ],
      code: `# A simple grid environment

state = (2, 3)

actions = {
    "up": (-1, 0),
    "down": (1, 0),
    "left": (0, -1),
    "right": (0, 1)
}

action = "right"

row_change, column_change = actions[action]

new_state = (
    state[0] + row_change,
    state[1] + column_change
)

print("Current state:", state)
print("Chosen action:", action)
print("Next state:", new_state)`,
      pitfalls: [
        'A state should contain enough relevant information for making decisions.',
        'An action is not the same as a reward; the action is the choice and the reward is feedback.',
        'Large state spaces can make learning more difficult.',
        'Continuous states may require algorithms that can handle numerical values rather than a simple table.',
      ],
    }),

    lesson({
      slug: 'q-learning',
      title: 'Q-Learning',
      summary:
        'Learn how an agent estimates the value of actions in different states and uses those estimates to make decisions.',
      definition:
        'Q-Learning is a model-free, off-policy Reinforcement Learning algorithm. It learns a Q-value for each state-action pair. A Q-value estimates the expected long-term reward of taking a particular action in a particular state and then following a good policy.',
      why:
        'An agent may have many possible actions and may not know which one is best. Q-Learning helps it learn the value of different actions through experience, without needing a complete model of how the environment works.',
      purpose:
        'The purpose is to learn which action is most useful in each state. The agent stores its learned values in a Q-table for small, discrete problems and uses them to select actions.',
      when: [
        'When solving small problems with a limited number of states and actions.',
        'When building simple game-playing agents.',
        'When teaching an agent to navigate a grid or maze.',
        'When the environment can be explored through repeated interactions.',
      ],
      simpleExample:
        'Imagine a robot that can move left or right in a small room. Initially, it does not know which direction leads to the destination. It tries different movements and receives rewards. Q-Learning updates the value of each movement so that the robot gradually learns which action is better in each position.',
      detail:
        'Q-Learning uses the following update formula:\n\nQ(s, a) ← Q(s, a) + α [r + γ max Q(s′, a′) − Q(s, a)]\n\nWhere:\n\n- Q(s, a): Current estimated value of taking action a in state s.\n- α (alpha): Learning rate; controls how much a new experience changes the old value.\n- r: Immediate reward received after taking the action.\n- γ (gamma): Discount factor; controls the importance of future rewards.\n- s′: Next state reached after the action.\n- max Q(s′, a′): Highest estimated action value in the next state.\n\nThe agent repeats this update after experiencing transitions. Over time, the Q-values can improve and help it choose better actions.\n\nFor a terminal state, there is no future action value, so the future-value term is treated as zero.',
      realLife: {
        problem:
          'A robot needs to learn the best route through a small grid without being given the correct route in advance.',
        approach: [
          'Represent each grid position as a state.',
          'Define available movements as actions.',
          'Initialize the Q-table with zero values.',
          'Let the robot explore different movements.',
          'Update Q-values using rewards and the best estimated future value.',
        ],
        outcome:
          'The robot gradually learns which movements have higher expected long-term value.',
      },
      tasks: [
        'Create a small Q-table with three states and two actions.',
        'Calculate a Q-value update using a learning rate, reward, and discount factor.',
        'Implement a Q-Learning agent that learns to reach a goal in a small grid environment.',
      ],
      questions: [
        {
          q: 'What is Q-Learning?',
          a:
            'Q-Learning is a model-free Reinforcement Learning algorithm that learns the value of taking different actions in different states.',
        },
        {
          q: 'What does Q represent in Q-Learning?',
          a:
            'Q represents the estimated long-term value of taking a particular action in a particular state.',
        },
        {
          q: 'What is a Q-table?',
          a:
            'A Q-table is a table that stores estimated Q-values for state-action pairs. It is commonly used in small problems with discrete states and actions.',
        },
        {
          q: 'What is the learning rate in Q-Learning?',
          a:
            'The learning rate controls how much a new experience changes the existing Q-value. A higher learning rate gives more weight to new information.',
        },
        {
          q: 'What is the discount factor?',
          a:
            'The discount factor controls how much future rewards matter compared with immediate rewards. It is usually represented by gamma.',
        },
        {
          q: 'Why is Q-Learning called model-free?',
          a:
            'It does not require a predefined model of the environment’s transition rules or reward function. It learns from observed experience.',
        },
      ],
      code: `# Simple Q-Learning update

learning_rate = 0.1
discount_factor = 0.9

current_q = 2.0
reward = 5
best_next_q = 4.0

new_q = current_q + learning_rate * (
    reward + discount_factor * best_next_q - current_q
)

print("Old Q-value:", current_q)
print("New Q-value:", new_q)`,
      pitfalls: [
        'A Q-table can become too large when there are many states and actions.',
        'Q-values are estimates and may need many experiences to become useful.',
        'The learning rate and discount factor affect how the agent learns.',
        'Exploration is important; always choosing the currently highest Q-value can prevent the agent from discovering better actions.',
        'Q-Learning is not the same as Deep Q-Networks (DQN), which use neural networks to approximate Q-values.',
      ],
    }),

    lesson({
      slug: 'exploration-vs-exploitation',
      title: 'Exploration vs Exploitation',
      summary:
        'Understand the balance between trying new actions and using actions that have already produced good results.',
      definition:
        'Exploration means trying different actions to discover potentially better rewards. Exploitation means choosing an action that the agent already believes will provide a good reward. Reinforcement Learning often needs to balance both strategies.',
      why:
        'If an agent only explores, it may waste time trying actions it already understands. If it only exploits, it may never discover a better action. Balancing the two helps the agent learn and make effective decisions.',
      purpose:
        'The purpose is to help an agent discover useful actions while still taking advantage of what it has learned. This balance can improve the quality of its decisions over time.',
      when: [
        'When training a Q-Learning agent.',
        'When the agent has not yet discovered all useful actions.',
        'When the environment may contain better options that have not been tried.',
        'When choosing between learning new information and using existing knowledge.',
      ],
      simpleExample:
        'Imagine a person visiting a restaurant. Exploration means trying a new dish that they have never tasted. Exploitation means ordering their favorite dish because they already know they like it. Trying new dishes may reveal something better, but repeatedly ordering the favorite is a safer known choice.',
      detail:
        'A common strategy is epsilon-greedy (ε-greedy):\n\n1. Generate a random number between 0 and 1.\n2. If the number is smaller than epsilon (ε), choose a random action. This is exploration.\n3. Otherwise, choose the action with the highest estimated Q-value. This is exploitation.\n\nFor example, if epsilon is 0.2, the agent explores approximately 20% of the time and exploits approximately 80% of the time, assuming the usual epsilon-greedy selection rule.\n\nEpsilon can be reduced during training. This means the agent explores more at the beginning and increasingly uses learned information later. However, some exploration may still be useful.',
      realLife: {
        problem:
          'A recommendation system needs to decide whether to suggest familiar products or introduce users to new products.',
        approach: [
          'Use exploration to test new recommendations.',
          'Use exploitation to recommend products that have performed well before.',
          'Collect feedback such as clicks or purchases.',
          'Balance new experiments with recommendations based on previous results.',
        ],
        outcome:
          'The system can discover new useful recommendations while continuing to use options that have already performed well.',
      },
      tasks: [
        'Explain exploration and exploitation using a simple game example.',
        'Compare epsilon-greedy behavior when epsilon is 0.1 and 0.5.',
        'Implement epsilon-greedy action selection for a Q-Learning agent.',
      ],
      questions: [
        {
          q: 'What is exploration in Reinforcement Learning?',
          a:
            'Exploration means trying actions that the agent has not tested enough to discover potentially better rewards.',
        },
        {
          q: 'What is exploitation?',
          a:
            'Exploitation means choosing an action that the agent already believes will provide a high reward based on its previous experience.',
        },
        {
          q: 'Why is the balance between exploration and exploitation important?',
          a:
            'Exploration helps discover better actions, while exploitation uses the knowledge already learned. Too much of either can reduce learning effectiveness.',
        },
        {
          q: 'What is the epsilon-greedy strategy?',
          a:
            'It is a strategy in which an agent explores by choosing a random action with probability epsilon and otherwise exploits by choosing the action with the highest estimated value.',
        },
        {
          q: 'What happens when epsilon is high?',
          a:
            'The agent explores more often and chooses random actions more frequently.',
        },
        {
          q: 'What happens when epsilon is low?',
          a:
            'The agent exploits more often by choosing actions that currently have the highest estimated value.',
        },
      ],
      code: `import random

q_values = {
    "left": 2.0,
    "right": 8.0,
    "forward": 5.0
}

epsilon = 0.2

if random.random() < epsilon:
    action = random.choice(list(q_values.keys()))
    strategy = "Exploration"
else:
    action = max(q_values, key=q_values.get)
    strategy = "Exploitation"

print("Strategy:", strategy)
print("Selected action:", action)`,
      pitfalls: [
        'Exploration does not guarantee that the agent will find the best possible action.',
        'Too much exploration can waste time and produce inconsistent behavior.',
        'Too little exploration can cause the agent to miss better actions.',
        'A low epsilon does not mean the agent has learned a perfect policy.',
        'The best exploration schedule depends on the environment and learning problem.',
      ],
    }),
  ],
}

export default ch
