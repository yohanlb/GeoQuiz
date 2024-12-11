import React from 'react';
import ShareMysteryCountryResultsButton from '@features/daily/components/ShareMysteryCountryResultsButton';
import { navigationLinks } from '@lib/data/navigation-links';
import PageCenteredLink from '@components/global/PageCenteredLink';

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
    <div className='mt-4 flex w-full flex-col items-center gap-2 md:gap-4'>
      <div className='flex items-center gap-2'>
        <p className='text-xl font-bold md:text-2xl'>
          {score}/{totalQuestions}
        </p>
        <span>-</span>
        <p className='text-md md:text-lg'>{getScoreMessage()}</p>
      </div>
      <ShareMysteryCountryResultsButton
        score={score}
        totalQuestions={totalQuestions}
      />
      <p className='mt-2 text-sm md:text-base'>
        Come back tomorrow for a new challenge!
      </p>
      <PageCenteredLink href={navigationLinks.home.href} label='Back' />
    </div>
  );
};

export default QuizScore;
