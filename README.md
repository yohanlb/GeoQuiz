# GeoQuiz - Learn Country Flags and Capitals!

A modern web application for learning geography through interactive quizzes about country flags and capitals.

## Features

- 🌍 Interactive quizzes on country flags and capitals
- 🎯 Daily challenges
- 👤 User accounts with Google authentication
- ☁️ Cloud sync progress tracking
- 📱 PWA support for offline use
- 🎨 Modern UI with Shadcn, NextUI and Tailwind CSS
- 📊 Progress tracking and statistics
- 🔍 Dynamic SEO with prioritized sitemap generation

## Tech Stack

- **Framework:** Next.js 15 with Turbopack
- **UI Libraries:** NextUI, Tailwind CSS, Framer Motion, Shadcn
- **State Management:** Zustand, TanStack Query
- **Database:** Supabase
- **Testing:** Jest, Cypress
- **Monitoring:** Sentry
- **Analytics:** PostHog
- **Type Safety:** TypeScript
- **Package Manager:** pnpm

## Prerequisites

- Node.js ^20.0.0
- pnpm

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yohanlb/GeoQuiz-WebApp.git
   cd GeoQuiz
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env.local` file with the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_GEOQUIZ_API_BASE_URL=your_api_url
   ```

## Development

Start the development server:

```bash
pnpm dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Create production build
- `pnpm start` - Start production server
- `pnpm test` - Run Jest tests
- `pnpm test:watch` - Run Jest in watch mode
- `pnpm cy:open` - Open Cypress test runner
- `pnpm cy:run` - Run Cypress tests headlessly
- `pnpm lint` - Run ESLint
- `pnpm format` - Check code formatting
- `pnpm format:fix` - Fix code formatting

## Testing

- Unit/Integration Tests: `pnpm test`
- E2E Tests: `pnpm cy:run`

## Production Deployment

1. Build the project:

   ```bash
   pnpm build
   ```

2. Start the production server:
   ```bash
   pnpm start
   ```

## SEO & Sitemap

The application uses `next-sitemap` to generate a dynamic sitemap with prioritized routes.
The sitemap is automatically generated after each build.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Author

Yohan LB - [https://yohanlebreton.com](https://yohanlebreton.com)
