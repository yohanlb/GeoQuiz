'use client';

import React from 'react';
import { navigationLinks } from '@lib/navigationLinks';
import LoginModal from '@components/_commons/navbar/LoginModal';
import { Button } from '@components/ui/button';

type Props = {
  text?: string;
  classname?: string;
  size?: 'sm' | 'default' | 'lg';
};

function LoginModalTrigger({
  text = navigationLinks.signIn.label,
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
