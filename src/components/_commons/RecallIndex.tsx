import { useCountryScores } from '@/src/hooks/useCountryScores';
import { calculateRecallIndex } from '@lib/utils/score';
import React from 'react';

const RecallIndex = ({ countryId }: { countryId: CountryData['id'] }) => {
  const { getCountryScores } = useCountryScores();
  const userCountryScores = getCountryScores(countryId).capital;

  const index = userCountryScores ? calculateRecallIndex(userCountryScores) : 0;
  const clampedIndex = Math.max(Math.min(index, 10), 0);

  return (
    <div className='flex h-6 w-6 items-center justify-center overflow-hidden rounded-full'>
      <div
        className={`flex h-full w-full items-center justify-center ${
          clampedIndex >= 6.6
            ? 'bg-green-500'
            : clampedIndex >= 3.3
              ? 'bg-yellow-500'
              : 'bg-red-500'
        }`}
      >
        <span>{index.toFixed(1)}</span>
      </div>
    </div>
  );
};

export default RecallIndex;
