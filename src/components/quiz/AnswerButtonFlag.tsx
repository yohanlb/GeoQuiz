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
  let borderColor = 'white';
  if (option.state === 'SUCCESS') {
    borderColor = 'border-green-500';
  } else if (option.state === 'DISABLED') {
    borderColor = 'border-red-500';
  }

  return (
    <motion.button
      key={index}
      onClick={() => handleClick(option.codeIso2)}
      className={`color-border border-2 p-1 ${borderColor} rounded-lg`}
      disabled={option.state === 'DISABLED'}
      whileTap={{
        scale: option.state === 'DEFAULT' ? 0.9 : 1,
        opacity: option.state !== 'DEFAULT' ? 0.5 : 1,
      }}
    >
      <ReactCountryFlag
        countryCode={option.codeIso2}
        svg
        style={{
          width: '100%',
          height: 'auto',
          opacity: option.state === 'DISABLED' ? 0.5 : 1,
        }}
      />
    </motion.button>
  );
}

export default AnswerButtonFlag;
