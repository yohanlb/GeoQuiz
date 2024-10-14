'use client';

import React from 'react';
import useGameStore from '@/src/utils/stores/gameStore';
import { useFetchQuestions } from '@hooks/useFetchQuestions';
import { motion } from 'framer-motion';
import LoadingSpinner from '@components/_commons/LoadingSpinner';
import GameController from './GameController';

type Props = {
  userGuessesHistory: UserGuessHistoryPartial[];
  deck: DeckRecord;
  amountOfQuestions: number;
};

const GameClientWrapper = ({
  userGuessesHistory,
  deck,
  amountOfQuestions,
}: Props) => {
  const { setDeck } = useGameStore();
  const { questions, isLoading } = useFetchQuestions(deck, amountOfQuestions);

  React.useEffect(() => {
    setDeck(deck);
  }, [setDeck, deck]);

  if (isLoading) {
    return (
      <div className='flex h-full w-full flex-col items-center justify-center gap-8'>
        <motion.p
          className='text-xl'
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          Preparing questions...
        </motion.p>
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
      <GameController
        questions={questions}
        userGuessesHistory={userGuessesHistory}
      />
    );
  }
};

export default GameClientWrapper;
