'use client';

import React from 'react';
import { navigationLinks } from '@lib/navigationLinks';
import LoginModal from '@components/_commons/navbar/LoginModal';
import { Button } from '@components/ui/button';

function LoginModalTrigger() {
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setIsLoginModalOpen(true);
        }}
      >
        {navigationLinks.signIn.label}
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
