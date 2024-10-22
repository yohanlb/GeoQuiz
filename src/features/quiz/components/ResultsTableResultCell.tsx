import React from 'react';
import GuessesList from '@/src/shared/components/_commons/GuessesList';
import UserResult from '@features/quiz/components/UserResult';
import useCountryLocalUserGuesses from '@hooks/useCountryLocalUserGuesses';
import { User } from '@supabase/supabase-js';

type Props = {
  countryId: CountryRecord['id'];
  questionIndex: number;
  user: User | null;
};

const ResultsTableResultCell = ({ countryId, questionIndex, user }: Props) => {
  const { countryHistory, newUserCountryResult } =
    useCountryLocalUserGuesses(countryId);

  if (!user) {
    return <UserResult questionIndex={questionIndex} />;
  }
  return (
    <GuessesList
      countryHistory={countryHistory}
      newResult={newUserCountryResult}
    />
  );
};

export default ResultsTableResultCell;
