export function calculateCountrySuccessPercentage(
  countryData: CountryStatsRecord,
) {
  const successRateCapital =
    countryData.capital_guessed_count > 0
      ? (countryData.capital_guessed_right /
          countryData.capital_guessed_count) *
        100
      : 0;

  const successRateFlag =
    countryData.flag_guessed_count > 0
      ? (countryData.flag_guessed_right / countryData.flag_guessed_count) * 100
      : 0;

  return {
    successRateCapital,
    successRateFlag,
  };
}
