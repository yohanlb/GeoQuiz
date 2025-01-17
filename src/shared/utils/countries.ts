export function groupCountriesByRegionAndSubregion(
  countries: CountryRecord[],
): GroupedCountries {
  const grouped = countries.reduce(
    (
      acc: {
        [key: string]: { [subregion: string]: CountryRecord[] };
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
  const sortedGrouped = Object.keys(grouped)
    .sort((a, b) => a.localeCompare(b))
    .reduce(
      (
        acc: {
          [key: string]: { [subregion: string]: CountryRecord[] };
        },
        region,
      ) => {
        const sortedSubregions = Object.keys(grouped[region])
          .sort((a, b) => a.localeCompare(b))
          .reduce(
            (subAcc: { [subregion: string]: CountryRecord[] }, subregion) => {
              subAcc[subregion] = grouped[region][subregion].toSorted((a, b) =>
                a.name.localeCompare(b.name),
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

  return sortedGrouped;
}
