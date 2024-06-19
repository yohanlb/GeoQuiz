'use client';

import React from 'react';
import { navigationLinks } from '@lib/navigationLinks';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MenuIcon from '@icons/menu-icon.svg';
import HeaderHeroSeparator from '@assets/HeaderHeroSeparator.svg';
import GeoQuizLogoCompact from '@assets/LogoCompact.svg';
import GeoQuizLogoExpanded from '@assets/LogoExpanded.svg';
import Menu from '@components/_commons/Menu';
import { Button } from '@components/ui/button';

const ExpandedHeader = () => (
  <div className='grid grid-cols-5 grid-rows-1 gap-0 px-4 py-4 md:px-0'>
    <div className='col-span-3 col-start-2'>
      <Link href={navigationLinks.home.href}>
        <Image
          src={GeoQuizLogoExpanded}
          alt='GeoQuiz Logo'
          className='mx-auto w-full'
        />
      </Link>
    </div>
    <div className='col-start-5 flex items-start justify-end'>
      <Menu
        trigger={
          <button type='button' className='focus:outline-none'>
            <Image src={MenuIcon} alt='Settings Icon' className='w-6 md:w-8' />
          </button>
        }
      />
    </div>
  </div>
);
const CompactHeader = () => (
  <div className='flex items-start justify-between px-4 py-4 md:px-0'>
    <Link href={navigationLinks.home.href}>
      <Image
        src={GeoQuizLogoCompact}
        alt='GeoQuiz Logo'
        className='w-16 md:w-20'
      />
    </Link>
    <Menu
      trigger={
        <button type='button' className='focus:outline-none'>
          <Image src={MenuIcon} alt='Settings Icon' className='w-6 md:w-8' />
        </button>
      }
    />
  </div>
);

const LandingHeader = () => (
  <header className='mb-2'>
    <div className='flex items-start justify-between px-4 py-4 md:px-0'>
      <Link href='/'>
        <Image
          src={GeoQuizLogoCompact}
          alt='GeoQuiz Logo'
          className='w-16 md:w-20'
        />
      </Link>
      <Menu
        trigger={
          <button type='button' className='focus:outline-none'>
            <Image src={MenuIcon} alt='Settings Icon' className='w-6 md:w-8' />
          </button>
        }
      />
    </div>
  </header>
);

function NavBar() {
  const currentPath = usePathname();
  if (currentPath === '/') {
    return <LandingHeader />;
  }

  const isExpanded = currentPath === navigationLinks.home.href;
  return (
    <header className='mb-0 md:mb-2'>
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
