const ONE_HOUR = 60 * 60;
const baseUrl = process.env.NEXT_PUBLIC_GEOQUIZ_API_BASE_URL as string;

export async function getDeckByName(deckName: string) {
  const response = await fetch(`${baseUrl}/decks/${deckName}`, {
    next: { revalidate: ONE_HOUR },
  });
  if (!response.ok) {
    throw new Error(`Couldn't fetch game deck ${deckName}.`);
  }
  const data: Deck = await response.json();
  return data;
}

export async function getDecks() {
  const response = await fetch(`${baseUrl}/decks`, {
    next: { revalidate: ONE_HOUR * 24 },
  });
  if (!response.ok) {
    throw new Error(`Couldn't fetch game decks.`);
  }
  const data: Deck[] = await response.json();
  return data;
}
export async function getFeaturedDecks() {
  const response = await fetch(`${baseUrl}/decks/featured`, {
    next: { revalidate: ONE_HOUR },
  });
  if (!response.ok) {
    throw new Error(`Couldn't fetch game decks.`);
  }
  const data: Deck[] = await response.json();
  return data;
}
