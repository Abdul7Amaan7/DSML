
import { Link } from 'react-router-dom'
import { chapters, stats } from '../content'

export function Home() {
  const fundamentalsChapter =
    chapters.find((ch) =>
      /fundamentals|introduction|python|statistics/i.test(
        `${ch.id} ${ch.title}`
      )
    ) ?? chapters[0]

  const machineLearningChapter =
    chapters.find((ch) =>
      /machine-learning|machine learning/i.test(
        `${ch.id} ${ch.title}`
      )
    ) ?? chapters[1] ?? chapters[0]

  const learningSteps = [
    {
      number: '01',
      title: 'Understand the concepts',
      description:
        'Learn definitions, core concepts, intuition, and the mathematics behind every topic.',
    },
    {
      number: '02',
      title: 'Learn through examples',
      description:
        'Explore practical Python examples, formulas, visual explanations, and code implementations.',
    },
    {
      number: '03',
      title: 'Apply your knowledge',
      description:
        'Understand when and why to use different algorithms, techniques, and statistical methods.',
    },
    {
      number: '04',
      title: 'Prepare for interviews',
      description:
        'Practise technical questions, scenario-based problems, and frequently asked interview questions.',
    },
  ]

  return (
    <article className="home">
      <p className="eyebrow">
        DATA SCIENCE & MACHINE LEARNING ENCYCLOPEDIA
      </p>

      <h1>
        Master Data Science & Machine Learning, One Concept at a Time.
      </h1>

      <p className="lede">
        Your complete learning resource for Data Science, Machine Learning,
        Deep Learning, and Artificial Intelligence. Build strong foundations
        with clear explanations, mathematical intuition, Python implementations,
        practical examples, real-world applications, and interview questions.
        Learn from fundamentals to advanced concepts with a structured approach.
      </p>

      <div className="hero-actions">
        {fundamentalsChapter && (
          <Link
            className="btn primary"
            to={`/topic/${fundamentalsChapter.id}/${fundamentalsChapter.topics[0].slug}`}
          >
            Start Learning
          </Link>
        )}

        {machineLearningChapter && (
          <Link
            className="btn"
            to={`/topic/${machineLearningChapter.id}/${machineLearningChapter.topics[0].slug}`}
          >
            Explore Machine Learning
          </Link>
        )}
      </div>

      <div className="home-stats">
        <div>
          <strong>{stats.chapters}</strong>
          <span>Learning Chapters</span>
        </div>

        <div>
          <strong>{stats.topics}</strong>
          <span>Core Topics</span>
        </div>

        <div>
          <strong>{stats.questions}</strong>
          <span>Interview Questions</span>
        </div>
      </div>

      <section className="how">
        <h2>How to use this learning platform</h2>

        <p>
          Follow a structured learning process to develop both theoretical
          understanding and practical problem-solving skills.
        </p>

        <ol>
          {learningSteps.map((step) => (
            <li key={step.number}>
              <span className="num">{step.number}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="chapters">
        <div className="section-heading">
          <p className="eyebrow">YOUR LEARNING PATH</p>
          <h2>Explore the curriculum</h2>
          <p>
            Explore individual subjects and gradually progress from
            foundational knowledge to advanced machine learning techniques.
          </p>
        </div>

        <ul className="chapter-grid">
          {chapters.map((ch) => (
            <li key={ch.id}>
              <Link to={`/topic/${ch.id}/${ch.topics[0].slug}`}>
                <span className="num">
                  {String(ch.number).padStart(2, '0')}
                </span>

                <h3>{ch.title}</h3>

                <p>{ch.tagline}</p>

                <span className="meta">
                  {ch.topics.length} topics
                  {ch.priority ? ` · ${ch.priority} priority` : ''}
                </span>

                <span className="chapter-link">
                  Explore chapter →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="home-footer">
        <p className="eyebrow">LEARN · PRACTISE · IMPLEMENT · MASTER</p>

        <h2>
          Build knowledge. Develop skills. Become industry-ready.
        </h2>

        <p>
          Go beyond memorising definitions. Understand how things work,
          implement them using Python, solve real-world problems, and
          confidently explain your knowledge in technical interviews.
        </p>
      </section>
    </article>
  )
}
