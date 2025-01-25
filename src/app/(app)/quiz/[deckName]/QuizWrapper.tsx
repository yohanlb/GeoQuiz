'use client';

import React from 'react';
import { getQuestionsAction } from '@features/quiz/server/actions/get-questions';
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
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [isPending, startTransition] = React.useTransition();

  React.useEffect(() => {
    setDeck(deck);
  }, [setDeck, deck]);

  React.useEffect(() => {
    startTransition(async () => {
      const fetchedQuestions = await getQuestionsAction(
        deck,
        amountOfQuestions,
      );
      setQuestions(fetchedQuestions);
    });
  }, [deck, amountOfQuestions]);

  const isFakeLoading = useFakeLoading(3000, isPending);

  if (isPending || isFakeLoading) {
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
