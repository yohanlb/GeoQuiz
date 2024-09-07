'use client';

import React from 'react';
import { Avatar } from '@nextui-org/react';
import { User } from '@supabase/supabase-js';
import posthog from 'posthog-js';
import { useFeatureFlagEnabled } from 'posthog-js/react';
import MenuUser from '@components/_commons/navbar/MenuUser';

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
        isAuthenticated: true,
      });
    }
  }, [user]);

  return (
    <div className='flex items-center justify-end'>
      {featureFlagEnabled ? (
        <MenuUser
          user={user}
          trigger={
            <Avatar
              showFallback
              isBordered
              src={user?.user_metadata?.avatar_url}
              name={user?.user_metadata?.name}
              size={'md'}
              as={'button'}
              classNames={{
                base: 'bg-gradient-to-br from-[#FFB457] to-[#FF705B] ring-[#FFB457]/50',
                icon: 'text-black/80',
              }}
            />
          }
        />
      ) : (
        <div className='h-6 w-6 md:h-8 md:w-8'></div> // placeholder to avoid layout shift for user not having loggin in feature flag enabled yet
      )}
    </div>
  );
};

export default MenuUserButton;
