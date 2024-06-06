import React from 'react';
import { getCountryById } from '@/src/queries/countries';
import { navigationLinks } from '@lib/navigationLinks';
import PageCenteredLink from '@components/_commons/PageCenteredLink';
import DecksIncludingCountrySection from '@components/countries/DecksIncludingCountrySection';
import CountryDescription from '@components/quiz/CountryDescription';
import CountryShape from '@components/quiz/CountryShape';

type Props = {
  params: { countryId: number };
};

const Country = async ({ params }: Props) => {
  const country = await getCountryById(params.countryId);

  return (
    <div className='mx-auto flex max-w-md flex-col gap-12 px-2 py-2 md:px-0'>
      <CountryDescription countryData={country} />
      <CountryShape countryCode={country.iso2} />
      <DecksIncludingCountrySection countryId={country.id} />
      <PageCenteredLink
        href={navigationLinks.countries.href}
        label='All Countries'
      />
    </div>
  );
};

export default Country;
