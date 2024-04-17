import React from 'react';
import { getGameDecks } from './queries/gameDecks';
import GameDeckGrid from '@components/home/GameDeckGrid';

async function Home() {
  const fetchedGameDecks = await getGameDecks();

  return (
    <>
      <GameDeckGrid gameDecks={fetchedGameDecks} />
    </>
  );
}

export default Home;
