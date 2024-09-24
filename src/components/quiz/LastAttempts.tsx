'use client';

import React from 'react';
import { useCountryHistory } from '@/src/utils/stores/countryHistoryStore';
import { getCountryScoreStatus } from '@utils/score';
import AttemptSquare from '@components/_commons/AttemptSquare';
import CountryScoreBadge from '@components/_commons/CountryScoreBadge';

const LastAttempts = ({ countryId }: { countryId: number }) => {
  const numberOfAttemptsToShow = 3;
  const { getLastScoresForCountry } = useCountryHistory();
  const countryResult = getLastScoresForCountry(countryId);
  const lastResults = [...countryResult].slice(-numberOfAttemptsToShow);
  const countryScoreStatus = getCountryScoreStatus(lastResults);

  return (
    <div className='flex justify-end gap-2'>
      <div className='flex items-center gap-1'>
        {lastResults.map((result, index) => (
          <AttemptSquare
            key={index}
            isLast={index === lastResults.length - 1}
            status={result.scores ? 'correct' : 'wrong'}
          />
        ))}
        {[...Array(numberOfAttemptsToShow - lastResults.length)].map(
          (_, index) => (
            <AttemptSquare key={index} status='unplayed' /> // show placeholder if not enough results.
          ),
        )}
      </div>
      <CountryScoreBadge countryScoreStatus={countryScoreStatus} />
    </div>
  );
};

export default LastAttempts;
