# GeoQuiz Web App

Welcome to the **GeoQuiz** web app! This is an interactive quiz application built with **React**, **Next.js**, and **Tailwind CSS**.

The app is thought to be both a fun quiz to play and an methodical tool to help users learn the capitals and flags of the world effectively.

## Key Features

- 🌍 **Country Quizzes**: Select a deck of countries and test your knowledge of their capitals.
- 🏁 **Multiple Question Types**: Capital, flag, and border guessing plus daily game modes with new special questions everyday.
- 📊 **Real-Time Results**: Get instant feedback on your answers, with a final results summary at the end of each quiz.
- ⚡ **Fast & Interactive**: Built with a mix of client-side and server-side logic for a smooth and optimized experience.
- 🛠 **Tech Stack**: React 18, Next.js 14, Tailwind CSS, Shadcn UI, TypeScript, and Supabase for the backend API and database.

## Live Version

Check out the live version of GeoQuiz at [GeoQuiz.co](https://geoquiz.co)

## Roadmap

GeoQuiz is still in early development! Here are the next steps:

- [x] User accounts with google authentication
- [x] Cloud sync progress tracking
- [ ] Advanced user stats and charts
- [ ] Custom decks: user tailored series of questions to practice your weak points
- [ ] Additional daily quiz types
- [ ] Localization support for multiple languages

## Installation and Setup

1. Clone the repository

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env.local` file at the root of your project and add your Supabase keys and other necessary environment variables.

4. Run the development server:

   ```bash
   pnpm run dev
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).

## Deployment

To deploy GeoQuiz to a production environment:

1. Build the project:
   ```bash
   pnpm run build
   ```
2. Start the production server:
   ```bash
   pnpm start
   ```

## Contributing

Contributions are welcome! Feel free to fork the repository, make changes, and submit a pull request.
