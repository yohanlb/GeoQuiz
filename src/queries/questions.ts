const baseUrl = process.env.NEXT_PUBLIC_GEOQUIZ_API_BASE_URL as string;

export async function getQuestions(gameDeck: string, amountOfQuestions = 10) {
  const response = await fetch(
    `${baseUrl}/questions/${gameDeck}?length=${amountOfQuestions}`,
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
