'use client';

import React from 'react';
import { useCountryHistory } from '@/src/stores/countryHistoryStore';
import useGameStore from '@/src/stores/gameStore';
import SectionTitle from '@components/_commons/SectionTitle';
import CountryTable from './CountryTable';

type Props = { countries: CountryData[] };

const CountryHistory = ({ countries }: Props) => {
  const getHistoryCountriesGuessed = useCountryHistory(
    (state) => state.getHistoryCountriesGuessed,
  );
  const { questionType } = useGameStore();

  // Trick to avoid client-side hydration error
  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    // Force re-render on questionType change
  }, [questionType]);

  if (!isMounted) {
    return null;
  }

  const countryHistory = getHistoryCountriesGuessed();
  console.log(countryHistory[0]);

  const lastPlayedCountries: CountryWithScores[] = [];
  for (const record of countryHistory) {
    const country = countries.find(
      (ctr) => ctr.id === Number(record.countryId),
    );
    if (!country) {
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
