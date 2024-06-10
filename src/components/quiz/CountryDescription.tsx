import React from 'react';
import ReactCountryFlag from 'react-country-flag';
import StarDifficultyDisplay from '@components/_commons/StarDifficultyDisplay';

type Props = {
  countryData: CountryData;
  hideFlag?: boolean;
};

const CountryDescription = ({ countryData, hideFlag = false }: Props) => {
  let displayedName = countryData.name;
  if (countryData.sovereignCountry) {
    displayedName += ` (${countryData.sovereignCountry})`;
  }

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

      <div className='flex w-full flex-col gap-2 text-xs md:flex-row md:justify-between'>
        <div>
          <p>
            <span>Region: </span>
            <strong className='font-semibold italic'>
              {countryData.subregion}
            </strong>
          </p>
          <div className='flex items-center gap-2'>
            <span>Difficulty: </span>
            <StarDifficultyDisplay
              percent={Math.round(countryData.success_rate * 100)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDescription;
