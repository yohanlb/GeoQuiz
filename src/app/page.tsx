import React from 'react';
import { navigationLinks } from '@lib/navigationLinks';
import Image from 'next/image';
import Link from 'next/link';
import GeoQuizLogo from '@assets/GeoQuizGlobeLogo.png';
import { Button } from '@components/ui/button';

const Landing = () => {
  return (
    <div>
      <section className='flex w-full flex-col items-center gap-y-8 px-4 py-24 text-center md:flex-row md:justify-between md:text-left'>
        <div className='flex flex-col justify-center gap-8 md:max-w-[50%]'>
          <h1 className='text-2xl font-extrabold'>
            Learn Geography the Fun Way with GeoQuiz!
          </h1>
          <p className='font-thin capitalize'>
            Master <strong>capitals</strong> and <strong>flags</strong>, track
            your progress, and <strong>challenge</strong> your friends!
          </p>
          <Link href={navigationLinks.home.href}>
            <Button
              size={'lg'}
              variant={'accent'}
              className='w-fit font-extrabold'
            >
              <span>{'Start!'}</span>
            </Button>
          </Link>
        </div>
        <div className='max-w-44 md:max-w-80'>
          <Image
            src={GeoQuizLogo}
            alt='GeoQuiz Logo'
            width={320}
            height={320}
            priority
          />
        </div>
      </section>
    </div>
  );
};

export default Landing;
