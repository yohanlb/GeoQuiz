'use client';
import React, { startTransition } from 'react';
import ResultView from './ResultsView';
import QuestionView from './QuestionView';
import { postCountryStats } from '../../actions/countryStats';

type Props = { questions: Question[]; deckName: string };

function GameController({ questions, deckName }: Props) {
  const [userAnswers, setUserAnswers] = React.useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] =
    React.useState<number>(0);
  const [gameState, setGameState] = React.useState<GameState>('playing');
  const [isShowingAnswer, setIsShowingAnswer] = React.useState<boolean>(false);
  const [userResults, setUserResults] = React.useState<UserResults>([]);

  const handleNextQuestion = () => {
    startTransition(() => {
      postCountryStats(
        questions[currentQuestionIndex].countryData.id,
        userAnswers.length < 1,
      );
    });

    setUserAnswers([]);
    setIsShowingAnswer(false);
    if (currentQuestionIndex >= questions.length - 1) {
      setGameState('finished');
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleRestart = () => {
    window.location.reload();
  };

  const handleClickAnswerOption = (userAnswer: string) => {
    const isUserFirstAttempt = Boolean(userAnswers.length < 1);

    if (isShowingAnswer) {
      return;
    }
    setUserAnswers((prevUserAnswers) => [...prevUserAnswers, userAnswer]);
    if (userAnswer === questions[currentQuestionIndex]?.answer) {
      // Correct Answer
      setIsShowingAnswer(true);

      const newResult: UserResultsStatus = isUserFirstAttempt
        ? 'valid'
        : 'invalid';
      const newUserResults = [...userResults];
      newUserResults[currentQuestionIndex] = newResult;
      setUserResults(newUserResults);

      setTimeout(handleNextQuestion, 700);
    } else {
      // Wrong Answer
      const newUserResults = [...userResults];
      newUserResults[currentQuestionIndex] = 'invalid';
      setUserResults(newUserResults);
    }
  };

  // FIRST INITIALIZATION
  React.useEffect(() => {
    setUserResults([]);
    setGameState('playing');
  }, []);

  if (gameState === 'finished') {
    return (
      <ResultView
        questions={questions}
        userResults={userResults}
        handleRestart={handleRestart}
      />
    );
  }

  return (
    <QuestionView
      questions={questions}
      userAnswers={userAnswers}
      userResults={userResults}
      currentQuestionIndex={currentQuestionIndex}
      handleClickAnswerOption={handleClickAnswerOption}
    />
  );
}

export default GameController;
