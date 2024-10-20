import React from 'react';
import { getAllCountries } from '@/src/server/db/countries';
import { navigationLinks } from '@data/navigationLinks';
import Link from 'next/link';

async function page() {
  const countries = await getAllCountries();

  return (
    <div>
      <h1>What is the capital of...</h1>
      <ul className=''>
        {countries.map((country) => (
          <li key={country.id} className='text-blue-500 underline'>
            <Link
              href={`${navigationLinks.resources.href}/what-is-capital-of/${country.id}`}
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
