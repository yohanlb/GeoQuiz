import React from 'react';
import ReactCountryFlag from 'react-country-flag';
import DifficultyIndicator from '@components/global/DifficultyIndicator';

type Props = {
  countryData: CountryCompleteViewRecord;
  hideFlag?: boolean;
};

const CountryDescription = ({ countryData, hideFlag = false }: Props) => {
  let displayedName = countryData.name;
  if (countryData.sovereignCountry) {
    displayedName += ` (${countryData.sovereignCountry})`;
  }

  //TODO: switch score depending on question type, but for now there is not enough data for flags.
  const averageCommunityScore = (countryData.success_rate_capital ?? 0.5) * 100;

  return (
    <div className='text-sm'>
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
          <div className='flex items-center gap-2'>
            <span>Difficulty: </span>
            <DifficultyIndicator value={averageCommunityScore} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDescription;
