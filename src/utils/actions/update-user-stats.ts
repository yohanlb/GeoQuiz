'use server';

import { getAuthenticatedUser } from '@utils/db/auth/get-authenticated-user';
import { fetchUserStats, upsertUserStats } from '@utils/db/user-stats';

export async function updateUserStats(
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
        message: 'No authenticated user, stats not updated',
      };
    }
    const existingData = await fetchUserStats(
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

    const data = await upsertUserStats(
      user.id,
      countryId,
      questionTypeId,
      newGuessResults,
    );

    return { success: true, data };
  } catch (error) {
    console.error('Unexpected error updating user stats:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}
