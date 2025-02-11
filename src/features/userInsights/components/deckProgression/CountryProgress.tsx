import React from 'react';
import ReactCountryFlag from 'react-country-flag';
import { navigationLinks } from '@lib/data/navigation-links';
import Link from 'next/link';
import GuessesList from '@components/global/GuessesList';

type Props = {
  countryWithUserGuesses: CountryWithUserGuesses;
};

const CountryProgress = ({ countryWithUserGuesses }: Props) => {
  const { country, userGuesses } = countryWithUserGuesses;

  return (
    <div
      key={country.id}
      className='group flex h-8 items-center justify-between border-b border-gray-500 p-2 transition-all duration-300 ease-in-out'
    >
      <div className='flex items-center space-x-4'>
        <ReactCountryFlag
          countryCode={country.iso2}
          svg
          style={{
            width: '20px',
            height: '20px',
          }}
        />
        <div>
          <h3 className='text-sm font-semibold'>
            <Link
              href={`${navigationLinks.countries.href}/${country.id}`}
              className='group-hover:underline'
            >
              {country.name}
            </Link>{' '}
            <span className='hidden text-xs text-gray-500 md:inline'>
              {country.capital}
            </span>
          </h3>
        </div>
      </div>
      <div className='flex items-center space-x-2'>
        <GuessesList countryHistory={userGuesses?.guess_results ?? []} />
        {/* TODO: add DifficultyIndicator */}
      </div>
    </div>
  );
};

export default CountryProgress;
