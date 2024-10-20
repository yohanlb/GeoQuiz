'use client';

import React from 'react';
import ReactCountryFlag from 'react-country-flag';
import { navigationLinks } from '@data/navigationLinks';
import { toCamelCase } from '@lib/utils/utils';
import { Card, CardBody, Tab, Tabs } from '@nextui-org/react';
import Link from 'next/link';
import SectionTitle from '@components/_commons/SectionTitle';

type Props = {
  groupedCountries: GroupedCountries;
};

const CountriesTabs = ({ groupedCountries }: Props) => {
  return (
    <div className='flex w-full flex-col'>
      <Tabs aria-label='Continents' variant='underlined'>
        {Object.entries(groupedCountries).map(([region, subregions]) => (
          <Tab key={region} title={region}>
            <div className='flex flex-col gap-6'>
              {Object.entries(subregions)
                .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
                .map(([subregion, countries]) => (
                  <Card className='group' key={subregion}>
                    <CardBody>
                      <SectionTitle text={subregion} variant='h3' />
                      <ul className='dot columns-3 md:columns-4'>
                        {countries.map((country) => (
                          <li
                            key={country.id}
                            className='flex items-center justify-start gap-1 text-sm font-thin hover:font-light md:text-base'
                          >
                            <ReactCountryFlag
                              countryCode={country.iso2}
                              svg
                              aria-label={country.name}
                            />{' '}
                            <Link href={`/countries/${country.id}`}>
                              {country.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <div className='flex justify-end'>
                        <Link
                          className='underline-offset-2 opacity-70 hover:underline group-hover:opacity-100'
                          href={
                            navigationLinks.allDecks.href +
                            `/${toCamelCase(subregion)}`
                          }
                        >
                          See Deck
                        </Link>
                      </div>
                    </CardBody>
                  </Card>
                ))}
            </div>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default CountriesTabs;
