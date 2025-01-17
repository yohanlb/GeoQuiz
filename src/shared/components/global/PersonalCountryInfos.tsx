'use client';

import React from 'react';
import useCountryLocalUserGuesses from '@hooks/useCountryLocalUserGuesses';
import { UserContext } from '@lib/contexts/UserProvider';
import GuessesList from '@components/global/GuessesList';

type Props = {
  countryId: CountryRecord['id'];
  showNewResult?: boolean;
};

const PersonalCountryInfos = ({ countryId, showNewResult = false }: Props) => {
  const { user } = React.useContext(UserContext);

  // Get history from the store (local storage)
  const { countryHistory, newUserCountryResult } =
    useCountryLocalUserGuesses(countryId);

  if (!user) return null;
  return (
    <div className='flex flex-col items-end justify-end'>
      <span>Last Attempts</span>
      <div>
        <div className='inline-block'>
          <GuessesList
            countryHistory={countryHistory}
            newResult={showNewResult ? newUserCountryResult : undefined}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalCountryInfos;
