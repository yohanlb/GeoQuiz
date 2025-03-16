import React from 'react';
import CotdPageContent from '@features/daily/components/CotdPageContent';
import { generateCountryOfTheDayQuestion } from '@features/daily/server/services/prepare-mystery-country-question';
import { PROJECT_FEATURES } from '@lib/data/consts';
import { formatWithFeatureName } from '@lib/logging/logging-server-actions';
import { log } from '@logtail/next';

export const metadata = {
  title: 'Mystery Country',
  description: 'Find the mystery country of the day!',
};

async function MysteryCountryPage() {
  const dailyQuestion = await generateCountryOfTheDayQuestion();

  // TODO: remove log after testing data isn't cached.
  log.info(
    formatWithFeatureName(
      `Data fetch completed (${dailyQuestion.countryName})`,
      PROJECT_FEATURES.MysteryCountry,
    ),
  );

  return (
    <div className='mx-auto flex max-w-md flex-col gap-6 px-4 py-2 md:px-0'>
      <header>
        <h1 className='font text-left text-lg md:text-xl'>Mystery Country</h1>
      </header>
      <CotdPageContent dailyQuestion={dailyQuestion} />
    </div>
  );
}

export default MysteryCountryPage;
