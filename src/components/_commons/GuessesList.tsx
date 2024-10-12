'use client';

import React from 'react';
import { getCountryScoreStatus } from '@utils/score';
import AttemptSquare from '@components/_commons/AttemptSquare';
import CountryScoreBadge from '@components/_commons/CountryScoreBadge';

type Props = {
  countryHistory: boolean[];
  newResult?: UserResultsStatus;
};

const GuessesList = ({
  countryHistory = [],
  newResult = undefined,
}: Readonly<Props>) => {
  const numberOfHistoryGuessToShow = 3;

  const historyReversed = [...countryHistory]
    .reverse()
    .slice(-numberOfHistoryGuessToShow); // reverse to show most recent at the end
  const allResultsBool = [...historyReversed];

  const showNewResult = newResult !== undefined;
  if (showNewResult) {
    allResultsBool.push(newResult === 'valid');
  }
  const countryScoreStatus = getCountryScoreStatus(allResultsBool);

  const extraEmptySquaresToShow = Math.max(
    numberOfHistoryGuessToShow - countryHistory.length,
    0,
  );

  return (
    <div className='inline-flex gap-2'>
      <div className='flex items-center gap-1'>
        {/* Show history results */}
        {historyReversed.map((result, index) => (
          <AttemptSquare key={index} status={result ? 'valid' : 'invalid'} />
        ))}
        {/* Show an empty square until user click on an answer */}
        {showNewResult && <AttemptSquare status={newResult} isLast={true} />}
        {/* Show placeholder if not enough history results. */}
        {[...Array(extraEmptySquaresToShow)].map((_, index) => (
          <AttemptSquare key={index} status='default' />
        ))}
      </div>
      <CountryScoreBadge countryScoreStatus={countryScoreStatus} />
    </div>
  );
};

export default GuessesList;
