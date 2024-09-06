'use client';

import React from 'react';
import { navigationLinks } from '@lib/navigationLinks';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import HeaderHeroSeparator from '@assets/HeaderHeroSeparator.svg';
import GeoQuizLogoCompact from '@assets/LogoCompact.svg';
import GeoQuizLogoExpanded from '@assets/LogoExpanded.svg';
import MenuNavigationButton from '@components/_commons/navbar/MenuNavigationButton';
import MenuUserButton from '@components/_commons/navbar/MenuUserButton';

const HeaderLogo = ({
  href,
  src,
  className,
}: {
  href: string;
  src: string;
  className: string;
}) => (
  <Link href={href}>
    <Image src={src} alt='GeoQuiz Logo' className={className} />
  </Link>
);

const ExpandedHeader = () => (
  <div className='flex items-start justify-between px-4 py-4 md:px-0'>
    <MenuNavigationButton />
    <div className='w-3/5'>
      <HeaderLogo
        href={navigationLinks.home.href}
        src={GeoQuizLogoExpanded}
        className='mx-auto w-full'
      />
    </div>
    <MenuUserButton />
  </div>
);

const CompactHeader = () => (
  <div className='flex items-start justify-between px-4 py-4 md:px-0'>
    <MenuNavigationButton />
    <HeaderLogo
      href={navigationLinks.home.href}
      src={GeoQuizLogoCompact}
      className='w-16 md:w-20'
    />
    <MenuUserButton />
  </div>
);

const LandingHeader = () => (
  <header className='mb-2 flex items-start justify-between px-4 py-4 md:px-0'>
    <MenuNavigationButton />
    <HeaderLogo href='/' src={GeoQuizLogoCompact} className='w-16 md:w-20' />
    <MenuUserButton />
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
