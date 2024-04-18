'use server';
const baseUrl = process.env.GEOQUIZ_API_BASE_URL as string;

export async function postCountryStats(
  countryId: number,
  guessedRight: boolean,
) {
  try {
    const response = await fetch(`${baseUrl}/countries/stats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        countryId: countryId,
        guessedRight: guessedRight,
      }),
    });
    if (!response.ok) {
      console.error('Network response was not ok:', response.statusText);
      return null;
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error:', error);
  }
}
