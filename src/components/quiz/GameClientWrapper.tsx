'use client';
import React from 'react';
import axios from 'axios';
import GameController from './GameController';
import LoadingSpinner from '@components/_commons/LoadingSpinner';

type Props = {
  deck: Deck;
  amountOfQuestions: number;
};

const GameClientWrapper = ({ deck, amountOfQuestions }: Props) => {
  const [questions, setQuestions] = React.useState<Question[] | null>(null);

  React.useEffect(() => {
    const fetchQuestions = async () => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_GEOQUIZ_API_BASE_URL as string}questions`,
        {
          countryIds: deck.countryIds,
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
  }, [amountOfQuestions, deck]);

  if (questions && questions.length > 0) {
    return (
      <>
        <GameController questions={questions} deckName={deck.name} />
      </>
    );
  } else {
    return (
      <div className='flex w-full justify-center pt-12'>
        <LoadingSpinner />
      </div>
    );
  }
};

export default GameClientWrapper;
