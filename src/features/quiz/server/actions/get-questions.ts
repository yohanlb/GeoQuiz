'use server';

import { generateQuestionsFromCountryIds } from '@features/quiz/server/services/questions';

export async function getQuestionsAction() {
  const countriesStats = await generateQuestionsFromCountryIds([1, 2, 3], 1);
  console.log(countriesStats);
  return countriesStats;
}
