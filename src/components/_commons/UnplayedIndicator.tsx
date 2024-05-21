'use client';
import { useDeckScores } from '@/src/hooks/useDeckScores';
import React from 'react';

type Props = { deckId: Deck['id'] };

const UnplayedIndicator = ({ deckId }: Props) => {
  const { getDeckScores } = useDeckScores();
  const deckScore = getDeckScores(deckId).capital;

  if (!deckScore) {
    return <span className='font-mono'>📦</span>;
  } else {
    // return <span className='font-mono'>{deckScore}%</span>;
    return null;
  }
};

export default UnplayedIndicator;
