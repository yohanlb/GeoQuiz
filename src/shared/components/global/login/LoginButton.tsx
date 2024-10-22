'use client';

import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import { Button } from '@/src/shared/components/ui/button';
import useGoogleLogin from '@hooks/useGoogleLogin';

const LoginButton = ({ nextUrl }: { nextUrl?: string }) => {
  const { handleGoogleLogin, error } = useGoogleLogin(nextUrl);

  const onClickHandler = async () => {
    const loginUrl = await handleGoogleLogin();
    if (loginUrl) {
      window.location.href = loginUrl;
    }
  };

  return (
    <div className='w-64'>
      {error && <p className='text-red-500'>{error}</p>}
      <Button
        onClick={onClickHandler}
        variant='outline'
        className='flex w-full max-w-sm items-center justify-center space-x-2 border-gray-600 bg-gray-700 text-white hover:bg-gray-600'
      >
        <FaGoogle className='h-5 w-5' />
        <span>Continue with Google</span>
      </Button>
    </div>
  );
};

export default LoginButton;
