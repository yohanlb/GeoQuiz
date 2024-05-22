import { getCountryById } from '@/src/queries/countries';
import PageCenteredLink from '@components/_commons/PageCenteredLink';
import SectionTitle from '@components/_commons/SectionTitle';
import CountryShape from '@components/quiz/CountryShape';
import React from 'react';

type Props = {
  params: { countryId: number };
};

const Country = async ({ params }: Props) => {
  const country = await getCountryById(params.countryId);

  return (
    <div className='mx-auto flex max-w-md flex-col gap-2 px-2 py-2 md:px-0'>
      <SectionTitle text={country.name} />
      <CountryShape countryCode={country.iso2} />
      <ul>
        <li>Capital: {country.capital}</li>
        <li>
          Flag: <span className='font-emoji'>{country.emoji}</span>
        </li>
        <li>Region: {country.region}</li>
      </ul>
      <PageCenteredLink href='/countries' label='Back' />
    </div>
  );
};

export default Country;
