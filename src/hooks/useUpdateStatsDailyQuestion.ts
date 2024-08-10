import { useState } from 'react';
import axios from 'axios';

interface StartQuizPayload {
  questionId: number;
  action: string;
  rightAnswers?: number;
  wrongAnswers?: number;
}

const baseUrl = process.env.NEXT_PUBLIC_GEOQUIZ_API_BASE_URL as string;

const useUpdateStatsDailyQuestion = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateStatsDailyQuestion = async (payload: StartQuizPayload) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(baseUrl + 'daily/cotd', payload);
      setData(response.data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return { updateStatsDailyQuestion, data, error, isLoading };
};

export default useUpdateStatsDailyQuestion;
