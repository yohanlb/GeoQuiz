import React from 'react';
import CotdPageContent from '@features/daily/components/CotdPageContent';

export const metadata = {
  title: 'Mystery Country',
  description: 'Find the mystery country of the day!',
};

async function CountryOfTheDayPage() {
  return (
    <div className='mx-auto flex max-w-md flex-col gap-6 px-4 py-2 md:px-0'>
      <header>
        <h1 className='font text-left text-xl'>Mystery Country</h1>
      </header>
      <CotdPageContent />
    </div>
  );
}

export default CountryOfTheDayPage;
