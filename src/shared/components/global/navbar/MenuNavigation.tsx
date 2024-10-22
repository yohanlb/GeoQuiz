'use client';

import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/src/shared/components/ui/dropdown-menu';
import { navigationLinks } from '@lib/data/navigation-links';
import Link from 'next/link';

type Props = {
  trigger: React.ReactNode;
};

function MenuNavigation({ trigger }: Props) {
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
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={navigationLinks.changelog.href} className='w-full'>
            {navigationLinks.changelog.label}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={navigationLinks.roadmap.href} className='w-full'>
            {navigationLinks.roadmap.label}
          </Link>
        </DropdownMenuItem>
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
