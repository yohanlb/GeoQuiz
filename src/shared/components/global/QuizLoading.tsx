import React from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import globeAnimation from '@assets/lottie/globe.json';

const QuizLoading = () => {
  const [loadingText, setLoadingText] = React.useState('Generating Questions');
  const [dots, setDots] = React.useState('');
  React.useEffect(() => {
    const textInterval = setInterval(() => {
      setLoadingText((prevText) => {
        const texts = ['Generating Questions', 'Preparing your adventure'];
        const currentIndex = texts.indexOf(prevText);
        return texts[(currentIndex + 1) % texts.length];
      });
    }, 3000);

    const dotsInterval = setInterval(() => {
      setDots((prevDots) => (prevDots.length >= 3 ? '' : prevDots + '.'));
    }, 200);

    return () => {
      clearInterval(textInterval);
      clearInterval(dotsInterval);
    };
  }, []);

  return (
    <div className='flex h-full w-full flex-col items-center justify-center gap-8 text-wrap p-4'>
      <Lottie animationData={globeAnimation} loop={true} />
      <motion.p
        className='text-xl'
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        {loadingText} <span className='inline-block w-6'>{dots}</span>
      </motion.p>
    </div>
  );
};

export default QuizLoading;
