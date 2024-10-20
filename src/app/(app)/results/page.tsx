import React from 'react';
import { getAuthenticatedUser } from '@features/auth/server/db/get-authenticated-user';
import ResultsView from '@features/quiz/components/ResultsView';

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
