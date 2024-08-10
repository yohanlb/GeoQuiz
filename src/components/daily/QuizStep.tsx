import React from 'react';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { Guesses } from '@lib/types/daily';
import { Button } from '@components/ui/button';

export type StepStatus = 'default' | 'success' | 'error';

type QuizStepProps = {
  step: number;
  currentStep: number;
  title: string;
  stepGuessStatus?: Guesses[keyof Guesses];
  children: React.ReactNode;
  handleNext?: () => void;
};

const QuizStep: React.FC<QuizStepProps> = ({
  step,
  currentStep,
  title,
  stepGuessStatus = null,
  children,
  handleNext = null,
}) => {
  const isContentVisible = currentStep >= step;
  const isActive = currentStep === step || currentStep === step + 1;
  const isNextButtonActive = currentStep === step + 1;

  const getResultTitleIcon = () => {
    if (stepGuessStatus === null) {
      return null;
    } else if (stepGuessStatus === true) {
      return <FiCheckCircle className='text-lg text-green-500' />;
    } else {
      return <FiXCircle className='text-lg text-red-500' />;
    }
  };
  return (
    <li className='my-2 ms-4 flex flex-col gap-3'>
      <div className='absolute -start-1.5 mt-1 h-3 w-3 rounded-full bg-gray-200'></div>
      <p className='flex items-center gap-1 text-sm text-gray-300'>
        {title}
        {getResultTitleIcon()}
      </p>
      <div className='flex justify-center'>{isContentVisible && children}</div>
      {isActive && handleNext && (
        <div className='flex justify-end'>
          <Button onClick={handleNext} size='sm' disabled={!isNextButtonActive}>
            Next
          </Button>
        </div>
      )}
    </li>
  );
};

export default QuizStep;
