'use client';

import React from 'react';
import { FaRegFlag } from 'react-icons/fa6';
import { PiCity } from 'react-icons/pi';
import useGameStore from '@/src/stores/gameStore';
import { Tab, Tabs } from '@nextui-org/react';

export default function TabsQuestionType() {
  const { setQuestionType, questionType } = useGameStore();

  return (
    <div className='flex flex-col'>
      <Tabs
        aria-label='Options'
        color='primary'
        variant='bordered'
        selectedKey={questionType}
        onSelectionChange={(key) => setQuestionType(key as QuestionType)}
      >
        <Tab
          key='CountryToCapital'
          title={
            <div className='flex items-center space-x-2'>
              <PiCity />
              <span>Capital</span>
            </div>
          }
        />
        <Tab
          key='CountryToFlag'
          title={
            <div className='flex items-center space-x-2'>
              <FaRegFlag />
              <span>Flag</span>
            </div>
          }
        />
      </Tabs>
    </div>
  );
}
