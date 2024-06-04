import React from 'react';
import RecallIndex from '@components/_commons/RecallIndex';
import LastAttempts from './LastAttempts';

type Props = {
  countryScores: boolean[];
  countryId: CountryData['id'];
};

const PersonalCountryInfos = ({ countryScores, countryId }: Props) => {
  return (
    <div className='flex flex-col items-end justify-end'>
      <div>
        <span>Last Attempts: </span>
        <div className='inline-block'>
          {countryScores ? (
            <LastAttempts results={[...countryScores].reverse()} />
          ) : (
            <strong className='font-semibold italic'>Unplayed</strong>
          )}
        </div>
      </div>
      <div className='flex items-center gap-2 justify-end text-left'>
        <span>Memory Index: </span>
        <RecallIndex countryId={countryId} />
      </div>
    </div>
  );
};

export default PersonalCountryInfos;
