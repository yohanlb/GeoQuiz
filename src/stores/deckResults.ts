import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const HISTORY_LENGTH = 5;

export type DeckResultsData = {
  capital: {
    scores: { [deckID: Deck['id']]: number };
    history: Deck['id'][];
  };
  flag: {
    scores: { [deckID: Deck['id']]: number };
    history: Deck['id'][];
  };
};

const defaultDeckResultsData: DeckResultsData = {
  capital: { scores: {}, history: [] },
  flag: { scores: {}, history: [] },
};

type GameType = 'capital' | 'flag';

interface DeckResultsState {
  DeckResultsData: DeckResultsData;
  clearAllDeckScores: () => void;
  getDeckScores: (deckID: Deck['id']) => { capital?: number; flag?: number };
  getAllDeckScores: (gameType: GameType) => { [deckID: Deck['id']]: number };
  getAllPlayedDeckIds: (gameType: GameType) => Deck['id'][];
  getLastPlayedDeckIds: (gameType: GameType) => Deck['id'][];
  updateDeckScore: (
    deckID: Deck['id'],
    gameType: GameType,
    newScore: number,
  ) => void;
}

export const useStoreDeckResults = create<DeckResultsState>()(
  persist(
    (set, get) => ({
      DeckResultsData: defaultDeckResultsData,

      clearAllDeckScores: () =>
        set({ DeckResultsData: defaultDeckResultsData }),

      getDeckScores: (deckID: Deck['id']) => {
        const { DeckResultsData } = get();
        return {
          capital: DeckResultsData.capital.scores[deckID],
          flag: DeckResultsData.flag.scores[deckID],
        };
      },

      getAllDeckScores: (gameType: GameType) => {
        const { DeckResultsData } = get();
        return DeckResultsData[gameType]?.scores || undefined;
      },

      getAllPlayedDeckIds: (gameType: GameType) => {
        const { DeckResultsData } = get();
        return Object.keys(DeckResultsData[gameType].scores).map(Number);
      },

      getLastPlayedDeckIds: (gameType: GameType) => {
        const { DeckResultsData } = get();
        const history = DeckResultsData[gameType]?.history || [];
        return [...history].reverse();
      },

      updateDeckScore: (
        deckID: Deck['id'],
        gameType: GameType,
        newScore: number,
      ) => {
        const { DeckResultsData } = get();
        const updatedScoresData = {
          ...DeckResultsData,
          [gameType]: {
            scores: {
              ...DeckResultsData[gameType].scores,
              [deckID]: newScore,
            },
            history: [
              ...DeckResultsData[gameType].history
                .filter((id) => id !== deckID)
                .slice(-HISTORY_LENGTH + 1),
              deckID,
            ],
          },
        };
        set({ DeckResultsData: updatedScoresData });
      },
    }),
    {
      name: 'deck-stats-v1', // name of the item in the storage
    },
  ),
);
