import { useLocalStorage } from 'usehooks-ts';

export type CountryScoresData = {
  capital: { [countryID: CountryData['id']]: number };
  flag: { [countryID: CountryData['id']]: number };
};

const defaultCountryScoresData: CountryScoresData = {
  capital: {},
  flag: {},
};

export function useCountryScores() {
  const [countryScoresData, setCountryScoresData, removeCountryScores] =
    useLocalStorage('countryScores', defaultCountryScoresData);

  function clearAllCountryScores() {
    removeCountryScores();
  }

  function getCountryScores(countryID: CountryData['id']): CountryScore {
    const capitalScore = countryScoresData['capital'][countryID];
    const flagScore = countryScoresData['flag'][countryID];
    return {
      capital: capitalScore,
      flag: flagScore,
    };
  }

  function updateCountryScore(
    countryID: string,
    gameType: GameType,
    newScore: number,
  ) {
    const updatedScoresData = {
      ...countryScoresData,
      [gameType]: {
        ...countryScoresData[gameType],
        [countryID]: newScore,
      },
    };
    setCountryScoresData(updatedScoresData);
  }

  return { getCountryScores, updateCountryScore, clearAllCountryScores };
}
