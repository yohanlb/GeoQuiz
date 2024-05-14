import React from 'react';
import clsx from 'clsx';

export type AnswerOptionButton = {
  text: string;
  state: 'DEFAULT' | 'DISABLED' | 'SUCCESS';
};

type AnswerButtonProps = {
  option: AnswerOptionButton;
  index: number;
  handleClick: (value: string) => void;
};

function AnswerButton({
  handleClick,
  index,
  option = {
    text: 'text',
    state: 'DEFAULT',
  },
}: AnswerButtonProps) {
  const buttonStyle = clsx(
    'w-full border border-gray-700 drop-shadow-lg',
    'py-2 px-2 leading-6 rounded-md',
    'inline-flex items-center justify-center relative ',

    // Text
    'font-light antialiased',
    'text-md',
    'text-white',
    'capitalize',
    'tracking-wide',

    // Hover
    {
      'hover:border-slate-300 hover:text-slate-300': option.state === 'DEFAULT',
    },

    // Active
    { 'active:bg-slate-50 active:text-slate-950': option.state === 'DEFAULT' },

    // SUCCESS
    {
      'bg-green-500 text-white border-transparent': option.state === 'SUCCESS',
    },

    // DISABLED
    {
      'line-through border-slate-600 text-slate-500 cursor-default':
        option.state === 'DISABLED',
    },
  );

  const onClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if (['DISABLED', 'SUCCESS'].includes(option.state)) {
      return;
    }
    handleClick(option.text);
  };

  return (
    <button type='button' className={buttonStyle} onClick={onClick}>
      {`${index + 1}. ${option.text} `}
    </button>
  );
}

export default AnswerButton;
