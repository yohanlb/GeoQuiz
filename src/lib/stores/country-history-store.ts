import { AVAILABLE_QUESTION_TYPES } from '@lib/data/consts';
import { CountryScoreStatus, getCountryScoreStatus } from '@lib/utils/score';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import useGameStore from './game-store';

const NUMBER_OF_SCORES_TO_KEEP_PER_COUNTRY = 10;
const USER_HISTORY_LENGTH = 20;

interface CountryScore {
  scores: boolean;
  timestamp: string; // ISO 8601 formatted date-time string
}

interface CountryResultsData {
  history_per_country: {
    [key in QuestionType]: { [countryId: string]: CountryScore[] };
  };
  user_history: {
    [key in QuestionType]: CountryGuessHistory[];
  };
}

const initializeHistoryPerCountry = () => {
  const historyPerCountry: {
    [key in QuestionType]: { [countryId: string]: CountryScore[] };
  } = {} as CountryResultsData['history_per_country'];
  AVAILABLE_QUESTION_TYPES.forEach((type) => {
    historyPerCountry[type] = {};
  });
  return historyPerCountry;
};

const initializeUserHistory = () => {
  const userHistory: { [key in QuestionType]: CountryGuessHistory[] } =
    {} as CountryResultsData['user_history'];
  AVAILABLE_QUESTION_TYPES.forEach((type) => {
    userHistory[type] = [];
  });
  return userHistory;
};

const defaultCountryResultsData: CountryResultsData = {
  history_per_country: initializeHistoryPerCountry(),
  user_history: initializeUserHistory(),
};

interface CountryResultsState {
  countryResultsData: CountryResultsData;
  clearAllCountryScores: () => void;
  getLastScoresForCountry: (countryId: CountryRecord['id']) => CountryScore[];
  getHistoryCountriesGuessed: () => CountryGuessHistory[];
  addCountryScores: (countryId: CountryRecord['id'], scores: boolean) => void;
  getProgressPercentForCountryIds: (
    countryIds: CountryRecord['id'][],
  ) => number;
  getSummarizedDeckCountryStatus: (countryIds: CountryRecord['id'][]) => {
    [key in CountryScoreStatus]: number;
  };
}

export const useCountryHistory = create<CountryResultsState>()(
  persist(
    (set, get) => ({
      countryResultsData: defaultCountryResultsData,

      getSummarizedDeckCountryStatus(countryIds: CountryRecord['id'][]) {
        const { getLastScoresForCountry } = get();
        const groupedDeckStatus = countryIds.reduce(
          (acc: Record<CountryScoreStatus, number>, countryId) => {
            const lastScores = getLastScoresForCountry(countryId);
            const lastScoresBoolean = lastScores.map((score) => score.scores);
            const status = getCountryScoreStatus(lastScoresBoolean);
            if (!acc[status]) {
              acc[status] = 0;
            }
            acc[status] += 1;
            return acc;
          },
          {} as Record<CountryScoreStatus, number>,
        );

        return groupedDeckStatus;
      },

      getProgressPercentForCountryIds: (countryIds: CountryRecord['id'][]) => {
        const { getSummarizedDeckCountryStatus } = get();
        const deckStatuses = getSummarizedDeckCountryStatus(countryIds);

        const countriesRememberedPerfectly = deckStatuses.perfect || 0;
        const countriesPartialyRemembered = deckStatuses.good || 0;

        const amountOfRememberedCountries =
          countriesRememberedPerfectly + countriesPartialyRemembered * 0.3;

        return Math.round(
          (amountOfRememberedCountries / countryIds.length) * 100,
        );
      },

      clearAllCountryScores: () =>
        set({ countryResultsData: defaultCountryResultsData }),

      getLastScoresForCountry: (countryId: CountryRecord['id']) => {
        const { countryResultsData } = get();
        const { questionType } = useGameStore.getState();
        return (
          countryResultsData.history_per_country[questionType][countryId] || []
        );
      },

      getHistoryCountriesGuessed: () => {
        const { countryResultsData } = get();
        const { questionType } = useGameStore.getState();
        const countryGuessHistory =
          countryResultsData.user_history[questionType];
        return countryGuessHistory.slice(-20).reverse();
      },

      addCountryScores: (countryId: CountryRecord['id'], scores: boolean) => {
        set((state) => {
          const { questionType } = useGameStore.getState();
          const updatedCountryScores =
            state.countryResultsData.history_per_country[questionType];
          const countryScoreList = updatedCountryScores[countryId] || [];
          const newScore: CountryScore = {
            scores: scores,
            timestamp: new Date().toISOString(),
          };

          if (countryScoreList.length >= NUMBER_OF_SCORES_TO_KEEP_PER_COUNTRY) {
            countryScoreList.shift();
          }
          countryScoreList.push(newScore);
          updatedCountryScores[countryId] = countryScoreList;

          const userHistory =
            state.countryResultsData.user_history[questionType];
          if (userHistory.length >= USER_HISTORY_LENGTH) {
            userHistory.shift();
          }
          userHistory.push({ countryId, ...newScore });

          return {
            countryResultsData: {
              ...state.countryResultsData,
              history_per_country: {
                ...state.countryResultsData.history_per_country,
                [questionType]: updatedCountryScores,
              },
              user_history: {
                ...state.countryResultsData.user_history,
                [questionType]: userHistory,
              },
            },
          };
        });
      },
    }),
    {
      name: 'country-history', // key in local storage
    },
  ),
);
