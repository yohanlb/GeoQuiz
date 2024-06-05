'use client';

import React from 'react';
import { useStoreCountryResults } from '@/src/stores/countryResults';
import RecallIndex from '@components/_commons/RecallIndex';
import LastAttempts from '../quiz/LastAttempts';

type Props = {
  countryId: CountryData['id'];
};

const PersonalCountryInfos = ({ countryId }: Props) => {
  const getLastScoresForCountry = useStoreCountryResults(
    (state) => state.getLastScoresForCountry,
  );
  const countryScores = getLastScoresForCountry(countryId).map(
    (scoreObject) => scoreObject.scores,
  );

  const unplayed = countryScores.length === 0;

  return (
    <div className='flex flex-col items-end justify-end'>
      <div className='flex items-center gap-2 justify-end text-left'>
        <span>Memory Index: </span>
        <RecallIndex countryId={countryId} />
      </div>
      <div>
        <span>Last Attempts: </span>
        <div className='inline-block'>
          {unplayed ? (
            <strong className='font-semibold italic'>Unplayed</strong>
          ) : (
            <LastAttempts results={[...countryScores].reverse()} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalCountryInfos;
