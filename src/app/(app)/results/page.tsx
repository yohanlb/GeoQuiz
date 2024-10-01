import React from 'react';
import { getAuthenticatedUser } from '@utils/db/auth/get-authenticated-user';
import ResultsView from '@components/quiz/ResultsView';

const Results = async () => {
  const user = await getAuthenticatedUser();

  return (
    <div className='h-full'>
      <ResultsView user={user ?? null} />
    </div>
  );
};

export default Results;
