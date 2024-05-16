import { useLocalStorage } from 'usehooks-ts';

export type ScoresData = {
  countryScores: {
    capital: { [countryID: CountryData['id']]: number };
    flag: { [countryID: CountryData['id']]: number };
  };
  deckScores: {
    capital: { [deckID: Deck['id']]: number };
    flag: { [deckID: Deck['id']]: number };
  };
};

export type GameType = 'capital' | 'flag';

type DeckScores = {
  [key in GameType]: number | undefined;
};

const defaultScoreData: ScoresData = {
  countryScores: {
    capital: {},
    flag: {},
  },
  deckScores: {
    capital: {},
    flag: {},
  },
};

export function useScore() {
  const [scoresData, setScoresData, removeScores] = useLocalStorage(
    'scores',
    defaultScoreData as ScoresData,
  );

  function clearAllScores() {
    removeScores();
  }

  function getDeckScores(deckID: Deck['id']): DeckScores {
    const capitalScore = scoresData.deckScores['capital'][deckID];
    const flagScore = scoresData.deckScores['flag'][deckID];
    return {
      capital: capitalScore,
      flag: flagScore,
    };
  }

  // Not tested yet.
  // function updateCountryScore(
  //   countryID: CountryData['id'],
  //   gameType: GameType,
  //   newScore: number,
  // ) {
  //   const updatedScoresData = {
  //     ...scoresData,
  //     countryScores: {
  //       ...scoresData.countryScores,
  //       [gameType]: {
  //         ...scoresData.countryScores[gameType],
  //         [countryID]: newScore,
  //       },
  //     },
  //   };
  //   setScoresData(updatedScoresData);
  // }

  function updateDeckScore(
    deckID: Deck['id'],
    gameType: GameType,
    newScore: number,
  ) {
    const updatedScoresData = {
      ...scoresData,
      deckScores: {
        ...scoresData.deckScores,
        [gameType]: {
          ...scoresData.deckScores[gameType],
          [deckID]: newScore,
        },
      },
    };
    setScoresData(updatedScoresData);
  }

  return { getDeckScores, clearAllScores, updateDeckScore };
}
