import type { Chapter, Topic } from './types'
import descriptivestatistics from './chapters/01-descriptive-statistics'
import probability from "./chapters/02-probability"
import probabilitydistributions from './chapters/03-probability-destribution'
import hypothesistesting from './chapters/04-hypothesis-testing'
import statisticaltests from './chapters/05-statistical-tests'
import samplingtechniques from './chapters/06-sampling-technique'
import regression from './chapters/07-statistical-regression'
import essentialml from './chapters/08-essential-ml'
import expdesign from './chapters/09-experimental-design'
import basicdatascience from './chapters/10-basic-data-science'
import supervisedlearning from './chapters/11-supervised-learning'
import supervisedlear from './chapters/12-supervisedlearning'
import unsupervisedlearning from './chapters/13-unsupervised-learning'
import reinforcementlearning from './chapters/14-reinforcement-learning'
import machineLearningworkflow from './chapters/15-machine-learning-workflow'
import learningScitlearn from './chapters/16-sckitlearn'
import sckitlearnimportant from './chapters/17-sckitlearn-learning-project'
import tensorflow from './chapters/18-tensor-flow'
import nlp from './chapters/19-nlp'
import tensorflowunderstanding from './chapters/20-tensorflow-understanding'

export const chapters: Chapter[] = [
  descriptivestatistics,
  probability,
  probabilitydistributions,
  hypothesistesting,
  statisticaltests,
  samplingtechniques,
  regression,
  essentialml,
  expdesign,
  basicdatascience,
  supervisedlear,
  supervisedlearning,
  unsupervisedlearning,
  reinforcementlearning,
  machineLearningworkflow,
  learningScitlearn,
  sckitlearnimportant,
  tensorflow,
  nlp,
  tensorflowunderstanding
]

export type TopicRef = {
  chapter: Chapter
  topic: Topic
  href: string
}

export const allTopics: TopicRef[] = chapters.flatMap((chapter) =>
  chapter.topics.map((topic) => ({
    chapter,
    topic,
    href: `/topic/${chapter.id}/${topic.slug}`,
  })),
)

export function findTopic(chapterId: string, slug: string): TopicRef | undefined {
  return allTopics.find((t) => t.chapter.id === chapterId && t.topic.slug === slug)
}

export function neighbors(href: string): { prev?: TopicRef; next?: TopicRef } {
  const i = allTopics.findIndex((t) => t.href === href)
  if (i < 0) return {}
  return { prev: allTopics[i - 1], next: allTopics[i + 1] }
}

export function searchTopics(query: string): TopicRef[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return allTopics.filter(({ topic, chapter }) => {
    const blob = [
      topic.title,
      topic.summary,
      chapter.title,
      ...topic.sections.map((s) => s.heading),
      ...topic.interview.map((i) => i.q),
    ]
      .join(' ')
      .toLowerCase()
    return blob.includes(q)
  })
}

export const stats = {
  chapters: chapters.length,
  topics: allTopics.length,
  questions: allTopics.reduce((n, t) => n + t.topic.interview.length, 0),
}
