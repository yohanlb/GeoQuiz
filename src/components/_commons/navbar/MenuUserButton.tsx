import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useFeatureFlagEnabled } from 'posthog-js/react';
import MenuUser from '@components/_commons/navbar/MenuUser';
import { Button } from '@components/ui/button';

const MenuUserButton = () => {
  const featureFlagEnabled =
    useFeatureFlagEnabled('user-auth') ||
    process.env.NODE_ENV === 'development';

  return (
    <div className='flex items-center justify-end'>
      {featureFlagEnabled ? (
        <MenuUser
          trigger={
            <Button variant='ghost' size='icon'>
              <FaUserCircle className='inline h-6 w-6 md:h-8 md:w-8' />
            </Button>
          }
        />
      ) : (
        <div className='h-6 w-6 md:h-8 md:w-8'></div> // placeholder
      )}
    </div>
  );
};

export default MenuUserButton;
