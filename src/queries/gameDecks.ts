import { promises as fs } from 'fs';
import path from 'path';

const ONE_HOUR = 60 * 60;
const baseUrl = process.env.NEXT_PUBLIC_GEOQUIZ_API_BASE_URL as string;

export async function getDeckByName(deckName: string) {
  const response = await fetch(`${baseUrl}/gameDecks/name/${deckName}`, {
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
    next: { revalidate: ONE_HOUR },
  });
  if (!response.ok) {
    throw new Error(`Couldn't fetch game decks.`);
  }
  const data: Deck[] = await response.json();
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

//TODO: delete, Deprecated
export async function getGameDecksFromJson() {
  const file = await fs.readFile(
    path.join(process.cwd(), '/src/lib/data/gameDecks.json'),
    'utf8',
  );
  const data = JSON.parse(file) as GameDeck[];
  const gameDecksToShow = data.filter(
    (gameDeck: GameDeck) =>
      gameDeck.available && gameDeck.visible && gameDeck.countryIds.length > 0,
  );
  return gameDecksToShow;
}

export async function getGameDecksFromJsonByName(
  //TODO: delete, Deprecated
  gameDeckName: GameDeck['name'],
) {
  const file = await fs.readFile(
    path.join(process.cwd(), '/src/lib/data/gameDecks.json'),
    'utf8',
  );
  const data = JSON.parse(file) as GameDeck[];
  const gameDecksToShow = data.filter(
    (gameDeck: GameDeck) =>
      gameDeck.available && gameDeck.visible && gameDeck.countryIds.length > 0,
  );
  const selectedGameDeck = gameDecksToShow.filter(
    (gameDeck) => gameDeck.name === gameDeckName,
  )[0];

  if (!selectedGameDeck) {
    throw new Error('Game deck not found');
  }

  return selectedGameDeck;
}
