import React, { useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { DailyQuestionType } from '@lib/types/daily';
import { Card } from '@nextui-org/react';

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

const QuestionFlag: React.FC<Props> = ({
  options,
  correctAnswerIndex,
  showOnlyCorrectAnswer,
  handleGuess,
}) => {
  const [userIndexAnswer, setUserIndexAnswer] = useState<number>(-1);

  const hasAnswered = userIndexAnswer !== -1;

  const handleClick = (index: number) => {
    setUserIndexAnswer(index);
    handleGuess({
      questionType: 'flag',
      isCorrect: index === correctAnswerIndex,
    });
  };

  const renderCorrectAnswer = () => (
    <ReactCountryFlag
      countryCode={options[correctAnswerIndex]}
      svg
      aria-label={options[correctAnswerIndex]}
      style={{
        width: 'auto',
        height: '4rem',
      }}
    />
  );

  const renderOptions = () => (
    <ul className='flex flex-wrap justify-center gap-4'>
      {options.map((option, index) => {
        const borderColor = getBorderColor(index);
        const isDisabled = hasAnswered && index !== correctAnswerIndex;

        return (
          <button
            type='button'
            disabled={hasAnswered}
            key={index}
            onClick={() => handleClick(index)}
          >
            <Card className={`${borderColor} rounded-md bg-transparent p-1`}>
              <ReactCountryFlag
                countryCode={option}
                svg
                aria-label={option}
                style={{
                  width: '4rem',
                  height: '3rem',
                  opacity: isDisabled ? 0.5 : 1,
                }}
              />
            </Card>
          </button>
        );
      })}
    </ul>
  );

  const getBorderColor = (index: number) => {
    if (index === userIndexAnswer && index !== correctAnswerIndex) {
      return 'outline-red-400 outline-4';
    } else if (index === correctAnswerIndex && hasAnswered) {
      return 'outline-green-400 outline-4';
    } else {
      return 'outline-white outline-1';
    }
  };

  return (
    <div>{showOnlyCorrectAnswer ? renderCorrectAnswer() : renderOptions()}</div>
  );
};

export default QuestionFlag;
