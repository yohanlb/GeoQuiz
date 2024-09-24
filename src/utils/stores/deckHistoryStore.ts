import useGameStore from '@/src/utils/stores/gameStore';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { deckHistoryMigration } from './migrations/deckHistoryMigrations';

export type DeckResultsData = {
  [deckID: Deck['id']]: {
    playCountCountryToCapital: number;
    playCountCountryToFlag: number;
    lastPlayTimeCountryToCapital: number;
    lastPlayTimeCountryToFlag: number;
    lastScoreCountryToCapital: number;
    lastScoreCountryToFlag: number;
  };
};

export const DEFAULT_DECK_USER_DATA = {
  playCountCountryToCapital: 0,
  playCountCountryToFlag: 0,
  lastPlayTimeCountryToCapital: null,
  lastPlayTimeCountryToFlag: null,
  lastScoreCountryToCapital: null,
  lastScoreCountryToFlag: null,
};

export const initializeDeckResults = (): DeckResultsData => {
  return {};
};

const defaultDeckResultsData = initializeDeckResults();

export interface DeckResultsState {
  version: number;
  deckResultsData: DeckResultsData;
  clearAllDeckScores: () => void;
  getDeckScore: (deckID: Deck['id']) => number | null;
  addNewDeckResult: (deckID: Deck['id'], newScore: number) => void;
  getPlayedDeckIds: () => Deck['id'][];
  getLastNDecksPlayed: (n: number) => Deck['id'][];
  getDeckPlayCount: (deckID: Deck['id']) => number;
}

export const useDeckHistory = create<DeckResultsState>()(
  persist(
    (set, get) => ({
      version: 2, // New version number
      deckResultsData: defaultDeckResultsData,

      clearAllDeckScores: () =>
        set({ deckResultsData: defaultDeckResultsData }),

      getDeckScore: (deckID: Deck['id']) => {
        const { questionType } = useGameStore.getState();
        const { deckResultsData } = get();
        const scoreKey =
          `lastScore${questionType}` as keyof DeckResultsData[Deck['id']];
        if (!deckResultsData[deckID]) {
          return null;
        }
        return deckResultsData[deckID][scoreKey];
      },

      getDeckPlayCount: (deckID: Deck['id']) => {
        const { questionType } = useGameStore.getState();
        const { deckResultsData } = get();
        const playCountKey =
          `playCount${questionType}` as keyof DeckResultsData[Deck['id']];
        if (!deckResultsData[deckID]) {
          return 0;
        }
        return deckResultsData[deckID][playCountKey];
      },

      getPlayedDeckIds: (): number[] => {
        const { questionType } = useGameStore.getState();
        const { deckResultsData } = get();

        const key =
          questionType === 'CountryToCapital'
            ? 'playCountCountryToCapital'
            : 'playCountCountryToFlag';

        return Object.keys(deckResultsData)
          .filter((deckID) => {
            return deckResultsData[Number(deckID)][key] > 0;
          })
          .map((deckID) => Number(deckID));
      },

      getLastNDecksPlayed: (n: number): Deck['id'][] => {
        const { questionType } = useGameStore.getState();
        const { deckResultsData } = useDeckHistory.getState();

        // Get the keys for last play time based on the current game type
        const lastPlayTimeKey = `lastPlayTime${questionType}` as
          | 'lastPlayTimeCountryToCapital'
          | 'lastPlayTimeCountryToFlag';

        // Extract decks with play times
        const playedDecks = Object.entries(deckResultsData)
          .map(([deckID, data]) => ({
            deckID,
            lastPlayTime: data[lastPlayTimeKey],
          }))
          .filter((deck) => deck.lastPlayTime > 0) // Filter out decks that haven't been played
          .sort((a, b) => b.lastPlayTime - a.lastPlayTime)
          .slice(0, n) // Get the last N decks
          .map((deck) => Number(deck.deckID));

        return playedDecks;
      },

      addNewDeckResult: (deckID: Deck['id'], newScore: number) => {
        const { questionType } = useGameStore.getState();
        const { deckResultsData } = get();
        const currentDeckData =
          deckResultsData[deckID] || DEFAULT_DECK_USER_DATA;

        type QuestionKeys = 'CountryToCapital' | 'CountryToFlag';
        const keyToUpdatePlayCount =
          `playCount${questionType}` as `playCount${QuestionKeys}`;
        const newPlayCount =
          currentDeckData[
            keyToUpdatePlayCount as keyof typeof currentDeckData
          ] + 1;
        const keyToUpdateLastPlayTime =
          `lastPlayTime${questionType}` as `lastPlayTime${QuestionKeys}`;
        const keyToUpdateLastScore =
          `lastScore${questionType}` as `lastScore${QuestionKeys}`;

        const updatedDeckData = {
          ...currentDeckData,
          [keyToUpdateLastPlayTime]: Date.now(),
          [keyToUpdatePlayCount]: newPlayCount,
          [keyToUpdateLastScore]: newScore,
        };

        set({
          deckResultsData: {
            ...deckResultsData,
            [deckID]: updatedDeckData,
          },
        });
      },
    }),
    {
      name: 'deck-history', // name of the item in the storage
      version: 2, // Current version number
      migrate: deckHistoryMigration,
    },
  ),
);
