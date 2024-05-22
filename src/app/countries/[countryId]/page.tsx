import { getCountryById } from '@/src/queries/countries';
import PageCenteredLink from '@components/_commons/PageCenteredLink';
import CountryShape from '@components/quiz/CountryShape';
import React from 'react';

type Props = {
  params: { countryId: number };
};

const Country = async ({ params }: Props) => {
  const country = await getCountryById(params.countryId);

  let displayedName = country.name;
  if (country.sovereignCountry) {
    displayedName += ` (${country.sovereignCountry})`;
  }

  return (
    <div className='mx-auto flex max-w-md flex-col gap-2 px-2 py-2 md:px-0'>
      <h1 className='text-center text-3xl'>
        <span className='font-emoji'>{country.emoji}</span> {displayedName}
      </h1>
      <CountryShape countryCode={country.iso2} />
      <ul>
        <li>Capital: {country.capital}</li>
        <li>Region: {country.region}</li>
        <li>Subregion: {country.subregion}</li>
      </ul>
      <PageCenteredLink href='/countries' label='Back' />
    </div>
  );
};

export default Country;
