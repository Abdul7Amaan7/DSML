
export type InterviewQA = {
  q: string
  a: string
  followUp?: string
}

export type Section = {
  heading: string
  body: string
}

export type CodeSample = {
  title: string
  lang: string
  source: string
}

export type Concept = {
  definition: string
  whyUsed: string
  whenToUse: string[]
}

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

export type PracticalExample = {
  title: string
  domain: 'data-science' | 'machine-learning' | 'deep-learning'
  problem: string
  approach: string[]
  code?: CodeSample[]
  outcome: string
}

export type Assignment = {
  id: string
  title: string
  difficulty: 'easy' | 'medium' | 'hard'
  task: string
  expectedOutcome: string
  hint?: string
}

export type Topic = {
  slug: string
  title: string
  summary: string

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

  pitfalls?: string[]

  interview: InterviewQA[]
}

export type Chapter = {
  id: string
  number: number
  title: string
  tagline: string
  priority?: 'high' | 'extreme'
  topics: Topic[]
}

export function topic(
  slug: string,
  title: string,
  summary: string,
  concept: Concept,
  sections: Section[],
  practicalExample: PracticalExample,
  assignments: [Assignment, Assignment, Assignment],
  interview: InterviewQA[],
  extras?: {
    formula?: Formula
    code?: CodeSample[]
    pitfalls?: string[]
  },
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
    formula: extras?.formula,
    code: extras?.code,
    pitfalls: extras?.pitfalls,
  }
}
