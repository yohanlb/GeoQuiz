'use client';

import React from 'react';
import DeckItem from '@/src/shared/components/_commons/DeckItem';
import SectionTitle from '@/src/shared/components/_commons/SectionTitle';
import { useDeckHistory } from '@stores/deck-history-store';
import useGameStore from '@stores/game-store';

type Props = { decks: DeckWithStatsRecord[] };

const DeckHistory = ({ decks }: Props) => {
  const getLastNDecksPlayed = useDeckHistory(
    (state) => state.getLastNDecksPlayed,
  );
  const { questionType } = useGameStore();
  React.useEffect(() => {
    // Force re-render on questionType change
  }, [questionType]);

  const idsLastDeckPlayed = getLastNDecksPlayed(5);
  const lastPlayedDecks = [];
  for (const element of idsLastDeckPlayed) {
    const deck = decks.find((deck) => deck.id === Number(element));
    if (deck) {
      lastPlayedDecks.push(deck);
    }
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
