'use client';

import React from 'react';
import { useCountryHistory } from '@/src/utils/stores/countryHistoryStore';
import useGameStore from '@/src/utils/stores/gameStore';
import SectionTitle from '@components/_commons/SectionTitle';
import CountryTable from './CountryTable';

type Props = { countries: CountryData[] };

const CountryHistory = ({ countries }: Props) => {
  const { questionType } = useGameStore();
  const getHistoryCountriesGuessed = useCountryHistory(
    (state) => state.getHistoryCountriesGuessed,
  );
  const countryHistory = getHistoryCountriesGuessed();

  React.useEffect(() => {
    // Force re-render on questionType change
  }, [questionType]);

  const lastPlayedCountries: CountryWithScores[] = [];
  for (const record of countryHistory) {
    const country = countries.find(
      (ctr) => ctr.id === Number(record.countryId),
    );
    if (!country) {
      console.error(`Country not found: ${record.countryId}`);
      return;
    }
    lastPlayedCountries.push({
      ...country,
      ...record,
    });
  }

  return (
    <div className='space-y-3'>
      <SectionTitle text='Last Guessed Countries' variant='h3' />
      {lastPlayedCountries.length > 0 ? (
        <CountryTable countries={lastPlayedCountries.slice(0, 10)} />
      ) : (
        <p className='text-sm font-thin'>No country guessed recently.</p>
      )}
    </div>
  );
};

export default CountryHistory;
