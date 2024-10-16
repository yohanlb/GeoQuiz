import React from 'react';
import {
  DailyQuestion,
  DailyQuestionType,
  Guesses,
} from '@lib/types/daily-mode';
import QuestionFlag from './QuestionFlag';
import QuestionShape from './QuestionShape';
import QuestionText from './QuestionText';
import QuizScore from './QuizScore';
import QuizStep from './QuizStep';

type Props = {
  step: number;
  dailyQuestion: DailyQuestion;
  isOver: boolean;
  score: number;
  totalQuestions: number;
  guesses: Guesses;
  handleGuess: ({
    questionType,
    isCorrect,
  }: {
    questionType: DailyQuestionType;
    isCorrect: boolean;
  }) => void;
  handleNext: () => void;
};

const QuizSteps: React.FC<Props> = ({
  step,
  dailyQuestion,
  isOver,
  score,
  totalQuestions,
  guesses,
  handleGuess,
  handleNext,
}) => {
  return (
    <ol className='relative w-full border-s border-gray-200'>
      <QuizStep
        step={0}
        currentStep={step}
        title='Continent'
        stepGuessStatus={guesses.region}
        handleNext={handleNext}
      >
        <QuestionText
          options={dailyQuestion.regionOptions}
          correctAnswerIndex={dailyQuestion.regionCorrectIndex}
          questionType='region'
          handleGuess={handleGuess}
          showOnlyCorrectAnswer={step >= 2}
        />
      </QuizStep>
      <QuizStep
        step={2}
        currentStep={step}
        title='Territory Shape'
        stepGuessStatus={guesses.shape}
        handleNext={handleNext}
      >
        <QuestionShape
          options={dailyQuestion.shapeOptions}
          correctAnswerIndex={dailyQuestion.shapeCorrectIndex}
          handleGuess={handleGuess}
          showOnlyCorrectAnswer={step >= 4}
        />
      </QuizStep>
      <QuizStep
        step={4}
        currentStep={step}
        title='Capital'
        stepGuessStatus={guesses.capital}
        handleNext={handleNext}
      >
        <QuestionText
          options={dailyQuestion.capitalOptions}
          correctAnswerIndex={dailyQuestion.capitalCorrectIndex}
          questionType='capital'
          handleGuess={handleGuess}
          showOnlyCorrectAnswer={step >= 6}
        />
      </QuizStep>
      <QuizStep
        step={6}
        currentStep={step}
        title='Flag'
        stepGuessStatus={guesses.flag}
        handleNext={handleNext}
      >
        <QuestionFlag
          options={dailyQuestion.flagOptions}
          correctAnswerIndex={dailyQuestion.flagCorrectIndex}
          handleGuess={handleGuess}
          showOnlyCorrectAnswer={step >= 8}
        />
      </QuizStep>
      <QuizStep step={8} currentStep={step} title='Score'>
        {isOver && <QuizScore score={score} totalQuestions={totalQuestions} />}
      </QuizStep>
    </ol>
  );
};

export default QuizSteps;
