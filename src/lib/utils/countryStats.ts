export default function formatCountrySuccessPercentage(countryData:CountryData) {
  if (!countryData.success_rate) {
    return '_';
  }
  return `${Math.round(countryData.success_rate * 100)}%`;
}
