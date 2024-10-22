import React from 'react';
import { getAuthenticatedUser } from '@/src/server/db/get-authenticated-user';
import CountryHistory from '@features/userInsights/components/history/CountryHistory';
import { fetchLastUserGuessesHistoryWithCountryRecord } from '@features/userInsights/server/db/user-guesses-history';
import { navigationLinks } from '@lib/data/navigation-links';
import PageCenteredLink from '@components/_commons/PageCenteredLink';

export const metadata = {
  title: 'History',
  description: 'View your quiz history.',
};

const History = async () => {
  const user = await getAuthenticatedUser();
  if (!user) {
    return <div>User data not available</div>;
  }

  const lastUserGuesses = await fetchLastUserGuessesHistoryWithCountryRecord(
    user.id,
    50,
  );

  return (
    <div className='flex flex-col gap-1 px-2 py-2 md:px-0'>
      {lastUserGuesses.length > 0 ? (
        <CountryHistory lastUserGuesses={lastUserGuesses} />
      ) : (
        <div className='flex flex-col items-center justify-center'>
          <p>No history yet, play some games and come back here!</p>
        </div>
      )}
      <PageCenteredLink href={navigationLinks.home.href} label='Back' />
    </div>
  );
};

export default History;
