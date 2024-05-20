import React from 'react';
import { getQuestionsFromDeckId } from '../queries/questions';
import axios from 'axios';

export function useFetchQuestions(
  { id, isDynamic, countryIds }: Deck,
  length: number,
) {
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      if (isDynamic) {
        // if deck is dynamic, questions are fetch based on countryIds[]
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_GEOQUIZ_API_BASE_URL as string}questions`,
          {
            deckId: id,
            countryIds: countryIds,
            amountOfQuestions: length,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        setQuestions(response.data as Question[]);
      } else {
        // if not dynamic, questions are fetch based on deckId
        const response = await getQuestionsFromDeckId(id, length);
        setQuestions(response as Question[]);
      }
      setIsLoading(false);
    };
    fetchQuestions();
  }, [id, length, isDynamic, countryIds]);

  return { questions, isLoading };
}