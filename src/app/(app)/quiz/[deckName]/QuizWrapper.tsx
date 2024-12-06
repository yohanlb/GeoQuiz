'use client';

import React from 'react';
import { useFetchQuestions } from '@features/quiz/hooks/useFetchQuestions';
import useFakeLoading from '@hooks/useFakeLoading';
import useGameStore from '@lib/stores/game-store';
import QuizLoading from '@components/global/QuizLoading';
import QuizController from './QuizController';

type Props = {
  userGuessesHistory: UserGuessHistoryPartial[];
  deck: DeckRecord;
  amountOfQuestions: number;
};

const QuizWrapper = ({
  userGuessesHistory,
  deck,
  amountOfQuestions,
}: Props) => {
  const { setDeck } = useGameStore();
  const { questions, isLoading } = useFetchQuestions(deck, amountOfQuestions);

  React.useEffect(() => {
    setDeck(deck);
  }, [setDeck, deck]);

  const isFakeLoading = useFakeLoading(3000, isLoading);

  if (isLoading || isFakeLoading) {
    return <QuizLoading />;
  } else if (questions.length < 1) {
    return (
      <div
        className='flex h-full w-full items-center justify-center'
        data-test='quiz-error'
      >
        Error: No questions found. Try another deck.
      </div>
    );
  } else {
    return (
      <QuizController
        questions={questions}
        userGuessesHistory={userGuessesHistory}
      />
    );
  }
};

export default QuizWrapper;
