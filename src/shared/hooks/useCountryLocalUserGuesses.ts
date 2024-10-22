import { useEffect, useState } from 'react';
import useGameStore from '@stores/game-store';

const useCountryLocalUserGuesses = (countryId: CountryRecord['id']) => {
  const { getUseCountryScoreForCountryId, userCountryResults } = useGameStore();
  const [countryHistory, setCountryHistory] = useState<boolean[]>([]);
  const [newUserCountryResult, setNewUserCountryResult] =
    useState<UserResultsStatus>('default');

  useEffect(() => {
    const countryHistory = getUseCountryScoreForCountryId(countryId) || []; //most recent is at index 0
    setCountryHistory(countryHistory);

    const countryResult = userCountryResults.find(
      (result) => result.countryId === countryId,
    );
    setNewUserCountryResult(countryResult?.result ?? 'default');
  }, [countryId, getUseCountryScoreForCountryId, userCountryResults]);

  return { countryHistory, newUserCountryResult };
};

export default useCountryLocalUserGuesses;
