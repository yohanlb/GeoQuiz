import { DailyQuestion } from '@lib/types/daily';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_GEOQUIZ_API_BASE_URL as string;

export const useCountryOfTheDay = (day: number = 0) => {
  const queryFunction = () => {
    const params = day !== 0 ? { day } : {}; // Only include 'day' param if day is not 0
    return axios
      .get<DailyQuestion>(baseUrl + 'daily/cotd', { params })
      .then((res) => res.data);
  };

  return useQuery({
    queryKey: ['cotd', day],
    queryFn: queryFunction,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
