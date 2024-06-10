import React from 'react';
import { motion } from 'framer-motion';

type AnswerCircleProps = {
  status: UserResultsStatus;
  isCurrentQuestion?: boolean;
};

const AnswerCircle: React.FC<AnswerCircleProps> = ({
  status,
  isCurrentQuestion = false,
}) => {
  const borderSize = status === 'default' ? 'border border-1' : 'border-0';

  return (
    <div
      className={`flex h-4 w-4 ${isCurrentQuestion && 'scale-150'} items-center justify-center rounded-full md:h-6 md:w-6 ${borderSize} bg-transparent`}
    >
      {status !== 'default' && (
        <motion.div
          initial={{ scale: 1.5 }}
          animate={{ scale: 1 }}
          className='h-full w-full rounded-full'
          style={{
            backgroundColor: status === 'valid' ? '#22c55e' : '#ef4444',
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 10,
          }}
        />
      )}
    </div>
  );
};

export default AnswerCircle;
