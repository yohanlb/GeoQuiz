import React, { useCallback, useState } from 'react';
import ContinentButton from '@features/daily/components/ContinentButton';
import { Continent, DailyQuestionType } from '@lib/types/daily-mode';

type Props = {
  options: Continent[];
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

const QuestionContinents: React.FC<Props> = ({
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
        questionType: 'region',
        isCorrect: index === correctAnswerIndex,
      });
    },
    [correctAnswerIndex, handleGuess],
  );

  const renderCorrectAnswer = () => (
    <ContinentButton
      continent={options[correctAnswerIndex]}
      isSelected={false}
      isCorrect={true}
      hasAnswered={false}
      onClick={() => {}}
    />
  );

  const renderOptions = () => (
    <ul className='flex flex-wrap justify-center gap-4'>
      {options.map((option, index) => {
        return (
          <ContinentButton
            key={option}
            continent={option}
            hasAnswered={hasAnswered}
            isSelected={index === userIndexAnswer}
            isCorrect={index === correctAnswerIndex}
            onClick={() => handleClick(index)}
          />
        );
      })}
    </ul>
  );

  return (
    <div>{showOnlyCorrectAnswer ? renderCorrectAnswer() : renderOptions()}</div>
  );
};

export default QuestionContinents;
