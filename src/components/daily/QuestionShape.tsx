import React, { useCallback, useState } from 'react';
import { DailyQuestionType } from '@lib/types/daily';
import { Card } from '@nextui-org/react';
import CountryShapeSmall from './CountryShapeSmall';

type Props = {
  options: string[];
  correctAnswerIndex: number;
  showOnlyCorrectAnswer: boolean;
  handleGuess: ({
    questionType,
    isCorrect,
  }: {
    questionType: DailyQuestionType;
    isCorrect: boolean;
  }) => void;
};

const QuestionShape: React.FC<Props> = ({
  options,
  correctAnswerIndex,
  showOnlyCorrectAnswer,
  handleGuess,
}) => {
  const [userIndexAnswer, setUserIndexAnswer] = useState<number>(-1);

  const hasAnswered = userIndexAnswer !== -1;

  const handleClick = useCallback(
    (index: number) => {
      setUserIndexAnswer(index);
      handleGuess({
        questionType: 'shape',
        isCorrect: index === correctAnswerIndex,
      });
    },
    [correctAnswerIndex, handleGuess],
  );

  const renderCorrectAnswer = () => (
    <Card className='border border-white bg-transparent p-4'>
      <CountryShapeSmall countryCode={options[correctAnswerIndex]} />
    </Card>
  );

  const renderOptions = () => (
    <ul className='flex flex-wrap justify-center gap-2'>
      {options.map((option, index) => {
        const borderColor = getBorderColor(index);

        return (
          <button
            key={index}
            disabled={hasAnswered}
            onClick={() => handleClick(index)}
          >
            <Card className={`border ${borderColor} bg-transparent p-4`}>
              <CountryShapeSmall countryCode={option} />
            </Card>
          </button>
        );
      })}
    </ul>
  );

  const getBorderColor = (index: number) => {
    if (index === userIndexAnswer && index !== correctAnswerIndex) {
      return 'border-red-400';
    } else if (index === correctAnswerIndex && hasAnswered) {
      return 'border-green-400';
    } else {
      return 'border-white';
    }
  };

  return (
    <div>{showOnlyCorrectAnswer ? renderCorrectAnswer() : renderOptions()}</div>
  );
};

export default QuestionShape;
