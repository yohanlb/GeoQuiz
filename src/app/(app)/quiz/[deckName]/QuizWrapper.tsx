'use client';

import React from 'react';
import QuizLoading from '@/src/app/(app)/quiz/[deckName]/QuizLoading';
import { useFetchQuestions } from '@features/quiz/hooks/useFetchQuestions';
import useGameStore from '@lib/stores/game-store';
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
  const [isFakeLoading, setIsFakeLoading] = React.useState(true);

  React.useEffect(() => {
    setDeck(deck);
  }, [setDeck, deck]);

  React.useEffect(() => {
    // artificial delay to show loading animation
    if (isLoading) {
      setIsFakeLoading(true);
      const timer = setTimeout(() => {
        setIsFakeLoading(false);
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setIsFakeLoading(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (isLoading || isFakeLoading) {
    return <QuizLoading />;
  } else if (questions.length < 1) {
    return (
      <div className='flex h-full w-full items-center justify-center'>
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
