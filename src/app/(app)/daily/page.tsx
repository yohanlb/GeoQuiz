import React from 'react';
import { navigationLinks } from '@lib/data/navigation-links';
import Image from 'next/image';
import Link from 'next/link';
import MysteryCountryIllustration from '@assets/mystery-country-illustration.png';
import SectionTitle from '@components/global/SectionTitle';

function Page() {
  return (
    <div className='flex flex-col gap-6 p-4 md:p-0'>
      <SectionTitle variant='h2' centered text='Daily Challenges 🌎' />
      <Link
        href={navigationLinks.mysteryCountry.href}
        className='block w-full transition-opacity hover:opacity-90'
      >
        <div className='transition-bg flex w-full items-center gap-4 overflow-hidden rounded-lg bg-stone-400/5 p-2 hover:bg-stone-400/10 md:gap-6 md:p-4'>
          <div className='relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md md:h-24 md:w-24'>
            <Image
              src={MysteryCountryIllustration}
              alt='Mystery Country Illustration'
            />
          </div>
          <div className='flex flex-grow flex-col justify-center'>
            <h2 className='mb-2 text-xl font-bold text-gray-100'>
              {navigationLinks.mysteryCountry.label}
            </h2>
            <p className='text-lg text-gray-400'>A new country every day!</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Page;
