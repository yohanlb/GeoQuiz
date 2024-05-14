import React from 'react';
import AnswerButton, { AnswerOptionButton } from './AnswerButton';

type AnswerButtonsListProps = {
  options: AnswerOptionButton[];
  handleClick: (value: string) => void;
};

function AnswerButtonsList({ options, handleClick }: AnswerButtonsListProps) {
  return (
    <ul className='items- flex flex-col justify-between gap-2 py-2 md:flex-row md:flex-wrap md:gap-4'>
      {options.map((option, index) => (
        <li key={option.text} className='w-full md:w-60'>
          <AnswerButton
            option={option}
            handleClick={handleClick}
            index={index}
          />
        </li>
      ))}
    </ul>
  );
}

export default AnswerButtonsList;
