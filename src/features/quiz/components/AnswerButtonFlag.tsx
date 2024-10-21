import React from 'react';
import ReactCountryFlag from 'react-country-flag';
import { motion } from 'framer-motion';
import { OptionsFlag } from './QuestionView';

type Props = {
  index: number;
  option: OptionsFlag;
  handleClick: (value: string) => void;
};

function AnswerButtonFlag({ index, handleClick, option }: Props) {
  let border = 'white';
  if (option.state === 'SUCCESS') {
    border = 'border-green-500 bg-green-500';
  } else if (option.state === 'DISABLED') {
    border = 'border-red-500';
  }

  return (
    <motion.button
      key={index}
      onClick={() => handleClick(option.codeIso2)}
      className={`p-1 ${border} w-full rounded-lg border-2`}
      disabled={option.state === 'DISABLED'}
      whileTap={{
        scale: option.state === 'DEFAULT' ? 0.9 : 1,
        opacity: option.state !== 'DEFAULT' ? 0.5 : 1,
      }}
    >
      <div
        style={{ width: '100%', aspectRatio: '4 / 3', position: 'relative' }}
      >
        <ReactCountryFlag
          countryCode={option.codeIso2}
          svg
          style={{
            width: '100%',
            height: '100%',
            opacity: option.state === 'DISABLED' ? 0.5 : 1,
          }}
        />
      </div>
    </motion.button>
  );
}

export default AnswerButtonFlag;
