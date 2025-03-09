'use client';

import React from 'react';
import DailyCountryQuiz from '@features/daily/components/DailyCountryQuiz';
import useFakeLoading from '@hooks/useFakeLoading';
import { DailyQuestion } from '@lib/types/daily-mode';
import QuizLoading from '@components/global/QuizLoading';

function CotdPageContent({
  dailyQuestion,
}: Readonly<{ dailyQuestion: DailyQuestion }>) {
  const isLoading = false;
  const isFakeLoading = useFakeLoading(3000, isLoading);
  if (isLoading || isFakeLoading) {
    return <QuizLoading />;
  } else if (!dailyQuestion) {
    return <div>No daily question found.</div>;
  } else {
    return <DailyCountryQuiz dailyQuestion={dailyQuestion} />;
  }
}

export default CotdPageContent;
