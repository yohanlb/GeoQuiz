import React from 'react';
import { getCountriesStatsByCountryIds } from '@features/countries/server/db/countries_stats';
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
    if (!isGameStoreInitialized) return;

    const fetchStaticQuestions = async () => {
      // if not dynamic, questions are fetch based on deckId
      const response = await getQuestionsFromDeckId(id, questionType, length);
      // Manually create a countryStats object for each question.
      // TODO: Remove this once the API doesnt use country_complete_view anymore
      return response.map((question) => ({
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
    };

    const fetchDynamicQuestions = async () => {
      // if deck is dynamic, questions are fetch based on countryIds[]
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_GEOQUIZ_API_BASE_URL}questions`,
        {
          deckId: id,
          countryIds,
          amountOfQuestions: length,
        },
        { headers: { 'Content-Type': 'application/json' } },
      );

      const questionsCountryIds = response.data.map(
        (question: Question) => question.countryData.id,
      );
      const countriesStats =
        await getCountriesStatsByCountryIds(questionsCountryIds);

      return response.data.map((question: Question) => ({
        ...question,
        countryStats: countriesStats.find(
          (stats) => stats.country_id === question.countryData.id,
        ),
      }));
    };

    const fetchQuestions = async () => {
      try {
        setIsLoading(true);
        const fetchedQuestions = await (isDynamic
          ? fetchDynamicQuestions()
          : fetchStaticQuestions());
        setQuestions(fetchedQuestions as Question[]);
      } catch (error) {
        console.error('Error fetching questions:', error);
        // Handle error appropriately
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [id, length, isDynamic, countryIds, questionType, isGameStoreInitialized]);

  return { questions, isLoading };
}
