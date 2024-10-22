import React from 'react';
import { FaRegFlag } from 'react-icons/fa6';
import { PiCity } from 'react-icons/pi';
import GuessesList from '@shared/components/global/GuessesList';

type Props = {
  guessesHistory: UserGuessHistoryPartial[];
  alignment?: 'left' | 'right';
};

function UserGuesses({ guessesHistory, alignment = 'left' }: Readonly<Props>) {
  const guessHistoryByQuestionType = guessesHistory.reduce(
    (acc, stat) => {
      acc[stat.question_type_id] = stat.guess_results ?? [];
      return acc;
    },
    {} as Record<number, boolean[]>,
  );

  const alignmentClasses = alignment === 'right' ? 'text-right' : 'text-left';
  const justifyClasses =
    alignment === 'right' ? 'justify-end' : 'justify-start';

  return (
    <div className={`flex flex-col gap-1 ${alignmentClasses}`}>
      <h3 className='text-sm font-medium'>Your Last Guesses</h3>
      <ul>
        <li className={`flex items-center ${justifyClasses} gap-2`}>
          <PiCity />
          <GuessesList countryHistory={guessHistoryByQuestionType[1]} />
        </li>
        <li className={`flex items-center ${justifyClasses} gap-2`}>
          <FaRegFlag />
          <GuessesList countryHistory={guessHistoryByQuestionType[2]} />
        </li>
      </ul>
    </div>
  );
}

export default UserGuesses;
