import { DailyQuestion } from '@lib/types/daily';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_GEOQUIZ_API_BASE_URL as string;

export const useCountryOfTheDay = () => {
  const queryFunction = () =>
    axios.get<DailyQuestion>(baseUrl + 'daily/cotd').then((res) => res.data);

  return useQuery({
    queryKey: ['cotd'],
    queryFn: queryFunction,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
