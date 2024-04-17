import React from 'react';
import AnswerCircle from './AnswerCircle';

type AnswerCirclesListProps = {
  userResults: UserResults;
  totalNumberOfQuestions: number;
  currentQuestionIndex: number;
};

type CircleResult = {
  status: UserResultsStatus;
  key: number;
  isCurrentQuestion: boolean;
};

const AnswerCirclesList = ({
  userResults,
  totalNumberOfQuestions,
  currentQuestionIndex,
}: AnswerCirclesListProps) => {
  const circles: CircleResult[] = [];
  for (let i = 0; i < totalNumberOfQuestions; i++) {
    circles.push({
      status: userResults[i] || 'default',
      key: i,
      isCurrentQuestion: Boolean(i === currentQuestionIndex),
    });
  }

  return (
    <div className='flex justify-center gap-2'>
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
