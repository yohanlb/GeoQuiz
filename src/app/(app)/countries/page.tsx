import React from 'react';
import { getAllCountriesGrouped } from '@/src/queries/countries';
import { navigationLinks } from '@lib/navigationLinks';
import dynamic from 'next/dynamic';
import PageCenteredLink from '@components/_commons/PageCenteredLink';
import SectionTitle from '@components/_commons/SectionTitle';

const CountriesTabs = dynamic(
  () => import('@components/countries/CountriesTabs'),
  {
    ssr: false,
  },
);

const Country = async () => {
  const groupedCountries = await getAllCountriesGrouped();
  // countries.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className='mx-auto flex flex-col gap-2 px-2 py-2 md:px-0'>
      <SectionTitle text='Countries' />
      <CountriesTabs groupedCountries={groupedCountries} />
      <PageCenteredLink href={navigationLinks.home.href} label='Back' />
    </div>
  );
};

export default Country;
