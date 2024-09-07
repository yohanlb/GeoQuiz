import React from 'react';
import { navigationLinks } from '@lib/navigationLinks';
import { createClient } from '@lib/supabase/server';
import Image from 'next/image';
import Link from 'next/link';
import HeaderHeroSeparator from '@assets/HeaderHeroSeparator.svg';
import GeoQuizLogoCompact from '@assets/LogoCompact.svg';
import MenuNavigationButton from '@components/_commons/navbar/MenuNavigationButton';
import MenuUserButton from '@components/_commons/navbar/MenuUserButton';

async function NavBar() {
  const {
    data: { user },
  } = await createClient().auth.getUser();

  return (
    <header className='mb-0 md:mb-2'>
      <div className='flex items-center justify-between px-4 pb-3 pt-3 md:px-0'>
        <MenuNavigationButton />
        <Link href={navigationLinks.home.href}>
          <Image
            src={GeoQuizLogoCompact}
            alt='GeoQuiz Logo'
            className='w-12 md:w-16'
          />
        </Link>
        <MenuUserButton user={user} />
      </div>
      <Image
        src={HeaderHeroSeparator}
        alt='Separator Hero Line'
        className='w-2/3'
      />
    </header>
  );
}

export default NavBar;
