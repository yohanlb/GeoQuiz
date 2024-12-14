import React from 'react';
import DifficultyIndex from './DifficultyIndex';
import PopoverCustom from './Popover';

type Props = {
  value: number;
  type?: 'country' | 'deck';
  size?: 'xl' | 'md' | 'sm';
};

export function calculateDifficultyRank(value: number) {
  if (value >= 100) return 0;
  if (value < 0) return 9;
  return 9 - Math.floor(value / 10);
}

const DifficultyIndicator = ({ value, type = 'country', size }: Props) => {
  const difficultyRank = calculateDifficultyRank(value);

  const contentDescription =
    type === 'country' ? (
      <div className='text-left'>
        <p>Difficulty Index: {difficultyRank}</p>
        <p>Average community score for this country: {Math.round(value)}%</p>
      </div>
    ) : (
      <div className='text-left'>
        <p>Average Difficulty Index: {difficultyRank}</p>
        <p>
          Average difficulty for the countries included in this deck:{' '}
          {Math.round(value)}%
        </p>
      </div>
    );
  return (
    <PopoverCustom content={contentDescription}>
      <DifficultyIndex digit={difficultyRank} size={size} />
    </PopoverCustom>
  );
};

export default DifficultyIndicator;
