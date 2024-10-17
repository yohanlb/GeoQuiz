export type ChangelogEntry = {
  date: string;
  version: string;
  title: string;
  features: string[];
  image?: string;
};

// Template

// {
//   date: "2024-10-17",
//   version: "v1.0.0",
//   title: "New Changelog and Roadmap page!",
//   features: [
//     "Feature 1",
//     "Feature 2",
//   ],
//   image: "/placeholder.svg?height=400&width=600"
// },

export const CHANGELOG_DATA: ChangelogEntry[] = [
  {
    date: '2024-10-17',
    version: 'v1.1.1',
    title: 'New Changelog and Roadmap page!',
    features: [
      'New Changelog page: Check all the latest features and modifications.',
      'New Roadmap page: Check what are the next features and improvements planned for GeoQuiz.',
    ],
  },
  {
    date: '2024-10-05',
    version: 'v1.1.0',
    title: 'User Accounts!',
    features: [
      'You can now sign-in and login using a Google account',
      'Country progress cloud sync: When logged in, your last guesses for every country will now be saved on the GeoQuiz servers!',
    ],
  },
];
