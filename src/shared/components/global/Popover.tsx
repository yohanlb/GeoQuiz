'use client';

import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';

type Props = {
  children: React.ReactNode;
  content: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
};

function PopoverCustom({
  children,
  content,
  placement = 'bottom',
}: Readonly<Props>) {
  return (
    <Popover color='default' placement={placement} showArrow={true}>
      <PopoverTrigger>
        <button className='border-0 outline-none'>{children}</button>
      </PopoverTrigger>
      <PopoverContent>{content}</PopoverContent>
    </Popover>
  );
}

export default PopoverCustom;
