# GeoQuiz - Learn Country Flags and Capitals!

A modern web application for learning geography through interactive quizzes about country flags and capitals.

## Documentation

- [Local Setup & Development Guide](doc/local-setup.md)
- [Folder Structure Overview](doc/folder-structure-overview.md)

## Features

- 🌍 Interactive quizzes on country flags and capitals
- 🎯 Daily challenges
- 👤 User accounts with Google authentication
- ☁️ Cloud sync progress tracking
- 📱 PWA support for offline use
- 🎨 Modern UI with Shadcn, HeroUI and Tailwind CSS
- 📊 Progress tracking and statistics
- 🔍 Dynamic SEO with prioritized sitemap generation

## Tech Stack

- **Framework:** Next.js 15 with Turbopack
- **UI Libraries:** HeroUI, Tailwind CSS, Framer Motion, Shadcn
- **State Management:** Zustand, TanStack Query
- **Database:** Supabase
- **Testing:** Jest, Cypress
- **Monitoring:** Sentry
- **Analytics:** PostHog
- **Type Safety:** TypeScript
- **Package Manager:** pnpm

## SEO & Sitemap

The application uses `next-sitemap` to generate a dynamic sitemap with prioritized routes.
The sitemap is automatically generated after each build.

## Author

Yohan LB - [https://yohanlebreton.com](https://yohanlebreton.com)
