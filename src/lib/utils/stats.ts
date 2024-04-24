export function calculateAverageScoreOfDeck(deckStats: CountryStatsResponse) {
  const sum = deckStats.reduce((sum, countryStats) => {
    const ratio = countryStats.guessed_right / countryStats.guessed;
    return sum + ratio;
  }, 0);
  const averagePercent = Math.round((sum / deckStats.length) * 100);
  return averagePercent;
}
