import { useQuery } from 'react-query';
import getEscortAndGuards from '../_apis_/auth/getEscortAndGuards';

export default function useEscortAndGuards() {
  const { isFetching, data, error } = useQuery('escort-guards', getEscortAndGuards, {
    refetchInterval: 5 * 60 * 1000,
    refetchOnWindowFocus: false
  });

  return { data, isFetching, error };
}
