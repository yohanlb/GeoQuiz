import React from 'react';
import useGameStore from '@/src/utils/stores/gameStore';
import AnswerCircle from './AnswerCircle';

type AnswerCirclesListProps = {
  totalNumberOfQuestions: number;
};

const AnswerCirclesList = ({
  totalNumberOfQuestions,
}: AnswerCirclesListProps) => {
  const { userCountryResults, currentQuestionIndex } = useGameStore();

  const circles = Array.from(
    { length: totalNumberOfQuestions },
    (_, index) => ({
      status:
        index < userCountryResults.length
          ? userCountryResults[index].result
          : 'default',
      key: index,
      isCurrentQuestion: index === currentQuestionIndex,
    }),
  );

  return (
    <div className='flex justify-center gap-2 py-2'>
      {circles.map((circle) => (
        <AnswerCircle
          status={circle.status}
          isCurrentQuestion={circle.isCurrentQuestion}
          key={circle.key}
        />
      ))}
    </div>
  );
};

export default AnswerCirclesList;
