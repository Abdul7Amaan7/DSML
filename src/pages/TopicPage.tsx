
import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'

import { findTopic, neighbors } from '../content'
import { Markdown } from '../lib/markdown'
import { isDone, toggleDone } from '../lib/progress'

// Types

type TopicReference = NonNullable<ReturnType<typeof findTopic>>
type TopicData = TopicReference['topic']

export type TopicImageData = {
  src: string
  alt: string
  caption?: string
  title?: string
  fit?: 'cover' | 'contain'
  width?: number
  height?: number
}

// Main Page

export function TopicPage() {
  const { chapterId = '', slug = '' } = useParams()

  const ref = findTopic(chapterId, slug)

  const href = ref?.href

  const [done, setDone] = useState(false)
  const [openQ, setOpenQ] = useState<Record<number, boolean>>({})

  useEffect(() => {
    setDone(href ? isDone(href) : false)
    setOpenQ({})
  }, [href])

  if (!ref) {
    return <Navigate to="/" replace />
  }

  const { chapter, topic } = ref
  const { prev, next } = neighbors(ref.href)

  return (
    <article className="topic">

      <TopicBreadcrumb chapter={chapter} />

      <TopicHeader
        chapter={chapter}
        topic={topic}
        done={done}
        onToggleDone={() => setDone(toggleDone(ref.href))}
      />

      <TopicImages images={topic.images} />

      <TopicContent topic={topic} />

      <PracticalExample example={topic.practicalExample} />

      <Assignments assignments={topic.assignments} />

      <CodeExamples examples={topic.code} />

      <Pitfalls pitfalls={topic.pitfalls} />

      <InterviewQuestions
        questions={topic.interview}
        openQuestions={openQ}
        onToggle={(index) =>
          setOpenQ((previous) => ({
            ...previous,
            [index]: !previous[index],
          }))
        }
      />

      <TopicPager prev={prev} next={next} />

    </article>
  )
}

// 1. Breadcrumb

function TopicBreadcrumb({
  chapter,
}: {
  chapter: TopicReference['chapter']
}) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">

      <Link to="/">Guide</Link>

      <span>/</span>

      <span>
        {chapter.number}. {chapter.title}
      </span>

    </nav>
  )
}

// 2. Topic Header

function TopicHeader({
  chapter,
  topic,
  done,
  onToggleDone,
}: {
  chapter: TopicReference['chapter']
  topic: TopicData
  done: boolean
  onToggleDone: () => void
}) {
  return (
    <header className="topic-head">

      <div>
        <p className="eyebrow">
          Chapter {chapter.number}
          {chapter.priority
            ? ` · ${chapter.priority} interview priority`
            : ''}
        </p>

        <h1>{topic.title}</h1>

        <p className="lede">{topic.summary}</p>
      </div>

      <button
        type="button"
        className={`btn ${done ? 'primary' : ''}`}
        onClick={onToggleDone}
        aria-pressed={done}
      >
        {done ? 'Marked done' : 'Mark as done'}
      </button>

    </header>
  )
}

// 3. Topic Images

function TopicImages({
  images,
}: {
  images?: TopicImageData[]
}) {
  if (!images?.length) return null

  return (
    <section
      className="topic-images"
      aria-label="Topic illustrations"
    >
      {images.map((image, index) => (
        <TopicImage
          key={`${image.src}-${index}`}
          image={image}
        />
      ))}
    </section>
  )
}

// Reusable Topic Image

function TopicImage({
  image,
}: {
  image: TopicImageData
}) {
  const fit = image.fit ?? 'cover'

  return (
    <figure className="topic-image">

      {image.title && (
        <h3 className="topic-image-title">
          {image.title}
        </h3>
      )}

      <div
        className={`topic-image-media topic-image-media--${fit}`}
      >
        <img
          src={image.src}
          alt={image.alt}
          title={image.title}
          width={image.width ?? 1000}
          height={image.height ?? 563}
          loading="lazy"
          decoding="async"
        />
      </div>

      {image.caption && (
        <figcaption className="topic-image-caption">
          {image.caption}
        </figcaption>
      )}

    </figure>
  )
}

// 4. Topic Content

function TopicContent({
  topic,
}: {
  topic: TopicData
}) {
  return (
    <>
      {topic.sections.map((section) => (
        <section
          key={section.heading}
          className="block"
        >

          <h2>{section.heading}</h2>

          <Markdown text={section.body} />

        </section>
      ))}
    </>
  )
}

// 5. Practical Example

