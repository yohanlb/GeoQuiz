'use client';

import React from 'react';
import { useCountryOfTheDay } from '@/src/hooks/useCountryOfTheDay';
import { motion } from 'framer-motion';
import LoadingSpinner from '@components/_commons/LoadingSpinner';
import DailyCountryQuiz from '@components/daily/DailyCountryQuiz';

function CountryOfTheDayPage() {
  const { data: dailyQuestion, isLoading, error } = useCountryOfTheDay();

  return (
    <div className='mx-auto flex max-w-md flex-col gap-6 px-4 py-2 md:px-0'>
      <header>
        <h1 className='font text-center text-xl'>Country of the Day</h1>
      </header>
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
        <DailyCountryQuiz dailyQuestion={dailyQuestion} />
      )}
    </div>
  );
}

export default CountryOfTheDayPage;
