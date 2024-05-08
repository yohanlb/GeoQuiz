import Link from 'next/link';
import React from 'react';
import ResultsTable from './ResultsTable';

type ResultsViewProps = {
  questions: Question[];
  userResults: UserResults;
  handleRestart: () => void;
};

function ResultsView({
  questions,
  userResults,
  handleRestart,
}: ResultsViewProps) {
  const numberOfCorrectAnswers = userResults.reduce(
    (count, result) => count + (result === 'valid' ? 1 : 0),
    0,
  );
  const correctAnswerPercentage =
    Math.round((numberOfCorrectAnswers / questions.length) * 1000) / 10;

  return (
    <div className='mt-2 flex h-full flex-col items-center justify-evenly pb-4 md:mt-8'>
      <h1 className='text-5xl font-bold uppercase italic tracking-wider'>
        Results
      </h1>

      <ResultsTable questions={questions} userResults={userResults} />

      <div className='text-xl tracking-wider'>
        <p>{correctAnswerPercentage}% of correct answers!</p>
      </div>

      <div className='flex gap-6 md:gap-16'>
        <Link href='/'>
          <button
            type='submit'
            className='w-36 rounded-lg border border-gray-700 py-2 text-xl font-normal md:w-60 md:text-2xl'
          >
            Home
          </button>
        </Link>
        <button
          onClick={handleRestart}
          type='submit'
          className='w-36  rounded-lg bg-gray-300 py-2 text-xl font-normal text-gray-800 md:w-60 md:text-2xl'
        >
          Retry
        </button>
      </div>
    </div>
  );
}

export default ResultsView;
