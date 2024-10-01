import React from 'react';
import { Database } from '@lib/types/database.types';
import { CircularProgress } from '@nextui-org/react';

type UserStatsRow = Database['public']['Tables']['user_guesses_history']['Row'];

type Props = {
  userGuesses: UserStatsRow[];
  countryIds: CountryData['id'][];
  icon: React.ReactNode;
};

const getBarColor = (value: number) => {
  if (value > 60) {
    return 'success';
  }
  if (value > 20) {
    return 'primary';
  }
  return 'default';
};

function DeckProgressByQuestionType({ userGuesses, countryIds, icon }: Props) {
  const progress = React.useMemo(() => {
    if (!userGuesses) return 0;

    const totalPossibleGuesses = countryIds.length * 3;
    let validGuesses = 0;

    countryIds.forEach((countryId) => {
      const countryGuesses = userGuesses.find(
        (guess) => guess.country_id === countryId,
      );
      const lastThreeGuessesResults = (countryGuesses?.guess_results || [])
        .toReversed()
        .slice(-3);
      validGuesses += lastThreeGuessesResults?.filter((guess) => guess).length;
    });

    const res = (validGuesses / totalPossibleGuesses) * 100;
    return Math.round(res);
  }, [userGuesses, countryIds]);

  return (
    <div className='flex items-center gap-2'>
      <CircularProgress
        classNames={{
          svg: 'w-24 h-24 drop-shadow-md',
          indicator: `${getBarColor(progress)}`,
          track: 'stroke-white/10',
          value: 'text-xl font-semibold text-white',
        }}
        value={progress}
        strokeWidth={4}
        showValueLabel={true}
        label={icon}
      />
    </div>
  );
}

export default DeckProgressByQuestionType;
