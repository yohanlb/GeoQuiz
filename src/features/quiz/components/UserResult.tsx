import React from 'react';
import useGameStore from '@stores/game-store';

type Props = {
  questionIndex: number;
};

function UserResult({ questionIndex }: Readonly<Props>) {
  const { userCountryResults } = useGameStore();

  return userCountryResults[questionIndex].result === 'valid' ? (
    <span className='text-green-500'>✓</span>
  ) : (
    <span className='text-red-500'>✗</span>
  );
}

export default UserResult;
