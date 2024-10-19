'use client';

import React from 'react';
import CountryProgress from '@/src/app/(app)/decks/[deckName]/progress/CountryProgress';
import useFetchUserCountryGuesses from '@utils/hooks/useFetchUserCountryGuesses';

type Props = {
  countries: CountryCompleteViewRecord[];
};

const CountryProgressList = ({ countries }: Props) => {
  const countryIds = React.useMemo(
    () => countries.map((c) => c.id),
    [countries],
  );

  const { userGuesses, loading, error } = useFetchUserCountryGuesses({
    countryIds,
  });

  let content;

  if (loading) {
    content = <p>Loading...</p>;
  } else if (error) {
    content = <p>Error: {error.message}</p>;
  } else {
    content = (
      <div className='flex flex-col gap-1'>
        {countries.map((country) => (
          <CountryProgress
            key={country.id}
            country={country}
            userGuesses={userGuesses}
            questionTypeId={1}
          />
        ))}
      </div>
    );
  }

  return <div>{content}</div>;
};

export default CountryProgressList;
