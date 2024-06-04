'use client';

import React from 'react';
import { useFetchQuestions } from '@/src/hooks/useFetchQuestions';
import LoadingSpinner from '@components/_commons/LoadingSpinner';
import GameController from './GameController';

type Props = {
  deck: Deck;
  amountOfQuestions: number;
  deckName: string;
};

const GameClientWrapper = ({ deck, amountOfQuestions, deckName }: Props) => {
  const { questions, isLoading } = useFetchQuestions(deck, amountOfQuestions);

  if (isLoading) {
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <LoadingSpinner />
      </div>
    );
  } else if (questions.length < 1) {
    return (
      <div className='flex h-full w-full items-center justify-center'>
        Error: No questions found. Try another deck.
      </div>
    );
  } else {
    return (
      <>
        <GameController questions={questions} deck={deck} deckName={deckName} />
      </>
    );
  }
};

export default GameClientWrapper;
