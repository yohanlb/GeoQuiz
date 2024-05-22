import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const HISTORY_LENGTH = 5;

export type DeckScoresData = {
  capital: {
    scores: { [deckID: Deck['id']]: number };
    history: Deck['id'][];
  };
  flag: {
    scores: { [deckID: Deck['id']]: number };
    history: Deck['id'][];
  };
};

const defaultDeckScoresData: DeckScoresData = {
  capital: { scores: {}, history: [] },
  flag: { scores: {}, history: [] },
};

type GameType = 'capital' | 'flag';

interface DeckScoresState {
  deckScoresData: DeckScoresData;
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

export const useDeckStatsStore = create<DeckScoresState>()(
  persist(
    (set, get) => ({
      deckScoresData: defaultDeckScoresData,

      clearAllDeckScores: () => set({ deckScoresData: defaultDeckScoresData }),

      getDeckScores: (deckID: Deck['id']) => {
        const { deckScoresData } = get();
        return {
          capital: deckScoresData.capital.scores[deckID],
          flag: deckScoresData.flag.scores[deckID],
        };
      },

      getAllDeckScores: (gameType: GameType) => {
        const { deckScoresData } = get();
        return deckScoresData[gameType]?.scores || undefined;
      },

      getAllPlayedDeckIds: (gameType: GameType) => {
        const { deckScoresData } = get();
        return Object.keys(deckScoresData[gameType].scores).map(Number);
      },

      getLastPlayedDeckIds: (gameType: GameType) => {
        const { deckScoresData } = get();
        const history = deckScoresData[gameType]?.history || [];
        return [...history].reverse();
      },

      updateDeckScore: (
        deckID: Deck['id'],
        gameType: GameType,
        newScore: number,
      ) => {
        const { deckScoresData } = get();
        const updatedScoresData = {
          ...deckScoresData,
          [gameType]: {
            scores: {
              ...deckScoresData[gameType].scores,
              [deckID]: newScore,
            },
            history: [
              ...deckScoresData[gameType].history
                .filter((id) => id !== deckID)
                .slice(-HISTORY_LENGTH + 1),
              deckID,
            ],
          },
        };
        set({ deckScoresData: updatedScoresData });
      },
    }),
    {
      name: 'deck-stats-v1', // name of the item in the storage
    },
  ),
);
