import React from 'react';
import useGameStore from '@/src/stores/gameStore';
import AnswerCircle from './AnswerCircle';

type AnswerCirclesListProps = {
  totalNumberOfQuestions: number;
};

type CircleResult = {
  status: UserResultsStatus;
  key: number;
  isCurrentQuestion: boolean;
};

const AnswerCirclesList = ({
  totalNumberOfQuestions,
}: AnswerCirclesListProps) => {
  const { userResults, currentQuestionIndex } = useGameStore();

  const circles: CircleResult[] = [];
  for (let i = 0; i < totalNumberOfQuestions; i++) {
    circles.push({
      status: userResults[i] || 'default',
      key: i,
      isCurrentQuestion: Boolean(i === currentQuestionIndex),
    });
  }

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
