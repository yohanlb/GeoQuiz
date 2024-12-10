import React from 'react';
import { getQuestionsFromDeckId } from '@lib/queries/questions';
import useGameStore from '@stores/game-store';
import axios from 'axios';

export function useFetchQuestions(
  { id, isDynamic, countryIds }: DeckRecord,
  length = 10,
) {
  const { questionType, isGameStoreInitialized } = useGameStore();

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
        const response = await getQuestionsFromDeckId(id, length, questionType);
        // Manually create a countryStats object for each question.
        // TODO: Remove this once the API doesnt use country_complete_view anymore
        const questions = response.map((question) => ({
          ...question,
          country: question.countryData,
          countryStats: {
            country_id: question.countryData.id,
            created_at: question.countryData.updated_at,
            updated_at: question.countryData.updated_at,
            capital_guessed_count: question.countryData.capital_guessed_count,
            capital_guessed_right: question.countryData.capital_guessed_right,
            flag_guessed_count: question.countryData.flag_guessed_count,
            flag_guessed_right: question.countryData.flag_guessed_right,
          },
        }));
        setQuestions(questions as Question[]);
      }
      setIsLoading(false);
    };

    if (!isGameStoreInitialized) return;
    fetchQuestions();
  }, [id, length, isDynamic, countryIds, questionType, isGameStoreInitialized]);

  return { questions, isLoading };
}
