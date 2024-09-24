'use client';

import React from 'react';
import useGameStore from '@/src/utils/stores/gameStore';
import { navigationLinks } from '@lib/navigationLinks';
import Link from 'next/link';
import LoadingSpinner from '@components/_commons/LoadingSpinner';
import PageCenteredLink from '@components/_commons/PageCenteredLink';
import LinkToDeck from './LinkToDeck';
import ResultsTable from './ResultsTable';
import ShareResults from './ShareResults';

function ResultsView() {
  const { answeredQuestions, isGameStoreInitialized, deck } = useGameStore();

  // TODO: doesn't handle if deck is null, for dynamic deck
  const retryUrl = deck ? navigationLinks.quiz.href + '/' + deck?.name : null;

  const averageRightAnswers =
    answeredQuestions.reduce(
      (total, question) => total + (question.isCorrect ? 1 : 0),
      0,
    ) / answeredQuestions.length;

  const formattedCorrectAnswers = Math.round(averageRightAnswers * 100);

  if (!isGameStoreInitialized) {
    return (
      <div className='flex h-full flex-col items-center justify-evenly gap-4 pb-3 md:px-0 md:py-2'>
        <p className='text-xl'>Loading Results...</p>
        <LoadingSpinner />
      </div>
    );
  }

  if (answeredQuestions.length <= 0) {
    return (
      <div className='flex h-full flex-col items-center justify-center pb-3 md:px-0 md:py-2'>
        <div className='flex flex-col items-center gap-4 text-center'>
          <p className='text-xl'>Now Result to show!</p>
          <p>Choose a deck and start playing to see your results</p>
          <PageCenteredLink
            href={navigationLinks.allDecks.href}
            label='See all decks'
          />
        </div>
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
      <div className='flex flex-wrap items-center justify-center gap-2 px-1 text-xl tracking-wider'>
        <p>{formattedCorrectAnswers}% of correct answers!</p>
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

        {retryUrl && (
          <Link href={retryUrl}>
            <button
              type='submit'
              className='w-36 rounded-lg bg-gray-300 py-2 text-xl font-normal text-gray-800 md:w-60 md:text-2xl'
            >
              Retry
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default ResultsView;
