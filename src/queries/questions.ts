const baseUrl = process.env.NEXT_PUBLIC_GEOQUIZ_API_BASE_URL as string;

export async function getQuestionsFromDeckId(
  deckId: Deck['id'],
  amountOfQuestions = 10,
  questionType: QuestionType, // QT required by BE to update deck play count
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
  const data: Question[] = await response.json();
  return data;
}
