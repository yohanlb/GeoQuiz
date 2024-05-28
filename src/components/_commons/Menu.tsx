import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import Link from 'next/link';
import { navigationLinks } from '@lib/navigationLinks';

type Props = {
  trigger: React.ReactNode;
};

function Menu({ trigger }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent>
        {Object.entries(navigationLinks)
          .filter(([key]) => !['settings', 'feedback', 'about'].includes(key))
          .map(([key, link]) => (
            <Link key={key} href={link.href}>
              <DropdownMenuItem>{link.label}</DropdownMenuItem>
            </Link>
          ))}
        <DropdownMenuSeparator />
        {Object.entries(navigationLinks)
          .filter(([key]) => ['settings', 'feedback', 'about'].includes(key))
          .map(([key, link]) => (
            <DropdownMenuItem key={key} disabled={link.disabled}>
              {link.label}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Menu;
