'use client';

import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { User } from '@supabase/supabase-js';
import posthog from 'posthog-js';
import { useFeatureFlagEnabled } from 'posthog-js/react';
import MenuUser from '@components/_commons/navbar/MenuUser';
import { Button } from '@components/ui/button';

type Props = {
  user: User | null;
};

const MenuUserButton = ({ user }: Props) => {
  const featureFlagEnabled =
    useFeatureFlagEnabled('user-auth') ||
    process.env.NODE_ENV === 'development';

  React.useEffect(() => {
    if (user) {
      // Identify the user in PostHog from supabase data
      posthog.identify(user.id, {
        email: user.email,
        name: user.user_metadata?.full_name || user.email,
        confirmed_at: user.confirmed_at,
        provider: user.app_metadata?.provider,
      });
    }
  }, [user]);

  return (
    <div className='flex items-center justify-end'>
      {featureFlagEnabled ? (
        <MenuUser
          user={user}
          trigger={
            <div className='group flex cursor-pointer items-center gap-2'>
              <span className='text-sm font-bold group-hover:opacity-80'>
                {user?.user_metadata?.name || ''}
              </span>
              <Button variant='ghost' size='icon'>
                <FaUserCircle className='inline h-6 w-6 group-hover:opacity-80 md:h-8 md:w-8' />{' '}
              </Button>
            </div>
          }
        />
      ) : (
        <div className='h-6 w-6 md:h-8 md:w-8'></div> // placeholder to avoid layout shift for user not having loggin in feature flag enabled yet
      )}
    </div>
  );
};

export default MenuUserButton;
