const ONE_HOUR = 60 * 60;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export async function getDeckByName(deckName: string) {
  const response = await fetch(
    `${supabaseUrl}/rest/v1/decks?name=eq.${deckName}&select=*,decks_stats(*)`,
    {
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
      next: { revalidate: ONE_HOUR },
    },
  );

  if (!response.ok) {
    throw new Error(`Couldn't fetch game deck ${deckName}.`, {
      cause: response.status,
    });
  }

  const data: DeckWithStatsRecord[] = await response.json();
  if (data.length === 0) {
    throw new Error(`Deck ${deckName} not found.`);
  }
  return data[0];
}

export async function getDecks() {
  const response = await fetch(
    `${supabaseUrl}/rest/v1/decks?select=*,decks_stats(*)`,
    {
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
      next: { revalidate: ONE_HOUR * 24 },
    },
  );

  if (!response.ok) {
    throw new Error(`Couldn't fetch game decks.`);
  }

  const data: DeckWithStatsRecord[] = await response.json();
  return data.filter(
    (deck) => deck.displayPriority === null || deck.displayPriority >= 0,
  );
}

// TODO: let's potentially change this function into a get deck by category function.
export async function getFeaturedDecks() {
  const response = await fetch(
    `${supabaseUrl}/rest/v1/decks?categories=cs.{featured}&select=*,decks_stats(*)`,
    {
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
      next: { revalidate: ONE_HOUR },
    },
  );

  if (!response.ok) {
    throw new Error(`Couldn't fetch featured game decks.`);
  }

  const data: DeckWithStatsRecord[] = await response.json();
  return data.filter(
    (deck) => deck.displayPriority === null || deck.displayPriority >= 0,
  );
}
