import React from 'react';
import ResultsView from '@features/quiz/components/ResultsView';
import { getAuthenticatedUser } from '@server/db/get-authenticated-user';

export const metadata = {
  title: 'Results',
  description: 'View your quiz results.',
};

const Results = async () => {
  const user = await getAuthenticatedUser();

  return (
    <div className='h-full'>
      <ResultsView user={user ?? null} />
    </div>
  );
};

export default Results;
