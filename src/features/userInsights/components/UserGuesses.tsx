import React from 'react';
import { FaRegFlag } from 'react-icons/fa6';
import { PiCity } from 'react-icons/pi';
import { Skeleton } from '@nextui-org/react';
import GuessesList from '@components/global/GuessesList';

type Props = {
  guessesHistory: UserGuessHistoryPartial[];
  alignment?: 'left' | 'right';
  loading?: boolean;
};

function UserGuesses({
  guessesHistory,
  alignment = 'left',
  loading = false,
}: Readonly<Props>) {
  if (loading) {
    return <UserGuessesSkeleton alignment={alignment} />;
  }

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
    <div
      className={`flex flex-col gap-1 text-xs md:text-base ${alignmentClasses}`}
    >
      <h3 className='font-medium'>Your Last Guesses</h3>
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

function UserGuessesSkeleton({
  alignment = 'left',
}: Readonly<{
  alignment?: 'left' | 'right';
}>) {
  const alignmentClasses = alignment === 'right' ? 'text-right' : 'text-left';
  const marginClasses = alignment === 'right' ? 'ml-auto' : '';

  return (
    <div className={`flex flex-col gap-2 ${alignmentClasses}`}>
      <Skeleton className={`h-5 w-32 rounded-lg ${marginClasses}`} />
      <ul className='space-y-1'>
        <li className='flex justify-end'>
          <Skeleton className={`h-4 w-28 rounded-lg ${marginClasses}`} />
        </li>
        <li className='flex justify-end'>
          <Skeleton className={`h-4 w-28 rounded-lg ${marginClasses}`} />
        </li>
      </ul>
    </div>
  );
}

export default UserGuesses;
