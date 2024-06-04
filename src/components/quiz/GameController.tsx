'use client';

import React, { startTransition } from 'react';
import { useStoreCountryResults } from '@/src/stores/countryResults';
import { useStoreDeckResults } from '@/src/stores/deckResults';
import { calculateNewDeckScore } from '@lib/utils/score';
import { postCountryStats } from '../../actions/countryStats';
import QuestionView from './QuestionView';
import ResultView from './ResultsView';

type Props = {
  questions: Question[];
  deck: Deck;
  deckName: string;
  questionType: Question['questionType'];
};

function GameController({ questions, deck, questionType }: Props) {
  const [userAnswers, setUserAnswers] = React.useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] =
    React.useState<number>(0);
  const [gameState, setGameState] = React.useState<GameState>('playing');
  const [isShowingAnswer, setIsShowingAnswer] = React.useState<boolean>(false);
  const [userResults, setUserResults] = React.useState<UserResults>([]);
  const updateDeckScore = useStoreDeckResults((state) => state.updateDeckScore);
  const addCountryScores = useStoreCountryResults(
    (state) => state.addCountryScores,
  );

  const questionTypeSimplfied =
    questionType === 'CountryToFlag' ? 'flag' : 'capital'; // todo update store so we dont use this sub type anymore

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
    const correctAnswer =
      questionType === 'CountryToFlag'
        ? questions[currentQuestionIndex].answerIso2
        : questions[currentQuestionIndex].answerCapital;
    const isUserFirstAttempt = Boolean(userAnswers.length < 1);

    if (isShowingAnswer) {
      return;
    }
    setUserAnswers((prevUserAnswers) => [...prevUserAnswers, userAnswer]);
    if (userAnswer === correctAnswer) {
      // Correct Answer
      setIsShowingAnswer(true);
      const newResult: UserResultsStatus = isUserFirstAttempt
        ? 'valid'
        : 'invalid';
      setUserResults((prevUserResults) => {
        const newUserResults = [...prevUserResults];
        newUserResults[currentQuestionIndex] = newResult;
        return newUserResults;
      });
      addCountryScores(
        questionTypeSimplfied,
        questions[currentQuestionIndex].countryData.id,
        newResult === 'valid' ? true : false,
      );
      setTimeout(handleNextQuestion, 700);
    } else {
      // Wrong Answer
      setUserResults((prevUserResults) => {
        const newUserResults = [...prevUserResults];
        newUserResults[currentQuestionIndex] = 'invalid';
        return newUserResults;
      });
    }
  };

  // FIRST INITIALIZATION
  React.useEffect(() => {
    setUserResults([]);
    setGameState('playing');
  }, []);

  // AFTER GAME FINISHED
  React.useEffect(() => {
    if (gameState === 'finished') {
      const newDeckScore = calculateNewDeckScore(userResults, questions.length);
      updateDeckScore(deck.id, questionTypeSimplfied, newDeckScore);
    }
  }, [gameState]); // eslint-disable-line react-hooks/exhaustive-deps

  if (gameState === 'finished') {
    return (
      <ResultView
        questions={questions}
        userResults={userResults}
        deckName={deck.name}
        handleRestart={handleRestart}
      />
    );
  }

  return (
    <QuestionView
      questions={questions}
      questionType={questionType}
      userAnswers={userAnswers}
      userResults={userResults}
      currentQuestionIndex={currentQuestionIndex}
      handleClickAnswerOption={handleClickAnswerOption}
    />
  );
}

export default GameController;
