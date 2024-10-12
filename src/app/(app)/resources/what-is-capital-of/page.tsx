import React from 'react';
import { navigationLinks } from '@lib/navigationLinks';
import { getAllCountries } from '@utils/db/countries';
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
