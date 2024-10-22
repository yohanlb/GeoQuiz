import React from 'react';
import UserResult from '@features/quiz/components/UserResult';
import useCountryLocalUserGuesses from '@hooks/useCountryLocalUserGuesses';
import GuessesList from '@shared/components/global/GuessesList';
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
