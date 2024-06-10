import React from 'react';

type Props = {
  value: number;
};

const NUMBER_OF_BARS = 5;

function HorizontalBars({ value }: Props) {
  const numberOfBarsActive = Math.round((value / 100) * NUMBER_OF_BARS);

  const getColor = (index: number) => {
    if (index > numberOfBarsActive) {
      return 'bg-default-300';
    }
    if (numberOfBarsActive > NUMBER_OF_BARS * 0.5) {
      return 'bg-green-500';
    }
    if (numberOfBarsActive > NUMBER_OF_BARS * 0.3) {
      return 'bg-yellow-500';
    }
    return 'bg-red-500';
  };

  return (
    <div className='flex items-center gap-0.5'>
      {[...Array(NUMBER_OF_BARS)].map((_, index) => (
        <div className={`h-4 w-1 ${getColor(index)}`} key={index}></div>
      ))}
    </div>
  );
}

export default HorizontalBars;
