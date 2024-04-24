import React from 'react';
import { getDecks } from '../queries/gameDecks';
import GameDeckGrid from '@components/home/GameDeckGrid';

async function Home() {
  const decks = await getDecks();

  return (
    <>
      <GameDeckGrid decks={decks} />
    </>
  );
}

export default Home;
