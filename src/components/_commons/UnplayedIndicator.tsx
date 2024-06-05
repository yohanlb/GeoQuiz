'use client';

import React from 'react';
import { FiPackage } from 'react-icons/fi';
import { useDeckHistory } from '@/src/stores/deckHistoryStore';

type Props = { deckId: Deck['id'] };

const UnplayedIndicator = ({ deckId }: Props) => {
  const getDeckScores = useDeckHistory((state) => state.getDeckScores);
  const deckScore = getDeckScores(deckId).capital;

  if (!deckScore) {
    return <FiPackage className='ml-1 size-5' />;
  } else {
    // return <span className='font-mono'>{deckScore}%</span>;
    return null;
  }
};

export default UnplayedIndicator;
