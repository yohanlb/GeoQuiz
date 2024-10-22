import React from 'react';
import { LuMenu } from 'react-icons/lu';
import { Button } from '@/src/shared/components/ui/button';
import MenuNavigation from '@shared/components/global/navbar/MenuNavigation';

const MenuNavigationButton = () => {
  return (
    <MenuNavigation
      trigger={
        <Button variant='ghost' size='icon'>
          <LuMenu className='inline h-8 w-8 md:h-10 md:w-10' />
        </Button>
      }
    />
  );
};

export default MenuNavigationButton;
