'use client';

import React from 'react';
import { useDeckHistory } from '@/src/stores/deckHistoryStore';
import DeckItem from '@components/_commons/DeckItem';
import SectionTitle from '@components/_commons/SectionTitle';

type Props = { decks: Deck[] };

const DeckHistory = ({ decks }: Props) => {
  const getLastPlayedDeckIds = useDeckHistory(
    (state) => state.getLastPlayedDeckIds,
  );

  // Trick to avoid client-side hydration error
  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }

  const idsLastDeckPlayed = getLastPlayedDeckIds();
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
      <SectionTitle text='Last Played Decks' variant='h3' />
      {lastPlayedDecks.length > 0 ? (
        <ul className='flex flex-col space-y-1'>
          {lastPlayedDecks.map((deck) => (
            <DeckItem key={deck.id} deck={deck} />
          ))}
        </ul>
      ) : (
        <p className='text-sm font-thin'>No deck played recently.</p>
      )}
    </div>
  );
};

export default DeckHistory;
