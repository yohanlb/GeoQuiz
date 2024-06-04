import React from 'react';
import ReactCountryFlag from 'react-country-flag';
import Gauge from '@components/_commons/Gauge';
import PersonalCountryInfos from './PersonalCountryInfos';

type Props = {
  countryData: CountryData;
  countryScores: boolean[];
  hideFlag?: boolean;
};

const CountryDescription = ({
  countryData,
  hideFlag = false,
  countryScores,
}: Props) => {
  let displayedName = countryData.name;
  if (countryData.sovereignCountry) {
    displayedName += ` (${countryData.sovereignCountry})`;
  }

  return (
    <div className='text-sm'>
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

      <div className='w-full flex flex-col md:flex-row md:justify-between gap-2'>
        <div>
          <p>
            <span>Continent: </span>
            <strong className='font-semibold italic'>
              {countryData.subregion}
            </strong>
          </p>
          <div className='flex items-center gap-2'>
            <span>Community average: </span>
            <div className='inline-block '>
              <Gauge value={Math.round(countryData.success_rate * 100)} />
            </div>
          </div>
        </div>

        <PersonalCountryInfos
          countryScores={countryScores}
          countryId={countryData.id}
        />
      </div>
    </div>
  );
};

export default CountryDescription;
