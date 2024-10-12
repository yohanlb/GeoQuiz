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

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

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
    <footer ref={ref} className='mt-4 border-t-1 border-gray-800'>
      <div className='container mx-auto px-4 py-8'>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate={controls}
          className='flex flex-col items-center justify-center gap-4'
        >
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

          <motion.p variants={itemVariants} className='text-center text-sm'>
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
          </motion.p>

          <motion.div
            variants={itemVariants}
            className='flex space-x-4 text-sm text-gray-400'
          >
            <Link
              href={'https://forms.gle/YrScov3rJU7dEdWS8'}
              target='_blank'
              rel='noreferrer'
              className='transition-colors duration-200 hover:text-gray-300'
            >
              Contact
            </Link>
            <Link
              href={'https://forms.gle/YrScov3rJU7dEdWS8'}
              target='_blank'
              rel='noreferrer'
              className='transition-colors duration-200 hover:text-gray-300'
            >
              Feedback
            </Link>
            <Link
              href={navigationLinks.privacy.href}
              className='transition-colors duration-200 hover:text-gray-300'
            >
              Privacy
            </Link>
            <Link
              href={navigationLinks.resources.href}
              className='transition-colors duration-200 hover:text-gray-300'
            >
              Resources
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
