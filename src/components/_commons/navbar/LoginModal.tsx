'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import LoginButton from '@components/login/LoginButton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';

const LoginModal = ({
  open,
  customRedirectUrl,
  onClose,
}: {
  open: boolean;
  customRedirectUrl?: string;
  onClose: () => void;
}) => {
  const [currentPath, setCurrentPath] = useState<string | null>(null);

  // Update current path on open
  useEffect(() => {
    if (open && typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='bg-gray-800 text-white sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-bold'>Sign In</DialogTitle>
          <DialogDescription className='text-gray-400'>
            Sign in to your account using Google OAuth.
          </DialogDescription>
        </DialogHeader>
        <div className='flex items-center justify-center py-4'>
          {currentPath && (
            <LoginButton nextUrl={customRedirectUrl ?? currentPath} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Use dynamic import to ensure client-side rendering
export default dynamic(() => Promise.resolve(LoginModal), { ssr: false });
