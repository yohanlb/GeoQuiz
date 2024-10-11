import React from 'react';
import ReactCountryFlag from 'react-country-flag';
import { navigationLinks } from '@lib/navigationLinks';
import { getCountriesById, getCountryById } from '@utils/db/countries';
import Link from 'next/link';

type Props = {
  params: {
    countryId: CountryData['id'];
  };
};

export async function generateMetadata({ params }: Props) {
  const { countryId } = params;
  const country = await getCountryById(countryId);

  return {
    title: `What is the capital of ${country.name}?`,
    description: `Informations about the country ${country.name}.`,
  };
}

async function page({ params }: Props) {
  const country = await getCountryById(params.countryId);

  const neighboringCountries = await getCountriesById(
    country.closest_country_ids,
  );

  if (!country) {
    return <div>Country not found</div>;
  }

  return (
    <div className='flex flex-col items-center justify-center gap-4 text-center'>
      <h1 className='text-3xl'>
        What is the capital of <strong> {country.name} </strong>?
      </h1>
      <ReactCountryFlag
        className='inline-block'
        countryCode={country.iso2}
        svg
        aria-label={country.name}
        style={{
          width: '30%',
          height: 'auto',
        }}
      />
      <h2 className='text-2xl'>
        The capital of <strong>{country.name}</strong> is{' '}
        <strong className='underline'>{country.capital}</strong>.
      </h2>
      <div className='mt-12 md:mt-24'>
        <h3>Neighboring countries:</h3>
        <ul className='flex flex-wrap justify-center gap-2'>
          {neighboringCountries.map((country) => (
            <li key={country.id}>
              <ReactCountryFlag
                className='inline-block'
                countryCode={country.iso2}
                svg
                aria-label={country.name}
                style={{
                  width: '20px',
                  height: 'auto',
                  marginRight: '2px',
                }}
              />
              <Link
                className='text-blue-500 underline'
                href={`${navigationLinks.ressources.href}/what-is-capital-of/${country.id}`}
              >
                {country.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default page;
