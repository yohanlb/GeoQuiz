'use client';

import React from 'react';
import DailyCountryQuiz from '@features/daily/components/DailyCountryQuiz';
import { useCountryOfTheDay } from '@hooks/useCountryOfTheDay';
import { motion } from 'framer-motion';
import LoadingSpinner from '@components/_commons/LoadingSpinner';

const TEST_DAYS = [...Array(11).keys()].map((num) => num - 5);

function CountryOfTheDayTestPage() {
  const [day, setDay] = React.useState(0);
  const { data: dailyQuestion, isLoading, error } = useCountryOfTheDay(day);

  return (
    <div className='mx-auto flex max-w-md flex-col gap-6 px-4 py-2 md:px-0'>
      <header>
        <h1 className='font text-left text-xl'>Country of the Day Test page</h1>
      </header>
      <div className='flex gap-2'>
        {TEST_DAYS.map((testDay) => (
          <button
            key={testDay}
            onClick={() => setDay(testDay)}
            className={`${testDay === day ? 'bg-gray-200' : ''} w-8 rounded-lg p-2 text-center`}
          >
            {testDay}
          </button>
        ))}
      </div>
      {error && <div>Error: {error.message}</div>}
      {isLoading || !dailyQuestion ? (
        <div className='mt-8 flex h-full w-full flex-col items-center justify-center gap-8'>
          <motion.p
            className='text-md'
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            Preparing questions...
          </motion.p>
          <LoadingSpinner />
        </div>
      ) : (
        <DailyCountryQuiz
          dailyQuestion={dailyQuestion}
          showRemoveHistoryButton
        />
      )}
    </div>
  );
}

export default CountryOfTheDayTestPage;
