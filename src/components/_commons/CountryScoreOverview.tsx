'use client';

import React from 'react';
import { useCountryHistory } from '@/src/stores/countryHistoryStore';
import { CountryScoreStatus } from '@lib/utils/score';
import CountryScoreBadge from './CountryScoreBadge';

type Props = { countryIds: CountryData['id'][] };

const defaultScores: Record<CountryScoreStatus, number> = {
  perfect: 0,
  good: 0,
  notEnoughResults: 0,
  bad: 0,
  veryBad: 0,
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
