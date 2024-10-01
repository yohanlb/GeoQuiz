'use client';

import React, { startTransition } from 'react';
import { useCountryHistory } from '@/src/utils/stores/countryHistoryStore';
import { useDeckHistory } from '@/src/utils/stores/deckHistoryStore';
import useGameStore from '@/src/utils/stores/gameStore';
import { updateUserGuessesHistory } from '@utils/actions/updateUserGuessesHistory';
import { calculateNewDeckScore } from '@utils/score';
import { useRouter } from 'next/navigation';
import { postCountryStats } from '../../utils/actions/countryStats';
import QuestionView from './QuestionView';

type Props = {
  questions: Question[];
};

function GameController({ questions }: Readonly<Props>) {
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
  const { addNewDeckResult } = useDeckHistory();
  const addCountryScores = useCountryHistory((state) => state.addCountryScores);
  const { push } = useRouter();
  const hasInitialized = React.useRef(false);

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
      const countryId = questions[currentQuestionIndex].countryData.id;
      // Add result to the user stats table
      updateUserGuessesHistory(
        countryId,
        questionType === 'CountryToCapital' ? 1 : 2,
        newResult === 'valid',
      );
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
    if (gameState === 'playing') {
      // make sure gameState had time to be intialized.
      hasInitialized.current = true;
    }
    if (hasInitialized.current && gameState === 'finished') {
      const newDeckScore = calculateNewDeckScore(userResults, questions.length);
      addNewDeckResult(deck.id, newDeckScore);
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
