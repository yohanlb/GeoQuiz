import type { Metadata } from 'next';

const APP_NAME = 'Geo Quiz!';
const APP_DEFAULT_TITLE = 'Geo Quiz! - Country, Capitals, and Flag questions!';
const APP_TITLE_TEMPLATE = '%s - Geo Quiz!';
const APP_DESCRIPTION =
  'Explore the world with Geo-Quiz! Test your knowledge on capitals and flags, guess the right answers, and improve your geography skills. Challenge yourself with interactive quizzes and track your progress. Start your journey today!';

export const metadatas: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  keywords:
    'geography, quiz, trivia quiz, country, capitals, flag, questions, learn',
};
