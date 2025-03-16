'use server';

import { generateQuestionsFromCountryIds } from '@features/quiz/server/services/questions';
import { formatServerActionName } from '@lib/logging/logging-server-actions';
import { log } from '@logtail/next';

export async function getQuestionsAction(
  deck: DeckRecord,
  amountOfQuestions = 10,
) {
  const actionName = formatServerActionName('getQuestions', deck.name);

  log.info(`${actionName} - Started`, {
    deckId: deck.id,
    deckName: deck.name,
    amountOfQuestions,
  });

  try {
    const countriesStats = await generateQuestionsFromCountryIds(
      deck.countryIds,
      amountOfQuestions,
    );

    log.info(`${actionName} - Completed`, {
      deckId: deck.id,
      deckName: deck.name,
      amountOfQuestions,
      success: true,
    });

    return countriesStats;
  } catch (error) {
    log.error(`${actionName} - Failed`, {
      deckId: deck.id,
      deckName: deck.name,
      amountOfQuestions,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    throw error;
  }
}
