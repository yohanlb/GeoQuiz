export const WEBSITE_URL = 'https://geoquiz.co';

export const EMOJIS = {
  valid: '🟩',
  invalid: '🟥',
  pending: '🟨',
  empty: '⬛',
  whiteSquare: '⬜',
  correct: '✅',
  incorrect: '❌',
  city: '🏙️',
  flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  unknown: '❓',
  earth: '🌍',
  trophy: '🏆',
};

export const CONTINENTS = [
  'Africa',
  'Asia',
  'Europe',
  'Americas',
  'Oceania',
  // 'northAmerica',
  // 'southAmerica',
] as const;

export const MISSING_COUNTRIES_SVGS = ['JE', 'XK', 'PS'];

export const DECK_CARDS_GRADIENTS = [
  'radial-gradient(circle at 30% 70%, #ff9a76, #ffb899)',
  'radial-gradient(circle at 90% 90%, #33aaff, #66d1ff)',
  'radial-gradient(circle at 50% 50%, #ffa386, #ffccaa)',
  'radial-gradient(circle at 20% 20%, #ff6f61, #ff9470)',
  'radial-gradient(circle at 10% 50%, #4d8ff7, #85afff)',
  'radial-gradient(circle at 50% 50%, #ffab73, #ffd6a5)',
  'radial-gradient(circle at 70% 30%, #70d3a5, #a1e7cd)',
];

export const DISABLED_COUNTRIES = [
  143, // FM - Micronesia, No SVG,
  137, // MH - Marshall Islands, No border svg,
  228, // TV Tuvalu, No border svg,
  211, // Svalbard (deleted)
  248, // Kosovo (is disabled in db)
  98, //Hong Kong (is disabled in db)
];

// Missing SVGs
// 164 Northern Mariana
// 110 Jersey
// 169 Palestinian Territory Occupied
