# GeoQuiz Folder Structure - Overview

```
GeoQuiz/
├── doc/                # Documentation
├── cypress/            # E2E tests
├── public/             # Static assets (images, icons, SVGs, manifest)
│   ├── images/         # App images
│   ├── icons/          # PWA/favicons
│   ├── continents/     # Continent SVGs
│   └── CountryShapes/  # Country SVGs
└── src/                # All app code
    ├── app/            # Next.js routes and pages
    ├── features/       # Business features (quiz, decks, daily, etc.)
    │   ├── featureA/
    │   │   ├── components/   # React components for this feature
    │   │   ├── server/       # All server-side logic for this feature
    │   │   │   ├── actions/    # Next.js server actions (API endpoints, mutations, etc.)
    │   │   │   ├── db/         # Direct database access (can contain multiple files for different access methods)
    │   │   │   │   ├── table-name.ts       # Access via SDK (for server actions, etc.)
    │   │   │   │   └── table-name-rest.ts  # Access via REST (for Next.js cache/prerender compatibility)
    │   │   │   └── services/   # Server-side business logic
    │   │   ├── hooks/        # Feature-specific React hooks (client or server)
    │   │   └── ...
    │   └── ...
    ├── shared/         # Reusable components, hooks, utils
    │   ├── components/ # Global UI components
    │   ├── hooks/      # Reusable hooks
    │   ├── server/     # Shared server side logic and db access
    │   ├── utils/      # Utility functions
    │   └── ...
    ├── lib/            # Core libs, providers, types, state
    ├── assets/         # Images, SVGs, Lottie for UI/branding
    └── __tests__/      # Unit/integration tests
```

---
