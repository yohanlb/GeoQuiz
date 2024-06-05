import { AVAILABLE_QUESTION_TYPES } from '@lib/consts';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import useGameStore from './gameStore';

const DECK_HISTORY_LENGTH = 10;

export const initializeDeckResults = () => {
  const deckResults: {
    [key in QuestionType]: {
      scoresPerDeck: { [deckID: Deck['id']]: number };
      history: Deck['id'][];
    };
  } = {} as DeckResultsData;
  AVAILABLE_QUESTION_TYPES.forEach((type) => {
    deckResults[type] = { scoresPerDeck: {}, history: [] };
  });
  return deckResults;
};

export type DeckResultsData = {
  [key in QuestionType]: {
    scoresPerDeck: { [deckID: Deck['id']]: number };
    history: Deck['id'][];
  };
};

const defaultDeckResultsData = initializeDeckResults();

interface DeckResultsState {
  deckResultsData: DeckResultsData;
  clearAllDeckScores: () => void;
  getDeckScore: (deckID: Deck['id']) => number | null;
  getAllDeckScores: () => { [deckID: Deck['id']]: number };
  getAllPlayedDeckIds: () => Deck['id'][];
  getLastPlayedDeckIds: () => Deck['id'][];
  updateDeckScore: (deckID: Deck['id'], newScore: number) => void;
}

export const useDeckHistory = create<DeckResultsState>()(
  persist(
    (set, get) => ({
      deckResultsData: defaultDeckResultsData,

      clearAllDeckScores: () =>
        set({ deckResultsData: defaultDeckResultsData }),

      getDeckScore: (deckID: Deck['id']) => {
        const { deckResultsData } = get();
        const { questionType } = useGameStore.getState();
        return deckResultsData[questionType].scoresPerDeck[deckID];
      },

      getAllDeckScores: () => {
        const { deckResultsData } = get();
        const { questionType } = useGameStore.getState();
        return deckResultsData[questionType].scoresPerDeck || {};
      },

      getAllPlayedDeckIds: () => {
        const { deckResultsData } = get();
        const { questionType } = useGameStore.getState();
        const res = Object.keys(
          deckResultsData[questionType].scoresPerDeck,
        ).map(Number);
        return res;
      },

      getLastPlayedDeckIds: () => {
        const { deckResultsData } = get();
        const { questionType } = useGameStore.getState();
        const history = deckResultsData[questionType]?.history || [];
        return [...history].reverse();
      },

      updateDeckScore: (deckID: Deck['id'], newScore: number) => {
        const { deckResultsData } = get();
        const { questionType } = useGameStore.getState();
        const updatedScoresData = {
          ...deckResultsData,
          [questionType]: {
            scoresPerDeck: {
              ...deckResultsData[questionType].scoresPerDeck,
              [deckID]: newScore,
            },
            history: [
              ...deckResultsData[questionType].history
                .filter((id) => id !== Number(deckID))
                .slice(-DECK_HISTORY_LENGTH + 1),
              Number(deckID),
            ],
          },
        };
        set({ deckResultsData: updatedScoresData });
      },
    }),
    {
      name: 'deck-history', // name of the item in the storage
    },
  ),
);
