import React from 'react';
import { useCountryHistory } from '@/src/stores/countryHistoryStore';
import { calculateRecallIndex } from '@lib/utils/score';
import Gauge from './Gauge';

const RecallIndex = ({ countryId }: { countryId: CountryData['id'] }) => {
  const getLastScoresForCountry = useCountryHistory(
    (state) => state.getLastScoresForCountry,
  );
  const userCountryScores = getLastScoresForCountry(countryId).map(
    (scoreObject) => scoreObject.scores,
  );

  const index = userCountryScores ? calculateRecallIndex(userCountryScores) : 0;
  const clampedIndex = Math.max(Math.min(index, 10), 0);

  return <Gauge value={Math.round(clampedIndex * 10)} variant='progress' />;
};

export default RecallIndex;
