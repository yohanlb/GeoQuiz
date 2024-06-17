import { DeckResultsData, DeckResultsState } from '../deckHistoryStore';

//v0
export type OldDeckResultsData = {
  [key in QuestionType]: {
    scoresPerDeck: { [deckID: Deck['id']]: number };
    history: Deck['id'][];
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deckHistoryMigration = (persistedState: any): DeckResultsState => {
  if (!persistedState.version) {
    // Migrate from old V0 structure to new V1structure
    const oldData: OldDeckResultsData = persistedState.deckResultsData;
    const newDeckResultsData: DeckResultsData = {};

    for (const questionType in oldData) {
      const { scoresPerDeck } = oldData[questionType as QuestionType];
      for (const deckID in scoresPerDeck) {
        if (!newDeckResultsData[deckID]) {
          newDeckResultsData[deckID] = {
            playCountCountryToCapital: 0,
            playCountCountryToFlag: 0,
            lastPlayTimeCountryToCapital: 0,
            lastPlayTimeCountryToFlag: 0,
            lastScoreCountryToCapital: 0,
            lastScoreCountryToFlag: 0,
          };
        }
        const countKey = `playCount${questionType}` as
          | 'playCountCountryToCapital'
          | 'playCountCountryToFlag';
        const lastScoreKey = `lastScore${questionType}` as
          | 'lastScoreCountryToCapital'
          | 'lastScoreCountryToFlag';
        newDeckResultsData[deckID][countKey] = 1; // Assuming each entry in the old format represents 1 play count
        newDeckResultsData[deckID][lastScoreKey] = scoresPerDeck[deckID];
        newDeckResultsData[deckID][
          `lastPlayTime${questionType}` as
            | 'lastPlayTimeCountryToCapital'
            | 'lastPlayTimeCountryToFlag'
        ] = Date.now(); // Set current time for last play time
      }
    }

    return {
      version: 2, // New version number
      deckResultsData: newDeckResultsData,
      clearAllDeckScores: () => {},
      getDeckScore: () => null,
      updateDeckScore: () => {},
      getPlayedDeckIds: () => [],
      getLastNDecksPlayed: () => [],
      getDeckPlayCount: () => 0,
    };
  }
  return persistedState;
};
