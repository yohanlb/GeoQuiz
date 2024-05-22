'use client';
import React from 'react';
import CountryTable from './CountryTable';
import SectionTitle from '@components/_commons/SectionTitle';
import { useStoreCountryResults } from '@/src/stores/countryStats';

type Props = { countries: CountryData[] };

const CountryStats = ({ countries }: Props) => {
  const getHistoryCountriesGuessed = useStoreCountryResults(
    (state) => state.getHistoryCountriesGuessed,
  );

  // Trick to avoid client-side hydration error
  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }

  const countryHistory = getHistoryCountriesGuessed('capital');
  const lastPlayedCountries: CountryWithScores[] = [];
  for (let i = 0; i < countryHistory.length; i++) {
    const country = countries.find(
      (ctr) => ctr.id === Number(countryHistory[i].countryId),
    );
    if (!country) {
      return;
    }
    lastPlayedCountries.push({
      ...country,
      ...countryHistory[i],
    });
  }

  return (
    <div className='space-y-3'>
      <SectionTitle text='Last Countries Guessed' variant='h3' />
      {lastPlayedCountries.length > 0 ? (
        <CountryTable countries={lastPlayedCountries.slice(0, 10)} />
      ) : (
        <p className='text-sm font-thin'>No country guessed recently.</p>
      )}
    </div>
  );
};

export default CountryStats;
