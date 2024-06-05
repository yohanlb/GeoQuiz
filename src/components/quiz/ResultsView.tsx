import React from 'react';
import useGameStore from '@/src/stores/gameStore';
import { navigationLinks } from '@lib/navigationLinks';
import { calculateNewDeckScore } from '@lib/utils/score';
import Link from 'next/link';
import ResultsTable from './ResultsTable';
import ShareResults from './ShareResults';

type ResultsViewProps = {
  questions: Question[];
  handleRestart: () => void;
};

function ResultsView({ questions, handleRestart }: ResultsViewProps) {
  const { userResults } = useGameStore();

  const newDeckScore = calculateNewDeckScore(userResults, questions.length);

  return (
    <div className='flex h-full flex-col items-center justify-evenly gap-4 pb-3 md:px-0 md:py-2'>
      <h1 className='text-5xl font-bold uppercase italic tracking-wider'>
        Results
      </h1>
      <ResultsTable questions={questions} />
      <div className='flex flex-wrap items-center justify-center gap-2 text-xl tracking-wider'>
        <p>{newDeckScore}% of correct answers!</p>
        <ShareResults questions={questions} />
      </div>
      <div className='flex gap-6 md:gap-16'>
        <Link href={navigationLinks.home.href}>
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
