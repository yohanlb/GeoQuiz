'use client';

import React from 'react';
import { navigationLinks } from '@lib/navigationLinks';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useFeatureFlagEnabled } from 'posthog-js/react';
import GeoQuizLogo from '@assets/GeoQuizGlobeLogo.png';
import LoginModalTrigger from '@components/_commons/navbar/LoginModalTrigger';
import { Features } from '@components/landing/Features';
import { Button } from '@components/ui/button';

const Landing = () => {
  const featureFlagEnabled =
    useFeatureFlagEnabled('user-auth') ||
    process.env.NODE_ENV === 'development';

  return (
    <div className='flex flex-col gap-24 px-4 pt-24 md:gap-40'>
      <section className='flex w-full flex-col items-center gap-12 text-center md:flex-row md:justify-between md:text-left'>
        <motion.div className='flex flex-col justify-center gap-8 md:max-w-[50%]'>
          <h1 className='text-3xl font-extrabold'>
            Learn Geography the Fun Way with GeoQuiz!
          </h1>
          <h2 className='text-lg font-thin capitalize'>
            Learn <strong>countries</strong>, <strong>capitals</strong> and{' '}
            <strong>flags</strong>, track your progress, and{' '}
            <strong>challenge</strong> your friends!
          </h2>

          {featureFlagEnabled ? (
            <div className='flex items-center justify-center gap-4 md:justify-start'>
              <LoginModalTrigger
                text={'Sign in Now!'}
                size={'lg'}
                classname='text-xl text-red-500'
              />
              <Link
                href={navigationLinks.home.href}
                className='text-sm text-gray-400 underline underline-offset-2'
              >
                Or try without an account
              </Link>
            </div>
          ) : (
            <div className='flex flex-col'>
              <Link href={navigationLinks.home.href}>
                <Button
                  size={'lg'}
                  variant={'accent'}
                  className='play w-fit text-xl font-bold text-background'
                >
                  <span>Try It Now!</span>
                </Button>
              </Link>
            </div>
          )}
        </motion.div>
        <div className='max-w-44 duration-300 hover:scale-105 md:max-w-80'>
          <Image
            src={GeoQuizLogo}
            alt='GeoQuiz Logo'
            width={320}
            height={320}
            priority
          />
        </div>
      </section>
      <section className='space-y-8 text-xl italic'>
        <p>{'"Finally beat your friends at naming capitals!"'}</p>
        <p className='text-right'>{'"Be the new king of trivia nights!"'}</p>
      </section>
      <section>
        <Features />
      </section>
    </div>
  );
};

export default Landing;
