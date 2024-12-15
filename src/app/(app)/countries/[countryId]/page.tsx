import React from 'react';
import UserCountryGuessesSection from '@/src/app/(app)/countries/[countryId]/UserCountryGuessesSection';
import { getCountryById } from '@features/countries/server/db/countries';
import { getCountryStatsById } from '@features/countries/server/db/countries_stats';
import DecksIncludingCountrySection from '@features/decks/components/DecksIncludingCountrySection';
import { getDecks } from '@features/decks/server/db/decks';
import CountryDescription from '@features/quiz/components/CountryDescription';
import CountryShape from '@features/quiz/components/CountryShape';
import { navigationLinks } from '@lib/data/navigation-links';
import { supabase } from '@lib/supabase/static';
import PageCenteredLink from '@components/global/PageCenteredLink';

type Props = {
  params: Promise<{ countryId: number }>;
};

export const revalidate = 86400; // 1 day
export const dynamic = 'force-static';

export async function generateMetadata(props: Props) {
  const params = await props.params;
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

const Country = async (props: Props) => {
  const params = await props.params;
  const [country, countryStats, decks] = await Promise.all([
    getCountryById(params.countryId),
    getCountryStatsById(params.countryId),
    getDecks(),
  ]);

  return (
    <div className='mx-auto flex max-w-md flex-col gap-12 px-2 py-2 md:px-0'>
      <CountryDescription countryData={country} countryStats={countryStats} />
      <CountryShape countryCode={country.iso2} />
      <UserCountryGuessesSection countryId={country.id} />
      <DecksIncludingCountrySection countryId={country.id} decks={decks} />
      <PageCenteredLink
        href={navigationLinks.countries.href}
        label='All Countries'
      />
    </div>
  );
};

export default Country;
