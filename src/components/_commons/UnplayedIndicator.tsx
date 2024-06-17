'use client';

import React from 'react';
import { FiPackage } from 'react-icons/fi';
import { useDeckHistory } from '@/src/stores/deckHistoryStore';

type Props = { deckId: Deck['id'] };

const UnplayedIndicator = ({ deckId }: Props) => {
  const { getDeckPlayCount } = useDeckHistory();
  const deckPlayCount = getDeckPlayCount(deckId);

  if (deckPlayCount === undefined || deckPlayCount <= 0) {
    return <FiPackage className='ml-1 size-5' />;
  } else {
    return null;
  }
};

export default UnplayedIndicator;
