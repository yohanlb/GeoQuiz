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
  myStats: { label: 'My Stats', href: '/stats' },
  settings: { label: 'Settings', href: '#', disabled: true },
  feedback: { label: 'Feedback', href: '#', disabled: true },
  about: { label: 'About', href: '#', disabled: true },
};
