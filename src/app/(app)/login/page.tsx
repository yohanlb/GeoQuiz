import React from 'react';
import { navigationLinks } from '@lib/data/navigation-links';
import { createClient } from '@lib/supabase/server';
import { redirect } from 'next/navigation';
import LoginButton from '@components/_commons/login/LoginButton';

export const metadata = {
  title: 'Login',
  description: 'Sign in to your account.',
};

async function LoginPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect(navigationLinks.home.href);
  }

  return (
    <div className='mt-12'>
      <p className='my-4 text-center text-sm text-gray-400'>
        Please note that the authentication feature is still in development.
        <br />
        Some functionalities may not work as expected.
      </p>
      <div className='mx-auto flex max-w-sm flex-col gap-4 rounded-lg bg-background p-4 text-white'>
        <h1 className='text-2xl font-bold'>Sign In</h1>
        <h2>Sign in to your account using Google OAuth.</h2>
        <div className='flex items-center justify-center'>
          <LoginButton />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
