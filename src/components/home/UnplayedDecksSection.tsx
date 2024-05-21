'use client';
import React from 'react';
import DeckGrid from './DeckGrid';
import { useDeckScores } from '@/src/hooks/useDeckScores';
import { isBreakpoint } from '@lib/utils/screen';
import SectionTitle from '@components/_commons/SectionTitle';

type Props = {
  decks: Deck[];
};

const UnplayedDecksSection = ({ decks }: Props) => {
  const { getAllPlayedDeckIds } = useDeckScores();
  const storedDecksIds = getAllPlayedDeckIds('capital');
  const howManyToDisplay = isBreakpoint('md') ? 3 : 4;

  const unplayedDecks = decks
    .filter((deck) => !storedDecksIds.includes(deck.id.toString()))
    .sort(() => Math.random() - 0.5)
    .slice(0, howManyToDisplay);

  if (unplayedDecks.length === 0) {
    return null;
  }

  return (
    <section>
      <SectionTitle text='Unplayed 📦' />
      <DeckGrid decks={unplayedDecks} />
    </section>
  );
};

export default UnplayedDecksSection;
