const baseUrl = process.env.GEOQUIZ_API_BASE_URL as string;

export async function getQuestions(gameDeck: string, numberOfQuestions = 10) {
  const response = await fetch(
    `${baseUrl}/questions/${gameDeck}?length=${numberOfQuestions}`,
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
