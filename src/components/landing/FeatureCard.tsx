import { FeatureData } from '@lib/featuresDescription';
import { motion } from 'framer-motion';

type FeatureCardProps = {
  featureData: FeatureData;
  flexBasis?: 'basis-3/5' | 'basis-2/5';
};

const titleMotion = {
  rest: {
    x: 0,
    rotate: 0,
    transition: {
      duration: 0.1,
      type: 'tween',
      ease: 'easeIn',
    },
  },
  hover: {
    x: 10,
    rotate: -4,
    transition: {
      duration: 0.1,
      type: 'tween',
      ease: 'easeOut',
    },
  },
};

export const FeatureCard = ({
  featureData,
  flexBasis = 'basis-3/5',
}: FeatureCardProps) => {
  return (
    <motion.div
      whileHover='hover'
      whileTap='hover'
      className={`flex ${flexBasis} group flex-col justify-between rounded-lg border border-gray-700 p-4 hover:border-gray-500`}
    >
      <div className='flex flex-col gap-3'>
        <div className='flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 duration-300 group-hover:bg-accent/80'>
          <span className='text-2xl font-extrabold'>{featureData.number}</span>
        </div>
        <motion.h3
          className='w-fit text-lg font-bold text-accent'
          variants={titleMotion}
          style={{ transformOrigin: 'center' }}
        >
          {featureData.title}
        </motion.h3>
      </div>
      <h4>{featureData.description}</h4>
    </motion.div>
  );
};
