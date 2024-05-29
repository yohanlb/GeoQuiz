'use client';

import { FiPackage } from 'react-icons/fi';
import React from 'react';
import { useStoreDeckResults } from '@/src/stores/deckResults';

type Props = { deckId: Deck['id'] };

const UnplayedIndicator = ({ deckId }: Props) => {
  const getDeckScores = useStoreDeckResults((state) => state.getDeckScores);
  const deckScore = getDeckScores(deckId).capital;

  if (!deckScore) {
    return <FiPackage className='ml-1 size-5' />;
  } else {
    // return <span className='font-mono'>{deckScore}%</span>;
    return null;
  }
};

export default UnplayedIndicator;
