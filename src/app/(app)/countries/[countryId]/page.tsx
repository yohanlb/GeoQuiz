import React from 'react';
import { getCountryById } from '@features/countries/server/db/countries';
import DecksIncludingCountrySection from '@features/decks/components/DecksIncludingCountrySection';
import CountryDescription from '@features/quiz/components/CountryDescription';
import CountryShape from '@features/quiz/components/CountryShape';
import UserGuesses from '@features/userInsights/components/UserGuesses';
import { fetchUserGuessesHistoryByCountry } from '@features/userInsights/server/db/user-guesses-history';
import { navigationLinks } from '@lib/data/navigation-links';
import { supabase } from '@lib/supabase/static';
import { getAuthenticatedUser } from '@server/db/get-authenticated-user';
import PageCenteredLink from '@components/global/PageCenteredLink';

type Props = {
  params: { countryId: number };
};

export const revalidate = 60 * 60; // 1 hour

export async function generateMetadata({ params }: Props) {
  const { countryId } = params;

  const { name } = await getCountryById(countryId);

  return {
    title: `${name}`,
    description: `All the information about ${name}.`,
  };
}

export async function generateStaticParams() {
  // fetching from default supabase client cause cant work with cookies at build time
  const { data } = await supabase.from('countries').select('id');
  if (!data) {
    return [];
  }
  return data.map((country) => ({
    countryId: country.id.toString(),
  }));
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
