import React from 'react';
import UserGuesses from '@/src/app/(app)/countries/[countryId]/UserGuesses';
import { getAuthenticatedUser } from '@/src/server/db/auth/get-authenticated-user';
import { fetchUserGuessesHistoryByCountry } from '@/src/server/db/user-guesses-history';
import { getCountryById } from '@/src/utils/queries/countries';
import { navigationLinks } from '@lib/navigationLinks';
import PageCenteredLink from '@components/_commons/PageCenteredLink';
import DecksIncludingCountrySection from '@components/countries/DecksIncludingCountrySection';
import CountryDescription from '@components/quiz/CountryDescription';
import CountryShape from '@components/quiz/CountryShape';

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
