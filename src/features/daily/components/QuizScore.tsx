import React from 'react';
import { navigationLinks } from '@lib/data/navigation-links';
import PageCenteredLink from '@components/_commons/PageCenteredLink';

type Props = {
  score: number;
  totalQuestions: number;
};

const QuizScore: React.FC<Props> = ({ score, totalQuestions }) => {
  const getScoreMessage = () => {
    const percentage = (score / totalQuestions) * 100;

    if (percentage === 100) {
      return 'Perfect score! Great job!';
    } else if (percentage >= 75) {
      return 'Nice work!';
    } else if (percentage >= 50) {
      return 'Good effort!';
    } else {
      return 'Need some practice!';
    }
  };

  return (
    <div className='mt-4 flex w-full flex-col items-center'>
      <p>
        {score}/{totalQuestions}
      </p>
      <p className='text-sm'>{getScoreMessage()}</p>
      <p className='mt-2 text-sm'>Come back tomorrow for a new challenge!</p>
      <PageCenteredLink href={navigationLinks.home.href} label='Back' />
    </div>
  );
};

export default QuizScore;
