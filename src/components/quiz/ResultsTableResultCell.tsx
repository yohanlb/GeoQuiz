import React from 'react';
import { User } from '@supabase/supabase-js';
import useCountryLocalUserGuesses from '@utils/hooks/useCountryLocalUserGuesses';
import GuessesList from '@components/_commons/GuessesList';
import UserResult from '@components/quiz/UserResult';

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
