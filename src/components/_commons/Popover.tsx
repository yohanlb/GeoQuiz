'use client';

import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';

type Props = {
  children: React.ReactNode;
  content: React.ReactNode;
};

function PopoverCustom({ children, content }: Readonly<Props>) {
  return (
    <Popover color='default' placement='bottom' showArrow={true}>
      <PopoverTrigger>
        <button className='border-0 outline-none'>{children}</button>
      </PopoverTrigger>
      <PopoverContent>{content}</PopoverContent>
    </Popover>
  );
}

export default PopoverCustom;
