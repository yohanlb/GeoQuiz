import { useLocalStorage } from 'usehooks-ts';

const NUMBER_OF_SCORES_TO_KEEP = 10;
const GLOBAL_COUNTRY_HISTORY_LENGTH = 20;

interface CountryScore {
  scores: boolean;
  timestamp: string; // ISO 8601 formatted date-time string
}

export interface GuessScore extends CountryScore {
  countryId: CountryData['id'];
}

interface CountryScoresData {
  country_scores: {
    flag: { [countryId: string]: CountryScore[] };
    capital: { [countryId: string]: CountryScore[] };
  };
  global_scores: {
    flag: GuessScore[];
    capital: GuessScore[];
  };
}

const defaultCountryScoresData: CountryScoresData = {
  country_scores: {
    capital: {},
    flag: {},
  },
  global_scores: {
    capital: [],
    flag: [],
  },
};

export function useCountryScores() {
  const [countryScoresData, setCountryScoresData, removeCountryScores] =
    useLocalStorage('countryScores', defaultCountryScoresData);

  function clearAllCountryScores() {
    removeCountryScores();
  }

  function getLastScoresForCountry(
    countryId: CountryData['id'],
    gameType: GameType,
  ) {
    return countryScoresData.country_scores[gameType][countryId] || [];
  }

  function getHistoryCountriesGuessed(gameType: GameType) {
    const countryGuessHistory = countryScoresData.global_scores[gameType];
    return countryGuessHistory.slice(-20).reverse();
  }

  function addCountryScores(
    gameType: GameType,
    countryId: CountryData['id'],
    scores: boolean,
  ) {
    // Update Score for Country
    const countryScores = countryScoresData.country_scores[gameType];
    const countryScoreList = countryScores[countryId] || [];
    const newScore: CountryScore = {
      scores: scores,
      timestamp: new Date().toISOString(),
    };
    if (countryScoreList.length >= NUMBER_OF_SCORES_TO_KEEP) {
      countryScoreList.shift();
    }
    countryScoreList.push(newScore);
    countryScores[countryId] = countryScoreList;

    // Update Country Guessing History
    const globalScores = countryScoresData.global_scores[gameType];
    if (globalScores.length >= GLOBAL_COUNTRY_HISTORY_LENGTH) {
      globalScores.shift(); // Retirer le plus ancien score si la limite est atteinte
    }
    globalScores.push({ countryId: countryId, ...newScore });

    setCountryScoresData(countryScoresData);
  }

  return {
    getLastScoresForCountry,
    getHistoryCountriesGuessed,
    addCountryScores,
    clearAllCountryScores,
  };
}
