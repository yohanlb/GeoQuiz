import React from 'react';
import ReactCountryFlag from 'react-country-flag';
import { FaRegFlag } from 'react-icons/fa6';
import { PiCity } from 'react-icons/pi';
import { calculateCountrySuccessPercentage } from '@features/quiz/utils/countryStats';
import DifficultyIndicator from '@components/global/DifficultyIndicator';

type Props = {
  countryData: CountryRecord;
  countryStats: CountryStatsRecord;
  hideFlag?: boolean;
};

const CountryDescription = ({
  countryData,
  countryStats,
  hideFlag = false,
}: Props) => {
  let displayedName = countryData.name;
  if (countryData.sovereignCountry) {
    displayedName += ` (${countryData.sovereignCountry})`;
  }

  const { successRateCapital, successRateFlag } =
    calculateCountrySuccessPercentage(countryStats);

  return (
    <div className='text-sm' data-test='country-description'>
      <div className='flex items-center gap-2'>
        {!hideFlag && (
          <ReactCountryFlag
            countryCode={countryData.iso2}
            svg
            aria-label={countryData.name}
            style={{ fontSize: '3rem' }}
          />
        )}
        <h1 className='text-3xl md:text-5xl'>{displayedName}</h1>
      </div>

      <div className='flex w-full flex-col gap-2 text-xs md:flex-row md:justify-between md:text-base'>
        <div>
          <p>
            <span>Region: </span>
            <strong className='font-semibold italic'>
              {countryData.subregion}
            </strong>
          </p>
          <div className='flex flex-col gap-1'>
            <div className='flex items-center gap-2'>
              <span>Difficulty:</span>
              <div className='flex items-center gap-4'>
                <div className='flex items-center gap-1'>
                  <PiCity />
                  <DifficultyIndicator
                    value={successRateCapital}
                    type='country'
                  />
                </div>
                <div className='flex items-center gap-1'>
                  <FaRegFlag />
                  <DifficultyIndicator value={successRateFlag} type='country' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDescription;
