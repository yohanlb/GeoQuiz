import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import Link from 'next/link';

type Props = {
  trigger: React.ReactNode;
};

function Menu({ trigger }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link href='/'>
          <DropdownMenuItem>Home</DropdownMenuItem>
        </Link>
        <Link href='/decks'>
          <DropdownMenuItem>All Decks</DropdownMenuItem>
        </Link>
        <Link href='/countries'>
          <DropdownMenuItem>Countries</DropdownMenuItem>
        </Link>
        <Link href='/stats'>
          <DropdownMenuItem>My Stats</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>Settings</DropdownMenuItem>
        <DropdownMenuItem disabled>Feedback</DropdownMenuItem>
        <DropdownMenuItem disabled>About</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Menu;
