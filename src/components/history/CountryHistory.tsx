import React from 'react';
import ReactCountryFlag from 'react-country-flag';
import { FaRegFlag } from 'react-icons/fa6';
import { PiCity } from 'react-icons/pi';
import { navigationLinks } from '@lib/navigationLinks';
import { UserGuessesHistoryWithCountryData } from '@utils/db/userGuessesHistory';
import Link from 'next/link';
import DifficultyIndicator from '@components/_commons/DifficultyIndicator';
import GuessesList from '@components/_commons/GuessesList';
import SectionTitle from '@components/_commons/SectionTitle';

type Props = { lastUserGuesses: UserGuessesHistoryWithCountryData[] };

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
              const successRate =
                userGuess.question_type_id === 1
                  ? (userGuess.countries_complete_view.success_rate_capital ??
                    0.5)
                  : (userGuess.countries_complete_view.success_rate_flag ??
                    0.5);

              console.log(userGuess);
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
                        {userGuess.countries_complete_view.name}
                      </Link>
                    </div>
                  </Cell>
                  <Cell>
                    <DifficultyIndicator value={successRate * 100} />
                  </Cell>
                  <Cell>
                    <div className='font-extralight'>
                      <ReactCountryFlag
                        countryCode={
                          userGuess.countries_complete_view.iso2 as string
                        }
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
                      {userGuess.countries_complete_view.capital}
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
