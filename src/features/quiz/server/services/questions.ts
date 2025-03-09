import { getAllCountries } from '@/src/shared/server/db/countries-rest';
import { DISABLED_COUNTRIES } from '@lib/data/consts';
import { getCountriesStatsByCountryIds } from '@server/db/countries-stats-rest';
import { shuffleArray } from '@utils/utils';

function createEmptyCountryStats(countryId: number): CountryStatsRecord {
  return {
    country_id: countryId,
    capital_guessed_count: 0,
    capital_guessed_right: 0,
    flag_guessed_count: 0,
    flag_guessed_right: 0,
    created_at: null,
    updated_at: null,
  };
}

function prepareSingleQuestion(
  countryData: CountryRecord,
  countryStats: CountryStatsRecord,
  allCountries: CountryRecord[],
  questionTypeId: QuestionTypeRecord['id'],
) {
  const answerOptions = allCountries
    .filter(
      (country) =>
        countryData.closest_country_ids?.includes(country.id) &&
        !DISABLED_COUNTRIES.includes(country.id),
    )
    .slice(0, 8); // Keep the 8 closest countries
  const shuffledAnswerOptions = shuffleArray(answerOptions);
  const finalAnswerOptions = shuffledAnswerOptions.slice(0, 3); // keep 3 wrong options
  finalAnswerOptions.push(countryData); // add correct answer to the end
  const shuffledFinalAnswerOptions = shuffleArray(finalAnswerOptions); // shuffle again
  const capitalOptions = shuffledFinalAnswerOptions.map(
    (country) => country.capital,
  );

  const question: Question = {
    questionTypeId: questionTypeId,
    countryData: countryData,
    optionsCapitals: capitalOptions,
    optionsIso2: finalAnswerOptions.map((country) => country.iso2),
    answerCapital: countryData.capital,
    answerIso2: countryData.iso2,
    countryStats: countryStats,
  };
  return question;
}

export async function generateQuestionsFromCountryIds(
  countryIds: number[],
  questionTypeId: QuestionTypeRecord['id'],
  amountOfQuestions: number = 10,
): Promise<Question[]> {
  const allCountries = await getAllCountries();
  const selectedCountriesStats =
    await getCountriesStatsByCountryIds(countryIds);

  let deck = [];
  if (!countryIds) {
    deck = allCountries;
  } else {
    deck = allCountries.filter((country) => countryIds.includes(country.id));
  }
  if (deck.length < 1) {
    return [];
  }
  const shuffledDeck = shuffleArray(deck);

  const finalCountrySet = shuffledDeck.slice(0, amountOfQuestions);
  const questions = finalCountrySet.map((country) =>
    prepareSingleQuestion(
      country,
      selectedCountriesStats.find((stats) => stats.country_id === country.id) ??
        createEmptyCountryStats(country.id),
      allCountries,
      questionTypeId,
    ),
  );
  return Promise.all(questions);
}
