'use client';

import React from 'react';
import { FaRegFlag } from 'react-icons/fa6';
import { PiCity } from 'react-icons/pi';
import useGameStore from '@stores/game-store';
import { cn } from '@utils/utils';
import { motion } from 'framer-motion';

type QuestionTypeButtonProps = {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
};

function QuestionTypeButton({
  icon,
  label,
  isActive,
  onClick,
}: Readonly<QuestionTypeButtonProps>) {
  const IconWithClass = React.cloneElement(
    icon as React.ReactElement<{ className?: string }>,
    {
      className: cn(
        'size-7 transition-all duration-200 group-hover:fill-white',
        isActive ? 'fill-white' : 'fill-gray-400',
      ),
    },
  );

  return (
    <motion.button
      type='button'
      onClick={onClick}
      disabled={isActive}
      className={
        'group flex h-20 w-24 flex-col items-center justify-center rounded-md border border-gray-300'
      }
      whileTap={{ scale: 0.9 }}
      style={isActive ? { borderColor: 'white', borderWidth: '3px' } : {}}
      transition={{ duration: 0.1 }}
    >
      <div>{IconWithClass}</div>
      <span
        className={cn(
          'text-sm group-hover:text-white',
          isActive ? 'font-medium text-white' : 'text-gray-300',
        )}
      >
        {label}
      </span>
    </motion.button>
  );
}

function SelectQuestionType() {
  const { setQuestionType, questionType } = useGameStore();

  return (
    <div className='flex justify-center gap-4'>
      <QuestionTypeButton
        icon={<PiCity />}
        label='Capitals'
        isActive={questionType === 'CountryToCapital'}
        onClick={() => setQuestionType('CountryToCapital')}
      />
      <QuestionTypeButton
        icon={<FaRegFlag />}
        label='Flags'
        isActive={questionType === 'CountryToFlag'}
        onClick={() => setQuestionType('CountryToFlag')}
      />
    </div>
  );
}

export default SelectQuestionType;
