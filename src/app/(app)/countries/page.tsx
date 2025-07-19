import React from 'react';
import { getAllCountries } from '@/src/shared/server/db/countries-rest';
import { groupCountriesByRegionAndSubregion } from '@/src/shared/utils/countries';
import CountriesTabs from '@features/countryExplorer/components/CountriesTabs';
import { navigationLinks } from '@lib/data/navigation-links';
import PageCenteredLink from '@components/global/PageCenteredLink';
import SectionTitle from '@components/global/SectionTitle';

export const revalidate = 3600; // 1 hour

export const metadata = {
  title: 'Countries - Explore All Countries of the World | GeoQuiz',
  description:
    'Discover and explore all countries of the world. Learn about capitals, flags, geography, and more with our comprehensive country database. Perfect for geography enthusiasts and students.',
  keywords:
    'countries, world countries, geography, capitals, flags, country database, world map, geography quiz',
};

const Country = async () => {
  const allCountries = await getAllCountries();
  const groupedCountries = groupCountriesByRegionAndSubregion(allCountries);

  return (
    <div className='mx-auto flex flex-col gap-2 px-2 py-2 md:px-0'>
      <SectionTitle text='Countries of the World' />
      <CountriesTabs groupedCountries={groupedCountries} />
      <PageCenteredLink href={navigationLinks.home.href} label='Back' />
    </div>
  );
};

export default Country;
