import React, { Suspense } from 'react';
import UserCountryGuessesSection from '@/src/app/(app)/countries/[countryId]/UserCountryGuessesSection';
import { getCountryById } from '@features/countries/server/db/countries';
import DecksIncludingCountrySection from '@features/decks/components/DecksIncludingCountrySection';
import CountryDescription from '@features/quiz/components/CountryDescription';
import CountryShape from '@features/quiz/components/CountryShape';
import { navigationLinks } from '@lib/data/navigation-links';
import { supabase } from '@lib/supabase/static';
import PageCenteredLink from '@components/global/PageCenteredLink';

type Props = {
  params: { countryId: number };
};

export const revalidate = 60 * 60 * 24; // 1 day
export const dynamic = 'force-static';

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
  const country = await getCountryById(params.countryId);

  return (
    <div className='mx-auto flex max-w-md flex-col gap-12 px-2 py-2 md:px-0'>
      <CountryDescription countryData={country} />
      <CountryShape countryCode={country.iso2} />

      <UserCountryGuessesSection countryId={country.id} />
      <Suspense fallback={<div>Loading related decks...</div>}>
        {/* @ts-expect-error Async Server Component */}
        <DecksIncludingCountrySection countryId={country.id} />
      </Suspense>
      <PageCenteredLink
        href={navigationLinks.countries.href}
        label='All Countries'
      />
    </div>
  );
};

export default Country;
