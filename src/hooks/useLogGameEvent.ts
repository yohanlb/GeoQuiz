import { useState } from 'react';
import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_GEOQUIZ_API_BASE_URL as string;

export type GameEventData = {
  event: string;
  gameMode: string;
  payload: { [key: string]: string | number };
};

const useLogGameEvent = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendLogGameEvent = async (gameEventData: GameEventData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(baseUrl + 'logGameData', gameEventData);
      setData(response.data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return { sendLogGameEvent, data, error, isLoading };
};

export default useLogGameEvent;
