'use client';

import React, { startTransition } from 'react';
import { postCountryStats } from '@features/countries/server/actions/country-stats';
import QuestionView from '@features/quiz/components/QuestionView';
import { updateUserGuessesHistory } from '@features/userInsights/server/actions/update-user-guesses-history';
import useGameStore from '@stores/game-store';
import { useRouter } from 'next/navigation';

type Props = {
  questions: Question[];
  userGuessesHistory: UserGuessHistoryPartial[];
};

function QuizController({ questions, userGuessesHistory }: Readonly<Props>) {
  const {
    currentQuestionIndex,
    incrementQuestionIndex,
    questionType,
    isShowingAnswer,
    setIsShowingAnswer,
    userAnswers,
    resetUserAnswers,
    addToUserAnswers,
    addToUserCountryResults,
    gameState,
    setGameState,
    deck,
    resetGame,
    addToAnsweredQuestions,
    setUserCountryScoresForCurrentSeries,
  } = useGameStore();
  const { push } = useRouter();
  const hasInitialized = React.useRef(false);

  if (!deck) {
    throw new Error('Deck is null. Ensure that the deck is set in the store.');
  }

  const questionTypeId = questionType === 'CountryToCapital' ? 1 : 2;

  const prepareUserHistoryForCurrentSeries = () => {
    // TODO: do that server side and send it with the questions.
    const newUserHistory: { [key: CountryRecord['id']]: boolean[] } = {};
    questions.forEach((question) => {
      const userStatsForQuestion = userGuessesHistory.find(
        (stat) =>
          stat.country_id === question.countryData.id &&
          stat.question_type_id === questionTypeId,
      );
      const resultsForQuestion = userStatsForQuestion?.guess_results ?? [];
      newUserHistory[question.countryData.id] = resultsForQuestion;
    });
    setUserCountryScoresForCurrentSeries(newUserHistory);
  };

  const handleNextQuestion = () => {
    startTransition(() => {
      // TODO: ISNT called for last question
      postCountryStats({
        countryId: questions[currentQuestionIndex].countryData.id,
        guessedRight: userAnswers.length < 1,
        questionType,
      });
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
    const countryId = questions[currentQuestionIndex].countryData.id;
    if (userAnswer === correctAnswer) {
      // Correct Answer
      setIsShowingAnswer(true);
      const newResult: UserResultsStatus = isUserFirstAttempt
        ? 'valid'
        : 'invalid';
      // Add result to the user stats table
      updateUserGuessesHistory(
        countryId,
        questionTypeId,
        newResult === 'valid',
      );
      addToUserCountryResults(countryId, newResult, currentQuestionIndex);
      addToAnsweredQuestions({
        questionId: currentQuestionIndex,
        answer: userAnswer,
        countryData: questions[currentQuestionIndex].countryData,
        countryStats: questions[currentQuestionIndex].countryStats,
        questionType,
        isCorrect: newResult === 'valid',
      });
      setTimeout(handleNextQuestion, 700);
    } else {
      // Wrong Answer
      addToUserCountryResults(countryId, 'invalid', currentQuestionIndex);
    }
  };

  // FIRST INITIALIZATION
  React.useEffect(() => {
    resetGame();
    prepareUserHistoryForCurrentSeries();
  }, [resetGame]);

  // AFTER GAME FINISHED
  React.useEffect(() => {
    if (gameState === 'playing') {
      // make sure gameState had time to be intialized.
      hasInitialized.current = true;
    }
    if (hasInitialized.current && gameState === 'finished') {
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

export default QuizController;
