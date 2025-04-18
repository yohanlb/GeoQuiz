import { CONTINENTS, DISABLED_COUNTRIES } from '@lib/data/consts';
import { Continent, DailyQuestion } from '@lib/types/daily-mode';
import { getCountriesByIds, getCountryById } from '@server/db/countries-rest';
import { shuffleArray } from '@utils/utils';
import { getCountryOfTheDay } from '../db/daily-cotd-rest';

export async function generateCountryOfTheDayQuestion(
  day: number = 0,
): Promise<DailyQuestion> {
  const cotd = await getCountryOfTheDay(day);
  const countryData = await getCountryById(cotd.countryId);
  const filteredClosestCountriesIds =
    countryData.closest_country_ids?.filter(
      (countryId: number) => !DISABLED_COUNTRIES.includes(countryId),
    ) || [];

  const closestCountries = await getCountriesByIds(filteredClosestCountriesIds);

  const filteredClosestCountries = closestCountries.filter((c) => c !== null);

  const flagOptions = shuffleArray([
    countryData.iso2,
    ...filteredClosestCountries.map((c) => c.iso2),
  ]);

  const capitalOptions = shuffleArray([
    countryData.capital,
    ...filteredClosestCountries.map((c) => c.capital),
  ]);

  const shapeOptions = shuffleArray([
    countryData.iso2,
    ...filteredClosestCountries.map((c) => c.iso2),
  ]);

  // Create and return the daily question
  const dailyQuestion: DailyQuestion = {
    questionId: cotd.id,
    countryId: countryData.id,
    countryName: countryData.name,
    capitalOptions: capitalOptions,
    capitalCorrectIndex: capitalOptions.indexOf(countryData.capital),
    regionOptions: Array.from(CONTINENTS),
    regionCorrectIndex: CONTINENTS.indexOf(countryData.region as Continent),
    flagOptions: flagOptions,
    flagCorrectIndex: flagOptions.indexOf(countryData.iso2),
    shapeOptions: shapeOptions,
    shapeCorrectIndex: shapeOptions.indexOf(countryData.iso2),
  };

  return dailyQuestion;
}
