import React from 'react';
import DifficultyIndex from './DifficultyIndex';
import PopoverCustom from './Popover';

type Props = {
  value: number;
  type?: 'country' | 'deck';
  size?: 'xl' | 'md' | 'sm';
};

const clampNumber = (num: number) => Math.min(9, Math.max(0, Math.ceil(num)));

const DifficultyIndicator = ({ value, type = 'country', size }: Props) => {
  const difficultyIndex = 9 - Math.round(value / 10);
  const clampedNumber = clampNumber(difficultyIndex);

  const contentDescription =
    type === 'country' ? (
      <div className='text-left'>
        <p>Difficulty Index: {clampedNumber}</p>
        <p>Average community score for this country: {Math.round(value)}%</p>
      </div>
    ) : (
      <div className='text-left'>
        <p>Average Difficulty Index: {clampedNumber}</p>
        <p>
          Average difficulty for the countries included in this deck:{' '}
          {Math.round(value)}%
        </p>
      </div>
    );
  return (
    <PopoverCustom content={contentDescription}>
      <DifficultyIndex digit={clampedNumber} size={size} />
    </PopoverCustom>
  );
};

export default DifficultyIndicator;
