# MaketPlatform

MaketPlatform is a marketplace-style collaboration platform that connects students, freelancers, companies and mentors around real-world projects, mentorship and community discussion.

## Features

- Role-aware user experience for students, freelancers, companies and mentors.
- Project discovery and detail pages.
- Freelancer, company and mentorship listing flows.
- Dashboard pages for students, freelancers and companies.
- Authentication screens for login and registration.
- Community discussion room and community landing page.
- Reusable UI components built with shadcn-style primitives.
- Mock data layer for users, projects, skills and categories.

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn-ui style components
- Radix UI primitives
- React Router
- TanStack Query
- React Hook Form
- Zod
- Lucide React

## Project Structure

```text
src/
  components/       shared cards, layout and UI primitives
  contexts/         auth context
  data/             mock users, projects, skills and categories
  pages/            home, projects, freelancers, companies, mentorship, dashboard and auth pages
  types/            global TypeScript types
```

## Getting Started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Resume Highlights

- Built a TypeScript React marketplace interface with multiple user roles and dashboard flows.
- Created reusable project, user and skill components for scalable UI composition.
- Used a typed mock data model to simulate real marketplace entities and interactions.
- Organized app pages across projects, mentorship, community, dashboards and authentication.
