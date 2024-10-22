import React from 'react';
import { navigationLinks } from '@lib/data/navigation-links';
import { getAllCountriesGrouped } from '@lib/queries/countries';
import dynamic from 'next/dynamic';
import PageCenteredLink from '@components/global/PageCenteredLink';
import SectionTitle from '@components/global/SectionTitle';

const CountriesTabs = dynamic(
  () => import('@features/countries/components/CountriesTabs'),
  {
    ssr: false,
  },
);

export const revalidate = 60 * 60; // 1 hour

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
