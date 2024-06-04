import React from 'react';
import ReactCountryFlag from 'react-country-flag';
import formatCountrySuccessPercentage from '@lib/utils/countryStats';
import RecallIndex from '@components/_commons/RecallIndex';
import LastAttempts from './LastAttempts';

type Props = {
  countryData: CountryData;
  countryScores: boolean[];
  hideFlag?: boolean;
};

const CountryDescription = ({
  countryData,
  countryScores,
  hideFlag = false,
}: Props) => {
  let displayedName = countryData.name;
  if (countryData.sovereignCountry) {
    displayedName += ` (${countryData.sovereignCountry})`;
  }

  return (
    <div className='text-left '>
      <h1 className='text-3xl md:text-5xl'>
        {!hideFlag && (
          <ReactCountryFlag
            countryCode={countryData.iso2}
            svg
            aria-label={countryData.name}
            style={{ marginRight: '0.5rem' }}
          />
        )}
        {displayedName}
      </h1>
      <div className='text-xs'>
        <p>
          <span>Continent: </span>
          <strong className='font-semibold italic'>
            {countryData.subregion}
          </strong>
        </p>
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
        <div>
          <span>Memory Index: </span>
          <div className='inline-block'>
            <RecallIndex countryId={countryData.id} />
          </div>
        </div>
        <p>
          <span>Community average: </span>
          <strong className='font-semibold italic'>
            {formatCountrySuccessPercentage(countryData)}
          </strong>
        </p>
      </div>
    </div>
  );
};

export default CountryDescription;
