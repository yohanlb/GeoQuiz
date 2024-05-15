'use client';
import React from 'react';
// import SettingsIcon from '@icons/SettingsWheelIcon.svg';
import GeoQuizLogoExpanded from '@assets/LogoExpanded.svg';
import GeoQuizLogoCompact from '@assets/LogoCompact.svg';
import HeaderHeroSeparator from '@assets/HeaderHeroSeparator.svg';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const ExpandedHeader = () => (
  <div className='grid grid-cols-5 grid-rows-1 gap-0 p-4'>
    <div className='col-span-3 col-start-2'>
      <Link href='/'>
        <Image
          src={GeoQuizLogoExpanded}
          alt='GeoQuiz Logo'
          className='mx-auto w-full'
        />
      </Link>
    </div>
    {/* <div className='col-start-5 flex items-start justify-end'>
      <button type='button' className='focus:outline-none'>
        <Image src={SettingsIcon} alt='Settings Icon' className='w-8 md:w-12' />
      </button>
    </div> */}
  </div>
);
const CompactHeader = () => (
  <div className='flex items-start justify-between px-4 pb-2 pt-3'>
    <Link href='/'>
      <Image
        src={GeoQuizLogoCompact}
        alt='GeoQuiz Logo'
        className='w-16 md:w-20'
      />
    </Link>
    {/* <button type='button' className='focus:outline-none'>
      <Image src={SettingsIcon} alt='Settings Icon' className='w-6 md:w-10' />
    </button> */}
  </div>
);

function NavBar() {
  const currentPath = usePathname();
  const isExpanded = currentPath === '/';

  return (
    <header className='mb-2'>
      {isExpanded ? <ExpandedHeader /> : <CompactHeader />}
      <Image
        src={HeaderHeroSeparator}
        alt='Separator Hero Line'
        className='w-2/3'
      />
    </header>
  );
}

export default NavBar;
