'use client';

import React, { startTransition } from 'react';
import { useStoreCountryResults } from '@/src/stores/countryResults';
import { useStoreDeckResults } from '@/src/stores/deckResults';
import useGameStore from '@/src/stores/gameStore';
import { calculateNewDeckScore } from '@lib/utils/score';
import { postCountryStats } from '../../actions/countryStats';
import QuestionView from './QuestionView';
import ResultView from './ResultsView';

type Props = {
  questions: Question[];
  deck: Deck;
  deckName: string;
};

function GameController({ questions, deck }: Props) {
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
    resetUserResults,
  } = useGameStore();

  const [gameState, setGameState] = React.useState<GameState>('playing');
  const updateDeckScore = useStoreDeckResults((state) => state.updateDeckScore);
  const addCountryScores = useStoreCountryResults(
    (state) => state.addCountryScores,
  );

  const questionTypeSimplified =
    questionType === 'CountryToFlag' ? 'flag' : 'capital'; // todo update store so we dont use this sub type anymore

  const handleNextQuestion = () => {
    startTransition(() => {
      postCountryStats(
        questions[currentQuestionIndex].countryData.id,
        userAnswers.length < 1,
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
    addToUserAnswers(userAnswer);
    if (userAnswer === correctAnswer) {
      // Correct Answer
      setIsShowingAnswer(true);
      const newResult: UserResultsStatus = isUserFirstAttempt
        ? 'valid'
        : 'invalid';
      addToUserResults(newResult, currentQuestionIndex);
      addCountryScores(
        questionTypeSimplified,
        questions[currentQuestionIndex].countryData.id,
        newResult === 'valid' ? true : false,
      );
      setTimeout(handleNextQuestion, 700);
    } else {
      // Wrong Answer
      addToUserResults('invalid', currentQuestionIndex);
    }
  };

  // FIRST INITIALIZATION
  React.useEffect(() => {
    resetUserResults();
    setGameState('playing');
  }, [resetUserResults]);

  // AFTER GAME FINISHED
  React.useEffect(() => {
    if (gameState === 'finished') {
      const newDeckScore = calculateNewDeckScore(userResults, questions.length);
      updateDeckScore(deck.id, questionTypeSimplified, newDeckScore);
    }
  }, [gameState]); // eslint-disable-line react-hooks/exhaustive-deps

  if (gameState === 'finished') {
    return (
      <ResultView
        questions={questions}
        deckName={deck.name}
        handleRestart={handleRestart}
      />
    );
  }

  return (
    <QuestionView
      questions={questions}
      handleClickAnswerOption={handleClickAnswerOption}
    />
  );
}

export default GameController;
