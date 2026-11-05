# Data Science & Machine Learning Guide

A searchable learning site for data science and machine learning. Each topic is organized around clear explanations, examples, practical exercises, and interview questions.

## Run locally

```sh
npm install
npm run dev
```

## Available commands

- `npm run dev` starts the local development server.
- `npm run build` checks TypeScript and creates a production build in `dist/`.
- `npm run preview` serves the production build locally.
- `npm run lint` runs Oxlint.

## Content structure

- `src/content/chapters/` contains the learning chapters and their topics.
- `src/content/types.ts` defines the chapter, topic, example, assignment, and interview question formats.
- `src/pages/` contains the home page and topic page.
- `src/styles.css` contains the site styles.
