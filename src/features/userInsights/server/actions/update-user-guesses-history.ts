'use server';

import { getAuthenticatedUser } from '@/src/server/db/auth/get-authenticated-user';
import {
  fetchUserGuessesHistory,
  upsertUserGuessesHistory,
} from '@features/userInsights/server/db/user-guesses-history';

export async function updateUserGuessesHistory(
  countryId: number,
  questionTypeId: number,
  newGuess: boolean,
) {
  try {
    const user = await getAuthenticatedUser();

    if (!user) {
      return {
        success: true,
        data: null,
        message: 'No authenticated user, user guesses history not updated',
      };
    }
    const existingData = await fetchUserGuessesHistory(
      user.id,
      countryId,
      questionTypeId,
    );

    let newGuessResults: boolean[];
    if (existingData?.guess_results) {
      newGuessResults = [newGuess, ...existingData.guess_results.slice(0, 4)];
    } else {
      newGuessResults = [newGuess];
    }

    const data = await upsertUserGuessesHistory(
      user.id,
      countryId,
      questionTypeId,
      newGuessResults,
    );

    return { success: true, data };
  } catch (error) {
    console.error('Unexpected error updating user guesses history:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}
