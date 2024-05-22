import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const NUMBER_OF_SCORES_TO_KEEP = 10;
const GLOBAL_COUNTRY_HISTORY_LENGTH = 20;

interface CountryResultsData {
  country_scores: {
    flag: { [countryId: string]: CountryScore[] };
    capital: { [countryId: string]: CountryScore[] };
  };
  global_scores: {
    flag: CountryGuessHistory[];
    capital: CountryGuessHistory[];
  };
}

const defaultCountryResultsData: CountryResultsData = {
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

interface CountryResultsState {
  countryResultsData: CountryResultsData;
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

export const useStoreCountryResults = create<CountryResultsState>()(
  persist(
    (set, get) => ({
      countryResultsData: defaultCountryResultsData,

      clearAllCountryScores: () =>
        set({ countryResultsData: defaultCountryResultsData }),

      getLastScoresForCountry: (countryId: Deck['id'], gameType: GameType) => {
        const { countryResultsData } = get();
        return countryResultsData.country_scores[gameType][countryId] || [];
      },

      getHistoryCountriesGuessed: (gameType: GameType) => {
        const { countryResultsData } = get();
        const countryGuessHistory = countryResultsData.global_scores[gameType];
        return countryGuessHistory.slice(-20).reverse();
      },

      addCountryScores: (
        gameType: GameType,
        countryId: Deck['id'],
        scores: boolean,
      ) => {
        set((state) => {
          const updatedCountryScores =
            state.countryResultsData.country_scores[gameType];
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

          const globalScores = state.countryResultsData.global_scores[gameType];
          if (globalScores.length >= GLOBAL_COUNTRY_HISTORY_LENGTH) {
            globalScores.shift();
          }
          globalScores.push({ countryId, ...newScore });

          return {
            countryResultsData: {
              ...state.countryResultsData,
              country_scores: {
                ...state.countryResultsData.country_scores,
                [gameType]: updatedCountryScores,
              },
              global_scores: {
                ...state.countryResultsData.global_scores,
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
