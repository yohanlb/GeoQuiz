import React from 'react';
import { getGameDecks, getGameDecksFromJson } from '../queries/gameDecks';
import GameDeckGrid from '@components/home/GameDeckGrid';

async function Home() {
  const fetchedGameDecks = await getGameDecks();
  const data = await getGameDecksFromJson();

  return (
    <>
      <GameDeckGrid gameDecks={fetchedGameDecks} />
      <span>{data[0].name}</span>
    </>
  );
}

export default Home;
