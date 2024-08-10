import { DailyQuestion } from '@lib/types/daily';

const ONE_HOUR = 60 * 60;
const baseUrl = process.env.NEXT_PUBLIC_GEOQUIZ_API_BASE_URL as string;

export async function getCountryOfTheDayQuestion() {
  const response = await fetch(`${baseUrl}/daily/cotd`, {
    next: { revalidate: ONE_HOUR },
  });
  if (!response.ok) {
    throw new Error("Couldn't fetch daily question.");
  }

  const data = (await response.json()) as DailyQuestion;

  return data;
}
