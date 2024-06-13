import React from 'react';
import { navigationLinks } from '@lib/navigationLinks';
import Image from 'next/image';
import Link from 'next/link';
import GeoQuizLogo from '@assets/GeoQuizGlobeLogo.png';
import { Features } from '@components/landing/Features';
import Footer from '@components/landing/Footer';
import { Button } from '@components/ui/button';

const Landing = () => {
  return (
    <div className='px-4'>
      <section className='flex w-full flex-col items-center gap-y-8 py-24 text-center md:flex-row md:justify-between md:text-left'>
        <div className='flex flex-col justify-center gap-8 md:max-w-[50%]'>
          <h1 className='text-3xl font-extrabold'>
            Learn Geography the Fun Way with GeoQuiz!
          </h1>
          <p className='text-lg font-thin capitalize'>
            Master <strong>capitals</strong> and <strong>flags</strong>, track
            your progress, and <strong>challenge</strong> your friends!
          </p>
          <Link href={navigationLinks.home.href}>
            <Button
              size={'lg'}
              variant={'accent'}
              className='w-fit text-xl font-extrabold'
            >
              <span>Try Now! (It&apos;s free)</span>
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
      <section className='space-y-8 text-xl italic'>
        <p>{'"Finally beat your friends at naming capitals!"'}</p>
        <p className='text-right'>{'"Be the new king of trivia nights!"'}</p>
      </section>
      <section className='my-8'>
        <Features />
      </section>
      <Footer />
    </div>
  );
};

export default Landing;
