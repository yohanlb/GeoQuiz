'use client';

import React from 'react';
import { FaRegFlag } from 'react-icons/fa6';
import { PiCity } from 'react-icons/pi';
import { Tab, Tabs } from '@nextui-org/react';
import useGameStore from '@stores/gameStore';

export default function TabsQuestionType() {
  const { setQuestionType, questionType } = useGameStore();

  return (
    <div className='flex flex-col'>
      <Tabs
        aria-label='Options'
        color='warning'
        size='lg'
        radius='sm'
        variant='bordered'
        className='border-white'
        selectedKey={questionType}
        onSelectionChange={(key) => setQuestionType(key as QuestionType)}
      >
        <Tab
          key='CountryToCapital'
          title={
            <div className='flex items-center space-x-2'>
              <PiCity />
              <span>Capitals</span>
            </div>
          }
        />
        <Tab
          key='CountryToFlag'
          title={
            <div className='flex items-center space-x-2'>
              <FaRegFlag />
              <span>Flags</span>
            </div>
          }
        />
      </Tabs>
    </div>
  );
}
