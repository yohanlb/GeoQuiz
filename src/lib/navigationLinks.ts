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
  stats: { label: 'My Stats', href: '/stats', disabled: true },
  more: { label: 'More', href: '/more', disabled: true },
  help: { label: 'Help', href: '/help', disabled: true },
};
