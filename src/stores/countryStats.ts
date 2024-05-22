import create from 'zustand';
import { persist } from 'zustand/middleware';

const NUMBER_OF_SCORES_TO_KEEP = 10;
const GLOBAL_COUNTRY_HISTORY_LENGTH = 20;

interface CountryScoresData {
  country_scores: {
    flag: { [countryId: string]: CountryScore[] };
    capital: { [countryId: string]: CountryScore[] };
  };
  global_scores: {
    flag: CountryGuessHistory[];
    capital: CountryGuessHistory[];
  };
}

const defaultCountryScoresData: CountryScoresData = {
  country_scores: {
    capital: {},
    flag: {},
  },
  global_scores: {
    capital: [],
    flag: [],
  },
};

type GameType = 'flag' | 'capital';

interface CountryScoresState {
  countryScoresData: CountryScoresData;
  clearAllCountryScores: () => void;
  getLastScoresForCountry: (
    countryId: Deck['id'],
    gameType: GameType,
  ) => CountryScore[];
  getHistoryCountriesGuessed: (gameType: GameType) => CountryGuessHistory[];
  addCountryScores: (
    gameType: GameType,
    countryId: Deck['id'],
    scores: boolean,
  ) => void;
}

export const useStoreCountryResults = create<CountryScoresState>()(
  persist(
    (set, get) => ({
      countryScoresData: defaultCountryScoresData,

      clearAllCountryScores: () =>
        set({ countryScoresData: defaultCountryScoresData }),

      getLastScoresForCountry: (countryId: Deck['id'], gameType: GameType) => {
        const { countryScoresData } = get();
        return countryScoresData.country_scores[gameType][countryId] || [];
      },

      getHistoryCountriesGuessed: (gameType: GameType) => {
        const { countryScoresData } = get();
        const countryGuessHistory = countryScoresData.global_scores[gameType];
        return countryGuessHistory.slice(-20).reverse();
      },

      addCountryScores: (
        gameType: GameType,
        countryId: Deck['id'],
        scores: boolean,
      ) => {
        set((state) => {
          const updatedCountryScores =
            state.countryScoresData.country_scores[gameType];
          const countryScoreList = updatedCountryScores[countryId] || [];
          const newScore: CountryScore = {
            scores: scores,
            timestamp: new Date().toISOString(),
          };

          if (countryScoreList.length >= NUMBER_OF_SCORES_TO_KEEP) {
            countryScoreList.shift();
          }
          countryScoreList.push(newScore);
          updatedCountryScores[countryId] = countryScoreList;

          const globalScores = state.countryScoresData.global_scores[gameType];
          if (globalScores.length >= GLOBAL_COUNTRY_HISTORY_LENGTH) {
            globalScores.shift();
          }
          globalScores.push({ countryId, ...newScore });

          return {
            countryScoresData: {
              ...state.countryScoresData,
              country_scores: {
                ...state.countryScoresData.country_scores,
                [gameType]: updatedCountryScores,
              },
              global_scores: {
                ...state.countryScoresData.global_scores,
                [gameType]: globalScores,
              },
            },
          };
        });
      },
    }),
    {
      name: 'country-stats-v1', // key in local storage
    },
  ),
);
