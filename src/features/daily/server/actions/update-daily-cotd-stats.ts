'use server';

import {
  getCountryOfTheDay,
  updateDailyCOTD,
} from '@features/daily/server/db/daily-cotd';
import { formatServerActionName } from '@lib/logging/logging-server-actions';
import { log } from '@logtail/next';

interface DailyCOTDCompletionData {
  questionId: number;
  rightAnswers: number;
  wrongAnswers: number;
}

export async function updateDailyCOTDStats(
  completionData: DailyCOTDCompletionData,
) {
  const actionName = formatServerActionName('updateDailyCOTDStats');

  log.info(`${actionName} - Started`, {
    questionId: completionData.questionId,
    rightAnswers: completionData.rightAnswers,
    wrongAnswers: completionData.wrongAnswers,
    environment: process.env.NODE_ENV,
  });

  // Skip stats collection in non-production environments
  if (process.env.NODE_ENV !== 'production') {
    log.info(`${actionName} - Skipped (non-production environment)`, {
      questionId: completionData.questionId,
      environment: process.env.NODE_ENV,
    });
    return null;
  }

  try {
    //temp
    log.info(`${actionName} - About to get current COTD data`, {
      questionId: completionData.questionId,
    });

    // Get current COTD stats for validation and calculation
    const currentCOTD = await getCountryOfTheDay(0);

    //temp
    log.info(`${actionName} - Retrieved current COTD data`, {
      questionId: completionData.questionId,
      currentCOTDId: currentCOTD.id,
      currentCOTDDate: currentCOTD.date,
      currentTimesPlayed: currentCOTD.times_played,
      currentTimesCompleted: currentCOTD.times_completed,
      currentRightAnswers: currentCOTD.right_answers,
      currentWrongAnswers: currentCOTD.wrong_answers,
    });

    // Validate that the questionId matches the current COTD
    if (currentCOTD.id !== completionData.questionId) {
      log.error(`${actionName} - Question ID mismatch`, {
        questionId: completionData.questionId,
        currentCOTDId: currentCOTD.id,
        currentCOTDDate: currentCOTD.date,
      });
      return null;
    }

    //temp
    log.info(`${actionName} - Validation passed, calculating new stats`, {
      questionId: completionData.questionId,
    });

    // Calculate new values
    const newTimesPlayed = currentCOTD.times_played + 1;
    const newTimesCompleted = currentCOTD.times_completed + 1;
    const newRightAnswers =
      currentCOTD.right_answers + completionData.rightAnswers;
    const newWrongAnswers =
      currentCOTD.wrong_answers + completionData.wrongAnswers;
    const newAverageScore =
      Math.round((newRightAnswers / newTimesCompleted) * 100) / 100;

    //temp
    log.info(`${actionName} - Calculated new stats`, {
      questionId: completionData.questionId,
      newTimesPlayed,
      newTimesCompleted,
      newRightAnswers,
      newWrongAnswers,
      newAverageScore,
    });

    //temp
    log.info(`${actionName} - About to call updateDailyCOTD`, {
      questionId: completionData.questionId,
    });

    // Delegate to DB function for the actual database operation
    await updateDailyCOTD(
      completionData.questionId,
      newTimesPlayed,
      newTimesCompleted,
      newRightAnswers,
      newWrongAnswers,
      newAverageScore,
    );

    //temp
    log.info(`${actionName} - Database update completed`, {
      questionId: completionData.questionId,
    });

    log.info(`${actionName} - Completed successfully`, {
      questionId: completionData.questionId,
      newTimesPlayed,
      newTimesCompleted,
      newRightAnswers,
      newWrongAnswers,
      newAverageScore: newAverageScore,
      success: true,
    });

    return { success: true };
  } catch (error) {
    log.error(`${actionName} - Failed`, {
      questionId: completionData.questionId,
      rightAnswers: completionData.rightAnswers,
      wrongAnswers: completionData.wrongAnswers,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });
    return null;
  }
}
