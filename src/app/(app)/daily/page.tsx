import React from 'react';
import CotdPageContent from '@components/daily/CotdPageContent';

export const metadata = {
  title: 'Country of the Day',
  description: 'Play the country of the day quiz.',
};

async function CountryOfTheDayPage() {
  return (
    <div className='mx-auto flex max-w-md flex-col gap-6 px-4 py-2 md:px-0'>
      <header>
        <h1 className='font text-left text-xl'>Country of the Day</h1>
      </header>
      <CotdPageContent />
    </div>
  );
}

export default CountryOfTheDayPage;
