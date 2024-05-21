'use client';
import React from 'react';
import DeckGrid from './DeckGrid';
import { useDeckScores } from '@/src/hooks/useDeckScores';
import { isBreakpoint } from '@lib/utils/screen';
import SectionTitle from '@components/_commons/SectionTitle';

type Props = {
  decks: Deck[];
};

const LowestScoresDecksSection = ({ decks }: Props) => {
  const howManyToDisplay = isBreakpoint('md') ? 3 : 4;
  const { getAllDeckScores } = useDeckScores();
  const deckScores = getAllDeckScores();
  const sortedScores = Object.entries(deckScores).sort(([, a], [, b]) => a - b);
  const sortedScoresIds = sortedScores.map(([id]) => id);
  const lowestScoreDecks = [];
  for (let i = 0; i < sortedScoresIds.length; i++) {
    const hasNotAGoodScore = sortedScores[i][1] < 60;
    const id = sortedScoresIds[i];
    const deck = decks.find(
      (deck) => deck.id === Number(id) && hasNotAGoodScore,
    );
    if (deck) {
      lowestScoreDecks.push(deck);
    }
  }

  if (lowestScoreDecks.length === 0) {
    return null;
  }
  return (
    <section>
      <SectionTitle text='We need to practice those! 📖' />
      <DeckGrid decks={lowestScoreDecks.slice(0, howManyToDisplay)} />
    </section>
  );
};

export default LowestScoresDecksSection;
