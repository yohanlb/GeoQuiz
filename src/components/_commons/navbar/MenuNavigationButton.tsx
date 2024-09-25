import React from 'react';
import { LuMenu } from 'react-icons/lu';
import MenuNavigation from '@components/_commons/navbar/MenuNavigation';
import { Button } from '@components/ui/button';

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
