import { useQuery } from 'react-query';
import getPoliceExtracts from '../_apis_/auth/getPoliceExtracts';

export default function usePoliceExtract() {
  const { isFetching, data, error } = useQuery('police-extracts', getPoliceExtracts, {
    refetchInterval: 5 * 60 * 1000,
    refetchOnWindowFocus: false
  });

  return { data, isFetching, error };
}
