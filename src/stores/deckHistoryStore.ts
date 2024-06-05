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
  deckResultsData: DeckResultsData;
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

export const useDeckHistory = create<DeckResultsState>()(
  persist(
    (set, get) => ({
      deckResultsData: defaultDeckResultsData,

      clearAllDeckScores: () =>
        set({ deckResultsData: defaultDeckResultsData }),

      getDeckScores: (deckID: Deck['id']) => {
        const { deckResultsData } = get();
        return {
          capital: deckResultsData.capital.scores[deckID],
          flag: deckResultsData.flag.scores[deckID],
        };
      },

      getAllDeckScores: (gameType: GameType) => {
        const { deckResultsData } = get();
        return deckResultsData[gameType]?.scores || undefined;
      },

      getAllPlayedDeckIds: (gameType: GameType) => {
        const { deckResultsData } = get();
        return Object.keys(deckResultsData[gameType].scores).map(Number);
      },

      getLastPlayedDeckIds: (gameType: GameType) => {
        const { deckResultsData } = get();
        const history = deckResultsData[gameType]?.history || [];
        return [...history].reverse();
      },

      updateDeckScore: (
        deckID: Deck['id'],
        gameType: GameType,
        newScore: number,
      ) => {
        const { deckResultsData } = get();
        const updatedScoresData = {
          ...deckResultsData,
          [gameType]: {
            scores: {
              ...deckResultsData[gameType].scores,
              [deckID]: newScore,
            },
            history: [
              ...deckResultsData[gameType].history
                .filter((id) => id !== deckID)
                .slice(-HISTORY_LENGTH + 1),
              deckID,
            ],
          },
        };
        set({ deckResultsData: updatedScoresData });
      },
    }),
    {
      name: 'deck-stats-v1', // name of the item in the storage
    },
  ),
);
