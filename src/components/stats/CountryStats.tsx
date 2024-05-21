'use client';
import { useCountryScores } from '@/src/hooks/useCountryScores';
import React from 'react';
import CountryTable from './CountryTable';

type Props = { countries: CountryData[] };

const CountryStats = ({ countries }: Props) => {
  const { getHistoryCountriesGuessed } = useCountryScores();

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
      <h3>Last Countries Guessed</h3>
      <CountryTable countries={lastPlayedCountries.slice(0, 10)} />
    </div>
  );
};

export default CountryStats;
