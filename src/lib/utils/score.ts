// TODO : to be deprecated
export function calculateNewDeckScore(
  userResults: UserResults,
  numberOfQuestions: number,
) {
  const numberOfCorrectAnswers = userResults.reduce(
    (count, result) => count + (result === 'valid' ? 1 : 0),
    0,
  );
  const correctAnswerPercentage =
    Math.round((numberOfCorrectAnswers / numberOfQuestions) * 1000) / 10;
  return correctAnswerPercentage;
}

export function calculateRecallIndex(results: boolean[]) {
  const weight = 1.5; // Weight for the most recent result
  let totalWeight = 0;
  let totalCorrect = 0;

  if (results.length <= 1) {
    // if only one result, consider it wasn't known
    // so it doesn't return an index of 10 on first try
    results.push(false);
  }

  for (let i = 0; i < results.length; i++) {
    const weightFactor = Math.pow(weight, i);
    if (results[i]) {
      totalCorrect += weightFactor;
    }
    totalWeight += weightFactor;
  }

  const memoryIndex = (totalCorrect / totalWeight) * 10;
  return memoryIndex;
}
