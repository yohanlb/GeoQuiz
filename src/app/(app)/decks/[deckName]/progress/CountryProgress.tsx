import React from 'react';
import ReactCountryFlag from 'react-country-flag';
import { Database } from '@lib/types/database.types';
import DifficultyIndex from '@components/_commons/DifficultyIndex';
import GuessesList from '@components/_commons/GuessesList';
import { Button } from '@components/ui/button';
import { Card } from '@components/ui/card';

type UserStatsRow = Database['public']['Tables']['user_guesses_history']['Row'];

type Props = {
  userGuesses: UserStatsRow[] | null;
  country: CountryCompleteViewRecord;
  questionTypeId: number;
};

const CountryProgress = ({
  userGuesses = [],
  country,
  questionTypeId,
}: Props) => {
  const guessesForQuestionType: UserStatsRow | null =
    userGuesses?.find(
      (guess) =>
        guess.country_id === country.id &&
        guess.question_type_id === questionTypeId,
    ) || null;
  const userResults = guessesForQuestionType?.guess_results ?? [];

  return (
    <Card
      key={country.id}
      className='group flex h-8 items-center justify-between p-2 transition-all duration-300 ease-in-out hover:dark:bg-gray-900'
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
            {country.name}{' '}
            <span className='hidden text-xs text-gray-500 md:inline'>
              {country.capital}
            </span>
          </h3>
        </div>
      </div>
      <div className='flex items-center space-x-2'>
        <GuessesList countryHistory={userResults} />
        {/* TODO: change difficulty based on the question type */}
        <DifficultyIndex
          digit={Math.round(country.success_rate_flag ?? 0 * 10)}
        />
        <Button
          variant='outline'
          size='sm'
          className='p-1 text-xs group-hover:bg-white group-hover:text-gray-800'
        >
          View
        </Button>
      </div>
    </Card>
  );
};

export default CountryProgress;
