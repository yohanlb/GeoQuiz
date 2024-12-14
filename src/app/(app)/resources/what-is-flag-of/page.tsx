import React from 'react';
import ReactCountryFlag from 'react-country-flag';
import { getAllCountries } from '@features/countries/server/db/countries';
import { navigationLinks } from '@lib/data/navigation-links';
import Link from 'next/link';

export const metadata = {
  title: 'What is the flag of...',
  description: 'Learn about flags of different countries.',
};

async function page() {
  const countries = await getAllCountries();

  return (
    <div className='flex flex-col items-center gap-4'>
      <h1 className='text-3xl'>What is the flag of...</h1>
      <ul className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
        {countries.map((country) => (
          <li key={country.id} className='flex items-center gap-2'>
            <ReactCountryFlag
              className='inline-block'
              countryCode={country.iso2}
              svg
              aria-label={country.name}
              style={{
                width: '20px',
                height: 'auto',
              }}
            />
            <Link
              className='text-blue-500 underline'
              href={`${navigationLinks.resources.href}/what-is-flag-of/${country.id}`}
            >
              {country.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default page;
