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

function Menu({ trigger }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem>
          <Link href={navigationLinks.home.href}>
            {navigationLinks.home.label}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={navigationLinks.allDecks.href}>
            {navigationLinks.allDecks.label}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={navigationLinks.countries.href}>
            {navigationLinks.countries.label}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={navigationLinks.history.href}>
            {navigationLinks.history.label}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Link href={navigationLinks.stats.href}>
            {navigationLinks.stats.label}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          <Link href={navigationLinks.more.href}>
            {navigationLinks.more.label}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={navigationLinks.help.href}>
            {navigationLinks.help.label}
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Menu;
