import { getAllCountriesCompleteView } from '@utils/db/countries';

export const defaultProps = {
  difficultyPercent: 1,
  countries: [
    {
      name: 'France',
      iso2: 'FR',
    },
    {
      name: 'Chile',
      iso2: 'CL',
    },
  ],
};

export const getCountriesForVideo = async () => {
  const allCountries = await getAllCountriesCompleteView();
  const pickedCountries = pickCountries(allCountries);
  return pickedCountries;
};

export function groupCountriesPerSuccessRate(
  countries: CountryCompleteViewRecord[],
) {
  // filter out countries with not enough data
  const filteredCountries = countries.filter(
    (country) => country.capital_guessed_count > 4,
  );

  // Sort the array by success_rate_capital in descending order
  const sortedCountries = [...filteredCountries].sort(
    (a, b) => b.custom_difficulty - a.custom_difficulty,
  );

  // filter out the 100 hardest ones.
  sortedCountries.splice(-100);

  // Create four groups
  const easy = sortedCountries.filter(
    (country) => country.custom_difficulty >= 8, // 7 , 8, 9
  );
  const medium = sortedCountries.filter(
    (country) =>
      country.custom_difficulty < 8 && country.custom_difficulty >= 6, // 5, 6
  );
  const difficult = sortedCountries.filter(
    (country) =>
      country.custom_difficulty < 6 && country.custom_difficulty >= 4, // 4
  );
  const veryHard = sortedCountries.filter(
    (country) =>
      country.custom_difficulty < 4 && country.custom_difficulty >= 3, // 3
  );

  const groups = [easy, medium, difficult, veryHard];
  return groups;
}

export function getRandomElements<T>(array: T[], count: number): T[] {
  const result: T[] = [];
  const taken = new Set<number>();

  while (result.length < count && result.length < array.length) {
    const index = Math.floor(Math.random() * array.length);
    if (!taken.has(index)) {
      result.push(array[index]);
      taken.add(index);
    }
  }

  return result;
}

export function pickCountries(
  countries: CountryCompleteViewRecord[],
): CountryCompleteViewRecord[] {
  const groups = groupCountriesPerSuccessRate(countries);
  const result: CountryCompleteViewRecord[] = [
    ...getRandomElements(groups[0], 3),
    ...getRandomElements(groups[1], 3),
    ...getRandomElements(groups[2], 3),
    ...getRandomElements(groups[3], 1),
  ];

  return result;
}
