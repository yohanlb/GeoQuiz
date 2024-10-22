const ONE_HOUR = 60 * 60;
const baseUrl = process.env.NEXT_PUBLIC_GEOQUIZ_API_BASE_URL as string;

export async function fetchCountries(): Promise<CountryCompleteViewRecord[]> {
  const response = await fetch(`${baseUrl}countries/`, {
    next: { revalidate: ONE_HOUR * 12 },
  });
  if (!response.ok) {
    throw new Error('Countries not found');
  }

  const { data }: { data: CountryCompleteViewRecord[] } = await response.json();
  return data;
}

export async function getAllCountriesGrouped(): Promise<GroupedCountries> {
  const allCountries = await fetchCountries();
  const groupedCountries = allCountries.reduce(
    (
      acc: {
        [key: string]: { [subregion: string]: CountryCompleteViewRecord[] };
      },
      country,
    ) => {
      const { region, subregion } = country;

      if (!acc[region]) {
        acc[region] = {};
      }

      if (!acc[region][subregion]) {
        acc[region][subregion] = [];
      }

      acc[region][subregion].push(country);

      return acc;
    },
    {},
  );

  // Sort regions and subregions alphabetically
  const sortedGroupedCountries = Object.keys(groupedCountries)
    .sort((a, b) => a.localeCompare(b))
    .reduce(
      (
        acc: {
          [key: string]: { [subregion: string]: CountryCompleteViewRecord[] };
        },
        region,
      ) => {
        const sortedSubregions = Object.keys(groupedCountries[region])
          .sort((a, b) => a.localeCompare(b))
          .reduce(
            (
              subAcc: { [subregion: string]: CountryCompleteViewRecord[] },
              subregion,
            ) => {
              subAcc[subregion] = groupedCountries[region][subregion].sort(
                (a, b) => a.name.localeCompare(b.name),
              );
              return subAcc;
            },
            {},
          );

        acc[region] = sortedSubregions;
        return acc;
      },
      {},
    );

  return sortedGroupedCountries;
}
