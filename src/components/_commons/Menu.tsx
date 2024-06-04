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
      <DropdownMenuContent>
        {Object.entries(navigationLinks)
          .filter(([key]) => !['help', 'more'].includes(key))
          .map(([key, link]) => (
            <DropdownMenuItem key={key} disabled={link.disabled}>
              <Link href={link.href}>{link.label}</Link>
            </DropdownMenuItem>
          ))}
        <DropdownMenuSeparator />
        {Object.entries(navigationLinks)
          .filter(([key]) => ['help', 'more'].includes(key))
          .map(([key, link]) => (
            <DropdownMenuItem key={key} disabled={link.disabled}>
              <Link href={link.href}>{link.label}</Link>
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Menu;
