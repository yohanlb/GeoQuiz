'use client';

import React from 'react';
// import TwitterButton from '@components/_commons/TwitterButton';
import { LuTwitter } from 'react-icons/lu';
import { MdOutlineSportsGymnastics } from 'react-icons/md';
import { EXTERNAL_LINKS, navigationLinks } from '@lib/navigationLinks';
import { motion, useAnimation, useInView } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  React.useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const currentPath = usePathname();
  if (
    currentPath.includes(navigationLinks.quiz.href) ||
    currentPath.includes(navigationLinks.results.href)
  ) {
    return null;
  }

  return (
    <footer
      ref={ref}
      className='mt-3 border-t-1 border-gray-800 text-xs font-light text-gray-400'
    >
      <div className='container mx-auto px-4 py-4'>
        <div className='flex flex-col items-center justify-center gap-2'>
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Link
              href={EXTERNAL_LINKS.twitter}
              target='_blank'
              rel='noopener noreferrer'
            >
              <LuTwitter className='h-6 w-6 text-blue-400 transition-colors duration-200 hover:text-blue-300' />
            </Link>
          </motion.div>

          <p className='text-center text-sm'>
            Entirely brought to you by
            <Link
              href={EXTERNAL_LINKS.personalWebsite}
              target='_blank'
              className='mx-1 font-bold italic tracking-wider text-yellow-400 transition-colors duration-200 hover:text-yellow-300'
            >
              Yohan LB
            </Link>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 500 }}
            >
              <MdOutlineSportsGymnastics className='ml-1 inline-block h-6 w-6' />
            </motion.span>
          </p>

          <div className='text-sm'>
            <Link
              href={'https://forms.gle/YrScov3rJU7dEdWS8'}
              target='_blank'
              rel='noreferrer'
              className='underline'
            >
              Contact
            </Link>
            {' - '}
            <Link
              href={'https://forms.gle/YrScov3rJU7dEdWS8'}
              target='_blank'
              rel='noreferrer'
              className='underline'
            >
              Feedback
            </Link>
          </div>

          <div className='text-xs text-gray-600'>
            <Link href={navigationLinks.privacy.href} className='underline'>
              Privacy
            </Link>
            {' - '}
            <Link href={navigationLinks.resources.href} className='underline'>
              Resources
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
