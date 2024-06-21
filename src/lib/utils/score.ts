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

export type CountryScoreStatus =
  | 'notEnoughResults'
  | 'perfect'
  | 'good'
  | 'bad'
  | 'veryBad';

export const getCountryScoreStatusLabel = (
  status: CountryScoreStatus,
): string => {
  switch (status) {
    case 'notEnoughResults':
      return 'Keep playing';
    case 'perfect':
      return 'Perfect!';
    case 'good':
      return 'Good';
    case 'bad':
      return 'Need practice';
    case 'veryBad':
      return 'Not known';
  }
};

export const getCountryScoreStatus = (
  results: CountryScore[],
): CountryScoreStatus => {
  const baseScoreOnLastNAttempts = 3;
  if (results.length <= 0) {
    return 'notEnoughResults';
  }
  results.slice(0, baseScoreOnLastNAttempts);
  const rightAnswers = results.filter((result) => result.scores).length;
  const wrongAnswers = results.filter((result) => !result.scores).length;

  if (rightAnswers >= baseScoreOnLastNAttempts) {
    return 'perfect';
  }

  if (wrongAnswers >= baseScoreOnLastNAttempts) {
    return 'veryBad';
  }

  if (rightAnswers > wrongAnswers) {
    return 'good';
  }
  if (rightAnswers < wrongAnswers) {
    return 'bad';
  }
  // if 1 bad, 1 wrong, return notEnoughResults
  return 'notEnoughResults';
};
