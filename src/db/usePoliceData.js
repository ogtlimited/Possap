import { useQuery } from 'react-query';
import getPoliceData from '../_apis_/auth/getPoliceData';

export default function usePoliceData() {
  const { isFetching, data, error } = useQuery('police-data', getPoliceData, {
    refetchInterval: 5 * 60 * 1000,
    refetchOnWindowFocus: false
  });
  return { data, isFetching, error };
}
