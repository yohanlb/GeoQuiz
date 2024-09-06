import React from 'react';
import { LuMenu } from 'react-icons/lu';
import MenuNavigation from '@components/_commons/navbar/MenuNavigation';
import { Button } from '@components/ui/button';

const MenuNavigationButton = () => {
  return (
    <MenuNavigation
      trigger={
        <Button variant='ghost' size='icon'>
          <LuMenu className='inline h-6 w-6 md:h-8 md:w-8' />
        </Button>
      }
    />
  );
};

export default MenuNavigationButton;
