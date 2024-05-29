import { getAllCountries } from '@/src/queries/countries';
import PageCenteredLink from '@components/_commons/PageCenteredLink';
import SectionTitle from '@components/_commons/SectionTitle';
import { navigationLinks } from '@lib/navigationLinks';
import Link from 'next/link';
import React from 'react';
import ReactCountryFlag from 'react-country-flag';

const Country = async () => {
  const countries = await getAllCountries();
  countries.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className='mx-auto flex flex-col gap-2 px-2 py-2 md:px-0'>
      <SectionTitle text='Countries' />
      <ul className='dot columns-3 md:columns-4'>
        {countries.map((country) => (
          <li
            key={country.id}
            className='tracking-thin text-sm font-light md:text-base'
          >
            <ReactCountryFlag
              countryCode={country.iso2}
              svg
              aria-label={country.name}
            />{' '}
            <Link href={`/countries/${country.id}`}>{country.name}</Link>
          </li>
        ))}
      </ul>
      <PageCenteredLink href={navigationLinks.home.href} label='Back' />
    </div>
  );
};

export default Country;
