import { useQuery } from 'react-query';
import getPoliceRequests from '../_apis_/auth/getPoliceRequests';

export default function usePoliceRequests(id) {
  const { isFetching, data, error } = useQuery(['police-requests', id], getPoliceRequests, {
    refetchInterval: 5 * 60 * 1000,
    refetchOnWindowFocus: false
  });

  return { data, isFetching, error };
}
