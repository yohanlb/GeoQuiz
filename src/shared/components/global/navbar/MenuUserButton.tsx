'use client';

import React from 'react';
import { UserContext } from '@lib/contexts/UserProvider';
import { Avatar } from '@nextui-org/react';
import posthog from 'posthog-js';
import MenuUser from '@components/global/navbar/MenuUser';

const MenuUserButton = () => {
  const { user, loading } = React.useContext(UserContext);

  React.useEffect(() => {
    if (user) {
      // Identify the user in PostHog from supabase data
      posthog.identify(user.id, {
        email: user.email,
        name: user.user_metadata?.full_name || user.email,
        confirmed_at: user.confirmed_at,
        provider: user.app_metadata?.provider,
        isSignedUp: true,
      });
    }
  }, [user]);

  return (
    <div className='flex items-center justify-end'>
      {loading ? (
        <div className='flex items-center justify-center'>
          <div className='h-10 w-10 animate-pulse rounded-full bg-gray-300' />
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default MenuUserButton;
