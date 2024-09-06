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

function MenuUser({ trigger }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem>
          <Link href={navigationLinks.profile.href} className='w-full'>
            {navigationLinks.profile.label}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={navigationLinks.settings.href} className='w-full'>
            {navigationLinks.settings.label}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={navigationLinks.logout.href} className='w-full'>
            {navigationLinks.logout.label}
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default MenuUser;
