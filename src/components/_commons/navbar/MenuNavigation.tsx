'use client';

import React from 'react';
import { navigationLinks } from '@lib/navigationLinks';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';

type Props = {
  trigger: React.ReactNode;
};

function MenuNavigation({ trigger }: Props) {
  // TODO: use current path to show active page
  // const currentPath = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent align='start'>
        <DropdownMenuItem>
          <Link href={navigationLinks.home.href} className='w-full'>
            {navigationLinks.home.label}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={navigationLinks.allDecks.href} className='w-full'>
            {navigationLinks.allDecks.label}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={navigationLinks.countries.href} className='w-full'>
            {navigationLinks.countries.label}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={navigationLinks.history.href} className='w-full'>
            {navigationLinks.history.label}
          </Link>
        </DropdownMenuItem>
        {/* <DropdownMenuItem disabled>
          <Link href={navigationLinks.stats.href} className='w-full'>
            {navigationLinks.stats.label}
          </Link>
        </DropdownMenuItem> */}
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem>
          <Link href={navigationLinks.landing.href} className='w-full'>
            {navigationLinks.landing.label}
          </Link>
        </DropdownMenuItem> */}
        <DropdownMenuItem>
          <Link href={navigationLinks.help.href} className='w-full'>
            {navigationLinks.help.label}
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default MenuNavigation;
