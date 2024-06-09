'use client';

import { motion } from 'framer-motion';

type Props = { text: string };

function PlayButton({ text }: Props) {
  return (
    <motion.button
      className='rounded-xl border-3 border-transparent bg-white px-6 py-2 text-4xl font-extrabold italic text-black transition-colors duration-400'
      whileTap={{ scale: 0.9 }}
      whileHover={{
        scale: 1.05,
        backgroundColor: 'black',
        color: 'white',
        border: '3px solid white',
      }}
    >
      {text}
    </motion.button>
  );
}

export default PlayButton;
