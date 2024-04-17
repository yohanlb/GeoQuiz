import React from 'react';

type AnswerCircleProps = {
  status: UserResultsStatus;
  isCurrentQuestion?: boolean;
};

const AnswerCircle: React.FC<AnswerCircleProps> = ({
  status,
  isCurrentQuestion = false,
}) => {
  let circleColor = 'border border-white'; // default state
  if (status === 'valid') {
    circleColor = 'bg-green-500';
  } else if (status === 'invalid') {
    circleColor = 'bg-red-500 ';
  }
  const borderSize = isCurrentQuestion ? 'border border-2' : 'border-1';

  return (
    <div
      className={`flex h-4 w-4 items-center justify-center rounded-full md:h-6 md:w-6 ${circleColor} ${borderSize}`}
    />
  );
};

export default AnswerCircle;
