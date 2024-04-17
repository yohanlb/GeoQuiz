const baseUrl = process.env.GEOQUIZ_API_BASE_URL as string;

export async function getGameDecks() {
  const response = await fetch(`${baseUrl}/gameModes`);
  const data: GameDeck[] = await response.json();
  return data;
}
