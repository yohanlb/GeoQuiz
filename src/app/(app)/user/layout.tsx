import React from 'react';
import { navigationLinks } from '@lib/navigationLinks';
import { getAuthenticatedUser } from '@utils/db/auth/get-authenticated-user';
import { redirect } from 'next/navigation';

async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getAuthenticatedUser();

  if (!user) {
    console.log('redirecting to login');
    redirect(navigationLinks.login.href);
  }

  return (
    <div>{React.cloneElement(children as React.ReactElement, { user })}</div>
  );
}

export default Layout;
