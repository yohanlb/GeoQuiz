'use client';

import React from 'react';
import { UserContext } from '@lib/contexts/UserProvider';

function AnonymousWarning() {
  const { user } = React.useContext(UserContext);
  if (user) return null;
  return (
    <div className='text-md text-center font-semibold text-gray-200'>
      <p>(You need to be logged in to save your progress.)</p>
    </div>
  );
}

export default AnonymousWarning;
