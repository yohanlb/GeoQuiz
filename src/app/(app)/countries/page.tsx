import React from 'react';
import CountriesTabs from '@features/countries/components/CountriesTabs';
import { getAllCountries } from '@features/countries/server/db/countries';
import { groupCountriesByRegionAndSubregion } from '@features/countries/utils/countries';
import { navigationLinks } from '@lib/data/navigation-links';
import PageCenteredLink from '@components/global/PageCenteredLink';
import SectionTitle from '@components/global/SectionTitle';

export const revalidate = 3600; // 1 hour

export const metadata = {
  title: 'Countries',
  description: 'Explore all countries.',
};

const Country = async () => {
  const allCountries = await getAllCountries();
  const groupedCountries = groupCountriesByRegionAndSubregion(allCountries);

  return (
    <div className='mx-auto flex flex-col gap-2 px-2 py-2 md:px-0'>
      <SectionTitle text='Countries' />
      <CountriesTabs groupedCountries={groupedCountries} />
      <PageCenteredLink href={navigationLinks.home.href} label='Back' />
    </div>
  );
};

export default Country;
