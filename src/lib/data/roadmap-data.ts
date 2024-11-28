import { CheckCircle, Clock, Rocket } from 'lucide-react';

export const ROADMAP_DATA = [
  {
    status: 'In Progress',
    icon: Clock,
    color: 'text-blue-400',
    items: [
      {
        title: 'User Profile Page',
        description:
          'Introduce a personalized profile for users to showcase their progress and achievements',
      },
      {
        title: 'User Stats Page',
        description:
          'Design a page to display user statistics and progress in a visually engaging way',
      },
      {
        title: 'Mystery Country: save and visualize history',
        description:
          'Track and display your daily mode game progress and history',
      },
    ],
  },
  {
    status: 'Planned',
    icon: Rocket,
    color: 'text-orange-500',
    items: [
      {
        title: 'Typing Mode for Capitals',
        description:
          'Introduce a mode where users type the capital instead of choosing between options',
      },
      {
        title: 'New Daily Quiz Modes',
        description: 'Add more daily quiz modes for more fun!',
      },
      {
        title: 'UI Improvements',
        description:
          'Enhance the overall user interface for better user experience',
      },
    ],
  },
  {
    status: 'Completed',
    icon: CheckCircle,
    color: 'text-green-400',
    items: [
      {
        title: 'User Accounts',
        description:
          'Implement user account system for personalized experience',
      },
      {
        title: 'Server Save User Country Guesses',
        description: 'Save user country guesses on the server for cloud sync',
      },
    ],
  },
];
