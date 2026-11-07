
// -------------------------
// Domain & Configuration
// -------------------------

export type Domain =
  | 'data-science'
  | 'machine-learning'
  | 'deep-learning'
  | 'natural-language-processing'
  | 'nlp'

export type Difficulty =
  | 'easy'
  | 'medium'
  | 'hard'

export type Priority =
  | 'high'
  | 'extreme'

// -------------------------
// Interview
// -------------------------

export type InterviewQA = {
  q: string
  a: string
  followUp?: string
}

// -------------------------
// Images
// -------------------------

export type TopicImage = {
  src: string
  alt: string
  title?: string
  caption?: string
  width?: number
  height?: number
  fit?: 'cover' | 'contain'
}




// -------------------------
// Sections
// -------------------------

export type Section = {
  heading: string
  body: string
}

// -------------------------
// Code
// -------------------------

export type CodeSample = {
  title: string
  lang: string
  source: string
}

// -------------------------
// Concepts
// -------------------------

export type Concept = {
  definition: string
  whyUsed: string
  whenToUse: string[]
}

// -------------------------
// Formulas
// -------------------------

export type Formula = {
  expression: string
  explanation: string

  variables: {
    symbol: string
    meaning: string
  }[]

  example: {
    problem: string
    steps: string[]
    result: string
  }
}

// -------------------------
// Practical Examples
// -------------------------

export type PracticalExample = {
  title: string
  domain: Domain
  problem: string
  approach: string[]
  code?: CodeSample[]
  outcome: string
}

// -------------------------
// Assignments
// -------------------------

export type Assignment = {
  id: string
  title: string
  difficulty: Difficulty
  task: string
  expectedOutcome: string
  hint?: string
}

// -------------------------
// Topic
// -------------------------

export type Topic = {
  slug: string
  title: string
  summary: string

  learningObjectives?: string[]
  prerequisites?: string[]

  concept: Concept

  formula?: Formula

  sections: Section[]

  practicalExample: PracticalExample

  assignments: [
    Assignment,
    Assignment,
    Assignment
  ]

  code?: CodeSample[]

  images?: TopicImage[]

  pitfalls?: string[]

  interview: InterviewQA[]

  references?: {
    title: string
    url: string
  }[]
}

// -------------------------
// Topic Factory Extras
// -------------------------

export type TopicExtras = {
  formula?: Formula
  code?: CodeSample[]
  pitfalls?: string[]
  images?: TopicImage[]
  learningObjectives?: string[]
  prerequisites?: string[]
  references?: Topic['references']
}

// -------------------------
// Topic Factory
// -------------------------

export function topic(
  slug: string,
  title: string,
  summary: string,
  concept: Concept,
  sections: Section[],
  practicalExample: PracticalExample,
  assignments: Topic['assignments'],
  interview: InterviewQA[],
  extras: TopicExtras = {},
): Topic {
  return {
    slug,
    title,
    summary,
    concept,
    sections,
    practicalExample,
    assignments,
    interview,
    ...extras,
  }
}

// -------------------------
// Chapter
// -------------------------

export type Chapter = {
  id: string
  number: number
  title: string
  tagline: string
  priority?: Priority
  topics: Topic[]
}
