import React from 'react';
import AnswerButton, { AnswerOptionButton } from './AnswerButton';

type AnswerButtonsListProps = {
  options: AnswerOptionButton[];
  handleClick: (value: string) => void;
};

function AnswerButtonsList({ options, handleClick }: AnswerButtonsListProps) {
  return (
    <ul className='flex flex-col items-center gap-2 md:gap-3'>
      {options.map((option) => (
        <li key={option.text} className='w-full'>
          <AnswerButton option={option} handleClick={handleClick} />
        </li>
      ))}
    </ul>
  );
}

export default AnswerButtonsList;
