import React from 'react';
import ReactCountryFlag from 'react-country-flag';
import {
  getCountriesByIds,
  getCountryById,
} from '@/src/shared/server/db/countries';
import { navigationLinks } from '@lib/data/navigation-links';
import { supabase } from '@lib/supabase/static';
import Link from 'next/link';

type Props = {
  params: Promise<{
    countryId: CountryRecord['id'];
  }>;
};

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const { countryId } = params;
  const country = await getCountryById(countryId);

  return {
    title: `What is the flag of ${country.name}?`,
    description: `Information about the flag of ${country.name}.`,
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

async function page(props: Props) {
  const params = await props.params;
  const { countryId } = params;
  const country = await getCountryById(countryId);

  const neighboringCountries = await getCountriesByIds(
    country.closest_country_ids ?? [],
  );

  if (!country) {
    return <div>Country not found</div>;
  }

  return (
    <div className='container mx-auto max-w-4xl px-4 py-8'>
      <div className='flex flex-col items-center justify-center gap-8 text-center'>
        <h1 className='text-4xl font-bold'>
          What is the flag of <strong>{country.name}</strong>?
        </h1>

        <div className='w-full max-w-xl rounded-lg bg-gray-800/50 p-8'>
          <div className='mb-6'>
            <ReactCountryFlag
              className='inline-block rounded-md shadow-lg'
              countryCode={country.iso2}
              svg
              aria-label={country.name}
              alt={`Flag of ${country.name}`}
              style={{
                width: '100%',
                height: 'auto',
                maxWidth: '400px',
              }}
            />
          </div>
          <h2 className='text-2xl'>
            This is the flag of <strong>{country.name}</strong>
          </h2>
        </div>

        <div className='mt-8 w-full max-w-2xl rounded-lg bg-gray-800/50 p-8'>
          <h3 className='mb-6 text-xl font-semibold'>
            Neighboring countries and their flags:
          </h3>
          <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4'>
            {neighboringCountries.map((country) => (
              <Link
                key={country.id}
                href={`${navigationLinks.resources.href}/what-is-flag-of/${country.id}`}
                className='group flex flex-col items-center gap-2 rounded-md p-2 transition-colors hover:bg-gray-700/50'
              >
                <ReactCountryFlag
                  className='inline-block rounded shadow-sm transition-transform group-hover:scale-110'
                  countryCode={country.iso2}
                  svg
                  aria-label={country.name}
                  style={{
                    width: '60px',
                    height: 'auto',
                  }}
                />
                <span className='text-sm text-blue-400 group-hover:underline'>
                  {country.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
