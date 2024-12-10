const baseUrl = process.env.NEXT_PUBLIC_GEOQUIZ_API_BASE_URL as string;

export async function getQuestionsFromDeckId(
  deckId: DeckRecord['id'],
  questionType: QuestionType, // QT required by BE to update deck play count
  amountOfQuestions = 10,
) {
  const response = await fetch(
    `${baseUrl}questions/?length=${amountOfQuestions}&deckId=${deckId}&questionType=${questionType}`,
    {
      cache: 'no-store',
    },
  );
  if (!response.ok) {
    throw new Error("Couldn't fetch questions");
  }
  const data: Question & { countryData: CountryCompleteViewRecord }[] =
    await response.json();

  // Manually create a countryStats object for each question.
  // TODO: Remove this once the API doesnt use country_complete_view anymore
  const questions = data.map((question) => ({
    ...question,
    country: question.countryData,
    countryStats: {
      country_id: question.countryData.id,
      created_at: question.countryData.updated_at,
      updated_at: question.countryData.updated_at,
      capital_guessed_count: question.countryData.capital_guessed_count,
      capital_guessed_right: question.countryData.capital_guessed_right,
      flag_guessed_count: question.countryData.flag_guessed_count,
      flag_guessed_right: question.countryData.flag_guessed_right,
    },
  }));

  return questions;
}
