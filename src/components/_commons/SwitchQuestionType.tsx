'use client';

import React from 'react';
import useGameStore from '@/src/stores/gameStore';
import { Button } from '@nextui-org/react';

function SwitchQuestionType() {
  const { setQuestionType, questionType } = useGameStore();

  return (
    <div className='flex justify-center gap-4'>
      <Button
        isDisabled={questionType === 'CountryToCapital'}
        onClick={() => setQuestionType('CountryToCapital')}
      >
        Capital
      </Button>
      <Button
        isDisabled={questionType === 'CountryToFlag'}
        onClick={() => setQuestionType('CountryToFlag')}
      >
        Flags
      </Button>
    </div>
  );
}

export default SwitchQuestionType;
