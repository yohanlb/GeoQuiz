import React from 'react';
import { getCountryById } from '@server/db/countries-rest';
import { getCountryDetailsById } from '@server/db/countries-details-rest';
import { getCountryStatsById } from '@server/db/countries-stats-rest';
import CountryDescription from '@features/quiz/components/CountryDescription';
import CountryShape from '@features/quiz/components/CountryShape';
import { navigationLinks } from '@lib/data/navigation-links';
import { supabase } from '@lib/supabase/static';
import PageCenteredLink from '@components/global/PageCenteredLink';
import CountryDetailsContent from './CountryDetailsContent';

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
    title: `${name} - Detailed Information`,
    description: `Comprehensive information about ${name} including landmarks, culture, facts, and more.`,
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

const CountryDetailsPage = async (props: Props) => {
  const params = await props.params;
  const [country, countryStats, countryDetails] = await Promise.all([
    getCountryById(params.countryId),
    getCountryStatsById(params.countryId),
    getCountryDetailsById(params.countryId),
  ]);

  if (!countryDetails) {
    return (
      <div className='mx-auto flex max-w-4xl flex-col gap-8 px-4 py-8'>
        <CountryDescription countryData={country} countryStats={countryStats} />
        <div className='rounded-lg bg-gray-50 p-8 text-center dark:bg-gray-900'>
          <h2 className='text-xl font-semibold text-gray-600 dark:text-gray-400'>
            Detailed information for {country.name} is not available yet.
          </h2>
          <p className='mt-2 text-gray-500 dark:text-gray-500'>
            We're working on adding comprehensive details for all countries.
          </p>
        </div>
        <PageCenteredLink
          href={navigationLinks.countries.href}
          label='All Countries'
        />
      </div>
    );
  }

  return (
    <div className='mx-auto flex max-w-4xl flex-col gap-8 px-4 py-8'>
      <CountryDescription countryData={country} countryStats={countryStats} />
      <CountryShape countryCode={country.iso2} />
      <CountryDetailsContent countryDetails={countryDetails} />
      <PageCenteredLink
        href={navigationLinks.countries.href}
        label='All Countries'
      />
    </div>
  );
};

export default CountryDetailsPage;