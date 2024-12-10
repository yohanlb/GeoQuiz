const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL + '/rest/v1';
const ONE_HOUR = 3600;
export async function getCountryById(countryId: CountryRecord['id']) {
  const url = `${baseUrl}/countries?id=eq.${countryId}&select=*`;

  const res: Response = await fetch(url, {
    headers: {
      apiKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      'Content-Type': 'application/json',
    },
    next: { revalidate: ONE_HOUR },
  });

  if (!res.ok) {
    console.error('Error fetching country by id:', res.statusText);
    throw new Error('Failed to fetch country by id');
  }

  const data = await res.json();

  return (data[0] as CountryCompleteViewRecord) || null;
}

export async function getCountriesByIds(countryIds: CountryRecord['id'][]) {
  if (!Array.isArray(countryIds) || countryIds.length === 0) {
    console.error('No country ids provided');
    return [];
  }

  const idsString = countryIds.join(',');
  const encodedIds = encodeURIComponent(`(${idsString})`);

  const url = `${baseUrl}/countries?id=in.${encodedIds}&select=*`;

  const res = await fetch(url, {
    headers: {
      apiKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      'Content-Type': 'application/json',
    },
    next: { revalidate: ONE_HOUR },
  });

  if (!res.ok) {
    console.error('Error fetching countries by ids:', res.statusText);
    throw new Error('Failed to fetch countries by ids');
  }

  const data = await res.json();

  return data as CountryCompleteViewRecord[];
}

export async function getAllCountries() {
  const res = await fetch(`${baseUrl}/countries?select=*`, {
    headers: {
      apiKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      'Content-Type': 'application/json',
    },
    next: { revalidate: ONE_HOUR }, // 1 hour
  });

  if (!res.ok) {
    console.error('Error fetching countries:', res.statusText);
    throw new Error('Failed to fetch countries');
  }

  const data = await res.json();
  return data as CountryRecord[];
}
