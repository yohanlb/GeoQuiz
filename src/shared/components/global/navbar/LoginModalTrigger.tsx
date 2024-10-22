'use client';

import React from 'react';
import { Button } from '@/src/shared/components/ui/button';
import { navigationLinks } from '@lib/data/navigation-links';
import LoginModal from '@components/global/navbar/LoginModal';

type Props = {
  text?: string;
  classname?: string;
  size?: 'sm' | 'default' | 'lg';
};

function LoginModalTrigger({
  text = navigationLinks.login.label,
  size = 'default',
  classname = '',
}: Props) {
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);

  const buttonClassName = classname + ' font-bold';

  return (
    <>
      <Button
        size={size}
        variant={'accent'}
        className={buttonClassName}
        onClick={() => {
          setIsLoginModalOpen(true);
        }}
      >
        {text}
      </Button>
      <LoginModal
        open={isLoginModalOpen}
        customRedirectUrl={navigationLinks.home.href}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
}

export default LoginModalTrigger;
