const ONE_HOUR = 60 * 60;
const baseUrl = process.env.GEOQUIZ_API_BASE_URL as string;

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

export async function getAllCountries() {
  const response = await fetch(`${baseUrl}/countries/`, {
    next: { revalidate: ONE_HOUR * 24 },
  });
  if (!response.ok) {
    throw new Error('Countries not found');
  }

  const { data: allCountries }: { data: CountryData[] } = await response.json();

  //   const groupedCountries = allCountries.reduce((acc: any, country) => {
  //     const subregion = country.subregion;
  //     if (!acc[subregion]) {
  //       acc[subregion] = [];
  //     }
  //     acc[subregion].push(country);
  //     return acc;
  //   }, {});

  return allCountries;
}
