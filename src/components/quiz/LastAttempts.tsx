import React from 'react';

const LastAttempts = ({ results }: { results: boolean[] }) => {
  const lastResults = [...results].slice(-5);

  return (
    <div className='flex flex-row-reverse items-center gap-1'>
      {[...Array(5 - lastResults.length)].map((_, index) => (
        // show placeholder if not enough results.
        <span key={index} className='space-x-3 font-mono text-sm'>
          _
        </span>
      ))}
      {lastResults.map((result, index) => (
        <span
          key={index}
          className={`font-mono text-sm ${result ? 'text-green-500' : 'text-red-500'}`}
        >
          {result ? '✔' : '✘'}
        </span>
      ))}
    </div>
  );
};

export default LastAttempts;
