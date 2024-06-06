'use client';

import React from 'react';
import { useDeckHistory } from '@/src/stores/deckHistoryStore';
import { isBreakpoint } from '@lib/utils/screen';
import SectionTitle from '@components/_commons/SectionTitle';
import DeckGrid from './DeckGrid';

type Props = {
  decks: Deck[];
};

const UnplayedDecksSection = ({ decks }: Props) => {
  const getAllPlayedDeckIds = useDeckHistory(
    (state) => state.getAllPlayedDeckIds,
  );
  const storedDecksIds = getAllPlayedDeckIds();
  const howManyToDisplay = isBreakpoint('md') ? 3 : 4;

  const unplayedDecks = decks
    .filter((deck) => !storedDecksIds.includes(deck.id))
    .sort(() => Math.random() - 0.5)
    .slice(0, howManyToDisplay);

  if (unplayedDecks.length === 0) {
    return null;
  }

  return (
    <section>
      <SectionTitle text='Unplayed 📦' />
      <SectionTitle
        text='Try an unplayed deck for fresh challenges!'
        variant='description'
      />
      <DeckGrid decks={unplayedDecks} />
    </section>
  );
};

export default UnplayedDecksSection;
