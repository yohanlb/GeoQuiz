import React from 'react';
import ReactCountryFlag from 'react-country-flag';
import {
  getCountriesByIds,
  getCountryById,
} from '@/src/shared/server/db/countries-rest';
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
    title: `What is the capital of ${country.name}?`,
    description: `Information about the capital of ${country.name}.`,
  };
}

export async function generateStaticParams() {
  try {
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      console.error(
        'Missing required environment variables during static generation',
      );
      return [];
    }

    const { data, error } = await supabase.from('countries').select('id');

    if (error) {
      console.error('Supabase query error:', error);
      return [];
    }

    if (!data?.length) {
      console.warn('No countries data returned from Supabase');
      return [];
    }

    return data.map((country) => ({
      countryId: country.id.toString(),
    }));
  } catch (error) {
    console.error('Failed to generate static params:', error);
    return [];
  }
}

export const dynamicParams = true; // Allow fallback to server-side rendering if static generation fails

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
          What is the capital of <strong>{country.name}</strong>?
        </h1>

        <p className='text-lg text-gray-300'>
          {country.name} is a country located in {country.subregion}.
        </p>
        <p className='text-lg text-gray-300'>
          Its capital city is <strong>{country.capital}</strong>, which serves
          as the political and cultural center of the country.
        </p>

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
            The capital of <strong>{country.name}</strong> is{' '}
            <strong className='text-2xl'>{country.capital}</strong>
          </h2>
        </div>

        <div className='mt-8 w-full max-w-2xl rounded-lg bg-gray-800/50 p-8'>
          <h3 className='mb-6 text-xl font-semibold'>
            Neighboring countries and their capitals:
          </h3>
          <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4'>
            {neighboringCountries.map((country) => (
              <Link
                key={country.id}
                href={`${navigationLinks.resources.href}/what-is-capital-of/${country.id}`}
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
                <span className='text-xs text-gray-400'>{country.capital}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
