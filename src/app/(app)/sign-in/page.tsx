import React from 'react';
import { createClient } from '@lib/supabase/server';
import LoginButton from '@components/login/LoginButton';
import LogoutButton from '@components/login/LogoutButton';

export default async function SignInPage() {
  const {
    data: { user },
  } = await createClient().auth.getUser();

  return (
    <div>
      <h1>Sign In</h1>
      {user ? (
        <div>
          <p>Currently signed in as {user?.email}</p>
          <LogoutButton />
        </div>
      ) : (
        <div>
          <LoginButton />
        </div>
      )}
    </div>
  );
}
