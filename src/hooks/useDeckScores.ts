import { useLocalStorage } from 'usehooks-ts';

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

export function useDeckScores() {
  const [deckScoresData, setDeckScoresData, removeDeckScores] = useLocalStorage(
    'deckScores',
    defaultDeckScoresData,
  );

  function clearAllDeckScores() {
    removeDeckScores();
  }

  function getDeckScores(deckID: Deck['id']): DeckScores {
    const capitalScore = deckScoresData.capital.scores[deckID];
    const flagScore = deckScoresData.flag.scores[deckID];
    return {
      capital: capitalScore,
      flag: flagScore,
    };
  }

  function getAllDeckScores(gameType: GameType = 'capital') {
    return deckScoresData[gameType]?.scores || undefined;
  }

  function getAllPlayedDeckIds(gameType: GameType) {
    const keys = Object.keys(deckScoresData[gameType].scores);
    return keys;
  }

  function getLastPlayedDeckIds(gameType: GameType) {
    // Most recent played decks first
    const history = deckScoresData[gameType]?.history || [];
    return [...history].reverse();
  }

  function updateDeckScore(
    deckID: Deck['id'],
    gameType: GameType,
    newScore: number,
  ) {
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
    setDeckScoresData(updatedScoresData);
  }

  return {
    getDeckScores,
    getAllDeckScores,
    getAllPlayedDeckIds,
    getLastPlayedDeckIds,
    clearAllDeckScores,
    updateDeckScore,
  };
}
