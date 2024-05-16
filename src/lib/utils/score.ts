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
