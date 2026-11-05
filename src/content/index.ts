import type { Chapter, Topic } from './types'
import descriptivestatistics from './chapters/01-descriptive-statistics'

export const chapters: Chapter[] = [
  descriptivestatistics,

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
