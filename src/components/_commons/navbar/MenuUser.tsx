'use client';

import React from 'react';
import { navigationLinks } from '@data/navigationLinks';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import LoginModalTrigger from '@components/_commons/navbar/LoginModalTrigger';
import LogoutButton from '@components/login/LogoutButton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';

type Props = {
  user: User | null;
  trigger: React.ReactNode;
};

function MenuUser({ trigger, user }: Readonly<Props>) {
  if (!user) return <LoginModalTrigger />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>
          <p>{user.user_metadata?.full_name}</p>
          <p className='font-light'>{user.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          <Link href={navigationLinks.profile.href} className='w-full'>
            {navigationLinks.profile.label}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={navigationLinks.history.href} className='w-full'>
            {navigationLinks.history.label}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Link href={navigationLinks.stats.href} className='w-full'>
            {navigationLinks.stats.label}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Link href={navigationLinks.settings.href} className='w-full'>
            {navigationLinks.settings.label}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default MenuUser;
