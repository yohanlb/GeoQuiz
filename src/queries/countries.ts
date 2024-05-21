const ONE_HOUR = 60 * 60;
const baseUrl = process.env.NEXT_PUBLIC_GEOQUIZ_API_BASE_URL as string;

export async function getCountryByCode(countryCode: string) {
  const response = await fetch(`${baseUrl}/countries/iso3/${countryCode}`, {
    next: { revalidate: ONE_HOUR * 24 },
  });
  if (!response.ok) {
    throw new Error('Country not found');
  }

  const data: CountryData = await response.json();

  return data;
}

async function fetchCountries(): Promise<CountryData[]> {
  const response = await fetch(`${baseUrl}/countries/`, {
    next: { revalidate: ONE_HOUR * 24 },
  });
  if (!response.ok) {
    throw new Error('Countries not found');
  }
  const { data }: { data: CountryData[] } = await response.json();
  return data;
}

export async function getAllCountries(): Promise<CountryData[]> {
  return await fetchCountries();
}

export async function getAllCountriesGrouped(): Promise<{
  [key: string]: CountryData[];
}> {
  const allCountries = await fetchCountries();

  const groupedCountries = allCountries.reduce(
    (acc: { [key: string]: CountryData[] }, country) => {
      const subregion = country.subregion;
      if (!acc[subregion]) {
        acc[subregion] = [];
      }
      acc[subregion].push(country);
      return acc;
    },
    {},
  );

  return groupedCountries;
}
