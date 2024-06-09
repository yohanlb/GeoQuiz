'use server';

import axios, { AxiosResponse } from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_GEOQUIZ_API_BASE_URL as string;

type UpdateCountryStatsResponse = {
  country_id: CountryData['id'];
  new_guessed: 18;
  new_guessed_right: 10;
};
export async function postCountryStats(
  countryId: number,
  guessedRight: boolean,
  questionType: QuestionType,
) {
  try {
    const response: AxiosResponse<UpdateCountryStatsResponse> =
      await axios.post(
        `${baseUrl}/countries/stats`,
        {
          countryId: countryId,
          guessedRight: guessedRight,
          questionType,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error:', error.response?.status, error.response?.data);
    } else {
      console.error('Error:', error);
    }
    return null;
  }
}
