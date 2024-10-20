'use client';

import React from 'react';
import { isBreakpoint } from '@lib/utils/screen';
import { useDeckHistory } from '@stores/deckHistoryStore';
import SectionTitle from '@components/_commons/SectionTitle';
import DeckGrid from './DeckGrid';

type Props = {
  decks: DeckWithStatsRecord[];
};

const UnplayedDecksSection = ({ decks }: Props) => {
  const { getPlayedDeckIds } = useDeckHistory();
  const playedDeckIds = getPlayedDeckIds();
  const howManyToDisplay = isBreakpoint('md') ? 3 : 4;

  const unplayedDecks = decks
    .filter((deck) => !playedDeckIds.includes(deck.id))
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
