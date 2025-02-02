'use server';

import { generateQuestionsFromCountryIds } from '@features/quiz/server/services/questions';

export async function getQuestionsAction(
  deck: DeckRecord,
  amountOfQuestions = 10,
) {
  const countriesStats = await generateQuestionsFromCountryIds(
    deck.countryIds,
    amountOfQuestions,
  );
  return countriesStats;
}
