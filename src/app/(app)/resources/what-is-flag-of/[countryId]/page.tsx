import React from 'react';
import ReactCountryFlag from 'react-country-flag';
import { navigationLinks } from '@lib/data/navigation-links';
import { supabase } from '@lib/supabase/static';
import { getCountriesByIds, getCountryById } from '@server/db/countries-rest';
import Link from 'next/link';

type Props = {
  params: Promise<{
    countryId: CountryRecord['id'];
  }>;
};

export async function generateMetadata(props: Props) {
  try {
    const params = await props.params;
    const { countryId } = params;
    const country = await getCountryById(countryId);

    if (!country) {
      return {
        title: 'Country not found',
        description: 'The requested country could not be found.',
      };
    }

    return {
      title: `What is the flag of ${country.name}?`,
      description: `Information about the flag of ${country.name}.`,
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Error',
      description: 'An error occurred while loading the page.',
    };
  }
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

  if (!country) {
    return (
      <div className='container mx-auto px-4 py-8 text-center'>
        <h1 className='text-2xl'>Country not found</h1>
        <Link
          href={navigationLinks.resources.href}
          className='text-blue-400 hover:underline'
        >
          Back to resources
        </Link>
      </div>
    );
  }

  const neighboringCountries = await getCountriesByIds(
    country.closest_country_ids ?? [],
  );

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
