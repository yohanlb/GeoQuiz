'use client';

import { motion } from 'framer-motion';

type Props = { text: string };

function PlayButton({ text }: Readonly<Props>) {
  return (
    <motion.button
      className='rounded-xl border-3 border-white bg-white px-6 py-2 text-4xl font-extrabold italic text-black transition-colors duration-400'
      whileTap={{ scale: 0.9 }}
      initial={{
        backgroundColor: 'white',
        color: 'black',
      }}
      whileHover={{
        backgroundColor: 'black',
        color: 'white',
      }}
    >
      {text}
    </motion.button>
  );
}

export default PlayButton;
