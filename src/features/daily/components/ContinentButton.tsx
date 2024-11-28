'use client';

import React from 'react';
import { DailyQuestion } from '@lib/types/daily-mode';
import { motion } from 'framer-motion';
import Image from 'next/image';

type ButtonState = 'idle' | 'correct' | 'incorrect' | 'disabled';

interface ContinentButtonProps {
  continent: DailyQuestion['regionOptions'][number];
  hasAnswered: boolean;
  isSelected: boolean;
  isCorrect: boolean;
  onClick: () => void;
}

const ContinentButton: React.FC<ContinentButtonProps> = ({
  continent,
  hasAnswered,
  isSelected,
  isCorrect,
  onClick,
}) => {
  let state: ButtonState = 'idle';
  if (isSelected && !isCorrect) {
    state = 'incorrect';
  } else if (hasAnswered && isCorrect) {
    state = 'correct';
  } else if (hasAnswered) {
    state = 'disabled';
  }
  const baseClasses =
    'flex flex-col items-center justify-center p-6 rounded-2xl transition-all duration-300 w-24 h-24';
  const stateClasses = {
    idle: 'bg-gray-800 text-gray-100 hover:bg-gray-700',
    disabled: 'bg-gray-800/70 text-gray-600',
    correct: 'bg-green-600 text-white',
    incorrect: 'bg-red-600 text-white',
  };
  const getIllustration = (
    continent: DailyQuestion['regionOptions'][number],
  ) => {
    const continentMap = {
      Asia: '/continents/asia.svg',
      Africa: '/continents/africa.svg',
      Europe: '/continents/europe.svg',
      Oceania: '/continents/oceania.svg',
      Americas: '/continents/americas.svg',
    };

    return (
      <Image
        src={continentMap[continent]}
        alt={continent}
        width={48}
        height={48}
        className='brightness-0 invert'
      />
    );
  };

  return (
    <motion.li
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <button
        className={`${baseClasses} ${stateClasses[state]}`}
        onClick={onClick}
        disabled={hasAnswered}
      >
        {getIllustration(continent)}

        <span className='text-lg font-semibold'>{continent}</span>
      </button>
    </motion.li>
  );
};

export default ContinentButton;
