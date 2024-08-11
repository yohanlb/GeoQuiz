import React from 'react';
import { getCountryOfTheDayQuestion } from '@/src/queries/countryOfTheDay';
import DailyCountryQuiz from '@components/daily/DailyCountryQuiz';

async function Daily() {
  const dailyQuestion = await getCountryOfTheDayQuestion();

  return <DailyCountryQuiz dailyQuestion={dailyQuestion} />;
}

export default Daily;
