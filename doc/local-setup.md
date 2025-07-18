# Local Setup & Development Guide

## Prerequisites

- Node.js ^22.0.0
- pnpm

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yohanlb/GeoQuiz.git
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
