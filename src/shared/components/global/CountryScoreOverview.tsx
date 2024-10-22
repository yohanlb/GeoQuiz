'use client';

import React from 'react';
import { CountryScoreStatus } from '@shared/utils/score';
import { useCountryHistory } from '@stores/country-history-store';
import CountryScoreBadge from './CountryScoreBadge';

type Props = { countryIds: CountryRecord['id'][] };

const defaultScores: Record<CountryScoreStatus, number> = {
  perfect: 0,
  good: 0,
  notEnoughResults: 0,
  bad: 0,
  veryBad: 0,
};

const badgesLabels = {
  perfect: 'perfectly remembered.',
  good: 'almost remembered.',
  notEnoughResults: 'not tested enough.',
  bad: 'not remembered well.',
  veryBad: 'not remembered at all.',
};

export const PopoverContentScoreOverview = () => {
  return (
    <div className='flex flex-col gap-2 p-4'>
      <h4 className='text-xl font-medium'>Country Score Badges:</h4>

      {Object.keys(badgesLabels).map((key) => {
        const scoreKey = key as CountryScoreStatus;
        return (
          <div key={scoreKey} className='flex gap-1'>
            <CountryScoreBadge countryScoreStatus={scoreKey} />
            <span>Number of countries {badgesLabels[scoreKey]}</span>
          </div>
        );
      })}
    </div>
  );
};

const CountryScoreOverview = ({ countryIds }: Props) => {
  const { getSummarizedDeckCountryStatus } = useCountryHistory();
  const scores = getSummarizedDeckCountryStatus(countryIds);

  return (
    <div className='flex gap-2'>
      {Object.keys(defaultScores).map((key) => {
        const scoreKey = key as CountryScoreStatus;
        return (
          <div key={key} className='flex gap-1'>
            <CountryScoreBadge countryScoreStatus={scoreKey} />
            <span>{scores[scoreKey] || defaultScores[scoreKey]}</span>
          </div>
        );
      })}
    </div>
  );
};

export default CountryScoreOverview;
