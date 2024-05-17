import { useLocalStorage } from 'usehooks-ts';

const NUMBER_OF_SCORES_TO_KEEP = 10;

export type CountryScoresData = {
  capital: { [countryID: string]: boolean[] };
  flag: { [countryID: string]: boolean[] };
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

  function getCountryScores(countryID: CountryData['id']): CountryScores {
    const capitalScores = countryScoresData['capital'][countryID] ?? null;
    const flagScores = countryScoresData['flag'][countryID] ?? null;
    return {
      capital: capitalScores,
      flag: flagScores,
    };
  }

  function updateCountryScore(
    countryID: CountryData['id'],
    gameType: GameType,
    newResult: boolean,
  ) {
    const updatedScoresData = {
      ...countryScoresData,
      [gameType]: {
        ...countryScoresData[gameType],
        [countryID]: [
          newResult,
          ...(countryScoresData[gameType][countryID] ?? []),
        ].slice(0, NUMBER_OF_SCORES_TO_KEEP),
      },
    };
    setCountryScoresData(updatedScoresData);
  }

  return { getCountryScores, updateCountryScore, clearAllCountryScores };
}
