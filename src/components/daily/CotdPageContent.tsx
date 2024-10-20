'use client';

import React from 'react';
import { useCountryOfTheDay } from '@hooks/useCountryOfTheDay';
import { motion } from 'framer-motion';
import LoadingSpinner from '@components/_commons/LoadingSpinner';
import DailyCountryQuiz from '@components/daily/DailyCountryQuiz';

function CotdPageContent() {
  const { data: dailyQuestion, isLoading, error } = useCountryOfTheDay(0);

  return (
    <div>
      {' '}
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

export default CotdPageContent;
