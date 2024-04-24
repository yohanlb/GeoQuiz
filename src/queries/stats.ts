const baseUrl = process.env.NEXT_PUBLIC_GEOQUIZ_API_BASE_URL as string;
const ONE_HOUR = 60 * 60;

export async function getStatsFromCountryIds(countryIds: CountryData['id'][]) {
  let query = '';
  if (countryIds.length > 0) {
    query = '?countryIDs=' + countryIds.join(',');
  }
  const response = await fetch(`${baseUrl}/countries/stats${query}`, {
    next: { revalidate: ONE_HOUR },
  });
  if (!response.ok) {
    throw new Error("Couldn't fetch stats.");
  }

  const stats: CountryStatsResponse = await response.json();

  return stats;
}
