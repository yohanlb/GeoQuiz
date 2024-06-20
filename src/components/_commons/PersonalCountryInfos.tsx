import React from 'react';
import LastAttempts from '../quiz/LastAttempts';

type Props = {
  countryId: CountryData['id'];
};

const PersonalCountryInfos = ({ countryId }: Props) => {
  return (
    <div className='flex flex-col items-end justify-end'>
      <span>Last Attempts</span>
      <div>
        <div className='inline-block'>
          <LastAttempts countryId={countryId} />
        </div>
      </div>
    </div>
  );
};

export default PersonalCountryInfos;
