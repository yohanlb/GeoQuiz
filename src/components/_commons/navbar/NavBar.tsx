import React from 'react';
import { navigationLinks } from '@data/navigationLinks';
import Image from 'next/image';
import Link from 'next/link';
import HeaderHeroSeparator from '@assets/HeaderHeroSeparator.svg';
import GeoQuizLogoCompact from '@assets/LogoCompact.svg';
import MenuNavigationButton from '@components/_commons/navbar/MenuNavigationButton';
import MenuUserButton from '@components/_commons/navbar/MenuUserButton';

function NavBar() {
  return (
    <header className='mb-1 md:mb-2'>
      <div className='grid grid-cols-3 items-center px-4 py-4 md:px-0'>
        <div className='flex justify-start'>
          <MenuNavigationButton />
        </div>
        <div className='flex justify-center'>
          <Link href={navigationLinks.home.href}>
            <Image
              src={GeoQuizLogoCompact}
              alt='GeoQuiz'
              className='w-16 md:w-20'
            />
          </Link>
        </div>
        <div className='flex justify-end'>
          <MenuUserButton />
        </div>
      </div>
      <Image
        src={HeaderHeroSeparator}
        alt='Separator Hero Line'
        className='w-[90%]'
      />
    </header>
  );
}

export default NavBar;
