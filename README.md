![Storial Logo](src/images/storial-logo.svg)
# Storial 3.0 -- Track Books You'd Like To Read

## Contents
  - [Tech Stack](#tech-stack)
  - [Original MVP](#original-mvp-code-can-be-found-here)
  - [2.0 MVP](#20-mvp)
  - [3.0 MVP](#30-mvp)
  - [Design Notes](#design-notes)
  - [Getting Started - Setup](#getting-started)
  - [Contact Me](#contact-me)

## Tech Stack
React, TypeScript, Redux Toolkit, TailwindCSS, Next.js, MongoDB, Storybook, React Testing Library

## Original MVP (code can be found [here](https://github.com/jespy2/storial "The original Storial!"))
This was for an assessment I did in 2021. The prompt was the following:

> *Using the UI framework of your choice, build a UI around a hypothetical RESTful library API. Assume this API returns a list of books in a library, and allows for CRUD operations on a single book. The application should support those endpoints.*

Because this was a frontend-only role, I was only tasked with building the UI, but decided to build a fullstack app so that the reviewing team could punch through the final product. I started with using Adobe products to build the branding package, including name, logo, color palette and wireframing. The frontend was in React, and I took the opportunity to try out Tailwind CSS. The backend was built with Node/Express and MongoDB.

Since this was a takehome assessment, I had only a few days to go from design to prod and thus had a pretty simple app for the MVP.

  - Offers basic CRUD functionality for tracking books a user hears about and would like to read in the future
  - Includes title, author and notes for each book tracked

## 2.0 MVP
Refactored with new features, cleaner/DRYer code, improved performance and accessibility, and code safety through TypeScript and testing.

  - Refactored to include TypeScript and testing via React Testing Library
  - Added authorization/profile layer
  - Updated React Router syntax for v6+
  - Migrated state management to Redux Toolkit
  - Audited and refactored to improve accessibility and performance
  - Sorting books by field
  - Added custom components:
    - Modals with branded styling instead of using alerts
    - Pills to display read/unread status that also act as toggle buttons
    - Tooltips for clickable icons
  - Dark mode

## 3.0 MVP
Migrated from CRA to Next.js App Router, replacing the standalone Express server with Next.js API routes. Added portfolio-grade features targeting enterprise frontend engineering standards.

  - Migrated from CRA to Next.js App Router
  - Replaced Express/Node server with Next.js API route handlers
  - Storybook component documentation
  - CVA variant system for scalable component APIs
  - WCAG accessibility audit
  - Search + filter feature
  - Tailwind design tokens

## Design Notes
Broadly speaking, this is a simple CRUD app, which is why I chose it for the original assessment. 3.0 upgrades the stack and adds enterprise-grade patterns — it's largely an exercise in building something scalable, with an eye towards how apps grow and are maintained at scale.

  - **Redux over local state**: An argument could be made that Redux is overkill here. Good componentization with props passed as children would work fine at this size. But Redux demonstrates scalable architectural thinking — it makes the codebase easier to maintain as features and data grow, and makes it easier for associate-level engineers to pick up tasks.
  - **Declarative file structure**: Each directory uses a subdirectory + index file pattern (e.g. `components/ui/Button/index.tsx`) to make the codebase navigable and keep import paths clean.
  - **Above-the-fold componentization**: Keeping component files short enough to read without scrolling encourages good componentization, reduces cognitive load, and makes architectural decisions more intentional.
  - **CVA variant system**: Replaces ad-hoc Tailwind conditionals with type-safe, composable variant APIs — the same pattern used in production design systems.
  - **Next.js App Router**: Server-first architecture with built-in API routes eliminates the need for a separate Express server, simplifies deployment, and demonstrates modern Next.js patterns.

## Getting Started

After cloning the repo, install dependencies and set up your environment:
```bash
npm install
```

Create a `.env.local` file at the root:
```
DB_CONN_STRING=mongodb://localhost:27017
DB_NAME=books
BOOK_COLLECTION_NAME=books
USER_COLLECTION_NAME=users
TOKEN_KEY=your_secret_key_here
```

Start MongoDB:
```bash
brew services start mongodb-community
```

Run the dev server:
```bash
npm run dev
```

App runs at `http://localhost:3000`. No separate server process needed.

## Contact Me
Reach out, get to know me or check out more of my work: [My Portfolio Site](https://jamesespy.com)