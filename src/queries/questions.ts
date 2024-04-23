import axios from 'axios';
const baseUrl = process.env.GEOQUIZ_API_BASE_URL as string;

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

export async function getQuestionsFromCountryIds(
  countryIds: CountryData['id'][],
  amountOfQuestions = 10,
) {
  try {
    const response = await axios.post(
      `${baseUrl}/questions`,
      {
        countryIds: countryIds,
        amountOfQuestions,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data as Question[];
  } catch (error) {
    console.error(error);
    throw new Error("Couldn't fetch questions " + error);
  }
}
