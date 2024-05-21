'use client';
import React from 'react';
import { useDeckScores } from '@/src/hooks/useDeckScores';
import DeckItem from '@components/decks/DeckItem';

type Props = { decks: Deck[] };

const DeckStats = ({ decks }: Props) => {
  const { getLastPlayedDeckIds } = useDeckScores();

  // Trick to avoid client-side hydration error
  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }

  const idsLastDeckPlayed = getLastPlayedDeckIds('capital');
  const lastPlayedDecks = [];
  for (let i = 0; i < idsLastDeckPlayed.length; i++) {
    const deck = decks.find((deck) => deck.id === Number(idsLastDeckPlayed[i]));
    if (!deck) {
      return;
    }
    lastPlayedDecks.push(deck);
  }

  return (
    <div className='space-y-3'>
      <h3>Last Played Decks</h3>
      <ul className='flex flex-col space-y-1'>
        {lastPlayedDecks.map((deck) => (
          <DeckItem key={deck.id} deck={deck} />
        ))}
      </ul>
    </div>
  );
};

export default DeckStats;
