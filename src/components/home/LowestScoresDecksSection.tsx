'use client';
import React from 'react';
import GameDeckGrid from './GameDeckGrid';
import { useDeckScores } from '@/src/hooks/useDeckScores';
import { isBreakpoint } from '@lib/utils/screen';

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
    const id = sortedScoresIds[i];
    const deck = decks.find((deck) => deck.id === Number(id));
    if (deck) {
      lowestScoreDecks.push(deck);
    }
  }

  if (lowestScoreDecks.length === 0) {
    return null;
  }
  return (
    <section>
      <h2>We need to practice those! 📖</h2>
      <GameDeckGrid decks={lowestScoreDecks.slice(0, howManyToDisplay)} />
    </section>
  );
};

export default LowestScoresDecksSection;
