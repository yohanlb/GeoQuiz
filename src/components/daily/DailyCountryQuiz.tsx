'use client';

import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '@hooks/useLocalStorage';
import useLogGameEvent, { GameEventData } from '@hooks/useLogGameEvent';
import { DailyQuestion, DaysHistory, Guesses } from '@lib/types/daily-mode';
import QuizSteps from './QuizSteps';

type Props = {
  dailyQuestion: DailyQuestion;
  showRemoveHistoryButton?: boolean;
};

const DailyCountryQuiz: React.FC<Props> = ({
  dailyQuestion,
  showRemoveHistoryButton = false,
}) => {
  const { sendLogGameEvent } = useLogGameEvent();
  const [cotdHistory, setCotdHistory] = useLocalStorage<DaysHistory>(
    'cotd-history',
    {},
  );
  const [step, setStep] = useState<number>(0);
  const [guesses, setGuesses] = useState<Guesses>({
    capital: null,
    region: null,
    flag: null,
    shape: null,
  });

  const nbOfQuestions = Object.keys(guesses).length;

  const sumCorrectAnswers = () =>
    Object.values(guesses).reduce(
      (total, isCorrect) => total + (isCorrect ? 1 : 0),
      0,
    );

  const handleGuess = ({
    questionType,
    isCorrect,
  }: {
    questionType: keyof Guesses;
    isCorrect: boolean;
  }) => {
    if (guesses[questionType] !== null) return;
    setGuesses((prev) => ({ ...prev, [questionType]: isCorrect }));
    setStep((prev) => prev + 1);
  };

  const handleNext = () => {
    if (step + 1 === nbOfQuestions * 2) {
      handleGameOver();
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const resetCurrentDayHistory = () => {
    setCotdHistory((prevHistory) => ({
      ...prevHistory,
      [dailyQuestion.questionId]: undefined,
    }));
  };

  const handleGameOver = () => {
    const todaysHistory = {
      questionId: dailyQuestion.questionId,
      rightAnswers: sumCorrectAnswers(),
      wrongAnswers: nbOfQuestions - sumCorrectAnswers(),
      guesses,
    };

    setCotdHistory((prevHistory) => ({
      ...prevHistory,
      [dailyQuestion.questionId]: todaysHistory,
    }));

    const completeEventData: GameEventData = {
      event: 'complete',
      gameMode: 'countryOfTheDay',
      payload: {
        questionId: dailyQuestion.questionId,
        rightAnswers: sumCorrectAnswers(),
        wrongAnswers: nbOfQuestions - sumCorrectAnswers(),
      },
    };
    sendLogGameEvent(completeEventData);
  };

  useEffect(() => {
    const hasAlreadyPlayed = cotdHistory[dailyQuestion.questionId.toString()];

    if (hasAlreadyPlayed) {
      setGuesses(hasAlreadyPlayed.guesses);
      setStep(nbOfQuestions * 2);
    }
  }, [cotdHistory, dailyQuestion, nbOfQuestions]);

  const isOver = step >= nbOfQuestions * 2;

  return (
    <div className='flex flex-col items-center gap-4'>
      <h3 className='text-4xl font-medium'>{dailyQuestion.countryName}</h3>
      <QuizSteps
        step={step}
        dailyQuestion={dailyQuestion}
        isOver={isOver}
        guesses={guesses}
        score={sumCorrectAnswers()}
        totalQuestions={nbOfQuestions}
        handleGuess={handleGuess}
        handleNext={handleNext}
      />
      {showRemoveHistoryButton && (
        <button
          onClick={() => resetCurrentDayHistory()}
          className='rounded-lg border border-white px-2'
        >
          Reset
        </button>
      )}
    </div>
  );
};

export default DailyCountryQuiz;
