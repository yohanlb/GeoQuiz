import React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import AnswerButtonFlag from './AnswerButtonFlag';
import { OptionsFlag } from './QuestionView';

type AnswerButtonsListProps = {
  options: OptionsFlag[];
  handleClick: (value: string) => void;
};

function AnswerButtonsFlagList({
  options,
  handleClick,
}: AnswerButtonsListProps) {
  useHotkeys('1', () => handleClick(options[0].codeIso2), [options]);
  useHotkeys('2', () => handleClick(options[1].codeIso2), [options]);
  useHotkeys('3', () => handleClick(options[2].codeIso2), [options]);
  useHotkeys('4', () => handleClick(options[3].codeIso2), [options]);

  return (
    <ul className='flex flex-wrap items-center justify-center gap-2 py-2 md:flex-row md:gap-8'>
      {options.map((option, index) => (
        <li key={option.codeIso2} className='w-1/3 text-center'>
          <AnswerButtonFlag
            option={option}
            handleClick={handleClick}
            index={index}
          />
        </li>
      ))}
    </ul>
  );
}

export default AnswerButtonsFlagList;
