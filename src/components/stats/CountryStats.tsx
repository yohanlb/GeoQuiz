'use client';
import { useCountryScores } from '@/src/hooks/useCountryScores';
import React from 'react';

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

  const lastPlayedCountries = [];
  for (let i = 0; i < countryHistory.length; i++) {
    const country = countries.find(
      (ctr) => ctr.id === Number(countryHistory[i].countryId),
    );
    if (!country) {
      return;
    }
    lastPlayedCountries.push({
      ...country,
      timestamp: countryHistory[i].timestamp,
    });
  }

  return (
    <div className='space-y-3'>
      <h2 className='text-center'>Countries</h2>
      <h3>Last Played Decks</h3>
      <ul className='flex flex-col space-y-1'>
        {lastPlayedCountries.slice(0, 10).map((country) => (
          <span key={country.timestamp}>{country.name}</span>
        ))}
      </ul>
    </div>
  );
};

export default CountryStats;
