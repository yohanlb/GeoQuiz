const ONE_HOUR = 60 * 60;
const baseUrl = process.env.GEOQUIZ_API_BASE_URL as string;

export async function getGameDecks() {
  const response = await fetch(`${baseUrl}/gameDecks`, {
    next: { revalidate: ONE_HOUR },
  });
  if (!response.ok) {
    throw new Error("Couldn't fetch game decks.");
  }
  const data: GameDeck[] = await response.json();
  return data;
}

export async function getGameDeckByName(name: string) {
  const response = await fetch(`${baseUrl}/gameDecks/${name}`, {
    next: { revalidate: ONE_HOUR },
  });
  if (!response.ok) {
    throw new Error('Game deck not found');
  }
  const data: GameDeck = await response.json();
  return data;
}
