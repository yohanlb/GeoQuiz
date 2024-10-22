import React from 'react';
import { getAuthenticatedUser } from '@features/auth/server/db/get-authenticated-user';
import DecksIncludingCountrySection from '@features/decks/components/DecksIncludingCountrySection';
import CountryDescription from '@features/quiz/components/CountryDescription';
import CountryShape from '@features/quiz/components/CountryShape';
import UserGuesses from '@features/userInsights/components/UserGuesses';
import { fetchUserGuessesHistoryByCountry } from '@features/userInsights/server/db/user-guesses-history';
import { navigationLinks } from '@lib/data/navigation-links';
import { getCountryById } from '@lib/queries/countries';
import PageCenteredLink from '@components/_commons/PageCenteredLink';

type Props = {
  params: { countryId: number };
};

export async function generateMetadata({ params }: Props) {
  const { countryId } = params;

  const { name } = await getCountryById(countryId);

  return {
    title: `${name}`,
    description: `All the information about ${name}.`,
  };
}

const Country = async ({ params }: Props) => {
  const user = await getAuthenticatedUser();
  const country = await getCountryById(params.countryId);
  const guessesHistory = user?.id
    ? await fetchUserGuessesHistoryByCountry(user.id, country.id)
    : [];

  return (
    <div className='mx-auto flex max-w-md flex-col gap-12 px-2 py-2 md:px-0'>
      <CountryDescription countryData={country} />
      <CountryShape countryCode={country.iso2} />

      {user ? (
        <UserGuesses guessesHistory={guessesHistory} alignment='right' />
      ) : (
        <p className='ml-auto w-44 text-right text-sm'>
          <strong>Log in</strong> to see your history and progression
        </p>
      )}
      <DecksIncludingCountrySection countryId={country.id} />
      <PageCenteredLink
        href={navigationLinks.countries.href}
        label='All Countries'
      />
    </div>
  );
};

export default Country;
