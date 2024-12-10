import React from 'react';
import ReactCountryFlag from 'react-country-flag';
import { FaRegFlag } from 'react-icons/fa6';
import { PiCity } from 'react-icons/pi';
import { calculateCountrySuccessPercentage } from '@features/quiz/utils/countryStats';
import { UserGuessHistoryWithCountry } from '@features/userInsights/server/db/user-guesses-history';
import { navigationLinks } from '@lib/data/navigation-links';
import Link from 'next/link';
import DifficultyIndicator from '@components/global/DifficultyIndicator';
import GuessesList from '@components/global/GuessesList';
import SectionTitle from '@components/global/SectionTitle';

type Props = { lastUserGuesses: UserGuessHistoryWithCountry[] };

const HeaderCell = ({ children }: { children: React.ReactNode }) => (
  <th className='px-2 py-1 font-normal'>{children}</th>
);

const Cell = ({ children }: { children: React.ReactNode }) => (
  <td className='px-2 py-1'>{children}</td>
);

const CountryHistory = ({ lastUserGuesses }: Props) => {
  return (
    <div>
      <SectionTitle text='Your Country Guesses History' variant='h2' />

      <div className='mt-4 w-full overflow-x-auto'>
        <table className='min-w-full whitespace-nowrap text-left text-xs'>
          <thead className='border-b text-xs capitalize md:text-lg'>
            <tr>
              <HeaderCell>Date</HeaderCell>
              <HeaderCell>Country</HeaderCell>
              <HeaderCell>Difficulty</HeaderCell>
              <HeaderCell>Flag</HeaderCell>
              <HeaderCell>Capital</HeaderCell>
              <HeaderCell>Mode</HeaderCell>
              <HeaderCell>Result</HeaderCell>
            </tr>
          </thead>
          <tbody className='text-xs md:text-base'>
            {lastUserGuesses.map((userGuess) => {
              const { successRateCapital, successRateFlag } =
                calculateCountrySuccessPercentage(userGuess.countryStats);
              const successPercentage =
                userGuess.question_type_id === 1
                  ? successRateCapital
                  : successRateFlag;

              return (
                <tr
                  key={userGuess.country_id + userGuess.question_type_id}
                  className='border-b border-gray-500 hover:bg-gray-800'
                >
                  <Cell>
                    {new Date(userGuess.updated_at).toLocaleDateString(
                      'en-GB',
                      { year: '2-digit', month: '2-digit', day: '2-digit' },
                    )}
                  </Cell>
                  <Cell>
                    <div className='flex gap-x-2 text-wrap break-words font-extralight'>
                      <Link
                        href={`${navigationLinks.countries.href}/${userGuess.country_id}`}
                        className='text-base font-normal text-white group-hover:underline'
                      >
                        {userGuess.country.name}
                      </Link>
                    </div>
                  </Cell>
                  <Cell>
                    <DifficultyIndicator value={successPercentage} />
                  </Cell>
                  <Cell>
                    <div className='font-extralight'>
                      <ReactCountryFlag
                        countryCode={userGuess.country.iso2}
                        svg
                        style={{
                          width: '20px',
                          height: '20px',
                        }}
                      />
                    </div>
                  </Cell>
                  <Cell>
                    <div className='text-wrap break-words font-extralight'>
                      {userGuess.country.capital}
                    </div>
                  </Cell>
                  <Cell>
                    {userGuess.question_type_id === 1 ? (
                      <PiCity />
                    ) : (
                      <FaRegFlag />
                    )}
                  </Cell>
                  <Cell>
                    <GuessesList
                      countryHistory={userGuess.guess_results ?? []}
                    />
                  </Cell>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CountryHistory;
