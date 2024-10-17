import React, { useState } from 'react';
import { DailyQuestionType } from '@lib/types/daily-mode';
import { Button } from '@components/ui/button';

type Props = {
  options: string[];
  correctAnswerIndex: number;
  showOnlyCorrectAnswer: boolean;
  questionType: DailyQuestionType;
  handleGuess: ({
    questionType,
    isCorrect,
  }: {
    questionType: DailyQuestionType;
    isCorrect: boolean;
  }) => void;
};

const QuestionText: React.FC<Props> = ({
  options,
  correctAnswerIndex,
  questionType,
  showOnlyCorrectAnswer,
  handleGuess,
}) => {
  const [userIndexAnswer, setUserIndexAnswer] = useState<number>(-1);

  const hasAnswered = userIndexAnswer !== -1;

  const handleClick = (index: number) => {
    if (hasAnswered) {
      return;
    }
    setUserIndexAnswer(index);
    handleGuess({
      questionType: questionType,
      isCorrect: index === correctAnswerIndex,
    });
  };

  const renderCorrectAnswer = () => (
    <Button variant='default' size='default'>
      {options[correctAnswerIndex]}
    </Button>
  );

  const renderOptions = () => (
    <ul className='flex flex-wrap justify-center gap-2'>
      {options.map((option, index) => {
        const buttonVariant = getButtonVariant(index);

        return (
          <Button
            key={index}
            size='sm'
            variant={buttonVariant}
            onClick={() => handleClick(index)}
            className='p-4'
          >
            {option}
          </Button>
        );
      })}
    </ul>
  );

  const getButtonVariant = (index: number) => {
    if (index === userIndexAnswer && index !== correctAnswerIndex) {
      return 'destructive';
    } else if (index === correctAnswerIndex && hasAnswered) {
      return 'success';
    } else {
      return 'default';
    }
  };

  return (
    <div>{showOnlyCorrectAnswer ? renderCorrectAnswer() : renderOptions()}</div>
  );
};

export default QuestionText;
