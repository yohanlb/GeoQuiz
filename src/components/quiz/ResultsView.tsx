'use client';

import React from 'react';
import useGameStore from '@/src/stores/gameStore';
import { navigationLinks } from '@lib/navigationLinks';
import Link from 'next/link';
import LoadingSpinner from '@components/_commons/LoadingSpinner';
import LinkToDeck from './LinkToDeck';
import ResultsTable from './ResultsTable';
import ShareResults from './ShareResults';

type ResultsViewProps = {
  handleRestart?: () => void;
};

function ResultsView({ handleRestart = () => {} }: ResultsViewProps) {
  const { answeredQuestions, isGameStoreInitialized } = useGameStore();

  const averageRightAnswers =
    answeredQuestions.reduce(
      (total, question) => total + (question.isCorrect ? 1 : 0),
      0,
    ) / answeredQuestions.length;

  if (!isGameStoreInitialized) {
    return (
      <div className='flex h-full flex-col items-center justify-evenly gap-4 pb-3 md:px-0 md:py-2'>
        <p className='text-xl'>Loading Results...</p>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className='flex h-full flex-col items-center justify-evenly gap-4 pb-3 md:px-0 md:py-2'>
      <div className='flex flex-col gap-1 md:gap-4'>
        <h1 className='text-5xl font-bold uppercase italic tracking-wider'>
          Results
        </h1>
        <LinkToDeck />
      </div>
      <ResultsTable />
      <div className='flex flex-wrap items-center justify-center gap-2 text-xl tracking-wider'>
        <p>{averageRightAnswers * 100}% of correct answers!</p>
        <ShareResults />
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
          className='w-36 rounded-lg bg-gray-300 py-2 text-xl font-normal text-gray-800 md:w-60 md:text-2xl'
        >
          Retry
        </button>
      </div>
    </div>
  );
}

export default ResultsView;
