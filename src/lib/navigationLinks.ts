type NavigationLink = {
  label: string;
  href: string;
  disabled?: boolean;
};

type NavigationLinks = {
  [key: string]: NavigationLink;
};

export const navigationLinks: NavigationLinks = {
  home: { label: 'Home', href: '/home' },
  allDecks: { label: 'All Decks', href: '/decks' },
  countries: { label: 'Countries', href: '/countries' },
  history: { label: 'History', href: '/user/history' },
  stats: { label: 'My Stats', href: '/stats' },
  more: { label: 'More', href: '/more' },
  help: { label: 'About', href: '/help' },
  quiz: { label: '', href: '/quiz' },
  results: { label: '', href: '/results' },
  landing: { label: 'Welcome', href: '/' },
  // user menu
  login: { label: 'Login', href: '/login' },
  profile: { label: 'Profile', href: '/profile' },
  settings: { label: 'Settings', href: '/settings' },
  logout: { label: 'Logout', href: '/logout' },
  // footer menu
  resources: { label: 'Resources', href: '/resources' },
  privacy: { label: 'Privacy', href: '/privacy' },
};

export const EXTERNAL_LINKS = {
  twitter: 'https://twitter.com/geoquiz_daily',
  personalWebsite: 'https://yohanlebreton.com',
};