function PracticalExample({
  example,
}: {
  example: TopicData['practicalExample']
}) {
  return (
    <section className="block practical-example">

      <p className="eyebrow">Put it in context</p>

      <h2>{example.title}</h2>

      <p>
        <strong>Situation:</strong> {example.problem}
      </p>

      <h3>How to approach it</h3>

      <ol>
        {example.approach.map((step, index) => (
          <li key={`${index}-${step}`}>
            {step}
          </li>
        ))}
      </ol>

      <p className="example-outcome">
        <strong>Takeaway:</strong> {example.outcome}
      </p>

    </section>
  )
}

// 6. Assignments

function Assignments({
  assignments,
}: {
  assignments: TopicData['assignments']
}) {
  if (!assignments.length) return null

  return (
    <section className="block assignments">

      <p className="eyebrow">Practice</p>

      <h2>Practice assignments</h2>

      <div className="assignment-list">

        {assignments.map((assignment, index) => (
          <AssignmentCard
            key={assignment.id}
            assignment={assignment}
            index={index}
          />
        ))}

      </div>

    </section>
  )
}

// Reusable Assignment Card

function AssignmentCard({
  assignment,
  index,
}: {
  assignment: TopicData['assignments'][number]
  index: number
}) {
  return (
    <article className="assignment">

      <div className="assignment-title">

        <h3>
          {index + 1}. {assignment.title}
        </h3>

        <span className={`difficulty ${assignment.difficulty}`}>
          {assignment.difficulty}
        </span>

      </div>

      <Markdown text={assignment.task} />

      {assignment.hint && (
        <p className="hint">
          <strong>Hint:</strong> {assignment.hint}
        </p>
      )}

      <details>
        <summary>What you should learn</summary>

        <p>{assignment.expectedOutcome}</p>
      </details>

    </article>
  )
}

// 7. Code Examples

function CodeExamples({
  examples,
}: {
  examples: TopicData['code']
}) {
  if (!examples?.length) return null

  return (
    <>
      {examples.map((example) => (
        <section
          key={example.title}
          className="block"
        >

          <h2>{example.title}</h2>

          <pre
            className="code-block"
            data-lang={example.lang}
          >
            <code>{example.source}</code>
          </pre>

        </section>
      ))}
    </>
  )
}

// 8. Pitfalls

function Pitfalls({
  pitfalls,
}: {
  pitfalls: TopicData['pitfalls']
}) {
  if (!pitfalls?.length) return null

  return (
    <section className="block pitfalls">

      <h2>Pitfalls interviewers listen for</h2>

      <ul>
        {pitfalls.map((pitfall) => (
          <li key={pitfall}>
            {pitfall}
          </li>
        ))}
      </ul>

    </section>
  )
}

// 9. Interview Questions

function InterviewQuestions({
  questions,
  openQuestions,
  onToggle,
}: {
  questions: TopicData['interview']
  openQuestions: Record<number, boolean>
  onToggle: (index: number) => void
}) {
  if (!questions.length) return null

  return (
    <section className="block interview">

      <h2>Interview questions</h2>

      <p className="hint">
        Answer out loud first, then expand the model answer.
      </p>

      <div className="qa-list">

        {questions.map((question, index) => (
          <InterviewQuestion
            key={question.q}
            question={question}
            index={index}
            isOpen={!!openQuestions[index]}
            onToggle={() => onToggle(index)}
          />
        ))}

      </div>

    </section>
  )
}

// Reusable Interview Question

function InterviewQuestion({
  question,
  index,
  isOpen,
  onToggle,
}: {
  question: TopicData['interview'][number]
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  const answerId = `question-answer-${index}`

  return (
    <div className="qa">

      <button
        type="button"
        className="qa-q"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={answerId}
      >

        <span>
          Q{index + 1}. {question.q}
        </span>

        <span aria-hidden="true">
          {isOpen ? '−' : '+'}
        </span>

      </button>

      {isOpen && (
        <div
          className="qa-a"
          id={answerId}
        >

          <Markdown text={question.a} />

          {question.followUp && (
            <p className="follow">
              <strong>Follow-up:</strong> {question.followUp}
            </p>
          )}

        </div>
      )}

    </div>
  )
}

// 10. Topic Navigation

function TopicPager({
  prev,
  next,
}: {
  prev: ReturnType<typeof neighbors>['prev']
  next: ReturnType<typeof neighbors>['next']
}) {
  return (
    <nav className="pager" aria-label="Topic navigation">

      {prev ? (
        <Link to={prev.href}>
          <span>Previous</span>
          {prev.topic.title}
        </Link>
      ) : (
        <span />
      )}

      {next ? (
        <Link to={next.href} className="next">
          <span>Next</span>
          {next.topic.title}
        </Link>
      ) : (
        <span />
      )}

    </nav>
  )
}
