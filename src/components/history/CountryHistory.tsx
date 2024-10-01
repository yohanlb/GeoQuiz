import React from 'react';
import ReactCountryFlag from 'react-country-flag';
import { FaRegFlag } from 'react-icons/fa6';
import { PiCity } from 'react-icons/pi';
import { navigationLinks } from '@lib/navigationLinks';
import { UserGuessesHistoryWithCountryData } from '@utils/db/userGuessesHistory';
import Link from 'next/link';
import SectionTitle from '@components/_commons/SectionTitle';

type Props = { lastUserGuesses: UserGuessesHistoryWithCountryData[] };

const CountryHistory = ({ lastUserGuesses }: Props) => {
  return (
    <div>
      <SectionTitle text='Your Country Guess History' variant='h2' />
      <ul className='mt-4'>
        {lastUserGuesses.map((userGuess) => (
          <li
            key={userGuess.country_id + userGuess.question_type_id}
            className='group mb-2 flex w-full items-center justify-between rounded-lg bg-gray-800 p-2 shadow-md'
          >
            <div className='flex items-center space-x-2'>
              <div className='text-xl'>
                {userGuess.question_type_id === 1 ? <PiCity /> : <FaRegFlag />}
              </div>
              <Link
                href={`${navigationLinks.countries.href}/${userGuess.country_id}`}
                className='text-base font-bold text-white group-hover:underline'
              >
                {userGuess.countries_complete_view.name}
              </Link>
              <ReactCountryFlag
                countryCode={userGuess.countries_complete_view.iso2 as string}
                svg
                style={{
                  width: '20px',
                  height: '20px',
                }}
              />
              <p className='hidden text-sm text-gray-300 md:block'>
                {userGuess.countries_complete_view.capital}
              </p>
            </div>
            <div className='flex items-center space-x-1'>
              {userGuess.guess_results
                ?.reverse()
                .slice(-3)
                .map((guess: boolean, index: number) => (
                  <div
                    key={userGuess.country_id + index}
                    className={`flex h-6 w-6 items-center justify-center rounded-full ${guess ? 'bg-green-600' : 'bg-red-600'}`}
                  >
                    <span className='text-xs text-white'>
                      {guess ? '✓' : '✗'}
                    </span>
                  </div>
                ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryHistory;
