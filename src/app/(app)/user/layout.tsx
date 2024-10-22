import React from 'react';
import { navigationLinks } from '@lib/data/navigation-links';
import { getAuthenticatedUser } from '@shared/server/db/get-authenticated-user';
import { redirect } from 'next/navigation';

async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getAuthenticatedUser();

  if (!user) {
    redirect(navigationLinks.login.href);
  }

  return (
    <div>{React.cloneElement(children as React.ReactElement, { user })}</div>
  );
}

export default Layout;
