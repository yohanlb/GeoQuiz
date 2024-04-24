const baseUrl = process.env.NEXT_PUBLIC_GEOQUIZ_API_BASE_URL as string;

// TODO: Remove. Deprecated cause now the fetch is done via Post, and Vercel did not work with it,
// so i decided to do the fetch FE
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
