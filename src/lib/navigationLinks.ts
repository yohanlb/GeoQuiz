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
  history: { label: 'History', href: '/history' },
  stats: { label: 'My Stats', href: '/stats' },
  more: { label: 'More', href: '/more' },
  help: { label: 'About', href: '/help' },
  quiz: { label: '', href: '/quiz' },
  results: { label: '', href: '/results' },
  landing: { label: 'Welcome', href: '/' },
  // user menu
  signIn: { label: 'Sign In', href: '/signin' },
  profile: { label: 'Profile', href: '/profile' },
  settings: { label: 'Settings', href: '/settings' },
  logout: { label: 'Logout', href: '/logout' },
};
