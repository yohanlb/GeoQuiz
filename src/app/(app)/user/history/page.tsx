import React from 'react';
import { navigationLinks } from '@lib/navigationLinks';
import { getAuthenticatedUser } from '@utils/db/auth/get-authenticated-user';
import { fetchLastUserGuessesHistoryWithCountryData } from '@utils/db/userGuessesHistory';
import PageCenteredLink from '@components/_commons/PageCenteredLink';
import CountryHistory from '@components/history/CountryHistory';

const History = async () => {
  const user = await getAuthenticatedUser();
  if (!user) {
    return <div>User data not available</div>;
  }

  const lastUserGuesses = await fetchLastUserGuessesHistoryWithCountryData(
    user.id,
    10,
  );

  return (
    <div className='flex flex-col gap-1 px-2 py-2 md:px-0'>
      <CountryHistory lastUserGuesses={lastUserGuesses} />
      <PageCenteredLink href={navigationLinks.home.href} label='Back' />
    </div>
  );
};

export default History;
