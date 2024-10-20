import React from 'react';
import { navigationLinks } from '@data/navigationLinks';
import { getAllCountriesGrouped } from '@lib/queries/countries';
import dynamic from 'next/dynamic';
import PageCenteredLink from '@components/_commons/PageCenteredLink';
import SectionTitle from '@components/_commons/SectionTitle';

const CountriesTabs = dynamic(
  () => import('@components/countries/CountriesTabs'),
  {
    ssr: false,
  },
);

export const metadata = {
  title: 'Countries',
  description: 'Explore all countries.',
};

const Country = async () => {
  const groupedCountries = await getAllCountriesGrouped();

  return (
    <div className='mx-auto flex flex-col gap-2 px-2 py-2 md:px-0'>
      <SectionTitle text='Countries' />
      <CountriesTabs groupedCountries={groupedCountries} />
      <PageCenteredLink href={navigationLinks.home.href} label='Back' />
    </div>
  );
};

export default Country;
