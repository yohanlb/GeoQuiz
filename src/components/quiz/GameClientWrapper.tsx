'use client';
import React from 'react';
import axios from 'axios';
import GameController from './GameController';
import LoadingSpinner from '@components/_commons/LoadingSpinner';

type Props = {
  gameDeck: GameDeck;
  amountOfQuestions: number;
};

const GameClientWrapper = ({ gameDeck, amountOfQuestions }: Props) => {
  const [questions, setQuestions] = React.useState<Question[] | null>(null);

  React.useEffect(() => {
    const fetchQuestions = async () => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_GEOQUIZ_API_BASE_URL as string}questions`,
        {
          countryIds: gameDeck.countryIds,
          amountOfQuestions,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      setQuestions(response.data as Question[]);
    };

    fetchQuestions();
  }, [amountOfQuestions, gameDeck]);

  if (questions && questions.length > 0) {
    return (
      <>
        <GameController questions={questions} gameDeck={gameDeck.name} />
      </>
    );
  } else {
    return <LoadingSpinner />;
  }
};

export default GameClientWrapper;
