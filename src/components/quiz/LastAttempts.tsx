import React from 'react';

const LastAttempts = ({ results }: { results: boolean[] }) => {
  return (
    <div className='flex items-center space-x-1'>
      {results
        .slice(-10)
        .reverse()
        .map((result, index) => (
          <span
            key={index}
            className={`${result ? 'text-green-500' : 'text-red-500'}`}
          >
            {result ? '✔' : '✘'}
          </span>
        ))}
    </div>
  );
};

export default LastAttempts;
