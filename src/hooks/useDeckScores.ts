import { useLocalStorage } from 'usehooks-ts';

export type DeckScoresData = {
  capital: { [deckID: Deck['id']]: number };
  flag: { [deckID: Deck['id']]: number };
};

const defaultDeckScoresData: DeckScoresData = {
  capital: {},
  flag: {},
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
    const capitalScore = deckScoresData['capital'][deckID];
    const flagScore = deckScoresData['flag'][deckID];
    return {
      capital: capitalScore,
      flag: flagScore,
    };
  }

  function updateDeckScore(
    deckID: Deck['id'],
    gameType: GameType,
    newScore: number,
  ) {
    const updatedScoresData = {
      ...deckScoresData,
      [gameType]: {
        ...deckScoresData[gameType],
        [deckID]: newScore,
      },
    };
    setDeckScoresData(updatedScoresData);
  }

  return { getDeckScores, clearAllDeckScores, updateDeckScore };
}
