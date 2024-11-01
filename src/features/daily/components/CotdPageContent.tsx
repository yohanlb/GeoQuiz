'use client';

import React from 'react';
import DailyCountryQuiz from '@features/daily/components/DailyCountryQuiz';
import { useCountryOfTheDay } from '@features/daily/hooks/useCountryOfTheDay';
import useFakeLoading from '@hooks/useFakeLoading';
import QuizLoading from '@components/global/QuizLoading';

function CotdPageContent() {
  const { data: dailyQuestion, isLoading, error } = useCountryOfTheDay(0);

  const isFakeLoading = useFakeLoading(3000, isLoading);
  if (isLoading || isFakeLoading) {
    return <QuizLoading />;
  } else if (error) {
    console.error(error);
    return null;
  } else if (!dailyQuestion) {
    return <div>No daily question found.</div>;
  } else {
    return <DailyCountryQuiz dailyQuestion={dailyQuestion} />;
  }
}

export default CotdPageContent;
