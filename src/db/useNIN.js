import { useQuery } from 'react-query';
import { GetNIN } from '../_apis_/auth';

export default function useNIN(nin) {
  const { isFetching, data, error } = useQuery(['get-nin', nin], GetNIN, {
    refetchInterval: 5 * 60 * 1000,
    refetchOnWindowFocus: false
  });

  return { data, isFetching, error };
}
