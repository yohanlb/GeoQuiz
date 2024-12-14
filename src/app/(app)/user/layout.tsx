import React from 'react';
import { navigationLinks } from '@lib/data/navigation-links';
import { getAuthenticatedUser } from '@server/db/get-authenticated-user';
import { User } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';

interface UserProp {
  user: User | null;
}

interface LayoutProps {
  children: React.ReactElement<UserProp>;
}

async function Layout({ children }: LayoutProps) {
  const user = await getAuthenticatedUser();

  if (!user) {
    redirect(navigationLinks.login.href);
  }

  return <div>{React.cloneElement(children, { user })}</div>;
}

export default Layout;
