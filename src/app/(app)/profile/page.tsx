import React from 'react';
import { createClient } from '@lib/supabase/server';
import LoginButton from '@components/global/login/LoginButton';

export const metadata = {
  title: 'Profile',
  description: 'Your profile page.',
};

const ProfilePage = async () => {
  const {
    data: { user },
  } = await createClient().auth.getUser();

  return (
    <div>
      {user ? (
        <div>
          <p>Currently signed in as {user?.user_metadata.name}.</p>
        </div>
      ) : (
        <div>
          <LoginButton />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
