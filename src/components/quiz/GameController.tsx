'use client';

import React, { startTransition } from 'react';
import { useCountryHistory } from '@/src/stores/countryHistoryStore';
import { useDeckHistory } from '@/src/stores/deckHistoryStore';
import useGameStore from '@/src/stores/gameStore';
import { calculateNewDeckScore } from '@lib/utils/score';
import { useRouter } from 'next/navigation';
import { postCountryStats } from '../../actions/countryStats';
import QuestionView from './QuestionView';

type Props = {
  questions: Question[];
};

function GameController({ questions }: Props) {
  const {
    currentQuestionIndex,
    incrementQuestionIndex,
    questionType,
    isShowingAnswer,
    setIsShowingAnswer,
    userAnswers,
    resetUserAnswers,
    addToUserAnswers,
    userResults,
    addToUserResults,
    gameState,
    setGameState,
    deck,
    resetGame,
    addToAnsweredQuestions,
  } = useGameStore();
  const updateDeckScore = useDeckHistory((state) => state.updateDeckScore);
  const addCountryScores = useCountryHistory((state) => state.addCountryScores);
  const { push } = useRouter();

  if (!deck) {
    throw new Error('Deck is null. Ensure that the deck is set in the store.');
  }

  const handleNextQuestion = () => {
    startTransition(() => {
      postCountryStats(
        questions[currentQuestionIndex].countryData.id,
        userAnswers.length < 1,
        questionType,
      );
    });
    resetUserAnswers();
    setIsShowingAnswer(false);
    if (currentQuestionIndex >= questions.length - 1) {
      setGameState('finished');
    } else {
      incrementQuestionIndex();
    }
  };

  const handleRestart = () => {
    window.location.reload();
  };

  const handleClickAnswerOption = (userAnswer: string) => {
    const correctAnswer =
      questionType === 'CountryToFlag'
        ? questions[currentQuestionIndex].answerIso2
        : questions[currentQuestionIndex].answerCapital;
    const isUserFirstAttempt = Boolean(userAnswers.length < 1);

    if (isShowingAnswer) {
      return;
    }
    addToUserAnswers(userAnswer); // TODO deprecate this
    if (userAnswer === correctAnswer) {
      // Correct Answer
      setIsShowingAnswer(true);
      const newResult: UserResultsStatus = isUserFirstAttempt
        ? 'valid'
        : 'invalid';
      addToUserResults(newResult, currentQuestionIndex);
      addCountryScores(
        questions[currentQuestionIndex].countryData.id,
        newResult === 'valid',
      );
      addToAnsweredQuestions({
        questionId: currentQuestionIndex,
        answer: userAnswer,
        countryData: questions[currentQuestionIndex].countryData,
        questionType,
        isCorrect: newResult === 'valid',
      });
      setTimeout(handleNextQuestion, 700);
    } else {
      // Wrong Answer
      addToUserResults('invalid', currentQuestionIndex);
    }
  };

  // FIRST INITIALIZATION
  React.useEffect(() => {
    resetGame();
  }, [resetGame]);

  // AFTER GAME FINISHED
  React.useEffect(() => {
    if (gameState === 'finished') {
      // TODO modify this two next lines to not use this function, and do it directly in the store
      const newDeckScore = calculateNewDeckScore(userResults, questions.length);
      updateDeckScore(deck.id, newDeckScore);
      push('/results');
    }
  }, [gameState]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <QuestionView
      questions={questions}
      handleClickAnswerOption={handleClickAnswerOption}
    />
  );
}

export default GameController;
