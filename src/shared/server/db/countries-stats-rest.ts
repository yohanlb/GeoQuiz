const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL + '/rest/v1';
const ONE_HOUR = 3600;
export async function getCountryStatsById(
  countryId: CountryStatsRecord['country_id'],
) {
  const url = `${baseUrl}/countries_stats?country_id=eq.${countryId}&select=*`;

  const res: Response = await fetch(url, {
    headers: {
      apiKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      'Content-Type': 'application/json',
    },
    next: { revalidate: ONE_HOUR },
  });

  if (!res.ok) {
    console.error('Error fetching country stats by id:', res.statusText);
    throw new Error('Failed to fetch country stats by id');
  }

  const data = await res.json();

  return (data[0] as CountryStatsRecord) || null;
}

export async function getCountriesStatsByCountryIds(
  countryIds: CountryStatsRecord['country_id'][],
) {
  const url = `${baseUrl}/countries_stats?country_id=in.(${countryIds.join(',')})&select=*`;

  const res: Response = await fetch(url, {
    headers: {
      apiKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    console.error('Error fetching countries stats by ids:', res.statusText);
    throw new Error('Failed to fetch countries stats by ids');
  }

  const data = await res.json();

  return data as CountryStatsRecord[];
}
