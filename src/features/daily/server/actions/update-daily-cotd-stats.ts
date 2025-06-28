'use server';

import {
  getCountryOfTheDay,
  updateDailyCOTD,
} from '@features/daily/server/db/daily-cotd';

interface DailyCOTDCompletionData {
  questionId: number;
  rightAnswers: number;
  wrongAnswers: number;
}

export async function updateDailyCOTDStats(
  completionData: DailyCOTDCompletionData,
) {
  // Skip stats collection in non-production environments
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  try {
    // Get current COTD stats for validation and calculation
    const currentCOTD = await getCountryOfTheDay(0);

    // Validate that the questionId matches the current COTD
    if (currentCOTD.id !== completionData.questionId) {
      console.error('Question ID mismatch with current COTD');
      return null;
    }

    // Calculate new values
    const newTimesPlayed = currentCOTD.times_played + 1;
    const newTimesCompleted = currentCOTD.times_completed + 1;
    const newRightAnswers =
      currentCOTD.right_answers + completionData.rightAnswers;
    const newWrongAnswers =
      currentCOTD.wrong_answers + completionData.wrongAnswers;
    const newAverageScore = newRightAnswers / newTimesCompleted;

    // Delegate to DB function for the actual database operation
    await updateDailyCOTD(
      completionData.questionId,
      newTimesPlayed,
      newTimesCompleted,
      newRightAnswers,
      newWrongAnswers,
      newAverageScore,
    );

    return { success: true };
  } catch (error) {
    console.error('Error updating COTD stats:', error);
    return null;
  }
}
