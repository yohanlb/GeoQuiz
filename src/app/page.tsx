import React from 'react';
import { getGameDecksFromJson } from '../queries/gameDecks';
import GameDeckGrid from '@components/home/GameDeckGrid';

async function Home() {
  const data = await getGameDecksFromJson();

  return (
    <>
      <GameDeckGrid gameDecks={data} />
    </>
  );
}

export default Home;
