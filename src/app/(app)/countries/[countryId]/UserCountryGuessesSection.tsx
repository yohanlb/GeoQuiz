'use client';

import React from 'react';
import UserGuesses from '@features/userInsights/components/UserGuesses';
import { useUserGuessesHistoryForCountry } from '@features/userInsights/hooks/useUserGuessesHistory';
import { UserContext } from '@lib/contexts/UserProvider';

type Props = {
  countryId: CountryCompleteViewRecord['id'];
};

function UserCountryGuessesSection({ countryId }: Readonly<Props>) {
  const { user } = React.useContext(UserContext);
  const { data: guessesHistory = [], isLoading: loading } =
    useUserGuessesHistoryForCountry(user?.id ?? '', countryId);

  if (!loading && !user) {
    return (
      <p className='ml-auto w-44 text-right text-sm'>
        <strong>Log in</strong> to see your history and progression
      </p>
    );
  }

  return (
    <UserGuesses
      guessesHistory={guessesHistory}
      alignment='right'
      loading={loading}
    />
  );
}

export default UserCountryGuessesSection;
